
import React, { memo, useCallback } from 'react';
import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { YesNo, CheckboxList } from '@/components/ui/FormComponents';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import * as C from '@/constants';
import { Patient } from '@/types';

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

                    {(groupData.conditions?.['Cáncer'] || groupData.conditions?.['Cancer'] || groupData.list?.['Cáncer'] || groupData.list?.['Cancer']) && (
                        <div className="mt-4 animate-in zoom-in-95 duration-200">
                            <Controller
                                name={`${groupKey}.cancerDetails` as any}
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="¿Cuáles?"
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-orange-200 rounded-xl focus-within:border-[#083C79]"
                                    />
                                )}
                            />
                        </div>
                    )}

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

interface PathologicalAntecedentsSectionProps {
    patient: Patient | null;
}

export const PathologicalAntecedentsSection: React.FC<PathologicalAntecedentsSectionProps> = ({ patient }) => {
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
        <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">I. ANTECEDENTES PATOLÓGICOS PERSONALES</h3>
                <YesNo
                    label="Enfermedades pre existentes"
                    value={preExistingDiseases}
                    onChange={(k, v) => setValue('preExistingDiseases', handleExclusiveChange(preExistingDiseases, k, v))}
                />
                {preExistingDiseases?.yes && (
                    <div className="mt-6 space-y-2">
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
                        <GroupSectionRHF title="Reumatológicas/Autoinmunes" list={C.RHEUMA_LIST} groupKey="rheumatological" />
                        <GroupSectionRHF title="Infecciosas" list={C.INFECTIOUS_LIST} groupKey="infectious" />
                        <GroupSectionRHF title="Psiquiátricas" list={C.PSYCH_LIST} groupKey="psychiatric" />

                        {patient?.sex === 'Femenino' && (
                            <GroupSectionRHF title="Ginecológicas" list={C.GYNECO_PATHOLOGICAL_LIST} groupKey="gynecoPathological" />
                        )}
                    </div>
                )}
            </div>

            {patient?.sex === 'Femenino' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">Gineco Obstétricos</h3>
                    <YesNo
                        label="Antecedentes Ginecologicos"
                        value={gyneco}
                        onChange={(k, v) => setValue('gyneco', handleExclusiveChange(gyneco, k, v))}
                    />
                    {gyneco?.yes && (
                        <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-200/50 mt-4 space-y-6">
                            <CheckboxList
                                items={C.GYNECO_LIST}
                                data={gyneco.conditions}
                                onChange={(k, v) => setValue('gyneco', { ...gyneco, conditions: { ...gyneco.conditions, [k]: v } })}
                            />

                            <div className="grid grid-cols-4 gap-4 py-4 border-t border-b-2 border-gray-900 my-4">
                                {['G', 'P', 'A', 'C'].map(k => (
                                    <div key={k} className="flex items-center gap-2">
                                        <label className="font-bold text-gray-600">{k}:</label>
                                        <Controller
                                            name={`gyneco.${k.toLowerCase()}` as any}
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    className="w-full px-2 py-1 bg-white border-2 border-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
                                        label="Cirugias Gineco Obstetricas"
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />

                            <YesNo label="Diabetes gestacional" value={gyneco.gestationalDiabetes} onChange={(k, v) => setValue('gyneco', { ...gyneco, gestationalDiabetes: handleExclusiveChange(gyneco.gestationalDiabetes, k, v) })} />
                            <YesNo label="Preclampsia" value={gyneco.preeclampsia} onChange={(k, v) => setValue('gyneco', { ...gyneco, preeclampsia: handleExclusiveChange(gyneco.preeclampsia, k, v) })} />
                            <YesNo label="Eclampsia" value={gyneco.eclampsia} onChange={(k, v) => setValue('gyneco', { ...gyneco, eclampsia: handleExclusiveChange(gyneco.eclampsia, k, v) })} />
                            <YesNo label="Sospecha de embarazo" value={gyneco.pregnancySuspicion} onChange={(k, v) => setValue('gyneco', { ...gyneco, pregnancySuspicion: handleExclusiveChange(gyneco.pregnancySuspicion, k, v) })} />
                            <YesNo label="Lactancia materna actual" value={gyneco.breastfeeding} onChange={(k, v) => setValue('gyneco', { ...gyneco, breastfeeding: handleExclusiveChange(gyneco.breastfeeding, k, v) })} />
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">II. MEDICAMENTOS</h3>
                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="De uso crónico" value={regularMeds} onChange={(k, v) => setValue('regularMeds', handleExclusiveChange(regularMeds, k, v))} />
                    {regularMeds?.yes && (
                        <div className="mt-4">
                            <Controller
                                name="regularMeds.description"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="Describa cuál..."
                                        as="textarea"
                                        rows={3}
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="Naturales o suplementos" value={naturalMeds} onChange={(k, v) => setValue('naturalMeds', handleExclusiveChange(naturalMeds, k, v))} />
                    {naturalMeds?.yes && (
                        <div className="mt-4">
                            <Controller
                                name="naturalMeds.description"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="Describa cuál..."
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">III. CIRUGÍAS U HOSPITALIZACIONES</h3>
                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="Cirugías y Hospitalizaciones previas" value={surgeries} onChange={(k, v) => setValue('surgeries', handleExclusiveChange(surgeries, k, v))} />
                    {surgeries?.yes && (
                        <div className="mt-4">
                            <Controller
                                name="surgeries.list"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="¿Cuáles?"
                                        as="textarea"
                                        rows={3}
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="Procedimientos endoscópicos previos" value={endoscopy} onChange={(k, v) => setValue('endoscopy', handleExclusiveChange(endoscopy, k, v))} />
                    {endoscopy?.yes && (
                        <div className="mt-4 space-y-6">
                            {(endoscopy.procedures || []).map((proc: any, index: number) => (
                                <div key={index} className="relative p-4 bg-gray-50/50 rounded-2xl border-2 border-gray-100 group animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Controller
                                            name={`endoscopy.procedures.${index}.which` as any}
                                            control={control}
                                            render={({ field }) => (
                                                <FloatingLabelInput
                                                    label="¿Cuáles?"
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                                />
                                            )}
                                        />
                                        <div>
                                            <label className="block text-xs uppercase font-bold text-gray-500 mb-1">Fecha del último estudio</label>
                                            <Controller
                                                name={`endoscopy.procedures.${index}.lastDate` as any}
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        type="date"
                                                        value={field.value || ''}
                                                        onChange={field.onChange}
                                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-900 font-medium text-[#084286] bg-white outline-none focus:border-blue-500 transition-colors"
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
                                                    wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
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
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                                        >
                                            eliminar
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
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
                            >
                                + Agregar otro procedimiento
                            </button>
                        </div>
                    )}
                </div>

                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="Implantes o prótesis intracorpóreos" value={implants} onChange={(k, v) => setValue('implants', handleExclusiveChange(implants, k, v))} />
                    {implants?.yes && (
                        <div className="mt-4">
                            <Controller
                                name="implants.which"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="Especifique..."
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="Marcapasos, desfibriladores, neuro estimuladores o algún otro dispositivo intracorpóreo" value={devices} onChange={(k, v) => setValue('devices', handleExclusiveChange(devices, k, v))} />
                    {devices?.yes && (
                        <div className="mt-4">
                            <Controller
                                name="devices.which"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="Especifique..."
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="Complicaciones relacionadas a cirugías, procedimientos endoscópicos, uso de medicamentos o anestesia" value={complications} onChange={(k, v) => setValue('complications', handleExclusiveChange(complications, k, v))} />
                    {complications?.yes && (
                        <div className="mt-4">
                            <Controller
                                name="complications.list"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="¿Cuáles?"
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <GroupSectionRHF title="Alergias " list={C.ALLERGIES_LIST} groupKey="allergies" />

                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo
                        label="ANAFILAXIA / SHOCK"
                        value={anaphylaxis}
                        onChange={(k, v) => setValue('anaphylaxis', handleExclusiveChange(anaphylaxis, k, v), { shouldDirty: true })}
                    />
                    {anaphylaxis?.yes && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                            <Controller
                                name="anaphylaxis.description"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="¿A que?"
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="py-4 border-b-2 border-gray-900">
                    <YesNo label="Intolerancias alimenticias" value={foodIntolerances} onChange={(k, v) => setValue('foodIntolerances', handleExclusiveChange(foodIntolerances, k, v))} />
                    {foodIntolerances?.yes && (
                        <div className="mt-4 space-y-4">
                            <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                                <CheckboxList
                                    items={C.FOOD_INTOLERANCES_LIST}
                                    data={foodIntolerances.list}
                                    onChange={(k, v) => setValue('foodIntolerances', { ...foodIntolerances, list: { ...foodIntolerances.list, [k]: v } })}
                                />
                            </div>
                            <FloatingLabelInput
                                label="Otra / Detalles adicionales"
                                value={foodIntolerances.other || ''}
                                onChange={(e) => setValue('foodIntolerances', { ...foodIntolerances, other: e.target.value })}
                                wrapperClassName="bg-white border-2 border-gray-900 rounded-xl"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
