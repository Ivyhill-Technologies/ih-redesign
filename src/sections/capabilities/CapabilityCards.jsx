export function CapabilityCards({ eyebrow = "What we deliver", title, lede, cards = [] }) {
    return (
        <section className="section">
            <div className="container">
                <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5">{eyebrow}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 items-start">
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                        {title}
                    </h2>
                    {lede && <p className="m-0 text-[17px] leading-[1.6] text-fg-3">{lede}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1 border border-line-1">
                    {cards.map((card) => {
                        const I = card.icon;
                        return (
                            <div
                                key={card.title}
                                className="group bg-white py-8 px-7 flex flex-col gap-3.5 min-h-[260px] border-t-2 border-transparent hover:border-ivy-green-500 transition-colors duration-150"
                            >
                                {I && <I size={28} className="text-ivy-green-600" />}
                                <h3 className="m-0 text-[18px] font-semibold text-fg-1">{card.title}</h3>
                                <p className="m-0 text-[14px] leading-[1.55] text-fg-3 flex-1">{card.body}</p>
                                {card.tags && card.tags.length > 0 && (
                                    <div className="flex gap-1.5 flex-wrap items-center">
                                        {card.tags.map((t, i) => (
                                            <span
                                                key={t}
                                                className="flex items-center gap-1.5 text-[11px] text-fg-4 font-mono tracking-[0.02em]"
                                            >
                                                {i > 0 && <span className="text-line-2">·</span>}
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
