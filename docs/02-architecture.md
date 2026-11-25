# 2. Architecture

## At a glance

The website is static: every page is built to plain HTML once, at deploy
time, and served from AWS's content delivery network. There is no web
server or database to run. The few dynamic features are small AWS Lambda
functions that run only when called.

```mermaid
flowchart LR
    V[Visitor's browser] -->|pages| AMP[AWS Amplify Hosting<br/>static site + CDN]
    V -->|contact form| CF[Lambda<br/>ih-contact-form]
    V -->|error reports| CL[Lambda<br/>ih-client-log]
    CF -->|email| SES[Amazon SES] --> INFO[info@ivyhilltech.com]
    CF --- RL[(DynamoDB<br/>rate limits)]
    CL --- RL
    CL --> LOGS[CloudWatch Logs]
    LOGS --> ALARM[CloudWatch alarms]
    ALARM --> SNS[SNS topics]
    SNS --> H[Lambda<br/>ih-site-health]
    SNS -->|form alarms| EMAIL[Alert email list]
    SCHED[EventBridge Scheduler<br/>7 AM daily] --> H
    H --> TEAMS[Microsoft Teams channel]
    TEAMS -->|Create Jira ticket| J[Lambda<br/>ih-jira-ticket]
    J --> JIRA[Jira IW project]
    GH[GitHub repo] -->|push to main / staging| AMP
```

## Components

### Website (front end)

| Item | Detail |
|---|---|
| Framework | React 19, React Router 6 |
| Build | Vite 6 with `vite-react-ssg`, which prerenders every route to static HTML |
| Styling | Tailwind 4 plus design tokens in `src/styles/tokens.css`; self-hosted Inter font |
| Code layout | `src/pages/` (one file per route), `src/sections/` (page blocks), `src/components/` (shared UI) |
| Hosting | AWS Amplify Hosting builds each push to `main` (production) and `staging` |
| Build definition | `amplify.yml` in the repo; Node 26 build image set in the Amplify console |
| Security headers | `customHttp.yml` (CSP, HSTS and others), applied by Amplify to every response |
| Redirects | `infra/amplify-redirects.json`, applied to Amplify by hand (see [runbook](04-operations-runbook.md)) |
| Error reporting | `src/log.js`: `log.debug()` (console only) and `log.error()` (reported to `ih-client-log`) |
| Version stamp | Footer shows the live commit and build date, linked to GitHub |

### Backend (AWS, defined in Terraform under `infra/`)

| Component | Purpose | Defined in |
|---|---|---|
| `ih-contact-form` Lambda + public URL | Validates form submissions and emails them via SES. Rate-limited per visitor. | `infra/main.tf`, code `infra/lambda/` |
| `ih-client-log` Lambda + public URL | Receives browser error reports; writes one JSON line per report to CloudWatch Logs | `infra/client-log.tf`, code `infra/client-log/` |
| `ih-site-health` Lambda | Daily health report; turns alarms into Teams cards; Jira token expiry check | `infra/health.tf`, code `infra/health/` |
| `ih-jira-ticket` Lambda + public URL | Verifies signed links from Teams cards, previews and creates Jira issues | `infra/jira-ticket.tf`, code `infra/jira-ticket/` |
| DynamoDB `ih-contact-rate-limit` | Short-lived counters: per-visitor rate limits, card cooldown, one-ticket-per-link records. Rows expire automatically. | `infra/main.tf` |
| SES domain identity + DKIM | Lets the form send as ivyhilltech.com and pass email authentication | `infra/main.tf` |
| CloudWatch alarms | Contact form send failures and crashes; browser errors; health reporter failures | `infra/main.tf`, `infra/client-log.tf`, `infra/health.tf` |
| SNS topics | `ih-contact-form-alerts` (email + Teams), `ih-site-errors` (Teams only) | same |
| EventBridge Scheduler | Runs the health report at 7:00 AM Eastern daily | `infra/health.tf` |
| GitHub OIDC role | Read-only AWS role for `terraform plan` in CI | `infra/ci.tf` |

Terraform state is stored in a versioned, private S3 bucket. Infrastructure
changes are applied by a person, never by CI ([Release process](03-release-process.md)).

### External services

| Service | Used for |
|---|---|
| GitHub | Source code, pull requests, CI (GitHub Actions), Dependabot |
| Microsoft Teams (Workflows webhook) | Health reports and alert cards |
| Jira Cloud (project IW) | Issues created from Teams cards; token renewal reminders |
| Route 53 | DNS for ivyhilltech.com |

## Data

The site stores almost nothing, by design.

| Data | Where | Retention | Contains personal data? |
|---|---|---|---|
| Contact form messages | Emailed to info@; **not stored** in AWS | n/a | Yes (in the email only) |
| Rate-limit counters | DynamoDB | ~2 hours, auto-expire | No: visitor IPs are stored only as one-way hashes |
| Browser error reports | CloudWatch Logs | 30 days | No form contents; page, error, browser string |
| Lambda logs | CloudWatch Logs | 30 days | Operational logs only |
| One-ticket-per-link records | DynamoDB | Until the link expires (30–60 days) | No |
| Secrets (Teams webhook, Jira token, link-signing key) | AWS Parameter Store, encrypted | Until rotated | No |

## Key flows

**Page visit:** browser → Amplify CDN → prerendered HTML, CSS, JS. No
backend call.

**Contact form:** browser → `ih-contact-form` (CORS-restricted to our
domains) → checks honeypot, validates, rate-limits (5/hour/visitor) → SES
email to info@ with Reply-To set to the visitor → 200. On SES failure: logs
"SES send failed" → alarm → email + Teams.

**Browser error:** `log.error()` or an uncaught error → `navigator.sendBeacon`
to `ih-client-log` → origin check, size cap, rate limit (30/hour/visitor) →
JSON line in CloudWatch Logs → metric filter → alarm (≥1 in 5 minutes) →
SNS `ih-site-errors` → `ih-site-health` → Teams card (max one per hour)
with the latest errors and a Jira button.

**Jira ticket:** Teams card button → signed link to `ih-jira-ticket` → GET
verifies the signature and shows a preview → POST creates the Bug via the
Jira REST API → redirect to the new issue. Repeat clicks redirect to the
same issue.

**Daily health report:** EventBridge Scheduler, 7 AM Eastern →
`ih-site-health` → checks pages, redirects, headers, certificate, contact
endpoint, alarms, last deploy, Jira token expiry, 24-hour browser errors →
Teams card (Jira button if anything fails).

## Configuration that lives outside the repo

Everything is in code except these, which are set in consoles and noted
here so they're not lost:

| Setting | Where | Notes |
|---|---|---|
| Build image `_CUSTOM_IMAGE` = `public.ecr.aws/docker/library/node:26-trixie` | Amplify console → environment variables | Must match `.mise.toml` and `package.json` engines |
| Custom domain, SSL certificate | Amplify console → Domain management | Certificate auto-renews |
| Staging password | Amplify console → Access control | |
| Redirect rules (applied copy) | Amplify app custom rules | Source of truth: `infra/amplify-redirects.json` |
| Secrets | Parameter Store `/ih-redesign/*` | Commands to set them are in the Terraform file headers |
| GitHub rulesets | GitHub → Settings → Rules | "Protect main", "Protect staging" |
