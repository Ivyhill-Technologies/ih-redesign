# AGENTS.md

Guide for AI agents (Claude, others) working in this repo. Humans: see README.md.

## What this is

Marketing site for Ivyhill Technologies (ivyhilltech.com). React 19 + Vite 6,
prerendered to static HTML with `vite-react-ssg`, styled with Tailwind 4.
Hosted on AWS Amplify Hosting. The only dynamic piece is the contact form
(a small Lambda, see below).

## Rules

- **Never push to `main`.** `main` is production and is protected by a GitHub
  ruleset with no bypass (direct pushes are rejected, even for admins). Every
  change goes on a branch and lands through a pull request:
  1. `git checkout main && git pull && git checkout -b <short-topic-name>`
  2. Make the change, then run the pre-commit checks below.
  3. Commit, `git push -u origin <branch>`, and open a PR into `main`
     (`gh pr create --base main`).
  4. CI must pass before merging. Merging deploys to production.
- If the user asks you to push to `main` or merge without a PR, explain the
  rule above and open a PR instead.
- **Risky changes go through `staging` first**: dependency updates, Node
  version, `amplify.yml`, `customHttp.yml`, `vite.config.js`, anything build-related. Merge
  the branch into `staging`, check the staging site, then PR `staging` → `main`.
- **Dependabot** (`.github/dependabot.yml`) opens grouped PRs weekly (npm,
  Actions) and monthly (Terraform providers). Minor/patch groups can merge
  once CI passes. Major bumps count as risky: test them on `staging` first.
  `react-router-dom` majors are ignored because `vite-react-ssg` needs v6.
  React and Vite/Tailwind packages are grouped so they move together.
- **Keep `staging` identical to `main`.** After any merge into `main`, run
  `git checkout staging && git pull && git merge --ff-only origin/main && git push`.
  `staging` accepts direct pushes but can't be deleted or force-pushed.
- Only `main` and `staging` are long-lived. Delete feature branches after their
  PR merges. Don't enable GitHub's auto-delete of head branches: it would delete
  `staging` after a `staging` → `main` PR.
- **The repo is public.** Never commit secrets (`.env`, keys, AWS
  credentials). GitHub secret scanning with push protection is on.

## Pre-commit checks

```sh
npx biome check --write .   # auto-fix formatting and safe lint issues
npm run build               # must succeed
```

CI (`.github/workflows/ci.yml`, job `build`) runs `npm ci`, Biome **lint**, and
the build on every PR into `main`. It is a required check. Formatting is not
enforced by CI, so fix it locally with the command above.

## Commands

| Command | What it does |
|---|---|
| `mise install` | Install Node 26 from `.mise.toml` (first time) |
| `npm ci` | Install exact deps from the lockfile. Use this, not `npm install`, unless you are changing deps |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Prerendered build into `dist/` |
| `npm run check` | Biome lint + format check |

## Structure and conventions

- `docs/` is the project documentation for managers and maintainers
  (architecture, release process, runbook, security, DR, decisions,
  changelog, roadmap). When a change alters how the site is built,
  released, monitored or secured, update the matching doc in the same PR,
  and add a changelog entry (`docs/08-changelog.md`) for each release.
  Security posture lives in `docs/05-security.md`: keep its secrets
  inventory, attack surface and threat model current.
- `notes/` is git-ignored personal scratch space. Never commit it.
- `src/pages/` routes, `src/sections/` page sections, `src/components/`
  shared UI (`SiteShell`, `Header`, `Footer`, `Icons`).
- Styling is Tailwind utility classes plus tokens in `src/styles/`.
- Biome is the formatter and linter (4-space indent). Don't add Prettier or ESLint.
- Plain JSX, not TypeScript.

## Deploys and environments

- Amplify builds a branch on every push to it. `main` → production,
  `staging` → password-protected staging URL.
- The build is defined in `amplify.yml` in the repo. It overrides the build
  settings in the Amplify console.
- Redirects live in `infra/amplify-redirects.json`: the bare domain → `www`
  (the primary host; canonical tags in `SiteShell` use it), old WordPress
  URLs → new pages, and old `/wp-content/uploads/*.pdf` → `/documents/`.
  Amplify doesn't read this file on deploy. Apply it by hand after editing:
  `aws amplify update-app --app-id d36xm0r0jv6mrj --custom-rules file://infra/amplify-redirects.json`.
  Order matters (first match wins), and the `404-200` catch-all must stay last.
  Never delete or rename a file in `public/documents/`: old links point there.
