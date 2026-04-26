import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { Header } from "./Header.jsx";
import { Toast } from "./Toast.jsx";

export function SiteShell({ children }) {
    const [toast, setToast] = useState(null);
    const timerRef = useRef(null);
    const location = useLocation();

    const showToast = (msg = "Capability statement requested. We'll be in touch within one business day.") => {
        setToast(msg);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setToast(null), 2800);
    };

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
            <Header onCTA={() => showToast()} />
            <main>{typeof children === "function" ? children({ showToast }) : children}</main>
            <Footer />
            <Toast message={toast} />
        </>
    );
}
