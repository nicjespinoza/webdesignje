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

const Navbar = ({
  isDark,
  toggleTheme,
  lang,
  toggleLang
}: {
  isDark: boolean;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: lang === 'EN' ? 'Stack' : 'Tecnologías', href: '#stack' },
    { name: lang === 'EN' ? 'Services' : 'Servicios', href: '#services' },
    { name: lang === 'EN' ? 'AI & Agents' : 'IA & Agentes', href: '#ai' },
    { name: lang === 'EN' ? 'Projects' : 'Proyectos', href: '#projects' },
    { name: lang === 'EN' ? 'About' : 'Sobre mí', href: '#about' },
    { name: lang === 'EN' ? 'Blog' : 'Blog', href: '#blog' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3 shadow-lg backdrop-blur-md' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <Logo isDark={isDark} size={64} />
          <div className="leading-none flex flex-col">
            <span className="text-2xl font-bold tracking-tight gradient-text transition hover:brightness-125 font-serif">Joseph Espinoza</span>
            <span className="text-xs font-medium tracking-[0.2em] text-slate-300 font-serif lowercase italic opacity-80">Web Design</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="relative text-sm font-medium hover:text-[#FBE18D] transition-colors group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE18D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <button onClick={toggleLang} className="text-xs font-bold px-2 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors">
            {lang}
          </button>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/5 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="#contact" className="liquid-gold-card !rounded-full !h-auto">
            <div className="liquid-gold-content !py-2 !px-6 !rounded-full">
              <span className="gradient-text font-bold text-sm whitespace-nowrap">
                {lang === 'EN' ? "Let's Talk" : 'Contáctame'}
              </span>
            </div>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 mt-4">
                <button onClick={toggleLang} className="text-sm px-3 py-1 border border-white/20 rounded">
                  {lang === 'EN' ? 'Español' : 'English'}
                </button>
                <button onClick={toggleTheme} className="flex items-center gap-2 text-sm px-3 py-1 border border-white/20 rounded">
                  {isDark ? <Sun size={14} /> : <Moon size={14} />} Theme
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
