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
        title: "Microsoft Power Platform",
        body: "Low-code and no-code delivery on Power Apps, Power Automate, and Dataverse — standing up business-unit applications without competing for scarce IT engineering capacity, then governed centrally for audit and compliance.",
        tags: ["Power Apps", "Automate", "Dataverse"],
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
        body: "Application delivery against the three major cloud environments agencies operate in — Azure, AWS, and Google Cloud — with infrastructure-as-code, managed-database deployments, and FedRAMP-aligned security controls baked into the build pipeline.",
        tags: ["Azure", "AWS", "GCP", "FedRAMP-aligned"],
    },
];

const OUTCOMES = [
    "Replace manual, paper-bound workflows with cross-platform applications agency staff actually use.",
    "Capture mission-critical data at the point of work — and keep it inside agency control.",
    "Stand up business-unit tools on Power Platform without queuing behind enterprise IT backlog.",
    "Deliver bespoke systems against documented architectures, with code and artifacts transferred at close.",
];

const TOOL_GROUPS = [
    {
        category: "Software Development",
        summary: "Languages and platforms chosen for long-term federal supportability and clean alignment with secure software development practices (SSDF, NIST 800-218) — each with a documented hardening path and a track record inside FedRAMP-authorized environments.",
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
            {
                name: "Power Apps",
                src: "/assets/logos/powerapps.svg",
                description:
                    "Citizen-developer applications standing up in days, not quarters — built where agency M365 and SharePoint already live, governed centrally for compliance and auditability.",
            },
        ],
    },
    {
        category: "Database",
        summary: "Where mission data lives, persists, and is queried at scale — deployed as managed services inside the agency's authorized cloud, encrypted at rest with FIPS 140-validated modules, and integrated with IAM so every query is auditable.",
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
        summary: "Containerization and orchestration through a hardened CI/CD pipeline — signed images, SBOMs, vulnerability scanning, and immutable tags — so the package landing in a GovCloud cluster is the same one the security team reviewed at ATO.",
        tools: [
            {
                name: "Docker",
                src: "/assets/logos/docker.svg",
                description:
                    "Containerized application packaging — same image moves from developer laptop to staging to ATO-bound production, with no environment drift across the agency clouds Ivyhill deploys to.",
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
        summary: "FedRAMP-authorized government regions only — AWS GovCloud, Azure Government, Google Cloud assured workloads — with infrastructure-as-code defining every resource and IAM policy. The boundary diagram an assessor sees matches the one the build pipeline enforces.",
        tools: [
            {
                name: "AWS",
                src: "/assets/logos/aws.svg",
                description:
                    "GovCloud regions, FedRAMP High authorizations, and the broadest catalog of managed services — Ivyhill delivers application workloads against AWS where the contract calls for it.",
            },
            {
                name: "Azure",
                src: "/assets/logos/azure.svg",
                description:
                    "Native fit for agencies standardized on Microsoft 365 and Entra ID — Azure Government regions, FedRAMP High, and seamless integration with the Power Platform and SharePoint stack.",
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
            {({ showToast }) => (
                <>
                    <CapabilityHero
                        title="Application Development"
                        lede="Custom, cross-platform applications for U.S. federal agencies. Ivyhill delivers data-driven systems — mobile, web, and Microsoft Power Platform — built to mission requirements rather than retrofitted from generic commercial software."
                        onCTA={() => showToast()}
                    />
                    <CapabilityIntro
                        title="No two agencies operate the same way. Their software shouldn't either."
                        lede="There is no universal application that fits every federal mission. Ivyhill partners with program leadership to identify the right shape of solution — extending a platform agencies already own, standing up a low-code application on Power Platform, or engineering a bespoke system end-to-end — and delivers it as sleek, cross-platform, data-driven software the workforce will actually adopt."
                        outcomes={OUTCOMES}
                    />
                    <CapabilityCards
                        title="Four delivery models, one accountable team."
                        lede="From mobile-first field applications to governed Power Platform rollouts to fully custom engineering on agency cloud — Ivyhill matches the delivery model to the mission rather than the other way around."
                        cards={SUB_CAPABILITIES}
                    />
                    <CapabilityTools
                        lede={[
                            "Tooling choices on a federal program are security choices. Every language, database, and cloud region in the stack carries downstream weight on ATO scope, FedRAMP posture, and the agency boundary the system has to live inside.",
                            "Ivyhill standardizes on a narrow set of production stacks — deployed exclusively into AWS GovCloud, Azure Government, and Google Cloud's assured workloads — so the same controls, hardening baselines, and audit artifacts apply across every workload we deliver. Hover any tool to see how it fits.",
                        ]}
                        aside={{
                            title: "Compliance posture",
                            items: [
                                { label: "Authorized clouds", value: "AWS GovCloud, Azure Government, Google Cloud assured workloads — FedRAMP Moderate and High." },
                                { label: "Control frameworks", value: "NIST 800-53, NIST 800-218 (SSDF), CMMC, agency-specific overlays." },
                                { label: "Logging & monitoring", value: "Continuous monitoring per FedRAMP ConMon and NIST 800-53 AU/SI controls — application and infrastructure logs routed to the agency SIEM with retention aligned to records schedules." },
                                { label: "Supply chain", value: "Signed images, SBOM generation, dependency scanning on every build." },
                            ],
                        }}
                        practiceItems={[
                            "ATO artifacts produced as you build, not bolted on after.",
                            "Same container image moves dev → staging → GovCloud production.",
                            "Source code, IaC, and architecture documentation handed over at contract close.",
                        ]}
                        agencies={[
                            { abbr: "DoJ", name: "Department of Justice" },
                            { abbr: "ICE", name: "Immigration and Customs Enforcement" },
                            { abbr: "NIH", name: "National Institutes of Health" },
                            { abbr: "USAF", name: "Department of the Air Force" },
                            { abbr: "USA", name: "Department of the Army" },
                            { abbr: "DoL", name: "Department of Labor" },
                        ]}
                        groups={TOOL_GROUPS}
                    />
                </>
            )}
        </SiteShell>
    );
}
