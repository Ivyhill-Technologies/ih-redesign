// Contact form field rules. Keep in step with LIMITS in infra/lambda/index.mjs,
// which enforces the same rules server-side.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_MAX = 100;
export const EMAIL_MAX = 254;
export const SUBJECT_MAX = 200;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;

export const required =
    (label, max) =>
    ({ value }) => {
        const v = value.trim();
        if (!v) return `${label} is required.`;
        if (max && v.length > max) return `${label} must be ${max} characters or fewer.`;
        return undefined;
    };

export const validateEmail = ({ value }) => {
    const v = value.trim();
    if (!v) return "Email is required.";
    if (v.length > EMAIL_MAX) return `Email must be ${EMAIL_MAX} characters or fewer.`;
    if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
    return undefined;
};

export const validateMessage = ({ value }) => {
    const v = value.trim();
    if (!v) return "Message is required.";
    if (v.length < MESSAGE_MIN) return `Please add a few more details (${MESSAGE_MIN}+ characters).`;
    if (v.length > MESSAGE_MAX) return `Message must be ${MESSAGE_MAX} characters or fewer.`;
    return undefined;
};
