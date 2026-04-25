const DESIGNATIONS = [
    {
        code: "8(a)",
        label: "SBA Small Disadvantaged Business",
        issuer: "U.S. Small Business Administration",
        term: "2019 – 2028",
    },
    {
        code: "MBE",
        label: "Minority Business Enterprise",
        issuer: "Maryland Department of Transportation",
        term: "Active",
    },
    {
        code: "DBE",
        label: "Disadvantaged Business Enterprise",
        issuer: "Maryland Department of Transportation",
        term: "Active",
    },
    {
        code: "SBE",
        label: "Small Business Enterprise",
        issuer: "Maryland Department of Transportation",
        term: "Active",
    },
];

const NAICS = [
    {
        code: "541511",
        label: "Custom Computer Programming Services",
        primary: true,
    },
    {
        code: "541512",
        label: "Computer Systems Design Services",
        primary: true,
    },
    { code: "541513", label: "Computer Facilities Management Services" },
    { code: "541519", label: "Other Computer Related Services" },
    {
        code: "541611",
        label: "Administrative Management & General Management Consulting",
    },
    { code: "518210", label: "Data Processing, Hosting, and Related Services" },
    { code: "561410", label: "Document Preparation Services" },
];

export function SetAsides() {
    return (
        <section id="designations" className="bg-white">
            <div className="container py-24 px-6">
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        <div className="border-t border-ink-900 pt-5 mb-6">
                            <div className="eyebrow text-fg-2">
                                Designations
                            </div>
                        </div>
                        <h2 className="m-0 mb-6">
                            Small-business set-aside eligibility
                        </h2>
                        <p className="text-[15px] leading-[1.65] text-fg-3 m-0 mb-7 max-w-[520px]">
                            Ivyhill qualifies for small-business set-aside
                            procurement under federal and Maryland-state
                            programs. Certifications below are current and
                            verifiable through the issuing authority.
                        </p>
                        <div className="border border-line-1 rounded-[4px] overflow-hidden">
                            {DESIGNATIONS.map((d, i) => (
                                <div
                                    key={d.code}
                                    className={`grid grid-cols-[72px_1fr_auto] gap-4 py-[18px] px-5 items-center ${
                                        i === DESIGNATIONS.length - 1
                                            ? ""
                                            : "border-b border-line-1"
                                    }`}
                                >
                                    <div className="font-mono text-[13px] font-bold text-ivy-green-700 tracking-[0.04em] tabular-nums">
                                        {d.code}
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-semibold text-fg-1">
                                            {d.label}
                                        </div>
                                        <div className="text-[12px] text-fg-3 mt-0.5">
                                            {d.issuer}
                                        </div>
                                    </div>
                                    <div className="font-mono text-[12px] text-fg-3 tabular-nums">
                                        {d.term}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="border-t border-ink-900 pt-5 mb-6">
                            <div className="eyebrow text-fg-2">NAICS codes</div>
                        </div>
                        <h2 className="m-0 mb-6">Industry classifications</h2>
                        <p className="text-[15px] leading-[1.65] text-fg-3 m-0 mb-7 max-w-[520px]">
                            Ivyhill is registered under the following North
                            American Industry Classification System codes.
                            Primary codes are highlighted; ordering activities
                            should reference the most relevant code on each task
                            order.
                        </p>
                        <div className="border border-line-1 rounded-[4px] overflow-hidden">
                            {NAICS.map((n, i) => (
                                <div
                                    key={n.code}
                                    className={`grid grid-cols-[88px_1fr_auto] gap-4 py-3.5 px-5 items-center ${
                                        i === NAICS.length - 1
                                            ? ""
                                            : "border-b border-line-1"
                                    } ${n.primary ? "bg-ivy-green-50" : "bg-white"}`}
                                >
                                    <div
                                        className={`font-mono text-[13px] font-semibold tabular-nums ${
                                            n.primary
                                                ? "text-ivy-green-700"
                                                : "text-fg-1"
                                        }`}
                                    >
                                        {n.code}
                                    </div>
                                    <div className="text-[14px] text-fg-2">
                                        {n.label}
                                    </div>
                                    <div
                                        className={`text-[11px] font-semibold tracking-[0.1em] uppercase ${
                                            n.primary
                                                ? "text-ivy-green-700"
                                                : "text-fg-4"
                                        }`}
                                    >
                                        {n.primary ? "Primary" : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
