# Lets GitHub Actions run `terraform plan` on PRs (.github/workflows/terraform.yml).
# The role is read-only: CI can plan but never apply. Apply stays manual.

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
# Add a service here when infra/ starts using a new one.
resource "aws_iam_role_policy" "terraform_plan" {
  role = aws_iam_role.terraform_plan.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
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
  })
}

output "terraform_plan_role_arn" {
  description = "Used by .github/workflows/terraform.yml."
  value       = aws_iam_role.terraform_plan.arn
}
