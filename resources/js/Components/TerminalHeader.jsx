import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function TerminalHeader({ event }) {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
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
                y: 12,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, [typingDone]);

    return (
        <section ref={containerRef} className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12">
            <div className="max-w-2xl">
                <div className="text-2xl md:text-4xl font-bold text-text tracking-tight">
                    <span className="text-accent">{'>'}</span>{' '}
                    <span>{displayedText}</span>
                    <span
                        ref={cursorRef}
                        className="inline-block w-[0.6em] h-[1.1em] bg-accent ml-0.5 align-middle"
                    />
                </div>

                <div ref={infoRef} className="mt-8 space-y-3 text-text-muted text-sm md:text-base">
                    <p>
                        <span className="text-accent">{'>'}</span> {event.graduate_name}
                    </p>
                    <p>
                        <span className="text-accent">{'>'}</span> Ciencia da Computacao — UNICENTRO
                    </p>
                    <p>
                        <span className="text-accent">{'>'}</span> Colacao: {event.ceremony_date} | Baile: {event.ball_date}
                    </p>
                    <p>
                        <span className="text-accent">{'>'}</span> {event.location}
                    </p>
                    <p className="mt-6 text-text italic">
                        "// o avancado e o basico bem feito"
                    </p>
                </div>
            </div>
        </section>
    );
}
