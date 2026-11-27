#!/usr/bin/env bash
# Subscribe an address to the contact form alert emails, live, while someone
# who can read that inbox is on hand to click the confirmation link.
#
#   scripts/confirm-alert-email.sh                       # info@ivyhilltech.com
#   scripts/confirm-alert-email.sh someone@ivyhilltech.com
#
# Why a script: AWS drops an email subscription nobody confirms within 3 days,
# and the drift check then flags it. Running this during a call means the
# click happens right away. Afterwards, add the address back to alert_emails
# in infra/main.tf with the import block this prints (no deadline then).
#
# Needs AWS credentials for this account (same as terraform).
set -euo pipefail

EMAIL="${1:-info@ivyhilltech.com}"
TOPIC_NAME="ih-contact-form-alerts"
WAIT_MINUTES=15
export AWS_REGION="${AWS_REGION:-us-east-1}"

aws sts get-caller-identity >/dev/null || { echo "Not logged in to AWS. Log in, then run this again." >&2; exit 1; }

topic_arn=$(aws sns list-topics --query "Topics[?ends_with(TopicArn, ':${TOPIC_NAME}')].TopicArn | [0]" --output text)
[[ "$topic_arn" == arn:* ]] || { echo "Couldn't find the SNS topic ${TOPIC_NAME}." >&2; exit 1; }

# Already confirmed? Then there's nothing to click.
existing=$(aws sns list-subscriptions-by-topic --topic-arn "$topic_arn" \
    --query "Subscriptions[?Endpoint=='${EMAIL}'].SubscriptionArn | [0]" --output text)
if [[ "$existing" == arn:* ]]; then
    sub_arn="$existing"
    echo "${EMAIL} is already subscribed and confirmed."
else
    # Subscribing again while one is pending just resends the email.
    sub_arn=$(aws sns subscribe --topic-arn "$topic_arn" --protocol email \
        --notification-endpoint "$EMAIL" --return-subscription-arn --query SubscriptionArn --output text)
    echo "Confirmation email sent to ${EMAIL}."
    echo "In that inbox: open \"AWS Notification - Subscription Confirmation\" (check spam) and click Confirm subscription."
    echo
    deadline=$((SECONDS + WAIT_MINUTES * 60))
    while :; do
        pending=$(aws sns get-subscription-attributes --subscription-arn "$sub_arn" \
            --query Attributes.PendingConfirmation --output text 2>/dev/null || echo true)
        [[ "$pending" == "false" ]] && break
        if ((SECONDS > deadline)); then
            echo
            echo "Not confirmed after ${WAIT_MINUTES} minutes. The link still works for 3 days;"
            echo "or run this script again later to send a fresh email."
            exit 1
        fi
        printf "\rWaiting for the click... %d min left " $(((deadline - SECONDS + 59) / 60))
        sleep 5
    done
    printf "\r%-50s\n" "Confirmed."
    # Once confirmed, AWS gives the subscription its permanent ARN.
    sub_arn=$(aws sns list-subscriptions-by-topic --topic-arn "$topic_arn" \
        --query "Subscriptions[?Endpoint=='${EMAIL}'].SubscriptionArn | [0]" --output text)
fi

cat <<EOF

${EMAIL} now gets contact form alert emails.

Last step, any time (no deadline): put it back under Terraform in a PR.
In infra/main.tf, add "${EMAIL}" to alert_emails, and add this block
so Terraform adopts the confirmed subscription instead of creating a new one:

import {
  to = aws_sns_topic_subscription.alerts["${EMAIL}"]
  id = "${sub_arn}"
}

The PR's plan should say "1 to import" and nothing to add. Merge, then
terraform apply. The import block can be deleted in a later PR.
EOF
