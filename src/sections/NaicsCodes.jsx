const CODES = [
    {
        code: "518210",
        label: "Data Processing, Hosting, And Related Services",
    },
    { code: "541511", label: "Custom Computer Programming Services" },
    { code: "541512", label: "Computer Systems Design Services" },
    { code: "541513", label: "Computer Facilities Management Services" },
    { code: "541519", label: "Other Computer Related Services" },
    {
        code: "541611",
        label: "Administrative Management & General Management Consulting",
    },
    { code: "541612", label: "Human Resources Consulting Services" },
    { code: "541618", label: "Other Management Consulting Services" },
    { code: "541990", label: "Professional, Scientific & Technical Services" },
    { code: "561110", label: "Office Administrative Services" },
    { code: "561421", label: "Telephone Answering Services" },
];

export function NaicsCodes({ onCTA }) {
    return (
        <section
            id="naics"
            className="section"
            style={{
                background: "var(--bg-subtle)",
                borderTop: "1px solid var(--border-1)",
                borderBottom: "1px solid var(--border-1)",
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 24,
                        marginBottom: 36,
                        paddingTop: 24,
                        borderTop: "1px solid var(--ink-900)",
                    }}
                >
                    <span
                        className="eyebrow"
                        style={{ paddingTop: 14, whiteSpace: "nowrap" }}
                    >
                        NAICS Codes
                    </span>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.4fr",
                        gap: 80,
                        alignItems: "start",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: "0 0 20px",
                                fontSize: "clamp(28px, 3vw, 40px)",
                                fontWeight: 700,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                color: "var(--fg-1)",
                                textWrap: "balance",
                            }}
                        >
                            Registered to do the work.
                        </h2>
                        <p
                            style={{
                                margin: "0 0 28px",
                                fontSize: 17,
                                lineHeight: 1.6,
                                color: "var(--fg-3)",
                            }}
                        >
                            Ivyhill is classified under the North American
                            Industry Classification System (NAICS) for the work
                            we deliver — IT services, management consulting, and
                            administrative support. These codes let federal
                            contracting officers find us in procurement
                            databases.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onCTA}
                            >
                                Capability statement
                            </button>
                        </div>
                    </div>
                    <ul
                        style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1px",
                            background: "var(--border-1)",
                            border: "1px solid var(--border-1)",
                        }}
                    >
                        {CODES.map((c) => (
                            <li
                                key={c.code}
                                style={{
                                    background: "#fff",
                                    padding: "16px 18px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                    borderLeft: c.primary
                                        ? "2px solid var(--ivy-green-500)"
                                        : "2px solid transparent",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 14,
                                            color: "var(--fg-1)",
                                            fontWeight: 600,
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        {c.code}
                                    </span>
                                    {c.primary && (
                                        <span
                                            style={{
                                                fontSize: 10,
                                                fontWeight: 600,
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                                color: "var(--ivy-green-700)",
                                                background:
                                                    "rgba(128,185,65,0.12)",
                                                padding: "2px 6px",
                                                borderRadius: 2,
                                            }}
                                        >
                                            Primary
                                        </span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        color: "var(--fg-3)",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {c.label}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
