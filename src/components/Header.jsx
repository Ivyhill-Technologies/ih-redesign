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
        <header style={{ position: "sticky", top: 0, zIndex: 30 }}>
            <div
                style={{
                    background: scrolled ? "rgba(255,255,255,0.92)" : "#fff",
                    backdropFilter: scrolled ? "blur(8px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
                    borderBottom: "1px solid var(--border-1)",
                    transition:
                        "background var(--dur-fast) var(--ease-standard)",
                }}
            >
                <div
                    className="container"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 36,
                        padding: "18px 24px",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                        }}
                    >
                        <img
                            src="/assets/logo-horizontal-2c.png"
                            alt="Ivyhill Technologies"
                            style={{ height: 30, display: "block" }}
                        />
                    </Link>
                    <nav
                        style={{
                            display: "flex",
                            gap: 28,
                            position: "relative",
                        }}
                    >
                        <a
                            href="/#capabilities"
                            onMouseEnter={openCaps}
                            onMouseLeave={closeCaps}
                            aria-haspopup="true"
                            aria-expanded={capsOpen}
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: "var(--fg-2)",
                                textDecoration: "none",
                                paddingBottom: 2,
                                borderBottom: "2px solid transparent",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                whiteSpace: "nowrap",
                                position: "relative",
                            }}
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
                                style={{
                                    transform: capsOpen
                                        ? "rotate(180deg)"
                                        : "none",
                                    transition: "transform 160ms ease",
                                }}
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
                                    style={({ isActive }) => ({
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color:
                                            isActive && isContracts
                                                ? "var(--fg-1)"
                                                : "var(--fg-2)",
                                        textDecoration: "none",
                                        paddingBottom: 2,
                                        borderBottom:
                                            isActive && isContracts
                                                ? "2px solid var(--ivy-green-500)"
                                                : "2px solid transparent",
                                        whiteSpace: "nowrap",
                                    })}
                                >
                                    {label}
                                </NavLink>
                            );
                        })}
                    </nav>
                    <span style={{ flex: 1 }} />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onCTA}
                        style={{ whiteSpace: "nowrap" }}
                    >
                        Capability statement <Icon.Arrow size={14} />
                    </button>
                </div>

                {capsOpen && (
                    <div
                        role="menu"
                        onMouseEnter={openCaps}
                        onMouseLeave={closeCaps}
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            background: "#fff",
                            borderBottom: "1px solid var(--border-1)",
                            boxShadow: "var(--shadow-2)",
                            animation: "capsFade 140ms ease-out",
                        }}
                    >
                        <div
                            className="container"
                            style={{ padding: "20px 24px 22px" }}
                        >
                            <div
                                className="eyebrow"
                                style={{
                                    marginBottom: 14,
                                    color: "var(--fg-4)",
                                }}
                            >
                                Capabilities
                            </div>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(6,1fr)",
                                    gap: "1px",
                                    background: "var(--border-1)",
                                    border: "1px solid var(--border-1)",
                                }}
                            >
                                {SERVICES.map((s) => (
                                    <a
                                        key={s.slug}
                                        href={`/services/${s.slug}`}
                                        style={{
                                            background: "#fff",
                                            padding: "16px 18px",
                                            textDecoration: "none",
                                            color: "var(--fg-1)",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            borderTop: "2px solid transparent",
                                            transition:
                                                "border-color 120ms, background 120ms",
                                            whiteSpace: "nowrap",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderTopColor =
                                                "var(--ivy-green-500)";
                                            e.currentTarget.style.background =
                                                "var(--bg-subtle)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderTopColor =
                                                "transparent";
                                            e.currentTarget.style.background =
                                                "#fff";
                                        }}
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
