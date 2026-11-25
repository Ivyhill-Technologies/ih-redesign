# Ivyhill Technologies website: project documentation

Documentation for **ivyhilltech.com**: what it is, how it's built, how
changes are released, how it's operated and monitored, and how to recover
it. Written for project managers, stakeholders, and whoever maintains the
site next.

For day-to-day developer commands, see the repo's [README](../README.md)
(people) and [AGENTS.md](../AGENTS.md) (AI coding assistants).

| # | Document | Read it to learn |
|---|---|---|
| 1 | [Project overview](01-project-overview.md) | Purpose, scope, status, owners, costs |
| 2 | [Architecture](02-architecture.md) | The components, how they connect, what data exists |
| 3 | [Release process](03-release-process.md) | How a change goes from idea to live, approvals, rollback |
| 4 | [Operations runbook](04-operations-runbook.md) | Monitoring, what each alert means and what to do, routine tasks |
| 5 | [Security](05-security.md) | Controls in place, secrets, privacy, threat model |
| 6 | [Backup and disaster recovery](06-disaster-recovery.md) | What's backed up, how to rebuild, recovery targets |
| 7 | [Decision log](07-decisions.md) | Key technical decisions and why they were made |
| 8 | [Changelog](08-changelog.md) | What changed, release by release |
| 9 | [Known issues and roadmap](09-known-issues-and-roadmap.md) | Open risks, gaps, and planned work |

**Keeping these current:** a change that alters how the site is built,
released, monitored or secured should update the matching document in the
same pull request. The changelog gets an entry for every release.

_Last reviewed: 2026-11-25._
