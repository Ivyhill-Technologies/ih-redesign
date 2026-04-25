# Ivyhill Website — UI Kit

A high-fidelity recreation of the **new** Ivyhill Technologies marketing website, designed to replace the previous illustration-heavy site with a restrained, federal-IT-firm aesthetic in the family of Leidos / CACI / ECS Federal / Steampunk.

## What's in here

- `index.html` — homepage demo (interactive click-thru)
- `App.jsx` — top-level homepage assembly
- `Header.jsx` — codes eyebar + nav + capability-statement CTA
- `Hero.jsx` — restrained type-led hero with hairline grid
- `CodesStrip.jsx` — ISO certifications + NAICS codes + MBE/DBE/SBE
- `CapabilityGrid.jsx` — 7 practice areas, line-icon cards
- `PastPerformance.jsx` — agency client roster (DoL, DoJ, ICE, NIH, Air Force, Army)
- `StatsBand.jsx` — steel-navy band of headline metrics
- `CyberCallout.jsx` — cybersecurity horizontal capability
- `Footer.jsx` — full footer with contact, certifications, contracts

## Notes

- Built against the project tokens in `../../colors_and_type.css`.
- Agency seals are **not bundled** — placeholders ("DoL", "DoJ" set in mono caps inside a square) stand in. Production must source seals from each agency's public-affairs office.
- Icons via Lucide CDN.
- The header CTA opens a fake "Capability statement requested" toast — pure cosmetic interaction, no real submission.
