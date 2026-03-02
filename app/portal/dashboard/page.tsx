// app/portal/dashboard/page.tsx
"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Calendar,
    FileText,
    Activity,
    Clipboard,
    Heart,
    Baby,
    Stethoscope,
    ShieldAlert,
    ArrowLeft,
    Search,
    Plus,
    MessageSquare,
    BarChart3,
    Clock,
    LogOut,
    ChevronRight,
    Users,
    Filter,
    Download,
    Printer,
    History,
    MoreVertical,
    ShieldCheck,
    Zap,
    Scale,
    Thermometer,
    Microscope,
    Sparkles,
    Flame,
    Star,
    Eye,
    Ear
} from 'lucide-react';

// Design System / Colors (matching portfolio)
// Gold: #C69320 -> #FBE18D
// Dark: #020202 -> #1a1a2e

const SidebarLink = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black shadow-lg shadow-[#C69320]/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
        <Icon size={20} className={active ? 'text-black' : 'text-slate-400'} />
        <span className="font-medium text-sm">{label}</span>
    </div>
);

const Card = ({ children, title, icon: Icon, className = "" }: { children: React.ReactNode, title?: string, icon?: any, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-[#0a0a0a]/60 backdrop-blur-xl border border-[#C69320]/15 rounded-3xl p-6 ${className} hover:border-[#C69320]/30 transition-colors duration-500`}
    >
        {title && (
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                {Icon && <div className="p-2 bg-[#C69320]/10 rounded-lg"><Icon size={18} className="text-[#FBE18D]" /></div>}
                <h3 className="text-white font-bold text-sm uppercase tracking-widest">{title}</h3>
            </div>
        )}
        {children}
    </motion.div>
);

const Badge = ({ children, variant = "gold" }: { children: React.ReactNode, variant?: "gold" | "blue" | "red" | "green" }) => {
    const styles = {
        gold: "bg-[#C69320]/10 text-[#FBE18D] border-[#C69320]/30",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
        green: "bg-green-500/10 text-green-400 border-green-500/20",
    }[variant];
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${styles}`}>
            {children}
        </span>
    );
};

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const specialty = searchParams.get('specialty') || 'General';
    const role = searchParams.get('role') || 'doctor';

    const isAssistant = role === 'assistant';

    // Fully Robust Specialty Mapping
    const specialtyConfig: Record<string, { icon: any, color: string, label: string, note: string }> = {
        'General': { icon: Stethoscope, color: '#C69320', label: 'Medicina General', note: 'Paciente refiere mejoría en síntomas generales. Continúa tratamiento base. Presión arterial controlada.' },
        'Cardiología': { icon: Heart, color: '#ef4444', label: 'Cardiología', note: 'Paciente estable. ECG sin arritmias. Se mantiene ajuste de estatinas.' },
        'Pediatría': { icon: Baby, color: '#3b82f6', label: 'Pediatría', note: 'Desarrollo psicomotor adecuado. Gráficas de crecimiento en percentil normal.' },
        'Dermatología': { icon: Activity, color: '#f59e0b', label: 'Dermatología', note: 'Resolución de lesión eccematosa en un 80%. Continúa hidratación.' },
        'Ginecología': { icon: Clipboard, color: '#ec4899', label: 'Ginecología', note: 'Control prenatal de bajo riesgo. USG reporta vitalidad fetal normal.' },
        'Urología': { icon: ShieldAlert, color: '#3b82f6', label: 'Urología', note: 'Seguimiento post-operatorio satisfactorio. Gasto urinario normal.' },
        'Neurología': { icon: Activity, color: '#8b5cf6', label: 'Neurología', note: 'Reducción en frecuencia de cefaleas. Fuerza muscular conservada.' },
        'Hematología': { icon: Heart, color: '#ef4444', label: 'Hematología', note: 'Hemoglobina en ascenso. Recuento plaquetario estable.' },
        'Odontología Estética': { icon: Sparkles, color: '#FBE18D', label: 'Odontología Estética', note: 'Blanqueamiento láser finalizado. Reporta sensibilidad mínima.' },
        'Endodoncia': { icon: Activity, color: '#FBE18D', label: 'Endodoncia', note: 'Tratamiento de conducto en pieza 46 completado exitosamente.' },
        'Gastroenterología': { icon: Stethoscope, color: '#3b82f6', label: 'Gastroenterología', note: 'Paciente reporta disminución de reflujo con el nuevo tratamiento.' },
        'Cirugía General': { icon: Stethoscope, color: '#f59e0b', label: 'Cirugía General', note: 'Herida quirúrgica sana, sin signos de infección.' },
        'Geriatría': { icon: User, color: '#8b5cf6', label: 'Geriatría', note: 'Evaluación funcional estable. Mantiene polifarmacia controlada.' },
        'Implantología': { icon: Activity, color: '#FBE18D', label: 'Implantología', note: 'Oseointegración de implante en proceso. Encía sana.' },
        'Infectología': { icon: ShieldAlert, color: '#ef4444', label: 'Infectología', note: 'Tratamiento antibiótico finalizado con éxito clínico.' },
        'Cirugía Maxilofacial': { icon: Stethoscope, color: '#f59e0b', label: 'Cirugía Maxilofacial', note: 'Recuperación de fractura mandibular progresa según lo previsto.' },
        'Nefrología': { icon: Activity, color: '#3b82f6', label: 'Nefrología', note: 'Tasa de filtración glomerular estable. Control de electrolitos normal.' },
        'Oncología': { icon: ShieldCheck, color: '#ef4444', label: 'Oncología', note: 'Respuesta al tratamiento positiva. Marcadores tumorales a la baja.' },
        'Oftalmología': { icon: Eye, color: '#3b82f6', label: 'Oftalmología', note: 'Agudeza visual mejorada tras corrección. Presión intraocular normal.' },
        'Ortodoncia': { icon: Star, color: '#FBE18D', label: 'Ortodoncia', note: 'Ajuste de brackets realizado. Alineación dental progresiva.' },
        'Ortopedia': { icon: User, color: '#f59e0b', label: 'Ortopedia', note: 'Consolidación ósea visible en Rayos X. Inicia fisioterapia.' },
        'Otorrinolaringología': { icon: Ear, color: '#3b82f6', label: 'Otorrino', note: 'Otoscopia muestra resolución de inflamación en oído medio.' },
        'Odontopediatría': { icon: Baby, color: '#FBE18D', label: 'Odontopediatría', note: 'Paciente colaborador. No se observan caries activas.' },
        'Periodoncia': { icon: Activity, color: '#FBE18D', label: 'Periodoncia', note: 'Salud gingival recuperada tras profilaxis profunda.' },
        'Prostodoncia': { icon: Activity, color: '#FBE18D', label: 'Prostodoncia', note: 'Prótesis fija cementada. Oclusión perfecta.' },
        'Psiquiatría': { icon: Activity, color: '#8b5cf6', label: 'Psiquiatría', note: 'Estado de ánimo estable. Tolerancia adecuada al medicamento.' },
        'Neumología': { icon: Activity, color: '#3b82f6', label: 'Neumología', note: 'Capacidad pulmonar mejorada. Espirometría estable.' },
        'Reumatología': { icon: Activity, color: '#f59e0b', label: 'Reumatología', note: 'Reducción en rigidez matutina. Dolor articular controlado.' },
    };

    const config = specialtyConfig[specialty] || specialtyConfig['General'];

    // Fake Patient Data
    const patient = {
        name: "Juan Antonio Pérez García",
        age: specialty === 'Pediatría' || specialty === 'Odontopediatría' ? "8 años" : "45 años",
        dob: specialty === 'Pediatría' || specialty === 'Odontopediatría' ? "12/05/2016" : "15/03/1979",
        gender: "Masculino",
        id: "001-150379-0005R",
        weight: specialty === 'Pediatría' || specialty === 'Odontopediatría' ? "28 kg" : "82 kg",
        height: specialty === 'Pediatría' || specialty === 'Odontopediatría' ? "1.25 m" : "1.78 m",
        blood: "A+",
        allergies: ["Penicilina", "Polen"],
        phone: "+505 8888-9999",
        email: "japerez@email.com",
        lastVisit: "15/01/2026"
    };

    const histories = [
        { date: "15/01/2026", type: "Consulta Rutinaria", doctor: "Dr. Joseph Espinoza", status: "Completado" },
        { date: "10/11/2025", type: "Exámenes de Laboratorio", doctor: "Laboratorio Central", status: "Completado" },
        { date: "05/08/2025", type: "Chequeo Preventivo", doctor: "Dr. Joseph Espinoza", status: "Completado" },
    ];

    return (
        <div className="flex h-screen bg-[#020202] text-white">
            {/* Sidebar */}
            <aside className="w-72 bg-[#050505] border-r border-[#C69320]/15 p-8 hidden lg:flex flex-col gap-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C69320] to-[#FBE18D] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C69320]/20">
                        <config.icon className="text-black" size={24} />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-2xl tracking-tighter gradient-text leading-none">MEDIC·AI</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1">{config.label}</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-3">
                    <SidebarLink icon={BarChart3} label="Dashboard General" active />
                    <SidebarLink icon={Users} label="Registro Pacientes" />
                    <SidebarLink icon={Calendar} label="Agenda Médica" />
                    <SidebarLink icon={MessageSquare} label="Telemedicina" />
                    <SidebarLink icon={ShieldAlert} label="Alertas Críticas" />
                    <SidebarLink icon={Clock} label="Historial Clínico" />
                </nav>

                <div className="pt-8 border-t border-white/5 space-y-6">
                    <div className="flex items-center gap-4 px-3">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-[#C69320]/20 font-bold text-[#FBE18D]">
                            {isAssistant ? 'A' : 'JE'}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{isAssistant ? 'Asistente' : 'Dr. Joseph Espinoza'}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/portal')}
                        className="w-full flex items-center gap-3 p-4 bg-red-500/5 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest"
                    >
                        <LogOut size={16} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#020202] p-8 md:p-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-slate-500 mb-3">
                            <span className="text-[10px] uppercase font-black tracking-[0.3em]">Software Administrativo</span>
                            <ChevronRight size={12} />
                            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#C69320]">Módulo de {specialty}</span>
                        </div>
                        <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Panel de Control</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#FBE18D] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar paciente por ID o Nombre..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-6 focus:outline-none focus:border-[#C69320]/50 transition-all w-80 text-xs font-medium placeholder:text-slate-700"
                            />
                        </div>
                        {!isAssistant && (
                            <button className="bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#C69320]/20 flex items-center gap-2">
                                <Plus size={18} />
                                Nueva Consulta
                            </button>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Patient Information Column */}
                    <div className="xl:col-span-4 space-y-8">
                        <Card className="!p-0 overflow-hidden !rounded-[2.5rem]">
                            <div className="h-28 bg-gradient-to-br from-[#1a1a2e] to-[#020202] border-b border-[#C69320]/15 flex items-center justify-center">
                                <div className="w-16 h-1 w-20 bg-[#C69320] rounded-full opacity-30 mt-auto mb-4"></div>
                            </div>
                            <div className="px-10 pb-10 -mt-14 text-center">
                                <div className="w-28 h-28 mx-auto rounded-full bg-[#050505] border-2 border-[#C69320]/30 flex items-center justify-center mb-6 relative group">
                                    <User size={56} className="text-slate-600 group-hover:text-[#FBE18D] transition-colors" />
                                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-[#050505] rounded-full shadow-lg"></div>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{patient.name}</h3>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-6">Expediente: {patient.id}</p>

                                <div className="flex flex-wrap justify-center gap-3 mb-10">
                                    <Badge variant="gold">{patient.blood}</Badge>
                                    <Badge variant="blue">{patient.gender}</Badge>
                                    <Badge variant="red">Alérgico: {patient.allergies[0]}</Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-6 text-left border-t border-white/5 pt-10">
                                    <div>
                                        <label className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Edad Cronológica</label>
                                        <p className="font-bold text-white text-sm">{patient.age}</p>
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Último Ingreso</label>
                                        <p className="font-bold text-white text-sm">{patient.lastVisit}</p>
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Peso Corporal</label>
                                        <p className="font-bold text-white text-sm">{patient.weight}</p>
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Estatura</label>
                                        <p className="font-bold text-white text-sm">{patient.height}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title="Contacto Rápido" icon={MessageSquare}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-[#FBE18D] transition-colors">
                                        <Activity size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Móvil Personal</p>
                                        <p className="text-sm font-bold text-white">{patient.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-[#FBE18D] transition-colors">
                                        <Activity size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Correo Electrónico</p>
                                        <p className="text-sm font-bold text-white">{patient.email}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Clinical Analysis Column */}
                    <div className="xl:col-span-8 space-y-8">
                        {/* Vital Signs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="flex items-center gap-5 !p-6 border-l-4 border-l-red-500/50">
                                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shadow-inner">
                                    <Heart size={28} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Presión Arterial</p>
                                    <p className="text-2xl font-black text-white">118/72 <span className="text-[10px] text-slate-600 ml-1">mmHg</span></p>
                                </div>
                            </Card>
                            <Card className="flex items-center gap-5 !p-6 border-l-4 border-l-blue-500/50">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                                    <Activity size={28} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Ritmo Cardíaco</p>
                                    <p className="text-2xl font-black text-white">74 <span className="text-[10px] text-slate-600 ml-1">BPM</span></p>
                                </div>
                            </Card>
                            <Card className="flex items-center gap-5 !p-6 border-l-4 border-l-[#C69320]/50">
                                <div className="w-14 h-14 rounded-2xl bg-[#C69320]/10 flex items-center justify-center text-[#FBE18D] shadow-inner">
                                    <History size={28} />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Saturación O2</p>
                                    <p className="text-2xl font-black text-white">98% <span className="text-[10px] text-slate-600 ml-1">SpO2</span></p>
                                </div>
                            </Card>
                        </div>

                        {/* Clinical Note Card */}
                        <Card title="Evolución Médica & Diagnóstico" icon={FileText} className="!rounded-[2.5rem]">
                            <div className="bg-[#050505] border border-white/5 rounded-[1.5rem] p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <Badge variant="green">Estado: Completado</Badge>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full border border-[#C69320]/30 flex items-center justify-center text-[#FBE18D] font-black text-xs">JE</div>
                                    <div>
                                        <p className="text-xs font-bold text-white">Dr. Joseph Espinoza</p>
                                        <p className="text-[9px] text-slate-600 uppercase font-bold">15 de Enero, 2026 · 10:30 AM</p>
                                    </div>
                                </div>
                                <h4 className="text-lg font-black text-[#FBE18D] mb-4 uppercase tracking-tighter">Nota de Evolución Especializada</h4>
                                <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                                    {config.note} El paciente demuestra adherencia al protocolo sugerido. Se recomienda continuar con el esquema actual y programar revisión técnica en 30 días.
                                </p>
                                <div className="flex flex-wrap gap-4 border-t border-white/5 pt-8">
                                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                        <Download size={14} className="text-[#C69320]" /> Descargar PDF
                                    </button>
                                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                        <Printer size={14} className="text-[#C69320]" /> Imprimir Ficha
                                    </button>
                                    <button className="ml-auto text-xs font-bold text-[#FBE18D] hover:underline underline-offset-4">Editar Historial →</button>
                                </div>
                            </div>
                        </Card>

                        {/* Simple History List */}
                        <Card title="Cronología de Intervenciones" icon={Clipboard} className="!rounded-[2.5rem]">
                            <div className="space-y-1">
                                {histories.map((h, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl hover:bg-white/5 transition-colors group border-b border-white/[0.02]">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex flex-col items-center justify-center text-[10px] font-black uppercase">
                                                <span className="text-slate-500">{h.date.split('/')[0]}</span>
                                                <span className="text-[#FBE18D]">ENE</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-[#FBE18D] transition-colors">{h.type}</p>
                                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1">{h.doctor}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant="gold">Finalizado</Badge>
                                            <button className="p-2 text-slate-700 hover:text-white transition-colors">
                                                <MoreVertical size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-[#C69320] to-[#FBE18D] rounded-full shadow-2xl flex items-center justify-center text-black z-50">
                <Plus size={32} />
            </motion.button>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#020202] flex items-center justify-center flex-col gap-6">
                <div className="w-16 h-16 border-4 border-[#C69320]/10 border-t-[#FBE18D] rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C69320] animate-pulse">Sincronizando Medic·AI</p>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
