# Client log sink: the site's log.error() (src/log.js) sends browser errors
# here, and the Lambda writes them to CloudWatch Logs (/aws/lambda/ih-client-log).
# Code: client-log/index.mjs. After the first apply, put the client_log_url
# output in src/config.js (LOG_URL) and in connect-src in customHttp.yml.

data "archive_file" "client_log" {
  type        = "zip"
  source_file = "${path.module}/client-log/index.mjs"
  output_path = "${path.module}/.build/client-log.zip"
}

resource "aws_iam_role" "client_log" {
  name = "ih-client-log"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Principal = { Service = "lambda.amazonaws.com" } }]
  })
}

resource "aws_iam_role_policy_attachment" "client_log_logs" {
  role       = aws_iam_role.client_log.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Shares the contact form's rate limit table (keys are prefixed "log#").
resource "aws_iam_role_policy" "client_log_rate_limit" {
  role = aws_iam_role.client_log.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "dynamodb:UpdateItem", Resource = aws_dynamodb_table.rate_limit.arn }]
  })
}

resource "aws_cloudwatch_log_group" "client_log" {
  name              = "/aws/lambda/ih-client-log"
  retention_in_days = 30
}

resource "aws_lambda_function" "client_log" {
  function_name    = "ih-client-log"
  role             = aws_iam_role.client_log.arn
  runtime          = "nodejs24.x"
  handler          = "index.handler"
  filename         = data.archive_file.client_log.output_path
  source_code_hash = data.archive_file.client_log.output_base64sha256
  timeout          = 5
  memory_size      = 128

  # Caps cost if someone floods the endpoint.
  reserved_concurrent_executions = 2

  environment {
    variables = {
      RATE_TABLE = aws_dynamodb_table.rate_limit.name
    }
  }

  depends_on = [aws_cloudwatch_log_group.client_log, aws_iam_role_policy_attachment.client_log_logs]
}

resource "aws_lambda_function_url" "client_log" {
  function_name      = aws_lambda_function.client_log.function_name
  authorization_type = "NONE"

  # The site sends with navigator.sendBeacon (text/plain, no preflight), so
  # this only matters for fetch() callers.
  cors {
    allow_origins = local.allowed_origins
    allow_methods = ["POST"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }
}

# A public function URL needs both permissions. (The console adds these
# automatically; through the API they must be declared.)
resource "aws_lambda_permission" "client_log_url" {
  statement_id           = "FunctionURLAllowPublicAccess"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.client_log.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}

resource "aws_lambda_permission" "client_log_invoke" {
  statement_id             = "FunctionURLAllowInvokeAction"
  action                   = "lambda:InvokeFunction"
  function_name            = aws_lambda_function.client_log.function_name
  principal                = "*"
  invoked_via_function_url = true
}

output "client_log_url" {
  description = "Put this in src/config.js as LOG_URL and in connect-src in customHttp.yml."
  value       = aws_lambda_function_url.client_log.function_url
}

# --- Alert Teams when browser errors are reported ----------------------------

# Count each client report as a metric data point.
resource "aws_cloudwatch_log_metric_filter" "client_errors" {
  name           = "client-errors"
  log_group_name = aws_cloudwatch_log_group.client_log.name
  pattern        = "{ $.source = \"client\" && $.level = \"error\" }"

  metric_transformation {
    name          = "ClientErrors"
    namespace     = "IvyhillSite"
    value         = "1"
    default_value = "0"
  }
}

# Its own topic, wired only to Teams, so browser errors don't email info@.
resource "aws_sns_topic" "site_errors" {
  name = "ih-site-errors"
}

resource "aws_cloudwatch_metric_alarm" "client_errors" {
  alarm_name          = "ih-site-client-errors"
  alarm_description   = "Visitors' browsers reported errors on the site."
  namespace           = "IvyhillSite"
  metric_name         = "ClientErrors"
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 1
  comparison_operator = "GreaterThanOrEqualToThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.site_errors.arn]
  ok_actions          = [aws_sns_topic.site_errors.arn]
}

resource "aws_sns_topic_subscription" "site_errors_teams" {
  topic_arn = aws_sns_topic.site_errors.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.health.arn
}

resource "aws_lambda_permission" "health_site_errors" {
  statement_id  = "AllowSiteErrorsTopic"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.health.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.site_errors.arn
}
