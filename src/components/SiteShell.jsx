import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { Footer } from "./Footer.jsx";
import { Header } from "./Header.jsx";

const DEFAULT_TITLE = "Ivyhill Technologies – Integrity & Quality in Information Management";
const DEFAULT_DESCRIPTION =
    "Enterprise Information Management for U.S. federal, state, and local agencies, and commercial clients. ISO-certified, contract-vehicle-ready.";

export function SiteShell({ children, title, description }) {
    const location = useLocation();
    const fullTitle = title ? `${title} — Ivyhill Technologies` : DEFAULT_TITLE;
    const fullDescription = description || DEFAULT_DESCRIPTION;

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
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
