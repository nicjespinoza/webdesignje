import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Database, 
  Box, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  FileCode, 
  Globe, 
  Server, 
  Cpu, 
  Palette, 
  ArrowRight, 
  Calendar, 
  Clock, 
  BookOpen,
  Atom,
  Zap,
  Wind,
  Flame,
  Bot,            // AI
  Brain,          // AI
  Sparkles,       // AI
  Workflow,       // AI
  Container,      // Docker
  Braces,         // JS
  LayoutTemplate, // HTML/Layout
  DatabaseZap,    // Supabase/Vector
  Network,        // Neural Net
  Blocks,         // Next.js
  CheckCircle,    // RAG section
  ClipboardList,  // React Hook Form
  ShieldCheck,    // Zod
  BarChart3,      // Recharts
  FileText,       // jsPDF
  Package,        // npm/pnpm
  Hash,           // PostCSS
  FileCog,        // tsconfig
  Table,          // MySQL
  Activity,       // TanStack Query
  Award,          // New for About
  Briefcase,      // New for About
  Terminal,       // New for About
  User            // New for About
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import ParticleBackground from './components/ParticleBackground';
import Scene3D from './components/Scene3D';
import { Project, Language } from './types';

// --- Configuration & Data ---

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

const blogPosts = [
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

type ContactFormValues = z.infer<typeof contactSchema>;

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
    { name: lang === 'EN' ? 'AI & Agents' : 'IA & Agentes', href: '#ai' },
    { name: lang === 'EN' ? 'Projects' : 'Proyectos', href: '#projects' },
    { name: lang === 'EN' ? 'About' : 'Sobre mí', href: '#about' },
    { name: lang === 'EN' ? 'Blog' : 'Blog', href: '#blog' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'py-5 bg-transparent'}`}>
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
            className="md:hidden glass-panel border-t border-white/10"
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
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            Available for new projects
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Joseph Espinoza <br />
            <span className="gradient-text">Full-Stack & AI Engineer</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            {lang === 'EN' 
              ? "Architecting the web of tomorrow with Next.js 15, AI Agents, and immersive 3D interfaces."
              : "Arquitectando la web del mañana con Next.js 15, Agentes de IA e interfaces 3D inmersivas."
            }
          </p>

          <div className="flex flex-wrap gap-4">
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
              href="#contact" 
              className="px-8 py-4 glass-panel rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Github size={20} />
              GitHub
            </motion.a>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-slate-500 font-mono">
            <span>Next.js 15</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>AI Agents</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>RAG</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>Three.js</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
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

const TechStack = () => {
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

  return (
    <section id="stack" className="py-24 relative">
        <div className="container mx-auto px-6 mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Layers className="text-brand-purple" />
              <span className="gradient-text">2026 Production Stack</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-2xl">
              Foundational mastery meets cutting-edge frameworks. A robust toolkit designed for the modern web ecosystem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, catIndex) => (
                <div key={category.title} className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-slate-200 border-l-4 border-brand-indigo pl-4">
                    {category.title}
                  </h3>
                  <div className="flex flex-col gap-4">
                      {category.items.map((skill, index) => (
                          <motion.a
                              key={skill.name}
                              href={skill.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                              whileHover={{ x: 5, scale: 1.02 }}
                              className="glass-panel p-4 rounded-xl border border-white/5 hover:border-brand-indigo/30 transition-all group flex items-start gap-4 relative cursor-pointer"
                          >
                               {/* Tooltip */}
                               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
                                    <p className="text-xs text-slate-300 leading-relaxed text-center">{skill.details}</p>
                                    <div className="mt-3 pt-3 border-t border-white/10 flex justify-center items-center gap-1 text-[10px] text-brand-indigo font-bold tracking-wider uppercase">
                                       <span>Official Documentation</span> <ExternalLink size={10} />
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-white/10 transform rotate-45"></div>
                               </div>

                              <div className="p-3 rounded-lg bg-white/5 border border-white/5 shadow-sm group-hover:shadow-md group-hover:shadow-brand-indigo/20 transition-all shrink-0">
                                  <skill.icon size={24} style={{ color: skill.color }} />
                              </div>
                              <div>
                                  <h4 className="font-bold text-base text-slate-100 group-hover:text-white transition-colors">{skill.name}</h4>
                                  <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors mt-1 leading-relaxed">{skill.desc}</p>
                              </div>
                          </motion.a>
                      ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
    </section>
  );
};

const AIRevolution = () => {
    const aiSkills = [
        { name: 'Autonomous Agents', icon: Bot, desc: 'Self-governing systems that plan, critique, and execute complex workflows without human intervention.' },
        { name: 'LLM Orchestration', icon: Brain, desc: 'Advanced pipelines combining Gemini 1.5 & open-source models for optimal performance.' },
        { name: 'Knowledge Networks', icon: Network, desc: 'RAG systems integrated with vector databases for infinite context and memory.' },
        { name: 'Generative UI', icon: Sparkles, desc: 'Fluid interfaces that evolve and adapt layout based on conversation context.' },
    ];

    return (
        <section id="ai" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-indigo/5 pointer-events-none"></div>
            {/* Ambient background glow */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-xs font-bold mb-6"
                        >
                            <Network size={14} /> Artificial Intelligence
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                        >
                            The Age of <br />
                            <span className="bg-gradient-to-r from-brand-cyan via-white to-brand-purple bg-clip-text text-transparent">
                                AI Agents
                            </span>
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-400 mb-8 leading-relaxed"
                        >
                            Moving beyond simple chatbots. I build intelligent multi-agent systems capable of planning, 
                            executing, and reviewing complex tasks autonomously. Leveraging the latest in LLM orchestration
                            to create software that thinks, adapts, and evolves.
                        </motion.p>
                        
                        <motion.button 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/5 border border-brand-cyan/30 hover:bg-brand-cyan/10 text-brand-cyan rounded-full font-bold transition-all flex items-center gap-2 group"
                        >
                             Explore AI Solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {aiSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="glass-panel p-6 rounded-2xl border-t border-t-brand-cyan/20 hover:border-brand-cyan/40 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                            >
                                <div className="bg-brand-cyan/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <skill.icon className="w-6 h-6 text-brand-cyan" />
                                </div>
                                <h3 className="font-bold text-lg text-white mb-2">{skill.name}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RAG Subsection */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan via-white to-brand-purple opacity-30"></div>
                    
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 mb-4 text-brand-purple font-mono text-sm">
                                <DatabaseZap size={16} />
                                <span>RAG Architecture</span>
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-white">
                                Retrieval-Augmented Generation
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-8">
                                Traditional LLMs are limited by their training data cutoff. RAG bridges this gap by connecting models to your live, private data sources. 
                                By retrieving relevant context from vector indices before generating a response, we ensure answers are accurate, up-to-date, and domain-specific.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-brand-purple/20 p-2 rounded-lg text-brand-purple mt-1">
                                        <Database size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-200">Vector Search</h4>
                                        <p className="text-xs text-slate-500 mt-1">Semantic similarity matching using high-dimensional embeddings.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-brand-cyan/20 p-2 rounded-lg text-brand-cyan mt-1">
                                        <Brain size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-200">Context Window</h4>
                                        <p className="text-xs text-slate-500 mt-1">Injecting retrieved chunks into the LLM's short-term memory.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full bg-black/40 rounded-xl p-6 border border-white/5 relative">
                             {/* Abstract Visualization of RAG */}
                             <div className="flex justify-between items-center mb-8 relative z-10">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-2 border border-slate-700">
                                        <Database className="text-slate-400" />
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono">Knowledge Base</div>
                                </div>
                                
                                <div className="flex-1 h-px bg-slate-700 mx-4 relative">
                                    <motion.div 
                                        animate={{ x: [-20, 20, -20] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute top-1/2 left-1/2 -translate-y-1/2 w-2 h-2 bg-brand-cyan rounded-full shadow-[0_0_10px_#22d3ee]"
                                    ></motion.div>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-brand-purple/20 rounded-xl flex items-center justify-center mx-auto mb-2 border border-brand-purple/50 shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                                        <Brain className="text-brand-purple" />
                                    </div>
                                    <div className="text-xs text-brand-purple font-mono">LLM Reasoning</div>
                                </div>

                                <div className="flex-1 h-px bg-slate-700 mx-4 relative">
                                     <motion.div 
                                        animate={{ x: [-20, 20, -20] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                                        className="absolute top-1/2 left-1/2 -translate-y-1/2 w-2 h-2 bg-brand-purple rounded-full shadow-[0_0_10px_#7c3aed]"
                                    ></motion.div>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-2 border border-slate-700">
                                        <Sparkles className="text-white" />
                                    </div>
                                    <div className="text-xs text-slate-500 font-mono">Perfect Answer</div>
                                </div>
                             </div>

                             <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-300 bg-white/5 p-3 rounded-lg">
                                    <CheckCircle size={16} className="text-green-400" />
                                    <span>Zero hallucinations via grounded truth</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300 bg-white/5 p-3 rounded-lg">
                                    <CheckCircle size={16} className="text-green-400" />
                                    <span>Access to private & real-time data</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Projects = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const selectedProject = projects.find(p => p.id === selectedId);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedId]);

  return (
    <section id="projects" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
        Featured <span className="gradient-text">Projects</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
            // Skeleton Loaders for Projects
            [1, 2, 3].map((i) => (
                <div key={i} className="glass-panel rounded-2xl overflow-hidden h-[400px] animate-pulse border border-white/5">
                    <div className="h-48 bg-white/5 w-full" />
                    <div className="p-6">
                        <div className="h-7 bg-white/10 rounded w-3/4 mb-4" />
                        <div className="h-4 bg-white/5 rounded w-full mb-2" />
                        <div className="h-4 bg-white/5 rounded w-5/6 mb-6" />
                        <div className="flex gap-2 mb-6">
                             <div className="h-6 w-16 bg-white/5 rounded" />
                             <div className="h-6 w-16 bg-white/5 rounded" />
                             <div className="h-6 w-16 bg-white/5 rounded" />
                        </div>
                        <div className="h-5 w-24 bg-white/10 rounded" />
                    </div>
                </div>
            ))
        ) : (
            projects.map((project, index) => (
            <motion.div
                layoutId={`card-container-${project.id}`}
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`glass-panel rounded-2xl overflow-hidden group hover:border-brand-indigo/50 transition-colors cursor-pointer ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
            >
                <motion.div layoutId={`image-wrapper-${project.id}`} className={`relative overflow-hidden ${project.featured ? 'h-64 md:h-80' : 'h-48'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <motion.img 
                    layoutId={`image-${project.id}`}
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20">
                    <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-white">{project.title}</motion.h3>
                </div>
                </motion.div>

                <motion.div className="p-6">
                <motion.p className="text-slate-300 mb-6 leading-relaxed">
                    {project.description}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-brand-cyan">
                        {tech}
                    </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    <div className="text-sm font-bold text-brand-indigo flex items-center gap-1">
                        See Details <ArrowRight size={14} />
                    </div>
                </div>
                </motion.div>
            </motion.div>
            ))
        )}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
                layoutId={`card-container-${selectedId}`}
                className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col shadow-2xl"
            >
                <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
                >
                    <X size={20} />
                </button>

                <motion.div layoutId={`image-wrapper-${selectedId}`} className="relative h-64 sm:h-80 shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                     <motion.img 
                        layoutId={`image-${selectedId}`}
                        src={selectedProject.imageUrl} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                         <motion.h3 layoutId={`title-${selectedId}`} className="text-3xl md:text-4xl font-bold text-white">{selectedProject.title}</motion.h3>
                    </div>
                </motion.div>

                <div className="p-6 md:p-8 overflow-y-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-4">Project Overview</h4>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                {selectedProject.longDescription || selectedProject.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedProject.techStack.map(tech => (
                                <span key={tech} className="px-3 py-1 bg-brand-indigo/20 border border-brand-indigo/30 rounded-full text-sm text-brand-indigo">
                                    {tech}
                                </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                {selectedProject.demoUrl && (
                                <a href={selectedProject.demoUrl} className="flex items-center gap-2 px-6 py-3 bg-brand-indigo hover:bg-brand-purple text-white rounded-full font-bold transition-all">
                                    <ExternalLink size={18} /> Live Demo
                                </a>
                                )}
                                {selectedProject.githubUrl && (
                                <a href={selectedProject.githubUrl} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold transition-all">
                                    <Github size={18} /> Source Code
                                </a>
                                )}
                            </div>
                        </div>

                        <div className="md:w-1/3 bg-white/5 p-6 rounded-2xl h-fit border border-white/5">
                             <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles size={18} className="text-brand-gold" /> Key Features
                             </h4>
                             <ul className="space-y-3">
                                {(selectedProject.features || []).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                        <CheckCircle size={16} className="text-brand-cyan shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Existing Philosophy Section */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden mb-32">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 blur-[80px] -z-10"></div>

          <h2 className="text-3xl font-bold mb-6">Philosophy & Approach</h2>
          <div className="space-y-6 text-lg text-slate-300">
            <p>
              My development philosophy centers on <span className="text-brand-cyan font-bold">Performance First</span>. 
              Using tools like React 19 and Tailwind v4, I build applications that are not just visually stunning but lightning fast.
            </p>
            <p>
              I believe in <span className="text-brand-gold font-bold">Strict Typing</span>. TypeScript isn't optional; 
              it's the backbone of scalable, maintainable codebases that resist bugs as they grow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Type Safety', val: '100%' },
              { label: 'Performance', val: '98/100' },
              { label: 'Uptime', val: '99.9%' },
              { label: 'Satisfaction', val: '100%' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NEW GOLD & BLACK ABOUT SECTION */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row gap-16 items-center">
             
             {/* Visual Profile Column */}
             <div className="relative w-full md:w-5/12">
                <div className="absolute inset-0 bg-brand-gold/10 blur-[80px] rounded-full -z-10"></div>
                
                <div className="relative z-10">
                   <div className="border border-brand-gold/30 p-2 rounded-2xl bg-black/40 backdrop-blur-sm relative">
                      {/* Image Placeholder */}
                      <img 
                        src="https://picsum.photos/seed/joseph/800/800" 
                        alt="Profile" 
                        className="w-full aspect-square object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      
                      {/* Floating 'Experience' Badge */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-6 -right-6 bg-brand-gold text-black p-6 rounded-xl shadow-[0_10px_30px_rgba(251,191,36,0.3)] border border-white/20"
                      >
                         <div className="text-3xl font-bold leading-none mb-1">10+</div>
                         <div className="text-xs font-bold uppercase tracking-wider opacity-80">Years Exp.</div>
                      </motion.div>
                   </div>
                </div>

                {/* Decorative lines */}
                <div className="absolute -top-10 -left-10 w-24 h-24 border-t-2 border-l-2 border-brand-gold/20 rounded-tl-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
             </div>

             {/* Text Content Column */}
             <div className="w-full md:w-7/12">
                <div className="flex items-center gap-3 mb-6">
                   <div className="h-px w-12 bg-brand-gold"></div>
                   <span className="text-brand-gold font-mono text-sm tracking-widest uppercase">Sobre Mí</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                   Crafting Digital <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold">Masterpieces</span>
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                   Beyond the code, I am a digital architect obsessed with precision. My journey started not just with syntax, 
                   but with a desire to build systems that feel <span className="text-white font-medium">alive</span>. 
                   I blend technical rigor with an artist's eye, ensuring every pixel serves a purpose and every function runs with elegant efficiency.
                </p>

                {/* Stats / Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                   <div className="bg-white/5 border border-brand-gold/10 p-4 rounded-lg flex items-center gap-4 hover:border-brand-gold/30 transition-colors">
                      <div className="bg-brand-gold/10 p-3 rounded-full text-brand-gold">
                         <Briefcase size={20} />
                      </div>
                      <div>
                         <div className="text-white font-bold">50+ Projects</div>
                         <div className="text-xs text-slate-500">Delivered Globally</div>
                      </div>
                   </div>

                   <div className="bg-white/5 border border-brand-gold/10 p-4 rounded-lg flex items-center gap-4 hover:border-brand-gold/30 transition-colors">
                      <div className="bg-brand-gold/10 p-3 rounded-full text-brand-gold">
                         <Award size={20} />
                      </div>
                      <div>
                         <div className="text-white font-bold">Award Winning</div>
                         <div className="text-xs text-slate-500">Design Excellence</div>
                      </div>
                   </div>

                   <div className="bg-white/5 border border-brand-gold/10 p-4 rounded-lg flex items-center gap-4 hover:border-brand-gold/30 transition-colors">
                      <div className="bg-brand-gold/10 p-3 rounded-full text-brand-gold">
                         <Terminal size={20} />
                      </div>
                      <div>
                         <div className="text-white font-bold">Full Stack</div>
                         <div className="text-xs text-slate-500">End-to-End Control</div>
                      </div>
                   </div>

                   <div className="bg-white/5 border border-brand-gold/10 p-4 rounded-lg flex items-center gap-4 hover:border-brand-gold/30 transition-colors">
                      <div className="bg-brand-gold/10 p-3 rounded-full text-brand-gold">
                         <User size={20} />
                      </div>
                      <div>
                         <div className="text-white font-bold">Leadership</div>
                         <div className="text-xs text-slate-500">Team Mentoring</div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-6 items-center">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" className="h-12 opacity-50 invert" alt="Signature" />
                   <div className="h-px flex-1 bg-white/10"></div>
                </div>
             </div>

          </div>
        </div>

      </div>
    </section>
  );
};

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="blog" className="py-20 container mx-auto px-6">
      <div className="flex flex-col items-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-xs font-bold mb-4">
          <BookOpen size={14} /> Technical Writing
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Latest <span className="gradient-text">Insights</span>
        </h2>
        <p className="text-slate-400 mt-4 max-w-xl text-center">
          Thoughts on software architecture, modern frontend development, and the future of the web.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {isLoading ? (
            // Skeleton Loaders for Blog
            [1, 2, 3].map((i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl h-80 flex flex-col animate-pulse border border-white/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-4 w-20 bg-white/10 rounded" />
                        <div className="h-4 w-20 bg-white/10 rounded" />
                    </div>
                    <div className="h-8 bg-white/10 rounded w-full mb-4" />
                    <div className="h-8 bg-white/10 rounded w-2/3 mb-6" />
                    
                    <div className="h-4 bg-white/5 rounded w-full mb-3" />
                    <div className="h-4 bg-white/5 rounded w-full mb-3" />
                    <div className="h-4 bg-white/5 rounded w-3/4 mb-auto" />

                    <div className="flex justify-between items-center mt-6">
                        <div className="flex gap-2">
                             <div className="h-5 w-12 bg-white/5 rounded" />
                             <div className="h-5 w-12 bg-white/5 rounded" />
                        </div>
                        <div className="h-6 w-6 bg-white/10 rounded-full" />
                    </div>
                </div>
            ))
        ) : (
            blogPosts.map((post, index) => (
            <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
            ))
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    reset();
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 blur-[80px] -z-10"></div>
             
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="gradient-text">Touch</span></h2>
                <p className="text-slate-400">Have a project in mind? Let's build something extraordinary together.</p>
             </div>

             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300">Name</label>
                        <input 
                            {...register('name')}
                            className={`w-full bg-black/20 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-colors`}
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300">Email</label>
                        <input 
                            {...register('email')}
                            className={`w-full bg-black/20 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-colors`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Message</label>
                    <textarea 
                        {...register('message')}
                        rows={5}
                        className={`w-full bg-black/20 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:border-brand-indigo/50 transition-colors resize-none`}
                        placeholder="Tell me about your project..."
                    />
                    {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                </div>

                <div className="flex justify-end">
                    <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="px-8 py-4 bg-brand-indigo hover:bg-brand-purple text-white rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-indigo/25"
                    >
                        {isSubmitting ? (
                            <>Sending...</>
                        ) : (
                            <>Send Message <Send size={18} /></>
                        )}
                    </button>
                </div>
             </form>

             <div className="mt-12 flex justify-center gap-8 border-t border-white/10 pt-8">
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={24} /></a>
             </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Language>('EN');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(prev => prev === 'EN' ? 'ES' : 'EN');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'} font-sans`}>
      <ParticleBackground />
      
      <Navbar isDark={isDark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
      
      <main>
        <Hero lang={lang} />
        <TechStack />
        <AIRevolution />
        <Projects />
        <About />
        <Blog />
        <Contact />
      </main>

      <footer className="py-8 text-center text-slate-600 text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} Joseph Espinoza. Built with React 19, Tailwind v4 & Love.</p>
      </footer>
    </div>
  );
};

export default App;