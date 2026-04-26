const DEFAULT_TOOLS = [
    { name: "Power BI", src: "/assets/logos/powerbi.svg" },
    { name: "Tableau", src: "/assets/logos/tableau.svg" },
    { name: "pandas", src: "/assets/logos/pandas.svg" },
    { name: "R", src: "/assets/logos/r.svg" },
];

export function CapabilityTools({ eyebrow = "Tooling", lede, tools = DEFAULT_TOOLS }) {
    return (
        <section className="section bg-surface-subtle border-t border-line-1">
            <div className="container px-6">
                <div className="flex items-baseline gap-6 mb-10 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5">{eyebrow}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
                    {lede && <p className="m-0 text-[16px] leading-[1.6] text-fg-3">{lede}</p>}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line-1 border border-line-1">
                        {tools.map((t) => (
                            <div
                                key={t.name}
                                className="bg-white py-10 px-6 flex flex-col items-center justify-center gap-3 min-h-[140px]"
                            >
                                <img
                                    src={t.src}
                                    alt=""
                                    aria-hidden="true"
                                    className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-200"
                                />
                                <span className="text-[11px] text-fg-3 font-mono tracking-[0.06em] uppercase">{t.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
