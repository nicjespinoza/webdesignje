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

const Hero = ({ lang, router }: { lang: Language; router: any }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden bg-transparent pointer-events-none">


      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center mt-12 pointer-events-auto">

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-tight mb-6 tracking-tight font-serif relative z-10 gradient-text px-4 pb-4 overflow-visible"
        >
          {lang === 'EN' ? "Full-Stack & AI Engineer" : "Ingeniero Full-Stack y AI"}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="gradient-text-platinum font-light text-base md:text-lg lg:text-xl max-w-6xl mb-14 leading-relaxed drop-shadow-lg text-center tracking-wide"
        >
          {lang === 'EN'
            ? "Crafting digital experiences that anticipate the future and captivate with intelligence and design."
            : "Creando experiencias digitales que anticipan el futuro y cautivan con inteligencia y diseño."
          }
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-20 pointer-events-auto">
          {/* CTA Principal: Acceder a Demo */}
          <motion.button
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/portal')}
            className="liquid-gold-card !rounded-full !h-auto !p-[1.5px] group relative overflow-hidden"
          >
            <div className="liquid-gold-content !py-3 !px-8 !rounded-full !flex-row flex items-center gap-2 relative z-10 transition-all duration-300">
              <Sparkles size={18} className="text-[#C69320] group-hover:rotate-12 transition-transform" />
              <span className="gradient-text font-bold text-sm md:text-base whitespace-nowrap tracking-wide">
                {lang === 'EN' ? "Access Demo" : "Acceder a Demo"}
              </span>
            </div>
          </motion.button>

          {/* CTA Secundario: Ver Proyectos */}
          <motion.a
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-3 rounded-full border border-white/10 glass-panel flex items-center gap-2 transition-all duration-300 text-slate-300 hover:text-white group"
          >
            <Briefcase size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="font-medium text-sm md:text-base">
              {lang === 'EN' ? "View Work" : "Ver Proyectos"}
            </span>
          </motion.a>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          transition={{ delayChildren: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm md:text-base lg:text-lg text-slate-400 font-mono tracking-[0.2em] uppercase font-bold"
        >
          {[
            "Next.js", "React.js", "Node.js", "Tailwind CSS", "JavaScript", "AI Agents"
          ].map((tech, i) => (
            <React.Fragment key={tech}>
              <motion.span
                variants={fadeInUp}
                className="gradient-text-platinum hover:text-white transition-colors cursor-default"
              >
                {tech}
              </motion.span>
              {i < 5 && (
                <motion.span
                  variants={fadeInUp}
                  className="w-1.5 h-1.5 bg-[#FBE18D]/40 rounded-full"
                ></motion.span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
