import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Briefcase, Terminal, Award, CheckCircle, ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInUp } from '@/components/landing/animations';
import { Language } from '@/components/landing/types';

const AboutSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();

  const title = t('about.title', { defaultValue: 'Sobre Mí', lng: lang });
  const motto = t('about.motto', { defaultValue: 'Tu negocio merece un desarrollador que lo trate como suyo', lng: lang });
  const quote = t('about.performance_quote', { defaultValue: 'El rendimiento es el máximo lujo.', lng: lang });

  const contentByLang = {
    es: {
      stats: [
        { value: "+15", label: "Proyectos Entregados", icon: Briefcase },
        { value: "100%", label: "Satisfacción de Clientes", icon: Award },
        { value: "<24h", label: "Tiempo de Respuesta", icon: Terminal },
      ],
      titlePrefix: "Arquitectura &",
      titleHighlight: "Sistemas con IA",
      desc1: "Desarrollador Full-Stack especializado en tecnologías web modernas y soluciones potenciadas con IA. No solo escribo código — construyo experiencias digitales que generan resultados reales para tu negocio.",
      desc2: "Combino rigor técnico con enfoque estratégico, garantizando que cada función aporte valor medible y cada solución se ejecute con eficiencia elegante.",
      highlights: [
        "Arquitecturas Web Escalables con Next.js & React",
        "Ingeniería e Integración de Agentes y Modelos de IA",
        "Enfoque Obsesivo en Rendimiento, SEO & Conversión",
      ],
      cta: "Trabajemos Juntos",
    },
    en: {
      stats: [
        { value: "+15", label: "Projects Delivered", icon: Briefcase },
        { value: "100%", label: "Client Satisfaction", icon: Award },
        { value: "<24h", label: "Response Time", icon: Terminal },
      ],
      titlePrefix: "Architecture &",
      titleHighlight: "AI Systems",
      desc1: "Full-Stack Developer specialized in modern web technologies and AI-powered solutions. I don't just write code — I build digital experiences that deliver tangible business results.",
      desc2: "I combine engineering rigor with strategic vision, ensuring every feature provides measurable value and runs with high performance.",
      highlights: [
        "Scalable Web Architectures with Next.js & React",
        "AI Agent Engineering & LLM Integration",
        "Obsessive Focus on Performance, SEO & Conversion",
      ],
      cta: "Let's Work Together",
    },
    fr: {
      stats: [
        { value: "+15", label: "Projets Livrés", icon: Briefcase },
        { value: "100%", label: "Satisfaction Client", icon: Award },
        { value: "<24h", label: "Temps de Réponse", icon: Terminal },
      ],
      titlePrefix: "Architecture &",
      titleHighlight: "Systèmes d'IA",
      desc1: "Développeur Full-Stack spécialisé dans les technologies web modernes et les solutions d'IA. Je ne me contente pas de coder — je conçois des expériences numériques qui génèrent de vrais résultats pour votre entreprise.",
      desc2: "J'allie rigueur technique et vision stratégique, garantissant que chaque fonctionnalité apporte une valeur mesurable avec une efficacité élégante.",
      highlights: [
        "Architectures Web Évolutives avec Next.js & React",
        "Ingénierie d'Agents IA & Intégration LLM",
        "Accent Obsessionnel sur la Performance, SEO & Conversion",
      ],
      cta: "Travaillons Ensemble",
    },
    zh: {
      stats: [
        { value: "+15", label: "已交付專案", icon: Briefcase },
        { value: "100%", label: "客戶滿意度", icon: Award },
        { value: "<24h", label: "回應時間", icon: Terminal },
      ],
      titlePrefix: "架構設計與",
      titleHighlight: "人工智慧系統",
      desc1: "專注於現代網頁技術與AI智慧解決方案的全端工程師。我不僅僅是編寫代碼，更是打造能為您的業務帶來實際成果的數位體驗。",
      desc2: "我將嚴謹的技術與策略思維相結合，確保每個功能都能提供可衡量的價值，並具備極致的高效表現。",
      highlights: [
        "基於 Next.js 與 React 的高擴展性網頁架構",
        "AI 代理工程與大型語言模型整合",
        "極致追求效能、SEO 與轉換率優化",
      ],
      cta: "攜手合作",
    },
  };

  const activeContent = contentByLang[lang] || contentByLang.es;

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Luces de ambiente sutiles */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#C69320]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FBE18D]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 max-w-6xl relative z-10">

        {/* Header de la Sección limpio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#C69320] via-[#FBE18D] to-[#C69320] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            {motto}
          </p>
        </motion.div>

        {/* Contenedor Principal: 2 Columnas de igual altura perfecta */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Columna Izquierda: Tarjeta de Presentación Visual de Altura Completa */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="w-full h-full bg-[#0c1017] border border-[#C69320]/30 rounded-3xl p-4 md:p-5 shadow-[0_0_50px_rgba(198,147,32,0.12)] flex flex-col justify-between">

              {/* Contenedor de la Imagen que ocupa el espacio de forma fluida y elegante */}
              <div className="relative w-full flex-1 min-h-[340px] md:min-h-[380px] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner group">
                <Image
                  src="/images/Perfil_elegante.png"
                  alt="Joseph Espinoza - Full-Stack & AI Engineer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Badge flotante inferior con indicador Dorado */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between bg-[#0a0a0a]/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#C69320]/40 shadow-lg">
                  <div>
                    <p className="text-white font-bold text-xs tracking-wide">Joseph Espinoza</p>
                    <p className="text-[10px] text-[#FBE18D] font-mono tracking-wide">Full-Stack & AI Engineer</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FBE18D] animate-pulse shadow-[0_0_12px_rgba(251,225,141,0.9)]" />
                </div>
              </div>

              {/* Métricas rápidas al pie de la foto */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/5">
                {activeContent.stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <p className="text-sm md:text-base font-extrabold bg-gradient-to-r from-[#C69320] to-[#FBE18D] bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-[9px] text-slate-400 font-medium uppercase leading-tight mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Columna Derecha: Tarjeta de Presentación Ejecutiva y Filosofía */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="bg-[#0c1017] border border-[#C69320]/25 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(198,147,32,0.08)] h-full flex flex-col justify-between space-y-6">

              {/* Encabezado y Texto Resumido de Alto Impacto */}
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
                  {activeContent.titlePrefix} <span className="bg-gradient-to-r from-[#C69320] via-[#FBE18D] to-[#C69320] bg-clip-text text-transparent">{activeContent.titleHighlight}</span>
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#C69320] to-[#FBE18D] rounded-full mb-6" />

                {/* Texto de Biografía Profesional y Directo */}
                <div className="space-y-4 text-slate-200 text-sm md:text-base leading-relaxed font-normal">
                  <p className="text-slate-200">
                    {activeContent.desc1}
                  </p>
                  <p className="text-slate-300">
                    {activeContent.desc2}
                  </p>
                </div>
              </div>

              {/* Puntos Clave de Especialización */}
              <div className="space-y-2.5 pt-2">
                {activeContent.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-[#C69320]/30 transition-colors">
                    <div className="w-5 h-5 rounded-lg bg-[#C69320]/15 flex items-center justify-center text-[#FBE18D] shrink-0">
                      <CheckCircle size={13} className="text-[#FBE18D]" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              {/* Frase de Rendimiento y CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400 font-mono italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(198,147,32,0.4)] transition-all shrink-0"
                >
                  {activeContent.cta} <ArrowRight size={14} />
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
