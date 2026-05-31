"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fadeInUp } from '@/components/landing/animations';
import {
  User, Mail, Phone, Building2, Target, Calendar, DollarSign,
  Lightbulb, Globe, ShoppingCart, LayoutDashboard, Smartphone,
  Bot, Sparkles,   Check, ChevronLeft, ChevronRight, Send,
  Loader2, CheckCircle2, AlertCircle, Clock,
  ShieldCheck
} from 'lucide-react';

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

const PROJECT_TYPES = [
  { id: "Sitio web corporativo / Landing page", icon: Globe },
  { id: "Tienda online (E-commerce)", icon: ShoppingCart },
  { id: "Aplicación web / Dashboard", icon: LayoutDashboard },
  { id: "Aplicación móvil", icon: Smartphone },
  { id: "Solución con IA / Automatización", icon: Bot },
  { id: "Otro", icon: Sparkles },
];

const PROJECT_SPECIFIC_QUESTIONS: Record<string, DynamicQuestion[]> = {
  "Sitio web corporativo / Landing page": [
    { label: "Industria o Rubro", name: 'industry', type: 'text', placeholder: 'Tecnología, Salud, Restaurantes...' },
    { label: "Páginas Estimadas", name: 'pages', type: 'select', options: ['1 (One Page)', '3-5', '5-10', '+10'] },
    { label: "¿Necesitas blog o noticias?", name: 'hasBlog', type: 'select', options: ['Sí', 'No', 'Más adelante'] },
    { label: "Idiomas Requeridos", name: 'languages', type: 'select', options: ['Solo Español', 'Español + Inglés', 'Multilingüe (3+)'] },
  ],
  "Tienda online (E-commerce)": [
    { label: "Nicho de Mercado", name: 'niche', type: 'text', placeholder: 'Ropa, Electrónica, Joyería...' },
    { label: "Productos a Catalogar", name: 'products', type: 'select', options: ['- 50', '50-200', '200-1000', '+1000'] },
    { label: "Canal de Ventas Principal", name: 'channel', type: 'select', options: ['Instagram / Redes', 'MercadoLibre / Amazon', 'Tienda física', 'Ninguno aún'] },
    { label: "¿Ya has tenido tienda online?", name: 'previousEcom', type: 'select', options: ['Nunca', 'Sí, pero no funcionó', 'Sí, activa actualmente'] },
  ],
  "Aplicación web / Dashboard": [
    { label: "Tipo de Aplicación", name: 'appType', type: 'text', placeholder: 'CRM, ERP, Panel administrativo...' },
    { label: "Usuarios Estimados", name: 'users', type: 'select', options: ['1-10', '10-50', '50-200', '+200'] },
    { label: "¿Requiere roles de usuario?", name: 'hasRoles', type: 'select', options: ['Sí, varios roles', 'Solo admin', 'No necesario'] },
    { label: "Integraciones Requeridas", name: 'integrations', type: 'text', placeholder: 'Pasarelas de pago, APIs externas, WhatsApp...' },
  ],
  "Aplicación móvil": [
    { label: "Plataforma Principal", name: 'platform', type: 'select', options: ['iOS', 'Android', 'Ambas (Cross-platform)'] },
    { label: "Funcionalidad Principal", name: 'mainFunction', type: 'text', placeholder: 'Chat, Geolocalización, Pagos, Red social...' },
    { label: "¿Requiere backend propio?", name: 'needsBackend', type: 'select', options: ['Sí, completo', 'API existente', 'No estoy seguro'] },
    { label: "Público Objetivo", name: 'audience', type: 'text', placeholder: 'Describre brevemente a tu usuario ideal' },
  ],
  "Solución con IA / Automatización": [
    { label: "Problema a Resolver con IA", name: 'aiProblem', type: 'text', placeholder: 'Atención al cliente, Análisis de datos, Automatización de tareas...' },
    { label: "Volumen de Datos", name: 'dataVolume', type: 'select', options: ['Pocos datos', 'Volumen medio', 'Big Data'] },
    { label: "Fuentes de Datos Disponibles", name: 'dataSources', type: 'text', placeholder: 'PDFs, Bases de datos, APIs, Documentos físicos...' },
    { label: "¿Tienes modelo IA o hay que crearlo?", name: 'aiModel', type: 'select', options: ['Crear desde cero', 'Usar API existente (GPT, Claude)', 'No lo sé'] },
  ],
  "Otro": [
    { label: "Descripción Breve", name: 'otherDesc', type: 'text', placeholder: 'Describe brevemente tu idea de proyecto' },
    { label: "¿Qué te inspiró a desarrollar esto?", name: 'inspiration', type: 'text', placeholder: 'Cuéntanos qué te motiva' },
    { label: "Tecnologías Preferidas", name: 'techPref', type: 'text', placeholder: 'Next.js, Firebase, Python, React Native...' },
  ],
};

