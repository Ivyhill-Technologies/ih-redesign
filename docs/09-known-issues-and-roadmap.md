# 9. Known issues and roadmap

## Known issues and limitations

| Item | Impact | Notes |
|---|---|---|
| Redirects are applied to Amplify by hand | A change to `infra/amplify-redirects.json` does nothing until applied | Command in the [runbook](04-operations-runbook.md#routine-tasks) |
| Some settings live only in consoles | Risk of drift or loss | Listed in [Architecture](02-architecture.md#configuration-that-lives-outside-the-repo) |
| `'unsafe-inline'` in the script CSP | Weaker XSS protection than ideal | Required by the prerenderer today; see [Security](05-security.md#residual-risks-and-open-items) |
| info@ivyhilltech.com doesn't get alert emails yet | Contact form alarms email only Evan (Teams still gets them) | Removed until someone can confirm the SNS subscription; to add it back, run `scripts/confirm-alert-email.sh` while someone can click the link in that inbox |
| Error alerts take ~2–5 minutes | Not instant | CloudWatch metric and alarm evaluation; acceptable for this site |
| Scheduled workflows pause after 60 days of repo inactivity | Drift check stops | GitHub rule for public repos; the daily health report flags it |
| `react-router-dom` held at v6 | Can't take v7 yet | `vite-react-ssg` requires v6 |
| Vite 8 and plugin-react 6 pending (#15, #16) | Majors not yet adopted | Need `vite-react-ssg` support; test on staging |

## Roadmap

| Priority | Item | Why |
|---|---|---|
| High | Retire remaining legacy hosting from the previous site | Less to maintain and pay for |
| High | Move the Jira integration to a service account | Not tied to one person's Atlassian account |
| Medium | Package the drift check as a reusable workflow for other projects | Same drift guarantees everywhere with a few lines per repo |
| Medium | Evaluate Vite 8 / plugin-react 6 on staging | Stay on supported versions |
| Medium | Codify console-only settings (Amplify app, rulesets) | Less drift; faster disaster recovery |
| Medium | Verify and document account-level controls (MFA, CloudTrail, access reviews) | Completes the security picture |
| Low | Replace `'unsafe-inline'` with CSP hashes or nonces | Stronger XSS protection |
| Low | Uptime check from outside AWS (more often than daily) | Faster detection of a full outage |
