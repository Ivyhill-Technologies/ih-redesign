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
                <div
                    style={{
                        paddingTop: 24,
                        borderTop: "1px solid var(--ink-900)",
                        marginBottom: 36,
                    }}
                >
                    <span className="eyebrow">Horizontal capability</span>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.2fr",
                        gap: 80,
                        alignItems: "start",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: "0 0 20px",
                                fontSize: "clamp(28px, 3vw, 40px)",
                                fontWeight: 700,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                color: "var(--fg-1)",
                                textWrap: "balance",
                            }}
                        >
                            Cybersecurity is not a service line. It runs across
                            all of them.
                        </h2>
                        <p
                            style={{
                                margin: "0 0 24px",
                                fontSize: 17,
                                lineHeight: 1.6,
                                color: "var(--fg-3)",
                            }}
                        >
                            Every Ivyhill engagement inherits an
                            active-protection posture. The practice areas above
                            are delivered against the same security backbone —
                            not bolted on, not a separate quote.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                flexWrap: "wrap",
                            }}
                        >
                            <button type="button" className="btn btn-secondary">
                                Security overview
                            </button>
                            <button type="button" className="btn btn-ghost">
                                View ISO 27001 certificate{" "}
                                <Icon.ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                    <ul
                        style={{
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1px",
                            background: "var(--border-1)",
                            border: "1px solid var(--border-1)",
                        }}
                    >
                        {FEATURES.map((f) => (
                            <li
                                key={f}
                                style={{
                                    background: "#fff",
                                    padding: "20px 22px",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 12,
                                    fontSize: 14,
                                    color: "var(--fg-2)",
                                    lineHeight: 1.5,
                                }}
                            >
                                <span
                                    style={{
                                        color: "var(--ivy-green-600)",
                                        flexShrink: 0,
                                        marginTop: 2,
                                    }}
                                >
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
