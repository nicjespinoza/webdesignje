"use client";

import React from 'react';
import { Lightbulb, Calendar, DollarSign, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';
import { GoalsData } from './useContactForm';
import FormError from './FormError';

interface Step2GoalsProps {
  lang: Language;
  goals: GoalsData;
  setGoals: (g: GoalsData) => void;
  BUDGETS: string[];
  DEADLINES: string[];
  errors: Record<string, string>;
}

export default function Step2Goals({ lang, goals, setGoals, BUDGETS, DEADLINES, errors }: Step2GoalsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">{t('projectModal.goals_title', { defaultValue: 'Metas y Horizonte', lng: lang })}</h3>
        <p className="text-slate-400 text-xs">{t('projectModal.goals_subtitle', { defaultValue: 'Ayúdanos a entender tu visión para ofrecerte la mejor propuesta', lng: lang })}</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb size={12} className="text-[#C69320]" /> {t('projectModal.success_vision_label', { defaultValue: '¿Cómo te imaginas el resultado ideal?', lng: lang })}
        </label>
        <textarea
          value={goals.successVision}
          onChange={e => setGoals({ ...goals, successVision: e.target.value })}
          rows={3}
          placeholder={t('projectModal.success_vision_placeholder', { defaultValue: 'Describe cómo te gustaría que tu negocio opere con esta solución...', lng: lang })}
          className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={12} className="text-[#C69320]" /> {t('contactForm.deliveryHorizon', { defaultValue: 'Horizonte de Entrega *', lng: lang })}
          </label>
          <select
            value={goals.deadline}
            onChange={e => setGoals({ ...goals, deadline: e.target.value })}
            className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">{t('projectModal.timeline_placeholder', { defaultValue: 'Selecciona un plazo', lng: lang })}</option>
            {DEADLINES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <FormError message={errors.deadline} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign size={12} className="text-[#C69320]" /> {t('projectModal.budget_label', { defaultValue: 'Presupuesto Estimado *', lng: lang })}
          </label>
          <select
            value={goals.budget}
            onChange={e => setGoals({ ...goals, budget: e.target.value })}
            className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white transition-colors outline-none appearance-none text-sm"
          >
            <option value="">{t('projectModal.budget_placeholder', { defaultValue: 'Selecciona un rango', lng: lang })}</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <FormError message={errors.budget} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Clock size={12} className="text-[#C69320]" /> {t('projectModal.references_label', { defaultValue: 'Referencias o Inspiración', lng: lang })}
        </label>
        <textarea
          value={goals.references}
          onChange={e => setGoals({ ...goals, references: e.target.value })}
          rows={3}
          placeholder={t('projectModal.references_placeholder', { defaultValue: '¿Hay algún sitio web o plataforma que te guste como referencia? Puedes listar varios separados por comas...', lng: lang })}
          className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none resize-none text-sm"
        />
      </div>
    </div>
  );
}
