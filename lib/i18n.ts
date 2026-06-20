import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        stack: 'Technologies',
        services: 'Services',
        ai: 'AI & Agents',
        projects: 'Projects',
        about: 'About Me',
        contact: 'Contact Me',
      },
      hero: {
        badge: 'AVAILABLE FOR NEW PROJECTS',
        title: 'Intelligent Automation that Simplifies Your Day',
        subtitle: 'I create custom AI ecosystems that integrate your operational knowledge to multiply your efficiency.',
        cta: 'Start Project',
        projects: 'Projects',
        success: 'Success Cases',
      },
      stack: {
        badge: 'Technologies',
        title: 'Infrastructure of Trust',
        subtitle: 'I use the most advanced and reliable tools in the technology market, perfectly integrated to build fast, secure, and high-performance applications.',
        categories: {
          frontend: 'Frontend (Core)',
          data: 'Data, Forms & Utils',
          backend: 'Backend & DevOps'
        }
      },
      services: {
        badge: 'Services',
        title: 'Cutting-Edge Solutions',
        subtitle: 'High-performance applications with modern architectures designed to transform your ideas into tangible and scalable results.',
        items: [
          {
            title: "Web Development",
            description: "I design modern, fast, and scalable web pages that captivate users, boost your brand, and transform your digital presence into real results.",
            features: [
              "Cutting-Edge Tech for Exceptional Performance",
              "Intuitive and Responsive User Experiences",
              "Total Integration with Your Existing Systems",
              "Maximum Visibility, Speed, and Conversion"
            ]
          },
          {
            title: "App Development",
            description: "I design intuitive high-performance mobile and web apps, bringing your business directly to your customers' devices and browsers on iOS, Android, and Web.",
            features: [
              "Native, Multiplatform, and Web Apps for Max Reach",
              "Attractive Interfaces that Users Love",
              "Robust and Scalable Functionality",
              "Successful Launch and Simplified Management"
            ]
          },
          {
            title: "Artificial Intelligence",
            description: "I incorporate artificial intelligence into your systems so your business makes smarter decisions, saves valuable time, and increases sales automatically.",
            features: [
              "24/7 Intelligent Customer Support",
              "System Understands and Responds Like a Human",
              "Smarter Data-Driven Decision Making",
              "Automated Repetitive Tasks to Save Time"
            ]
          }
        ]
      },
      smart: {
        badge: 'Total Business Intelligence',
        title: 'It\'s not just AI, it\'s your business Intelligence at work',
        subtitle: 'I design intelligent systems that truly know your business and help you sell more, save time, and make better decisions every day.',
        efficiency: 'Efficiency',
        pipeline: {
          title: 'Intelligent Data Pipeline',
          subtitle: 'I transform all your documents and data into useful knowledge that your intelligent system can use to give precise answers and generate more value for your customers.',
          docs: 'Documents',
          docs_desc: 'PDFs, Databases and Corporate Manuals',
          vector: 'Vectorization',
          vector_desc: 'Converts your information into fast and precise answers',
          recovery: 'Reliable Recovery',
          recovery_desc: 'Always finds the correct and updated information',
          response: 'Response',
          response_desc: 'Generates useful answers that help your team and your customers',
        },
        metrics: [
          { title: "Advanced NLP", description: "Intelligent customer service that responds like an expert in any language." },
          { title: "Autonomous Agents", description: "Assistants that manage your business processes without your supervision." },
          { title: "Predictive ML", description: "Predictions that anticipate trends and customer behaviors." },
          { title: "Deep Learning", description: "Models trained with your own business's exclusive information." }
        ]
      },
      projects: {
        badge: 'Portfolio',
        title: 'Featured Projects',
        subtitle: 'Real-world applications that showcase the best practices of modern development.',
        view_case: 'Consulta gratis',
        urgency: {
          spots: 'Only {{count}} spots available!',
          audit: 'for free audits this week.',
        },
        items: [
          {
            title: 'Medical AI History',
            description: 'Multi-specialty electronic health record system. Includes real-time synchronization, 3D anatomy visualization and PDF report generation, appointment scheduling, billing, and AI integration.'
          },
          {
            title: 'POS Store AI',
            description: 'Cloud-based point of sale specifically designed for stores that want to have control of their inventory in real time, kardex management, sales reports and implementation of AI to optimize their sales.',
          },
          {
            title: 'Hotel Management System',
            description: 'Unified platform for hotel reservations, room management and guest services. Includes a premium guest portal with glassmorphic design.',
          },
          {
            title: 'Eve Commerce',
            description: 'Advanced e-commerce platform focused on high-end fashion with a smooth and elegant shopping experience.',
          },
          {
            title: 'Beauty Agenda SaaS',
            description: 'Intelligent agenda system for beauty salons, barber shops and spas. Includes online bookings, automatic reminders via WhatsApp, customer CRM and integrated AI assistant.',
          },
          {
            title: 'ScholarAI Nexus',
            description: 'Intelligent educational platform for the comprehensive management of schools. Uses AI for monitoring academic performance, early detection of dropout and personalized tutoring.',
          }
        ]
      },
      about: {
        badge: 'About Me',
        title: 'About Me',
        motto: 'Passionate developer creating digital experiences with precision and creativity',
        description_1: 'Full-stack developer specialized in modern web technologies and AI-powered solutions. Passionate about creating exceptional user experiences and robust backend systems.',
        description_2: 'Beyond code, I am a digital architect obsessed with precision. My journey began with the desire to build systems that feel alive.',
        description_3: 'I combine technical rigor with an artist\'s eye, ensuring every pixel has a purpose and every function runs with elegant efficiency.',
        performance_quote: 'Performance is the ultimate luxury.',
        stats: [
          { label: "13+ Projects", subtitle: "Delivered" },
          { label: "Full Stack", subtitle: "End-to-End Control" },
          { label: "Leadership", subtitle: "Team Mentoring" }
        ],
        kpis: [
          { label: 'Type Safety', val: '100%' },
          { label: 'Performance', val: '98/100' },
          { label: 'Uptime', val: '99.9%' },
          { label: 'Satisfaction', val: '100%' }
        ],
        proficiency: [
          { name: "Modern & Optimized Frontend Interfaces" },
          { name: "Robust & Scalable Cloud Backend Infrastructure" },
          { name: "Advanced AI Engineering for Intelligent Solutions" }
        ]
      },
      contact: {
        title: 'Get In',
        title_accent: 'Touch',
        subtitle: 'Have a project in mind? Let\'s build something extraordinary together.',
        name_label: 'Your Name',
        name_placeholder: 'Ex: John Doe',
        email_label: 'Your Email',
        email_placeholder: 'john@yourcompany.com',
        project_label: 'What do you need?',
        project_placeholder: 'Tell me about your project: business type, needed features, estimated timeline...',
        cta: 'Receive Free Quote',
        response_time: 'Response in less than 2 hours'
      },
      clients: {
        badge: 'SUCCESS STORIES',
        title: 'Featured Clients',
        subtitle: 'Businesses from various sectors that trust web and premium artificial intelligence solutions to lead the digital market, increase visibility, and grow constantly.',
        visit: 'Visit'
      }
    },
  },
  es: {
    translation: {
      nav: {
        openMenu: 'Abrir menú',
        closeMenu: 'Cerrar menú',
        stack: 'Tecnologías',
        services: 'Servicios',
        ai: 'IA y Agentes',
        projects: 'Proyectos',
        about: 'Sobre Mí',
        contact: 'Contacto',
      },
      hero: {
        badge: 'DISPONIBLE PARA NUEVOS PROYECTOS',
        title: 'Automatización Inteligente que Facilita tu Día',
        subtitle: 'Creo ecosistemas de IA personalizados que integran tu conocimiento operativo para multiplicar tu eficiencia.',
        cta: 'Iniciar Proyecto',
        projects: 'Proyectos',
        success: 'Casos de Éxito',
      },
      stack: {
        badge: 'Tecnologías',
        title: 'Infraestructura de Confianza',
        subtitle: 'Utilizo lo más avanzado y confiable del mercado tecnológico, perfectamente integrado para construir aplicaciones rápidas, seguras y de alto rendimiento.',
        categories: {
          frontend: 'Frontend (Núcleo)',
          data: 'Datos, Formularios y Utilidades',
          backend: 'Backend y DevOps'
        }
      },
      services: {
        badge: 'Servicios',
        title: 'Soluciones de Vanguardia',
        subtitle: 'Aplicaciones de alto rendimiento con arquitecturas modernas diseñadas para transformar tus ideas en resultados tangibles y escalables.',
        items: [
          {
            title: "Desarrollo Web",
            description: "Diseño páginas web modernas, rápidas y escalables que cautivan a sus usuarios, impulsan su marca y transforman su presencia digital en resultados reales.",
            features: [
              "Tecnologías de Vanguardia para un Rendimiento Excepcional",
              "Experiencias de Usuario Intuitivas y Adaptables",
              "Integración Total con sus Sistemas y Procesos Existentes",
              "Máxima Visibilidad, Velocidad y Conversión"
            ]
          },
          {
            title: "Desarrollo de Aplicaciones",
            description: "Diseño aplicaciones móviles y web intuitivas de alto rendimiento, llevando su negocio directamente a los dispositivos y navegadores de sus clientes en iOS, Android y Web.",
            features: [
              "Aplicaciones Nativas, Multiplataforma y Web para Máximo Alcance",
              "Interfaces Atractivas que Encantan a sus Usuarios",
              "Funcionalidad Robusta y Escalable para sus Necesidades",
              "Lanzamiento Exitoso y Gestión Simplificada"
            ]
          },
          {
            title: "Inteligencia Artificial",
            description: "Incorporo inteligencia artificial en tus sistemas para que tu negocio tome decisiones más inteligentes, ahorre tiempo valioso y aumente sus ventas de manera automática.",
            features: [
              "Atención al cliente inteligente disponible 24/7",
              "Tu sistema entiende y responde como un humano real",
              "Toma de decisiones más inteligentes basadas en datos reales",
              "Automatizamos tareas repetitivas para ahorrar tiempo"
            ]
          }
        ]
      },
      smart: {
        badge: 'Inteligencia Empresarial Total',
        title: 'No solo es IA, es la Inteligencia de tu negocio trabajando',
        subtitle: 'Diseño sistemas inteligentes que realmente conocen tu negocio y te ayudan a vender más, ahorrar tiempo y tomar mejores decisiones todos los días.',
        efficiency: 'Eficiencia',
        pipeline: {
          title: 'Pipeline Inteligente de Datos',
          subtitle: 'Visualiza cómo tus datos se transforman en conocimiento listo para ser consumido por tu IA corporativa.',
          docs: 'Documentos',
          docs_desc: 'PDFs, Bases de Datos y Manuales Corporativos',
          vector: 'Vectorización',
          vector_desc: 'Convierte tu información en respuestas rápidas y precisas',
          recovery: 'Recuperación Confiable',
          recovery_desc: 'Siempre encuentra la información correcta y actualizada',
          response: 'Respuesta',
          response_desc: 'Genera respuestas útiles que ayudan a tu equipo y a tus clientes',
        },
        metrics: [
          { title: "PLN Avanzado", description: "Atención al cliente inteligente que responde como un experto en cualquier idioma." },
          { title: "Agentes Autónomos", description: "Asistentes que gestionan los procesos de tu negocio sin que tú tengas que supervisar." },
          { title: "ML Predictivo", description: "Predicciones que anticipan tendencias y comportamientos de tus clientes." },
          { title: "Deep Learning", description: "Modelos entrenados con la información exclusiva de tu propio negocio." }
        ]
      },
      projects: {
        badge: 'Portafolio',
        title: 'Proyectos Destacados',
        subtitle: 'Aplicaciones reales que muestran las mejores prácticas del desarrollo moderno.',
        view_case: 'Consulta gratis',
        urgency: {
          spots: '¡Solo {{count}} cupos disponibles!',
          audit: 'para auditorías gratuitas esta semana.',
        },
        items: [
          {
            title: 'Historia Clínica AI',
            description: 'Sistema de historias clínicas para múltiples especialidades. Incluye sincronización en tiempo real, visualización 3D de anatomía y generación de reportes PDF, programación de citas, facturación, Integración con IA.',
          },
          {
            title: 'POS Tienda AI',
            description: 'Punto de venta en la nube diseñado específicamente para tiendas que deseen tener el control de su inventario en tiempo real, manejo de kardex, reportes de ventas y implementar IA para optimizar sus ventas.',
          },
          {
            title: 'Hotel Management System',
            description: 'Plataforma unificada para reservas hoteleras, gestión de habitaciones y servicios al huésped. Incluye un portal de huéspedes premium con diseño glassmorphic.',
          },
          {
            title: 'Eve Commerce',
            description: 'Plataforma de e-commerce avanzada enfocada en moda de alta gama con una experiencia de compra fluida y elegante.',
          },
          {
            title: 'Beauty Agenda SaaS',
            description: 'Sistema de agenda inteligente para salones de belleza, barberías y spas. Incluye reservas online, recordatorios automáticos por WhatsApp, CRM de clientes y asistente con IA integrado.',
          },
          {
            title: 'ScholarAI Nexus',
            description: 'Plataforma educativa inteligente para la gestión integral de colegios. Utiliza IA para el seguimiento del rendimiento académico, detección temprana de deserción y tutoría personalizada.',
          }
        ]
      },
      about: {
        title: 'Sobre Mí',
        motto: 'Desarrollador apasionado creando experiencias digitales con precisión y creatividad',
        description_1: 'Desarrollador Full-Stack especializado en tecnologías web modernas y soluciones potenciadas con IA. Apasionado por crear experiencias de usuario excepcionales y sistemas backend robustos.',
        description_2: 'Más allá del código, soy un arquitecto digital obsesionado con la precisión. Mi viaje comenzó con el deseo de construir sistemas que se sientan vivos.',
        description_3: 'Combino rigor técnico con la mirada de un artista, asegurando que cada píxel tenga un propósito y cada función se ejecute con eficiencia elegante.',
        performance_quote: 'El rendimiento es el máximo lujo.',
        stats: [
          { label: "13+ Proyectos", subtitle: "Entregados" },
          { label: "Full Stack", subtitle: "Control End-to-End" },
          { label: "Liderazgo", subtitle: "Mentoria de Equipos" }
        ],
        kpis: [
          { label: 'Seguridad', val: '100%' },
          { label: 'Rendimiento', val: '98/100' },
          { label: 'Uptime', val: '99.9%' },
          { label: 'Satisfacción', val: '100%' }
        ],
        proficiency: [
          { name: "Construcción de Interfaces Frontend Modernas y Optimizadas" },
          { name: "Infraestructura Backend Robusta y Escalable en la Nube" },
          { name: "Ingeniería de IA Avanzada para Soluciones Inteligentes" }
        ]
      },
      contact: {
        title: 'Ponte en',
        title_accent: 'Contacto',
        subtitle: '¿Tienes un proyecto en mente? Construyamos algo extraordinario juntos.',
        name_label: 'Tu Nombre',
        name_placeholder: 'Ej: Juan Pérez',
        email_label: 'Tu Email',
        email_placeholder: 'juan@tuempresa.com',
        project_label: '¿Qué necesitas?',
        project_placeholder: 'Cuéntame sobre tu proyecto: tipo de negocio, funcionalidades, timeline...',
        cta: 'Recibir Cotización Gratis',
        response_time: 'Respuesta en menos de 2 horas'
      },
      clients: {
        badge: 'CASOS DE ÉXITO',
        title: 'Clientes Destacados',
        subtitle: 'Negocios de diferentes sectores que confían en soluciones web y de inteligencia artificial para liderar su mercado digital, aumentar su visibilidad y crecer de forma constante.',
        visit: 'Visitar'
      }
    },
  },
  fr: {
    translation: {
      nav: {
        openMenu: 'Ouvrir le menu',
        closeMenu: 'Fermer le menu',
        stack: 'Technologies',
        services: 'Services',
        ai: 'IA & Agents',
        projects: 'Projets',
        about: 'À propos',
        contact: 'Contactez-moi',
      },
      hero: {
        badge: 'DISPONIBLE POUR DE NOUVEAUX PROJETS',
        title: 'L\'automatisation Intelligente qui Simplifie votre Quotidien',
        subtitle: 'Je crée des écosystèmes d\'IA personnalisés qui intègrent vos connaissances opérationnelles pour multiplier votre efficacité.',
        cta: 'Démarrer le Projet',
        projects: 'Projets',
        success: 'Cas de Succès',
      },
      stack: {
        badge: 'Technologies',
        title: 'Infrastructure de Confiance',
        subtitle: 'J\'utilise les outils les plus avancés et les plus fiables du marché technologique, parfaitement intégrés pour créer des applications rapides, sécurisées et performantes.',
        categories: {
          frontend: 'Frontend (Cœur)',
          data: 'Données, Formulaires & Utils',
          backend: 'Backend & DevOps'
        }
      },
      services: {
        badge: 'Services',
        title: 'Solutions d\'Avant-garde',
        subtitle: 'Applications de haute performance avec des architectures modernes conçues pour transformer vos idées en résultats tangibles et évolutifs.',
        items: [
          {
            title: "Développement Web",
            description: "Je conçois des pages web modernes, rapides et évolutives qui captivent les utilisateurs, dynamisent votre marque et transforment votre présence numérique en résultats réels.",
            features: [
              "Technologies de Pointe pour des Performances Exceptionnelles",
              "Expériences Utilisateur Intuitives et Adaptatives",
              "Intégration Totale avec vos Systèmes et Processus Existants",
              "Visibilité, Vitesse et Conversion Maximales"
            ]
          },
          {
            title: "Développement d'Apps",
            description: "Je conçois des applications mobiles et web intuitives et performantes, apportant votre entreprise directement sur les appareils de vos clients sur iOS, Android et Web.",
            features: [
              "Apps Natives, Multiplateformes et Web pour une Portée Maximale",
              "Interfaces Attrayantes qui Enchantent vos Utilisateurs",
              "Fonctionnalité Robuste et Évolutive",
              "Lancement Réussi et Gestion Simplifiée"
            ]
          },
          {
            title: "Intelligence Artificielle",
            description: "J'intègre l'intelligence artificielle dans vos systèmes pour que votre entreprise prenne des décisions plus intelligentes et gagne un temps précieux.",
            features: [
              "Service Client Intelligent disponible 24h/24",
              "Système qui Comprend et Répond comme un Humain",
              "Prise de Décision plus Intelligente basée sur les Données",
              "Tâches Répétitives Automatisées"
            ]
          }
        ]
      },
      smart: {
        badge: 'Intelligence d\'Affaires Totale',
        title: 'Ce n\'est pas seulement de l\'IA, c\'est l\'Intelligence de votre entreprise au travail',
        subtitle: 'Je conçois des systèmes intelligents qui connaissent réellement votre entreprise et vous aident à vendre plus, à gagner du temps et à prendre de meilleures décisions chaque jour.',
        efficiency: 'Efficacité',
        pipeline: {
          title: 'Pipeline de Données Intelligent',
          subtitle: 'Je transforme tous vos documents et données en connaissances utiles que votre système intelligent peut utiliser pour donner des réponses précises et générer plus de valeur pour vos clients.',
          docs: 'Documents',
          docs_desc: 'PDF, bases de données et manuels d\'entreprise',
          vector: 'Vectorisation',
          vector_desc: 'Convertit vos informations en réponses rapides et précises',
          recovery: 'Récupération Fiable',
          recovery_desc: 'Trouve toujours les informations correctes et à jour',
          response: 'Réponse',
          response_desc: 'Génère des réponses utiles qui aident votre équipe et vos clients',
        },
        metrics: [
          { title: "Advanced NLP", description: "Intelligent customer service that responds like an expert in any language." },
          { title: "Autonomous Agents", description: "Assistants that manage your business processes without your supervision." },
          { title: "Predictive ML", description: "Forecasts that anticipate trends and customer behaviors." },
          { title: "Deep Learning", description: "Models trained with exclusive information from your own business." }
        ]
      },
      projects: {
        badge: 'Travail Vedette',
        title: 'Projets de Référence',
        subtitle: 'Applications réelles montrant les meilleures pratiques du développement moderne.',
        view_case: 'Plus d\'informations',
        urgency: {
          spots: 'Plus que {{count}} places disponibles !',
          audit: 'pour des audits gratuits cette semaine.',
        },
        items: [
          {
            title: 'Medical AI History',
            description: 'Système complet de dossiers médicaux pour plusieurs spécialités. Comprend la synchronisation en temps réel, la visualisation interactive de l\'anatomie en 3D et la génération de rapports PDF dynamiques, la prise de rendez-vous, la facturation, l\'intégration de l\'IA pour le diagnostic et le traitement.',
          },
          {
            title: 'POS AI Store',
            description: 'Point de vente cloud conçu spécifiquement pour les magasins souhaitant contrôler leur inventaire en temps réel, la gestion du kardex, les rapports de vente et la mise en œuvre de l\'IA pour optimiser leurs ventes.',
          },
          {
            title: 'Hotel Management System',
            description: 'Plateforme unifiée pour les réservations d\'hôtel, la gestion des chambres et les services aux clients. Comprend un portail client premium avec un design glassmorphic.',
          },
          {
            title: 'Eve Commerce',
            description: 'Plateforme de commerce électronique avancée axée sur la mode haut de gamme avec une expérience d\'achat fluide et élégante.',
          },
          {
            title: 'Beauty Agenda SaaS',
            description: 'Système d\'agenda intelligent pour les salons de beauté, les salons de coiffure et les spas. Comprend les réservations en ligne, les rappels automatiques par WhatsApp, le CRM client et l\'assistant IA intégré.',
          },
          {
            title: 'ScholarAI Nexus',
            description: 'Plateforme éducative intelligente pour la gestion globale des écoles. Utilise l\'IA pour le suivi des performances académiques, la détection précoce du décrochage et le tutorat personnalisé.',
          }
        ]
      },
      about: {
        title: 'À Propos',
        motto: 'Développeur passionné créant des expériences numériques avec précision et créativité',
        description_1: 'Développeur full-stack spécialisé dans les technologies web modernes et les solutions basées sur l\'IA. Passionné par la création d\'expériences utilisateur exceptionnelles et de systèmes backend robustes.',
        description_2: 'Au-delà du code, je suis un architecte numérique obsédé par la précision. Mon voyage a commencé par le désir de construire des systèmes vivants.',
        description_3: 'Je combine la rigueur technique avec l\'œil d\'un artiste, m\'assurant que chaque pixel a un but et que chaque fonction s\'exécute avec une efficacité élégante.',
        performance_quote: 'La performance est le luxe ultime.',
        stats: [
          { label: "13+ Projets", subtitle: "Livrés" },
          { label: "Full Stack", subtitle: "Contrôle de bout en bout" },
          { label: "Leadership", subtitle: "Mentorat d'équipe" }
        ],
        kpis: [
          { label: 'Sécurité de Type', val: '100%' },
          { label: 'Performance', val: '98/100' },
          { label: 'Disponibilité', val: '99.9%' },
          { label: 'Satisfaction', val: '100%' }
        ],
        proficiency: [
          { name: "Interfaces Frontend Modernes & Évolutives" },
          { name: "Infrastructure Backend Cloud Robuste" },
          { name: "Ingénierie IA Avancée pour Solutions Intelligentes" }
        ]
      },
      contact: {
        title: 'Contactez',
        title_accent: 'Moi',
        subtitle: 'Vous avez un projet en tête ? Construisons ensemble quelque chose d\'extraordinaire.',
        name_label: 'Votre Nom',
        name_placeholder: 'Ex: Jean Dupont',
        email_label: 'Votre Email',
        email_placeholder: 'jean@votreentreprise.com',
        project_label: 'De quoi avez-vous besoin ?',
        project_placeholder: 'Parlez-moi de votre projet : type d\'entreprise, fonctionnalités, calendrier...',
        cta: 'Recevoir un Devis Gratuit',
        response_time: 'Réponse en moins de 2 heures'
      },
      clients: {
        badge: 'HISTOIRES DE SUCCÈS',
        title: 'Clients Vedettes',
        subtitle: 'Des entreprises de différents secteurs qui font confiance aux solutions web y d\'intelligence artificielle pour mener leur marché numérique.',
        visit: 'Visiter'
      }
    },
  },
  zh: {
    translation: {
      nav: {
        openMenu: '打開選單',
        closeMenu: '關閉選單',
        stack: '技術',
        services: '服務',
        ai: '人工智慧與代理',
        projects: '專案',
        about: '關於我',
        contact: '聯繫我',
      },
      hero: {
        badge: '可承接新專案',
        title: '簡化您日常生活的智能自動化',
        subtitle: '我打造客製化的 AI 生態系，整合您的營運知識，將您的效率提升到新的高度。',
        cta: '開始專案',
        projects: '專案',
        success: '成功案例',
      },
      stack: {
        badge: '技術',
        title: '信任的基礎設施',
        subtitle: '我使用技術市場中最先進、最可靠的工具，完美整合以構建快速、安全且高性能的應用程序。',
        categories: {
          frontend: '前端 (核心)',
          data: '數據、表單與工具',
          backend: '後端與 DevOps'
        }
      },
      services: {
        badge: '服務',
        title: '尖端解決方案',
        subtitle: '採用現代架構的高性能應用程序，旨在將您的想法轉化為切實且可擴展的成果。',
        items: [
          {
            title: "網頁開發",
            description: "我設計現代、快速且可擴展的網頁，吸引用戶，提升您的品牌，並將您的數位存在轉化為實際成果。",
            features: [
              "領先技術實現卓越性能",
              "直觀且響應式的用戶體驗",
              "與您現有系統的全面整合",
              "最大能見度、速度和轉化率"
            ]
          },
          {
            title: "應用程序開發",
            description: "我設計直觀的高性能移動和網頁應用程序，將您的業務直接帶到客戶在 iOS, Android 和網頁上的設備和瀏覽器中。",
            features: [
              "原生、多平台和網頁應用以實現最大覆蓋",
              "用戶喜愛的吸引人的界面",
              "強大且可擴展的功能",
              "成功發布和簡化管理"
            ]
          },
          {
            title: "人工智慧",
            description: "將人工智慧整合到您的系統中，讓您的業務做出更明智的決策，節省寶貴的時間，並自動增加銷售額。",
            features: [
              "24/7 智能客戶支持",
              "系統能像真人一樣理解和回應",
              "更明智的數據驅動決策",
              "自動化重複任務以節省時間"
            ]
          }
        ]
      },
      smart: {
        badge: '全面商業智慧',
        title: '這不僅僅是人工智慧，更是您業務智慧的運作',
        subtitle: '我設計真正了解您業務的智能系統，幫助您增加銷售、節省時間，並每天做出更好的決策。',
        efficiency: '效率',
        pipeline: {
          title: '智能數據管道',
          subtitle: '我將您所有的文檔和數據轉化為有用的知識，您的智能系統可以使用這些知識提供準確的答案，並為您的客戶創造更多價值。',
          docs: '文檔',
          docs_desc: 'PDF、數據庫和企業手冊',
          vector: '向量化',
          vector_desc: '將您的信息轉化為快速且準確的答案',
          recovery: '可靠恢復',
          recovery_desc: '始則查找正確且更新的信息',
          response: '響應',
          response_desc: '生成有用的答案，幫助您的團隊 and 客戶',
        },
        metrics: [
          { title: "高級自然語言處理", description: "能像專家一樣用任何語言回應的智能客戶服務。" },
          { title: "自主代理", description: "無需監管即可管理業務流程的助手。" },
          { title: "預測性機器學習", description: "預測趨勢和客戶行為的預測。" },
          { title: "深度學習", description: "使用您業務專屬信息訓練的模型。" }
        ]
      },
      projects: {
        badge: '精選作品',
        title: '精選項目',
        subtitle: '展示現代開發最佳實踐的真實應用程序。',
        view_case: '更多信息',
        urgency: {
          spots: '僅剩 {{count}} 個名額！',
          audit: '本週免費審計。',
        },
        items: [
          {
            title: '醫療 AI 病歷',
            description: '適用於多種專科的綜合醫療記錄系統。包括實時同步、交互式 3D 解剖可視化和動態 PDF 報告生成、預約安排、計費、用於診斷和治療的 AI 集成。',
          },
          {
            title: 'POS AI 商店',
            description: '基於雲端的銷售點，專為希望實時控制庫存、卡片管理、銷售報告和實施 AI 以優化銷售的商店而設計。',
          },
          {
            title: '飯店管理系統',
            description: '用於酒店預訂、客房管理和賓客服務的統一平台。包括一個具有玻璃形態設計的高級賓客門戶。',
          },
          {
            title: 'Eve Commerce',
            description: '先進的電子商務平台，專注於高端時尚，提供流暢優雅的購物體驗。',
          },
          {
            title: 'Beauty Agenda SaaS',
            description: '適用於美容院、理髮店和水療中心的智能日程系統。包括在線預訂、通過 WhatsApp 自動提醒、客戶 CRM 和集成 AI 助手。',
          },
          {
            title: 'ScholarAI Nexus',
            description: '用於學校綜合管理的智能教育平台。利用 AI 監測學業成績、早期發現輟學和個性化輔導。',
          }
        ]
      },
      about: {
        title: '關於我',
        motto: '充滿熱情的開發者，以精確和創意打造數位體驗',
        description_1: '專注於現代網頁技術和 AI 解決方案的全棧開發者。熱衷於打造卓越的用戶體驗和強大的後端系統。',
        description_2: '除了代碼，我還是一位癡迷於精確度的數位建築師。我的旅程始於構建有生命感的系統。',
        description_3: '我將技術嚴謹與藝術眼光結合，確保每個像素都有其目的，每個功能都以優雅的高效率運行。',
        performance_quote: '性能是最終的奢華。',
        stats: [
          { label: "13+ 專案", subtitle: "已交付" },
          { label: "全棧開發", subtitle: "端到端控制" },
          { label: "領導力", subtitle: "團隊指導" }
        ],
        kpis: [
          { label: '類型安全', val: '100%' },
          { label: '性能', val: '98/100' },
          { label: '運行時間', val: '99.9%' },
          { label: '滿意度', val: '100%' }
        ],
        proficiency: [
          { name: "現代化且優化的前端界面" },
          { name: "健壯且可擴展的雲端後端基礎設施" },
          { name: "用於智能解決方案的高級 AI 工程" }
        ]
      },
      contact: {
        title: '與我',
        title_accent: '聯繫',
        subtitle: '有任何項目想法嗎？讓我們一起打造非凡的作品。',
        name_label: '您的姓名',
        name_placeholder: '例如：王小明',
        email_label: '您的電子郵件',
        email_placeholder: 'xiaoming@yourcompany.com',
        project_label: '您需要什麼？',
        project_placeholder: '告訴我您的項目：業務類型、所需功能、預計時間表...',
        cta: '獲取免費報價',
        response_time: '2 小時內回覆'
      },
      clients: {
        badge: '成功案例',
        title: '精選客戶',
        subtitle: '來自不同行業的企業信任網頁和人工智慧解決方案，以領先數位市場。',
        visit: '訪問'
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
