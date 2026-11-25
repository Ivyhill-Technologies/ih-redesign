// Site health reporter for Teams.
// - Scheduled run (EventBridge Scheduler, 7 AM Eastern): checks the site and
//   posts a summary card.
// - SNS event (contact form and browser error alarms): posts the alarm right
//   away. Browser error cards include the latest errors' details.
// Problem cards get a "Create Jira ticket" button: a signed, expiring link to
// the ih-jira-ticket Lambda (infra/jira-ticket).
// The Teams Workflows webhook URL lives in SSM (WEBHOOK_PARAM), never in code.
import { createHmac } from "node:crypto";
import { connect } from "node:tls";
import { AmplifyClient, ListJobsCommand } from "@aws-sdk/client-amplify";
import { CloudWatchClient, DescribeAlarmsCommand } from "@aws-sdk/client-cloudwatch";
import { CloudWatchLogsClient, FilterLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const SITE = "https://www.ivyhilltech.com";
const APEX = "https://ivyhilltech.com";
const { WEBHOOK_PARAM, CONTACT_URL, AMPLIFY_APP_ID, ALARM_PREFIX, CLIENT_LOG_GROUP, JIRA_LINK_URL, LINK_SECRET_PARAM } =
    process.env;
const LINK_TTL_DAYS = Number(process.env.LINK_TTL_DAYS || 30);
const { JIRA_FUNCTION, JIRA_TOKEN_EXPIRES } = process.env; // expiry: YYYY-MM-DD
const CLIENT_ERRORS_ALARM = "ih-site-client-errors";
const logsUrl = (group) =>
    `https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/${encodeURIComponent(encodeURIComponent(group)).replace(/%/g, "$")}`;
const DRY_RUN = process.env.DRY_RUN === "1"; // print the card instead of posting

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
        return missing.length ? { ok: false, detail: `Missing: ${missing.join(", ")}` } : { ok: true, detail: "CSP, HSTS and others present" };
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
        const { MetricAlarms } = await new CloudWatchClient({}).send(new DescribeAlarmsCommand({ AlarmNamePrefix: ALARM_PREFIX }));
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
        const when = new Date(j.endTime ?? j.startTime).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" });
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
        let detail = days >= 0 ? `Expires ${JIRA_TOKEN_EXPIRES} (${days} days)` : `EXPIRED ${JIRA_TOKEN_EXPIRES}: Jira buttons are broken`;
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
                                ["1", "id.atlassian.com → Security → API tokens → Create API token with scopes: Jira, write:jira-work"],
                                ["2", "Store it: see the header of infra/jira-ticket.tf (SSM /ih-redesign/jira-token, email:token)"],
                                ["3", "Set local.jira.token_expires in infra/jira-ticket.tf to the new date; PR, then terraform apply"],
                                ["4", "Revoke the old token"],
                            ],
                        },
                    }),
                }),
            );
            const out = JSON.parse(Buffer.from(r.Payload ?? []).toString() || "{}");
            detail += r.FunctionError ? ` · renewal ticket FAILED: ${out.errorMessage ?? "unknown"}` : ` · renewal ticket ${out.key}`;
        }
        return { ok: days > 7, warn: days <= 14, detail };
    });

const icon = (c) => (!c.ok ? "❌" : c.warn ? "⚠️" : "✅");

const card = (title, color, facts, footer, actions = []) => ({
    type: "message",
    attachments: [
        {
            contentType: "application/vnd.microsoft.card.adaptive",
            content: {
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard",
                version: "1.4",
                body: [
                    { type: "TextBlock", text: title, weight: "Bolder", size: "Medium", color, wrap: true },
                    { type: "FactSet", facts },
                    ...(footer ? [{ type: "TextBlock", text: footer, isSubtle: true, size: "Small", wrap: true }] : []),
                ],
                actions: [{ type: "Action.OpenUrl", title: "Open site", url: SITE }, ...actions],
            },
        },
    ],
});

const ssm = new SSMClient({});
const ssmParam = async (name) =>
    (await ssm.send(new GetParameterCommand({ Name: name, WithDecryption: true }))).Parameter.Value;

// A "Create Jira ticket" button. The payload rides in the link, signed so the
// Jira Lambda only acts on links made here. p: { summary, facts, stack?, link?, priority? }
let linkSecret;
const jiraButton = async (p) => {
    linkSecret ??= await ssmParam(LINK_SECRET_PARAM);
    const d = Buffer.from(JSON.stringify({ ...p, exp: Date.now() + LINK_TTL_DAYS * 86400000 })).toString("base64url");
    const s = createHmac("sha256", linkSecret).update(d).digest("hex");
    return { type: "Action.OpenUrl", title: "Create Jira ticket", url: `${JIRA_LINK_URL}?d=${d}&s=${s}` };
};

let webhookUrl;
const post = async (payload) => {
    if (DRY_RUN) return console.log(JSON.stringify(payload, null, 2));
    webhookUrl ??= await ssmParam(WEBHOOK_PARAM);
    const r = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error(`Teams webhook returned ${r.status}`);
};

