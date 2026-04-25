import { Icon } from "../components/Icons.jsx";

const STATS = [
    ["Founded", "2015"],
    ["Headquarters", "Hyattsville, MD"],
    ["Practice areas", "Seven"],
    ["Personnel", "51–200"],
    ["Cleared staff", "Yes"],
    ["Cyber posture", "Defense-in-depth"],
];

export function Hero({ onCTA }) {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="hairline-grid absolute inset-0 pointer-events-none" />
            <div className="container relative px-6 pt-[120px] pb-24">
                <div className="grid grid-cols-[7fr_5fr] gap-16 items-start">
                    <div>
                        <div className="flex items-center gap-2.5 mb-6">
                            <span className="inline-block w-6 h-px bg-ink-900" />
                            <span className="eyebrow">
                                Enterprise Information Management
                            </span>
                        </div>
                        <h1 className="display font-bold leading-[1.04] tracking-[-0.025em] text-fg-1 m-0 mb-7 text-balance text-[clamp(40px,5.2vw,68px)]">
                            Mission-grade IT for the federal enterprise.
                        </h1>
                        <p className="text-[18px] leading-[1.55] text-fg-3 max-w-[620px] m-0 mb-9">
                            Ivyhill partners with U.S. federal, state, and local
                            agencies — and commercial clients — to develop
                            applications, manage records, secure infrastructure,
                            and accelerate document conversion at agency scale.
                            ISO-certified, contract-vehicle-ready, cleared
                            personnel.
                        </p>
                        <div className="flex gap-3 flex-wrap items-center">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onCTA}
                            >
                                Request capability statement{" "}
                                <Icon.Arrow size={14} />
                            </button>
                            <a
                                href="#past-performance"
                                className="btn btn-secondary no-underline"
                            >
                                View past performance
                            </a>
                            <a
                                href="#naics"
                                className="btn btn-ghost no-underline"
                            >
                                NAICS codes{" "}
                                <Icon.Arrow
                                    size={14}
                                    className="rotate-90"
                                />
                            </a>
                        </div>
                    </div>
                    <aside className="border border-line-1 rounded-[4px] py-6 px-[26px] bg-white shadow-[var(--shadow-1)]">
                        <div className="eyebrow mb-3.5">At a glance</div>
                        <dl className="m-0 grid grid-cols-2 gap-y-[18px] gap-x-6">
                            {STATS.map(([k, v]) => (
                                <div key={k}>
                                    <dt className="text-[11px] tracking-[0.12em] uppercase text-fg-4 font-semibold mb-1">
                                        {k}
                                    </dt>
                                    <dd className="m-0 text-[18px] font-semibold text-fg-1 tabular-nums">
                                        {v}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </aside>
                </div>
            </div>
        </section>
    );
}
