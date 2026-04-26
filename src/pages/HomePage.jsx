import { SiteShell } from "../components/SiteShell.jsx";
import { CapabilityGrid } from "../sections/home/CapabilityGrid.jsx";
import { CyberCallout } from "../sections/home/CyberCallout.jsx";
import { Hero } from "../sections/home/Hero.jsx";
import { NaicsCodes } from "../sections/home/NaicsCodes.jsx";
import { OutcomeBlocks } from "../sections/home/OutcomeBlocks.jsx";
import { PastPerformance } from "../sections/home/PastPerformance.jsx";
import { StatsBand } from "../sections/home/StatsBand.jsx";

export function HomePage() {
    return (
        <SiteShell>
            <Hero />
            <OutcomeBlocks />
            <CapabilityGrid />
            <PastPerformance />
            <StatsBand />
            <CyberCallout />
            <NaicsCodes />
        </SiteShell>
    );
}
