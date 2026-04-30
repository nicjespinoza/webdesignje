// medical-ai-demo/components/profile/ConsultList.tsx
"use client";

import React from 'react';
import { Activity, Calendar, ChevronRight, Trash2, Eye } from 'lucide-react';
import { SubsequentConsult, Patient } from '@/types';
import { motion } from 'framer-motion';
import { useAppTranslations } from '@/hooks/useTranslations';

interface ConsultListProps {
    patient: Patient;
    consults: SubsequentConsult[];
    onNavigate: (path: string) => void;
    onDelete: (id: string) => void;
}

export const ConsultList: React.FC<ConsultListProps> = ({ consults, onNavigate, onDelete }) => {
    const { t } = useAppTranslations();
    return (
        <div className="w-full">
            <header className="flex items-center justify-between mb-12">
                <div className="flex flex-col gap-1">
                    <h3 className="text-[10px] tracking-[0.8em] font-light text-white uppercase">Consultas Subsecuentes</h3>
                    <div className="w-12 h-[1px] bg-primary/20" />
                </div>
                <span className="text-[8px] tracking-[0.4em] text-white/20 uppercase font-thin">
                    {consults.length} Seguimientos
                </span>
            </header>

            <div className="space-y-4">
                {consults.map((consult, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={consult.id}
                        onClick={() => onNavigate(`/dashboard/patients/${consult.patientId}/consult/${consult.id}`)}
                        className="group relative bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center justify-between cursor-pointer transition-all duration-700 hover:border-primary/20 hover:bg-[#0a0a0a]/60"
                    >
                        <div className="flex items-center gap-8">
                            <div className="text-center min-w-[80px]">
                                <p className="text-[14px] font-thin text-white tracking-widest">{consult.date.split('-')[2]}</p>
                                <p className="text-[7px] tracking-[0.5em] text-white/20 uppercase font-light">{new Date(consult.date).toLocaleDateString('es-ES', { month: 'short' })}</p>
                            </div>

                            <div className="h-6 w-[1px] bg-white/5" />

                            <div className="flex flex-col gap-1">
                                <h4 className="text-[11px] font-thin text-white/60 tracking-[0.2em] uppercase line-clamp-1 group-hover:text-white transition-colors">
                                    {consult.historyOfPresentIllness || "EVOLUCIÓN CLÍNICA"}
                                </h4>
                                <div className="flex items-center gap-4">
                                    <span className="text-[7px] tracking-[0.3em] text-white/20 uppercase">SEGUIMIENTO</span>
                                    <Activity size={10} className="text-primary/40" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700">
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(consult.id); }}
                                aria-label={t("common.deleteConsult")}
                                title={t("common.deleteConsult")}
                                className="p-2 text-white/10 hover:text-destructive transition-colors"
                            >
                                <Trash2 size={14} strokeWidth={1} />
                            </button>
                            <button
                                aria-label={t("common.viewConsult")}
                                title={t("common.viewConsult")}
                                className="p-2.5 rounded-full border border-primary/10 text-primary group-hover:scale-110 transition-transform"
                            >
                                <Eye size={14} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Liquid Background Accent */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl" />
                    </motion.div>
                ))}

                {consults.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
                        <p className="text-[8px] tracking-[0.5em] text-white/10 uppercase font-thin italic">Sin consultas de seguimiento</p>
                    </div>
                )}
            </div>
        </div>
    );
};
