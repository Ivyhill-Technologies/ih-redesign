import { Icon } from "../../components/Icons.jsx";
import { SiteShell } from "../../components/SiteShell.jsx";
import { CapabilityAISpotlight } from "../../sections/capabilities/CapabilityAISpotlight.jsx";
import { CapabilityCards } from "../../sections/capabilities/CapabilityCards.jsx";
import { CapabilityHero } from "../../sections/capabilities/CapabilityHero.jsx";
import { CapabilityIntro } from "../../sections/capabilities/CapabilityIntro.jsx";
import { CapabilityTools } from "../../sections/capabilities/CapabilityTools.jsx";

const SUB_CAPABILITIES = [
    {
        icon: Icon.Users,
        title: "Discovery & Consultation",
        body: "Federal-mission discovery: KPI selection, data inventory, stakeholder alignment, and a pragmatic roadmap that maps to your contract scope and reporting requirements before a single dashboard is built.",
        tags: ["Discovery", "KPIs", "Roadmaps"],
    },
    {
        icon: Icon.BarChart,
        title: "Dashboards & Visualization",
        body: "Production dashboards on the Microsoft Power Platform — Power BI for most engagements, Tableau where the contract calls for it. Self-serve visibility for analysts, operators, and program leadership alike.",
        tags: ["Power BI", "Self-serve"],
    },
    {
        icon: Icon.Shield,
        title: "Predictive & AI Analytics",
        body: "AI-augmented analytics: forecasting, anomaly detection, and predictive models that turn historical agency data into operational foresight — staffing forecasts, backlog risk, throughput projections.",
        tags: ["Forecasting", "ML", "Anomaly detection"],
    },
];

const AI_COLUMNS = [
    {
        eyebrow: "Federal mission",
        heading: "RAG inside the agency's authorized cloud.",
        body: "Retrieval-augmented assistants that index policy manuals, SOPs, contract scope, case files, and records — running entirely inside the cloud the agency has already authorized for its workloads, with citations on every answer and audit trails on every query.",
        items: [
            "Indexing pipelines for policy, SOPs, and records inventories — kept inside the agency's authorized cloud, never sent to a public model.",
            "Citations back to the source document on every answer so analysts verify against record, not model recall.",
            "Role-based retrieval so the assistant only surfaces what the user is already cleared to see.",
            "Continuous monitoring and prompt/response logging routed to the agency's logging stack.",
        ],
    },
    {
        eyebrow: "Commercial enterprise",
        heading: "AI assistants on your own data.",
        body: "RAG and agentic workflows for commercial teams — sales playbooks, support knowledge bases, internal documentation, and product data — integrated with the SaaS stack the business already runs on.",
        items: [
            "Index the SaaS tools, document repositories, and cloud storage your business already runs on into a single retrieval layer.",
            "Custom assistants for sales, support, and operations — grounded in your real documents, not generic web data.",
            "Agentic workflows that read, summarize, and take action across enterprise tools without copy-paste between tabs.",
            "Bring-your-own-cloud deployments on Azure, AWS, or GCP — your data stays in your tenant.",
        ],
    },
];

const TOOLS = [
    {
        name: "Power BI",
        src: "/assets/logos/powerbi.svg",
        description:
            "Microsoft's BI platform — native to the M365 stack most agencies already license. Production dashboards with row-level security tied to Entra ID, riding on the agency's existing tenant authorization. Tableau is also supported on engagements where the contract specifies it.",
    },
    {
        name: "pandas",
        src: "/assets/logos/pandas.svg",
        description:
            "The Python data-analysis backbone behind our predictive work — backlog modeling, throughput forecasting, and the heavy data wrangling that feeds AI/ML pipelines before anything reaches a dashboard.",
    },
    {
        name: "R",
        src: "/assets/logos/r.svg",
        description:
            "Statistical modeling for federal analytics that demand reproducible methods — hypothesis testing, time-series forecasting, and the publication-grade statistical output some agency programs require.",
    },
    {
        name: "Decision support",
        icon: Icon.BarChart,
        description:
            "The output of every Ivyhill analytics engagement — dashboards, forecasts, and predictive models that turn operational data into the evidence base agency leadership uses to make decisions, in real time.",
    },
];

const OUTCOMES = [
    "Predict resource needs — staffing, throughput, infrastructure — before they spike.",
    "Surface backlog risk in records and case workflows before it impacts mission timelines.",
    "Replace gut-level decisions with evidence drawn from your operational data.",
    "Free analyst hours for mission work — dashboards self-serve to the people doing the work.",
];

export function DataAnalyticsPage() {
    return (
        <SiteShell>
            {({ showToast }) => (
                <>
                    <CapabilityHero
                        title="Data Analytics"
                        lede="Mission-grade analytics for U.S. federal agencies. Ivyhill turns operational data — including the records inventories tracked by DHS programs — into dashboards, forecasts, and AI-augmented predictions that save agencies time and money."
                        onCTA={() => showToast()}
                    />
                    <CapabilityIntro
                        title="From records inventories to operational foresight."
                        lede="Federal programs generate enormous operational data — case throughput, records lifecycle, customer flow, contract performance. Ivyhill turns that data into dashboards, forecasts, and AI-driven predictions so program leadership can move from reporting on the past to anticipating what's next."
                        outcomes={OUTCOMES}
                    />
                    <CapabilityCards
                        title="Three ways we deliver analytics for federal programs."
                        lede="From discovery through dashboards through predictive models — Ivyhill builds the analytics layer agencies need to move from descriptive reporting to forward-looking decision support."
                        cards={SUB_CAPABILITIES}
                    />
                    <CapabilityAISpotlight
                        title="RAG and applied AI on the data you already own."
                        lede="The same operational data that feeds dashboards can power a retrieval layer that lets staff query agency policy, contract language, case history, or product documentation in plain English. Ivyhill builds RAG systems and AI assistants on the data you already own — engineered for the security boundaries of federal work and the integration realities of commercial enterprise."
                        columns={AI_COLUMNS}
                    />
                    <CapabilityTools
                        lede="Production-grade tooling we deliver against — from BI dashboards to predictive modeling pipelines. Hover any tool to see how it fits."
                        tools={TOOLS}
                    />
                </>
            )}
        </SiteShell>
    );
}
