import { Icon } from "../components/Icons.jsx";
import { SiteShell } from "../components/SiteShell.jsx";
import { CapabilityHero } from "../sections/capabilities/CapabilityHero.jsx";
import { ContractVehicles } from "../sections/contracts/ContractVehicles.jsx";

export function ContractsPage() {
    return (
        <SiteShell>
            <CapabilityHero
                eyebrow="Contracts"
                title="Contract vehicles"
                lede="Ivyhill Technologies holds federal contract vehicles spanning IT services, records and information management, and defense — making it straightforward for federal, state, and local buyers to put us on contract."
            />

            <ContractVehicles />

            <section className="section bg-ivy-green-50">
                <div className="container px-6">
                    <div className="border border-line-1 rounded-[4px] bg-white p-10 md:p-12 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-center border-l-2 border-l-ivy-green-500">
                        <div>
                            <div className="eyebrow text-ivy-green-700 mb-3">Talk to a contracting officer</div>
                            <h2 className="m-0 mb-3 font-bold leading-[1.15] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(24px,2.4vw,34px)]">
                                Have an upcoming requirement?
                            </h2>
                            <p className="m-0 text-[16px] leading-[1.6] text-fg-3">
                                Pull our capability statement, or reach out directly — we'll route you to the right contract
                                vehicle and team.
                            </p>
                        </div>
                        <div className="flex md:justify-end">
                            <a
                                href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                                target="_blank"
                                rel="noopener"
                                className="btn btn-primary no-underline"
                            >
                                Capability statement <Icon.Arrow size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
