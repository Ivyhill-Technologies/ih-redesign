---
name: ivyhill-design
description: Use this skill to generate well-branded interfaces and assets for Ivyhill Technologies, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a federal-IT-services aesthetic in the family of Leidos / CACI / ECS Federal / Steampunk.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Core rules at a glance (read README.md for full detail)
- **Brand color** is Ivyhill Green `#80B941` — used as a *accent*, never a wash. Most surface area is white + ink-scale neutrals.
- **Typography** is Inter Variable. Bold/Semibold for headings, Regular for body. Restrained sizes — federal-document scale, not landing-page scale.
- **Aesthetic reference:** Leidos, CACI, ECS Federal, Steampunk. Avoid: nonprofit, community-org, small-consultancy. **No emoji. No bluish-purple gradients. No friendly stock illustrations.**
- **Voice:** authoritative, third-person, capability-forward. Lead with certifications, contract vehicles, agency client names, NAICS codes.
- **Iconography:** Lucide line icons (1.75px stroke) via CDN. Brand mark and logo are in `assets/`.
- **Tokens** live in `colors_and_type.css`. Import this in any new artifact.
