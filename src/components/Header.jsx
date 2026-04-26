import { useEffect, useRef, useState } from "react";
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
];

const NAV_LINK_BASE =
    "text-sm font-medium no-underline pb-0.5 border-b-2 inline-flex items-center gap-1.5 whitespace-nowrap relative";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [capsOpen, setCapsOpen] = useState(false);
    const closeTimer = useRef(null);
    const wrapRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: pathname must trigger close on navigation
    useEffect(() => {
        setCapsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!capsOpen) return;
        const onDocClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setCapsOpen(false);
            }
        };
        const onKey = (e) => {
            if (e.key === "Escape") setCapsOpen(false);
        };
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [capsOpen]);

    const openCaps = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setCapsOpen(true);
    };
    const closeCaps = () => {
        closeTimer.current = setTimeout(() => setCapsOpen(false), 140);
    };
    const toggleCaps = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setCapsOpen((v) => !v);
    };

    return (
        <header className="sticky top-0 z-30">
            <div
                className={`border-b border-line-1 transition-colors duration-150 ease-out ${
                    scrolled ? "bg-white/90 backdrop-blur" : "bg-white"
                }`}
            >
                <div className="container flex items-center gap-9 px-6 py-[18px]">
                    <Link
                        to="/"
                        aria-label="Ivyhill Technologies — home"
                        className="flex items-center no-underline text-ivy-green-500"
                    >
                        <LogoMark size={44} className="block" />
                    </Link>
                    <nav className="flex gap-7 items-center">
                        {/* biome-ignore lint/a11y/noStaticElementInteractions: hover wrapper for dropdown; button child carries aria */}
                        <div ref={wrapRef} className="relative" onMouseEnter={openCaps} onMouseLeave={closeCaps}>
                            <button
                                type="button"
                                onClick={toggleCaps}
                                aria-haspopup="true"
                                aria-expanded={capsOpen}
                                className={`${NAV_LINK_BASE} text-fg-2 border-transparent bg-transparent cursor-pointer p-0`}
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
                                    className={`transition-transform duration-150 ease-in-out ${capsOpen ? "rotate-180" : ""}`}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {capsOpen && (
                                <div
                                    role="menu"
                                    className="absolute top-[calc(100%+14px)] left-0 w-[760px] bg-white border border-line-1 rounded-lg shadow-[var(--shadow-3)] overflow-hidden flex animate-[capsFade_140ms_ease-out] z-40"
                                >
                                    <div className="flex-1 p-3">
                                        <div className="grid grid-cols-2 gap-1">
                                            {SERVICES.map((s) => {
                                                const Ico = s.icon;
                                                return (
                                                    <a
                                                        key={s.slug}
                                                        href={`/capabilities/${s.slug}`}
                                                        role="menuitem"
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
                                            <p className="text-[15px] font-semibold leading-snug text-white m-0 mb-4">
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
                                                <a
                                                    href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                                                    target="_blank"
                                                    rel="noopener"
                                                    onClick={() => setCapsOpen(false)}
                                                    className="btn bg-ivy-green-500 text-ink-1000 hover:bg-ivy-green-400 border-transparent w-full justify-center no-underline"
                                                >
                                                    Capability statement <Icon.Arrow size={13} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {NAV.map(({ label, to }) => (
                            <NavLink key={label} to={to} className={`${NAV_LINK_BASE} text-fg-2 border-transparent`}>
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                    <span className="flex-1" />
                    <a
                        href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                        target="_blank"
                        rel="noopener"
                        className="btn btn-primary whitespace-nowrap no-underline"
                    >
                        Capability statement <Icon.Arrow size={14} />
                    </a>
                </div>
            </div>
        </header>
    );
}
