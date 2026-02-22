
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check, Activity, Wind, Thermometer, HeartPulse, Droplets, Scale, Ruler, Brain } from 'lucide-react';
import { CheckboxData, PhysicalExam } from '@/types';
import * as C from '@/constants';

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
        <div className={cn("grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-4 gap-6")}>
            {items.map((item) => {
                const isChecked = !!data[item];
                return (
                    <label
                        key={item}
                        className={cn(
                            "flex items-center space-x-4 p-5 rounded-[1.5rem] border transition-all cursor-pointer shadow-soft group hover:-translate-y-1",
                            isChecked
                                ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]"
                                : "bg-card/40 border-border/50 hover:border-border hover:bg-card/60"
                        )}
                    >
                        <div className="relative flex items-center justify-center shrink-0">
                            <input
                                type="checkbox"
                                className="peer h-6 w-6 rounded-lg border-2 border-border/60 bg-muted/40 checked:bg-white checked:border-white transition-all cursor-pointer appearance-none"
                                checked={isChecked}
                                onChange={(e) => onChange(item, e.target.checked)}
                            />
                            <Check
                                size={14}
                                className={cn(
                                    "absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none stroke-[3]",
                                    isChecked ? "text-primary" : "text-white"
                                )}
                            />
                        </div>
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest transition-colors",
                            isChecked ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}>
                            {item}
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

export const ToggleButton = ({ label, checked, onClick, color = 'blue' }: { label: string, checked: boolean, onClick: () => void, color?: string }) => {
    const activeColors: any = {
        blue: "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 scale-105",
        emerald: "bg-emerald-500 text-white border-emerald-400 shadow-xl shadow-emerald-500/20 scale-105",
        rose: "bg-rose-500 text-white border-rose-400 shadow-xl shadow-rose-500/20 scale-105",
        amber: "bg-amber-500 text-white border-amber-400 shadow-xl shadow-amber-500/20 scale-105",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all border active:scale-95",
                checked
                    ? activeColors[color] || activeColors.blue
                    : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-card hover:text-foreground shadow-soft"
            )}
        >
            {label}
        </button>
    );
};

// 3. Yes/No Component
interface YesNoProps {
    label: string,
    value: { yes: boolean, no: boolean, na?: boolean },
    onChange: (key: string, val: boolean) => void,
    allowNa?: boolean
    className?: string;
}

export const YesNo: React.FC<YesNoProps> = ({
    label, value, onChange
}) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2.5rem] bg-card/30 border border-border/40 shadow-soft gap-8 group">
        <div className="flex items-center gap-4">
            <div className="w-2 h-8 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-black text-foreground text-xs uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{label}</span>
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

    const vitalsConfig = [
        { key: 'fc', unit: 'lpm', icon: <Activity size={18} />, color: 'text-rose-500' },
        { key: 'fr', unit: 'rpm', icon: <Wind size={18} />, color: 'text-blue-500' },
        { key: 'temp', unit: '°C', icon: <Thermometer size={18} />, color: 'text-amber-500' },
        { key: 'pa', unit: 'mmHg', icon: <HeartPulse size={18} />, color: 'text-emerald-500' },
        { key: 'pam', unit: 'mmHg', icon: <Activity size={18} />, color: 'text-indigo-500' },
        { key: 'sat02', unit: '%', icon: <Droplets size={18} />, color: 'text-cyan-500' },
        { key: 'weight', unit: 'kg', icon: <Scale size={18} />, color: 'text-purple-500' },
        { key: 'height', unit: 'cm', icon: <Ruler size={18} />, color: 'text-slate-500' },
        { key: 'imc', unit: 'kg/m²', icon: <Brain size={18} />, color: 'text-primary' },
    ];

    return (
        <div className="space-y-12">
            {title && <h3 className={SECTION_TITLE_CLASS}>{title}</h3>}

            {!hideVitals && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-6">
                    {vitalsConfig.map(({ key, unit, icon, color }) => (
                        <div key={key} className="group relative">
                            <div className="absolute inset-0 bg-primary/5 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-card/40 backdrop-blur-3xl p-6 rounded-[2rem] border border-border/40 shadow-soft flex flex-col items-center gap-4 transition-all group-hover:-translate-y-2">
                                <div className={cn("p-3 rounded-2xl bg-muted/50 border border-border/40 shadow-inner", color)}>
                                    {icon}
                                </div>
                                <div className="text-center w-full">
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">{key}</p>
                                    <input
                                        type={key === 'imc' ? 'text' : 'number'}
                                        placeholder="0"
                                        className="w-full bg-transparent text-center text-xl font-black text-foreground outline-none border-b-2 border-transparent focus:border-primary transition-all p-1 font-mono"
                                        value={(data as any)[key]}
                                        onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                                        readOnly={key === 'imc'}
                                    />
                                    <p className="text-[8px] font-bold text-muted-foreground/40 mt-1 uppercase tracking-widest">{unit}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-card/30 backdrop-blur-3xl rounded-[3rem] border border-border/40 shadow-2xl overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[800px]">
                        <thead className="bg-muted/50 border-b border-border/40">
                            <tr>
                                <th className="px-10 py-8 font-black uppercase tracking-[0.3em] text-[10px] text-muted-foreground">Sistemas Clinicos</th>
                                <th className="px-6 py-8 text-center w-32 font-black uppercase tracking-[0.2em] text-[10px] text-emerald-500">Normal</th>
                                <th className="px-6 py-8 text-center w-32 font-black uppercase tracking-[0.2em] text-[10px] text-rose-500">Hallazgo</th>
                                <th className="px-10 py-8 font-black uppercase tracking-[0.3em] text-[10px] text-muted-foreground">Descripción Detallada</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {C.SYSTEMS_LIST.map(sys => {
                                const sysData = systems[sys] || { normal: true, abnormal: false, description: '' };
                                return (
                                    <tr key={sys} className="group/row hover:bg-primary/5 transition-all duration-300">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("w-2 h-6 rounded-full transition-all duration-300", sysData.abnormal ? "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]" : "bg-emerald-500/20 group-hover/row:bg-emerald-500/50")} />
                                                <span className="font-black text-foreground text-xs uppercase tracking-widest">{sys}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => updateSystem(sys, 'normal', true)}
                                                    className={cn(
                                                        "w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300",
                                                        sysData.normal ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-110" : "bg-muted/30 border-border/40 text-muted-foreground/30 hover:bg-muted/50"
                                                    )}
                                                >
                                                    <Check size={18} className="stroke-[3]" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => updateSystem(sys, 'abnormal', true)}
                                                    className={cn(
                                                        "w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300",
                                                        sysData.abnormal ? "bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20 scale-110" : "bg-muted/30 border-border/40 text-muted-foreground/30 hover:bg-muted/50"
                                                    )}
                                                >
                                                    <span className="text-lg font-black leading-none">!</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <textarea
                                                className={cn(
                                                    "w-full bg-muted/20 border border-border/40 rounded-2xl p-4 text-sm text-foreground outline-none focus:border-primary focus:bg-background transition-all resize-none shadow-inner",
                                                    sysData.abnormal ? "border-rose-500/30" : "font-medium italic"
                                                )}
                                                placeholder={`Hallazgos en ${sys}...`}
                                                rows={1}
                                                value={sysData.description || ''}
                                                onChange={e => updateSystem(sys, 'description', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Soft decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/[0.02] rounded-full blur-[200px] pointer-events-none" />
        </div>
    );
};
