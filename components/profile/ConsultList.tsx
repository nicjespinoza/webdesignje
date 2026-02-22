"use client";

import React from 'react';
import { Activity, Eye, Plus, Edit, Trash2, ClipboardList } from 'lucide-react';
import { ActionButtonSmall } from './SharedComponents';
import { Patient, SubsequentConsult } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface ConsultListProps {
    patient: Patient;
    consults: SubsequentConsult[];
    onNavigate: (path: string, options?: any) => void;
    onDelete: (id: string) => void;
    onCreate?: () => void;
    onViewOrders?: (item: any) => void;
}

import { motion } from 'framer-motion';

export const ConsultList: React.FC<ConsultListProps> = ({ patient, consults, onNavigate, onDelete, onCreate, onViewOrders }) => {
    const { user } = useAuth();
    const isAssistant = user?.email === 'asistente@je.com';

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-2.5 rounded-2xl border border-emerald-500/20">
                        <Activity className="text-emerald-500" size={24} />
                    </div>
                    <div>
                        <h3 className="font-black text-foreground text-xl tracking-tight">Consultas Subsecuentes</h3>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">Seguimiento y Evolución</p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate(`/dashboard/patients/${patient.id}/consult/new`)}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all border border-emerald-500/20"
                >
                    <Plus size={16} /> Nueva Consulta
                </motion.button>
            </div>

            {consults.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {consults.map((c, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            key={c.id}
                            className={cn(
                                "group relative p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden shadow-soft hover:shadow-xl",
                                c.status === 'draft' ? "bg-amber-500/5 border-amber-500/20" : "bg-muted/30 hover:bg-muted/50 border-border"
                            )}
                        >
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1.5 transition-colors",
                                c.status === 'draft' ? "bg-amber-500" : "bg-emerald-500/40 group-hover:bg-emerald-500"
                            )} />

                            <div className="flex items-center gap-5 pl-2">
                                <div className="hidden sm:flex flex-col items-center justify-center bg-card border border-border rounded-xl px-3 py-2 shadow-soft min-w-[70px]">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">{c.date.split('-')[1]}</span>
                                    <span className="text-xl font-black text-foreground">{c.date.split('-')[2]}</span>
                                    <span className="text-[10px] font-black uppercase text-emerald-500 tracking-tighter">{c.date.split('-')[0]}</span>
                                </div>
                                <div>
                                    <p className="font-black text-foreground text-sm flex items-center gap-2">
                                        <span className="sm:hidden">{c.date} | </span>
                                        {c.time}
                                        {c.status === 'draft' && (
                                            <span className="text-[9px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-amber-500/20">
                                                Pendiente
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1 font-bold italic">
                                        &quot;{c.otherMotive || Object.keys(c.motives || {}).filter(k => (c.motives as any)[k]).join(', ') || 'Sin motivo especificado'}&quot;
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                    onClick={() => onNavigate(`/dashboard/patients/${patient.id}/consult/${c.id}`)}
                                    className="p-3 rounded-xl bg-card border border-border text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-soft"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(c.id)}
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
                    <p className="text-muted-foreground font-black text-xs uppercase tracking-[0.2em]">No se registran visitas de seguimiento</p>
                </div>
            )}
        </div>
    );
};
