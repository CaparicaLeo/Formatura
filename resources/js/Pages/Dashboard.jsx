import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, UserPlus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Dashboard({ confirmations, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-sm text-text">
                    <span className="text-accent">{'>'}</span> dashboard <span className="text-text-muted">// admin</span>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="border border-border rounded p-5 bg-surface">
                            <div className="flex items-center gap-2 mb-2">
                                <UserPlus className="w-4 h-4 text-accent" />
                                <span className="text-xs text-text-muted">confirmacoes</span>
                            </div>
                            <p className="text-2xl font-bold text-text">{stats.total_confirmations}</p>
                        </div>
                        <div className="border border-border rounded p-5 bg-surface">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-accent" />
                                <span className="text-xs text-text-muted">total de pessoas</span>
                            </div>
                            <p className="text-2xl font-bold text-text">{stats.total_people}</p>
                        </div>
                        <div className="border border-border rounded p-5 bg-surface">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-accent" />
                                <span className="text-xs text-text-muted">datas</span>
                            </div>
                            <p className="text-sm text-text">{stats.ceremony_date}</p>
                            <p className="text-xs text-text-muted mt-1">baile: {stats.ball_date}</p>
                        </div>
                    </div>

                    {/* Confirmations table */}
                    <div className="border border-border rounded bg-surface">
                        <div className="p-5 border-b border-border">
                            <h3 className="text-sm text-text">
                                <span className="text-accent">//</span> confirmados
                            </h3>
                        </div>

                        <div className="p-5">
                            {confirmations.data.length === 0 ? (
                                <p className="text-sm text-text-muted">nenhuma confirmacao ainda.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-xs text-text-muted border-b border-border">
                                                <th className="pb-3 font-medium">nome</th>
                                                <th className="pb-3 font-medium">email</th>
                                                <th className="pb-3 font-medium">telefone</th>
                                                <th className="pb-3 font-medium">acompanhantes</th>
                                                <th className="pb-3 font-medium">confirmado em</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {confirmations.data.map((c) => (
                                                <tr key={c.id} className="text-text">
                                                    <td className="py-3 pr-4">{c.name}</td>
                                                    <td className="py-3 pr-4 text-text-muted">{c.email}</td>
                                                    <td className="py-3 pr-4 text-text-muted">{c.phone || '-'}</td>
                                                    <td className="py-3 pr-4 text-text-muted">
                                                        {c.companions?.length > 0
                                                            ? c.companions.join(', ')
                                                            : '-'}
                                                    </td>
                                                    <td className="py-3 text-text-muted">
                                                        {new Date(
                                                            c.confirmed_at || c.created_at,
                                                        ).toLocaleDateString('pt-BR')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination */}
                            {confirmations.last_page > 1 && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                                    {confirmations.prev_page_url ? (
                                        <Link
                                            href={confirmations.prev_page_url}
                                            className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:border-accent/30 hover:text-accent transition-colors text-text-muted"
                                        >
                                            <ChevronLeft className="w-3 h-3" /> anterior
                                        </Link>
                                    ) : (
                                        <span className="px-2 py-1 text-text-muted/30">
                                            <ChevronLeft className="w-3 h-3" />
                                        </span>
                                    )}
                                    <span className="text-text-muted px-2">
                                        {confirmations.current_page}/{confirmations.last_page}
                                    </span>
                                    {confirmations.next_page_url ? (
                                        <Link
                                            href={confirmations.next_page_url}
                                            className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:border-accent/30 hover:text-accent transition-colors text-text-muted"
                                        >
                                            proxima <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    ) : (
                                        <span className="px-2 py-1 text-text-muted/30">
                                            <ChevronRight className="w-3 h-3" />
                                        </span>
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
