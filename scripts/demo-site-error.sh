#!/usr/bin/env bash
# Demo: simulate a visitor's browser error, end to end.
#
#   scripts/demo-site-error.sh          # real path: report → alarm → Teams card (2–5 min)
#   scripts/demo-site-error.sh --now 3  # also post 3 cards right away, each with its own
#                                       # "Create Jira ticket" button (one ticket per button)
#
# The report is clearly marked TEST. Needs AWS credentials for this account
# (only for --now). Delete the Jira tickets you create afterwards.
set -euo pipefail

LOG_URL="https://v7z3wffbslan2ivdraxqjkgyea0txqoj.lambda-url.us-east-1.on.aws/"
CARDS=0
if [[ "${1:-}" == "--now" ]]; then CARDS="${2:-1}"; fi

# 1. Send the error report, shaped exactly like src/log.js sends it.
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$LOG_URL" -H "content-type: text/plain" -d '{
  "level": "error",
  "message": "TEST: demo error, safe to ignore",
  "page": "/contact",
  "host": "www.ivyhilltech.com",
  "commit": "demo",
  "data": {
    "name": "TypeError",
    "message": "Failed to fetch",
    "stack": "TypeError: Failed to fetch\n    at onSubmit (ContactForm.jsx:66:35)\n    at async handleSubmit (react-form.js:812:9)"
  }
}')
echo "Error report sent (HTTP $code). It's in CloudWatch: /aws/lambda/ih-client-log"

# 2. Optionally skip the alarm wait: hand the health Lambda the same message
#    CloudWatch would send, once per card.
for ((i = 1; i <= CARDS; i++)); do
    msg=$(printf '{"AlarmName":"ih-site-client-errors","AlarmDescription":"Visitors'"'"' browsers reported errors on the site.","OldStateValue":"OK","NewStateValue":"ALARM","NewStateReason":"Demo: posted by scripts/demo-site-error.sh","StateChangeTime":"%s"}' "$(date -u +%FT%TZ)")
    payload=$(jq -nc --arg m "$msg" '{Records: [{Sns: {Message: $m}}]}')
    aws lambda invoke --function-name ih-site-health --cli-binary-format raw-in-base64-out \
        --payload "$payload" /dev/null --query 'FunctionError' --output text | grep -q None \
        && echo "Card $i posted to Teams" || echo "Card $i FAILED: check /aws/lambda/ih-site-health"
done

if ((CARDS == 0)); then
    echo "The alarm should post a card to Teams in 2–5 minutes (only if it isn't already firing)."
else
    echo "The real alarm may also post a card in a few minutes. That's the normal path, not a duplicate bug."
fi
