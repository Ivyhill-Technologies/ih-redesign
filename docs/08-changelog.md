# 8. Changelog

Releases to production, newest first. Numbers are GitHub pull requests.

## Unreleased

- Unit tests for the contact form rules and the contact Lambda, run in CI
- Hero's rotating text respects the OS "reduce motion" setting
- README: live link and screenshot

## 2026-11-25: Monitoring, Jira integration, security hardening

**Error logging and alerting**
- Browser error logging: `log.debug()` / `log.error()`; uncaught errors and
  contact form failures reported to CloudWatch (#23)
- Teams alert cards for browser errors, capped at one per hour (#23)
- "Create Jira ticket" buttons on alarm cards and failing daily checks;
  signed, expiring links; one ticket per link (#23)
- Jira token expiry tracking with automatic Highest-priority renewal ticket (#23)
- Daily site health report in Teams at 7 AM; contact form alarms posted to
  Teams as they happen (#22)
- Email alerts when the contact form fails to send (#10)
- `scripts/demo-site-error.sh` to simulate an error end to end (#23)

**Security**
- Security headers on every response: CSP, HSTS, anti-framing, no-sniff,
  referrer and permissions policies (#18)
- Spam and abuse limits on the error endpoint; sanitized Teams cards (#23)
- Per-visitor rate limit on the contact form (#23)
- `terraform plan` in CI via a read-only GitHub OIDC role (#11)

**Platform**
- React 19; Node 26 in a pinned build image (#5, #18)
- Contact form backend rebuilt as a Lambda + SES, replacing Amplify Gen 2 (#5)
- Dependabot with grouped updates (#9, #19); first updates merged (#12, #13)
- Lighter CI: lint and build on pull requests into `main` (#6)

**Migration continuity**
- Redirects for old WordPress URLs and the bare domain; old PDFs restored;
  link preview (share) card (#20)
- Footer company and legal links restored (#21)
- Footer build stamp linked to the commit on GitHub (#8)

**Infrastructure integrity**
- Hourly drift detection: GitHub issue + Teams alert when AWS doesn't match
  `infra/`, daily reminders, auto-resolve; daily health report watches it
- `plan` runs on every pull request (skips when `infra/` is untouched) so it
  can be a required check; CODEOWNERS review on infra, CI, build and
  dependency changes

**Documentation**
- README and AGENTS.md refreshed (#7, #23)
- Project documentation in `docs/`

## 2026-06-15: Home page updates

- Home page and hero updates (#3, #4)

## 2026-04-25: Project start

- Initial React + Vite + Tailwind site
