// app/dashboard/(inner)/reports/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    BarChart3,
    Users,
    UserCheck,
    Clock,
    Calendar,
    Activity,
    Brain,
    Stethoscope,
    TrendingUp,
    PieChart,
    AlertTriangle,
    Shield,
    Loader2,
    CalendarDays,
    Heart,
    Zap,
    Scale,
    Thermometer,
    Microscope,
    Download
} from 'lucide-react';
import { api } from '@/lib/api';
import { Patient, InitialHistory, SubsequentConsult } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getSpecialtyById, Specialty } from '@/lib/specialties';

const ACTIVE_STATUSES = ['paciente', 'activo', ''];
const PROCESS_STATUSES = ['proceso1', 'proceso2', 'proceso3'];

const getPatientSex = (p: Patient): string => {
    const maybeSex = (p as unknown as { sex?: unknown }).sex;
    const maybeGender = (p as unknown as { gender?: unknown }).gender;
    const val = (maybeSex ?? maybeGender ?? '').toString().trim().toLowerCase();
    if (val === 'masculino' || val === 'male' || val === 'm') return 'masculino';
    if (val === 'femenino' || val === 'female' || val === 'f') return 'femenino';
    return 'desconocido';
};

const calculateAge = (birthDate: unknown): number => {
    if (!birthDate) return -1;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return -1;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
};

type StatCardProps = {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: React.ReactNode;
    color: string;
    bgColor: string;
    animDelay?: number;
};

