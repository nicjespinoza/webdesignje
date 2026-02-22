
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';

export const DiseaseHistorySection: React.FC = () => {
    const { control } = useFormContext<InitialHistoryFormData>();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">Historia de la Enfermedad</h3>
            <div className="space-y-6">
                <Controller
                    name="evolutionTime"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            label="Tiempo de evolución"
                            value={field.value}
                            onChange={field.onChange}
                            wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                        />
                    )}
                />
                <Controller
                    name="historyOfPresentIllness"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            label="Historia actual de la enfermedad"
                            as="textarea"
                            rows={5}
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
