import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { FloatingLabelInput } from '@/components/medical/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import { Plus, Trash2, ClipboardList, Stethoscope, Pill, Apple, FileSearch } from 'lucide-react';
import { PANEL_BASICO_PRESET, PANEL_AMPLIADO_PRESET, PANEL_HECES_PRESET } from '@/data/medical-constants';

interface TreatmentPlanSectionProps {
    isOnline?: boolean;
}

const INPUT_CLASS = "w-full px-8 py-5 bg-black/40 border border-white/5 text-white text-sm rounded-[2rem] focus:border-primary/40 outline-none transition-all placeholder:text-white/20 font-medium";

export const TreatmentPlanSection: React.FC<TreatmentPlanSectionProps> = ({ isOnline = true }) => {
    const { control, watch, setValue } = useFormContext<InitialHistoryFormData>();

    // Diagnosis
    const diagnoses = watch('diagnoses') || [];

    const handleAddDiagnosis = () => {
        setValue('diagnoses', [...diagnoses, ''], { shouldDirty: true });
    };

    const handleDiagnosisChange = (index: number, value: string) => {
        const newDiagnoses = [...diagnoses];
        newDiagnoses[index] = value;
        setValue('diagnoses', newDiagnoses, { shouldDirty: true });
    };

    const handleRemoveDiagnosis = (index: number) => {
        const newDiagnoses = [...diagnoses];
        newDiagnoses.splice(index, 1);
        setValue('diagnoses', newDiagnoses, { shouldDirty: true });
    };

    // Treatment Arrays
    const getTreatmentArray = (key: 'meds' | 'food' | 'exams' | 'norms'): string[] => {
        const val = watch(`treatment.${key}`);
        if (Array.isArray(val)) return val;
        if (typeof val === 'string' && val) return [val];
        return [];
    };

    const addTreatmentItem = (key: 'meds' | 'food' | 'exams' | 'norms') => {
        const current = getTreatmentArray(key);
        setValue(`treatment.${key}`, [...current, ''], { shouldDirty: true });
    };

    const handleTreatmentChange = (key: 'meds' | 'food' | 'exams' | 'norms', index: number, value: string) => {
        const current = getTreatmentArray(key);
        const newArray = [...current];
        newArray[index] = value;
        setValue(`treatment.${key}`, newArray, { shouldDirty: true });
    };

    const handleRemoveTreatmentItem = (key: 'meds' | 'food' | 'exams' | 'norms', index: number) => {
        const current = getTreatmentArray(key);
        const newArray = [...current];
        newArray.splice(index, 1);
        setValue(`treatment.${key}`, newArray, { shouldDirty: true });
    };

    // Medical Orders
    const { fields: orderFields, append: appendOrder, remove: removeOrder } = useFieldArray({
        control,
        name: 'medicalOrders'
    });

    const addMedicalOrder = (type: 'prescription' | 'lab_general' | 'lab_basic' | 'lab_extended' | 'lab_feces' | 'image' | 'endoscopy', presetOrders?: string[]) => {
        const newOrder = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            diagnosis: '',
            content: presetOrders ? presetOrders.join('\n') : ''
        };
        appendOrder(newOrder);
    };

    return (
        <div className="space-y-12">
            {/* VII. Diagnóstico y Tratamiento */}
            <div className="space-y-10">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Stethoscope size={14} className="text-primary" />
                    </div>
                    <h3 className="text-[11px] tracking-[0.4em] font-light text-white uppercase italic">Diagnóstico y Plan</h3>
                </div>

                {/* Diagnosis */}
                <div className="space-y-6">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold px-4">Impresión Diagnóstica</label>
                    <div className="space-y-3">
                        {diagnoses.length === 0 && (
                            <div className="relative">
                                <input
                                    className={INPUT_CLASS}
                                    placeholder="Diagnóstico principal..."
                                    onChange={(e) => setValue('diagnoses', [e.target.value], { shouldDirty: true })}
                                />
                                {!isOnline && <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                            </div>
                        )}
                        <AnimatePresence>
                            {diagnoses.map((diag, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative group"
                                >
                                    <input
                                        type="text"
                                        value={diag}
                                        onChange={e => handleDiagnosisChange(i, e.target.value)}
                                        placeholder={`Diagnóstico ${i + 1}...`}
                                        className={INPUT_CLASS}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDiagnosis(i)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddDiagnosis}
                        className="text-[9px] text-primary/60 hover:text-primary font-bold tracking-widest uppercase transition-colors px-4 flex items-center gap-2"
                    >
                        <Plus size={10} /> Agregar diagnóstico
                    </button>

                    <Controller
                        name="diagnosis"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput
                                label="Comentarios del diagnóstico"
                                as="textarea"
                                rows={2}
                                value={field.value}
                                onChange={field.onChange}
                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                            />
                        )}
                    />
                </div>

                <div className="space-y-12 pt-8 border-t border-white/5">
                    {/* Alimentación */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4">
                            <Apple size={12} className="text-primary/40" />
                            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Alimentación</label>
                        </div>
                        <FloatingLabelInput
                            label="Indicaciones dietéticas"
                            as="textarea"
                            rows={2}
                            value={watch('treatment.food') as string}
                            onChange={e => setValue('treatment.food', e.target.value, { shouldDirty: true })}
                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                        />
                    </div>

                    {/* Medicamentos */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4">
                            <Pill size={12} className="text-primary/40" />
                            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Medicamentos</label>
                        </div>
                        <div className="space-y-3">
                            {getTreatmentArray('meds').map((med, i) => (
                                <div key={i} className="relative group">
                                    <input
                                        type="text"
                                        value={med}
                                        onChange={e => handleTreatmentChange('meds', i, e.target.value)}
                                        placeholder="Medicamento y dosis..."
                                        className={INPUT_CLASS}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTreatmentItem('meds', i)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => addTreatmentItem('meds')} className="text-[9px] text-primary/60 hover:text-primary font-bold tracking-widest uppercase px-4">+ Agregar medicamento</button>
                    </div>

                    {/* Exámenes */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4">
                            <FileSearch size={12} className="text-primary/40" />
                            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Exámenes</label>
                        </div>
                        <div className="space-y-3">
                            {getTreatmentArray('exams').map((exam, i) => (
                                <div key={i} className="relative group">
                                    <input
                                        type="text"
                                        value={exam}
                                        onChange={e => handleTreatmentChange('exams', i, e.target.value)}
                                        placeholder="Examen..."
                                        className={INPUT_CLASS}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTreatmentItem('exams', i)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => addTreatmentItem('exams')} className="text-[9px] text-primary/60 hover:text-primary font-bold tracking-widest uppercase px-4">+ Agregar examen</button>
                    </div>

                    {/* Normas */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4">
                            <ClipboardList size={12} className="text-primary/40" />
                            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Indicaciones Generales</label>
                        </div>
                        <div className="space-y-3">
                            {getTreatmentArray('norms').map((norm, i) => (
                                <div key={i} className="relative group">
                                    <input
                                        type="text"
                                        value={norm}
                                        onChange={e => handleTreatmentChange('norms', i, e.target.value)}
                                        placeholder="Indicación..."
                                        className={INPUT_CLASS}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTreatmentItem('norms', i)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => addTreatmentItem('norms')} className="text-[9px] text-primary/60 hover:text-primary font-bold tracking-widest uppercase px-4">+ Agregar indicación</button>
                    </div>
                </div>
            </div>

            {/* VIII. Orden Médica */}
            <div className="pt-12 border-t border-white/5 space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Plus size={14} className="text-primary" />
                    </div>
                    <h3 className="text-[11px] tracking-[0.4em] font-light text-white uppercase italic">Órdenes Médicas</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => addMedicalOrder('prescription')}
                        className="bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-widest text-white/60 p-4 rounded-2xl hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all font-bold"
                    >
                        + Receta
                    </button>

                    <div className="grid grid-cols-1 gap-1">
                        <button
                            type="button"
                            onClick={() => addMedicalOrder('lab_general')}
                            className="bg-white/[0.03] border border-white/5 text-[8px] uppercase tracking-widest text-white/40 p-2 rounded-xl hover:bg-white/10 transition-all font-bold text-center"
                        >
                            + Lab General
                        </button>
                        <button
                            type="button"
                            onClick={() => addMedicalOrder('lab_extended', PANEL_AMPLIADO_PRESET)}
                            className="bg-white/[0.03] border border-white/5 text-[8px] uppercase tracking-widest text-white/40 p-2 rounded-xl hover:bg-white/10 transition-all font-bold text-center"
                        >
                            + Panel Full
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => addMedicalOrder('image')}
                        className="bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-widest text-white/60 p-4 rounded-2xl hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all font-bold"
                    >
                        + Imagen
                    </button>

                    <button
                        type="button"
                        onClick={() => addMedicalOrder('endoscopy')}
                        className="bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-widest text-white/60 p-4 rounded-2xl hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all font-bold"
                    >
                        + Endoscopia
                    </button>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {orderFields.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative bg-black/40 border border-white/5 rounded-[2.5rem] p-8 group transition-all hover:border-white/10"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeOrder(index)}
                                    className="absolute top-6 right-6 text-white/10 hover:text-rose-500 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>

                                <div className="mb-6">
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                                        {order.type === 'prescription' ? 'Receta' : order.type.startsWith('lab') ? 'Laboratorio' : order.type === 'image' ? 'Imagen' : 'Endoscopia'}
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <Controller
                                        name={`medicalOrders.${index}.diagnosis`}
                                        control={control}
                                        render={({ field }) => (
                                            <FloatingLabelInput
                                                label="Diagnóstico / Razón"
                                                value={field.value}
                                                onChange={field.onChange}
                                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={`medicalOrders.${index}.content`}
                                        control={control}
                                        render={({ field }) => (
                                            <FloatingLabelInput
                                                label="Detalles de la Orden"
                                                as="textarea"
                                                rows={3}
                                                value={field.value}
                                                onChange={field.onChange}
                                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                            />
                                        )}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {orderFields.length === 0 && (
                        <div className="text-center py-10 rounded-[2.5rem] border border-dashed border-white/5">
                            <p className="text-[8px] uppercase tracking-widest text-white/20 font-bold">No hay órdenes activas</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

