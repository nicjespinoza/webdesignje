// medical-ai-demo/components/profile/PatientHeader.tsx
"use client";

import React from 'react';
import { ArrowLeft, Brain, Calendar, StickyNote, Activity, PenTool, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { calculateAge } from '@/lib/helpers';
import { Patient } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAppTranslations } from '@/hooks/useTranslations';

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
    const { t } = useAppTranslations();
    const isAssistant = user?.email === 'asistente@je.com';

    return (
        <div className="w-full relative z-40">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-10 gap-10">

                {/* Left: Patient Name Luxury */}
                <div className="flex flex-col gap-5">
                    <button
                        onClick={onBack}
                        aria-label={t('patientHeader.back')}
                        title={t('patientHeader.back')}
                        className="flex items-center gap-3 text-white/20 hover:text-primary transition-all text-[8px] tracking-[0.5em] uppercase font-light group focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary rounded-md p-1 -m-1"
                    >
                        <ChevronLeft size={14} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
                        Regresar
                    </button>

                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl md:text-5xl font-thin tracking-[0.1em] text-white uppercase leading-none">
                                {patient.firstName} <br /> {patient.lastName}
                            </h1>
                            {patient.isOnline && (
                                <span className="w-1 h-1 bg-primary rounded-full animate-pulse mt-3" />
                            )}
                        </div>

                        <div className="flex items-center gap-6 text-[8px] font-thin text-white/20 uppercase tracking-[0.4em]">
                            <span className="text-primary/60">EXPEDIENTE #{patient.id.slice(-6).toUpperCase()}</span>
                            <span className="w-1 h-1 bg-white/5 rounded-full" />
                            <span>{calculateAge(patient.birthDate)} AÑOS</span>
                            <span className="w-1 h-1 bg-white/5 rounded-full" />
                            <span>GÉNERO: {patient.sex}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Premium Actions Filtered */}
                <div className="flex flex-wrap items-center gap-3">
                    {!isAssistant && (
                        <button onClick={onAIAnalysis} className="px-6 py-2.5 rounded-full border border-primary/10 hover:border-primary/40 text-primary text-[8px] tracking-[0.3em] uppercase transition-all flex items-center gap-3 group">
                            <Brain size={14} strokeWidth={1} />
                            Análisis IA
                        </button>
                    )}

                    <button onClick={onShowAppointment} className="px-6 py-2.5 rounded-full border border-white/5 hover:border-white/20 text-white/40 hover:text-white text-[8px] tracking-[0.3em] uppercase transition-all flex items-center gap-3">
                        <Calendar size={14} strokeWidth={1} />
                        Cita
                    </button>

                    {!isAssistant && (
                        <div className="flex items-center gap-2">
                            <button onClick={onShowNotes} className="px-6 py-2.5 rounded-l-full border border-white/5 hover:border-white/20 text-white/40 hover:text-white text-[8px] tracking-[0.3em] uppercase transition-all flex items-center gap-3 border-r-0">
                                <StickyNote size={14} strokeWidth={1} /> Notas
                            </button>
                            <button
                                onClick={onViewNotes}
                                aria-label={t('patientHeader.viewNotes')}
                                title={t('patientHeader.viewNotes')}
                                className="p-2.5 border border-white/5 hover:border-white/20 text-white/20 hover:text-white rounded-r-full transition-all focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary"
                            >
                                <Eye size={12} strokeWidth={1} />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <button onClick={onShowEndoscopic} className="px-6 py-2.5 rounded-l-full border border-white/5 hover:border-white/20 text-white/40 hover:text-white text-[8px] tracking-[0.3em] uppercase transition-all flex items-center gap-3 border-r-0">
                            <Activity size={14} strokeWidth={1} /> Endo
                        </button>
                        <button
                            onClick={onViewEndoscopic}
                            aria-label={t('patientHeader.viewEndo')}
                            title={t('patientHeader.viewEndo')}
                            className="p-2.5 border border-white/5 hover:border-white/20 text-white/20 hover:text-white rounded-r-full transition-all focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary"
                        >
                            <Eye size={12} strokeWidth={1} />
                        </button>
                    </div>

                    <button
                        onClick={() => setActiveTab(activeTab === 'general' ? 'consents' : 'general')}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-[8px] tracking-[0.3em] uppercase transition-all flex items-center gap-3",
                            activeTab === 'consents'
                                ? "bg-primary text-black font-black"
                                : "border border-white/5 hover:border-white/20 text-white/40 hover:text-white"
                        )}
                    >
                        <PenTool size={14} strokeWidth={1} />
                        {activeTab === 'consents' ? 'General' : 'Firmas'}
                    </button>
                </div>
            </div>
        </div>
    );
};
