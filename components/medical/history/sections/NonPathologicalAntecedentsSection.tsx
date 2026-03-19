import React, { memo, useCallback } from 'react';
import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { YesNo, CheckboxList } from '@/components/medical/ui/FormComponents';
import { FloatingLabelInput } from '@/components/medical/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import * as C from '@/data/medical-constants';

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

    const handleOtherChange = (e: any) => {
        const current = getValues(groupKey as any) as any;
        setValue(groupKey as any, { ...current, other: e.target.value }, { shouldDirty: true });
    };

    return (
        <div className="pt-8 border-t border-white/5">
            <YesNo label={title} value={groupData} onChange={handleYesNoChange} />
            {groupData?.yes && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 space-y-8"
                >
                    <div className="p-10 rounded-[2.5rem] bg-black/20 border border-white/5">
                        <CheckboxList items={list} data={groupData.conditions || groupData.list || {}} onChange={handleListChange} />
                    </div>
                    <FloatingLabelInput
                        label="Otras observaciones"
                        as="textarea"
                        rows={2}
                        value={groupData.other || ''}
                        onChange={handleOtherChange}
                        wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                    />
                </motion.div>
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
        <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Antecedentes No Patológicos</h3>
            </div>

            <div className="space-y-12">
                {/* Habits */}
                <div className="space-y-8">
                    <YesNo label="Hábitos y Adicciones" value={habits} onChange={(k, v) => setValue('habits', handleExclusiveChange(habits, k, v), { shouldDirty: true })} />
                    {habits?.yes && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-8"
                        >
                            <div className="p-10 rounded-[2.5rem] bg-black/20 border border-white/5">
                                <CheckboxList items={C.HABITS_LIST} data={(habits as any).conditions || habits.list || {}} onChange={(k, v) => {
                                    const current = habits as any;
                                    const listKey = current.conditions !== undefined ? 'conditions' : 'list';
                                    setValue('habits', {
                                        ...current,
                                        [listKey]: { ...(current[listKey] || {}), [k]: v }
                                    }, { shouldDirty: true });
                                }} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {(habits.list?.['Drogas'] || (habits as any).conditions?.['Drogas']) && (
                                    <Controller
                                        name="habits.drugsDetails"
                                        control={control}
                                        render={({ field }) => (
                                            <FloatingLabelInput
                                                label="¿Cuáles Drogas?"
                                                value={field.value}
                                                onChange={field.onChange}
                                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                            />
                                        )}
                                    />
                                )}

                                {(habits.list?.['Psicofarmacos'] || (habits as any).conditions?.['Psicofarmacos']) && (
                                    <Controller
                                        name="habits.psychDetails"
                                        control={control}
                                        render={({ field }) => (
                                            <FloatingLabelInput
                                                label="¿Cuáles Psicofármacos?"
                                                value={field.value}
                                                onChange={field.onChange}
                                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                            />
                                        )}
                                    />
                                )}
                            </div>

                            <FloatingLabelInput
                                label="Otros hábitos / Detalles"
                                as="textarea"
                                rows={2}
                                value={habits.other || ''}
                                onChange={(e) => setValue('habits', { ...habits, other: e.target.value }, { shouldDirty: true })}
                                wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                            />
                        </motion.div>
                    )}
                </div>

                {/* Transfusions */}
                <div className="pt-8 border-t border-white/5 space-y-8">
                    <YesNo label="Transfusiones Sanguíneas" value={transfusions} onChange={(k, v) => setValue('transfusions', handleExclusiveChange(transfusions, k, v), { shouldDirty: true })} />

                    {transfusions?.yes && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-8"
                        >
                            <YesNo
                                label="Reacciones post-transfusionales"
                                value={transfusions.reactions}
                                onChange={(k, v) => setValue('transfusions.reactions', handleExclusiveChange(transfusions.reactions, k, v), { shouldDirty: true })}
                            />
                            {transfusions.reactions?.yes && (
                                <Controller
                                    name="transfusions.which"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Detallar reacciones"
                                            as="textarea"
                                            rows={2}
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            )}
                        </motion.div>
                    )}
                </div>

                <GroupSectionRHF title="Exposiciones" list={C.EXPOSURES_LIST} groupKey="exposures" />
            </div>
        </div>
    );
};
