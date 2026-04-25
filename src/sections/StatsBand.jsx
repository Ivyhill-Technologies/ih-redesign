const STATS = [
    { n: "2.4M+", l: "Pages digitized for federal clients" },
    { n: "7", l: "Practice areas, one accountable team" },
    { n: "3", l: "Active ISO certifications" },
    { n: "10 yr", l: "Serving the federal mission" },
];

export function StatsBand() {
    return (
        <section
            style={{
                background:
                    "linear-gradient(180deg, var(--steel-900), #0B1220)",
                color: "#fff",
            }}
        >
            <div className="container" style={{ padding: "72px 24px" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 48,
                    }}
                >
                    {STATS.map((s) => (
                        <div
                            key={s.l}
                            style={{
                                borderTop: "1px solid rgba(255,255,255,0.18)",
                                paddingTop: 20,
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "clamp(36px, 4vw, 56px)",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    letterSpacing: "-0.02em",
                                    color: "#fff",
                                    marginBottom: 12,
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {s.n}
                            </div>
                            <div
                                style={{
                                    fontSize: 14,
                                    color: "rgba(255,255,255,0.72)",
                                    lineHeight: 1.5,
                                }}
                            >
                                {s.l}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
