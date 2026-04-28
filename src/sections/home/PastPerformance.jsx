const AGENCIES = [
    {
        abbr: "DoL",
        name: "Department of Labor",
        work: "Records modernization · ~2.4M pages digitized",
    },
    {
        abbr: "DoJ",
        name: "Department of Justice",
        work: "Application development · case management",
    },
    {
        abbr: "ICE",
        name: "Immigration and Customs Enforcement",
        work: "Information management · queue optimization",
    },
    {
        abbr: "NIH",
        name: "National Institutes of Health",
        work: "Data analytics · grant-portfolio reporting",
    },
    {
        abbr: "USAF",
        name: "Department of the Air Force",
        work: "Infrastructure support · hybrid cloud",
    },
    {
        abbr: "USA",
        name: "Department of the Army",
        work: "Document conversion · IWR pipelines",
    },
];

export function PastPerformance() {
    return (
        <section className="section bg-surface-subtle" id="past-performance">
            <div className="container">
                <div className="pt-6 border-t border-ink-900 mb-9">
                    <span className="eyebrow">Past performance</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14 items-start">
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(26px,3vw,40px)]">
                        Trusted across the federal mission.
                    </h2>
                    <p className="m-0 text-[17px] md:text-[19px] leading-[1.6] text-fg-3">
                        A representative sample of agency engagements. Full past-performance documentation, including CPARS
                        scores, available on capability-statement request.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {AGENCIES.map((a) => (
                        <article key={a.abbr} className="bg-white border border-line-1 rounded-[4px] p-6 flex gap-4">
                            <div
                                className={`w-16 h-16 shrink-0 border border-ink-700 bg-steel-900 text-white flex items-center justify-center font-mono font-semibold tracking-[0.06em] ${
                                    a.abbr.length > 3 ? "text-[11px]" : "text-[13px]"
                                }`}
                            >
                                {a.abbr}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[11px] text-fg-4 tracking-[0.12em] uppercase font-semibold mb-1">
                                    U.S. Federal
                                </div>
                                <h3 className="m-0 mb-1.5 text-[17px] font-semibold text-fg-1 leading-[1.3]">{a.name}</h3>
                                <p className="m-0 text-[13px] text-fg-3 leading-[1.5]">{a.work}</p>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-8 py-6 px-7 bg-white border border-line-1 border-l-2 border-l-ivy-green-500 rounded-[4px] max-w-[760px]">
                    <p className="m-0 mb-2 text-[18px] text-fg-1 leading-[1.4]">
                        "Ivyhill digitized 2.4 million pages on schedule and within budget for our records modernization."
                    </p>
                    <div className="text-[12px] text-fg-4 font-mono tracking-[0.04em]">Past performance · DOJ · 2023</div>
                </div>
            </div>
        </section>
    );
}
