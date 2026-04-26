import { Link } from "react-router-dom";
import { SiteShell } from "../components/SiteShell.jsx";

export function NotFoundPage() {
    return (
        <SiteShell>
            <section className="section">
                <div className="container max-w-[720px]">
                    <div className="eyebrow mb-4">Error 404</div>
                    <h1 className="mb-4">Page not found.</h1>
                    <p className="mb-6 text-fg-3">
                        The page you requested is not available. Return to the homepage to keep browsing.
                    </p>
                    <div className="flex gap-3">
                        <Link to="/" className="btn btn-primary no-underline">
                            Back to home
                        </Link>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