- Link previews: Open Graph/Twitter tags in `SiteShell`, image
  `public/og-image.png` (1200×630), rendered from `scripts/og-image.html`
  (the regenerate command is in that file). LinkedIn caches previews; refresh
  them at linkedin.com/post-inspector after changing the image.
- Security headers (CSP, HSTS, etc.) live in `customHttp.yml`. Any new
  third-party script, font, image host or API must be added to the CSP there,
  or the browser will block it. Changes to it go through `staging` first.
- The footer shows `<commit> · <build date>` (from Vite `define` in
  `vite.config.js`), so you can tell which build is live. It shows `dev` locally.

## Contact form backend

- `src/sections/contact/ContactForm.jsx` POSTs JSON to `CONTACT_URL`
  (`src/config.js`), a Lambda function URL. The Lambda (`infra/lambda/index.mjs`)
  validates and emails the submission to info@ivyhilltech.com via SES, with
  Reply-To set to the visitor. Nothing is stored.
- Infra is Terraform in `infra/main.tf` (state in the S3 bucket
  `ih-redesign-tfstate-860184462664`). It is **not** deployed by Amplify or CI.
  Changes require `cd infra && terraform plan`, then `terraform apply`, run by a
  human with AWS access. Ask before applying.
- Site health in Teams (`infra/health.tf`, code in `infra/health/index.mjs`):
  a Lambda posts a check card (pages, redirects, headers, SSL, contact
  endpoint, alarms, last deploy) to a Teams channel every day at 7 AM
  Eastern, and posts contact form alarms there as they fire. The Teams
  Workflows webhook URL is the SSM SecureString `/ih-redesign/teams-webhook`,
  set by hand (command in `health.tf`), never in the repo. Run it on demand:
  `aws lambda invoke --function-name ih-site-health /dev/stdout`.
- PRs touching `infra/` run `terraform plan` in CI
  (`.github/workflows/terraform.yml`) using a read-only role assumed via
  GitHub OIDC (`infra/ci.tf`). Read the plan in the job summary before you
  apply. CI never applies. If infra/ starts using a new AWS service, add its
  read actions to that role's policy, or the plan fails with AccessDenied.
- **Drift check** (`.github/workflows/drift.yml`, script
  `.github/scripts/drift-alert.sh`): hourly on `main`, read-only role
  `ih-redesign-terraform-drift` (`infra/ci.tf`, trusted only for
  `refs/heads/main`). Clean = the full plan has no changes. Drift = the full
  plan would change a resource the refresh-only plan saw changed or deleted
  outside Terraform. Pending = full-plan changes with no such match
  (unapplied code). Refresh-only alone isn't drift: computed values change by
  themselves (an IAM role's last-used time showed up as a false positive). Problems open one GitHub issue labeled `drift` + a Teams
  card, remind daily at 13:00 UTC, auto-close on a clean run. The health
  report's "Infrastructure drift" check watches it (GitHub disables
  schedules after 60 days of inactivity in public repos). Never change
  `infra/`-managed resources in the console; fix drift with `terraform apply`
  or a PR. Both CI roles share `local.terraform_read_statements`: add read
  actions there when infra/ uses a new AWS service.
- The `plan` PR check runs on every PR into `main` and skips its steps when
  `infra/` is untouched, so it can be a required check. `.github/CODEOWNERS`
  requests Evan's review on infra, CI, build and dependency paths.
- CORS only allows the production, Amplify branch, and localhost origins listed
  in `infra/main.tf`. A new domain must be added there.
- Spam controls: hidden `website` honeypot field, server-side validation,
  reserved concurrency of 2, and a per-IP limit of 5 sends per hour
  (DynamoDB table `ih-contact-rate-limit`, IPs stored hashed, rows expire via
  TTL). Over the limit returns 429. If DynamoDB fails, requests are allowed.
