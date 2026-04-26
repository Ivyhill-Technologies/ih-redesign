import { Icon } from "../../components/Icons.jsx";
import { SiteShell } from "../../components/SiteShell.jsx";
import { CapabilityCards } from "../../sections/capabilities/CapabilityCards.jsx";
import { CapabilityHero } from "../../sections/capabilities/CapabilityHero.jsx";
import { CapabilityIntro } from "../../sections/capabilities/CapabilityIntro.jsx";
import { CapabilityTools } from "../../sections/capabilities/CapabilityTools.jsx";

const SUB_CAPABILITIES = [
    {
        icon: Icon.Phone,
        title: "Mobile-Ready Solutions",
        body: "Cross-platform mobile applications engineered for location-independent agency operations — encrypted communications, offline-capable workflows, and role-based access controls that meet federal security baselines from day one.",
        tags: ["Cross-platform", "Encrypted", "Offline-capable"],
    },
    {
        icon: Icon.Code,
        title: "SharePoint & Power Platform",
        body: "Deep SharePoint development — custom SPFx web parts, site architecture, and enterprise intranet builds — paired with expert Power Apps, Power Automate, Power BI, and Dataverse delivery to turn the M365 investment agencies already own into governed, mission-capable solutions.",
        tags: ["SharePoint", "Power Apps", "Power Automate", "Power BI", "Dataverse"],
    },
    {
        icon: Icon.Code,
        title: "Customized Development",
        body: "Bespoke full-stack engineering for mission requirements that off-the-shelf platforms cannot meet — JavaScript, PHP, and Python services backed by relational databases, with documented architectures and source-code transfer at contract close.",
        tags: ["JavaScript", "PHP", "Python", "PostgreSQL"],
    },
    {
        icon: Icon.Server,
        title: "Cloud Engineering",
        body: "Application delivery against the three major cloud environments agencies operate in — Azure, AWS, and Google Cloud — with infrastructure-as-code, managed-database deployments, and security controls aligned to the agency's authorization boundary.",
        tags: ["Azure", "AWS", "GCP", "IaC"],
    },
];

const OUTCOMES = [
    "Replace manual, paper-bound workflows with cross-platform applications agency staff actually use.",
    "Capture mission-critical data at the point of work — and keep it inside agency control.",
    "Build SharePoint intranets, SPFx web parts, and Power Platform solutions on the M365 stack agencies already own.",
    "Deliver bespoke systems against documented architectures, with code and artifacts transferred at close.",
];

