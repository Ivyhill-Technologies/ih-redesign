// Health Lambda (infra/health/index.mjs): what it posts to Teams, end to end.
// AWS, fetch and TLS are faked. Each test saves the exact Teams payload as a
// snapshot (health-lambda.test.mjs.snapshot), so any change to a card shows
// up as a failing test. After an intended change, review the diff and run:
//   node --test --test-update-snapshots test/health-lambda.test.mjs
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { beforeEach, test } from "node:test";

const stubs = {
    aws: new URL("./stubs/aws-sdk.mjs", import.meta.url).href,
    tls: new URL("./stubs/tls.mjs", import.meta.url).href,
};
registerHooks({
    resolve: (spec, ctx, next) => {
        if (spec.startsWith("@aws-sdk/")) return { url: stubs.aws, shortCircuit: true };
        if (spec === "node:tls") return { url: stubs.tls, shortCircuit: true };
        return next(spec, ctx);
    },
});

// The Lambda reads these when it loads, so set them before importing it.
const WEBHOOK = "https://teams.example/webhook";
const CONTACT = "https://contact.example/";
const JIRA_LINK = "https://jira-link.example/";
Object.assign(process.env, {
    WEBHOOK_PARAM: "/test/webhook",
    LINK_SECRET_PARAM: "/test/link-secret",
    CONTACT_URL: CONTACT,
    AMPLIFY_APP_ID: "app-test",
    ALARM_PREFIX: "ih-",
    CLIENT_LOG_GROUP: "/aws/lambda/ih-client-log",
    JIRA_LINK_URL: JIRA_LINK,
    JIRA_FUNCTION: "ih-jira-ticket",
    // 10 days out: inside the 14-day renewal window, outside the 7-day fail.
    // Read once at load, so every daily test also covers the renewal ticket.
    JIRA_TOKEN_EXPIRES: "2026-12-07",
    RATE_TABLE: "ih-contact-rate-limit",
});

// A fixed clock: 2026-11-27 12:00 UTC.
const NOW = Date.parse("2026-11-27T12:00:00Z");
Date.now = () => NOW;

const { handler } = await import("../infra/health/index.mjs");

const SITE = "https://www.ivyhilltech.com";
const APEX = "https://ivyhilltech.com";
const SECURITY_HEADERS = {
    "content-security-policy": "default-src 'self'",
    "strict-transport-security": "max-age=63072000",
    "x-frame-options": "DENY",
    "x-content-type-options": "nosniff",
};

// A healthy world. Tests change parts of it before calling the handler.
let world;
let posted; // payloads sent to the Teams webhook
let logged; // console.log lines
let aws; // AWS commands the Lambda sent, as [service, command name, input]
beforeEach(() => {
    posted = [];
    logged = [];
    aws = [];
    globalThis.__certValidTo = new Date(NOW + 60 * 86400000).toUTCString();
    world = {
        pageStatus: {}, // path → status, default 200
        contactStatus: 400,
        driftIssues: [],
        driftRun: { created_at: new Date(NOW - 30 * 60000).toISOString(), status: "completed", conclusion: "success" },
        alarms: [{ AlarmName: "ih-contact-ses-failures", StateValue: "OK" }],
        jobs: [{ status: "SUCCEED", endTime: new Date("2026-11-26T15:30:00Z"), commitId: "abc1234def" }],
        logEvents: [],
        logsError: null,
        cardSlot: "free", // "free", "taken" or "error"
        renewal: { key: "IW-99" },
    };
    globalThis.__aws = {
        ssm: async (cmd) => {
            const values = { "/test/webhook": WEBHOOK, "/test/link-secret": "test-secret" };
            return { Parameter: { Value: values[cmd.input.Name] } };
        },
        cloudwatch: async () => ({ MetricAlarms: world.alarms }),
        amplify: async () => ({ jobSummaries: world.jobs }),
        logs: async (cmd) => {
            aws.push(["logs", cmd.constructor.name, cmd.input]);
            if (world.logsError) throw world.logsError;
            return { events: world.logEvents };
        },
        db: async (cmd) => {
            aws.push(["db", cmd.constructor.name, cmd.input]);
            if (world.cardSlot === "taken") throw Object.assign(new Error("taken"), { name: "ConditionalCheckFailedException" });
            if (world.cardSlot === "error") throw new Error("DynamoDB is down");
            return {};
        },
        lambda: async (cmd) => {
            aws.push(["lambda", cmd.constructor.name, JSON.parse(cmd.input.Payload)]);
            return { Payload: Buffer.from(JSON.stringify(world.renewal)) };
        },
    };
    const redirects = {
        [`${APEX}/about`]: `${SITE}/about`,
        [`${SITE}/about-us/`]: `${SITE}/about`,
        [`${SITE}/wp-content/uploads/privacy_statement.pdf`]: `${SITE}/documents/privacy_statement.pdf`,
    };
    globalThis.fetch = async (url, init = {}) => {
        if (url === WEBHOOK) {
            posted.push(JSON.parse(init.body));
            return new Response(null, { status: 202 });
        }
        if (url === CONTACT) return new Response(null, { status: world.contactStatus });
        if (url.includes("/actions/workflows/drift.yml/runs")) return Response.json({ workflow_runs: [world.driftRun] });
        if (url.includes("/issues?labels=drift")) return Response.json(world.driftIssues);
        if (redirects[url]) return new Response(null, { status: 301, headers: { location: redirects[url] } });
        if (url.startsWith(SITE)) {
            const status = world.pageStatus[url.slice(SITE.length)] ?? 200;
            return new Response(null, { status, headers: SECURITY_HEADERS });
        }
        throw new Error(`Unexpected fetch: ${url}`);
    };
    console.log = (line) => logged.push(line);
});

