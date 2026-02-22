"use client";

// ============================================================
// Portal de Acceso Original - Dr. Milton Mairena Valle
// Basado en el AuthPage.tsx y LoginScreen.tsx original
// ============================================================

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AuthPortal() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <AuthPortalContent />
        </Suspense>
    );
}

function AuthPortalContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState<{ email: string; role?: string } | null>(null);

    useEffect(() => {
        if (currentUser) {
            // Check roles or user data in Firestore later
            // For now, redirect to main app
            router.push('/dashboard');
        }
    }, [currentUser, router]);

    const handlePatientAccess = () => {
        router.push('/patient/login');
    };

    const roleParam = searchParams.get('role');
    // Map URL param to LoginScreen props
    const initialRole = (roleParam === 'doctor' || roleParam === 'assistant') ? roleParam : undefined;

    const getRoleTitle = () => {
        if (initialRole === 'doctor') return 'Personal Médico';
        if (initialRole === 'assistant') return 'Administración';
        return 'Acceso al Sistema';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Aquí iría la lógica de autenticación
            // await signIn(email, pass);
            console.log('Login attempt:', { email, role: initialRole });
            // Simulación de login exitoso
            setCurrentUser({ email, role: initialRole });
        } catch (err: any) {
            console.error(err);
            setError('Error al iniciar sesión: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cenlae-primary p-4 font-sans relative overflow-hidden">
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">

                    <div className="text-center mb-10">
                        <img
                            src="https://static.wixstatic.com/media/3743a7_bc65d6328e9c443e95b330a92181fbc8~mv2.png/v1/crop/x_13,y_9,w_387,h_61/fill/w_542,h_85,al_c,lg_1,q_85,enc_avif,quality_auto/logo-drmairenavalle.png"
                            alt="Dr. Milton Mairena Valle"
                            className="h-16 md:h-20 w-auto mx-auto object-contain mb-4"
                        />
                        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                            {getRoleTitle()}
                        </h2>
                        <p className="text-gray-600 text-sm mt-2">
                            {initialRole === 'doctor' ? 'Acceso exclusivo para personal médico' : 'Acceso al sistema'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Correo electrónico"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder="Contraseña"
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-lg"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handlePatientAccess}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        >
                            ¿Eres paciente? Accede aquí
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Acceso seguro mediante IP autorizada
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
