// Quality / security certifications strip — flat, hairline boxes.
function CertsStrip() {
    const certs = [
        {
            id: "9001",
            label: "ISO 9001:2015",
            sub: "Quality management",
            no: "Q-2024-1182",
        },
        {
            id: "20000",
            label: "ISO/IEC 20000-1:2018",
            sub: "IT service management",
            no: "SM-2024-0431",
        },
        {
            id: "27001",
            label: "ISO/IEC 27001:2022",
            sub: "Information security",
            no: "IS-2025-0098",
        },
        {
            id: "cmmc",
            label: "CMMC Level 2",
            sub: "Defense contractor cyber",
            no: "In progress · 2026",
        },
    ];
    return (
        <section
            style={{
                background: "var(--bg-subtle)",
                borderTop: "1px solid var(--border-1)",
                borderBottom: "1px solid var(--border-1)",
            }}
        >
            <div className="container" style={{ padding: "48px 24px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 24,
                        marginBottom: 24,
                        flexWrap: "wrap",
                    }}
                >
                    <div className="eyebrow">Compliance posture</div>
                    <div style={{ fontSize: 13, color: "var(--fg-3)" }}>
                        Independent third-party certified · audited annually
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "1px",
                        background: "var(--border-1)",
                        border: "1px solid var(--border-1)",
                        background: "var(--border-1)",
                    }}
                >
                    {certs.map((c) => (
                        <div
                            key={c.id}
                            style={{
                                background: "#fff",
                                padding: "24px 24px 22px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: "var(--fg-1)",
                                    fontFamily: "var(--font-mono)",
                                    fontVariantNumeric: "tabular-nums",
                                    letterSpacing: "-0.01em",
                                    marginBottom: 6,
                                }}
                            >
                                {c.label}
                            </div>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: "var(--fg-3)",
                                    marginBottom: 14,
                                }}
                            >
                                {c.sub}
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11,
                                    color: "var(--fg-4)",
                                    letterSpacing: "0.04em",
                                    paddingTop: 12,
                                    borderTop: "1px solid var(--border-1)",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                Cert no. {c.no}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
window.CertsStrip = CertsStrip;
