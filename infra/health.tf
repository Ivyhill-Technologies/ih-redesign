# Site health reporter: posts a check summary to a Teams channel every morning,
# and posts contact form alarms to the same channel as they happen.
# Code: health/index.mjs. Webhook URL: SSM SecureString, set by hand (not in
# Terraform, so it never lands in state or this public repo):
#   read -rsp "Webhook URL: " URL && aws ssm put-parameter --overwrite \
#     --name /ih-redesign/teams-webhook --type SecureString --value "$URL"

locals {
  webhook_param  = "/ih-redesign/teams-webhook"
  amplify_app_id = "d36xm0r0jv6mrj"
}

data "archive_file" "health" {
  type        = "zip"
  source_file = "${path.module}/health/index.mjs"
  output_path = "${path.module}/.build/health.zip"
}

resource "aws_iam_role" "health" {
  name = "ih-site-health"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Principal = { Service = "lambda.amazonaws.com" } }]
  })
}

resource "aws_iam_role_policy_attachment" "health_logs" {
  role       = aws_iam_role.health.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "health" {
  role = aws_iam_role.health.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      { Effect = "Allow", Action = "ssm:GetParameter", Resource = "arn:aws:ssm:us-east-1:860184462664:parameter${local.webhook_param}" },
      { Effect = "Allow", Action = "cloudwatch:DescribeAlarms", Resource = "*" },
      { Effect = "Allow", Action = "amplify:ListJobs", Resource = "arn:aws:amplify:us-east-1:860184462664:apps/${local.amplify_app_id}/*" },
    ]
  })
}

resource "aws_cloudwatch_log_group" "health" {
  name              = "/aws/lambda/ih-site-health"
  retention_in_days = 30
}

resource "aws_lambda_function" "health" {
  function_name    = "ih-site-health"
  role             = aws_iam_role.health.arn
  runtime          = "nodejs24.x"
  handler          = "index.handler"
  filename         = data.archive_file.health.output_path
  source_code_hash = data.archive_file.health.output_base64sha256
  timeout          = 60
  memory_size      = 256

  environment {
    variables = {
      WEBHOOK_PARAM  = local.webhook_param
      CONTACT_URL    = aws_lambda_function_url.contact.function_url
      AMPLIFY_APP_ID = local.amplify_app_id
      ALARM_PREFIX   = "ih-contact-form"
    }
  }

  depends_on = [aws_cloudwatch_log_group.health, aws_iam_role_policy_attachment.health_logs]
}

# --- Every morning at 7:00 Eastern (handles daylight saving) ----------------

resource "aws_iam_role" "health_scheduler" {
  name = "ih-site-health-scheduler"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Principal = { Service = "scheduler.amazonaws.com" } }]
  })
}

resource "aws_iam_role_policy" "health_scheduler" {
  role = aws_iam_role.health_scheduler.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "lambda:InvokeFunction", Resource = aws_lambda_function.health.arn }]
  })
}

resource "aws_scheduler_schedule" "health_daily" {
  name                         = "ih-site-health-daily"
  schedule_expression          = "cron(0 7 * * ? *)"
  schedule_expression_timezone = "America/New_York"

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = aws_lambda_function.health.arn
    role_arn = aws_iam_role.health_scheduler.arn
  }
}

# --- Contact form alarms also go to Teams, as they happen --------------------

resource "aws_sns_topic_subscription" "alerts_teams" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.health.arn
}

resource "aws_lambda_permission" "health_sns" {
  statement_id  = "AllowAlertsTopic"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.health.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.alerts.arn
}

# If the reporter itself breaks, email (a quiet Teams channel isn't "all good").
resource "aws_cloudwatch_metric_alarm" "health_errors" {
  alarm_name          = "ih-site-health-errors"
  alarm_description   = "The Teams site health reporter failed. Teams may not be getting reports."
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  dimensions          = { FunctionName = aws_lambda_function.health.function_name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alerts.arn]
}