// Jira button links carry a base64 payload and a signature. Decode them so
// the snapshot shows what the ticket would contain.
const readable = (payload) =>
    JSON.parse(JSON.stringify(payload), (_key, value) => {
        if (typeof value !== "string" || !value.startsWith(`${JIRA_LINK}?`)) return value;
        const q = new URL(value).searchParams;
        return { link: JIRA_LINK, d: JSON.parse(Buffer.from(q.get("d"), "base64url").toString()), s: q.get("s") };
    });

const alarm = (message) => handler({ Records: [{ Sns: { Message: JSON.stringify(message) } }] });

const CONTACT_ALARM = {
    AlarmName: "ih-contact-ses-failures",
    AlarmDescription: "Contact form emails are failing to send",
    OldStateValue: "OK",
    NewStateValue: "ALARM",
    NewStateReason: "Threshold Crossed: 1 datapoint [2.0] was greater than the threshold (0.0).",
    StateChangeTime: "2026-11-27T11:58:00.000+0000",
};
const CLIENT_ALARM = {
    AlarmName: "ih-site-client-errors",
    AlarmDescription: "Browser errors reported",
    OldStateValue: "OK",
    NewStateValue: "ALARM",
    NewStateReason: "Threshold Crossed",
    StateChangeTime: "2026-11-27T11:59:00.000+0000",
};
const report = (minutesAgo, fields) => ({
    timestamp: NOW - minutesAgo * 60000,
    message: JSON.stringify({
        source: "client",
        level: "error",
        host: "www.ivyhilltech.com",
        commit: "abc1234",
        userAgent: "Firefox/140",
        ...fields,
    }),
});

// ---- Daily report ----

test("daily report: all checks pass", async (t) => {
    const result = await handler({});
    assert.equal(result.failed, 0);
    assert.equal(posted.length, 1);
    t.assert.snapshot(readable(posted[0]));
});

test("daily report: failing checks get a Jira button", async (t) => {
    world.pageStatus["/about"] = 404;
    world.contactStatus = 200;
    world.driftIssues = [{ title: "Drift detected", number: 42 }];
    world.alarms.push({ AlarmName: "ih-contact-errors", StateValue: "ALARM" });
    world.jobs[0].status = "FAILED";
    globalThis.__certValidTo = new Date(NOW + 10 * 86400000).toUTCString();
    world.logEvents = [report(60, { page: "/about", message: "boom" }), report(30, { page: "/", message: "bang" })];
    const result = await handler({});
    assert.equal(result.failed, 6);
    t.assert.snapshot(readable(posted[0]));
});

test("daily report: Jira token near expiry opens a renewal ticket", async () => {
    await handler({});
    const invoked = aws.filter(([s]) => s === "lambda");
    assert.equal(invoked.length, 1);
    assert.equal(invoked[0][2].id, "renewal#2026-12-07");
});

