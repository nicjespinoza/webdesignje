"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Patient, InitialHistory, SubsequentConsult } from "@/types";
import { PatientHeader } from "@/components/profile/PatientHeader";
import { PatientInfoCard } from "@/components/profile/PatientInfoCard";
import { HistoryList } from "@/components/profile/HistoryList";
import { ConsultList } from "@/components/profile/ConsultList";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function PatientProfilePage() {
    const params = useParams();
    const router = useRouter();
    const patientId = params.id as string;

    const [patient, setPatient] = useState<Patient | null>(null);
    const [histories, setHistories] = useState<InitialHistory[]>([]);
    const [consults, setConsults] = useState<SubsequentConsult[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'general' | 'consents'>('general');

    const fileInputRef = React.useRef<HTMLInputElement>(null);

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
            await api.deleteHistory(id);
            setHistories(prev => prev.filter(h => h.id !== id));
            toast.success("Historia eliminada");
        } catch (e) {
            toast.error("Error al eliminar");
        }
    };

    const handleDeleteConsult = async (id: string) => {
        if (!confirm("¿Seguro que deseas eliminar esta consulta?")) return;
        try {
            await api.deleteConsult(id);
            setConsults(prev => prev.filter(c => c.id !== id));
            toast.success("Consulta eliminada");
        } catch (e) {
            toast.error("Error al eliminar");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Placeholder for image upload logic
        toast.success("Imagen seleccionada (funcionalidad en desarrollo)");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#084286]" />
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">Paciente no encontrado</h1>
                <button
                    onClick={() => router.push("/dashboard/patients")}
                    className="bg-[#084286] text-white px-6 py-2 rounded-xl font-bold"
                >
                    Volver a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <PatientHeader
                patient={patient}
                onBack={() => router.push("/dashboard/patients")}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onAIAnalysis={() => toast("Análisis de IA próximamente")}
                onShowAppointment={() => toast("Gestión de citas próximamente")}
                onShowNotes={() => { }}
                onViewNotes={() => { }}
                onShowEndoscopic={() => { }}
                onViewEndoscopic={() => { }}
            />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar: Patient Info */}
                    <PatientInfoCard
                        patient={patient}
                        onEdit={() => router.push(`/dashboard/patients/register?edit=${patient.id}`)}
                        fileInputRef={fileInputRef}
                        onImageUpload={handleImageUpload}
                        uploadingImage={false}
                    />

                    {/* Main Content: Histories & Consults */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <HistoryList
                                patient={patient}
                                histories={histories}
                                onNavigate={(path) => router.push(path)}
                                onDelete={handleDeleteHistory}
                                onViewOrders={() => { }}
                            />
                        </section>

                        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <ConsultList
                                patient={patient}
                                consults={consults}
                                onNavigate={(path) => router.push(path)}
                                onDelete={handleDeleteConsult}
                            />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
