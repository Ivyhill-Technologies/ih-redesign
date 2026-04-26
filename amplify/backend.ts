import { defineBackend } from "@aws-amplify/backend";
import { CfnWebACL, CfnWebACLAssociation } from "aws-cdk-lib/aws-wafv2";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

const backend = defineBackend({
    auth,
    data,
});

// Rate-limit the AppSync API at the edge so a single IP can't spam the
// contact form. AWS WAF rate-based rules count requests per 5-minute
// window per IP; 100 is well above any legitimate use of this site.
const wafStack = backend.createStack("WafStack");
const graphqlApi = backend.data.resources.cfnResources.cfnGraphqlApi;

const webAcl = new CfnWebACL(wafStack, "ContactApiWebAcl", {
    defaultAction: { allow: {} },
    scope: "REGIONAL",
    visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: "ContactApiWebAcl",
        sampledRequestsEnabled: true,
    },
    rules: [
        {
            name: "RateLimitPerIp",
            priority: 1,
            action: { block: {} },
            statement: {
                rateBasedStatement: {
                    limit: 100,
                    aggregateKeyType: "IP",
                },
            },
            visibilityConfig: {
                cloudWatchMetricsEnabled: true,
                metricName: "RateLimitPerIp",
                sampledRequestsEnabled: true,
            },
        },
    ],
});

new CfnWebACLAssociation(wafStack, "ContactApiWebAclAssociation", {
    resourceArn: graphqlApi.attrArn,
    webAclArn: webAcl.attrArn,
});
