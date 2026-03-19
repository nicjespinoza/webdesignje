// app/dashboard/(inner)/patients/[id]/history/new/InitialHistoryClient.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Save, ArrowLeft, Loader2, Signal, SignalLow, Activity, ShieldCheck, Sparkles, CheckCircle, ChevronLeft } from 'lucide-react';

import { api } from '@/lib/api';
import { Patient, InitialHistory } from '@/types';
import { initialHistorySchema, type InitialHistoryFormData, getDefaultInitialHistoryValues } from '@/lib/validations/history';

// UI Components
import { Toast } from '@/components/medical/ui/Toast';
import { FloatingLabelInput } from '@/components/medical/premium-ui/FloatingLabelInput';
import { ObesityHistoryModal } from '@/components/medical/ObesityHistoryModal';

// Detail Sections
import { MotivesSection } from '@/components/medical/history/sections/MotivesSection';
import { DiseaseHistorySection } from '@/components/medical/history/sections/DiseaseHistorySection';
import { PathologicalAntecedentsSection } from '@/components/medical/history/sections/PathologicalAntecedentsSection';
import { NonPathologicalAntecedentsSection } from '@/components/medical/history/sections/NonPathologicalAntecedentsSection';
import { FamilyHistorySection } from '@/components/medical/history/sections/FamilyHistorySection';
import { PhysicalExamSection } from '@/components/medical/history/sections/PhysicalExamSection';
import { TreatmentPlanSection } from '@/components/medical/history/sections/TreatmentPlanSection';

import { getSpecialtyById, Specialty } from '@/lib/specialties';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type HistoryCancerDetails = {
    preExistingDiseases?: { cancerDetails?: string };
    familyHistory?: { cancerDetails?: string };
};

export default function InitialHistoryClient() {
    const router = useRouter();
    const params = useParams();
    const patientId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isOnline, setIsOnline] = useState(true);
    const [specialty, setSpecialty] = useState<Specialty | null>(null);
    const [showObesityModal, setShowObesityModal] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const methods = useForm<InitialHistoryFormData>({
        resolver: zodResolver(initialHistorySchema),
        defaultValues: getDefaultInitialHistoryValues(patientId),
        mode: 'onBlur',
    });

    const { reset, handleSubmit, setValue, watch, formState: { isSubmitting, errors } } = methods;

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const loadData = async () => {
            if (!patientId) return;
            try {
                const specId = typeof window !== 'undefined' ? localStorage.getItem('selectedSpecialty') || 'gastroenterology' : 'gastroenterology';
                setSpecialty(getSpecialtyById(specId));

                const patientData = await api.getPatient(patientId);
                setPatient(patientData);

                const histories = await api.getHistories(patientId);
                const latest = histories[0];

                if (latest) {
                    const latestWithDetails = latest as unknown as HistoryCancerDetails;
                    const formData = {
                        ...getDefaultInitialHistoryValues(patientId),
                        preExistingDiseases: { ...latest.preExistingDiseases, cancerDetails: latestWithDetails.preExistingDiseases?.cancerDetails || '' },
                        familyHistory: { ...latest.familyHistory, cancerDetails: latestWithDetails.familyHistory?.cancerDetails || '' },
                    };
                    reset(formData as unknown as InitialHistoryFormData);
                }
            } catch (error) {
                console.error("Error loading patient data:", error);
                setToast({ message: "Error al cargar datos", type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [patientId, reset]);

    const onSubmit = async (data: InitialHistoryFormData) => {
        try {
            const historyToSave: Omit<InitialHistory, 'id'> = {
                ...(data as unknown as Omit<InitialHistory, 'id'>),
                patientId,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                specialtyId: specialty?.id || 'general',
            };
            await api.createHistory(historyToSave);
            setToast({ message: "EXPEDIENTE SINCRONIZADO", type: 'success' });
            setTimeout(() => router.push(`/dashboard/patients/${patientId}`), 2000);
        } catch (error) {
            setToast({ message: "ERROR DE SINCRONIZACIÓN", type: 'error' });
        }
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
            </div>
        );
    }

    if (!patient) return null;

    return (
        <FormProvider {...methods}>
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Minimalist Luxury Header */}
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-12 gap-12">
                    <div className="flex flex-col gap-6">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-3 text-white/20 hover:text-primary transition-all text-[8px] tracking-[0.5em] uppercase font-light group"
                        >
                            <ChevronLeft size={14} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
                            Regresar
                        </button>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-thin tracking-[0.1em] text-white uppercase leading-none">
                                EXAMEN <br /> CLÍNICO
                            </h1>
                            <div className="flex items-center gap-6 text-[9px] font-thin text-white/20 uppercase tracking-[0.4em]">
                                <span className="text-primary/60">{specialty?.nameEs.toUpperCase()}</span>
                                <span className="w-1 h-1 bg-white/5 rounded-full" />
                                <span>PACIENTE: {patient.firstName} {patient.lastName}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className={cn(
                            "px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-all duration-700",
                            isOnline
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        )}>
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isOnline ? "bg-emerald-500" : "bg-rose-500")} />
                            {isOnline ? 'Nodo Sincronizado' : 'Modo Local'}
                        </div>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                            <div className="bg-primary text-black px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-4 shadow-[0_0_30px_rgba(198,147,32,0.3)] hover:shadow-[0_0_40px_rgba(198,147,32,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0">
                                {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                                Finalizar
                            </div>
                        </button>
                    </div>
                </div>

                <div className="space-y-32 pb-40">
                    {/* Interior Sections with clean dark style */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8 space-y-24">
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-transparent hidden lg:block" />
                                <MotivesSection onShowObesityModal={() => setShowObesityModal(true)} />
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative group"
                            >
                                <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-transparent hidden lg:block" />
                                <DiseaseHistorySection />
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-transparent hidden lg:block" />
                                <PathologicalAntecedentsSection patient={patient} specialty={specialty} />
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="relative group"
                            >
                                <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-transparent hidden lg:block" />
                                <NonPathologicalAntecedentsSection />
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="relative group"
                            >
                                <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-transparent hidden lg:block" />
                                <FamilyHistorySection />
                            </motion.section>
                        </div>

                        <div className="lg:col-span-4 space-y-12">
                            <div className="sticky top-12 space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <PhysicalExamSection isOnline={isOnline} />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <TreatmentPlanSection isOnline={isOnline} />
                                </motion.div>

                                <div className="p-10 border border-white/5 rounded-[3.5rem] text-center space-y-4 bg-[#0a0a0a]/20 backdrop-blur-xl relative overflow-hidden group hover:border-primary/20 transition-all duration-700">
                                    <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <ShieldCheck size={24} strokeWidth={1} className="mx-auto text-primary/40 mb-2 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-[9px] tracking-[0.6em] text-white/40 uppercase font-light italic">Seguridad de Nodo</h4>
                                    <p className="text-[7px] tracking-[0.4em] text-white/20 uppercase">Validación de Integridad Platino Activa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ObesityHistoryModal
                    isOpen={showObesityModal}
                    onClose={() => setShowObesityModal(false)}
                    onSave={(obesityData) => {
                        setValue('obesityHistory', obesityData);
                        setShowObesityModal(false);
                    }}
                    initialData={watch('obesityHistory')}
                />

                {toast && (
                    <Toast
                        isVisible={!!toast}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </FormProvider>
    );
}
