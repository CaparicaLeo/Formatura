import { Link } from '@inertiajs/react';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="px-6 md:px-12 py-12 border-t border-border">
            <div className="max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-text-muted">
                    <div className="flex items-center gap-2">
                        <span className="text-accent">©</span> 2027 Leonardo Caparica
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="mailto:leobcalmeida@gmail.com"
                            className="flex items-center gap-1.5 hover:text-accent transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            leobcalmeida@gmail.com
                        </a>
                        <Link
                            href="https://blog-do-capa.vercel.app/"
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                            blog <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
