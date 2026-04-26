import { Icon } from "../../components/Icons.jsx";

export function CapabilityIntro({ eyebrow = "Why this matters", title, lede, outcomes = [] }) {
    return (
        <section className="section bg-ivy-green-50">
            <div className="container px-6">
                <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5 text-ivy-green-700">{eyebrow}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-start">
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                        {title}
                    </h2>
                    <div>
                        {lede && <p className="m-0 mb-8 text-[17px] leading-[1.6] text-fg-3">{lede}</p>}
                        {outcomes.length > 0 && (
                            <ul className="list-none m-0 p-0 grid grid-cols-1 gap-5">
                                {outcomes.map((o) => (
                                    <li key={o} className="flex items-start gap-3 text-[15px] leading-[1.55] text-fg-2">
                                        <span className="mt-1 text-ivy-green-600 shrink-0">
                                            <Icon.Check size={16} />
                                        </span>
                                        <span>{o}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
