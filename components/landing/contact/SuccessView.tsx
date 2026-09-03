"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';

interface SuccessViewProps {
  lang: Language;
  ticketNumber: string;
}

export default function SuccessView({ lang, ticketNumber }: SuccessViewProps) {
  const { t } = useTranslation();

  return (
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
  );
}
