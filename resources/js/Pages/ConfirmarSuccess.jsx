import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function ConfirmarSuccess() {
    return (
        <GuestLayout>
            <Head title="Presença Confirmada" />

            <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Presença Confirmada!
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    Sua presença foi registrada com sucesso. Estamos felizes em
                    contar com você!
                </p>

                <div className="mt-6">
                    <Link
                        href={route('confirmations.index')}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        Voltar para a página inicial
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
