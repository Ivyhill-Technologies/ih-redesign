# Service-Page Kit — Ivyhill

A paste-ready reference for designing **service detail pages** (e.g. Infrastructure Support, Application Development, Records Management). Drop this into any new sketch, doc, or working file and you have everything needed to lay out a new service page that matches the system.

The companion working file is `ui_kits/website/service-template/index.html`, which renders these specs with **Infrastructure Support** as the populated example.

---

## 1 · Foundations

### Color tokens

| Role | Hex | Notes |
|---|---|---|
| Brand green (mark, accent rules only) | `#80B941` | **Never** as button fill. Reserved for the logo and 1–2px accent rules. |
| Deep green (reserved CTA) | `#4F7A22` | One decisive button per page max — submit, capability statement download. |
| Steel · 800 (primary buttons, dark panels) | `#16263D` | Default `.btn-primary`. |
| Steel · 700 (primary hover) | `#1F3556` | |
| Steel · 900 (footer, deep panels) | `#0E1A2B` | |
| Ink · 1000 (display H1) | `#0B1220` | |
| Ink · 900 (body headings) | `#111827` | |
| Ink · 600 (secondary body) | `#4B5563` | |
| Ink · 500 (tertiary, captions) | `#6B7280` | |
| Ink · 300 (strong borders) | `#D1D5DB` | Form inputs, cards. |
| Ink · 200 (default borders) | `#E5E7EB` | |
| Ink · 100 (muted surfaces) | `#F3F4F6` | |
| Ink · 50 (page wash) | `#F9FAFB` | Section alternation. |
| White (default surface) | `#FFFFFF` | |
| Status · success (compliance) | `#2F7A2F` | NOT brand green. |
| Status · info (gov blue) | `#1F4E79` | |
| Status · warning | `#B8860B` | |
| Status · danger | `#9B2C2C` | |

### Typography

- **Family:** Inter Variable (single family for everything). `--font-sans`.
- **Mono:** ui-monospace for codes (NAICS, contract numbers).
- **Weights used:** 400 (body), 500 (medium), 600 (semibold — most headings, buttons), 700 (display H1 only).

| Token | Size | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| Display | clamp(40, 5vw, 64) | 1.05 | 700 | -2% | Hero H1 only |
| H1 | clamp(32, 3.4vw, 44) | 1.15 | 700 | -1% | Page title, in-page H1 |
| H2 | clamp(24, 2.4vw, 32) | 1.15 | 600 | -1% | Section headers |
| H3 | 20 | 1.3 | 600 | 0 | Card titles |
| H4 | 17 | 1.3 | 600 | 0 | Sub-titles |
| Body | 16 | 1.55 | 400 | 0 | Default prose |
| Small | 14 | 1.55 | 400 | 0 | Helper text, table cells |
| Caption | 12 | 1.4 | 400 | 0 | Footnotes, image attribution |
| Eyebrow | 12 | 1 | 600 | +14% UPPERCASE | Section labels above headings |
| Mono | 13 | 1.5 | 400 | +2% | Codes, identifiers |

**Rule:** Every section starts with an eyebrow label (`CAPABILITIES`, `USE CASES`, `PAST PERFORMANCE`) above a 1-px hairline rule in `--ink-900`. This is the system's signature — it's the document-style cue that anchors the federal-IT register.

### Spacing scale (8pt base, 4pt half-step)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

- **Section padding (desktop):** 96px top/bottom (`--sp-9`)
- **Card padding:** 24–32px
- **Gutter / container padding:** 24px
- **Max content width:** 1280px (marketing); 880px (prose)

### Radii

- 0 — data tables, hairline elements
- 2 — chips, ISO badges
- **4 — DEFAULT.** Cards, inputs, buttons.
- 6 — modals, large panels
- 999 — pill (single CTA only)

### Shadows

