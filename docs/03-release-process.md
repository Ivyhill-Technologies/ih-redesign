# 3. Release process (change management)

Every change to the production site is made on a branch, reviewed in a pull
request, checked automatically, and traceable afterwards. Production cannot
be changed any other way.

## Environments and branches

| Branch | Deploys to | Rules |
|---|---|---|
| `main` | Production, https://www.ivyhilltech.com | Protected: no direct pushes (including admins, no bypass). Changes only by pull request with passing CI. |
| `staging` | Staging site (password-protected) | Can't be deleted or force-pushed. Kept identical to `main` between releases. |
| Feature branches | Nothing (until merged) | Short-lived; deleted after merging |

Merging into a branch deploys it automatically (AWS Amplify, about 3 minutes).

## Standard change (content, copy, styling)

1. Branch from the latest `main`.
2. Make the change; preview locally.
3. Run the pre-commit checks: `npx biome check --write .` and `npm run build`.
4. Push the branch and open a pull request into `main`.
5. CI must pass (lint and build).
6. Merge. Production deploys automatically.

## Higher-risk change (staging first)

Applies to: dependency updates, Node version, build configuration
(`amplify.yml`, `vite.config.js`), security headers (`customHttp.yml`), and
changes from contributors who aren't the site owner.

1. Branch from `main`, make and check the change as above.
2. Merge the branch into `staging` and push.
3. Verify on the staging site (the footer shows the deployed commit).
4. Open a pull request from `staging` into `main`. CI must pass.
5. The site owner approves and merges. Production deploys.
6. Fast-forward `staging` to `main` so they stay identical.

Contributors' step-by-step guide, including a prompt for an AI assistant to
follow it, is maintained by the site owner.

## Infrastructure changes (`infra/`)

AWS resources are defined in Terraform and are **never applied by CI**.

1. Change `infra/` on a branch; open a pull request.
2. CI runs `terraform plan` (read-only, via GitHub OIDC) and posts the plan
   in the job summary.
3. A person with AWS access reviews the plan and runs `terraform apply`.
   The plan must show only the intended changes (check the
   "add / change / destroy" counts).
4. Merge the pull request so the code matches what's deployed.

If an `infra/` change is merged but not applied, the hourly drift check
reports it ("infra/ on main isn't applied") until it is.

**Review:** `.github/CODEOWNERS` automatically requests the site owner's
review on any pull request touching `infra/`, CI workflows, security
headers, build configuration, or dependencies.

**AWS is changed only through Terraform.** No console or CLI changes to
resources defined in `infra/`. Anything changed outside Terraform is
detected within the hour.

`terraform plan` showing "No changes" after a release confirms AWS matches
the code.

## Automated checks (CI)

| Check | Runs on | What it does |
|---|---|---|
| `build` | Every pull request into `main` | Installs exact dependencies, runs Biome lint, builds the site. Required to merge. |
| `plan` | Every pull request into `main` (skips in seconds if `infra/` is untouched) | `terraform fmt` check, `validate`, and `plan` with a read-only role, posted to the job summary so reviewers see exactly what the PR would do to AWS |
| Drift check | Hourly on `main` (and on demand) | Compares AWS with `infra/`; alerts on drift or unapplied changes ([runbook](04-operations-runbook.md#responding-to-a-drift-alert)) |

## Dependency updates (Dependabot)

Dependabot opens pull requests on a schedule: npm packages and GitHub
Actions weekly (Mondays), Terraform providers monthly. Updates are grouped
to keep the number of pull requests small, and packages that must move
together (React; Vite with Tailwind) are always updated together.

- **Minor and patch groups:** merge once CI passes.
- **Major versions:** higher-risk; staging first.
- `react-router-dom` majors are ignored until `vite-react-ssg` supports them.

## Release identification

- The footer of every environment shows `<commit> · <build date>`, linked
  to the commit on GitHub.
- The daily health report shows the last production deploy (status, time,
  commit).
- Every release is listed in the [changelog](08-changelog.md).

## Rollback

| Situation | Action | Time to recover |
|---|---|---|
| A merged change broke the site | On GitHub, open the pull request → **Revert** → merge the revert pull request | ~5 minutes |
| Need the previous build back immediately | Amplify console → the `main` branch → redeploy the previous successful build | ~3 minutes |
| An infrastructure change broke something | Revert the Terraform change in a pull request, review the plan, apply | ~10 minutes |
| Redirects broken | Re-apply the previous `infra/amplify-redirects.json` from git history | ~2 minutes |

After an Amplify console redeploy, follow up with a revert pull request so
`main` matches what's live.

## Definition of done

A change is done when:
- it's merged to `main` and live (footer shows the commit);
- `terraform plan` shows no pending changes (if `infra/` was touched);
- `staging` is fast-forwarded to `main`;
- the feature branch is deleted;
- docs are updated if it changed how the site is built, released, monitored
  or secured, and the changelog has an entry.
