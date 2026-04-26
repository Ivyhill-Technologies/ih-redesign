import { useForm } from "@tanstack/react-form";
import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import { Icon } from "../../components/Icons.jsx";

const client = generateClient();

const INITIAL = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    website: "",
};

const FIELD_BASE =
    "w-full rounded-[4px] border bg-white px-3.5 py-2.5 text-[15px] text-fg-1 placeholder:text-fg-4 transition-colors focus:outline-none focus:ring-2 disabled:bg-surface-subtle disabled:text-fg-3";

const FIELD_OK = "border-line-2 focus:border-ivy-green-500 focus:ring-ivy-green-500/20";
const FIELD_ERR = "border-status-danger focus:border-status-danger focus:ring-status-danger/20";

const LABEL = "block text-[12px] font-semibold tracking-[0.04em] uppercase text-fg-2 mb-1.5";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const SUBJECT_MAX = 200;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

const required =
    (label, max) =>
    ({ value }) => {
        const v = value.trim();
        if (!v) return `${label} is required.`;
        if (max && v.length > max) return `${label} must be ${max} characters or fewer.`;
        return undefined;
    };

const validateEmail = ({ value }) => {
    const v = value.trim();
    if (!v) return "Email is required.";
    if (v.length > EMAIL_MAX) return `Email must be ${EMAIL_MAX} characters or fewer.`;
    if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
    return undefined;
};

const validateMessage = ({ value }) => {
    const v = value.trim();
    if (!v) return "Message is required.";
    if (v.length < MESSAGE_MIN) return `Please add a few more details (${MESSAGE_MIN}+ characters).`;
    if (v.length > MESSAGE_MAX) return `Message must be ${MESSAGE_MAX} characters or fewer.`;
    return undefined;
};

