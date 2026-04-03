// app/dashboard/(inner)/agenda/page.tsx
"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    X,
    Trash2,
    Plus,
    Users,
    Video,
    AlertTriangle,
    Loader2,
    Activity,
    ShieldCheck,
    Stethoscope
} from 'lucide-react';
import { api } from '@/lib/api';
import { Patient, Appointment } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { getSpecialtyById, Specialty } from '@/lib/specialties';

import { useRouter, useSearchParams } from 'next/navigation';

const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

function AgendaPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
    const [loading, setLoading] = useState(true);
    const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
    const [specialty, setSpecialty] = useState<Specialty | null>(null);

    const [newAppointment, setNewAppointment] = useState({
        patientId: '',
        date: '',
        time: '',
        type: 'presencial' as any,
        reason: ''
    });

    // Load data
    useEffect(() => {
        const loadInitialData = async () => {
            if (authLoading || !user) return;

            setLoading(true);
            try {
                // Detect Specialty from URL primarily
                const specId = searchParams.get('specialty') || localStorage.getItem('selectedSpecialty') || 'gastroenterology';
                setSpecialty(getSpecialtyById(specId));

                if (specId) {
                    localStorage.setItem('selectedSpecialty', specId);
                }

                const pts = await api.getPatients();
                setPatients(pts);
                await fetchMonthData(currentDate);
            } catch (error) {
                toast.error("Error al cargar la agenda");
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [user, authLoading]);

    const fetchMonthData = async (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const lastDay = new Date(year, month, 0).getDate();
        const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

        try {
            const apps = await api.getAppointmentsByDateRange(startDate, endDate);
            setAppointments(apps);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMonthData(currentDate);
    }, [currentDate]);

    // Calendar logic
    const { days, firstDay } = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const d = new Date(year, month + 1, 0).getDate();
        const f = new Date(year, month, 1).getDay();
        return { days: d, firstDay: f };
    }, [currentDate]);

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    const getAppointmentsForDay = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return appointments.filter(a => a.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
    };

    const selectedDayStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const selectedDayAppointments = appointments.filter(a => a.date === selectedDayStr).sort((a, b) => a.time.localeCompare(b.time));

    const todayStats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        const todayAppts = appointments.filter(a => a.date === today);
        return {
            total: todayAppts.length,
            confirmed: todayAppts.filter(a => a.confirmed).length,
            virtual: todayAppts.filter(a => a.type === 'virtual').length
        };
    }, [appointments]);

    const handleCreateAppointment = async () => {
        if (!newAppointment.date || !newAppointment.time || !newAppointment.patientId) {
            toast.error("Complete los campos requeridos");
            return;
        }
        try {
            await api.createAppointment(newAppointment as any);
            toast.success("Cita creada");
            setShowNewAppointmentModal(false);
            fetchMonthData(currentDate);
        } catch (error) {
            toast.error("Error al crear cita");
        }
    };

    const handleDeleteAppointment = async (id: string) => {
        if (!confirm("¿Desea eliminar esta cita?")) return;
        try {
            await api.deleteAppointment(id);
            toast.success("Cita eliminada");
            fetchMonthData(currentDate);
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Sincronizando Agenda...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Liquid Gold Header Area */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-border/40 shadow-soft relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary/20 transition-all duration-700" />

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                    <div className="flex items-center gap-8">
                        <div className="bg-gradient-to-br from-primary to-orange-400 p-6 rounded-[2rem] shadow-2xl relative">
                            <CalendarIcon className="text-white" size={36} />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-card flex items-center justify-center">
                                <Activity size={10} className="text-white animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-black text-foreground tracking-tighter">Agenda Médica</h1>
                                <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{specialty?.nameEs}</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground/60 font-medium uppercase text-[10px] tracking-[0.5em] mt-2">Control de Citas & Horarios</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                            <div className="bg-background/50 px-8 py-4 rounded-[2rem] border border-border/40 shadow-inner group-hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-black text-foreground">{todayStats.total}</span>
                                    <span className="text-emerald-500 text-xs font-bold animate-pulse">●</span>
                                </div>
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">CITAS HOY</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowNewAppointmentModal(true)}
                            className="bg-primary text-primary-foreground px-10 py-5 rounded-[2.2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-4 border border-primary/20"
                        >
                            <Plus size={20} /> Agendar Cita
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Modern Calendar Unit */}
                <div className="lg:col-span-3">
                    <div className="bg-card/40 backdrop-blur-3xl rounded-[3rem] shadow-soft overflow-hidden border border-border/40 group/calendar">
                        <div className="p-10 flex justify-between items-center bg-muted/30 border-b border-border/40">
                            <div>
                                <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase">{monthNames[currentDate.getMonth()]}</h3>
                                <p className="text-[11px] font-black text-primary/60 tracking-[0.4em] uppercase mt-1">{currentDate.getFullYear()}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 p-2 bg-background/50 rounded-2xl border border-border/40 shadow-inner">
                                    <button onClick={() => changeMonth(-1)} aria-label="Mes anterior" className="p-3 hover:bg-card rounded-xl transition-all text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ChevronLeft size={20} /></button>
                                    <button onClick={() => setCurrentDate(new Date())} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">Hoy</button>
                                    <button onClick={() => changeMonth(1)} aria-label="Mes siguiente" className="p-3 hover:bg-card rounded-xl transition-all text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ChevronRight size={20} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 border-b border-border/20 text-center py-6 bg-muted/10">
                            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                                <div key={d} className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 min-h-[500px] bg-background/20">
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} className="border-b border-r border-border/20 bg-muted/5 opacity-50" />
                            ))}
                            {Array.from({ length: days }).map((_, i) => {
                                const day = i + 1;
                                const dayApts = getAppointmentsForDay(day);
                                const isSelected = selectedDay === day;
                                const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

                                return (
                                    <motion.div
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                                        className={`min-h-[100px] p-4 border-b border-r border-border/20 cursor-pointer transition-all relative group/day ${isSelected ? 'bg-primary/5' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs font-black w-8 h-8 flex items-center justify-center rounded-xl transition-all ${isToday ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : isSelected ? 'bg-foreground text-background' : 'text-muted-foreground'}`}>
                                                {day}
                                            </span>
                                            {dayApts.length > 0 && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            {dayApts.slice(0, 3).map(apt => (
                                                <div key={apt.id} className="text-[8px] bg-card border border-border/40 text-foreground p-1 px-2 rounded-lg truncate font-black uppercase tracking-wider shadow-sm group-hover/day:border-primary/20 transition-all">
                                                    {apt.time} {apt.type === 'virtual' ? '🎥' : '📍'}
                                                </div>
                                            ))}
                                            {dayApts.length > 3 && <div className="text-[8px] text-muted-foreground font-bold pl-1">+{dayApts.length - 3} más</div>}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Vertical Timeline Explorer */}
                <div className="lg:col-span-1">
                    <div className="bg-card/40 backdrop-blur-3xl rounded-[3rem] shadow-soft overflow-hidden h-full flex flex-col border border-border/40">
                        <div className="p-8 bg-muted/50 border-b border-border/40">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="text-primary" size={20} />
                                <h3 className="font-black text-xl tracking-tight uppercase">Cronología</h3>
                            </div>
                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-60">{selectedDayStr}</p>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                            {selectedDayAppointments.length > 0 ? (
                                <div className="relative border-l-2 border-border/40 ml-4 space-y-8 py-4">
                                    {selectedDayAppointments.map(apt => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={apt.id}
                                            className="relative pl-8 group/item"
                                        >
                                            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full border-2 border-background bg-primary shadow-lg shadow-primary/20 group-hover/item:scale-125 transition-transform" />

                                            <div className="p-6 rounded-[2rem] bg-background/50 border border-border/40 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="bg-muted text-primary px-3 py-1 rounded-lg text-[10px] font-black shadow-inner">
                                                        {apt.time}
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteAppointment(apt.id)}
                                                        aria-label="Eliminar cita"
                                                        className="p-2 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>

                                                <h4 className="font-black text-foreground tracking-tight text-sm line-clamp-1 mb-1">{apt.patientId}</h4>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic line-clamp-1">{apt.reason || 'Sin motivo especificado'}</p>

                                                <div className="mt-6 pt-4 border-t border-border/20 flex flex-wrap gap-2">
                                                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${apt.type === 'virtual' ? 'bg-indigo-50 text-indigo-500 border-indigo-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'}`}>
                                                        {apt.type}
                                                    </span>
                                                    {apt.confirmed && (
                                                        <span className="text-[8px] font-black px-3 py-1 rounded-full bg-blue-50 text-blue-500 border border-blue-100 uppercase tracking-widest flex items-center gap-1">
                                                            <CheckCircle size={8} /> CONFIRMADA
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 py-20 px-8 text-center">
                                    <div className="w-24 h-24 rounded-full bg-muted/20 flex items-center justify-center mb-6 border-2 border-dashed border-border/40">
                                        <CalendarIcon size={40} className="opacity-20" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Sin compromisos para esta fecha</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium New Appointment Modal */}
            <AnimatePresence>
                {showNewAppointmentModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-card w-full max-w-xl rounded-[3.5rem] p-12 shadow-2xl border border-border relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-500" />

                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-3xl font-black text-foreground tracking-tighter">Nueva Cita</h3>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 italic">{specialty?.nameEs}</p>
                                </div>
                                <button onClick={() => setShowNewAppointmentModal(false)} aria-label="Cerrar modal" className="p-4 bg-muted hover:bg-destructive hover:text-white rounded-[1.5rem] transition-all border border-border/40 shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-2 flex items-center gap-2">
                                        <Users size={12} className="text-primary" /> Paciente
                                    </label>
                                    <select
                                        className="w-full p-6 bg-background border border-border rounded-[1.8rem] focus:ring-2 focus:ring-primary/20 outline-none font-bold text-foreground transition-all cursor-pointer shadow-inner appearance-none"
                                        value={newAppointment.patientId}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                                    >
                                        <option value="">Buscar Paciente...</option>
                                        {patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-2 flex items-center gap-2">
                                            <CalendarIcon size={12} className="text-indigo-500" /> Fecha
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-6 bg-background border border-border rounded-[1.8rem] focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-foreground transition-all shadow-inner"
                                            value={newAppointment.date}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-2 flex items-center gap-2">
                                            <Clock size={12} className="text-emerald-500" /> Hora
                                        </label>
                                        <select
                                            className="w-full p-6 bg-background border border-border rounded-[1.8rem] focus:ring-2 focus:ring-emerald-500/20 outline-none font-bold text-foreground transition-all cursor-pointer shadow-inner appearance-none"
                                            value={newAppointment.time}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                        >
                                            <option value="">--:--</option>
                                            {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-2 flex items-center gap-2">
                                        <Activity size={12} className="text-amber-500" /> Motivo
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-6 bg-background border border-border rounded-[1.8rem] focus:ring-2 focus:ring-amber-500/20 outline-none font-bold text-foreground transition-all shadow-inner"
                                        value={newAppointment.reason}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                                        placeholder="Ej. Control post-operatorio"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCreateAppointment}
                                className="w-full mt-12 py-6 bg-primary text-primary-foreground rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 border border-primary/20"
                            >
                                <CheckCircle size={20} /> Confirmar Cita Médica
                            </motion.button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary), 0.1);
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
}

export default function AgendaPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Cargando...</p>
                </div>
            </div>
        }>
            <AgendaPageContent />
        </Suspense>
    );
}

