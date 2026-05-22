'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2, Sparkles, CheckCircle2, Check, ChevronLeft, ChevronRight, User, Mail, Phone, Building2, Target, Calendar, DollarSign, Lightbulb, AlertCircle, Clock } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface DynamicQuestion {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

interface PainPoint {
  label: string;
  value: string;
  benefit: string;
}

import { Project } from '@/components/landing/types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const PROJECT_SPECIFIC_QUESTIONS: Record<string, DynamicQuestion[]> = {
  '1': [
    { label: 'Especialidad Médica', name: 'specialty', type: 'text', placeholder: 'Pediatría, Cardiología, Medicina General...' },
    { label: 'Pacientes por Día', name: 'dailyPatients', type: 'select', options: ['Menos de 10', '10-30', '31-60', 'Más de 60'] },
    { label: 'Sistema Actual', name: 'currentSystem', type: 'text', placeholder: '¿Usas papel, Excel o algún software?' },
    { label: 'Ubicación / País', name: 'location', type: 'text', placeholder: 'País o ciudad donde operas' },
  ],
  '2': [
    { label: 'Tipo de Retail', name: 'storeType', type: 'text', placeholder: 'Ropa, Calzado, Electrónica, Abarrotes...' },
    { label: 'Cantidad de Sucursales', name: 'branches', type: 'select', options: ['1 (Única)', '2-5', '6-10', '+10'] },
    { label: 'Ventas Mensuales Estimadas', name: 'revenue', type: 'select', options: ['- $5,000/mes', '$5,000 - $20,000', '$20,000 - $50,000', '+ $50,000'] },
    { label: 'Inventario Aproximado (SKUs)', name: 'skuCount', type: 'select', options: ['Menos de 100', '100-500', '501-2000', '+2000'] },
  ],
  '3': [
    { label: 'Tipo de Alojamiento', name: 'hotelType', type: 'select', options: ['Hotel Boutique', 'Resort', 'Hostal', 'Cadena Hotelera'] },
    { label: 'Número de Habitaciones', name: 'rooms', type: 'select', options: ['1-20', '21-50', '51-100', '+100'] },
    { label: 'Ocupación Promedio Actual', name: 'occupancy', type: 'select', options: ['- 30%', '30-50%', '51-70%', '+70%'] },
    { label: '¿Tienes equipo de recepción?', name: 'hasStaff', type: 'select', options: ['Sí, completo', 'Sí, mínimo', 'No, soy independiente'] },
  ],
  '4': [
    { label: 'Nicho de Mercado', name: 'niche', type: 'text', placeholder: 'Joyería, Ropa de diseñador, Muebles...' },
    { label: 'Canal de Ventas Principal', name: 'channel', type: 'select', options: ['Instagram / Redes Sociales', 'MercadoLibre / Amazon', 'Tienda física', 'Ninguno aún'] },
    { label: 'Ingresos Mensuales Actuales', name: 'income', type: 'select', options: ['Aún no vendo', '- $1,000', '$1,000 - $10,000', '+ $10,000'] },
    { label: '¿Ya has tenido tienda online?', name: 'previousEcom', type: 'select', options: ['Nunca', 'Sí, pero no funcionó', 'Sí, activa actualmente'] },
  ],
  '5': [
    { label: 'Tipo de Negocio', name: 'beautyType', type: 'select', options: ['Salón de Belleza', 'Spa', 'Barbería', 'Clínica Estética'] },
    { label: 'Especialistas / Staff', name: 'staff', type: 'select', options: ['1 (Independiente)', '2-5', '6-15', '+15'] },
    { label: 'Clientes por Semana', name: 'weeklyClients', type: 'select', options: ['- 20', '20-50', '51-100', '+100'] },
    { label: 'Manejas Citas de Forma', name: 'bookingMethod', type: 'select', options: ['Manual (agenda física)', 'WhatsApp / Llamadas', 'Google Calendar', 'Software básico'] },
  ],
  '6': [
    { label: 'Tipo de Institución', name: 'schoolType', type: 'select', options: ['Colegio / Escuela', 'Universidad', 'Instituto Técnico', 'Academia Online'] },
    { label: 'Total de Estudiantes', name: 'students', type: 'select', options: ['1-100', '101-500', '501-2000', '+2000'] },
    { label: 'Nivel Educativo Principal', name: 'level', type: 'select', options: ['Primaria / Secundaria', 'Pregrado', 'Posgrado', 'Mixto'] },
    { label: 'Tasa de Deserción Anual', name: 'dropoutRate', type: 'select', options: ['- 5%', '5-10%', '10-20%', '+20%', 'No lo sé'] },
  ],
};

