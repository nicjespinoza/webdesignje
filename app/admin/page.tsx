"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { isAdminUser } from '@/lib/authz';
import { signOut } from 'firebase/auth';
import {
  LayoutDashboard, LogOut, Star, Inbox, Trash2, AlertTriangle,
  Building2, Phone, Mail, Globe, DollarSign, Calendar, Clock,
  Target, Lightbulb, Users, TrendingUp, X,
  MessageSquare, Send, CheckCircle2, Search, Sparkles, Copy, RefreshCw, type LucideIcon
} from 'lucide-react';

const STATUSES = ['Nuevo', 'En Contacto', 'Convertido', 'Archivado'] as const;
type Status = typeof STATUSES[number];

const STATUS_META: Record<Status, { color: string; bg: string; dot: string; label: string; icon: React.ComponentType<{ className?: string }> }> = {
  'Nuevo': { color: 'from-blue-400 to-blue-600', bg: 'bg-blue-500/10 border-blue-500/25', dot: 'bg-blue-400', label: 'Sin contactar', icon: Inbox },
  'En Contacto': { color: 'from-amber-400 to-yellow-500', bg: 'bg-amber-500/10 border-amber-500/25', dot: 'bg-amber-400', label: 'En negociaci\u00f3n', icon: MessageSquare },
  'Convertido': { color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-400', label: 'Cliente cerrado', icon: CheckCircle2 },
  'Archivado': { color: 'from-slate-400 to-slate-600', bg: 'bg-slate-500/10 border-slate-500/25', dot: 'bg-slate-400', label: 'Archivado', icon: ArchiveIcon },
};

function ArchiveIcon({ className }: { className?: string }) {
  return <ArchiveBox className={className} />;
}

function ArchiveBox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="5" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

interface LeadData {
  id: string;
  status?: string;
  ticketNumber?: string;
  fullName?: string;
  clientName?: string;
  projectName?: string;
  companyName?: string;
  email?: string;
  clientEmail?: string;
  phone?: string;
  clientPhone?: string;
  projectType?: string;
  otherProjectType?: string;
  budget?: string;
  mainProblem?: string;
  mainObjectives?: string[];
  keyFeatures?: string[];
  selectedFeatures?: string[];
  dynamicAnswers?: Record<string, string>;
  businessProfile?: Record<string, string>;
  painPoints?: string[];
  goals?: string;
  timeline?: string;
  references?: string;
  requirements?: string;
  currentWebsite?: string;
  preferredContact?: string;
  extraDetails?: string;
  source?: string;
  createdAt?: { toDate?: () => Date };
  deadline?: string;
}

const AdminDashboardPage = () => {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [projectInquiries, setProjectInquiries] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'projects'>('leads');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeadData | null>(null);
  const [selectedItem, setSelectedItem] = useState<LeadData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const router = useRouter();

  const handleGenerateAiAnalysis = async (item: LeadData) => {
    setIsGeneratingAi(true);
    setAiAnalysis(null);
    try {
      const clientName = activeTab === 'leads' ? (item.fullName || 'Cliente') : (item.clientName || 'Cliente');
      const proj = activeTab === 'projects' ? item.projectName : (item.projectType === 'Otro' ? item.otherProjectType : item.projectType);
      
      const prompt = `Analiza este prospecto/lead para Joseph Espinoza (WebDesignJE):
- Cliente: ${clientName}
- Empresa: ${item.companyName || 'No especificada'}
- Tipo de proyecto: ${proj || 'Desarrollo Web / IA'}
- Presupuesto estimado: ${item.budget || 'A definir'}
- Problema principal: ${item.mainProblem || 'No especificado'}
- Desafíos/Dolores: ${item.painPoints?.join(', ') || 'No especificados'}
- Funcionalidades deseadas: ${item.selectedFeatures?.join(', ') || 'No especificadas'}
- Plazo: ${item.deadline || item.timeline || 'Flexible'}

Por favor genera en texto conciso y profesional:
1. 🎯 Diagnóstico & Score del Lead (Alto/Medio/Bajo valor).
2. 💡 Arquitectura recomendada (Stack sugerido y alcance).
3. 💬 Pitch de Cierre para WhatsApp/Email (Un mensaje directo, empático y persuasivo listo para enviarle).`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(data.content || data.message || 'No se pudo generar el análisis.');
      } else {
        setAiAnalysis('Error al conectar con el asistente de IA.');
      }
    } catch (err) {
      console.error('Error generating AI analysis:', err);
      setAiAnalysis('Error al procesar el análisis.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const getSmartWhatsAppUrl = (item: LeadData) => {
    const name = activeTab === 'leads' ? (item.fullName || 'estimad@') : (item.clientName || 'estimad@');
    const proj = activeTab === 'projects' ? item.projectName : (item.projectType === 'Otro' ? item.otherProjectType : item.projectType) || 'tu proyecto digital';
    const problem = item.mainProblem ? ` el desafío que mencionaste sobre "${item.mainProblem.slice(0, 80)}..."` : 'tu requerimiento';
    const phone = item.phone || item.clientPhone || '';
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    const text = `Hola ${name}, te saluda Joseph Espinoza de WebDesignJE. Estuve revisando los detalles de ${proj} y ${problem}. Tengo lista una propuesta técnica de solución. ¿Tienes 5 minutos para coordinar una breve llamada?`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  useEffect(() => {
    let unsubLeads: (() => void) | null = null;
    let unsubProjects: (() => void) | null = null;

    const unsubAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('/loginadmin');
        return;
      }
      const allowed = await isAdminUser(user);
      if (!allowed) {
        await signOut(auth);
        router.push('/loginadmin');
        return;
      }

      const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      unsubLeads = onSnapshot(qLeads, (snapshot) => {
        setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadData)));
      });

      const qProjects = query(collection(db, 'project_inquiries'), orderBy('createdAt', 'desc'));
      unsubProjects = onSnapshot(qProjects, (snapshot) => {
        setProjectInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadData)));
        setLoading(false);
      });
    });

    return () => {
      unsubAuth();
      unsubLeads?.();
      unsubProjects?.();
    };
  }, [router]);

  const activeData = activeTab === 'leads' ? leads : projectInquiries;

  const filteredData = activeData.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = (activeTab === 'leads' ? item.fullName : item.clientName) || '';
    const email = (activeTab === 'leads' ? item.email : item.clientEmail) || '';
    const company = item.companyName || '';
    const project = activeTab === 'projects' ? item.projectName || '' : item.projectType || '';
    return name.toLowerCase().includes(q) || email.toLowerCase().includes(q) || company.toLowerCase().includes(q) || project.toLowerCase().includes(q);
  });

  const getColumns = (data: LeadData[]) =>
    STATUSES.map(status => ({
      status,
      items: data.filter(d => (d.status || 'Nuevo') === status),
    }));

  const columns = getColumns(filteredData);
  const totalLeads = activeData.length;
  const convertedLeads = activeData.filter(d => d.status === 'Convertido').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const newLeads = activeData.filter(d => d.status === 'Nuevo').length;
  const inContact = activeData.filter(d => d.status === 'En Contacto').length;

  const totalProjection = leads
    .filter(l => l.status !== 'Archivado')
    .reduce((acc, l) => {
      const b = l.budget || '';
      if (b.includes('$1,000')) return acc + 1000;
      if (b.includes('5,000')) return acc + 5000;
      if (b.includes('15,000')) return acc + 15000;
      if (b.includes('50,000')) return acc + 50000;
      return acc;
    }, 0);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const col = activeTab === 'leads' ? 'leads' : 'project_inquiries';
    try {
      await updateDoc(doc(db, col, id), { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const col = activeTab === 'leads' ? 'leads' : 'project_inquiries';
    try {
      await deleteDoc(doc(db, col, deleteTarget.id));
      if (selectedItem?.id === deleteTarget.id) setSelectedItem(null);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/loginadmin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#C69320] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-mono">Cargando pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a0e] text-slate-300">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C69320]/[0.04] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FBE18D]/[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1640px] mx-auto p-4 md:p-6 space-y-5">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0B0F1A]/80 border border-white/[0.06] p-5 rounded-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C69320] to-[#FBE18D] flex items-center justify-center shadow-lg shadow-[#C69320]/25">
              <LayoutDashboard className="text-[#0a0a0a]" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Pipeline de Ventas</h1>
              <p className="text-[11px] text-slate-500 font-mono">{activeTab === 'leads' ? 'Leads entrantes' : 'Proyectos Premium'} &middot; {activeData.length} registros</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cliente, email, proyecto..."
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 placeholder-slate-600 outline-none focus:border-[#C69320]/40 transition-colors"
              />
            </div>
            <button onClick={handleLogout} className="px-3 py-2 bg-red-500/5 hover:bg-red-500/10 text-red-400/80 hover:text-red-400 border border-red-500/10 rounded-xl transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <LogOut size={13} /> Salir
            </button>
          </div>
        </div>

        {/* ===== KPI ROW ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <KPICard label="Total Leads" value={totalLeads} icon={Users} color="from-slate-400 to-slate-600" />
          <KPICard label="Nuevos" value={newLeads} icon={Inbox} color="from-blue-400 to-blue-600" />
          <KPICard label="En Contacto" value={inContact} icon={MessageSquare} color="from-amber-400 to-yellow-500" />
          <KPICard label="Convertidos" value={convertedLeads} icon={CheckCircle2} color="from-emerald-400 to-green-500" />
          <KPICard label="Conversion" value={`${conversionRate}%`} icon={TrendingUp} color="from-purple-400 to-purple-600" />
          <KPICard label="Proyecci\u00f3n" value={`$${(totalProjection / 1000).toFixed(1)}K`} icon={DollarSign} color="from-[#C69320] to-[#FBE18D]" />
        </div>

        {/* ===== TABS ===== */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1 p-1 bg-[#0B0F1A]/80 border border-white/[0.06] rounded-xl">
            {([
              { key: 'leads' as const, label: 'Leads', icon: Inbox },
              { key: 'projects' as const, label: 'Premium', icon: Star },
            ]).map(tab => (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSelectedItem(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black shadow-lg shadow-[#C69320]/25'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 ml-auto">
            {STATUSES.map(s => (
              <div key={s} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${STATUS_META[s].bg}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${STATUS_META[s].dot}`} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s}</span>
                <span className="text-xs font-bold text-white/80">{columns.find(c => c.status === s)?.items.length || 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== KANBAN BOARD ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map(col => {
            const meta = STATUS_META[col.status as Status];
            return (
              <div key={col.status}
                onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                onDrop={async (e) => { e.preventDefault(); if (draggedId) { await handleStatusChange(draggedId, col.status); setDraggedId(null); } }}
                className={`rounded-2xl border ${meta.bg} bg-[#0B0F1A]/40 backdrop-blur-sm flex flex-col min-h-[500px]`}
              >
                <div className="sticky top-0 z-10 p-4 border-b border-white/[0.06] backdrop-blur-xl bg-inherit rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
                    <span className="text-sm font-bold text-white/90">{col.status}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{meta.label}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${meta.color} text-white shadow-lg`}>
                    {col.items.length}
                  </span>
                </div>

                <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[clamp(400px,60vh,700px)] custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {col.items.map(item => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}>
                        <div
                          draggable
                          onDragStart={(e) => { setDraggedId(item.id); e.dataTransfer.effectAllowed = 'move'; }}
                          onClick={() => setSelectedItem(item)}
                          className="group bg-[#0F1525]/90 border border-white/[0.06] hover:border-[#C69320]/30 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-[#C69320]/5 active:scale-[0.98]"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-bold text-white truncate">
                                {activeTab === 'leads' ? (item.fullName || item.clientName) : (item.clientName || item.fullName) || 'Sin nombre'}
                              </h3>
                              {item.companyName && (
                                <p className="text-[10px] text-[#C69320]/80 font-semibold uppercase tracking-wider truncate flex items-center gap-1 mt-0.5">
                                  <Building2 size={10} /> {item.companyName}
                                </p>
                              )}
                            </div>
                            <span className="text-[9px] text-slate-600 font-mono shrink-0 mt-0.5">
                              {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('es', { day: 'numeric', month: 'short' }) : ''}
                            </span>
                          </div>

                          <div className="space-y-1 mb-2.5">
                            {(activeTab === 'leads' ? item.email : item.clientEmail) && (
                              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                                <Mail size={10} className="shrink-0 text-slate-600" /> {activeTab === 'leads' ? item.email : item.clientEmail}
                              </p>
                            )}
                            {(activeTab === 'leads' ? item.phone : item.clientPhone) && (
                              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                                <Phone size={10} className="shrink-0 text-slate-600" /> {activeTab === 'leads' ? item.phone : item.clientPhone}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {(activeTab === 'projects' ? item.projectName : item.projectType) && (
                              <span className="px-2 py-0.5 bg-[#C69320]/10 text-[#FBE18D]/90 rounded-md text-[9px] font-bold uppercase tracking-wider border border-[#C69320]/20">
                                {activeTab === 'projects' ? item.projectName : (item.projectType === 'Otro' ? item.otherProjectType : item.projectType)}
                              </span>
                            )}
                            {item.budget && (
                              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md text-[9px] font-bold border border-emerald-500/20">
                                {item.budget}
                              </span>
                            )}
                          </div>

                          {(item.mainProblem || item.requirements) && (
                            <p className="text-[10px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                              {(item.mainProblem || item.requirements || '').substring(0, 120)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {col.items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-700">
                      <Inbox size={28} className="mb-2 opacity-40" />
                      <p className="text-xs font-mono">Sin registros</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== DETAIL SLIDE-OVER ===== */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-lg bg-[#0B0F1A] border-l border-white/[0.06] shadow-2xl overflow-y-auto custom-scrollbar"
            >
              <div className="sticky top-0 z-10 bg-[#0B0F1A]/90 backdrop-blur-xl border-b border-white/[0.06] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${STATUS_META[(selectedItem.status || 'Nuevo') as Status]?.dot || 'bg-slate-400'}`} />
                  <h2 className="text-base font-bold text-white">
                    {activeTab === 'leads' ? (selectedItem.fullName || selectedItem.clientName) : (selectedItem.clientName || selectedItem.fullName)}
                  </h2>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Status changer */}
                <div className="flex gap-2">
                  {STATUSES.map(s => {
                    const isActive = (selectedItem.status || 'Nuevo') === s;
                    return (
                      <button key={s} onClick={() => handleStatusChange(selectedItem.id, s)}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                          isActive ? `bg-gradient-to-r ${STATUS_META[s].color} text-white border-transparent shadow-lg` : 'border-white/10 text-slate-500 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Contact section */}
                <Section title="Datos de Contacto">
                  {(activeTab === 'leads' ? selectedItem.email : selectedItem.clientEmail) &&
                    <Row icon={Mail} label="Email" value={activeTab === 'leads' ? selectedItem.email : selectedItem.clientEmail} />}
                  {(activeTab === 'leads' ? selectedItem.phone : selectedItem.clientPhone) &&
                    <Row icon={Phone} label="Tel\u00e9fono" value={activeTab === 'leads' ? selectedItem.phone : selectedItem.clientPhone} />}
                  {selectedItem.companyName && <Row icon={Building2} label="Empresa" value={selectedItem.companyName} />}
                  {selectedItem.preferredContact && <Row icon={MessageSquare} label="Contacto Preferido" value={selectedItem.preferredContact} />}
                  {selectedItem.currentWebsite && <Row icon={Globe} label="Sitio Actual" value={selectedItem.currentWebsite} />}
                </Section>

                {/* Project section */}
                <Section title="Proyecto & Presupuesto">
                  {(activeTab === 'projects' ? selectedItem.projectName : selectedItem.projectType) &&
                    <Row icon={Target} label="Tipo de Proyecto" value={activeTab === 'projects' ? selectedItem.projectName : (selectedItem.projectType === 'Otro' ? selectedItem.otherProjectType : selectedItem.projectType)} />}
                  {selectedItem.budget && <Row icon={DollarSign} label="Presupuesto" value={selectedItem.budget} />}
                  {selectedItem.timeline && <Row icon={Calendar} label="Horizonte" value={selectedItem.timeline} />}
                  {selectedItem.deadline && <Row icon={Clock} label="Plazo" value={selectedItem.deadline} />}
                  {selectedItem.source && <Row icon={Globe} label="Origen" value={selectedItem.source} />}
                </Section>

                {/* Business profile (from new modal) */}
                {selectedItem.businessProfile && Object.keys(selectedItem.businessProfile).length > 0 && (
                  <Section title="Perfil del Negocio">
                    {Object.entries(selectedItem.businessProfile).map(([k, v]) => (
                      <Row key={k} icon={Building2} label={k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} value={String(v)} />
                    ))}
                  </Section>
                )}

                {/* Dynamic answers (from old modal) */}
                {selectedItem.dynamicAnswers && Object.keys(selectedItem.dynamicAnswers).length > 0 && (
                  <Section title="Respuestas Espec\u00edficas">
                    {Object.entries(selectedItem.dynamicAnswers).map(([k, v]) => (
                      <Row key={k} icon={Lightbulb} label={k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} value={String(v)} />
                    ))}
                  </Section>
                )}

                {/* Pain Points */}
                {Array.isArray(selectedItem.painPoints) && selectedItem.painPoints.length > 0 && (
                  <Section title="Desaf\u00edos a Resolver">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.painPoints.map((p, i) => (
                        <span key={i} className="px-2.5 py-1 bg-amber-500/10 text-amber-300 rounded-lg text-[11px] font-medium border border-amber-500/20">{p}</span>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Main Problem */}
                {selectedItem.mainProblem && (
                  <Section title="Problema Principal">
                    <p className="text-sm text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">{selectedItem.mainProblem}</p>
                  </Section>
                )}

                {/* Requirements / Goals */}
                {selectedItem.requirements && (
                  <Section title="Requerimientos">
                    <p className="text-sm text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">{selectedItem.requirements}</p>
                  </Section>
                )}
                {selectedItem.goals && (
                  <Section title="Visi\u00f3n de \u00c9xito">
                    <p className="text-sm text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">{selectedItem.goals}</p>
                  </Section>
                )}

                {/* Objectives */}
                {Array.isArray(selectedItem.mainObjectives) && selectedItem.mainObjectives.length > 0 && (
                  <Section title="Objetivos">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.mainObjectives.map((obj, i) => (
                        <span key={i} className="px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-[11px] font-medium border border-blue-500/20">{obj}</span>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Features */}
                {(Array.isArray(selectedItem.keyFeatures) && selectedItem.keyFeatures.length > 0) && (
                  <Section title="Caracter\u00edsticas de Inter\u00e9s">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.keyFeatures.map((f, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#C69320]/10 text-[#FBE18D] rounded-lg text-[11px] font-medium border border-[#C69320]/20">{f}</span>
                      ))}
                    </div>
                  </Section>
                )}
                {Array.isArray(selectedItem.selectedFeatures) && selectedItem.selectedFeatures.length > 0 && (
                  <Section title="Funcionalidades Seleccionadas">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.selectedFeatures.map((f, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#C69320]/10 text-[#FBE18D] rounded-lg text-[11px] font-medium border border-[#C69320]/20">{f}</span>
                      ))}
                    </div>
                  </Section>
                )}

                {/* References */}
                {selectedItem.references && (
                  <Section title="Referencias / Inspiraci\u00f3n">
                    <p className="text-sm text-slate-400 italic leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">&ldquo;{selectedItem.references}&rdquo;</p>
                  </Section>
                )}

                {/* AI Sales Copilot Section */}
                <Section title="Copilot de Ventas & Diagnóstico IA">
                  <div className="bg-[#121826] border border-[#C69320]/30 rounded-xl p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FBE18D] flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#C69320]" /> Análisis & Pitch Estratégico
                      </span>
                      <button
                        onClick={() => handleGenerateAiAnalysis(selectedItem)}
                        disabled={isGeneratingAi}
                        className="px-2.5 py-1 bg-[#C69320]/20 hover:bg-[#C69320]/30 text-[#FBE18D] border border-[#C69320]/40 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all disabled:opacity-50"
                      >
                        {isGeneratingAi ? <RefreshCw size={11} className="animate-spin" /> : <Sparkles size={11} />}
                        {aiAnalysis ? 'Regenerar' : 'Generar Análisis'}
                      </button>
                    </div>

                    {isGeneratingAi && (
                      <div className="py-4 text-center">
                        <div className="w-5 h-5 border-2 border-[#C69320] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-[11px] text-slate-400">Analizando requerimientos y redactando propuesta...</p>
                      </div>
                    )}

                    {aiAnalysis && !isGeneratingAi && (
                      <div className="space-y-2">
                        <div className="bg-black/40 border border-white/5 p-3 rounded-lg text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans max-h-60 overflow-y-auto">
                          {aiAnalysis}
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(aiAnalysis);
                            setCopiedPitch(true);
                            setTimeout(() => setCopiedPitch(false), 2000);
                          }}
                          className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors border border-white/5"
                        >
                          <Copy size={12} /> {copiedPitch ? '¡Copiado al portapapeles!' : 'Copiar propuesta'}
                        </button>
                      </div>
                    )}

                    {!aiAnalysis && !isGeneratingAi && (
                      <p className="text-[11px] text-slate-400">
                        Haz clic en &quot;Generar Análisis&quot; para obtener un diagnóstico del lead, stack recomendado y mensaje de cierre personalizado para WhatsApp.
                      </p>
                    )}
                  </div>
                </Section>

                {/* Extra details */}
                {selectedItem.extraDetails && (
                  <Section title="Detalles Extra">
                    <p className="text-sm text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">{selectedItem.extraDetails}</p>
                  </Section>
                )}

                {/* Timestamp */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-600">
                  <span>Registro creado</span>
                  <span>{selectedItem.createdAt?.toDate ? selectedItem.createdAt.toDate().toLocaleString('es') : 'Desconocido'}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => { setDeleteTarget(selectedItem); }}
                    className="flex-1 py-2.5 bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 rounded-xl transition-colors text-xs font-bold flex items-center justify-center gap-2">
                    <Trash2 size={14} /> Eliminar
                  </button>
                  <a href={getSmartWhatsAppUrl(selectedItem)}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C69320]/25 transition-all">
                    <Send size={14} /> WhatsApp Personalizado
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== DELETE MODAL ===== */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteTarget(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0F1A] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_50px_rgba(239,68,68,0.1)]">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-2">Eliminar registro</h3>
              <p className="text-sm text-slate-400 text-center mb-1">
                {activeTab === 'leads' ? (deleteTarget.fullName || deleteTarget.clientName) : (deleteTarget.clientName || deleteTarget.fullName)}
              </p>
              <p className="text-xs text-slate-500 text-center mb-6">Esta acci\u00f3n no se puede deshacer.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-colors text-sm font-medium">Cancelar</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-colors text-sm font-bold flex items-center justify-center gap-2">
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function KPICard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: LucideIcon; color: string }) {
  return (
    <div className="bg-[#0B0F1A]/60 border border-white/[0.06] rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        <Icon size={14} className={`text-transparent bg-clip-text bg-gradient-to-r ${color}`} />
      </div>
      <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
        {value}
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-4 h-px bg-white/10" />
        {title}
      </h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 bg-black/20 p-2.5 rounded-xl border border-white/[0.04]">
      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <Icon size={13} className="text-slate-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] text-slate-600 uppercase tracking-wider font-bold">{label}</p>
        <p className="text-sm text-slate-200 truncate">{value}</p>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
