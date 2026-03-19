import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { MOTIVES_LIST } from '@/data/medical-constants';
import { CheckboxList } from '@/components/medical/ui/FormComponents';
import { FloatingLabelInput } from '@/components/medical/premium-ui/FloatingLabelInput';
import { type InitialHistoryFormData } from '@/lib/validations/history';

interface MotivesSectionProps {
    onShowObesityModal: () => void;
}

export const MotivesSection: React.FC<MotivesSectionProps> = ({ onShowObesityModal }) => {
    const { control, watch, setValue } = useFormContext<InitialHistoryFormData>();
    const motives = watch('motives');

    const handleMotiveChange = (k: string, v: boolean) => {
        setValue('motives', { ...motives, [k]: v }, { shouldDirty: true });
        if (k === 'Obesidad' && v) {
            onShowObesityModal();
        }
    };

    return (
        <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/5 transition-all duration-700 hover:border-primary/20">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
                <h3 className="text-[11px] tracking-[0.5em] font-light text-white uppercase italic">Motivo de Consulta</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
                <CheckboxList items={MOTIVES_LIST} data={motives} onChange={handleMotiveChange} />
            </div>

            {/* Conditional Motives Details */}
            <AnimatePresence>
                {((motives?.['Cáncer'] || motives?.['Cancer']) || motives?.['Obesidad']) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 overflow-hidden"
                    >
                        {(motives?.['Cáncer'] || motives?.['Cancer']) && (
                            <Controller
                                name="motivesCancerDetails"
                                control={control}
                                render={({ field }) => (
                                    <FloatingLabelInput
                                        label="¿Cuáles? (Cáncer)"
                                        value={field.value}
                                        onChange={field.onChange}
                                        wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                                    />
                                )}
                            />
                        )}

                        {motives?.['Obesidad'] && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-8 py-5 rounded-[2rem] bg-primary/5 border border-primary/10 flex items-center justify-between group transition-all hover:bg-primary/10"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[9px] tracking-[0.3em] text-primary font-bold uppercase">Datos de Obesidad Detectados</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={onShowObesityModal}
                                    className="text-[9px] text-white/40 hover:text-white font-bold tracking-widest uppercase transition-all flex items-center gap-2 group-hover:translate-x-1"
                                >
                                    Abrir detalles →
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-12 pt-12 border-t border-white/5">
                <Controller
                    name="otherMotive"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            label="Especificaciones Adicionales"
                            as="textarea"
                            rows={2}
                            value={field.value}
                            onChange={field.onChange}
                            wrapperClassName="bg-black/20 border-white/5 focus-within:border-primary/40 rounded-[2rem]"
                        />
                    )}
                />
            </div>
        </div>
    );
};

