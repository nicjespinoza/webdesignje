"use client";

import React from 'react';
import { LayoutDashboard, Globe, AlertCircle, Sparkles, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';
import { DynamicQuestion, PainPoint } from './useContactForm';
import FormError from './FormError';

interface Step1ProfileProps {
  lang: Language;
  projectType: string;
  setProjectType: (v: string) => void;
  otherProjectType: string;
  setOtherProjectType: (v: string) => void;
  currentWebsite: string;
  setCurrentWebsite: (v: string) => void;
  mainProblem: string;
  setMainProblem: (v: string) => void;
  dynamicAnswers: Record<string, string>;
  setDynamicAnswers: (v: Record<string, string>) => void;
  selectedPainPoints: string[];
  togglePainPoint: (v: string) => void;
  selectedFeatures: string[];
  toggleFeature: (v: string) => void;
  PROJECT_TYPES: { id: string; label: string; icon: React.ElementType }[];
  dynamicQuestions: DynamicQuestion[];
  painPoints: PainPoint[];
  FEATURES: string[];
  errors: Record<string, string>;
}

export default function Step1Profile({
  lang, projectType, setProjectType, otherProjectType, setOtherProjectType,
  currentWebsite, setCurrentWebsite, mainProblem, setMainProblem,
  dynamicAnswers, setDynamicAnswers, selectedPainPoints, togglePainPoint,
  selectedFeatures, toggleFeature, PROJECT_TYPES, dynamicQuestions,
  painPoints, FEATURES, errors
}: Step1ProfileProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">{t('projectModal.profile_title', { defaultValue: 'Perfil de tu Negocio', lng: lang })}</h3>
        <p className="text-slate-400 text-xs">{t('projectModal.profile_subtitle', { defaultValue: 'Cuéntanos más sobre tu operación actual', lng: lang })}</p>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
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
                  togglePainPoint('');
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#C69320]/20 to-[#C69320]/5 border-[#FBE18D]'
                    : 'bg-[#14151a] border-slate-700 hover:border-slate-500'
                }`}
              >
                <Icon size={20} className={isSelected ? 'text-[#FBE18D]' : 'text-slate-500'} />
                <span className={`text-xs font-medium leading-tight ${isSelected ? 'text-white' : 'text-slate-400'}`}>{type.label}</span>
              </button>
            );
          })}
        </div>
        <FormError message={errors.projectType} />
      </div>

      {projectType === "Otro" && (
        <div className="space-y-1.5 animate-in fade-in">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t('contactForm.specifyType', { defaultValue: 'Especifica el tipo de proyecto', lng: lang })}</label>
          <input
            type="text"
            value={otherProjectType}
            onChange={e => setOtherProjectType(e.target.value)}
            placeholder={t('contactForm.placeholders.specifyType', { defaultValue: 'Ej. Sistema ERP personalizado...', lng: lang })}
            className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
        </div>
      )}

      {projectType && (
        <>
          {dynamicQuestions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dynamicQuestions.map((q, idx) => (
                <div key={idx} className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{q.label}</label>
                  {q.type === 'select' ? (
                    <select
                      value={dynamicAnswers[q.name] || ''}
                      onChange={e => setDynamicAnswers({ ...dynamicAnswers, [q.name]: e.target.value })}
                      className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
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
                      className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
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
                          : 'bg-[#14151a] border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-[#C69320] border-[#C69320]' : 'border-slate-500'
                      }`}>
                        {isSelected && <Check size={11} className="text-black" />}
                      </div>
                      <div>
                        <span className="text-xs text-white block leading-tight">{pp.label}</span>
                        <span className="text-[10px] text-[#C69320]/70 mt-0.5 block">{pp.benefit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe size={12} className="text-[#C69320]" /> {t('contactForm.currentWeb', { defaultValue: 'Sitio Web Actual (si aplica)', lng: lang })}
            </label>
            <input
              type="url"
              value={currentWebsite}
              onChange={e => setCurrentWebsite(e.target.value)}
              placeholder="https://www.tuempresa.com"
              className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle size={12} className="text-[#C69320]" /> {t('contactForm.mainProblemLabel', { defaultValue: 'Problema o Necesidad Principal *', lng: lang })}
            </label>
            <textarea
              value={mainProblem}
              onChange={e => setMainProblem(e.target.value)}
              rows={3}
              placeholder={t('contactForm.placeholders.mainProblem', { defaultValue: 'Cuéntanos qué necesitas resolver, qué te motivó a buscar esta solución...', lng: lang })}
              className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
            />
            <FormError message={errors.mainProblem} />
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
                        : 'bg-[#14151a] border-slate-700 hover:border-slate-500'
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
}
