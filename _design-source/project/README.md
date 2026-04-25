# Ivyhill Technologies — Design System

A design system for **Ivyhill Technologies**, a Maryland-based Enterprise Information Management service provider serving U.S. federal, state, and local agencies (Department of Labor, DOJ, ICE, NIH, Departments of the Air Force and Army), as well as commercial clients. Founded 2015, HQ in Hyattsville/College Park, MD.

This system replaces the previous web identity — which leaned on recolored stock illustrations and friendly small-business imagery — with a restrained, capability-forward, federal-IT aesthetic in the family of **Leidos, CACI, ECS Federal, and Steampunk**.

---

## Sources used to build this system

| Source | Path / link |
|---|---|
| Brand logo (horizontal, 2-color) | `uploads/cropped-ivyhill-logo-horizontal-2c-xlarge.png` → `assets/logo-horizontal-2c.png` |
| Brand icon ("iT" mark) — 4 sizes | `uploads/ivyhill-icon-1c-color-{xsmall,small,medium,large}.png` → `assets/icon-color-*.png` |
| Inter Variable font | `uploads/Inter-VariableFont_opsz,wght.ttf` → `fonts/Inter-VariableFont.ttf` |
| Live company site (reference, not copied) | https://www.ivyhilltech.com |
| Public company facts | LinkedIn, GSA eLibrary, HigherGov, RocketReach |

The reader is not assumed to have access to the live site; everything needed to design with this brand lives in this folder.

---

## Index — what's in this folder

| File / folder | Purpose |
|---|---|
| `README.md` | This file. Brand context, content fundamentals, visual foundations, iconography. |
| `SKILL.md` | Agent-skill manifest. Lets Claude Code or other agents load this design system as a skill. |
| `colors_and_type.css` | All design tokens: colors, type, spacing, radii, shadows, motion. Import into any artifact. |
| `assets/` | Logos and icon marks (PNG, transparent). |
| `fonts/` | Inter variable font file. |
| `preview/` | Small HTML cards rendered into the Design System tab — color, type, spacing, component, brand specimens. |
| `ui_kits/website/` | Marketing-site UI kit: homepage hero, capability grid, ISO/contracts strip, footer, etc. JSX components + an `index.html` that strings them into a homepage. |

---

## Brand at a glance

- **Name:** Ivyhill Technologies, LLC
- **Tagline-shaped phrase:** Enterprise Information Management for government and commercial clients.
- **Practice areas (7):** Application Development · Data Analytics · Infrastructure Support · Information Management · Records Management · Document Conversion · Queue Management.
- **Horizontal capability:** Cybersecurity (defense-in-depth, ISO/IEC 27001 backed).
- **Certifications:** ISO 9001:2015 · ISO/IEC 20000-1:2018 · ISO/IEC 27001:2022.
- **MD DOT designations:** MBE · DBE · SBE.
- **Brand color:** Ivyhill Green `#80B941` (sampled from logo).
- **Type:** Inter (variable). The wordmark "IVYHILL" itself is set in a heavy condensed sans — see Iconography note below; we use Inter Bold as a working substitute and have flagged this.

---

## CONTENT FUNDAMENTALS

The Ivyhill voice is **conservative, capability-forward, and contract-aware**. Read like a federal SOW response, not a SaaS landing page.

### Tone
- **Authoritative, plainspoken, third-person.** "Ivyhill delivers …" / "Our team supports …" — not "We'll help you crush your goals."
- **No marketing hype.** No "revolutionary," "game-changing," "next-gen." Capability claims are concrete and verifiable: certifications, contract vehicles, agency client names, NAICS codes.
- **Solemn, not salesy.** This is a firm whose customers are federal program managers and contracting officers. Copy treats them as peers.
- **Past performance leads.** Agency client logos and contract numbers sit above the fold, not buried on an "About" page.

### Person
- **"Ivyhill" or "we"** as the speaker.
- **"Our clients" / "agency partners"** for the audience. Avoid the SaaS "you" — federal procurement copy doesn't address the reader directly.
- The tagline-style phrasing is **descriptive of the firm**, not a rallying cry. Example: *"Enterprise Information Management for federal, state, local, and commercial clients."*

### Casing
- **Sentence case** for headings and buttons (e.g. "Capabilities," "Request a capabilities statement").
- **ALL CAPS** reserved for: the wordmark, eyebrow labels (`CAPABILITIES`, `PAST PERFORMANCE`), and acronyms (NARA, FedRAMP, ICE, NIH, MBE/DBE/SBE).
- **Title Case** only on legal/document-style headings inside formal documents (e.g. "Capability Statement," "Statement of Work").
- Acronyms are spelled out on first reference: *"National Archives and Records Administration (NARA)"*; thereafter NARA.

### Emoji & ornament
- **Never use emoji.** Wrong register entirely.
- **No exclamation points** in body copy; sparing in CTAs at most.
- Unicode characters are not used as icons; if a glyph is needed, use a real icon (see ICONOGRAPHY).

