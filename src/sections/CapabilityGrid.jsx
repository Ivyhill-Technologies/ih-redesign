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
                  <span key={`sep-${t}`} className="text-line-2">
                      ·
                  </span>,
              ]
            : []),
        <span
            key={t}
            className="text-[11px] text-fg-4 font-mono tracking-[0.02em]"
        >
            {t}
        </span>,
    ]);
    return (
        <a
            href={href}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`bg-white py-8 px-7 flex flex-col gap-3.5 cursor-pointer min-h-[240px] no-underline text-inherit border-t-2 transition-colors duration-150 ${
                hover ? "border-ivy-green-500" : "border-transparent"
            }`}
        >
            <I size={28} />
            <h3 className="m-0 text-[18px] font-semibold text-fg-1 flex items-center gap-2">
                {item.title}
                {item.slug && <Icon.Arrow size={14} />}
            </h3>
            <p className="m-0 text-[14px] leading-[1.55] text-fg-3 flex-1">
                {item.body}
            </p>
            <div className="flex gap-1.5 flex-wrap">{tagNodes}</div>
        </a>
    );
}

export function CapabilityGrid() {
    return (
        <section className="section" id="capabilities">
            <div className="container">
                <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5">What we do</span>
                </div>
                <div className="grid grid-cols-2 gap-12 mb-8 items-start">
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                        Seven practice areas. One accountable team.
                    </h2>
                    <div>
                        <p className="m-0 mb-3.5 text-[17px] leading-[1.6] text-fg-3">
                            Ivyhill keeps mission-critical systems running for
                            federal, state, and local government — and the same
                            teams, tooling, and standards run commercial
                            engagements without the procurement overhead.
                        </p>
                        <p className="m-0 text-[15px] leading-[1.6] text-fg-4">
                            Every engagement is staffed by Ivyhill personnel and
                            delivered against an agency contract vehicle, an
                            ISO-certified quality program, and a
                            defense-in-depth security posture.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-px bg-line-1 border border-line-1">
                    {ITEMS.map((it) => (
                        <CapabilityCard key={it.title} item={it} />
                    ))}
                    <div className="bg-steel-900 text-white py-8 px-7 flex flex-col justify-between min-h-[240px]">
                        <div>
                            <Icon.Shield size={28} />
                            <h3 className="mt-[18px] mb-2 text-[20px] font-semibold text-white">
                                Cybersecurity, horizontal.
                            </h3>
                            <p className="m-0 text-[14px] leading-[1.55] text-white/[0.72]">
                                A defense-in-depth posture runs across every
                                practice area — ISO/IEC 27001 backed.
                            </p>
                        </div>
                        <a
                            href="#cyber"
                            className="text-ivy-green-400 no-underline text-[13px] font-semibold mt-4 inline-flex items-center gap-1.5"
                        >
                            Read the brief <Icon.Arrow size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
