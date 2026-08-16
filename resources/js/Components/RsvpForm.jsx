import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, X, LoaderCircle, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RsvpForm({ form, submit, addCompanion, removeCompanion, updateCompanion }) {
    const { data, setData, processing, errors } = form;
    const sectionRef = useRef(null);
    const fieldsRef = useRef(null);

    useLayoutEffect(() => {
        if (!fieldsRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.field-item', {
                opacity: 0,
                y: 16,
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="px-6 md:px-12 py-16">
            <div className="max-w-2xl">
                <h2 className="text-sm text-text-muted mb-8">
                    <span className="text-accent">//</span> confirmar presenca
                </h2>

                <form onSubmit={submit} className="space-y-6">
                    <div ref={fieldsRef}>
                        {/* Nome */}
                        <div className="field-item mb-6">
                            <label htmlFor="name" className="block text-xs text-text-muted mb-2">
                                {'>'} nome_completo <span className="text-error">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full bg-input-bg border border-input-border rounded px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50"
                                placeholder="seu nome aqui"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-error">
                                    <span className="text-error/70">// erro:</span> {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="field-item mb-6">
                            <label htmlFor="email" className="block text-xs text-text-muted mb-2">
                                {'>'} email <span className="text-error">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full bg-input-bg border border-input-border rounded px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50"
                                placeholder="voce@email.com"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-error">
                                    <span className="text-error/70">// erro:</span> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Telefone */}
                        <div className="field-item mb-6">
                            <label htmlFor="phone" className="block text-xs text-text-muted mb-2">
                                {'>'} telefone <span className="text-text-muted/50">(opcional)</span>
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full bg-input-bg border border-input-border rounded px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50"
                                placeholder="(00) 00000-0000"
                            />
                            {errors.phone && (
                                <p className="mt-1.5 text-xs text-error">
                                    <span className="text-error/70">// erro:</span> {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Acompanhantes */}
                        <div className="field-item mb-6">
                            <label className="block text-xs text-text-muted mb-2">
                                {'>'} acompanhantes <span className="text-text-muted/50">(opcional)</span>
                            </label>
                            {data.companions.map((companion, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-text-muted/50 w-4">#{index + 1}</span>
                                    <input
                                        value={companion}
                                        onChange={(e) => updateCompanion(index, e.target.value)}
                                        className="flex-1 bg-input-bg border border-input-border rounded px-3 py-2 text-sm text-text placeholder:text-text-muted/50"
                                        placeholder={`acompanhante ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCompanion(index)}
                                        className="text-text-muted hover:text-error transition-colors p-1"
                                        aria-label={`Remover acompanhante ${index + 1}`}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {errors.companions && (
                                <p className="mt-1.5 text-xs text-error">
                                    <span className="text-error/70">// erro:</span> {errors.companions}
                                </p>
                            )}
                            {errors['companions.*'] && (
                                <p className="mt-1.5 text-xs text-error">
                                    <span className="text-error/70">// erro:</span> {errors['companions.*']}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={addCompanion}
                                className="mt-2 flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                adicionar acompanhante
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="field-item pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-accent/10 border border-accent/30 hover:bg-accent/20 hover:border-accent/50 text-accent rounded px-4 py-3 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <LoaderCircle className="w-4 h-4 animate-spin" />
                                    {'>'} enviando...
                                </>
                            ) : (
                                <>
                                    {'>'} confirmar presenca
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
