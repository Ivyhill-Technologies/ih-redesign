# Service Page Buttons

_Started 2026-04-25 21:02 UTC_

---

## User

Regenerate "Service page template (Infrastructure Support)": make sure the buttons are in line with the button styling

## Assistant

I'll check the current button styling in the design system and align the service page template's buttons.

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

The buttons in the service template already use the `.btn .btn-primary` and `.btn .btn-secondary` classes, which is correct. Let me check the other service template pages and the main index to see how they consistently style buttons — particularly looking for any mismatched buttons in the file.

_[tool: grep]_

_[tool: grep]_

Let me check how the homepage and other pages style buttons (since the homepage doesn't use .btn classes, it might use a different approach).

_[tool: grep]_

_[tool: grep]_

I see — the homepage Header has the CTA button with an arrow icon (`<Icon.Arrow size={14}/>`) inside, and the hero buttons also have arrow icons. The service template buttons are bare. Let me align them: add arrow icons to match the home page styling, and make sure they use the same exact pattern.

_[tool: read_file]_

Now I'll update the buttons to include the arrow icon (using inline SVG since this is plain HTML, not JSX) to match the homepage's button styling pattern.

_[tool: str_replace_edit]_

_[tool: snip]_

Buttons now match the homepage pattern: `.btn .btn-primary` with the trailing arrow icon on the header CTA and the primary hero CTA, and `.btn .btn-secondary` (no icon) for the outlined view-past-performance button.

_[tool: done]_

Aligned the service template buttons with the homepage button styling — header "Capability statement" and hero "Contact Ivyhill" now use `.btn .btn-primary` with the trailing arrow icon (matching `Header.jsx` and `Hero.jsx`); the secondary CTA stays `.btn .btn-secondary`, no icon.

## User

Regenerate "Service page template (Infrastructure Support)": we need to make sure the buttons on this are all following the button guidelines below. please make a note of that so we always are using the correct colorscheme

## Assistant

Let me check the buttons file/spec for guidelines and look at the current state of the template.

_[tool: list_files]_

_[tool: grep]_

_[tool: list_files]_

Let me see what's at the project root and find the button guidelines.

_[tool: list_files]_

_[tool: grep]_

Let me read the relevant docs:

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

Got the full button spec. Let me check the current state of the template buttons and audit any other clickable items that should be styled correctly.

_[tool: grep]_

_[tool: snip]_

Buttons in the file already follow the spec:
- Header CTA → `.btn .btn-primary` (steel-800) ✓
- Hero primary → `.btn .btn-primary` (steel-800) ✓
- Hero secondary → `.btn .btn-secondary` (white outline) ✓
- No accent (deep-green) buttons used — under the 1-per-page max ✓

What's missing is a **prominent button-guidelines reference block** in the file's how-to comment so future page authors don't drift. Let me beef up the existing STYLE RULES block to inline the full button spec, and also expand the inline comment next to the CTAs.

_[tool: str_replace_edit]_

Now let me also persist the rule into the HOW_TO_ADD_A_PAGE.md so it's enforced for every new page, then verify:

_[tool: read_file]_

_[tool: snip]_

Let me also add an explicit "Buttons" reference section to HOW_TO_ADD_A_PAGE.md so the rule is enforced everywhere, not just inside the template comment.

_[tool: str_replace_edit]_

Audit summary:
- Header CTA: `.btn .btn-primary` ✓
- Hero CTAs: `.btn .btn-primary` + `.btn .btn-secondary` ✓
- No accent (deep-green) buttons used — well under the 1-per-page max ✓
- No inline-color overrides on buttons ✓

Now persisted in two places so we always use the correct colorscheme: an expanded BUTTON GUIDELINES block at the top of the template HTML, and a new Button rules table in `HOW_TO_ADD_A_PAGE.md`.

_[tool: done]_

All buttons in the template comply with the system: `.btn-primary` (steel-800) for the header CTA and primary hero CTA, `.btn-secondary` (white outline) for the paired alt — no accent green used, no inline color overrides. The button guidelines (variant table + "never use #80B941 as a fill", "one .btn-accent per page max", "no inline overrides") are now permanently noted in two places so future pages stay aligned: the comment header inside the template HTML, and a new **Button rules** table in `HOW_TO_ADD_A_PAGE.md`.

