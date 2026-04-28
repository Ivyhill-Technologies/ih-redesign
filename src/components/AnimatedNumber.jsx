import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({ target, duration = 2000, decimals = 0, suffix = "" }) {
    const [display, setDisplay] = useState(0);
    const nodeRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        let frameId;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasAnimatedRef.current) {
                    hasAnimatedRef.current = true;
                    startAnimation();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 },
        );

        observer.observe(node);

        function startAnimation() {
            const startTime = performance.now();
            const factor = 10 ** decimals;

            function tick(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - (1 - progress) ** 3;
                setDisplay(Math.round(target * eased * factor) / factor);

                if (progress < 1) {
                    frameId = requestAnimationFrame(tick);
                }
            }

            frameId = requestAnimationFrame(tick);
        }

        return () => {
            observer.disconnect();
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [target, duration, decimals]);

    const formatted = display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return (
        <span ref={nodeRef}>
            {formatted}
            {suffix}
        </span>
    );
}
