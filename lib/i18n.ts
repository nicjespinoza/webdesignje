import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        stack: 'Technologies',
        services: 'Services',
        projects: 'Projects',
        about: 'About Me',
        contact: 'Contact Me',
        selectLanguage: 'Select Language',
      },
      hero: {
        badge: 'AVAILABLE FOR NEW PROJECTS',
        title: 'Secure the Future of Your Business with Intelligent Technology',
        subtitle: 'I implement modern web infrastructures and automated systems that free up your time and accelerate your productivity.',
        cta: 'Get a Free Quote',
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
            description: "Your website must generate customers, not just exist. I design sites that convert visitors into sales with premium design that conveys trust from the first second.",
            features: [
              "Design that conveys luxury and professionalism",
              "Loads in under 2 seconds (Google rewards speed)",
              "Visible on Google when they search for your services",
              "Works perfectly on mobile and desktop"
            ]
          },
          {
            title: "App Development",
            description: "I build intuitive, high-performance mobile and web apps that bring your business directly to your customers' pockets on iOS, Android, and Web.",
            features: [
              "Reach your customers anywhere, anytime",
              "Interfaces so beautiful users fall in love",
              "Robust functionality that scales with your business",
              "Launch success and simplified management"
            ]
          },
          {
            title: "Artificial Intelligence",
            description: "I integrate AI into your systems so your business makes smarter decisions, saves valuable time, and increases sales automatically while you sleep.",
            features: [
              "24/7 intelligent customer support that never rests",
              "System that understands and responds like a human",
              "Smarter data-driven decision making",
              "Automated repetitive tasks to save 10+ hours/week"
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
        view_case: 'Free consultation',
        key_benefits: 'Key Benefits',
        urgency: {
          spots: 'Only {{count}} spots available!',
          audit: 'for free audits this week.',
        },
        items: [
          {
            title: 'Medical History',
            description: 'Multi-specialty electronic health record system. Includes real-time synchronization, 3D anatomy visualization and PDF report generation, appointment scheduling, billing, and AI integration.',
            features: [
              'Increases consultation efficiency by up to 40%',
              'Improves diagnostic accuracy with AI',
              'Reduces medical records management errors',
              'Retains patients with a secure access portal',
              'Automates reports and prescriptions generation'
            ]
          },
          {
            title: 'POS Store',
            description: 'Cloud-based point of sale specifically designed for stores that want to have control of their inventory in real time, kardex management, sales reports and implementation of AI to optimize their sales.',
            features: [
              'Eliminates inventory error losses',
              'Maximizes sales with smart stock suggestions',
              'Access financial reports from anywhere',
              'Simplifies billing and checkout processes',
              'Instant synchronization between branches'
            ]
          },
          {
            title: 'Client Management System (CRM)',
            description: 'Unified platform for user control, lead tracking, and commercial proposal automation. Includes an interactive portal for premium clients with glassmorphic design.',
            features: [
              'Automated sales funnel to maximize conversion.',
              'Centralized history that reduces response times.',
              'Interactive portal for support and project status.',
              'Real-time monitoring of metrics and sales.',
              'Agile proposal management until contract closing.'
            ]
          },
          {
            title: 'Ecommerce',
            description: 'Advanced e-commerce platform with a smooth and elegant shopping experience. Includes secure payment gateway integration, automated inventory tracking, and predictive sales analytics to scale your business.',
            features: [
              'Increases conversion rate on mobile devices',
              'Reduces cart abandonment with optimized checkout',
              'Brand positioning with world-class design',
              'Ultra-fast loading to improve SEO and retention',
              'Full scalability for high demand events'
            ]
          },
          {
            title: 'Virtual Agenda',
            description: 'Intelligent online booking and scheduling system for professionals and businesses. Includes automated WhatsApp reminders, client CRM, and integrated AI assistant.',
            features: [
              'Eliminates no-shows with automatic reminders',
              'Saves working hours with 24/7 smart scheduling',
              'Increases visit frequency with integrated CRM',
              'Optimizes the scheduling of your team',
              'Immediate customer service through AI'
            ]
          },
          {
            title: 'Education Management System',
            description: 'Intelligent educational platform for the comprehensive management of schools. Uses AI for monitoring academic performance, early detection of dropout and personalized tutoring.',
            features: [
              'Detects dropout risks early',
              'Reduces teachers\' administrative burden',
              'Improves communication between parents and school',
              'Personalizes learning for each student',
              'Total security of academic and personal data'
            ]
          }
        ]
      },
      projectModal: {
        title: 'Technical Assessment',
        subtitle: 'High-level customization and technical consulting',
        success_title: 'Diagnosis Completed!',
        success_desc: 'We have received all your business details for {{project}}. Our team will analyze your case and contact you with a personalized proposal.',
        ai_analysis: 'AI Analysis',
        close: 'Close',
        cancel: 'Cancel',
        talk_advisor: 'Chat with Joseph Espinoza',
        previous: 'Previous',
        next: 'Next',
        submitting: 'Analyzing...',
        submit: 'Send Diagnosis',
        contact_title: 'Your Contact Information',
        contact_subtitle: 'To send you the personalized diagnosis and proposal',
        name_label: 'Full Name *',
        email_label: 'Email Address *',
        phone_label: 'Phone / WhatsApp',
        company_label: 'Company / Business',
        required_error: 'Required field',
        invalid_email: 'Invalid email',
        profile_title: 'Your Business Profile',
        profile_subtitle: 'Tell us more about your current operations',
        pain_title: 'What are your main challenges?',
        features_title: 'Features you are most interested in',
        goals_title: 'Goals and Timeline',
        goals_subtitle: 'Help us understand your vision to offer you the best proposal',
        success_vision_label: 'How do you imagine the ideal result?',
        success_vision_placeholder: 'Describe how you would like your business to operate with this solution...',
        timeline_label: 'When would you like to start?',
        timeline_placeholder: 'Select an option',
        budget_label: 'Estimated Budget',
        budget_placeholder: 'Select a range',
        references_label: 'References or Inspiration',
        references_placeholder: 'Is there any website or platform you like as a reference? (optional)',
        review_title: 'Final Review',
        review_subtitle: 'Verify everything is correct before sending',
        review_terms: 'By sending, you agree to be contacted to follow up on your request.',
        step_contact: 'Contact',
        step_profile: 'Profile',
        step_goals: 'Goals',
        step_review: 'Review',
        timeline_options: {
          immediate: 'Immediate (this week)',
          month: 'This month',
          months_1_3: 'In 1-3 months',
          months_3_6: 'In 3-6 months',
          exploring: 'Just exploring'
        },
        budget_options: {
          undisclosed: 'Prefer not to say',
          range_1: '$1,000 - $5,000 USD',
          range_2: '$5,000 - $15,000 USD',
          range_3: '$15,000 - $50,000 USD',
          range_4: '$50,000+ USD'
        },
        questions: {
          '1': [
            { label: 'Medical Specialty', name: 'specialty', type: 'text', placeholder: 'Pediatrics, Cardiology, General Medicine...' },
            { label: 'Patients per Day', name: 'dailyPatients', type: 'select', options: ['Less than 10', '10-30', '31-60', 'More than 60'] },
            { label: 'Current System', name: 'currentSystem', type: 'text', placeholder: 'Do you use paper, Excel, or software?' },
            { label: 'Location / Country', name: 'location', type: 'text', placeholder: 'Country or city of operation' },
          ],
          '2': [
            { label: 'Retail Type', name: 'storeType', type: 'text', placeholder: 'Clothing, Footwear, Electronics, Groceries...' },
            { label: 'Number of Branches', name: 'branches', type: 'select', options: ['1 (Single)', '2-5', '6-10', '+10'] },
            { label: 'Estimated Monthly Sales', name: 'revenue', type: 'select', options: ['- $5,000/month', '$5,000 - $20,000', '$20,000 - $50,000', '+ $50,000'] },
            { label: 'Approximate Inventory (SKUs)', name: 'skuCount', type: 'select', options: ['Less than 100', '100-500', '501-2000', '+2000'] },
          ],
          '3': [
            { label: 'Accommodation Type', name: 'hotelType', type: 'select', options: ['Boutique Hotel', 'Resort', 'Hostel', 'Hotel Chain'] },
            { label: 'Number of Rooms', name: 'rooms', type: 'select', options: ['1-20', '21-50', '51-100', '+100'] },
            { label: 'Current Average Occupancy', name: 'occupancy', type: 'select', options: ['- 30%', '30-50%', '51-70%', '+70%'] },
            { label: 'Do you have a reception team?', name: 'hasStaff', type: 'select', options: ['Yes, full team', 'Yes, minimal', 'No, I am independent'] },
          ],
          '4': [
            { label: 'Market Niche', name: 'niche', type: 'text', placeholder: 'Jewelry, Designer clothing, Furniture...' },
            { label: 'Main Sales Channel', name: 'channel', type: 'select', options: ['Instagram / Social Media', 'MercadoLibre / Amazon', 'Physical store', 'None yet'] },
            { label: 'Current Monthly Income', name: 'income', type: 'select', options: ['Not selling yet', '- $1,000', '$1,000 - $10,000', '+ $10,000'] },
            { label: 'Have you had an online store before?', name: 'previousEcom', type: 'select', options: ['Never', 'Yes, but it did not work', 'Yes, currently active'] },
          ],
          '5': [
            { label: 'Business Type', name: 'beautyType', type: 'select', options: ['Beauty Salon', 'Spa', 'Barbershop', 'Aesthetic Clinic'] },
            { label: 'Specialists / Staff', name: 'staff', type: 'select', options: ['1 (Independent)', '2-5', '6-15', '+15'] },
            { label: 'Clients per Week', name: 'weeklyClients', type: 'select', options: ['- 20', '20-50', '51-100', '+100'] },
            { label: 'You manage bookings via', name: 'bookingMethod', type: 'select', options: ['Manual (paper agenda)', 'WhatsApp / Calls', 'Google Calendar', 'Basic software'] },
          ],
          '6': [
            { label: 'Institution Type', name: 'schoolType', type: 'select', options: ['School / Academy', 'University', 'Technical Institute', 'Online Academy'] },
            { label: 'Total Students', name: 'students', type: 'select', options: ['1-100', '101-500', '501-2000', '+2000'] },
            { label: 'Main Educational Level', name: 'level', type: 'select', options: ['Primary / Secondary', 'Undergraduate', 'Postgraduate', 'Mixed'] },
            { label: 'Annual Dropout Rate', name: 'dropoutRate', type: 'select', options: ['- 5%', '5-10%', '10-20%', '+20%', 'Do not know'] },
          ],
        },
        painPoints: {
          '1': [
            { label: 'Excess administrative paperwork', value: 'paperwork', benefit: 'Paperwork reduction' },
            { label: 'Loss or disorder of records', value: 'lostRecords', benefit: 'Records always accessible' },
            { label: 'Diagnostics without data support', value: 'noDataDiagnosis', benefit: 'Precision with AI' },
            { label: 'Slow patient workflows', value: 'slowProcess', benefit: 'Agile patient flow' },
            { label: 'Lack of remote data access', value: 'noRemote', benefit: 'Access from anywhere' },
            { label: 'Non-compliance with regulations', value: 'compliance', benefit: 'Assured compliance' },
          ],
          '2': [
            { label: 'Inventory not updated in real time', value: 'stockSync', benefit: 'Stock always up to date' },
            { label: 'Losses due to shrinkage or theft', value: 'shrinkage', benefit: 'Loss control' },
            { label: 'Lack of clear financial reports', value: 'noReports', benefit: 'Automatic financial reports' },
            { label: 'Branches out of sync', value: 'branchSync', benefit: 'Multi-branch synchronization' },
            { label: 'Slow checkout processes', value: 'slowCheckout', benefit: 'Fast and secure payments' },
            { label: 'No efficient supplier control', value: 'suppliers', benefit: 'Integrated supplier management' },
          ],
          '3': [
            { label: 'Low recurring occupancy rate', value: 'lowOccupancy', benefit: 'Maximize occupancy' },
            { label: 'High monthly operational costs', value: 'highCosts', benefit: 'Reduce operational costs' },
            { label: 'No automated guest portal', value: 'noGuestPortal', benefit: 'Smart guest portal' },
            { label: 'No real-time P&L', value: 'noPnl', benefit: 'Instantly updated P&L' },
            { label: 'Inefficient maintenance processes', value: 'maintenance', benefit: 'Automated maintenance' },
            { label: 'Poor integration with OTAs/channels', value: 'otaIntegration', benefit: 'Full OTA integration' },
          ],
          '4': [
            { label: 'High cart abandonment rate', value: 'cartAbandon', benefit: 'Cart recovery' },
            { label: 'Low conversion from mobile', value: 'mobileConversion', benefit: 'Optimized mobile conversion' },
            { label: 'Brand without digital differentiation', value: 'branding', benefit: 'Premium digital identity' },
            { label: 'Very slow loading speed', value: 'speed', benefit: 'Ultrarapid performance' },
            { label: 'Difficulty scaling sales', value: 'scalability', benefit: 'Scalability without limits' },
            { label: 'No marketing automation', value: 'marketing', benefit: 'AI-automated marketing' },
          ],
          '5': [
            { label: 'Frequent no-shows reducing revenue', value: 'noShows', benefit: 'Drastic no-show reduction' },
            { label: 'Disorganized and manual calendar', value: 'messySchedule', benefit: 'Automated smart calendar' },
            { label: 'Clients not returning', value: 'lowRetention', benefit: 'Retention with smart CRM' },
            { label: 'Specialists with low occupancy', value: 'lowOccupancy', benefit: 'Maximum booking occupancy' },
            { label: 'No automatic reminders', value: 'noReminders', benefit: 'Multi-channel reminders' },
            { label: 'Poor product inventory management', value: 'inventory', benefit: 'Synchronized inventory' },
          ],
          '6': [
            { label: 'Student dropout not detected in time', value: 'dropout', benefit: 'Early dropout detection' },
            { label: 'Excessive administrative load on staff', value: 'adminLoad', benefit: 'Administrative automation' },
            { label: 'Poor communication with parents', value: 'communication', benefit: 'Instant communication with parents' },
            { label: 'Lack of personalized learning', value: 'noPersonalization', benefit: 'AI-personalized learning' },
            { label: 'Low security for academic data', value: 'dataSecurity', benefit: 'Top-tier data security' },
            { label: 'Manual and slow academic reports', value: 'manualReports', benefit: 'Live automated reports' },
          ],
        }
      },
      about: {
        badge: 'About Me',
        title: 'About Me',
        motto: 'Your business deserves a developer who treats it like his own',
        description_1: 'Full-stack developer specialized in modern web technologies and AI-powered solutions. I don\'t just write code — I build digital experiences that generate real results for your business.',
        description_2: 'Beyond code, I am a digital architect obsessed with precision. My journey began with the desire to build systems that feel alive.',
        description_3: 'I combine technical rigor with an artist\'s eye, ensuring every pixel has a purpose and every function runs with elegant efficiency.',
        performance_quote: 'Performance is the ultimate luxury.',
        stats: [
          { label: "15+ Projects", subtitle: "Delivered" },
          { label: "100%", subtitle: "Client Satisfaction" },
          { label: "<24h", subtitle: "Response Time" }
        ],
        kpis: [
          { label: 'Average ROI', val: '340%' },
          { label: 'Client Satisfaction', val: '100%' },
          { label: 'Projects Delivered', val: '15+' },
          { label: 'Response Time', val: '<24h' }
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
        subtitle: 'Tell me about your project and I\'ll give you an honest quote within 24 hours. No commitment.',
        name_label: 'Your Name',
        name_placeholder: 'Ex: John Doe',
        email_label: 'Your Email',
        email_placeholder: 'john@yourcompany.com',
        project_label: 'What do you need?',
        project_placeholder: 'Tell me about your project: business type, needed features, estimated timeline...',
        cta: 'Request Free Consultation',
        response_time: 'Response within 24 hours guaranteed'
      },
      clients: {
        badge: 'SUCCESS STORIES',
        title: 'Featured Clients',
        subtitle: 'Businesses from various sectors that trust web and premium artificial intelligence solutions to lead the digital market, increase visibility, and grow constantly.',
        visit: 'Visit',
        testimonials: {
          '1': 'My online presence and consultations increased by 90% in the first 3 months. Their work is exceptional.',
          '2': 'Professionalism and quality in every detail. My website exceeded all expectations.',
          '3': 'The best investment we made for our clinic. The results speak for themselves.',
          '4': 'Fast, efficient, and with a design that makes you fall in love. Totally recommended.',
          '5': 'Professional, fast, and with real results. My website is now faster, more secure, and professional.',
          '6': 'Transformed my digital presence completely. Consultations increased significantly.',
          '7': 'Impeccable work. Understood exactly what we needed and delivered it perfectly.',
          '8': 'Excellent experience from start to finish. The post-launch support is incomparable.',
          '9': 'My website is now my best digital marketing tool, generating patients 24/7.',
          '10': 'Premium quality, timely delivery, and measurable results. Couldn\'t ask for more.',
          '11': 'The system optimized our patient flow. The investment was recovered in the first month.',
          '12': 'Our online sales tripled after the launch. Incredible results.',
          '13': 'Beautiful design that perfectly reflects our brand. Customers love the experience.',
          '14': 'Optimized our operations by 40%. Their response is immediate and the support is incomparable.',
          '15': 'Robust and reliable solution that elevated our business to the next level.',
          '16': 'My sales have increased considerably in the last 3 months, thanks to the website.',
        }
      },
      whyChoose: {
        title: 'Why Choose Me',
        subtitle: 'I don\'t just deliver projects — I deliver results.',
        reason1: {
          title: 'Response in <24 hours',
          desc: 'No weeks of waiting. I respond fast because your time is money.',
        },
        reason2: {
          title: '100% Custom',
          desc: 'No generic templates. Every project is unique and designed for your specific goals.',
        },
        reason3: {
          title: 'Post-Launch Support',
          desc: 'I don\'t leave you alone after delivery. I\'m here when you need me.',
        },
        reason4: {
          title: 'Transparent Pricing',
          desc: 'No surprises or hidden costs. You know exactly what you\'re paying for.',
        },
      },
      contactForm: {
        diagnoseTitle: "Designing your business's digital architecture",
        mainSubtitle: "Define your strategic objectives, identify your key technical challenges, and receive a detailed software architecture proposal in less than 24 hours.",
        howContact: "How do you prefer to be contacted?",
        projectTypeLabel: "Project Type *",
        specifyType: "Specify the project type",
        currentWeb: "Current Website (if applicable)",
        mainProblemLabel: "Main Problem or Need *",
        fallbackResponse: "We have received your information. I will contact you in less than 2 hours with a personalized analysis.",
        contactVia: "Contact via",
        project: "Project",
        type: "Type",
        mainProblemReview: "Main problem",
        webReview: "Current website",
        challengesToSolve: "Challenges to Solve",
        successVisionReview: "Success Vision",
        horizonReview: "Horizon",
        deadlineReview: "Timeline",
        privacyTitle: "Privacy Guaranteed",
        privacyDesc: "All information is protected. We will never share your data or ideas.",
        successDescText: "I have received all your project information. I will conduct a technical analysis and contact you in less than 24 hours.",
        questions: {
          industry: "Industry or Sector",
          pages: "Estimated Pages",
          hasBlog: "Do you need a blog or news section?",
          languages: "Required Languages",
          appType: "Type of Application",
          users: "Estimated Users",
          hasRoles: "Does it require user roles?",
          integrations: "Required Integrations",
          platform: "Primary Platform",
          mainFunction: "Main Functionality",
          audience: "Target Audience",
          aiProblem: "Problem to Solve with AI",
          dataSources: "Available Data Sources",
          aiModel: "Do you have an AI model or should it be created?",
          otherDesc: "Brief Description",
          inspiration: "What inspired you to develop this?",
          techPref: "Preferred Technologies"
        },
        placeholders: {
          industry: "Technology, Health, Restaurants...",
          appType: "CRM, ERP, Admin panel...",
          integrations: "Payment gateways, external APIs, WhatsApp...",
          mainFunction: "Chat, Geolocation, Payments, Social network...",
          audience: "Briefly describe your ideal user",
          aiProblem: "Customer service, Data analysis, Task automation...",
          dataSources: "PDFs, Databases, APIs, physical documents...",
          otherDesc: "Briefly describe your project idea",
          inspiration: "Tell us what motivates you",
          techPref: "Next.js, Firebase, Python, React Native...",
          specifyType: "E.g. Custom ERP system...",
          fullName: "E.g. John Doe",
          company: "Your company name (optional)"
        },
        options: {
          page1: "1 (One Page)",
          yes: "Yes",
          no: "No",
          later: "Later on",
          lang1: "Spanish Only",
          lang2: "Spanish + English",
          lang3: "Multilingual (3+)",
          roles1: "Yes, multiple roles",
          roles2: "Admin only",
          roles3: "Not necessary",
          both: "Both (Cross-platform)",
          aimodel1: "Create from scratch",
          aimodel2: "Use existing API (GPT, Claude)"
        },
        pains: {
          landing: {
            1: "My current site looks outdated",
            4: "It doesn't generate leads or inquiries",
            5: "I cannot update content myself"
          },
          dashboard: {
            5: "Difficulty scaling operations"
          },
          mobile: {
            1: "My business needs to be in the customer's pocket",
            2: "Processes that require mobility",
            3: "Competitors have an app and I don't",
            4: "Push notifications for engagement",
            5: "I want to monetize through an app",
            6: "Integrate with device hardware"
          },
          ai: {
            2: "Repetitive processes stealing time",
            3: "Unanalyzed and unused data",
            4: "Decision-making without data backup",
            6: "I need a virtual agent for my website"
          },
          other: {
            1: "I have an innovative idea",
            2: "I need technical advice first",
            3: "I want to migrate an existing platform",
            4: "Looking for a tech partner for my startup",
            5: "I require maintenance for a system",
            6: "Project with government budget"
          }
        },
        benefits: {
          landing: {
            1: "Renewed professional image",
            4: "Constant lead generation",
            5: "Self-manageable panel"
          },
          dashboard: {
            5: "Operational scalability"
          },
          mobile: {
            1: "Direct mobile presence",
            2: "Operations from anywhere",
            3: "Competitive advantage",
            4: "Engagement with notifications",
            5: "New revenue channel",
            6: "Native device features"
          },
          ai: {
            2: "Smart automation",
            3: "Actionable insights from data",
            4: "AI-backed decisions",
            6: "Personalized AI agent"
          },
          other: {
            1: "Validation and development of your idea",
            2: "Expert consultation with no obligation",
            3: "Secure and optimized migration",
            4: "Strategic tech partner",
            5: "Continuous maintenance and support",
            6: "Institutional project management"
          }
        },
        features: {
          0: "Premium responsive design",
          1: "Autonomous admin panel",
          2: "Online payment gateway",
          3: "User authentication / Roles",
          4: "AI Agent integration",
          5: "Advanced SEO optimization",
          6: "Analytics dashboard",
          7: "Real-time database",
          8: "Push / WhatsApp notifications",
          9: "API for external integration"
        },
        budgets: {
          0: "Less than $500"
        },
        deadlines: {
          1: "1 to 2 weeks",
          2: "One month",
          5: "No rush (Flexible)"
        },
        errors: {
          projectType: "Select a project type",
          mainProblem: "Describe your problem or need"
        }
      },
    },
  },
  es: {
    translation: {
      nav: {
        stack: 'Tecnologías',
        services: 'Servicios',
        projects: 'Proyectos',
        about: 'Sobre Mí',
        contact: 'Contacto',
        selectLanguage: 'Seleccionar Idioma',
      },
      hero: {
        badge: 'DISPONIBLE PARA NUEVOS PROYECTOS',
        title: 'Asegura el futuro de tu negocio con tecnología inteligente',
        subtitle: 'Implemento infraestructuras web modernas y sistemas automatizados que liberan tu tiempo y aceleran tu productividad.',
        cta: 'Cotización Gratis',
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
            description: "Tu página web debe generar clientes, no solo existir. Diseño sitios que convierten visitantes en ventas con un diseño premium que transmite confianza desde el primer segundo.",
            features: [
              "Diseño que transmite lujo y profesionalismo",
              "Carga en menos de 2 segundos (Google premia la velocidad)",
              "Visible en Google cuando buscan tus servicios",
              "Funciona perfecto en celular y computadora"
            ]
          },
          {
            title: "Desarrollo de Aplicaciones",
            description: "Creo aplicaciones móviles y web intuitivas de alto rendimiento que llevan tu negocio directamente al bolsillo de tus clientes en iOS, Android y Web.",
            features: [
              "Llega a tus clientes en cualquier lugar, en cualquier momento",
              "Interfaces tan hermosas que los usuarios se enamoran",
              "Funcionalidad robusta que crece con tu negocio",
              "Lanzamiento exitoso y gestión simplificada"
            ]
          },
          {
            title: "Inteligencia Artificial",
            description: "Integro IA en tus sistemas para que tu negocio tome decisiones más inteligentes, ahorre tiempo valioso y aumente sus ventas automáticamente mientras duermes.",
            features: [
              "Atención al cliente inteligente 24/7 que nunca descansa",
              "Sistema que entiende y responde como un humano",
              "Toma de decisiones más inteligente basada en datos",
              "Automatización de tareas repetitivas para ahorrar 10+ horas/semana"
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
        key_benefits: 'Beneficios clave',
        urgency: {
          spots: '¡Solo {{count}} cupos disponibles!',
          audit: 'para auditorías gratuitas esta semana.',
        },
        items: [
          {
            title: 'Historia Clínica',
            description: 'Sistema de historias clínicas para múltiples especialidades. Incluye sincronización en tiempo real, visualización 3D de anatomía y generación de reportes PDF, programación de citas, facturación, Integración con IA.',
            features: [
              'Aumenta la eficiencia en la consulta hasta un 40%',
              'Mejora la precisión diagnóstica con IA',
              'Reduce errores en la gestión de expedientes',
              'Fideliza pacientes con un portal de acceso seguro',
              'Automatiza la generación de reportes y recetas'
            ]
          },
          {
            title: 'POS Tienda',
            description: 'Punto de venta en la nube diseñado específicamente para tiendas que deseen tener el control de su inventario en tiempo real, manejo de kardex, reportes de ventas y implementar IA para optimizar sus ventas.',
            features: [
              'Elimina las pérdidas por errores de inventario',
              'Maximiza ventas con sugerencias inteligentes de stock',
              'Acceso a reportes financieros desde cualquier lugar',
              'Simplifica el proceso de facturación y cobro',
              'Sincronización instantánea entre sucursales'
            ]
          },
          {
            title: 'Sistema de gestión usuario (CRM)',
            description: 'Plataforma unificada para el control de usuarios, seguimiento de prospectos y automatización de propuestas comerciales. Incluye un portal interactivo para clientes premium con diseño glassmorphic.',
            features: [
              'Embudo de ventas automatizado para maximizar conversión.',
              'Historial centralizado que reduce tiempos de respuesta.',
              'Portal interactivo para soporte y estado de proyectos.',
              'Monitoreo de métricas y ventas en tiempo real.',
              'Gestión ágil de propuestas hasta el cierre del contrato.'
            ]
          },
          {
            title: 'Ecommerce',
            description: 'Plataforma de e-commerce avanzada con una experiencia de compra fluida y elegante. Incluye pasarela de pagos integrada, gestión de inventario automatizada y análisis predictivo para maximizar ventas.',
            features: [
              'Aumenta la tasa de conversión en dispositivos móviles',
              'Reduce el abandono de carrito con checkout optimizado',
              'Posicionamiento de marca con diseño de clase mundial',
              'Carga ultra-rápida para mejorar el SEO y retención',
              'Escalabilidad total para eventos de alta demanda'
            ]
          },
          {
            title: 'Agenda Virtual',
            description: 'Sistema de agenda inteligente y reservas online para profesionales y empresas. Incluye recordatorios automáticos por WhatsApp, CRM de clientes y asistente con IA integrado.',
            features: [
              'Elimina las inasistencias con recordatorios automáticos',
              'Ahorra horas de trabajo con agenda inteligente 24/7',
              'Aumenta la frecuencia de visita con CRM integrado',
              'Optimiza la ocupación de tus especialistas o equipo',
              'Atención al cliente inmediata mediante IA'
            ]
          },
          {
            title: 'Academia Virtual',
            description: 'Plataforma educativa inteligente para la gestión integral de colegios. Utiliza IA para el seguimiento del rendimiento académico, detección temprana de deserción y tutoría personalizada.',
            features: [
              'Detecta riesgos de deserción escolar tempranamente',
              'Reduce la carga administrativa de los docentes',
              'Mejora la comunicación entre padres y escuela',
              'Personaliza el aprendizaje para cada estudiante',
              'Seguridad total de los datos académicos y personales'
            ]
          }
        ]
      },
      projectModal: {
        title: 'Diagnóstico Tecnológico',
        subtitle: 'Personalización y consultoría técnica de alto nivel',
        success_title: '¡Diagnóstico Completado!',
        success_desc: 'Hemos recibido toda la información de tu negocio para {{project}}. Nuestro equipo analizará tu caso y te contactará con una propuesta personalizada.',
        ai_analysis: 'Análisis con IA',
        close: 'Cerrar',
        cancel: 'Cancelar',
        talk_advisor: 'Chat con Joseph Espinoza',
        previous: 'Anterior',
        next: 'Siguiente',
        submitting: 'Analizando...',
        submit: 'Enviar Diagnóstico',
        contact_title: 'Tu Información de Contacto',
        contact_subtitle: 'Para enviarte el diagnóstico personalizado y propuesta',
        name_label: 'Nombre Completo *',
        email_label: 'Correo Electrónico *',
        phone_label: 'Teléfono / WhatsApp',
        company_label: 'Empresa / Negocio',
        required_error: 'Campo obligatorio',
        invalid_email: 'Correo inválido',
        profile_title: 'Perfil de tu Negocio',
        profile_subtitle: 'Cuéntanos más sobre tu operación actual',
        pain_title: '¿Cuáles son tus principales desafíos?',
        features_title: 'Funcionalidades que más te interesan',
        goals_title: 'Metas y Horizonte',
        goals_subtitle: 'Ayúdanos a entender tu visión para ofrecerte la mejor propuesta',
        success_vision_label: '¿Cómo te imaginas el resultado ideal?',
        success_vision_placeholder: 'Describe cómo te gustaría que tu negocio opere con esta solución...',
        timeline_label: '¿Cuándo te gustaría empezar?',
        timeline_placeholder: 'Selecciona una opción',
        budget_label: 'Presupuesto Estimado',
        budget_placeholder: 'Selecciona un rango',
        references_label: 'Referencias o Inspiración',
        references_placeholder: '¿Hay algún sitio web o plataforma que te guste como referencia? (opcional)',
        review_title: 'Revisión Final',
        review_subtitle: 'Verifica que todo esté correcto antes de enviar',
        review_terms: 'Al enviar, aceptas que te contactemos para dar seguimiento a tu solicitud.',
        step_contact: 'Contacto',
        step_profile: 'Perfil',
        step_goals: 'Metas',
        step_review: 'Revisión',
        timeline_options: {
          immediate: 'Inmediato (esta semana)',
          month: 'Este mes',
          months_1_3: 'En 1-3 meses',
          months_3_6: 'En 3-6 meses',
          exploring: 'Solo estoy explorando'
        },
        budget_options: {
          undisclosed: 'Prefiero no decirlo',
          range_1: '$1,000 - $5,000 USD',
          range_2: '$5,000 - $15,000 USD',
          range_3: '$15,000 - $50,000 USD',
          range_4: '$50,000+ USD'
        },
        questions: {
          '1': [
            { label: 'Especialidad Médica', name: 'specialty', type: 'text', placeholder: 'Pediatría, Cardiología, Medicina General...' },
            { label: 'Pacientes por Día', name: 'dailyPatients', type: 'select', options: ['Menos de 10', '10-30', '31-60', 'Más de 60'] },
            { label: 'Sistema Actual', name: 'currentSystem', type: 'text', placeholder: '¿Usas papel, Excel o algún software?' },
            { label: 'Ubicación / País', name: 'location', type: 'text', placeholder: 'País o ciudad donde operas' },
          ],
          '2': [
            { label: 'Tipo de Retail', name: 'storeType', type: 'text', placeholder: 'Ropa, Calzado, Electrónica, Abarrotes...' },
            { label: 'Cantidad de Sucursales', name: 'branches', type: 'select', options: ['1 (Única)', '2-5', '6-10', '+10'] },
            { label: 'Ventas Mensuales Estimadas', name: 'revenue', type: 'select', options: ['- $5,000/mes', '$5,000 - $20,000', '$20,000 - $50,000', '+ $50,000'] },
            { label: 'Inventario Aproximado (SKUs)', name: 'skuCount', type: 'select', options: ['Menos de 100', '100-500', '501-2000', '+2000'] },
          ],
          '3': [
            { label: 'Tipo de Alojamiento', name: 'hotelType', type: 'select', options: ['Hotel Boutique', 'Resort', 'Hostal', 'Cadena Hotelera'] },
            { label: 'Número de Habitaciones', name: 'rooms', type: 'select', options: ['1-20', '21-50', '51-100', '+100'] },
            { label: 'Ocupación Promedio Actual', name: 'occupancy', type: 'select', options: ['- 30%', '30-50%', '51-70%', '+70%'] },
            { label: '¿Tienes equipo de recepción?', name: 'hasStaff', type: 'select', options: ['Sí, completo', 'Sí, mínimo', 'No, soy independiente'] },
          ],
          '4': [
            { label: 'Nicho de Mercado', name: 'niche', type: 'text', placeholder: 'Joyería, Ropa de diseñador, Muebles...' },
            { label: 'Canal de Ventas Principal', name: 'channel', type: 'select', options: ['Instagram / Redes Sociales', 'MercadoLibre / Amazon', 'Tienda física', 'Ninguno aún'] },
            { label: 'Ingresos Mensuales Actuales', name: 'income', type: 'select', options: ['Aún no vendo', '- $1,000', '$1,000 - $10,000', '+ $10,000'] },
            { label: '¿Ya has tenido tienda online?', name: 'previousEcom', type: 'select', options: ['Nunca', 'Sí, pero no funcionó', 'Sí, activa actualmente'] },
          ],
          '5': [
            { label: 'Tipo de Negocio', name: 'beautyType', type: 'select', options: ['Salón de Belleza', 'Spa', 'Barbería', 'Clínica Estética'] },
            { label: 'Especialistas / Staff', name: 'staff', type: 'select', options: ['1 (Independiente)', '2-5', '6-15', '+15'] },
            { label: 'Clientes por Semana', name: 'weeklyClients', type: 'select', options: ['- 20', '20-50', '51-100', '+100'] },
            { label: 'Manejas Citas de Forma', name: 'bookingMethod', type: 'select', options: ['Manual (agenda física)', 'WhatsApp / Llamadas', 'Google Calendar', 'Software básico'] },
          ],
          '6': [
            { label: 'Tipo de Institución', name: 'schoolType', type: 'select', options: ['Colegio / Escuela', 'Universidad', 'Instituto Técnico', 'Academia Online'] },
            { label: 'Total de Estudiantes', name: 'students', type: 'select', options: ['1-100', '101-500', '501-2000', '+2000'] },
            { label: 'Nivel Educativo Principal', name: 'level', type: 'select', options: ['Primaria / Secundaria', 'Pregrado', 'Posgrado', 'Mixto'] },
            { label: 'Tasa de Deserción Anual', name: 'dropoutRate', type: 'select', options: ['- 5%', '5-10%', '10-20%', '+20%', 'No lo sé'] },
          ],
        },
        painPoints: {
          '1': [
            { label: 'Exceso de papeleo administrativo', value: 'paperwork', benefit: 'Reducción de papeleo' },
            { label: 'Pérdida o desorden de historiales', value: 'lostRecords', benefit: 'Historiales siempre accesibles' },
            { label: 'Diagnósticos sin apoyo de datos', value: 'noDataDiagnosis', benefit: 'Precisión con IA' },
            { label: 'Procesos lentos con pacientes', value: 'slowProcess', benefit: 'Flujo ágil de pacientes' },
            { label: 'Falta de acceso remoto a datos', value: 'noRemote', benefit: 'Acceso desde cualquier lugar' },
            { label: 'Incumplimiento de normativas', value: 'compliance', benefit: 'Cumplimiento normativo asegurado' },
          ],
          '2': [
            { label: 'Inventario no actualizado en tiempo real', value: 'stockSync', benefit: 'Stock siempre al día' },
            { label: 'Pérdidas por merma o robo hormiga', value: 'shrinkage', benefit: 'Control de pérdidas' },
            { label: 'Falta de reportes financieros claros', value: 'noReports', benefit: 'Reportes financieros automáticos' },
            { label: 'Sucursales desincronizadas entre sí', value: 'branchSync', benefit: 'Sincronización multi-sucursal' },
            { label: 'Procesos de pago lentos', value: 'slowCheckout', benefit: 'Pagos rápidos y seguros' },
            { label: 'Sin control eficiente de proveedores', value: 'suppliers', benefit: 'Gestión integrada de proveedores' },
          ],
          '3': [
            { label: 'Baja tasa de ocupación recurrente', value: 'lowOccupancy', benefit: 'Maximizar ocupación' },
            { label: 'Costos operativos mensuales elevados', value: 'highCosts', benefit: 'Reducir costos operativos' },
            { label: 'Sin portal de huéspedes automatizado', value: 'noGuestPortal', benefit: 'Portal de huéspedes inteligente' },
            { label: 'No tengo P&L en tiempo real', value: 'noPnl', benefit: 'P&L actualizado al instante' },
            { label: 'Procesos de mantenimiento ineficientes', value: 'maintenance', benefit: 'Mantenimiento automatizado' },
            { label: 'Mala integración con OTAs y canales', value: 'otaIntegration', benefit: 'Integración total con OTAs' },
          ],
          '4': [
            { label: 'Alta tasa de carrito abandonado', value: 'cartAbandon', benefit: 'Recuperación de carritos' },
            { label: 'Baja conversión desde móvil', value: 'mobileConversion', benefit: 'Conversión móvil optimizada' },
            { label: 'Marca sin diferenciación digital', value: 'branding', benefit: 'Identidad digital premium' },
            { label: 'Velocidad de carga muy lenta', value: 'speed', benefit: 'Rendimiento ultrarrápido' },
            { label: 'Dificultad para escalar ventas', value: 'scalability', benefit: 'Escalabilidad sin límites' },
            { label: 'Sin automatización de marketing', value: 'marketing', benefit: 'Marketing automatizado con IA' },
          ],
          '5': [
            { label: 'No-shows frecuentes que reducen ingresos', value: 'noShows', benefit: 'Reducción drástica de no-shows' },
            { label: 'Agenda desorganizada y manual', value: 'messySchedule', benefit: 'Agenda inteligente automatizada' },
            { label: 'Clientes que no regresan', value: 'lowRetention', benefit: 'Fidelización con CRM inteligente' },
            { label: 'Especialistas con baja ocupación', value: 'lowOccupancy', benefit: 'Máxima ocupación de agenda' },
            { label: 'Sin recordatorios automáticos', value: 'noReminders', benefit: 'Recordatorios multi-canal' },
            { label: 'Mala gestión de inventario de productos', value: 'inventory', benefit: 'Inventario sincronizado' },
          ],
          '6': [
            { label: 'Deserción estudiantil no detectada a tiempo', value: 'dropout', benefit: 'Detección temprana de deserción' },
            { label: 'Carga administrativa excesiva del personal', value: 'adminLoad', benefit: 'Automatización administrativa' },
            { label: 'Mala comunicación con padres/apoderados', value: 'communication', benefit: 'Comunicación instantánea con padres' },
            { label: 'Falta de personalización del aprendizaje', value: 'noPersonalization', benefit: 'Aprendizaje personalizado con IA' },
            { label: 'Datos académicos con poca seguridad', value: 'dataSecurity', benefit: 'Seguridad de datos de primer nivel' },
            { label: 'Reportes académicos manuales y lentos', value: 'manualReports', benefit: 'Reportes automatizados en vivo' },
          ],
        }
      },
      about: {
        title: 'Sobre Mí',
        motto: 'Tu negocio merece un desarrollador que lo trate como suyo',
        description_1: 'Desarrollador Full-Stack especializado en tecnologías web modernas y soluciones potenciadas con IA. No solo escribo código — construyo experiencias digitales que generan resultados reales para tu negocio.',
        description_2: 'Más allá del código, soy un arquitecto digital obsesionado con la precisión. Mi viaje comenzó con el deseo de construir sistemas que se sientan vivos.',
        description_3: 'Combino rigor técnico con la mirada de un artista, asegurando que cada píxel tenga un propósito y cada función se ejecute con eficiencia elegante.',
        performance_quote: 'El rendimiento es el máximo lujo.',
        stats: [
          { label: "15+ Proyectos", subtitle: "Entregados" },
          { label: "100%", subtitle: "Satisfacción del Cliente" },
          { label: "<24h", subtitle: "Tiempo de Respuesta" }
        ],
        kpis: [
          { label: 'ROI Promedio', val: '340%' },
          { label: 'Satisfacción', val: '100%' },
          { label: 'Proyectos Entregados', val: '15+' },
          { label: 'Tiempo de Respuesta', val: '<24h' }
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
        subtitle: 'Cuéntame sobre tu proyecto y te doy un presupuesto honesto en 24 horas. Sin compromiso.',
        name_label: 'Tu Nombre',
        name_placeholder: 'Ej: Juan Pérez',
        email_label: 'Tu Email',
        email_placeholder: 'juan@tuempresa.com',
        project_label: '¿Qué necesitas?',
        project_placeholder: 'Cuéntame sobre tu proyecto: tipo de negocio, funcionalidades, timeline...',
        cta: 'Solicitar Consulta Gratuita',
        response_time: 'Respuesta garantizada en 24 horas'
      },
      clients: {
        badge: 'CASOS DE ÉXITO',
        title: 'Clientes Destacados',
        subtitle: 'Negocios de diferentes sectores que confían en soluciones web y de inteligencia artificial para liderar su mercado digital, aumentar su visibilidad y crecer de forma constante.',
        visit: 'Visitar',
        testimonials: {
          '1': 'Mi presencia online y consultas aumentaron un 90% en los primeros 3 meses. Su trabajo es excepcional.',
          '2': 'Profesionalismo y calidad en cada detalle. Mi página web superó todas las expectativas.',
          '3': 'El mejor inversione que hicimos para nuestra clínica. Los resultados hablan por sí solos.',
          '4': 'Rápido, eficiente y con un diseño que enamora. Totalmente recomendado.',
          '5': 'Profesional, rápido y con resultados reales. Mi página web ahora es mas rapida, segura y profesional.',
          '6': 'Transformó mi presencia digital por completo. Las consultas aumentaron notablemente.',
          '7': 'Un trabajo impecable. Entendió exactamente lo que necesitábamos y lo entregó perfecto.',
          '8': 'Excelente experiencia de principio a fin. El soporte post-lanzamiento es incomparable.',
          '9': 'Mi página ahora es mi mejor herramienta de marketing digital, genera pacientes 24/7.',
          '10': 'Calidad premium, entrega puntual y resultados medibles. No podría pedir más.',
          '11': 'El sistema optimizó nuestro flujo de pacientes. La inversión se recuperó en el primer mes.',
          '12': 'Nuestras ventas online se triplicaron después del lanzamiento. Resultados increíbles.',
          '13': 'Diseño hermoso que refleja perfectamente nuestra marca. Los clientes aman la experiencia.',
          '14': 'Optimizó nuestras operaciones un 40%. Su respuesta es inmediata y el soporte es incomparable.',
          '15': 'Solución robusta y confiable que elevó nuestro negocio al siguiente nivel.',
          '16': 'Mis ventas han aumentado considerablemente en los ultimos 3 meses, gracias a la pagina web.',
        }
      },
      whyChoose: {
        title: 'Por Qué Elegirme',
        subtitle: 'No solo Entrego Proyectos — Entrego Resultados.',
        reason1: {
          title: 'Respuesta en <24 horas',
          desc: 'Sin semanas de espera. Respondo rápido porque tu tiempo es dinero.',
        },
        reason2: {
          title: '100% Personalizado',
          desc: 'Sin plantillas genéricas. Cada proyecto es único y diseñado para tus metas específicas.',
        },
        reason3: {
          title: 'Soporte Post-Lanzamiento',
          desc: 'No te dejo solo después de la entrega. Estoy aquí cuando me necesitas.',
        },
        reason4: {
          title: 'Precios Transparentes',
          desc: 'Sin sorpresas ni costos ocultos. Sabes exactamente por qué pagas.',
        },
      },
      contactForm: {
        diagnoseTitle: "Diseñemos la arquitectura digital de tu negocio",
        mainSubtitle: "Define tus objetivos estratégicos, identifica tus principales desafíos técnicos y obtén una propuesta de arquitectura de software en menos de 24 horas.",
        howContact: "¿Cómo prefieres que te contacte?",
        projectTypeLabel: "Tipo de Proyecto *",
        specifyType: "Especifica el tipo de proyecto",
        currentWeb: "Sitio Web Actual (si aplica)",
        mainProblemLabel: "Problema o Necesidad Principal *",
        fallbackResponse: "Hemos recibido tu información. Te contactaré en menos de 2 horas con un análisis personalizado.",
        contactVia: "Contacto vía",
        project: "Proyecto",
        type: "Tipo",
        mainProblemReview: "Problema principal",
        webReview: "Web actual",
        challengesToSolve: "Desafíos a Resolver",
        successVisionReview: "Visión de Éxito",
        horizonReview: "Horizonte",
        deadlineReview: "Plazo",
        privacyTitle: "Privacidad Garantizada",
        privacyDesc: "Toda la información está protegida. Nunca compartiremos tus datos ni ideas.",
        successDescText: "He recibido toda la información de tu proyecto. Realizaré un análisis técnico y te contactaré en menos de 24 horas.",
        questions: {
          industry: "Industria o Rubro",
          pages: "Páginas Estimadas",
          hasBlog: "¿Necesitas blog o noticias?",
          languages: "Idiomas Requeridos",
          appType: "Tipo de Aplicación",
          users: "Usuarios Estimados",
          hasRoles: "¿Requiere roles de usuario?",
          integrations: "Integraciones Requeridas",
          platform: "Plataforma Principal",
          mainFunction: "Funcionalidad Principal",
          audience: "Público Objetivo",
          aiProblem: "Problema a Resolver con IA",
          dataSources: "Fuentes de Datos Disponibles",
          aiModel: "¿Tienes modelo IA o hay que crearlo?",
          otherDesc: "Descripción Breve",
          inspiration: "¿Qué te inspiró a desarrollar esto?",
          techPref: "Tecnologías Preferidas"
        },
        placeholders: {
          industry: "Tecnología, Salud, Restaurantes...",
          appType: "CRM, ERP, Panel administrativo...",
          integrations: "Pasarelas de pago, APIs externas, WhatsApp...",
          mainFunction: "Chat, Geolocalización, Pagos, Red social...",
          audience: "Describre brevemente a tu usuario ideal",
          aiProblem: "Atención al cliente, Análisis de datos, Automatización de tareas...",
          dataSources: "PDFs, Bases de datos, APIs, Documentos físicos...",
          otherDesc: "Describe brevemente tu idea de proyecto",
          inspiration: "Cuéntanos qué te motiva",
          techPref: "Next.js, Firebase, Python, React Native...",
          specifyType: "Ej. Sistema ERP personalizado...",
          fullName: "Ej. Juan Pérez",
          company: "Nombre de tu empresa (opcional)"
        },
        options: {
          page1: "1 (One Page)",
          yes: "Sí",
          no: "No",
          later: "Más adelante",
          lang1: "Solo Español",
          lang2: "Español + Inglés",
          lang3: "Multilingüe (3+)",
          roles1: "Sí, varios roles",
          roles2: "Solo admin",
          roles3: "No necesario",
          both: "Ambas (Cross-platform)",
          aimodel1: "Crear desde cero",
          aimodel2: "Usar API existente (GPT, Claude)"
        },
        pains: {
          landing: {
            1: "Mi sitio actual se ve anticuado",
            4: "No genera leads ni consultas",
            5: "No puedo actualizar contenido yo mismo"
          },
          dashboard: {
            5: "Dificultad para escalar operaciones"
          },
          mobile: {
            1: "Mi negocio necesita estar en el bolsillo del cliente",
            2: "Procesos que requieren movilidad",
            3: "Competencia ya tiene app y yo no",
            4: "Notificaciones push para engagement",
            5: "Quiero monetizar mediante app",
            6: "Integrar con hardware del dispositivo"
          },
          ai: {
            2: "Procesos repetitivos que roban tiempo",
            3: "Datos sin analizar ni aprovechar",
            4: "Toma de decisiones sin respaldo de datos",
            6: "Necesito un agente virtual para mi web"
          },
          other: {
            1: "Tengo una idea innovadora",
            2: "Necesito asesoría técnica primero",
            3: "Quiero migrar una plataforma existente",
            4: "Busco socio tecnológico para mi startup",
            5: "Requiero mantenimiento de un sistema",
            6: "Proyecto con presupuesto gubernamental"
          }
        },
        benefits: {
          landing: {
            1: "Imagen profesional renovada",
            4: "Generación de leads constante",
            5: "Panel autogestionable"
          },
          dashboard: {
            5: "Escalabilidad operativa"
          },
          mobile: {
            1: "Presencia móvil directa",
            2: "Operaciones desde cualquier lugar",
            3: "Ventaja competitiva",
            4: "Engagement con notificaciones",
            5: "Nuevo canal de ingresos",
            6: "Funcionalidades nativas del dispositivo"
          },
          ai: {
            2: "Automatización inteligente",
            3: "Insights accionables desde datos",
            4: "Decisiones respaldadas por IA",
            6: "Agente IA personalizado"
          },
          other: {
            1: "Validación y desarrollo de tu idea",
            2: "Consultoría experta sin compromiso",
            3: "Migración segura y optimizada",
            4: "Partner técnico estratégico",
            5: "Mantenimiento y soporte continuo",
            6: "Gestión de proyectos institucionales"
          }
        },
        features: {
          0: "Diseño responsive premium",
          1: "Panel de administración autónomo",
          2: "Pasarela de pagos en línea",
          3: "Autenticación de usuarios / Roles",
          4: "Integración de Agentes de IA",
          5: "Optimización SEO avanzada",
          6: "Dashboard de Analíticas",
          7: "Base de datos en tiempo real",
          8: "Notificaciones Push / WhatsApp",
          9: "API para integración externa"
        },
        budgets: {
          0: "Menor a $500"
        },
        deadlines: {
          1: "1 a 2 semanas",
          2: "Un mes",
          5: "Sin prisa (Flexible)"
        },
        errors: {
          projectType: "Selecciona un tipo de proyecto",
          mainProblem: "Describe tu problema o necesidad"
        }
      },
    },
  },
  fr: {
    translation: {
      nav: {
        stack: 'Technologies',
        services: 'Services',
        projects: 'Projets',
        about: 'À propos',
        contact: 'Contactez-moi',
        selectLanguage: 'Sélectionner la Langue',
      },
      hero: {
        badge: 'DISPONIBLE POUR DE NOUVEAUX PROJETS',
        title: 'Assurez l\'avenir de votre entreprise grâce à la technologie intelligente',
        subtitle: 'J\'implémente des infrastructures web modernes et des systèmes automatisés qui libèrent votre temps et accélèrent votre productivité.',
        cta: 'Devis Gratuit',
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
            description: "Votre site web doit générer des clients, pas juste exister. Je crée des sites qui convertissent vos visiteurs en ventes avec un design premium qui transmet la confiance dès la première seconde.",
            features: [
              "Design qui transmet le luxe et le professionnalisme",
              "Charge en moins de 2 secondes (Google récompense la vitesse)",
              "Visible sur Google quand ils cherchent vos services",
              "Fonctionne parfaitement sur mobile et ordinateur"
            ]
          },
          {
            title: "Développement d'Apps",
            description: "Je crée des applications mobiles et web intuitives et performantes qui apportent votre entreprise directement dans la poche de vos clients sur iOS, Android et Web.",
            features: [
              "Atteignez vos clients partout, à tout moment",
              "Interfaces si belles que les utilisateurs tombent amoureux",
              "Fonctionnalité robuste qui grandit avec votre entreprise",
              "Lancement réussi et gestion simplifiée"
            ]
          },
          {
            title: "Intelligence Artificielle",
            description: "J'intègre l'IA dans vos systèmes pour que votre entreprise prenne des décisions plus intelligentes, gagne un temps précieux et augmente ses ventes automatiquement pendant que vous dormez.",
            features: [
              "Service client intelligent 24/7 qui ne se repose jamais",
              "Système qui comprend et répond comme un humain",
              "Prise de décision plus intelligente basée sur les données",
              "Automatisation des tâches répétitives pour gagner 10+ heures/semaine"
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
        view_case: 'Consultation gratuite',
        key_benefits: 'Avantages clés',
        urgency: {
          spots: 'Plus que {{count}} places disponibles !',
          audit: 'pour des audits gratuits cette semaine.',
        },
        items: [
          {
            title: 'Medical AI History',
            description: 'Système complet de dossiers médicaux pour plusieurs spécialités. Comprend la synchronisation en temps réel, la visualisation interactive de l\'anatomie en 3D et la génération de rapports PDF dynamiques, la prise de rendez-vous, la facturation, l\'intégration de l\'IA pour le diagnostic et le traitement.',
            features: [
              'Augmente l\'efficacité des consultations jusqu\'à 40%',
              'Améliore la précision du diagnostic grâce à l\'IA',
              'Réduit les erreurs de gestion des dossiers',
              'Fidélise les patients avec un portail d\'accès sécurisé',
              'Automatise la génération de rapports et d\'ordonnances'
            ]
          },
          {
            title: 'POS AI Store',
            description: 'Point de vente cloud conçu spécifiquement pour les magasins souhaitant contrôler leur inventaire en temps réel, la gestion du kardex, les rapports de vente et la mise en œuvre de l\'IA pour optimiser leurs ventes.',
            features: [
              'Élimine les pertes dues aux erreurs d\'inventaire',
              'Maximise les ventes avec des suggestions de stock intelligentes',
              'Accès aux rapports financiers de n\'importe où',
              'Simplifie les processus de facturation et de paiement',
              'Synchronisation instantanée entre les succursales'
            ]
          },
          {
            title: 'Système de gestion client (CRM)',
            description: 'Plateforme unifiée pour le contrôle des utilisateurs, le suivi des prospects et l\'automatisation des propositions commerciales. Comprend un portail interactif pour les clients premium au design glassmorphic.',
            features: [
              'Entonnoir de vente automatisé pour maximiser la conversion.',
              'Historique centralisé qui réduit les temps de réponse.',
              'Portail interactif pour le support et le statut du projet.',
              'Suivi en temps réel des métriques et des ventes.',
              'Gestion agile des propositions jusqu\'à la signature.'
            ]
          },
          {
            title: 'Eve Commerce',
            description: 'Plateforme de commerce électronique avancée axée sur la mode haut de gamme avec une expérience d\'achat fluide et élégante.',
            features: [
              'Augmente le taux de conversion sur les appareils mobiles',
              'Réduit l\'abandon de panier avec un paiement optimisé',
              'Positionnement de marque avec un design de classe mondiale',
              'Chargement ultra-rapide pour améliorer le SEO et la rétention',
              'Évolutivité totale pour les événements à forte demande'
            ]
          },
          {
            title: 'Beauty Agenda SaaS',
            description: 'Système d\'agenda intelligent pour les salons de beauté, les salons de coiffure et les spas. Comprend les réservations en ligne, les rappels automatiques par WhatsApp, le CRM client et l\'assistant IA intégré.',
            features: [
              'Élimine les absences grâce aux rappels automatiques',
              'Économise des heures de travail avec un agenda intelligent 24/7',
              'Augmente la fréquence des visites grâce au CRM intégré',
              'Optimise l\'occupation de vos spécialistes',
              'Service client immédiat grâce à l\'IA'
            ]
          },
          {
            title: 'ScholarAI Nexus',
            description: 'Plateforme éducative intelligente pour la gestion globale des écoles. Utilise l\'IA pour le suivi des performances académiques, la détection précoce du décrochage et le tutorat personnalisé.',
            features: [
              'Détecte rapidement les risques de décrochage scolaire',
              'Réduit la charge administrative des enseignants',
              'Améliore la communication entre les parents et l\'école',
              'Personnalise l\'apprentissage pour chaque élève',
              'Sécurité totale des données académiques et personnelles'
            ]
          }
        ]
      },
      projectModal: {
        title: 'Diagnostic Technique',
        subtitle: 'Personnalisation et conseil technique de haut niveau',
        success_title: 'Diagnostic Terminé !',
        success_desc: 'Nous avons reçu toutes les informations de votre entreprise pour {{project}}. Notre équipe analysera votre cas et vous contactera avec une proposition personnalisée.',
        ai_analysis: 'Analyse IA',
        close: 'Fermer',
        cancel: 'Annuler',
        talk_advisor: 'Discuter avec Joseph Espinoza',
        previous: 'Précédent',
        next: 'Suivant',
        submitting: 'Analyse en cours...',
        submit: 'Envoyer le diagnostic',
        contact_title: 'Vos coordonnées',
        contact_subtitle: 'Pour vous envoyer le diagnostic personnalisé et la proposition',
        name_label: 'Nom complet *',
        email_label: 'Adresse e-mail *',
        phone_label: 'Téléphone / WhatsApp',
        company_label: 'Entreprise / Affaire',
        required_error: 'Champs requis',
        invalid_email: 'E-mail invalide',
        profile_title: 'Profil de votre entreprise',
        profile_subtitle: 'Dites-nous en plus sur votre fonctionnement actuel',
        pain_title: 'Quels sont vos principaux défis ?',
        features_title: 'Fonctionnalités qui vous intéressent le plus',
        goals_title: 'Objectifs et calendrier',
        goals_subtitle: 'Aidez-nous à comprendre votre vision pour vous offrir la meilleure proposition',
        success_vision_label: 'Comment imaginez-vous le résultat idéal ?',
        success_vision_placeholder: 'Décrivez comment vous aimeriez que votre entreprise fonctionne avec cette solution...',
        timeline_label: 'Quand aimeriez-vous commencer ?',
        timeline_placeholder: 'Sélectionnez une option',
        budget_label: 'Budget estimé',
        budget_placeholder: 'Sélectionnez une tranche',
        references_label: 'Références ou inspiration',
        references_placeholder: 'Y a-t-il un site web ou une plateforme que vous aimez comme référence ? (optionnel)',
        review_title: 'Examen final',
        review_subtitle: 'Vérifiez que tout est correct avant d\'envoyer',
        review_terms: 'En envoyant, vous acceptez que nous vous contactions pour assurer le suivi de votre demande.',
        step_contact: 'Contact',
        step_profile: 'Profil',
        step_goals: 'Objectifs',
        step_review: 'Examen',
        timeline_options: {
          immediate: 'Immédiat (cette semaine)',
          month: 'Ce mois-ci',
          months_1_3: 'Dans 1-3 mois',
          months_3_6: 'Dans 3-6 mois',
          exploring: 'Je explore simplement'
        },
        budget_options: {
          undisclosed: 'Je préfère ne pas le dire',
          range_1: '1 000 $ - 5 000 $ USD',
          range_2: '5 000 $ - 15 000 $ USD',
          range_3: '15 000 $ - 50 000 $ USD',
          range_4: '50 000 $ + USD'
        },
        questions: {
          '1': [
            { label: 'Spécialité médicale', name: 'specialty', type: 'text', placeholder: 'Pédiatrie, cardiologie, médecine générale...' },
            { label: 'Patients par jour', name: 'dailyPatients', type: 'select', options: ['Moins de 10', '10-30', '31-60', 'Plus de 60'] },
            { label: 'Système actuel', name: 'currentSystem', type: 'text', placeholder: 'Utilisez-vous du papier, Excel ou un logiciel ?' },
            { label: 'Emplacement / Pays', name: 'location', type: 'text', placeholder: 'Pays ou ville où vous opérez' },
          ],
          '2': [
            { label: 'Type de commerce', name: 'storeType', type: 'text', placeholder: 'Vêtements, chaussures, électronique...' },
            { label: 'Nombre de succursales', name: 'branches', type: 'select', options: ['1 (Unique)', '2-5', '6-10', '+10'] },
            { label: 'Ventes mensuelles estimées', name: 'revenue', type: 'select', options: ['- 5 000 $/mois', '5 000 $ - 20 000 $', '20 000 $ - 50 000 $', '+ 50 000 $'] },
            { label: 'Inventaire approximatif (SKU)', name: 'skuCount', type: 'select', options: ['Moins de 100', '100-500', '501-2000', '+2000'] },
          ],
          '3': [
            { label: 'Type d\'hébergement', name: 'hotelType', type: 'select', options: ['Hôtel Boutique', 'Resort', 'Auberge', 'Chaîne hôtelière'] },
            { label: 'Nombre de chambres', name: 'rooms', type: 'select', options: ['1-20', '21-50', '51-100', '+100'] },
            { label: 'Occupation moyenne actuelle', name: 'occupancy', type: 'select', options: ['- 30%', '30-50%', '51-70%', '+70%'] },
            { label: 'Avez-vous une équipe de réception ?', name: 'hasStaff', type: 'select', options: ['Oui, complète', 'Oui, minimale', 'Non, je suis indépendant'] },
          ],
          '4': [
            { label: 'Niche de marché', name: 'niche', type: 'text', placeholder: 'Bijoux, vêtements de créateurs, meubles...' },
            { label: 'Canal de vente principal', name: 'channel', type: 'select', options: ['Instagram / Réseaux sociaux', 'Amazon', 'Boutique physique', 'Aucun pour le moment'] },
            { label: 'Revenus mensuels actuels', name: 'income', type: 'select', options: ['Je ne vends pas encore', '- 1 000 $', '1 000 $ - 10 000 $', '+ 10 000 $'] },
            { label: 'Avez-vous déjà eu une boutique en ligne ?', name: 'previousEcom', type: 'select', options: ['Jamais', 'Oui, mais ça n\'a pas marché', 'Oui, active actuellement'] },
          ],
          '5': [
            { label: 'Type d\'entreprise', name: 'beautyType', type: 'select', options: ['Salon de beauté', 'Spa', 'Barbière', 'Clinique esthétique'] },
            { label: 'Spécialistes / Personnel', name: 'staff', type: 'select', options: ['1 (Indépendant)', '2-5', '6-15', '+15'] },
            { label: 'Clients par semaine', name: 'weeklyClients', type: 'select', options: ['- 20', '20-50', '51-100', '+100'] },
            { label: 'Vous gérez les rendez-vous par', name: 'bookingMethod', type: 'select', options: ['Manuel (agenda papier)', 'WhatsApp / Appels', 'Google Calendar', 'Logiciel de base'] },
          ],
          '6': [
            { label: 'Type d\'établissement', name: 'schoolType', type: 'select', options: ['École / Académie', 'Université', 'Institut technique', 'Académie en ligne'] },
            { label: 'Nombre total d\'élèves', name: 'students', type: 'select', options: ['1-100', '101-500', '501-2000', '+2000'] },
            { label: 'Niveau d\'enseignement principal', name: 'level', type: 'select', options: ['Primaire / Secondaire', 'Licence', 'Master / Doctorat', 'Mixte'] },
            { label: 'Taux d\'abandon annuel', name: 'dropoutRate', type: 'select', options: ['- 5%', '5-10%', '10-20%', '+20%', 'Je ne sais pas'] },
          ],
        },
        painPoints: {
          '1': [
            { label: 'Excès de paperasse administrative', value: 'paperwork', benefit: 'Réduction de la paperasse' },
            { label: 'Perte ou désordre des dossiers', value: 'lostRecords', benefit: 'Dossiers toujours accessibles' },
            { label: 'Diagnostics sans support de données', value: 'noDataDiagnosis', benefit: 'Précision avec l\'IA' },
            { label: 'Flux de travail des patients lents', value: 'slowProcess', benefit: 'Flux de patients agile' },
            { label: 'Manque d\'accès à distance aux données', value: 'noRemote', benefit: 'Accès depuis n\'importe où' },
            { label: 'Non-respect des réglementations', value: 'compliance', benefit: 'Conformité assurée' },
          ],
          '2': [
            { label: 'Inventaire non mis à jour en temps réel', value: 'stockSync', benefit: 'Stock toujours à jour' },
            { label: 'Pertes dues au vol ou à la démarque', value: 'shrinkage', benefit: 'Contrôle des pertes' },
            { label: 'Manque de rapports financiers clairs', value: 'noReports', benefit: 'Rapports financiers automatiques' },
            { label: 'Succursales non synchronisées', value: 'branchSync', benefit: 'Synchronisation multi-succursales' },
            { label: 'Processus de paiement lents', value: 'slowCheckout', benefit: 'Paiements rapides et sécurisés' },
            { label: 'Pas de contrôle efficace des fournisseurs', value: 'suppliers', benefit: 'Gestion intégrée des fournisseurs' },
          ],
          '3': [
            { label: 'Faible taux d\'occupation récurrent', value: 'lowOccupancy', benefit: 'Maximiser l\'occupation' },
            { label: 'Coûts opérationnels mensuels élevés', value: 'highCosts', benefit: 'Réduire les coûts' },
            { label: 'Pas de portail client automatisé', value: 'noGuestPortal', benefit: 'Portail client intelligent' },
            { label: 'Pas de P&L en temps réel', value: 'noPnl', benefit: 'P&L mis à jour instantanément' },
            { label: 'Processus de maintenance inefficaces', value: 'maintenance', benefit: 'Maintenance automatisée' },
            { label: 'Mauvaise intégration avec les OTA/canaux', value: 'otaIntegration', benefit: 'Intégration totale des OTA' },
          ],
          '4': [
            { label: 'Taux d\'abandon de panier élevé', value: 'cartAbandon', benefit: 'Récupération des paniers' },
            { label: 'Faible conversion depuis mobile', value: 'mobileConversion', benefit: 'Conversion mobile optimisée' },
            { label: 'Marque sans différenciation numérique', value: 'branding', benefit: 'Identité numérique premium' },
            { label: 'Vitesse de chargement très lente', value: 'speed', benefit: 'Performance ultrarapide' },
            { label: 'Difficulté à faire évoluer les ventes', value: 'scalability', benefit: 'Évolutivité sans limites' },
            { label: 'Pas d\'automatisation du marketing', value: 'marketing', benefit: 'Marketing automatisé par l\'IA' },
          ],
          '5': [
            { label: 'Absences fréquentes réduisant les revenus', value: 'noShows', benefit: 'Réduction drastique des absences' },
            { label: 'Agenda désorganisé et manuel', value: 'messySchedule', benefit: 'Agenda intelligent automatisé' },
            { label: 'Clients qui ne reviennent pas', value: 'lowRetention', benefit: 'Fidélisation avec un CRM intelligent' },
            { label: 'Spécialistes sous-occupés', value: 'lowOccupancy', benefit: 'Occupation maximale de l\'agenda' },
            { label: 'Pas de rappels automatiques', value: 'noReminders', benefit: 'Rappels multicanaux' },
            { label: 'Mauvaise gestion des stocks de produits', value: 'inventory', benefit: 'Inventaire synchronisé' },
          ],
          '6': [
            { label: 'Décrochage scolaire non détecté à temps', value: 'dropout', benefit: 'Détection précoce du décrochage' },
            { label: 'Charge administrative excessive pour le personnel', value: 'adminLoad', benefit: 'Automatisation administrative' },
            { label: 'Mauvaise communication avec les parents', value: 'communication', benefit: 'Communication instantanée avec les parents' },
            { label: 'Manque de personnalisation de l\'apprentissage', value: 'noPersonalization', benefit: 'Apprentissage personnalisé par l\'IA' },
            { label: 'Faible sécurité des données académiques', value: 'dataSecurity', benefit: 'Sécurité des données de premier plan' },
            { label: 'Rapports académiques manuels et lents', value: 'manualReports', benefit: 'Rapports automatisés en direct' },
          ],
        }
      },
      about: {
        title: 'À Propos',
        motto: 'Votre entreprise mérite un développeur qui la traite comme la sienne',
        description_1: 'Développeur full-stack spécialisé dans les technologies web modernes et les solutions basées sur l\'IA. Je ne fais pas que coder — je crée des expériences numériques qui génèrent de vrais résultats pour votre entreprise.',
        description_2: 'Au-delà du code, je suis un architecte numérique obsédé par la précision. Mon voyage a commencé par le désir de construire des systèmes vivants.',
        description_3: 'Je combine la rigueur technique avec l\'œil d\'un artiste, m\'assurant que chaque pixel a un but et que chaque fonction s\'exécute avec une efficacité élégante.',
        performance_quote: 'La performance est le luxe ultime.',
        stats: [
          { label: "15+ Projets", subtitle: "Livrés" },
          { label: "100%", subtitle: "Satisfaction Client" },
          { label: "<24h", subtitle: "Temps de Réponse" }
        ],
        kpis: [
          { label: 'ROI Moyen', val: '340%' },
          { label: 'Satisfaction', val: '100%' },
          { label: 'Projets Livrés', val: '15+' },
          { label: 'Temps de Réponse', val: '<24h' }
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
        subtitle: 'Parlez-moi de votre projet et je vous donnerai un devis honnête sous 24 heures. Sans engagement.',
        name_label: 'Votre Nom',
        name_placeholder: 'Ex: Jean Dupont',
        email_label: 'Votre Email',
        email_placeholder: 'jean@votreentreprise.com',
        project_label: 'De quoi avez-vous besoin ?',
        project_placeholder: 'Parlez-moi de votre projet : type d\'entreprise, fonctionnalités, calendrier...',
        cta: 'Demander Consultation Gratuite',
        response_time: 'Réponse garantie sous 24 heures'
      },
      clients: {
        badge: 'HISTOIRES DE SUCCÈS',
        title: 'Clients Vedettes',
        subtitle: 'Des entreprises de différents secteurs qui font confiance aux solutions web y d\'intelligence artificielle pour mener leur marché numérique.',
        visit: 'Visiter',
        testimonials: {
          '1': 'Ma présence en ligne et mes consultations ont augmenté de 90% au cours des 3 premiers mois. Leur travail est exceptionnel.',
          '2': 'Professionnalisme et qualité dans les moindres détails. Mon site web a dépassé toutes les attentes.',
          '3': 'Le meilleur investissement que nous ayons fait pour notre clinique. Les résultats parlent d\'eux-mêmes.',
          '4': 'Rapide, efficace et avec un design qui séduit. Entièrement recommandé.',
          '5': 'Professionnel, rapide et avec des résultats tangibles. Mon site web est désormais plus rapide, sécurisé et professionnel.',
          '6': 'A transformé ma présence numérique du tout au tout. Les consultations ont augmenté de manière significative.',
          '7': 'Un travail impeccable. A compris exactement nos besoins et les a réalisés à la perfection.',
          '8': 'Excellente expérience du début à la fin. Le support après-lancement est incomparable.',
          '9': 'Mon site est désormais mon meilleur outil de marketing numérique, générant des patients 24/7.',
          '10': 'Qualité supérieure, livraison dans les délais et résultats mesurables. On ne pouvait pas demander mieux.',
          '11': 'Le système a optimisé le flux de nos patients. L\'investissement a été récupéré dès le premier mois.',
          '12': 'Nos ventes en ligne ont triplé après le lancement. Des résultats incroyables.',
          '13': 'Magnifique design qui reflète parfaitement notre marque. Les clients adorent l\'expérience.',
          '14': 'A optimisé nos opérations de 40%. Leur réponse est immédiate et le support est incomparable.',
          '15': 'Solution robuste et fiable qui a propulsé notre entreprise au niveau supérieur.',
          '16': 'Mes ventes ont augmenté considérablement au cours des 3 derniers mois, grâce au site web.',
        }
      },
      whyChoose: {
        title: 'Pourquoi Me Choisir',
        subtitle: 'Je ne livre pas seulement des projets — je livre des résultats.',
        reason1: {
          title: 'Réponse en <24 heures',
          desc: 'Pas de semaines d\'attente. Je réponds vite car votre temps est de l\'argent.',
        },
        reason2: {
          title: '100% Personnalisé',
          desc: 'Pas de modèles génériques. Chaque projet est unique et conçu pour vos objectifs.',
        },
        reason3: {
          title: 'Support Post-Lancement',
          desc: 'Je ne vous laisse pas après la livraison. Je suis là quand vous avez besoin de moi.',
        },
        reason4: {
          title: 'Prix Transparents',
          desc: 'Pas de surprises ni de coûts cachés. Vous savez exactement pour quoi vous payez.',
        },
      },
      contactForm: {
        diagnoseTitle: "Concevons l'architecture numérique de votre entreprise",
        mainSubtitle: "Définissez vos objectifs stratégiques, identifiez vos défis techniques clés et obtenez une proposition d'architecture logicielle détaillée en moins de 24 heures.",
        howContact: "Comment préférez-vous être contacté ?",
        projectTypeLabel: "Type de Projet *",
        specifyType: "Spécifiez le type de projet",
        currentWeb: "Site Web Actuel (si applicable)",
        mainProblemLabel: "Problème ou Besoin Principal *",
        fallbackResponse: "Nous avons reçu vos informations. Je vous contacterai dans moins de 2 heures avec une analyse personnalisée.",
        contactVia: "Contact via",
        project: "Projet",
        type: "Type",
        mainProblemReview: "Problème principal",
        webReview: "Site web actuel",
        challengesToSolve: "Défis à résoudre",
        successVisionReview: "Vision de Succès",
        horizonReview: "Horizon",
        deadlineReview: "Délai",
        privacyTitle: "Confidentialité Garantie",
        privacyDesc: "Toutes les informations sont protégées. Nous ne partagerons jamais vos données ou vos idées.",
        successDescText: "J'ai reçu toutes les informations de votre projet. Je vais effectuer une analyse technique et vous contacter dans moins de 24 heures.",
        questions: {
          industry: "Secteur ou Activité",
          pages: "Pages Estimées",
          hasBlog: "Avez-vous besoin d'un blog ou d'actualités ?",
          languages: "Langues Requises",
          appType: "Type d'Application",
          users: "Utilisateurs Estimés",
          hasRoles: "Nécessite-t-il des rôles d'utilisateur ?",
          integrations: "Intégrations Requises",
          platform: "Plateforme Principale",
          mainFunction: "Fonctionnalité Principale",
          audience: "Public Cible",
          aiProblem: "Problème à résoudre avec l'IA",
          dataSources: "Sources de Données Disponibles",
          aiModel: "Avez-vous un modèle d'IA ou faut-il le créer ?",
          otherDesc: "Description Brève",
          inspiration: "Qu'est-ce qui vous a inspiré à développer cela ?",
          techPref: "Technologies Préférées"
        },
        placeholders: {
          industry: "Technologie, Santé, Restaurants...",
          appType: "CRM, ERP, Panneau d'administration...",
          integrations: "Passerelles de paiement, API externes, WhatsApp...",
          mainFunction: "Chat, Géolocalisation, Paiements, Réseau social...",
          audience: "Décrivez brièvement votre utilisateur idéal",
          aiProblem: "Service client, Analyse de données, Automatisation de tâches...",
          dataSources: "PDFs, Bases de données, API, documents physiques...",
          otherDesc: "Décrivez brièvement votre idée de projet",
          inspiration: "Dites-nous ce qui vous motive",
          techPref: "Next.js, Firebase, Python, React Native...",
          specifyType: "Ex: Système ERP personnalisé...",
          fullName: "Ex: Jean Dupont",
          company: "Nom de votre entreprise (optionnel)"
        },
        options: {
          page1: "1 (One Page)",
          yes: "Oui",
          no: "Non",
          later: "Plus tard",
          lang1: "Espagnol Uniquement",
          lang2: "Espagnol + Anglais",
          lang3: "Multilingue (3+)",
          roles1: "Oui, plusieurs rôles",
          roles2: "Admin uniquement",
          roles3: "Non nécessaire",
          both: "Les deux (Cross-platform)",
          aimodel1: "Créer à partir de zéro",
          aimodel2: "Utiliser une API existante (GPT, Claude)"
        },
        pains: {
          landing: {
            1: "Mon site actuel semble obsolète",
            4: "Il ne génère pas de leads ni de demandes",
            5: "Je ne peux pas mettre à jour le contenu moi-même"
          },
          dashboard: {
            5: "Difficulté à faire évoluer les opérations"
          },
          mobile: {
            1: "Mon entreprise doit être dans la poche du client",
            2: "Processus nécessitant de la mobilité",
            3: "Les concurrents ont une application et pas moi",
            4: "Notifications push pour l'engagement",
            5: "Je veux monétiser via une application",
            6: "Intégrer avec le matériel de l'appareil"
          },
          ai: {
            2: "Processus répétitifs qui volent du temps",
            3: "Données non analysées et inutilisées",
            4: "Prise de décision sans sauvegarde de données",
            6: "J'ai besoin d'un agent virtuel pour mon site"
          },
          other: {
            1: "J'ai une idée innovante",
            2: "J'ai d'abord besoin de conseils techniques",
            3: "Je veux migrer une plateforme existante",
            4: "Recherche d'un partenaire technique pour ma startup",
            5: "J'ai besoin de maintenance pour un système",
            6: "Projet avec budget gouvernemental"
          }
        },
        benefits: {
          landing: {
            1: "Image professionnelle renouvelée",
            4: "Génération de leads constante",
            5: "Panneau autogérable"
          },
          dashboard: {
            5: "Évolutivité opérationnelle"
          },
          mobile: {
            1: "Présence mobile directe",
            2: "Opérations depuis n'importe où",
            3: "Avantage concurrentiel",
            4: "Engagement avec notifications",
            5: "Nouveau canal de revenus",
            6: "Fonctionnalités natives de l'appareil"
          },
          ai: {
            2: "Automatisation intelligente",
            3: "Insights exploitables à partir des données",
            4: "Décisions soutenues par l'IA",
            6: "Agent IA personnalisé"
          },
          other: {
            1: "Validation et développement de votre idée",
            2: "Consultation d'expert sans engagement",
            3: "Migration sécurisée et optimisée",
            4: "Partenaire technique stratégique",
            5: "Maintenance et support continus",
            6: "Gestion de projets institutionnels"
          }
        },
        features: {
          0: "Design réactif premium",
          1: "Panneau d'administration autonome",
          2: "Passerelle de paiement en ligne",
          3: "Authentification des utilisateurs / Rôles",
          4: "Intégration d'Agent IA",
          5: "Optimisation SEO avancée",
          6: "Tableau de bord analytique",
          7: "Base de données en temps réel",
          8: "Notifications Push / WhatsApp",
          9: "API pour intégration externe"
        },
        budgets: {
          0: "Moins de 500 $"
        },
        deadlines: {
          1: "1 à 2 semaines",
          2: "Un mois",
          5: "Pas pressé (Flexible)"
        },
        errors: {
          projectType: "Sélectionnez un type de projet",
          mainProblem: "Décrivez votre problème ou besoin"
        }
      },
    },
  },
  zh: {
    translation: {
      nav: {
        stack: '技術',
        services: '服務',
        projects: '專案',
        about: '關於我',
        contact: '聯繫我',
        selectLanguage: '選擇語言',
      },
      hero: {
        badge: '可承接新專案',
        title: '用智慧科技保障您企業的未來',
        subtitle: '我部署現代化的網路基礎設施與自動化系統，釋放您的時間並加速您的生產力。',
        cta: '免費報價',
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
            description: "您的網站必須產生客戶，而不僅僅是存在。我設計將訪客轉化為銷售的網站，以高端設計從第一秒就傳達信任。",
            features: [
              "傳達奢華和專業的設計",
              "2秒內加載（Google獎勵速度）",
              "在Google搜索您的服務時可見",
              "在手機和電腦上完美運作"
            ]
          },
          {
            title: "應用程序開發",
            description: "我構建直觀、高性能的移動和網頁應用程序，將您的業務直接帶到iOS、Android和Web上客戶的口袋裡。",
            features: [
              "隨時隨地接觸您的客戶",
              "如此美麗的界面讓用戶愛不釋手",
              "隨業務增長的強大功能",
              "成功發布和簡化管理"
            ]
          },
          {
            title: "人工智慧",
            description: "我將AI整合到您的系統中，讓您的業務做出更明智的決策，節省寶貴的時間，並在您睡覺時自動增加銷售額。",
            features: [
              "全天候智能客戶支持，永不休息",
              "像人類一樣理解和回應的系統",
              "更智能的數據驅動決策",
              "自動化重複任務，每週節省10+小時"
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
        view_case: '免費諮詢',
        key_benefits: '核心優勢',
        urgency: {
          spots: '僅剩 {{count}} 個名額！',
          audit: '本週免費審計。',
        },
        items: [
          {
            title: '醫療 AI 病歷',
            description: '適用於多種專科的綜合醫療記錄系統。包括實時同步、交互式 3D 解剖可視化和動態 PDF 報告生成、預約安排、計費、用於診斷和治療的 AI 集成。',
            features: [
              '提高诊疗效率高达 40%',
              '利用 AI 提高诊断准确性',
              '减少病历管理错误',
              '通过安全访问门户留住患者',
              '自动生成报告和处方'
            ]
          },
          {
            title: 'POS AI 商店',
            description: '基於雲端的銷售點，專為希望實時控制庫存、卡片管理、銷售報告和實施 AI 以優化銷售的商店而設計。',
            features: [
              '消除因库存错误造成的损失',
              '通过智能库存建议最大化销售额',
              '随时随地访问财务报告',
              '简化计费和结账流程',
              '分支机构之间即时同步'
            ]
          },
          {
            title: '客戶關係管理系統 (CRM)',
            description: '用於用戶控制、線索追蹤和商業提案自動化的統一平台。包括一個具有玻璃形態設計的互動式高級客戶門戶。',
            features: [
              '透過自動化追蹤漏斗優化銷售轉換率。',
              '透過工作流和集中式歷史記錄縮短響應時間。',
              '透過互動式的專案狀態與支援門戶提高用戶留存率。',
              '即時全面控制銷售團隊的指標與業績表現。',
              '從首次接觸到合約簽署的高效提案管理。'
            ]
          },
          {
            title: 'Eve Commerce',
            description: '先進的電子商務平台，專注於高端時尚，提供流暢優雅的購物體驗。',
            features: [
              '提高移动设备的转化率',
              '通过优化结账减少购物车流失',
              '通过世界一流的设计定位品牌',
              '超快速加载以提高 SEO 和留存率',
              '针对高需求活动的全面扩展性'
            ]
          },
          {
            title: 'Beauty Agenda SaaS',
            description: '適用於美容院、理髮店和水療中心的智能日程系統。包括在線預訂、通過 WhatsApp 自動提醒、客戶 CRM 和集成 AI 助手。',
            features: [
              '通过自动提醒消除未到场情况',
              '通过 24/7 智能日程节省工作时间',
              '通过集成 CRM 增加到店频率',
              '优化专家的日程占用率',
              '通过 AI 提供即时客户服务'
            ]
          },
          {
            title: 'ScholarAI Nexus',
            description: '用於學校綜合管理的智能教育平台。利用 AI 監測學業成績、早期發現輟學和個性化輔導。',
            features: [
              '早期检测学生流失风险',
              '减轻教师的行政负担',
              '改善家长与学校的沟通',
              '为每位学生量身定制学习方案',
              '学术和个人数据的绝对安全'
            ]
          }
        ]
      },
      projectModal: {
        title: '技術架構評估',
        subtitle: '高級定制與技術諮詢',
        success_title: '診斷完成！',
        success_desc: '我們已收到您關於 {{project}} 的所有業務詳情。我們的團隊將分析您的案例並與您聯繫，提供個性化方案。',
        ai_analysis: 'AI 分析',
        close: '關閉',
        cancel: '取消',
        talk_advisor: '與 Joseph Espinoza 聯絡',
        previous: '上一步',
        next: '下一步',
        submitting: '分析中...',
        submit: '發送診斷',
        contact_title: '您的聯絡信息',
        contact_subtitle: '以便向您發送個性化診斷和方案',
        name_label: '姓名全稱 *',
        email_label: '電子郵件地址 *',
        phone_label: '電話 / WhatsApp',
        company_label: '公司 / 企業',
        required_error: '必填項',
        invalid_email: '無效的電子郵件',
        profile_title: '您的業務概況',
        profile_subtitle: '告訴我們更多關於您目前運營的信息',
        pain_title: '您的主要挑戰是什麼？',
        features_title: '您最感興趣的功能',
        goals_title: '目標與時間表',
        goals_subtitle: '幫助我們了解您的願景，以便為您提供最佳方案',
        success_vision_label: '您想像中理想的結果是怎樣的？',
        success_vision_placeholder: '描述您希望您的業務如何在此解決方案下運行...',
        timeline_label: '您想什麼時候開始？',
        timeline_placeholder: '選擇一個選項',
        budget_label: '預算估算',
        budget_placeholder: '選擇一個範圍',
        references_label: '參考或靈感',
        references_placeholder: '是否有您喜歡的網站或平台作為參考？（可選）',
        review_title: '最終審查',
        review_subtitle: '發送前請確認所有信息正確無誤',
        review_terms: '發送即代表您同意我們與您聯繫以跟進您的請求。',
        step_contact: '聯絡',
        step_profile: '概況',
        step_goals: '目標',
        step_review: '審查',
        timeline_options: {
          immediate: '立即（本週）',
          month: '本月',
          months_1_3: '1-3 個月內',
          months_3_6: '3-6 個月內',
          exploring: '只是了解一下'
        },
        budget_options: {
          undisclosed: '不便透露',
          range_1: '1,000 - 5,000 美元',
          range_2: '5,000 - 15,000 美元',
          range_3: '15,000 - 50,000 美元',
          range_4: '50,000 美元以上'
        },
        questions: {
          '1': [
            { label: '醫療專科', name: 'specialty', type: 'text', placeholder: '兒科、心臟科、全科醫學...' },
            { label: '每日接診量', name: 'dailyPatients', type: 'select', options: ['少於 10 人', '10-30 人', '31-60 人', '60 人以上'] },
            { label: '現有系統', name: 'currentSystem', type: 'text', placeholder: '您使用紙張、Excel 還是某種軟件？' },
            { label: '運營地點 / 國家', name: 'location', type: 'text', placeholder: '您運營的國家或城市' },
          ],
          '2': [
            { label: '零售類型', name: 'storeType', type: 'text', placeholder: '服裝、鞋類、電子產品、雜貨...' },
            { label: '分店數量', name: 'branches', type: 'select', options: ['1 家（單店）', '2-5 家', '6-10 家', '10 家以上'] },
            { label: '估算月銷售額', name: 'revenue', type: 'select', options: ['5,000 美元以下/月', '5,000 - 20,000 美元', '20,000 - 50,000 美元', '50,000 美元以上'] },
            { label: '大約庫存量 (SKUs)', name: 'skuCount', type: 'select', options: ['少於 100', '100-500', '501-2000', '2000 以上'] },
          ],
          '3': [
            { label: '住宿類型', name: 'hotelType', type: 'select', options: ['精品酒店', '度假村', '青年旅舍', '連鎖酒店'] },
            { label: '客房數量', name: 'rooms', type: 'select', options: ['1-20 間', '21-50 間', '51-100 間', '100 間以上'] },
            { label: '目前平均入住率', name: 'occupancy', type: 'select', options: ['30% 以下', '30-50%', '51-70%', '70% 以上'] },
            { label: '您有前台團隊嗎？', name: 'hasStaff', type: 'select', options: ['有，完整團隊', '有，配備最少', '沒有，我是獨立運營'] },
          ],
          '4': [
            { label: '市場細分', name: 'niche', type: 'text', placeholder: '珠寶、設計師服裝、家具...' },
            { label: '主要銷售渠道', name: 'channel', type: 'select', options: ['Instagram / 社交媒體', '亞馬遜', '實體店', '目前還沒有'] },
            { label: '目前月收入', name: 'income', type: 'select', options: ['尚未銷售', '1,000 美元以下', '1,000 - 10,000 美元', '10,000 美元以上'] },
            { label: '您以前有過網店嗎？', name: 'previousEcom', type: 'select', options: ['從未', '有，但沒有效果', '有，目前活躍'] },
          ],
          '5': [
            { label: '業務類型', name: 'beautyType', type: 'select', options: ['美容院', '水療中心', '理髮店', '美容診所'] },
            { label: '專家 / 員工', name: 'staff', type: 'select', options: ['1 人（獨立）', '2-5 人', '6-15 人', '15 人以上'] },
            { label: '每週客戶量', name: 'weeklyClients', type: 'select', options: ['20 人以下', '20-50 人', '51-100 人', '100 人以上'] },
            { label: '您如何管理預約', name: 'bookingMethod', type: 'select', options: ['手動（紙質日程本）', 'WhatsApp / 電話', '谷歌日曆', '基礎軟件'] },
          ],
          '6': [
            { label: '機構類型', name: 'schoolType', type: 'select', options: ['學校 / 培訓機構', '大學', '技術學院', '在線學院'] },
            { label: '學生總數', name: 'students', type: 'select', options: ['1-100 人', '101-500 人', '501-2000 人', '2000 人以上'] },
            { label: '主要教育水平', name: 'level', type: 'select', options: ['小學 / 中學', '本科', '研究生', '混合'] },
            { label: '年退學率', name: 'dropoutRate', type: 'select', options: ['5% 以下', '5-10%', '10-20%', '20% 以上', '不知道'] },
          ],
        },
        painPoints: {
          '1': [
            { label: '過多的行政文書工作', value: 'paperwork', benefit: '減少文書工作' },
            { label: '病歷丟失或混亂', value: 'lostRecords', benefit: '病歷隨時可查' },
            { label: '缺乏數據支持的診斷', value: 'noDataDiagnosis', benefit: '利用 AI 提高精確度' },
            { label: '患者工作流程緩慢', value: 'slowProcess', benefit: '高效的患者流動' },
            { label: '缺乏遠程數據訪問', value: 'noRemote', benefit: '隨時隨地訪問' },
            { label: '不符合法規要求', value: 'compliance', benefit: '確保合規' },
          ],
          '2': [
            { label: '庫存未實時更新', value: 'stockSync', benefit: '庫存隨時保持最新' },
            { label: '因損耗或盜竊造成的損失', value: 'shrinkage', benefit: '損失控制' },
            { label: '缺乏清晰的財務報告', value: 'noReports', benefit: '自動生成財務報告' },
            { label: '分店庫存不同步', value: 'branchSync', benefit: '多店同步' },
            { label: '結賬流程緩慢', value: 'slowCheckout', benefit: '快速安全付款' },
            { label: '缺乏高效的供應商管理', value: 'suppliers', benefit: '整合供應商管理' },
          ],
          '3': [
            { label: '常規入住率低', value: 'lowOccupancy', benefit: '最大化入住率' },
            { label: '每月運營成本高', value: 'highCosts', benefit: '降低運營成本' },
            { label: '沒有自動化的賓客門戶', value: 'noGuestPortal', benefit: '智能賓客門戶' },
            { label: '沒有實時損益表', value: 'noPnl', benefit: '損益表實時更新' },
            { label: '維護流程效率低下', value: 'maintenance', benefit: '自動化維護' },
            { label: '與 OTAs / 渠道整合差', value: 'otaIntegration', benefit: '全面整合 OTA' },
          ],
          '4': [
            { label: '購物車流失率高', value: 'cartAbandon', benefit: '購物車挽回' },
            { label: '移動端轉化率低', value: 'mobileConversion', benefit: '優化移動端轉化' },
            { label: '品牌缺乏數字差異化', value: 'branding', benefit: '高端品牌形象' },
            { label: '加載速度非常慢', value: 'speed', benefit: '超快加載性能' },
            { label: '難以擴大銷售規模', value: 'scalability', benefit: '無限擴展能力' },
            { label: '沒有營銷自動化', value: 'marketing', benefit: 'AI 自動化營銷' },
          ],
          '5': [
            { label: '頻繁未到場減少收入', value: 'noShows', benefit: '大幅減少未到場' },
            { label: '日程混亂且手動管理', value: 'messySchedule', benefit: '自動化智能日程' },
            { label: '客戶不再回頭', value: 'lowRetention', benefit: '智能 CRM 客戶留存' },
            { label: '專家日程佔用率低', value: 'lowOccupancy', benefit: '最大化日程佔用' },
            { label: '沒有自動提醒', value: 'noReminders', benefit: '多渠道自動提醒' },
            { label: '產品庫存管理不善', value: 'inventory', benefit: '庫存同步' },
          ],
          '6': [
            { label: '學生流失未能及時發現', value: 'dropout', benefit: '退學早期檢測' },
            { label: '員工行政負擔過重', value: 'adminLoad', benefit: '行政流程自動化' },
            { label: '與家長溝通不暢', value: 'communication', benefit: '與家長即時溝通' },
            { label: '缺乏個性化學習', value: 'noPersonalization', benefit: 'AI 個性化學習' },
            { label: '學術數據安全度低', value: 'dataSecurity', benefit: '頂級數據安全' },
            { label: '學術報告手動且緩慢', value: 'manualReports', benefit: '實時自動報告' },
          ],
        }
      },
      about: {
        title: '關於我',
        motto: '您的企業值得一個像對待自己一樣的開發者',
        description_1: '專注於現代網頁技術和AI解決方案的全棧開發者。我不僅僅寫代碼——我構建為您的業務產生實際成果的數位體驗。',
        description_2: '除了代碼，我還是一位癡迷於精確度的數位建築師。我的旅程始於構建有生命感的系統。',
        description_3: '我將技術嚴謹與藝術眼光結合，確保每個像素都有其目的，每個功能都以優雅的高效率運行。',
        performance_quote: '性能是最終的奢華。',
        stats: [
          { label: "15+ 專案", subtitle: "已交付" },
          { label: "100%", subtitle: "客戶滿意度" },
          { label: "<2h", subtitle: "回應時間" }
        ],
        kpis: [
          { label: '平均ROI', val: '340%' },
          { label: '客戶滿意度', val: '100%' },
          { label: '已交付項目', val: '15+' },
          { label: '回應時間', val: '<2h' }
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
        subtitle: '告訴我您的項目，我會在24小時內給您一個誠實的報價。無任何義務。',
        name_label: '您的姓名',
        name_placeholder: '例如：王小明',
        email_label: '您的電子郵件',
        email_placeholder: 'xiaoming@yourcompany.com',
        project_label: '您需要什麼？',
        project_placeholder: '告訴我您的項目：業務類型、所需功能、預計時間表...',
        cta: '免費諮詢',
        response_time: '24小時內 guaranteed 回覆'
      },
      clients: {
        badge: '成功案例',
        title: '精選客戶',
        subtitle: '來自不同行業的企業信任網頁和人工智慧解決方案，以領先數位市場。',
        visit: '訪問',
        testimonials: {
          '1': '在最初的3個月裡，我的線上曝光率和諮詢量增加了90%。他們的工作非常出色。',
          '2': '每個細節都體現了專業和品質。我的網站超出了所有預期。',
          '3': '這是我們為診所做的最好投資。結果不言而喻。',
          '4': '快速、高效，且設計令人一見傾心。完全推薦。',
          '5': '專業、快速且成效顯著。我的網站現在更快、更安全、更專業。',
          '6': '徹底改變了我的數位形象。諮詢量顯著增加。',
          '7': '無懈可擊的工作。完全理解我們的需求並完美交付。',
          '8': '從頭到尾的極佳體驗。上線後的支援是無與倫比的。',
          '9': '我的網頁現在是我最好的數位行銷工具，24/7 全天候吸引患者。',
          '10': '品質優質、交付及時、成效顯著。無可挑剔。',
          '11': '該系統優化了我們的患者流程。投資在第一個月就收回了。',
          '12': '上線後，我們的線上銷售額翻了三倍。不可思議的成果。',
          '13': '精美的設計完美體現了我們的品牌。客戶非常喜歡這種體驗。',
          '14': '使我們的運營優化了40%。他們的回應迅速，支援無與倫比。',
          '15': '強大且可靠的解決方案，將我們的業務提升到新的水平。',
          '16': '多虧了那個網站，我的銷售額在過去三個月大幅成長。'
        }
      },
      whyChoose: {
        title: '為什麼選擇我',
        subtitle: '我不僅交付項目——我交付成果。',
        reason1: {
          title: '2小時內回覆',
          desc: '不用等幾週。我快速回應，因為您的時間就是金錢。',
        },
        reason2: {
          title: '100%客製化',
          desc: '沒有通用模板。每個項目都是獨特的，為您的特定目標而設計。',
        },
        reason3: {
          title: '上線後支持',
          desc: '交付後我不會拋下您。需要我的時候我就在。',
        },
        reason4: {
          title: '透明定價',
          desc: '沒有驚喜或隱藏費用。您確切知道為什麼付費。',
        },
      },
      contactForm: {
        diagnoseTitle: "規劃您企業的數位架構方案",
        mainSubtitle: "明確您的戰略目標、識別核心技術挑戰，並在 24 小時內獲取專屬的軟體架構方案。",
        howContact: "您希望我們如何與您聯繫？",
        projectTypeLabel: "專案類型 *",
        specifyType: "指定專案類型",
        currentWeb: "當前網站（若適用）",
        mainProblemLabel: "主要問題或需求 *",
        fallbackResponse: "我們已收到您的資訊。我將在 2 小時內與您聯繫並提供客製化分析。",
        contactVia: "聯繫方式",
        project: "專案",
        type: "類型",
        mainProblemReview: "主要問題",
        webReview: "當前網站",
        challengesToSolve: "待解決的挑戰",
        successVisionReview: "成功願景",
        horizonReview: "時間規劃",
        deadlineReview: "期限",
        privacyTitle: "隱私保證",
        privacyDesc: "所有資訊皆受到保護。我們絕不會分享您的數據或創意。",
        successDescText: "我已收到您專案的所有資訊。我將進行技術分析並在 24 小時內與您聯繫。",
        questions: {
          industry: "行業或領域",
          pages: "預估頁數",
          hasBlog: "您是否需要部落格或新聞板塊？",
          languages: "所需語言",
          appType: "應用程式類型",
          users: "預估用戶數",
          hasRoles: "是否需要用戶角色？",
          integrations: "所需整合功能",
          platform: "主要平台",
          mainFunction: "主要功能",
          audience: "目標受眾",
          aiProblem: "用 AI 解決的問題",
          dataSources: "可用數據源",
          aiModel: "您是否有 AI 模型或需要全新建立？",
          otherDesc: "簡要描述",
          inspiration: "是什麼啟發您開發這個專案？",
          techPref: "偏好的技術"
        },
        placeholders: {
          industry: "科技、醫療、餐飲...",
          appType: "CRM、ERP、管理後台...",
          integrations: "支付金流、外部 API、WhatsApp...",
          mainFunction: "聊天、地理定位、付款、社群網路...",
          audience: "簡要描述您的理想用戶",
          aiProblem: "客戶服務、數據分析、任務自動化...",
          dataSources: "PDF、資料庫、API、紙本文件...",
          otherDesc: "簡要描述您的專案想法",
          inspiration: "告訴我們您的動力來源",
          techPref: "Next.js, Firebase, Python, React Native...",
          specifyType: "例如：客製化 ERP 系統...",
          fullName: "例如：王小明",
          company: "您的公司名稱（選填）"
        },
        options: {
          page1: "1 (單頁網站)",
          yes: "是",
          no: "否",
          later: "稍後再說",
          lang1: "僅限西班牙文",
          lang2: "西班牙文 + 英文",
          lang3: "多語言 (3+)",
          roles1: "是，多個角色",
          roles2: "僅限管理員",
          roles3: "不需要",
          both: "雙平台 (跨平台)",
          aimodel1: "從頭開始創建",
          aimodel2: "使用現有 API (GPT, Claude)"
        },
        pains: {
          landing: {
            1: "我目前的網站看起來很舊",
            4: "它無法產生詢問或名單",
            5: "我無法自己更新內容"
          },
          dashboard: {
            5: "運營難以擴展"
          },
          mobile: {
            1: "我的業務需要進入客人的口袋",
            2: "需要移動性的業務流程",
            3: "競爭對手有 App 而我沒有",
            4: "用於提升互動的推播通知",
            5: "我想透過 App 盈利",
            6: "整合裝置的硬體功能"
          },
          ai: {
            2: "重複性的流程浪費時間",
            3: "數據未經分析且未被利用",
            4: "決策缺乏數據支持",
            6: "我的網站需要虛擬助理"
          },
          other: {
            1: "我有一個創新的點子",
            2: "我需要先獲得技術諮詢",
            3: "我想遷移現有平台",
            4: "為初創公司尋找技術合作夥伴",
            5: "我需要系統維護服務",
            6: "政府預算專案"
          }
        },
        benefits: {
          landing: {
            1: "全新的專業形象",
            4: "持續的名單產生",
            5: "自主管理後台"
          },
          dashboard: {
            5: "運營可擴展性"
          },
          mobile: {
            1: "直接的手機曝光",
            2: "隨時隨地進行運營",
            3: "競爭優勢",
            4: "透過通知進行互動",
            5: "新的收入管道",
            6: "原生裝置功能"
          },
          ai: {
            2: "智慧自動化",
            3: "從數據中獲得可行洞察",
            4: "AI 支持的決策",
            6: "專屬 AI 助理"
          },
          other: {
            1: "驗證並開發您的點子",
            2: "無義務的專家諮詢",
            3: "安全且優化的遷移",
            4: "策略性技術夥伴",
            5: "持續的維護與支援",
            6: "機構專案管理"
          }
        },
        features: {
          0: "頂級響應式設計",
          1: "自主管理後台",
          2: "線上付款金流",
          3: "用戶身分驗證 / 角色",
          4: "AI 助理整合",
          5: "進階 SEO 優化",
          6: "分析儀表板",
          7: "即時資料庫",
          8: "推播 / WhatsApp 通知",
          9: "外部整合 API"
        },
        budgets: {
          0: "低於 $500"
        },
        deadlines: {
          1: "1 到 2 週",
          2: "一個月",
          5: "不急 (彈性)"
        },
        errors: {
          projectType: "請選擇專案類型",
          mainProblem: "請描述您的問題或需求"
        }
      },
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
