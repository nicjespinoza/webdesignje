"use client";

import React from 'react';
import { FileText, Eye, Plus, Edit, Trash2, ClipboardList } from 'lucide-react';
import { ActionButtonSmall } from './SharedComponents';
import { InitialHistory, Patient } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface HistoryListProps {
    patient: Patient;
    histories: InitialHistory[];
    onNavigate: (path: string, options?: any) => void;
    onDelete: (id: string) => void;
    onViewOrders?: (item: any) => void;
}

import { motion } from 'framer-motion';

export const HistoryList: React.FC<HistoryListProps> = ({ patient, histories, onNavigate, onDelete, onViewOrders }) => {
    const { user } = useAuth();
    const isAssistant = user?.email === 'asistente@je.com';

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-primary/10 p-2.5 rounded-2xl border border-primary/20">
                        <FileText className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="font-black text-foreground text-xl tracking-tight">Historias Clínicas</h3>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">Antecedentes y Evolución</p>
                    </div>

                    {(patient.legacyIdSistema) && (
                        <button
                            onClick={() => onNavigate(`/dashboard/patients/${patient.id}/history/legacy`)}
                            className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl hover:bg-emerald-500/20 transition-all"
                        >
                            <Eye size={14} /> Historia 2025
                        </button>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate(`/dashboard/patients/${patient.id}/history/new`)}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all border border-primary/20"
                >
                    <Plus size={16} /> Crear Historia
                </motion.button>
            </div>

            {histories.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {histories.map((h, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={h.id}
                            className="group relative bg-muted/30 hover:bg-muted/50 p-5 rounded-2xl border border-border shadow-soft hover:shadow-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/40 group-hover:bg-primary transition-colors" />

                            <div className="flex items-center gap-5 pl-2">
                                <div className="hidden sm:flex flex-col items-center justify-center bg-card border border-border rounded-xl px-3 py-2 shadow-soft min-w-[70px]">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">{h.date.split('-')[1]}</span>
                                    <span className="text-xl font-black text-foreground">{h.date.split('-')[2]}</span>
                                    <span className="text-[10px] font-black uppercase text-primary tracking-tighter">{h.date.split('-')[0]}</span>
                                </div>
                                <div>
                                    <p className="font-black text-foreground text-sm flex items-center gap-2">
                                        <span className="sm:hidden">{h.date} | </span>
                                        {h.time}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1 font-bold italic">
                                        &quot;{Object.keys(h.motives || {}).filter(k => (h.motives as any)[k]).join(', ') || h.otherMotive || 'Consulta General'}&quot;
                                    </p>
                                    {h.isValidated === false && (
                                        <span className="inline-flex mt-2 items-center gap-1.5 text-[9px] font-black bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-widest border border-amber-500/20">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                            Borrador
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                    onClick={() => onNavigate(`/dashboard/patients/${patient.id}/history/${h.id}`)}
                                    className="p-3 rounded-xl bg-card border border-border text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-soft"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(h.id)}
                                    className="p-3 rounded-xl bg-card border border-border text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all shadow-soft"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
                    <p className="text-muted-foreground font-black text-xs uppercase tracking-[0.2em] px-8">
                        {isAssistant
                            ? "Paciente en consulta medica, pendiente historia clinica"
                            : "No se registran antecedentes clínicos previos"}
                    </p>
                </div>
            )}
        </div>
    );
};
