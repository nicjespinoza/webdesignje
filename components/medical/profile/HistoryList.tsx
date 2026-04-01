// medical-ai-demo/components/profile/HistoryList.tsx
"use client";

import React from 'react';
import { History, FileText, CheckCircle, ChevronRight, Trash2, Eye } from 'lucide-react';
import { InitialHistory, Patient } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryListProps {
    patient: Patient;
    histories: InitialHistory[];
    onNavigate: (path: string) => void;
    onDelete: (id: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ histories, onNavigate, onDelete }) => {
    return (
        <div className="w-full">
            <header className="flex items-center justify-between mb-12">
                <div className="flex flex-col gap-1">
                    <h3 className="text-[10px] tracking-[0.8em] font-light text-white uppercase">Historia Clínica Primaria</h3>
                    <div className="w-12 h-[1px] bg-primary/20" />
                </div>
                <span className="text-[8px] tracking-[0.4em] text-white/20 uppercase font-thin">
                    {histories.length} Entradas
                </span>
            </header>

            <div className="space-y-4">
                {histories.map((history, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={history.id}
                        onClick={() => onNavigate(`/dashboard/patients/${history.patientId}/history/${history.id}`)}
                        className="group relative bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center justify-between cursor-pointer transition-all duration-700 hover:border-primary/20 hover:bg-[#0a0a0a]/60"
                    >
                        <div className="flex items-center gap-8">
                            <div className="text-center min-w-[80px]">
                                <p className="text-[14px] font-thin text-white tracking-widest">{history.date.split('-')[2]}</p>
                                <p className="text-[7px] tracking-[0.5em] text-white/20 uppercase font-light">{new Date(history.date).toLocaleDateString('es-ES', { month: 'short' })}</p>
                            </div>

                            <div className="h-6 w-[1px] bg-white/5" />

                            <div className="flex flex-col gap-1">
                                <h4 className="text-[11px] font-thin text-white/60 tracking-[0.2em] uppercase line-clamp-1 group-hover:text-white transition-colors">
                                    {history.motives.principalMotive || "EXAMEN GENERAL"}
                                </h4>
                                <div className="flex items-center gap-4">
                                    <span className="text-[7px] tracking-[0.3em] text-white/20 uppercase">ID: {history.id.slice(0, 8)}</span>
                                    <CheckCircle size={10} className="text-emerald-500/40" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700">
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(history.id); }}
                                className="p-2 text-white/10 hover:text-destructive transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary rounded-xl"
                                aria-label="Eliminar entrada de historia clínica"
                            >
                                <Trash2 size={14} strokeWidth={1} />
                            </button>
                            <div
                                role="button"
                                tabIndex={0}
                                className="p-2.5 rounded-full border border-primary/10 text-primary group-hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary"
                                aria-label="Ver detalles de historia clínica"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onNavigate(`/dashboard/patients/${history.patientId}/history/${history.id}`);
                                    }
                                }}
                            >
                                <Eye size={14} strokeWidth={1} />
                            </div>
                        </div>

                        {/* Liquid Background Accent */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl" />
                    </motion.div>
                ))}

                {histories.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
                        <p className="text-[8px] tracking-[0.5em] text-white/10 uppercase font-thin italic">Sin registros clínicos primarios</p>
                    </div>
                )}
            </div>
        </div>
    );
};