const dailyReport = async () => {
    const results = await Promise.all([
        checkPages(),
        checkRedirects(),
        checkHeaders(),
        checkCert(),
        checkContact(),
        checkAlarms(),
        checkDeploy(),
        checkJiraToken(),
    ]);
    const failed = results.filter((c) => !c.ok).length;
    const title = failed ? `❌ ivyhilltech.com: ${failed} check${failed > 1 ? "s" : ""} failing` : "✅ ivyhilltech.com is healthy";
    const facts = results.map((c) => ({ title: `${icon(c)} ${c.name}`, value: c.detail }));
    const actions = failed
        ? [
              await jiraButton({
                  summary: `Daily health check: ${results
                      .filter((c) => !c.ok)
                      .map((c) => c.name)
                      .join(", ")} failing`,
                  facts: results.filter((c) => !c.ok).map((c) => [c.name, c.detail]),
              }),
          ]
        : [];
    await post(card(title, failed ? "Attention" : "Good", facts, "Daily check · infra/health in the ih-redesign repo", actions));
    return { failed, results };
};

// Recent browser error reports from the client log (written by infra/client-log).
const recentClientErrors = async (minutes = 15) => {
    const { events = [] } = await new CloudWatchLogsClient({}).send(
        new FilterLogEventsCommand({
            logGroupName: CLIENT_LOG_GROUP,
            startTime: Date.now() - minutes * 60000,
            filterPattern: '{ $.source = "client" && $.level = "error" }',
            limit: 50,
        }),
    );
    return events.map((e) => ({ time: e.timestamp, ...JSON.parse(e.message) })).sort((a, b) => b.time - a.time);
};

// Report fields come from anyone who can POST to the public log endpoint, and
// Teams renders markdown in cards. Strip link syntax and defang URLs so a fake
// report can't put a clickable (phishing) link in the channel. Also cap length.
const untrusted = (v, max = 300) =>
    String(v ?? "")
        .replace(/[[\]<>]/g, "")
        .replace(/\bhttp(s?):\/\//gi, "hxxp$1://")
        .replace(/\bwww\./gi, "www[.]")
        .slice(0, max);

const when = (ms) => new Date(ms).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "medium" });

// CloudWatch alarm → SNS → here.
const alarmPost = async (record) => {
    const m = JSON.parse(record.Sns.Message);
    const firing = m.NewStateValue === "ALARM";
    const clientErrors = m.AlarmName === CLIENT_ERRORS_ALARM;
    const logGroup = clientErrors ? CLIENT_LOG_GROUP : "/aws/lambda/ih-contact-form";
    const title = firing ? `🚨 ${m.AlarmName} is firing` : `✅ ${m.AlarmName} recovered`;
    const facts = [
        { title: "What", value: m.AlarmDescription ?? "" },
        { title: "State", value: `${m.OldStateValue} → ${m.NewStateValue}` },
    ];
    let ticket = {
        summary: `Site alarm: ${m.AlarmName}`,
        facts: [
            ["What", m.AlarmDescription],
            ["Why", m.NewStateReason],
            ["When", when(Date.parse(m.StateChangeTime) || Date.now())],
        ],
        link: { title: `CloudWatch logs: ${logGroup}`, url: logsUrl(logGroup) },
    };

    if (clientErrors && firing) {
        const errors = await recentClientErrors().catch((err) => {
            console.error("Reading client errors failed", err);
            return [];
        });
        const e = errors[0];
        if (e) {
            const pages = [...new Set(errors.map((x) => x.page))].join(", ");
            facts.push(
                { title: "Errors (15 min)", value: String(errors.length) },
                { title: "Latest", value: untrusted(e.message) },
                { title: "Page", value: untrusted(`${e.host ?? ""}${e.page ?? ""}`) },
                { title: "Pages affected", value: untrusted(pages) },
                { title: "Build", value: untrusted(e.commit, 20) },
                { title: "Browser", value: untrusted(e.userAgent) },
            );
            ticket = {
                summary: `Site error: ${e.message} on ${e.page}`,
                facts: [
                    ["Error", e.message],
                    ["Page", `${e.host ?? ""}${e.page ?? ""}`],
                    ["When", when(e.time)],
                    ["Errors in 15 min", errors.length],
                    ["Pages affected", pages],
                    ["Build", e.commit],
                    ["Browser", e.userAgent],
                    ...(e.data && !e.data.stack ? [["Details", JSON.stringify(e.data)]] : []),
                ],
                stack: e.data?.stack?.slice(0, 1500),
                link: ticket.link,
            };
        }
    } else {
        facts.push({ title: "Why", value: m.NewStateReason ?? "" });
    }

    const actions = firing ? [await jiraButton(ticket)] : [];
    await post(card(title, firing ? "Attention" : "Good", facts, `Logs: CloudWatch → ${logGroup}`, actions));
};

export const handler = async (event) => {
    if (event?.Records?.[0]?.Sns) {
        for (const r of event.Records) await alarmPost(r);
        return { posted: event.Records.length };
    }
    return dailyReport();
};
