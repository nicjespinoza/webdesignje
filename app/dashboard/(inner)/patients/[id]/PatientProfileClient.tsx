// app/dashboard/(inner)/patients/[id]/PatientProfileClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Patient, InitialHistory, SubsequentConsult } from "@/types";
import { PatientHeader } from "@/components/medical/profile/PatientHeader";
import { PatientInfoCard } from "@/components/medical/profile/PatientInfoCard";
import { HistoryList } from "@/components/medical/profile/HistoryList";
import { ConsultList } from "@/components/medical/profile/ConsultList";
import { Loader2, ArrowLeft, FileText, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function PatientProfileClient() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const specialtyId = searchParams.get('specialty') || 'gastroenterology';
    const patientId = params?.id as string;

    const [patient, setPatient] = useState<Patient | null>(null);
    const [histories, setHistories] = useState<InitialHistory[]>([]);
    const [consults, setConsults] = useState<SubsequentConsult[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'general' | 'consents'>('general');

    useEffect(() => {
        if (!patientId) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const [p, h, c] = await Promise.all([
                    api.getPatient(patientId),
                    api.getHistories(patientId),
                    api.getConsults(patientId)
                ]);
                setPatient(p);
                setHistories(h);
                setConsults(c);
            } catch (error) {
                console.error("Error loading patient profile:", error);
                toast.error("Error al cargar el perfil");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [patientId]);

    const handleDeleteHistory = async (id: string) => {
        if (!confirm("¿Seguro que deseas eliminar esta historia?")) return;
        try {
            await api.deleteHistory(id, patientId);
            setHistories(prev => prev.filter(h => h.id !== id));
            toast.success("Historia eliminada");
        } catch (e) {
            toast.error("Error al eliminar");
        }
    };

    const handleDeleteConsult = async (id: string) => {
        if (!confirm("¿Seguro que deseas eliminar esta consulta?")) return;
        try {
            await api.deleteConsult(id, patientId);
            setConsults(prev => prev.filter(c => c.id !== id));
            toast.success("Consulta eliminada");
        } catch (e) {
            toast.error("Error al eliminar");
        }
    };

    const handleImageUpdate = async (file: File) => {
        toast.success("Imagen seleccionada: " + file.name);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-center">
                <h1 className="text-4xl font-thin tracking-widest text-white">PACIENTE NO ENCONTRADO</h1>
                <button
                    onClick={() => router.push(`/dashboard/patients?specialty=${specialtyId}`)}
                    className="text-[10px] tracking-[0.4em] uppercase text-primary border-b border-primary/20 hover:border-primary transition-all pb-2"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <PatientHeader
                    patient={patient}
                    onBack={() => router.push(`/dashboard/patients?specialty=${specialtyId}`)}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onAIAnalysis={() => toast("Análisis de IA próximamente")}
                    onShowAppointment={() => toast("Gestión de citas próximamente")}
                    onShowNotes={() => { }}
                    onViewNotes={() => { }}
                    onShowEndoscopic={() => { }}
                    onViewEndoscopic={() => { }}
                />

                <main className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Column: Fixed Info Card */}
                        <div className="lg:col-span-4 xl:col-span-3">
                            <PatientInfoCard
                                patient={patient}
                                onEdit={() => router.push(`/dashboard/patients/register?edit=${patient.id}&specialty=${specialtyId}`)}
                                onUpdateImage={handleImageUpdate}
                                uploadingImage={false}
                            />
                        </div>

                        {/* Right Column: History & Consults */}
                        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-12">
                            <section className="bg-[#0a0a0a] rounded-[2rem] p-10 border border-white/5 relative overflow-hidden group hover:border-primary/10 transition-all duration-700">
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <FileText size={48} strokeWidth={1} />
                                </div>
                                <HistoryList
                                    patient={patient}
                                    histories={histories}
                                    onNavigate={(path) => router.push(`${path}${path.includes('?') ? '&' : '?'}specialty=${specialtyId}`)}
                                    onDelete={handleDeleteHistory}
                                />
                            </section>

                            <section className="bg-[#0a0a0a] rounded-[2rem] p-10 border border-white/5 relative overflow-hidden group hover:border-primary/10 transition-all duration-700">
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <Calendar size={48} strokeWidth={1} />
                                </div>
                                <ConsultList
                                    patient={patient}
                                    consults={consults}
                                    onNavigate={(path) => router.push(`${path}${path.includes('?') ? '&' : '?'}specialty=${specialtyId}`)}
                                    onDelete={handleDeleteConsult}
                                />
                            </section>
                        </div>
                    </div>
                </main>
            </motion.div>
        </div>
    );
}
