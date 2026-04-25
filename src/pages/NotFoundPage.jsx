import { Link } from "react-router-dom";
import { SiteShell } from "../components/SiteShell.jsx";

export function NotFoundPage() {
    return (
        <SiteShell>
            <section className="section">
                <div className="container" style={{ maxWidth: 720 }}>
                    <div className="eyebrow" style={{ marginBottom: 16 }}>
                        Error 404
                    </div>
                    <h1 style={{ marginBottom: 16 }}>Page not found.</h1>
                    <p style={{ marginBottom: 24, color: "var(--fg-3)" }}>
                        The page you requested is not available. Return to the
                        homepage or browse our contract vehicles.
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                        <Link
                            to="/"
                            className="btn btn-primary"
                            style={{ textDecoration: "none" }}
                        >
                            Back to home
                        </Link>
                        <Link
                            to="/contracts"
                            className="btn btn-secondary"
                            style={{ textDecoration: "none" }}
                        >
                            View contract vehicles
                        </Link>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
