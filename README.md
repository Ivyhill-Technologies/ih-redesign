<div align="center">

<img src="public/assets/logo-horizontal-2c.png" alt="Ivyhill Technologies" height="64" />

# Ivyhill Technologies — Web Redesign

**A migration from a WordPress marketing site to a modern, federal-IT-grade web application.**

[![Node](https://img.shields.io/badge/node-26-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/biome-2.4-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev/)
[![Brand](https://img.shields.io/badge/Ivyhill_Green-%2380B941-80B941)](#brand)

</div>

---

## What this is

The previous **ivyhilltech.com** was a stock WordPress site — a heavy theme,
recolored small-business illustrations, plugin-driven content blocks, and a
register that read like a friendly community consultancy.

This repository replaces that site with a **purpose-built marketing
application** in the visual register of Leidos / CACI / ECS Federal /
Steampunk: restrained, capability-forward, federal-document grade. Past
performance, contract vehicles, and certifications sit above the fold; copy
addresses contracting officers, not casual visitors.

| | Old site | This site |
|---|---|---|
| Platform | WordPress + theme | React 18 + Vite 6, prerendered |
| Content | Plugin/page builder | Component-driven JSX, version-controlled |
| Tone | Friendly consultancy | Federal contract-vehicle register |
| Imagery | Stock illustrations, recolored | Brand mark + line iconography only |
| Type | Theme defaults | Inter Variable + design tokens |
| Build | Server-side PHP per request | Static HTML per page, built at deploy |
| Auth/CMS | wp-admin | None — content lives in the repo |

---

## Stack

- **Node 26**, pinned in `.mise.toml` (`mise install` sets it up).
- **React 18 + React Router 6**, built by **Vite 6** and prerendered to static
  HTML per route with `vite-react-ssg`.
- **Tailwind 4** for styling, plus design tokens (color, type, spacing, radii,
  shadow, motion) in `src/styles/tokens.css`.
- **Inter Variable** font, self-hosted in `public/fonts/`.
- **Biome** as formatter and linter.
- **AWS Amplify Hosting** builds and serves the site. The contact form is one
  small AWS Lambda (see below).

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

**Risky changes** (dependencies, Node version, `amplify.yml`, build config)
go through `staging` first: merge your branch into `staging`, check the
password-protected staging site, then open a PR from `staging` into `main`.
After merging, fast-forward `staging` to `main` so the two stay identical.
`staging` can't be deleted or force-pushed.

The site footer shows `<commit> · <build date>`, so you can tell which build
is live on each environment.

AI agents: see `AGENTS.md`.

---

## Contact form backend

The form posts to one AWS Lambda function that emails each submission to
info@ivyhilltech.com via SES, with Reply-To set to the visitor. Nothing is
stored. Spam controls: a hidden honeypot field, validation, and a per-IP limit
of 5 messages per hour.

It's defined with Terraform in `infra/` (state in S3) and is **not** deployed
by Amplify. To change it:

```sh
cd infra
terraform init      # first time only
terraform plan      # review
terraform apply
```

---

## Layout

```
infra/              Terraform + Lambda for the contact form
public/             static files: assets/ (logos, icons), documents/, fonts/
src/
  main.jsx          entry (vite-react-ssg)
  App.jsx           routes
  config.js         contact form endpoint
  components/       shared UI: SiteShell, Header, Footer, Icons, Logo, ...
  pages/            one file per route (capabilities/ for the five capability pages)
  sections/         page sections, grouped by page (home/, about/, ...)
  styles/           global.css (Tailwind + base) and tokens.css
amplify.yml         Amplify Hosting build (overrides console settings)
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

- **Brand color:** Ivyhill Green `#80B941` — accent only; never a wash.
- **Type:** Inter Variable. Headings semibold/bold, body regular.
- **Iconography:** Lucide-style line icons, 1.75 px stroke.
- **Aesthetic:** Leidos / CACI / ECS Federal / Steampunk — restrained,
  hairline rules, generous whitespace, agency-document register.

</td>
</tr>
</table>


---

## Notes

- Every page renders the same `Header` and `Footer` through `SiteShell`.
- Agency seals and the Lucide icon CDN are not bundled.
- `.env` files are git-ignored. Commit a `.env.example` if shared variables
  are ever needed.
