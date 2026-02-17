// ============================================================
// Portafolio Joseph Espinoza - Página Principal
// Clone exacto del portafolio original con todas las secciones
// ============================================================

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
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
  Twitter
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import ParticleBackground from '@/src/components/landing/ParticleBackground';
import FooterParticles from '@/src/components/landing/FooterParticles';
import Scene3D from '@/src/components/landing/Scene3D';
import { Project, Language, BlogPost, ContactFormValues } from '@/src/components/landing/types';

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Configuration & Data ---
const categories = [
  {
    title: "Frontend Core",
    items: [
      { 
          name: 'React 19', 
          icon: Atom, 
          color: '#61DAFB', 
          desc: 'Component Architecture',
          url: 'https://react.dev',
          details: 'The library for web and native user interfaces. v19 introduces Actions, useFormStatus, and optimistic updates.'
      },
      { 
          name: 'Next.js 15', 
          icon: Blocks, 
          color: '#FFFFFF', 
          desc: 'App Router & Server Actions', 
          url: 'https://nextjs.org',
          details: 'The React Framework for production. Features hybrid static & server rendering, smart bundling, and route pre-fetching.'
      },
      { 
          name: 'Vite', 
          icon: Zap, 
          color: '#646CFF', // Brand Purple
          desc: 'Next Gen Tooling',
          url: 'https://vitejs.dev',
          details: 'Get ready for a development environment that can finally keep up with you. Lightning fast HMR and optimized builds.'
      },
      { 
          name: 'React Three Fiber', 
          icon: Box, 
          color: '#FFFFFF', 
          desc: 'Declarative 3D Scenes',
          url: 'https://docs.pmnd.rs/react-three-fiber',
          details: 'A React renderer for Three.js. Build interactive 3D scenes declaratively with re-usable components.'
      },
      { 
          name: 'Tailwind v4', 
          icon: Wind, 
          color: '#38BDF8', 
          desc: 'Utility-First Design',
          url: 'https://tailwindcss.com',
          details: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.'
      },
      { 
          name: 'Framer Motion', 
          icon: Layers, 
          color: '#E6007A', 
          desc: 'Interactive UI',
          url: 'https://www.framer.com/motion/',
          details: 'A production-ready motion library for React. Utilize the power of declarative animations and gestures.'
      },
      { 
          name: 'PostCSS', 
          icon: Hash, 
          color: '#DD3A0A', 
          desc: 'CSS Transformation',
          url: 'https://postcss.org',
          details: 'A tool for transforming CSS with JavaScript. Used for Autoprefixer, nesting, and more.'
      },
    ]
  },
  {
    title: "Data, Forms & Utils",
    items: [
      { 
          name: 'TypeScript', 
          icon: FileCode, 
          color: '#3178C6', 
          desc: 'Strict Type Safety',
          url: 'https://www.typescriptlang.org',
          details: 'TypeScript extends JavaScript by adding types. It saves you time catching errors and providing fixes before you run code.'
      },
      { 
          name: 'React Hook Form', 
          icon: ClipboardList, 
          color: '#EC5990', 
          desc: 'Performant Forms',
          url: 'https://react-hook-form.com',
          details: 'Performant, flexible and extensible forms with easy-to-use validation.'
      },
      { 
          name: 'Zod', 
          icon: ShieldCheck, 
          color: '#3E67B1', 
          desc: 'Schema Validation',
          url: 'https://zod.dev',
          details: 'TypeScript-first schema declaration and validation library. The perfect companion for forms and API responses.'
      },
      { 
          name: 'Recharts', 
          icon: BarChart3, 
          color: '#22B5BF', 
          desc: 'React Charting Library',
          url: 'https://recharts.org',
          details: 'A composable charting library built on React components. Reliable, flexible, and easy to customize.'
      },
      { 
          name: 'jsPDF', 
          icon: FileText, 
          color: '#E03534', 
          desc: 'Client-side PDF',
          url: 'https://github.com/parallax/jsPDF',
          details: 'A library to generate PDFs in client-side JavaScript. Create reports, invoices, and tickets dynamically.'
      },
      { 
          name: 'tsconfig.json', 
          icon: FileCog, 
          color: '#3178C6', 
          desc: 'TS Configuration',
          url: 'https://www.typescriptlang.org/tsconfig',
          details: 'The root of a TypeScript project. Configures strictness, paths, and compiler options for robust code.'
      },
      { 
          name: 'TanStack Query', 
          icon: Activity, 
          color: '#FF4154', 
          desc: 'Async State',
          url: 'https://tanstack.com/query',
          details: 'Powerful asynchronous state management for TS/JS. Handles caching, background updates and stale data out of the box.'
      }
    ]
  },
  {
    title: "Backend & DevOps",
    items: [
      { 
          name: 'Node.js', 
          icon: Server, 
          color: '#339933', 
          desc: 'Edge Runtime',
          url: 'https://nodejs.org',
          details: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine. Efficient, lightweight, and perfect for real-time apps.'
      },
      { 
          name: 'Supabase', 
          icon: DatabaseZap, 
          color: '#3ECF8E', 
          desc: 'Postgres & Auth',
          url: 'https://supabase.com',
          details: 'The open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, and Realtime subscriptions.'
      },
      { 
          name: 'Firebase', 
          icon: Flame, 
          color: '#FFCA28', 
          desc: 'App Platform',
          url: 'https://firebase.google.com',
          details: 'Backed by Google. Provides authentication, database (Firestore), analytics, and hosting out of the box.'
      },
      { 
          name: 'PostgreSQL', 
          icon: Database, 
          color: '#336791', // Official Blue
          desc: 'Advanced Relational DB',
          url: 'https://www.postgresql.org',
          details: 'The World\'s Most Advanced Open Source Relational Database. Robust, reliable, and performance-driven.'
      },
      { 
          name: 'MySQL', 
          icon: Table, 
          color: '#00758F', // Official Blue
          desc: 'Relational Database',
          url: 'https://www.mysql.com',
          details: 'The world\'s most popular open source database. Reliable, scalable, and fast.'
      },
      { 
          name: 'Docker', 
          icon: Container, 
          color: '#2496ED', 
          desc: 'Containerization',
          url: 'https://www.docker.com',
          details: 'A platform designed to help developers build, share, and run modern applications in isolated environments.'
      },
      { 
          name: 'npm / pnpm', 
          icon: Package, 
          color: '#CB3837', 
          desc: 'Package Management',
          url: 'https://pnpm.io',
          details: 'Fast, disk space efficient package manager. Installs packages into a shared store and links them to projects.'
      }
    ]
  }
];

