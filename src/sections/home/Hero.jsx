import { useEffect, useState } from "react";
import { Icon } from "../../components/Icons.jsx";

const STATS = [
    ["Founded", "2015"],
    ["Headquarters", "Hyattsville, MD"],
    ["Federal agencies", "11 served"],
    ["ISO certifications", "3 active"],
    ["SB designations", "6 active"],
    ["GSA MAS", "Through 2030"],
];

const AUDIENCES = ["agencies and enterprises", "federal missions", "program offices", "regulated industries"];

export function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % AUDIENCES.length);
        }, 4000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative overflow-hidden bg-steel-900">
            <div className="hairline-grid-dark absolute inset-0 pointer-events-none" />
            <img
                src="/assets/icon-color-large.png"
                alt=""
                aria-hidden="true"
                className="absolute -right-32 -top-8 w-[820px] h-auto pointer-events-none select-none opacity-[0.18] md:opacity-[0.45]"
            />
            <div className="container relative px-6 pt-16 pb-16 md:pt-[120px] md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-10 md:gap-16 items-start">
                    <div>
                        <h1 className="font-bold leading-[1.02] md:leading-[0.98] tracking-[-0.035em] text-white m-0 mb-6 text-balance text-[clamp(34px,5.4vw,72px)]">
                            Ivyhill Technologies
                        </h1>
                        <div className="flex items-center gap-2.5 mb-5">
                            <span className="inline-block w-8 h-[2px] bg-ivy-green-500" />
                            <span className="text-[13px] font-bold tracking-[0.16em] uppercase text-ivy-green-400">
                                Information Management
                            </span>
                        </div>
                        <p className="font-semibold leading-[1.2] md:leading-[1.15] tracking-[-0.018em] text-ink-100 m-0 mb-7 text-balance text-[clamp(20px,2.8vw,36px)]">
                            Mission-grade Information Management for{" "}
                            <span className="relative inline-grid align-baseline text-ivy-green-500">
                                {AUDIENCES.map((a, i) => (
                                    <span
                                        key={a}
                                        className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                                            i === index ? "opacity-100" : "opacity-0"
                                        }`}
                                        aria-hidden={i !== index}
                                    >
                                        {a}
                                    </span>
                                ))}
                            </span>
                        </p>
                        <p className="text-[16px] md:text-[18px] leading-[1.55] text-ink-300 max-w-[620px] m-0 mb-9">
                            Ivyhill partners with U.S. federal, state, and local agencies — and commercial clients — to develop
                            applications, manage records, secure infrastructure, and accelerate document conversion at agency
                            scale. ISO-certified and contract-vehicle-ready.
                        </p>
                        <div className="flex gap-3 flex-wrap items-center">
                            <a
                                href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                                target="_blank"
                                rel="noopener"
                                className="btn bg-ivy-green-500 text-ink-1000 hover:bg-ivy-green-400 border-transparent no-underline"
                            >
                                Capability statement <Icon.Arrow size={14} />
                            </a>
                            <a
                                href="#past-performance"
                                className="btn bg-transparent text-white border border-white/25 hover:bg-white/10 no-underline"
                            >
                                View past performance
                            </a>
                            <a
                                href="#naics"
                                className="btn bg-transparent text-ink-300 hover:text-white hover:bg-white/5 no-underline"
                            >
                                NAICS codes <Icon.Arrow size={14} className="rotate-90" />
                            </a>
                        </div>
                    </div>
                    <aside className="border border-white/10 rounded-sm py-6 px-[26px] bg-white/[0.03] backdrop-blur-sm">
                        <div className="eyebrow mb-3.5 text-ivy-green-400">At a glance</div>
                        <dl className="m-0 grid grid-cols-2 gap-y-[18px] gap-x-6">
                            {STATS.map(([k, v]) => (
                                <div key={k}>
                                    <dt className="text-[11px] tracking-[0.12em] uppercase text-ink-400 font-semibold mb-1">
                                        {k}
                                    </dt>
                                    <dd className="m-0 text-[18px] font-semibold text-white tabular-nums">{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </aside>
                </div>
            </div>
        </section>
    );
}
