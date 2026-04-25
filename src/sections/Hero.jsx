import { Icon } from "../components/Icons.jsx";

const STATS = [
    ["Founded", "2015"],
    ["Headquarters", "Hyattsville, MD"],
    ["Practice areas", "Seven"],
    ["Personnel", "51–200"],
    ["Cleared staff", "Yes"],
    ["Cyber posture", "Defense-in-depth"],
];

export function Hero({ onCTA }) {
    return (
        <section
            style={{
                position: "relative",
                overflow: "hidden",
                background: "#fff",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                }}
                className="hairline-grid"
            />
            <div
                className="container"
                style={{ position: "relative", padding: "120px 24px 96px" }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "7fr 5fr",
                        gap: 64,
                        alignItems: "start",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 24,
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: 24,
                                    height: 1,
                                    background: "var(--ink-900)",
                                }}
                            />
                            <span className="eyebrow">
                                Enterprise Information Management
                            </span>
                        </div>
                        <h1
                            className="display"
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(40px, 5.2vw, 68px)",
                                fontWeight: 700,
                                lineHeight: 1.04,
                                letterSpacing: "-0.025em",
                                color: "var(--fg-1)",
                                margin: "0 0 28px",
                                textWrap: "balance",
                            }}
                        >
                            Mission-grade IT for the federal enterprise.
                        </h1>
                        <p
                            style={{
                                fontSize: 18,
                                lineHeight: 1.55,
                                color: "var(--fg-3)",
                                maxWidth: 620,
                                margin: "0 0 36px",
                            }}
                        >
                            Ivyhill partners with U.S. federal, state, and local
                            agencies — and commercial clients — to develop
                            applications, manage records, secure infrastructure,
                            and accelerate document conversion at agency scale.
                            ISO-certified, contract-vehicle-ready, cleared
                            personnel.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onCTA}
                            >
                                Request capability statement{" "}
                                <Icon.Arrow size={14} />
                            </button>
                            <a
                                href="#past-performance"
                                className="btn btn-secondary"
                                style={{ textDecoration: "none" }}
                            >
                                View past performance
                            </a>
                            <a
                                href="#naics"
                                className="btn btn-ghost"
                                style={{ textDecoration: "none" }}
                            >
                                NAICS codes{" "}
                                <Icon.Arrow
                                    size={14}
                                    style={{ transform: "rotate(90deg)" }}
                                />
                            </a>
                        </div>
                    </div>
                    <aside
                        style={{
                            border: "1px solid var(--border-1)",
                            borderRadius: "var(--r-md)",
                            padding: "24px 26px",
                            background: "#fff",
                            boxShadow: "var(--shadow-1)",
                        }}
                    >
                        <div className="eyebrow" style={{ marginBottom: 14 }}>
                            At a glance
                        </div>
                        <dl
                            style={{
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                rowGap: 18,
                                columnGap: 24,
                            }}
                        >
                            {STATS.map(([k, v]) => (
                                <div key={k}>
                                    <dt
                                        style={{
                                            fontSize: 11,
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color: "var(--fg-4)",
                                            fontWeight: 600,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {k}
                                    </dt>
                                    <dd
                                        style={{
                                            margin: 0,
                                            fontSize: 18,
                                            fontWeight: 600,
                                            color: "var(--fg-1)",
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {v}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </aside>
                </div>
            </div>
        </section>
    );
}
