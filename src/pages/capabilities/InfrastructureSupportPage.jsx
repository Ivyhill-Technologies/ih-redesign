import { Icon } from "../../components/Icons.jsx";
import { SiteShell } from "../../components/SiteShell.jsx";
import { CapabilityCards } from "../../sections/capabilities/CapabilityCards.jsx";
import { CapabilityHero } from "../../sections/capabilities/CapabilityHero.jsx";
import { CapabilityIntro } from "../../sections/capabilities/CapabilityIntro.jsx";

const SUB_CAPABILITIES = [
    {
        icon: Icon.Phone,
        title: "Help Desk / IT Support Solutions",
        body: "Modern help desk and service desk operations — staffed behind the scenes and on the front line so critical systems always have someone looking out for them. Ivyhill delivers tiered support designed for the way agency staff actually work, with response targets, escalation paths, and reporting built in from day one.",
        tags: ["Help desk", "Service desk", "Tiered support"],
    },
    {
        icon: Icon.Server,
        title: "Operations & Maintenance (O&M)",
        body: "IT systems operations and maintenance covering all software and hardware associated with applications, servers, and networking — on-premises, in the cloud, or in a hybrid configuration. Ivyhill keeps the digital ecosystem secure, reliable, and efficient so the mission keeps moving.",
        tags: ["Applications", "Servers", "Networking"],
    },
    {
        icon: Icon.ExternalLink,
        title: "Cloud Solutions & Management",
        body: "On-site and remote cloud access, configured so employees can reach work-critical documents and systems from anywhere. Ivyhill designs, migrates, and manages cloud and hybrid environments with the controls federal and commercial customers expect.",
        tags: ["Cloud", "Hybrid", "Remote access"],
    },
    {
        icon: Icon.Shield,
        title: "Cyber Protection",
        body: "Active cyber protection that keeps systems and data secure across on-premises and cloud workloads. Ivyhill delivers an industry-leading cybersecurity solution — manageable, scalable, and ready for the unforeseen threats of tomorrow.",
        tags: ["Cybersecurity", "Backup", "Endpoint"],
    },
];

const OUTCOMES = [
    "Give agency staff a modern help desk with response targets, escalation paths, and clear ownership.",
    "Operate and maintain applications, servers, and networking — on-premises, in the cloud, or hybrid.",
    "Reach work-critical systems and documents from anywhere through managed cloud and remote access.",
    "Protect on-premises and cloud workloads with active, scalable cyber protection.",
];

export function InfrastructureSupportPage() {
    return (
        <SiteShell>
            <CapabilityHero
                title="Infrastructure Support"
                lede="IT systems operations and maintenance covering all software and hardware tied to applications, servers, and networking — on-premises, in the cloud, or in a hybrid solution. Ivyhill delivers a secure, reliable, and efficient IT infrastructure that keeps the mission moving."
            />
            <CapabilityIntro
                title="A modern help desk and the infrastructure behind it."
                lede="Ivyhill provides Infrastructure Support to federal, local government, and commercial customers — leading with a modern help desk and IT support practice, backed by the operations, cloud, and cyber protection work that keeps systems available. Critical systems always have someone looking out for them, behind the scenes and on the front line."
                outcomes={OUTCOMES}
            />
            <CapabilityCards
                title="Four practice areas across IT infrastructure."
                lede="Help desk and IT support solutions lead the practice — backed by O&M for applications, servers, and networking, cloud and hybrid management, and active cyber protection."
                cards={SUB_CAPABILITIES}
            />
        </SiteShell>
    );
}
