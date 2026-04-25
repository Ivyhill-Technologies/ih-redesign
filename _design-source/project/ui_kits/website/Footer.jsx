// Footer — full, federal-aware. Address, contracts, certifications, capabilities, careers.
function Footer() {
    const cols = [
        {
            h: "Capabilities",
            items: [
                { label: "Application Development", href: "#capabilities" },
                { label: "Data Analytics", href: "#capabilities" },
                {
                    label: "Infrastructure Support",
                    href: "service-template/index.html",
                },
                { label: "Information Management", href: "#capabilities" },
                { label: "Records Management", href: "#capabilities" },
                { label: "Document Conversion", href: "#capabilities" },
                { label: "Queue Management", href: "#capabilities" },
                { label: "Cybersecurity", href: "#capabilities" },
            ],
        },
        {
            h: "Company",
            items: [
                { label: "About Ivyhill", href: "#" },
                { label: "Leadership", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Newsroom", href: "#" },
                { label: "Contact", href: "#" },
            ],
        },
        {
            h: "Procurement",
            items: [
                { label: "Capability statement", href: "#" },
                { label: "Past performance", href: "#" },
                { label: "Contract vehicles", href: "#" },
                { label: "NAICS codes", href: "#naics" },
                { label: "Small-business designations", href: "#" },
            ],
        },
    ];
    return (
        <footer
            style={{
                background: "var(--ink-1000)",
                color: "rgba(255,255,255,0.72)",
            }}
        >
            <div className="container" style={{ padding: "72px 24px 32px" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
                        gap: 48,
                        marginBottom: 56,
                    }}
                >
                    <div>
                        <img
                            src="../../design-system/assets/logo-horizontal-2c.png"
                            alt="Ivyhill"
                            style={{
                                height: 32,
                                filter: "brightness(0) invert(1)",
                                marginBottom: 20,
                                display: "block",
                            }}
                        />
                        <p
                            style={{
                                margin: "0 0 20px",
                                fontSize: 13,
                                lineHeight: 1.6,
                                color: "rgba(255,255,255,0.6)",
                                maxWidth: 320,
                            }}
                        >
                            Enterprise Information Management for U.S. federal,
                            state, and local agencies, and commercial clients.
                            Founded 2015.
                        </p>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                                fontSize: 13,
                            }}
                        >
                            <li
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "flex-start",
                                }}
                            >
                                <Icon.Pin
                                    size={14}
                                    style={{
                                        marginTop: 2,
                                        color: "var(--ivy-green-400)",
                                    }}
                                />
                                4301 Garden City Dr., Suite 410
                                <br />
                                Hyattsville, MD 20785
                            </li>
                            <li
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Icon.Phone
                                    size={14}
                                    style={{ color: "var(--ivy-green-400)" }}
                                />
                                +1 (301) 477-1080
                            </li>
                            <li
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <Icon.Mail
                                    size={14}
                                    style={{ color: "var(--ivy-green-400)" }}
                                />
                                info@ivyhilltech.com
                            </li>
                        </ul>
                    </div>
                    {cols.map((col) => (
                        <div key={col.h}>
                            <div
                                style={{
                                    fontSize: 11,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    color: "rgba(255,255,255,0.5)",
                                    marginBottom: 18,
                                }}
                            >
                                {col.h}
                            </div>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                }}
                            >
                                {col.items.map((i) => (
                                    <li key={i.label}>
                                        <a
                                            href={i.href}
                                            style={{
                                                color: "rgba(255,255,255,0.78)",
                                                textDecoration: "none",
                                                fontSize: 13,
                                            }}
                                        >
                                            {i.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        paddingTop: 24,
                        borderTop: "1px solid rgba(255,255,255,0.12)",
                        display: "flex",
                        gap: 24,
                        flexWrap: "wrap",
                        alignItems: "center",
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.04em",
                        color: "rgba(255,255,255,0.5)",
                    }}
                >
                    <span>© 2025 Ivyhill Technologies, LLC</span>
                    <span>·</span>
                    <span>CAGE 7HWD9</span>
                    <span>·</span>
                    <span>UEI LSVSGHNE2ZW5</span>
                    <span>·</span>
                    <span>NAICS 541511 / 541512 / 518210 / 561410</span>
                    <span style={{ flex: 1 }}></span>
                    <span>ISO 9001 · 20000-1 · 27001</span>
                    <span>·</span>
                    <span>MBE / DBE / SBE</span>
                </div>
            </div>
        </footer>
    );
}
window.Footer = Footer;
