import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Paintbrush, Headphones, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUp, staggerContainer } from '@/components/landing/animations';
import { Language } from '@/components/landing/types';

const WhyChooseSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: Clock,
      title: t('whyChoose.reason1.title', { lng: lang }),
      desc: t('whyChoose.reason1.desc', { lng: lang }),
    },
    {
      icon: Paintbrush,
      title: t('whyChoose.reason2.title', { lng: lang }),
      desc: t('whyChoose.reason2.desc', { lng: lang }),
    },
    {
      icon: Headphones,
      title: t('whyChoose.reason3.title', { lng: lang }),
      desc: t('whyChoose.reason3.desc', { lng: lang }),
    },
    {
      icon: DollarSign,
      title: t('whyChoose.reason4.title', { lng: lang }),
      desc: t('whyChoose.reason4.desc', { lng: lang }),
    },
  ];

  return (
    <section className="py-12 md:py-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {(() => {
              const fullTitle = t('whyChoose.title', { lng: lang });
              if (fullTitle.includes(' ')) {
                const parts = fullTitle.split(' ');
                const first = parts[0];
                const rest = parts.slice(1).join(' ');
                return <><span className="text-white">{first}</span> <span className="gradient-text">{rest}</span></>;
              }
              return <span className="gradient-text">{fullTitle}</span>;
            })()}
          </h2>
          <p className="text-white mt-4 max-w-xl text-center text-lg">
            {t('whyChoose.subtitle', { lng: lang })}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="liquid-gold-card text-center"
            >
              <div className="liquid-gold-content !p-8">
                <div className="bg-[#FBE18D]/10 p-4 rounded-2xl text-[#FBE18D] w-fit mx-auto mb-6 shadow-inner border border-[#C69320]/20">
                  <reason.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{reason.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
