const STATS = [
    { n: "2.4M+", l: "Pages digitized for federal clients" },
    { n: "3", l: "Active ISO certifications" },
    { n: "10 yr", l: "Serving the federal mission" },
    { n: "1", l: "Accountable team across every capability" },
];

export function StatsBand() {
    return (
        <section className="text-white bg-gradient-to-b from-steel-900 to-ink-1000">
            <div className="container py-12 md:py-[72px] px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {STATS.map((s) => (
                        <div key={s.l} className="border-t border-white/[0.18] pt-5">
                            <div className="font-bold leading-none tracking-[-0.02em] text-white mb-3 tabular-nums text-[clamp(36px,4vw,56px)]">
                                {s.n}
                            </div>
                            <div className="text-[14px] text-white/[0.72] leading-[1.5]">{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
