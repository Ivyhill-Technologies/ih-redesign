import { SiteShell } from "../components/SiteShell.jsx";
import { CapabilityGrid } from "../sections/CapabilityGrid.jsx";
import { CodesStrip } from "../sections/CodesStrip.jsx";
import { CyberCallout } from "../sections/CyberCallout.jsx";
import { Hero } from "../sections/Hero.jsx";
import { NaicsCodes } from "../sections/NaicsCodes.jsx";
import { PastPerformance } from "../sections/PastPerformance.jsx";
import { StatsBand } from "../sections/StatsBand.jsx";

export function HomePage() {
    return (
        <SiteShell>
            {({ showToast }) => (
                <>
                    <Hero onCTA={() => showToast()} />
                    <CodesStrip />
                    <CapabilityGrid />
                    <PastPerformance />
                    <StatsBand />
                    <CyberCallout />
                    <NaicsCodes onCTA={() => showToast()} />
                </>
            )}
        </SiteShell>
    );
}
