# Contracts Page Redesign

_Started 2026-04-25 20:54 UTC_

---

## User

i need a page for contracts 

https://www.ivyhilltech.com/contract-vehicles/

this is the current page, on my site, can you use the new design system we have to make a page for contracts?

## Assistant

I'll fetch the current contracts page to understand what content needs to be on the new page, and explore the design system in parallel.

_[tool: list_files]_

_[tool: web_fetch]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: web_fetch]_

Let me fetch the actual contracts page and look at the existing UI kit.

_[tool: read_file]_

_[tool: read_file]_

_[tool: web_fetch]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: web_fetch]_

_[tool: snip]_

_[tool: web_search]_

I have enough info to build this. Let me set up the contracts page.

_[tool: list_files]_

_[tool: list_files]_

_[tool: copy_files]_

The header references `../../assets/logo-horizontal-2c.png` and the footer too — but in `contracts/` the assets live at `assets/`. I need to fix paths and adjust styles.css imports. Let me update them.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

Now let me build the contracts page. I'll create dedicated components for the contract content.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Now the App and main HTML:

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Built `contracts/Contracts.html` — a federal-register Contracts page with:

- **Hero** with eyebrow + hairline-grid bg, "at a glance" record card (CAGE/UEI/DUNS/8(a) entry)
- **Vehicle index** — tabular row per vehicle (kind, name, contract no., period, ceiling) anchoring to detail sections
- **Five vehicle detail sections** (STARS III, GSA MAS IT, NIH CIO-SP4, NxG SeaPort, 8(a) Sole-Source) — each with scope, "why agencies use it" grid, navy "How to order" steps, and a sticky right-rail contract record
- **8(a) band** — solemn navy section featuring the $4.5M sole-source ceiling
- **Set-asides + NAICS** — paired tables (designations w/ issuing authority + NAICS w/ primary-code highlights)
- **Compliance strip** — ISO 9001 / 20000-1 / 27001 + CMMC L2
- **Contact block** — contracting POC + small-business liaison cards

All on the design system: tabular figures for contract numbers, hairline rules above eyebrow labels, square-cornered flat cards, no green washes, monospace for codes, Steel-900 for the inverse "How to order" panels.

Caveats: contract numbers, periods, and ceilings are realistic placeholders — please replace with Ivyhill's actual contract record data before publishing.

