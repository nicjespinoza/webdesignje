"use client";

// ============================================================
// Portal Multi-Especialidad — Selección de Especialidad + Login
// Flujo: Categorías → Especialidades → Login
// ============================================================

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, Brain, Apple, Droplets, Wind, TestTubes, Bone, Bug, Scissors,
    Baby, Eye, Fingerprint, Ear, HeartPulse, Scan, Smile, Sparkles, Pin,
    Component, Layers, Zap, Ribbon, Droplet,
    Search, ArrowLeft, Lock, Mail, ChevronRight, Loader2,
    Stethoscope, Activity, Shield, EyeOff, Eye as EyeIcon,
    LogIn, Building2
} from 'lucide-react';

import { SPECIALTIES, CATEGORIES, Specialty, SpecialtyCategory } from '@/lib/specialties';

// Icon map helper for dynamic rendering
const getIcon = (spec: any) => spec.icon;

// Helper component for rendering dynamic icons
function DynamicIcon({ icon: Icon, className, style }: { icon: any; className?: string; style?: React.CSSProperties }) {
    return <Icon className={className} style={style} />;
}

type PortalStep = 'categories' | 'specialties' | 'login';

export default function SpecialtyPortalPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [step, setStep] = useState<PortalStep>('categories');
    const [selectedCategory, setSelectedCategory] = useState<SpecialtyCategory | null>(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Redirect authenticated users to dashboard
    useEffect(() => {
        if (!authLoading && user) {
            router.push('/dashboard');
        }
    }, [user, authLoading, router]);

    const filteredSpecialties = useMemo(() => {
        const base = selectedCategory
            ? SPECIALTIES.filter(s => s.category === selectedCategory)
            : SPECIALTIES;
        if (!searchQuery.trim()) return base;
        const q = searchQuery.toLowerCase();
        return base.filter(s => s.nameEs.toLowerCase().includes(q) || s.descriptionEs.toLowerCase().includes(q));
    }, [searchQuery, selectedCategory]);

    const handleSelectCategory = useCallback((catId: SpecialtyCategory) => {
        setSelectedCategory(catId);
        setStep('specialties');
        setSearchQuery('');
    }, []);

    const handleSelectSpecialty = useCallback((spec: Specialty) => {
        setSelectedSpecialty(spec);
        setStep('login');
    }, []);

    const handleBack = useCallback(() => {
        if (step === 'login') { setStep('specialties'); setLoginError(''); }
        else if (step === 'specialties') { setStep('categories'); setSelectedCategory(null); setSearchQuery(''); }
    }, [step]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !selectedSpecialty) return;
        setIsLoading(true);
        setLoginError('');
        try {
            // Authenticate with Firebase
            const credential = await signInWithEmailAndPassword(auth, email, password);

            // Save selected specialty to localStorage for quick access
            localStorage.setItem('selectedSpecialty', selectedSpecialty.id);
            localStorage.setItem('selectedSpecialtyName', selectedSpecialty.nameEs);

            // Persist specialty selection to user's Firestore document
            try {
                await setDoc(doc(db, 'users', credential.user.uid), {
                    specialtyId: selectedSpecialty.id,
                    specialtyName: selectedSpecialty.nameEs,
                    specialtyCategory: selectedSpecialty.category,
                    lastLogin: new Date().toISOString(),
                    email: credential.user.email,
                }, { merge: true });
            } catch (firestoreErr) {
                // Non-blocking: specialty is already in localStorage
                console.warn('Could not save specialty to Firestore:', firestoreErr);
            }

            router.push('/dashboard');
        } catch (err: any) {
            setLoginError(
                err?.code === 'auth/invalid-credential'
                    ? 'Credenciales inválidas. Verifica tu email y contraseña.'
                    : err?.code === 'auth/too-many-requests'
                        ? 'Demasiados intentos. Intenta más tarde.'
                        : err?.code === 'auth/user-not-found'
                            ? 'No se encontró una cuenta con este correo.'
                            : err?.code === 'auth/wrong-password'
                                ? 'Contraseña incorrecta.'
                                : `Error al iniciar sesión: ${err.message || 'Intenta de nuevo.'}`
            );
        } finally {
            setIsLoading(false);
        }
    };

    const categoryForSpec = selectedCategory
        ? CATEGORIES.find(c => c.id === selectedCategory) : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/[0.02] to-indigo-500/[0.02] rounded-full blur-3xl" />
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }} />
            </div>

            <motion.div
                className="w-full max-w-5xl relative z-10"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                    >
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300 font-medium">Portal Multi-Especialidad</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Historia Clínica{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                            Inteligente
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
                        Selecciona tu especialidad para acceder a un formulario clínico adaptado a tu práctica
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {/* ========== STEP 1: CATEGORIES ========== */}
                    {step === 'categories' && (
                        <motion.div key="cat" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3 }}>
                            {/* Search */}
                            <div className="max-w-md mx-auto mb-8">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text" value={searchQuery}
                                        onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setStep('specialties'); }}
                                        placeholder="Buscar especialidad..."
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 backdrop-blur-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* Category Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {CATEGORIES.map((cat, i) => {
                                    const count = SPECIALTIES.filter(s => s.category === cat.id).length;
                                    return (
                                        <motion.button
                                            key={cat.id} onClick={() => handleSelectCategory(cat.id)}
                                            className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm transition-all duration-300 text-left"
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                            whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
                                                <DynamicIcon icon={cat.icon} className="w-6 h-6" style={{ color: cat.color }} />
                                            </div>
                                            <h3 className="text-white font-semibold text-sm mb-1">{cat.nameEs}</h3>
                                            <p className="text-slate-500 text-xs">{count} especialidad{count !== 1 ? 'es' : ''}</p>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* ========== STEP 2: SPECIALTIES ========== */}
                    {step === 'specialties' && (
                        <motion.div key="spec" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                            <div className="flex items-center gap-3 mb-6 flex-wrap">
                                <button onClick={handleBack}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm">
                                    <ArrowLeft className="w-4 h-4" /> Categorías
                                </button>
                                {categoryForSpec && (
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium"
                                        style={{ borderColor: `${categoryForSpec.color}40`, color: categoryForSpec.color, backgroundColor: `${categoryForSpec.color}10` }}>
                                        <DynamicIcon icon={categoryForSpec.icon} className="w-4 h-4" />
                                        {categoryForSpec.nameEs}
                                    </div>
                                )}
                                <div className="flex-1 min-w-[140px]">
                                    <div className="relative max-w-xs ml-auto">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                            placeholder="Filtrar..." className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm transition-all" />
                                    </div>
                                </div>
                            </div>

                            {filteredSpecialties.length === 0 ? (
                                <div className="text-center py-16 text-slate-500">
                                    <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                    <p>No se encontraron especialidades</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {filteredSpecialties.map((spec, i) => {
                                        return (
                                            <motion.button key={spec.id} onClick={() => handleSelectSpecialty(spec)}
                                                className="group relative flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm transition-all duration-200 text-left"
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                                                whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                                    style={{ backgroundColor: `${spec.color}15`, border: `1px solid ${spec.color}30` }}>
                                                    <DynamicIcon icon={spec.icon} className="w-5 h-5" style={{ color: spec.color }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-medium text-sm truncate">{spec.nameEs}</h4>
                                                    <p className="text-slate-500 text-xs truncate">{spec.descriptionEs}</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ========== STEP 3: LOGIN ========== */}
                    {step === 'login' && selectedSpecialty && (
                        <motion.div key="login" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3 }} className="max-w-md mx-auto">
                            <button onClick={handleBack}
                                className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm">
                                <ArrowLeft className="w-4 h-4" /> Elegir otra especialidad
                            </button>

                            {/* Selected specialty card */}
                            <div className="p-4 rounded-xl mb-6 border backdrop-blur-sm"
                                style={{ backgroundColor: `${selectedSpecialty.color}08`, borderColor: `${selectedSpecialty.color}25` }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${selectedSpecialty.color}15`, border: `1px solid ${selectedSpecialty.color}30` }}>
                                        <DynamicIcon icon={selectedSpecialty.icon} className="w-6 h-6" style={{ color: selectedSpecialty.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{selectedSpecialty.nameEs}</h3>
                                        <p className="text-slate-400 text-xs">{selectedSpecialty.descriptionEs}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Login card */}
                            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <LogIn className="w-5 h-5 text-cyan-400" />
                                    <h2 className="text-white font-semibold text-lg">Iniciar Sesión</h2>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                                            Correo electrónico
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                                placeholder="doctor@clinica.com"
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
                                                required autoComplete="email" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                                            Contraseña
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input type={showPassword ? 'text' : 'password'} value={password}
                                                onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                                                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
                                                required autoComplete="current-password" />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {loginError && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                {loginError}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.button type="submit" disabled={isLoading || !email || !password}
                                        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                                        style={{ background: `linear-gradient(135deg, ${selectedSpecialty.color}, ${selectedSpecialty.color}CC)` }}
                                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        {isLoading ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Verificando...</>
                                        ) : (
                                            <><LogIn className="w-4 h-4" /> Ingresar como {selectedSpecialty.nameEs}</>
                                        )}
                                    </motion.button>
                                </form>

                                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                                    <p className="text-slate-500 text-xs">
                                        ¿No tienes cuenta?{' '}
                                        <button onClick={() => router.push('/auth')} className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                                            Registrarse
                                        </button>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-4 text-slate-600 text-xs">
                                <Shield className="w-3.5 h-3.5" />
                                <span>Conexión cifrada con SSL · Firebase Auth · HIPAA Ready</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-slate-600 text-xs">
                        © {new Date().getFullYear()} Historia Clínica Inteligente · Powered by WebDesignJE
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
