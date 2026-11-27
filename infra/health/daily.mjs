// The daily report: ten checks on the site, posted to Teams as one message.
// Runs every morning at 7 AM Eastern (EventBridge Scheduler, infra/health.tf),
// or by hand: aws lambda invoke --function-name ih-site-health /dev/stdout
//
// Each check returns { name, ok, warn?, detail }:
//   ok: false            ❌ failing (turns the card red, adds a Jira button)
//   ok: true, warn: true ⚠️ working, but look at it
//   ok: true             ✅
import { connect } from "node:tls";
import { AmplifyClient, ListJobsCommand } from "@aws-sdk/client-amplify";
import { CloudWatchClient, DescribeAlarmsCommand } from "@aws-sdk/client-cloudwatch";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { recentClientErrors, untrusted } from "./browser-errors.mjs";
import { ALARM_PREFIX, AMPLIFY_APP_ID, CONTACT_URL, JIRA_FUNCTION, JIRA_TOKEN_EXPIRES, SITE } from "./config.mjs";
import { buildTeamsMessage, jiraButton, sendToTeams } from "./teams.mjs";

const APEX = "https://ivyhilltech.com";

// --- The checks --------------------------------------------------------------

const PAGES = [
    "/",
    "/about",
    "/contact",
    "/contracts",
    "/ai",
    "/capabilities/data-analytics",
    "/documents/Ivyhill-Capability-Statement-2026.pdf",
];

const get = (url, init = {}) => fetch(url, { redirect: "manual", signal: AbortSignal.timeout(10000), ...init });

// Each check returns { name, ok, detail }. "warn" is ok-but-look.
const check = async (name, fn) => {
    try {
        const r = await fn();
        return { name, ...r };
    } catch (err) {
        return { name, ok: false, detail: `Error: ${err.message}` };
    }
};

const checkPages = () =>
    check("Pages load", async () => {
        const bad = [];
        const times = [];
        for (const p of PAGES) {
            const t = Date.now();
            const r = await get(SITE + p);
            times.push(Date.now() - t);
            if (r.status !== 200) bad.push(`${p} → ${r.status}`);
        }
        const slowest = Math.max(...times);
        return bad.length
            ? { ok: false, detail: bad.join(", ") }
            : { ok: true, detail: `${PAGES.length} pages OK, slowest ${slowest} ms` };
    });

const checkRedirects = () =>
    check("Redirects", async () => {
        const cases = [
            [`${APEX}/about`, `${SITE}/about`],
            [`${SITE}/about-us/`, `${SITE}/about`],
            [`${SITE}/wp-content/uploads/privacy_statement.pdf`, `${SITE}/documents/privacy_statement.pdf`],
        ];
        const bad = [];
        for (const [from, to] of cases) {
            const r = await get(from);
            const loc = new URL(r.headers.get("location") ?? "", from).href;
            if (r.status !== 301 || loc !== to) bad.push(`${from} → ${r.status} ${loc}`);
        }
        return bad.length ? { ok: false, detail: bad.join(", ") } : { ok: true, detail: "Bare domain and old URLs redirect" };
    });

const checkHeaders = () =>
    check("Security headers", async () => {
        const r = await get(`${SITE}/`);
        const want = ["content-security-policy", "strict-transport-security", "x-frame-options", "x-content-type-options"];
        const missing = want.filter((h) => !r.headers.get(h));
        return missing.length
            ? { ok: false, detail: `Missing: ${missing.join(", ")}` }
            : { ok: true, detail: "CSP, HSTS and others present" };
    });

const certDaysLeft = (host) =>
    new Promise((resolve, reject) => {
        const s = connect({ host, port: 443, servername: host, timeout: 10000 }, () => {
            const cert = s.getPeerCertificate();
            s.end();
            resolve(Math.floor((new Date(cert.valid_to) - Date.now()) / 86400000));
        });
        s.on("error", reject);
        s.on("timeout", () => s.destroy(new Error("TLS timeout")));
    });

const checkCert = () =>
    check("SSL certificate", async () => {
        const days = Math.min(await certDaysLeft("www.ivyhilltech.com"), await certDaysLeft("ivyhilltech.com"));
        return { ok: days >= 14, warn: days < 30, detail: `Expires in ${days} days (Amplify auto-renews)` };
    });

