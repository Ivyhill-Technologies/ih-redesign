// Site health reporter for Teams.
// - Scheduled run (EventBridge Scheduler, 7 AM Eastern): checks the site and
//   posts a summary card.
// - SNS event (contact form alarms): posts the alarm right away.
// The Teams Workflows webhook URL lives in SSM (WEBHOOK_PARAM), never in code.
import { connect } from "node:tls";
import { AmplifyClient, ListJobsCommand } from "@aws-sdk/client-amplify";
import { CloudWatchClient, DescribeAlarmsCommand } from "@aws-sdk/client-cloudwatch";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const SITE = "https://www.ivyhilltech.com";
const APEX = "https://ivyhilltech.com";
const { WEBHOOK_PARAM, CONTACT_URL, AMPLIFY_APP_ID, ALARM_PREFIX } = process.env;
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
    check("Form alarms", async () => {
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

const icon = (c) => (!c.ok ? "❌" : c.warn ? "⚠️" : "✅");

const card = (title, color, facts, footer) => ({
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
                actions: [{ type: "Action.OpenUrl", title: "Open site", url: SITE }],
            },
        },
    ],
});

let webhookUrl;
const post = async (payload) => {
    if (DRY_RUN) return console.log(JSON.stringify(payload, null, 2));
    webhookUrl ??= (
        await new SSMClient({}).send(new GetParameterCommand({ Name: WEBHOOK_PARAM, WithDecryption: true }))
    ).Parameter.Value;
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
    ]);
    const failed = results.filter((c) => !c.ok).length;
    const title = failed ? `❌ ivyhilltech.com: ${failed} check${failed > 1 ? "s" : ""} failing` : "✅ ivyhilltech.com is healthy";
    const facts = results.map((c) => ({ title: `${icon(c)} ${c.name}`, value: c.detail }));
    await post(card(title, failed ? "Attention" : "Good", facts, "Daily check · infra/health in the ih-redesign repo"));
    return { failed, results };
};

// CloudWatch alarm → SNS → here.
const alarmPost = async (record) => {
    const m = JSON.parse(record.Sns.Message);
    const firing = m.NewStateValue === "ALARM";
    const title = firing ? `🚨 ${m.AlarmName} is firing` : `✅ ${m.AlarmName} recovered`;
    const facts = [
        { title: "What", value: m.AlarmDescription ?? "" },
        { title: "State", value: `${m.OldStateValue} → ${m.NewStateValue}` },
        { title: "Why", value: m.NewStateReason ?? "" },
    ];
    await post(card(title, firing ? "Attention" : "Good", facts, "Logs: CloudWatch → /aws/lambda/ih-contact-form"));
};

export const handler = async (event) => {
    if (event?.Records?.[0]?.Sns) {
        for (const r of event.Records) await alarmPost(r);
        return { posted: event.Records.length };
    }
    return dailyReport();
};
