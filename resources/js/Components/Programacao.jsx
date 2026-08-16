import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const schedule = [
    { time: 'TBD', event: 'Cerimonia de Colacao de Grau', note: 'formatura oficial' },
    { time: 'TBD', event: 'Coquetel', note: 'apos a cerimonia' },
    { time: 'TBD', event: 'Baile de Formatura', note: 'a festa comeca' },
];

export default function Programacao() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.prog-item', {
                opacity: 0,
                x: -16,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="px-6 md:px-12 py-16">
            <div className="max-w-2xl">
                <h2 className="text-sm text-text-muted mb-8">
                    <span className="text-accent">//</span> programacao
                </h2>

                <div className="space-y-4">
                    {schedule.map((item, i) => (
                        <div key={i} className="prog-item flex items-start gap-4 text-sm">
                            <span className="text-text-muted/50 w-12 shrink-0">{item.time}</span>
                            <div className="border-l border-border pl-4">
                                <p className="text-text">{item.event}</p>
                                <p className="text-text-muted text-xs mt-0.5">/* {item.note} */</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-xs text-text-muted/50">
                    {'//'} horarios sujeitos a alteracao
                </p>
            </div>
        </section>
    );
}
