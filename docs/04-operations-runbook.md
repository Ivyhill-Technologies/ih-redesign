# 4. Operations runbook

How the site is monitored, what each alert means, and what to do about it.

## Monitoring at a glance

| Signal | Where it shows up | When |
|---|---|---|
| Daily health report | Teams channel | 7:00 AM Eastern, every day |
| Browser errors on the site | Teams card (with Jira button) | Within ~2–5 minutes; at most one card per hour |
| Contact form email failures | Teams card + alert email | Within ~5 minutes |
| Contact form crashes or timeouts | Teams card + alert email | Within ~5 minutes |
| Health reporter itself failing | Alert email | Within ~5 minutes |
| Jira token nearing expiry | Jira ticket (Highest) at 14 days; daily ❌ from 7 days | Daily check |
| AWS changed outside Terraform, or `infra/` not applied | GitHub issue (label `drift`) + Teams card; daily reminder while open | Within ~1 hour |
| Drift check not running | Daily health report ❌ | Daily |
| Dependency updates available | GitHub pull requests from Dependabot | Weekly / monthly |

## The daily health report

Every check, and what a ❌ means:

| Check | ❌ means | First step |
|---|---|---|
| Pages load | A key page didn't return 200 | Open it. If down: check the last deploy in Amplify; roll back ([release process](03-release-process.md#rollback)) |
| Redirects | An old URL or the bare domain doesn't redirect correctly | Re-apply `infra/amplify-redirects.json` (command below) |
| Security headers | CSP/HSTS etc. missing | Check `customHttp.yml` in the last deploy; Amplify build logs |
| SSL certificate | Expires in under 14 days (⚠️ under 30) | Amplify auto-renews; check Amplify → Domain management |
| Contact form backend | The endpoint didn't respond as expected | CloudWatch logs `/aws/lambda/ih-contact-form` |
| Alarms | An `ih-` alarm is firing | See the alarm table below |
| Last production deploy | Most recent `main` build failed | Amplify console → `main` → build logs. The site keeps serving the previous build. |
| Jira token | Under 7 days to expiry, expired, or reminder ticket failed | Renew the token (below) |
| Browser errors (24h) | (⚠️ only) Errors were reported, listed by page | Check the pages; create a Jira ticket if real |
| Infrastructure drift | An open drift issue, a failed drift run, or no run in 3+ hours | See [Responding to a drift alert](#responding-to-a-drift-alert) |

Every failing report has a **Create Jira ticket** button.

## Alarms

| Alarm | Fires when | Goes to | Response |
|---|---|---|---|
| `ih-contact-form-ses-failed` | An email failed to send via SES | Email + Teams | Visitors see an error and are told to email info@. Check `/aws/lambda/ih-contact-form` logs and SES (account status, sending limits). |
| `ih-contact-form-lambda-errors` | The form Lambda crashed or timed out | Email + Teams | Check `/aws/lambda/ih-contact-form` logs; roll back a recent `infra/` change if relevant. |
| `ih-site-client-errors` | ≥1 browser error report in 5 minutes | Teams (max 1 card/hour) | Read the card; reproduce on the named page; create a Jira ticket if real. |
| `ih-site-health-errors` | The health reporter failed | Email | Teams may be missing reports. Check `/aws/lambda/ih-site-health`; check the Teams webhook. |

## Incident response

For security incidents, see also [Security → Incident response](05-security.md#incident-response).

1. **Acknowledge.** Reply in the Teams thread so others know it's being handled.
2. **Assess impact.** Is the public site down, degraded, or fine for visitors?
   Is the contact form losing messages?
3. **Track it.** Click **Create Jira ticket** on the card.
4. **Mitigate first, fix second.** Roll back the last change if it's the
   likely cause ([rollback options](03-release-process.md#rollback)).
5. **Fix** through the normal release process.
6. **Confirm** the alarm recovers and the next health report is green.
7. **Record.** Note the cause and fix on the Jira ticket. Update this
   runbook if the response was unclear.

## Responding to a drift alert

The hourly drift check (`.github/workflows/drift.yml`) opens a GitHub issue
labeled `drift` and posts to Teams. The issue and the run's **Summary** show
the plan.

| Issue title | Meaning | Do this |
|---|---|---|
| **AWS changed outside Terraform (drift)** | Someone changed a resource in the console, CLI, or another tool | Find out who and why. **Mistake or unauthorized:** `cd infra && terraform plan` (confirm it only reverts that change), then `terraform apply`. **Should stay:** update `infra/` to match in a pull request, then apply. If unexplained, treat as a [security incident](05-security.md#incident-response). |
| **infra/ on main isn't applied to AWS** | A merged `infra/` change was never applied | `cd infra && terraform plan`, review, `terraform apply` |
| **Drift check failed** | The check couldn't run (credentials, Terraform error) | Open the run, read the error, fix. Until then, drift can't be ruled out |

The issue closes itself and Teams gets ✅ on the next clean hourly check.
Run it on demand: GitHub → Actions → **Drift check** → **Run workflow**.

**If the health report says the drift check hasn't run:** GitHub disables
scheduled workflows in public repositories after 60 days without activity.
Re-enable it: GitHub → Actions → Drift check → **Enable workflow**.

**Never** fix drift by changing the console back by hand: apply from
Terraform, so the code stays the single source of truth.

## Finding logs

| Log group (CloudWatch → Logs) | Contains |
|---|---|
| `/aws/lambda/ih-client-log` | Browser error reports (one JSON line each) |
| `/aws/lambda/ih-contact-form` | Contact form handler |
| `/aws/lambda/ih-site-health` | Health reports, alarm cards, skipped (cooldown) cards |
| `/aws/lambda/ih-jira-ticket` | Jira tickets created and any Jira API errors |

Query browser errors in CloudWatch → Logs → **Analytics**, log group
`/aws/lambda/ih-client-log`:

```
fields @timestamp, message, page, host, commit, userAgent
| filter source = "client"
| sort @timestamp desc
```

From a terminal: `aws logs tail /aws/lambda/ih-client-log --follow --format short`.

## Routine tasks

| Task | How | When |
|---|---|---|
| Merge Dependabot minor/patch updates | Merge when CI is green | Weekly |
| Review Dependabot major updates | Staging first, then merge | As they arrive |
| Read the daily health report | Teams | Daily |
| Apply redirect changes | `aws amplify update-app --app-id d36xm0r0jv6mrj --custom-rules file://infra/amplify-redirects.json` | After editing the redirects file |
| Run the health report on demand | `aws lambda invoke --function-name ih-site-health /dev/stdout` | Any time |
| Simulate an error end to end | `scripts/demo-site-error.sh` (or `--now N` for instant cards) | Testing, demos |
| Refresh LinkedIn's preview cache | linkedin.com/post-inspector | After changing `public/og-image.png` |
| Check AWS matches the code | `cd infra && terraform plan` → "No changes" | After any infra change |

## Scheduled renewals and expiries

| Item | Expires / renews | Automated? | Action |
|---|---|---|---|
| Jira API token (Teams → Jira button) | **2027-02-08** | Reminder ticket at 14 days; daily ❌ at 7 days | Renew (below) |
| SSL/TLS certificate | Rolling | Amplify auto-renews; daily check warns at 30 days | None unless the check warns |
| Domain registration | Annual | Registrar auto-renew | Keep payment method current |
| Teams webhook | Until the Teams workflow is changed | Failures alarm by email | Re-create and store (below) |

### Renew the Jira API token

1. id.atlassian.com → Security → API tokens → **Create API token with
   scopes** → app Jira, scope `write:jira-work`, longest expiry.
2. AWS console → Systems Manager → **Parameter Store** →
   `/ih-redesign/jira-token` → Edit → value `email:token` → Save.
3. Update `token_expires` in `infra/jira-ticket.tf` to the new date →
   pull request → `terraform apply`.
4. Revoke the old token at id.atlassian.com.

### Replace the Teams webhook

Create a new Workflows webhook in Teams, then store it (the URL is a secret):

```sh
read -rsp "Webhook URL: " URL && aws ssm put-parameter --overwrite \
  --name /ih-redesign/teams-webhook --type SecureString --value "$URL"
```

Run the health report on demand to confirm a card arrives.
