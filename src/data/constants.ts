import {
    Atom, Blocks, Zap, Box, Wind, Layers, Hash, FileCode, ClipboardList, ShieldCheck,
    BarChart3, FileText, FileCog, Activity, Server, DatabaseZap, Flame, Database, Table,
    Container, Package, Code2, Smartphone, Cpu, Brain, Bot, Sparkles, Network,
    CheckCircle
} from 'lucide-react';
import { z } from 'zod';
import { Project, BlogPost } from '@/src/components/landing/types';

export const categories = [
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

export const proficiency = [
    { name: "Construcción de Interfaces Frontend Modernas y Optimizadas", level: 98, color: "from-[#C69320] to-yellow-500" },
    { name: "Infraestructura Backend Robusta y Escalable en la Nube", level: 92, color: "from-[#C69320] to-yellow-500" },
    { name: "Ingeniería de IA Avanzada para Soluciones Inteligentes", level: 85, color: "from-[#C69320] to-green-400" },
];

export const projects: Project[] = [
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
        title: 'POS Tienda Zapatos',
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

export const blogPosts: BlogPost[] = [
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

export const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export const services = [
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
];
