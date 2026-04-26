const CODES = [
    {
        code: "518210",
        label: "Data Processing, Hosting, And Related Services",
    },
    { code: "541511", label: "Custom Computer Programming Services" },
    { code: "541512", label: "Computer Systems Design Services" },
    { code: "541513", label: "Computer Facilities Management Services" },
    { code: "541519", label: "Other Computer Related Services" },
    {
        code: "541611",
        label: "Administrative Management & General Management Consulting",
    },
    { code: "541612", label: "Human Resources Consulting Services" },
    { code: "541618", label: "Other Management Consulting Services" },
    { code: "541990", label: "Professional, Scientific & Technical Services" },
    { code: "561110", label: "Office Administrative Services" },
    { code: "561421", label: "Telephone Answering Services" },
];

export function NaicsCodes() {
    return (
        <section id="naics" className="section bg-surface-subtle border-t border-b border-line-1">
            <div className="container">
                <div className="flex items-baseline gap-6 mb-9 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5 whitespace-nowrap">NAICS Codes</span>
                </div>
                <div className="grid grid-cols-[1fr_1.4fr] gap-20 items-start">
                    <div>
                        <h2 className="m-0 mb-5 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                            Registered to do the work.
                        </h2>
                        <p className="m-0 mb-7 text-[17px] leading-[1.6] text-fg-3">
                            Ivyhill is classified under the North American Industry Classification System (NAICS) for the work we
                            deliver — IT services, management consulting, and administrative support. These codes let federal
                            contracting officers find us in procurement databases.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            <a
                                href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                                target="_blank"
                                rel="noopener"
                                className="btn btn-primary no-underline"
                            >
                                Capability statement
                            </a>
                        </div>
                    </div>
                    <ul className="list-none m-0 p-0 grid grid-cols-2 gap-px bg-line-1 border border-line-1">
                        {CODES.map((c) => (
                            <li
                                key={c.code}
                                className={`bg-white py-4 px-[18px] flex flex-col gap-1 border-l-2 ${
                                    c.primary ? "border-ivy-green-500" : "border-transparent"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-[14px] text-fg-1 font-semibold tracking-[0.02em]">
                                        {c.code}
                                    </span>
                                    {c.primary && (
                                        <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-ivy-green-700 bg-ivy-green-500/[0.12] py-0.5 px-1.5 rounded-sm">
                                            Primary
                                        </span>
                                    )}
                                </div>
                                <div className="text-[13px] text-fg-3 leading-[1.4]">{c.label}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
