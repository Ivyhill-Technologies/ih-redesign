import { Icon } from "../../components/Icons.jsx";

export function CapabilityAISpotlight({ eyebrow = "RAG & applied AI", title, lede, columns = [] }) {
    return (
        <section className="section border-t border-line-1">
            <div className="container px-6">
                <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5">{eyebrow}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-start">
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                        {title}
                    </h2>
                    {lede && <p className="m-0 text-[17px] leading-[1.6] text-fg-3">{lede}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 border border-line-1">
                    {columns.map((col) => (
                        <div key={col.heading} className="bg-white p-8 flex flex-col gap-4">
                            <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-ivy-green-700">
                                {col.eyebrow}
                            </span>
                            <h3 className="m-0 text-[20px] font-semibold text-fg-1">{col.heading}</h3>
                            {col.body && (
                                <p className="m-0 text-[15px] leading-[1.6] text-fg-3">{col.body}</p>
                            )}
                            {col.items && col.items.length > 0 && (
                                <ul className="list-none m-0 p-0 mt-2 flex flex-col gap-3">
                                    {col.items.map((it) => (
                                        <li
                                            key={it}
                                            className="flex items-start gap-3 text-[14px] leading-[1.55] text-fg-2"
                                        >
                                            <span className="mt-1 text-ivy-green-600 shrink-0">
                                                <Icon.Check size={14} />
                                            </span>
                                            <span>{it}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
