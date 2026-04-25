import { useState } from "react";
import { Icon } from "../components/Icons.jsx";

const ITEMS = [
    {
        icon: Icon.Code,
        title: "Application Development",
        slug: "application-development",
        body: "Custom cross-platform solutions, Microsoft Power Platform, mobile-ready apps.",
        tags: ["Power Platform", "Mobile", "Cross-platform"],
    },
    {
        icon: Icon.BarChart,
        title: "Data Analytics",
        slug: "data-analytics",
        body: "Business intelligence, data visualization, integrated analytics for program decision-making.",
        tags: ["BI", "Visualization", "ETL"],
    },
    {
        icon: Icon.Server,
        title: "Infrastructure Support",
        slug: "infrastructure-support",
        body: "IT operations & maintenance, cloud and hybrid management, tiered help desk.",
        tags: ["Cloud", "Hybrid", "Help desk"],
    },
    {
        icon: Icon.Folders,
        title: "Information Management",
        slug: "information-management",
        body: "Lifecycle handling of physical and digital records across the enterprise.",
        tags: ["Lifecycle", "Physical", "Digital"],
    },
    {
        icon: Icon.Archive,
        title: "Records Management",
        slug: "records-management",
        body: "NARA-aligned schedules, file plans, and disposition management.",
        tags: ["NARA", "Schedules", "Disposition"],
    },
    {
        icon: Icon.Scan,
        title: "Document Conversion",
        slug: null,
        body: "Scanning, imaging, and Intelligent Word Recognition (IWR) at agency scale.",
        tags: ["Scanning", "Imaging", "IWR"],
    },
    {
        icon: Icon.Users,
        title: "Queue Management",
        slug: "queue-management",
        body: "Data-driven customer flow optimization for high-volume service environments.",
        tags: ["Flow", "Analytics", "Service"],
    },
];

function CapabilityCard({ item }) {
    const [hover, setHover] = useState(false);
    const I = item.icon;
    const href = item.slug ? `/services/${item.slug}` : "#";
    const tagNodes = item.tags.flatMap((t, i) => [
        ...(i > 0
            ? [
                  <span key={`sep-${t}`} style={{ color: "var(--border-2)" }}>
                      ·
                  </span>,
              ]
            : []),
        <span
            key={t}
            style={{
                fontSize: 11,
                color: "var(--fg-4)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
            }}
        >
            {t}
        </span>,
    ]);
    return (
        <a
            href={href}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: "#fff",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                borderTop: hover
                    ? "2px solid var(--ivy-green-500)"
                    : "2px solid transparent",
                cursor: "pointer",
                minHeight: 240,
                textDecoration: "none",
                color: "inherit",
                transition: "border-color var(--dur-fast) var(--ease-standard)",
            }}
        >
            <I size={28} />
            <h3
                style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--fg-1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                {item.title}
                {item.slug && <Icon.Arrow size={14} />}
            </h3>
            <p
                style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--fg-3)",
                    flex: 1,
                }}
            >
                {item.body}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {tagNodes}
            </div>
        </a>
    );
}

export function CapabilityGrid() {
    return (
        <section className="section" id="capabilities">
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 24,
                        marginBottom: 48,
                        paddingTop: 24,
                        borderTop: "1px solid var(--ink-900)",
                    }}
                >
                    <span className="eyebrow" style={{ paddingTop: 14 }}>
                        What we do
                    </span>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 48,
                        marginBottom: 32,
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
                        Seven practice areas. One accountable team.
                    </h2>
                    <div>
                        <p
                            style={{
                                margin: "0 0 14px",
                                fontSize: 17,
                                lineHeight: 1.6,
                                color: "var(--fg-3)",
                            }}
                        >
                            Ivyhill keeps mission-critical systems running for
                            federal, state, and local government — and the same
                            teams, tooling, and standards run commercial
                            engagements without the procurement overhead.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 15,
                                lineHeight: 1.6,
                                color: "var(--fg-4)",
                            }}
                        >
                            Every engagement is staffed by Ivyhill personnel and
                            delivered against an agency contract vehicle, an
                            ISO-certified quality program, and a
                            defense-in-depth security posture.
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 1,
                        background: "var(--border-1)",
                        border: "1px solid var(--border-1)",
                    }}
                >
                    {ITEMS.map((it) => (
                        <CapabilityCard key={it.title} item={it} />
                    ))}
                    <div
                        style={{
                            background: "var(--steel-900)",
                            color: "#fff",
                            padding: "32px 28px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: 240,
                        }}
                    >
                        <div>
                            <Icon.Shield size={28} />
                            <h3
                                style={{
                                    margin: "18px 0 8px",
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: "#fff",
                                }}
                            >
                                Cybersecurity, horizontal.
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 14,
                                    lineHeight: 1.55,
                                    color: "rgba(255,255,255,0.72)",
                                }}
                            >
                                A defense-in-depth posture runs across every
                                practice area — ISO/IEC 27001 backed.
                            </p>
                        </div>
                        <a
                            href="#cyber"
                            style={{
                                color: "var(--ivy-green-400)",
                                textDecoration: "none",
                                fontSize: 13,
                                fontWeight: 600,
                                marginTop: 16,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            Read the brief <Icon.Arrow size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