// POST an empty form: the Lambda validates and returns 400 without sending email.
const checkContact = () =>
    check("Contact form backend", async () => {
        const r = await get(CONTACT_URL, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
        return r.status === 400
            ? { ok: true, detail: "Endpoint up and validating" }
            : { ok: false, detail: `Expected 400 for an empty form, got ${r.status}` };
    });

const checkAlarms = () =>
    check("Alarms", async () => {
        const { MetricAlarms } = await new CloudWatchClient({}).send(
            new DescribeAlarmsCommand({ AlarmNamePrefix: ALARM_PREFIX }),
        );
        const firing = MetricAlarms.filter((a) => a.StateValue === "ALARM").map((a) => a.AlarmName);
        return firing.length
            ? { ok: false, detail: `In alarm: ${firing.join(", ")}` }
            : { ok: true, detail: `${MetricAlarms.length} alarms, none firing` };
    });

const checkDeploy = () =>
    check("Last production deploy", async () => {
        const { jobSummaries } = await new AmplifyClient({}).send(
            new ListJobsCommand({ appId: AMPLIFY_APP_ID, branchName: "main", maxResults: 1 }),
        );
        const j = jobSummaries?.[0];
        if (!j) return { ok: false, detail: "No deploys found" };
        const when = new Date(j.endTime ?? j.startTime).toLocaleString("en-US", {
            timeZone: "America/New_York",
            dateStyle: "medium",
            timeStyle: "short",
        });
        const ok = ["SUCCEED", "RUNNING", "PENDING"].includes(j.status);
        return { ok, detail: `${j.status} · ${when} · ${j.commitId.slice(0, 7)}` };
    });

// The Jira API token expires and the API can't tell us when, so the date is
// kept in Terraform (local.jira.token_expires). 14 days out: a Highest
// priority Jira ticket, created once. 7 days out: this check fails daily.
const checkJiraToken = () =>
    check("Jira token", async () => {
        const days = Math.floor((Date.parse(`${JIRA_TOKEN_EXPIRES}T00:00:00-05:00`) - Date.now()) / 86400000);
        if (Number.isNaN(days)) return { ok: false, detail: `Bad JIRA_TOKEN_EXPIRES: ${JIRA_TOKEN_EXPIRES}` };
        let detail =
            days >= 0 ? `Expires ${JIRA_TOKEN_EXPIRES} (${days} days)` : `EXPIRED ${JIRA_TOKEN_EXPIRES}: Jira buttons are broken`;
        if (days <= 14) {
            const r = await new LambdaClient({}).send(
                new InvokeCommand({
                    FunctionName: JIRA_FUNCTION,
                    Payload: JSON.stringify({
                        id: `renewal#${JIRA_TOKEN_EXPIRES}`,
                        ticket: {
                            summary: `Renew the ih-site-health Jira API token (expires ${JIRA_TOKEN_EXPIRES})`,
                            priority: "Highest",
                            facts: [
                                ["Expires", JIRA_TOKEN_EXPIRES],
                                ["Breaks", "Create Jira ticket buttons on the Teams cards, and this reminder"],
                                [
                                    "1",
                                    "id.atlassian.com → Security → API tokens → Create API token with scopes: Jira, write:jira-work",
                                ],
                                [
                                    "2",
                                    "Store it: see the header of infra/jira-ticket.tf (SSM /ih-redesign/jira-token, email:token)",
                                ],
                                [
                                    "3",
                                    "Set local.jira.token_expires in infra/jira-ticket.tf to the new date; PR, then terraform apply",
                                ],
                                ["4", "Revoke the old token"],
                            ],
                        },
                    }),
                }),
            );
            const out = JSON.parse(Buffer.from(r.Payload ?? []).toString() || "{}");
            detail += r.FunctionError
                ? ` · renewal ticket FAILED: ${out.errorMessage ?? "unknown"}`
                : ` · renewal ticket ${out.key}`;
        }
        return { ok: days > 7, warn: days <= 14, detail };
    });

// Watches the hourly drift check (.github/workflows/drift.yml) from outside
// GitHub: an open "drift" issue, a failed run, or a stale schedule (GitHub
// disables schedules in public repos after 60 days without activity) all show
// here. Public GitHub API, no token needed.
const REPO = "Ivyhill-Technologies/ih-redesign";
const checkDrift = () =>
    check("Infrastructure drift", async () => {
        const gh = (path) =>
            fetch(`https://api.github.com/repos/${REPO}${path}`, {
                headers: { accept: "application/vnd.github+json", "user-agent": "ih-site-health" },
                signal: AbortSignal.timeout(10000),
            });
        const [runsRes, issuesRes] = await Promise.all([
            gh("/actions/workflows/drift.yml/runs?per_page=1&exclude_pull_requests=true"),
            gh("/issues?labels=drift&state=open&per_page=5"),
        ]);
        if ([403, 429].includes(runsRes.status) || [403, 429].includes(issuesRes.status)) {
            return { ok: true, warn: true, detail: "GitHub API rate limit; couldn't check this time" };
        }
        if (!runsRes.ok || !issuesRes.ok) throw new Error(`GitHub API ${runsRes.status}/${issuesRes.status}`);
        const issues = await issuesRes.json();
        if (issues.length) return { ok: false, detail: `${issues[0].title} (GitHub issue #${issues[0].number})` };
        const run = (await runsRes.json()).workflow_runs?.[0];
        if (!run) return { ok: false, detail: "The drift check has never run" };
        const hours = (Date.now() - Date.parse(run.created_at)) / 3600000;
        if (hours > 3) {
            return {
                ok: false,
                detail: `Last ran ${Math.round(hours)} h ago. Schedule may be disabled: GitHub → Actions → Drift check → Enable`,
            };
        }
        if (run.status === "completed" && run.conclusion !== "success") {
            return { ok: false, detail: `Last run ${run.conclusion}; drift can't be ruled out` };
        }
        return { ok: true, detail: `AWS matches infra/ (checked ${Math.max(1, Math.round(hours * 60))} min ago)` };
    });

const checkClientErrors = () =>
    check("Browser errors (24h)", async () => {
        const errors = await recentClientErrors(24 * 60, 2000);
        if (!errors.length) return { ok: true, detail: "None reported" };
        const byPage = {};
        for (const e of errors) byPage[e.page] = (byPage[e.page] ?? 0) + 1;
        const top = Object.entries(byPage)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([page, n]) => `${untrusted(page, 60)} (${n})`)
            .join(", ");
        const more = Object.keys(byPage).length > 5 ? ", ..." : "";
        return { ok: true, warn: true, detail: `${errors.length}${errors.length >= 2000 ? "+" : ""}: ${top}${more}` };
    });

