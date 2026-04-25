// Small-business designations + NAICS table.
function SetAsides() {
    const designations = [
        {
            code: "8(a)",
            label: "SBA Small Disadvantaged Business",
            issuer: "U.S. Small Business Administration",
            term: "2019 \u2013 2028",
        },
        {
            code: "MBE",
            label: "Minority Business Enterprise",
            issuer: "Maryland Department of Transportation",
            term: "Active",
        },
        {
            code: "DBE",
            label: "Disadvantaged Business Enterprise",
            issuer: "Maryland Department of Transportation",
            term: "Active",
        },
        {
            code: "SBE",
            label: "Small Business Enterprise",
            issuer: "Maryland Department of Transportation",
            term: "Active",
        },
    ];
    const naics = [
        {
            code: "541511",
            label: "Custom Computer Programming Services",
            primary: true,
        },
        {
            code: "541512",
            label: "Computer Systems Design Services",
            primary: true,
        },
        { code: "541513", label: "Computer Facilities Management Services" },
        { code: "541519", label: "Other Computer Related Services" },
        {
            code: "541611",
            label: "Administrative Management & General Management Consulting",
        },
        {
            code: "518210",
            label: "Data Processing, Hosting, and Related Services",
        },
        { code: "561410", label: "Document Preparation Services" },
    ];
    return (
        <section style={{ background: "#fff" }}>
            <div className="container" style={{ padding: "96px 24px" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 64,
                    }}
                >
                    <div>
                        <div
                            style={{
                                borderTop: "1px solid var(--ink-900)",
                                paddingTop: 20,
                                marginBottom: 24,
                            }}
                        >
                            <div
                                className="eyebrow"
                                style={{ color: "var(--fg-2)" }}
                            >
                                Designations
                            </div>
                        </div>
                        <h2 style={{ margin: "0 0 24px" }}>
                            Small-business set-aside eligibility
                        </h2>
                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.65,
                                color: "var(--fg-3)",
                                margin: "0 0 28px",
                                maxWidth: 520,
                            }}
                        >
                            Ivyhill qualifies for small-business set-aside
                            procurement under federal and Maryland-state
                            programs. Certifications below are current and
                            verifiable through the issuing authority.
                        </p>
                        <div
                            style={{
                                border: "1px solid var(--border-1)",
                                borderRadius: "var(--r-md)",
                                overflow: "hidden",
                            }}
                        >
                            {designations.map((d, i) => (
                                <div
                                    key={d.code}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "72px 1fr auto",
                                        gap: 16,
                                        padding: "18px 20px",
                                        borderBottom:
                                            i === designations.length - 1
                                                ? "none"
                                                : "1px solid var(--border-1)",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: "var(--ivy-green-700)",
                                            letterSpacing: "0.04em",
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {d.code}
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                color: "var(--fg-1)",
                                            }}
                                        >
                                            {d.label}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "var(--fg-3)",
                                                marginTop: 2,
                                            }}
                                        >
                                            {d.issuer}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 12,
                                            color: "var(--fg-3)",
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {d.term}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                borderTop: "1px solid var(--ink-900)",
                                paddingTop: 20,
                                marginBottom: 24,
                            }}
                        >
                            <div
                                className="eyebrow"
                                style={{ color: "var(--fg-2)" }}
                            >
                                NAICS codes
                            </div>
                        </div>
                        <h2 style={{ margin: "0 0 24px" }}>
                            Industry classifications
                        </h2>
                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.65,
                                color: "var(--fg-3)",
                                margin: "0 0 28px",
                                maxWidth: 520,
                            }}
                        >
                            Ivyhill is registered under the following North
                            American Industry Classification System codes.
                            Primary codes are highlighted; ordering activities
                            should reference the most relevant code on each task
                            order.
                        </p>
                        <div
                            style={{
                                border: "1px solid var(--border-1)",
                                borderRadius: "var(--r-md)",
                                overflow: "hidden",
                            }}
                        >
                            {naics.map((n, i) => (
                                <div
                                    key={n.code}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "88px 1fr auto",
                                        gap: 16,
                                        padding: "14px 20px",
                                        borderBottom:
                                            i === naics.length - 1
                                                ? "none"
                                                : "1px solid var(--border-1)",
                                        alignItems: "center",
                                        background: n.primary
                                            ? "var(--ivy-green-50)"
                                            : "#fff",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: n.primary
                                                ? "var(--ivy-green-700)"
                                                : "var(--fg-1)",
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {n.code}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            color: "var(--fg-2)",
                                        }}
                                    >
                                        {n.label}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 600,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            color: n.primary
                                                ? "var(--ivy-green-700)"
                                                : "var(--fg-4)",
                                        }}
                                    >
                                        {n.primary ? "Primary" : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
window.SetAsides = SetAsides;
