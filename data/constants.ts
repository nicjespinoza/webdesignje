import {
    Atom, Blocks, Zap, Box, Wind, Layers, Hash, FileCode, ClipboardList, ShieldCheck,
    BarChart3, FileText, FileCog, Activity, Server, DatabaseZap, Flame, Database, Table,
    Container, Package, Code2, Smartphone, Cpu, Brain, Bot, Sparkles, Network,
    CheckCircle
} from 'lucide-react';
import { z } from 'zod';
import { Project, BlogPost } from '@/components/landing/types';

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
        description: 'Sistema integral de historias clínicas para clínicas multi-especialidad. Incluye sincronización en tiempo real, visualización 3D interactiva de anatomía y generación dinámica de reportes PDF.',
        longDescription: "Plataforma SaaS de grado profesional construida para escalar. Permite a las clínicas gestionar datos de pacientes de forma segura con arquitectura HIPAA-compliant. La característica destacada es el modelo humano 3D interactivo que los doctores pueden rotar y anotar para visualizar lesiones o sitios quirúrgicos. El sistema también maneja programación de citas, facturación e inventario de farmacia.",
        features: [
            'Sincronización de datos en tiempo real con Firebase Firestore',
            'Anatomía 3D interactiva usando React Three Fiber',
            'Control de acceso basado en roles (RBAC) para Doctores/Personal',
            'Generación automática de PDF de prescripciones y reportes',
            'Portal seguro para pacientes'
        ],
        techStack: ['React 19', 'Firebase', 'Three.js', 'jsPDF', 'Zod'],
        imageUrl: '/screenshots/historia-clinica.png',
        featured: true,
        githubUrl: '#',
        demoUrl: '/portal'
    },
    {
        id: '2',
        title: 'POS Tienda Zapatos',
        description: 'Punto de venta en la nube diseñado específicamente para tiendas de calzado. Control de inventario en tiempo real por talla, color y modelo.',
        longDescription: "Sistema POS especializado para la industria del calzado. Gestiona inventario complejo con múltiples variantes, maneja sincronización entre sucursales y proporciona análisis detallados de ventas. Integrado con pasarelas de pago locales y generación automática de facturas.",
        features: [
            'Gestión de inventario multi-variante',
            'Reportes y análisis de ventas en tiempo real',
            'Integración con programa de lealtad de clientes',
            'Optimizado para dispositivos móviles y tablets',
            'Persistencia offline de Firebase'
        ],
        techStack: ['Next.js', 'Firebase', 'Tailwind CSS', 'Cloud Functions'],
        imageUrl: '/screenshots/pos-zapatos.png',
        githubUrl: '#',
        demoUrl: '/demos/pos'
    },
    {
        id: '3',
        title: 'Hotel Management System',
        description: 'Plataforma unificada para reservas hoteleras, gestión de habitaciones y servicios al huésped. Incluye un portal de huéspedes premium con diseño glassmorphic.',
        longDescription: "Un motor de hospitalidad todo-en-uno. Desde la recepción hasta el teléfono del huésped, este sistema optimiza cada interacción. Incluye un motor de reservas, gestión de housekeeping y un dashboard de huéspedes para servicios como room service y reservas de spa.",
        features: [
            'Calendario de disponibilidad de habitaciones en tiempo real',
            'Dashboard interactivo para huéspedes',
            'Flujo automatizado de check-in/check-out',
            'Análisis de gestión de ingresos',
            'Soporte multi-idioma'
        ],
        techStack: ['TypeScript', 'Framer Motion', 'Figma', 'Stripe'],
        imageUrl: '/screenshots/hotel-management.png',
        githubUrl: '#',
        demoUrl: '/demos/hotel'
    },
    {
        id: '4',
        title: 'Eve Commerce',
        description: 'Plataforma de e-commerce avanzada enfocada en moda de alta gama con una experiencia de compra fluida y elegante.',
        longDescription: "Una experiencia de e-commerce de lujo. Este proyecto empuja los límites del diseño web con vistas de productos inmersivas, transiciones suaves y un flujo de checkout altamente optimizado. Diseñado para mostrar colecciones de moda con estética premium.",
        features: [
            'Galería de productos de alto rendimiento',
            'Transiciones animadas del carrito de compras',
            'Integración segura con pasarela de pagos',
            'Colecciones de productos personalizables',
            'SEO y velocidad optimizados'
        ],
        techStack: ['Shopify SDK', 'Next.js', 'React 19', 'PostCSS'],
        imageUrl: '/screenshots/eve-commerce.png',
        githubUrl: '#',
        demoUrl: '/demos/evecommerce'
    },
    {
        id: '5',
        title: 'Beauty Agenda SaaS',
        description: 'Sistema de agenda inteligente para salones de belleza, barberías y spas. Incluye reservas online, recordatorios automáticos por WhatsApp, CRM de clientes y asistente con IA integrado.',
        longDescription: "Plataforma todo-en-uno para negocios de belleza y bienestar. Gestiona citas, clientes y pagos desde un solo lugar. El asistente con IA responde preguntas frecuentes, sugiere servicios y optimiza la agenda automáticamente. Incluye recordatorios por WhatsApp, historial de clientes y reportes de rendimiento.",
        features: [
            'Agenda visual con drag-and-drop',
            'Reservas online 24/7 desde cualquier dispositivo',
            'Recordatorios automáticos por WhatsApp y email',
            'CRM de clientes con historial de servicios',
            'Asistente con IA para preguntas frecuentes',
            'Chat inteligente integrado',
            'Reportes de ocupación y ingresos',
            'Gestión de múltiples empleados y sucursales'
        ],
        techStack: ['Next.js 15', 'Firebase', 'Twilio API', 'Zod', 'Tailwind CSS'],
        imageUrl: '/screenshots/beauty-agenda.png',
        githubUrl: '#',
        demoUrl: '/demos/beauty-agenda'
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
