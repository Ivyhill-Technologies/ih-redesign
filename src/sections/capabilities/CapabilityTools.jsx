import { useState } from "react";
import { ToolTile } from "../../components/ToolTile.jsx";

const DEFAULT_TOOLS = [
    { name: "Power BI", src: "/assets/logos/powerbi.svg" },
    { name: "Tableau", src: "/assets/logos/tableau.svg" },
    { name: "pandas", src: "/assets/logos/pandas.svg" },
    { name: "R", src: "/assets/logos/r.svg" },
];

const FLAT_COLS = {
    4: "sm:grid-cols-4",
    6: "sm:grid-cols-3 lg:grid-cols-6",
    8: "sm:grid-cols-4",
    10: "sm:grid-cols-5",
};

const GROUP_COLS = {
    1: "grid-cols-1 max-w-[260px]",
    2: "grid-cols-2 max-w-[520px]",
    3: "grid-cols-3 max-w-[780px]",
    4: "grid-cols-2 sm:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-5",
};

function GroupedToolsTabs({ groups, lede, aside, practiceItems, agencies }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = groups[activeIndex];
    const tilesCols = GROUP_COLS[active.tools.length] ?? "grid-cols-2 sm:grid-cols-4";

    const ledeBlock = (lede || practiceItems || agencies) && (
        <div className="flex flex-col gap-6">
            {lede && (
                <div className="flex flex-col gap-4 text-[16px] leading-[1.6] text-fg-3">
                    {Array.isArray(lede)
                        ? lede.map((p, i) => <p key={i} className="m-0">{p}</p>)
                        : <p className="m-0">{lede}</p>}
                </div>
            )}
            {practiceItems && (
                <div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-fg-1 mb-3">
                        What this means in practice
                    </div>
                    <ul className="m-0 p-0 list-none flex flex-col gap-2">
                        {practiceItems.map((it, i) => (
                            <li key={i} className="flex gap-3 text-[14px] leading-[1.5] text-fg-2">
                                <span aria-hidden="true" className="mt-[7px] h-px w-4 shrink-0 bg-ivy-green-500" />
                                <span>{it}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {agencies && agencies.length > 0 && (
                <div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-fg-1 mb-3">
                        Delivered for
                    </div>
                    <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
                        {agencies.map((a) => (
                            <li
                                key={a.abbr}
                                title={a.name}
                                className="px-2.5 py-1 bg-white border border-line-1 text-[11px] font-mono tracking-[0.06em] text-fg-2"
                            >
                                {a.abbr}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    return (
        <>
            {(lede || aside || practiceItems || agencies) && (
                aside ? (
                    <div className="mb-10 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-start">
                        {ledeBlock}
                        <aside className="bg-white border border-line-1 px-5 py-5">
                            {aside.title && (
                                <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-fg-1 mb-4">
                                    {aside.title}
                                </div>
                            )}
                            <ul className="m-0 p-0 list-none space-y-3">
                                {aside.items.map((it, i) => (
                                    <li key={i} className="flex flex-col gap-0.5">
                                        <span className="text-[11px] font-mono uppercase tracking-[0.06em] text-ivy-green-700">
                                            {it.label}
                                        </span>
                                        <span className="text-[13px] leading-[1.45] text-fg-3">
                                            {it.value}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                ) : (
                    <div className="mb-10 max-w-[760px]">{ledeBlock}</div>
                )
            )}
            <div role="tablist" className="flex flex-wrap gap-px bg-line-1 border border-line-1 border-b-0">
                {groups.map((g, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <button
                            key={g.category}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveIndex(i)}
                            className={`flex-1 min-w-[160px] px-5 py-4 text-left border-t-2 cursor-pointer transition-colors duration-150 ${
                                isActive
                                    ? "bg-white border-ivy-green-500"
                                    : "bg-surface-subtle border-transparent hover:bg-white"
                            }`}
                        >
                            <div
                                className={`text-[11px] font-mono uppercase tracking-[0.08em] ${isActive ? "text-fg-1" : "text-fg-3"}`}
                            >
                                {g.category}
                            </div>
                            <div className="text-[11px] text-fg-4 mt-1 font-mono">
                                {g.tools.length} {g.tools.length === 1 ? "tool" : "tools"}
                            </div>
                        </button>
                    );
                })}
            </div>
            <div role="tabpanel" className="bg-white border border-line-1 border-t-0 px-6 py-7">
                {active.summary && (
                    <p className="m-0 mb-6 max-w-[700px] text-[13.5px] leading-[1.55] text-fg-3">
                        {active.summary}
                    </p>
                )}
                <div className={`grid ${tilesCols} gap-px bg-line-1 border border-line-1`}>
                    {active.tools.map((t) => (
                        <ToolTile key={t.name} tool={t} />
                    ))}
                </div>
            </div>
        </>
    );
}

export function CapabilityTools({ eyebrow = "Tooling", lede, tools, groups, aside, practiceItems, agencies }) {
    const flatTools = tools ?? DEFAULT_TOOLS;
    const flatColClass = FLAT_COLS[flatTools.length] ?? "sm:grid-cols-4";

    return (
        <section className="section bg-surface-subtle border-t border-line-1">
            <div className="container px-6">
                <div className="flex items-baseline gap-6 mb-10 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5 text-ivy-green-700">{eyebrow}</span>
                </div>

                {groups ? (
                    <GroupedToolsTabs groups={groups} lede={lede} aside={aside} practiceItems={practiceItems} agencies={agencies} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
                        {lede && <p className="m-0 text-[16px] leading-[1.6] text-fg-3">{lede}</p>}
                        <div className={`grid grid-cols-2 ${flatColClass} gap-px bg-line-1 border border-line-1`}>
                            {flatTools.map((t) => (
                                <ToolTile key={t.name} tool={t} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
