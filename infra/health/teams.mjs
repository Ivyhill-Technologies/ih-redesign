// Everything about talking to Teams: building a message, adding a
// "Create Jira ticket" button, and posting it to the channel.
import { createHmac } from "node:crypto";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { DRY_RUN, JIRA_LINK_URL, LINK_SECRET_PARAM, LINK_TTL_DAYS, SITE, WEBHOOK_PARAM } from "./config.mjs";

const DAY_MS = 86400000;

// --- Building a message ------------------------------------------------------

// A Teams message holding one Adaptive Card (the box you see in the channel):
//
//   title    bold, colored: "Good" = green, "Attention" = red
//   facts    two-column rows: [{ title, value }, ...]
//   footer   small grey line at the bottom (optional)
//   actions  extra buttons after "Open site", e.g. a Jira button (optional)
export const buildTeamsMessage = (title, color, facts, footer, actions = []) => ({
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

// --- Secrets -----------------------------------------------------------------

const ssm = new SSMClient({});

// Reads one encrypted value from SSM Parameter Store.
export const ssmParam = async (name) => {
    const reply = await ssm.send(new GetParameterCommand({ Name: name, WithDecryption: true }));
    return reply.Parameter.Value;
};

// --- "Create Jira ticket" button ---------------------------------------------

// The ticket rides inside the link, so nothing is stored:
//   d = the ticket + an expiry time, as base64 JSON
//   s = a signature of d (HMAC with a secret only we and ih-jira-ticket know),
//       so nobody can change the ticket or make their own link
// ticket: { summary, facts, stack?, link?, priority? }
let linkSecret; // read from SSM once, then reused while the Lambda stays warm
export const jiraButton = async (ticket) => {
    linkSecret ??= await ssmParam(LINK_SECRET_PARAM);
    const expires = Date.now() + LINK_TTL_DAYS * DAY_MS;
    const d = Buffer.from(JSON.stringify({ ...ticket, exp: expires })).toString("base64url");
    const s = createHmac("sha256", linkSecret).update(d).digest("hex");
    return { type: "Action.OpenUrl", title: "Create Jira ticket", url: `${JIRA_LINK_URL}?d=${d}&s=${s}` };
};

// --- Posting -----------------------------------------------------------------

// Posts a message to the Teams channel's Workflows webhook.
// Throws if Teams says no, so the run fails and the ih-site-health-errors
// alarm emails us. A quiet channel must never look like "all good".
let webhookUrl; // read from SSM once, then reused while the Lambda stays warm
export const sendToTeams = async (message) => {
    if (DRY_RUN) return console.log(JSON.stringify(message, null, 2));
    webhookUrl ??= await ssmParam(WEBHOOK_PARAM);
    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(message),
        signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Teams webhook returned ${response.status}`);
};
