import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';
import { categories } from '@/data/constants';
import { fadeInUp, staggerContainer } from '@/components/landing/animations';

const StackSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();

  return (
    <section id="stack" className="py-16 container mx-auto px-6">
      <div
        className="flex flex-col items-center mb-10 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-3 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
          <Layers size={14} /> {t('stack.badge', { lng: lang })}
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          {(() => {
            const fullTitle = t('stack.title', { lng: lang });
            if (fullTitle.includes(' ')) {
              const parts = fullTitle.split(' ');
              const first = parts[0];
              const rest = parts.slice(1).join(' ');
              return <><span className="text-white">{first}</span> <span className="gradient-text">{rest}</span></>;
            }
            return <span className="gradient-text">{fullTitle}</span>;
          })()}
        </h2>
        
        <p className="gradient-text-platinum mt-3 max-w-3xl text-center text-lg opacity-80">
          {t('stack.subtitle', { lng: lang })}
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={fadeInUp}
            className="liquid-gold-card"
          >
            <div className="liquid-gold-content !p-8 h-full"> 
              <motion.h3 variants={fadeInUp} className={`text-xl font-bold mb-6 font-sans ${index === 2 ? 'text-white' : 'text-slate-200'}`}>
                {index === 0 && t('stack.categories.frontend', { lng: lang })}
                {index === 1 && t('stack.categories.data', { lng: lang })}
                {index === 2 && t('stack.categories.backend', { lng: lang })}
              </motion.h3>
              <div className="space-y-4">
                {category.items.map((item) => {
                  let logoFileName = '';
                  switch (item.name) {
                    case 'React 19': logoFileName = 'react'; break;
                    case 'Next.js 15': logoFileName = 'nextdotjs'; break;
                    case 'Vite': logoFileName = 'vite'; break;
                    case 'React Three Fiber': logoFileName = 'reactthreefiber'; break;
                    case 'Tailwind v4': logoFileName = 'tailwindcss'; break;
                    case 'Framer Motion': logoFileName = 'framer'; break;
                    case 'PostCSS': logoFileName = 'postcss'; break;
                    case 'TypeScript': logoFileName = 'typescript'; break;
                    case 'React Hook Form': logoFileName = 'reacthookform'; break;
                    case 'Zod': logoFileName = 'zod'; break;
                    case 'Recharts': logoFileName = 'rechartsjs'; break;
                    case 'jsPDF': logoFileName = 'jspdf'; break;
                    case 'TanStack Query': logoFileName = 'tanstack'; break;
                    case 'Node.js': logoFileName = 'nodedotjs'; break;
                    case 'Supabase': logoFileName = 'supabase'; break;
                    case 'Firebase': logoFileName = 'firebase'; break;
                    case 'PostgreSQL': logoFileName = 'postgresql'; break;
                    case 'MySQL': logoFileName = 'mysql'; break;
                    case 'Docker': logoFileName = 'docker'; break;
                    case 'npm / pnpm': logoFileName = 'npm'; break;
                    default: logoFileName = item.name.toLowerCase().replace(/\./g, "").replace(/ /g, "").replace(/\//g, "-");
                  }
                  const logoSrc = `/logos/${logoFileName}.svg`;

                  return (
                    <motion.a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        <Image src={logoSrc} alt={item.name} width={24} height={24} className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm group-hover:text-[#FBE18D] transition-colors truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">{item.desc}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StackSection;