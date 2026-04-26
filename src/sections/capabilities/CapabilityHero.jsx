import { Icon } from "../../components/Icons.jsx";

export function CapabilityHero({ eyebrow = "Capability", title, lede, ctaLabel = "Request capability statement", onCTA }) {
    return (
        <section className="relative overflow-hidden bg-steel-900">
            <div className="hairline-grid-dark absolute inset-0 pointer-events-none" />
            <img
                src="/assets/icon-color-large.png"
                alt=""
                aria-hidden="true"
                className="absolute -right-8 -top-2 w-[360px] h-auto pointer-events-none select-none opacity-[0.35]"
            />
            <div className="container relative px-6 pt-20 pb-16">
                <div className="flex items-center gap-2.5 mb-5">
                    <span className="inline-block w-8 h-[2px] bg-ivy-green-500" />
                    <span className="text-[13px] font-bold tracking-[0.16em] uppercase text-ivy-green-400">{eyebrow}</span>
                </div>
                <h1 className="font-bold leading-[1.05] tracking-[-0.025em] text-white m-0 mb-5 text-balance text-[clamp(32px,4vw,52px)]">
                    {title}
                </h1>
                <p className="text-[18px] leading-[1.55] text-ink-300 max-w-[640px] m-0 mb-8">{lede}</p>
                <button
                    type="button"
                    className="btn bg-ivy-green-500 text-ink-1000 hover:bg-ivy-green-400 border-transparent"
                    onClick={onCTA}
                >
                    {ctaLabel} <Icon.Arrow size={14} />
                </button>
            </div>
        </section>
    );
}
