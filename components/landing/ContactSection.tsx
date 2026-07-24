"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { fadeInUp } from '@/components/landing/animations';
import { Language } from '@/components/landing/types';
import { useTranslation } from 'react-i18next';
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

const ContactSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();

  const PROJECT_TYPES = useMemo(() => [
    { id: "Sitio web corporativo / Landing page", label: t('projectModal.questions.1.label', { defaultValue: 'Sitio web corporativo / Landing page', lng: lang }), icon: Globe },
    { id: "Tienda online (E-commerce)", label: t('projectModal.questions.2.label', { defaultValue: 'Tienda online (E-commerce)', lng: lang }), icon: ShoppingCart },
    { id: "Aplicación web / Dashboard", label: t('projectModal.questions.3.label', { defaultValue: 'Aplicación web / Dashboard', lng: lang }), icon: LayoutDashboard },
    { id: "Aplicación móvil", label: t('projectModal.questions.4.label', { defaultValue: 'Aplicación móvil', lng: lang }), icon: Smartphone },
    { id: "Solución con IA / Automatización", label: t('projectModal.questions.5.label', { defaultValue: 'Solución con IA / Automatización', lng: lang }), icon: Bot },
    { id: "Otro", label: t('projectModal.questions.6.label', { defaultValue: 'Otro', lng: lang }), icon: Sparkles },
  ], [lang, t]);

  const PROJECT_SPECIFIC_QUESTIONS: Record<string, DynamicQuestion[]> = useMemo(() => ({
    "Sitio web corporativo / Landing page": [
      { label: t('contactForm.questions.industry', { defaultValue: "Industria o Rubro", lng: lang }), name: 'industry', type: 'text', placeholder: t('contactForm.placeholders.industry', { defaultValue: 'Tecnología, Salud, Restaurantes...', lng: lang }) },
      { label: t('contactForm.questions.pages', { defaultValue: "Páginas Estimadas", lng: lang }), name: 'pages', type: 'select', options: [t('contactForm.options.page1', { defaultValue: '1 (One Page)', lng: lang }), '3-5', '5-10', '+10'] },
      { label: t('contactForm.questions.hasBlog', { defaultValue: "¿Necesitas blog o noticias?", lng: lang }), name: 'hasBlog', type: 'select', options: [t('contactForm.options.yes', { defaultValue: 'Sí', lng: lang }), t('contactForm.options.no', { defaultValue: 'No', lng: lang }), t('contactForm.options.later', { defaultValue: 'Más adelante', lng: lang })] },
      { label: t('contactForm.questions.languages', { defaultValue: "Idiomas Requeridos", lng: lang }), name: 'languages', type: 'select', options: [t('contactForm.options.lang1', { defaultValue: 'Solo Español', lng: lang }), t('contactForm.options.lang2', { defaultValue: 'Español + Inglés', lng: lang }), t('contactForm.options.lang3', { defaultValue: 'Multilingüe (3+)', lng: lang })] },
    ],
    "Tienda online (E-commerce)": [
      { label: t('projectModal.questions.4.0.label', { defaultValue: "Nicho de Mercado", lng: lang }), name: 'niche', type: 'text', placeholder: t('projectModal.questions.4.0.placeholder', { defaultValue: 'Ropa, Electrónica, Joyería...', lng: lang }) },
      { label: t('projectModal.questions.2.3.label', { defaultValue: "Productos a Catalogar", lng: lang }), name: 'products', type: 'select', options: ['- 50', '50-200', '200-1000', '+1000'] },
      { label: t('projectModal.questions.4.1.label', { defaultValue: "Canal de Ventas Principal", lng: lang }), name: 'channel', type: 'select', options: [t('projectModal.questions.4.1.options.0', { defaultValue: 'Instagram / Redes', lng: lang }), t('projectModal.questions.4.1.options.1', { defaultValue: 'MercadoLibre / Amazon', lng: lang }), t('projectModal.questions.4.1.options.2', { defaultValue: 'Tienda física', lng: lang }), t('projectModal.questions.4.1.options.3', { defaultValue: 'Ninguno aún', lng: lang })] },
      { label: t('projectModal.questions.4.3.label', { defaultValue: "¿Ya has tenido tienda online?", lng: lang }), name: 'previousEcom', type: 'select', options: [t('projectModal.questions.4.3.options.0', { defaultValue: 'Nunca', lng: lang }), t('projectModal.questions.4.3.options.1', { defaultValue: 'Sí, pero no funcionó', lng: lang }), t('projectModal.questions.4.3.options.2', { defaultValue: 'Sí, activa actualmente', lng: lang })] },
    ],
    "Aplicación web / Dashboard": [
      { label: t('contactForm.questions.appType', { defaultValue: "Tipo de Aplicación", lng: lang }), name: 'appType', type: 'text', placeholder: t('contactForm.placeholders.appType', { defaultValue: 'CRM, ERP, Panel administrativo...', lng: lang }) },
      { label: t('contactForm.questions.users', { defaultValue: "Usuarios Estimados", lng: lang }), name: 'users', type: 'select', options: ['1-10', '10-50', '50-200', '+200'] },
      { label: t('contactForm.questions.hasRoles', { defaultValue: "¿Requiere roles de usuario?", lng: lang }), name: 'hasRoles', type: 'select', options: [t('contactForm.options.roles1', { defaultValue: 'Sí, varios roles', lng: lang }), t('contactForm.options.roles2', { defaultValue: 'Solo admin', lng: lang }), t('contactForm.options.roles3', { defaultValue: 'No necesario', lng: lang })] },
      { label: t('contactForm.questions.integrations', { defaultValue: "Integraciones Requeridas", lng: lang }), name: 'integrations', type: 'text', placeholder: t('contactForm.placeholders.integrations', { defaultValue: 'Pasarelas de pago, APIs externas, WhatsApp...', lng: lang }) },
    ],
    "Aplicación móvil": [
      { label: t('contactForm.questions.platform', { defaultValue: "Plataforma Principal", lng: lang }), name: 'platform', type: 'select', options: ['iOS', 'Android', t('contactForm.options.both', { defaultValue: 'Ambas (Cross-platform)', lng: lang })] },
      { label: t('contactForm.questions.mainFunction', { defaultValue: "Funcionalidad Principal", lng: lang }), name: 'mainFunction', type: 'text', placeholder: t('contactForm.placeholders.mainFunction', { defaultValue: 'Chat, Geolocalización, Pagos, Red social...', lng: lang }) },
      { label: t('projectModal.questions.3.3.label', { defaultValue: "¿Requiere backend propio?", lng: lang }), name: 'needsBackend', type: 'select', options: [t('projectModal.questions.3.3.options.0', { defaultValue: 'Sí, completo', lng: lang }), t('projectModal.questions.3.3.options.1', { defaultValue: 'API existente', lng: lang }), t('projectModal.questions.3.3.options.2', { defaultValue: 'No estoy seguro', lng: lang })] },
      { label: t('contactForm.questions.audience', { defaultValue: "Público Objetivo", lng: lang }), name: 'audience', type: 'text', placeholder: t('contactForm.placeholders.audience', { defaultValue: 'Describre brevemente a tu usuario ideal', lng: lang }) },
    ],
    "Solución con IA / Automatización": [
      { label: t('contactForm.questions.aiProblem', { defaultValue: "Problema a Resolver con IA", lng: lang }), name: 'aiProblem', type: 'text', placeholder: t('contactForm.placeholders.aiProblem', { defaultValue: 'Atención al cliente, Análisis de datos, Automatización de tareas...', lng: lang }) },
      { label: t('projectModal.questions.1.1.label', { defaultValue: "Volumen de Datos", lng: lang }), name: 'dataVolume', type: 'select', options: [t('projectModal.questions.1.1.options.0', { defaultValue: 'Pocos datos', lng: lang }), t('projectModal.questions.1.1.options.1', { defaultValue: 'Volumen medio', lng: lang }), t('projectModal.questions.1.1.options.2', { defaultValue: 'Big Data', lng: lang })] },
      { label: t('contactForm.questions.dataSources', { defaultValue: "Fuentes de Datos Disponibles", lng: lang }), name: 'dataSources', type: 'text', placeholder: t('contactForm.placeholders.dataSources', { defaultValue: 'PDFs, Bases de datos, APIs, Documentos físicos...', lng: lang }) },
      { label: t('contactForm.questions.aiModel', { defaultValue: "¿Tienes modelo IA o hay que crearlo?", lng: lang }), name: 'aiModel', type: 'select', options: [t('contactForm.options.aimodel1', { defaultValue: 'Crear desde cero', lng: lang }), t('contactForm.options.aimodel2', { defaultValue: 'Usar API existente (GPT, Claude)', lng: lang }), t('projectModal.questions.6.3.options.4', { defaultValue: 'No lo sé', lng: lang })] },
    ],
    "Otro": [
      { label: t('contactForm.questions.otherDesc', { defaultValue: "Descripción Breve", lng: lang }), name: 'otherDesc', type: 'text', placeholder: t('contactForm.placeholders.otherDesc', { defaultValue: 'Describe brevemente tu idea de proyecto', lng: lang }) },
      { label: t('contactForm.questions.inspiration', { defaultValue: "¿Qué te inspiró a desarrollar esto?", lng: lang }), name: 'inspiration', type: 'text', placeholder: t('contactForm.placeholders.inspiration', { defaultValue: 'Cuéntanos qué te motiva', lng: lang }) },
      { label: t('contactForm.questions.techPref', { defaultValue: "Tecnologías Preferidas", lng: lang }), name: 'techPref', type: 'text', placeholder: t('contactForm.placeholders.techPref', { defaultValue: 'Next.js, Firebase, Python, React Native...', lng: lang }) },
    ],
  }), [lang, t]);

  const PAIN_POINTS: Record<string, PainPoint[]> = useMemo(() => ({
    "Sitio web corporativo / Landing page": [
      { label: t('contactForm.pains.landing.1', { defaultValue: "Mi sitio actual se ve anticuado", lng: lang }), value: 'oldSite', benefit: t('contactForm.benefits.landing.1', { defaultValue: 'Imagen profesional renovada', lng: lang }) },
      { label: t('projectModal.painPoints.4.3.label', { defaultValue: "No aparece en Google", lng: lang }), value: 'noSeo', benefit: t('projectModal.painPoints.4.3.benefit', { defaultValue: 'Posicionamiento SEO real', lng: lang }) },
      { label: t('projectModal.painPoints.4.4.label', { defaultValue: "La página carga muy lento", lng: lang }), value: 'slow', benefit: t('projectModal.painPoints.4.4.benefit', { defaultValue: 'Velocidad ultrarrápida', lng: lang }) },
      { label: t('contactForm.pains.landing.4', { defaultValue: "No genera leads ni consultas", lng: lang }), value: 'noLeads', benefit: t('contactForm.benefits.landing.4', { defaultValue: 'Generación de leads constante', lng: lang }) },
      { label: t('contactForm.pains.landing.5', { defaultValue: "No puedo actualizar contenido yo mismo", lng: lang }), value: 'noCms', benefit: t('contactForm.benefits.landing.5', { defaultValue: 'Panel autogestionable', lng: lang }) },
      { label: t('projectModal.painPoints.4.2.label', { defaultValue: "Marca sin presencia digital sólida", lng: lang }), value: 'branding', benefit: t('projectModal.painPoints.4.2.benefit', { defaultValue: 'Identidad digital premium', lng: lang }) },
    ],
    "Tienda online (E-commerce)": [
      { label: t('projectModal.painPoints.4.0.label', { defaultValue: "Alta tasa de carrito abandonado", lng: lang }), value: 'cartAbandon', benefit: t('projectModal.painPoints.4.0.benefit', { defaultValue: 'Recuperación inteligente de ventas', lng: lang }) },
      { label: t('projectModal.painPoints.4.1.label', { defaultValue: "Baja conversión desde móvil", lng: lang }), value: 'mobileConversion', benefit: t('projectModal.painPoints.4.1.benefit', { defaultValue: 'Experiencia móvil optimizada', lng: lang }) },
      { label: t('projectModal.painPoints.2.4.label', { defaultValue: "Proceso de pago complicado", lng: lang }), value: 'checkout', benefit: t('projectModal.painPoints.2.4.benefit', { defaultValue: 'Checkout fluido y seguro', lng: lang }) },
      { label: t('projectModal.painPoints.2.3.label', { defaultValue: "Sin integración con pasarelas de pago", lng: lang }), value: 'payments', benefit: t('projectModal.painPoints.2.3.benefit', { defaultValue: 'Pagos locales e internacionales', lng: lang }) },
      { label: t('projectModal.painPoints.2.0.label', { defaultValue: "Inventario desactualizado constantemente", lng: lang }), value: 'inventory', benefit: t('projectModal.painPoints.2.0.benefit', { defaultValue: 'Stock sincronizado en tiempo real', lng: lang }) },
      { label: t('projectModal.painPoints.4.5.label', { defaultValue: "Dificultad para escalar ventas", lng: lang }), value: 'scalability', benefit: t('projectModal.painPoints.4.5.benefit', { defaultValue: 'Escalabilidad sin límites', lng: lang }) },
    ],
    "Aplicación web / Dashboard": [
      { label: t('projectModal.painPoints.6.1.label', { defaultValue: "Procesos manuales que consumen tiempo", lng: lang }), value: 'manualProcess', benefit: t('projectModal.painPoints.6.1.benefit', { defaultValue: 'Automatización de procesos', lng: lang }) },
      { label: t('projectModal.painPoints.6.5.label', { defaultValue: "Datos dispersos sin visión central", lng: lang }), value: 'scatteredData', benefit: t('projectModal.painPoints.6.5.benefit', { defaultValue: 'Dashboard centralizado en vivo', lng: lang }) },
      { label: t('projectModal.painPoints.6.6.label', { defaultValue: "Reportes lentos y poco confiables", lng: lang }), value: 'badReports', benefit: t('projectModal.painPoints.6.6.benefit', { defaultValue: 'Reportes automáticos precisos', lng: lang }) },
      { label: t('projectModal.painPoints.6.2.label', { defaultValue: "Equipo sin herramientas colaborativas", lng: lang }), value: 'noCollaboration', benefit: t('projectModal.painPoints.6.2.benefit', { defaultValue: 'Colaboración en tiempo real', lng: lang }) },
      { label: t('contactForm.pains.dashboard.5', { defaultValue: "Dificultad para escalar operaciones", lng: lang }), value: 'opsScaling', benefit: t('contactForm.benefits.dashboard.5', { defaultValue: 'Escalabilidad operativa', lng: lang }) },
      { label: t('projectModal.painPoints.6.4.label', { defaultValue: "Problemas de seguridad con datos sensibles", lng: lang }), value: 'security', benefit: t('projectModal.painPoints.6.4.benefit', { defaultValue: 'Seguridad empresarial', lng: lang }) },
    ],
    "Aplicación móvil": [
      { label: t('contactForm.pains.mobile.1', { defaultValue: "Mi negocio necesita estar en el bolsillo del cliente", lng: lang }), value: 'mobileNeed', benefit: t('contactForm.benefits.mobile.1', { defaultValue: 'Presencia móvil directa', lng: lang }) },
      { label: t('contactForm.pains.mobile.2', { defaultValue: "Procesos que requieren movilidad", lng: lang }), value: 'mobility', benefit: t('contactForm.benefits.mobile.2', { defaultValue: 'Operaciones desde cualquier lugar', lng: lang }) },
      { label: t('contactForm.pains.mobile.3', { defaultValue: "Competencia ya tiene app y yo no", lng: lang }), value: 'competition', benefit: t('contactForm.benefits.mobile.3', { defaultValue: 'Ventaja competitiva', lng: lang }) },
      { label: t('contactForm.pains.mobile.4', { defaultValue: "Notificaciones push para engagement", lng: lang }), value: 'pushNotifications', benefit: t('contactForm.benefits.mobile.4', { defaultValue: 'Engagement con notificaciones', lng: lang }) },
      { label: t('contactForm.pains.mobile.5', { defaultValue: "Quiero monetizar mediante app", lng: lang }), value: 'monetize', benefit: t('contactForm.benefits.mobile.5', { defaultValue: 'Nuevo canal de ingresos', lng: lang }) },
      { label: t('contactForm.pains.mobile.6', { defaultValue: "Integrar con hardware del dispositivo", lng: lang }), value: 'hardware', benefit: t('contactForm.benefits.mobile.6', { defaultValue: 'Funcionalidades nativas del dispositivo', lng: lang }) },
    ],
    "Solución con IA / Automatización": [
      { label: t('projectModal.painPoints.6.0.label', { defaultValue: "Atención al cliente lenta o costosa", lng: lang }), value: 'slowSupport', benefit: t('projectModal.painPoints.6.0.benefit', { defaultValue: 'Soporte 24/7 con IA', lng: lang }) },
      { label: t('contactForm.pains.ai.2', { defaultValue: "Procesos repetitivos que roban tiempo", lng: lang }), value: 'repetitive', benefit: t('contactForm.benefits.ai.2', { defaultValue: 'Automatización inteligente', lng: lang }) },
      { label: t('contactForm.pains.ai.3', { defaultValue: "Datos sin analizar ni aprovechar", lng: lang }), value: 'unusedData', benefit: t('contactForm.benefits.ai.3', { defaultValue: 'Insights accionables desde datos', lng: lang }) },
      { label: t('contactForm.pains.ai.4', { defaultValue: "Toma de decisiones sin respaldo de datos", lng: lang }), value: 'noDataDriven', benefit: t('contactForm.benefits.ai.4', { defaultValue: 'Decisiones respaldadas por IA', lng: lang }) },
      { label: t('projectModal.painPoints.3.1.label', { defaultValue: "Altos costos operativos mensuales", lng: lang }), value: 'highCosts', benefit: t('projectModal.painPoints.3.1.benefit', { defaultValue: 'Reducción de costos operativos', lng: lang }) },
      { label: t('contactForm.pains.ai.6', { defaultValue: "Necesito un agente virtual para mi web", lng: lang }), value: 'aiAgent', benefit: t('contactForm.benefits.ai.6', { defaultValue: 'Agente IA personalizado', lng: lang }) },
    ],
    "Otro": [
      { label: t('contactForm.pains.other.1', { defaultValue: "Tengo una idea innovadora", lng: lang }), value: 'innovative', benefit: t('contactForm.benefits.other.1', { defaultValue: 'Validación y desarrollo de tu idea', lng: lang }) },
      { label: t('contactForm.pains.other.2', { defaultValue: "Necesito asesoría técnica primero", lng: lang }), value: 'consulting', benefit: t('contactForm.benefits.other.2', { defaultValue: 'Consultoría experta sin compromiso', lng: lang }) },
      { label: t('contactForm.pains.other.3', { defaultValue: "Quiero migrar una plataforma existente", lng: lang }), value: 'migration', benefit: t('contactForm.benefits.other.3', { defaultValue: 'Migración segura y optimizada', lng: lang }) },
      { label: t('contactForm.pains.other.4', { defaultValue: "Busco socio tecnológico para mi startup", lng: lang }), value: 'partner', benefit: t('contactForm.benefits.other.4', { defaultValue: 'Partner técnico estratégico', lng: lang }) },
      { label: t('contactForm.pains.other.5', { defaultValue: "Requiero mantenimiento de un sistema", lng: lang }), value: 'maintenance', benefit: t('contactForm.benefits.other.5', { defaultValue: 'Mantenimiento y soporte continuo', lng: lang }) },
      { label: t('contactForm.pains.other.6', { defaultValue: "Proyecto con presupuesto gubernamental", lng: lang }), value: 'government', benefit: t('contactForm.benefits.other.6', { defaultValue: 'Gestión de proyectos institucionales', lng: lang }) },
    ],
  }), [lang, t]);

  const FEATURES = useMemo(() => [
    t('contactForm.features.0', { defaultValue: "Diseño responsive premium", lng: lang }),
    t('contactForm.features.1', { defaultValue: "Panel de administración autónomo", lng: lang }),
    t('contactForm.features.2', { defaultValue: "Pasarela de pagos en línea", lng: lang }),
    t('contactForm.features.3', { defaultValue: "Autenticación de usuarios / Roles", lng: lang }),
    t('contactForm.features.4', { defaultValue: "Integración de Agentes de IA", lng: lang }),
    t('contactForm.features.5', { defaultValue: "Optimización SEO avanzada", lng: lang }),
    t('contactForm.features.6', { defaultValue: "Dashboard de Analíticas", lng: lang }),
    t('contactForm.features.7', { defaultValue: "Base de datos en tiempo real", lng: lang }),
    t('contactForm.features.8', { defaultValue: "Notificaciones Push / WhatsApp", lng: lang }),
    t('contactForm.features.9', { defaultValue: "API para integración externa", lng: lang }),
  ], [lang, t]);

  const BUDGETS = useMemo(() => [
    t('contactForm.budgets.0', { defaultValue: "Menor a $500", lng: lang }),
    "$500 - $1,000",
    "$1,000 - $2,000",
    "$2,000 - $4,000",
    "$4,000 - $10,000",
    "+$10,000",
    t('projectModal.budget_options.undisclosed', { defaultValue: "Prefiero discutirlo", lng: lang }),
  ], [lang, t]);

  const DEADLINES = useMemo(() => [
    t('projectModal.timeline_options.immediate', { defaultValue: "Urgente (esta semana)", lng: lang }),
    t('contactForm.deadlines.1', { defaultValue: "1 a 2 semanas", lng: lang }),
    t('contactForm.deadlines.2', { defaultValue: "Un mes", lng: lang }),
    t('projectModal.timeline_options.months_1_3', { defaultValue: "2 a 3 meses", lng: lang }),
    t('projectModal.timeline_options.months_3_6', { defaultValue: "3 a 6 meses", lng: lang }),
    t('contactForm.deadlines.5', { defaultValue: "Sin prisa (Flexible)", lng: lang }),
  ], [lang, t]);

  const STEPS = useMemo(() => [
    { id: 'contact', label: t('projectModal.step_contact', { defaultValue: 'Contacto', lng: lang }), icon: User },
    { id: 'profile', label: t('projectModal.step_profile', { defaultValue: 'Perfil', lng: lang }), icon: Building2 },
    { id: 'goals', label: t('projectModal.step_goals', { defaultValue: 'Metas', lng: lang }), icon: Target },
    { id: 'review', label: t('projectModal.step_review', { defaultValue: 'Revisión', lng: lang }), icon: CheckCircle2 },
  ], [lang, t]);

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    [projectType, PROJECT_SPECIFIC_QUESTIONS]
  );
  const painPoints = useMemo(
    () => PAIN_POINTS[projectType] || [],
    [projectType, PAIN_POINTS]
  );

  const projectParam = searchParams.get('project');
  const serviceParam = searchParams.get('service');

  useEffect(() => {
    const projectNames: Record<string, string> = {
      medical: 'Aplicación web / Dashboard',
      pos: 'Aplicación web / Dashboard',
      hotel: 'Aplicación web / Dashboard',
      crm: 'Aplicación web / Dashboard',
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
      if (!formData.fullName.trim()) newErrors.fullName = t('projectModal.required_error', { defaultValue: 'Campo obligatorio', lng: lang });
      if (!formData.email.trim()) newErrors.email = t('projectModal.required_error', { defaultValue: 'Campo obligatorio', lng: lang });
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('projectModal.invalid_email', { defaultValue: 'Correo inválido', lng: lang });
      if (!formData.phone.trim()) newErrors.phone = t('projectModal.required_error', { defaultValue: 'Campo obligatorio', lng: lang });
    }
    if (s === 1) {
      if (!projectType) newErrors.projectType = t('contactForm.errors.projectType', { defaultValue: 'Selecciona un tipo de proyecto', lng: lang });
      if (!mainProblem.trim()) newErrors.mainProblem = t('contactForm.errors.mainProblem', { defaultValue: 'Describe tu problema o necesidad', lng: lang });
    }
    if (s === 2) {
      if (!goals.budget) newErrors.budget = t('projectModal.required_error', { defaultValue: 'Campo obligatorio', lng: lang });
      if (!goals.deadline) newErrors.deadline = t('projectModal.required_error', { defaultValue: 'Campo obligatorio', lng: lang });
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
        medical: t('projects.items.0.title', { defaultValue: 'Historia Clínica AI', lng: lang }),
        pos: t('projects.items.1.title', { defaultValue: 'POS Tienda AI', lng: lang }),
        hotel: t('projects.items.2.title', { defaultValue: 'Sistema de gestión usuario (CRM)', lng: lang }),
        crm: t('projects.items.2.title', { defaultValue: 'Sistema de gestión usuario (CRM)', lng: lang }),
        ecommerce: t('projects.items.3.title', { defaultValue: 'Eve Commerce', lng: lang }),
        beauty: t('projects.items.4.title', { defaultValue: 'Beauty Agenda SaaS', lng: lang }),
        scholar: t('projects.items.5.title', { defaultValue: 'ScholarAI Nexus', lng: lang }),
      };
      const name = projectNames[projectParam];
      if (name) return `${t('projectModal.title', { defaultValue: 'Diagnóstico Tecnológico', lng: lang })}: ${name}`;
    }
    return t('contactForm.diagnoseTitle', { defaultValue: 'Diseñemos la arquitectura digital de tu negocio', lng: lang });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const painLabels = selectedPainPoints.map(v => {
        const pp = painPoints.find(p => p.value === v);
        return pp?.label || v;
      });

       // Generate ticket number
       const ticketNumber = `WEB-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
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

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
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
        <h3 className="text-lg font-bold text-white mb-1">{t('projectModal.contact_title', { defaultValue: 'Tu Información de Contacto', lng: lang })}</h3>
        <p className="text-slate-400 text-xs">{t('projectModal.contact_subtitle', { defaultValue: 'Para enviarte el diagnóstico personalizado y propuesta', lng: lang })}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <User size={12} className="text-[#C69320]" /> {t('projectModal.name_label', { defaultValue: 'Nombre Completo *', lng: lang })}
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            placeholder={t('contactForm.placeholders.fullName', { defaultValue: 'Ej. Juan Pérez', lng: lang })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          {renderError('fullName')}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 size={12} className="text-[#C69320]" /> {t('projectModal.company_label', { defaultValue: 'Empresa / Negocio', lng: lang })}
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            placeholder={t('contactForm.placeholders.company', { defaultValue: 'Nombre de tu empresa (opcional)', lng: lang })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mail size={12} className="text-[#C69320]" /> {t('projectModal.email_label', { defaultValue: 'Correo Electrónico *', lng: lang })}
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
            <Phone size={12} className="text-[#C69320]" /> {t('projectModal.phone_label', { defaultValue: 'Teléfono / WhatsApp', lng: lang })} *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+505 8000 0000"
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          {renderError('phone')}
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{t('contactForm.howContact', { defaultValue: '¿Cómo prefieres que te contacte?', lng: lang })}</label>
        <div className="grid grid-cols-2 gap-3">
          {["WhatsApp", "Email"].map(method => (
            <button
              key={method}
              type="button"
              onClick={() => setFormData({ ...formData, preferredContact: method })}
              className={`p-3 rounded-xl border text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none ${
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
        <h3 className="text-lg font-bold text-white mb-1">{t('projectModal.profile_title', { defaultValue: 'Perfil de tu Negocio', lng: lang })}</h3>
        <p className="text-slate-400 text-xs">{t('projectModal.profile_subtitle', { defaultValue: 'Cuéntanos más sobre tu operación actual', lng: lang })}</p>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <LayoutDashboard size={12} className="text-[#C69320]" /> {t('contactForm.projectTypeLabel', { defaultValue: 'Tipo de Proyecto *', lng: lang })}
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
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#C69320]/20 to-[#C69320]/5 border-[#FBE18D]'
                    : 'bg-[#131B2A] border-slate-700 hover:border-slate-500'
                }`}
              >
                <Icon size={20} className={isSelected ? 'text-[#FBE18D]' : 'text-slate-500'} />
                <span className={`text-[10px] font-medium leading-tight ${isSelected ? 'text-white' : 'text-slate-400'}`}>{type.label}</span>
              </button>
            );
          })}
        </div>
        {renderError('projectType')}
      </div>

       {projectType === "Otro" && (
         <div className="space-y-1.5 animate-in fade-in">
           <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{t('contactForm.specifyType', { defaultValue: 'Especifica el tipo de proyecto', lng: lang })}</label>
           <input
             type="text"
             value={otherProjectType}
             onChange={e => setOtherProjectType(e.target.value)}
             placeholder={t('contactForm.placeholders.specifyType', { defaultValue: 'Ej. Sistema ERP personalizado...', lng: lang })}
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
                      <option value="">{t('projectModal.timeline_placeholder', { defaultValue: 'Seleccionar...', lng: lang })}</option>
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
                  {t('projectModal.pain_title', { defaultValue: '¿Cuáles son tus principales desafíos?', lng: lang })}
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
              <Globe size={12} className="text-[#C69320]" /> {t('contactForm.currentWeb', { defaultValue: 'Sitio Web Actual (si aplica)', lng: lang })}
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
              <AlertCircle size={12} className="text-[#C69320]" /> {t('contactForm.mainProblemLabel', { defaultValue: 'Problema o Necesidad Principal *', lng: lang })}
            </label>
            <textarea
              value={mainProblem}
              onChange={e => setMainProblem(e.target.value)}
              rows={3}
              placeholder={t('contactForm.placeholders.mainProblem', { defaultValue: 'Cuéntanos qué necesitas resolver, qué te motivó a buscar esta solución...', lng: lang })}
              className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
            />
            {renderError('mainProblem')}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#C69320]" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t('projectModal.features_title', { defaultValue: 'Funcionalidades de Interés', lng: lang })}
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
        <h3 className="text-lg font-bold text-white mb-1">{t('projectModal.goals_title', { defaultValue: 'Metas y Horizonte', lng: lang })}</h3>
        <p className="text-slate-400 text-xs">{t('projectModal.goals_subtitle', { defaultValue: 'Ayúdanos a entender tu visión para ofrecerte la mejor propuesta', lng: lang })}</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb size={12} className="text-[#C69320]" /> {t('projectModal.success_vision_label', { defaultValue: '¿Cómo te imaginas el resultado ideal?', lng: lang })}
        </label>
        <textarea
          value={goals.successVision}
          onChange={e => setGoals({ ...goals, successVision: e.target.value })}
          rows={3}
          placeholder={t('projectModal.success_vision_placeholder', { defaultValue: 'Describe cómo te gustaría que tu negocio opere con esta solución...', lng: lang })}
          className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={12} className="text-[#C69320]" /> {t('contactForm.deliveryHorizon', { defaultValue: 'Horizonte de Entrega *', lng: lang })}
          </label>
          <select
            value={goals.deadline}
            onChange={e => setGoals({ ...goals, deadline: e.target.value })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">{t('projectModal.timeline_placeholder', { defaultValue: 'Selecciona un plazo', lng: lang })}</option>
            {DEADLINES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {renderError('deadline')}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign size={12} className="text-[#C69320]" /> {t('projectModal.budget_label', { defaultValue: 'Presupuesto Estimado *', lng: lang })}
          </label>
          <select
            value={goals.budget}
            onChange={e => setGoals({ ...goals, budget: e.target.value })}
            className="w-full bg-[#131B2A] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">{t('projectModal.budget_placeholder', { defaultValue: 'Selecciona un rango', lng: lang })}</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          {renderError('budget')}
        </div>
      </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={12} className="text-[#C69320]" /> {t('projectModal.references_label', { defaultValue: 'Referencias o Inspiración', lng: lang })}
              </label>
              <textarea
                value={goals.references}
                onChange={e => setGoals({ ...goals, references: e.target.value })}
                rows={3}
                placeholder={t('projectModal.references_placeholder', { defaultValue: '¿Hay algún sitio web o plataforma que te guste como referencia? Puedes listar varios separados por comas...', lng: lang })}
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
          <h3 className="text-lg font-bold text-white mb-1">{t('projectModal.review_title', { defaultValue: 'Revisión Final', lng: lang })}</h3>
          <p className="text-slate-400 text-xs">{t('projectModal.review_subtitle', { defaultValue: 'Verifica que todo esté correcto antes de enviar', lng: lang })}</p>
        </div>

        <div className="bg-[#131B2A] border border-slate-700 rounded-xl divide-y divide-slate-700/50">
          <div className="p-4">
            <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('projectModal.step_contact', { defaultValue: 'Contacto', lng: lang })}</span>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <span>{t('projectModal.name_label', { defaultValue: 'Nombre', lng: lang }).replace(' *', '')}: <span className="text-white">{formData.fullName}</span></span>
              <span>Email: <span className="text-white">{formData.email}</span></span>
              <span>{t('projectModal.phone_label', { defaultValue: 'Teléfono', lng: lang }).replace(' *', '')}: <span className="text-white">{formData.phone}</span></span>
              <span>{t('projectModal.company_label', { defaultValue: 'Empresa', lng: lang })}: <span className="text-white">{formData.companyName || '—'}</span></span>
              <span>{t('contactForm.contactVia', { defaultValue: 'Contacto vía', lng: lang })}: <span className="text-white">{formData.preferredContact}</span></span>
            </div>
          </div>

          <div className="p-4">
            <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.project', { defaultValue: 'Proyecto', lng: lang })}</span>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p>{t('contactForm.type', { defaultValue: 'Tipo', lng: lang })}: <span className="text-white">{projectType}{otherProjectType ? ` — ${otherProjectType}` : ''}</span></p>
              <p>{t('contactForm.mainProblemReview', { defaultValue: 'Problema principal', lng: lang })}: <span className="text-white">{mainProblem}</span></p>
              {currentWebsite && <p>{t('contactForm.webReview', { defaultValue: 'Web actual', lng: lang })}: <span className="text-white">{currentWebsite}</span></p>}
            </div>
          </div>

          {dynamicQuestions.length > 0 && Object.entries(dynamicAnswers).filter(([, v]) => v).length > 0 && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('projectModal.profile_title', { defaultValue: 'Perfil del Negocio', lng: lang })}</span>
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
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.challengesToSolve', { defaultValue: 'Desafíos a Resolver', lng: lang })}</span>
              <div className="flex flex-wrap gap-1.5">
                {painLabels.map(p => (
                  <span key={p} className="px-2 py-0.5 bg-[#C69320]/10 text-[#FBE18D] rounded text-[10px] border border-[#C69320]/20">{p}</span>
                ))}
              </div>
            </div>
          )}

          {selectedFeatures.length > 0 && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('projectModal.features_title', { defaultValue: 'Funcionalidades', lng: lang })}</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedFeatures.map(f => (
                  <span key={f} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] border border-slate-600">{f}</span>
                ))}
              </div>
            </div>
          )}

          {goals.successVision && (
            <div className="p-4">
              <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.successVisionReview', { defaultValue: 'Visión de Éxito', lng: lang })}</span>
              <p className="text-xs text-slate-300">{goals.successVision}</p>
            </div>
          )}

          <div className="p-4">
            <span className="text-[9px] text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.horizonReview', { defaultValue: 'Horizonte', lng: lang })}</span>
            <div className="flex gap-4 text-xs text-slate-300">
              <span>{t('contactForm.deadlineReview', { defaultValue: 'Plazo', lng: lang })}: <span className="text-white">{goals.deadline}</span></span>
              <span>{t('projectModal.budget_label', { defaultValue: 'Presupuesto', lng: lang }).replace(' *', '')}: <span className="text-white">{goals.budget}</span></span>
            </div>
          </div>
        </div>

        <div className="bg-[#C69320]/10 border border-[#C69320]/30 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="text-[#FBE18D] shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-white font-bold text-xs mb-0.5">{t('contactForm.privacyTitle', { defaultValue: 'Privacidad Garantizada', lng: lang })}</h4>
            <p className="text-[10px] text-slate-400">{t('contactForm.privacyDesc', { defaultValue: 'Toda la información está protegida. Nunca compartiremos tus datos ni ideas.', lng: lang })}</p>
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
            <Bot size={14} /> {t('projectModal.title', { defaultValue: 'Diagnóstico Tecnológico', lng: lang })}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {getDynamicTitle()}
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-light">
            {t('contactForm.mainSubtitle', { defaultValue: 'Define tus objetivos estratégicos, identifica tus principales desafíos técnicos y obtén una propuesta de arquitectura de software en menos de 24 horas.', lng: lang })}
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
                   <h3 className="text-xl font-bold text-white mb-1">{t('projectModal.success_title', { defaultValue: '¡Diagnóstico Completado!', lng: lang })}</h3>
                   <p className="text-xs text-slate-400 max-w-md">
                     {t('contactForm.successDescText', { defaultValue: 'He recibido toda la información de tu proyecto. Realizaré un análisis técnico y te contactaré en menos de 24 horas.', lng: lang })}
                   </p>
                 </div>

                 <div className="flex gap-3 mt-4">
                   <a
                     href={`https://wa.me/50580610651?text=${encodeURIComponent(
                       lang === 'es'
                         ? `Hola Joseph acabo de enviar mi formulario con ID ${ticketNumber} para el análisis de mi proyecto tecnológico`
                         : lang === 'en'
                         ? `Hello Joseph, I just submitted my form with ID ${ticketNumber} for the technical analysis of my project`
                         : lang === 'fr'
                         ? `Bonjour Joseph, je viens de soumettre mon formulaire avec l'identifiant ${ticketNumber} pour l'analyse technique de mon projet`
                         : `您好Joseph，我剛剛提交了我的表格，ID為 ${ticketNumber}，用於我的專案技術分析`
                     )}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs"
                   >
                     {t('projectModal.talk_advisor', { defaultValue: 'Chat con Joseph Espinoza', lng: lang })}
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
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl transition-colors text-xs focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none"
                      >
                        <ChevronLeft size={14} /> {t('projectModal.previous', { defaultValue: 'Anterior', lng: lang })}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                      >
                        {t('projectModal.next', { defaultValue: 'Siguiente', lng: lang })} <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all disabled:opacity-70 disabled:hover:shadow-none text-xs focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                      >
                        {isSubmitting ? (
                          <><Loader2 size={14} className="animate-spin" /> {t('projectModal.submitting', { defaultValue: 'Analizando...', lng: lang })}</>
                        ) : (
                          <><Send size={14} /> {t('projectModal.submit', { defaultValue: 'Enviar Diagnóstico', lng: lang })}</>
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

const ContactSectionWrapper = ({ lang }: { lang: Language }) => (
  <Suspense fallback={<div className="py-24 text-center text-slate-400">Cargando formulario...</div>}>
    <ContactSection lang={lang} />
  </Suspense>
);

export default ContactSectionWrapper;
