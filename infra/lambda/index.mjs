// Contact form handler: validates the submission and emails it to info@ via SES.
// Mirrors the old WordPress (Formidable) "Contact" form email notification.
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});
const TO = process.env.TO_ADDRESS;
const FROM = process.env.FROM_ADDRESS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { firstName: 100, lastName: 100, email: 254, subject: 200, message: 5000 };

const reply = (statusCode, body) => ({
    statusCode,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
});

// Strip CR/LF so a field can't inject extra email headers.
const oneLine = (s) => s.replace(/[\r\n]+/g, " ");

export const handler = async (event) => {
    if (event.requestContext?.http?.method !== "POST") return reply(405, { error: "Method not allowed" });

    let data;
    try {
        const raw = event.isBase64Encoded ? Buffer.from(event.body ?? "", "base64").toString() : event.body;
        data = JSON.parse(raw ?? "{}");
    } catch {
        return reply(400, { error: "Invalid request." });
    }

    // Honeypot: real users never fill this. Pretend success so bots move on.
    if (data.website) return reply(200, { ok: true });

    const f = {};
    for (const [key, max] of Object.entries(LIMITS)) {
        const v = typeof data[key] === "string" ? data[key].trim() : "";
        if (!v || v.length > max) return reply(400, { error: `Please check the ${key} field.` });
        f[key] = v;
    }
    if (!EMAIL_RE.test(f.email)) return reply(400, { error: "Enter a valid email address." });
    if (f.message.length < 10) return reply(400, { error: "Please add a few more details." });

    try {
        await ses.send(
            new SendEmailCommand({
                FromEmailAddress: FROM,
                Destination: { ToAddresses: [TO] },
                ReplyToAddresses: [oneLine(f.email)],
                Content: {
                    Simple: {
                        Subject: { Data: oneLine(f.subject) },
                        Body: {
                            Text: {
                                Data: `${f.message}\n\nFrom: ${oneLine(f.firstName)} ${oneLine(f.lastName)}, ${oneLine(f.email)}`,
                            },
                        },
                    },
                },
            }),
        );
    } catch (err) {
        console.error("SES send failed", err);
        return reply(500, { error: "Something went wrong. Please email info@ivyhilltech.com directly." });
    }

    return reply(200, { ok: true });
};
