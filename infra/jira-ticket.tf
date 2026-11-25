# "Create Jira ticket" buttons on the Teams cards. The health Lambda signs a
# link to this function's URL; opening it previews the ticket, and Create
# makes a Bug in the IW project and redirects to it.
# Code: jira-ticket/index.mjs. Two SSM SecureStrings, set by hand (never in
# Terraform state or this public repo):
#   /ih-redesign/jira-token        "email:token", a scoped Atlassian API token
#                                  (write:jira-work) on that person's account.
#     read -rsp "Jira email:token: " V && aws ssm put-parameter --overwrite \
#       --name /ih-redesign/jira-token --type SecureString --value "$V"; unset V
#   /ih-redesign/jira-link-secret  random HMAC key for signing links. Changing
#                                  it invalidates every existing button.
#     aws ssm put-parameter --overwrite --name /ih-redesign/jira-link-secret \
#       --type SecureString --value "$(openssl rand -hex 32)"

locals {
  jira = {
    site          = "ivyhill.atlassian.net"
    cloud_id      = "8decece4-c037-4319-b94b-2a29efb53a95"
    project_id    = "10925" # IW (Ivyhill Website)
    bug_type_id   = "10900"
    token_param   = "/ih-redesign/jira-token"
    secret_param  = "/ih-redesign/jira-link-secret"
    link_ttl_days = 30

    # When the token in jira-token expires (shown on id.atlassian.com). The
    # daily health check opens a Highest priority renewal ticket 14 days
    # before and fails every day from 7 days before. Update after renewing.
    token_expires = "2027-02-08"
  }
}

data "archive_file" "jira_ticket" {
  type        = "zip"
  source_file = "${path.module}/jira-ticket/index.mjs"
  output_path = "${path.module}/.build/jira-ticket.zip"
}

resource "aws_iam_role" "jira_ticket" {
  name = "ih-jira-ticket"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Principal = { Service = "lambda.amazonaws.com" } }]
  })
}

resource "aws_iam_role_policy_attachment" "jira_ticket_logs" {
  role       = aws_iam_role.jira_ticket.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "jira_ticket" {
  role = aws_iam_role.jira_ticket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "ssm:GetParameter"
        Resource = [
          "arn:aws:ssm:us-east-1:860184462664:parameter${local.jira.token_param}",
          "arn:aws:ssm:us-east-1:860184462664:parameter${local.jira.secret_param}",
        ]
      },
      # One-ticket-per-link records share the rate limit table ("jira#" keys).
      {
        Effect   = "Allow"
        Action   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:DeleteItem"]
        Resource = aws_dynamodb_table.rate_limit.arn
      },
    ]
  })
}

resource "aws_cloudwatch_log_group" "jira_ticket" {
  name              = "/aws/lambda/ih-jira-ticket"
  retention_in_days = 30
}

resource "aws_lambda_function" "jira_ticket" {
  function_name    = "ih-jira-ticket"
  role             = aws_iam_role.jira_ticket.arn
  runtime          = "nodejs24.x"
  handler          = "index.handler"
  filename         = data.archive_file.jira_ticket.output_path
  source_code_hash = data.archive_file.jira_ticket.output_base64sha256
  timeout          = 20
  memory_size      = 256

  # Only signed links do anything, but cap it anyway.
  reserved_concurrent_executions = 2

  environment {
    variables = {
      JIRA_TOKEN_PARAM   = local.jira.token_param
      LINK_SECRET_PARAM  = local.jira.secret_param
      JIRA_SITE          = local.jira.site
      JIRA_CLOUD_ID      = local.jira.cloud_id
      JIRA_PROJECT_ID    = local.jira.project_id
      JIRA_ISSUE_TYPE_ID = local.jira.bug_type_id
      DEDUPE_TABLE       = aws_dynamodb_table.rate_limit.name
    }
  }

  depends_on = [aws_cloudwatch_log_group.jira_ticket, aws_iam_role_policy_attachment.jira_ticket_logs]
}

resource "aws_lambda_function_url" "jira_ticket" {
  function_name      = aws_lambda_function.jira_ticket.function_name
  authorization_type = "NONE"
}

resource "aws_lambda_permission" "jira_ticket_url" {
  statement_id           = "FunctionURLAllowPublicAccess"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.jira_ticket.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}

resource "aws_lambda_permission" "jira_ticket_invoke" {
  statement_id             = "FunctionURLAllowInvokeAction"
  action                   = "lambda:InvokeFunction"
  function_name            = aws_lambda_function.jira_ticket.function_name
  principal                = "*"
  invoked_via_function_url = true
}
