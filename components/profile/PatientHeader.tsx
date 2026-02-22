
"use client";

import React from 'react';
import { ArrowLeft, Brain, Calendar, StickyNote, Activity, PenTool, Eye } from 'lucide-react';
import { calculateAge } from '@/lib/helpers';
import { ActionButton } from './SharedComponents';
import { Patient } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PatientHeaderProps {
    patient: Patient;
    onBack: () => void;
    onAIAnalysis: () => void;
    onShowAppointment: () => void;
    onShowNotes: () => void;
    onViewNotes: () => void;
    onShowEndoscopic: () => void;
    onViewEndoscopic: () => void;
    activeTab: string;
    setActiveTab: (tab: 'general' | 'consents') => void;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
    patient,
    onBack,
    onAIAnalysis,
    onShowAppointment,
    onShowNotes,
    onViewNotes,
    onShowEndoscopic,
    onViewEndoscopic,
    activeTab,
    setActiveTab
}) => {
    const { user } = useAuth();
    const isAssistant = user?.email === 'asistente@je.com';

    return (
        <div className="sticky top-6 z-40 px-4 md:px-8 mb-12 transition-all duration-700">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-7xl mx-auto bg-card/60 backdrop-blur-3xl rounded-[3rem] border border-border/50 shadow-soft p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8 group hover:shadow-2xl transition-all duration-500"
            >
                <div className="flex items-center gap-8 w-full md:w-auto">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        className="p-5 rounded-[1.5rem] bg-background border border-border/60 text-muted-foreground hover:text-primary transition-all shadow-inner group/back"
                    >
                        <ArrowLeft size={22} className="group-hover/back:-translate-x-1 transition-transform" />
                    </motion.button>

                    <div className="overflow-hidden">
                        <div className="flex items-center gap-4 flex-wrap">
                            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter truncate">
                                {patient.firstName} {patient.lastName}
                            </h1>
                            {patient.isOnline && (
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm shadow-emerald-500/10">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Activo</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-6 mt-2">
                            <div className="flex items-center gap-2 bg-muted/40 px-4 py-1.5 rounded-full border border-border/40">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Paciente ID:</span>
                                <span className="text-[11px] font-black text-primary/80 font-mono">{patient.id.slice(0, 8).toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-black text-muted-foreground uppercase tracking-widest opacity-60">
                                <span>{calculateAge(patient.birthDate)} Años</span>
                                <div className="w-1.5 h-1.5 bg-border rounded-full" />
                                <span>{patient.sex}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-2 rounded-[2.5rem] bg-background/50 border border-border/40 shadow-inner backdrop-blur-xl">
                    <div className="flex items-center px-2 gap-1">
                        {!isAssistant && (
                            <>
                                <ActionButton icon={<Brain size={20} />} label="IA Analysis" onClick={onAIAnalysis} color="indigo" />
                                <div className="w-px h-10 bg-border/40 mx-2" />
                            </>
                        )}
                        <ActionButton icon={<Calendar size={20} />} label="Agenda" onClick={onShowAppointment} color="blue" />
                    </div>

                    <div className="w-px h-10 bg-border/40 mx-2" />

                    <div className="flex items-center px-2 gap-2">
                        {!isAssistant && (
                            <div className="flex items-center gap-1 group/notes">
                                <ActionButton icon={<StickyNote size={20} />} label="Nueva Nota" onClick={onShowNotes} color="amber" />
                                <ActionButton icon={<Eye size={20} />} onClick={onViewNotes} color="amber" variant="ghost" />
                            </div>
                        )}
                        <div className="w-px h-10 bg-border/40 mx-2" />
                        <div className="flex items-center gap-1 group/endo">
                            <ActionButton icon={<Activity size={20} />} label="Evolución" onClick={onShowEndoscopic} color="teal" />
                            <ActionButton icon={<Eye size={20} />} onClick={onViewEndoscopic} color="teal" variant="ghost" />
                        </div>
                    </div>

                    <div className="w-px h-10 bg-border/40 mx-2" />

                    <div className="px-2">
                        <ActionButton
                            icon={<PenTool size={20} />}
                            label="Firmas"
                            onClick={() => setActiveTab(activeTab === 'general' ? 'consents' : 'general')}
                            active={activeTab === 'consents'}
                            color="gray"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
