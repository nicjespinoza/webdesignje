import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUp } from '@/components/landing/animations';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-16 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="liquid-gold-card relative z-10"
        >
          <div className="liquid-gold-content p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                {t('contact.title')} <span className="gradient-text">{t('contact.title_accent')}</span>
              </h2>
              <p className="text-slate-400 text-lg">
                {t('contact.subtitle')}
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-bold text-slate-300 font-sans uppercase tracking-wider">{t('contact.name_label')} <span className="text-red-500">*</span></label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors font-sans focus-visible:ring-2 focus-visible:ring-[#FBE18D]"
                    placeholder={t('contact.name_placeholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-bold text-slate-300 font-sans uppercase tracking-wider">{t('contact.email_label')} <span className="text-red-500">*</span></label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors font-sans focus-visible:ring-2 focus-visible:ring-[#FBE18D]"
                    placeholder={t('contact.email_placeholder')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-project" className="text-sm font-bold text-slate-300 font-sans uppercase tracking-wider">{t('contact.project_label')} <span className="text-red-500">*</span></label>
                <textarea
                  id="contact-project"
                  rows={5}
                  required
                  className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors resize-none font-sans focus-visible:ring-2 focus-visible:ring-[#FBE18D]"
                  placeholder={t('contact.project_placeholder')}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <p className="text-xs text-slate-400 flex items-center gap-2 font-sans font-medium uppercase tracking-tight">
                  <CheckCircle className="text-[#FBE18D]" size={16} />
                  {t('contact.response_time')}
                </p>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#C69320] to-[#FBE18D] hover:brightness-110 text-black rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C69320]/20 text-base group font-sans uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[#FBE18D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020202] focus-visible:outline-none"
                >
                  {t('contact.cta')}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="mt-12 flex justify-center gap-8 border-t border-[#C69320]/10 pt-8">
              <a href="#" aria-label="Perfil de GitHub" title="Perfil de GitHub" className="text-slate-500 hover:text-[#FBE18D] transition-colors transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#FBE18D] focus-visible:outline-none rounded-md"><Github size={22} /></a>
              <a href="#" aria-label="Perfil de LinkedIn" title="Perfil de LinkedIn" className="text-slate-500 hover:text-[#FBE18D] transition-colors transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#FBE18D] focus-visible:outline-none rounded-md"><Linkedin size={22} /></a>
              <a href="#" aria-label="Perfil de Twitter" title="Perfil de Twitter" className="text-slate-500 hover:text-[#FBE18D] transition-colors transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#FBE18D] focus-visible:outline-none rounded-md"><Twitter size={22} /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
