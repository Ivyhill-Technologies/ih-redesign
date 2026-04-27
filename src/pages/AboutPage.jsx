import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { SiteShell } from "../components/SiteShell.jsx";
import { AboutCerts } from "../sections/about/AboutCerts.jsx";
import { AboutPortfolio } from "../sections/about/AboutPortfolio.jsx";
import { CapabilityHero } from "../sections/capabilities/CapabilityHero.jsx";
import { CapabilityIntro } from "../sections/capabilities/CapabilityIntro.jsx";

const ABOUT_POINTS = [
    "Established in 2015 to deliver high-quality services efficiently and on schedule.",
    "Serves both U.S. federal agencies and commercial clients.",
    "Holds three active ISO certifications spanning quality, IT service management, and information security.",
    "MDOT-certified Minority, Disadvantaged, and Small Business Enterprise.",
];

const AGENCIES = ["DOL", "DOJ", "ICE", "NIH", "USAF", "U.S. Army"];

export function AboutPage() {
    return (
        <SiteShell>
            <CapabilityHero
                eyebrow="About"
                title="About Ivyhill Technologies"
                lede="Ivyhill is a federal and commercial services firm built to deliver high-quality work in regulated, mission-driven environments — software and systems, information and records, customer-facing operations, and the back-office functions that keep programs running."
            />

            <CapabilityIntro
                eyebrow="Who we are"
                title="A decade of service to the federal mission."
                lede="Established in 2015, Ivyhill provides high-quality services to U.S. federal agencies and commercial clients. Our portfolio spans software and systems development, information and records management, contact center services, human resources support, and administrative support — backed by ISO-certified processes and MDOT business designations."
                outcomes={ABOUT_POINTS}
            />

            <AboutPortfolio />

            <AboutCerts />

            <section className="section bg-steel-900 text-white relative overflow-hidden">
                <div className="hairline-grid-dark absolute inset-0 pointer-events-none" />
                <div className="container px-6 relative">
                    <div className="flex items-baseline gap-6 mb-10 pt-6 border-t border-white/[0.18]">
                        <span className="eyebrow text-ivy-green-400 pt-3.5">Who we serve</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-14 items-start">
                        <div>
                            <h2 className="m-0 mb-5 font-bold leading-[1.1] tracking-[-0.02em] text-white text-balance text-[clamp(28px,3vw,40px)]">
                                Trusted across the federal mission.
                            </h2>
                            <p className="m-0 mb-7 text-[19px] leading-[1.6] text-ink-300">
                                Ivyhill supports agencies across labor, justice, defense, immigration, and health — and brings the
                                same rigor to commercial clients running regulated programs.
                            </p>
                            <Link
                                to="/#past-performance"
                                className="btn bg-ivy-green-500 text-ink-1000 hover:bg-ivy-green-400 border-transparent no-underline"
                            >
                                See past performance <Icon.Arrow size={14} />
                            </Link>
                        </div>
                        <ul className="list-none m-0 p-0 grid grid-cols-2 gap-3">
                            {AGENCIES.map((a) => (
                                <li
                                    key={a}
                                    className="border border-white/[0.12] bg-white/[0.04] px-4 py-3.5 rounded-[4px] flex items-center gap-3"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-ivy-green-400" />
                                    <span className="text-[14px] font-semibold tracking-[0.02em] text-white">{a}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container px-6">
                    <div className="border border-line-1 rounded-[4px] bg-white p-10 md:p-12 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-center border-l-2 border-l-ivy-green-500">
                        <div>
                            <div className="eyebrow text-ivy-green-700 mb-3">Get in touch</div>
                            <h2 className="m-0 mb-3 font-bold leading-[1.15] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(24px,2.4vw,34px)]">
                                Get information management solutions today.
                            </h2>
                            <p className="m-0 text-[16px] leading-[1.6] text-fg-3">
                                Request the current capability statement or reach out to start a conversation about your program.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 md:items-end">
                            <a
                                href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                                target="_blank"
                                rel="noopener"
                                className="btn btn-primary no-underline"
                            >
                                Capability statement <Icon.Arrow size={14} />
                            </a>
                            <Link to="/#past-performance" className="btn btn-secondary no-underline">
                                Past performance
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
