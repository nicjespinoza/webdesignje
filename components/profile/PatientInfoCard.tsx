
"use client";

import React, { useRef } from 'react';
import { Camera, User, Phone, Mail, MapPin, Calendar, Heart, Shield, Activity, Hash } from 'lucide-react';
import { InfoItem } from './SharedComponents';
import { Patient } from '@/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PatientInfoCardProps {
    patient: Patient;
    onUpdateImage: (file: File) => void;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient, onUpdateImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpdateImage(e.target.files[0]);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Profile Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 space-y-10"
            >
                <div className="bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-border/40 shadow-soft relative group overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative flex flex-col items-center">
                        <div className="relative group/avatar">
                            <div className="w-48 h-48 rounded-[3rem] overflow-hidden bg-muted border-4 border-background shadow-2xl transition-all group-hover/avatar:scale-105 duration-500">
                                {patient.photoUrl ? (
                                    <img src={patient.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                                        <User size={80} />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute -bottom-4 -right-4 p-5 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 active:scale-90 transition-all border-4 border-background"
                            >
                                <Camera size={24} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="mt-10 text-center space-y-2">
                            <h2 className="text-2xl font-black text-foreground tracking-tighter">
                                {patient.firstName} {patient.lastName}
                            </h2>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
                                Paciente Registrado
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card/40 backdrop-blur-3xl p-6 rounded-[2rem] border border-border/40 shadow-soft text-center group hover:bg-card/60 transition-all">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Sexo</p>
                        <p className="text-lg font-black text-foreground">{patient.sex}</p>
                    </div>
                    <div className="bg-card/40 backdrop-blur-3xl p-6 rounded-[2rem] border border-border/40 shadow-soft text-center group hover:bg-card/60 transition-all">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Sangre</p>
                        <p className="text-lg font-black text-primary">{patient.bloodType || 'N/A'}</p>
                    </div>
                </div>
            </motion.div>

            {/* Main Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-3 space-y-10"
            >
                {/* Information Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Person Information */}
                    <div className="bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-border/40 shadow-soft space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                <User size={20} />
                            </div>
                            <h3 className="text-xl font-black text-foreground tracking-tight uppercase tracking-widest text-xs">Datos Personales</h3>
                        </div>
                        <div className="space-y-4">
                            <InfoItem label="Nombre Completo" value={`${patient.firstName} ${patient.lastName}`} icon={<User size={16} />} />
                            <InfoItem label="Fecha de Nacimiento" value={patient.birthDate} icon={<Calendar size={16} />} />
                            <InfoItem label="Cedula / ID" value={patient.idCard || 'No registrado'} icon={<Hash size={16} />} />
                            <InfoItem label="Estado Civil" value={patient.civilStatus} icon={<Heart size={16} />} />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-border/40 shadow-soft space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                <Phone size={20} />
                            </div>
                            <h3 className="text-xl font-black text-foreground tracking-tight uppercase tracking-widest text-xs">Información de Contacto</h3>
                        </div>
                        <div className="space-y-4">
                            <InfoItem label="Teléfono" value={patient.phone} icon={<Phone size={16} />} />
                            <InfoItem label="Correo Electrónico" value={patient.email} icon={<Mail size={16} />} />
                            <InfoItem label="Dirección" value={patient.address} icon={<MapPin size={16} />} />
                            <InfoItem label="Ocupación" value={patient.occupation || 'N/A'} icon={<Activity size={16} />} />
                        </div>
                    </div>
                </div>

                {/* Additional Information (Insurance etc) */}
                <div className="bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-border/40 shadow-soft space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-xl font-black text-foreground tracking-tight uppercase tracking-widest text-xs">Seguro e Información Médica</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoItem label="Aseguradora" value={patient.insurance || 'Particular / Sin Seguro'} icon={<Shield size={16} />} />
                        <InfoItem label="Número de Poliza" value={patient.policyNumber || 'N/A'} icon={<Hash size={16} />} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