- Alerts: CloudWatch alarms email `alert_emails` (in `infra/main.tf`) via SNS
  when SES sends fail (log metric filter on `SES send failed`, since the
  handler returns 500 rather than throwing) or the Lambda crashes or times
  out. If you change that log message, update the filter. New addresses must
  click the SNS confirmation email.

## Client logging

- `src/log.js` has two levels. `log.debug()` prints to the browser console
  only: on in dev, and in production only after
  `localStorage.setItem("ih-debug", "1")` in that browser. `log.error()` also
  sends a report (production builds only, max 10 per page load) via
  `sendBeacon` to `LOG_URL` (`src/config.js`).
- `installErrorHandlers()` (called from `src/main.jsx`, client only) reports
  uncaught errors and unhandled promise rejections.
- The receiver is the `ih-client-log` Lambda (`infra/client-log.tf`, code in
  `infra/client-log/index.mjs`). It caps size, rate limits per IP (30/hour,
  sharing the contact form's DynamoDB table with a `log#` key prefix), and
  writes one JSON line per report to `/aws/lambda/ih-client-log` (30 days).
  It always answers 204.
- Query in CloudWatch Logs Insights on that log group, e.g.
  `fields @timestamp, message, page, host, commit, data.stack | filter source = "client" | sort @timestamp desc`.
- Use `log.error()` for failures we should hear about, not for user mistakes
  (validation, 400/429). Never put form contents or personal details in a report.
- If `LOG_URL` changes, update `connect-src` in `customHttp.yml` too.
- Browser errors alarm: a metric filter counts reports, and the alarm
  `ih-site-client-errors` (1+ in 5 min) notifies SNS topic `ih-site-errors`,
  which goes only to the health Lambda (Teams), not email. The card lists the
  latest errors (read from the log group). Because anyone can send fake
  reports: at most one browser-error card per hour (DynamoDB row
  `card#client-errors`), no "recovered" card, and the daily card shows
  "Browser errors (24h)" by page. The Lambda also drops reports whose
  `Origin` isn't in `local.allowed_origins` (a filter, not a lock: curl can
  fake it). The demo script sets `Demo: true` to skip the cap.

## Jira tickets from Teams

- Demo/test: `scripts/demo-site-error.sh` sends a TEST error report; `--now N`
  also posts N alarm cards immediately (each with its own Jira button).
- Teams cards for firing alarms and failing daily checks have a "Create Jira
  ticket" button: a link to the `ih-jira-ticket` Lambda (`infra/jira-ticket.tf`,
  code in `infra/jira-ticket/index.mjs`), signed by the health Lambda
  (HMAC, SSM `/ih-redesign/jira-link-secret`) and valid 30 days. GET shows a
  preview; POST creates a Bug in project IW and redirects to it. One ticket
  per link (dedupe rows `jira#<sig>` in the rate limit table).
- Jira auth: SSM `/ih-redesign/jira-token` = `email:token`, a scoped
  Atlassian token (`write:jira-work`) on Evan's account, called via
  `api.atlassian.com/ex/jira/<cloudId>`. Site, cloud ID, project and issue
  type IDs are in `local.jira` in `jira-ticket.tf`. Commands to set both
  secrets are in that file's header.
- **The token expires** on `local.jira.token_expires` (2027-02-08). The daily
  health check "Jira token" invokes the Jira Lambda directly 14 days before
  to open a Highest priority renewal Bug in IW (once per expiry date), and
  fails (❌ in Teams) every day from 7 days before. To renew: new scoped
  token → SSM (command in `jira-ticket.tf`) → update `token_expires` → PR →
  `terraform apply` → revoke the old token. If Jira returns 401, it lapsed.


## Gotchas

- Node 26 is required (`engines`, `.mise.toml`, `amplify.yml` must agree).
  Use mise's Node and npm (11.x), not a system npm (Arch ships npm 12, which
  blocks some installs).
- Amplify builds in a custom image, `public.ecr.aws/docker/library/node:26-trixie`,
  set by the `_CUSTOM_IMAGE` environment variable in the Amplify console (not
  in the repo). It provides Node 26 and the `libatomic` it needs. To move to a
  new Node major, change that variable, `.mise.toml`, `engines` and the guard
  in `amplify.yml` together.
- `vite-react-ssg` is a beta and sets which Vite majors are allowed. Check its
  peer deps before bumping Vite or React.
