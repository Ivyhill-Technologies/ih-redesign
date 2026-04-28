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
        <SiteShell description="Ivyhill Technologies delivers federal IT services — application development, data analytics, information and records management, infrastructure support, and queue management — for U.S. federal, state, and local agencies. ISO-certified and contract-vehicle-ready.">
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
