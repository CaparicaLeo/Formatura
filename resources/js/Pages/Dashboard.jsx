import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ confirmations, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <p className="text-sm font-medium text-gray-500">
                                    Confirmações
                                </p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">
                                    {stats.total_confirmations}
                                </p>
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <p className="text-sm font-medium text-gray-500">
                                    Total de Pessoas
                                </p>
                                <p className="mt-1 text-3xl font-semibold text-gray-900">
                                    {stats.total_people}
                                </p>
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <p className="text-sm font-medium text-gray-500">
                                    Colação
                                </p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    {stats.ceremony_date}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Baile: {stats.ball_date}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                Confirmados
                            </h3>

                            {confirmations.data.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    Nenhuma confirmação ainda.
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Nome
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Telefone
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Acompanhantes
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Confirmado em
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {confirmations.data.map(
                                                (confirmation) => (
                                                    <tr key={confirmation.id}>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                            {confirmation.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {confirmation.email}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {confirmation.phone ||
                                                                '-'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {confirmation
                                                                .companions
                                                                ?.length > 0
                                                                ? confirmation.companions.join(
                                                                      ', ',
                                                                  )
                                                                : '-'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {confirmation.confirmed_at
                                                                ? new Date(
                                                                      confirmation.confirmed_at,
                                                                  ).toLocaleDateString(
                                                                      'pt-BR',
                                                                  )
                                                                : '-'}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {confirmations.last_page > 1 && (
                                <div className="mt-4 flex justify-center gap-2">
                                    {confirmations.prev_page_url && (
                                        <Link
                                            href={confirmations.prev_page_url}
                                            className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Anterior
                                        </Link>
                                    )}
                                    <span className="px-3 py-1 text-sm text-gray-700">
                                        Página {confirmations.current_page} de{' '}
                                        {confirmations.last_page}
                                    </span>
                                    {confirmations.next_page_url && (
                                        <Link
                                            href={confirmations.next_page_url}
                                            className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Próxima
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
