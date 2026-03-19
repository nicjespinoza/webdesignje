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
          initial={{
            opacity: 0,
            scale: 0.1,
            filter: "blur(50px)",
            z: -1000,
            rotateX: 60,
            y: 100
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            z: 0,
            rotateX: 0,
            y: 0
          }}
          transition={{
            duration: 2,
            type: "spring",
            damping: 20,
            stiffness: 50,
            delay: 0.5
          }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-tight mb-6 tracking-tight font-serif relative z-10 gradient-text px-4 pb-4 overflow-visible"
        >
          {lang === 'EN' ? "Full-Stack & AI Engineer" : "Ingeniero Full-Stack y AI"}
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            filter: "blur(40px)",
            scale: 0.2,
            z: -800,
            y: 50,
            rotateX: 45
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            z: 0,
            y: 0,
            rotateX: 0
          }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            type: "spring",
            damping: 25,
            stiffness: 70
          }}
          className="gradient-text-platinum font-light text-base md:text-lg lg:text-xl max-w-6xl mb-14 leading-relaxed drop-shadow-lg text-center tracking-wide"
        >
          {lang === 'EN'
            ? "Crafting digital experiences that anticipate the future and captivate with intelligence and design."
            : "Creando experiencias digitales que anticipan el futuro y cautivan con inteligencia y diseño."
          }
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-20"
        >
          <motion.a
            initial={{ opacity: 0, scale: 0.1, z: -1000, filter: "blur(60px)", rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, z: 0, filter: "blur(0px)", rotateX: 0 }}
            transition={{ duration: 1.5, delay: 2.8, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="liquid-gold-card !rounded-full !h-auto !p-[1.5px] group relative overflow-hidden"
          >
            <div className="liquid-gold-content !py-2 !px-6 !rounded-full !flex-row flex items-center gap-2 relative z-10">
              <Briefcase size={18} className="text-slate-300 group-hover:text-[#C69320] group-hover:scale-110 transition-transform" />
              <span className="gradient-text-platinum font-bold text-sm whitespace-nowrap tracking-wide group-hover:gradient-text">
                {lang === 'EN' ? "View Work" : "Ver Proyectos"}
              </span>
            </div>
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
              style={{ skewX: "-20deg" }}
            />
          </motion.a>

          <motion.button
            initial={{ opacity: 0, scale: 0.1, z: -1000, filter: "blur(60px)", rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, z: 0, filter: "blur(0px)", rotateX: 0 }}
            transition={{ duration: 1.5, delay: 3, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/portal')}
            className="liquid-gold-card !rounded-full !h-auto !p-[1.5px] group relative overflow-hidden"
          >
            <div className="liquid-gold-content !py-2 !px-6 !rounded-full !flex-row flex items-center gap-2 relative z-10">
              <Sparkles size={18} className="text-slate-300 group-hover:text-[#C69320] transition-transform group-hover:rotate-12" />
              <span className="gradient-text-platinum font-bold text-sm whitespace-nowrap tracking-wide group-hover:gradient-text">
                {lang === 'EN' ? "Access Demo" : "Acceder a Demo"}
              </span>
            </div>
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
              style={{ skewX: "-20deg" }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 3.2 }
            }
          }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm md:text-base lg:text-lg text-slate-400 font-mono tracking-[0.2em] uppercase font-bold"
        >
          {[
            "Next.js", "React.js", "Node.js", "Tailwind CSS", "JavaScript", "AI Agents"
          ].map((tech, i) => (
            <React.Fragment key={tech}>
              <motion.span
                variants={{
                  hidden: { opacity: 0, scale: 0.1, z: -800, filter: "blur(40px)", y: 30 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    filter: "blur(0px)",
                    y: 0,
                    transition: { type: "spring", damping: 20 }
                  }
                }}
                className="gradient-text-platinum transition-colors cursor-default group-hover:gradient-text"
              >
                {tech}
              </motion.span>
              {i < 5 && (
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  className="w-1.5 h-1.5 bg-[#FBE18D] rounded-full drop-shadow-[0_0_8px_rgba(255,184,0,1)]"
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
