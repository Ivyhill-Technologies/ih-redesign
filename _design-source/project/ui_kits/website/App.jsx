// Top-level homepage assembly + interactive toast for the CTA.
function App() {
    const [toast, setToast] = React.useState(false);
    const onCTA = () => {
        setToast(true);
        clearTimeout(window.__t);
        window.__t = setTimeout(() => setToast(false), 2800);
    };
    return (
        <div>
            <Header onCTA={onCTA} />
            <main>
                <Hero onCTA={onCTA} />
                <CodesStrip />
                <CapabilityGrid />
                <PastPerformance />
                <StatsBand />
                <CyberCallout />
                <NaicsCodes />
            </main>
            <Footer />
            <div
                className={"toast " + (toast ? "show" : "")}
                role="status"
                aria-live="polite"
            >
                <span className="check">
                    <Icon.Check size={16} />
                </span>
                <span>
                    Capability statement requested. We'll be in touch within one
                    business day.
                </span>
            </div>
        </div>
    );
}
window.App = App;
