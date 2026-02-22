"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
    Loader2
} from 'lucide-react';
import { api } from '@/lib/api';
import { Patient, Appointment } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export default function AgendaPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
    const [loading, setLoading] = useState(true);
    const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

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
            setLoading(true);
            try {
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
    }, []);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#083c79] to-[#0a4d8c] p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Premium Header */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-4 rounded-2xl shadow-lg">
                                <CalendarIcon className="text-white" size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight">Agenda Médica</h1>
                                <p className="text-blue-200 font-medium">Gestión de horarios y citas</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="bg-white/10 px-5 py-3 rounded-2xl border border-white/20 text-white min-w-[120px]">
                                <span className="text-2xl font-bold">{todayStats.total}</span>
                                <p className="text-xs text-blue-200">citas hoy</p>
                            </div>
                            <button
                                onClick={() => setShowNewAppointmentModal(true)}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-lg flex items-center gap-2"
                            >
                                <Plus size={20} /> Nueva Cita
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="p-6 flex justify-between items-center bg-[#083c79] text-white">
                                <div>
                                    <h3 className="text-2xl font-bold">{monthNames[currentDate.getMonth()]}</h3>
                                    <p className="text-blue-200/70">{currentDate.getFullYear()}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/20 rounded-xl"><ChevronLeft /></button>
                                    <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-white/20 rounded-xl text-sm font-bold">Hoy</button>
                                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/20 rounded-xl"><ChevronRight /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 border-b text-center py-4 bg-gray-50">
                                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                                    <div key={d} className="text-xs font-bold text-gray-500 uppercase tracking-widest">{d}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 min-h-[400px]">
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} className="border-b border-r border-gray-100 bg-gray-50/50" />
                                ))}
                                {Array.from({ length: days }).map((_, i) => {
                                    const day = i + 1;
                                    const dayApts = getAppointmentsForDay(day);
                                    const isSelected = selectedDay === day;
                                    const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

                                    return (
                                        <div
                                            key={day}
                                            onClick={() => setSelectedDay(day)}
                                            className={`min-h-[80px] p-2 border-b border-r border-gray-100 cursor-pointer transition-all relative ${isSelected ? 'bg-blue-50 ring-2 ring-[#083c79] ring-inset' : 'hover:bg-gray-50'}`}
                                        >
                                            <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-green-500 text-white' : 'text-gray-700'}`}>
                                                {day}
                                            </span>
                                            <div className="mt-1 space-y-1">
                                                {dayApts.slice(0, 2).map(apt => (
                                                    <div key={apt.id} className="text-[9px] bg-blue-100 text-blue-700 p-0.5 rounded truncate font-bold">
                                                        {apt.time} - {apt.type}
                                                    </div>
                                                ))}
                                                {dayApts.length > 2 && <div className="text-[9px] text-gray-400">+{dayApts.length - 2} más</div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Day Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full flex flex-col">
                            <div className="p-6 bg-[#083c79] text-white">
                                <h3 className="font-bold text-xl">Citas del Día</h3>
                                <p className="text-blue-200 text-sm">{selectedDayStr}</p>
                            </div>
                            <div className="p-4 flex-1 overflow-y-auto space-y-4">
                                {selectedDayAppointments.length > 0 ? (
                                    selectedDayAppointments.map(apt => (
                                        <div key={apt.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-all relative group">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#083c79] flex items-center justify-center text-white font-bold">
                                                        {apt.time.slice(0, 2)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{apt.patientId}</h4>
                                                        <p className="text-xs text-gray-500">{apt.reason}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDeleteAppointment(apt.id)} className="text-red-400 hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-widest">{apt.type}</span>
                                                {apt.confirmed && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 uppercase tracking-widest">Confirmada</span>}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                                        <CalendarIcon size={48} className="opacity-20 mb-4" />
                                        <p>No hay citas agendadas</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Appointment Modal */}
            <AnimatePresence>
                {showNewAppointmentModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <h3 className="text-2xl font-bold text-[#083c79] mb-6">Nueva Cita</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Paciente</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 border rounded-xl"
                                        value={newAppointment.patientId}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                                    >
                                        <option value="">Seleccione...</option>
                                        {patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Fecha</label>
                                        <input
                                            type="date"
                                            className="w-full p-3 bg-gray-50 border rounded-xl"
                                            value={newAppointment.date}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Hora</label>
                                        <select
                                            className="w-full p-3 bg-gray-50 border rounded-xl"
                                            value={newAppointment.time}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                        >
                                            <option value="">--:--</option>
                                            {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Motivo</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-gray-50 border rounded-xl"
                                        value={newAppointment.reason}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                                        placeholder="Ej. Control post-operatorio"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button onClick={() => setShowNewAppointmentModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-600">Cancelar</button>
                                <button onClick={handleCreateAppointment} className="flex-1 py-3 bg-[#083c79] text-white rounded-xl font-bold shadow-lg">Agendar</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
