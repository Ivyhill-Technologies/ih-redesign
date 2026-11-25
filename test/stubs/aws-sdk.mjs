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
