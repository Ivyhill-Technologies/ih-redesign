import { Icon } from "../../components/Icons.jsx";

const PORTFOLIO = [
    {
        icon: Icon.Code,
        title: "Software & systems development",
        body: "Custom applications, dashboards, and back-office systems built around the workflows your teams actually use.",
    },
    {
        icon: Icon.Folders,
        title: "Information & records management",
        body: "Programs, schedules, and tooling that govern content across its full lifecycle — physical and digital.",
    },
    {
        icon: Icon.Phone,
        title: "Contact center services",
        body: "Help desk, service desk, and high-volume customer-flow operations staffed and managed by Ivyhill personnel.",
    },
    {
        icon: Icon.Users,
        title: "Human resources support",
        body: "HR operations support for federal and commercial clients running people-heavy programs.",
    },
    {
        icon: Icon.Mail,
        title: "Administrative support",
        body: "Mission-aligned administrative services that keep program operations moving on schedule.",
    },
];

export function AboutPortfolio() {
    return (
        <section className="section bg-surface-subtle border-t border-line-1">
            <div className="container px-6">
                <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5 text-ivy-green-700">Service portfolio</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 items-start">
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                        Five service areas, one accountable team.
                    </h2>
                    <p className="m-0 text-[17px] leading-[1.6] text-fg-3">
                        Ivyhill's portfolio spans the systems federal agencies and commercial clients depend on — built,
                        secured, and managed under one roof.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PORTFOLIO.map(({ icon: I, title, body }) => (
                        <div
                            key={title}
                            className="group bg-white border border-line-1 rounded-[4px] py-7 px-6 flex flex-col gap-3.5 min-h-[220px] border-t-2 border-t-transparent hover:border-t-ivy-green-500 transition-colors duration-150"
                        >
                            <I size={26} className="text-ivy-green-600" />
                            <h3 className="m-0 text-[17px] font-semibold text-fg-1">{title}</h3>
                            <p className="m-0 text-[14px] leading-[1.55] text-fg-3 flex-1">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
