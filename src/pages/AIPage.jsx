import { Icon } from "../components/Icons.jsx";
import { SiteShell } from "../components/SiteShell.jsx";
import { CapabilityCards } from "../sections/capabilities/CapabilityCards.jsx";
import { CapabilityHero } from "../sections/capabilities/CapabilityHero.jsx";

const OFFER_CARDS = [
    {
        icon: Icon.Folders,
        title: "Retrieval-augmented generation (RAG)",
        body: "Ask the documents your team is already searching for the hundredth time. Plain-English answers, cited back to the source, grounded in your real records — not whatever a public model happened to memorize.",
        tags: ["Indexing", "Citations", "Grounded"],
    },
    {
        icon: Icon.Users,
        title: "Chatbots & assistants",
        body: "Front-line assistants for high-volume, repetitive inquiry workflows so staff handle the asks that actually need judgment. Sit on the same authentication, the same data, and the same channels your team already uses.",
        tags: ["Triage", "Self-serve", "Integrated"],
    },
    {
        icon: Icon.Code,
        title: "Agentic workflows",
        body: "Multi-step automation that reads, summarizes, and acts across the tools your team already uses — without the copy-paste tax between tabs. Scoped, observable, and bounded by the permissions you already trust.",
        tags: ["Automation", "Multi-step", "Observable"],
    },
];

const APPROACH_COLUMNS = [
    {
        eyebrow: "Federal & regulated",
        heading: "Inside the cloud you've already authorized.",
        body: "For federal and regulated buyers, AI integration is a security conversation before it's a product conversation. Ivyhill builds inside the boundary you already trust — Bedrock or Azure OpenAI in your authorized tenant, retrieval pipelines that never ship data to a public model, and audit trails that hold up to inspection.",
        items: [
            "Deploy inside the agency's authorized cloud — no data routed to public model APIs.",
            "Citations on every answer so staff verify against record, not against model recall.",
            "Role-based retrieval — the assistant only surfaces what the user is already cleared to see.",
            "Prompt and response logging routed to the agency's existing logging stack.",
        ],
    },
    {
        eyebrow: "Commercial enterprise",
        heading: "On the SaaS stack your business already runs on.",
        body: "For commercial teams the calculus is different — time-to-value, integration depth, and keeping data inside your own tenant. Ivyhill connects proven AI tooling to the document repositories, SaaS apps, and cloud storage your business already uses, so the value compounds against the workflows you already have.",
        items: [
            "Index the SaaS tools, knowledge bases, and cloud storage your business already runs on.",
            "Custom assistants for sales, support, and operations — grounded in your real documents.",
            "Agentic workflows that read, summarize, and act across enterprise tools.",
            "Bring-your-own-cloud deployments on Azure, AWS, or GCP — your data stays in your tenant.",
        ],
    },
];

export function AIPage() {
    return (
        <SiteShell
            title="AI Integration"
            description="AI integration consulting for federal and commercial organizations. Ivyhill helps you identify where AI fits, integrate proven tools — RAG, chatbots, and agents — into the cloud and data you already run on, and keep the result grounded, governed, and yours."
        >
            <CapabilityHero
                eyebrow="AI integration"
                title="Where AI actually fits in your organization."
                lede="AI is moving fast and most organizations are still figuring out where it belongs. Ivyhill helps you cut through the noise — identify the workflows where AI pays off, integrate proven tools into the cloud and data you already run on, and keep the result grounded, governed, and yours."
            />

            {/* Honest framing — integrator posture, name vendors, no overclaim */}
            <section className="section bg-ivy-green-50">
                <div className="container px-6">
                    <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                        <span className="eyebrow pt-3.5 text-ivy-green-700">How we approach AI</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 items-start">
                        <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(26px,3vw,40px)]">
                            Integrators, not researchers.
                        </h2>
                        <div className="flex flex-col gap-5">
                            <p className="m-0 text-[17px] md:text-[19px] leading-[1.6] text-fg-3">
                                Ivyhill doesn't train custom models or build novel ML from scratch. We integrate the AI you can
                                already buy — Amazon Bedrock, Azure OpenAI, the open-source stack — into the data, workflows, and
                                authorization boundaries your organization already runs on.
                            </p>
                            <p className="m-0 text-[17px] leading-[1.6] text-fg-2">
                                That distinction matters. The hard part of AI in a real organization isn't the model — it's the
                                integration: which document set to ground it on, which permissions to honor, which cloud it lives
                                in, who's accountable for what it says. That's the work we do.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <CapabilityCards
                eyebrow="What we help with"
                title="Three patterns we keep seeing — and integrating."
                lede="RAG, chatbots, and agentic workflows are the three patterns that show up over and over again in real engagements. Each one is a tool, not a strategy — Ivyhill helps you figure out which one fits where, and stitches it into what you already run."
                cards={OFFER_CARDS}
            />

            {/* Approach + guardrails — federal/commercial split */}
            <section className="section border-t border-line-1">
                <div className="container px-6">
                    <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                        <span className="eyebrow pt-3.5 text-ivy-green-700">Two audiences, same posture</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-12 items-start">
                        <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(26px,3vw,40px)]">
                            Your data stays where it already lives.
                        </h2>
                        <p className="m-0 text-[17px] md:text-[19px] leading-[1.6] text-fg-3">
                            Whether the conversation is federal or commercial, the principle is the same: AI should run on the
                            cloud you've already authorized, on the data you already own, with logs and citations you can audit.
                            The implementation details differ — the principle doesn't.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-1 border border-line-1">
                        {APPROACH_COLUMNS.map((col) => (
                            <div key={col.heading} className="bg-white p-8 flex flex-col gap-4">
                                <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-ivy-green-700">
                                    {col.eyebrow}
                                </span>
                                <h3 className="m-0 text-[20px] font-semibold text-fg-1">{col.heading}</h3>
                                <p className="m-0 text-[17px] leading-[1.6] text-fg-3">{col.body}</p>
                                <ul className="list-none m-0 p-0 mt-2 flex flex-col gap-3">
                                    {col.items.map((it) => (
                                        <li key={it} className="flex items-start gap-3 text-[14px] leading-[1.55] text-fg-2">
                                            <span className="mt-1 text-ivy-green-600 shrink-0">
                                                <Icon.Check size={14} />
                                            </span>
                                            <span>{it}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Consultation CTA */}
            <section className="section bg-steel-900 relative overflow-hidden">
                <div className="hairline-grid-dark absolute inset-0 pointer-events-none" />
                <div className="container relative px-6">
                    <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-2.5 mb-5">
                                <span className="inline-block w-8 h-[2px] bg-ivy-green-500" />
                                <span className="text-[13px] font-bold tracking-[0.16em] uppercase text-ivy-green-400">
                                    Start a consultation
                                </span>
                            </div>
                            <h2 className="m-0 mb-5 font-bold leading-[1.1] tracking-[-0.02em] text-white text-balance text-[clamp(26px,3vw,40px)]">
                                Let's talk about where AI fits in your organization.
                            </h2>
                            <p className="m-0 text-[17px] md:text-[19px] leading-[1.6] text-ink-300 max-w-[640px]">
                                Bring a specific workflow, a vague hunch, or an exploratory question. Ivyhill will help you map
                                where AI integration is worth the investment — and where it isn't — and scope a pragmatic first
                                engagement.
                            </p>
                        </div>
                        <div className="flex md:justify-end">
                            <a
                                href="/contact?subject=AI+integration+consultation"
                                className="btn bg-ivy-green-500 text-ink-1000 hover:bg-ivy-green-400 border-transparent no-underline"
                            >
                                Start a consultation <Icon.Arrow size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
