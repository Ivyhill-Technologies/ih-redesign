const BENEFITS = [
    {
        h: "Reduced decision cycle",
        t: "Sole-source 8(a) awards typically execute within days of statement-of-work submission.",
    },
    {
        h: "Lowered administrative cost",
        t: "Streamlined justification and minimal competition documentation reduce contracting officer workload.",
    },
    {
        h: "Best-value pricing",
        t: "Direct negotiation with the firm produces pricing tailored to the agency requirement.",
    },
    {
        h: "Socioeconomic credit",
        t: "Awards count toward the agency’s small-business and disadvantaged-business participation goals.",
    },
];

export function EightABand() {
    return (
        <section
            style={{
                background: "var(--steel-900)",
                color: "#fff",
                position: "relative",
            }}
        >
            <div className="container" style={{ padding: "96px 24px" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.4fr",
                        gap: 64,
                        alignItems: "start",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                marginBottom: 24,
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 32,
                                    height: 1,
                                    background: "var(--ivy-green-400)",
                                }}
                            />
                            <span
                                className="eyebrow"
                                style={{ color: "var(--ivy-green-400)" }}
                            >
                                SBA 8(a) program
                            </span>
                        </div>
                        <h2
                            style={{
                                margin: "0 0 20px",
                                color: "#fff",
                                fontSize: "clamp(28px, 2.8vw, 38px)",
                                lineHeight: 1.15,
                            }}
                        >
                            Sole-source eligible.
                            <br />
                            Up to{" "}
                            <span
                                style={{
                                    color: "var(--ivy-green-400)",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                $4.5M
                            </span>{" "}
                            on a single award.
                        </h2>
                        <p
                            style={{
                                margin: "0 0 18px",
                                color: "rgba(255,255,255,0.72)",
                                fontSize: 16,
                                lineHeight: 1.65,
                                maxWidth: 480,
                            }}
                        >
                            Ivyhill is an SBA-certified 8(a) participant.
                            Federal agencies may award sole-source contracts to
                            Ivyhill for services up to the program ceiling, and
                            competitive 8(a) set-asides above it, without
                            open-market procurement.
                        </p>
                        <div
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 12,
                                color: "rgba(255,255,255,0.55)",
                                padding: "14px 0",
                                borderTop: "1px solid rgba(255,255,255,0.14)",
                                borderBottom:
                                    "1px solid rgba(255,255,255,0.14)",
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 24,
                                flexWrap: "wrap",
                                fontVariantNumeric: "tabular-nums",
                                letterSpacing: "0.04em",
                            }}
                        >
                            <span>Certified 2019</span>
                            <span>9-year term</span>
                            <span>Exits 2028</span>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1px",
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}
                    >
                        {BENEFITS.map((b, i) => (
                            <div
                                key={b.h}
                                style={{
                                    background: "var(--steel-900)",
                                    padding: "28px 28px 32px",
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 11,
                                        color: "var(--ivy-green-400)",
                                        letterSpacing: "0.08em",
                                        marginBottom: 12,
                                        fontVariantNumeric: "tabular-nums",
                                    }}
                                >
                                    0{i + 1}
                                </div>
                                <div
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 600,
                                        color: "#fff",
                                        marginBottom: 8,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {b.h}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        lineHeight: 1.55,
                                        color: "rgba(255,255,255,0.66)",
                                    }}
                                >
                                    {b.t}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
