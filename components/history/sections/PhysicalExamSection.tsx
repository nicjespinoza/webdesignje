
import React, { useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { PhysicalExamSection as SystemsReviewSection } from '@/components/ui/FormComponents';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import { AlertCircle } from 'lucide-react';

const INPUT_CLASS = "w-full px-4 py-2.5 bg-gray-50 border-2 border-black text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 block transition-all duration-200 outline-none placeholder-gray-400 hover:bg-white";

const NumericInput = ({
    label, value, onChange, min, max, step = "1", unit = "", placeholder = "", isOnline = true
}: {
    label: string; value: string; onChange: (v: string) => void;
    min?: number; max?: number; step?: string; unit?: string; placeholder?: string; isOnline?: boolean;
}) => {
    const baseClass = isOnline ? INPUT_CLASS : INPUT_CLASS.replace('border-black', 'border-red-500');
    const inputId = React.useId();

    return (
        <div className="flex-1">
            <label htmlFor={inputId} className="block text-xs uppercase font-bold text-gray-500 mb-1">{label}</label>
            <div className="relative">
                <input
                    id={inputId}
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`${baseClass} ${unit ? 'pr-12' : ''}`}
                />
                {unit && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
};

interface PhysicalExamSectionProps {
    isOnline?: boolean;
}

export const PhysicalExamSection: React.FC<PhysicalExamSectionProps> = ({ isOnline = true }) => {
    const { watch, setValue, getValues } = useFormContext<InitialHistoryFormData>();
    const physicalExam = watch('physicalExam');

    // Calculate IMC
    const currentWeight = watch('physicalExam.weight');
    const currentHeight = watch('physicalExam.height');

    const calculatedImc = useMemo(() => {
        const weight = parseFloat(currentWeight);
        const heightCm = parseFloat(currentHeight);
        if (weight > 0 && heightCm > 0) {
            const heightM = heightCm / 100;
            return (weight / (heightM * heightM)).toFixed(1);
        }
        return '';
    }, [currentWeight, currentHeight]);

    useEffect(() => {
        const currentImc = getValues('physicalExam.imc');
        if (calculatedImc && calculatedImc !== currentImc) {
            setValue('physicalExam.imc', calculatedImc, { shouldValidate: true });
        }
    }, [calculatedImc, setValue, getValues]);

    const getIMCClassification = (imc: number): string => {
        if (imc < 18.5) return 'Bajo peso';
        if (imc < 25) return 'Peso normal';
        if (imc < 30) return 'Sobrepeso';
        if (imc < 35) return 'Obesidad de clase I';
        if (imc < 40) return 'Obesidad de clase II';
        return 'Obesidad de clase III (mórbida)';
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">V. Signos Vitales</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <NumericInput
                        label="FC"
                        value={physicalExam.fc}
                        onChange={v => setValue('physicalExam.fc', v, { shouldDirty: true })}
                        min={40} max={200} unit="lpm" placeholder="60-100"
                        isOnline={isOnline}
                    />
                    <NumericInput
                        label="FR"
                        value={physicalExam.fr}
                        onChange={v => setValue('physicalExam.fr', v, { shouldDirty: true })}
                        min={8} max={40} unit="rpm" placeholder="12-20"
                        isOnline={isOnline}
                    />
                    <NumericInput
                        label="Temperatura"
                        value={physicalExam.temp}
                        onChange={v => setValue('physicalExam.temp', v, { shouldDirty: true })}
                        min={34} max={42} step="0.1" unit="°C" placeholder="36.5"
                        isOnline={isOnline}
                    />
                    <NumericInput
                        label="SatO2"
                        value={physicalExam.sat02}
                        onChange={v => setValue('physicalExam.sat02', v, { shouldDirty: true })}
                        min={70} max={100} unit="%" placeholder="95-100"
                        isOnline={isOnline}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <FloatingLabelInput
                        label="PA (mmHg)"
                        value={physicalExam.pa}
                        onChange={e => setValue('physicalExam.pa', e.target.value, { shouldDirty: true })}
                        placeholder="120/80"
                        wrapperClassName={`border-2 ${isOnline ? 'border-black' : 'border-red-500'}`}
                    />
                    <FloatingLabelInput
                        label="PAM (mmHg)"
                        value={physicalExam.pam}
                        onChange={e => setValue('physicalExam.pam', e.target.value, { shouldDirty: true })}
                        placeholder="93"
                        wrapperClassName={`border-2 ${isOnline ? 'border-black' : 'border-red-500'}`}
                    />
                    <NumericInput
                        label="Peso"
                        value={physicalExam.weight}
                        onChange={v => setValue('physicalExam.weight', v, { shouldDirty: true })}
                        min={1} max={500} step="0.1" unit="kg" placeholder="70"
                    />
                    <NumericInput
                        label="Altura"
                        value={physicalExam.height}
                        onChange={v => setValue('physicalExam.height', v, { shouldDirty: true })}
                        min={30} max={250} unit="cm" placeholder="170"
                    />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                        <span className="text-blue-700 font-bold">IMC:</span>
                        <span className="text-blue-600 md:text-lg">{physicalExam.imc || '-'} kg/m²</span>
                        {physicalExam.imc && (
                            <span className="ml-2 text-xs md:text-sm font-medium text-blue-800 bg-blue-100 px-2 py-1 rounded-full flex items-center gap-1">
                                <AlertCircle size={12} />
                                {getIMCClassification(parseFloat(physicalExam.imc))}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <SystemsReviewSection
                data={physicalExam}
                onChange={(d: any) => setValue('physicalExam', d, { shouldDirty: true })}
                hideVitals={true}
                title="VI. Examen Físico por Sistemas"
            />
        </>
    );
};
