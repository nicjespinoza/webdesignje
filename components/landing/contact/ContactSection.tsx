"use client";

import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, Loader2, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';
import { fadeInUp } from '@/components/landing/animations';
import { useContactForm } from './useContactForm';
import StepIndicator from './StepIndicator';
import Step0Contact from './Step0Contact';
import Step1Profile from './Step1Profile';
import Step2Goals from './Step2Goals';
import Step3Review from './Step3Review';
import SuccessView from './SuccessView';

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

function ContactForm({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const form = useContactForm(lang);

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C69320]/10 text-[#FBE18D] text-xs uppercase font-bold tracking-widest mb-4 border border-[#C69320]/20">
            <Bot size={14} /> {t('projectModal.title', { defaultValue: 'Diagnóstico Tecnológico', lng: lang })}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {form.getDynamicTitle()}
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
            {form.isSubmitted ? (
              <SuccessView lang={lang} ticketNumber={form.ticketNumber} />
            ) : (
              <>
                <StepIndicator steps={form.STEPS.map((s: { id: string; label: string }) => s.label)} currentStep={form.step} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={form.step}
                    custom={form.direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {form.step === 0 && (
                      <Step0Contact
                        lang={lang}
                        formData={form.formData}
                        setFormData={form.setFormData}
                        errors={form.errors}
                      />
                    )}
                    {form.step === 1 && (
                      <Step1Profile
                        lang={lang}
                        projectType={form.projectType}
                        setProjectType={form.setProjectType}
                        otherProjectType={form.otherProjectType}
                        setOtherProjectType={form.setOtherProjectType}
                        currentWebsite={form.currentWebsite}
                        setCurrentWebsite={form.setCurrentWebsite}
                        mainProblem={form.mainProblem}
                        setMainProblem={form.setMainProblem}
                        dynamicAnswers={form.dynamicAnswers}
                        setDynamicAnswers={form.setDynamicAnswers}
                        selectedPainPoints={form.selectedPainPoints}
                        togglePainPoint={form.togglePainPoint}
                        selectedFeatures={form.selectedFeatures}
                        toggleFeature={form.toggleFeature}
                        PROJECT_TYPES={form.PROJECT_TYPES}
                        dynamicQuestions={form.dynamicQuestions}
                        painPoints={form.painPoints}
                        FEATURES={form.FEATURES}
                        errors={form.errors}
                      />
                    )}
                    {form.step === 2 && (
                      <Step2Goals
                        lang={lang}
                        goals={form.goals}
                        setGoals={form.setGoals}
                        BUDGETS={form.BUDGETS}
                        DEADLINES={form.DEADLINES}
                        errors={form.errors}
                      />
                    )}
                    {form.step === 3 && (
                      <Step3Review
                        lang={lang}
                        formData={form.formData}
                        projectType={form.projectType}
                        otherProjectType={form.otherProjectType}
                        currentWebsite={form.currentWebsite}
                        mainProblem={form.mainProblem}
                        dynamicAnswers={form.dynamicAnswers}
                        selectedPainPoints={form.selectedPainPoints}
                        selectedFeatures={form.selectedFeatures}
                        goals={form.goals}
                        dynamicQuestions={form.dynamicQuestions}
                        painPoints={form.painPoints}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    {form.step > 0 && (
                      <button
                        type="button"
                        onClick={form.goBack}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl transition-colors text-xs"
                      >
                        <ChevronLeft size={14} /> {t('projectModal.previous', { defaultValue: 'Anterior', lng: lang })}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {form.step < form.STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={form.goNext}
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all text-xs"
                      >
                        {t('projectModal.next', { defaultValue: 'Siguiente', lng: lang })} <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={form.isSubmitting}
                        onClick={form.handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(198,147,32,0.4)] transition-all disabled:opacity-70 disabled:hover:shadow-none text-xs"
                      >
                        {form.isSubmitting ? (
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
}

const ContactSectionWrapper = ({ lang }: { lang: Language }) => (
  <Suspense fallback={<div className="py-24 text-center text-slate-400">Cargando formulario...</div>}>
    <ContactForm lang={lang} />
  </Suspense>
);

export default ContactSectionWrapper;
