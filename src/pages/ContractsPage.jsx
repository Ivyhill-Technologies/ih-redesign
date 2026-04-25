import { SiteShell } from "../components/SiteShell.jsx";
import { CertsStrip } from "../sections/contracts/CertsStrip.jsx";
import { ContactBlock } from "../sections/contracts/ContactBlock.jsx";
import { ContractsHero } from "../sections/contracts/ContractsHero.jsx";
import { EightABand } from "../sections/contracts/EightABand.jsx";
import { SetAsides } from "../sections/contracts/SetAsides.jsx";
import { VehicleDetail } from "../sections/contracts/VehicleDetail.jsx";
import { VehicleIndex } from "../sections/contracts/VehicleIndex.jsx";
import { VEHICLES } from "../sections/contracts/vehicles.js";

export function ContractsPage() {
    return (
        <SiteShell>
            {({ showToast }) => (
                <>
                    <ContractsHero />
                    <VehicleIndex vehicles={VEHICLES} />
                    {VEHICLES.map((v, i) => (
                        <VehicleDetail key={v.id} v={v} alt={i % 2 === 1} />
                    ))}
                    <EightABand />
                    <SetAsides />
                    <CertsStrip />
                    <ContactBlock
                        onCTA={() =>
                            showToast("Capability statement requested")
                        }
                    />
                </>
            )}
        </SiteShell>
    );
}
