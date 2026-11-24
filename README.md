<div align="center">

<img src="public/assets/logo-horizontal-2c.png" alt="Ivyhill Technologies" height="64" />

# Ivyhill Technologies — Web Redesign

**A migration from a WordPress marketing site to a modern, federal-IT-grade web application.**

[![Node](https://img.shields.io/badge/node-26-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
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
| Platform | WordPress + theme | Vite + React 18 |
| Content | Plugin/page builder | Component-driven JSX, version-controlled |
| Tone | Friendly consultancy | Federal contract-vehicle register |
| Imagery | Stock illustrations, recolored | Brand mark + line iconography only |
| Type | Theme defaults | Inter Variable + design tokens |
| Build | Server-side PHP per request | Static SPA, ~70 KB gzip JS |
| Auth/CMS | wp-admin | None — content lives in the repo |

---

## Stack

- **Node 26** — pinned via `.mise.toml`, so `mise install` provisions the
  exact version on a fresh machine.
- **Vite 6** + **React 18** + **React Router 6** — single-page app, two
  routes today (`/`, `/contracts`), wired for more.
- **Inter Variable** + design tokens — every color, font size, spacing step,
  radius, shadow, and motion curve lives in `src/styles/tokens.css`.
- **Biome** — formatter + linter (`npm run check`, `npm run lint:fix`).
- **No CSS framework.** Tokens and a small `global.css` carry the system.

---

## Run it

```sh
mise install        # first time only — picks up Node 26 from .mise.toml
npm ci
npm run dev         # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Biome lint + format check |
| `npm run lint:fix` | Apply Biome fixes |
| `npm run backend:install` | Install backend tooling into `amplify/` |
| `npm run ampx -- <cmd>` | Run the Amplify CLI, e.g. `npm run ampx -- sandbox` |

### Backend (Amplify Gen 2)

Backend tooling (`@aws-amplify/backend`, `backend-cli`, `aws-cdk-lib`, etc.)
lives in `amplify/package.json`, not the root. The Amplify Hosting build only
installs and builds the frontend (`npm ci`), and the backend is deployed from
a dev machine. AWS's backend packages ship bundled dependencies that `npm ci`
rejects, so keeping them out of the root keeps the frontend install strict.
Use `npm install` (not `ci`) inside `amplify/`.

---

## Layout

```
public/
  assets/           # logo (horizontal 2c) + iT icon marks (4 sizes)
  fonts/            # Inter-VariableFont.ttf
src/
  styles/
    tokens.css      # design tokens (color, type, spacing, radii, shadow, motion)
    global.css      # base layout + buttons + utility classes
  components/
    Header.jsx      # one shared header used by every page
    Footer.jsx      # one shared footer
    SiteShell.jsx   # Header + main + Footer + Toast + hash-anchor scroll
    Toast.jsx
    Icons.jsx       # Lucide-style line-icon set
  sections/
    Hero.jsx, CodesStrip.jsx, CapabilityGrid.jsx, PastPerformance.jsx,
    StatsBand.jsx, CyberCallout.jsx, NaicsCodes.jsx
    contracts/
      ContractsHero.jsx, VehicleIndex.jsx, VehicleDetail.jsx,
      EightABand.jsx, SetAsides.jsx, CertsStrip.jsx, ContactBlock.jsx,
      vehicles.js     # contract-vehicle data
  pages/
    HomePage.jsx, ContractsPage.jsx, NotFoundPage.jsx
  App.jsx           # router
  main.jsx          # entry
_design-source/     # the original design bundle (chats + prototype JSX) — reference only
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

The complete brand brief, voice rules, and visual foundations live in
[`_design-source/project/README.md`](_design-source/project/README.md).

---

## Notes

- The single `Header` component is consumed by `SiteShell`, so every page
  renders the same header — homepage spacing is the golden thumb.
- `_design-source/` is kept for reference. It contains the original design
  bundle from claude.ai/design, including the chat transcripts that document
  why specific decisions were made.
- Agency seals and the Lucide icon CDN are not bundled — production sourcing
  is documented in the design source README.
- A `.env` file is reserved for future configuration (API endpoints, feature
  flags). It is git-ignored; commit a `.env.example` if/when shared variables
  are needed.
