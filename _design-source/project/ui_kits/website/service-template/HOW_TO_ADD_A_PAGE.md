# How to add a new service page

A step-by-step for someone who's never touched code. **You do not need to know React.** Service pages are plain HTML — you're filling in blanks in a template, not writing code.

---

## What you have right now

```
ui_kits/website/service-template/
├── index.html         ← the worked example (Infrastructure Support)
└── (you'll add)       ← new service pages live here
```

Each new service is **one HTML file** in this folder. The template has 8 spots to edit, each marked with `✏️ EDIT`. That's it.

---

## The process — 5 steps

### Step 1 · Copy the template

In the file browser, find `ui_kits/website/service-template/index.html` and **make a copy**. Rename the copy to match the service. Use these exact names (the dropdown navigation already points at them):

| Service | Filename |
|---|---|
| Data Analytics | `data-analytics.html` |
| Application Development | `application-development.html` |
| Information Management | `information-management.html` |
| Records Management | `records-management.html` |
| Queue Management | `queue-management.html` |
| ~~Infrastructure Support~~ | (already done — it's `index.html`) |

Put the new file in the **same folder** as `index.html` (i.e. `ui_kits/website/service-template/`).

> **Why these exact filenames?** The "Capabilities" dropdown in the header already has links pointing to these names. If you spell the file something different, the dropdown will 404 (page-not-found) when someone clicks it.

---

### Step 2 · Gather your content

Before opening the file, write out (in a text doc or notebook) what's going to fill each blank. The template has **8 edit zones**. Here's what each needs:

| # | Zone | What to write |
|---|---|---|
| 1 | Page title | `<Service> — Ivyhill Technologies` (e.g. `Data Analytics — Ivyhill Technologies`) |
| 2 | Hero | Eyebrow label, one big headline (≤12 words), one sentence lede (≤35 words) |
| 3 | At-a-glance card | 6 short label/value pairs (e.g. `Stack: Power BI`, `Delivery: Cleared personnel`) |
| 4 | Summary strip | 5 short keyword groups (e.g. `Reporting: Dashboards · Scorecards`) |
| 5 | Capabilities | Section H2, lede, then 4 capability cards (each: title, paragraph, 3 tags) |
| 6 | Use cases | Section H2, lede, then 4 bullets (each: bold one-liner + outcome) |
| 7 | Past performance | Agency abbreviation (USAF, DOJ, etc.), agency full name, scope, pull quote, attribution |
| 8 | Related services | 3 sibling capabilities — link to their pages |

I recommend filling out a content brief first, **then** going to the file. Trying to write copy *while* editing HTML is where mistakes happen.

**Voice rules** (from `service_page_kit.md`):
- Lead with the federal mission — say "federal, state, and local agencies" somewhere in the lede.
- Bullets are full sentences ending with a period.
- Spell out acronyms first time (NARA, ATO, FedRAMP), then acronymize.
- Don't name vendors in marketing prose. Say "defense-in-depth," not the product name.
- No "we'll partner with you to…" SaaS phrasing. Use "Ivyhill delivers…"

**Button rules** (always — never hand-roll button colors):
All buttons use `class="btn"` plus exactly one variant. Do **not** add inline `style="background:…"` to buttons. The variants and where to use them:

| Variant | Use it for | Color (do not change) |
|---|---|---|
| `.btn-primary` | Default CTA — "Contact Ivyhill", "Capability statement" | Steel-800 `#16263D`, white text |
| `.btn-secondary` | Paired alt CTA — "View past performance" | White, 1px `#D1D5DB` border, ink-900 text |
| `.btn-ghost` | Tertiary link-style action only | Transparent, hover bg `#F3F4F6` |
| `.btn-accent` | **Reserved.** ONE per page max, terminal action only (e.g. submit form) | Deep green `#4F7A22`, white text |
| `.btn-dark` | Light card on a dark section (rare) | Steel-900 `#0E1A2B`, white text |

Hard rules:
- **Never** use brand green `#80B941` as a button fill — that color is logo + 1–2px accent rules only.
- **One** `.btn-accent` button per page, maximum. The default service page has zero.
- Keep the trailing arrow icon (`→`) on `.btn-primary` CTAs that lead off-page; omit it on `.btn-secondary`.
- If a design seems to need a new button color, the answer is almost always `.btn-primary`.

---

### Step 3 · Open the file and find the edit markers

Open your new HTML file. Press **Cmd-F** (Mac) or **Ctrl-F** (Windows) and search for:

```
✏️
```

That pencil emoji appears at every spot you need to edit. There are 8 main blocks — work through them in order, top to bottom.

You'll see comments like this throughout the file:

```html
<!-- ✏️ EDIT 2 — HERO
     Change: breadcrumb (last segment), eyebrow label, H1 headline, lede.
     Rules: H1 ≤ 12 words. Lede ≤ 35 words. Buttons stay as-is.
-->
```

The instructions are right there, inline. Just follow them.

> **Important:** Things marked `🔒 KEEP` should NOT be touched. That's the header, dropdown navigation, footer, and the cybersecurity section — they're identical on every service page on purpose. If you change them on one page, the site stops feeling consistent.

---

### Step 4 · Edit the content

For each `✏️` zone, swap **only the words between the tags**, not the tags themselves. Example:

**Before:**
```html
<h3>Operations &amp; Maintenance (O&amp;M)</h3>
<p>Software, servers, and networking kept running...</p>
```

**After (for Data Analytics page):**
```html
<h3>Reporting &amp; Dashboards</h3>
<p>Executive-ready reports and operational dashboards...</p>
```

The `<h3>` and `<p>` tags stay. Only the **text between them** changes.

**Special characters** — if your text has these, use the codes instead:
- `&` → write `&amp;`
- `<` → write `&lt;`
- `>` → write `&gt;`

(The em-dash `—`, ellipsis `…`, and curly quotes `" "` work as-is.)

---

### Step 5 · Open the file in the preview

Once saved, open your new HTML file (e.g. `ui_kits/website/service-template/data-analytics.html`) in the preview pane. Check:

- ✅ The page title in the browser tab matches the service
- ✅ Header looks identical to other pages (same nav, same dropdown)
- ✅ Hero headline reads well, isn't broken across odd lines
- ✅ At-a-glance card has 6 entries, no empty cells
- ✅ Capability cards are 4 (or 6 if you went bigger)
- ✅ Use cases are 4 bullets
- ✅ Past performance shows the right agency
- ✅ Related services links go to OTHER services (not the current one)
- ✅ Footer matches other pages
- ✅ Hover the "Capabilities" link in the header — the dropdown should appear and your new page should be one of the six options

If something looks off, jump back to the file, find the `✏️` block that controls that section, and tweak.

---

## Common gotchas

**My page doesn't appear when I click the dropdown.**
The filename probably doesn't match what the dropdown expects. Filenames must be **lowercase with hyphens**, e.g. `data-analytics.html` — not `DataAnalytics.html` or `Data_Analytics.html`.

**I broke the layout — everything looks weird now.**
You probably deleted a closing tag (e.g. `</div>`) by accident. Easiest fix: close the file without saving, reopen it from the template, and try again — copy your text in piece by piece.

**The icon doesn't fit my capability.**
Scroll to the **bottom of the file** — there's an Icon Library comment listing 14 SVG paths (server, shield, cloud, headset, code, phone, database, bar-chart, folders, archive, scan, users, check, arrow). Copy the path string from there and paste it into the `<svg>` for that capability cell, replacing whatever's in there.

**I want 6 capabilities instead of 4.**
In the `EDIT 5` zone, find `class="cap-grid"` and look at the CSS at the top of the file — the grid is `repeat(2, 1fr)`. Change it to `repeat(3, 1fr)` and add two more `<div class="cap-cell">…</div>` blocks below the existing four.

**I want to change the colors / fonts / spacing.**
Don't. Those are defined in `service_page_kit.md` and live in `../styles.css`. Changing them on one page breaks consistency with the others. If you really need a tweak, talk to me — there's almost always a content solution that's better than a style change.

---

## What about React?

The **homepage** (`ui_kits/website/index.html` + the `.jsx` files) uses React. Service pages don't — they're pure HTML. So:

- **Homepage edits** — talk to me, I'll handle the React.
- **Service page edits** — you can do these yourself with this guide.

The two are deliberately split this way so you have an easy on-ramp without needing to learn React.

---

## When to ask for help

- Adding a new section type that doesn't exist in the template (e.g. a pricing table, a video embed, a contact form)
- Changing colors, fonts, spacing, or anything in the design system
- Editing the header dropdown to add/remove services
- Anything that requires touching `🔒 KEEP` zones
- Anything that breaks and you can't figure out why

For all of those: just tell me what you want and I'll handle it.

For the routine "fill in a new service page from the template" task — you've got this. The template was built so that this work doesn't need a developer.
