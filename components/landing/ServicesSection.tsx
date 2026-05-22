import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Cpu, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { services } from '@/data/constants';
import { fadeInUp, staggerContainer } from '@/components/landing/animations';
import { Language } from '@/components/landing/types';

const ServicesSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();
  const router = useRouter();
  
  const handleServiceClick = (serviceTitle: string) => {
    const serviceSlug = serviceTitle.toLowerCase().replace(/ /g, '-');
    router.push(`/#contact?service=${serviceSlug}`);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // High-reliability reactive data extraction using useMemo to prevent unnecessary calculations
  // We use the language as a key or dependency to ensure fresh extraction
  const items = React.useMemo(() => {
    // Attempt to get items from the current active language
    const servicesItems = t('services.items', { returnObjects: true, lng: lang });
    
    // Safety check: ensure it is a non-empty array
    if (Array.isArray(servicesItems) && servicesItems.length > 0 && typeof servicesItems[0] === 'object') {
      return servicesItems;
    }
    
    // Final fallback: the hardcoded Spanish services from constants
    return services;
  }, [t, lang]); // Re-calculate whenever translation function or language prop changes

  return (
    <section id="services" className="py-16 relative" key={lang}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-xs font-bold mb-4 group">
            <Star size={14} className="text-slate-300 group-hover:text-[#FBE18D]" /> 
            <span className="gradient-text-platinum group-hover:gradient-text">{t('services.badge', { lng: lang })}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {(() => {
              const fullTitle = t('services.title', { lng: lang });
              const parts = fullTitle.split(' ');
              if (parts.length > 1) {
                const first = parts[0];
                const rest = parts.slice(1).join(' ');
                return <><span className="text-white">{first}</span> <span className="gradient-text">{rest}</span></>;
              }
              return <span className="gradient-text">{fullTitle}</span>;
            })()}
          </h2>
          
          <p className="gradient-text-platinum mt-4 max-w-3xl text-center opacity-80">
            {t('services.subtitle', { lng: lang })}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {items.map((service: Record<string, string>, index: number) => (
            <motion.div
              key={`${lang}-${service?.title || index}`}
              variants={fadeInUp}
              className="liquid-gold-card h-full cursor-pointer group"
              onClick={() => handleServiceClick(service?.title || '')}
            >
              <div className="liquid-gold-content flex flex-col h-full !p-8">
                <div className="bg-[#FBE18D]/10 p-4 rounded-2xl text-[#FBE18D] w-fit mb-8 shadow-inner border border-[#C69320]/20 group-hover:scale-110 transition-transform duration-500">
                  {index === 0 && <Code2 size={28} />}
                  {index === 1 && <Smartphone size={28} />}
                  {index === 2 && <Cpu size={28} />}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 gradient-text">{service?.title}</h3>
                <p className="text-slate-300/80 mb-8 flex-grow text-sm leading-relaxed">
                  {service?.description}
                </p>
                
                <ul className="space-y-3 mt-auto border-t border-white/5 pt-6">
                  {Array.isArray(service?.features) && service.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-slate-300 group/item">
                      <div className="mt-1 w-1.5 h-1.5 bg-[#FBE18D] rounded-full shadow-[0_0_8px_#FBE18D] group-hover/item:scale-125 transition-transform" />
                      <span className="group-hover/item:text-white transition-colors capitalize">{feature}</span>
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
