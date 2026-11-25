# 1. Project overview

## Purpose

Replace the previous WordPress site at ivyhilltech.com with a modern,
serverless marketing site that:

- presents Ivyhill's capabilities, contract vehicles and past performance to
  federal, state and local contracting officers and commercial clients;
- costs little to run and needs no server maintenance;
- is secure by default and monitored, with problems surfacing to the team
  automatically;
- can be changed safely, with every change reviewed, tested and reversible.

The site also serves as a working demonstration of Ivyhill's engineering
practices for clients and contract evaluations.

## Scope

**In scope**
- Public marketing pages: Home, About, Contracts, AI, Contact, and five
  capability pages (Application Development, Data Analytics, Information
  Management, Infrastructure Support, Records Management).
- Contact form that emails submissions to info@ivyhilltech.com.
- Public documents (capability statement, policies) under `/documents/`.
- Continuity with the old site: old URLs and PDF links redirect.
- Monitoring, alerting and error reporting to Microsoft Teams, with Jira
  ticket creation.
- Automated checks, dependency updates, and documented release process.

**Out of scope**
- A content management system (CMS). Content is edited in the code and
  released through the normal process.
- User accounts, logins, or storing visitor data.
- Hosting other Ivyhill applications.

## Status

| Area | Status |
|---|---|
| Site | **Live** at https://www.ivyhilltech.com, served from AWS Amplify |
| Contact form | **Live** (AWS Lambda + SES) |
| Monitoring and alerts | **Live**: daily health report, alarms and error cards in Teams |
| Jira integration | **Live**: "Create Jira ticket" from Teams cards, project IW |
| Previous WordPress site | Retired; replaced by this site |

## Roles

| Role | Responsibility |
|---|---|
| Site owner / developer | Builds and maintains the site, approves production releases, applies infrastructure changes, renews credentials |
| Content contributor | Proposes content changes through the [release process](03-release-process.md) (staging first) |
| Alert recipients | The Teams channel and the alert email list receive alarms; see the [runbook](04-operations-runbook.md) |

## Environments

| Environment | URL | Built from | Access |
|---|---|---|---|
| Production | https://www.ivyhilltech.com | `main` branch | Public |
| Staging | Amplify `staging` branch URL | `staging` branch | Password-protected |
| Local | http://localhost:5173 | Any branch | Developer's machine |

## Technology summary

React 19 pages, prerendered to static HTML at build time (Vite 6,
`vite-react-ssg`), styled with Tailwind 4, hosted on AWS Amplify. Backend
pieces are small AWS Lambda functions defined in Terraform. Details:
[Architecture](02-architecture.md).

## Running costs

Approximately **$2–3 per month** at current traffic:

| Item | Monthly |
|---|---|
| AWS Amplify Hosting (builds and serving) | ~$2.30 |
| Route 53 DNS hosted zone | ~$0.50 |
| Lambda, DynamoDB, CloudWatch, SNS, SES, Parameter Store | ~$0 (within AWS free tier) |

The domain registration renews annually. Cost grows with traffic, but even
a tenfold increase stays in single-digit dollars. Abuse controls cap the
cost of fake traffic to the public endpoints ([Security](05-security.md)).

## Success criteria

- Site available and fast: all monitored pages return OK in the daily check.
- No broken legacy links: old WordPress URLs and PDFs redirect.
- Problems are detected by us, not reported by visitors: browser errors and
  contact form failures alert Teams within minutes.
- Every production change is traceable to a reviewed pull request, and the
  live version is visible in the site footer.
