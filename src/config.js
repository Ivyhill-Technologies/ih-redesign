// Contact form endpoint (AWS Lambda function URL, defined in infra/main.tf).
// Not a secret: browsers call it directly. CORS limits which sites can use it.
export const CONTACT_URL = "https://udhccr6nxn422hdz5v2gnhrezm0ciydp.lambda-url.us-east-1.on.aws/";

// Client log endpoint (AWS Lambda function URL, defined in infra/client-log.tf).
// src/log.js sends log.error() reports here. Empty means reporting is off.
export const LOG_URL = "https://v7z3wffbslan2ivdraxqjkgyea0txqoj.lambda-url.us-east-1.on.aws/";