### Vibe
Imagine a one-page capability statement printed on heavy stock — small caps, hairline rules, generous whitespace, agency seals along the bottom. Translate that energy to the screen.

### Sample copy (good)
- Eyebrow: `CAPABILITIES`
- H1: **Enterprise Information Management for the federal mission.**
- Subhead: Ivyhill partners with U.S. federal, state, local, and commercial clients to develop applications, manage records, secure infrastructure, and accelerate document conversion at agency scale.
- CTA: **Request a capabilities statement** · **View past performance**
- Strip: `ISO 9001:2015 · ISO/IEC 20000-1:2018 · ISO/IEC 27001:2022 · MBE · DBE · SBE · NAICS 541511, 541512, 541513, 541519, 541611, 518210, 561410`

### Sample copy (avoid)
- ~~"Let's transform your business together! 🚀"~~ — wrong audience, wrong register, emoji.
- ~~"Empowering organizations to thrive in a digital-first world."~~ — vague, hype-laden, no capability anchor.
- ~~"Hi! We're Ivyhill 👋"~~ — small-consultancy register; this firm sells to GS-15s.

---

## VISUAL FOUNDATIONS

### Colors
- **Primary brand:** Ivyhill Green `#80B941`. Used as a **accent**, not a wash. Reserved for: the logo mark, primary CTA fills, key-figure highlights, and 1-px accent rules. **Never** use as a full-bleed page background — that reads small-business / nonprofit. Tinted surfaces use `--ivy-green-50` (`#F7FBF0`) sparingly.
- **Ink (neutrals):** A near-black-on-cool-gray scale (`--ink-50` through `--ink-1000`). Carries 90% of the surface area.
- **Steel:** Deep navy (`--steel-800` `#16263D`) for inverse panels, footer, and "authority" sections (past performance, certifications strip).
- **Semantic colors are conservative:** `--status-success` is a darker compliance-green (`#2F7A2F`), distinct from the brand green so the brand doesn't read as "success." `--status-info` is gov-blue.
- **No bluish-purple gradients.** No rainbow accents. No pastels.

### Typography
- **Inter Variable** for everything. Bold/Semibold for headings; Regular/Medium for body.
- **Display H1** uses `clamp(32px, 3.4vw, 44px)` — restrained for a federal-services firm. We don't go to the 80–120px hero type that consumer brands use.
- **Eyebrow labels** (uppercase, tracked `0.14em`, 12px, semibold) above section headings — this is the system's signature and echoes the small-caps of capability statements.
- **Tabular figures (`font-variant-numeric: tabular-nums`)** in any data table (NAICS code lists, contract numbers, certification numbers).

### Backgrounds
- **Default:** white (`--bg-page`). **Most surfaces are flat white.**
- **Section alternation:** white → `--bg-subtle` (`#F9FAFB`) → white. Optionally one steel-navy section per page (e.g. footer or past-performance band) for solemnity.
- **Brand-soft wash** (`--ivy-green-50`) used at most once per page, e.g. behind a stat callout.
- **No hand-drawn illustrations. No friendly stock photography.** Imagery is restricted to: real client/agency logos (monochrome), real product/service screenshots, and architectural/server/government-facility photography rendered cool-toned and slightly desaturated.
- **No repeating patterns or textures**, with one exception: a faint 1-px hairline grid (`rgba(11,18,32,0.04)`) on hero sections is acceptable.
- **Gradients:** sparingly, and only ink→steel (e.g. `linear-gradient(180deg, #0E1A2B, #0B1220)`) on inverse panels. Never green gradients, never multi-hue.

### Animation & motion
- **Brisk and subtle.** `--dur-base: 180ms`; `--ease-standard` is a near-linear ease-out.
- **Fades and 4–8px translates only.** No bounces, no overshoot, no parallax.
- **Reduce-motion respected:** all transitions wrap in `@media (prefers-reduced-motion: no-preference)`.

### Hover states
- Primary buttons: background goes from `--ivy-green-500` to `--ivy-green-600`. No scale change.
- Secondary/ghost buttons: background fills from transparent → `--bg-muted`. Border stays.
- Cards / clickable panels: border darkens from `--border-1` to `--border-2`; shadow goes from none → `--shadow-1`. **No lift / translate.** This is a federal aesthetic, not a consumer one.
- Links: color shifts from `--ivy-green-700` → `--ivy-green-600`; underline thickens from 1px → 2px.

### Press states
- Primary CTAs: background goes to `--ivy-green-700`, no transform.
- Cards: shadow returns to none, background tints to `--bg-muted`.
- **Never use scale-down.** It reads consumer-app.

### Focus states
- 3px outer ring at `rgba(128, 185, 65, 0.35)` (`--focus-ring`). 2px gap from element. Visible on every interactive element.

