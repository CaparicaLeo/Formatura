export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-bg text-text">
            <div className="mx-auto max-w-3xl">
                {children}
            </div>
        </div>
    );
}
