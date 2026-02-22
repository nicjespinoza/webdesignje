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
    Loader2
} from 'lucide-react';
import { api } from '@/lib/api';
import { Patient, InitialHistory, SubsequentConsult } from '@/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ACTIVE_STATUSES = ['paciente', 'activo', ''];
const PROCESS_STATUSES = ['proceso1', 'proceso2', 'proceso3'];

const getPatientSex = (p: any): string => {
    const val = (p.sex || p.gender || '').toString().trim().toLowerCase();
    if (val === 'masculino' || val === 'male' || val === 'm') return 'masculino';
    if (val === 'femenino' || val === 'female' || val === 'f') return 'femenino';
    return 'desconocido';
};

const calculateAge = (birthDate: any): number => {
    if (!birthDate) return -1;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return -1;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
};

const StatCard = ({ icon: Icon, label, value, color, bgColor, animDelay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animDelay }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
        <div className={`p-3 ${bgColor} rounded-xl w-fit mb-4`}>
            <Icon className={color} size={24} />
        </div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
    </motion.div>
);

const ProgressBar = ({ label, count, total, color }: any) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="mb-4">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>{label}</span>
                <span>{count} ({pct}%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    className={`${color} h-2 rounded-full`}
                />
            </div>
        </div>
    );
};

export default function ReportsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{
        patients: Patient[],
        histories: InitialHistory[],
        consults: SubsequentConsult[]
    }>({ patients: [], histories: [], consults: [] });

    useEffect(() => {
        const loadReportData = async () => {
            try {
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
    }, []);

    const maleCount = data.patients.filter(p => getPatientSex(p) === 'masculino').length;
    const femaleCount = data.patients.filter(p => getPatientSex(p) === 'femenino').length;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#084286]" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="bg-white p-3 rounded-xl border shadow-sm"><ArrowLeft /></button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <BarChart3 className="text-[#084286]" /> Reportes y Analítica
                        </h1>
                        <p className="text-gray-500">Resumen clínico y demográfico del centro</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={Users} label="Total Pacientes" value={data.patients.length} color="text-blue-600" bgColor="bg-blue-50" />
                    <StatCard icon={UserCheck} label="Activos" value={data.patients.filter(p => ACTIVE_STATUSES.includes(p.registrationStatus || '')).length} color="text-green-600" bgColor="bg-green-50" />
                    <StatCard icon={Clock} label="En Proceso" value={data.patients.filter(p => PROCESS_STATUSES.includes(p.registrationStatus || '')).length} color="text-amber-600" bgColor="bg-amber-50" />
                    <StatCard icon={Activity} label="Total Consultas" value={data.histories.length + data.consults.length} color="text-purple-600" bgColor="bg-purple-50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><PieChart className="text-blue-500" /> Distribución por Sexo</h3>
                        <div className="flex justify-around items-center">
                            <div className="text-center">
                                <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center font-bold text-xl mb-2">
                                    {data.patients.length > 0 ? Math.round((maleCount / data.patients.length) * 100) : 0}%
                                </div>
                                <p className="font-bold text-gray-700">Masculino</p>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-24 rounded-full border-8 border-pink-500 flex items-center justify-center font-bold text-xl mb-2">
                                    {data.patients.length > 0 ? Math.round((femaleCount / data.patients.length) * 100) : 0}%
                                </div>
                                <p className="font-bold text-gray-700">Femenino</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-indigo-500" /> Diagnósticos Comunes</h3>
                        <div className="space-y-4">
                            <ProgressBar label="Hipertensión" count={12} total={data.histories.length} color="bg-red-500" />
                            <ProgressBar label="Diabetes Tipo 2" count={8} total={data.histories.length} color="bg-blue-500" />
                            <ProgressBar label="Obesidad" count={15} total={data.histories.length} color="bg-amber-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
