import { Icon } from "./Icons.jsx";

const COLS = [
    {
        h: "Capabilities",
        items: [
            { label: "Application Development", href: "/#capabilities" },
            { label: "Data Analytics", href: "/#capabilities" },
            { label: "Infrastructure Support", href: "/#capabilities" },
            { label: "Information Management", href: "/#capabilities" },
            { label: "Records Management", href: "/#capabilities" },
            { label: "Queue Management", href: "/#capabilities" },
            { label: "Cybersecurity", href: "/#capabilities" },
        ],
    },
    {
        h: "Resources",
        items: [
            { label: "About Ivyhill", href: "/about" },
            { label: "Contract vehicles", href: "/contracts" },
            { label: "AI integration", href: "/ai" },
            { label: "Capability statement", href: "/documents/Ivyhill-Capability-Statement-2026.pdf", external: true },
            { label: "Past performance", href: "/#past-performance" },
            { label: "NAICS codes", href: "/#naics" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-ink-1000 text-white/[0.72]">
            <div className="h-px bg-gradient-to-r from-transparent via-ivy-green-500/40 to-transparent" />
            <div className="container pt-12 md:pt-16 pb-8 px-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-10 mb-12 border-b border-white/[0.08]">
                    <div className="max-w-[520px]">
                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="inline-block w-6 h-[2px] bg-ivy-green-500" />
                            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-ivy-green-400">
                                Get in touch
                            </span>
                        </div>
                        <p className="text-white text-[20px] leading-[1.3] font-semibold m-0 text-balance">
                            Ready to talk about an upcoming requirement or RFI?
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 shrink-0">
                        <a
                            href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-2 rounded px-4 py-2.5 text-[13px] font-semibold no-underline bg-ivy-green-500 text-ink-1000 hover:bg-ivy-green-400 transition-colors"
                        >
                            Capability statement
                            <Icon.ExternalLink size={13} />
                        </a>
                        <a
                            href="mailto:info@ivyhilltech.com"
                            className="inline-flex items-center gap-2 rounded px-4 py-2.5 text-[13px] font-semibold no-underline bg-transparent text-white border border-white/25 hover:bg-white/[0.06] transition-colors"
                        >
                            <Icon.Mail size={13} />
                            info@ivyhilltech.com
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 md:gap-12 mb-12 md:mb-14 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
                    <div>
                        <img src="/assets/logo-horizontal-2c.png" alt="Ivyhill" className="h-8 block mb-5 brightness-0 invert" />
                        <p className="m-0 mb-5 text-[13px] leading-[1.6] text-white/60 max-w-[340px]">
                            Enterprise Information Management for U.S. federal, state, and local agencies, and commercial clients.
                            Founded 2015.
                        </p>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[13px]">
                            <li className="flex gap-2.5 items-start">
                                <Icon.Pin size={14} className="mt-0.5 text-ivy-green-400 shrink-0" />
                                <span>
                                    4301 Garden City Dr., Suite 410
                                    <br />
                                    Hyattsville, MD 20785
                                </span>
                            </li>
                            <li className="flex gap-2.5 items-center">
                                <Icon.Phone size={14} className="text-ivy-green-400 shrink-0" />
                                <a href="tel:+13014771080" className="text-white/[0.78] no-underline hover:text-white">
                                    +1 (301) 477-1080
                                </a>
                            </li>
                            <li className="flex gap-2.5 items-center">
                                <Icon.Mail size={14} className="text-ivy-green-400 shrink-0" />
                                <a href="mailto:info@ivyhilltech.com" className="text-white/[0.78] no-underline hover:text-white">
                                    info@ivyhilltech.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    {COLS.map((col) => (
                        <div key={col.h}>
                            <div className="text-[11px] tracking-[0.14em] uppercase font-semibold text-white/50 mb-[18px]">
                                {col.h}
                            </div>
                            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                                {col.items.map((i) => (
                                    <li key={i.label}>
                                        <a
                                            href={i.href}
                                            {...(i.external ? { target: "_blank", rel: "noopener" } : {})}
                                            className="text-white/[0.78] no-underline text-[13px] hover:text-white transition-colors"
                                        >
                                            {i.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-white/[0.12] flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 text-[11px] font-mono tracking-[0.04em] text-white/50">
                    <span>© {new Date().getFullYear()} Ivyhill Technologies, LLC</span>
                    <span className="hidden sm:inline text-white/25">·</span>
                    <span>Federal · State · Local · Commercial</span>
                    <span className="hidden sm:inline text-white/25">·</span>
                    <span>Hyattsville, Maryland</span>
                    <span className="sm:flex-1" />
                    <a
                        href="#top"
                        className="inline-flex items-center gap-1.5 text-white/55 no-underline hover:text-white transition-colors"
                    >
                        Back to top
                        <Icon.Arrow size={11} className="-rotate-90" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
