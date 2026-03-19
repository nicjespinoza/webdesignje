
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FloatingLabelInput } from '@/components/medical/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';

export const DiseaseHistorySection: React.FC = () => {
    const { control } = useFormContext<InitialHistoryFormData>();

    return (
        <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
                <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Historia de la Enfermedad</h3>
            </div>

            <div className="space-y-12">
                <Controller
                    name="evolutionTime"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            label="Tiempo de evolución"
                            value={field.value}
                            onChange={field.onChange}
                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                        />
                    )}
                />
                <div className="pt-8 border-t border-white/5">
                    <Controller
                        name="historyOfPresentIllness"
                        control={control}
                        render={({ field }) => (
                            <FloatingLabelInput
                                label="Historia actual de la enfermedad"
                                as="textarea"
                                rows={6}
                                value={field.value}
                                onChange={field.onChange}
                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