test("daily report: GitHub rate limit is a warning, not a failure", async (t) => {
    const realFetch = globalThis.fetch;
    globalThis.fetch = (url, init) =>
        url.includes("api.github.com") ? new Response(null, { status: 403 }) : realFetch(url, init);
    const result = await handler({});
    assert.equal(result.failed, 0);
    t.assert.snapshot(readable(posted[0]));
});

// ---- Contact form alarms ----

test("contact alarm firing: card with Why and a Jira button", async (t) => {
    assert.deepEqual(await alarm(CONTACT_ALARM), { posted: 1 });
    t.assert.snapshot(readable(posted[0]));
});

test("contact alarm recovered: green card, no Jira button", async (t) => {
    await alarm({ ...CONTACT_ALARM, OldStateValue: "ALARM", NewStateValue: "OK", NewStateReason: "Back to normal" });
    t.assert.snapshot(readable(posted[0]));
});

test("contact alarm without description or reason", async (t) => {
    const { AlarmDescription, NewStateReason, ...bare } = CONTACT_ALARM;
    await alarm(bare);
    t.assert.snapshot(readable(posted[0]));
});

// ---- Browser error alarms ----

test("client errors firing: latest error details, sanitized on the card", async (t) => {
    world.logEvents = [
        report(10, { page: "/about", message: "older error" }),
        report(2, {
            page: "/contact",
            message: "Click [here](https://evil.example) or www.evil.example <b>now</b>",
            data: { component: "ContactForm" },
        }),
    ];
    await alarm(CLIENT_ALARM);
    t.assert.snapshot(readable(posted[0]));
    // The cooldown slot was claimed for an hour.
    t.assert.snapshot(aws.filter(([s]) => s === "db"));
});

test("client errors firing: stack goes to the ticket, capped at 1500 chars", async (t) => {
    world.logEvents = [
        report(1, { page: "/", message: "TypeError: x is undefined", data: { stack: `at f\n${"x".repeat(2000)}` } }),
    ];
    await alarm(CLIENT_ALARM);
    const ticket = readable(posted[0]).attachments[0].content.actions[1].url.d;
    assert.equal(ticket.stack.length, 1500);
    assert.ok(!ticket.facts.some(([name]) => name === "Details"));
    t.assert.snapshot(readable(posted[0]));
});

test("client errors firing, no reports found: generic card", async (t) => {
    await alarm(CLIENT_ALARM);
    t.assert.snapshot(readable(posted[0]));
});

test("client errors firing, reading logs fails: same as no reports", async (t) => {
    world.logsError = new Error("Logs unavailable");
    const realError = console.error;
    console.error = () => {};
    try {
        await alarm(CLIENT_ALARM);
    } finally {
        console.error = realError;
    }
    t.assert.snapshot(readable(posted[0]));
});

test("client errors recovered: nothing posted", async () => {
    await alarm({ ...CLIENT_ALARM, OldStateValue: "ALARM", NewStateValue: "OK" });
    assert.equal(posted.length, 0);
    assert.equal(aws.length, 0);
});

test("client errors within the cooldown: nothing posted, skip logged", async () => {
    world.cardSlot = "taken";
    await alarm(CLIENT_ALARM);
    assert.equal(posted.length, 0);
    assert.deepEqual(JSON.parse(logged[0]), { source: "health", skipped: "client-errors card", reason: "cooldown" });
});

test("client errors with Demo: skips the cooldown check", async () => {
    world.cardSlot = "taken";
    await alarm({ ...CLIENT_ALARM, Demo: true });
    assert.equal(posted.length, 1);
    assert.ok(!aws.some(([s]) => s === "db"));
});

test("client errors when DynamoDB fails: posts anyway (fail open)", async () => {
    world.cardSlot = "error";
    const realError = console.error;
    console.error = () => {};
    try {
        await alarm(CLIENT_ALARM);
    } finally {
        console.error = realError;
    }
    assert.equal(posted.length, 1);
});

test("several SNS records: one card each", async () => {
    const records = [CONTACT_ALARM, { ...CONTACT_ALARM, NewStateValue: "OK" }].map((m) => ({
        Sns: { Message: JSON.stringify(m) },
    }));
    assert.deepEqual(await handler({ Records: records }), { posted: 2 });
    assert.equal(posted.length, 2);
});
