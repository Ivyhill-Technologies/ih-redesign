import { useState } from "react";
import { Icon } from "../../components/Icons.jsx";

const VEHICLES = [
    {
        id: "gsa-mas",
        short: "GSA MAS",
        name: "GSA Multiple Award Schedule",
        icon: Icon.Archive,
        sponsor: "General Services Administration",
        contractNumber: "47QTCA20D00AG",
        period: "May 26, 2025 – May 25, 2030",
        fscGroup: "Information Technology",
        pdfHref: "/documents/Ivyhill-MAS-Schedule.pdf",
        pdfLabel: "Ivyhill MAS Price List (PDF)",
        externalLinks: [
            {
                label: "GSA Schedules ordering info",
                href: "https://www.gsa.gov/schedules",
            },
        ],
        intro: "A long-term governmentwide contract with commercial firms providing federal, state, and local government buyers access to more than 11 million commercial supplies (products) and services at volume discount pricing.",
        benefits:
            "This MAS contract allows Ivyhill Technologies to provide the full range of records management, imaging and document solutions, Cybersecurity, and IT services.",
        services: [
            {
                heading: "IT Professional Services",
                items: [
                    "Computer Systems Analysts",
                    "Database Administrators",
                    "Configuration Management (CM) Support",
                    "System Design Documentation and Technical Data Support",
                    "Information System (IS) Development, Information Assurance (IA), and Information Technology (IT) Support",
                    "Software Engineering, Development, Programming, and Network Support",
                ],
            },
            {
                heading: "Records Management",
                items: ["Document Conversion", "Electronic Records Management Solutions"],
            },
            {
                heading: "Administrative Services",
                items: ["Office Administrative Services"],
            },
        ],
        sins: [
            { code: "54151S", label: "IT Professional Services" },
            { code: "518210DC", label: "Document Conversion Services" },
            { code: "518210ERM", label: "Electronic Records Management Solutions" },
            { code: "561110", label: "Office Administrative Services" },
            {
                code: "541611",
                label: "Management & Financial Consulting, Acquisition & Grants Management Support, Business Program & Project Management Services",
            },
            { code: "541990", label: "All Other Professional, Scientific, and Technical Services (Non-IT)" },
            { code: "OLM", label: "Order-Level Materials" },
        ],
    },
    {
        id: "seaport-nxg",
        short: "SeaPort-NxG",
        name: "NAVSEA SeaPort-NxG",
        icon: Icon.Server,
        sponsor: "Naval Sea Systems Command",
        contractNumber: "N00178-25-D7492",
        expiration: "January 2029",
        intro: "SeaPort-NxG is the Navy's electronic platform for acquiring support services in 23 functional areas including Engineering, Financial Management, and Program Management.",
        benefits: "NxG is a contract vehicle providing engineering and program support services for U.S. Navy activities.",
        services: [
            {
                heading: "Services Offered",
                items: [
                    "IT Facilities Operation & Maintenance",
                    "IT Systems Development Services",
                    "IT Systems Analysis Services",
                    "Automated Information Systems Design & Integration Services",
                    "Systems Programming",
                    "IT Network Management Services",
                    "Other IT Services Not Elsewhere Classified",
                ],
            },
        ],
    },
    {
        id: "sba-8a",
        short: "SBA 8(a)",
        name: "SBA 8(a) Program",
        icon: Icon.Users,
        sponsor: "U.S. Small Business Administration",
        period: "December 2019 – December 2029",
        intro: "Section 8(a) of the Small Business Act as amended by Congress created the 8(a) business development program. This program enables SBA to assist small disadvantaged firms to develop their businesses. In applying to the program, a firm is rigorously evaluated on its ownership, operations, financial health, and past performance. Once accepted, the firm is required to provide SBA a detailed business plan and annually show continued success as a viable, strong business entity. The SBA certifies firms that are approved for a period of nine years.",
        body: "The SBA has signed Memoranda of Understanding (MOUs) with Federal Agencies allowing them to contract directly with certified 8(a) firms. Participants can receive sole source contracts, up to a ceiling of $4 million for goods and services.",
        benefitsHeading: "The 8(a) sole source vehicle provides agencies a simplified and shortened acquisition procedure",
        benefitsList: [
            "Reduced decision cycle: the time required to award an 8(a) sole source contract is usually within days.",
            "Lowered administrative costs: procurement process and time is reduced to a minimum.",
            "Prices reflecting the best value: agency negotiates with the firm directly to get the best value.",
            "Credit for promoting small business participation within agency.",
            "Can initiate a contract with a simple high-level statement of work.",
        ],
        whoCanUse: ["Federal Agencies", "State and Local Government"],
        taskOrders: ["Firm-Fixed-Price (FFP)", "Cost-Reimbursement (CR)", "Labor-Hour (LH)", "Time-and-Materials (T&M)"],
    },
    {
        id: "stars-iii",
        short: "STARS III",
        name: "GSA 8(a) STARS III",
        icon: Icon.Shield,
        sponsor: "General Services Administration",
        contractNumber: "47QTCB22D0544",
        period: "February 7, 2022 – July 1, 2029",
        contractName: "8(a) Streamlined Technology Acquisition Resource for Services III",
        externalLinks: [{ label: "GSA STARS III program site", href: "https://www.gsa.gov/s3" }],
        intro: 'The 8(a) Streamlined Technology Acquisition Resource for Services (STARS) III Governmentwide Acquisition Contract (GWAC) — a/k/a "STARS III", is a Multiple Award, Indefinite-Delivery, Indefinite-Quantity (MA-IDIQ) contract to provide information technology (IT) services and IT services-based solutions which may include the integration of ancillary support which is necessary and integral to the IT services being acquired.',
        body: "STARS III Master Contract awards are reserved exclusively for qualifying Small Business Administration (SBA) certified 8(a) prime contractors with competitive prices.",
    },
    {
        id: "shield-idiq",
        short: "SHIELD IDIQ",
        name: "MDA SHIELD IDIQ",
        icon: Icon.Lock,
        sponsor: "Missile Defense Agency",
        ceiling: "$151B",
        jointVenture: "Ivyhill-ZAI Joint Venture",
        externalLinks: [{ label: "Missile Defense Agency", href: "https://www.mda.mil/" }],
        intro: "Ivyhill-ZAI Joint Venture is pleased to announce it was awarded a contract for the Missile Defense Agency Scalable Homeland Innovative Enterprise Layered Defense (SHIELD) indefinite-delivery/indefinite-quantity (IDIQ) contract with a ceiling of $151B.",
        body: "This contract encompasses a broad range of work areas that allows for the rapid delivery of innovative capabilities to the warfighter with increased speed and agility.",
    },
];

