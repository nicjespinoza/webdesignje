"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { Save, ArrowLeft, Loader2, AlertCircle, Plus, Trash2 } from 'lucide-react';

import { api } from '@/lib/api';
import { Patient, SubsequentConsult } from '@/types';
import * as C from '@/constants';

// UI Components
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { CheckboxList, PhysicalExamSection } from '@/components/ui/FormComponents';
import { ObesityHistoryModal } from '@/components/ObesityHistoryModal';
import { toast } from 'react-hot-toast';

import { motion } from 'framer-motion';

export default function NewConsultPage() {
    const router = useRouter();
    const params = useParams();
    const patientId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [showObesityModal, setShowObesityModal] = useState(false);

    const methods = useForm<SubsequentConsult>({
        defaultValues: {
            patientId: patientId,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            motives: {},
            otherMotive: '',
            evolutionTime: '',
            historyOfPresentIllness: '',
            physicalExam: {
                fc: '', fr: '', temp: '', pa: '', pam: '', sat02: '', weight: '', height: '', imc: '',
                systems: C.SYSTEMS_LIST.reduce((acc, sys) => ({ ...acc, [sys]: { normal: true, abnormal: false, description: '' } }), {})
            },
            labs: { performed: { yes: false, no: true }, results: '' },
            comments: '',
            diagnoses: [''],
            treatment: {
                food: '',
                meds: [''],
                exams: [''],
                norms: ['']
            },
            status: 'completed'
        }
    });

    const { handleSubmit, watch, setValue, reset, formState: { isSubmitting } } = methods;

    useEffect(() => {
        const loadPatient = async () => {
            if (!patientId) return;
            try {
                const data = await api.getPatient(patientId);
                setPatient(data);
                setValue('patientId', patientId);
            } catch (error) {
                toast.error("Error al cargar paciente");
            } finally {
                setLoading(false);
            }
        };
        loadPatient();
    }, [patientId, setValue]);

    const weight = watch('physicalExam.weight');
    const height = watch('physicalExam.height');
    useEffect(() => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        if (w > 0 && h > 0) {
            const imc = (w / ((h / 100) ** 2)).toFixed(1);
            setValue('physicalExam.imc', imc);
        }
    }, [weight, height, setValue]);

    const onSubmit = async (data: SubsequentConsult) => {
        try {
            await api.createConsult(data as any);
            toast.success("Consulta guardada");
            router.push(`/dashboard/patients/${patientId}`);
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" size={48} /></div>;
    if (!patient) return <div className="h-screen flex items-center justify-center text-foreground font-black uppercase tracking-widest bg-background">Paciente no encontrado</div>;

    const motives = watch('motives');

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-background transition-colors duration-300">
                {/* Modern Fixed Header */}
                <div className="sticky top-0 z-40 bg-card/70 backdrop-blur-3xl border-b border-border px-8 h-24 flex items-center justify-between shadow-soft">
                    <div className="flex items-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => router.back()}
                            className="p-3 bg-muted hover:bg-muted/80 rounded-2xl transition-all border border-border"
                        >
                            <ArrowLeft size={20} className="text-foreground" />
                        </motion.button>
                        <div>
                            <div className="flex items-center gap-3">
                                <Activity className="text-emerald-500" size={20} />
                                <h1 className="text-2xl font-black text-foreground tracking-tight">Nueva Consulta</h1>
                            </div>
                            <p className="text-xs font-bold text-muted-foreground uppercase mt-0.5 tracking-widest italic">{patient.firstName} {patient.lastName}</p>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="bg-primary text-primary-foreground px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all border border-primary/20"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Finalizar Consulta
                    </motion.button>
                </div>

                <div className="max-w-5xl mx-auto p-8 md:p-12 space-y-12 pb-40 relative z-10">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

                    {/* Basic Info Card */}
                    <div className="bg-card/40 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-soft border border-border grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Fecha Programada</label>
                            <input type="date" {...methods.register('date')} className="w-full p-4 bg-muted/50 border border-border rounded-2xl focus:border-primary outline-none transition-all font-bold text-foreground" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-2">Hora de Inicio</label>
                            <input type="time" {...methods.register('time')} className="w-full p-4 bg-muted/50 border border-border rounded-2xl focus:border-primary outline-none transition-all font-bold text-foreground" />
                        </div>
                    </div>

                    {/* Motives Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/40 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-soft border border-border"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                <Plus className="text-indigo-500" size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-foreground tracking-tight">Motivo de Consulta</h3>
                        </div>

                        <CheckboxList
                            items={C.MOTIVES_LIST}
                            data={motives}
                            onChange={(key, val) => {
                                setValue(`motives.${key}`, val);
                                if (key === 'Obesidad' && val) setShowObesityModal(true);
                            }}
                        />

                        <div className="mt-10 space-y-8">
                            <FloatingLabelInput label="Especificaciones / Otros Motivos" {...methods.register('otherMotive')} />
                            <FloatingLabelInput label="Tiempo de Evolución de los Síntomas" {...methods.register('evolutionTime')} />
                        </div>
                    </motion.section>

                    {/* Physical Exam - Using its own modernized component */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 px-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                <Activity className="text-emerald-500" size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-foreground tracking-tight">Constantes Vitales</h3>
                        </div>
                        <PhysicalExamSection
                            data={watch('physicalExam')}
                            onChange={(d) => setValue('physicalExam', d)}
                        />
                    </div>

                    {/* History of Illness */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/40 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-soft border border-border"
                    >
                        <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-widest border-l-4 border-primary pl-4">Historia de la Enfermedad</h3>
                        <FloatingLabelInput label="Descripción detallada de la evolución..." as="textarea" rows={6} {...methods.register('historyOfPresentIllness')} />
                    </motion.section>

                    {/* Diagnosis */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/40 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-soft border border-border"
                    >
                        <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-widest border-l-4 border-emerald-500 pl-4">Diagnósticos Clínicos</h3>
                        <div className="space-y-4">
                            {watch('diagnoses').map((_, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex-1 relative">
                                        <input
                                            className="w-full p-4 bg-muted/30 border border-border rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-foreground"
                                            placeholder={`Diagnóstico prioritario ${i + 1}`}
                                            {...methods.register(`diagnoses.${i}`)}
                                        />
                                        <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    {i > 0 && (
                                        <button
                                            onClick={() => setValue('diagnoses', watch('diagnoses').filter((_, idx) => idx !== i))}
                                            className="p-4 text-destructive bg-destructive/10 hover:bg-destructive hover:text-white rounded-2xl transition-all border border-destructive/20"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setValue('diagnoses', [...watch('diagnoses'), ''])}
                                className="mt-4 px-6 py-3 rounded-xl bg-muted text-foreground font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-border transition-all border border-border"
                            >
                                <Plus size={16} className="text-emerald-500" /> Nuevo Diagnóstico
                            </button>
                        </div>
                    </motion.section>

                    {/* Treatment Plan */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/40 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-soft border border-border"
                    >
                        <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-widest border-l-4 border-amber-500 pl-4">Plan Terapéutico</h3>
                        <div className="space-y-10">
                            <FloatingLabelInput label="Indicaciones Nutricionales" as="textarea" rows={3} {...methods.register('treatment.food')} />
                            <div>
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 block ml-2">Esquema Farmacológico</label>
                                {watch('treatment.meds').map((_, i) => (
                                    <div key={i} className="flex gap-4 mb-4">
                                        <input className="flex-1 p-4 bg-muted/30 border border-border rounded-2xl focus:border-amber-500 outline-none transition-all font-bold text-foreground" placeholder={`Medicamento ${i + 1}...`} {...methods.register(`treatment.meds.${i}`)} />
                                        <button onClick={() => setValue('treatment.meds', watch('treatment.meds').filter((_, idx) => idx !== i))} className="p-4 text-destructive hover:bg-destructive/10 rounded-2xl transition-all"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setValue('treatment.meds', [...watch('treatment.meds'), ''])} className="px-6 py-3 rounded-xl bg-muted text-foreground font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-border transition-all border border-border">+ Añadir Medicamento</button>
                            </div>
                        </div>
                    </motion.section>
                </div>

                <ObesityHistoryModal
                    isOpen={showObesityModal}
                    onClose={() => setShowObesityModal(false)}
                    onSave={(d) => {
                        setValue('obesityHistory', d);
                        setShowObesityModal(false);
                    }}
                    initialData={watch('obesityHistory')}
                />

                {/* Bottom Decorative Bar */}
                <div className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-indigo-500 to-emerald-500 z-50 shadow-2xl" />
            </div>
        </FormProvider>
    );
}
