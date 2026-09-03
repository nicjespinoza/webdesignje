"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Language } from '@/components/landing/types';

export interface DynamicQuestion {
  label: string;
  name: string;
  type: 'text' | 'select';
  placeholder?: string;
  options?: string[];
}

export interface PainPoint {
  label: string;
  value: string;
  benefit: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  preferredContact: string;
}

export interface ProfileData {
  projectType: string;
  otherProjectType: string;
  currentWebsite: string;
  mainProblem: string;
  dynamicAnswers: Record<string, string>;
  selectedPainPoints: string[];
  selectedFeatures: string[];
}

export interface GoalsData {
  successVision: string;
  budget: string;
  deadline: string;
  references: string;
}

export function useContactForm(lang: Language) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  // Form navigation
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 0: Contact data
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    preferredContact: 'email',
  });

  // Step 1: Profile data
  const [projectType, setProjectType] = useState('');
  const [otherProjectType, setOtherProjectType] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [mainProblem, setMainProblem] = useState('');
  const [dynamicAnswers, setDynamicAnswers] = useState<Record<string, string>>({});
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Step 2: Goals data
  const [goals, setGoals] = useState<GoalsData>({
    successVision: '',
    budget: '',
    deadline: '',
    references: '',
  });

  // Translation-driven config
  const PROJECT_TYPES = useMemo(() => {
    const items = t('contact.projectTypes', { returnObjects: true, lng: lang });
    return Array.isArray(items) ? items : [];
  }, [lang, t]);

  const PROJECT_SPECIFIC_QUESTIONS = useMemo(() => {
    return t('contact.projectQuestions', { returnObjects: true, lng: lang }) as Record<string, DynamicQuestion[]>;
  }, [lang, t]);

  const PAIN_POINTS = useMemo(() => {
    const items = t('contact.painPoints', { returnObjects: true, lng: lang });
    return Array.isArray(items) ? (items as PainPoint[]) : [];
  }, [lang, t]);

  const FEATURES = useMemo(() => {
    const items = t('contact.features', { returnObjects: true, lng: lang });
    return Array.isArray(items) ? items : [];
  }, [lang, t]);

  const BUDGETS = useMemo(() => {
    const items = t('contact.budgets', { returnObjects: true, lng: lang });
    return Array.isArray(items) ? items : [];
  }, [lang, t]);

  const DEADLINES = useMemo(() => {
    const items = t('contact.deadlines', { returnObjects: true, lng: lang });
    return Array.isArray(items) ? items : [];
  }, [lang, t]);

  const STEPS = useMemo(() => {
    const items = t('contact.steps', { returnObjects: true, lng: lang });
    return Array.isArray(items) ? items : [];
  }, [lang, t]);

  // Derived data
  const dynamicQuestions = useMemo(() => {
    if (!projectType || !PROJECT_SPECIFIC_QUESTIONS) return [];
    return PROJECT_SPECIFIC_QUESTIONS[projectType] || [];
  }, [projectType, PROJECT_SPECIFIC_QUESTIONS]);

  const painPoints = useMemo(() => {
    if (!projectType || !PAIN_POINTS) return [];
    return PAIN_POINTS.filter((p: PainPoint) => {
      const key = `painPoints.${projectType}`;
      const items = t(key, { returnObjects: true, lng: lang });
      return Array.isArray(items) && items.includes(p.value);
    });
  }, [projectType, PAIN_POINTS, t, lang]);

  // Pre-populate from URL params
  useEffect(() => {
    const projectParam = searchParams?.get('project');
    const serviceParam = searchParams?.get('service');
    if (projectParam) setProjectType(projectParam);
    if (serviceParam) setProjectType(serviceParam);
  }, [searchParams]);

  // Validation
  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (s === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
    }
    if (s === 1) {
      if (!projectType) newErrors.projectType = t('contact.errors.projectType', { lng: lang });
      if (!mainProblem.trim()) newErrors.mainProblem = t('contact.errors.mainProblem', { lng: lang });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep(s => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  // Toggle helpers
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

  // Dynamic title
  const getDynamicTitle = (): string => {
    if (step === 0) {
      return lang === 'es'
        ? 'Diseñemos la arquitectura digital de tu negocio'
        : lang === 'en'
        ? 'Let’s design the digital architecture of your business'
        : lang === 'fr'
        ? 'Concevons l’architecture numérique de votre entreprise'
        : '讓我們為您的企業設計數位架構';
    }
    if (step === 1) {
      return lang === 'es'
        ? 'Perfil y Desafíos del Proyecto'
        : lang === 'en'
        ? 'Project Profile & Challenges'
        : lang === 'fr'
        ? 'Profil et Défis du Projet'
        : '專案檔案與挑戰';
    }
    if (step === 2) {
      return lang === 'es'
        ? 'Objetivos, Plazo y Presupuesto'
        : lang === 'en'
        ? 'Goals, Timeline & Budget'
        : lang === 'fr'
        ? 'Objectifs, Délai et Budget'
        : '目標、時間表與預算';
    }
    return lang === 'es'
      ? 'Resumen y Diagnóstico Tecnológico'
      : lang === 'en'
      ? 'Summary & Technology Diagnosis'
      : lang === 'fr'
      ? 'Résumé et Diagnostic Technologique'
      : '摘要與技術診斷';
  };

  // Submit
  const handleSubmit = async () => {
    if (!validateStep(1)) return;
    setIsSubmitting(true);

    try {
      const painLabels = selectedPainPoints.map(v => {
        const pp = painPoints.find(p => p.value === v);
        return pp?.label || v;
      });

      const newTicket = `WEB-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
      setTicketNumber(newTicket);

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
        ticketNumber: newTicket,
        status: "Nuevo",
        source: searchParams?.get('project') ? `proyecto_${searchParams.get('project')}` : 'formulario_principal',
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);

      // Disparar notificación en segundo plano (no bloqueante)
      fetch('/api/lead-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          projectType,
          mainProblem,
          budget: goals.budget,
          ticketNumber: newTicket,
        }),
      }).catch(err => console.error("Lead notify dispatch error:", err));
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error('Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Navigation
    step,
    direction,
    setStep,
    goNext,
    goBack,
    // Submission
    isSubmitted,
    isSubmitting,
    ticketNumber,
    // Step 0
    formData,
    setFormData,
    // Step 1
    projectType,
    setProjectType,
    otherProjectType,
    setOtherProjectType,
    currentWebsite,
    setCurrentWebsite,
    mainProblem,
    setMainProblem,
    dynamicAnswers,
    setDynamicAnswers,
    selectedPainPoints,
    togglePainPoint,
    selectedFeatures,
    toggleFeature,
    // Step 2
    goals,
    setGoals,
    // Config
    PROJECT_TYPES,
    PROJECT_SPECIFIC_QUESTIONS,
    PAIN_POINTS,
    FEATURES,
    BUDGETS,
    DEADLINES,
    STEPS,
    // Derived
    dynamicQuestions,
    painPoints,
    // Validation
    errors,
    validateStep,
    // Helpers
    getDynamicTitle,
    handleSubmit,
  };
}
