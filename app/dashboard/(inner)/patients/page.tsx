// app/dashboard/(inner)/patients/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
    Users,
    UserPlus,
    Search,
    ArrowLeft,
    Trash2,
    AlertTriangle,
    X,
    MessageCircle,
    Activity,
    User,
    ChevronLeft,
    ChevronRight,
    Loader2,
    ShieldCheck,
    Sparkles,
    TrendingUp
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Patient } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { getSpecialtyById } from "@/lib/specialties";

const PAGE_SIZE = 8;

type VitalSigns = {
    fc: string;
    fr: string;
    temp: string;
    pa: string;
    pam: string;
    sat02: string;
    weight: string;
    height: string;
    imc: string;
};

function PatientsPageContent() {
    const searchParams = useSearchParams();
    const specialtyId = searchParams.get('specialty') || 'gastroenterology';
    const specialty = getSpecialtyById(specialtyId);

    // Auth and Navigation
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    // Patients State
    const [allPatients, setAllPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode, setViewMode] = useState<"active" | "process">("active");
    const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
    const [showVitalSignsModal, setShowVitalSignsModal] = useState(false);
    const [selectedPatientForVitals, setSelectedPatientForVitals] = useState<Patient | null>(null);
    const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
        fc: '', fr: '', temp: '', pa: '', pam: '', sat02: '', weight: '', height: '', imc: ''
    });

    useEffect(() => {
        const fetchPatients = async () => {
            if (authLoading || !user) return;

            setLoading(true);
            try {
                const data = await api.getPatients();
                setAllPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
                toast.error("Error al cargar pacientes");
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, [user, authLoading]);

    const ACTIVE_STATUSES = ['Paciente', 'paciente', 'Activo', 'activo', ''];
    const PROCESS_STATUSES = ['Proceso1', 'Proceso2', 'Proceso3', 'proceso1', 'proceso2', 'proceso3'];

    const filteredPatients = allPatients.filter(p => {
        const status = (p.registrationStatus || '').toLowerCase();
        const activeStatuses = ACTIVE_STATUSES.map(s => s.toLowerCase());
        const processStatuses = PROCESS_STATUSES.map(s => s.toLowerCase());

        const matchesTab = viewMode === 'active'
            ? activeStatuses.includes(status) || !p.registrationStatus
            : processStatuses.includes(status);

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return matchesTab && (
                (p.firstName || '').toLowerCase().includes(term) ||
                (p.lastName || '').toLowerCase().includes(term) ||
                (p.id || '').includes(searchTerm) ||
                (p.email || '').toLowerCase().includes(term)
            );
        }
        return matchesTab;
    });

    const totalPages = Math.ceil(filteredPatients.length / PAGE_SIZE);
    const startIdx = currentPage * PAGE_SIZE;
    const paginatedPatients = filteredPatients.slice(startIdx, startIdx + PAGE_SIZE);

    const handleDelete = async () => {
        if (!patientToDelete) return;
        try {
            await api.deletePatient(patientToDelete.id);
            setAllPatients(prev => prev.filter(p => p.id !== patientToDelete.id));
            toast.success("Paciente eliminado correctamente");
            setPatientToDelete(null);
        } catch (error) {
            toast.error("Error al eliminar paciente");
        }
    };

    const handleSaveVitalSigns = async () => {
        if (!selectedPatientForVitals) return;
        try {
            await api.updatePatient(selectedPatientForVitals.id, {
                registrationStatus: 'Paciente',
                vitalSigns: vitalSigns
            });
            setAllPatients(prev => prev.map(p =>
                p.id === selectedPatientForVitals.id ? { ...p, registrationStatus: 'Paciente' } : p
            ));
            toast.success("Signos vitales guardados");
            setShowVitalSignsModal(false);
        } catch (error) {
            toast.error("Error al guardar signos vitales");
        }
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Minimalist Hero Section */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-12 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary/60 text-[10px] tracking-[0.4em] uppercase font-light">
                        <Users size={14} strokeWidth={1} />
                        <span>Directorio Clínico</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-thin tracking-[0.1em] text-white">
                        PACIENTES
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1} />
                        <input
                            type="text"
                            placeholder="BUSCAR EXPEDIENTE..."
                            className="bg-transparent border-b border-white/10 py-3 pl-12 pr-4 outline-none focus:border-primary transition-all text-[10px] tracking-[0.3em] font-light text-white w-[300px] placeholder:text-white/10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => router.push(`/dashboard/patients/register?specialty=${specialtyId}`)}
                        className="bg-white/5 border border-white/10 hover:border-primary/40 text-white/60 hover:text-white px-8 py-4 rounded-full text-[9px] tracking-[0.4em] uppercase transition-all duration-700 font-light flex items-center gap-4"
                    >
                        <UserPlus size={14} strokeWidth={1} />
                        Registrar
                    </button>
                </div>
            </div>

            {/* View Switching Tabs */}
            <div className="flex gap-12 border-b border-white/5">
                {[
                    { id: 'active', label: 'ACTIVOS' },
                    { id: 'process', label: 'PENDIENTES' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setViewMode(tab.id as "active" | "process"); setCurrentPage(0); }}
                        className={cn(
                            "pb-6 text-[10px] tracking-[0.3em] uppercase font-light transition-all duration-700 relative",
                            viewMode === tab.id ? "text-primary scale-110" : "text-white/20 hover:text-white"
                        )}
                    >
                        {tab.label}
                        {viewMode === tab.id && (
                            <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {/* Luxury Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {paginatedPatients.map((p, idx) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative h-[280px] bg-[#0a0a0a]/60 backdrop-blur-xl rounded-[1.5rem] border border-white/5 p-8 flex flex-col justify-between transition-all duration-700 hover:border-primary/20 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <div className="space-y-6">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/5 mix-blend-lighten grayscale group-hover:grayscale-0 transition-all duration-700">
                                        {p.profileImage ? (
                                            <img src={p.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                <User size={20} strokeWidth={1} className="text-white/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -top-2 -right-2 text-[8px] tracking-widest text-primary/40 font-black">
                                        #{p.id.slice(-4).toUpperCase()}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-thin tracking-widest text-white leading-tight uppercase group-hover:text-primary transition-colors">
                                        {p.firstName} <br /> {p.lastName}
                                    </h3>
                                    <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase font-light">
                                        {p.ageDetails || "Nuevos Datos"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <button
                                        onClick={() => router.push(`/dashboard/patients/${p.id}?specialty=${specialtyId}`)}
                                        className="text-[9px] tracking-[0.3em] font-light text-white/30 hover:text-white transition-all uppercase flex items-center gap-2 group/btn"
                                    >
                                        Expediente <ChevronRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => setPatientToDelete(p)}
                                        className="text-white/5 hover:text-destructive transition-colors"
                                    >
                                        <Trash2 size={16} strokeWidth={1} />
                                    </button>
                                </div>

                                {viewMode === 'process' && p.registrationStatus?.toLowerCase().includes('proceso3') && (
                                    <button
                                        onClick={() => { setSelectedPatientForVitals(p); setShowVitalSignsModal(true); }}
                                        className="w-full py-3 border border-primary/20 hover:bg-primary/5 text-primary text-[8px] tracking-[0.4em] uppercase transition-all rounded-full"
                                    >
                                        SIGNOS VITALES
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination Luxury */}
            <div className="flex items-center justify-between border-t border-white/5 pt-12 text-white/10 uppercase tracking-[0.5em] text-[8px] font-light">
                <span>Pág {currentPage + 1} / {totalPages || 1}</span>
                <div className="flex gap-12">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="hover:text-white transition-all disabled:opacity-0"
                    >
                        ANTERIOR
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={currentPage >= totalPages - 1}
                        className="hover:text-white transition-all disabled:opacity-0"
                    >
                        SIGUIENTE
                    </button>
                </div>
            </div>

            {/* Modals with Luxury Style */}
            <AnimatePresence>
                {patientToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg p-16 border border-white/5 bg-[#0a0a0a] rounded-[3rem] text-center space-y-8">
                            <AlertTriangle size={48} className="mx-auto text-destructive opacity-40" strokeWidth={1} />
                            <div className="space-y-2">
                                <h3 className="text-3xl font-thin tracking-widest text-white uppercase">Eliminar Expediente</h3>
                                <p className="text-[10px] tracking-luxury text-white/30 uppercase font-light">
                                    ¿Confirmar eliminación de {patientToDelete.firstName}?
                                </p>
                            </div>
                            <div className="flex gap-4 pt-10">
                                <button onClick={() => setPatientToDelete(null)} className="flex-1 py-4 text-[9px] tracking-luxury uppercase text-white/20 hover:text-white border border-white/5 rounded-full transition-all">Cancelar</button>
                                <button onClick={handleDelete} className="flex-1 py-4 text-[9px] tracking-luxury uppercase text-destructive border border-destructive/20 rounded-full transition-all">Confirmar</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {showVitalSignsModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl p-16 bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-y-auto max-h-[90vh]">
                            <div className="mb-12 border-b border-white/5 pb-8">
                                <h3 className="text-4xl font-thin tracking-luxury text-white uppercase">SIGNOS VITALES</h3>
                                <p className="text-[9px] tracking-luxury text-primary uppercase mt-2">Procedimiento Clínico v4.2</p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-16">
                                {(["fc", "fr", "temp", "pa", "weight", "height"] as const).map((field) => (
                                    <div key={field} className="space-y-4">
                                        <label className="text-[8px] tracking-luxury text-white/30 uppercase">{field}</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-primary transition-all text-white font-thin tracking-widest text-xl"
                                            value={vitalSigns[field]}
                                            onChange={(e) => setVitalSigns({ ...vitalSigns, [field]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-8">
                                <button onClick={() => setShowVitalSignsModal(false)} className="flex-1 py-5 text-[9px] tracking-luxury uppercase text-white/20 border border-white/5 rounded-full transition-all">Regresar</button>
                                <button onClick={handleSaveVitalSigns} className="flex-1 py-5 text-[9px] tracking-luxury uppercase bg-primary text-black font-black rounded-full transition-all">Sincronizar Datos</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .tracking-luxury {
                    letter-spacing: 0.5em;
                }
            `}</style>
        </div>
    );
}

export default function PatientsPage() {
    return (
        <Suspense fallback={
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
            </div>
        }>
            <PatientsPageContent />
        </Suspense>
    );
}