| Token | Value | Use |
|---|---|---|
| --shadow-1 | `0 1px 2px rgba(11,18,32,.06), 0 1px 1px rgba(11,18,32,.04)` | Subtle / hover |
| --shadow-2 | `0 2px 4px rgba(11,18,32,.06), 0 4px 12px rgba(11,18,32,.06)` | Cards on scroll |
| --shadow-3 | `0 4px 12px rgba(11,18,32,.08), 0 12px 32px rgba(11,18,32,.08)` | Modals only |
| --shadow-inset | `inset 0 0 0 1px rgba(11,18,32,.06)` | Inputs, stat panels |

**Most surfaces have NO shadow.** Borders carry the structure.

---

## 2 · Buttons

| Variant | BG | Hover | Color | Use |
|---|---|---|---|---|
| **Primary** | `#16263D` (steel-800) | `#1F3556` | white | Default action: "Contact Ivyhill" |
| **Secondary** | white, 1px `#D1D5DB` border | bg `#F3F4F6`, border `#9CA3AF` | `#111827` | "View past performance" |
| **Ghost** | transparent | bg `#F3F4F6` | `#111827` | Tertiary link-style action |
| **Accent** | `#4F7A22` (deep green) | `#3F6019` | white | **Reserved.** One per page max — final-step CTA. |

Padding: `11px 18px` default. Font: Inter 600, 14px. Radius: 4px. Pill (`999px`) only for the single hero CTA. Focus ring: 3px `rgba(128,185,65,0.35)`.

---

## 3 · Reusable component patterns

These are the building blocks for any service page. The template assembles them in the prescribed order.

### A — Service hero
- Asymmetric 7/5 split (content / glance card)
- Eyebrow label + 24px hairline above the H1
- Display H1 (`clamp(40,5vw,68px)`, weight 700, tracking -2.5%)
- Lede 18/28, max-width 620, color `--fg-3`
- Two CTAs: `.btn-primary` ("Contact Ivyhill") + `.btn-secondary` ("Capability statement")
- Right-side **glance card**: bordered, 24px padding, no shadow at rest. Two-column dl: label (eyebrow style) over value (18/600 ink-1000, tabular nums).

### B — Capability summary strip
- Full-width, `--bg-subtle` background, 1px borders top + bottom
- 5-column grid of label → mono value (e.g. `O&M`, `Cloud`, `Help Desk`, `Cyber`, `Hybrid`)

### C — Capability detail cards
- 2 or 3 column grid with **1px gap, 1px outer border** (the gap *is* the divider — looks like a printed table)
- Each cell: 32px padding, white background, line icon at top, H3 title, body copy, optional capability tags row (mono, tiny, dot-separated)
- Hover: top edge gets a 2px green accent (`#80B941`); no shadow, no lift

### D — Use cases band
- 2-column: H2 "Where this lives in practice" + lede on left, 4–6 use-case bullets on right
- Each bullet: small line icon + bold one-line use case + 1-line outcome

### E — Past performance excerpt
- One agency badge (steel-navy plate w/ abbreviation) + name + 1-line scope
- Optional accent pull-quote card: white, 1px border, **2px green left border** (`#80B941`), display-font quote, mono attribution line

### F — Cyber callout (shared module)
- This block is identical across all service pages — defense-in-depth posture, ISO 27001 backed, NIST-aligned playbooks
- 2-column: prose left + 2x3 feature checklist right (gap-1px grid pattern)

### G — Related services
- Steel-navy band, 3-column grid of links to other service pages
- Each link: tiny eyebrow + service name (white, 600) + 1-line scope (rgba(255,255,255,0.7))

### H — Footer (shared)
- Lifted unchanged from homepage `Footer.jsx`

### Header (shared, fixed)
- 4 nav links exactly: **Capabilities · Past performance · Contracts · About**
- Single CTA: **Capability statement** (`.btn-primary`, steel-800)
- No sign-in, no account button — this is a marketing site, not an app shell
- Active link gets a 2px `--ivy-green-500` underline; others are `--fg-2`

---

## 4 · Service-page information architecture (FIXED)

Every service page uses this order. **Don't deviate.** Consistency is what makes the section feel like a system.