const TOOL_GROUPS = [
    {
        category: "SharePoint & Power Platform",
        summary:
            "Ivyhill's SharePoint practice covers the full stack — from enterprise intranet architecture and custom SPFx web parts to list-backed workflows and permissions governance — running inside the M365 tenant the agency already owns and has authorized. Power Platform extends that foundation: Power Apps for rapid application delivery, Power Automate for workflow orchestration, Power BI for embedded analytics, and Dataverse as the governed, scalable data layer underneath it all.",
        tools: [
            {
                name: "SharePoint",
                src: "/assets/logos/sharepoint.svg",
                description:
                    "Custom SharePoint development — SPFx web parts, site collections, enterprise intranet architecture, document management, and governance frameworks — built on the M365 tenant the agency already operates and has authorized.",
            },
            {
                name: "Power Apps",
                src: "/assets/logos/powerapps.svg",
                description:
                    "Production-grade canvas and model-driven apps engineered by Ivyhill's Power Platform specialists — complex business logic, Dataverse integration, custom connectors, and role-based access baked in from the start.",
            },
            {
                name: "Power Automate",
                src: "/assets/logos/powerautomate.svg",
                description:
                    "Workflow automation wired to SharePoint, M365, and external agency systems — approvals, notifications, data routing, and scheduled jobs that eliminate manual handoffs without custom code.",
            },
            {
                name: "Power BI",
                src: "/assets/logos/powerbi.svg",
                description:
                    "Embedded analytics and dashboards surfaced directly inside SharePoint and Teams — connecting agency data sources to decision-makers without standing up separate reporting infrastructure.",
            },
            {
                name: "Dataverse",
                src: "/assets/logos/dataverse.svg",
                description:
                    "The governed, relational data layer under Power Platform — structured tables, role-based security, auditing, and API access that turns Power Apps from standalone tools into enterprise-grade systems of record.",
            },
        ],
    },
    {
        category: "Software Development",
        summary:
            "Languages and platforms chosen for long-term federal supportability and clean alignment with secure software development practices — each with a documented hardening path and a track record on federal programs. Ivyhill delivers full-stack applications in JavaScript, PHP, and Python against documented architectures, with source code, dependency manifests, and build artifacts transferred at contract close. Every component introduced to the stack is evaluated for supply-chain risk and compatibility with the agency's authorized software list before a line of production code is written.",
        tools: [
            {
                name: "JavaScript",
                src: "/assets/logos/javascript.svg",
                description:
                    "Browser-native interfaces for case workers, analysts, and program staff — modern React frontends that deploy across the enterprise without client installs or device management overhead.",
            },
            {
                name: "PHP",
                src: "/assets/logos/php.svg",
                description:
                    "The pragmatic choice for content-driven systems and the modernization of long-running agency platforms — proven, well-staffed, and supportable across long contract periods.",
            },
            {
                name: "Python",
                src: "/assets/logos/python.svg",
                description:
                    "Backend services, data pipelines, and the bridge between application code and the AI/ML models agencies are increasingly adopting for forecasting and automation.",
            },
        ],
    },
    {
        category: "Database",
        summary:
            "Where mission data lives, persists, and is queried at scale — deployed as managed services inside the agency's authorized cloud, encrypted at rest using cloud-native key-management services, and integrated with IAM so every query is auditable. Ivyhill selects the right database engine for each workload's access patterns and licensing constraints: open-source relational stores for applications where vendor lock-in is a risk, document stores where schema flexibility drives development velocity, and Microsoft's enterprise platform where the agency is already standardized on Windows and Azure. Schema migrations, backup schedules, and retention policies are all documented and transferred with the system at contract close.",
        tools: [
            {
                name: "PostgreSQL",
                src: "/assets/logos/postgresql.svg",
                description:
                    "Open-source relational database with no per-core licensing tax — runs in every major government cloud, supports complex queries, and avoids the vendor lock-in of commercial DB platforms.",
            },
            {
                name: "MongoDB",
                src: "/assets/logos/mongodb.svg",
                description:
                    "Document-store database for flexible, schema-evolving workloads — ideal where applications need to capture varied record shapes without forcing a rigid relational model up front.",
            },
            {
                name: "MariaDB",
                src: "/assets/logos/mariadb.svg",
                description:
                    "Open-source relational database with MySQL wire-compatibility and an enterprise-grade fork lineage — a low-friction modernization path for legacy MySQL workloads inside agency boundaries.",
            },
            {
                name: "MySQL",
                src: "/assets/logos/mysql.svg",
                description:
                    "The web's most widely deployed relational database — Ivyhill supports MySQL where existing agency systems and contract requirements already standardize on it.",
            },
            {
                name: "MS SQL Server",
                src: "/assets/logos/mssql.svg",
                description:
                    "Microsoft's enterprise relational platform — the natural fit for agencies on Windows Server and Azure stacks, with deep tooling for reporting, analytics, and compliance auditing.",
            },
        ],
    },
    {
        category: "DevOps",
        summary:
            "Containerization and orchestration through a hardened CI/CD pipeline — signed images, vulnerability scanning, and immutable tags — so the package landing in production is the same one the security team reviewed. Ivyhill builds pipelines where the authorization boundary is defined in code: infrastructure-as-code for every resource, policy-as-code for every access rule, and automated compliance scanning on every commit so continuous monitoring isn't a checkbox exercise bolted on after deployment. The result is a deployment process an assessor can audit, a developer can repeat, and an operations team can hand off without undocumented tribal knowledge.",
        tools: [
            {
                name: "Docker",
                src: "/assets/logos/docker.svg",
                description:
                    "Containerized application packaging — same image moves from developer laptop to staging to production, with no environment drift across the agency clouds Ivyhill deploys to.",
            },
            {
                name: "Kubernetes",
                src: "/assets/logos/kubernetes.svg",
                description:
                    "Production orchestration for containerized workloads — automated scaling, rolling deploys, and self-healing infrastructure that lets agency applications meet variable demand without overprovisioning.",
            },
        ],
    },
    {
        category: "Cloud",
        summary:
            "Cloud environments architected from the authorization boundary outward — control inheritance documented against the agency's baseline, network segmentation defined before the first workload lands, and continuous monitoring tooling wired to the agency's logging stack before the system goes live. Every resource is defined in version-controlled infrastructure-as-code rather than clicked into existence through a console, so the boundary diagram an assessor sees matches the one the build pipeline enforces.",
        tools: [
            {
                name: "AWS",
                src: "/assets/logos/aws.svg",
                description:
                    "The broadest catalog of managed services across the major government and commercial regions — Ivyhill delivers application workloads against AWS where the contract calls for it.",
            },
            {
                name: "Azure",
                src: "/assets/logos/azure.svg",
                description:
                    "Native fit for agencies standardized on Microsoft 365 and Entra ID — seamless integration with the Power Platform and SharePoint stack agencies already license.",
            },
            {
                name: "GCP",
                src: "/assets/logos/gcp.svg",
                description:
                    "Strong fit for analytics-heavy and AI-forward workloads — BigQuery, Vertex AI, and Google's data tooling for agencies leaning into machine learning and large-scale data work.",
            },
        ],
    },
];

