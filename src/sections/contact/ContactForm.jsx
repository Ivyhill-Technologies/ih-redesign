import { useState } from "react";
import { Icon } from "../../components/Icons.jsx";

const INITIAL = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    website: "",
};

const FIELD_BASE =
    "w-full rounded-[4px] border border-line-2 bg-white px-3.5 py-2.5 text-[15px] text-fg-1 placeholder:text-fg-4 transition-colors focus:outline-none focus:border-ivy-green-500 focus:ring-2 focus:ring-ivy-green-500/20 disabled:bg-surface-subtle disabled:text-fg-3";

const LABEL =
    "block text-[12px] font-semibold tracking-[0.04em] uppercase text-fg-2 mb-1.5";

export function ContactForm() {
    const [values, setValues] = useState(INITIAL);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (values.website) return;

        setStatus("submitting");
        setError(null);

        try {
            // TODO: wire up Amplify Data submission here.
            await new Promise((resolve) => setTimeout(resolve, 600));
            console.info("[contact] submission payload (stub)", {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                subject: values.subject,
                message: values.message,
            });
            setStatus("success");
            setValues(INITIAL);
        } catch (err) {
            setStatus("error");
            setError(err?.message ?? "Something went wrong. Please try again.");
        }
    };

    const submitting = status === "submitting";

    return (
        <section className="section">
            <div className="container px-6">
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-start">
                    <div className="border border-line-1 rounded-[4px] bg-white p-8 md:p-10 border-l-2 border-l-ivy-green-500">
                        <div className="eyebrow text-ivy-green-700 mb-3">Send a message</div>
                        <h2 className="m-0 mb-2 font-bold leading-[1.15] tracking-[-0.02em] text-fg-1 text-balance text-[clamp(22px,2.2vw,30px)]">
                            Tell us how we can help.
                        </h2>
                        <p className="m-0 mb-8 text-[15px] leading-[1.6] text-fg-3">
                            Use the form below and a member of our team will follow up. Required fields are marked with an
                            asterisk.
                        </p>

                        {status === "success" ? (
                            <div className="rounded-[4px] border border-ivy-green-500/40 bg-ivy-green-50 p-5 flex items-start gap-3">
                                <span className="text-ivy-green-700 mt-[2px] shrink-0">
                                    <Icon.Check size={18} />
                                </span>
                                <div>
                                    <p className="m-0 mb-1 text-[15px] font-semibold text-fg-1">Thanks — message sent.</p>
                                    <p className="m-0 text-[14px] leading-[1.55] text-fg-3">
                                        We received your note and will be in touch shortly. You can{" "}
                                        <button
                                            type="button"
                                            onClick={() => setStatus("idle")}
                                            className="bg-transparent border-0 p-0 text-ivy-green-700 underline cursor-pointer font-semibold"
                                        >
                                            send another
                                        </button>{" "}
                                        if needed.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} noValidate={false} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="firstName" className={LABEL}>
                                            First name <span className="text-ivy-green-700">*</span>
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            autoComplete="given-name"
                                            required
                                            disabled={submitting}
                                            value={values.firstName}
                                            onChange={onChange}
                                            className={FIELD_BASE}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className={LABEL}>
                                            Last name <span className="text-ivy-green-700">*</span>
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            autoComplete="family-name"
                                            required
                                            disabled={submitting}
                                            value={values.lastName}
                                            onChange={onChange}
                                            className={FIELD_BASE}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className={LABEL}>
                                        Email <span className="text-ivy-green-700">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        disabled={submitting}
                                        value={values.email}
                                        onChange={onChange}
                                        placeholder="you@agency.gov"
                                        className={FIELD_BASE}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className={LABEL}>
                                        Subject <span className="text-ivy-green-700">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        disabled={submitting}
                                        value={values.subject}
                                        onChange={onChange}
                                        placeholder="What can we help with?"
                                        className={FIELD_BASE}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className={LABEL}>
                                        Message <span className="text-ivy-green-700">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        disabled={submitting}
                                        value={values.message}
                                        onChange={onChange}
                                        placeholder="A few sentences about your program, requirement, or RFI."
                                        className={`${FIELD_BASE} resize-y min-h-[140px]`}
                                    />
                                </div>

                                {/* Honeypot — hidden from users, bots fill it. */}
                                <div aria-hidden="true" className="hidden">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        id="website"
                                        name="website"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={values.website}
                                        onChange={onChange}
                                    />
                                </div>

                                {status === "error" && (
                                    <div
                                        role="alert"
                                        className="rounded-[4px] border border-line-1 bg-surface-subtle px-4 py-3 text-[14px] text-fg-2"
                                    >
                                        {error}
                                    </div>
                                )}

                                <div className="flex items-center gap-4 pt-2">
                                    <button type="submit" disabled={submitting} className="btn btn-primary">
                                        {submitting ? "Sending…" : "Send message"}
                                        {!submitting && <Icon.Arrow size={14} />}
                                    </button>
                                    <span className="text-[13px] text-fg-3">
                                        We typically reply within one business day.
                                    </span>
                                </div>
                            </form>
                        )}
                    </div>

                    <aside className="flex flex-col gap-6">
                        <div className="border border-line-1 rounded-[4px] bg-white p-7">
                            <div className="eyebrow text-ivy-green-700 mb-3">Corporate office</div>
                            <ul className="list-none m-0 p-0 flex flex-col gap-4 text-[14px]">
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 text-ivy-green-700 shrink-0">
                                        <Icon.Pin size={16} />
                                    </span>
                                    <span className="text-fg-2 leading-[1.55]">
                                        4301 Garden City Drive, Suite 410
                                        <br />
                                        Hyattsville, MD 20785
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 text-ivy-green-700 shrink-0">
                                        <Icon.Phone size={16} />
                                    </span>
                                    <a
                                        href="tel:+13014771080"
                                        className="text-fg-2 no-underline hover:text-ivy-green-700"
                                    >
                                        +1 (301) 477-1080
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 text-ivy-green-700 shrink-0">
                                        <Icon.Mail size={16} />
                                    </span>
                                    <a
                                        href="mailto:info@ivyhilltech.com"
                                        className="text-fg-2 no-underline hover:text-ivy-green-700"
                                    >
                                        info@ivyhilltech.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="border border-line-1 rounded-[4px] bg-ivy-green-50 p-7">
                            <div className="eyebrow text-ivy-green-700 mb-3">Contracting</div>
                            <p className="m-0 mb-4 text-[14px] leading-[1.6] text-fg-2">
                                Building a requirement or RFI? Pull our current capability statement and we'll route you to
                                the right contract vehicle.
                            </p>
                            <a
                                href="/documents/Ivyhill-Capability-Statement-2026.pdf"
                                target="_blank"
                                rel="noopener"
                                className="btn btn-secondary no-underline"
                            >
                                Capability statement <Icon.Arrow size={14} />
                            </a>
                        </div>

                        <div className="border border-line-1 rounded-[4px] bg-white p-7">
                            <div className="eyebrow text-ivy-green-700 mb-3">Hours</div>
                            <p className="m-0 text-[14px] leading-[1.6] text-fg-2">
                                Monday – Friday
                                <br />
                                8:00 AM – 5:00 PM ET
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