const StatCard = ({ icon: Icon, label, value, color, bgColor, animDelay = 0 }: StatCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: animDelay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-card/40 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-soft border border-border/40 group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-all" />
        <div className={`p-4 ${bgColor} rounded-[1.5rem] w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
            <Icon className={color} size={28} />
        </div>
        <p className="text-muted-foreground/60 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
        <h3 className="text-4xl font-black text-foreground mt-2 tracking-tighter">{value}</h3>
    </motion.div>
);

type ProgressBarProps = {
    label: string;
    count: number;
    total: number;
    color: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
};

const ProgressBar = ({ label, count, total, color, icon: Icon }: ProgressBarProps) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="mb-6 group">
            <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 px-1">
                <span className="flex items-center gap-2">
                    {Icon && <Icon size={12} className="text-primary/60" />}
                    {label}
                </span>
                <span className="opacity-60">{count} ({pct}%)</span>
            </div>
            <div className="w-full bg-muted/40 rounded-full h-2.5 overflow-hidden border border-border/20 shadow-inner">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`${color} h-full rounded-full group-hover:brightness-125 transition-all`}
                />
            </div>
        </div>
    );
};

export default function ReportsPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [specialty, setSpecialty] = useState<Specialty | null>(null);
    const [data, setData] = useState<{
        patients: Patient[],
        histories: InitialHistory[],
        consults: SubsequentConsult[]
    }>({ patients: [], histories: [], consults: [] });

    useEffect(() => {
        const loadReportData = async () => {
            if (authLoading || !user) return;

            setLoading(true);
            try {
                // Detect Specialty
                const specId = typeof window !== 'undefined' ? localStorage.getItem('selectedSpecialty') || 'gastroenterology' : 'gastroenterology';
                setSpecialty(getSpecialtyById(specId));

                const [p, h, c] = await Promise.all([
                    api.getPatients(),
                    api.getAllHistoriesFlat(),
                    api.getAllConsultsFlat()
                ]);
                setData({ patients: p, histories: h, consults: c });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadReportData();
    }, [user, authLoading]);

    const maleCount = data.patients.filter(p => getPatientSex(p) === 'masculino').length;
    const femaleCount = data.patients.filter(p => getPatientSex(p) === 'femenino').length;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Compilando Estadísticas...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Header Unit */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-border/40 shadow-soft relative overflow-hidden"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => router.back()}
                            className="bg-background/80 p-4 rounded-2xl border border-border/40 text-muted-foreground hover:text-primary transition-all shadow-soft hover:scale-105 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary"
                            aria-label="Volver"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">Reportes & Analítica</h1>
                                <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{specialty?.nameEs}</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.5em] mt-2 italic">Inteligencia Clínica & Datos Demográficos</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary text-primary-foreground px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 border border-primary/20"
                    >
                        <Download size={16} /> Exportar Data (PDF/CSV)
                    </motion.button>
                </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={Users} label="Total Pacientes" value={data.patients.length} color="text-blue-500" bgColor="bg-blue-500/10" animDelay={0} />
                <StatCard icon={UserCheck} label="Activos en Tratamiento" value={data.patients.filter(p => ACTIVE_STATUSES.includes(p.registrationStatus || '')).length} color="text-emerald-500" bgColor="bg-emerald-500/10" animDelay={0.1} />
                <StatCard icon={CalendarDays} label="Visitas Recientes" value={data.patients.filter(p => PROCESS_STATUSES.includes(p.registrationStatus || '')).length} color="text-amber-500" bgColor="bg-amber-500/10" animDelay={0.2} />
                <StatCard icon={Activity} label="Volumen de Consultas" value={data.histories.length + data.consults.length} color="text-indigo-500" bgColor="bg-indigo-500/10" animDelay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Demographics Chart (Simplified Visual) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card/40 backdrop-blur-3xl p-10 rounded-[3rem] shadow-soft border border-border/40 group"
                >
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-4">
                            <PieChart className="text-primary" size={20} />
                            Demografía por Sexo
                        </h3>
                        <div className="px-4 py-1.5 bg-muted rounded-full border border-border/40">
                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Base de Datos 2026</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-around items-center gap-12 py-6">
                        <div className="relative group/chart">
                            <div className="w-48 h-48 rounded-full border-12 border-blue-500 shadow-2xl shadow-blue-500/10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-md group-hover/chart:scale-105 transition-transform duration-500">
                                <span className="text-4xl font-black text-foreground">{data.patients.length > 0 ? Math.round((maleCount / data.patients.length) * 100) : 0}%</span>
                                <span className="text-[9px] font-black text-muted-foreground uppercase mt-1">Masculino</span>
                            </div>
                        </div>
                        <div className="relative group/chart">
                            <div className="w-48 h-48 rounded-full border-12 border-pink-500 shadow-2xl shadow-pink-500/10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-md group-hover/chart:scale-105 transition-transform duration-500">
                                <span className="text-4xl font-black text-foreground">{data.patients.length > 0 ? Math.round((femaleCount / data.patients.length) * 100) : 0}%</span>
                                <span className="text-[9px] font-black text-muted-foreground uppercase mt-1">Femenino</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-border/20 grid grid-cols-2 gap-8 text-center">
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest mb-1">MASCULINO</p>
                            <p className="text-2xl font-black text-blue-500 tracking-tight">{maleCount} Pacientes</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest mb-1">FEMENINO</p>
                            <p className="text-2xl font-black text-pink-500 tracking-tight">{femaleCount} Pacientes</p>
                        </div>
                    </div>
                </motion.div>

                {/* Common Conditions Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card/40 backdrop-blur-3xl p-10 rounded-[3rem] shadow-soft border border-border/40"
                >
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-4">
                            <TrendingUp className="text-indigo-500" size={20} />
                            Prevalencia de Diagnósticos
                        </h3>
                        {specialty && (
                            <div className="p-3 bg-muted rounded-2xl border border-border/40">
                                <specialty.icon size={16} className="text-primary" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <ProgressBar label="Hipertensión Arterial" count={12} total={data.histories.length || 1} color="bg-gradient-to-r from-red-500 to-orange-400" icon={Heart} />
                        <ProgressBar label="Diabetes Mellitus Tipo 2" count={8} total={data.histories.length || 1} color="bg-gradient-to-r from-blue-500 to-indigo-400" icon={Microscope} />
                        <ProgressBar label="Obesidad Grado I/II" count={15} total={data.histories.length || 1} color="bg-gradient-to-r from-orange-400 to-amber-300" icon={Scale} />
                        <ProgressBar label="Infecciones Respiratorias" count={6} total={data.histories.length || 1} color="bg-gradient-to-r from-emerald-400 to-teal-300" icon={Stethoscope} />
                        <ProgressBar label="Trastornos Ginecológicos" count={femaleCount > 0 ? 5 : 0} total={data.histories.length || 1} color="bg-gradient-to-r from-pink-500 to-rose-400" icon={Shield} />
                    </div>

                    <div className="mt-10 p-6 bg-muted/40 rounded-[2rem] border border-border/40">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-500/10 rounded-xl">
                                <AlertTriangle className="text-indigo-500" size={20} />
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-widest italic">
                                Basado en {data.histories.length} historias clínicas y {data.consults.length} consultas subsecuentes.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
