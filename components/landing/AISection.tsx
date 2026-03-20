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

const AISection = () => {
  return (
    <section id="ai" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4">
            <Cpu size={14} /> IA Revolucionaria
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            IA que Genera <span className="gradient-text">Resultados Reales</span>
          </h2>
          <p className="gradient-text-platinum mt-4 max-w-3xl text-center">
            Transformamos datos complejos en decisiones inteligentes que impulsan el crecimiento de tu empresa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Brain,
              title: "Procesamiento de Lenguaje Natural",
              description: "Atención al cliente, chatbots inteligentes, análisis de sentimientos, traducción automática en múltiples idiomas.",
              level: 95
            },
            {
              icon: Bot,
              title: "Agentes que Trabajan por Vos",
              description: "Desde gestión de citas hasta procesamiento de pedidos, todo sin supervisión humana.",
              level: 88
            },
            {
              icon: Sparkles,
              title: "Machine Learning Predictivo",
              description: "Anticipa tendencias, comportamientos de clientes y riesgos operativos en tiempo real.",
              level: 92
            },
            {
              icon: Network,
              title: "Deep Learning a Medida",
              description: "Modelos personalizados entrenados con tus datos específicos para resultados únicos.",
              level: 85
            }
          ].map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={fadeInUp}
              className="liquid-gold-card"
            >
              <div className="liquid-gold-content text-center items-center">
                <div className="bg-[#FBE18D]/10 p-3 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <skill.icon size={24} />
                </div>
                <h4 className="font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-slate-400 mb-4">{skill.description}</p>
                <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute h-full bg-gradient-to-r from-[#C69320] to-[#FBE18D] rounded-full shadow-[0_0_10px_#C69320]"
                  />
                </div>
                <span className="text-xs text-slate-400">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="visible"
          animate="visible"
          className="liquid-gold-card relative z-10"
        >
          <div className="liquid-gold-content p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Soluciones de IA que Transforman Tu Negocio Digital</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4 text-[#FBE18D] flex items-center gap-2">
                  <Smartphone size={18} /> IA Aplicada a Tus Productos Digitales
                </h4>
                <ul className="space-y-3">
                  {[
                    "Asistentes Virtuales que Nunca Duermen - Atención 24/7 en Múltiples Idiomas",
                    "Recomendaciones que Convierten - Personalización en Tiempo Real",
                    "Predicé lo que Tus Clientes Quieren - Optimización Proactiva",
                    "Guías Inteligentes que Acompañan a Cada Usuario",
                    "Cero Papel, Cero Errores - Procesamiento Automático de Documentos y Datos"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="text-[#FBE18D] mt-0.5" size={16} />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-[#FBE18D] flex items-center gap-2">
                  <Cpu size={18} /> Stack Tecnológico de IA
                </h4>
                <ul className="space-y-3">
                  {[
                    "Lo Mejor de la IA Global - CHATGPT, GROK, Claude, GEMENIS y mas Modelos",
                    "IA que Conoce Tu Negocio - Sistemas RAG con Tus Propios Datos",
                    "IA que Habla Tu Idioma - Modelos Entrenados con Tu Voz y Tono",
                    "Integración Sin Fricción - APIs Documentadas y Listas para Producción",
                    "Escala Sin Límites - Procesamiento en Tiempo Real para Miles de Usuarios"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="text-[#FBE18D] mt-0.5" size={16} />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISection;
