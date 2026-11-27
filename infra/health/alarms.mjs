// Alarm messages: a CloudWatch alarm changes state → SNS → here → Teams.
//
//   Contact form alarms and ih-site-health-errors → alarmMessage()
//     a card when it fires (with a Jira button) and when it recovers.
//   ih-site-client-errors (browser errors) → browserErrorsMessage()
//     anyone can send a browser error report, so: no "recovered" card, at most
//     one card per hour (tryClaimCardSlot), and every report field is sanitized
//     with untrusted(). The daily report counts the full 24 hours, so the cap
//     hides nothing.
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { recentClientErrors, untrusted } from "./browser-errors.mjs";
import { CLIENT_LOG_GROUP, RATE_TABLE } from "./config.mjs";
import { buildTeamsMessage, jiraButton, sendToTeams } from "./teams.mjs";

const CLIENT_ERRORS_ALARM = "ih-site-client-errors";
const CONTACT_LOG_GROUP = "/aws/lambda/ih-contact-form";
const CARD_COOLDOWN_MINUTES = 60;

// --- Small helpers -----------------------------------------------------------

// A time as Eastern, e.g. "Nov 27, 2026, 6:59:00 AM".
const when = (ms) =>
    new Date(ms).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "medium" });

// A CloudWatch console link to a log group. The console wants the name
// URL-encoded twice with % swapped for $. That's AWS's format, not a bug.
const logsUrl = (group) =>
    `https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/${encodeURIComponent(encodeURIComponent(group)).replace(/%/g, "$")}`;

// Writes the cooldown row (card#client-errors), only if it's missing or
// expired. `now` is in seconds. One DynamoDB step: the check and the write
// happen together, so two alarms at once can't both get through.
// Throws ConditionalCheckFailedException if the row is still live.
const writeCooldownRow = (now) =>
    new DynamoDBClient({}).send(
        new PutItemCommand({
            TableName: RATE_TABLE,
            Item: { pk: { S: "card#client-errors" }, expiresAt: { N: String(now + CARD_COOLDOWN_MINUTES * 60) } },
            ConditionExpression: "attribute_not_exists(pk) OR expiresAt < :now",
            ExpressionAttributeValues: { ":now": { N: String(now) } },
        }),
    );

// The one browser-error card allowed per CARD_COOLDOWN_MINUTES.
// true = it's ours, post the card. false = a card already went out this hour.
// Fails open: if DynamoDB itself errors, post anyway (a missed alert is worse
// than an extra card).
const tryClaimCardSlot = async () => {
    try {
        await writeCooldownRow(Math.floor(Date.now() / 1000));
        return true;
    } catch (err) {
        if (err.name === "ConditionalCheckFailedException") return false;
        console.error("Card cooldown check failed; posting anyway", err);
        return true;
    }
};

// --- The messages ------------------------------------------------------------
// `alarm` is CloudWatch's SNS message: AlarmName, AlarmDescription,
// OldStateValue, NewStateValue ("ALARM" or "OK"), NewStateReason, StateChangeTime.
// Each card has two lists side by side: `facts` for the Teams card
// (sanitized where the text is public) and `ticket` for the Jira button (raw).

// The rows every alarm card starts with.
const alarmFacts = (alarm) => [
    { title: "What", value: alarm.AlarmDescription ?? "" },
    { title: "State", value: `${alarm.OldStateValue} → ${alarm.NewStateValue}` },
];

// The Jira ticket for an alarm when there are no error details to add.
const alarmTicket = (alarm, logGroup) => ({
    summary: `Site alarm: ${alarm.AlarmName}`,
    facts: [
        ["What", alarm.AlarmDescription],
        ["Why", alarm.NewStateReason],
        ["When", when(Date.parse(alarm.StateChangeTime) || Date.now())],
    ],
    link: { title: `CloudWatch logs: ${logGroup}`, url: logsUrl(logGroup) },
});

// Wraps facts and a ticket into the Teams message: red "is firing" with a Jira
// button, or green "recovered" without one.
const alarmCard = async (alarm, logGroup, facts, ticket) => {
    const firing = alarm.NewStateValue === "ALARM";
    const title = firing ? `🚨 ${alarm.AlarmName} is firing` : `✅ ${alarm.AlarmName} recovered`;
    const actions = firing ? [await jiraButton(ticket)] : [];
    return buildTeamsMessage(title, firing ? "Attention" : "Good", facts, `Logs: CloudWatch → ${logGroup}`, actions);
};

// Contact form and health Lambda alarms: What, State, Why.
const alarmMessage = (alarm) => {
    const facts = [...alarmFacts(alarm), { title: "Why", value: alarm.NewStateReason ?? "" }];
    return alarmCard(alarm, CONTACT_LOG_GROUP, facts, alarmTicket(alarm, CONTACT_LOG_GROUP));
};

// Browser errors: What, State, then the latest report's details.
// `errors` is newest first. If none were found (or reading them failed), the
// card has just What and State.
const browserErrorsMessage = (alarm, errors) => {
    const latest = errors[0];
    if (!latest) return alarmCard(alarm, CLIENT_LOG_GROUP, alarmFacts(alarm), alarmTicket(alarm, CLIENT_LOG_GROUP));

    const page = `${latest.host ?? ""}${latest.page ?? ""}`;
    const pagesAffected = [...new Set(errors.map((e) => e.page))].join(", ");
    const facts = [
        ...alarmFacts(alarm),
        { title: "Errors (15 min)", value: String(errors.length) },
        { title: "Latest", value: untrusted(latest.message) },
        { title: "Page", value: untrusted(page) },
        { title: "Pages affected", value: untrusted(pagesAffected) },
        { title: "Build", value: untrusted(latest.commit, 20) },
        { title: "Browser", value: untrusted(latest.userAgent) },
    ];
    // Extra data goes in "Details" unless it's a stack trace, which gets its own block.
    const details = latest.data && !latest.data.stack ? [["Details", JSON.stringify(latest.data)]] : [];
    const ticket = {
        summary: `Site error: ${latest.message} on ${latest.page}`,
        facts: [
            ["Error", latest.message],
            ["Page", page],
            ["When", when(latest.time)],
            ["Errors in 15 min", errors.length],
            ["Pages affected", pagesAffected],
            ["Build", latest.commit],
            ["Browser", latest.userAgent],
            ...details,
        ],
        stack: latest.data?.stack?.slice(0, 1500),
        link: alarmTicket(alarm, CLIENT_LOG_GROUP).link,
    };
    return alarmCard(alarm, CLIENT_LOG_GROUP, facts, ticket);
};

// --- The flow ----------------------------------------------------------------

// One SNS record = one alarm state change = at most one Teams message.
export const postAlarm = async (record) => {
    const alarm = JSON.parse(record.Sns.Message);

    if (alarm.AlarmName !== CLIENT_ERRORS_ALARM) {
        await sendToTeams(await alarmMessage(alarm));
        return;
    }

    // Browser errors: firing only, and at most one card per cooldown.
    // alarm.Demo is set only by scripts/demo-site-error.sh, which invokes this
    // Lambda directly (IAM-only), so outsiders can't use it to skip the cap.
    if (alarm.NewStateValue !== "ALARM") return;
    if (!alarm.Demo && !(await tryClaimCardSlot())) {
        console.log(JSON.stringify({ source: "health", skipped: "client-errors card", reason: "cooldown" }));
        return;
    }
    const errors = await recentClientErrors().catch((err) => {
        console.error("Reading client errors failed", err);
        return [];
    });
    await sendToTeams(await browserErrorsMessage(alarm, errors));
};
