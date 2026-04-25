// medical-ai-demo/components/profile/PatientInfoCard.tsx
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Camera, Edit, User, Phone, Mail, MapPin, Calendar, Activity, Hash, Briefcase, ShieldCheck } from 'lucide-react';
import { Patient } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getSpecialtyById, Specialty } from '@/lib/specialties';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface PatientInfoCardProps {
    patient: Patient;
    onUpdateImage: (file: File) => void;
    onEdit?: () => void;
    uploadingImage?: boolean;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient, onUpdateImage, onEdit, uploadingImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [specialty, setSpecialty] = useState<Specialty | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const specId = typeof window !== 'undefined' ? localStorage.getItem('selectedSpecialty') || 'gastroenterology' : 'gastroenterology';
        setSpecialty(getSpecialtyById(specId));
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpdateImage(e.target.files[0]);
        }
    };

    const isMigrated = patient.legacyIdSistema;
    const formattedBirthDate = typeof patient.birthDate === 'object' && patient.birthDate !== null
        ? new Date((patient.birthDate as any).seconds * 1000).toLocaleDateString()
        : String(patient.birthDate);

    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0a0a0a]/60 backdrop-blur-xl rounded-[2rem] p-10 border border-white/5 relative flex flex-col group/card transition-all duration-1000 hover:border-primary/20"
        >
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col gap-1">
                    <span className="text-[7px] tracking-[0.6em] text-primary/60 uppercase font-light">
                        FICHA MÉDICA
                    </span>
                    <div className="w-6 h-[1px] bg-primary/20" />
                </div>
                {onEdit && (
                    <button
                        onClick={onEdit}
                        aria-label={t('common.edit')}
                        title={t('common.edit')}
                        className="p-2.5 text-white/20 hover:text-primary transition-all rounded-full border border-white/5 hover:border-primary/20 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary"
                    >
                        <Edit size={12} strokeWidth={1} />
                    </button>
                )}
            </div>

            <div className="flex flex-col items-center mb-14 relative group/avatar">
                <div className="relative">
                    <div className="w-36 h-36 rounded-2xl overflow-hidden bg-white/5 border border-white/5 mb-6 group-hover/avatar:border-primary/40 transition-all duration-1000 relative">
                        {patient.profileImage ? (
                            <Image src={patient.profileImage} alt="Avatar" width={144} height={144} className="w-full h-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all duration-1000" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User size={40} strokeWidth={1} className="text-white/10" />
                            </div>
                        )}
                        <button
                            type="button"
                            aria-label={t('common.updatePhoto')}
                            title={t('common.updatePhoto')}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:opacity-100"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="text-white/60" size={20} strokeWidth={1} />
                        </button>
                    </div>
                </div>

                <div className="text-center space-y-1.5">
                    <h2 className="text-2xl font-thin text-white tracking-[0.1em] uppercase leading-tight line-clamp-1">
                        {patient.firstName}
                    </h2>
                    <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase font-light">
                        {patient.lastName}
                    </p>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            {isMigrated && (
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 mb-10 text-center">
                    <p className="text-[7px] tracking-[0.3em] text-primary uppercase font-bold">LEGACY VALIDATED</p>
                    <p className="text-[6px] tracking-[0.2em] text-primary/40 uppercase mt-0.5">ID: {patient.legacyIdSistema || patient.id.slice(0, 8)}</p>
                </div>
            )}

            <div className="flex flex-col space-y-8 flex-1">
                {[
                    { icon: Briefcase, label: "PROFESIÓN", value: patient.profession },
                    { icon: Phone, label: "TELÉFONO", value: patient.phone },
                    { icon: Mail, label: "EMAIL", value: patient.email },
                    { icon: Calendar, label: "NACIMIENTO", value: formattedBirthDate },
                    { icon: MapPin, label: "MODO", value: patient.address, isLong: true }
                ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 px-1 group/item">
                        <div className="flex items-center gap-3">
                            <item.icon size={12} strokeWidth={1} className="text-primary/20 group-hover/item:text-primary transition-colors" />
                            <span className="text-[7px] font-thin uppercase text-white/20 tracking-[0.4em]">{item.label}</span>
                        </div>
                        <span className={cn(
                            "text-[10px] font-light text-white/40 tracking-[0.1em] uppercase pt-0.5 border-white/5 transition-all group-hover:text-white/80",
                            item.isLong ? 'leading-relaxed' : 'line-clamp-1'
                        )}>
                            {item.value || 'N/A'}
                        </span>
                    </div>
                ))}
            </div>

            {specialty && (
                <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-center gap-4 opacity-50">
                    <div className="w-0.5 h-0.5 bg-primary/20 rounded-full" />
                    <p className="text-[6px] tracking-[0.6em] text-white/20 uppercase font-light">
                        {specialty.nameEs}
                    </p>
                </div>
            )}
        </motion.div>
    );
};
