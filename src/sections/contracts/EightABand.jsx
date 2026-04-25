const BENEFITS = [
    {
        h: "Reduced decision cycle",
        t: "Sole-source 8(a) awards typically execute within days of statement-of-work submission.",
    },
    {
        h: "Lowered administrative cost",
        t: "Streamlined justification and minimal competition documentation reduce contracting officer workload.",
    },
    {
        h: "Best-value pricing",
        t: "Direct negotiation with the firm produces pricing tailored to the agency requirement.",
    },
    {
        h: "Socioeconomic credit",
        t: "Awards count toward the agency's small-business and disadvantaged-business participation goals.",
    },
];

export function EightABand() {
    return (
        <section className="bg-steel-900 text-white relative">
            <div className="container py-24 px-6">
                <div className="grid grid-cols-[1fr_1.4fr] gap-16 items-start">
                    <div>
                        <div className="flex items-center gap-3.5 mb-6">
                            <span className="inline-block w-8 h-px bg-ivy-green-400" />
                            <span className="eyebrow text-ivy-green-400">
                                SBA 8(a) program
                            </span>
                        </div>
                        <h2 className="m-0 mb-5 text-white leading-[1.15] text-[clamp(28px,2.8vw,38px)]">
                            Sole-source eligible.
                            <br />
                            Up to{" "}
                            <span className="text-ivy-green-400 tabular-nums">
                                $4.5M
                            </span>{" "}
                            on a single award.
                        </h2>
                        <p className="m-0 mb-[18px] text-white/[0.72] text-[16px] leading-[1.65] max-w-[480px]">
                            Ivyhill is an SBA-certified 8(a) participant.
                            Federal agencies may award sole-source contracts to
                            Ivyhill for services up to the program ceiling, and
                            competitive 8(a) set-asides above it, without
                            open-market procurement.
                        </p>
                        <div className="font-mono text-[12px] text-white/55 py-3.5 border-t border-b border-white/[0.14] flex justify-between gap-6 flex-wrap tabular-nums tracking-[0.04em]">
                            <span>Certified 2019</span>
                            <span>9-year term</span>
                            <span>Exits 2028</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/[0.12] border border-white/[0.12]">
                        {BENEFITS.map((b, i) => (
                            <div
                                key={b.h}
                                className="bg-steel-900 pt-7 px-7 pb-8"
                            >
                                <div className="font-mono text-[11px] text-ivy-green-400 tracking-[0.08em] mb-3 tabular-nums">
                                    0{i + 1}
                                </div>
                                <div className="text-[17px] font-semibold text-white mb-2 leading-[1.3]">
                                    {b.h}
                                </div>
                                <div className="text-[14px] leading-[1.55] text-white/[0.66]">
                                    {b.t}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
