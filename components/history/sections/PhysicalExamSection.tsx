import React, { useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingLabelInput } from '@/components/premium-ui/FloatingLabelInput';
import { PhysicalExamSection as SystemsReviewSection } from '@/components/ui/FormComponents';
import { InitialHistoryFormData } from '@/schemas/patientSchemas';
import { AlertCircle, Activity, Heart, Thermometer, Wind, Droplets } from 'lucide-react';

const INPUT_CLASS = "w-full px-6 py-4 bg-black/40 border border-white/5 text-white text-sm rounded-[1.5rem] focus:border-primary/40 outline-none transition-all placeholder:text-white/10 font-medium";

const NumericInput = ({
    label, value, onChange, min, max, step = "1", unit = "", placeholder = "", isOnline = true, icon: Icon
}: {
    label: string; value: string; onChange: (v: string) => void;
    min?: number; max?: number; step?: string; unit?: string; placeholder?: string; isOnline?: boolean;
    icon?: any;
}) => {
    const inputId = React.useId();

    return (
        <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 px-2">
                {Icon && <Icon size={10} className="text-white/20" />}
                <label htmlFor={inputId} className="block text-[8px] uppercase font-black tracking-[0.2em] text-white/30">{label}</label>
            </div>
            <div className="relative group">
                <input
                    id={inputId}
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={cn(INPUT_CLASS, unit ? 'pr-12' : '', !isOnline && "border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)]")}
                />
                {!isOnline && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                {unit && (
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 text-[9px] font-bold uppercase tracking-widest pointer-events-none">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
};

// Helper function for class merging (assuming cn is available or define it)
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

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

    const getIMCClassification = (imcText: string): string => {
        const imc = parseFloat(imcText);
        if (imc < 18.5) return 'Bajo peso';
        if (imc < 25) return 'Peso normal';
        if (imc < 30) return 'Sobrepeso';
        if (imc < 35) return 'Obesidad I';
        if (imc < 40) return 'Obesidad II';
        return 'Obesidad III';
    };

    return (
        <div className="space-y-12">
            <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity size={14} className="text-primary" />
                    </div>
                    <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Signos Vitales</h3>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                    <NumericInput
                        label="Frec. Cardíaca"
                        icon={Heart}
                        value={physicalExam.fc}
                        onChange={v => setValue('physicalExam.fc', v, { shouldDirty: true })}
                        min={40} max={200} unit="lpm" placeholder="70"
                        isOnline={isOnline}
                    />
                    <NumericInput
                        label="Frec. Resp"
                        icon={Wind}
                        value={physicalExam.fr}
                        onChange={v => setValue('physicalExam.fr', v, { shouldDirty: true })}
                        min={8} max={40} unit="rpm" placeholder="16"
                        isOnline={isOnline}
                    />
                    <NumericInput
                        label="Temp"
                        icon={Thermometer}
                        value={physicalExam.temp}
                        onChange={v => setValue('physicalExam.temp', v, { shouldDirty: true })}
                        min={34} max={42} step="0.1" unit="°C" placeholder="36.5"
                        isOnline={isOnline}
                    />
                    <NumericInput
                        label="SatO2"
                        icon={Droplets}
                        value={physicalExam.sat02}
                        onChange={v => setValue('physicalExam.sat02', v, { shouldDirty: true })}
                        min={70} max={100} unit="%" placeholder="98"
                        isOnline={isOnline}
                    />

                    <div className="col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                        <FloatingLabelInput
                            label="PA (mmHg)"
                            value={physicalExam.pa}
                            onChange={e => setValue('physicalExam.pa', (e.target as any).value, { shouldDirty: true })}
                            placeholder="120/80"
                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[1.5rem]"
                        />
                        <FloatingLabelInput
                            label="PAM (mmHg)"
                            value={physicalExam.pam}
                            onChange={e => setValue('physicalExam.pam', (e.target as any).value, { shouldDirty: true })}
                            placeholder="93"
                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[1.5rem]"
                        />
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-6">
                        <NumericInput
                            label="Peso (kg)"
                            value={physicalExam.weight}
                            onChange={v => setValue('physicalExam.weight', v, { shouldDirty: true })}
                            min={1} max={500} step="0.1" placeholder="70"
                        />
                        <NumericInput
                            label="Altura (cm)"
                            value={physicalExam.height}
                            onChange={v => setValue('physicalExam.height', v, { shouldDirty: true })}
                            min={30} max={250} placeholder="170"
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {physicalExam.imc && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-10 p-6 rounded-[2rem] bg-primary/5 border border-primary/10 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-[13px] shadow-[0_0_20px_rgba(198,147,32,0.2)]">
                                    {physicalExam.imc}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-black">Índice de Masa Corporal</p>
                                    <div className="flex items-center gap-2">
                                        <AlertCircle size={10} className="text-primary/60" />
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                            {getIMCClassification(physicalExam.imc)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-8 w-[1px] bg-primary/10 mx-4" />
                            <div className="text-right">
                                <p className="text-[7px] uppercase tracking-[0.4em] text-white/10 font-bold mb-1">Estado de Salud</p>
                                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[8px] text-white/40 uppercase tracking-tighter">
                                    Calculado en Tiempo Real
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <SystemsReviewSection
                data={physicalExam}
                onChange={(d: any) => setValue('physicalExam', d, { shouldDirty: true })}
                hideVitals={true}
                title="Exploración por Sistemas"
            />
        </div>
    );
};

