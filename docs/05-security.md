# 5. Security

Security is designed in at every layer: a static site with almost nothing to
attack, least-privilege AWS components, no stored visitor data, secrets kept
out of the code, a controlled release path, and monitoring that surfaces
problems to the team.

> **Scope note.** This document describes the controls in place and maps
> them to NIST SP 800-53 control families for reference. It is not a
> certification or a formal compliance assessment.

## Contents

1. [Security posture summary](#security-posture-summary)
2. [Attack surface](#attack-surface)
3. [Controls in place](#controls-in-place)
4. [Threat model](#threat-model)
5. [Secrets inventory and rotation](#secrets-inventory-and-rotation)
6. [Data protection and privacy](#data-protection-and-privacy)
7. [Secure development lifecycle](#secure-development-lifecycle)
8. [Logging and monitoring](#logging-and-monitoring)
9. [Incident response](#incident-response)
10. [NIST SP 800-53 mapping](#nist-sp-800-53-mapping)
11. [Residual risks and open items](#residual-risks-and-open-items)
12. [Review schedule](#review-schedule)

## Security posture summary

| Property | How |
|---|---|
| **Minimal attack surface** | Pages are prebuilt static files. No CMS, no admin login, no database, no server to compromise. |
| **No visitor data stored** | Form messages go straight to email; IPs used for rate limits are stored only as one-way hashes and expire within hours. |
| **No secrets in code** | The repo is public by design. Secrets live encrypted in AWS Parameter Store. GitHub secret scanning with push protection blocks accidental commits of credentials. |
| **Least privilege** | Each Lambda has its own IAM role with only the actions it needs, on only its resources. CI's AWS role is read-only. |
| **Controlled change** | Production changes only via reviewed pull requests with passing checks; no direct pushes, including administrators. |
| **Defense in depth on public endpoints** | Rate limits, size caps, concurrency caps, origin checks, signed links. |
| **Browser hardening** | Content Security Policy, HSTS, anti-framing, no-sniff, strict referrer and permissions policies on every response. |
| **Monitored** | Alarms and a daily health report in Teams; failures of the monitoring itself alert by email. |

## Attack surface

Everything reachable from the internet, and what protects it:

| Entry point | Exposure | Protections |
|---|---|---|
| Website (Amplify CDN) | Public, read-only static files | No server-side code; TLS enforced (HSTS); security headers; AWS-managed infrastructure |
| `ih-contact-form` function URL | Public POST | CORS limited to our domains; honeypot; strict validation and length limits; CR/LF stripped (no email header injection); 5 sends/hour/visitor; max 2 concurrent executions; sends only from the verified domain |
| `ih-client-log` function URL | Public POST | Origin must be one of our sites; 8 KB size cap; per-field length caps; 30 reports/hour/visitor; max 2 concurrent; always returns 204 (no information leak) |
| `ih-jira-ticket` function URL | Public, but only signed links act | HMAC-SHA256 signature over the whole payload with a secret key; constant-time comparison; 30-day expiry; GET only previews (link scanners can't create); one ticket per link; HTML-escaped output with a restrictive CSP; max 2 concurrent |
| GitHub repository | Public read | Rulesets protect `main` and `staging`; secret scanning and push protection; CI tokens read-only; fork PRs get no secrets |
| AWS account | Not public | IAM; infrastructure as code; CI uses short-lived OIDC credentials, read-only |
| Teams channel | Internal | Report text from the public endpoint is sanitized (links stripped, URLs defanged, length-capped) before posting |

## Controls in place

### Application and browser

- **Content Security Policy** (`customHttp.yml`): scripts, styles, fonts and
  images only from our own origin; network calls only to our own origin and
  our two Lambda endpoints; no plugins (`object-src 'none'`); no framing
  (`frame-ancestors 'none'`); forms only post to our own origin;
  `upgrade-insecure-requests`.
  - `'unsafe-inline'` is allowed for scripts because the prerenderer emits
    small inline scripts that change every build. There is no user-generated
    content on the site, which keeps this risk low. See residual risks.
- **HSTS**: one year. Deliberately without `includeSubDomains`, because other
  ivyhilltech.com subdomains are run separately.
- **X-Frame-Options: DENY**, **X-Content-Type-Options: nosniff**,
  **Referrer-Policy: strict-origin-when-cross-origin**,
  **Permissions-Policy** disabling camera, microphone, geolocation, payment, USB,
  **Cross-Origin-Opener-Policy: same-origin**.
- The daily health report verifies the key headers are present in production.

### Contact form

- Honeypot field; server-side validation regardless of browser checks.
- Header injection prevented (CR/LF stripped from fields used in email headers).
- Email sent only from the verified ivyhilltech.com SES identity, with DKIM
  signing, so messages pass DMARC (domain policy `p=reject`).
- Per-visitor rate limit; IPs stored only as SHA-256 hashes with automatic
  expiry. Fails open (a DynamoDB outage doesn't block legitimate messages).
- Reserved concurrency of 2 caps the cost and impact of floods.

### Error reporting and alerting

- Reports never contain form contents or personal details by design
  (`src/log.js` sends page path, error, build, and stack trace only).
- Teams cards capped at one per hour for browser errors; no "recovered"
  noise. The daily report counts everything, so the cap hides nothing.
- Untrusted text is sanitized before reaching Teams (no clickable links or
  markup), preventing phishing via fake reports.

### Jira integration

- Links are signed (HMAC-SHA256) with a random 256-bit key held only in
  Parameter Store; forged or modified links are rejected (403).
- Expiry built into the signed payload (30 days).
- Two-step flow (preview, then create) so automated link scanners cannot
  create tickets.
- Idempotent: one ticket per link, enforced with a conditional database write.
- The Jira API token is **scoped** to `write:jira-work` only: it can create
  issues and cannot read projects, users, or delete anything.
- Direct (non-URL) invocation for the renewal reminder is permitted to the
  health Lambda only, by IAM.

### AWS and infrastructure

- **Infrastructure as code**: every AWS resource for the site is defined in
  Terraform, reviewed in pull requests, and planned in CI before a person
  applies it.
- **Per-function IAM roles**, scoped to specific resources (e.g. the form
  Lambda can only `ses:SendEmail` from the verified domain identity and
  `dynamodb:UpdateItem` on one table).
- **CI access via GitHub OIDC**: no long-lived AWS keys in GitHub. The role
  is read-only, trusted only for pull requests in this repository.
- **Encrypted secrets**: Parameter Store `SecureString` (AWS KMS).
- **Terraform state** in a private, versioned S3 bucket with locking.
- **Log retention** of 30 days on every log group.

### Source code and supply chain

- `main` is protected by a GitHub ruleset with no bypass: no direct pushes,
  no force pushes, pull requests and passing CI required.
- `staging` cannot be deleted or force-pushed.
- GitHub **secret scanning with push protection** blocks commits containing
  recognizable credentials.
- **Dependabot** proposes dependency and GitHub Actions updates weekly and
  Terraform provider updates monthly, so security fixes arrive promptly and
  are tested by CI.
- Exact dependency versions are installed from the lockfile (`npm ci`) in CI
  and in production builds.
- The production build image is pinned (Node 26 official image).
- CI workflows run with read-only tokens; concurrent runs are cancelled.

## Threat model

| Threat | Example | Mitigation | Residual risk |
|---|---|---|---|
| Defacement or malicious code injection | Attacker changes site content | No CMS or admin login; production changes only via protected branch and PR; CSP limits what injected code could load | Low |
| Credential leak via the public repo | A token committed by mistake | Secrets only in Parameter Store; push protection; `.env` ignored; scoped, rotatable tokens | Low |
| Contact form spam / abuse | Bots flooding info@ | Honeypot, validation, per-IP limit, concurrency cap | Low; a botnet across many IPs can still send some spam |
| Email header injection | Extra recipients via form fields | CR/LF stripped; fixed To/From | Very low |
| Fake error reports | Flooding the log endpoint, spamming Teams | Origin check, rate limits, size caps, concurrency cap, Teams cap of 1 card/hour | Low; logs may contain junk, bounded by limits |
| Phishing via Teams cards | Fake report containing a malicious link | Links stripped and URLs defanged before posting | Low |
| Forged Jira tickets | Attacker crafts "create ticket" URLs | HMAC signatures, secret key, expiry, preview step, one ticket per link | Very low |
| Cost exhaustion ("denial of wallet") | Flood of requests to public endpoints | Reserved concurrency of 2 per endpoint; rate limits; static pages served by CDN | Low |
| Clickjacking | Site framed inside a hostile page | `frame-ancestors 'none'`, `X-Frame-Options: DENY` | Very low |
| Downgrade / interception | Forcing HTTP | HSTS, HTTPS-only, `upgrade-insecure-requests` | Very low |
| Vulnerable dependency | Known CVE in a library | Dependabot updates; CI-tested; static output limits exploitability | Low |
| Compromised CI | Malicious workflow change | Read-only tokens; read-only AWS role; workflow changes go through protected PRs | Low |
| Accidental production break | Bad change merged | Required checks, staging for risky changes, fast rollback, daily health checks | Low |
| Expired integration credential | Jira token lapses silently | Expiry tracked; Highest-priority reminder ticket at 14 days; daily ❌ at 7 days | Very low |

## Secrets inventory and rotation

No secret is stored in the repository, in Terraform state, or in CI.

| Secret | Stored in | Used by | Rotation | How to rotate |
|---|---|---|---|---|
| Teams Workflows webhook URL | Parameter Store `/ih-redesign/teams-webhook` (SecureString) | `ih-site-health` | On suspicion of exposure, or when the Teams workflow changes | [Runbook](04-operations-runbook.md#replace-the-teams-webhook) |
| Jira API token (scoped `write:jira-work`) | Parameter Store `/ih-redesign/jira-token` (SecureString) | `ih-jira-ticket` | Before expiry (**2027-02-08**); automated reminders | [Runbook](04-operations-runbook.md#renew-the-jira-api-token) |
| Link-signing key (256-bit random) | Parameter Store `/ih-redesign/jira-link-secret` (SecureString) | `ih-site-health` (sign), `ih-jira-ticket` (verify) | On suspicion of exposure. Rotating invalidates all existing buttons, which is the intended effect | `aws ssm put-parameter --overwrite --name /ih-redesign/jira-link-secret --type SecureString --value "$(openssl rand -hex 32)"` |
| Staging site password | Amplify console | People checking staging | When someone with access leaves | Amplify → Access control |

**Not secrets** (public by design): the Lambda function URLs (browsers call
them), the AWS account ID and role ARNs (identifiers, not credentials).

## Data protection and privacy

- **Data minimization**: the site stores no visitor accounts, no form
  submissions, and no analytics profiles.
- **Contact form**: content is delivered by email to info@ and not retained
  in AWS. Reply-To is the visitor's address so staff can respond directly.
- **Rate limiting**: visitor IP addresses are hashed (SHA-256) before
  storage and the rows expire automatically within about two hours.
- **Error reports**: contain the page path, error message, stack trace,
  site version and browser string; no form contents, names or emails.
  Retained 30 days.
- **Encryption**: TLS for all traffic; AWS services encrypt data at rest;
  secrets encrypted with KMS.
- **No third-party trackers**: the CSP permits no external scripts.

## Secure development lifecycle

1. **Plan**: changes that affect build, security headers, dependencies or
   infrastructure are classed as higher risk ([release process](03-release-process.md)).
2. **Build**: code reviewed in pull requests; secrets never committed (push
   protection); exact dependencies from the lockfile.
3. **Verify**: CI lint and build on every pull request; `terraform plan` on
   infrastructure changes; higher-risk changes verified on staging.
4. **Release**: only through the protected `main` branch; production version
   visible in the footer.
5. **Operate**: daily health checks including security headers and
   certificate; alarms; error reporting.
6. **Maintain**: Dependabot updates; credential expiry tracking; periodic
   reviews (below).

AI coding assistants used on the repo read `AGENTS.md`, which encodes the
same rules (never push to `main`, staging first for risky changes, never
commit secrets, ask before applying infrastructure).

## Logging and monitoring

| What | Where | Retention |
|---|---|---|
| Lambda execution logs (all four functions) | CloudWatch Logs | 30 days |
| Browser error reports | CloudWatch Logs `/aws/lambda/ih-client-log` | 30 days |
| Jira tickets created via buttons | CloudWatch Logs `/aws/lambda/ih-jira-ticket` | 30 days |
| Alarms | CloudWatch → Teams and email | Alarm history in CloudWatch |
| Daily security-relevant checks | Teams: security headers present, certificate expiry, redirects, alarms | Teams channel history |
| Code and configuration changes | GitHub pull requests and commit history | Permanent |
| Infrastructure changes | Pull requests + Terraform plans in CI job summaries | Permanent (PRs); state versioned in S3 |

Monitoring is self-checking: if the health reporter fails, an alarm emails
the alert list directly, so silence in Teams is never mistaken for "all
clear".

## Incident response

**Security incidents** include: suspected credential exposure, unexpected
site content, unexpected AWS resources or activity, abuse of the public
endpoints, or a reported vulnerability.

1. **Contain**
   - Credential exposed → rotate it immediately ([secrets table](#secrets-inventory-and-rotation)).
     For the Jira token, also revoke it at id.atlassian.com.
   - Unexpected site content → roll back to the last known-good build
     (Amplify redeploy, or revert the pull request), then investigate.
   - Endpoint abuse → limits already cap impact; if needed, temporarily
     remove the function URL's public permission in Lambda.
2. **Assess**: review CloudWatch logs for the affected function, GitHub
   commit and pull request history, and the Terraform plan (`terraform plan`
   should show no unexpected drift).
3. **Track**: open a Jira ticket (Highest priority) and keep notes there.
4. **Eradicate and recover**: fix through the normal release process;
   confirm the daily health report is green.
5. **Review**: record cause and lessons on the ticket; update this document
   and the runbook if a control or procedure should change.

**Reporting a vulnerability:** contact the site owner privately (not a
public GitHub issue), with steps to reproduce.

## NIST SP 800-53 mapping

For reference in federal contexts. Families and representative controls
addressed by this site's design:

| Family | Control (examples) | How this site addresses it |
|---|---|---|
| **AC** Access Control | AC-3, AC-6 (least privilege) | Per-function IAM roles scoped to resources; read-only CI role; protected branches |
| **AU** Audit and Accountability | AU-2, AU-6, AU-11 | CloudWatch logs for all functions; 30-day retention; PR and commit history for all changes |
| **CA** Assessment, Authorization and Monitoring | CA-7 (continuous monitoring) | Daily automated health report; alarms; error reporting |
| **CM** Configuration Management | CM-2, CM-3, CM-5, CM-8 | Infrastructure as code; baseline in git; changes via PR with CI; restricted change rights on `main`; component inventory in [Architecture](02-architecture.md) |
| **CP** Contingency Planning | CP-9, CP-10 | Code in GitHub, versioned Terraform state; documented rebuild ([DR](06-disaster-recovery.md)) |
| **IA** Identification and Authentication | IA-5 (authenticator management) | Secrets in Parameter Store; tracked expiry and rotation; scoped tokens; OIDC short-lived credentials for CI |
| **IR** Incident Response | IR-4, IR-5, IR-6 | Documented procedure; alert-to-ticket workflow; incident tracking in Jira |
| **RA** Risk Assessment | RA-3, RA-5 | Threat model (above); Dependabot vulnerability updates |
| **SA** System and Services Acquisition | SA-8, SA-10, SA-11 | Secure-by-design architecture; developer configuration management; CI testing |
| **SC** System and Communications Protection | SC-5, SC-7, SC-8, SC-13, SC-28 | Rate and concurrency limits; minimal boundary; TLS/HSTS; HMAC signing; encryption at rest |
| **SI** System and Information Integrity | SI-2, SI-4, SI-10 | Dependency patching; monitoring and alerting; input validation on all endpoints |
| **SR** Supply Chain Risk Management | SR-3 | Lockfile installs; pinned build image; dependency updates reviewed through CI |

## Residual risks and open items

| Item | Risk | Plan |
|---|---|---|
| `'unsafe-inline'` scripts in CSP | Weakens XSS protection if an injection point existed (none known; no user content) | Revisit if `vite-react-ssg` supports nonces/hashes |
| Some settings live only in consoles (Amplify build image, domain, staging password, GitHub rulesets) | Could drift or be lost | Documented in [Architecture](02-architecture.md#configuration-that-lives-outside-the-repo); consider codifying |
| Jira token belongs to a person's account | Tied to one employee's access | Move to a dedicated service account |
| No web application firewall on Amplify or function URLs | Volumetric abuse relies on built-in limits | Acceptable at current exposure; Amplify WAF integration available if needed |
| Account-level controls not documented here (MFA, CloudTrail, access reviews) | Outside this repo's scope | Verify at the AWS account level and record in a future review |

## Review schedule

| Review | Frequency |
|---|---|
| This document and the threat model | Quarterly, and after any significant architecture change |
| Secrets inventory and expiries | Quarterly (Jira token tracked automatically) |
| Who has access (GitHub, AWS, Amplify staging password, Teams channel) | Quarterly, and when someone leaves |
| Dependabot pull requests | Weekly |

_Last reviewed: 2026-11-25._
