"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { Save, ArrowLeft, Loader2, Plus, Trash2, Activity } from 'lucide-react';

import { api } from '@/lib/api';
import { Patient, SubsequentConsult } from '@/types';
import * as C from '@/data/medical-constants';

// UI Components
import { FloatingLabelInput } from '@/components/medical/premium-ui/FloatingLabelInput';
import { CheckboxList, PhysicalExamSection } from '@/components/medical/ui/FormComponents';
import { ObesityHistoryModal } from '@/components/medical/ObesityHistoryModal';
import { toast } from 'react-hot-toast';

import { motion } from 'framer-motion';
import { getSpecialtyById, Specialty } from '@/lib/specialties';

export default function NewConsultClient() {
    const router = useRouter();
    const params = useParams();
    const patientId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [showObesityModal, setShowObesityModal] = useState(false);
    const [specialty, setSpecialty] = useState<Specialty | null>(null);

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

    const { handleSubmit, watch, setValue, formState: { isSubmitting } } = methods;

    useEffect(() => {
        const loadPatient = async () => {
            if (!patientId) return;
            try {
                // Detect Specialty
                const specId = typeof window !== 'undefined' ? localStorage.getItem('selectedSpecialty') || 'gastroenterology' : 'gastroenterology';
                const specData = getSpecialtyById(specId);
                setSpecialty(specData);

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
                                <h1 className="text-2xl font-black text-foreground tracking-tight">Nueva Consulta - {specialty?.nameEs}</h1>
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
                    <div className="bg-card/60 backdrop-blur-3xl p-10 rounded-[3rem] shadow-soft border border-border/50 grid grid-cols-1 md:grid-cols-2 gap-8 hover:border-border transition-all">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Fecha Programada
                            </label>
                            <input type="date" {...methods.register('date')} className="w-full p-5 bg-background border border-border/40 rounded-[1.5rem] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-foreground shadow-inner" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Hora de Inicio
                            </label>
                            <input type="time" {...methods.register('time')} className="w-full p-5 bg-background border border-border/40 rounded-[1.5rem] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-foreground shadow-inner" />
                        </div>
                    </div>

                    {/* Motives Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/60 backdrop-blur-3xl p-10 rounded-[3rem] shadow-soft border border-border/50 group hover:border-border transition-all"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-indigo-500/10 rounded-[1.5rem] border border-indigo-500/20 shadow-inner group-hover:scale-105 transition-transform">
                                <Plus className="text-indigo-500" size={24} />
                            </div>
                            <h3 className="text-xl font-black text-foreground uppercase tracking-[0.2em]">Motivo de Consulta</h3>
                        </div>

                        <div className="bg-background/50 p-6 rounded-[2.5rem] border border-border/40">
                            <CheckboxList
                                items={C.MOTIVES_LIST}
                                data={motives}
                                onChange={(key, val) => {
                                    setValue(`motives.${key}`, val);
                                    if (key === 'Obesidad' && val) setShowObesityModal(true);
                                }}
                            />
                        </div>

                        <div className="mt-10 space-y-8">
                            <FloatingLabelInput label="Especificaciones / Otros Motivos" {...methods.register('otherMotive')} wrapperClassName="border-none bg-background/50 shadow-none hover:bg-background/80" />
                            <FloatingLabelInput label="Tiempo de Evolución de los Síntomas" {...methods.register('evolutionTime')} wrapperClassName="border-none bg-background/50 shadow-none hover:bg-background/80" />
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
                        className="bg-card/60 backdrop-blur-3xl p-10 rounded-[3rem] shadow-soft border border-border/50 group hover:border-border transition-all"
                    >
                        <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-[0.2em] flex items-center gap-4">
                            <span className="w-8 h-1 bg-primary rounded-full"></span>
                            Historia de la Enfermedad
                        </h3>
                        <FloatingLabelInput label="Descripción detallada de la evolución clínica..." as="textarea" rows={6} {...methods.register('historyOfPresentIllness')} wrapperClassName="border-none bg-background/50 shadow-none hover:bg-background/80" />
                    </motion.section>

                    {/* Diagnosis */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/60 backdrop-blur-3xl p-10 rounded-[3rem] shadow-soft border border-border/50 group hover:border-border transition-all"
                    >
                        <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-[0.2em] flex items-center gap-4">
                            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                            Diagnósticos Clínicos
                        </h3>
                        <div className="space-y-4">
                            {watch('diagnoses').map((_, i) => (
                                <div key={i} className="flex gap-4 group/input">
                                    <div className="flex-1 relative">
                                        <input
                                            className="w-full p-5 bg-background border border-border/40 rounded-[1.5rem] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-bold text-foreground shadow-inner"
                                            placeholder={`Diagnóstico principal o diferencial ${i + 1}...`}
                                            {...methods.register(`diagnoses.${i}`)}
                                        />
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 opacity-50 group-focus-within/input:opacity-100 transition-opacity" />
                                    </div>
                                    {i > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setValue('diagnoses', watch('diagnoses').filter((_, idx) => idx !== i))}
                                            className="p-5 text-muted-foreground hover:text-destructive bg-muted/20 hover:bg-destructive/10 rounded-[1.5rem] transition-all border border-transparent hover:border-destructive/20 shadow-inner"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setValue('diagnoses', [...watch('diagnoses'), ''])}
                                className="mt-4 px-8 py-4 rounded-[1.5rem] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 w-fit"
                            >
                                <Plus size={16} /> Agregar Revisor Diagnóstico
                            </button>
                        </div>
                    </motion.section>

                    {/* Treatment Plan */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/60 backdrop-blur-3xl p-10 rounded-[3rem] shadow-soft border border-border/50 group hover:border-border transition-all"
                    >
                        <h3 className="text-xl font-black text-foreground mb-8 uppercase tracking-[0.2em] flex items-center gap-4">
                            <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                            Plan Farmacológico y Nutricional
                        </h3>
                        <div className="space-y-10">
                            <FloatingLabelInput label="Indicaciones Nutricionales y Hábitos" as="textarea" rows={3} {...methods.register('treatment.food')} wrapperClassName="border-none bg-background/50 shadow-none hover:bg-background/80" />
                            <div>
                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 block ml-4">Prescripción de Medicamentos</label>
                                {watch('treatment.meds').map((_, i) => (
                                    <div key={i} className="flex gap-4 mb-4 group/med">
                                        <input className="flex-1 p-5 bg-background border border-border/40 rounded-[1.5rem] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all font-bold text-foreground shadow-inner" placeholder={`Nombre comercial / Genérico / Posología ${i + 1}...`} {...methods.register(`treatment.meds.${i}`)} />
                                        <button type="button" onClick={() => setValue('treatment.meds', watch('treatment.meds').filter((_, idx) => idx !== i))} className="p-5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-[1.5rem] transition-all"><Trash2 size={20} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setValue('treatment.meds', [...watch('treatment.meds'), ''])} className="px-8 py-4 rounded-[1.5rem] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-amber-500/20 transition-all border border-amber-500/20">
                                    <Plus size={16} /> Añadir Fármaco
                                </button>
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
