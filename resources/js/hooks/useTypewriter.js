import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useTypewriter(text, options = {}) {
    const ref = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        if (!ref.current || !text) return;

        const el = ref.current;
        el.textContent = '';

        const tl = gsap.timeline();
        timelineRef.current = tl;

        for (let i = 0; i < text.length; i++) {
            tl.to(el, {
                duration: 0,
                onComplete: () => {
                    el.textContent = text.slice(0, i + 1);
                },
                delay: i === 0 ? (options.delay || 0.5) : (options.speed || 0.06),
            });
        }

        if (options.onComplete) {
            tl.call(options.onComplete);
        }

        return () => {
            tl.kill();
        };
    }, [text, options.delay, options.speed]);

    return ref;
}

export function useBlinkCursor() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(ref.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'steps(1)',
        });

        return () => tl.kill();
    }, []);

    return ref;
}
