# GitHub Actions roles (OIDC, no stored AWS keys). Both are read-only: CI can
# plan but never apply. Apply stays manual.
# - ih-redesign-terraform-plan:  PR previews (.github/workflows/terraform.yml)
# - ih-redesign-terraform-drift: hourly drift check on main (.github/workflows/drift.yml);
#   same read access, plus the Teams webhook so it can alert.

resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

resource "aws_iam_role" "terraform_plan" {
  name = "ih-redesign-terraform-plan"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRoleWithWebIdentity"
      Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          # Only pull_request runs in this repo. Fork PRs never get a token.
          "token.actions.githubusercontent.com:sub" = "repo:Ivyhill-Technologies/ih-redesign:pull_request"
        }
      }
    }]
  })
}

# Just enough to refresh state: read config of the resources in this folder
# and the state file. No data reads (no DynamoDB items, no other S3 objects).
# Add a service here when infra/ starts using a new one (both roles use it).
locals {
  terraform_read_statements = [
    {
      Effect = "Allow"
      Action = [
        "lambda:Get*", "lambda:List*",
        "iam:Get*", "iam:List*",
        "ses:Get*", "ses:List*",
        "route53:Get*", "route53:List*",
        "dynamodb:Describe*", "dynamodb:List*",
        "logs:Describe*", "logs:List*",
        "cloudwatch:Describe*", "cloudwatch:List*",
        "sns:Get*", "sns:List*",
        "scheduler:Get*", "scheduler:List*",
      ]
      Resource = "*"
    },
    {
      Effect   = "Allow"
      Action   = "s3:ListBucket"
      Resource = "arn:aws:s3:::ih-redesign-tfstate-860184462664"
    },
    {
      Effect   = "Allow"
      Action   = "s3:GetObject"
      Resource = "arn:aws:s3:::ih-redesign-tfstate-860184462664/contact-form/*"
    },
  ]
}

resource "aws_iam_role_policy" "terraform_plan" {
  role = aws_iam_role.terraform_plan.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = local.terraform_read_statements
  })
}

# Scheduled and manual runs on main only (not PRs, not other branches).
resource "aws_iam_role" "terraform_drift" {
  name = "ih-redesign-terraform-drift"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRoleWithWebIdentity"
      Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          "token.actions.githubusercontent.com:sub" = "repo:Ivyhill-Technologies/ih-redesign:ref:refs/heads/main"
        }
      }
    }]
  })
}

resource "aws_iam_role_policy" "terraform_drift" {
  role = aws_iam_role.terraform_drift.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = concat(local.terraform_read_statements, [
      { Effect = "Allow", Action = "ssm:GetParameter", Resource = "arn:aws:ssm:us-east-1:860184462664:parameter${local.webhook_param}" },
    ])
  })
}

output "terraform_drift_role_arn" {
  description = "Used by .github/workflows/drift.yml."
  value       = aws_iam_role.terraform_drift.arn
}

output "terraform_plan_role_arn" {
  description = "Used by .github/workflows/terraform.yml."
  value       = aws_iam_role.terraform_plan.arn
}
