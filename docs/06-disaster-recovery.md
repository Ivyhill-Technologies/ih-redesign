# 6. Backup and disaster recovery

The site is designed to be rebuilt from its repository. It holds no
customer data, so "recovery" means restoring the code, the AWS resources,
and a handful of console settings.

## What's backed up, and where

| Asset | Source of truth | Backup / history |
|---|---|---|
| Website code, content, documents | GitHub repository | Full git history; every developer clone is a complete copy |
| AWS resource definitions | `infra/*.tf` in the repository | Git history |
| Terraform state | Private S3 bucket | S3 versioning (every prior state retained) |
| Lambda code | `infra/*/index.mjs` in the repository | Git history |
| Redirect rules | `infra/amplify-redirects.json` | Git history |
| Secrets | AWS Parameter Store | Not backed up by design. Re-issued from their source (Teams, Atlassian) if lost |
| Logs | CloudWatch | 30-day retention; not backed up (operational data only) |
| Visitor data | None stored | n/a |

## Recovery targets

| Scenario | Recovery time objective | Recovery point objective |
|---|---|---|
| Bad release | ~5 minutes (rollback) | No loss |
| Amplify app deleted or misconfigured | ~1 hour | No loss (rebuild from `main`) |
| Backend Lambdas or alarms deleted | ~15 minutes (`terraform apply`) | No loss |
| Secrets lost | ~30 minutes (re-issue) | n/a |
| Full AWS account loss | ~half a day | No loss of site content; logs lost |
| GitHub repository lost | ~1 hour from any developer clone | Up to the last clone's state |

## Procedures

### Roll back a bad release

See [Release process → Rollback](03-release-process.md#rollback).

### Rebuild the backend (Lambdas, alarms, topics, schedule)

```sh
cd infra
terraform init
terraform plan     # review: should recreate only what's missing
terraform apply
```

Then confirm the alert email subscriptions (each address must click the AWS
confirmation email once), and run the health report:
`aws lambda invoke --function-name ih-site-health /dev/stdout`.

### Restore Terraform state

If the state file is corrupted: S3 console → the state bucket →
`contact-form/terraform.tfstate` → **Versions** → restore the last good
version. Then `terraform plan` should show no unexpected changes.

### Rebuild the Amplify app

1. Amplify console → create an app from the GitHub repository; connect
   branches `main` (production) and `staging`.
2. Environment variable `_CUSTOM_IMAGE` = `public.ecr.aws/docker/library/node:26-trixie`.
3. `amplify.yml` and `customHttp.yml` are read from the repo automatically.
4. Staging: Access control → password-protect the `staging` branch.
5. Domain management → add `ivyhilltech.com` and `www`; Amplify issues
   the certificate and DNS records (Route 53).
6. Apply redirects:
   `aws amplify update-app --app-id <new-app-id> --custom-rules file://infra/amplify-redirects.json`.
7. Update the app ID where it's referenced: `infra/health.tf`
   (`amplify_app_id`), the allowed origins in `infra/main.tf` (Amplify branch
   URLs), `AGENTS.md`, and these docs. Then `terraform apply`.

### Re-issue secrets

| Secret | Re-issue from |
|---|---|
| Teams webhook | Teams → Workflows → new webhook ([runbook](04-operations-runbook.md#replace-the-teams-webhook)) |
| Jira token | id.atlassian.com ([runbook](04-operations-runbook.md#renew-the-jira-api-token)) |
| Link-signing key | Generate a new one ([security](05-security.md#secrets-inventory-and-rotation)) |

### Restore the repository

Any up-to-date clone can recreate it: create the repository, push `main`
and `staging`, re-create the rulesets (protect `main`: pull requests +
required `build` check, no bypass; protect `staging`: no deletion or force
push), re-enable secret scanning with push protection, and update the
GitHub OIDC trust in `infra/ci.tf` if the repository name changed.

## Testing recovery

| Test | Frequency |
|---|---|
| Rollback (revert a harmless change) | Yearly, or after major process changes |
| `terraform plan` shows "No changes" (drift check) | After every infrastructure change |
| End-to-end alert path (`scripts/demo-site-error.sh`) | Quarterly |
