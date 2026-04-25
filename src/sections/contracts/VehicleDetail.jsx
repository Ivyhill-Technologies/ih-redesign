import { Icon } from "../../components/Icons.jsx";

export function VehicleDetail({ v, alt }) {
    return (
        <section
            id={v.id}
            className={`border-b border-line-1 ${
                alt ? "bg-surface-subtle" : "bg-white"
            }`}
        >
            <div className="container py-20 px-6">
                <div className="border-t border-ink-900 pt-6 mb-8 flex items-center justify-between gap-6 flex-wrap">
                    <div className="eyebrow text-fg-2">
                        {v.kind} · {v.agency}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {v.tags.map((t) => (
                            <span
                                key={t}
                                className="text-[11px] font-semibold tracking-[0.08em] uppercase text-fg-3 bg-white py-1 px-2.5 border border-line-2 rounded-full"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_360px] gap-16 items-start">
                    <div>
                        <h2 className="m-0 mb-2 leading-[1.15] text-[clamp(28px,2.6vw,36px)]">
                            {v.name}
                        </h2>
                        <div className="text-[14px] font-mono text-fg-3 mb-6 tabular-nums">
                            {v.fullName}
                        </div>
                        <p className="text-[17px] leading-[1.6] text-fg-2 m-0 mb-6 max-w-[680px]">
                            {v.description}
                        </p>

                        {v.scope && (
                            <>
                                <div className="text-[13px] font-semibold tracking-[0.04em] uppercase text-fg-3 mt-9 mb-3">
                                    Scope of services
                                </div>
                                <ul className="m-0 p-0 list-none grid grid-cols-2 gap-y-2.5 gap-x-8 max-w-[680px]">
                                    {v.scope.map((s) => (
                                        <li
                                            key={s}
                                            className="flex gap-2.5 items-baseline text-[14px] leading-[1.5] text-fg-2"
                                        >
                                            <span className="inline-block w-1.5 h-1.5 mt-1.5 bg-ivy-green-500 shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {v.benefits && (
                            <>
                                <div className="text-[13px] font-semibold tracking-[0.04em] uppercase text-fg-3 mt-9 mb-3">
                                    Why agencies use it
                                </div>
                                <div className="grid grid-cols-2 gap-px bg-line-1 border border-line-1">
                                    {v.benefits.map((b) => (
                                        <div
                                            key={b.h}
                                            className="bg-white py-[18px] px-5"
                                        >
                                            <div className="text-[14px] font-semibold text-fg-1 mb-1">
                                                {b.h}
                                            </div>
                                            <div className="text-[13px] leading-[1.5] text-fg-3">
                                                {b.t}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {v.ordering && (
                            <div className="mt-9 bg-steel-900 text-white py-6 px-7 rounded-[4px]">
                                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/55 mb-3.5">
                                    How to order
                                </div>
                                <ol className="m-0 p-0 list-none grid gap-3.5">
                                    {v.ordering.map((step, i) => (
                                        <li
                                            key={step}
                                            className="grid grid-cols-[28px_1fr] gap-3.5 items-baseline"
                                        >
                                            <span className="font-mono text-[12px] text-ivy-green-400 tabular-nums font-semibold">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-[14px] leading-[1.55] text-white/85">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>

                    <aside className="sticky top-24">
                        <div className="bg-white border border-line-2 rounded-[4px] pt-6 px-6 pb-2">
                            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-fg-4 mb-[18px]">
                                Contract record
                            </div>
                            <dl className="m-0">
                                {v.facts.map(([k, val]) => {
                                    const isMono =
                                        typeof val === "string" &&
                                        /\d/.test(val);
                                    return (
                                        <div
                                            key={k}
                                            className="py-3 border-b border-line-1"
                                        >
                                            <dt className="text-[11px] font-semibold tracking-[0.08em] uppercase text-fg-4 mb-1">
                                                {k}
                                            </dt>
                                            <dd
                                                className={`m-0 text-[14px] tabular-nums text-fg-1 font-medium leading-[1.4] ${
                                                    isMono ? "font-mono" : ""
                                                }`}
                                            >
                                                {val}
                                            </dd>
                                        </div>
                                    );
                                })}
                            </dl>
                            {v.link && (
                                <a
                                    href={v.link.href}
                                    className="flex items-center justify-between py-3.5 text-[13px] font-semibold text-ivy-green-700 no-underline"
                                >
                                    {v.link.label}
                                    <Icon.ExternalLink size={13} />
                                </a>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
