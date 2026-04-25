const ITEMS = [
    { label: "Quality", value: "ISO 9001:2015" },
    { label: "IT Service Mgmt", value: "ISO/IEC 20000-1:2018" },
    { label: "Information Security", value: "ISO/IEC 27001:2022" },
    { label: "Maryland DOT", value: "MBE · DBE · SBE" },
    { label: "GSA MAS", value: "47QTCA20D00AG" },
];

export function CodesStrip() {
    return (
        <section className="border-t border-b border-line-1 bg-surface-subtle">
            <div className="container px-6 py-7 grid grid-cols-5 gap-6">
                {ITEMS.map((it) => (
                    <div key={it.label}>
                        <div className="text-[10px] tracking-[0.12em] uppercase text-fg-4 font-semibold mb-1.5">
                            {it.label}
                        </div>
                        <div className="font-mono text-[13px] text-fg-1 tracking-[0.02em]">
                            {it.value}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
