import { Icon } from "../../components/Icons.jsx";

function ContactCard({ eyebrow, name, role, email, phone }) {
    return (
        <div className="border border-line-1 rounded-[4px] py-6 px-7">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-fg-4 mb-3.5">
                {eyebrow}
            </div>
            <div className="text-[16px] font-semibold text-fg-1 mb-1">
                {name}
            </div>
            <div className="text-[13px] text-fg-3 mb-[18px]">{role}</div>
            <div className="flex flex-col gap-2.5 text-[13px] text-fg-2">
                <div className="flex gap-2.5 items-center">
                    <Icon.Mail
                        size={14}
                        className="text-ivy-green-700 shrink-0"
                    />
                    {email}
                </div>
                <div className="flex gap-2.5 items-center">
                    <Icon.Phone
                        size={14}
                        className="text-ivy-green-700 shrink-0"
                    />
                    {phone}
                </div>
            </div>
        </div>
    );
}

export function ContactBlock({ onCTA }) {
    return (
        <section id="contact" className="bg-white">
            <div className="container py-24 px-6">
                <div className="border-t border-ink-900 pt-6 mb-12">
                    <div className="eyebrow text-fg-2">
                        Contracting points of contact
                    </div>
                </div>
                <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-12 items-start">
                    <div>
                        <h2 className="m-0 mb-4">
                            Reach our contracting team.
                        </h2>
                        <p className="text-[16px] leading-[1.6] text-fg-3 m-0 mb-6 max-w-[480px]">
                            Contracting officers, COTRs, and small-business
                            specialists may contact Ivyhill directly for
                            capability statements, past-performance
                            documentation, and ordering procedures on any of our
                            active vehicles.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onCTA}
                            >
                                Request capability statement{" "}
                                <Icon.Arrow size={14} />
                            </button>
                            <button type="button" className="btn btn-secondary">
                                <Icon.ExternalLink size={13} /> Download
                                contract record (PDF)
                            </button>
                        </div>
                    </div>
                    <ContactCard
                        eyebrow="Contracts & pricing"
                        name='Olusola "Sola" Adesiyan'
                        role="President & CEO"
                        email="contracts@ivyhilltech.com"
                        phone="+1 (301) 477-1080 ext. 102"
                    />
                    <ContactCard
                        eyebrow="Small-business liaison"
                        name="Marcus Chen"
                        role="Director, Capture & Proposals"
                        email="sb-liaison@ivyhilltech.com"
                        phone="+1 (301) 477-1080 ext. 118"
                    />
                </div>
            </div>
        </section>
    );
}
