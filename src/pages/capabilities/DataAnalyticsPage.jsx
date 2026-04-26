import { Icon } from "../../components/Icons.jsx";
import { SiteShell } from "../../components/SiteShell.jsx";
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
        tags: ["Power BI", "Tableau", "Self-serve"],
    },
    {
        icon: Icon.Shield,
        title: "Predictive & AI Analytics",
        body: "AI-augmented analytics: forecasting, anomaly detection, and predictive models that turn historical agency data into operational foresight — staffing forecasts, backlog risk, throughput projections.",
        tags: ["Forecasting", "ML", "Anomaly detection"],
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
                    <CapabilityTools lede="Production-grade tooling we deliver against — from BI dashboards to predictive modeling pipelines." />
                </>
            )}
        </SiteShell>
    );
}
