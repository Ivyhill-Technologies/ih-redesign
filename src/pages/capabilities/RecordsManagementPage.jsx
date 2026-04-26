import { Icon } from "../../components/Icons.jsx";
import { SiteShell } from "../../components/SiteShell.jsx";
import { CapabilityAISpotlight } from "../../sections/capabilities/CapabilityAISpotlight.jsx";
import { CapabilityCards } from "../../sections/capabilities/CapabilityCards.jsx";
import { CapabilityHero } from "../../sections/capabilities/CapabilityHero.jsx";
import { CapabilityIntro } from "../../sections/capabilities/CapabilityIntro.jsx";

const MODULES = [
    {
        icon: Icon.Archive,
        title: "Records Schedule Management",
        body: "A repository for the collection of applicable NARA and organization-specific schedules — searchable by source, title, disposition citation, and description, with key attributes exposed including acceptable formats, disposition, cutoff and retention instructions. Status indicators show whether a schedule is approved, superseded, suspended, or withdrawn.",
        tags: ["NARA", "Disposition", "Retention"],
    },
    {
        icon: Icon.Folders,
        title: "Records Inventories & File Plans",
        body: "Custodians create inventories that reference the schedule repository — identifying assets at the schedule-item level with volume, storage location, and essential or restricted-use indicators. Built-in workflow handles Records Liaison Officer confirmation and acceptance, with File Plans generated on approval.",
        tags: ["File Plans", "RLO Workflow", "Custodial"],
    },
    {
        icon: Icon.BarChart,
        title: "RM Analytics",
        body: "Integrated business intelligence reporting and dashboards across the records program — surfacing trends and key analytics for program leadership and records staff.",
        tags: ["BI", "Dashboards", "Trends"],
    },
    {
        icon: Icon.Check,
        title: "Records Schedule Review (RSR)",
        body: "Supports the periodic review of schedules with configurable notifications for approaching and overdue review dates.",
        tags: ["Periodic Review", "Notifications"],
    },
    {
        icon: Icon.Mail,
        title: "Capstone Management",
        body: "Tracks individuals in key organization positions for accession through automation rules, notifications, and reporting — including daily reporting to OCIO of candidate accounts ready for accession to NARA.",
        tags: ["Capstone", "OCIO", "Accession"],
    },
    {
        icon: Icon.ExternalLink,
        title: "Knowledge Management",
        body: "Manages FAQs and self-service support, with a moderated path for user-submitted questions to be answered by RM staff.",
        tags: ["FAQs", "Self-service"],
    },
    {
        icon: Icon.Users,
        title: "RLO/RC Management",
        body: "Registration process for nominating and approving Records Liaison Officers and Records Custodians.",
        tags: ["Nominations", "Approvals"],
    },
    {
        icon: Icon.Pin,
        title: "Site Visit Program (RSVP)",
        body: "Tablet-accessible application that captures remote site-visit details with auto-generated, pre-defined 36 CFR-based or custom questions — supporting annotation, photo capture, and a pre-defined After Action report.",
        tags: ["Tablet", "36 CFR", "After Action"],
    },
];

const OUTCOMES = [
    "Manage NARA and organization-specific schedules in one searchable repository.",
    "Run RLO confirmation, custodial inventories, and file-plan generation as a single workflow.",
    "Capture site visits in the field and generate the After Action report from the same application.",
    "Surface program-wide records analytics — trends, schedule-review status, and key indicators.",
];

const APP_COLUMNS = [
    {
        eyebrow: "Modernization",
        heading: "A standardized records platform, configured to each enterprise.",
        body: "The same module library powers every Ivyhill records deployment — schedules, inventories, file plans, site visits, analytics — assembled and configured to fit federal, local government, or commercial enterprise needs without rebuilding the platform for each customer.",
        items: [
            "One module library — configured per organization rather than forked.",
            "Web and tablet interfaces designed around the way RM staff and RLOs actually work.",
            "Integrated reporting across schedules, inventories, custody, and site visits.",
        ],
    },
    {
        eyebrow: "Intelligent process automation",
        heading: "Data-driven applications across the records lifecycle.",
        body: "Notifications, review cycles, accession rules, and OCIO reporting all run as automated workflows — and the same data layer that powers the dashboards is where AI assistance can be introduced over time, where it earns its place, to help staff move through high-volume records work faster.",
        items: [
            "Automated notifications for schedule reviews, accession, and custodial workflow.",
            "Daily OCIO reporting on Capstone candidate accounts ready for accession to NARA.",
            "AI assistance applied selectively — to support records staff, not replace records judgment.",
        ],
    },
];

export function RecordsManagementPage() {
    return (
        <SiteShell>
            {({ showToast }) => (
                <>
                    <CapabilityHero
                        title="Records Management"
                        lede="Records Management solutions for federal, local government, and commercial clients. Ivyhill is an Information Management company — delivering modernization and intelligent process automation across an organization's records program."
                        onCTA={() => showToast()}
                    />
                    <CapabilityIntro
                        title="Standardized records modules. Configurable for each enterprise."
                        lede="Ivyhill provides Records, Case, Knowledge, and Content Management solutions to federal, local government, and commercial customers. The Records Management practice ships as a library of standardized modules — schedules, inventories, file plans, site visits, analytics — that get configured to each organization's authorities and workflows rather than rebuilt from scratch."
                        outcomes={OUTCOMES}
                    />
                    <CapabilityCards
                        title="Eight modules covering the records lifecycle."
                        lede="From schedule management through inventories, file plans, periodic review, Capstone tracking, and site visits — Ivyhill's records modules are designed to be adopted together and governed centrally."
                        cards={MODULES}
                    />
                    <CapabilityAISpotlight
                        eyebrow="Data-driven applications"
                        title="Modernization and intelligent process automation across the records program."
                        lede="The records modules are delivered as integrated, data-driven applications — workflow, notifications, reporting, and analytics built into the same platform, with AI assistance introduced where it genuinely helps records staff handle scale."
                        columns={APP_COLUMNS}
                    />
                </>
            )}
        </SiteShell>
    );
}
