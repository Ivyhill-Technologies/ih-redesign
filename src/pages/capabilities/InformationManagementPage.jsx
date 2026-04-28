import { Icon } from "../../components/Icons.jsx";
import { SiteShell } from "../../components/SiteShell.jsx";
import { CapabilityCards } from "../../sections/capabilities/CapabilityCards.jsx";
import { CapabilityHero } from "../../sections/capabilities/CapabilityHero.jsx";
import { CapabilityIntro } from "../../sections/capabilities/CapabilityIntro.jsx";

const SUB_CAPABILITIES = [
    {
        icon: Icon.Archive,
        title: "Records Management",
        body: "Ivyhill assists organizations in establishing new records management programs or automating existing ones — developing records schedule repositories, inventories, file plans, disposition management, and auditing of disposal actions. A documented records program, adhered to by all custodians across the organization, reduces litigation risk and supports defensible compliance.",
        tags: ["Schedules", "File Plans", "Disposition"],
    },
    {
        icon: Icon.BarChart,
        title: "Business Intelligence",
        body: "Data storage and the analytics tools designed to mine that data have enabled Ivyhill clients to identify significant patterns and trends that support critical decisions — converting organizational data into actionable information for program leadership.",
        tags: ["Analytics", "Trends", "Decision support"],
    },
    {
        icon: Icon.Scan,
        title: "Scanning & Imaging",
        body: "Ivyhill converts physical records into digital assets and extracts data elements into decision-support systems — including Intelligent Word Recognition (IWR) capable of capturing handwritten content. Engagements include document conversion strategy for the digitization of legacy records.",
        tags: ["IWR", "Digitization", "Legacy records"],
    },
    {
        icon: Icon.Phone,
        title: "Customer Service",
        body: "Service operations ranging from basic help desk through more complex service desk functions — including Security Operations Center (SOC), Network Operations Center (NOC), and medical appointment scheduling — staffed and managed by Ivyhill personnel.",
        tags: ["Help desk", "SOC / NOC", "Scheduling"],
    },
];

const OUTCOMES = [
    "Get mission-critical information to the right people, at the right place, at the right time.",
    "Manage both physical and digital data across the full information lifecycle, regardless of source or format.",
    "Keep crucial assets accessible and secure with flexible, configurable solutions.",
    "Digitize legacy documents — including handwritten content — through Intelligent Word Recognition (IWR).",
];

export function InformationManagementPage() {
    return (
        <SiteShell
            title="Information Management"
            description="Information management for federal agencies and commercial enterprises — records programs, business intelligence, scanning and imaging, and customer service operations across the full information lifecycle."
        >
            <CapabilityHero
                title="Information Management"
                lede="Ivyhill specializes in getting your mission-critical information to the right people, at the right place, at the right time — helping you manage both physical and digital data throughout the information lifecycle, regardless of source or format."
            />
            <CapabilityIntro
                title="Get control of your information."
                lede="Information is the currency of the 21st-century digital workplace. Ivyhill delivers flexible, secure information management solutions for federal agencies and commercial enterprises — scanning and storage scaled for organizations of any size, records programs that hold up to audit, and the analytics layer that turns stored data into operational insight."
                outcomes={OUTCOMES}
            />
            <CapabilityCards
                title="How we work across the information lifecycle."
                lede="From records programs and business intelligence through scanning, imaging, and customer service operations — Ivyhill manages the full path information takes through the enterprise."
                cards={SUB_CAPABILITIES}
            />
        </SiteShell>
    );
}
