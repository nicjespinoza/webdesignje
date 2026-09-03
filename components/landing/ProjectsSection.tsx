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
import SectionHeader from '@/components/landing/SectionHeader';
import GradientTitle from '@/components/landing/GradientTitle';

const ProjectsSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Subtle kage-style parallax: the grid drifts a few px as it crosses the viewport.
  // Single scroll listener, GPU-composited (transform only). Disabled under reduced motion.
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const projectMetaByLang: Record<Language, Array<{ categoryBadge: string; metric: string; metricLabel: string }>> = {
    es: [
      { categoryBadge: 'HealthTech & IA', metric: '+80%', metricLabel: 'Eficiencia Clínica' },
      { categoryBadge: 'Retail & POS', metric: '-85%', metricLabel: 'Descuadre Stock' },
      { categoryBadge: 'B2B CRM & SaaS', metric: '3.2x', metricLabel: 'Velocidad de Cierre' },
      { categoryBadge: 'Luxury E-Commerce', metric: '+140%', metricLabel: 'Conversión Móvil' },
      { categoryBadge: 'Booking & WhatsApp IA', metric: '-90%', metricLabel: 'Ausencias / No-Shows' },
      { categoryBadge: 'EdTech & IA Predictiva', metric: '98%', metricLabel: 'Precisión Predictiva' },
    ],
    en: [
      { categoryBadge: 'HealthTech & AI', metric: '+80%', metricLabel: 'Clinical Efficiency' },
      { categoryBadge: 'Retail & POS', metric: '-85%', metricLabel: 'Stock Discrepancy' },
      { categoryBadge: 'B2B CRM & SaaS', metric: '3.2x', metricLabel: 'Deal Closing Speed' },
      { categoryBadge: 'Luxury E-Commerce', metric: '+140%', metricLabel: 'Mobile Conversion' },
      { categoryBadge: 'Booking & WhatsApp AI', metric: '-90%', metricLabel: 'No-Shows' },
      { categoryBadge: 'EdTech & Predictive AI', metric: '98%', metricLabel: 'Predictive Accuracy' },
    ],
    fr: [
      { categoryBadge: 'Santé & IA', metric: '+80%', metricLabel: 'Efficacité Clinique' },
      { categoryBadge: 'Commerce & POS', metric: '-85%', metricLabel: 'Écarts d\'Inventaire' },
      { categoryBadge: 'CRM B2B & SaaS', metric: '3.2x', metricLabel: 'Vitesse de Clôture' },
      { categoryBadge: 'E-Commerce de Luxe', metric: '+140%', metricLabel: 'Conversion Mobile' },
      { categoryBadge: 'Réservations & IA', metric: '-90%', metricLabel: 'Absences' },
      { categoryBadge: 'EdTech & IA Prédictive', metric: '98%', metricLabel: 'Précision Prédictive' },
    ],
    zh: [
      { categoryBadge: '智慧醫療與AI', metric: '+80%', metricLabel: '診所運營效率' },
      { categoryBadge: '零售與POS系統', metric: '-85%', metricLabel: '庫存損耗率' },
      { categoryBadge: '企業級CRM與SaaS', metric: '3.2x', metricLabel: '成交簽單速度' },
      { categoryBadge: '頂級電商平台', metric: '+140%', metricLabel: '行動端轉換率' },
      { categoryBadge: '智慧預約與AI助理', metric: '-90%', metricLabel: '缺席爽約率' },
      { categoryBadge: '教育科技與預測AI', metric: '98%', metricLabel: '預測模型精準度' },
    ],
  };

  const currentMetaList = projectMetaByLang[lang] || projectMetaByLang.es;

  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          badge={{ icon: <Code2 size={14} />, text: t('projects.badge', { lng: lang }) }}
          title={<GradientTitle text={t('projects.title', { lng: lang })} />}
          subtitle={t('projects.subtitle', { lng: lang })}
        />

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
              const currentMeta = currentMetaList[index] || currentMetaList[0];
              
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="liquid-gold-card cursor-pointer group"
                  onClick={() => setSelectedProject({ 
                    ...projectData, 
                    title: (item?.title as string) || projectData.title, 
                    description: (item?.description as string) || projectData.description,
                    features: itemFeatures,
                    categoryBadge: currentMeta.categoryBadge,
                    metric: currentMeta.metric,
                    metricLabel: currentMeta.metricLabel
                  })}
                >
                  <div className="liquid-gold-content p-0">
                    <div className="h-52 relative group overflow-hidden">
                      <Image
                        src={projectData.imageUrl}
                        alt={(item?.title as string) || 'Project'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Badge de Categoría Superior Dinámico por Idioma */}
                      {currentMeta?.categoryBadge && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/75 text-[#FBE18D] border border-[#C69320]/40 backdrop-blur-md shadow-md">
                            {currentMeta.categoryBadge}
                          </span>
                        </div>
                      )}

                      {/* Badge de Impacto / Métrica ROI Inferior Dinámico por Idioma */}
                      {currentMeta?.metric && (
                        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/85 border border-[#C69320]/50 backdrop-blur-md shadow-lg">
                          <span className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-[#C69320] to-[#FBE18D] bg-clip-text text-transparent">
                            {currentMeta.metric}
                          </span>
                          <span className="text-[9px] uppercase font-semibold text-slate-300 tracking-tight">
                            {currentMeta.metricLabel}
                          </span>
                        </div>
                      )}

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
