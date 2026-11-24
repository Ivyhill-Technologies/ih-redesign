# Contact form backend: one Lambda (with a public function URL) that emails
# submissions to info@ via SES. Deploy from this folder with:
#   terraform init && terraform apply

terraform {
  required_version = ">= 1.10"

  required_providers {
    aws     = { source = "hashicorp/aws", version = "~> 6.0" }
    archive = { source = "hashicorp/archive", version = "~> 2.0" }
  }

  # State bucket was created once by hand (versioned, private).
  backend "s3" {
    bucket       = "ih-redesign-tfstate-860184462664"
    key          = "contact-form/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = { project = "ih-redesign", managed_by = "terraform" }
  }
}

locals {
  domain = "ivyhilltech.com"
  email  = "info@ivyhilltech.com"

  # Sites allowed to call the form endpoint from a browser.
  allowed_origins = [
    "https://ivyhilltech.com",
    "https://www.ivyhilltech.com",
    "https://main.d36xm0r0jv6mrj.amplifyapp.com",
    "https://staging.d36xm0r0jv6mrj.amplifyapp.com",
    "http://localhost:5173",
  ]
}

# --- SES: verify the domain with DKIM so mail passes DMARC (p=reject) --------

resource "aws_sesv2_email_identity" "domain" {
  email_identity = local.domain
}

data "aws_route53_zone" "domain" {
  name = local.domain
}

# Three new CNAMEs (<token>._domainkey). They don't touch existing records.
resource "aws_route53_record" "dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${local.domain}"
  type    = "CNAME"
  ttl     = 1800
  records = ["${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
}

# --- Lambda ------------------------------------------------------------------

data "archive_file" "contact" {
  type        = "zip"
  source_file = "${path.module}/lambda/index.mjs"
  output_path = "${path.module}/.build/contact.zip"
}

resource "aws_iam_role" "contact" {
  name = "ih-contact-form"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Principal = { Service = "lambda.amazonaws.com" } }]
  })
}

resource "aws_iam_role_policy_attachment" "logs" {
  role       = aws_iam_role.contact.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Allowed to send only from the verified domain.
resource "aws_iam_role_policy" "ses" {
  role = aws_iam_role.contact.id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "ses:SendEmail", Resource = aws_sesv2_email_identity.domain.arn }]
  })
}

resource "aws_cloudwatch_log_group" "contact" {
  name              = "/aws/lambda/ih-contact-form"
  retention_in_days = 30
}

resource "aws_lambda_function" "contact" {
  function_name    = "ih-contact-form"
  role             = aws_iam_role.contact.arn
  runtime          = "nodejs24.x"
  handler          = "index.handler"
  filename         = data.archive_file.contact.output_path
  source_code_hash = data.archive_file.contact.output_base64sha256
  timeout          = 10
  memory_size      = 256

  # Caps how many run at once, which caps cost if someone floods the endpoint.
  reserved_concurrent_executions = 2

  environment {
    variables = { TO_ADDRESS = local.email, FROM_ADDRESS = local.email }
  }

  depends_on = [aws_cloudwatch_log_group.contact, aws_iam_role_policy_attachment.logs]
}

resource "aws_lambda_function_url" "contact" {
  function_name      = aws_lambda_function.contact.function_name
  authorization_type = "NONE"

  cors {
    allow_origins = local.allowed_origins
    allow_methods = ["POST"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }
}

output "contact_url" {
  description = "Put this in src/config.js as CONTACT_URL."
  value       = aws_lambda_function_url.contact.function_url
}
