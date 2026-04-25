// Contracts page — composes header, hero, vehicle index, vehicle details, 8(a) band, set-asides, certs, contact, footer.
const VEHICLES = [
    {
        id: "stars-iii",
        kind: "GWAC",
        kindColor: "#1F4E79",
        name: "8(a) STARS III",
        fullName:
            "Streamlined Technology Acquisition Resource for Services III",
        agency: "GSA · Governmentwide",
        number: "47QTCB21D0099",
        period: "2021 \u2013 2031",
        ceiling: "$50.0B",
        tags: ["IT services", "Set-aside 8(a)", "Multi-award IDIQ"],
        description:
            "STARS III is a Multiple-Award, Indefinite-Delivery / Indefinite-Quantity governmentwide acquisition contract for IT services and IT-services-based solutions, including the integration of ancillary support necessary and integral to the IT services acquired. Awards are reserved exclusively for SBA-certified 8(a) prime contractors with competitive prices.",
        scope: [
            "Custom application development & maintenance",
            "Cloud migration & managed cloud",
            "Data analytics & decision support",
            "Cybersecurity & defense-in-depth",
            "Records & information management",
            "Help desk & infrastructure operations",
        ],
        benefits: [
            {
                h: "Pre-competed",
                t: "No need to run a separate small-business set-aside competition; STARS III satisfies the requirement.",
            },
            {
                h: "Sole-source up to $4.5M",
                t: "Direct awards under the 8(a) sole-source ceiling on services and goods.",
            },
            {
                h: "Low fee, no DPA cost",
                t: "0.75% access fee; no charge for the Delegation of Procurement Authority.",
            },
            {
                h: "Worldwide ordering",
                t: "Available to all federal agencies CONUS and OCONUS, including DoD and intelligence community.",
            },
        ],
        ordering: [
            "Contracting officer obtains a Delegation of Procurement Authority (DPA) from GSA.",
            "Issue Request for Information or draft statement of work to Ivyhill via the STARS III ordering portal.",
            "Ivyhill returns a labor mix, pricing, and past-performance package within five business days.",
            "Award task order; Ivyhill begins performance per the negotiated period.",
        ],
        facts: [
            ["Contract no.", "47QTCB21D0099"],
            ["Period of performance", "Jul 2021 \u2013 Jul 2031"],
            ["Functional areas", "FAs 1, 2, 3"],
            ["Set-aside", "SBA 8(a) exclusive"],
            ["Access fee", "0.75%"],
            ["DPA required", "Yes"],
        ],
        link: { label: "View on GSA eLibrary", href: "#" },
    },
    {
        id: "mas-it",
        kind: "MAS",
        kindColor: "#1F4E79",
        name: "GSA Multiple Award Schedule",
        fullName: "MAS Information Technology · SINs 54151S, 541512, 518210C",
        agency: "GSA · Governmentwide",
        number: "47QTCA22D00CG",
        period: "2022 \u2013 2042",
        ceiling: "No ceiling",
        tags: ["IT services", "Cloud", "Cooperative Purchasing"],
        description:
            "The Multiple Award Schedule consolidates GSA\u2019s commercial-item contract portfolio into a single program. Ivyhill is awarded under the Information Technology category, providing IT professional services, cloud-related services, and ancillary supplies to all eligible federal, state, local, and tribal ordering activities.",
        scope: [
            "IT professional services (54151S)",
            "Computer systems design (541512)",
            "Cloud & cloud-related IT services (518210C)",
            "Health information technology (54151HEAL)",
            "Highly Adaptive Cybersecurity Services (54151HACS)",
        ],
        benefits: [
            {
                h: "Pre-negotiated pricing",
                t: "Labor categories and rates already negotiated as fair and reasonable; no need to re-establish.",
            },
            {
                h: "Cooperative Purchasing",
                t: "State, local, and tribal governments may order under MAS without a separate competition.",
            },
            {
                h: "GSA Advantage / eBuy",
                t: "Orders may be placed through GSA Advantage and eBuy for streamlined procurement.",
            },
        ],
        facts: [
            ["Contract no.", "47QTCA22D00CG"],
            ["Period of performance", "Mar 2022 \u2013 Mar 2042"],
            ["Large category", "Information Technology"],
            ["Industrial Funding Fee", "0.75%"],
            ["Cooperative Purchasing", "Eligible"],
            ["Disaster Recovery", "Eligible"],
        ],
        link: { label: "View on GSA Advantage", href: "#" },
    },
    {
        id: "cio-sp4",
        kind: "GWAC",
        kindColor: "#1F4E79",
        name: "NIH CIO-SP4",
        fullName:
            "NITAAC Chief Information Officer \u2013 Solutions and Partners 4",
        agency: "NIH NITAAC · Governmentwide",
        number: "75N98124D00021",
        period: "2024 \u2013 2034",
        ceiling: "$50.0B",
        tags: ["IT services", "Set-aside 8(a)", "Health-IT focus"],
        description:
            "CIO-SP4 is the National Institutes of Health Information Technology Acquisition and Assessment Center\u2019s 10-year, $50B governmentwide acquisition contract for health and biomedical IT services across ten task areas, with strong scope for records management, biomedical data analytics, and managed services.",
        scope: [
            "IT services for biomedical research, health sciences, and healthcare",
            "Chief Information Officer support services",
            "Imaging, document conversion & records management",
            "Outsourcing & managed services",
            "IT operations & maintenance",
            "Critical infrastructure protection",
        ],
        facts: [
            ["Contract no.", "75N98124D00021"],
            ["Period of performance", "Jun 2024 \u2013 Jun 2029 (base) + 5"],
            ["Pool", "Small Business · 8(a)"],
            ["Task areas", "10 covered"],
            ["Access fee", "0.55%"],
        ],
        link: { label: "View on NITAAC", href: "#" },
    },
    {
        id: "nxg",
        kind: "IDIQ",
        kindColor: "#16263D",
        name: "NxG SeaPort",
        fullName: "Naval Sea Systems Command Next Generation SeaPort",
        agency: "Department of the Navy",
        number: "N0017824D7842",
        period: "2024 \u2013 2029",
        ceiling: "Service-wide",
        tags: ["Engineering", "Program support", "Navy-specific"],
        description:
            "NxG SeaPort is a multiple-award IDIQ providing engineering and program support services to U.S. Navy activities. Ivyhill supports Navy customers with information management, application development, and infrastructure services under this vehicle as a small-business prime.",
        scope: [
            "Engineering & technical services",
            "Program management support",
            "Information systems development",
            "Configuration & data management",
        ],
        facts: [
            ["Contract no.", "N0017824D7842"],
            ["Period of performance", "Jan 2024 \u2013 Jan 2029"],
            ["Sponsoring command", "NAVSEA"],
            ["Pool", "Small Business"],
            ["Functional areas", "22 covered"],
        ],
        link: { label: "View on Seaport-NxG portal", href: "#" },
    },
    {
        id: "8a-sole",
        kind: "8(a)",
        kindColor: "#4F7A22",
        name: "8(a) Sole-Source Authority",
        fullName:
            "SBA 8(a) Business Development Program · Sole-Source & Competitive",
        agency: "U.S. Small Business Administration",
        number: "Firm-level certification",
        period: "2019 \u2013 2028",
        ceiling: "$4.5M sole-source",
        tags: ["Sole-source", "Set-aside", "9-year term"],
        description:
            "Beyond the GWACs above, federal agencies may award contracts directly to Ivyhill through SBA-delegated 8(a) authority. Sole-source awards are typically executed within days of statement-of-work submission, with minimal acquisition documentation and negotiated pricing.",
        benefits: [
            {
                h: "Reduced cycle",
                t: "Sole-source awards typically execute within days, not months.",
            },
            {
                h: "Lowered admin cost",
                t: "Streamlined justification reduces contracting officer workload significantly.",
            },
            {
                h: "Best-value pricing",
                t: "Direct negotiation produces pricing tailored to the agency requirement.",
            },
            {
                h: "Goal credit",
                t: "Awards count toward agency small-disadvantaged-business goals.",
            },
        ],
        ordering: [
            "Agency contracting officer identifies Ivyhill via SAM.gov or DSBS as a qualified 8(a) firm.",
            "Submit a high-level statement of work directly to Ivyhill\u2019s contracting POC.",
            "For awards over $4.5M (services), SBA will run a competitive 8(a) set-aside.",
            "For awards under the threshold, SBA approves the sole-source request (typically within days).",
        ],
        facts: [
            ["Certification entry", "Sep 2019"],
            ["Term", "9 years"],
            ["Exit", "Sep 2028"],
            ["Sole-source ceiling", "$4.5M (services)"],
            ["Goods ceiling", "$7.0M"],
            ["SBA region", "Region III"],
        ],
        link: { label: "View SAM.gov registration", href: "#" },
    },
];

function App() {
    const [toast, setToast] = React.useState(null);

    React.useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2400);
        return () => clearTimeout(t);
    }, [toast]);

    return (
        <>
            <Header onCTA={() => setToast("Capability statement requested")} />
            <ContractsHero />
            <VehicleIndex vehicles={VEHICLES} />
            {VEHICLES.map((v, i) => (
                <VehicleDetail key={v.id} v={v} alt={i % 2 === 1} />
            ))}
            <EightABand />
            <SetAsides />
            <CertsStrip />
            <ContactBlock />
            <Footer />
            <div className={`toast ${toast ? "show" : ""}`}>
                {toast && (
                    <>
                        <Icon.Check size={16} className="check" /> {toast}
                    </>
                )}
            </div>
        </>
    );
}
window.App = App;
