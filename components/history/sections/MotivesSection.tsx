
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MOTIVES_LIST } from '@/constants';
import { CheckboxList } from '@/components/ui/FormComponents';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';

interface MotivesSectionProps {
    onShowObesityModal: () => void;
}

export const MotivesSection: React.FC<MotivesSectionProps> = ({ onShowObesityModal }) => {
    const { control, watch, setValue } = useFormContext<InitialHistoryFormData>();
    const motives = watch('motives');

    const handleMotiveChange = (k: string, v: boolean) => {
        setValue('motives', { ...motives, [k]: v }, { shouldDirty: true });
        if (k === 'Obesidad' && v) {
            onShowObesityModal();
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">Motivo de Consulta</h3>

            <CheckboxList items={MOTIVES_LIST} data={motives} onChange={handleMotiveChange} />

            {/* Conditional Cancer Details for Motives */}
            {(motives?.['Cáncer'] || motives?.['Cancer']) && (
                <div className="mt-4 animate-in zoom-in-95 duration-200">
                    <Controller
                        name="motivesCancerDetails"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput
                                label="¿Cuáles? (Cáncer)"
                                value={field.value}
                                onChange={field.onChange}
                                wrapperClassName="bg-white border-2 border-orange-200 rounded-xl focus-within:border-[#083C79]"
                            />
                        )}
                    />
                </div>
            )}

            {motives?.['Obesidad'] && (
                <div className="mt-2">
                    <button
                        type="button"
                        onClick={onShowObesityModal}
                        className="text-sm text-[#083C79] hover:text-[#062a55] font-medium underline"
                    >
                        Ver detalles de Obesidad
                    </button>
                </div>
            )}
            <div className="mt-6">
                <Controller
                    name="otherMotive"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            label="Otros Motivos"
                            value={field.value}
                            onChange={field.onChange}
                            wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                        />
                    )}
                />
            </div>
        </div>
    );
};
