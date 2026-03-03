// ============================================================
// Portafolio Joseph Espinoza - Página Principal
// Clone exacto del portafolio original con todas las secciones
// ============================================================

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Github,
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  ChevronDown,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  Send,
  User,
  Briefcase,
  Award,
  Terminal,
  Layers,
  Atom,
  Blocks,
  Zap,
  Box,
  Wind,
  Hash,
  FileCode,
  ClipboardList,
  ShieldCheck,
  BarChart3,
  FileText,
  FileCog,
  Activity,
  Server,
  DatabaseZap,
  Flame,
  Database,
  Table,
  Container,
  Package,
  Star,
  Cloud,
  Smartphone,
  Globe,
  Cpu,
  Brain,
  Bot,
  Sparkles,
  Network,
  CheckCircle,
  Search,
  Linkedin,
  Twitter,
  Gem,
  ArrowRightLeft
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import GlobalParticles from '@/src/components/landing/GlobalParticles';
import { Project, Language, BlogPost, ContactFormValues } from '@/src/components/landing/types';
import Logo from '../components/ui/Logo';
import { categories, proficiency, projects, blogPosts, contactSchema, services } from '@/src/data/constants';

import Navbar from "@/src/components/landing/Navbar";
import StackSection from "@/src/components/landing/StackSection";
import ServicesSection from "@/src/components/landing/ServicesSection";
import AISection from "@/src/components/landing/AISection";
import RAGSection from "@/src/components/landing/RAGSection";
import ProjectsSection from "@/src/components/landing/ProjectsSection";
import AboutSection from "@/src/components/landing/AboutSection";
import Hero from "@/src/components/landing/Hero";
import BlogSection from "@/src/components/landing/BlogSection";
import ContactSection from "@/src/components/landing/ContactSection";
import FooterSection from "@/src/components/landing/FooterSection";

// Main App Component
export default function PortfolioPage() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('ES');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'ES' ? 'EN' : 'ES');

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-x-hidden relative">
      <GlobalParticles />
      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(217, 119, 6, 0.2);
          box-shadow: 0 0 30px rgba(217, 119, 6, 0.1);
        }
        .gradient-text {
          background: linear-gradient(to right, #C69320, #FBE18D, #C69320);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-text-platinum {
          background: linear-gradient(to right, #E0E0E0, #F8F8F8, #E0E0E0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
      <Hero lang={lang} router={router} />
      <ServicesSection />
      <StackSection />
      <AISection />
      <RAGSection />
      <ProjectsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
