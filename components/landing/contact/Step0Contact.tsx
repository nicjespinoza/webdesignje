"use client";

import React from 'react';
import { User, Mail, Phone, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';
import { ContactFormData } from './useContactForm';
import FormError from './FormError';

interface Step0ContactProps {
  lang: Language;
  formData: ContactFormData;
  setFormData: (data: ContactFormData) => void;
  errors: Record<string, string>;
}

export default function Step0Contact({ lang, formData, setFormData, errors }: Step0ContactProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold text-white mb-1">{t('projectModal.contact_title', { defaultValue: 'Tu Información de Contacto', lng: lang })}</h3>
        <p className="text-slate-400 text-xs">{t('projectModal.contact_subtitle', { defaultValue: 'Para enviarte el diagnóstico personalizado y propuesta', lng: lang })}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <User size={12} className="text-[#C69320]" /> {t('projectModal.name_label', { defaultValue: 'Nombre Completo *', lng: lang })}
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            placeholder={t('contactForm.placeholders.fullName', { defaultValue: 'Ej. Juan Pérez', lng: lang })}
            className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          <FormError message={errors.fullName} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 size={12} className="text-[#C69320]" /> {t('projectModal.company_label', { defaultValue: 'Empresa / Negocio', lng: lang })}
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            placeholder={t('contactForm.placeholders.company', { defaultValue: 'Nombre de tu empresa (opcional)', lng: lang })}
            className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mail size={12} className="text-[#C69320]" /> {t('projectModal.email_label', { defaultValue: 'Correo Electrónico *', lng: lang })}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="juan@empresa.com"
            className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          <FormError message={errors.email} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Phone size={12} className="text-[#C69320]" /> {t('projectModal.phone_label', { defaultValue: 'Teléfono / WhatsApp', lng: lang })} *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+505 8000 0000"
            className="w-full bg-[#14151a] border border-slate-700 focus:border-[#C69320] rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-colors outline-none text-sm"
          />
          <FormError message={errors.phone} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t('contactForm.howContact', { defaultValue: '¿Cómo prefieres que te contacte?', lng: lang })}</label>
        <div className="grid grid-cols-2 gap-3">
          {["WhatsApp", "Email"].map(method => (
            <button
              key={method}
              type="button"
              onClick={() => setFormData({ ...formData, preferredContact: method })}
              className={`p-3 rounded-xl border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69320] ${
                formData.preferredContact === method
                  ? 'bg-[#C69320]/20 border-[#FBE18D] text-white'
                  : 'bg-[#14151a] border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
