import { Icon } from "../../components/Icons.jsx";

const ROW_COLS = "grid-cols-[80px_1.4fr_1fr_1fr_0.8fr_32px]";

export function VehicleIndex({ vehicles }) {
    return (
        <section
            id="vehicles"
            className="bg-surface-subtle border-t border-b border-line-1"
        >
            <div className="container py-14 px-6">
                <div className="flex items-baseline justify-between mb-7 gap-6 flex-wrap">
                    <div>
                        <div className="eyebrow mb-2">Index</div>
                        <h2 className="m-0">Active contract vehicles</h2>
                    </div>
                    <div className="text-[13px] text-fg-3 font-mono tracking-[0.04em]">
                        {vehicles.length} vehicles · last verified Apr 2026
                    </div>
                </div>

                <div className="bg-white border border-line-1 rounded-[4px] overflow-hidden">
                    <div
                        className={`grid ${ROW_COLS} py-3.5 px-6 bg-ink-100 border-b border-line-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-fg-3`}
                    >
                        <div>Type</div>
                        <div>Vehicle</div>
                        <div>Contract no.</div>
                        <div>Period</div>
                        <div>Ceiling</div>
                        <div></div>
                    </div>
                    {vehicles.map((v, i) => (
                        <a
                            key={v.id}
                            href={`#${v.id}`}
                            className={`grid ${ROW_COLS} py-[18px] px-6 bg-white text-fg-1 no-underline items-center text-[14px] transition-colors duration-100 hover:bg-surface-subtle ${
                                i === vehicles.length - 1
                                    ? ""
                                    : "border-b border-line-1"
                            }`}
                        >
                            <div>
                                <span
                                    className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase py-[3px] px-2 border bg-white rounded-sm"
                                    style={{
                                        borderColor: v.kindColor,
                                        color: v.kindColor,
                                    }}
                                >
                                    {v.kind}
                                </span>
                            </div>
                            <div className="font-semibold">
                                {v.name}
                                <span className="block text-[12px] text-fg-3 font-normal mt-0.5">
                                    {v.agency}
                                </span>
                            </div>
                            <div className="font-mono text-[12px] tabular-nums text-fg-2">
                                {v.number}
                            </div>
                            <div className="font-mono text-[12px] tabular-nums text-fg-3">
                                {v.period}
                            </div>
                            <div className="font-mono text-[12px] tabular-nums text-fg-2">
                                {v.ceiling}
                            </div>
                            <div className="text-right text-fg-4">
                                <Icon.Arrow size={14} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
