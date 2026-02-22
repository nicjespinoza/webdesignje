"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Save, ArrowLeft, Loader2, Signal, SignalLow, Activity } from 'lucide-react';

import { api } from '@/lib/api';
import { Patient, InitialHistory } from '@/types';
import { initialHistorySchema, type InitialHistoryFormData, getDefaultInitialHistoryValues } from '@/lib/validations/history';

// UI Components
import { Toast } from '@/components/ui/Toast';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { ObesityHistoryModal } from '@/components/ObesityHistoryModal';

// Detail Sections
import { MotivesSection } from '@/components/history/sections/MotivesSection';
import { DiseaseHistorySection } from '@/components/history/sections/DiseaseHistorySection';
import { PathologicalAntecedentsSection } from '@/components/history/sections/PathologicalAntecedentsSection';
import { NonPathologicalAntecedentsSection } from '@/components/history/sections/NonPathologicalAntecedentsSection';
import { FamilyHistorySection } from '@/components/history/sections/FamilyHistorySection';
import { PhysicalExamSection } from '@/components/history/sections/PhysicalExamSection';
import { TreatmentPlanSection } from '@/components/history/sections/TreatmentPlanSection';

import { getSpecialtyById, Specialty } from '@/lib/specialties';

export default function InitialHistoryPage() {
    const router = useRouter();
    const params = useParams();
    const patientId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isOnline, setIsOnline] = useState(true);
    const [specialty, setSpecialty] = useState<Specialty | null>(null);
    const [showObesityModal, setShowObesityModal] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Initialize Form
    const methods = useForm<InitialHistoryFormData>({
        resolver: zodResolver(initialHistorySchema),
        defaultValues: getDefaultInitialHistoryValues(patientId),
        mode: 'onBlur',
    });

    const { reset, handleSubmit, setValue, watch, formState: { isSubmitting, errors } } = methods;

    // Monitor connectivity
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

    // Load Data
    useEffect(() => {
        const loadData = async () => {
            if (!patientId) return;

            try {
                // 0. Detect Specialty
                const specId = localStorage.getItem('selectedSpecialty') || 'gastroenterology';
                const specData = getSpecialtyById(specId);
                setSpecialty(specData);

                // 1. Fetch Patient
                const patientData = await api.getPatient(patientId);
                setPatient(patientData);

                // 2. Fetch Previous Histories to pre-fill background
                const histories = await api.getHistories(patientId);
                const latest = histories[0];

                if (latest) {
                    // Pre-fill backgrounds but leave "Current Motive/Disease" empty
                    const formData = {
                        ...getDefaultInitialHistoryValues(patientId),
                        preExistingDiseases: { ...latest.preExistingDiseases, cancerDetails: latest.preExistingDiseases?.cancerDetails || '' },
                        surgicalHistory: { ...latest.surgicalHistory, cancerDetails: latest.surgicalHistory?.cancerDetails || '' },
                        transfusionHistory: latest.transfusionHistory,
                        allergicHistory: latest.allergicHistory,
                        drugHistory: latest.drugHistory,
                        familyHistory: { ...latest.familyHistory, cancerDetails: latest.familyHistory?.cancerDetails || '' },
                        nonPathologicalHistory: latest.nonPathologicalHistory,
                        gynecoObstetricHistory: latest.gynecoObstetricHistory,
                    };
                    reset(formData as any);
                }
            } catch (error) {
                console.error("Error loading patient data:", error);
                setToast({ message: "Error al cargar datos del paciente", type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [patientId, reset]);

    const onSubmit = async (data: InitialHistoryFormData) => {
        try {
            // Add metadata
            const historyToSave: Omit<InitialHistory, 'id'> = {
                ...data,
                patientId,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                specialtyId: specialty?.id || 'general',
            };

            if (isOnline) {
                await api.createHistory(historyToSave);
                setToast({ message: "Historia clínica guardada correctamente", type: 'success' });
            } else {
                // The API lib handles queuing
                await api.createHistory(historyToSave);
                setToast({ message: "Guardado localmente (sin conexión). Se sincronizará al volver.", type: 'success' });
            }

            // Redirect after delay
            setTimeout(() => {
                router.push(`/dashboard/patients/${patientId}`);
            }, 2000);

        } catch (error) {
            console.error("Error saving history:", error);
            setToast({ message: "Error al guardar la historia clínica", type: 'error' });
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50/50 backdrop-blur-sm">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#083C79]" />
                    <p className="mt-4 text-lg font-bold text-gray-700">Preparando expediente clínico...</p>
                    <p className="text-sm text-gray-500">Cifrado de extremo a extremo activo</p>
                </div>
            </div>
        );
    }

    if (!patient) return null;

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-[#F8FAFC]">
                {/* Header sticky */}
                <div className="sticky top-0 z-30 w-full bg-white/80 border-b border-gray-200 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <FileText className="text-[#083C79]" size={24} />
                                    Nueva Historia Clínica - {specialty?.nameEs || 'Médica'}
                                </h1>
                                <p className="text-sm text-gray-500 font-medium">
                                    Paciente: {patient.firstName} {patient.lastName} ({patient.sex})
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
                                {specialty && <specialty.icon size={14} />}
                                {specialty?.category.replace('_', ' ').toUpperCase()}
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${isOnline ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                {isOnline ? <Signal size={14} /> : <SignalLow size={14} />}
                                {isOnline ? 'EN LÍNEA' : 'MODO OFFLINE'}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto px-4 py-8 space-y-8">

                    {/* Quick Search / Navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingLabelInput
                            label="Buscar en expediente previo..."
                            icon={FileText}
                            placeholder="Ej: Biopsias, Cirugías..."
                            className="bg-white shadow-sm"
                        />
                        <div className="flex items-center justify-end gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Estado de Validación:
                            <span className={Object.keys(errors).length > 0 ? 'text-red-500' : 'text-green-500'}>
                                {Object.keys(errors).length > 0 ? 'Errores detectados' : 'Formulario válido'}
                            </span>
                        </div>
                    </div>

                    {/* Sections */}
                    <MotivesSection onShowObesityModal={() => setShowObesityModal(true)} />

                    {specialty?.id === 'gastroenterology' && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-4">
                            <div className="bg-amber-100 p-2 rounded-lg">
                                <Activity className="text-amber-700" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-900 leading-tight">Módulo de Obesidad Activo</h4>
                                <p className="text-amber-800 text-xs">Se han habilitado los campos de control metabólico y cirugía bariátrica.</p>
                            </div>
                        </div>
                    )}

                    <DiseaseHistorySection />
                    <PathologicalAntecedentsSection patient={patient} />
                    <NonPathologicalAntecedentsSection />
                    <FamilyHistorySection />
                    <PhysicalExamSection isOnline={isOnline} />
                    <TreatmentPlanSection isOnline={isOnline} />

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 max-w-xs italic">
                            Los datos se guardan localmente de forma automática para prevenir pérdida de información.
                        </p>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#083C79] to-[#1054A2] text-white rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
                            {isSubmitting ? 'Guardando...' : 'Finalizar y Guardar Historia'}
                        </button>
                    </div>
                </form>

                {/* Modals & Overlays */}
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
