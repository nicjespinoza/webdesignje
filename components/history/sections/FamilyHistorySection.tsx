
import React, { memo, useCallback } from 'react';
import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { YesNo, CheckboxList } from '@/components/ui/FormComponents';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import * as C from '@/constants';

// Handle Exclusive Change Helper (Reused)
const handleExclusiveChange = (current: any, key: string, value: boolean) => {
    const newState = { ...current, [key]: value };
    if (value) {
        if (key === 'yes') newState.no = false;
        else if (key === 'no') newState.yes = false;
    } else {
        if (!newState.yes && !newState.no) newState.no = true;
    }
    return newState;
};


interface FamilyHistorySectionProps { }

export const FamilyHistorySection: React.FC<FamilyHistorySectionProps> = () => {
    const { control, setValue, getValues, watch } = useFormContext<InitialHistoryFormData>();
    const familyHistory = watch('familyHistory');

    return (
        <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Antecedentes Médicos Familiares</h3>
            </div>

            <div className="space-y-8">
                <YesNo label="Antecedentes Generales" value={familyHistory} onChange={(k, v) => setValue('familyHistory', handleExclusiveChange(familyHistory, k, v), { shouldDirty: true })} />

                {familyHistory?.yes && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-8 pt-8 border-t border-white/5"
                    >
                        <div className="p-10 rounded-[2.5rem] bg-black/20 border border-white/5">
                            <CheckboxList items={C.FAMILY_LIST} data={familyHistory.list || {}} onChange={(k, v) => {
                                setValue('familyHistory', {
                                    ...familyHistory,
                                    list: { ...(familyHistory.list || {}), [k]: v }
                                }, { shouldDirty: true });
                            }} />
                        </div>

                        {/* Conditional details for Cáncer */}
                        {(familyHistory.list?.['Cancer'] || familyHistory.list?.['Cáncer']) && (
                            <Controller
                                name="familyHistory.cancerDetails"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="¿Cuáles diagnósticos de cáncer? (Familia)"
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                    />
                                )}
                            />
                        )}

                        <div className="pt-4">
                            <FloatingLabelInput
                                label="Otras especificaciones familiares"
                                as="textarea"
                                rows={2}
                                value={familyHistory.other || ''}
                                onChange={(e) => setValue('familyHistory', { ...familyHistory, other: e.target.value }, { shouldDirty: true })}
                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