const PAIN_POINTS: Record<string, PainPoint[]> = {
  "Sitio web corporativo / Landing page": [
    { label: "Mi sitio actual se ve anticuado", value: 'oldSite', benefit: 'Imagen profesional renovada' },
    { label: "No aparece en Google", value: 'noSeo', benefit: 'Posicionamiento SEO real' },
    { label: "La página carga muy lento", value: 'slow', benefit: 'Velocidad ultrarrápida' },
    { label: "No genera leads ni consultas", value: 'noLeads', benefit: 'Generación de leads constante' },
    { label: "No puedo actualizar contenido yo mismo", value: 'noCms', benefit: 'Panel autogestionable' },
    { label: "Marca sin presencia digital sólida", value: 'branding', benefit: 'Identidad digital premium' },
  ],
  "Tienda online (E-commerce)": [
    { label: "Alta tasa de carrito abandonado", value: 'cartAbandon', benefit: 'Recuperación inteligente de ventas' },
    { label: "Baja conversión desde móvil", value: 'mobileConversion', benefit: 'Experiencia móvil optimizada' },
    { label: "Proceso de pago complicado", value: 'checkout', benefit: 'Checkout fluido y seguro' },
    { label: "Sin integración con pasarelas de pago", value: 'payments', benefit: 'Pagos locales e internacionales' },
    { label: "Inventario desactualizado constantemente", value: 'inventory', benefit: 'Stock sincronizado en tiempo real' },
    { label: "Dificultad para escalar ventas", value: 'scalability', benefit: 'Escalabilidad sin límites' },
  ],
  "Aplicación web / Dashboard": [
    { label: "Procesos manuales que consumen tiempo", value: 'manualProcess', benefit: 'Automatización de procesos' },
    { label: "Datos dispersos sin visión central", value: 'scatteredData', benefit: 'Dashboard centralizado en vivo' },
    { label: "Reportes lentos y poco confiables", value: 'badReports', benefit: 'Reportes automáticos precisos' },
    { label: "Equipo sin herramientas colaborativas", value: 'noCollaboration', benefit: 'Colaboración en tiempo real' },
    { label: "Dificultad para escalar operaciones", value: 'opsScaling', benefit: 'Escalabilidad operativa' },
    { label: "Problemas de seguridad con datos sensibles", value: 'security', benefit: 'Seguridad empresarial' },
  ],
  "Aplicación móvil": [
    { label: "Mi negocio necesita estar en el bolsillo del cliente", value: 'mobileNeed', benefit: 'Presencia móvil directa' },
    { label: "Procesos que requieren movilidad", value: 'mobility', benefit: 'Operaciones desde cualquier lugar' },
    { label: "Competencia ya tiene app y yo no", value: 'competition', benefit: 'Ventaja competitiva' },
    { label: "Notificaciones push para engagement", value: 'pushNotifications', benefit: 'Engagement con notificaciones' },
    { label: "Quiero monetizar mediante app", value: 'monetize', benefit: 'Nuevo canal de ingresos' },
    { label: "Integrar con hardware del dispositivo", value: 'hardware', benefit: 'Funcionalidades nativas del dispositivo' },
  ],
  "Solución con IA / Automatización": [
    { label: "Atención al cliente lenta o costosa", value: 'slowSupport', benefit: 'Soporte 24/7 con IA' },
    { label: "Procesos repetitivos que roban tiempo", value: 'repetitive', benefit: 'Automatización inteligente' },
    { label: "Datos sin analizar ni aprovechar", value: 'unusedData', benefit: 'Insights accionables desde datos' },
    { label: "Toma de decisiones sin respaldo de datos", value: 'noDataDriven', benefit: 'Decisiones respaldadas por IA' },
    { label: "Altos costos operativos mensuales", value: 'highCosts', benefit: 'Reducción de costos operativos' },
    { label: "Necesito un agente virtual para mi web", value: 'aiAgent', benefit: 'Agente IA personalizado' },
  ],
  "Otro": [
    { label: "Tengo una idea innovadora", value: 'innovative', benefit: 'Validación y desarrollo de tu idea' },
    { label: "Necesito asesoría técnica primero", value: 'consulting', benefit: 'Consultoría experta sin compromiso' },
    { label: "Quiero migrar una plataforma existente", value: 'migration', benefit: 'Migración segura y optimizada' },
    { label: "Busco socio tecnológico para mi startup", value: 'partner', benefit: 'Partner técnico estratégico' },
    { label: "Requiero mantenimiento de un sistema", value: 'maintenance', benefit: 'Mantenimiento y soporte continuo' },
    { label: "Proyecto con presupuesto gubernamental", value: 'government', benefit: 'Gestión de proyectos institucionales' },
  ],
};

