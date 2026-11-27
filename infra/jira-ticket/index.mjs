// "Create Jira ticket" links from the Teams cards (infra/health/index.mjs).
//   GET  ?d=<payload>&s=<sig>  → a page previewing the ticket, with a Create button
//   POST (same query string)   → creates the issue in Jira, redirects to it
// The health Lambda signs each link (HMAC-SHA256, secret in SSM) and sets an
// expiry, so only links we generated can create tickets. The preview step
// stops link scanners from creating tickets just by opening the URL. A link
// creates at most one ticket: later clicks redirect to the first one.
// Direct invoke (health Lambda only, by IAM): { id, ticket } creates the
// ticket once per id and returns { key }. Used for the token renewal reminder.
import { createHmac, timingSafeEqual } from "node:crypto";
import { DeleteItemCommand, DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const { JIRA_TOKEN_PARAM, LINK_SECRET_PARAM, JIRA_CLOUD_ID, JIRA_SITE, JIRA_PROJECT_ID, JIRA_ISSUE_TYPE_ID, DEDUPE_TABLE } =
    process.env;

const ssm = new SSMClient({});
const db = new DynamoDBClient({});

const params = {};
const param = async (name) => {
    params[name] ??= (await ssm.send(new GetParameterCommand({ Name: name, WithDecryption: true }))).Parameter.Value;
    return params[name];
};

// --- Link verification ------------------------------------------------------

const verify = async (d, s) => {
    if (typeof d !== "string" || typeof s !== "string" || !/^[0-9a-f]{64}$/.test(s)) return null;
    const want = createHmac("sha256", await param(LINK_SECRET_PARAM))
        .update(d)
        .digest();
    if (!timingSafeEqual(want, Buffer.from(s, "hex"))) return null;
    try {
        const p = JSON.parse(Buffer.from(d, "base64url").toString());
        return p.exp > Date.now() ? p : null;
    } catch {
        return null;
    }
};

// --- One ticket per link ----------------------------------------------------
// Rows live in the shared rate limit table under "jira#<id>" (id = the link's
// signature, or a caller-chosen id for direct invokes) and expire via TTL.

const dedupeKey = (id) => ({ pk: { S: `jira#${id}` } });

const existingIssue = async (s) => {
    const { Item } = await db.send(new GetItemCommand({ TableName: DEDUPE_TABLE, Key: dedupeKey(s), ConsistentRead: true }));
    return Item ? (Item.issueKey?.S ?? "pending") : null;
};

// Claims the link before creating, so a double click can't make two tickets.
const claim = async (s, exp) => {
    try {
        await db.send(
            new PutItemCommand({
                TableName: DEDUPE_TABLE,
                Item: { ...dedupeKey(s), expiresAt: { N: String(Math.ceil(exp / 1000)) } },
                ConditionExpression: "attribute_not_exists(pk)",
            }),
        );
        return true;
    } catch (err) {
        if (err.name === "ConditionalCheckFailedException") return false;
        throw err;
    }
};

const record = (s, issueKey) =>
    db.send(
        new UpdateItemCommand({
            TableName: DEDUPE_TABLE,
            Key: dedupeKey(s),
            UpdateExpression: "SET issueKey = :k",
            ExpressionAttributeValues: { ":k": { S: issueKey } },
        }),
    );

// --- Jira -------------------------------------------------------------------

// Jira's description format (Atlassian Document Format). Text nodes can't be empty.
const text = (t, marks) => ({ type: "text", text: String(t || "—"), ...(marks ? { marks } : {}) });
const description = (p) => ({
    type: "doc",
    version: 1,
    content: [
        ...(p.facts ?? []).map(([k, v]) => ({ type: "paragraph", content: [text(`${k}: `, [{ type: "strong" }]), text(v)] })),
        ...(p.stack ? [{ type: "codeBlock", content: [text(p.stack)] }] : []),
        ...(p.link
            ? [{ type: "paragraph", content: [text(p.link.title, [{ type: "link", attrs: { href: p.link.url } }])] }]
            : []),
        { type: "paragraph", content: [text("Created from the ih-site-health Teams card.", [{ type: "em" }])] },
    ],
});

const createIssue = async (p) => {
    const url = `https://api.atlassian.com/ex/jira/${JIRA_CLOUD_ID}/rest/api/3/issue`;
    const auth = `Basic ${Buffer.from(await param(JIRA_TOKEN_PARAM)).toString("base64")}`;
    const fields = {
        project: { id: JIRA_PROJECT_ID },
        issuetype: { id: JIRA_ISSUE_TYPE_ID },
        summary: p.summary.slice(0, 250),
        description: description(p),
        ...(p.priority ? { priority: { name: p.priority } } : {}),
    };
    const send = (f) =>
        fetch(url, {
            method: "POST",
            headers: { authorization: auth, "content-type": "application/json", accept: "application/json" },
            body: JSON.stringify({ fields: f }),
            signal: AbortSignal.timeout(10000),
        });

    let r = await send(fields);
    // Some projects don't show the priority field. Retry without it, and keep
    // the priority visible in the summary instead.
    if (r.status === 400 && fields.priority) {
        const body = await r
            .clone()
            .json()
            .catch(() => ({}));
        if (body.errors?.priority) {
            const { priority, ...rest } = fields;
            r = await send({ ...rest, summary: `[${priority.name.toUpperCase()}] ${rest.summary}`.slice(0, 250) });
        }
    }
    if (!r.ok) throw new Error(`Jira returned ${r.status}: ${(await r.text()).slice(0, 500)}`);
    return (await r.json()).key;
};

// --- Pages ------------------------------------------------------------------

const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// The Ivyhill mark (public/assets/icon-mark.svg), inline because the page's
// CSP loads nothing from elsewhere, images included.
const LOGO = `<svg class="mark" viewBox="0 0 720 716" fill-rule="evenodd" aria-hidden="true"><path fill="currentColor" d="M 340.329 31.844 C 335.835 32.205, 331.903 32.757, 331.591 33.071 C 331.279 33.385, 323.152 73.660, 313.530 122.571 C 303.907 171.482, 295.766 212.738, 295.438 214.250 L 294.841 217 476.421 217 C 576.289 217, 658 216.764, 658 216.475 C 658 213.330, 640.546 183.735, 629.980 168.963 C 575.055 92.176, 492.488 43.886, 397.500 32.994 C 386.098 31.687, 351.070 30.982, 340.329 31.844 M 172.075 91.946 C 154.543 104.496, 146.597 111.284, 129.936 127.940 C 100.096 157.772, 77.978 189.807, 61.718 226.742 C 42.643 270.069, 34 311.624, 34 360 C 34 406.118, 42.073 446.616, 59.615 488.500 C 66.897 505.885, 83.114 535.339, 90.514 544.620 L 92.542 547.163 134.966 331.832 C 182.912 88.477, 183.788 84, 183.433 84 C 183.292 84, 178.180 87.576, 172.075 91.946 M 271.495 336.250 C 269.968 342.569, 210 648.513, 210 649.982 C 210 651.200, 213.460 653.327, 221.845 657.264 C 257.726 674.109, 299.684 685.205, 336.637 687.623 C 346.031 688.237, 346.816 688.147, 347.345 686.393 C 347.774 684.971, 413.953 375.806, 421.440 340.250 L 422.756 334 347.397 334 L 272.038 334 271.495 336.250 M 520.187 498.750 C 500.824 589.362, 484.986 663.831, 484.991 664.235 C 485.016 666.220, 512.216 653.227, 529.363 643.040 C 621.641 588.217, 680.844 494.010, 689.953 387.500 C 691.098 374.110, 691.320 347.308, 690.352 339.250 L 689.721 334 622.557 334 L 555.393 334 520.187 498.750"/></svg>`;

// Colors and fonts match the site (src/styles/tokens.css). All CSS is inline:
// the CSP allows inline styles and nothing else.
const STYLE = `
:root{--steel:#0e1a2b;--green:#80b941;--green-dark:#4f7a22;--green-soft:#f7fbf0;--ink:#0b1220;--ink-2:#4b5563;--ink-3:#6b7280;--line:#e5e7eb;--bg:#f3f4f6;--card:#fff;--danger:#9b2c2c;--danger-soft:#fdf2f2;
--sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;--mono:ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 var(--sans);-webkit-font-smoothing:antialiased}
header{background:var(--steel);color:#fff;border-bottom:3px solid var(--green)}
.bar{max-width:760px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;gap:12px}
.mark{width:30px;height:30px;color:var(--green);flex:none}
.brand{font-weight:600;letter-spacing:.01em}
.brand span{display:block;font-size:12px;font-weight:400;color:#cbd5e1;letter-spacing:.04em;text-transform:uppercase}
main{max-width:760px;margin:32px auto;padding:0 24px}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:28px 32px;box-shadow:0 1px 2px rgba(11,18,32,.04)}
.eyebrow{margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
h1{margin:0 0 20px;font-size:22px;line-height:1.3;overflow-wrap:anywhere}
.badge{display:inline-block;margin-left:8px;padding:2px 8px;border-radius:999px;background:var(--danger-soft);color:var(--danger);font-size:12px;font-weight:600;vertical-align:2px}
dl{display:grid;grid-template-columns:minmax(120px,max-content) 1fr;margin:0;border-top:1px solid var(--line)}
dt,dd{margin:0;padding:10px 0;border-bottom:1px solid var(--line)}
dt{padding-right:24px;color:var(--ink-2);font-weight:600;font-size:14px}
dd{overflow-wrap:anywhere}
pre{margin:20px 0 0;padding:14px 16px;background:var(--steel);color:#e5e7eb;border-radius:6px;font:12.5px/1.5 var(--mono);overflow:auto;max-height:320px}
.actions{margin-top:24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
button{background:var(--green);color:#fff;border:0;border-radius:6px;padding:11px 22px;font:600 15px var(--sans);cursor:pointer}
button:hover{background:var(--green-dark)}
.note{margin:0;color:var(--ink-3);font-size:13px}
p{margin:0 0 8px}
footer{max-width:760px;margin:0 auto 40px;padding:0 24px;color:var(--ink-3);font-size:12px}
@media (max-width:560px){.card{padding:22px 20px}dl{grid-template-columns:1fr}dt{padding-bottom:0;border-bottom:0}}`;

const page = (status, title, body) => ({
    statusCode: status,
    headers: {
        "content-type": "text/html; charset=utf-8",
        "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'",
        "x-frame-options": "DENY",
    },
    body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)} · Ivyhill Technologies</title>
<style>${STYLE}</style>
</head><body>
<header><div class="bar">${LOGO}<div class="brand">Ivyhill Technologies<span>Site operations</span></div></div></header>
<main><div class="card">${body}</div></main>
<footer>ivyhilltech.com site health · infra/jira-ticket in the ih-redesign repo</footer>
</body></html>`,
});

const redirect = (key) => ({ statusCode: 303, headers: { location: `https://${JIRA_SITE}/browse/${key}` } });

const preview = (p) =>
    page(
        200,
        "Create Jira ticket",
        `<p class="eyebrow">Create a Jira Bug in IW${p.priority ? `<span class="badge">${esc(p.priority)} priority</span>` : ""}</p>
<h1>${esc(p.summary)}</h1>
<dl>${(p.facts ?? []).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
${p.stack ? `<pre>${esc(p.stack)}</pre>` : ""}
<form method="post" class="actions"><button type="submit">Create ticket</button><p class="note">One ticket per button. Clicking again opens the same ticket.</p></form>`,
    );

// --- Handler ----------------------------------------------------------------

// Direct invoke: create once per id, return the key. Throws so the caller sees failures.
const createOnce = async ({ id, ticket, keepDays = 60 }) => {
    const existing = await existingIssue(id);
    if (existing && existing !== "pending") return { key: existing, created: false };
    if (!(await claim(id, Date.now() + keepDays * 86400000))) throw new Error(`Ticket ${id} is already being created`);
    try {
        const key = await createIssue(ticket);
        await record(id, key);
        console.log(JSON.stringify({ source: "jira-ticket", created: key, summary: ticket.summary }));
        return { key, created: true };
    } catch (err) {
        await db.send(new DeleteItemCommand({ TableName: DEDUPE_TABLE, Key: dedupeKey(id) })).catch(() => {});
        throw err;
    }
};

export const handler = async (event) => {
    // Function URL events always have requestContext.http; direct invokes don't.
    if (!event.requestContext?.http) return createOnce(event);

    const method = event.requestContext?.http?.method;
    const { d, s } = event.queryStringParameters ?? {};
    const p = await verify(d, s);
    if (!p)
        return page(
            403,
            "Link not valid",
            "<h1>This link is invalid or has expired.</h1><p>Use the button on a newer Teams card.</p>",
        );

    const existing = await existingIssue(s);
    if (existing && existing !== "pending") return redirect(existing);

    if (method === "GET") return preview(p);
    if (method !== "POST") return page(405, "Not allowed", "<h1>Method not allowed.</h1>");

    if (!(await claim(s, p.exp))) {
        return page(409, "Already creating", "<h1>This ticket is already being created.</h1><p>Refresh in a few seconds.</p>");
    }
    try {
        const key = await createIssue(p);
        await record(s, key);
        console.log(JSON.stringify({ source: "jira-ticket", created: key, summary: p.summary }));
        return redirect(key);
    } catch (err) {
        console.error("Jira create failed", err);
        // Release the claim so the button can be tried again.
        await db.send(new DeleteItemCommand({ TableName: DEDUPE_TABLE, Key: dedupeKey(s) })).catch(() => {});
        return page(
            502,
            "Jira error",
            "<h1>Jira didn't accept the ticket.</h1><p>Details are in CloudWatch: /aws/lambda/ih-jira-ticket.</p>",
        );
    }
};
