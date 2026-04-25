import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "./Icons.jsx";

const SERVICES = [
    { name: "Data Analytics", slug: "data-analytics" },
    { name: "Infrastructure Support", slug: "infrastructure-support" },
    { name: "Application Development", slug: "application-development" },
    { name: "Information Management", slug: "information-management" },
    { name: "Records Management", slug: "records-management" },
    { name: "Queue Management", slug: "queue-management" },
];

const NAV = [
    { label: "Past performance", to: "/#past-performance" },
    { label: "Contracts", to: "/contracts" },
    { label: "About", to: "/#about" },
];

const NAV_LINK_BASE =
    "text-sm font-medium no-underline pb-0.5 border-b-2 inline-flex items-center gap-1.5 whitespace-nowrap relative";

export function Header({ onCTA }) {
    const [scrolled, setScrolled] = useState(false);
    const [capsOpen, setCapsOpen] = useState(false);
    const closeTimer = useRef(null);
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

    const openCaps = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setCapsOpen(true);
    };
    const closeCaps = () => {
        closeTimer.current = setTimeout(() => setCapsOpen(false), 140);
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
                        className="flex items-center gap-2.5 no-underline"
                    >
                        <img
                            src="/assets/logo-horizontal-2c.png"
                            alt="Ivyhill Technologies"
                            className="h-[30px] block"
                        />
                    </Link>
                    <nav className="flex gap-7 relative">
                        <a
                            href="/#capabilities"
                            onMouseEnter={openCaps}
                            onMouseLeave={closeCaps}
                            aria-haspopup="true"
                            aria-expanded={capsOpen}
                            className={`${NAV_LINK_BASE} text-fg-2 border-transparent`}
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
                                className={`transition-transform duration-150 ease-in-out ${
                                    capsOpen ? "rotate-180" : ""
                                }`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </a>
                        {NAV.map(({ label, to }) => {
                            const isContracts = to === "/contracts";
                            return (
                                <NavLink
                                    key={label}
                                    to={to}
                                    end={isContracts}
                                    className={({ isActive }) => {
                                        const active = isActive && isContracts;
                                        return `${NAV_LINK_BASE} ${
                                            active
                                                ? "text-fg-1 border-ivy-green-500"
                                                : "text-fg-2 border-transparent"
                                        }`;
                                    }}
                                >
                                    {label}
                                </NavLink>
                            );
                        })}
                    </nav>
                    <span className="flex-1" />
                    <button
                        type="button"
                        className="btn btn-primary whitespace-nowrap"
                        onClick={onCTA}
                    >
                        Capability statement <Icon.Arrow size={14} />
                    </button>
                </div>

                {capsOpen && (
                    <div
                        role="menu"
                        onMouseEnter={openCaps}
                        onMouseLeave={closeCaps}
                        className="absolute top-full left-0 right-0 bg-white border-b border-line-1 shadow-[var(--shadow-2)] animate-[capsFade_140ms_ease-out]"
                    >
                        <div className="container pt-5 px-6 pb-[22px]">
                            <div className="eyebrow mb-[14px] text-fg-4">
                                Capabilities
                            </div>
                            <div className="grid grid-cols-6 gap-px bg-line-1 border border-line-1">
                                {SERVICES.map((s) => (
                                    <a
                                        key={s.slug}
                                        href={`/services/${s.slug}`}
                                        className="bg-white py-4 px-[18px] no-underline text-fg-1 text-sm font-medium border-t-2 border-transparent whitespace-nowrap transition-[border-color,background] duration-100 hover:border-ivy-green-500 hover:bg-surface-subtle"
                                    >
                                        {s.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
