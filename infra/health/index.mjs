// ih-site-health: tells the Teams channel how ivyhilltech.com is doing.
// AWS calls `handler` in two ways (wired up in infra/health.tf and
// infra/client-log.tf):
//
//   EventBridge Scheduler, 7 AM Eastern  → event {}         → daily.mjs
//   SNS, when a CloudWatch alarm changes → event { Records } → alarms.mjs
//
// The other files:
//   teams.mjs           builds and sends Teams messages, makes Jira buttons
//   browser-errors.mjs  reads and sanitizes visitors' browser error reports
//   config.mjs          settings from the environment (infra/health.tf)
import { postAlarm } from "./alarms.mjs";
import { dailyReport } from "./daily.mjs";

// SNS events look like { Records: [{ Sns: { Message: "<alarm JSON>" } }] }.
// The scheduler (and a hand-run `aws lambda invoke`) sends {}.
const isAlarmEvent = (event) => Boolean(event?.Records?.[0]?.Sns);

export const handler = async (event) => {
    if (isAlarmEvent(event)) {
        for (const record of event.Records) await postAlarm(record);
        return { posted: event.Records.length };
    }
    return dailyReport();
};
