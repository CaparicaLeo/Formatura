import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-bg text-text">
            <nav className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <div className="flex h-12 items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-accent hover:text-accent/80 transition-colors">
                                ~
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className={`transition-colors ${
                                    route().current('dashboard')
                                        ? 'text-text'
                                        : 'text-text-muted hover:text-text'
                                }`}
                            >
                                dashboard
                            </Link>
                        </div>

                        <div className="flex items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="text-text-muted hover:text-text transition-colors text-sm">
                                        {user.name} <span className="text-accent ml-1">█</span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        logout
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-border bg-surface">
                    <div className="mx-auto max-w-7xl px-6 md:px-12 py-4">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
