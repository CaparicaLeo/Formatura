import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Check, ArrowLeft } from 'lucide-react';

export default function ConfirmarSuccess() {
    const containerRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useLayoutEffect(() => {
        if (!showContent || !containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.success-item', {
                opacity: 0,
                y: 16,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, [showContent]);

    return (
        <GuestLayout>
            <Head title="Presenca Confirmada" />

            <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center px-6">
                <div className="max-w-md text-center">
                    <div className="success-item mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-accent/30 bg-accent/5">
                            <Check className="w-8 h-8 text-accent" />
                        </div>
                    </div>

                    <h1 className="success-item text-lg text-text mb-3">
                        <span className="text-accent">{'>'}</span> presenca confirmada <span className="text-accent">✓</span>
                    </h1>

                    <p className="success-item text-sm text-text-muted mb-2">
                        {'//'} seu registro foi salvo com sucesso
                    </p>
                    <p className="success-item text-sm text-text-muted mb-8">
                        {'//'} estamos felizes em contar com voce!
                    </p>

                    <div className="success-item">
                        <Link
                            href={route('confirmations.index')}
                            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {'<-'} voltar
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
