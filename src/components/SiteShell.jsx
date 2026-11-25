import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { Footer } from "./Footer.jsx";
import { Header } from "./Header.jsx";

// Primary host. The bare domain redirects here (infra/amplify-redirects.json).
const SITE_URL = "https://www.ivyhilltech.com";
const DEFAULT_TITLE = "Ivyhill Technologies – Integrity & Quality in Information Management";
const DEFAULT_DESCRIPTION =
    "Enterprise Information Management for U.S. federal, state, and local agencies, and commercial clients. ISO-certified, contract-vehicle-ready.";

export function SiteShell({ children, title, description }) {
    const location = useLocation();
    const fullTitle = title ? `${title} — Ivyhill Technologies` : DEFAULT_TITLE;
    const fullDescription = description || DEFAULT_DESCRIPTION;
    const canonical = SITE_URL + (location.pathname.replace(/\/+$/, "") || "/");

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.slice(1);
            requestAnimationFrame(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        } else {
            window.scrollTo({ top: 0 });
        }
    }, [location]);

    return (
        <>
            <Head>
                <title>{fullTitle}</title>
                <meta name="description" content={fullDescription} />
                <link rel="canonical" href={canonical} />
                {/* Link preview card (LinkedIn, Teams, Slack, iMessage, X). Image source: scripts/og-image.html */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Ivyhill Technologies" />
                <meta property="og:title" content={fullTitle} />
                <meta property="og:description" content={fullDescription} />
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta
                    property="og:image:alt"
                    content="Ivyhill Technologies — Enterprise Information Management for federal missions"
                />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
