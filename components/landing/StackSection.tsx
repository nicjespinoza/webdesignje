import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Github, ExternalLink, Menu, X, Sun, Moon, Code2, ChevronDown, ArrowRight,
  Calendar, Clock, BookOpen, Send, User, Briefcase, Award, Terminal, Layers,
  Atom, Blocks, Zap, Box, Wind, Hash, FileCode, ClipboardList, ShieldCheck,
  BarChart3, FileText, FileCog, Activity, Server, DatabaseZap, Flame, Database,
  Table, Container, Package, Star, Cloud, Smartphone, Globe, Cpu, Brain, Bot,
  Sparkles, Network, CheckCircle, Search, Linkedin, Twitter, Gem, ArrowRightLeft
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import GlobalParticles from '@/components/landing/GlobalParticles';
import { Project, Language, BlogPost, ContactFormValues } from '@/components/landing/types';
import Logo from '@/components/medical/ui/Logo';
import { categories, proficiency, projects, blogPosts, contactSchema, services } from '@/data/constants';
import { fadeInUp, staggerContainer, scaleIn } from '@/components/landing/animations';

const StackSection = () => {
  const { t } = useTranslation();

  return (
    <section id="stack" className="py-16 container mx-auto px-6">
      <div
        className="flex flex-col items-center mb-10 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-3 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
          <Layers size={14} /> {t('stack.badge')}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-center text-white tracking-tight">
          Infraestructura <span className="gradient-text">de Confianza</span>
        </h2>
        <p className="gradient-text-platinum mt-3 max-w-3xl text-center text-lg">
          {t('stack.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={fadeInUp}
            className="liquid-gold-card"
          >
            <div className="liquid-gold-content">
              <motion.h3 variants={fadeInUp} className={`text-xl font-bold mb-6 font-sans ${index === 2 ? 'text-white' : 'text-slate-200'}`}>
                {index === 0 && t('stack.categories.frontend')}
                {index === 1 && t('stack.categories.data')}
                {index === 2 && t('stack.categories.backend')}
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
                    default: logoFileName = item.name.toLowerCase().replace(/\./g, '').replace(/ /g, '').replace(/\//g, '-');
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
      </div>


    </section>
  );
};

export default StackSection;