const PAIN_POINTS: Record<string, PainPoint[]> = {
  '1': [
    { label: 'Exceso de papeleo administrativo', value: 'paperwork', benefit: 'Reducción de papeleo' },
    { label: 'Pérdida o desorden de historiales', value: 'lostRecords', benefit: 'Historiales siempre accesibles' },
    { label: 'Diagnósticos sin apoyo de datos', value: 'noDataDiagnosis', benefit: 'Precisión con IA' },
    { label: 'Procesos lentos con pacientes', value: 'slowProcess', benefit: 'Flujo ágil de pacientes' },
    { label: 'Falta de acceso remoto a datos', value: 'noRemote', benefit: 'Acceso desde cualquier lugar' },
    { label: 'Incumplimiento de normativas', value: 'compliance', benefit: 'Cumplimiento normativo asegurado' },
  ],
  '2': [
    { label: 'Inventario no actualizado en tiempo real', value: 'stockSync', benefit: 'Stock siempre al día' },
    { label: 'Pérdidas por merma o robo hormiga', value: 'shrinkage', benefit: 'Control de pérdidas' },
    { label: 'Falta de reportes financieros claros', value: 'noReports', benefit: 'Reportes financieros automáticos' },
    { label: 'Sucursales desincronizadas entre sí', value: 'branchSync', benefit: 'Sincronización multi-sucursal' },
    { label: 'Procesos de pago lentos', value: 'slowCheckout', benefit: 'Pagos rápidos y seguros' },
    { label: 'Sin control eficiente de proveedores', value: 'suppliers', benefit: 'Gestión integrada de proveedores' },
  ],
  '3': [
    { label: 'Baja tasa de ocupación recurrente', value: 'lowOccupancy', benefit: 'Maximizar ocupación' },
    { label: 'Costos operativos mensuales elevados', value: 'highCosts', benefit: 'Reducir costos operativos' },
    { label: 'Sin portal de huéspedes automatizado', value: 'noGuestPortal', benefit: 'Portal de huéspedes inteligente' },
    { label: 'No tengo P&L en tiempo real', value: 'noPnl', benefit: 'P&L actualizado al instante' },
    { label: 'Procesos de mantenimiento ineficientes', value: 'maintenance', benefit: 'Mantenimiento automatizado' },
    { label: 'Mala integración con OTAs y canales', value: 'otaIntegration', benefit: 'Integración total con OTAs' },
  ],
  '4': [
    { label: 'Alta tasa de carrito abandonado', value: 'cartAbandon', benefit: 'Recuperación de carritos' },
    { label: 'Baja conversión desde móvil', value: 'mobileConversion', benefit: 'Conversión móvil optimizada' },
    { label: 'Marca sin diferenciación digital', value: 'branding', benefit: 'Identidad digital premium' },
    { label: 'Velocidad de carga muy lenta', value: 'speed', benefit: 'Rendimiento ultrarrápido' },
    { label: 'Dificultad para escalar ventas', value: 'scalability', benefit: 'Escalabilidad sin límites' },
    { label: 'Sin automatización de marketing', value: 'marketing', benefit: 'Marketing automatizado con IA' },
  ],
  '5': [
    { label: 'No-shows frecuentes que reducen ingresos', value: 'noShows', benefit: 'Reducción drástica de no-shows' },
    { label: 'Agenda desorganizada y manual', value: 'messySchedule', benefit: 'Agenda inteligente automatizada' },
    { label: 'Clientes que no regresan', value: 'lowRetention', benefit: 'Fidelización con CRM inteligente' },
    { label: 'Especialistas con baja ocupación', value: 'lowOccupancy', benefit: 'Máxima ocupación de agenda' },
    { label: 'Sin recordatorios automáticos', value: 'noReminders', benefit: 'Recordatorios multi-canal' },
    { label: 'Mala gestión de inventario de productos', value: 'inventory', benefit: 'Inventario sincronizado' },
  ],
  '6': [
    { label: 'Deserción estudiantil no detectada a tiempo', value: 'dropout', benefit: 'Detección temprana de deserción' },
    { label: 'Carga administrativa excesiva del personal', value: 'adminLoad', benefit: 'Automatización administrativa' },
    { label: 'Mala comunicación con padres/apoderados', value: 'communication', benefit: 'Comunicación instantánea con padres' },
    { label: 'Falta de personalización del aprendizaje', value: 'noPersonalization', benefit: 'Aprendizaje personalizado con IA' },
    { label: 'Datos académicos con poca seguridad', value: 'dataSecurity', benefit: 'Seguridad de datos de primer nivel' },
    { label: 'Reportes académicos manuales y lentos', value: 'manualReports', benefit: 'Reportes automatizados en vivo' },
  ],
};