const icon = (c) => (!c.ok ? "❌" : c.warn ? "⚠️" : "✅");

// --- The message -------------------------------------------------------------

// One row per check. Red with a Jira button if anything failed, green if not.
// The Jira ticket lists only the failing checks.
const dailyReportMessage = async (results, failing) => {
    const failed = failing.length;
    const title = failed
        ? `❌ ivyhilltech.com: ${failed} check${failed > 1 ? "s" : ""} failing`
        : "✅ ivyhilltech.com is healthy";
    const facts = results.map((c) => ({ title: `${icon(c)} ${c.name}`, value: c.detail }));
    const actions = failed
        ? [
              await jiraButton({
                  summary: `Daily health check: ${failing.map((c) => c.name).join(", ")} failing`,
                  facts: failing.map((c) => [c.name, c.detail]),
              }),
          ]
        : [];
    return buildTeamsMessage(
        title,
        failed ? "Attention" : "Good",
        facts,
        "Daily check · infra/health in the ih-redesign repo",
        actions,
    );
};

// --- The flow ----------------------------------------------------------------

// Run every check at once, post the message, and return the results (printed
// when you invoke the Lambda by hand).
export const dailyReport = async () => {
    const results = await Promise.all([
        checkPages(),
        checkRedirects(),
        checkHeaders(),
        checkCert(),
        checkContact(),
        checkAlarms(),
        checkDeploy(),
        checkJiraToken(),
        checkClientErrors(),
        checkDrift(),
    ]);
    const failing = results.filter((c) => !c.ok);
    await sendToTeams(await dailyReportMessage(results, failing));
    return { failed: failing.length, results };
};
