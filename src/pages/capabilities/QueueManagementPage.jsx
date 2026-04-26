import { Icon } from "../../components/Icons.jsx";
import { SiteShell } from "../../components/SiteShell.jsx";
import { CapabilityCards } from "../../sections/capabilities/CapabilityCards.jsx";
import { CapabilityHero } from "../../sections/capabilities/CapabilityHero.jsx";
import { CapabilityIntro } from "../../sections/capabilities/CapabilityIntro.jsx";

const SUB_CAPABILITIES = [
    {
        icon: Icon.Phone,
        title: "Remote & Low-Touch Check-In",
        body: "Visitors check in remotely from a phone before they arrive, or complete a minimal-contact registration on-site. Ivyhill's queue solutions prioritize public-facing convenience and the safety and compliance posture federal facilities require.",
        tags: ["Remote", "Low-touch", "Mobile"],
    },
    {
        icon: Icon.Mail,
        title: "Automated Customer Notifications",
        body: "Patrons receive automated updates on wait times and queue position, so frontline staff aren't fielding the same status questions over and over. A straightforward notification layer keeps visitors informed and service desks focused on the work.",
        tags: ["Automated", "SMS", "Updates"],
    },
    {
        icon: Icon.ExternalLink,
        title: "Multi-Platform Access",
        body: "One queue, surfaced everywhere visitors and staff actually look — mobile devices, lobby kiosks, and overhead televisions. Comprehensive, user-friendly access for both managing the queue and monitoring it in real time.",
        tags: ["Mobile", "Kiosk", "Display"],
    },
    {
        icon: Icon.BarChart,
        title: "Queue Analytics & Reporting",
        body: "Wait-time trends, throughput, and peak-hour patterns delivered as a data-driven analysis of the queuing system — the operational visibility agencies need to staff appropriately, identify efficiency gains, and report outcomes to program leadership.",
        tags: ["Reporting", "Throughput", "Trends"],
    },
];

const OUTCOMES = [
    "Cut on-site wait times by letting visitors check in remotely before they arrive.",
    "Keep frontline staff focused on service delivery instead of answering wait-time questions.",
    "Stay accessible across the channels visitors actually use — mobile, kiosk, and lobby display.",
    "Give program leadership data-driven visibility into throughput, peak demand, and staffing gaps.",
];

export function QueueManagementPage() {
    return (
        <SiteShell>
            <CapabilityHero
                title="Queue Management"
                lede="Ivyhill streamlines customer flow for high-volume federal and public-facing service environments. User-friendly queue solutions with remote check-in, low-touch on-site options, automated notifications, and the analytics agencies need to optimize the experience end-to-end."
            />
            <CapabilityIntro
                title="Effortless queue management for the agencies serving the public."
                lede="Federal and local-government service environments handle enormous public-facing volume — and every minute spent waiting is a minute the mission isn't moving. Ivyhill delivers automated, compliant queue solutions that balance a straightforward customer experience with the regulatory adherence and data-driven insight program leadership expects."
                outcomes={OUTCOMES}
            />
            <CapabilityCards
                title="Four ways we deliver queue management."
                lede="From remote check-in through multi-platform display through queue analytics — Ivyhill builds the customer-flow layer agencies need to keep service moving and patrons informed."
                cards={SUB_CAPABILITIES}
            />
        </SiteShell>
    );
}
