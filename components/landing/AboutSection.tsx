import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  User, Briefcase, Terminal
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUp, staggerContainer } from '@/components/landing/animations';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative z-10 flex flex-col items-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-6">
            <User size={14} /> {t('about.badge')}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white text-center">Sobre <span className="gradient-text">Mí</span></h2>
          <p className="text-xl text-white mb-6 font-medium text-center max-w-2xl">{t('about.motto')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-6 relative z-10"
          >
            <motion.div variants={fadeInUp} className="liquid-gold-card">
              <div className="liquid-gold-content">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Joseph Espinoza</h3>
                <p className="text-slate-300 mb-4 whitespace-pre-line">
                  {t('about.description_1').split('full-stack').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="gradient-text font-bold">full-stack</span>}
                    </React.Fragment>
                  ))}
                </p>
                <p className="text-slate-300">
                  {t('about.description_2')}
                </p>
                <p className="text-slate-300 mt-4">
                  {t('about.description_3')} <span className="gradient-text font-bold">{t('about.performance_quote')}</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {Array.isArray(t('about.stats', { returnObjects: true })) && (t('about.stats', { returnObjects: true }) as any[]).map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="liquid-gold-card"
                >
                  <div className="liquid-gold-content !p-4 flex-row items-center gap-4">
                    <div className="bg-[#FBE18D]/10 p-3 rounded-lg text-[#FBE18D] transition-transform duration-300">
                      {index === 0 && <Briefcase size={20} />}
                      {index === 1 && <Terminal size={20} />}
                      {index === 2 && <User size={20} />}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm tracking-tight gradient-text">{item.label}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{item.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-panel p-4 md:p-8 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-[#C69320]/20 to-[#FBE18D]/20 rounded-xl flex items-center justify-center overflow-hidden">
                <Image src="/images/Perfil_elegante.png" alt="Joseph Espinoza" width={800} height={800} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" priority />
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 relative z-10"
        >
          {Array.isArray(t('about.kpis', { returnObjects: true })) && (t('about.kpis', { returnObjects: true }) as any[]).map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="glass-panel p-6 rounded-2xl text-center border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
            >
              <div className="text-3xl font-bold mb-2 text-[#FBE18D]">{stat.val}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
