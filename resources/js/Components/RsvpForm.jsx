import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, X, LoaderCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RsvpForm({ form, submit, addCompanion, removeCompanion, updateCompanion }) {
    const { data, setData, processing, errors } = form;
    const fieldsRef = useRef(null);

    useLayoutEffect(() => {
        if (!fieldsRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.field-item', {
                opacity: 0,
                y: 12,
                duration: 0.35,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: fieldsRef.current,
                    start: 'top 85%',
                },
            });
        }, fieldsRef);
        return () => ctx.revert();
    }, []);

    const inputClass = "w-full bg-input-bg border border-input-border rounded px-3 py-2 text-sm text-text placeholder:text-text-muted/40";
    const errorClass = "mt-1 text-xs text-error";

    return (
        <section className="px-6 md:px-12 pb-12">
            <div className="max-w-xl">
                <h2 className="text-sm text-text-muted mb-4">
                    <span className="text-accent">//</span> confirmar presenca
                </h2>

                <form onSubmit={submit}>
                    <div ref={fieldsRef} className="space-y-3">
                        {/* Nome + Email lado a lado no desktop */}
                        <div className="field-item grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="name" className="block text-xs text-text-muted mb-1">
                                    nome <span className="text-error">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={inputClass}
                                    placeholder="seu nome"
                                    required
                                />
                                {errors.name && (
                                    <p className={errorClass}>{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs text-text-muted mb-1">
                                    email <span className="text-error">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={inputClass}
                                    placeholder="voce@email.com"
                                    required
                                />
                                {errors.email && (
                                    <p className={errorClass}>{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Telefone */}
                        <div className="field-item">
                            <label htmlFor="phone" className="block text-xs text-text-muted mb-1">
                                telefone <span className="text-text-muted/40">(opcional)</span>
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className={inputClass}
                                placeholder="(00) 00000-0000"
                            />
                            {errors.phone && (
                                <p className={errorClass}>{errors.phone}</p>
                            )}
                        </div>

                        {/* Acompanhantes */}
                        <div className="field-item">
                            <label className="block text-xs text-text-muted mb-1">
                                acompanhantes <span className="text-text-muted/40">(opcional)</span>
                            </label>
                            {data.companions.map((companion, index) => (
                                <div key={index} className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xs text-text-muted/40 w-3">#{index + 1}</span>
                                    <input
                                        value={companion}
                                        onChange={(e) => updateCompanion(index, e.target.value)}
                                        className="flex-1 bg-input-bg border border-input-border rounded px-3 py-1.5 text-sm text-text placeholder:text-text-muted/40"
                                        placeholder={`acompanhante ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCompanion(index)}
                                        className="text-text-muted hover:text-error transition-colors p-0.5"
                                        aria-label={`Remover acompanhante ${index + 1}`}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            {errors.companions && (
                                <p className={errorClass}>{errors.companions}</p>
                            )}
                            {errors['companions.*'] && (
                                <p className={errorClass}>{errors['companions.*']}</p>
                            )}
                            <button
                                type="button"
                                onClick={addCompanion}
                                className="mt-1 flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                            >
                                <Plus className="w-3 h-3" />
                                adicionar acompanhante
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="field-item mt-5">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-accent/10 border border-accent/30 hover:bg-accent/20 hover:border-accent/50 text-accent rounded px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
