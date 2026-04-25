const SvgWrap = ({ children, size = 22, className = "", ...rest }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        className={`svg-icon${className ? ` ${className}` : ""}`}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        {...rest}
    >
        {children}
    </svg>
);

export const Icon = {
    Code: (p) => (
        <SvgWrap {...p}>
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </SvgWrap>
    ),
    BarChart: (p) => (
        <SvgWrap {...p}>
            <path d="M3 3v18h18" />
            <rect x="7" y="11" width="3" height="7" />
            <rect x="13" y="7" width="3" height="11" />
            <path d="M19 14v4" />
        </SvgWrap>
    ),
    Server: (p) => (
        <SvgWrap {...p}>
            <rect x="2" y="3" width="20" height="8" rx="2" />
            <rect x="2" y="13" width="20" height="8" rx="2" />
            <path d="M6 7h.01M6 17h.01" />
        </SvgWrap>
    ),
    Folders: (p) => (
        <SvgWrap {...p}>
            <path d="M22 17V8a2 2 0 0 0-2-2h-7l-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12" />
            <path d="M22 13v6a2 2 0 0 1-2 2h-2" />
        </SvgWrap>
    ),
    Archive: (p) => (
        <SvgWrap {...p}>
            <rect x="2" y="4" width="20" height="5" rx="1" />
            <path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M10 13h4" />
        </SvgWrap>
    ),
    Scan: (p) => (
        <SvgWrap {...p}>
            <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" />
        </SvgWrap>
    ),
    Users: (p) => (
        <SvgWrap {...p}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </SvgWrap>
    ),
    Shield: (p) => (
        <SvgWrap {...p}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </SvgWrap>
    ),
    Arrow: (p) => (
        <SvgWrap {...p}>
            <path d="M5 12h14M13 5l7 7-7 7" />
        </SvgWrap>
    ),
    Phone: (p) => (
        <SvgWrap {...p}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </SvgWrap>
    ),
    Mail: (p) => (
        <SvgWrap {...p}>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 6l-10 7L2 6" />
        </SvgWrap>
    ),
    Pin: (p) => (
        <SvgWrap {...p}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </SvgWrap>
    ),
    Check: (p) => (
        <SvgWrap {...p}>
            <path d="M20 6L9 17l-5-5" />
        </SvgWrap>
    ),
    ExternalLink: (p) => (
        <SvgWrap {...p}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
        </SvgWrap>
    ),
    Lock: (p) => (
        <SvgWrap {...p}>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </SvgWrap>
    ),
};
