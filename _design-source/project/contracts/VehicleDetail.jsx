// Detailed editorial card for a single contract vehicle — hairline rule, eyebrow, body, metadata, ordering instructions.
function VehicleDetail({ v, alt }) {
    return (
        <section
            id={v.id}
            style={{
                background: alt ? "var(--bg-subtle)" : "#fff",
                borderBottom: "1px solid var(--border-1)",
            }}
        >
            <div className="container" style={{ padding: "80px 24px" }}>
                <div
                    style={{
                        borderTop: "1px solid var(--ink-900)",
                        paddingTop: 24,
                        marginBottom: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 24,
                        flexWrap: "wrap",
                    }}
                >
                    <div className="eyebrow" style={{ color: "var(--fg-2)" }}>
                        {v.kind} · {v.agency}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {v.tags.map((t) => (
                            <span
                                key={t}
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "var(--fg-3)",
                                    background: "#fff",
                                    padding: "4px 10px",
                                    border: "1px solid var(--border-2)",
                                    borderRadius: "var(--r-pill)",
                                }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 360px",
                        gap: 64,
                        alignItems: "start",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                margin: "0 0 8px",
                                fontSize: "clamp(28px, 2.6vw, 36px)",
                                lineHeight: 1.15,
                            }}
                        >
                            {v.name}
                        </h2>
                        <div
                            style={{
                                fontSize: 14,
                                fontFamily: "var(--font-mono)",
                                color: "var(--fg-3)",
                                marginBottom: 24,
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {v.fullName}
                        </div>

                        <p
                            style={{
                                fontSize: 17,
                                lineHeight: 1.6,
                                color: "var(--fg-2)",
                                margin: "0 0 24px",
                                maxWidth: 680,
                            }}
                        >
                            {v.description}
                        </p>

                        {v.scope && (
                            <>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        letterSpacing: "0.04em",
                                        textTransform: "uppercase",
                                        color: "var(--fg-3)",
                                        marginTop: 36,
                                        marginBottom: 12,
                                    }}
                                >
                                    Scope of services
                                </div>
                                <ul
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        listStyle: "none",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "10px 32px",
                                        maxWidth: 680,
                                    }}
                                >
                                    {v.scope.map((s) => (
                                        <li
                                            key={s}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "baseline",
                                                fontSize: 14,
                                                lineHeight: 1.5,
                                                color: "var(--fg-2)",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: 6,
                                                    height: 6,
                                                    marginTop: 6,
                                                    background:
                                                        "var(--ivy-green-500)",
                                                    flex: "0 0 auto",
                                                }}
                                            />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {v.benefits && (
                            <>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        letterSpacing: "0.04em",
                                        textTransform: "uppercase",
                                        color: "var(--fg-3)",
                                        marginTop: 36,
                                        marginBottom: 12,
                                    }}
                                >
                                    Why agencies use it
                                </div>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "1px",
                                        background: "var(--border-1)",
                                        border: "1px solid var(--border-1)",
                                    }}
                                >
                                    {v.benefits.map((b, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                background: "#fff",
                                                padding: "18px 20px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    color: "var(--fg-1)",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {b.h}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    lineHeight: 1.5,
                                                    color: "var(--fg-3)",
                                                }}
                                            >
                                                {b.t}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {v.ordering && (
                            <div
                                style={{
                                    marginTop: 36,
                                    background: "var(--steel-900)",
                                    color: "#fff",
                                    padding: "24px 28px",
                                    borderRadius: "var(--r-md)",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "rgba(255,255,255,0.55)",
                                        marginBottom: 14,
                                    }}
                                >
                                    How to order
                                </div>
                                <ol
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        listStyle: "none",
                                        display: "grid",
                                        gap: 14,
                                        counterReset: "step",
                                    }}
                                >
                                    {v.ordering.map((step, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "28px 1fr",
                                                gap: 14,
                                                alignItems: "baseline",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "var(--font-mono)",
                                                    fontSize: 12,
                                                    color: "var(--ivy-green-400)",
                                                    fontVariantNumeric:
                                                        "tabular-nums",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 14,
                                                    lineHeight: 1.55,
                                                    color: "rgba(255,255,255,0.85)",
                                                }}
                                            >
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>

                    <aside style={{ position: "sticky", top: 96 }}>
                        <div
                            style={{
                                background: "#fff",
                                border: "1px solid var(--border-2)",
                                borderRadius: "var(--r-md)",
                                padding: "24px 24px 8px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "var(--fg-4)",
                                    marginBottom: 18,
                                }}
                            >
                                Contract record
                            </div>
                            <dl style={{ margin: 0 }}>
                                {v.facts.map(([k, val]) => (
                                    <div
                                        key={k}
                                        style={{
                                            padding: "12px 0",
                                            borderBottom:
                                                "1px solid var(--border-1)",
                                        }}
                                    >
                                        <dt
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 600,
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                color: "var(--fg-4)",
                                                marginBottom: 4,
                                            }}
                                        >
                                            {k}
                                        </dt>
                                        <dd
                                            style={{
                                                margin: 0,
                                                fontSize: 14,
                                                fontFamily:
                                                    typeof val === "string" &&
                                                    /\d/.test(val)
                                                        ? "var(--font-mono)"
                                                        : "var(--font-sans)",
                                                fontVariantNumeric:
                                                    "tabular-nums",
                                                color: "var(--fg-1)",
                                                fontWeight: 500,
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {val}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            {v.link && (
                                <a
                                    href={v.link.href}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "14px 0",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "var(--ivy-green-700)",
                                        textDecoration: "none",
                                    }}
                                >
                                    {v.link.label}
                                    <Icon.ExternalLink size={13} />
                                </a>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
window.VehicleDetail = VehicleDetail;
