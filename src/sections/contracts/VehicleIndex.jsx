import { Icon } from "../../components/Icons.jsx";

export function VehicleIndex({ vehicles }) {
    return (
        <section
            id="vehicles"
            style={{
                background: "var(--bg-subtle)",
                borderTop: "1px solid var(--border-1)",
                borderBottom: "1px solid var(--border-1)",
            }}
        >
            <div className="container" style={{ padding: "56px 24px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        marginBottom: 28,
                        gap: 24,
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <div className="eyebrow" style={{ marginBottom: 8 }}>
                            Index
                        </div>
                        <h2 style={{ margin: 0 }}>Active contract vehicles</h2>
                    </div>
                    <div
                        style={{
                            fontSize: 13,
                            color: "var(--fg-3)",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {vehicles.length} vehicles · last verified Apr 2026
                    </div>
                </div>

                <div
                    style={{
                        background: "#fff",
                        border: "1px solid var(--border-1)",
                        borderRadius: "var(--r-md)",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "80px 1.4fr 1fr 1fr 0.8fr 32px",
                            gap: 0,
                            padding: "14px 24px",
                            background: "var(--ink-100)",
                            borderBottom: "1px solid var(--border-1)",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--fg-3)",
                        }}
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
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "80px 1.4fr 1fr 1fr 0.8fr 32px",
                                padding: "18px 24px",
                                borderBottom:
                                    i === vehicles.length - 1
                                        ? "none"
                                        : "1px solid var(--border-1)",
                                background: "#fff",
                                color: "var(--fg-1)",
                                textDecoration: "none",
                                alignItems: "center",
                                fontSize: 14,
                                transition: "background 120ms",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "var(--bg-subtle)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#fff";
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        fontSize: 10,
                                        fontWeight: 600,
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        padding: "3px 8px",
                                        border: `1px solid ${v.kindColor}`,
                                        color: v.kindColor,
                                        borderRadius: "var(--r-sm)",
                                        background: "#fff",
                                    }}
                                >
                                    {v.kind}
                                </span>
                            </div>
                            <div style={{ fontWeight: 600 }}>
                                {v.name}
                                <span
                                    style={{
                                        display: "block",
                                        fontSize: 12,
                                        color: "var(--fg-3)",
                                        fontWeight: 400,
                                        marginTop: 2,
                                    }}
                                >
                                    {v.agency}
                                </span>
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 12,
                                    fontVariantNumeric: "tabular-nums",
                                    color: "var(--fg-2)",
                                }}
                            >
                                {v.number}
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 12,
                                    fontVariantNumeric: "tabular-nums",
                                    color: "var(--fg-3)",
                                }}
                            >
                                {v.period}
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 12,
                                    fontVariantNumeric: "tabular-nums",
                                    color: "var(--fg-2)",
                                }}
                            >
                                {v.ceiling}
                            </div>
                            <div
                                style={{
                                    textAlign: "right",
                                    color: "var(--fg-4)",
                                }}
                            >
                                <Icon.Arrow size={14} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
