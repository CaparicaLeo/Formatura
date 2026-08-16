import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, CalendarDays, Shirt } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const details = [
    { icon: CalendarDays, label: 'Colacao de Grau', value: '16/02/2027' },
    { icon: CalendarDays, label: 'Baile de Formatura', value: '20/02/2027' },
    { icon: MapPin, label: 'Local', value: 'Centro de Eventos Cidade dos Lagos — Guarapuava, PR' },
    { icon: Clock, label: 'Horario', value: 'A definir' },
    { icon: Shirt, label: 'Dress Code', value: 'Social' },
];

export default function SobreEvento() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.evento-item', {
                opacity: 0,
                x: -16,
                duration: 0.4,
                stagger: 0.08,
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
                    <span className="text-accent">//</span> sobre o evento
                </h2>

                <div className="space-y-4">
                    {details.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="evento-item flex items-start gap-3 text-sm">
                            <Icon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <div>
                                <span className="text-text-muted">{label}:</span>{' '}
                                <span className="text-text">{value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
