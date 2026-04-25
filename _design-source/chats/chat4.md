# Service page button fix

_Started 2026-04-25 21:37 UTC_

---

## User

on the Service page template (Infrastructure Support) the buttons are not following the button guidelines.

the header needs to be uniform across all pages please, and the button coloring on all pages is wrong

please use the button component guidelines

## Assistant

I'll investigate the design system's button guidelines and find the affected pages to fix.

_[tool: list_files]_

_[tool: list_files]_

I notice there's a service-template folder. Let me check that and existing assets in this project.

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

Now I have the canonical button & header guidelines. Primary buttons should be **steel-navy `#16263D`**, not green. Let me check the affected pages.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Now let me find what's wrong. The user says:
1. Service template buttons not following guidelines
2. Header should be uniform across all pages
3. Button coloring on all pages is wrong

Let me check the homepage Hero (it has `btn-accent` for NAICS — wrong, that's reserved). The Service template uses `btn-accent` is fine but service template's `cap-cell` border-top hover is `#80B941` — actually that's allowed as accent rule. Let me also look at App.jsx files and the styles.

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

Let me check what colors are actually in the CSS tokens to see if `var(--steel-800)` resolves correctly.

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: snip]_

Now I have a complete picture. Let me diagnose what's actually wrong:

**Issue 1 — Service template buttons:** The template uses `.btn .btn-primary` correctly, BUT the styles file is loaded via `href="../styles.css"` from inside `service-template/` subfolder. The path resolves to `ui_kits/website/styles.css` which DOES exist. **However** — the styles.css `.btn-primary` uses `var(--steel-800)` which is `#16263D` (correct).

Wait — let me re-look. The user said "the button coloring on all pages is wrong". Looking at the buttons preview (the canonical guide), buttons should be **steel-navy `#16263D`** for primary. The styles.css already has this correct. So what's wrong?

Let me check the App.jsx files and run the pages to actually see.

_[tool: read_file]_

_[tool: read_file]_

_[tool: snip]_

Let me load and examine the actual rendered service-template page to confirm what's wrong:

_[tool: show_html]_

_[tool: show_html]_

_[tool: snip]_

_[tool: save_screenshot]_

_[tool: view_image]_

**Found it.** The buttons are rendering **green** (`#80B941` brand green), not steel-navy as the guidelines specify. The CSS file claims `.btn-primary { background: var(--steel-800) }` (which is `#16263D`), but they're showing as green. That means the path resolution is failing or being overridden.

Let me check the CSS path. The service-template HTML loads `<link rel="stylesheet" href="../styles.css">` which resolves to `ui_kits/website/styles.css`. That file uses `@import url("../../colors_and_type.css")` — which from `ui_kits/website/styles.css` resolves to project root `colors_and_type.css`. Good. So `--steel-800: #16263D` should resolve.

Wait — let me eval to check what's actually happening:

_[tool: eval_js]_

Confirmed: `--steel-800` resolves to `#16263D`, but `.btn-primary` is rendering as green `rgb(128, 185, 65)` = `#80B941`. Something is overriding `.btn-primary`. Let me find it:

_[tool: eval_js]_

_[tool: snip]_

**Found the bug.** The actual loaded `styles.css` contains:
```
.btn-primary { background: var(--ivy-green-500); color: #fff; }
```

But the file I read showed `var(--steel-800)` — **the read tool returned cached/stale content** OR there's a different file being served. Let me re-read fresh:

_[tool: run_script]_

The disk file IS correct (uses `var(--steel-800)`). But the browser is loading a stale cached version that has `var(--ivy-green-500)`. The `<link href="../styles.css">` in the service-template HTML lacks a cache-bust query string. Both `index.html` and `Contracts.html` use `?v=3` and `?v=1` respectively.

Let me bump cache-bust on all three HTML files and also fix the homepage's misuse of `.btn-accent` for "NAICS codes" (should be `.btn-secondary` per guidelines — accent is reserved for one terminal CTA per page max).

Also for **uniform header**: the contracts/Header.jsx uses local `assets/` and the website Header.jsx uses `../../assets/`. Both look the same in markup. The service-template uses inline header HTML matching the website's. They're already structurally uniform. Let me verify by checking. Actually all 3 headers match — same logo, same nav links, same dropdown, same CTA. The user might be referring to the CTA button color (which IS broken — green instead of steel). Once we fix the cache, the headers will all look uniform.

Let me also re-check whether the contracts page renders correctly:

_[tool: show_html]_

_[tool: eval_js]_

The contracts page is rendering correctly (`#16263D` steel). So the contracts page is fine. The issue is **only** with the website (homepage + service-template) — they're loading a stale cached version of `ui_kits/website/styles.css`.

Let me check the homepage too:

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: snip]_

The homepage is rendering correctly (steel `rgb(22,38,61)`). The cache-bust `?v=3` worked there. So the **only broken page is the service-template** — it has `<link href="../styles.css">` with no cache-bust.

Also the homepage has a problem the user flagged: `<button className="btn btn-accent">NAICS codes</button>` in `Hero.jsx` — that violates the guideline ("ONE per page MAX, terminal action only"). NAICS codes is a section jump link, not a terminal action. Should be `btn-secondary`.

Let me fix:

1. **Service-template**: add cache-bust to `<link>` so the corrected CSS is fetched.
2. **Homepage Hero**: change the misused `btn-accent` → `btn-secondary` (per guidelines, accent is reserved).
3. **Header uniformity**: All three Headers (homepage React, contracts React, service-template inline HTML) already have matching markup. Once buttons render correctly, headers will look identical.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now let me also confirm the **header uniformity** issue. Looking at the three headers:

- **Website Header.jsx** (homepage): "Capabilities" link has the green underline (active state).
- **Contracts Header.jsx**: "Contracts" has the green underline (active).
- **Service-template inline header**: "Capabilities" has the green underline.

These are page-active states and *should* differ — that's correct. But there's a subtle problem: looking at the contracts/Header.jsx, the Capabilities link has `color: 'var(--fg-2)'` (muted), while the website Header.jsx has `color: 'var(--fg-1)'` (full ink) AND `borderBottom:'2px solid var(--ivy-green-500)'`. This means active styling differs slightly across pages. Let me unify the header active-state pattern — every page should highlight its own current section the same way.

Let me also verify by reloading the service-template:

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: snip]_

_[tool: view_image]_

Buttons now render in steel-navy `#16263D` per the guidelines. Now let me unify the header active-state styling between the contracts and homepage:

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Fixed three issues:

- **Service-template buttons rendered green** — the `<link>` to `styles.css` had no cache-bust query, so the browser kept serving an old version where `.btn-primary` was `var(--ivy-green-500)`. Bumped to `?v=4` so it now picks up the corrected `var(--steel-800)` (`#16263D`). All `.btn-primary`s on the page now match the spec.
- **Hero misused `.btn-accent` for "NAICS codes"** — guideline reserves accent for one terminal CTA per page. Switched to `.btn-ghost` so the section-jump link reads as a quiet tertiary action.
- **Header active-state inconsistent on Contracts page** — the Capabilities link had `color: var(--fg-2)` with no underline, making it visually different from the homepage/service header. Aligned styling so the three headers are uniform; only the active-page indicator differs (Contracts is the active link there).

