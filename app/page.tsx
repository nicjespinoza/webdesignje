"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StackSection from "@/components/landing/StackSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AISection from "@/components/landing/AISection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";
import FooterSection from "@/components/landing/FooterSection";
import GlobalParticles from "@/components/landing/GlobalParticles";
import { Language } from "@/components/landing/types";

export default function RootPage() {
  const router = useRouter();
  const [lang] = useState<Language>("ES"); // idioma único, sin rutas /es o /en
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <main className="min-h-screen bg-[#020202] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <GlobalParticles />
      </div>

      <div className="relative z-10">
        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          lang={lang}
          toggleLang={() => {}}
        />
        <Hero lang={lang} router={router} />
        <StackSection />
        <ServicesSection />
        <AISection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  );
}
