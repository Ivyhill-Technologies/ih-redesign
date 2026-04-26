import { SiteShell } from "../components/SiteShell.jsx";
import { CapabilityHero } from "../sections/capabilities/CapabilityHero.jsx";
import { ContactForm } from "../sections/contact/ContactForm.jsx";

export function ContactPage() {
    return (
        <SiteShell>
            <CapabilityHero
                eyebrow="Contact"
                title="Get in touch with Ivyhill."
                lede="Use the form below to start a conversation about an upcoming requirement or RFI, or reach us directly by phone or email. A member of our team will follow up promptly."
            />
            <ContactForm />
        </SiteShell>
    );
}
