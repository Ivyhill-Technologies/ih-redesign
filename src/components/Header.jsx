import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "./Icons.jsx";
import { LogoMark } from "./Logo.jsx";

const SERVICES = [
    {
        name: "Data Analytics",
        slug: "data-analytics",
        desc: "Decisions from data at agency scale",
        icon: Icon.BarChart,
    },
    {
        name: "Infrastructure Support",
        slug: "infrastructure-support",
        desc: "Resilient cloud, network, and systems",
        icon: Icon.Server,
    },
    {
        name: "Application Development",
        slug: "application-development",
        desc: "Custom apps for mission workflows",
        icon: Icon.Code,
    },
    {
        name: "Information Management",
        slug: "information-management",
        desc: "Govern content across its lifecycle",
        icon: Icon.Folders,
    },
    {
        name: "Records Management",
        slug: "records-management",
        desc: "Compliant retention and disposition",
        icon: Icon.Archive,
    },
    {
        name: "Queue Management",
        slug: "queue-management",
        desc: "Throughput for high-volume operations",
        icon: Icon.Users,
    },
];

const RAIL_POINTS = ["ISO-certified processes", "SBA 8(a)", "MDOT MBE/DBE/SBE", "Contract-vehicle-ready"];

const NAV = [
    { label: "Past performance", to: "/#past-performance" },
    { label: "Contracts", to: "/contracts" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

const NAV_LINK_BASE =
    "text-sm font-medium no-underline pb-0.5 border-b-2 inline-flex items-center gap-1.5 whitespace-nowrap relative";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileCapsOpen, setMobileCapsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: location is the navigation trigger that closes mobile menus on route change
    useEffect(() => {
        setMobileOpen(false);
        setMobileCapsOpen(false);
    }, [location]);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <header className="sticky top-0 z-30">
            <div
                className={`border-b border-line-1 transition-colors duration-150 ease-out ${
                    scrolled || mobileOpen ? "bg-white/95 backdrop-blur" : "bg-white"
                }`}
            >
                <div className="container flex items-center gap-4 lg:gap-9 px-6 py-[14px] lg:py-[18px]">
                    <Link
                        to="/"
                        aria-label="Ivyhill Technologies — home"
                        className="flex items-center no-underline text-ivy-green-500"
                    >
                        <LogoMark size={40} className="block lg:hidden" />
                        <LogoMark size={44} className="hidden lg:block" />
                    </Link>

                    {/* Desktop nav */}
                    <NavigationMenu.Root delayDuration={0} className="hidden lg:flex gap-7 items-center">
                        <NavigationMenu.List className="flex gap-7 items-center m-0 p-0 list-none">
                            <NavigationMenu.Item className="relative">
                                <NavigationMenu.Trigger
                                    className={`${NAV_LINK_BASE} text-fg-2 border-transparent bg-transparent cursor-pointer p-0 group`}
                                >
                                    Capabilities
                                    <svg
                                        aria-hidden="true"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-transform duration-150 ease-in-out group-data-[state=open]:rotate-180"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </NavigationMenu.Trigger>

                                <NavigationMenu.Content className="absolute top-[calc(100%+14px)] left-0 w-[760px] bg-white border border-line-1 rounded-lg shadow-[var(--shadow-3)] overflow-hidden flex animate-[capsFade_140ms_ease-out] z-40">
                                    <div className="flex-1 p-3">
                                        <div className="grid grid-cols-2 gap-1">
                                            {SERVICES.map((s) => {
                                                const Ico = s.icon;
                                                return (
                                                    <NavigationMenu.Link key={s.slug} asChild>
                                                        <a
                                                            href={`/capabilities/${s.slug}`}
                                                            className="group relative flex items-start gap-3 rounded-md py-3 pl-4 pr-3 no-underline text-fg-1 transition-colors duration-100 hover:bg-surface-subtle"
                                                        >
                                                            <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-ivy-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                                                            <span className="mt-[2px] flex items-center justify-center w-8 h-8 rounded-md bg-ivy-green-50 text-ivy-green-700 group-hover:bg-ivy-green-100 transition-colors duration-100 shrink-0">
                                                                <Ico size={18} />
                                                            </span>
                                                            <span className="flex flex-col min-w-0">
                                                                <span className="text-[14px] font-semibold leading-tight">
                                                                    {s.name}
                                                                </span>
                                                                <span className="text-[12.5px] text-fg-3 leading-snug mt-1">
                                                                    {s.desc}
                                                                </span>
                                                            </span>
                                                        </a>
                                                    </NavigationMenu.Link>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="w-[240px] bg-steel-900 text-white p-5 flex flex-col shrink-0 relative overflow-hidden">
                                        <div
                                            className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-[0.35]"
                                            style={{
                                                background:
                                                    "radial-gradient(closest-side, var(--ivy-green-500), transparent 70%)",
                                            }}
                                        />
                                        <div className="relative flex flex-col h-full">
                                            <div className="eyebrow text-ivy-green-400 mb-3">Why Ivyhill</div>
                                            <p className="text-[17px] font-semibold leading-snug text-white m-0 mb-4">
                                                Built for high-stakes, regulated work.
                                            </p>
                                            <ul className="m-0 p-0 list-none flex flex-col gap-2 mb-5">
                                                {RAIL_POINTS.map((p) => (
                                                    <li key={p} className="flex items-start gap-2 text-[13px] text-ink-200">
                                                        <span className="text-ivy-green-400 mt-[2px] shrink-0">
                                                            <Icon.Check size={14} />
                                                        </span>
                                                        {p}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-auto">
                                                <NavigationMenu.Link asChild>
                                                    <a
                                                        href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                                                        target="_blank"
                                                        rel="noopener"
                                                        className="btn bg-ivy-green-500 text-ink-1000 hover:bg-ivy-green-400 border-transparent w-full justify-center no-underline"
                                                    >
                                                        Capability statement <Icon.Arrow size={13} />
                                                    </a>
                                                </NavigationMenu.Link>
                                            </div>
                                        </div>
                                    </div>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>

                            {NAV.map(({ label, to }) => (
                                <NavigationMenu.Item key={label}>
                                    <NavigationMenu.Link asChild>
                                        <NavLink to={to} className={`${NAV_LINK_BASE} text-fg-2 border-transparent`}>
                                            {label}
                                        </NavLink>
                                    </NavigationMenu.Link>
                                </NavigationMenu.Item>
                            ))}
                        </NavigationMenu.List>
                    </NavigationMenu.Root>

                    <span className="flex-1" />

                    <a
                        href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                        target="_blank"
                        rel="noopener"
                        className="hidden lg:inline-flex btn btn-primary whitespace-nowrap no-underline"
                    >
                        Capability statement <Icon.Arrow size={14} />
                    </a>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-fg-1 bg-transparent border-0 cursor-pointer hover:bg-surface-subtle"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            {mobileOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div
                    id="mobile-nav"
                    className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-20 bg-white overflow-y-auto border-t border-line-1"
                >
                    <nav className="flex flex-col px-6 py-4">
                        <button
                            type="button"
                            onClick={() => setMobileCapsOpen((v) => !v)}
                            aria-expanded={mobileCapsOpen}
                            className="flex items-center justify-between text-left text-[16px] font-semibold text-fg-1 py-4 border-b border-line-1 bg-transparent border-0 cursor-pointer w-full"
                        >
                            Capabilities
                            <svg
                                aria-hidden="true"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-150 ${mobileCapsOpen ? "rotate-180" : ""}`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {mobileCapsOpen && (
                            <ul className="list-none m-0 p-0 flex flex-col border-b border-line-1">
                                {SERVICES.map((s) => {
                                    const Ico = s.icon;
                                    return (
                                        <li key={s.slug}>
                                            <Link
                                                to={`/capabilities/${s.slug}`}
                                                className="flex items-start gap-3 py-3 px-2 no-underline text-fg-1"
                                            >
                                                <span className="mt-[2px] flex items-center justify-center w-8 h-8 rounded-md bg-ivy-green-50 text-ivy-green-700 shrink-0">
                                                    <Ico size={16} />
                                                </span>
                                                <span className="flex flex-col min-w-0">
                                                    <span className="text-[14px] font-semibold leading-tight">{s.name}</span>
                                                    <span className="text-[12.5px] text-fg-3 leading-snug mt-1">{s.desc}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {NAV.map(({ label, to }) => (
                            <NavLink
                                key={label}
                                to={to}
                                className="text-[16px] font-semibold text-fg-1 no-underline py-4 border-b border-line-1"
                            >
                                {label}
                            </NavLink>
                        ))}
                        <a
                            href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                            target="_blank"
                            rel="noopener"
                            className="btn btn-primary no-underline justify-center mt-6"
                        >
                            Capability statement <Icon.Arrow size={14} />
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
