import { Icon } from "./Icons.jsx";

export function Toast({ message }) {
    return (
        <div className={`toast ${message ? "show" : ""}`} role="status" aria-live="polite">
            {message && (
                <>
                    <span className="check">
                        <Icon.Check size={16} />
                    </span>
                    <span>{message}</span>
                </>
            )}
        </div>
    );
}