### Borders & rules
- Default border: `1px solid var(--border-1)` (`#E5E7EB`).
- Strong border: `1px solid var(--border-2)` (`#D1D5DB`) — used on form inputs, cards.
- **Hairline rules** (`1px solid var(--ink-900)`) used as **section starters** in editorial layouts — a strong horizontal line above an eyebrow label, document-style.
- **Brand accent rule:** 2px green left border on past-performance pull-quotes only. (Used very sparingly to avoid the "rounded card with colored left-border" trope.)

### Shadow system
- **Three-tier, restrained.** `--shadow-1` (subtle), `--shadow-2` (cards on scroll), `--shadow-3` (modals only).
- **Inner shadows** (`--shadow-inset`) used on form inputs and inset stats panels.
- Most surfaces have **no shadow at all** — borders carry the structure.

### Cards
- **Flat, bordered, square-ish corners.** `border-radius: var(--r-md)` (4px). White background, 1px border, no shadow at rest, `--shadow-1` on hover.
- Padding: 24–32px (`--sp-5` to `--sp-6`).
- **Never** rounded `12px+` with a colored left border — this trope is banned.

### Corner radii
- 0px or 2px: data tables, eyebrow chips, hairline elements.
- **4px (default):** cards, inputs, buttons.
- 6px: modals, large panels.
- Pill (`999px`): only for capability-tag chips and a single primary CTA style.

### Transparency & blur
- **Almost never.** A sticky header may use `backdrop-filter: blur(8px)` over `rgba(255,255,255,0.85)` on scroll — that's the only sanctioned use.
- No frosted-glass cards. No translucent overlays except modal scrim (`rgba(11,18,32,0.55)`).

### Imagery treatment
- **Cool-toned, slightly desaturated** (saturate ~85%). Light grain acceptable on hero photography only.
- **Black & white** for client/agency logo strips.
- **No warm filters, no vignettes, no sepia.**
- **No people-stock-photography close-ups smiling at the camera.** If people appear, they are mid-task in a real environment, framed wide.

### Layout rules
- **Max width 1280px** for marketing surfaces; **880px** for prose / capability-statement-style pages.
- **24px gutter**, **8pt spacing scale** (with 4pt half-step). Generous vertical rhythm: section padding 96–128px on desktop.
- **Sticky elements:** the top header on scroll, plus a thin progress strip on long capability-statement pages — that's it.
- **Asymmetric grids OK** (e.g. 7-col / 5-col split for hero) but **avoid diagonal slices, decorative angles, or off-grid floating elements**.

---

## ICONOGRAPHY

### Brand marks (in `assets/`)
- **`logo-horizontal-2c.png`** — primary horizontal lockup. Use on white or very light backgrounds. Min width 140px.
- **`icon-color-large.png` / -medium / -small / -xsmall** — the "iT" monogram inside a circle. Use as favicon, social avatar, app launcher, and at small sizes where the wordmark is illegible.

### Iconography approach
- **Line icons, 1.5–2px stroke, square caps, no rounded terminals.** This matches the Leidos/CACI register.
- **No emoji.** No flat-color illustrated icons. No skeumorphism.
- **No SVGs hand-drawn by the design system itself** — we use a real, professional icon set.

### Icon set: **Lucide** (CDN-linked)

We standardize on **Lucide** (https://lucide.dev) — a Feather-derived line set with a 1.5–2px stroke and a clean, federal-IT-friendly silhouette. Loaded via CDN on any page that needs icons:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

**Note / FLAG:** This is a substitute. Ivyhill's previous site used Font Awesome (per LeadIQ tech-stack data). Lucide has a more modern, federal-document-friendly silhouette than Font Awesome's mixed-style set — we recommend Lucide going forward, but if Ivyhill prefers to stay on Font Awesome for continuity, the swap is one CDN line. **Please confirm.**

### Allowed iconography exceptions
- **Agency seals** (DoL, DoJ, ICE, NIH, Air Force, Army) — used in past-performance strips. These are not available in this design system; production must source them from agency public-affairs offices and respect each agency's brand guidelines (most are public domain as USG works, but some have usage restrictions).
- **Certification badges** (ISO 9001/20000/27001, MBE/DBE/SBE seals) — sourced from issuing bodies; used as image marks, not redrawn.

### Unicode / glyphs
- Not used as icons. Em-dash (`—`), en-dash (`–`), and section sign (`§`) used in editorial typography only.

---

## CAVEATS / OPEN QUESTIONS

1. **Wordmark typeface unknown.** "IVYHILL" in the logo is set in a heavy condensed sans (likely a custom or proprietary face — not Inter). For body and UI we use Inter; for any layout that needs the wordmark, we use the **logo PNG** rather than typesetting "IVYHILL" in Inter Bold. **Please supply the wordmark font** if available.
2. **Icon set substituted.** Ivyhill's prior site used Font Awesome; we recommend Lucide. **Confirm preference.**
3. **Agency seals not bundled.** Production usage requires sourcing each from the agency's public-affairs office.
4. **No screenshots of the live site were imported** — descriptions of the prior site were used to establish what we are *moving away from*. If you'd like the new system tuned closer to the live site's structure (rather than the federal-IT-firm aesthetic), let us know.
