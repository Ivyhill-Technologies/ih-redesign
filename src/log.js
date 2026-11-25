// Site logger. Two levels:
// - log.debug(): browser console only. On in dev. To turn it on in production
//   for one browser, run localStorage.setItem("ih-debug", "1") in the console.
// - log.error(): console, plus a report to the client log Lambda, which writes
//   it to CloudWatch Logs (/aws/lambda/ih-client-log). Production builds only.
// installErrorHandlers() also reports uncaught errors and rejected promises.
import { LOG_URL } from "./config.js";

const MAX_REPORTS = 10; // per page load, so an error loop can't flood the endpoint
const MAX_BODY = 8000; // the Lambda drops anything bigger
let sent = 0;

const debugOn = () => {
    if (import.meta.env.DEV) return true;
    try {
        return localStorage.getItem("ih-debug") === "1";
    } catch {
        return false; // storage blocked (some privacy modes)
    }
};

// Errors don't survive JSON.stringify, so copy out the useful parts.
const plain = (data) =>
    data instanceof Error ? { name: data.name, message: data.message, stack: data.stack?.slice(0, 4000) } : data;

const report = (message, data) => {
    if (import.meta.env.DEV || typeof navigator === "undefined" || !LOG_URL || sent >= MAX_REPORTS) return;
    sent++;
    const base = {
        level: "error",
        message: String(message).slice(0, 1000),
        page: location.pathname,
        host: location.hostname,
        commit: __COMMIT__,
    };
    let body = JSON.stringify({ ...base, data: plain(data) });
    if (body.length > MAX_BODY) body = JSON.stringify(base);
    // A string body goes as text/plain: no CORS preflight, and it still sends
    // if the page is closing.
    navigator.sendBeacon(LOG_URL, body);
};

export const log = {
    debug: (...args) => {
        if (debugOn()) console.debug("[debug]", ...args);
    },
    error: (message, data) => {
        console.error(message, data ?? "");
        report(message, data);
    },
};

let installed = false;
export const installErrorHandlers = () => {
    if (installed || typeof window === "undefined") return;
    installed = true;
    window.addEventListener("error", (e) =>
        log.error(`Uncaught: ${e.message}`, e.error ?? { source: e.filename, line: e.lineno }),
    );
    window.addEventListener("unhandledrejection", (e) => log.error("Unhandled promise rejection", e.reason));
};
