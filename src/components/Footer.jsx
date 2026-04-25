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
            { label: "Document Conversion", href: "/#capabilities" },
            { label: "Queue Management", href: "/#capabilities" },
            { label: "Cybersecurity", href: "/#capabilities" },
        ],
    },
    {
        h: "Company",
        items: [
            { label: "About Ivyhill", href: "#" },
            { label: "Leadership", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Newsroom", href: "#" },
        ],
    },
    {
        h: "Procurement",
        items: [
            { label: "Capability statement", href: "#" },
            { label: "Past performance", href: "/#past-performance" },
            { label: "Contract vehicles", href: "/contracts" },
            { label: "NAICS codes", href: "/#naics" },
            {
                label: "Small-business designations",
                href: "/contracts#designations",
            },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-ink-1000 text-white/[0.72]">
            <div className="container pt-[72px] pb-8 px-6">
                <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 mb-14">
                    <div>
                        <img
                            src="/assets/logo-horizontal-2c.png"
                            alt="Ivyhill"
                            className="h-8 block mb-5 brightness-0 invert"
                        />
                        <p className="m-0 mb-5 text-[13px] leading-[1.6] text-white/60 max-w-[320px]">
                            Enterprise Information Management for U.S. federal,
                            state, and local agencies, and commercial clients.
                            Founded 2015.
                        </p>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[13px]">
                            <li className="flex gap-2.5 items-start">
                                <Icon.Pin
                                    size={14}
                                    className="mt-0.5 text-ivy-green-400 shrink-0"
                                />
                                <span>
                                    4301 Garden City Dr., Suite 410
                                    <br />
                                    Hyattsville, MD 20785
                                </span>
                            </li>
                            <li className="flex gap-2.5 items-center">
                                <Icon.Phone
                                    size={14}
                                    className="text-ivy-green-400 shrink-0"
                                />
                                +1 (301) 477-1080
                            </li>
                            <li className="flex gap-2.5 items-center">
                                <Icon.Mail
                                    size={14}
                                    className="text-ivy-green-400 shrink-0"
                                />
                                info@ivyhilltech.com
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
                                            className="text-white/[0.78] no-underline text-[13px]"
                                        >
                                            {i.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="pt-6 border-t border-white/[0.12] flex gap-6 flex-wrap items-center text-[11px] font-mono tracking-[0.04em] text-white/50">
                    <span>© 2025 Ivyhill Technologies, LLC</span>
                    <span>·</span>
                    <span>CAGE 7HWD9</span>
                    <span>·</span>
                    <span>UEI LSVSGHNE2ZW5</span>
                    <span>·</span>
                    <span>NAICS 541511 / 541512 / 518210 / 561410</span>
                    <span className="flex-1" />
                    <span>ISO 9001 · 20000-1 · 27001</span>
                    <span>·</span>
                    <span>MBE / DBE / SBE</span>
                </div>
            </div>
        </footer>
    );
}
