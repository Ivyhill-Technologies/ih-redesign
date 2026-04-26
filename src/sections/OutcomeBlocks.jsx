import { Icon } from "../components/Icons.jsx";

const BLOCKS = [
    {
        icon: Icon.Code,
        title: "Build the apps your people use.",
        body: "Custom software, dashboards, and mobile tools designed around how your team actually works — not how a vendor wants them to. Web, mobile, and internal systems for federal, state, and commercial teams.",
    },
    {
        icon: Icon.Shield,
        title: "Keep your information safe.",
        body: "Cybersecurity and infrastructure built to defense-in-depth standards, so your data, systems, and people stay protected. Cleared staff, defense-grade tooling, and the same rigor whether you're a federal agency or a private business.",
    },
    {
        icon: Icon.Folders,
        title: "Manage your records and documents.",
        body: "From scanning a million pages of paper to running an active records program, we handle the lifecycle of your information end-to-end. Records management, document conversion, and customer-flow systems at agency scale.",
    },
];

export function OutcomeBlocks() {
    return (
        <section className="section bg-surface-subtle">
            <div className="container px-6">
                <div className="max-w-[820px] mb-14">
                    <div className="flex items-center gap-2.5 mb-5">
                        <span className="inline-block w-6 h-px bg-ivy-green-500" />
                        <span className="eyebrow">How we help</span>
                    </div>
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3.2vw,44px)]">
                        We build, secure, and manage the systems your organization runs on.
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {BLOCKS.map(({ icon: I, title, body }) => (
                        <div key={title} className="relative pl-6 border-l-2 border-ivy-green-500">
                            <I size={32} className="text-ivy-green-600 mb-5" />
                            <h3 className="m-0 mb-3 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] text-fg-1">
                                {title}
                            </h3>
                            <p className="m-0 text-[15px] leading-[1.65] text-fg-3">{body}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-8 border-t border-line-1 flex items-center justify-between flex-wrap gap-4">
                    <p className="m-0 text-[14px] text-fg-4">
                        Looking for something more specific? We work across seven practice areas.
                    </p>
                    <a
                        href="#capabilities"
                        className="text-[14px] font-semibold text-fg-1 inline-flex items-center gap-1.5 no-underline hover:text-ivy-green-700"
                    >
                        See all practice areas <Icon.Arrow size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
}
