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
import GlobalParticles from '@/components/landing/GlobalParticles';
import { Project, Language, BlogPost, ContactFormValues } from '@/components/landing/types';
import Logo from '@/components/medical/ui/Logo';
import { categories, proficiency, projects, blogPosts, contactSchema, services } from '@/data/constants';
import { fadeInUp, staggerContainer, scaleIn } from '@/components/landing/animations';

const StackSection = () => {
  return (
    <section id="stack" className="py-16 container mx-auto px-6">
      <div
        className="flex flex-col items-center mb-10 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-3 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
          <Layers size={14} /> Technology
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-center text-white tracking-tight">
          <span className="gradient-text">Pila de Producción</span>
        </h2>
        <p className="gradient-text-platinum mt-3 max-w-3xl text-center text-lg">
          Utilizo las tecnologías más avanzadas del mercado, cuidadosamente integradas para construir aplicaciones de alto impacto que ofrecen una experiencia excepcional y una base sólida para el crecimiento de su negocio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.title}
            variants={fadeInUp}
            className="liquid-gold-card"
          >
            <div className="liquid-gold-content">
              <motion.h3 variants={fadeInUp} className="text-xl font-bold text-slate-200 mb-6">
                {category.title}
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

      <div className="mt-12 mb-8 relative z-20 opacity-100 visible">
        <div className="liquid-gold-card max-w-2xl mx-auto !opacity-100 !block">
          <div className="liquid-gold-content">
            <h3 className="text-lg font-bold text-center mb-6 flex items-center justify-center gap-2">
              <Activity className="text-[#FBE18D]" size={18} />
              <span className="gradient-text">Dominio de Habilidades Clave</span>
            </h3>

            <div className="space-y-4">
              {proficiency.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1 text-xs font-bold text-slate-300">
                    <span className="text-xs">{skill.name}</span>
                    <span className="text-white text-xs">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-white/50 shadow-[0_0_5px_white]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
