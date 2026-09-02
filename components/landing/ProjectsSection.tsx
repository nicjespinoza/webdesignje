'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, ExternalLink, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { projects } from '@/data/constants';
import { fadeInUp } from '@/components/landing/animations';
import { Language, Project } from '@/components/landing/types';
import ProjectModal from './ProjectModal';

const ProjectsSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Subtle kage-style parallax: the grid drifts a few px as it crosses the viewport.
  // Single scroll listener, GPU-composited (transform only). Disabled under reduced motion.
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
            <Code2 size={14} /> {t('projects.badge', { lng: lang })}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
             {(() => {
              const fullTitle = t('projects.title', { lng: lang });
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
            {t('projects.subtitle', { lng: lang })}
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ y: gridY }}>
          {(() => {
            const itemsData = t('projects.items', { returnObjects: true, lng: lang });
            const items: (Record<string, unknown> | Project)[] = Array.isArray(itemsData) ? (itemsData as Record<string, unknown>[]) : projects;

            interface TranslatedProjectItem {
              title?: string;
              description?: string;
              features?: string[];
            }

            return items.map((item: Record<string, unknown> | Project, index: number) => {
              const projectData = projects[index] || projects[0];
              const translatedItem = item as TranslatedProjectItem;
              const itemFeatures = Array.isArray(translatedItem?.features) ? translatedItem.features : projectData.features;
              
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="liquid-gold-card cursor-pointer group"
                  onClick={() => handleProjectClick({ 
                    ...projectData, 
                    title: (item?.title as string) || projectData.title, 
                    description: (item?.description as string) || projectData.description,
                    features: itemFeatures
                  })}
                >
                  <div className="liquid-gold-content p-0">
                    <div className="h-48 relative group overflow-hidden">
                      <Image
                        src={projectData.imageUrl}
                        alt={(item?.title as string) || 'Project'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="text-[#FBE18D]" size={32} />
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-xl font-bold mb-3 text-[#FBE18D] transition-colors font-sans">
                        {(item?.title as string) || projectData.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4 font-sans italic">
                        {(item?.description as string) || projectData.description}
                      </p>

                      <div className="mb-6">
                        <p className="text-[10px] text-[#FBE18D]/70 uppercase tracking-[0.2em] font-bold mb-3">
                          {t('projects.key_benefits', { lng: lang })}
                        </p>
                        <ul className="space-y-2">
                          {Array.isArray(itemFeatures) && itemFeatures.map((feature: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-2 group/item">
                              <div className="w-1 h-1 rounded-full bg-[#C69320] mt-1.5 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                              <span className="text-[11px] text-slate-300 leading-tight group-hover/item:text-[#FBE18D] transition-colors">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {Array.isArray(projectData?.techStack) && projectData.techStack.map((tech: string) => (
                          <span key={tech} className="text-[9px] px-2 py-0.5 border border-[#C69320]/20 text-[#C69320]/60 rounded-full uppercase font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-[#C69320]/10 flex items-center justify-between group/btn">
                        <div className="flex items-center gap-2">
                          <FileText className="text-[#FBE18D]/70 group-hover/btn:text-[#FBE18D] transition-colors" size={14} />
                          <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase group-hover/btn:text-[#FBE18D] transition-colors">
                            {t('projects.view_case', { lng: lang })}
                          </span>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-[#C69320]/30 flex items-center justify-center group-hover/btn:bg-[#C69320] group-hover/btn:border-[#C69320] transition-all">
                           <ExternalLink size={10} className="text-[#C69320] group-hover/btn:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            });
          })()}
        </motion.div>
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
        lang={lang}
      />
    </section>
  );
};

export default ProjectsSection;
