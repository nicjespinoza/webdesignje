
import React, { useCallback } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import { Plus, Trash2 } from 'lucide-react';
import { PANEL_BASICO_PRESET, PANEL_AMPLIADO_PRESET, PANEL_HECES_PRESET } from '@/constants';

interface TreatmentPlanSectionProps {
    isOnline?: boolean;
}

const INPUT_CLASS = "w-full px-4 py-2.5 bg-gray-50 border-2 border-black text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 block transition-all duration-200 outline-none placeholder-gray-400 hover:bg-white";

export const TreatmentPlanSection: React.FC<TreatmentPlanSectionProps> = ({ isOnline = true }) => {
    const { control, watch, setValue, register } = useFormContext<InitialHistoryFormData>();

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


    // Treatment Arrays (Meds, Exams, Norms)
    // Helper to get array from current value which might be string or array
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
    const { fields: orderFields, append: appendOrder, remove: removeOrder, update: updateOrder } = useFieldArray({
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
        <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">VII. Diagnóstico y Tratamiento</h3>

                {/* Diagnosis */}
                <div className="mb-6">
                    <h4 className="font-bold text-gray-700 mb-2">Diagnóstico(s)</h4>
                    {diagnoses.length === 0 && (
                        <div className="mb-2">
                            <input
                                className={isOnline ? INPUT_CLASS : INPUT_CLASS.replace('border-black', 'border-red-500')}
                                placeholder="Diagnóstico..."
                                onChange={(e) => setValue('diagnoses', [e.target.value], { shouldDirty: true })}
                            />
                        </div>
                    )}
                    {diagnoses.map((diag, i) => (
                        <div key={i} className="mb-2 relative">
                            <input
                                type="text"
                                value={diag}
                                onChange={e => handleDiagnosisChange(i, e.target.value)}
                                placeholder={`Diagnóstico ${i + 1}...`}
                                className={isOnline ? INPUT_CLASS : INPUT_CLASS.replace('border-black', 'border-red-500')}
                            />
                            {diagnoses.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveDiagnosis(i)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddDiagnosis}
                        className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1 mt-2"
                    >
                        <Plus size={16} /> Agregar diagnóstico
                    </button>
                    {/* Legacy text area fallback or for simple input */}
                    <div className="mt-4">
                        <Controller
                            name="diagnosis"
                            control={control}
                            render={({ field }) => (
                                <FloatingLabelInput
                                    label="Resumen / Comentarios adicionales del diagnóstico"
                                    as="textarea"
                                    rows={2}
                                    value={field.value}
                                    onChange={field.onChange}
                                    wrapperClassName="bg-white border-2 border-gray-200"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Alimentación */}
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Alimentación</h4>
                        <FloatingLabelInput
                            label="Detalles de alimentación"
                            as="textarea"
                            rows={2}
                            value={watch('treatment.food') as string}
                            onChange={e => setValue('treatment.food', e.target.value, { shouldDirty: true })}
                            wrapperClassName={`border-2 ${isOnline ? 'border-black' : 'border-red-500'}`}
                        />
                    </div>

                    {/* Medicamentos - Lista */}
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Medicamentos</h4>
                        {getTreatmentArray('meds').map((med, i) => (
                            <div key={i} className="mb-2 relative group">
                                <input
                                    type="text"
                                    value={med}
                                    onChange={e => handleTreatmentChange('meds', i, e.target.value)}
                                    placeholder="Medicamento y dosis..."
                                    className={isOnline ? INPUT_CLASS : INPUT_CLASS.replace('border-black', 'border-red-500')}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTreatmentItem('meds', i)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addTreatmentItem('meds')} className="text-blue-600 text-sm hover:underline">+ Agregar medicamento</button>
                    </div>

                    {/* Exámenes - Lista */}
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Exámenes</h4>
                        {getTreatmentArray('exams').map((exam, i) => (
                            <div key={i} className="mb-2 relative group">
                                <input
                                    type="text"
                                    value={exam}
                                    onChange={e => handleTreatmentChange('exams', i, e.target.value)}
                                    placeholder="Examen..."
                                    className={isOnline ? INPUT_CLASS : INPUT_CLASS.replace('border-black', 'border-red-500')}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTreatmentItem('exams', i)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addTreatmentItem('exams')} className="text-blue-600 text-sm hover:underline">+ Agregar examen</button>
                    </div>

                    {/* Normas - Lista */}
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Normas e Indicaciones</h4>
                        {getTreatmentArray('norms').map((norm, i) => (
                            <div key={i} className="mb-2 relative group">
                                <input
                                    type="text"
                                    value={norm}
                                    onChange={e => handleTreatmentChange('norms', i, e.target.value)}
                                    placeholder="Indicación..."
                                    className={isOnline ? INPUT_CLASS : INPUT_CLASS.replace('border-black', 'border-red-500')}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTreatmentItem('norms', i)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addTreatmentItem('norms')} className="text-blue-600 text-sm hover:underline">+ Agregar indicación</button>
                    </div>
                </div>
            </div>

            {/* VIII. Orden Médica (New UI) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">VIII. Orden Médica</h3>
                <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <button
                        type="button"
                        onClick={() => addMedicalOrder('prescription')}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 transition flex items-center gap-2"
                    >
                        <Plus size={16} /> Receta
                    </button>

                    <div className="relative group">
                        <button type="button" className="bg-[#083C79] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#062a55] transition flex items-center gap-2">
                            <Plus size={16} /> Laboratorio
                        </button>
                        <div className="absolute top-full left-0 w-full h-4 bg-transparent z-10 hidden group-hover:block -mt-2"></div>
                        <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 hidden group-hover:block">
                            <button type="button" onClick={() => addMedicalOrder('lab_general')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">General</button>
                            <button type="button" onClick={() => addMedicalOrder('lab_basic', PANEL_BASICO_PRESET)} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Panel Básico</button>
                            <button type="button" onClick={() => addMedicalOrder('lab_extended', PANEL_AMPLIADO_PRESET)} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Panel Ampliado</button>
                            <button type="button" onClick={() => addMedicalOrder('lab_feces', PANEL_HECES_PRESET)} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">Panel Heces</button>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => addMedicalOrder('image')}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-700 transition flex items-center gap-2"
                    >
                        <Plus size={16} /> Imágenes
                    </button>

                    <button
                        type="button"
                        onClick={() => addMedicalOrder('endoscopy')}
                        className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-amber-700 transition flex items-center gap-2"
                    >
                        <Plus size={16} /> Endoscopia
                    </button>
                </div>

                <div className="space-y-6">
                    {orderFields.map((order, index) => (
                        <div key={order.id} className="relative bg-white border-2 border-gray-100 rounded-xl p-4 shadow-sm group animate-in fade-in slide-in-from-top-2">
                            <button
                                type="button"
                                onClick={() => removeOrder(index)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="mb-3">
                                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${order.type === 'prescription' ? 'bg-emerald-100 text-emerald-700' :
                                        order.type.startsWith('lab') ? 'bg-blue-100 text-blue-700' :
                                            order.type === 'image' ? 'bg-purple-100 text-purple-700' :
                                                'bg-amber-100 text-amber-700'
                                    }`}>
                                    {order.type === 'prescription' ? 'Receta Médica' : order.type.startsWith('lab') ? 'Laboratorio' : order.type === 'image' ? 'Estudio de Imagen' : 'Endoscopia'}
                                </span>
                            </div>
                            <div className="space-y-3">
                                <Controller
                                    name={`medicalOrders.${index}.diagnosis`}
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Diagnóstico / Razón"
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="border-2 border-gray-100"
                                        />
                                    )}
                                />
                                <Controller
                                    name={`medicalOrders.${index}.content`}
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Contenido / Detalles"
                                            as="textarea"
                                            rows={3}
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="border-2 border-gray-100"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                    {orderFields.length === 0 && <p className="text-center text-gray-400 py-4 italic">No hay órdenes médicas agregadas</p>}
                </div>
            </div>
        </>
    );
};
