import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { projects } from '@/data/constants';
import { fadeInUp } from '@/components/landing/animations';

const ProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
            <Code2 size={14} /> {t('projects.badge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-center text-lg">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(() => {
            const itemsData = t('projects.items', { returnObjects: true }) as any;
            const items = Array.isArray(itemsData) ? itemsData : projects;
            
            return items.map((item: any, index: number) => {
              const projectData = projects[index] || projects[0];
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="liquid-gold-card cursor-pointer group"
                  onClick={() => window.open(projectData.demoUrl || '#', '_blank')}
                >
                  <div className="liquid-gold-content p-0">
                    <div
                      className="h-48 bg-cover bg-center relative group overflow-hidden"
                      style={{ backgroundImage: `url(${projectData.imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <ExternalLink className="text-[#FBE18D]" size={32} />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-[#FBE18D] transition-colors font-sans">
                        {item?.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-5 font-sans">
                        {item?.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Array.isArray(projectData?.techStack) && projectData.techStack.map((tech: string) => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 border border-[#C69320]/30 text-[#C69320] rounded-full uppercase font-bold tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-auto">
                        <ExternalLink className="text-[#FBE18D]/70" size={14} />
                        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{t('projects.view_case')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
