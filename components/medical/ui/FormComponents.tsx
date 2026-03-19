import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Activity, Wind, Thermometer, HeartPulse, Droplets, Scale, Ruler, Brain } from 'lucide-react';
import { CheckboxData, PhysicalExam } from '@/types';
import * as C from '@/data/medical-constants';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SECTION_TITLE_CLASS = "text-3xl font-black text-foreground mb-10 flex items-center gap-4 tracking-tighter";

// 1. Checkbox List
interface CheckboxListProps {
    items: string[];
    data: CheckboxData;
    onChange: (key: string, value: boolean) => void;
    columns?: number;
}

export const CheckboxList: React.FC<CheckboxListProps> = ({ items, data, onChange, columns = 4 }) => {
    return (
        <div className={cn("grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-4 gap-4")}>
            {items.map((item) => {
                const isChecked = !!data[item];
                return (
                    <label
                        key={item}
                        className={cn(
                            "flex items-center space-x-4 p-5 rounded-[1.5rem] border transition-all cursor-pointer group relative overflow-hidden",
                            isChecked
                                ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(198,147,32,0.1)] scale-[1.02]"
                                : "bg-black/40 border-white/5 hover:border-white/10 hover:bg-black/60 shadow-inner"
                        )}
                    >
                        <div className="relative flex items-center justify-center shrink-0">
                            <input
                                type="checkbox"
                                className="peer h-5 w-5 rounded-full border border-white/10 bg-black/40 checked:bg-primary checked:border-primary transition-all cursor-pointer appearance-none"
                                checked={isChecked}
                                onChange={(e) => onChange(item, e.target.checked)}
                            />
                            <Check
                                size={12}
                                className={cn(
                                    "absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none stroke-[4]",
                                    isChecked ? "text-black" : "text-white"
                                )}
                            />
                        </div>
                        <span className={cn(
                            "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors",
                            isChecked ? "text-primary" : "text-white/40 group-hover:text-white"
                        )}>
                            {item}
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

export const ToggleButton = ({ label, checked, onClick, color = 'gold' }: { label: string, checked: boolean, onClick: () => void, color?: string }) => {
    const activeColors: any = {
        gold: "bg-primary text-black border-primary shadow-xl shadow-primary/20 scale-105",
        emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-xl shadow-emerald-500/10 scale-105",
        rose: "bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-xl shadow-rose-500/10 scale-105",
        amber: "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-xl shadow-amber-500/10 scale-105",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all border active:scale-95",
                checked
                    ? (activeColors[color] || activeColors.gold)
                    : "bg-black/40 text-white/20 border-white/5 hover:bg-black/60 hover:text-white shadow-inner"
            )}
        >
            {label}
        </button>
    );
};

// 3. Yes/No Component
interface YesNoProps {
    label: string,
    value?: { yes: boolean, no: boolean, na?: boolean },
    onChange: (key: string, val: boolean) => void,
    allowNa?: boolean
    className?: string;
}

export const YesNo: React.FC<YesNoProps> = ({
    label, value = { yes: false, no: false }, onChange
}) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-10 rounded-[3rem] bg-black/40 border border-white/5 transition-all duration-700 hover:border-white/10 gap-8 group">
        <div className="flex items-center gap-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse opacity-40 group-hover:opacity-100" />
            <span className="font-bold text-white/40 text-[10px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">{label}</span>
        </div>
        <div className="flex gap-4">
            <ToggleButton label="SI" checked={value.yes} onClick={() => onChange('yes', true)} color="emerald" />
            <ToggleButton label="NO" checked={value.no} onClick={() => onChange('no', true)} color="rose" />
        </div>
    </div>
);

// 4. Physical Exam Section
interface PhysicalExamSectionProps {
    data: PhysicalExam;
    onChange: (d: PhysicalExam) => void;
    hideVitals?: boolean;
    title?: string;
}

export const PhysicalExamSection = ({
    data, onChange, hideVitals = false, title
}: PhysicalExamSectionProps) => {
    const systems = data.systems || {};

    const updateSystem = (sys: string, field: 'normal' | 'abnormal' | 'description', val: any) => {
        const currentSystem = systems[sys] || { normal: true, abnormal: false, description: '' };
        let newData = { ...currentSystem, [field]: val };
        if (field === 'normal' && val === true) newData.abnormal = false;
        else if (field === 'abnormal' && val === true) newData.normal = false;

        onChange({
            ...data,
            systems: { ...systems, [sys]: newData }
        });
    };

    return (
        <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
                <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">{title || "Revisión por Sistemas"}</h3>
            </div>

            <div className="space-y-4">
                {C.SYSTEMS_LIST.map((sys, idx) => {
                    const sysData = systems[sys] || { normal: true, abnormal: false, description: '' };
                    return (
                        <motion.div
                            key={sys}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-6 rounded-[2rem] bg-black/20 border border-white/5 hover:border-white/10 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors",
                                    sysData.abnormal ? "text-rose-400" : "text-white/40 group-hover:text-white"
                                )}>
                                    {sys}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateSystem(sys, 'normal', true)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-[8px] uppercase tracking-widest font-bold border transition-all",
                                            sysData.normal
                                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                                                : "bg-black/40 border-white/5 text-white/20 hover:border-white/20"
                                        )}
                                    >
                                        Norm
                                    </button>
                                    <button
                                        onClick={() => updateSystem(sys, 'abnormal', true)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-[8px] uppercase tracking-widest font-bold border transition-all",
                                            sysData.abnormal
                                                ? "bg-rose-500/10 border-rose-500/40 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                                                : "bg-black/40 border-white/5 text-white/20 hover:border-white/20"
                                        )}
                                    >
                                        Hall
                                    </button>
                                </div>
                            </div>

                            <textarea
                                className={cn(
                                    "w-full bg-black/40 border border-white/5 rounded-xl p-4 text-[10px] text-white/80 outline-none focus:border-primary/40 focus:bg-black/60 transition-all resize-none tracking-widest placeholder:text-white/5 min-h-[60px]",
                                    sysData.abnormal ? "border-rose-500/20 text-rose-200" : "font-light"
                                )}
                                placeholder={`Notas...`}
                                value={sysData.description || ''}
                                onChange={e => updateSystem(sys, 'description', e.target.value)}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/[0.01] rounded-full blur-[200px] pointer-events-none" />
        </div>
    );
};
