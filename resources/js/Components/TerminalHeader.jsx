import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function TerminalHeader({ event }) {
    const [displayedText, setDisplayedText] = useState('');
    const [typingDone, setTypingDone] = useState(false);
    const cursorRef = useRef(null);
    const infoRef = useRef(null);
    const containerRef = useRef(null);

    const fullText = `~ / formatura-cc`;

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setTypingDone(true);
            }
        }, 70);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!cursorRef.current) return;
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'steps(1)',
        });
        return () => tl.kill();
    }, []);

    useLayoutEffect(() => {
        if (!typingDone || !infoRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(infoRef.current.children, {
                opacity: 0,
                y: 8,
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, [typingDone]);

    return (
        <section ref={containerRef} className="pt-12 pb-8 px-6 md:px-12">
            <div className="max-w-xl">
                <div className="text-xl md:text-3xl font-bold text-text tracking-tight mb-6">
                    <span className="text-accent">{'>'}</span>{' '}
                    <span>{displayedText}</span>
                    <span
                        ref={cursorRef}
                        className="inline-block w-[0.6em] h-[1.1em] bg-accent ml-0.5 align-middle"
                    />
                </div>

                <div ref={infoRef} className="space-y-1.5 text-sm text-text-muted">
                    <p>{event.graduate_name}</p>
                    <p>Ciencia da Computacao — UNICENTRO</p>
                    <p>
                        <span className="text-accent">colacao</span> {event.ceremony_date}{' '}
                        <span className="text-border">|</span>{' '}
                        <span className="text-accent">baile</span> {event.ball_date}
                    </p>
                    <p>{event.location}</p>
                    <p className="mt-3 text-text-muted/60 text-xs">
                        "// o avancado e o basico bem feito"
                    </p>
                </div>
            </div>
        </section>
    );
}
