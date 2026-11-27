// Browser error reports: reading them, and making their text safe to show.
// Visitors' browsers send these to the public ih-client-log endpoint, which
// writes one JSON line per report to CLIENT_LOG_GROUP (infra/client-log).
// Used by the daily report ("Browser errors (24h)") and the alarm cards.
import { CloudWatchLogsClient, FilterLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { CLIENT_LOG_GROUP } from "./config.mjs";

const MINUTE_MS = 60000;
const MAX_PER_PAGE = 1000; // the most CloudWatch returns per request

// The newest error reports from the last `minutes`, at most `max` of them,
// newest first. Each is the report's own fields plus `time` (ms).
// Same filter as the metric filter behind the alarm, so they count the same things.
export const recentClientErrors = async (minutes = 15, max = 50) => {
    const logs = new CloudWatchLogsClient({});
    const events = [];
    let nextToken; // CloudWatch hands back a token when there's another page
    do {
        const page = await logs.send(
            new FilterLogEventsCommand({
                logGroupName: CLIENT_LOG_GROUP,
                startTime: Date.now() - minutes * MINUTE_MS,
                filterPattern: '{ $.source = "client" && $.level = "error" }',
                limit: Math.min(max - events.length, MAX_PER_PAGE),
                nextToken,
            }),
        );
        events.push(...(page.events ?? []));
        nextToken = page.nextToken;
    } while (nextToken && events.length < max);

    const reports = events.map((event) => ({ time: event.timestamp, ...JSON.parse(event.message) }));
    return reports.sort((a, b) => b.time - a.time);
};

// Makes text from a report safe to put on a Teams card.
// Anyone can send a report, and Teams turns Markdown into clickable links,
// so a fake report could plant a phishing link in the channel. This:
//   1. removes [ ] < >        (no Markdown links, no <https://...> links, no HTML)
//   2. https:// → hxxps://    ("defanged": readable, not clickable)
//   3. www.     → www[.]      (same, for bare www. addresses)
//   4. cuts it to `max` characters, so one report can't make a giant card
export const untrusted = (value, max = 300) =>
    String(value ?? "")
        .replace(/[[\]<>]/g, "")
        .replace(/\bhttp(s?):\/\//gi, "hxxp$1://")
        .replace(/\bwww\./gi, "www[.]")
        .slice(0, max);
