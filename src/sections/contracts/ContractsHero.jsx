import { Icon } from "../../components/Icons.jsx";

const FACTS = [
    ["CAGE code", "7HWD9"],
    ["UEI", "LSVSGHNE2ZW5"],
    ["DUNS", "08-014-3361"],
    ["SBA 8(a) entry", "2019 · exits 2028"],
    ["Designations", "MBE · DBE · SBE"],
];

export function ContractsHero() {
    return (
        <section className="bg-white border-b border-line-1 relative overflow-hidden">
            <div className="hairline-grid absolute inset-0 opacity-70" />
            <div className="container relative px-6 pt-[88px] pb-[72px] grid grid-cols-[1.2fr_0.8fr] gap-16 items-end">
                <div>
                    <div className="flex items-center gap-3.5 mb-7">
                        <span className="inline-block w-8 h-px bg-ink-900" />
                        <span className="eyebrow text-fg-2">
                            Procurement · Contract vehicles
                        </span>
                    </div>
                    <h1 className="display font-bold leading-[1.05] tracking-[-0.02em] m-0 mb-6 max-w-[780px] text-[clamp(36px,4vw,56px)]">
                        Contracting pathways for federal, state, and local
                        agencies.
                    </h1>
                    <p className="text-[18px] leading-[1.55] text-fg-3 max-w-[640px] m-0 mb-8">
                        Ivyhill holds active prime positions on Governmentwide
                        Acquisition Contracts, the GSA Multiple Award Schedule,
                        and agency-specific IDIQs — and is eligible for
                        sole-source 8(a) awards up to $4.5M for services.
                        Contract numbers, ordering procedures, and points of
                        contact below.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <a href="#vehicles" className="btn btn-primary">
                            Jump to vehicles <Icon.Arrow size={14} />
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            Contracting POC
                        </a>
                    </div>
                </div>
                <aside className="bg-surface-subtle border border-line-1 py-6 px-7 rounded-[4px]">
                    <div className="eyebrow mb-4 text-fg-3">At a glance</div>
                    <dl className="m-0 grid grid-cols-1 gap-3.5 font-mono text-[13px]">
                        {FACTS.map(([k, v]) => (
                            <div
                                key={k}
                                className="flex justify-between gap-4 pb-2.5 border-b border-line-1"
                            >
                                <dt className="text-fg-4 uppercase tracking-[0.08em] text-[11px]">
                                    {k}
                                </dt>
                                <dd className="m-0 text-fg-1 font-medium tabular-nums">
                                    {v}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <a
                        href="https://sam.gov/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-ivy-green-700 no-underline"
                    >
                        <Icon.ExternalLink size={13} /> SAM.gov registration
                    </a>
                </aside>
            </div>
        </section>
    );
}
