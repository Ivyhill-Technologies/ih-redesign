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
        <section
            style={{
                background: "#fff",
                borderBottom: "1px solid var(--border-1)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                className="hairline-grid"
                style={{ position: "absolute", inset: 0, opacity: 0.7 }}
            />
            <div
                className="container"
                style={{
                    position: "relative",
                    padding: "88px 24px 72px",
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr",
                    gap: 64,
                    alignItems: "end",
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: 28,
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: 32,
                                height: 1,
                                background: "var(--ink-900)",
                            }}
                        />
                        <span
                            className="eyebrow"
                            style={{ color: "var(--fg-2)" }}
                        >
                            Procurement · Contract vehicles
                        </span>
                    </div>
                    <h1
                        className="display"
                        style={{
                            fontSize: "clamp(36px, 4vw, 56px)",
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                            margin: "0 0 24px",
                            maxWidth: 780,
                        }}
                    >
                        Contracting pathways for federal, state, and local
                        agencies.
                    </h1>
                    <p
                        style={{
                            fontSize: 18,
                            lineHeight: 1.55,
                            color: "var(--fg-3)",
                            maxWidth: 640,
                            margin: "0 0 32px",
                        }}
                    >
                        Ivyhill holds active prime positions on Governmentwide
                        Acquisition Contracts, the GSA Multiple Award Schedule,
                        and agency-specific IDIQs — and is eligible for
                        sole-source 8(a) awards up to $4.5M for services.
                        Contract numbers, ordering procedures, and points of
                        contact below.
                    </p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <a href="#vehicles" className="btn btn-primary">
                            Jump to vehicles <Icon.Arrow size={14} />
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            Contracting POC
                        </a>
                    </div>
                </div>
                <aside
                    style={{
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--border-1)",
                        padding: "24px 28px",
                        borderRadius: "var(--r-md)",
                    }}
                >
                    <div
                        className="eyebrow"
                        style={{ marginBottom: 16, color: "var(--fg-3)" }}
                    >
                        At a glance
                    </div>
                    <dl
                        style={{
                            margin: 0,
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 14,
                            fontFamily: "var(--font-mono)",
                            fontSize: 13,
                        }}
                    >
                        {FACTS.map(([k, v]) => (
                            <div
                                key={k}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 16,
                                    paddingBottom: 10,
                                    borderBottom: "1px solid var(--border-1)",
                                }}
                            >
                                <dt
                                    style={{
                                        color: "var(--fg-4)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        fontSize: 11,
                                    }}
                                >
                                    {k}
                                </dt>
                                <dd
                                    style={{
                                        margin: 0,
                                        color: "var(--fg-1)",
                                        fontWeight: 500,
                                        fontVariantNumeric: "tabular-nums",
                                    }}
                                >
                                    {v}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <a
                        href="https://sam.gov/"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            marginTop: 16,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--ivy-green-700)",
                            textDecoration: "none",
                        }}
                    >
                        <Icon.ExternalLink size={13} /> SAM.gov registration
                    </a>
                </aside>
            </div>
        </section>
    );
}