export function ApplicationDevelopmentPage() {
    return (
        <SiteShell>
            <CapabilityHero
                title="Application Development"
                lede="Custom, cross-platform applications for U.S. federal agencies. Ivyhill delivers data-driven systems — SharePoint intranets, Microsoft Power Platform solutions, mobile and web applications, and cloud-native services — built to mission requirements rather than retrofitted from generic commercial software."
            />
            <CapabilityIntro
                title="No two agencies operate the same way. Their software shouldn't either."
                lede="There is no universal application that fits every federal mission. Ivyhill partners with program leadership to identify the right shape of solution — building on SharePoint and Power Platform capabilities the agency already owns, standing up bespoke applications against documented architectures, or delivering cloud-native services end-to-end — and hands over software the workforce will actually adopt."
                outcomes={OUTCOMES}
            />
            <CapabilityCards
                title="Four delivery models, one accountable team."
                lede="From SharePoint intranets and governed Power Platform rollouts to mobile-first field applications and fully custom cloud engineering — Ivyhill matches the delivery model to the mission rather than the other way around."
                cards={SUB_CAPABILITIES}
            />
            <CapabilityTools
                lede={[
                    "Tooling choices on a federal program are security choices. Every language, platform, and cloud region in the stack carries downstream weight on the agency's authorization boundary and the security posture the system has to live inside.",
                    "Ivyhill leads with the platform the agency already owns — SharePoint and Power Platform inside an authorized M365 tenant — then extends to custom code and cloud infrastructure only where the mission requires it. Hover any tool to see how it fits.",
                ]}
                aside={{
                    title: "Delivery posture",
                    items: [
                        { label: "Quality & security", value: "ISO 9001:2015, ISO/IEC 20000-1:2018, ISO/IEC 27001:2022." },
                        {
                            label: "Cloud targets",
                            value: "Major government and commercial regions across AWS, Azure, and Google Cloud.",
                        },
                        {
                            label: "Logging & monitoring",
                            value: "Continuous monitoring routed to the agency's logging stack, with retention aligned to records schedules.",
                        },
                        { label: "Supply chain", value: "Dependency scanning on every build; signed releases." },
                    ],
                }}
                practiceItems={[
                    "Security artifacts produced as you build, not bolted on after.",
                    "Same container image moves dev → staging → production.",
                    "Source code, IaC, and architecture documentation handed over at contract close.",
                ]}
                frameworks={["ISO/IEC 27001:2022", "ISO 9001:2015", "ISO/IEC 20000-1:2018", "SBA 8(a)", "MDOT MBE/DBE/SBE"]}
                groups={TOOL_GROUPS}
            />
        </SiteShell>
    );
}
