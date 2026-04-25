const CERTS = [
    {
        id: "9001",
        label: "ISO 9001:2015",
        sub: "Quality management",
        no: "Q-2024-1182",
    },
    {
        id: "20000",
        label: "ISO/IEC 20000-1:2018",
        sub: "IT service management",
        no: "SM-2024-0431",
    },
    {
        id: "27001",
        label: "ISO/IEC 27001:2022",
        sub: "Information security",
        no: "IS-2025-0098",
    },
    {
        id: "cmmc",
        label: "CMMC Level 2",
        sub: "Defense contractor cyber",
        no: "In progress · 2026",
    },
];

export function CertsStrip() {
    return (
        <section className="bg-surface-subtle border-t border-b border-line-1">
            <div className="container py-12 px-6">
                <div className="flex items-baseline gap-6 mb-6 flex-wrap">
                    <div className="eyebrow">Compliance posture</div>
                    <div className="text-[13px] text-fg-3">
                        Independent third-party certified · audited annually
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-px bg-line-1 border border-line-1">
                    {CERTS.map((c) => (
                        <div
                            key={c.id}
                            className="bg-white pt-6 px-6 pb-[22px]"
                        >
                            <div className="text-[18px] font-bold text-fg-1 font-mono tabular-nums tracking-[-0.01em] mb-1.5">
                                {c.label}
                            </div>
                            <div className="text-[13px] text-fg-3 mb-3.5">
                                {c.sub}
                            </div>
                            <div className="font-mono text-[11px] text-fg-4 tracking-[0.04em] pt-3 border-t border-line-1 tabular-nums">
                                Cert no. {c.no}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
