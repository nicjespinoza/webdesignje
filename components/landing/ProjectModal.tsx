'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  X, Send, CheckCircle2, Check, ChevronLeft, ChevronRight,
  User, Mail, Phone, Building2, DollarSign,
  Lightbulb, AlertCircle, Clock, Sparkles, Loader2
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Language, Project } from '@/components/landing/types';
import { PROJECT_FORM_CONFIGS, ProjectFormConfig } from '@/lib/projectFormConfig';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  lang: Language;
}

interface FormData {
  name: string; email: string; phone: string; clinicName: string;
  profile: Record<string, string>;
  needs: string[]; history: string[]; agenda: string[]; reports: string[]; integrations: string[];
  [key: string]: string | string[] | Record<string, string>;
}

const STEPS_BASE = [
  { id: 'contact', label: 'Contacto', icon: User },
  { id: 'profile', label: 'Perfil', icon: Building2 },
  { id: 'needs', label: 'Necesidades', icon: Sparkles },
];

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project, lang }) => {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const prevOpen = useRef(isOpen);

  const config: ProjectFormConfig | null = project ? PROJECT_FORM_CONFIGS[project.id] || null : null;

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', clinicName: '',
    profile: {}, needs: [], history: [], agenda: [], reports: [], integrations: [],
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !prevOpen.current) {
      setTimeout(() => {
        setStep(0);
        setStatus('idle');
        setErrors({});
        setFormData({
          name: '', email: '', phone: '', clinicName: '',
          profile: {}, needs: [], history: [], agenda: [], reports: [], integrations: [],
        });
      }, 0);
      prevOpen.current = isOpen;
    }
    prevOpen.current = isOpen;
  }, [isOpen, project]);

  if (!isOpen || !project || !mounted || !config) return null;

  // Build dynamic steps based on config sections
  const allSteps = [
    { id: 'contact', label: 'Contacto', icon: User },
    ...config.sections.map((s, i) => ({
      id: s.field,
      label: s.title.split(' ')[0],
      icon: i === 0 ? Building2 : s.field === 'reports' ? Sparkles : Lightbulb,
    })),
    { id: 'budget', label: 'Presupuesto', icon: DollarSign },
    { id: 'review', label: 'Resumen', icon: CheckCircle2 },
  ];

  const currentStepIndex = step;

  const updateField = (field: string, value: string | string[] | Record<string, string>) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, id: string) => {
    setFormData(prev => {
      const arr = (prev[field] as string[]) || [];
      return { ...prev, [field]: arr.includes(id) ? arr.filter(i => i !== id) : [...arr, id] };
    });
  };

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!formData.name.trim()) e.name = 'Nombre requerido';
      if (!formData.email.trim()) e.email = 'Email requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email inválido';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep(s => Math.min(s + 1, allSteps.length - 1));
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  const buildScopeDocument = (): string => {
    let doc = `# Documento de Alcance — ${project?.title}\n\n`;
    doc += `## Contacto\n- ${formData.name} | ${formData.email} | ${formData.phone || '—'} | ${formData.clinicName || '—'}\n\n`;

    config.sections.forEach(section => {
      doc += `## ${section.title}\n`;
      if (section.type === 'pills') {
        section.options.forEach(opt => {
          const val = formData.profile[opt.id];
          if (val) doc += `- **${opt.label}:** ${val}\n`;
        });
      } else {
        const arr = (formData[section.field] as string[]) || [];
        if (arr.length > 0) {
          arr.forEach(id => {
            const label = section.options.find(o => o.id === id)?.label || id;
            doc += `- [x] ${label}\n`;
          });
        } else {
          doc += `- No especificados\n`;
        }
      }
      doc += '\n';
    });

    doc += `## Presupuesto\n- Rango: ${formData.budget || 'A definir'}\n- Timeline: ${formData.timeline || 'Flexible'}\n`;
    if (formData.additionalNotes) doc += `\n## Notas\n${formData.additionalNotes}\n`;
    return doc;
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    try {
      const scopeDoc = buildScopeDocument();

      await addDoc(collection(db, 'project_inquiries'), {
        category: config.sections[0]?.title.toLowerCase() || 'general',
        projectName: project?.title || 'Unknown',
        projectId: project?.id || '0',
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        companyName: formData.clinicName,
        profile: formData.profile,
        needs: formData.needs,
        history: formData.history,
        agenda: formData.agenda,
        reports: formData.reports,
        integrations: formData.integrations,
        budget: formData.budget,
        timeline: formData.timeline,
        additionalNotes: formData.additionalNotes,
        scopeDocument: scopeDoc,
        createdAt: serverTimestamp(),
        status: 'Nuevo',
        source: 'modal_proyecto',
      });

      // Send email
      try {
        await fetch('/api/send-lead-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectName: project?.title || 'Unknown',
            projectId: project?.id || '0',
            clientName: formData.name,
            clientEmail: formData.email,
            clientPhone: formData.phone,
            companyName: formData.clinicName,
            businessProfile: { ...formData.profile, ...Object.fromEntries(config.sections.filter(s => s.type === 'checklist').map(s => [s.title, (formData[s.field] as string[]).join(', ')])) },
            painPoints: formData.needs,
            selectedFeatures: formData.history,
            goals: formData.additionalNotes,
            timeline: formData.timeline,
            budget: formData.budget,
            references: scopeDoc.substring(0, 2000),
          }),
        });
      } catch (emailErr) {
        console.error('Email dispatch error:', emailErr);
      }

      setStatus('success');
    } catch (error) {
      console.error('Error submitting:', error);
      setStatus('idle');
    }
  };

  const renderError = (field: string) => {
    if (!errors[field]) return null;
    return (
      <p className="text-red-400 text-[10px] font-medium mt-1 flex items-center gap-1">
        <AlertCircle size={10} /> {errors[field]}
      </p>
    );
  };

  // ===================== Contact Step =====================
  const renderContactStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-1">Datos de Contacto</h3>
        <p className="text-slate-400 text-xs">Para enviarte una propuesta para <strong className="text-[#FBE18D]">{project?.title}</strong></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.contactFields.map(field => {
          const Icon = field.icon === 'user' ? User : field.icon === 'mail' ? Mail : field.icon === 'phone' ? Phone : Building2;
          return (
            <div key={field.name} className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Icon size={12} className="text-[#C69320]" /> {field.label}
              </label>
              <input
                type={field.icon === 'mail' ? 'email' : field.icon === 'phone' ? 'tel' : 'text'}
                value={(formData[field.name] as string) || ''}
                onChange={e => updateField(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full bg-[#0f172a] border border-white/10 focus:border-[#C69320]/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
              />
              {renderError(field.name)}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ===================== Dynamic Section Step =====================
  const renderSectionStep = (section: typeof config.sections[0]) => (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">{section.title}</h3>
        <p className="text-slate-400 text-xs">
          {section.type === 'pills' ? 'Selecciona la opción que más se ajuste' : 'Selecciona todo lo que necesites'}
        </p>
      </div>

      {section.type === 'pills' ? (
        <div className="space-y-4">
          {section.options.map(opt => (
            <div key={opt.id} className="space-y-2">
              <label className="text-xs font-medium text-slate-300">{opt.label}</label>
              <div className="flex flex-wrap gap-2">
                {opt.items?.map(item => (
                  <button key={item} type="button" onClick={() => updateField('profile', { ...formData.profile, [opt.id]: item })}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                      formData.profile[opt.id] === item ? 'bg-[#C69320]/15 border-[#C69320] text-[#FBE18D]' : 'bg-[#0f172a] border-white/10 text-slate-300 hover:border-[#C69320]/30'
                    }`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {section.options.map(opt => {
            const isSelected = ((formData[section.field] as string[]) || []).includes(opt.id);
            return (
              <button key={opt.id} type="button" onClick={() => toggleArrayItem(section.field, opt.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                  isSelected ? 'bg-[#C69320]/10 border-[#C69320]' : 'bg-[#0f172a] border-white/10 hover:border-[#C69320]/30'
                }`}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#C69320] border-[#C69320]' : 'border-slate-500'
                }`}>
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
                <span className={`text-sm ${isSelected ? 'text-[#FBE18D] font-medium' : 'text-slate-300'}`}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  // ===================== Budget Step =====================
  const renderBudgetStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">Presupuesto y Cronograma</h3>
        <p className="text-slate-400 text-xs">Para darte una propuesta alineada a tu inversión</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <DollarSign size={12} className="text-[#C69320]" /> Presupuesto Estimado
          </label>
          <div className="flex flex-wrap gap-2">
            {config.budgetOptions.map(b => (
              <button key={b} type="button" onClick={() => updateField('budget', b)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  formData.budget === b ? 'bg-[#C69320]/15 border-[#C69320] text-[#FBE18D]' : 'bg-[#0f172a] border-white/10 text-slate-300 hover:border-[#C69320]/30'
                }`}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Clock size={12} className="text-[#C69320]" /> ¿Para cuándo lo necesitas?
          </label>
          <div className="flex flex-wrap gap-2">
            {config.timelineOptions.map(t => (
              <button key={t} type="button" onClick={() => updateField('timeline', t)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  formData.timeline === t ? 'bg-[#C69320]/15 border-[#C69320] text-[#FBE18D]' : 'bg-[#0f172a] border-white/10 text-slate-300 hover:border-[#C69320]/30'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Lightbulb size={12} className="text-[#C69320]" /> Notas Adicionales
          </label>
          <textarea value={String(formData.additionalNotes || '')} onChange={e => updateField('additionalNotes', e.target.value)}
            rows={4} placeholder="Cuéntanos más sobre tu proyecto..."
            className="w-full bg-[#0f172a] border border-white/10 focus:border-[#C69320]/50 rounded-lg px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm" />
        </div>
      </div>
    </div>
  );

  // ===================== Review Step =====================
  const renderReviewStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">Resumen</h3>
        <p className="text-slate-400 text-xs">Revisa antes de enviar</p>
      </div>
      <div className="bg-[#0f172a] border border-white/10 rounded-xl divide-y divide-white/5">
        <div className="p-4">
          <span className="text-[10px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Contacto</span>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <span>Nombre: <span className="text-white font-medium">{formData.name}</span></span>
            <span>Email: <span className="text-white font-medium">{formData.email}</span></span>
            <span>Tel: <span className="text-white font-medium">{formData.phone || '—'}</span></span>
            <span>Empresa: <span className="text-white font-medium">{formData.clinicName || '—'}</span></span>
          </div>
        </div>
        {config.sections.map(section => (
          <div key={section.field} className="p-4">
            <span className="text-[10px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{section.title}</span>
            {section.type === 'pills' ? (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                {section.options.map(opt => formData.profile[opt.id] ? (
                  <span key={opt.id}>{opt.label}: <span className="text-white font-medium">{String(formData.profile[opt.id])}</span></span>
                ) : null)}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {((formData[section.field] as string[]) || []).map(id => {
                  const label = section.options.find(o => o.id === id)?.label || id;
                  return <span key={id} className="px-2.5 py-1 bg-[#C69320]/10 text-[#FBE18D] rounded-lg text-[10px] font-medium border border-[#C69320]/20">{label}</span>;
                })}
              </div>
            )}
          </div>
        ))}
        {(formData.budget || formData.timeline) && (
          <div className="p-4">
            <span className="text-[10px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Presupuesto</span>
            <div className="flex gap-4 text-xs text-slate-300">
              {formData.budget ? <span>Rango: <span className="text-white font-medium">{String(formData.budget)}</span></span> : null}
              {formData.timeline ? <span>Timeline: <span className="text-white font-medium">{String(formData.timeline)}</span></span> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ===================== Success =====================
  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center space-y-5 py-8">
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
        <CheckCircle2 size={32} className="text-green-400" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Solicitud Enviada</h3>
        <p className="text-xs text-slate-400 max-w-md">
          Hemos recibido tu información para <strong className="text-[#FBE18D]">{project?.title}</strong>. Nuestro equipo te contactará en menos de 24 horas.
        </p>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={onClose} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors border border-white/10 text-xs">Cerrar</button>
        <a href="https://wa.me/50580610651?text=Hola%20Joseph,%20he%20enviado%20mi%20solicitud%20de%20proyecto" target="_blank" rel="noopener noreferrer"
          className="px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs">
          Contactar por WhatsApp
        </a>
      </div>
    </motion.div>
  );

  // ===================== Step Router =====================
  const renderStepContent = () => {
    if (step === 0) return renderContactStep();
    if (step > 0 && step <= config.sections.length) return renderSectionStep(config.sections[step - 1]);
    if (step === config.sections.length + 1) return renderBudgetStep();
    if (step === config.sections.length + 2) return renderReviewStep();
    return null;
  };

  const modalContent = (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0B0F19] border border-[#C69320]/30 rounded-2xl shadow-[0_0_50px_rgba(198,147,32,0.15)] overflow-hidden flex flex-col max-h-[90vh]">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#C69320]/20 to-transparent p-5 border-b border-[#C69320]/20 flex justify-between items-start shrink-0">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C69320]/10 text-[#FBE18D] text-[10px] uppercase font-bold tracking-widest mb-2 border border-[#C69320]/20">
                <Sparkles size={12} /> {config.emoji} {config.subtitle}
              </div>
              <h2 className="text-xl font-bold text-white truncate pr-2">{project?.title}</h2>
              <p className="text-slate-400 text-[11px] mt-0.5">Completa el formulario para recibir una propuesta personalizada</p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors shrink-0" aria-label="Cerrar">
              <X size={18} />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="px-5 pt-4 shrink-0">
            <div className="flex items-center gap-1">
              {allSteps.map((s, i) => {
                const isActive = i === currentStepIndex;
                const isDone = i < currentStepIndex || status === 'success';
                return (
                  <div key={s.id} className="flex-1 flex items-center gap-1">
                    <div className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all ${
                      isActive ? 'bg-[#C69320]/10 text-[#FBE18D]' : isDone ? 'text-green-400' : 'text-slate-600'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                        isDone ? 'bg-green-500/20 border-green-500 text-green-400' :
                        isActive ? 'bg-[#C69320]/20 border-[#C69320]' : 'border-slate-600 bg-slate-800'
                      }`}>
                        {isDone ? <Check size={12} /> : i + 1}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:inline ${
                        isActive ? 'text-[#FBE18D]' : isDone ? 'text-green-400' : 'text-slate-600'
                      }`}>{s.label}</span>
                    </div>
                    {i < allSteps.length - 1 && (
                      <div className={`flex-1 h-px mx-1 transition-colors ${i < currentStepIndex ? 'bg-green-500/50' : 'bg-slate-700'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
            {status === 'success' ? renderSuccess() : (
              <>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div key={step} custom={direction} variants={stepVariants}
                    initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between shrink-0">
                  <div>
                    {step > 0 && (
                      <button type="button" onClick={goBack}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl transition-colors text-xs">
                        <ChevronLeft size={14} /> Anterior
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={onClose}
                      className="px-4 py-2.5 bg-transparent text-slate-400 hover:text-white font-medium rounded-xl transition-colors text-xs">
                      Cancelar
                    </button>
                    {step < allSteps.length - 1 ? (
                      <button type="button" onClick={goNext}
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs">
                        Siguiente <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button type="button" disabled={status === 'submitting'} onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all disabled:opacity-70 text-xs">
                        {status === 'submitting' ? <><Loader2 size={14} className="animate-spin" /> Enviando...</> : <><Send size={14} /> Enviar</>}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
