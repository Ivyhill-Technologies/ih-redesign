import { Icon } from "../components/Icons.jsx";

const FEATURES = [
    "Defense-in-depth across every engagement",
    "Continuous control monitoring",
    "NIST-aligned response playbooks",
    "Cleared personnel for sensitive work",
    "ISO/IEC 27001:2022 certified ISMS",
    "FedRAMP-aware cloud configurations",
];

export function CyberCallout() {
    return (
        <section className="section" id="cyber">
            <div className="container">
                <div className="pt-6 border-t border-ink-900 mb-9">
                    <span className="eyebrow">Horizontal capability</span>
                </div>
                <div className="grid grid-cols-[1fr_1.2fr] gap-20 items-start">
                    <div>
                        <h2 className="m-0 mb-5 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                            Cybersecurity is not a service line. It runs across
                            all of them.
                        </h2>
                        <p className="m-0 mb-6 text-[17px] leading-[1.6] text-fg-3">
                            Every Ivyhill engagement inherits an
                            active-protection posture. The practice areas above
                            are delivered against the same security backbone —
                            not bolted on, not a separate quote.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            <button type="button" className="btn btn-secondary">
                                Security overview
                            </button>
                            <button type="button" className="btn btn-ghost">
                                View ISO 27001 certificate{" "}
                                <Icon.ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                    <ul className="m-0 p-0 list-none grid grid-cols-2 gap-px bg-line-1 border border-line-1">
                        {FEATURES.map((f) => (
                            <li
                                key={f}
                                className="bg-white py-5 px-[22px] flex items-start gap-3 text-[14px] text-fg-2 leading-[1.5]"
                            >
                                <span className="text-ivy-green-600 shrink-0 mt-0.5">
                                    <Icon.Check size={16} />
                                </span>
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
