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

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
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
    title: "Frontend (Núcleo)",
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
    title: "Datos, Formularios y Utilidades",
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
    title: "Backend y DevOps",
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
  { name: "Construcción de Interfaces Frontend Modernas y Optimizadas", level: 98, color: "from-[#C69320] to-yellow-500" },
  { name: "Infraestructura Backend Robusta y Escalable en la Nube", level: 92, color: "from-[#C69320] to-yellow-500" },
  { name: "Ingeniería de IA Avanzada para Soluciones Inteligentes", level: 85, color: "from-[#C69320] to-green-400" },
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
    demoUrl: '/portal'
  },
  {
    id: '2',
    title: 'POS Tienda e Inventario',
    description: 'Cloud-based Point of Sale specifically designed for footwear retail. Real-time inventory tracking by size, color, and model.',
    longDescription: "A specialized POS system for the footwear industry. It manages complex inventory with multiple variants, handles multi-store synchronization, and provides detailed sales analytics. Integrated with local payment gateways and automated invoice generation.",
    features: [
      'Multi-variant inventory management',
      'Real-time sales reporting and analytics',
      'Customer loyalty program integration',
      'Optimized for mobile and tablet devices',
      'Firebase offline persistence'
    ],
    techStack: ['Next.js', 'Firebase', 'Tailwind CSS', 'Cloud Functions'],
    imageUrl: 'https://picsum.photos/seed/shoes/600/400',
    githubUrl: '#',
    demoUrl: '/demos/pos'
  },
  {
    id: '3',
    title: 'Hotel Management System',
    description: 'Unified platform for hotel bookings, room management, and guest services. Features a premium glassmorphic guest portal.',
    longDescription: "An all-in-one hospitality engine. From the front desk to the guest's phone, this system streamlines every interaction. It includes a booking engine, housekeeping management, and a guest dashboard for services like room service and spa bookings.",
    features: [
      'Real-time room availability calendar',
      'Interactive Guest Dashboard',
      'Automated check-in/check-out workflow',
      'Revenue management analytics',
      'Multi-language support'
    ],
    techStack: ['TypeScript', 'Framer Motion', 'Figma', 'Stripe'],
    imageUrl: 'https://picsum.photos/seed/hotel/600/400',
    githubUrl: '#',
    demoUrl: '/demos/hotel'
  },
  {
    id: '4',
    title: 'Eve Commerce',
    description: 'Advanced E-commerce platform with a focus on high-end fashion and seamless shopping experience.',
    longDescription: "A luxury e-commerce experience. This project pushes the boundaries of web design with immersive product views, smooth transitions, and a highly optimized checkout flow. Designed to showcase fashion collections with premium aesthetics.",
    features: [
      'High-performance product gallery',
      'Animated shopping cart transitions',
      'Secure payment gateway integration',
      'Customizable product collections',
      'SEO and speed optimized'
    ],
    techStack: ['Shopify SDK', 'Next.js', 'React 19', 'PostCSS'],
    imageUrl: 'https://picsum.photos/seed/fashion/600/400',
    githubUrl: '#',
    demoUrl: '/demos/evecommerce'
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

const StackSection = () => {
  return (
    <section id="stack" className="py-20 container mx-auto px-6">
      <div
        className="flex flex-col items-center mb-10 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-3 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
          <Layers size={14} /> Technology
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-center text-white tracking-tight">
          <span className="gradient-text">Pila de Producción</span>
        </h2>
        <p className="gradient-text-platinum mt-3 max-w-3xl text-center text-lg">
          Utilizo las tecnologías más avanzadas del mercado, cuidadosamente integradas para construir aplicaciones de alto impacto que ofrecen una experiencia excepcional y una base sólida para el crecimiento de su negocio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.title}
            variants={fadeInUp}
            className="liquid-gold-card"
          >
            <div className="liquid-gold-content">
              <motion.h3 variants={fadeInUp} className="text-xl font-bold text-slate-200 mb-6">
                {category.title}
              </motion.h3>
              <div className="space-y-4">
                {category.items.map((item) => {
                  let logoFileName = '';
                  switch (item.name) {
                    case 'React 19': logoFileName = 'react'; break;
                    case 'Next.js 15': logoFileName = 'nextdotjs'; break;
                    case 'Vite': logoFileName = 'vite'; break;
                    case 'React Three Fiber': logoFileName = 'reactthreefiber'; break;
                    case 'Tailwind v4': logoFileName = 'tailwindcss'; break;
                    case 'Framer Motion': logoFileName = 'framer'; break;
                    case 'PostCSS': logoFileName = 'postcss'; break;
                    case 'TypeScript': logoFileName = 'typescript'; break;
                    case 'React Hook Form': logoFileName = 'reacthookform'; break;
                    case 'Zod': logoFileName = 'zod'; break;
                    case 'Recharts': logoFileName = 'rechartsjs'; break;
                    case 'jsPDF': logoFileName = 'jspdf'; break;
                    case 'TanStack Query': logoFileName = 'tanstack'; break;
                    case 'Node.js': logoFileName = 'nodedotjs'; break;
                    case 'Supabase': logoFileName = 'supabase'; break;
                    case 'Firebase': logoFileName = 'firebase'; break;
                    case 'PostgreSQL': logoFileName = 'postgresql'; break;
                    case 'MySQL': logoFileName = 'mysql'; break;
                    case 'Docker': logoFileName = 'docker'; break;
                    case 'npm / pnpm': logoFileName = 'npm'; break;
                    default: logoFileName = item.name.toLowerCase().replace(/\./g, '').replace(/ /g, '').replace(/\//g, '-');
                  }
                  const logoSrc = `/logos/${logoFileName}.svg`;

                  return (
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
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        <Image src={logoSrc} alt={item.name} width={24} height={24} className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm group-hover:text-[#FBE18D] transition-colors truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">{item.desc}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 mb-8 relative z-20 opacity-100 visible">
        <div className="liquid-gold-card max-w-2xl mx-auto !opacity-100 !block">
          <div className="liquid-gold-content">
            <h3 className="text-lg font-bold text-center mb-6 flex items-center justify-center gap-2">
              <Activity className="text-[#FBE18D]" size={18} />
              <span className="gradient-text">Dominio de Habilidades Clave</span>
            </h3>

            <div className="space-y-4">
              {proficiency.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1 text-xs font-bold text-slate-300">
                    <span className="text-xs">{skill.name}</span>
                    <span className="text-white text-xs">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-white/50 shadow-[0_0_5px_white]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-xs font-bold mb-4 group">
            <Star size={14} className="text-slate-300 group-hover:text-[#FBE18D]" /> <span className="gradient-text-platinum group-hover:gradient-text">Métricas de Competencia</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            <span className="gradient-text">Soluciones de Alto Impacto</span>
          </h2>
          <p className="gradient-text-platinum mt-4 max-w-3xl text-center">
            Creamos aplicaciones de alto rendimiento con arquitecturas de vanguardia, diseñadas para transformar sus ideas en resultados tangibles y escalables.
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
              description: "Creamos experiencias web modernas y escalables que cautivan a sus usuarios y potencian su presencia digital.",
              features: [
                "Tecnologías de Vanguardia para un Rendimiento Superior",
                "Experiencias de Usuario Intuitivas y Adaptables a Cualquier Dispositivo",
                "Conectividad Total con sus Sistemas Existentes",
                "Máxima Visibilidad y Velocidad de Carga para su Audiencia"
              ]
            },
            {
              icon: Smartphone,
              title: "Desarrollo de App",
              description: "Desarrollamos aplicaciones móviles intuitivas y de alto rendimiento, llevando su negocio directamente a las manos de sus clientes en iOS y Android.",
              features: [
                "Aplicaciones Nativas y Multiplataforma para Máximo Alcance",
                "Interfaces Atractivas que Encantan a sus Usuarios",
                "Funcionalidad Robusta y Escalable para sus Necesidades",
                "Lanzamiento Exitoso y Gestión Simplificada en Todas las Tiendas"
              ]
            },
            {
              icon: Cpu,
              title: "Inteligencia Artificial Aplicada",
              description: "Impulsamos sus aplicaciones con inteligencia artificial y machine learning, transformando datos en decisiones estratégicas y automatizando procesos clave.",
              features: [
                "Atención al Cliente Inteligente y Automatizada 24/7",
                "Análisis Profundo y Comprensión del Lenguaje Humano",
                "Decisiones Estratégicas Basadas en Datos y Predicciones Precisas",
                "Optimización de Procesos Clave con Inteligencia Autónoma"
              ]
            }
          ].map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="liquid-gold-card"
            >
              <div className="liquid-gold-content">
                <div className="bg-[#FBE18D]/10 p-3 rounded-xl text-slate-300 w-fit mb-6 group-hover:scale-110 group-hover:text-[#FBE18D] transition-transform">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-400 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2 mt-auto">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 bg-[#FBE18D] rounded-full shadow-[0_0_8px_#FBE18D]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AISection = () => {
  return (
    <section id="ai" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4">
            <Cpu size={14} /> IA Revolucionaria
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            IA que Genera <span className="gradient-text">Resultados Reales</span>
          </h2>
          <p className="gradient-text-platinum mt-4 max-w-3xl text-center">
            Transformamos datos complejos en decisiones inteligentes que impulsan el crecimiento de tu empresa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Brain,
              title: "Procesamiento de Lenguaje Natural",
              description: "Atención al cliente, chatbots inteligentes, análisis de sentimientos, traducción automática en múltiples idiomas.",
              level: 95
            },
            {
              icon: Bot,
              title: "Agentes que Trabajan por Vos",
              description: "Desde gestión de citas hasta procesamiento de pedidos, todo sin supervisión humana.",
              level: 88
            },
            {
              icon: Sparkles,
              title: "Machine Learning Predictivo",
              description: "Anticipa tendencias, comportamientos de clientes y riesgos operativos en tiempo real.",
              level: 92
            },
            {
              icon: Network,
              title: "Deep Learning a Medida",
              description: "Modelos personalizados entrenados con tus datos específicos para resultados únicos.",
              level: 85
            }
          ].map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={fadeInUp}
              className="liquid-gold-card"
            >
              <div className="liquid-gold-content text-center items-center">
                <div className="bg-[#FBE18D]/10 p-3 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <skill.icon size={24} />
                </div>
                <h4 className="font-bold mb-2">{skill.title}</h4>
                <p className="text-sm text-slate-400 mb-4">{skill.description}</p>
                <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute h-full bg-gradient-to-r from-[#C69320] to-[#FBE18D] rounded-full shadow-[0_0_10px_#C69320]"
                  />
                </div>
                <span className="text-xs text-slate-400">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="visible"
          animate="visible"
          className="liquid-gold-card relative z-10"
        >
          <div className="liquid-gold-content p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Soluciones de IA que Transforman Tu Negocio Digital</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4 text-[#FBE18D] flex items-center gap-2">
                  <Smartphone size={18} /> IA Aplicada a Tus Productos Digitales
                </h4>
                <ul className="space-y-3">
                  {[
                    "Asistentes Virtuales que Nunca Duermen - Atención 24/7 en Múltiples Idiomas",
                    "Recomendaciones que Convierten - Personalización en Tiempo Real",
                    "Predicé lo que Tus Clientes Quieren - Optimización Proactiva",
                    "Guías Inteligentes que Acompañan a Cada Usuario",
                    "Cero Papel, Cero Errores - Procesamiento Automático de Documentos y Datos"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="text-[#FBE18D] mt-0.5" size={16} />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-[#FBE18D] flex items-center gap-2">
                  <Cpu size={18} /> Stack Tecnológico de IA
                </h4>
                <ul className="space-y-3">
                  {[
                    "Lo Mejor de la IA Global - CHATGPT, GROK, Claude, GEMENIS y mas Modelos",
                    "IA que Conoce Tu Negocio - Sistemas RAG con Tus Propios Datos",
                    "IA que Habla Tu Idioma - Modelos Entrenados con Tu Voz y Tono",
                    "Integración Sin Fricción - APIs Documentadas y Listas para Producción",
                    "Escala Sin Límites - Procesamiento en Tiempo Real para Miles de Usuarios"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="text-[#FBE18D] mt-0.5" size={16} />
                      <span className="text-sm text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const RAGSection = () => {
  return (
    <section id="rag" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4">
            <DatabaseZap size={14} /> OpenClaw Ecosystem
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-center">
            Arquitectura <span className="gradient-text">RAG: El Cerebro Detrás de OpenClaw</span>
          </h3>
          <p className="gradient-text-platinum mt-4 max-w-4xl text-center">
            La arquitectura que permite a OpenClaw, NanoClaw y Manus AI acceder a tu conocimiento empresarial y generar respuestas precisas en tiempo real.
          </p>

          {/* Product Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['OpenClaw', 'OpenClaude', 'NanoClaw', 'ZeroClaw', 'Manus AI'].map((product) => (
              <span key={product} className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#B8860B] via-[#C69320] to-[#B8860B] text-white rounded-full shadow-[0_0_20px_rgba(184,134,11,0.5)] hover:shadow-[0_0_35px_rgba(198,147,32,0.7)] transition-all duration-300">
                {product}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="visible"
          animate="visible"
          className="relative z-10"
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Database size={32} />
                </div>
                <h4 className="font-bold mb-2">Base de Conocimiento Vectorizada</h4>
                <p className="text-sm text-slate-400">Tus documentos, manuales y datos convertidos en embeddings. OpenClaw los indexa y recupera en milisegundos.</p>
              </div>

              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Search size={32} />
                </div>
                <h4 className="font-bold mb-2">Búsqueda Semántica Inteligente</h4>
                <p className="text-sm text-slate-400">No solo keywords: OpenClaw entiende el significado detrás de cada pregunta para recuperar el contexto exacto.</p>
              </div>

              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Sparkles size={32} />
                </div>
                <h4 className="font-bold mb-2">Generación de Respuestas con Contexto</h4>
                <p className="text-sm text-slate-400">OpenClaw combina lo recuperado con GPT-4/Claude para entregar respuestas precisas, citando fuentes y evitando alucinaciones.</p>
              </div>

              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Briefcase size={32} />
                </div>
                <h4 className="font-bold mb-2">Casos de Uso Reales</h4>
                <p className="text-sm text-slate-400">Soporte técnico (80% menos tickets), onboarding de empleados, análisis legal y médico, e-commerce inteligente.</p>
              </div>
            </div>

            {/* Pipeline Visual - Línea Segmentada entre Iconos */}
            <div className="relative py-8">
              {/* 4 Puntos del Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-20">
                {/* Punto 1: Documentos */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Círculo principal */}
                  <div className="relative mb-6">
                    {/* Glow exterior dinámico */}
                    <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    {/* Círculo con borde animado */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent border-2 border-blue-500/50 rounded-full flex items-center justify-center group hover:border-blue-400/80 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-sm"
                    >
                      {/* Anillo giratorio 1 */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-blue-400/30 rounded-full"
                      />

                      {/* Anillo giratorio 2 (Inverso) */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-blue-400/10 rounded-full"
                      />

                      {/* Icono central */}
                      <div className="bg-blue-500/30 p-3 md:p-4 rounded-full text-blue-400 group-hover:text-blue-200 transition-colors duration-300">
                        <FileText size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Contenido */}
                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-blue-400 text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Documentos</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Tus datos en cualquier formato: PDF, DOCX, TXT, bases de datos</p>
                  </div>
                </motion.div>

                {/* Punto 2: Vectorización */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-transparent border-2 border-purple-500/50 rounded-full flex items-center justify-center group hover:border-purple-400/80 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2.5 }}
                        className="absolute inset-0 border-2 border-dashed border-purple-400/30 rounded-full"
                      />

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-purple-400/10 rounded-full"
                      />

                      <div className="bg-purple-500/30 p-3 md:p-4 rounded-full text-purple-400 group-hover:text-purple-200 transition-colors duration-300">
                        <Gem size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                      </div>
                    </motion.div>
                  </div>

                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-purple-400 text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Vectorización</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Embeddings de alta dimensión para búsqueda semántica eficiente</p>
                  </div>
                </motion.div>

                {/* Punto 3: OpenClaw RAG */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-[#C69320]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[#C69320]/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#C69320]/30 via-[#FBE18D]/20 to-transparent border-2 border-[#C69320]/60 rounded-full flex items-center justify-center group hover:border-[#C69320]/90 transition-all duration-300 shadow-[0_0_40px_rgba(198,147,32,0.5)] backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 5 }}
                        className="absolute inset-0 border-2 border-dashed border-[#FBE18D]/40 rounded-full"
                      />

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-[#FBE18D]/10 rounded-full"
                      />

                      <motion.div
                        animate={{ scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="bg-[#C69320]/30 p-3 md:p-4 rounded-full text-[#FBE18D] group-hover:text-yellow-100 transition-colors duration-300"
                      >
                        <Brain size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_10px_#C69320]" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-[#FBE18D] text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(198,147,32,0.5)]">OpenClaw RAG</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Recuperación semántica inteligente con contexto preciso y fuentes</p>
                  </div>
                </motion.div>

                {/* Punto 4: Respuesta */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-green-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500/20 via-green-600/10 to-transparent border-2 border-green-500/50 rounded-full flex items-center justify-center group hover:border-green-400/80 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 7.5 }}
                        className="absolute inset-0 border-2 border-dashed border-green-400/30 rounded-full"
                      />

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-green-400/10 rounded-full"
                      />

                      <motion.div
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-green-500/30 p-3 md:p-4 rounded-full text-green-400 group-hover:text-green-200 transition-colors duration-300"
                      >
                        <Sparkles size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-green-400 text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">Respuesta</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Respuesta contextual con fuentes verificables y citas precisas</p>
                  </div>
                </motion.div>
              </div>

              {/* Líneas segmentadas entre iconos (EN EL CENTRO) - Viaje Continuo */}
              <div className="hidden md:block absolute top-[80px] left-0 right-0 h-0 pointer-events-none z-10">
                {/* Segmento 1: Documentos → Vectorización */}
                <div className="absolute left-[12.5%] right-[62.5%] top-0 -translate-y-1/2 px-10">
                  {/* Línea base */}
                  <div className="h-[2px] bg-blue-500/10 rounded-full overflow-visible relative">
                    {/* Línea animada que se llena */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    />

                    {/* Partícula que viaja continuamente ida y vuelta */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      transition={{
                        delay: 0.5,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-30"
                    >
                      <div className="w-full h-full bg-blue-300 rounded-full shadow-[0_0_15px_#93C5FD,0_0_30px_#60A5FA,0_0_45px_#3B82F6]" />
                      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50" />
                    </motion.div>
                  </div>
                </div>

                {/* Segmento 2: Vectorización → OpenClaw RAG */}
                <div className="absolute left-[37.5%] right-[37.5%] top-0 -translate-y-1/2 px-10">
                  {/* Línea base */}
                  <div className="h-[2px] bg-purple-500/10 rounded-full overflow-visible relative">
                    {/* Línea animada que se llena */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.7, duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-[#C69320] shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                    />
                    {/* Partícula que viaja continuamente ida y vuelta */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      transition={{
                        delay: 1.7,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-30"
                    >
                      <div className="w-full h-full bg-purple-300 rounded-full shadow-[0_0_15px_#E9D5FF,0_0_30px_#C084FC,0_0_45px_#A855F7]" />
                      <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-50" />
                    </motion.div>
                  </div>
                </div>

                {/* Segmento 3: OpenClaw RAG → Respuesta */}
                <div className="absolute left-[62.5%] right-[12.5%] top-0 -translate-y-1/2 px-10">
                  {/* Línea base */}
                  <div className="h-[2px] bg-[#C69320]/10 rounded-full overflow-visible relative">
                    {/* Línea animada que se llena */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.9, duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-[#C69320] via-[#FBE18D] to-green-500 shadow-[0_0_20px_rgba(198,147,32,0.8)]"
                    />
                    {/* Partícula que viaja continuamente ida y vuelta */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      transition={{
                        delay: 2.9,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-30"
                    >
                      <div className="w-full h-full bg-[#FDE68A] rounded-full shadow-[0_0_15px_#FBE18D,0_0_30px_#FACC15,0_0_45px_#C69320]" />
                      <div className="absolute inset-0 bg-[#FBE18D] rounded-full animate-ping opacity-50" />
                    </motion.div>
                  </div>
                </div>

                {/* Puntos de conexión en el centro de cada icono con pulso */}
                <div className="absolute left-[12.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_25px_rgba(59,130,246,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-500 rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="absolute left-[37.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_25px_rgba(168,85,247,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      className="absolute inset-0 bg-purple-500 rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="absolute left-[62.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-[#C69320] rounded-full shadow-[0_0_25px_rgba(198,147,32,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      className="absolute inset-0 bg-[#C69320] rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="absolute left-[87.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_25px_rgba(34,197,94,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="absolute inset-0 bg-green-500 rounded-full"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
            <Code2 size={14} /> Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-center text-lg">
            Real-world applications showcasing modern development practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="liquid-gold-card cursor-pointer group"
              onClick={() => window.open(project.demoUrl || '#', '_blank')}
            >
              <div className="liquid-gold-content p-0">
                <div
                  className="h-48 bg-cover bg-center relative group overflow-hidden"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <ExternalLink className="text-[#FBE18D]" size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#FBE18D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 border border-[#C69320]/30 text-[#C69320] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <ExternalLink className="text-[#FBE18D]" size={18} />
                    <span className="text-xs text-slate-500 font-mono">LIVE DEMO</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative z-10 flex flex-col items-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-6">
            <User size={14} /> About
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white text-center">About <span className="gradient-text">Me</span></h2>
          <p className="text-xl text-[#FBE18D] mb-6 font-medium text-center max-w-2xl">Passionate developer crafting digital experiences with precision and creativity</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-6 relative z-10"
          >
            <motion.div variants={fadeInUp} className="liquid-gold-card">
              <div className="liquid-gold-content">
                <h3 className="text-2xl font-bold mb-4">Joseph Espinoza</h3>
                <p className="text-slate-300 mb-4">
                  Full-stack developer specializing in modern web technologies and AI-powered solutions.
                  With a passion for creating exceptional user experiences and robust backend systems.
                </p>
                <p className="text-slate-300">
                  Beyond the code, I am a digital architect obsessed with precision. My journey started not just with syntax,
                  but with a desire to build systems that feel <span className="text-white font-medium border-b border-[#FBE18D]/30 pb-0.5">alive</span>.
                </p>
                <p className="text-slate-300 mt-4">
                  I blend technical rigor with an artist's eye, ensuring every pixel serves a purpose and every function runs with elegant efficiency.
                  My philosophy is simple: <span className="text-[#FBE18D]/90">Performance is the ultimate luxury.</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {[
                { icon: Briefcase, title: "50+ Projects", subtitle: "Delivered Globally" },
                { icon: Award, title: "Award Winning", subtitle: "Design Excellence" },
                { icon: Terminal, title: "Full Stack", subtitle: "End-to-End Control" },
                { icon: User, title: "Leadership", subtitle: "Team Mentoring" }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="liquid-gold-card"
                >
                  <div className="liquid-gold-content !p-4 flex-row items-center gap-4">
                    <div className="bg-[#FBE18D]/10 p-3 rounded-lg text-[#FBE18D] group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{item.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-panel p-8 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-[#C69320]/20 to-[#FBE18D]/20 rounded-xl flex items-center justify-center">
                <Image src="/images/Perfil_elegante.png" alt="Joseph Espinoza" width={800} height={800} className="w-full h-full object-cover rounded-xl" priority />
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 relative z-10"
        >
          {[
            { label: 'Type Safety', val: '100%', color: 'text-[#FBE18D]' },
            { label: 'Performance', val: '98/100', color: 'text-[#FBE18D]' },
            { label: 'Uptime', val: '99.9%', color: 'text-[#FBE18D]' },
            { label: 'Satisfaction', val: '100%', color: 'text-[#FBE18D]' }
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
        </div>
      </div>
    </section>
  );
};

// --- Sections ---
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

      {/* Latest Insights */}
      <section id="blog" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
              <BookOpen size={14} /> Technical Writing
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-center text-white tracking-tight">
              Latest <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-center text-lg">
              Thoughts on software architecture, modern frontend development, and the future of the web.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="liquid-gold-card cursor-pointer group"
              >
                <div className="liquid-gold-content h-full">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#FBE18D] transition-colors">{post.title}</h3>

                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[#C69320]/30 text-[#C69320] rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-[#FBE18D] hover:text-white transition-colors">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section >

      {/* Get In Touch */}
      < section id="contact" className="py-20 relative" >
        <div className="container mx-auto px-6 max-w-4xl">
          <div
            className="liquid-gold-card relative z-10"
          >
            <div className="liquid-gold-content p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Get In <span className="gradient-text">Touch</span></h2>
                <p className="text-slate-400 text-lg">Have a project in mind? Let's build something extraordinary together.</p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Tu Nombre</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors"
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Tu Email</label>
                    <input
                      type="email"
                      className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors"
                      placeholder="juan@tuempresa.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">¿Qué necesitas?</label>
                  <textarea
                    rows={5}
                    className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors resize-none"
                    placeholder="Cuéntame sobre tu proyecto: tipo de negocio, funcionalidades que necesitas, timeline estimado..."
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <CheckCircle className="text-[#FBE18D]" size={16} />
                    Respuesta en menos de 2 horas
                  </p>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-gradient-to-r from-[#C69320] to-[#FBE18D] hover:brightness-110 text-black rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#C69320]/40 text-lg group"
                  >
                    🚀 Recibir Cotización Gratis
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              <div className="mt-12 flex justify-center gap-8 border-t border-[#C69320]/20 pt-8">
                <a href="#" className="text-slate-400 hover:text-[#FBE18D] transition-colors"><Github size={24} /></a>
                <a href="#" className="text-slate-400 hover:text-[#FBE18D] transition-colors"><Linkedin size={24} /></a>
                <a href="#" className="text-slate-400 hover:text-[#FBE18D] transition-colors"><Twitter size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative z-10 border-t border-white/5 bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Code2 className="text-[#FBE18D] w-5 h-5" />
              <span className="text-lg font-bold tracking-tight text-slate-200">
                WebDesign<span className="text-[#FBE18D]">JE</span>
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
              <a key={link.name} href={link.href} className="text-sm text-slate-400 hover:text-[#FBE18D] transition-colors">
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
