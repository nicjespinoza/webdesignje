import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Cpu, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { services } from '@/data/constants';
import { fadeInUp, staggerContainer } from '@/components/landing/animations';

const ServicesSection = () => {
  const { t } = useTranslation();
  
  // High-reliability data extraction
  const servicesItems = t('services.items', { returnObjects: true }) as any;
  const items = Array.isArray(servicesItems) ? servicesItems : services;

  return (
    <section id="services" className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-xs font-bold mb-4 group">
            <Star size={14} className="text-slate-300 group-hover:text-[#FBE18D]" /> 
            <span className="gradient-text-platinum group-hover:gradient-text">{t('services.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="gradient-text-platinum mt-4 max-w-3xl text-center">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {items.map((service: any, index: number) => (
            <motion.div
              key={service?.title || index}
              variants={fadeInUp}
              className="liquid-gold-card"
            >
              <div className="liquid-gold-content h-full">
                <div className="bg-[#FBE18D]/10 p-3 rounded-xl text-slate-300 w-fit mb-6 group-hover:scale-110 group-hover:text-[#FBE18D] transition-transform">
                  {index === 0 && <Code2 size={24} />}
                  {index === 1 && <Smartphone size={24} />}
                  {index === 2 && <Cpu size={24} />}
                </div>
                <h3 className="text-xl font-bold mb-4 gradient-text">{service?.title}</h3>
                <p className="text-slate-400 mb-6 flex-grow text-sm">{service?.description}</p>
                <ul className="space-y-2 mt-auto">
                  {Array.isArray(service?.features) && service.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 bg-[#FBE18D] rounded-full shadow-[0_0_8px_#FBE18D]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