const FEATURES = [
  "Diseño responsive premium",
  "Panel de administración autónomo",
  "Pasarela de pagos en línea",
  "Autenticación de usuarios / Roles",
  "Integración de Agentes de IA",
  "Optimización SEO avanzada",
  "Dashboard de Analíticas",
  "Base de datos en tiempo real",
  "Notificaciones Push / WhatsApp",
  "API para integración externa",
];

const BUDGETS = [
  "Menor a $500",
  "$500 - $1,000",
  "$1,000 - $2,000",
  "$2,000 - $4,000",
  "$4,000 - $10,000",
  "+$10,000",
  "Prefiero discutirlo",
];

const DEADLINES = [
  "Urgente (esta semana)",
  "1 a 2 semanas",
  "Un mes",
  "2 a 3 meses",
  "3 a 6 meses",
  "Sin prisa (Flexible)",
];

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

const ContactSection = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    preferredContact: 'WhatsApp',
  });

  const [projectType, setProjectType] = useState('');
  const [otherProjectType, setOtherProjectType] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [mainProblem, setMainProblem] = useState('');
  const [dynamicAnswers, setDynamicAnswers] = useState<Record<string, string>>({});
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [goals, setGoals] = useState({
    successVision: '',
    budget: '',
    deadline: '',
    references: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const dynamicQuestions = useMemo(
    () => PROJECT_SPECIFIC_QUESTIONS[projectType] || [],
    [projectType]
  );
  const painPoints = useMemo(
    () => PAIN_POINTS[projectType] || [],
    [projectType]
  );

  const projectParam = searchParams.get('project');
  const serviceParam = searchParams.get('service');

  useEffect(() => {
    const projectNames: Record<string, string> = {
      medical: 'Aplicación web / Dashboard',
      pos: 'Aplicación web / Dashboard',
      hotel: 'Aplicación web / Dashboard',
      ecommerce: 'Tienda online (E-commerce)',
      beauty: 'Solución con IA / Automatización',
      scholar: 'Aplicación web / Dashboard',
    };
    if (projectParam && projectNames[projectParam]) {
      setProjectType(projectNames[projectParam]);
    } else if (serviceParam) {
      if (serviceParam.includes('ia') || serviceParam.includes('ai') || serviceParam.includes('inteligencia')) {
        setProjectType("Solución con IA / Automatización");
      } else if (serviceParam.includes('web') || serviceParam.includes('software')) {
        setProjectType("Aplicación web / Dashboard");
      } else if (serviceParam.includes('tienda') || serviceParam.includes('ecommerce')) {
        setProjectType("Tienda online (E-commerce)");
      }
    }
  }, [projectParam, serviceParam]);

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Campo obligatorio';
      if (!formData.email.trim()) newErrors.email = 'Campo obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Correo inválido';
      if (!formData.phone.trim()) newErrors.phone = 'Campo obligatorio';
    }
    if (s === 1) {
      if (!projectType) newErrors.projectType = 'Selecciona un tipo de proyecto';
      if (!mainProblem.trim()) newErrors.mainProblem = 'Describe tu problema o necesidad';
    }
    if (s === 2) {
      if (!goals.budget) newErrors.budget = 'Selecciona un rango de presupuesto';
      if (!goals.deadline) newErrors.deadline = 'Selecciona un plazo estimado';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep(s => Math.min(s + 1, STEPS.length - 1));
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  const togglePainPoint = (value: string) => {
    setSelectedPainPoints(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const getDynamicTitle = () => {
    if (projectParam) {
      const projectNames: Record<string, string> = {
        medical: 'Historia Clínica AI', pos: 'POS Tienda AI',
        hotel: 'Hotel Management', ecommerce: 'Eve Commerce',
        beauty: 'Beauty Agenda SaaS', scholar: 'ScholarAI Nexus',
      };
      const name = projectNames[projectParam];
      if (name) return `Diagnóstico: ${name}`;
    }
    return 'Diagnóstico Inteligente de Proyecto';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setAiResponse(null);
    try {
      const painLabels = selectedPainPoints.map(v => {
        const pp = painPoints.find(p => p.value === v);
        return pp?.label || v;
      });

       // Generate ticket number
       const array = new Uint32Array(1);
       window.crypto.getRandomValues(array);
       const ticketNumber = `WEB-${(array[0] % 100000).toString().padStart(5, '0')}`;
       setTicketNumber(ticketNumber);
       
       await addDoc(collection(db, 'leads'), {
         fullName: formData.fullName,
         email: formData.email,
         phone: formData.phone,
         companyName: formData.companyName,
         preferredContact: formData.preferredContact,
         projectType,
         otherProjectType,
         currentWebsite,
         mainProblem,
         businessProfile: dynamicQuestions.length > 0 ? dynamicAnswers : null,
         painPoints: painLabels,
         selectedFeatures,
         successVision: goals.successVision,
         budget: goals.budget,
         deadline: goals.deadline,
         references: goals.references,
         ticketNumber,
         status: "Nuevo",
         source: projectParam ? `proyecto_${projectParam}` : 'formulario_principal',
         createdAt: serverTimestamp(),
       });

      const profileDetails = Object.entries(dynamicAnswers)
        .filter(([, v]) => v)
        .map(([k, v]) => {
          const q = dynamicQuestions.find(dq => dq.name === k);
          return `${q?.label || k}: ${v}`;
        })
        .join(', ');

      const painText = painLabels.length
        ? `\nDesafíos clave: ${painLabels.join(', ')}.` : '';
      const featureText = selectedFeatures.length
        ? `\nFuncionalidades de interés: ${selectedFeatures.join(', ')}.` : '';
      const visionText = goals.successVision
        ? `\nVisión de éxito: ${goals.successVision}.` : '';
      const refText = goals.references
        ? `\nReferencias: ${goals.references}.` : '';

      const aiPrompt = `Soy un cliente interesado en un proyecto de tipo "${projectType}".

Perfil:
Empresa: ${formData.companyName || 'Independiente'}
Contacto: ${formData.fullName} - ${formData.email}${profileDetails ? '\n' + profileDetails : ''}
Problema principal: ${mainProblem}
${painText}${featureText}${visionText}
Presupuesto: ${goals.budget}
Horizonte: ${goals.deadline}${refText}

Como consultor experto de WebDesignJE, redacta un diagnóstico breve (máximo 3 párrafos) que:
1. Reconozca sus desafíos específicos
2. Explique cómo la solución transformará su negocio
3. Incluya un cierre motivador
Tono: consultoría premium, profesional, persuasivo.`;

      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: aiPrompt }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setAiResponse(data.message);
      } else {
        setAiResponse('Hemos recibido tu información. Te contactaré en menos de 2 horas con un análisis personalizado.');
      }

      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
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

  const renderStepIndicator = () => (
    <div className="flex items-center gap-1 mb-6 px-1">
      {STEPS.map((s, i) => {
        const isActive = i === step;
        const isDone = i < step;
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

  const renderContactStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">Tu Información de Contacto</h3>
        <p className="text-slate-400 text-xs">Para enviarte el diagnóstico personalizado</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <User size={12} className="text-[#C69320]" /> Nombre Completo *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Ej. Juan Pérez"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          {renderError('fullName')}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 size={12} className="text-[#C69320]" /> Empresa / Negocio
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Nombre de tu empresa (opcional)"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mail size={12} className="text-[#C69320]" /> Correo Electrónico *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="juan@empresa.com"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          {renderError('email')}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Phone size={12} className="text-[#C69320]" /> Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+505 0000 0000"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          {renderError('phone')}
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">¿Cómo prefieres que te contacte?</label>
        <div className="grid grid-cols-2 gap-3">
          {["WhatsApp", "Email"].map(method => (
            <button
              key={method}
              type="button"
              onClick={() => setFormData({ ...formData, preferredContact: method })}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                formData.preferredContact === method
                  ? 'bg-[#C69320]/20 border-[#FBE18D] text-white'
                  : 'bg-[#131B2A] border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">Perfil de tu Proyecto</h3>
        <p className="text-slate-400 text-xs">Cuéntanos más sobre tu negocio y necesidades</p>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <LayoutDashboard size={12} className="text-[#C69320]" /> Tipo de Proyecto *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PROJECT_TYPES.map(type => {
            const Icon = type.icon;
            const isSelected = projectType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setProjectType(type.id);
                  setDynamicAnswers({});
                  setSelectedPainPoints([]);
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#C69320]/20 to-[#C69320]/5 border-[#FBE18D]'
                    : 'bg-[#131B2A] border-slate-700 hover:border-slate-500'
                }`}
              >
                <Icon size={20} className={isSelected ? 'text-[#FBE18D]' : 'text-slate-500'} />
                <span className={`text-[10px] font-medium leading-tight ${isSelected ? 'text-white' : 'text-slate-400'}`}>{type.id}</span>
              </button>
            );
          })}
        </div>
        {renderError('projectType')}
      </div>

       {projectType === "Otro" && (
         <div className="space-y-1.5 animate-in fade-in">
           <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Especifica el tipo de proyecto</label>
           <input
             type="text"
             value={otherProjectType}
             onChange={e => setOtherProjectType(e.target.value)}
             placeholder="Ej. Sistema ERP personalizado..."
             className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
           />
         </div>
       )}

      {projectType && (
        <>
          {dynamicQuestions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dynamicQuestions.map((q, idx) => (
                <div key={idx} className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{q.label}</label>
                  {q.type === 'select' ? (
                    <select
                      value={dynamicAnswers[q.name] || ''}
                      onChange={e => setDynamicAnswers({ ...dynamicAnswers, [q.name]: e.target.value })}
                      className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
                    >
                      <option value="">Seleccionar...</option>
                      {q.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={dynamicAnswers[q.name] || ''}
                      onChange={e => setDynamicAnswers({ ...dynamicAnswers, [q.name]: e.target.value })}
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
                {painPoints.map(pp => {
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

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe size={12} className="text-[#C69320]" /> Sitio Web Actual (si aplica)
            </label>
            <input
              type="url"
              value={currentWebsite}
              onChange={e => setCurrentWebsite(e.target.value)}
              placeholder="https://www.tuempresa.com"
              className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle size={12} className="text-[#C69320]" /> Problema o Necesidad Principal *
            </label>
            <textarea
              value={mainProblem}
              onChange={e => setMainProblem(e.target.value)}
              rows={3}
              placeholder="Cuéntanos qué necesitas resolver, qué te motivó a buscar esta solución..."
              className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
            />
            {renderError('mainProblem')}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#C69320]" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Funcionalidades de Interés
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FEATURES.map(feature => {
                const isSelected = selectedFeatures.includes(feature);
                return (
                  <div
                    key={feature}
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
        </>
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
          onChange={e => setGoals({ ...goals, successVision: e.target.value })}
          rows={3}
          placeholder="Describe cómo te gustaría que tu negocio opere con esta solución..."
          className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={12} className="text-[#C69320]" /> Horizonte de Entrega *
          </label>
          <select
            value={goals.deadline}
            onChange={e => setGoals({ ...goals, deadline: e.target.value })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">Selecciona un plazo</option>
            {DEADLINES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {renderError('deadline')}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign size={12} className="text-[#C69320]" /> Presupuesto Estimado *
          </label>
          <select
            value={goals.budget}
            onChange={e => setGoals({ ...goals, budget: e.target.value })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">Selecciona un rango</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          {renderError('budget')}
        </div>
      </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={12} className="text-[#C69320]" /> Referencias o Inspiración
              </label>
              <textarea
                value={goals.references}
                onChange={e => setGoals({ ...goals, references: e.target.value })}
                rows={3}
                placeholder="¿Hay algún sitio web o plataforma que te guste como referencia? Puedes listar varios separados por comas..."
                className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
              />
            </div>
    </div>
  );

  const renderReviewStep = () => {
    const painLabels = selectedPainPoints.map(v => {
      const pp = painPoints.find(p => p.value === v);
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
              <span>Nombre: <span className="text-white">{formData.fullName}</span></span>
              <span>Email: <span className="text-white">{formData.email}</span></span>
              <span>Teléfono: <span className="text-white">{formData.phone}</span></span>
              <span>Empresa: <span className="text-white">{formData.companyName || '—'}</span></span>
              <span>Contacto vía: <span className="text-white">{formData.preferredContact}</span></span>
            </div>
          </div>

          <div className="p-4">
            <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Proyecto</span>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>Tipo: <span className="text-white">{projectType}{otherProjectType ? ` — ${otherProjectType}` : ''}</span></p>
              <p>Problema principal: <span className="text-white">{mainProblem}</span></p>
              {currentWebsite && <p>Web actual: <span className="text-white">{currentWebsite}</span></p>}
            </div>
          </div>

          {dynamicQuestions.length > 0 && Object.entries(dynamicAnswers).filter(([, v]) => v).length > 0 && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Perfil del Negocio</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                {dynamicQuestions.map(q => (
                  dynamicAnswers[q.name] && (
                    <span key={q.name}>{q.label}: <span className="text-white">{dynamicAnswers[q.name]}</span></span>
                  )
                ))}
              </div>
            </div>
          )}

          {painLabels.length > 0 && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Desafíos a Resolver</span>
              <div className="flex flex-wrap gap-1.5">
                {painLabels.map(p => (
                  <span key={p} className="px-2 py-0.5 bg-[#C69320]/10 text-[#FBE18D] rounded text-[10px] border border-[#C69320]/20">{p}</span>
                ))}
              </div>
            </div>
          )}

          {selectedFeatures.length > 0 && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Funcionalidades</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedFeatures.map(f => (
                  <span key={f} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] border border-slate-600">{f}</span>
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

          <div className="p-4">
            <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">Horizonte</span>
            <div className="flex gap-4 text-xs text-slate-300">
              <span>Plazo: <span className="text-white">{goals.deadline}</span></span>
              <span>Presupuesto: <span className="text-white">{goals.budget}</span></span>
            </div>
          </div>
        </div>

        <div className="bg-[#C69320]/10 border border-[#C69320]/30 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="text-[#FBE18D] shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-white font-bold text-xs mb-0.5">Privacidad Garantizada</h4>
            <p className="text-[10px] text-slate-400">Toda la información está protegida. Nunca compartiremos tus datos ni ideas.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: return renderContactStep();
      case 1: return renderProfileStep();
      case 2: return renderGoalsStep();
      case 3: return renderReviewStep();
      default: return null;
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C69320]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#FBE18D]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C69320]/10 text-[#FBE18D] text-[10px] uppercase font-bold tracking-widest mb-4 border border-[#C69320]/20">
            <Bot size={14} /> Diagnóstico Inteligente
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {getDynamicTitle()}
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-light">
            Completa este breve diagnóstico. Cada detalle me ayuda a entender tu negocio y ofrecerte una solución verdaderamente personalizada.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="bg-[#0B0F19] border border-[#C69320]/30 rounded-2xl shadow-[0_0_50px_rgba(198,147,32,0.15)] overflow-hidden"
        >
          <div className="p-5 md:p-8">
             {isSubmitted ? (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col items-center text-center space-y-5 py-8"
               >
                 <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                   <CheckCircle2 size={32} className="text-green-400" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-1">¡Diagnóstico Enviado!</h3>
                   <p className="text-xs text-slate-400 max-w-md">
                     He recibido toda la información de tu proyecto. Realizaré un análisis técnico y te contactaré en menos de 2 horas.
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
                   <a
                     href={`https://wa.me/50580610651?text=Hola%20Joseph%20acabo%20de%20enviar%20mi%20formulario%20con%20ID%20${ticketNumber}%20para%20el%20an%C3%A1lisis%20de%20mi%20proyecto%20tecnol%C3%B3gico`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs"
                   >
                     Confirmar y Hablar con Joseph
                   </a>
                 </div>
               </motion.div>
             ) : (
              <>
                {renderStepIndicator()}

                <AnimatePresence mode="wait">
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
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all disabled:opacity-70 disabled:hover:shadow-none text-xs"
                      >
                        {isSubmitting ? (
                          <><Loader2 size={14} className="animate-spin" /> Analizando...</>
                        ) : (
                          <><Send size={14} /> Enviar Diagnóstico</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSectionWrapper = () => (
  <Suspense fallback={<div className="py-24 text-center text-slate-400">Cargando formulario...</div>}>
    <ContactSection />
  </Suspense>
);

export default ContactSectionWrapper;