```
1. Header (shared)
2. Hero — service name, lede, glance card
3. Capability summary strip — 5 keywords from the service's scope
4. Capability detail cards — 4 to 6 scoped capabilities
5. Use cases band — 4 to 6 bullets
6. Past performance excerpt — 1 agency, 1 quote
7. Cyber callout (shared, no edits)
8. Related services (steel band, links to peer service pages)
9. Footer (shared)
```

---

## 5 · Service-page content brief (template)

When you ask me to build a new service page, paste this filled in:

```yaml
service_name: "Application Development"
slug: "application-development"
hero:
  eyebrow: "Custom software"
  h1: "Mission applications, built for federal scale."
  lede: "Cross-platform and Microsoft Power Platform applications for U.S. federal, state, and local agencies — delivered against ISO-certified processes by cleared personnel."
glance_card:
  - label: "Stack"          ; value: "Power Platform"
  - label: "Delivery"       ; value: "Cross-platform"
  - label: "Personnel"      ; value: "Cleared"
  - label: "Posture"        ; value: "Defense-in-depth"
  - label: "Quality"        ; value: "ISO 9001"
  - label: "Sec mgmt"       ; value: "ISO 27001"
summary_strip: ["Power Platform", "Mobile", "Cross-platform", "Modernization", "Custom"]
capabilities:
  - icon: "Code"
    title: "Microsoft Power Platform"
    body: "Power Apps, Power Automate, Dataverse — line-of-business apps without long custom-code lead times."
    tags: ["Power Apps", "Automate", "Dataverse"]
  - icon: "Phone"
    title: "Mobile applications"
    body: "Native and cross-platform mobile apps for field-staff workflows and agency-public engagement."
    tags: ["iOS", "Android", "React Native"]
  # ...4 to 6 total
use_cases:
  - icon: "Folders"
    headline: "Case management modernization"
    outcome: "Replace legacy forms with Power Apps + Dataverse; cut intake time by 60%."
  # ...4 to 6 total
past_performance:
  agency_abbr: "DoJ"
  agency_name: "Department of Justice"
  scope: "Case-management application development on Microsoft Power Platform."
  quote: "Ivyhill delivered our intake application on schedule and integrated cleanly with existing DOJ systems."
  attribution: "Past performance · DOJ · 2024"
related_services:
  - slug: "data-analytics"
    name: "Data Analytics"
    blurb: "Reporting and BI on the application data your team collects."
  - slug: "infrastructure-support"
    name: "Infrastructure Support"
    blurb: "Hosting, O&M, and help desk for the applications you ship."
  - slug: "information-management"
    name: "Information Management"
    blurb: "Records lifecycle for application-generated content."
```

---

## 6 · Voice rules — service pages specifically

- **Lead with the federal mission** — "for U.S. federal, state, and local agencies" appears in the lede.
- **Concrete capabilities, not metaphors.** "Hybrid cloud O&M" not "we make IT magic happen."
- **Bullets are full sentences ending with a period.**
- **Acronyms spelled out on first reference** (NARA, ATO, FedRAMP, ISMS), then acronymized.
- **No "we'll partner with you to…" SaaS phrasing.** Use "Ivyhill delivers…" or third-person past-tense outcomes.
- **No vendor names in marketing prose.** When tooling matters, abstract to "defense-in-depth," "Power Platform-class," "NIST-aligned." (See defense-in-depth precedent set in cyber copy.)
- **Past performance leads with the agency**, then the scope. Numbers (page counts, percentages) get tabular-num treatment.

---

## 7 · How to use this with me

1. **Pick a service** (Application Development, Records Management, Document Conversion, Queue Management, Information Management, Data Analytics — Infrastructure Support is already done).
2. **Paste the live URL** (`ivyhilltech.com/<slug>/`) **or** fill out the YAML brief in §5.
3. I'll clone `ui_kits/website/service-template/` to `ui_kits/website/service-<slug>.html`, swap content, and surface it for review.
4. Edits go through the same review-pane flow you've been using.

The chrome (header, hero shape, section rhythm, footer) never changes. Only the content blocks change. That's the point of the template.
