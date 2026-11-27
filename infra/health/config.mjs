// Settings for the health Lambda.
//
// Everything except SITE comes from environment variables set in
// infra/health.tf. To change one, edit it there and run terraform apply.
// They're read once, when the Lambda starts, not on every run.

// The site we're reporting on. The cards' "Open site" button goes here.
export const SITE = "https://www.ivyhilltech.com";

// --- Teams -------------------------------------------------------------------

// Name of the SSM parameter that holds the Teams webhook URL (not the URL itself).
export const WEBHOOK_PARAM = process.env.WEBHOOK_PARAM;

// "1" = print the Teams message to the log instead of posting it.
export const DRY_RUN = process.env.DRY_RUN === "1";

// --- "Create Jira ticket" buttons --------------------------------------------

// The ih-jira-ticket Lambda's public URL. Buttons link here.
export const JIRA_LINK_URL = process.env.JIRA_LINK_URL;

// Name of the SSM parameter holding the secret that signs button links.
export const LINK_SECRET_PARAM = process.env.LINK_SECRET_PARAM;

// How long a button keeps working.
export const LINK_TTL_DAYS = Number(process.env.LINK_TTL_DAYS || 30);

// --- Daily report checks -----------------------------------------------------

// The contact form Lambda's URL ("Contact form backend" check).
export const CONTACT_URL = process.env.CONTACT_URL;

// The Amplify app whose deploys we report ("Last production deploy" check).
export const AMPLIFY_APP_ID = process.env.AMPLIFY_APP_ID;

// Alarms whose names start with this count in the "Alarms" check.
export const ALARM_PREFIX = process.env.ALARM_PREFIX;

// The Jira API token's expiry date, YYYY-MM-DD ("Jira token" check).
export const JIRA_TOKEN_EXPIRES = process.env.JIRA_TOKEN_EXPIRES;

// The ih-jira-ticket Lambda's name, for opening the token renewal ticket.
export const JIRA_FUNCTION = process.env.JIRA_FUNCTION;

// --- Browser errors ----------------------------------------------------------

// Log group where visitors' browser error reports land (infra/client-log).
export const CLIENT_LOG_GROUP = process.env.CLIENT_LOG_GROUP;

// DynamoDB table holding the browser-error card cooldown row.
export const RATE_TABLE = process.env.RATE_TABLE;
