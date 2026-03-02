import React from 'react';

const NEXT_DEV_URL = 'http://localhost:3000';

const App = () => {
    React.useEffect(() => {
        // En desarrollo usamos Next.js (medical-ai-demo). Si está corriendo,
        // redireccionamos automáticamente para que el equipo siempre vea la landing correcta.
        const timer = setTimeout(() => {
            window.location.replace(NEXT_DEV_URL);
        }, 250);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white text-center px-6">
            <h1 className="text-3xl font-bold mb-4">Portal principal movido a Next.js</h1>
            <p className="text-slate-300 max-w-xl mb-6">
                Ejecuta <code className="px-2 py-1 bg-white/10 rounded">cd medical-ai-demo && npm run dev</code> y accede a{' '}
                <a className="text-brand-cyan underline" href={NEXT_DEV_URL}>
                    {NEXT_DEV_URL}
                </a>{' '}
                para ver la landing <strong>medical-ai-demo/app/page.tsx</strong>.
            </p>
            <button
                onClick={() => window.location.replace(NEXT_DEV_URL)}
                className="px-6 py-3 bg-brand-indigo rounded-full font-semibold hover:bg-brand-purple transition"
            >
                Abrir Next.js
            </button>
        </div>
    );
};

export default App;
