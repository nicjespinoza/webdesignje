import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  User, Briefcase, Terminal
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUp, staggerContainer } from '@/components/landing/animations';
import { Language } from '@/components/landing/types';

const AboutSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative z-10 flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white text-center">
            {(() => {
              const fullTitle = t('about.title', { lng: lang });
              if (fullTitle.includes(' ')) {
                const words = fullTitle.split(' ');
                const first = words.slice(0, words.length - 1).join(' ');
                const last = words[words.length - 1];
                return <>{first} <span className="gradient-text">{last}</span></>;
              }
              return <span className="gradient-text">{fullTitle}</span>;
            })()}
          </h2>
          <p className="text-xl text-white mb-6 font-medium text-center max-w-2xl">{t('about.motto', { lng: lang })}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10">
            <motion.div variants={fadeInUp} className="liquid-gold-card">
              <div className="liquid-gold-content !p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">JOSEPH ESPINOZA</h3>
                <p className="text-slate-300 mb-4 whitespace-pre-line text-base md:text-lg leading-relaxed">
                  {t('about.description_1', { lng: lang }).split('Full-Stack').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <span className="gradient-text font-bold">FULL-STACK</span>}
                    </React.Fragment>
                  ))}
                </p>
                <p className="text-slate-300 text-base md:text-lg">
                  {t('about.description_2', { lng: lang })}
                </p>
                <p className="text-slate-300 mt-4 text-lg">
                  {t('about.description_3', { lng: lang })} <span className="gradient-text font-bold text-xl">{t('about.performance_quote', { lng: lang })}</span>
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
              {Array.isArray(t('about.stats', { returnObjects: true, lng: lang })) && (t('about.stats', { returnObjects: true, lng: lang }) as Record<string, string>[]).map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="liquid-gold-card"
                >
                  <div className="liquid-gold-content !p-4 flex flex-row items-center gap-4 h-full">
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
            <div className="liquid-gold-card !p-[1.5px] rounded-3xl">
              <div className="liquid-gold-content !p-4 md:!p-8 rounded-3xl h-full flex items-center justify-center">
                <div className="aspect-square w-full bg-black rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
                  <Image src="/images/Perfil_elegante.png" alt="Joseph Espinoza" width={600} height={600} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" priority />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
