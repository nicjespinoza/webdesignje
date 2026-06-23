"use client";

import "@/lib/i18n";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ServicesSection from "@/components/landing/ServicesSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import AboutSection from "@/components/landing/AboutSection";
import ClientsSection from "@/components/landing/ClientsSection";
import ContactSection from "@/components/landing/ContactSection";
import FooterSection from "@/components/landing/FooterSection";
import ParticleBackground from "@/components/ParticleBackground";
import { Language } from "@/components/landing/types";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/landing/animations";

export default function RootPage() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const lang = !mounted ? "es" : (i18n.language.split('-')[0].toLowerCase() as Language) || "es";

  const toggleLang = (langCode: string) => {
    i18n.changeLanguage(langCode.toLowerCase());
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <ParticleBackground />
      </div>

      <div className="relative z-10">
        <Navbar
          isDark={true}
          lang={lang}
          toggleLang={(newLang) => toggleLang(newLang)}
        />

        {/* 1. Hero (Captación) - Aparece de inmediato */}
        <motion.div
          initial="visible"
          animate="visible"
          variants={fadeInUp}
        >
          <Hero />
        </motion.div>

        {/* 2. ServicesSection (Propuesta de valor) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <ServicesSection lang={lang} />
        </motion.div>

        {/* 3. ProjectsSection (Prueba social) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <ProjectsSection lang={lang} />
        </motion.div>

        {/* 4. ClientsSection (Social proof) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <ClientsSection lang={lang} />
        </motion.div>

        {/* 5. WhyChooseSection (Diferenciadores) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <WhyChooseSection lang={lang} />
        </motion.div>

        {/* 6. AboutSection (Confianza personal) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <AboutSection lang={lang} />
        </motion.div>

        {/* 7. ContactSection (CTA final) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <ContactSection lang={lang} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <FooterSection lang={lang} />
        </motion.div>
      </div>
    </main>
  );
}
