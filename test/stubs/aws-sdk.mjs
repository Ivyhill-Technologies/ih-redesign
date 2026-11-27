// Stand-in for @aws-sdk/client-* in tests. Each client's send() calls the
// matching function on globalThis.__aws, so a test controls what AWS "returns".
class Client {
    send(command) {
        return globalThis.__aws[this.constructor.service](command);
    }
}
class Command {
    constructor(input) {
        this.input = input;
    }
}
export class SESv2Client extends Client {
    static service = "ses";
}
export class DynamoDBClient extends Client {
    static service = "db";
}
export class SendEmailCommand extends Command {}
export class UpdateItemCommand extends Command {}

// Used by the health Lambda (infra/health/index.mjs).
export class AmplifyClient extends Client {
    static service = "amplify";
}
export class CloudWatchClient extends Client {
    static service = "cloudwatch";
}
export class CloudWatchLogsClient extends Client {
    static service = "logs";
}
export class LambdaClient extends Client {
    static service = "lambda";
}
export class SSMClient extends Client {
    static service = "ssm";
}
export class ListJobsCommand extends Command {}
export class DescribeAlarmsCommand extends Command {}
export class FilterLogEventsCommand extends Command {}
export class PutItemCommand extends Command {}
export class InvokeCommand extends Command {}
export class GetParameterCommand extends Command {}
