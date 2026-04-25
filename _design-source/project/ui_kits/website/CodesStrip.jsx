// ISO certifications + MBE/DBE/SBE designations strip
function CodesStrip() {
    const items = [
        { label: "Quality", value: "ISO 9001:2015" },
        { label: "IT Service Mgmt", value: "ISO/IEC 20000-1:2018" },
        { label: "Information Security", value: "ISO/IEC 27001:2022" },
        { label: "Maryland DOT", value: "MBE · DBE · SBE" },
        { label: "GSA MAS", value: "47QTCA20D00AG" },
    ];
    return (
        <section
            style={{
                borderTop: "1px solid var(--border-1)",
                borderBottom: "1px solid var(--border-1)",
                background: "var(--bg-subtle)",
            }}
        >
            <div
                className="container"
                style={{
                    padding: "28px 24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 24,
                }}
            >
                {items.map((it) => (
                    <div key={it.label}>
                        <div
                            style={{
                                fontSize: 10,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "var(--fg-4)",
                                fontWeight: 600,
                                marginBottom: 6,
                            }}
                        >
                            {it.label}
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 13,
                                color: "var(--fg-1)",
                                letterSpacing: "0.02em",
                            }}
                        >
                            {it.value}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
window.CodesStrip = CodesStrip;
