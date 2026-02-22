"use client";

// ============================================================
// Staff Portal Screen - Dr. Milton Mairena Valle
// Adaptado de src/screens/auth/StaffPortalScreen.tsx para Next.js
// ============================================================

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Stethoscope, Users, User, Lock, MapPin, AlertTriangle, ChevronRight, Loader2, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function StaffPortalPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <StaffPortalScreen />
        </Suspense>
    );
}

function StaffPortalScreen() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [accessStatus, setAccessStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');
    const [clientIp, setClientIp] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');

    // Login State
    const [selectedRole, setSelectedRole] = useState<'doctor' | 'assistant' | null>(null);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        try {
            // Simulación de verificación de IP
            await new Promise(resolve => setTimeout(resolve, 2000));
            setAccessStatus('allowed');
            setClientIp('192.168.1.100');
        } catch (error) {
            console.error('Error verifying access:', error);
            setAccessStatus('denied');
            setClientIp('Unknown');
            setErrorMsg('Acceso no autorizado');
        }
    };

    const handleRoleSelect = (role: 'doctor' | 'assistant') => {
        if (accessStatus !== 'allowed') return;
        if (selectedRole === role) {
            setSelectedRole(null);
        } else {
            setSelectedRole(role);
            setEmail('');
            setPass('');
            setLoginError('');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (selectedRole === 'doctor') {
                router.push('/dashboard');
            } else if (selectedRole === 'assistant') {
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error(err);
            setLoginError('Credenciales inválidas');
        } finally {
            setIsLoggingIn(false);
        }
    };

    if (accessStatus === 'loading') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Validando acceso</h2>
                <p className="text-gray-500">Verificando conexión segura...</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium">
                    <Shield size={16} className="text-gray-400" />
                    <span className="relative inline-block">
                        <span className="invisible">Conexión Segura TLS 1.3</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-green-600 bg-clip-text text-transparent">
                            Conexión Segura TLS 1.3
                        </span>
                    </span>
                </div>
            </div>
        );
    }

    if (accessStatus === 'denied') {
        return (
            <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-red-600 p-6 text-center">
                        <Shield size={48} className="text-white mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-white">Acceso Restringido</h1>
                    </div>
                    <div className="p-8 text-center space-y-6">
                        <div className="bg-red-50 text-red-800 p-4 rounded-xl flex items-start gap-3 text-left">
                            <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-bold text-sm">Acceso no autorizado</p>
                                <p className="text-xs mt-1">IP no autorizada: {clientIp}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">Uso exclusivo del personal autorizado</p>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Salir
                        </button>
                        <div className="pt-6 border-t border-gray-100 flex justify-center gap-4 text-xs text-gray-400">
                            <span>ID: {clientIp || 'Unknown'}</span>
                            <span>•</span>
                            <span>V 2.0.1</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Brand/Image */}
            <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col bg-white relative overflow-hidden min-h-screen">
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-500 hover:text-[#083c79] transition-colors p-2 rounded-lg hover:bg-gray-50"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium text-sm">Regresar</span>
                </button>

                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50 z-0"></div>

                <div className="z-10 relative w-full max-w-lg mx-auto flex flex-col h-full">
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <img
                            src="https://static.wixstatic.com/media/3743a7_bc65d6328e9c443e95b330a92181fbc8~mv2.png/v1/crop/x_13,y_9,w_387,h_61/fill/w_542,h_85,al_c,lg_1,q_85,enc_avif,quality_auto/logo-drmairenavalle.png"
                            alt="Dr. Milton Mairena Valle"
                            className="h-20 md:h-28 w-auto object-contain"
                        />
                    </div>

                    <div className="pb-8 lg:pb-12 flex flex-col items-center space-y-6">
                        <div className="flex items-center gap-3 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-6 py-3 rounded-full shadow-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <Shield size={16} />
                            <span>Conexión Segura: {clientIp}</span>
                        </div>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#083c79] to-transparent opacity-20"></div>
                        <div className="text-center space-y-1">
                            <p className="text-sm text-gray-400 font-medium tracking-wide">
                                © 2026 Todos los derechos reservados
                            </p>
                            <p className="text-xs text-gray-300">
                                v2.0.1 • Conexión Segura
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Role Selection */}
            <div className="lg:w-1/2 bg-[#083c79] p-6 lg:p-12 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/4"></div>
                </div>

                <div className="max-w-md w-full space-y-8 relative z-10">
                    <div className="text-center lg:text-left mb-8">
                        <h3 className="text-xl font-bold text-white">Seleccionar Perfil</h3>
                    </div>

                    <div className="space-y-4">
                        {/* Doctor Card */}
                        <RoleCard
                            role="doctor"
                            title="Personal Médico"
                            subtitle="Acceso para doctores y personal de salud"
                            icon={<Stethoscope size={28} />}
                            isSelected={selectedRole === 'doctor'}
                            onSelect={() => handleRoleSelect('doctor')}
                            color="blue"
                            children={selectedRole === 'doctor' && (
                                <LoginForm
                                    email={email} setEmail={setEmail}
                                    pass={pass} setPass={setPass}
                                    showPassword={showPassword} setShowPassword={setShowPassword}
                                    error={loginError} setError={setLoginError}
                                    loading={isLoggingIn}
                                    onSubmit={handleLogin}
                                    requiredEmail="dr@cenlae.com"
                                />
                            )}
                        />

                        {/* Assistant Card */}
                        <RoleCard
                            role="assistant"
                            title="Administración"
                            subtitle="Acceso para personal administrativo"
                            icon={<Users size={28} />}
                            isSelected={selectedRole === 'assistant'}
                            onSelect={() => handleRoleSelect('assistant')}
                            color="purple"
                            children={selectedRole === 'assistant' && (
                                <LoginForm
                                    email={email} setEmail={setEmail}
                                    pass={pass} setPass={setPass}
                                    showPassword={showPassword} setShowPassword={setShowPassword}
                                    error={loginError} setError={setLoginError}
                                    loading={isLoggingIn}
                                    onSubmit={handleLogin}
                                    requiredEmail="asistente@cenlae.com"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-components
interface RoleCardProps {
    role: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onSelect: () => void;
    children?: React.ReactNode;
    color: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, subtitle, icon, isSelected, onSelect, children, color }) => {
    return (
        <motion.div
            layout
            initial={false}
            animate={{
                backgroundColor: isSelected ? 'white' : 'white',
                scale: isSelected ? 1.02 : 1
            }}
            className={`w-full rounded-2xl overflow-hidden shadow-sm transition-all ${isSelected ? 'shadow-xl' : 'shadow-md border border-gray-200'}`}
        >
            <button
                onClick={onSelect}
                className="w-full p-6 text-left flex items-center gap-5 focus:outline-none"
            >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shrink-0 bg-${color}-50 text-${color}-600`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <h4 className={`text-lg font-bold transition-colors text-gray-900`}>{title}</h4>
                    <p className={`text-sm transition-colors text-gray-500`}>{subtitle}</p>
                </div>
                <ChevronRight className={`transition-transform duration-300 ${isSelected ? 'rotate-90 text-gray-400' : 'text-gray-400'}`} />
            </button>

            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 pt-0">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

interface LoginFormProps {
    email: string; setEmail: (v: string) => void;
    pass: string; setPass: (v: string) => void;
    showPassword: boolean; setShowPassword: (v: boolean) => void;
    error: string; setError: (v: string) => void;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    requiredEmail?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, setEmail, pass, setPass, showPassword, setShowPassword, error, setError, loading, onSubmit, requiredEmail }) => {
    const isValidEmail = !requiredEmail || email === requiredEmail;

    return (
        <form onSubmit={onSubmit} className="space-y-4 mt-2">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-medium border border-red-100 flex items-center gap-2">
                    <AlertTriangle size={14} />
                    {error}
                </div>
            )}

            <div className="space-y-3">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(''); }}
                        placeholder="Correo electrónico"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={pass}
                        onChange={e => { setPass(e.target.value); setError(''); }}
                        placeholder="Contraseña"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading || !isValidEmail}
                className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 mt-2
                    ${isValidEmail && !loading
                        ? 'bg-[#083c79] hover:bg-blue-900 text-white shadow-blue-900/20 active:scale-[0.98]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                `}
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : 'Ingresar al Portal'}
            </button>
            {!isValidEmail && email.length > 0 && (
                <p className="text-xs text-red-500 text-center mt-1">
                    Email requerido: {requiredEmail}
                </p>
            )}
        </form>
    );
};
