import { Icon } from "../../components/Icons.jsx";

const ISO_CERTS = [
    {
        code: "ISO 9001:2015",
        label: "Quality Management Systems",
        desc: "Process discipline and continuous improvement across every engagement.",
    },
    {
        code: "ISO/IEC 20000-1:2018",
        label: "IT Service Management",
        desc: "Service delivery, change control, and incident response built to international standard.",
    },
    {
        code: "ISO/IEC 27001:2022",
        label: "Information Security Management",
        desc: "Risk-based controls protecting client data, systems, and personnel.",
    },
];

const DESIGNATIONS = [
    { abbr: "MBE", label: "Minority Business Enterprise" },
    { abbr: "DBE", label: "Disadvantaged Business Enterprise" },
    { abbr: "SBE", label: "Small Business Enterprise" },
];

export function AboutCerts() {
    return (
        <section className="section">
            <div className="container px-6">
                <div className="flex items-baseline gap-6 mb-12 pt-6 border-t border-ink-900">
                    <span className="eyebrow pt-3.5 text-ivy-green-700">Certifications & designations</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14 items-start">
                    <h2 className="m-0 font-bold leading-[1.1] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(28px,3vw,40px)]">
                        Audit-ready by design.
                    </h2>
                    <p className="m-0 text-[19px] leading-[1.6] text-fg-3">
                        Three active ISO certifications and Maryland Department of Transportation (MDOT) business designations
                        document how Ivyhill plans, secures, and delivers the work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-1 border border-line-1 mb-10">
                    {ISO_CERTS.map((c) => (
                        <div key={c.code} className="bg-white p-7 flex flex-col gap-3 border-t-2 border-ivy-green-500">
                            <div className="flex items-center gap-2 text-ivy-green-700">
                                <Icon.Shield size={18} />
                                <span className="font-mono text-[12px] tracking-[0.04em] uppercase font-semibold">Active</span>
                            </div>
                            <div className="font-mono text-[17px] text-fg-1 font-semibold tracking-[0.01em]">{c.code}</div>
                            <div className="text-[17px] font-semibold text-fg-1 leading-[1.3]">{c.label}</div>
                            <p className="m-0 text-[13.5px] leading-[1.55] text-fg-3">{c.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-surface-subtle border border-line-1 rounded-[4px] p-7">
                    <div className="flex items-baseline gap-3 mb-5">
                        <span className="eyebrow text-ivy-green-700">MDOT designations</span>
                        <span className="text-[12px] text-fg-4">Certified by the Maryland Department of Transportation</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {DESIGNATIONS.map((d) => (
                            <div key={d.abbr} className="bg-white border border-line-1 rounded-[4px] p-5 flex items-center gap-4">
                                <div className="w-14 h-14 shrink-0 border border-ink-700 bg-steel-900 text-white flex items-center justify-center font-mono font-semibold tracking-[0.06em] text-[13px]">
                                    {d.abbr}
                                </div>
                                <div className="text-[14px] font-semibold text-fg-1 leading-[1.35]">{d.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
