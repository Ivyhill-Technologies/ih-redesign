// "Create Jira ticket" links from the Teams cards (infra/health/index.mjs).
//   GET  ?d=<payload>&s=<sig>  → a page previewing the ticket, with a Create button
//   POST (same query string)   → creates the issue in Jira, redirects to it
// The health Lambda signs each link (HMAC-SHA256, secret in SSM) and sets an
// expiry, so only links we generated can create tickets. The preview step
// stops link scanners from creating tickets just by opening the URL. A link
// creates at most one ticket: later clicks redirect to the first one.
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
    const want = createHmac("sha256", await param(LINK_SECRET_PARAM)).update(d).digest();
    if (!timingSafeEqual(want, Buffer.from(s, "hex"))) return null;
    try {
        const p = JSON.parse(Buffer.from(d, "base64url").toString());
        return p.exp > Date.now() ? p : null;
    } catch {
        return null;
    }
};

// --- One ticket per link ----------------------------------------------------
// Rows live in the shared rate limit table under "jira#<sig>" and expire via TTL.

const dedupeKey = (s) => ({ pk: { S: `jira#${s}` } });

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
        ...(p.link ? [{ type: "paragraph", content: [text(p.link.title, [{ type: "link", attrs: { href: p.link.url } }])] }] : []),
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
        const body = await r.clone().json().catch(() => ({}));
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

const page = (status, title, body) => ({
    statusCode: status,
    headers: {
        "content-type": "text/html; charset=utf-8",
        "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'",
        "x-frame-options": "DENY",
    },
    body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;color:#1a1a1a}
h1{font-size:20px}dt{font-weight:600;margin-top:8px}dd{margin:0}pre{background:#f4f4f4;padding:12px;overflow:auto;font-size:13px}
button{background:#80B941;color:#fff;border:0;border-radius:4px;padding:10px 18px;font-size:16px;cursor:pointer}</style>
</head><body>${body}</body></html>`,
});

const redirect = (key) => ({ statusCode: 303, headers: { location: `https://${JIRA_SITE}/browse/${key}` } });

const preview = (p) =>
    page(
        200,
        "Create Jira ticket",
        `<h1>Create a Jira ${p.priority ? `${esc(p.priority)}-priority ` : ""}Bug in IW?</h1>
<dl><dt>Summary</dt><dd>${esc(p.summary)}</dd>
${(p.facts ?? []).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
${p.stack ? `<pre>${esc(p.stack)}</pre>` : ""}
<form method="post"><button type="submit">Create ticket</button></form>`,
    );

// --- Handler ----------------------------------------------------------------

export const handler = async (event) => {
    const method = event.requestContext?.http?.method;
    const { d, s } = event.queryStringParameters ?? {};
    const p = await verify(d, s);
    if (!p) return page(403, "Link not valid", "<h1>This link is invalid or has expired.</h1><p>Use the button on a newer Teams card.</p>");

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
        return page(502, "Jira error", "<h1>Jira didn't accept the ticket.</h1><p>Details are in CloudWatch: /aws/lambda/ih-jira-ticket.</p>");
    }
};
