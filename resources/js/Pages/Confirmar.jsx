import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Confirmar({ event }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        companions: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('confirmations.store'));
    };

    const addCompanion = () => {
        setData('companions', [...data.companions, '']);
    };

    const removeCompanion = (index) => {
        setData(
            'companions',
            data.companions.filter((_, i) => i !== index),
        );
    };

    const updateCompanion = (index, value) => {
        const updated = [...data.companions];
        updated[index] = value;
        setData('companions', updated);
    };

    return (
        <GuestLayout>
            <Head title="Confirmar Presença" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    {event.graduate_name}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Convidamos você para celebrar a nossa formatura!
                </p>
            </div>

            <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="space-y-2 text-sm text-gray-700">
                    <p>
                        <span className="font-semibold">Colação:</span>{' '}
                        {event.ceremony_date}
                    </p>
                    <p>
                        <span className="font-semibold">Baile:</span>{' '}
                        {event.ball_date}
                    </p>
                    <p>
                        <span className="font-semibold">Local:</span>{' '}
                        {event.location}
                    </p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Seu nome" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Seu email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Telefone (opcional)" />
                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Acompanhantes (opcional)" />
                    {data.companions.map((companion, index) => (
                        <div key={index} className="mt-2 flex items-center gap-2">
                            <TextInput
                                value={companion}
                                className="block w-full"
                                placeholder={`Acompanhante ${index + 1}`}
                                onChange={(e) =>
                                    updateCompanion(index, e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => removeCompanion(index)}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                    {errors.companions && (
                        <InputError
                            message={errors.companions}
                            className="mt-2"
                        />
                    )}
                    {errors['companions.*'] && (
                        <InputError
                            message={errors['companions.*']}
                            className="mt-2"
                        />
                    )}
                    <button
                        type="button"
                        onClick={addCompanion}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        + Adicionar acompanhante
                    </button>
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Confirmar Presença
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