const STEPS = [
  { id: 'contact', label: 'Contacto', icon: User },
  { id: 'profile', label: 'Perfil', icon: Building2 },
  { id: 'goals', label: 'Metas', icon: Target },
  { id: 'review', label: 'Revisión', icon: CheckCircle2 },
];

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [dynamicAnswers, setDynamicAnswers] = useState<Record<string, string>>({});
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [goals, setGoals] = useState({ successVision: '', timeline: '', budget: '', references: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(0);
  const prevOpen = useRef(isOpen);

  const projectId = project?.id as string;
  const dynamicQuestions = useMemo(() => PROJECT_SPECIFIC_QUESTIONS[projectId] || [], [projectId]);
  const painPoints = PAIN_POINTS[projectId] || [];
  const features = (project?.features as string[]) || [];

  useEffect(() => {
    if (isOpen && !prevOpen.current) {
      const id = setTimeout(() => {
        setStep(0);
        setStatus('idle');
        setAiResponse(null);
        setErrors({});
        setFormData({ name: '', email: '', phone: '', company: '' });
        setSelectedFeatures([]);
        setSelectedPainPoints([]);
        setGoals({ successVision: '', timeline: '', budget: '', references: '' });
        const initialAnswers: Record<string, string> = {};
        dynamicQuestions.forEach((q) => {
          initialAnswers[q.name] = q.type === 'select' ? (q.options?.[0] || '') : '';
        });
        setDynamicAnswers(initialAnswers);
      }, 0);
      prevOpen.current = isOpen;
      return () => clearTimeout(id);
    }
    prevOpen.current = isOpen;
  }, [isOpen, project, dynamicQuestions]);

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!formData.name.trim()) newErrors.name = 'Campo obligatorio';
      if (!formData.email.trim()) newErrors.email = 'Campo obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Correo inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const togglePainPoint = (value: string) => {
    setSelectedPainPoints((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    setAiResponse(null);

    try {
      const selectedPainLabels = selectedPainPoints.map((v) => {
        const pp = painPoints.find((p) => p.value === v);
        return pp?.label || v;
      });

      await addDoc(collection(db, 'project_inquiries'), {
        projectName: project?.title || 'Unknown Project',
        projectId,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        companyName: formData.company,
        businessProfile: dynamicAnswers,
        painPoints: selectedPainLabels,
        selectedFeatures,
        goals: goals.successVision,
        timeline: goals.timeline,
        budget: goals.budget,
        references: goals.references,
        requirements: goals.successVision,
        createdAt: serverTimestamp(),
        status: 'Nuevo',
        source: 'modal_avanzado',
      });

      const profileDetails = Object.entries(dynamicAnswers)
        .map(([k, v]) => {
          const q = dynamicQuestions.find((dq) => dq.name === k);
          return `${q?.label || k}: ${v}`;
        })
        .join(', ');

      const painText = selectedPainLabels.length > 0
        ? `\nPrincipales desafíos: ${selectedPainLabels.join(', ')}.`
        : '';

      const featureText = selectedFeatures.length > 0
        ? `\nFuncionalidades de interés: ${selectedFeatures.join(', ')}.`
        : '';

      const goalsText = goals.successVision
        ? `\nVisión de éxito: ${goals.successVision}.`
        : '';

      const timelineText = goals.timeline
        ? `\nHorizonte: ${goals.timeline}.`
        : '';

      const budgetText = goals.budget
        ? `\nPresupuesto estimado: ${goals.budget}.`
        : '';

      const aiPrompt = `Soy un cliente interesado en "${project?.title}".

Perfil de negocio:
Empresa: ${formData.company || 'Independiente'}
Contacto: ${formData.name} - ${formData.email}${profileDetails ? '\n' + profileDetails : ''}
${painText}${featureText}${goalsText}${timelineText}${budgetText}

Como experto consultor de WebDesignJE de Joseph Espinoza, redacta un diagnóstico personalizado y persuasivo (máximo 4 párrafos cortos) que:
1. Reconozca los desafíos específicos del cliente
2. Explique cómo la solución puede transformar su negocio
3. Destaque los beneficios clave más relevantes para su caso
4. Incluya un cierre motivador invitando al siguiente paso

Tono: consultoría premium de élite, profesional, persuasivo pero no agresivo.`;

      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: aiPrompt }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAiResponse(data.message);
      } else {
        setAiResponse(
          'Hemos recibido todos los detalles de tu proyecto. Nuestro equipo de consultoría revisará tu perfil y te contactará con una propuesta personalizada en las próximas 24 horas.'
        );
      }

      setStatus('success');
    } catch (error) {
      console.error('Error submitting project inquiry:', error);
      setStatus('idle');
    }
  };

  if (!isOpen || !project) return null;

  const renderStepIndicator = () => (
    <div className="flex items-center gap-1 mb-6 px-1">
      {STEPS.map((s, i) => {
        const isActive = i === step;
        const isDone = i < step || status === 'success';
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
              }`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-1 transition-colors ${
                i < step ? 'bg-green-500/50' : 'bg-slate-700'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderError = (field: string) => {
    if (!errors[field]) return null;
    return (
      <p className="text-red-400 text-[10px] font-medium mt-1 flex items-center gap-1">
        <AlertCircle size={10} /> {errors[field]}
      </p>
    );
  };

  const renderContactStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-1">Tu Información de Contacto</h3>
        <p className="text-slate-400 text-xs">Para enviarte el diagnóstico personalizado y propuesta</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <User size={12} className="text-[#C69320]" /> Nombre Completo *
          </label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej. Juan Pérez"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          {renderError('name')}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mail size={12} className="text-[#C69320]" /> Correo Electrónico *
          </label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="juan@empresa.com"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          {renderError('email')}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Phone size={12} className="text-[#C69320]" /> Teléfono / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+505 0000 0000"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 size={12} className="text-[#C69320]" /> Empresa / Negocio
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Nombre de tu empresa"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">Perfil de tu Negocio</h3>
        <p className="text-slate-400 text-xs">Cuéntanos más sobre tu operación actual</p>
      </div>

      {dynamicQuestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dynamicQuestions.map((q, idx) => (
            <div key={idx} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{q.label}</label>
              {q.type === 'select' ? (
                <select
                  name={q.name}
                  value={dynamicAnswers[q.name] || ''}
                  onChange={(e) => setDynamicAnswers({ ...dynamicAnswers, [e.target.name]: e.target.value })}
                  className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
                >
                  {q.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={q.name}
                  value={dynamicAnswers[q.name] || ''}
                  onChange={(e) => setDynamicAnswers({ ...dynamicAnswers, [e.target.name]: e.target.value })}
                  placeholder={q.placeholder}
                  className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {painPoints.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={14} className="text-[#C69320]" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              ¿Cuáles son tus principales desafíos?
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {painPoints.map((pp) => {
              const isSelected = selectedPainPoints.includes(pp.value);
              return (
                <div
                  key={pp.value}
                  onClick={() => togglePainPoint(pp.value)}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#C69320]/10 border-[#C69320]'
                      : 'bg-[#131B2A] border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-[#C69320] border-[#C69320]' : 'border-slate-500'
                  }`}>
                    {isSelected && <Check size={11} className="text-black" />}
                  </div>
                  <div>
                    <span className="text-xs text-white block leading-tight">{pp.label}</span>
                    <span className="text-[9px] text-[#C69320]/70 mt-0.5 block">{pp.benefit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {features.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[#C69320]" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Funcionalidades que más te interesan
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feature, idx) => {
              const isSelected = selectedFeatures.includes(feature);
              return (
                <div
                  key={idx}
                  onClick={() => toggleFeature(feature)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#C69320]/10 border-[#C69320]'
                      : 'bg-[#131B2A] border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-[#C69320] border-[#C69320]' : 'border-slate-500'
                  }`}>
                    {isSelected && <Check size={11} className="text-black" />}
                  </div>
                  <span className="text-xs text-slate-300">{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderGoalsStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">Metas y Horizonte</h3>
        <p className="text-slate-400 text-xs">Ayúdanos a entender tu visión para ofrecerte la mejor propuesta</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb size={12} className="text-[#C69320]" /> ¿Cómo te imaginas el resultado ideal?
        </label>
        <textarea
          value={goals.successVision}
          onChange={(e) => setGoals({ ...goals, successVision: e.target.value })}
          rows={3}
          placeholder="Describe cómo te gustaría que tu negocio opere con esta solución..."
          className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={12} className="text-[#C69320]" /> ¿Cuándo te gustaría empezar?
          </label>
          <select
            value={goals.timeline}
            onChange={(e) => setGoals({ ...goals, timeline: e.target.value })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">Selecciona una opción</option>
            <option value="Inmediato (esta semana)">Inmediato (esta semana)</option>
            <option value="Este mes">Este mes</option>
            <option value="En 1-3 meses">En 1-3 meses</option>
            <option value="En 3-6 meses">En 3-6 meses</option>
            <option value="Solo estoy explorando">Solo estoy explorando</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign size={12} className="text-[#C69320]" /> Presupuesto Estimado
          </label>
          <select
            value={goals.budget}
            onChange={(e) => setGoals({ ...goals, budget: e.target.value })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">Selecciona un rango</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            <option value="$1,000 - $5,000 USD">$1,000 - $5,000 USD</option>
            <option value="$5,000 - $15,000 USD">$5,000 - $15,000 USD</option>
            <option value="$15,000 - $50,000 USD">$15,000 - $50,000 USD</option>
            <option value="$50,000+ USD">$50,000+ USD</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Clock size={12} className="text-[#C69320]" /> Referencias o Inspiración
        </label>
        <input
          type="text"
          value={goals.references}
          onChange={(e) => setGoals({ ...goals, references: e.target.value })}
          placeholder="¿Hay algún sitio web o plataforma que te guste como referencia? (opcional)"
          className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
        />
      </div>
    </div>
  );

  const renderReviewStep = () => {
    const painLabels = selectedPainPoints.map((v) => {
      const pp = painPoints.find((p) => p.value === v);
      return pp?.label || v;
    });

    return (
      <div className="space-y-5">
        <div className="text-center mb-2">
          <h3 className="text-lg font-bold text-white mb-1">Revisión Final</h3>
          <p className="text-slate-400 text-xs">Verifica que todo esté correcto antes de enviar</p>
        </div>

        <div className="bg-[#131B2A] border border-slate-700 rounded-xl divide-y divide-slate-700/50">
          <div className="p-4">
            <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Contacto</span>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <span>Nombre: <span className="text-white">{formData.name}</span></span>
              <span>Email: <span className="text-white">{formData.email}</span></span>
              <span>Teléfono: <span className="text-white">{formData.phone || '—'}</span></span>
              <span>Empresa: <span className="text-white">{formData.company || '—'}</span></span>
            </div>
          </div>

          {dynamicQuestions.length > 0 && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Perfil del Negocio</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                {dynamicQuestions.map((q) => (
                  <span key={q.name}>{q.label}: <span className="text-white">{dynamicAnswers[q.name] || '—'}</span></span>
                ))}
              </div>
            </div>
          )}

          {painLabels.length > 0 && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Desafíos a Resolver</span>
              <div className="flex flex-wrap gap-1.5">
                {painLabels.map((p) => (
                  <span key={p} className="px-2 py-0.5 bg-[#C69320]/10 text-[#FBE18D] rounded text-[10px] border border-[#C69320]/20">{p}</span>
                ))}
              </div>
            </div>
          )}

          {goals.successVision && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Visión de Éxito</span>
              <p className="text-xs text-slate-300">{goals.successVision}</p>
            </div>
          )}

          {(goals.timeline || goals.budget) && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Horizonte</span>
              <div className="flex gap-4 text-xs text-slate-300">
                {goals.timeline && <span>Inicio: <span className="text-white">{goals.timeline}</span></span>}
                {goals.budget && <span>Presupuesto: <span className="text-white">{goals.budget}</span></span>}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-500">
          Al enviar, aceptas que te contactemos para dar seguimiento a tu solicitud.
        </p>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderContactStep();
      case 1:
        return renderProfileStep();
      case 2:
        return renderGoalsStep();
      case 3:
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0B0F19] border border-[#C69320]/30 rounded-2xl shadow-[0_0_50px_rgba(198,147,32,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C69320]/20 to-transparent p-5 border-b border-[#C69320]/20 flex justify-between items-start shrink-0">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C69320]/10 text-[#FBE18D] text-[10px] uppercase font-bold tracking-widest mb-2 border border-[#C69320]/20">
                <Bot size={12} /> Diagnóstico Inteligente
              </div>
              <h2 className="text-xl font-bold text-white truncate pr-2">{(project?.title as string) || ''}</h2>
              <p className="text-slate-400 text-[11px] mt-0.5">Personalización y consultoría técnica de alto nivel</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors shrink-0"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto custom-scrollbar">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center space-y-5 py-8"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">¡Diagnóstico Completado!</h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Hemos recibido toda la información de tu negocio para{' '}
                    <span className="text-[#FBE18D] font-medium">{(project?.title as string) || ''}</span>.
                    Nuestro equipo analizará tu caso y te contactará con una propuesta personalizada.
                  </p>
                </div>

                {aiResponse && (
                  <div className="w-full bg-[#131B2A] border border-[#C69320]/20 rounded-xl p-5 text-left relative mt-2 shadow-inner">
                    <div className="absolute -top-3 left-5 bg-[#C69320] text-black text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded flex items-center gap-1 shadow-lg">
                      <Bot size={13} /> Análisis con IA
                    </div>
                    <p className="text-slate-300 text-xs whitespace-pre-line leading-relaxed mt-2">
                      {aiResponse}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors border border-white/10 text-xs"
                  >
                    Cerrar
                  </button>
                  <a
                    href="https://wa.me/50500000000?text=Hola%20Joseph%2C%20he%20enviado%20mi%20diagn%C3%B3stico%20de%20proyecto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs"
                  >
                    Hablar con Asesor
                  </a>
                </div>
              </motion.div>
            ) : (
              <>
                {renderStepIndicator()}

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl transition-colors text-xs"
                      >
                        <ChevronLeft size={14} /> Anterior
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 bg-transparent text-slate-400 hover:text-white font-medium rounded-xl transition-colors text-xs"
                    >
                      Cancelar
                    </button>
                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs"
                      >
                        Siguiente <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={status === 'submitting'}
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all disabled:opacity-70 disabled:hover:shadow-none text-xs"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 size={14} className="animate-spin" /> Analizando...
                          </>
                        ) : (
                          <>
                            <Send size={14} /> Enviar Diagnóstico
                          </>
                        )}
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
};

export default ProjectModal;