function MetaRow({ label, value, mono = false }) {
    return (
        <div className="flex flex-col gap-1 py-3 border-b border-line-1 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-fg-4 sm:w-[180px] shrink-0">{label}</div>
            <div className={`text-[14px] text-fg-1 ${mono ? "font-mono tracking-[0.02em] font-semibold" : "leading-[1.5]"}`}>
                {value}
            </div>
        </div>
    );
}

function VehiclePanel({ v }) {
    const I = v.icon;
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-10">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-md bg-ivy-green-50 text-ivy-green-700 shrink-0">
                        <I size={20} />
                    </span>
                    <h2 className="m-0 font-bold leading-[1.15] tracking-[-0.02em] text-fg-1 text-[clamp(24px,2.6vw,34px)]">
                        {v.name}
                    </h2>
                </div>
                <p className="m-0 mb-5 text-[16px] leading-[1.65] text-fg-2">{v.intro}</p>
                {v.body && <p className="m-0 mb-5 text-[16px] leading-[1.65] text-fg-2">{v.body}</p>}

                {v.benefits && (
                    <div className="border-l-2 border-ivy-green-500 pl-5 py-1 mb-6">
                        <div className="eyebrow text-ivy-green-700 mb-2">Features &amp; benefits</div>
                        <p className="m-0 text-[17px] leading-[1.6] text-fg-2">{v.benefits}</p>
                    </div>
                )}

                {v.benefitsList && (
                    <div className="mb-6">
                        <div className="eyebrow text-ivy-green-700 mb-3">{v.benefitsHeading}</div>
                        <ul className="list-none m-0 p-0 grid grid-cols-1 gap-3">
                            {v.benefitsList.map((b) => (
                                <li key={b} className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-fg-2">
                                    <span className="mt-1 text-ivy-green-600 shrink-0">
                                        <Icon.Check size={14} />
                                    </span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {v.services?.map((group) => (
                    <div key={group.heading} className="mb-5">
                        <div className="text-[13px] font-semibold tracking-[0.04em] uppercase text-fg-1 mb-2.5">
                            {group.heading}
                        </div>
                        <ul className="list-none m-0 p-0 grid grid-cols-1 gap-1.5">
                            {group.items.map((s) => (
                                <li key={s} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-fg-2">
                                    <span className="mt-[7px] w-1 h-1 rounded-full bg-ivy-green-500 shrink-0" />
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {v.sins && (
                    <div className="mt-6 pt-6 border-t border-line-1">
                        <div className="eyebrow text-ivy-green-700 mb-3">Awarded SINs</div>
                        <ul className="list-none m-0 p-0 grid grid-cols-1 gap-px bg-line-1 border border-line-1">
                            {v.sins.map((s) => (
                                <li
                                    key={s.code}
                                    className="bg-white py-3 px-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
                                >
                                    <span className="font-mono text-[13px] text-fg-1 font-semibold tracking-[0.02em] sm:w-[110px] shrink-0">
                                        {s.code}
                                    </span>
                                    <span className="text-[13.5px] text-fg-3 leading-[1.45]">{s.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {v.externalLinks && v.externalLinks.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-line-1">
                        <div className="eyebrow text-ivy-green-700 mb-3">Related links</div>
                        <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                            {v.externalLinks.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[14px] text-ivy-green-700 hover:text-ivy-green-600 no-underline"
                                    >
                                        {l.label}
                                        <Icon.ExternalLink size={13} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {(v.whoCanUse || v.taskOrders) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-line-1">
                        {v.whoCanUse && (
                            <div>
                                <div className="eyebrow text-ivy-green-700 mb-3">Who can use it</div>
                                <ul className="list-none m-0 p-0 flex flex-col gap-2">
                                    {v.whoCanUse.map((w) => (
                                        <li key={w} className="flex items-center gap-2.5 text-[14px] text-fg-2">
                                            <Icon.Check size={14} className="text-ivy-green-600 shrink-0" />
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {v.taskOrders && (
                            <div>
                                <div className="eyebrow text-ivy-green-700 mb-3">Task order types</div>
                                <ul className="list-none m-0 p-0 flex flex-col gap-2">
                                    {v.taskOrders.map((t) => (
                                        <li key={t} className="text-[14px] text-fg-2 font-mono tracking-[0.01em]">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <aside className="xl:sticky xl:top-24 self-start">
                <div className="border border-line-1 rounded-md bg-surface-subtle p-6">
                    <div className="eyebrow text-ivy-green-700 mb-4">General information</div>
                    <div className="flex flex-col">
                        {v.contractName && <MetaRow label="Contract name" value={v.contractName} />}
                        {v.contractNumber && <MetaRow label="Contract number" value={v.contractNumber} mono />}
                        {v.sponsor && <MetaRow label="Sponsor" value={v.sponsor} />}
                        {v.fscGroup && <MetaRow label="FSC group" value={v.fscGroup} />}
                        {v.jointVenture && <MetaRow label="Awarded to" value={v.jointVenture} />}
                        {v.ceiling && <MetaRow label="Ceiling" value={v.ceiling} mono />}
                        {v.period && <MetaRow label="Period of performance" value={v.period} />}
                        {v.expiration && <MetaRow label="Expiration date" value={v.expiration} mono />}
                    </div>

                    {v.pdfHref && (
                        <a
                            href={v.pdfHref}
                            target="_blank"
                            rel="noopener"
                            className="btn btn-secondary no-underline w-full justify-center mt-5"
                        >
                            {v.pdfLabel} <Icon.ExternalLink size={13} />
                        </a>
                    )}
                </div>

                <div className="border border-line-1 rounded-md bg-white p-6 mt-4">
                    <div className="eyebrow text-ivy-green-700 mb-3">Contract contact</div>
                    <div className="text-[17px] font-semibold text-fg-1 mb-1">Deanna Eaton</div>
                    <div className="text-[13px] text-fg-3 mb-4">President &amp; CEO</div>
                    <ul className="list-none m-0 p-0 flex flex-col gap-2.5 text-[13.5px]">
                        <li className="flex items-center gap-2.5">
                            <Icon.Phone size={14} className="text-ivy-green-600 shrink-0" />
                            <a href="tel:+13012788809" className="text-fg-2 no-underline hover:text-fg-1">
                                (301) 278-8809
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Icon.Mail size={14} className="text-ivy-green-600 shrink-0" />
                            <a href="mailto:info@ivyhilltech.com" className="text-fg-2 no-underline hover:text-fg-1">
                                info@ivyhilltech.com
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export function ContractVehicles() {
    const [activeId, setActiveId] = useState(VEHICLES[0].id);
    const active = VEHICLES.find((v) => v.id === activeId) ?? VEHICLES[0];

    return (
        <section className="section">
            <div className="container px-6">
                <div className="flex items-baseline gap-6 mb-8 lg:mb-10 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5 text-ivy-green-700">Active vehicles</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr] lg:gap-10">
                    {/* Mobile: wrapped pill grid */}
                    <div
                        role="tablist"
                        aria-label="Contract vehicles"
                        className="lg:hidden flex flex-wrap gap-2 pb-5 mb-6 border-b border-line-1"
                    >
                        {VEHICLES.map((v) => {
                            const isActive = v.id === activeId;
                            const I = v.icon;
                            return (
                                <button
                                    key={v.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`panel-${v.id}`}
                                    onClick={() => setActiveId(v.id)}
                                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold cursor-pointer transition-colors duration-100 ${
                                        isActive
                                            ? "border-ivy-green-500 bg-ivy-green-50 text-ivy-green-700"
                                            : "border-line-1 bg-white text-fg-3 hover:text-fg-1 hover:border-line-2"
                                    }`}
                                >
                                    <I size={14} />
                                    {v.short}
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop: vertical rail */}
                    <div
                        role="tablist"
                        aria-label="Contract vehicles"
                        aria-orientation="vertical"
                        className="hidden lg:flex lg:flex-col lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-line-1"
                    >
                        {VEHICLES.map((v) => {
                            const isActive = v.id === activeId;
                            const I = v.icon;
                            return (
                                <button
                                    key={v.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`panel-${v.id}`}
                                    id={`tab-${v.id}`}
                                    onClick={() => setActiveId(v.id)}
                                    className={`group relative flex items-start gap-3 text-left pl-5 pr-4 py-4 cursor-pointer transition-colors duration-100 -ml-px border-l-2 ${
                                        isActive
                                            ? "bg-surface-subtle border-ivy-green-500"
                                            : "border-transparent hover:bg-surface-subtle/70"
                                    }`}
                                >
                                    <span
                                        className={`flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-colors ${
                                            isActive
                                                ? "bg-ivy-green-100 text-ivy-green-700"
                                                : "bg-white border border-line-1 text-fg-4 group-hover:text-fg-2"
                                        }`}
                                    >
                                        <I size={15} />
                                    </span>
                                    <div className="flex flex-col min-w-0 pt-0.5">
                                        <span
                                            className={`text-[10.5px] font-semibold tracking-[0.14em] uppercase mb-0.5 transition-colors ${
                                                isActive ? "text-ivy-green-700" : "text-fg-4"
                                            }`}
                                        >
                                            {v.short}
                                        </span>
                                        <span
                                            className={`text-[13px] font-semibold leading-[1.3] transition-colors ${
                                                isActive ? "text-fg-1" : "text-fg-3 group-hover:text-fg-1"
                                            }`}
                                        >
                                            {v.name}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div
                        role="tabpanel"
                        id={`panel-${active.id}`}
                        aria-labelledby={`tab-${active.id}`}
                        key={active.id}
                        className="min-w-0"
                    >
                        <VehiclePanel v={active} />
                    </div>
                </div>
            </div>
        </section>
    );
}
