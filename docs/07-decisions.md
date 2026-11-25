# 7. Decision log

Key technical decisions, the options considered, and why. New decisions
are added at the bottom.

---

### D1. Static prerendered site instead of WordPress

**Decision:** rebuild as React pages prerendered to static HTML
(`vite-react-ssg`), hosted on AWS Amplify.
**Alternatives:** keep WordPress; a headless CMS; a server-rendered app.
**Why:** no server to patch or pay for; far smaller attack surface; fast
pages from a CDN; content changes are reviewed and versioned like code.
**Trade-off:** content edits need a developer workflow instead of wp-admin.
Acceptable for a site whose content changes occasionally.

### D2. Contact form as a single Lambda + SES

**Decision:** one small Lambda with a public function URL, sending via SES.
Replaced an Amplify Gen 2 backend.
**Why:** simplest thing that works; no stored data; easy to reason about,
secure, and nearly free.
**Trade-off:** messages exist only in email. Intended: nothing to protect at rest.

### D3. Terraform for AWS resources, applied by a person

**Decision:** define backend resources in Terraform; CI runs `plan` only;
humans `apply`.
**Why:** reviewable, reproducible infrastructure without giving CI write
access to AWS.
**Trade-off:** applying is a manual step, documented in the release process.

### D4. Protected `main`, staging-first for risky changes

**Decision:** GitHub rulesets with no bypass on `main`; a password-protected
staging environment kept identical to `main`.
**Why:** production can't be changed by accident (including by AI
assistants); risky changes are seen before visitors see them.

### D5. Monitoring in Teams, not a separate dashboard

**Decision:** a daily health report and alarm cards posted to a Teams channel.
**Why:** alerts go where the team already is; no extra tool to check.
Failures of the reporter alarm by email, so silence is never "all clear".

### D6. Browser error logging to CloudWatch with two levels

**Decision:** `log.debug()` (console only) and `log.error()` (reported);
reports written as one JSON line each to CloudWatch Logs.
**Alternatives:** a third-party error tracker; a plain log file.
**Why:** no new vendor, script, or data processor (keeps the CSP strict and
the privacy story simple); structured lines are queryable.
**Note:** a Lambda has no persistent disk, so a literal `.log` file isn't
possible; `aws logs tail` gives the same experience.

### D7. Jira tickets via a signed-link Lambda, not prefilled Jira URLs

**Decision:** Teams buttons link to a Lambda that creates the issue through
the Jira API.
**Alternatives:** Jira's "create issue" URL with prefilled fields; the Jira
Cloud app for Teams.
**Why:** tested prefilled URLs on our team-managed project; descriptions
were truncated unpredictably. The API gives properly formatted tickets
(stack traces as code blocks, links) and one-click creation.
**Safeguards:** signed, expiring links; preview step; one ticket per link;
token scoped to creating issues.

### D8. Track the Jira token's expiry in code

**Decision:** store the expiry date in Terraform; the daily check opens a
Highest-priority renewal ticket at 14 days and fails daily from 7 days.
**Why:** the API can't report a token's own expiry, and an expired token
would break the buttons silently.

### D9. Cap browser-error cards at one per hour (global, not per page)

**Decision:** one Teams card per hour for browser errors, listing all
affected pages; the daily report counts errors by page.
**Alternative:** one card per hour per page.
**Why:** the page name comes from the (public, forgeable) report, so a
per-page cap could be bypassed by inventing page names, and per-page alarm
metrics would let an attacker run up costs. The global cap bounds spam; the
daily count ensures nothing is missed.

### D10. Dependabot with grouped updates

**Decision:** weekly grouped updates; packages that must move together
grouped; majors separate and staged.
**Why:** stay current with security fixes even when nobody is actively
working on the site, without a flood of pull requests.

### D11. Biome as the only formatter and linter

**Decision:** Biome instead of Prettier + ESLint.
**Why:** one fast tool, one config; CI runs its linter.