const proficiency = [
  { name: "Frontend Ecosystem (React, Next.js, Vite)", level: 98, color: "from-brand-cyan to-brand-indigo" },
  { name: "Backend Infrastructure (Node.js, Postgres, AWS)", level: 92, color: "from-brand-purple to-brand-indigo" },
  { name: "AI Engineering (LLMs, Agents, RAG)", level: 85, color: "from-brand-cyan to-green-400" },
];

const projects: Project[] = [
  {
    id: '1',
    title: 'Historia Clínica SaaS',
    description: 'Comprehensive medical record system for multi-specialty clinics. Features real-time sync, interactive 3D anatomy visualization, and dynamic PDF report generation.',
    longDescription: "A production-grade SaaS platform built for scale. It allows clinics to manage patient data securely with HIPAA-compliant architecture. The standout feature is the 3D interactive human model which doctors can rotate and annotate to visualize patient injuries or surgical sites. The system also handles appointment scheduling, billing, and pharmacy inventory.",
    features: [
        'Real-time data synchronization with Firebase Firestore',
        'Interactive 3D Anatomy using React Three Fiber',
        'Role-Based Access Control (RBAC) for Doctors/Staff',
        'Automated PDF prescription & report generation',
        'Secure Patient Portal'
    ],
    techStack: ['React 19', 'Firebase', 'Three.js', 'jsPDF', 'Zod'],
    imageUrl: 'https://picsum.photos/seed/medtech/600/400',
    featured: true,
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: '2',
    title: 'E-Commerce Dashboard',
    description: 'High-performance admin panel with complex data visualization, inventory management, and real-time analytics using Server Actions.',
    longDescription: "An analytical powerhouse for e-commerce managers. This dashboard aggregates data from multiple sales channels into a unified view. It features optimistic UI updates for instant feedback and heavy data caching for lightning-fast navigation. The backend processes millions of events daily to provide actionable insights.",
    features: [
        'Server Actions for mutation without API endpoints',
        'Complex Recharts visualizations with drill-down capability',
        'Optimistic UI updates for inventory management',
        'Dark mode first design system',
        'Automated daily revenue reports'
    ],
    techStack: ['TypeScript', 'Tailwind v4', 'Recharts', 'Node.js'],
    imageUrl: 'https://picsum.photos/seed/dashboard/600/400',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'Mobile Fitness Tracker',
    description: 'PWA for fitness tracking with geolocation, offline capabilities, and motion-based activity detection.',
    longDescription: "A mobile-first Progressive Web App that rivals native fitness applications. It uses the Geolocation API and Device Motion API to track runs and workouts, storing data locally in IndexedDB when offline and syncing when connection is restored. Gamification elements keep users engaged.",
    features: [
        'Offline-first architecture using Service Workers',
        'Geolocation tracking with map visualization',
        'PWA installability for native-like experience',
        'Motion detection for step counting',
        'Social sharing integration'
    ],
    techStack: ['React', 'Vite', 'Framer Motion', 'PWA'],
    imageUrl: 'https://picsum.photos/seed/fitness/600/400',
    demoUrl: '#'
  }
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "React 19 Server Components: A Practical Guide",
    excerpt: "Exploring the benefits and pitfalls of RSC in large-scale production applications and how it shifts the paradigm.",
    date: "Oct 15, 2024",
    readTime: "5 min read",
    tags: ["React", "Performance"]
  },
  {
    id: 2,
    title: "Why I Switched from Redux to Zustand",
    excerpt: "A deep dive into state management trends in 2025 and finding the right tool for minimizing boilerplate.",
    date: "Sep 22, 2024",
    readTime: "4 min read",
    tags: ["State", "Architecture"]
  },
  {
    id: 3,
    title: "Creating Immersive 3D Experiences with R3F",
    excerpt: "How to implement performant 3D backgrounds without killing the main thread or sacrificing accessibility.",
    date: "Aug 10, 2024",
    readTime: "7 min read",
    tags: ["Three.js", "WebGL"]
  }
];

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// --- Components ---
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
    window.addEventListener('scroll', handleScroll);
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
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-brand-indigo/20 p-2 rounded-lg group-hover:bg-brand-indigo/40 transition-colors">
            <Code2 className="text-brand-indigo w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            WebDesign<span className="text-brand-indigo">JE</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="relative text-sm font-medium hover:text-brand-cyan transition-colors group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <button onClick={toggleLang} className="text-xs font-bold px-2 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors">
            {lang}
          </button>
          
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/5 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="#contact" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
            {lang === 'EN' ? "Let's Talk" : 'Contáctame'}
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
                  {isDark ? <Sun size={14}/> : <Moon size={14} />} Theme
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Sections ---
const Hero = ({ lang }: { lang: Language }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Joseph Espinoza <br />
            <span className="gradient-text">Full-Stack & AI Engineer</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-slate-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed"
          >
            {lang === 'EN' 
              ? "Architecting the web of tomorrow with Next.js 15, AI Agents, and immersive 3D interfaces."
              : "Arquitectando la web del mañana con Next.js 15, Agentes de IA e interfaces 3D inmersivas."
            }
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="px-8 py-4 bg-brand-indigo hover:bg-brand-purple rounded-full font-bold text-white shadow-lg shadow-brand-indigo/30 transition-all"
            >
              {lang === 'EN' ? "View Work" : "Ver Proyectos"}
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/nicjespinoza" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass-panel rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Github size={20} />
              GitHub
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-4 text-sm text-slate-500 font-mono">
            <span>Next.js 15</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>AI Agents</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>RAG</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>Three.js</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand-indigo/20 rounded-full blur-[100px] animate-pulse"></div>
            <Scene3D />
            
            {/* Floating Tech Icons Decor */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 p-4 glass-panel rounded-2xl"
            >
              <Bot className="text-brand-cyan w-8 h-8" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 20, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 right-10 p-4 glass-panel rounded-2xl"
            >
              <Brain className="text-brand-purple w-8 h-8" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 right-0 p-3 glass-panel rounded-xl"
            >
              <Blocks className="text-brand-gold w-6 h-6" />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Main App Component
export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('ES');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'ES' ? 'EN' : 'ES');

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .gradient-text {
          background: linear-gradient(to right, #818cf8, #22d3ee, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
      <Hero lang={lang} />
      
      {/* 2026 Production Stack */}
      <section id="stack" className="py-20 container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-xs font-bold mb-4">
            <Layers size={14} /> Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            2026 <span className="gradient-text">Production Stack</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-center">
            Cutting-edge tools and frameworks for building scalable, performant applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="glass-panel p-6 rounded-2xl"
            >
              <motion.h3 variants={fadeInUp} className="text-xl font-bold text-slate-200 mb-6">
                {category.title}
              </motion.h3>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
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
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <item.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm group-hover:text-brand-cyan transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{item.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency Metrics */}
        <motion.div 
          className="mt-12 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="glass-panel p-6 rounded-2xl max-w-2xl mx-auto">
            <motion.h3 variants={fadeInUp} className="text-lg font-bold text-center mb-6 flex items-center justify-center gap-2">
              <Activity className="text-brand-gold" size={18} />
              <span className="text-white">Proficiency Metrics</span>
            </motion.h3>
            
            <div className="space-y-4">
              {proficiency.map((skill, index) => (
                <motion.div key={skill.name} variants={fadeInUp}>
                  <div className="flex justify-between mb-1 text-xs font-bold text-slate-300">
                    <span className="text-xs">{skill.name}</span>
                    <span className="text-white text-xs">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      variants={{
                        hidden: { width: 0 },
                        visible: { 
                          width: `${skill.level}%`,
                          transition: { duration: 1.2, ease: "easeOut", delay: 0.2 }
                        }
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-white/50 shadow-[0_0_5px_white]"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Premium Services */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold mb-4">
              <Star size={14} /> Premium Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Premium <span className="gradient-text">Services</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-center">
              Enterprise-grade solutions tailored to your specific needs.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Code2,
                title: "Desarrollo Web",
                description: "Aplicaciones web modernas y escalables con las últimas tecnologías del mercado.",
                features: [
                  "React, Next.js y TypeScript",
                  "Diseño responsive y UX/UI optimizada", 
                  "Integración con APIs y bases de datos",
                  "SEO y rendimiento optimizado"
                ]
              },
              {
                icon: Smartphone,
                title: "Desarrollo de App",
                description: "Aplicaciones móviles nativas y multiplataforma para iOS y Android.",
                features: [
                  "React Native y desarrollo nativo",
                  "Diseño intuitivo y experiencia de usuario",
                  "Integración con servicios backend",
                  "Publicación en App Store y Google Play"
                ]
              },
              {
                icon: Cpu,
                title: "AI Integration",
                description: "Integración de inteligencia artificial y machine learning en tus aplicaciones.",
                features: [
                  "Chatbots y asistentes virtuales",
                  "Procesamiento de lenguaje natural",
                  "Análisis de datos y predicciones",
                  "Agentes autónomos y automatización"
                ]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-2xl hover:border-brand-gold/30 transition-all group"
              >
                <div className="bg-brand-gold/10 p-3 rounded-xl text-brand-gold w-fit mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Age of AI Agents */}
      <section id="ai" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-purple text-xs font-bold mb-4">
              <Cpu size={14} /> AI Revolution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              The Age of <span className="gradient-text">AI Agents</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-center">
              Building intelligent systems that learn, adapt, and automate complex workflows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Brain,
                title: "Natural Language Processing",
                description: "Advanced text understanding and generation capabilities.",
                level: 95
              },
              {
                icon: Bot,
                title: "Autonomous Agents",
                description: "Self-directed AI systems that can execute complex tasks.",
                level: 88
              },
              {
                icon: Sparkles,
                title: "Machine Learning",
                description: "Predictive models and pattern recognition systems.",
                level: 92
              },
              {
                icon: Network,
                title: "Neural Networks",
                description: "Deep learning architectures for complex problem solving.",
                level: 85
              }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="glass-panel p-6 rounded-2xl text-center hover:border-brand-purple/50 transition-all"
              >
                <div className="bg-brand-purple/10 p-3 rounded-xl text-brand-purple w-fit mx-auto mb-4">
                  <skill.icon size={24} />
                </div>
                <h4 className="font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-slate-400 mb-4">{skill.description}</p>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
                  />
                </div>
                <span className="text-xs text-slate-400 mt-1">{skill.level}%</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[80px] -z-10"></div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">AI-Powered Solutions for Web & Apps</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4 text-brand-cyan flex items-center gap-2">
                  <Smartphone size={18} /> Web & App Features
                </h4>
                <ul className="space-y-3">
                  {[
                    "Chatbots inteligentes para atención al cliente 24/7",
                    "Recomendaciones personalizadas basadas en comportamiento",
                    "Análisis predictivo para optimización de servicios",
                    "Asistentes virtuales para guiar al usuario",
                    "Procesamiento automático de formularios y datos"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-brand-gold mt-0.5" size={16} />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-brand-purple flex items-center gap-2">
                  <Cpu size={18} /> Service Technologies
                </h4>
                <ul className="space-y-3">
                  {[
                    "Integración con OpenAI GPT-4 y Claude",
                    "Sistemas RAG para bases de conocimiento",
                    "Modelos de lenguaje personalizados",
                    "APIs RESTful para servicios AI",
                    "Procesamiento en tiempo real y escalable"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-brand-gold mt-0.5" size={16} />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Retrieval-Augmented Generation */}
      <section id="rag" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-indigo/30 bg-brand-indigo/10 text-brand-indigo text-xs font-bold mb-4">
              <DatabaseZap size={14} /> Architecture
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center">
              Retrieval-Augmented <span className="gradient-text">Generation</span>
            </h3>
            <p className="text-slate-400 mt-4 max-w-xl text-center">
              Advanced AI architecture combining retrieval systems with generative models.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 blur-[80px] -z-10"></div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-brand-cyan/10 p-4 rounded-xl text-brand-cyan w-fit mx-auto mb-4">
                  <Database size={32} />
                </div>
                <h4 className="font-bold mb-2">Knowledge Base</h4>
                <p className="text-sm text-slate-400">Vectorized documents and structured data for efficient retrieval</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-brand-purple/10 p-4 rounded-xl text-brand-purple w-fit mx-auto mb-4">
                  <Search size={32} />
                </div>
                <h4 className="font-bold mb-2">Semantic Search</h4>
                <p className="text-sm text-slate-400">Advanced embedding-based search for relevant context</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="text-center">
                <div className="bg-brand-gold/10 p-4 rounded-xl text-brand-gold w-fit mx-auto mb-4">
                  <Sparkles size={32} />
                </div>
                <h4 className="font-bold mb-2">Generation</h4>
                <p className="text-sm text-slate-400">Context-aware responses using retrieved information</p>
              </motion.div>
            </div>

            <div className="relative h-32 bg-black/20 rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute w-3 h-3 bg-brand-cyan rounded-full"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${50 + Math.sin(i) * 30}%`
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 text-center text-slate-400 text-sm">
                RAG Architecture Visualization
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-indigo/30 bg-brand-indigo/10 text-brand-indigo text-xs font-bold mb-4">
              <Code2 size={14} /> Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-center">
              Real-world applications showcasing modern development practices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="glass-panel rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => window.open(project.demoUrl || '#', '_blank')}
              >
                <div className="h-48 bg-gradient-to-br from-brand-indigo/20 to-brand-purple/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="text-white" size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-white/10 text-slate-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold mb-4">
              <User size={14} /> About
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-center">
              Passionate developer crafting digital experiences with precision and creativity.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="glass-panel p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Joseph Espinoza</h3>
                <p className="text-slate-300 mb-4">
                  Full-stack developer specializing in modern web technologies and AI-powered solutions.
                  With a passion for creating exceptional user experiences and robust backend systems.
                </p>
                <p className="text-slate-300">
                  Beyond the code, I am a digital architect obsessed with precision. My journey started not just with syntax, 
                  but with a desire to build systems that feel <span className="text-white font-medium border-b border-brand-gold/30 pb-0.5">alive</span>. 
                </p>
                <p className="text-slate-300 mt-4">
                  I blend technical rigor with an artist's eye, ensuring every pixel serves a purpose and every function runs with elegant efficiency. 
                  My philosophy is simple: <span className="text-brand-gold/90">Performance is the ultimate luxury.</span>
                </p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                {[
                  { icon: Briefcase, title: "50+ Projects", subtitle: "Delivered Globally" },
                  { icon: Award, title: "Award Winning", subtitle: "Design Excellence" },
                  { icon: Terminal, title: "Full Stack", subtitle: "End-to-End Control" },
                  { icon: User, title: "Leadership", subtitle: "Team Mentoring" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    className="glass-panel p-4 rounded-xl border border-white/5 hover:border-brand-gold/20 transition-colors flex items-center gap-4 group"
                  >
                    <div className="bg-brand-gold/10 p-3 rounded-lg text-brand-gold group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{item.subtitle}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="glass-panel p-8 rounded-2xl">
                <div className="aspect-square bg-gradient-to-br from-brand-indigo/20 to-brand-purple/20 rounded-xl flex items-center justify-center">
                  <User className="text-brand-cyan" size={128} />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { label: 'Type Safety', val: '100%', color: 'text-brand-cyan' },
              { label: 'Performance', val: '98/100', color: 'text-brand-purple' },
              { label: 'Uptime', val: '99.9%', color: 'text-brand-indigo' },
              { label: 'Satisfaction', val: '100%', color: 'text-brand-gold' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                variants={fadeInUp} 
                className="glass-panel p-6 rounded-2xl text-center border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
              >
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.val}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Insights */}
      <section id="blog" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-xs font-bold mb-4">
              <BookOpen size={14} /> Technical Writing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Latest <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-center">
              Thoughts on software architecture, modern frontend development, and the future of the web.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of AI in Web Development",
                excerpt: "Exploring how artificial intelligence is reshaping the way we build and interact with web applications.",
                date: "Dec 15, 2024",
                readTime: "5 min read",
                tags: ["AI", "Web Dev"]
              },
              {
                title: "Mastering React Server Components",
                excerpt: "Deep dive into the new paradigm of React Server Components and their impact on performance.",
                date: "Dec 10, 2024",
                readTime: "8 min read",
                tags: ["React", "Performance"]
              },
              {
                title: "Building Scalable Microservices",
                excerpt: "Best practices for designing and implementing microservices architecture in modern applications.",
                date: "Dec 5, 2024",
                readTime: "6 min read",
                tags: ["Architecture", "Backend"]
              }
            ].map((post, index) => (
              <motion.article
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-panel p-6 rounded-2xl flex flex-col h-full hover:border-brand-indigo/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-brand-cyan transition-colors">{post.title}</h3>
                
                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-brand-indigo hover:text-white transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 blur-[80px] -z-10"></div>
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="gradient-text">Touch</span></h2>
              <p className="text-slate-400">Have a project in mind? Let's build something extraordinary together.</p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Name</label>
                  <input 
                    type="text"
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Email</label>
                  <input 
                    type="email"
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="px-8 py-4 bg-brand-indigo hover:bg-brand-purple text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-brand-indigo/25"
                >
                  Send Message <Send size={18} />
                </button>
              </div>
            </form>

            <div className="mt-12 flex justify-center gap-8 border-t border-white/10 pt-8">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={24} /></a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative z-10 border-t border-white/5 bg-slate-950 overflow-hidden">
        <FooterParticles />
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Code2 className="text-brand-indigo w-5 h-5" />
              <span className="text-lg font-bold tracking-tight text-slate-200">
                WebDesign<span className="text-brand-indigo">JE</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Joseph Espinoza.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { name: 'Stack', href: '#stack' },
              { name: 'Services', href: '#services' },
              { name: 'AI & Agents', href: '#ai' },
              { name: 'Projects', href: '#projects' },
              { name: 'About', href: '#about' },
              { name: 'Blog', href: '#blog' },
            ].map(link => (
              <a key={link.name} href={link.href} className="text-sm text-slate-400 hover:text-brand-cyan transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
