import { Icon } from "../../components/Icons.jsx";

const FEATURES = [
    "Active protection on every engagement",
    "Machine-intelligence static analyzer",
    "Behavioral threat engine",
    "Prevention and response posture",
    "ISO/IEC 27001:2022 certified ISMS",
];

const CERTS = [
    ["ISO 27001:2022", "Information security"],
    ["ISO 9001:2015", "Quality management"],
    ["ISO 20000-1:2018", "IT service management"],
];

export function CyberCallout() {
    return (
        <section className="section" id="cyber">
            <div className="container">
                <div className="pt-6 border-t border-ink-900 mb-9">
                    <span className="eyebrow">Horizontal capability</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-16 items-start">
                    <div>
                        <h2 className="m-0 mb-5 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(26px,3vw,40px)]">
                            Cybersecurity is not a service line. It runs across all of them.
                        </h2>
                        <p className="m-0 mb-6 text-[17px] md:text-[19px] leading-[1.6] text-fg-3">
                            Every Ivyhill engagement inherits an active-protection posture. The capabilities above are delivered
                            against the same security backbone — not bolted on, not a separate quote.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            <button type="button" className="btn btn-secondary">
                                Security overview
                            </button>
                        </div>
                        <dl className="mt-10 pt-6 border-t border-line-1 grid grid-cols-1 sm:grid-cols-3 gap-6 m-0">
                            {CERTS.map(([term, desc]) => (
                                <div key={term} className="m-0">
                                    <dt className="m-0 text-[11px] font-semibold tracking-[0.14em] uppercase text-ivy-green-700">
                                        {term}
                                    </dt>
                                    <dd className="m-0 mt-1 text-[13px] text-fg-3 leading-[1.4]">{desc}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <aside className="bg-ivy-green-50 border border-ivy-green-100 p-6 md:p-8">
                        <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-ivy-green-100">
                            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ivy-green-700">
                                Included on every engagement
                            </span>
                            <span className="text-[12px] text-fg-3 tabular-nums">{FEATURES.length} controls</span>
                        </div>
                        <ul className="m-0 p-0 list-none flex flex-col">
                            {FEATURES.map((f, i) => (
                                <li
                                    key={f}
                                    className={`flex items-center gap-3 md:gap-4 py-3 md:py-3.5 text-[15px] md:text-[17px] text-fg-2 leading-[1.45] ${
                                        i !== FEATURES.length - 1 ? "border-b border-ivy-green-100" : ""
                                    }`}
                                >
                                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-ivy-green-100 text-ivy-green-600">
                                        <Icon.Check size={14} />
                                    </span>
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </div>
        </section>
    );
}
