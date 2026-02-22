
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

// Reused GroupSection from Pathological (can be moved to common if needed, but keeping isolated for modularity)
const GroupSectionRHF = memo(({
    title,
    list,
    groupKey
}: {
    title: string,
    list: string[],
    groupKey: keyof InitialHistoryFormData
}) => {
    const { control, setValue, getValues } = useFormContext<InitialHistoryFormData>();
    const groupData = useWatch({ control, name: groupKey as any }) as any;

    const handleYesNoChange = useCallback((k: string, v: boolean) => {
        const current = getValues(groupKey as any) as any;
        setValue(groupKey as any, handleExclusiveChange(current, k, v), { shouldDirty: true });
    }, [groupKey, setValue, getValues]);

    const handleListChange = useCallback((k: string, v: boolean) => {
        const current = getValues(groupKey as any) as any;
        const listKey = current.conditions !== undefined ? 'conditions' : 'list';
        setValue(groupKey as any, {
            ...current,
            [listKey]: { ...(current[listKey] || {}), [k]: v }
        }, { shouldDirty: true });
    }, [groupKey, setValue, getValues]);

    const handleOtherChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const current = getValues(groupKey as any) as any;
        setValue(groupKey as any, { ...current, other: e.target.value }, { shouldDirty: true });
    }, [groupKey, setValue, getValues]);

    return (
        <div className="mb-6 pb-4 border-b-2 border-gray-900 last:border-0 last:mb-0 last:pb-0">
            <YesNo label={title} value={groupData} onChange={handleYesNoChange} />
            {groupData?.yes && (
                <div className="pl-0 mt-4 bg-gray-50/50 p-3 md:p-4 rounded-xl border border-gray-200/50 animate-in fade-in slide-in-from-top-2">
                    <CheckboxList items={list} data={groupData.conditions || groupData.list || {}} onChange={handleListChange} />
                    <div className="mt-4">
                        <FloatingLabelInput
                            label="Otra / Cual?"
                            value={groupData.other || ''}
                            onChange={handleOtherChange}
                            wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
});
GroupSectionRHF.displayName = 'GroupSectionRHF';


export const NonPathologicalAntecedentsSection: React.FC = () => {
    const { setValue, watch, control } = useFormContext<InitialHistoryFormData>();
    const habits = watch('habits');
    const transfusions = watch('transfusions') || { yes: false, no: true, reactions: { yes: false, no: true }, which: '' };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">IV. ANTECEDENTES NO PATOLÓGICOS PERSONALES</h3>

            {/* Habits */}
            <div className="mb-6 pb-4 border-b-2 border-gray-900 last:border-0 last:mb-0 last:pb-0">
                <YesNo label="Hábitos / Adicciones" value={habits} onChange={(k, v) => setValue('habits', handleExclusiveChange(habits, k, v), { shouldDirty: true })} />
                {habits?.yes && (
                    <div className="pl-0 mt-4 bg-gray-50/50 p-3 md:p-4 rounded-xl border border-gray-200/50 animate-in fade-in slide-in-from-top-2">
                        <CheckboxList items={C.HABITS_LIST} data={(habits as any).conditions || habits.list || {}} onChange={(k, v) => {
                            const current = habits as any;
                            const listKey = current.conditions !== undefined ? 'conditions' : 'list';
                            setValue('habits', {
                                ...current,
                                [listKey]: { ...(current[listKey] || {}), [k]: v }
                            }, { shouldDirty: true });
                        }} />

                        {/* Conditional details for specific habits */}
                        {(habits.list?.['Drogas'] || (habits as any).conditions?.['Drogas']) && (
                            <div className="mt-4 animate-in zoom-in-95 duration-200">
                                <Controller
                                    name="habits.drugsDetails"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="¿Cuáles Drogas?"
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-white border-2 border-orange-200 rounded-xl focus-within:border-[#083C79]"
                                        />
                                    )}
                                />
                            </div>
                        )}

                        {(habits.list?.['Psicofarmacos'] || (habits as any).conditions?.['Psicofarmacos']) && (
                            <div className="mt-4 animate-in zoom-in-95 duration-200">
                                <Controller
                                    name="habits.psychDetails"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="¿Cuáles Psicofármacos?"
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-white border-2 border-orange-200 rounded-xl focus-within:border-[#083C79]"
                                        />
                                    )}
                                />
                            </div>
                        )}

                        {(habits.list?.['Medicamentos controlados'] || (habits as any).conditions?.['Medicamentos controlados']) && (
                            <div className="mt-4 animate-in zoom-in-95 duration-200">
                                <Controller
                                    name="habits.controlledDetails"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="¿Cuáles Medicamentos?"
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
                                label="Otros / Detalles generales"
                                value={habits.other || ''}
                                onChange={(e) => setValue('habits', { ...habits, other: e.target.value }, { shouldDirty: true })}
                                wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Transfusions */}
            <div className="py-4 border-b-2 border-gray-900">
                <YesNo label="Transfusiones Sanguíneas" value={transfusions} onChange={(k, v) => setValue('transfusions', handleExclusiveChange(transfusions, k, v), { shouldDirty: true })} />
            </div>

            {/* Reactions */}
            <div className="py-4 border-b-2 border-gray-900">
                <YesNo
                    label="Reacciones post transfusionales"
                    value={transfusions.reactions}
                    onChange={(k, v) => setValue('transfusions.reactions', handleExclusiveChange(transfusions.reactions, k, v), { shouldDirty: true })}
                />
                {transfusions.reactions?.yes && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                        <Controller
                            name="transfusions.which"
                            control={control}
                            render={({ field }) => (
                                <FloatingLabelInput
                                    label="¿Cual (es)?"
                                    value={field.value}
                                    onChange={field.onChange}
                                    wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                />
                            )}
                        />
                    </div>
                )}
            </div>

            <GroupSectionRHF title="Exposiciones" list={C.EXPOSURES_LIST} groupKey="exposures" />

        </div>
    );
};
