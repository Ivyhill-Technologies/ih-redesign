<div align="center">

<img src="public/assets/logo-horizontal-2c.png" alt="Ivyhill Technologies" height="64" />

# Ivyhill Technologies — Web Redesign

**ivyhilltech.com, rebuilt from WordPress as a serverless, static site.**

[![Node](https://img.shields.io/badge/node-26-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/tailwind-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![AWS Amplify](https://img.shields.io/badge/aws_amplify-FF9900?logo=awsamplify&logoColor=white)](https://aws.amazon.com/amplify/hosting/)

</div>

---

## What this is

The old ivyhilltech.com was a WordPress site: a server running PHP and a
database on every request, a theme and plugins to keep patched, and content
edited in wp-admin.

This repo replaces it with a modern, serverless site. Every page is
prerendered to static HTML at build time and served by AWS Amplify Hosting.
There is no server or database to run. The only backend is one small Lambda
function for the contact form.

| | Old site | This site |
|---|---|---|
| Platform | WordPress + theme + plugins | React 19 + Vite, prerendered to static HTML |
| Hosting | A server running PHP and MySQL | AWS Amplify Hosting (CDN), no servers |
| Content | wp-admin and a page builder | JSX in this repo, reviewed in pull requests |
| Forms | Plugin | One Lambda function sending through SES |
| Deploys | Edit live | Merge a PR; Amplify builds and deploys |
| Upkeep | Core, theme and plugin updates | Dependabot PRs, checked by CI |

---

## Stack

- **Node 26**, pinned in `.mise.toml` (`mise install` sets it up).
- **React 19 + React Router 6**, built by **Vite** and prerendered to static
  HTML per route with `vite-react-ssg`.
- **Tailwind 4** for styling, plus design tokens (color, type, spacing, radii,
  shadow, motion) in `src/styles/tokens.css`.
- **Inter Variable** font, self-hosted in `public/fonts/`.
- **Biome** as formatter and linter.
- **AWS**: Amplify Hosting for the site; Lambda, SES and DynamoDB for the
  contact form; Terraform for everything outside Amplify.

---

## Run it

```sh
mise install        # first time only: Node 26 from .mise.toml
npm ci              # exact deps from package-lock.json
npm run dev         # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Prerendered production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Biome lint (what CI runs) |
| `npm run check` | Biome lint + format check |
| `npx biome check --write .` | Auto-fix formatting and safe lint issues |

---

## Making changes

`main` is production and is protected: nothing can be pushed to it directly,
not even by admins. Every change goes through a pull request.

1. Branch from `main`, make the change, and run
   `npx biome check --write . && npm run build`.
2. Push the branch and open a PR into `main`. CI (lint + build) must pass.
3. Merge. Amplify deploys `main` to ivyhilltech.com automatically.

**Risky changes** (dependencies, Node version, `amplify.yml`,
`customHttp.yml`, build config) go through `staging` first: merge your branch
into `staging`, check the password-protected staging site, then open a PR
from `staging` into `main`. After merging, fast-forward `staging` to `main` so
the two stay identical. `staging` can't be deleted or force-pushed.

**Dependabot** opens grouped update PRs weekly. Minor and patch groups can
merge once CI passes. Major versions go through `staging` first.

The site footer shows `<commit> · <build date>`, so you can tell which build
is live on each environment.

AI agents: see `AGENTS.md`.

---

## Things that will catch you out

- **Redirects aren't deployed automatically.** Old WordPress URLs and the
  bare domain → `www` redirects live in `infra/amplify-redirects.json`. After
  editing it, apply it by hand:
  `aws amplify update-app --app-id d36xm0r0jv6mrj --custom-rules file://infra/amplify-redirects.json`.
  First match wins, and the `404-200` catch-all must stay last.
- **Never rename or delete files in `public/documents/`.** Old links and
  redirects point to them.
- **New third-party hosts must go in the CSP.** Security headers live in
  `customHttp.yml`. A new script, font, image host or API that isn't listed
  there is blocked by the browser.
- **Link previews are cached.** After changing `public/og-image.png`
  (rendered from `scripts/og-image.html`), refresh LinkedIn's copy at
  linkedin.com/post-inspector.

---

## Backend (`infra/`)

Everything outside Amplify is Terraform in `infra/` (state in S3). It is
**not** deployed by Amplify or CI. PRs that touch `infra/` get a
`terraform plan` in CI. Read it, then apply by hand:

```sh
cd infra
terraform init      # first time only
terraform plan      # review
terraform apply
```

- **Contact form:** the form posts to a Lambda that emails the submission to
  info@ivyhilltech.com via SES, with Reply-To set to the visitor. Nothing is
  stored. Spam controls: a hidden honeypot field, validation, and a per-IP
  limit of 5 messages per hour. Failures email alerts.
- **Client logging:** `src/log.js` has `log.debug()` (browser console only)
  and `log.error()`, which also reports to a Lambda that writes to CloudWatch
  Logs (`/aws/lambda/ih-client-log`). Uncaught browser errors are reported
  automatically. To see debug output on the live site, run
  `localStorage.setItem("ih-debug", "1")` in the browser console.
- **Jira tickets from Teams:** alarm and failing-check cards in Teams have a
  "Create Jira ticket" button that previews, then creates, a Bug in the IW
  project with the error details filled in.
- **Health report:** a Lambda posts a site check (pages, redirects, headers,
  SSL, contact form, alarms, last deploy) to a Teams channel every day at
  7 AM Eastern, and posts contact form alarms there as they fire. Run it
  now with `aws lambda invoke --function-name ih-site-health /dev/stdout`.

---

## Layout

```
infra/              Terraform: contact form, health report, client log, Jira button, CI role, redirects
  lambda/           contact form handler
  health/           health report handler
  client-log/       client log handler
  jira-ticket/      Jira ticket button handler
public/             static files: assets/, documents/, fonts/, og-image.png
scripts/            og-image.html (source for the link preview image)
src/
  main.jsx          entry (vite-react-ssg)
  App.jsx           routes
  config.js         contact form and client log endpoints
  log.js            logger: log.debug(), log.error()
  components/       shared UI: SiteShell, Header, Footer, Icons, Logo, ...
  pages/            one file per route (capabilities/ for the five capability pages)
  sections/         page sections, grouped by page (home/, about/, ...)
  styles/           global.css (Tailwind + base) and tokens.css
amplify.yml         Amplify Hosting build (overrides console settings)
customHttp.yml      security headers (CSP, HSTS, ...)
```

---

## Brand

<table>
<tr>
<td width="120" align="center">
<img src="public/assets/icon-color-large.png" alt="iT mark" width="80" />
</td>
<td>

**Ivyhill Technologies, LLC** — Enterprise Information Management for U.S.
federal, state, and local agencies, and commercial clients. Founded 2015.
HQ in Hyattsville/College Park, MD.

- **Brand color:** Ivyhill Green `#80B941`, accent only, never a wash.
- **Type:** Inter Variable. Headings semibold/bold, body regular.
- **Iconography:** line icons, 1.75 px stroke.
- **Tone:** restrained and capability-forward, written for contracting
  officers.

</td>
</tr>
</table>
