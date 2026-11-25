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
- PRs touching `infra/` run `terraform plan` in CI
  (`.github/workflows/terraform.yml`) using a read-only role assumed via
  GitHub OIDC (`infra/ci.tf`). Read the plan in the job summary before you
  apply. CI never applies. If infra/ starts using a new AWS service, add its
  read actions to that role's policy, or the plan fails with AccessDenied.
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
