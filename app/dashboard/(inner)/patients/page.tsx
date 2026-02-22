"use client";

import React, { useState, useEffect } from "react";
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
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Patient } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

const PAGE_SIZE = 9;

export default function PatientsPage() {
    const [allPatients, setAllPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode, setViewMode] = useState<"active" | "process">("active");
    const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
    const [showVitalSignsModal, setShowVitalSignsModal] = useState(false);
    const [selectedPatientForVitals, setSelectedPatientForVitals] = useState<Patient | null>(null);
    const [vitalSigns, setVitalSigns] = useState({
        fc: '', fr: '', temp: '', pa: '', pam: '', sat02: '', weight: '', height: '', imc: ''
    });

    const router = useRouter();

    // Load patients using cached API
    useEffect(() => {
        const fetchPatients = async () => {
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
    }, []);

    // Status definitions
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

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="bg-white rounded-3xl p-4 md:p-10 max-w-7xl mx-auto shadow-2xl relative overflow-hidden min-h-[80vh] flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
                    <h2 className="text-3xl font-bold text-[#084286] flex items-center gap-3">
                        <Users className="text-[#084286]" /> Pacientes
                    </h2>
                    <button
                        onClick={() => router.push("/dashboard/patients/register")}
                        className="bg-[#084286] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-900 transition shadow-lg w-full md:w-auto justify-center font-medium"
                    >
                        <UserPlus size={20} /> Crear Nuevo
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                    {['active', 'process'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => { setViewMode(mode as any); setCurrentPage(0); }}
                            className={`pb-3 px-4 text-base font-bold transition-colors relative ${viewMode === mode
                                ? (mode === 'active' ? "text-[#083c79] border-b-4 border-[#083c79]" : "text-orange-500 border-b-4 border-orange-500")
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {mode === 'active' ? 'Pacientes Activos' : 'En Proceso (Pendientes)'}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido, ID o email..."
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm outline-none focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 animate-spin text-[#084286]" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                            {paginatedPatients.map((p) => (
                                <motion.div
                                    key={p.id}
                                    layout
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
                                                {p.profileImage ? (
                                                    <img src={p.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={24} className="text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {p.firstName} {p.lastName}
                                                </h3>
                                                <p className="text-sm font-medium text-gray-500">{p.ageDetails || "Sin edad"}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                                                onClick={() => router.push(`/dashboard/patients/${p.id}`)}
                                            >
                                                <ArrowLeft size={20} className="rotate-180" />
                                            </button>
                                            <button
                                                className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                                onClick={() => setPatientToDelete(p)}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {viewMode === 'process' && p.registrationStatus?.toLowerCase().includes('proceso3') && (
                                        <button
                                            onClick={() => { setSelectedPatientForVitals(p); setShowVitalSignsModal(true); }}
                                            className="mt-4 flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-purple-700 transition"
                                        >
                                            <Activity size={14} /> Ingresar Signos Vitales
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                            <p className="text-sm text-gray-500 font-medium">
                                Página {currentPage + 1} de {totalPages || 1}
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="p-2 border rounded-xl disabled:opacity-30"
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage >= totalPages - 1}
                                    className="p-2 border rounded-xl disabled:opacity-30"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Delete Modal */}
                <AnimatePresence>
                    {patientToDelete && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                                <div className="flex items-center gap-3 text-red-600 mb-4">
                                    <AlertTriangle size={32} />
                                    <h3 className="text-2xl font-bold">Eliminar Paciente</h3>
                                </div>
                                <p className="text-gray-600 mb-6">¿Estás seguro que deseas eliminar a <strong>{patientToDelete.firstName} {patientToDelete.lastName}</strong>? Esta acción borrará todo su historial clínico.</p>
                                <div className="flex gap-4">
                                    <button onClick={() => setPatientToDelete(null)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-600">Cancelar</button>
                                    <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Eliminar</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Vital Signs Modal */}
                <AnimatePresence>
                    {showVitalSignsModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                                <h3 className="text-2xl font-bold text-[#084286] mb-6 flex items-center gap-2">
                                    <Activity /> Signos Vitales
                                </h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {['fc', 'fr', 'temp', 'pa', 'weight', 'height'].map(field => (
                                        <div key={field}>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{field}</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-blue-500"
                                                value={(vitalSigns as any)[field]}
                                                onChange={(e) => setVitalSigns({ ...vitalSigns, [field]: e.target.value })}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setShowVitalSignsModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-600">Cancelar</button>
                                    <button onClick={handleSaveVitalSigns} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Guardar</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