export function ContactForm() {
    const [status, setStatus] = useState("idle");
    const [submitError, setSubmitError] = useState(null);

    const form = useForm({
        defaultValues: INITIAL,
        onSubmit: async ({ value, formApi }) => {
            if (value.website) return;

            try {
                const { errors: apiErrors } = await client.models.ContactSubmission.create({
                    firstName: value.firstName.trim(),
                    lastName: value.lastName.trim(),
                    email: value.email.trim(),
                    subject: value.subject.trim(),
                    message: value.message.trim(),
                });
                if (apiErrors?.length) throw new Error(apiErrors[0].message);
                setStatus("success");
                setSubmitError(null);
                formApi.reset();
            } catch (err) {
                setStatus("error");
                setSubmitError(err?.message ?? "Something went wrong. Please try again.");
            }
        },
    });

    const submitting = status === "submitting";

    const fieldClass = (field, extra = "") => {
        const showErr = field.state.meta.isTouched && field.state.meta.errors.length > 0;
        return `${FIELD_BASE} ${showErr ? FIELD_ERR : FIELD_OK}${extra ? ` ${extra}` : ""}`;
    };

    const errorId = (name) => `${name}-error`;
    const showError = (field) => field.state.meta.isTouched && field.state.meta.errors.length > 0;

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
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    form.handleSubmit();
                                }}
                                noValidate
                                className="flex flex-col gap-5"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <form.Field name="firstName" validators={{ onChange: required("First name", NAME_MAX) }}>
                                        {(field) => (
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
                                                    maxLength={NAME_MAX}
                                                    disabled={submitting}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    aria-invalid={showError(field)}
                                                    aria-describedby={showError(field) ? errorId("firstName") : undefined}
                                                    className={fieldClass(field)}
                                                />
                                                {showError(field) && (
                                                    <p
                                                        id={errorId("firstName")}
                                                        className="mt-1.5 text-[13px] text-status-danger"
                                                    >
                                                        {field.state.meta.errors[0]}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </form.Field>

                                    <form.Field name="lastName" validators={{ onChange: required("Last name", NAME_MAX) }}>
                                        {(field) => (
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
                                                    maxLength={NAME_MAX}
                                                    disabled={submitting}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    aria-invalid={showError(field)}
                                                    aria-describedby={showError(field) ? errorId("lastName") : undefined}
                                                    className={fieldClass(field)}
                                                />
                                                {showError(field) && (
                                                    <p id={errorId("lastName")} className="mt-1.5 text-[13px] text-status-danger">
                                                        {field.state.meta.errors[0]}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </form.Field>
                                </div>

                                <form.Field name="email" validators={{ onChange: validateEmail }}>
                                    {(field) => (
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
                                                maxLength={EMAIL_MAX}
                                                disabled={submitting}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="you@agency.gov"
                                                aria-invalid={showError(field)}
                                                aria-describedby={showError(field) ? errorId("email") : undefined}
                                                className={fieldClass(field)}
                                            />
                                            {showError(field) && (
                                                <p id={errorId("email")} className="mt-1.5 text-[13px] text-status-danger">
                                                    {field.state.meta.errors[0]}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </form.Field>

                                <form.Field name="subject" validators={{ onChange: required("Subject", SUBJECT_MAX) }}>
                                    {(field) => (
                                        <div>
                                            <label htmlFor="subject" className={LABEL}>
                                                Subject <span className="text-ivy-green-700">*</span>
                                            </label>
                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                required
                                                maxLength={SUBJECT_MAX}
                                                disabled={submitting}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="What can we help with?"
                                                aria-invalid={showError(field)}
                                                aria-describedby={showError(field) ? errorId("subject") : undefined}
                                                className={fieldClass(field)}
                                            />
                                            {showError(field) && (
                                                <p id={errorId("subject")} className="mt-1.5 text-[13px] text-status-danger">
                                                    {field.state.meta.errors[0]}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </form.Field>

                                <form.Field name="message" validators={{ onChange: validateMessage }}>
                                    {(field) => (
                                        <div>
                                            <label htmlFor="message" className={LABEL}>
                                                Message <span className="text-ivy-green-700">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={6}
                                                required
                                                maxLength={MESSAGE_MAX}
                                                disabled={submitting}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder="A few sentences about your program, requirement, or RFI."
                                                aria-invalid={showError(field)}
                                                aria-describedby={showError(field) ? errorId("message") : undefined}
                                                className={fieldClass(field, "resize-y min-h-[140px]")}
                                            />
                                            {showError(field) && (
                                                <p id={errorId("message")} className="mt-1.5 text-[13px] text-status-danger">
                                                    {field.state.meta.errors[0]}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </form.Field>

                                {/* Honeypot — hidden from users, bots fill it. */}
                                <form.Field name="website">
                                    {(field) => (
                                        <div aria-hidden="true" className="hidden">
                                            <label htmlFor="website">Website</label>
                                            <input
                                                id="website"
                                                name="website"
                                                type="text"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </form.Field>

                                {status === "error" && (
                                    <div
                                        role="alert"
                                        className="rounded-[4px] border border-line-1 bg-surface-subtle px-4 py-3 text-[14px] text-fg-2"
                                    >
                                        {submitError}
                                    </div>
                                )}

                                <form.Subscribe selector={(s) => [s.isSubmitting, s.canSubmit]}>
                                    {([isSubmitting]) => (
                                        <div className="flex items-center gap-4 pt-2">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                                {isSubmitting ? "Sending…" : "Send message"}
                                                {!isSubmitting && <Icon.Arrow size={14} />}
                                            </button>
                                            <span className="text-[13px] text-fg-3">
                                                We typically reply within one business day.
                                            </span>
                                        </div>
                                    )}
                                </form.Subscribe>
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
                                    <a href="tel:+13014771080" className="text-fg-2 no-underline hover:text-ivy-green-700">
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
                                Building a requirement or RFI? Pull our current capability statement and we'll route you to the
                                right contract vehicle.
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
