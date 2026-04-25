// Contracting POC + capability statement download — final CTA block.
function ContactBlock() {
    return (
        <section id="contact" style={{ background: "#fff" }}>
            <div className="container" style={{ padding: "96px 24px" }}>
                <div
                    style={{
                        borderTop: "1px solid var(--ink-900)",
                        paddingTop: 24,
                        marginBottom: 48,
                    }}
                >
                    <div className="eyebrow" style={{ color: "var(--fg-2)" }}>
                        Contracting points of contact
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr 1fr",
                        gap: 48,
                        alignItems: "start",
                    }}
                >
                    <div>
                        <h2 style={{ margin: "0 0 16px" }}>
                            Reach our contracting team.
                        </h2>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.6,
                                color: "var(--fg-3)",
                                margin: "0 0 24px",
                                maxWidth: 480,
                            }}
                        >
                            Contracting officers, COTRs, and small-business
                            specialists may contact Ivyhill directly for
                            capability statements, past-performance
                            documentation, and ordering procedures on any of our
                            active vehicles.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                flexWrap: "wrap",
                            }}
                        >
                            <a href="#" className="btn btn-primary">
                                Request capability statement{" "}
                                <Icon.Arrow size={14} />
                            </a>
                            <a href="#" className="btn btn-secondary">
                                <Icon.ExternalLink size={13} /> Download
                                contract record (PDF)
                            </a>
                        </div>
                    </div>
                    <div
                        style={{
                            border: "1px solid var(--border-1)",
                            borderRadius: "var(--r-md)",
                            padding: "24px 28px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "var(--fg-4)",
                                marginBottom: 14,
                            }}
                        >
                            Contracts &amp; pricing
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "var(--fg-1)",
                                marginBottom: 4,
                            }}
                        >
                            Olusola "Sola" Adesiyan
                        </div>
                        <div
                            style={{
                                fontSize: 13,
                                color: "var(--fg-3)",
                                marginBottom: 18,
                            }}
                        >
                            President &amp; CEO
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                                fontSize: 13,
                                color: "var(--fg-2)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Icon.Mail
                                    size={14}
                                    style={{ color: "var(--ivy-green-700)" }}
                                />
                                contracts@ivyhilltech.com
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Icon.Phone
                                    size={14}
                                    style={{ color: "var(--ivy-green-700)" }}
                                />
                                +1 (301) 477-1080 ext. 102
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            border: "1px solid var(--border-1)",
                            borderRadius: "var(--r-md)",
                            padding: "24px 28px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "var(--fg-4)",
                                marginBottom: 14,
                            }}
                        >
                            Small-business liaison
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "var(--fg-1)",
                                marginBottom: 4,
                            }}
                        >
                            Marcus Chen
                        </div>
                        <div
                            style={{
                                fontSize: 13,
                                color: "var(--fg-3)",
                                marginBottom: 18,
                            }}
                        >
                            Director, Capture &amp; Proposals
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                                fontSize: 13,
                                color: "var(--fg-2)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Icon.Mail
                                    size={14}
                                    style={{ color: "var(--ivy-green-700)" }}
                                />
                                sb-liaison@ivyhilltech.com
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Icon.Phone
                                    size={14}
                                    style={{ color: "var(--ivy-green-700)" }}
                                />
                                +1 (301) 477-1080 ext. 118
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
window.ContactBlock = ContactBlock;
