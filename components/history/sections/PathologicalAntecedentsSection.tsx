import { motion } from 'framer-motion';
import { YesNo, CheckboxList } from '@/components/ui/FormComponents';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import * as C from '@/constants';
import { Patient } from '@/types';
import { Specialty } from '@/lib/specialties';

// Helper for exclusive Yes/No toggles
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

                    {(groupData.conditions?.['Cáncer'] || groupData.conditions?.['Cancer'] || groupData.list?.['Cáncer'] || groupData.list?.['Cancer']) && (
                        <Controller
                            name={`${groupKey}.cancerDetails` as any}
                            control={control}
                            render={({ field }) => (
                                <FloatingLabelInput
                                    label="Detallar Cáncer"
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                    wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                />
                            )}
                        />
                    )}

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

interface PathologicalAntecedentsSectionProps {
    patient: Patient | null;
    specialty?: Specialty | null;
}

export const PathologicalAntecedentsSection: React.FC<PathologicalAntecedentsSectionProps> = ({ patient, specialty }) => {
    const { setValue, watch, control } = useFormContext<InitialHistoryFormData>();
    const preExistingDiseases = watch('preExistingDiseases');

    // Gyneco fields
    const gyneco = watch('gyneco');

    // Meds & Other
    const regularMeds = watch('regularMeds');
    const naturalMeds = watch('naturalMeds');
    const surgeries = watch('surgeries');
    const endoscopy = watch('endoscopy') || { yes: false, no: true, list: '', results: '', procedures: [] };
    const implants = watch('implants');
    const devices = watch('devices');
    const complications = watch('complications');
    const anaphylaxis = watch('anaphylaxis');
    const foodIntolerances = watch('foodIntolerances');

    return (
        <div className="space-y-12">
            <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Antecedentes Patológicos</h3>
                </div>

                <div className="space-y-8">
                    <YesNo
                        label="¿Enfermedades pre-existentes?"
                        value={preExistingDiseases}
                        onChange={(k, v) => setValue('preExistingDiseases', handleExclusiveChange(preExistingDiseases, k, v))}
                    />

                    {preExistingDiseases?.yes && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4"
                        >
                            <GroupSectionRHF title="Neurológicas" list={C.NEURO_LIST} groupKey="neurological" />
                            <GroupSectionRHF title="Metabólicas" list={C.METABOLIC_LIST} groupKey="metabolic" />
                            <GroupSectionRHF title="Dermatológicas" list={C.DERMATOLOGIC_LIST} groupKey="dermatologic" />
                            <GroupSectionRHF title="Respiratorias" list={C.RESPIRATORY_LIST} groupKey="respiratory" />
                            <GroupSectionRHF title="Cardíacas" list={C.CARDIAC_LIST} groupKey="cardiac" />
                            <GroupSectionRHF title="Gastrointestinales" list={C.GASTRO_LIST} groupKey="gastro" />
                            <GroupSectionRHF title="Hepatobiliopancreáticas" list={C.HEPATO_LIST} groupKey="hepato" />
                            <GroupSectionRHF title="Arterial o venosa periféricas" list={C.PERIPHERAL_LIST} groupKey="peripheral" />
                            <GroupSectionRHF title="Hematológicas" list={C.HEMATO_LIST} groupKey="hematological" />
                            <GroupSectionRHF title="Reno-ureterales" list={C.RENAL_LIST} groupKey="renal" />
                            <GroupSectionRHF title="Reumatológicas / Autoinmunes" list={C.RHEUMA_LIST} groupKey="rheumatological" />
                            <GroupSectionRHF title="Infecciosas" list={C.INFECTIOUS_LIST} groupKey="infectious" />
                            <GroupSectionRHF title="Psiquiátricas" list={C.PSYCH_LIST} groupKey="psychiatric" />

                            {patient?.sex === 'Femenino' && (
                                <GroupSectionRHF title="Ginecológicas" list={C.GYNECO_PATHOLOGICAL_LIST} groupKey="gynecoPathological" />
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            {patient?.sex === 'Femenino' && (
                <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Gineco Obstétricos</h3>
                    </div>

                    <div className="space-y-8">
                        <YesNo
                            label="Antecedentes Ginecológicos"
                            value={gyneco}
                            onChange={(k, v) => setValue('gyneco', handleExclusiveChange(gyneco, k, v))}
                        />
                        {gyneco?.yes && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-8 pt-8 border-t border-white/5"
                            >
                                <div className="p-10 rounded-[2.5rem] bg-black/20 border border-white/5">
                                    <CheckboxList
                                        items={C.GYNECO_LIST}
                                        data={gyneco.conditions}
                                        onChange={(k, v) => setValue('gyneco', { ...gyneco, conditions: { ...gyneco.conditions, [k]: v } })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-[2rem] bg-black/20 border border-white/5">
                                    {['G', 'P', 'A', 'C'].map(k => (
                                        <div key={k} className="flex flex-col gap-2">
                                            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold px-4">{k}</label>
                                            <Controller
                                                name={`gyneco.${k.toLowerCase()}` as any}
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        className="w-full px-6 py-4 bg-black/40 border border-white/5 rounded-2xl text-white outline-none focus:border-primary/40 transition-all text-center font-black"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Controller
                                    name="gyneco.surgeries"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Cirugías Gineco-Obstétricas"
                                            as="textarea"
                                            rows={2}
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <YesNo label="Diabetes gestacional" value={gyneco.gestationalDiabetes} onChange={(k, v) => setValue('gyneco', { ...gyneco, gestationalDiabetes: handleExclusiveChange(gyneco.gestationalDiabetes, k, v) })} />
                                    <YesNo label="Preclampsia" value={gyneco.preeclampsia} onChange={(k, v) => setValue('gyneco', { ...gyneco, preeclampsia: handleExclusiveChange(gyneco.preeclampsia, k, v) })} />
                                    <YesNo label="Eclampsia" value={gyneco.eclampsia} onChange={(k, v) => setValue('gyneco', { ...gyneco, eclampsia: handleExclusiveChange(gyneco.eclampsia, k, v) })} />
                                    <YesNo label="Sospecha de embarazo" value={gyneco.pregnancySuspicion} onChange={(k, v) => setValue('gyneco', { ...gyneco, pregnancySuspicion: handleExclusiveChange(gyneco.pregnancySuspicion, k, v) })} />
                                    <YesNo label="Lactancia materna" value={gyneco.breastfeeding} onChange={(k, v) => setValue('gyneco', { ...gyneco, breastfeeding: handleExclusiveChange(gyneco.breastfeeding, k, v) })} />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

            <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Medicamentos</h3>
                </div>

                <div className="space-y-12">
                    <div className="space-y-8">
                        <YesNo label="Medicamentos de uso crónico" value={regularMeds} onChange={(k, v) => setValue('regularMeds', handleExclusiveChange(regularMeds, k, v))} />
                        {regularMeds?.yes && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <Controller
                                    name="regularMeds.description"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Detallar medicamentos crónicos"
                                            as="textarea"
                                            rows={3}
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-8">
                        <YesNo label="Suplementos o medicina natural" value={naturalMeds} onChange={(k, v) => setValue('naturalMeds', handleExclusiveChange(naturalMeds, k, v))} />
                        {naturalMeds?.yes && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <Controller
                                    name="naturalMeds.description"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Detallar suplementos"
                                            as="textarea"
                                            rows={2}
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Cirugías y Hospitalizaciones</h3>
                </div>

                <div className="space-y-12">
                    <div className="space-y-8">
                        <YesNo label="Antecedentes quirúrgicos" value={surgeries} onChange={(k, v) => setValue('surgeries', handleExclusiveChange(surgeries, k, v))} />
                        {surgeries?.yes && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <Controller
                                    name="surgeries.list"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Detallar cirugías previas"
                                            as="textarea"
                                            rows={3}
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-8">
                        <YesNo
                            label={
                                specialty?.id === 'cardiology' ? "Procedimientos cardiovasculares previos" :
                                    specialty?.id === 'urology' ? "Procedimientos endourológicos previos" :
                                        specialty?.id === 'ophthalmology' ? "Procedimientos oftalmológicos previos" :
                                            "Procedimientos endoscópicos previos"
                            }
                            value={endoscopy}
                            onChange={(k, v) => setValue('endoscopy', handleExclusiveChange(endoscopy, k, v))}
                        />
                        {endoscopy?.yes && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-8"
                            >
                                {(endoscopy.procedures || []).map((proc: any, index: number) => (
                                    <div key={index} className="relative p-10 bg-black/20 rounded-[2.5rem] border border-white/5 group transition-all hover:border-white/10">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <Controller
                                                name={`endoscopy.procedures.${index}.which` as any}
                                                control={control}
                                                render={({ field }) => (
                                                    <FloatingLabelInput
                                                        label="Procedimiento"
                                                        value={field.value || ''}
                                                        onChange={field.onChange}
                                                        wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                                    />
                                                )}
                                            />
                                            <div className="space-y-2">
                                                <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold px-4">Fecha</label>
                                                <Controller
                                                    name={`endoscopy.procedures.${index}.lastDate` as any}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            type="date"
                                                            value={field.value || ''}
                                                            onChange={field.onChange}
                                                            className="w-full px-8 py-5 bg-black/40 border border-white/5 rounded-[2rem] text-white outline-none focus:border-primary/40 transition-all font-medium"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <Controller
                                                name={`endoscopy.procedures.${index}.results` as any}
                                                control={control}
                                                render={({ field }) => (
                                                    <FloatingLabelInput
                                                        label="Resultados"
                                                        value={field.value || ''}
                                                        onChange={field.onChange}
                                                        wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {endoscopy.procedures.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newProcs = [...endoscopy.procedures];
                                                    newProcs.splice(index, 1);
                                                    setValue('endoscopy.procedures', newProcs, { shouldDirty: true });
                                                }}
                                                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/40 flex items-center justify-center text-xs hover:bg-rose-500 hover:text-white transition-all"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentProcs = endoscopy.procedures || [];
                                        setValue('endoscopy.procedures', [...currentProcs, { which: '', lastDate: '', results: '' }], { shouldDirty: true });
                                    }}
                                    className="w-full py-6 border border-dashed border-white/10 rounded-[2rem] text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold hover:border-primary/40 hover:text-primary transition-all bg-white/[0.01]"
                                >
                                    + Agregar procedimiento
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Dispositivos y Alergias</h3>
                </div>

                <div className="space-y-12">
                    <div className="space-y-8">
                        <YesNo label="Implantes o prótesis" value={implants} onChange={(k, v) => setValue('implants', handleExclusiveChange(implants, k, v))} />
                        {implants?.yes && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <Controller
                                    name="implants.which"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Especifique implantes"
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-8">
                        <YesNo label="Dispositivos electrónicos (Marcapasos, etc)" value={devices} onChange={(k, v) => setValue('devices', handleExclusiveChange(devices, k, v))} />
                        {devices?.yes && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <Controller
                                    name="devices.which"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Especifique dispositivos"
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-8">
                        <YesNo label="Complicaciones anestésicas o quirúrgicas" value={complications} onChange={(k, v) => setValue('complications', handleExclusiveChange(complications, k, v))} />
                        {complications?.yes && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <Controller
                                    name="complications.list"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="Detallar complicaciones"
                                            as="textarea"
                                            rows={2}
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            </motion.div>
                        )}
                    </div>

                    <GroupSectionRHF title="Alergias Conocidas" list={C.ALLERGIES_LIST} groupKey="allergies" />

                    <div className="pt-8 border-t border-white/5 space-y-8">
                        <YesNo label="Antecedentes de Anafilaxia / Shock" value={anaphylaxis} onChange={(k, v) => setValue('anaphylaxis', handleExclusiveChange(anaphylaxis, k, v), { shouldDirty: true })} />
                        {anaphylaxis?.yes && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <Controller
                                    name="anaphylaxis.description"
                                    control={control}
                                    render={({ field }) => (
                                        <FloatingLabelInput
                                            label="¿A qué sustancia?"
                                            value={field.value}
                                            onChange={field.onChange}
                                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                        />
                                    )}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-8">
                        <YesNo label="Intolerancias alimenticias" value={foodIntolerances} onChange={(k, v) => setValue('foodIntolerances', handleExclusiveChange(foodIntolerances, k, v))} />
                        {foodIntolerances?.yes && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-8"
                            >
                                <div className="p-10 rounded-[2.5rem] bg-black/20 border border-white/5">
                                    <CheckboxList
                                        items={C.FOOD_INTOLERANCES_LIST}
                                        data={foodIntolerances.list}
                                        onChange={(k, v) => setValue('foodIntolerances', { ...foodIntolerances, list: { ...foodIntolerances.list, [k]: v } })}
                                    />
                                </div>
                                <FloatingLabelInput
                                    label="Otras intolerancias"
                                    as="textarea"
                                    rows={2}
                                    value={foodIntolerances.other || ''}
                                    onChange={(e) => setValue('foodIntolerances', { ...foodIntolerances, other: e.target.value })}
                                    wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
