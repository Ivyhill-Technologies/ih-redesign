import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { Header } from "./Header.jsx";

export function SiteShell({ children }) {
    const location = useLocation();

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
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
