// Contact form Lambda (infra/lambda/index.mjs), with the AWS SDK stubbed out.
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { beforeEach, test } from "node:test";

const stub = new URL("./stubs/aws-sdk.mjs", import.meta.url).href;
registerHooks({
    resolve: (spec, ctx, next) => (spec.startsWith("@aws-sdk/") ? { url: stub, shortCircuit: true } : next(spec, ctx)),
});
const { handler } = await import("../infra/lambda/index.mjs");

let sent;
beforeEach(() => {
    sent = [];
    globalThis.__aws = {
        db: async () => ({}),
        ses: async (cmd) => sent.push(cmd.input),
    };
});

const VALID = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    subject: "Hello",
    message: "I'd like to talk about a project.",
};
const post = (body, method = "POST") =>
    handler({
        requestContext: { http: { method, sourceIp: "203.0.113.7" } },
        body: typeof body === "string" ? body : JSON.stringify(body),
    });
const parse = (res) => ({ status: res.statusCode, body: JSON.parse(res.body) });

test("sends a valid message with Reply-To set to the visitor", async () => {
    assert.equal((await post(VALID)).statusCode, 200);
    assert.equal(sent.length, 1);
    assert.deepEqual(sent[0].ReplyToAddresses, ["ada@example.com"]);
});

test("rejects non-POST requests", async () => {
    assert.equal((await post(VALID, "GET")).statusCode, 405);
});

test("rejects malformed JSON", async () => {
    assert.equal((await post("{nope")).statusCode, 400);
});

test("honeypot: pretends success but sends nothing", async () => {
    assert.equal((await post({ ...VALID, website: "spam.example" })).statusCode, 200);
    assert.equal(sent.length, 0);
});

test("rejects missing, oversized and invalid fields", async () => {
    for (const bad of [
        { firstName: "" },
        { subject: "x".repeat(201) },
        { email: "not-an-email" },
        { message: "too short" },
    ]) {
        const res = parse(await post({ ...VALID, ...bad }));
        assert.equal(res.status, 400, JSON.stringify(bad));
    }
    assert.equal(sent.length, 0);
});

test("strips CR/LF from fields used in email headers", async () => {
    await post({ ...VALID, subject: "Hi\r\nBcc: victim@example.com" });
    assert.equal(sent[0].Content.Simple.Subject.Data, "Hi Bcc: victim@example.com");
});

test("returns 429 when the rate limit is hit", async () => {
    globalThis.__aws.db = async () => {
        throw Object.assign(new Error("over"), { name: "ConditionalCheckFailedException" });
    };
    assert.equal((await post(VALID)).statusCode, 429);
    assert.equal(sent.length, 0);
});

test("fails open when DynamoDB is down", async (t) => {
    t.mock.method(console, "error", () => {});
    globalThis.__aws.db = async () => {
        throw new Error("DynamoDB unavailable");
    };
    assert.equal((await post(VALID)).statusCode, 200);
    assert.equal(sent.length, 1);
});

test("returns 500 and logs the alarm message when SES fails", async (t) => {
    const errors = t.mock.method(console, "error", () => {});
    globalThis.__aws.ses = async () => {
        throw new Error("SES down");
    };
    assert.equal((await post(VALID)).statusCode, 500);
    // The CloudWatch metric filter in infra/main.tf matches this exact text.
    assert.equal(errors.mock.calls[0].arguments[0], "SES send failed");
});
