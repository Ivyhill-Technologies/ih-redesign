// Client log sink. The site's log.error() (src/log.js) posts reports here, and
// each one is written as a single JSON line to CloudWatch Logs
// (/aws/lambda/ih-client-log), where Logs Insights can query its fields.
// Public endpoint, so: size cap, field caps, per-IP rate limit, and reserved
// concurrency (in Terraform). It always answers 204 so callers learn nothing.
import { createHash } from "node:crypto";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const db = new DynamoDBClient({});
const RATE_TABLE = process.env.RATE_TABLE;

const MAX_BODY = 8000; // bytes
const MAX_PER_WINDOW = 30; // reports per IP per hour
const WINDOW_SECONDS = 3600;
const LEVELS = new Set(["error", "debug"]);

// Same table and approach as the contact form, with a "log#" key prefix.
// The IP is stored only as a hash. Fails open if DynamoDB errors.
const underRateLimit = async (ip) => {
    const window = Math.floor(Date.now() / 1000 / WINDOW_SECONDS);
    const key = createHash("sha256").update(`log#${ip}#${window}`).digest("hex");
    try {
        await db.send(
            new UpdateItemCommand({
                TableName: RATE_TABLE,
                Key: { pk: { S: key } },
                UpdateExpression: "ADD hits :one SET expiresAt = :exp",
                ConditionExpression: "attribute_not_exists(hits) OR hits < :max",
                ExpressionAttributeValues: {
                    ":one": { N: "1" },
                    ":max": { N: String(MAX_PER_WINDOW) },
                    ":exp": { N: String((window + 2) * WINDOW_SECONDS) },
                },
            }),
        );
        return true;
    } catch (err) {
        if (err.name === "ConditionalCheckFailedException") return false;
        console.error("Rate limit check failed; allowing request", err);
        return true;
    }
};

const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : undefined);

const done = { statusCode: 204 };

export const handler = async (event) => {
    if (event.requestContext?.http?.method !== "POST") return { statusCode: 405 };

    const raw = event.isBase64Encoded ? Buffer.from(event.body ?? "", "base64").toString() : (event.body ?? "");
    if (!raw || raw.length > MAX_BODY) return done;

    let r;
    try {
        r = JSON.parse(raw);
    } catch {
        return done;
    }
    if (!r || typeof r !== "object" || !str(r.message, 1)) return done;

    if (!(await underRateLimit(event.requestContext.http.sourceIp))) return done;

    // One JSON object per line: Logs Insights discovers these as fields.
    const entry = {
        source: "client",
        level: LEVELS.has(r.level) ? r.level : "error",
        message: str(r.message, 1000),
        page: str(r.page, 300),
        host: str(r.host, 100),
        commit: str(r.commit, 20),
        userAgent: str(event.headers?.["user-agent"], 300),
        data: r.data && typeof r.data === "object" ? r.data : undefined,
    };
    process.stdout.write(`${JSON.stringify(entry)}\n`);
    return done;
};
