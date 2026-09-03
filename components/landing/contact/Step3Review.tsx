"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';
import { ContactFormData, GoalsData, DynamicQuestion, PainPoint } from './useContactForm';

interface Step3ReviewProps {
  lang: Language;
  formData: ContactFormData;
  projectType: string;
  otherProjectType: string;
  currentWebsite: string;
  mainProblem: string;
  dynamicAnswers: Record<string, string>;
  selectedPainPoints: string[];
  selectedFeatures: string[];
  goals: GoalsData;
  dynamicQuestions: DynamicQuestion[];
  painPoints: PainPoint[];
}

export default function Step3Review({
  lang, formData, projectType, otherProjectType, currentWebsite,
  mainProblem, dynamicAnswers, selectedPainPoints, selectedFeatures,
  goals, dynamicQuestions, painPoints
}: Step3ReviewProps) {
  const { t } = useTranslation();

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

      <div className="bg-[#14151a] border border-slate-700 rounded-xl divide-y divide-slate-700/50">
        <div className="p-4">
          <span className="text-xs text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('projectModal.step_contact', { defaultValue: 'Contacto', lng: lang })}</span>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <span>{t('projectModal.name_label', { defaultValue: 'Nombre', lng: lang }).replace(' *', '')}: <span className="text-white">{formData.fullName}</span></span>
            <span>Email: <span className="text-white">{formData.email}</span></span>
            <span>{t('projectModal.phone_label', { defaultValue: 'Teléfono', lng: lang }).replace(' *', '')}: <span className="text-white">{formData.phone}</span></span>
            <span>{t('projectModal.company_label', { defaultValue: 'Empresa', lng: lang })}: <span className="text-white">{formData.companyName || '—'}</span></span>
            <span>{t('contactForm.contactVia', { defaultValue: 'Contacto vía', lng: lang })}: <span className="text-white">{formData.preferredContact}</span></span>
          </div>
        </div>

        <div className="p-4">
          <span className="text-xs text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.project', { defaultValue: 'Proyecto', lng: lang })}</span>
          <div className="space-y-1.5 text-xs text-slate-300">
            <p>{t('contactForm.type', { defaultValue: 'Tipo', lng: lang })}: <span className="text-white">{projectType}{otherProjectType ? ` — ${otherProjectType}` : ''}</span></p>
            <p>{t('contactForm.mainProblemReview', { defaultValue: 'Problema principal', lng: lang })}: <span className="text-white">{mainProblem}</span></p>
            {currentWebsite && <p>{t('contactForm.webReview', { defaultValue: 'Web actual', lng: lang })}: <span className="text-white">{currentWebsite}</span></p>}
          </div>
        </div>

        {dynamicQuestions.length > 0 && Object.entries(dynamicAnswers).filter(([, v]) => v).length > 0 && (
          <div className="p-4">
            <span className="text-xs text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('projectModal.profile_title', { defaultValue: 'Perfil del Negocio', lng: lang })}</span>
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
            <span className="text-xs text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.challengesToSolve', { defaultValue: 'Desafíos a Resolver', lng: lang })}</span>
            <div className="flex flex-wrap gap-1.5">
              {painLabels.map(p => (
                <span key={p} className="px-2 py-0.5 bg-[#C69320]/10 text-[#FBE18D] rounded text-xs border border-[#C69320]/20">{p}</span>
              ))}
            </div>
          </div>
        )}

        {selectedFeatures.length > 0 && (
          <div className="p-4">
            <span className="text-xs text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('projectModal.features_title', { defaultValue: 'Funcionalidades', lng: lang })}</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedFeatures.map(f => (
                <span key={f} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs border border-slate-600">{f}</span>
              ))}
            </div>
          </div>
        )}

        {goals.successVision && (
          <div className="p-4">
            <span className="text-xs text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.successVisionReview', { defaultValue: 'Visión de Éxito', lng: lang })}</span>
            <p className="text-xs text-slate-300">{goals.successVision}</p>
          </div>
        )}

        <div className="p-4">
          <span className="text-xs text-[#C69320] font-bold uppercase tracking-wider block mb-2">{t('contactForm.horizonReview', { defaultValue: 'Horizonte', lng: lang })}</span>
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
          <p className="text-xs text-slate-400">{t('contactForm.privacyDesc', { defaultValue: 'Toda la información está protegida. Nunca compartiremos tus datos ni ideas.', lng: lang })}</p>
        </div>
      </div>
    </div>
  );
}
