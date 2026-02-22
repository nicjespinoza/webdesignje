
import React, { memo, useCallback } from 'react';
import { useFormContext, useWatch, Controller } from 'react-hook-form';
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">V. ANTECEDENTES MÉDICOS FAMILIARES</h3>
            <div className="mb-6 pb-4 border-b-2 border-gray-900 last:border-0 last:mb-0 last:pb-0">
                <YesNo label="Generales" value={familyHistory} onChange={(k, v) => setValue('familyHistory', handleExclusiveChange(familyHistory, k, v), { shouldDirty: true })} />
                {familyHistory?.yes && (
                    <div className="pl-0 mt-4 bg-gray-50/50 p-3 md:p-4 rounded-xl border border-gray-200/50 animate-in fade-in slide-in-from-top-2">
                        <CheckboxList items={C.FAMILY_LIST} data={familyHistory.list || {}} onChange={(k, v) => {
                            setValue('familyHistory', {
                                ...familyHistory,
                                list: { ...(familyHistory.list || {}), [k]: v }
                            }, { shouldDirty: true });
                        }} />

                        {/* Conditional details for Cáncer */}
                        {(familyHistory.list?.['Cancer'] || familyHistory.list?.['Cáncer']) && (
                            <div className="mt-4 animate-in zoom-in-95 duration-200">
                                <Controller
                                    name="familyHistory.cancerDetails"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="¿Cuáles?"
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-white border-2 border-orange-200 rounded-xl focus-within:border-[#083C79]"
                                        />
                                    )}
                                />
                            </div>
                        )}

                        <div className="mt-4">
                            <FloatingLabelInput
                                label="Otra/cual?"
                                value={familyHistory.other || ''}
                                onChange={(e) => setValue('familyHistory', { ...familyHistory, other: e.target.value }, { shouldDirty: true })}
                                wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
