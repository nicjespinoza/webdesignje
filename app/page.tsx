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
import { blurReveal, dissolve } from "@/components/landing/animations";

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

        {/* 1. Hero (Captación) - Aparece de inmediato con disolución del glow */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={dissolve}
        >
          <Hero />
        </motion.div>

        {/* 2. ServicesSection (Propuesta de valor) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={blurReveal}
        >
          <ServicesSection lang={lang} />
        </motion.div>

        {/* 3. ProjectsSection (Prueba social) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={blurReveal}
        >
          <ProjectsSection lang={lang} />
        </motion.div>

        {/* 4. ClientsSection (Social proof) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={blurReveal}
        >
          <ClientsSection lang={lang} />
        </motion.div>

        {/* 5. WhyChooseSection (Diferenciadores) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={blurReveal}
        >
          <WhyChooseSection lang={lang} />
        </motion.div>

        {/* 6. AboutSection (Confianza personal) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={blurReveal}
        >
          <AboutSection lang={lang} />
        </motion.div>

        {/* 7. ContactSection (CTA final) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={blurReveal}
        >
          <ContactSection lang={lang} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={blurReveal}
        >
          <FooterSection lang={lang} />
        </motion.div>
      </div>
    </main>
  );
}
