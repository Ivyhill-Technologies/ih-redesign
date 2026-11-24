// Contact form endpoint (AWS Lambda function URL, defined in infra/main.tf).
// Not a secret: browsers call it directly. CORS limits which sites can use it.
export const CONTACT_URL = "https://udhccr6nxn422hdz5v2gnhrezm0ciydp.lambda-url.us-east-1.on.aws/";
