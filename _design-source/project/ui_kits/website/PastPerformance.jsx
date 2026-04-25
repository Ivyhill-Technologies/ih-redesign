// Past performance — agency client roster as monochrome plate-style cards.
// Real seals not bundled; we use a typographic placeholder badge in the federal-document register.
function PastPerformance() {
    const agencies = [
        {
            abbr: "DoL",
            name: "Department of Labor",
            work: "Records modernization · ~2.4M pages digitized",
        },
        {
            abbr: "DoJ",
            name: "Department of Justice",
            work: "Application development · case management",
        },
        {
            abbr: "ICE",
            name: "Immigration and Customs Enforcement",
            work: "Information management · queue optimization",
        },
        {
            abbr: "NIH",
            name: "National Institutes of Health",
            work: "Data analytics · grant-portfolio reporting",
        },
        {
            abbr: "USAF",
            name: "Department of the Air Force",
            work: "Infrastructure support · hybrid cloud",
        },
        {
            abbr: "USA",
            name: "Department of the Army",
            work: "Document conversion · IWR pipelines",
        },
    ];
    return (
        <section className="section" style={{ background: "var(--bg-subtle)" }}>
            <div className="container">
                <div
                    style={{
                        paddingTop: 24,
                        borderTop: "1px solid var(--ink-900)",
                        marginBottom: 36,
                    }}
                >
                    <span className="eyebrow">Past performance</span>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 48,
                        marginBottom: 56,
                        alignItems: "start",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "clamp(28px, 3vw, 40px)",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            color: "var(--fg-1)",
                            textWrap: "balance",
                        }}
                    >
                        Trusted across the federal mission.
                    </h2>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 17,
                            lineHeight: 1.6,
                            color: "var(--fg-3)",
                        }}
                    >
                        A representative sample of agency engagements. Full
                        past-performance documentation, including CPARS scores,
                        available on capability-statement request.
                    </p>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 16,
                    }}
                >
                    {agencies.map((a) => (
                        <article
                            key={a.abbr}
                            style={{
                                background: "#fff",
                                border: "1px solid var(--border-1)",
                                borderRadius: "var(--r-md)",
                                padding: "24px",
                                display: "flex",
                                gap: 16,
                            }}
                        >
                            <div
                                style={{
                                    width: 64,
                                    height: 64,
                                    flexShrink: 0,
                                    border: "1px solid var(--ink-700)",
                                    background: "var(--steel-900)",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: a.abbr.length > 3 ? 11 : 13,
                                    fontWeight: 600,
                                    letterSpacing: "0.06em",
                                }}
                            >
                                {a.abbr}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: "var(--fg-4)",
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        fontWeight: 600,
                                        marginBottom: 4,
                                    }}
                                >
                                    U.S. Federal
                                </div>
                                <h3
                                    style={{
                                        margin: "0 0 6px",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: "var(--fg-1)",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {a.name}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 13,
                                        color: "var(--fg-3)",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {a.work}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
                <div
                    style={{
                        marginTop: 32,
                        padding: "24px 28px",
                        background: "#fff",
                        border: "1px solid var(--border-1)",
                        borderLeft: "2px solid var(--ivy-green-500)",
                        borderRadius: "var(--r-md)",
                        maxWidth: 760,
                    }}
                >
                    <p
                        style={{
                            margin: "0 0 8px",
                            fontFamily: "var(--font-display)",
                            fontSize: 18,
                            color: "var(--fg-1)",
                            lineHeight: 1.4,
                        }}
                    >
                        "Ivyhill digitized 2.4 million pages on schedule and
                        within budget for our records modernization."
                    </p>
                    <div
                        style={{
                            fontSize: 12,
                            color: "var(--fg-4)",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.04em",
                        }}
                    >
                        Past performance · DOJ · 2023
                    </div>
                </div>
            </div>
        </section>
    );
}
window.PastPerformance = PastPerformance;
