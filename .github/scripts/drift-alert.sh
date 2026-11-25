#!/usr/bin/env bash
# Drift alerting for .github/workflows/drift.yml. Run from infra/ after the
# two plans wrote drift.txt (refresh-only) and plan.txt (full plan).
#
# STATUS: clean | drift | pending | error
# One GitHub issue (label "drift") tracks an open problem:
#   new problem      → open issue + 🚨 Teams card
#   still open       → once a day (13:00 UTC run): comment + ⏰ Teams card
#   back to clean    → close issue + ✅ Teams card
# Needs: GH_TOKEN, STATUS, RUN_URL, AWS credentials (for the Teams webhook).
set -euo pipefail

gh label create drift --color B60205 --force \
    --description "AWS doesn't match infra/ on main (drift check)" >/dev/null
issue=$(gh issue list --label drift --state open --json number --jq '.[0].number // empty')

# Post an Adaptive Card to Teams. $1 title, $2 color, $3 text, $4 issue URL.
post() {
    local url
    url=$(aws ssm get-parameter --name /ih-redesign/teams-webhook --with-decryption \
        --query Parameter.Value --output text)
    echo "::add-mask::$url"
    jq -n --arg t "$1" --arg c "$2" --arg x "$3" --arg i "$4" --arg r "$RUN_URL" '{
        type: "message",
        attachments: [{
            contentType: "application/vnd.microsoft.card.adaptive",
            content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard", version: "1.4",
                body: [
                    {type: "TextBlock", text: $t, weight: "Bolder", size: "Medium", color: $c, wrap: true},
                    {type: "TextBlock", text: $x, wrap: true},
                    {type: "TextBlock", text: "Drift check · .github/workflows/drift.yml", isSubtle: true, size: "Small"}
                ],
                actions: [
                    {type: "Action.OpenUrl", title: "Open issue", url: $i},
                    {type: "Action.OpenUrl", title: "Open run (full plan)", url: $r}
                ]
            }
        }]
    }' | curl -fsS -X POST -H "content-type: application/json" --data @- "$url" >/dev/null
}

if [[ "$STATUS" == clean ]]; then
    if [[ -n "$issue" ]]; then
        gh issue close "$issue" --comment "Resolved: AWS matches \`infra/\` on main again. [Run]($RUN_URL)"
        post "✅ Infrastructure drift resolved" Good "AWS matches infra/ on main again." \
            "$(gh issue view "$issue" --json url --jq .url)"
    fi
    exit 0
fi

case "$STATUS" in
drift)
    title="AWS changed outside Terraform (drift)"
    what="Someone changed AWS outside Terraform, so it no longer matches infra/ on main." ;;
pending)
    title="infra/ on main isn't applied to AWS"
    what="main has infra/ changes that haven't been applied with terraform apply." ;;
*)
    title="Drift check failed"
    what="The drift check couldn't run terraform plan, so drift can't be ruled out." ;;
esac

# The interesting lines: what the full plan would do (and its totals), plus
# which resources were changed outside Terraform (drifted.txt, from drift.yml).
summary=$({
    [[ -s drifted.txt ]] && sed 's/^/Changed outside Terraform: /' drifted.txt
    grep -hE '^  # |^Plan:|^Error:' plan.txt 2>/dev/null | sed -E 's/^ *# //'
} | awk '!seen[$0]++' | head -25 || true)
[[ -n "$summary" ]] || summary="(no plan output; see the run)"
bullets=$(sed 's/^/- /' <<<"$summary")

body="$what

**Run:** $RUN_URL (Summary has the full plan)

\`\`\`
$summary
\`\`\`

**To resolve:**
- The change was a mistake → \`cd infra && terraform apply\` puts AWS back to match the code.
- The change should stay → update \`infra/\` to match, in a pull request, then apply.

This issue closes itself on the next clean hourly check."

if [[ -z "$issue" ]]; then
    url=$(gh issue create --title "$title" --label drift --body "$body")
    post "🚨 $title" Attention "$what"$'\n\n'"$bullets" "$url"
elif [[ "$(date -u +%H)" == 13 ]]; then
    url=$(gh issue view "$issue" --json url --jq .url)
    gh issue comment "$issue" --body "Still open. $body"
    post "⏰ Still open: $title" Warning "$what"$'\n\n'"$bullets" "$url"
fi
