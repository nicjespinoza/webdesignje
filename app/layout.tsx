// ============================================================
// Layout Raíz — Portafolio Joseph Espinoza
// Layout minimalista sin AuthProvider ni HeaderNav para compatibilidad
// con el portafolio clonado que maneja su propia navegación
// ============================================================

import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const SITE_URL = "https://webdesignje.com";
const AUTHOR_NAME = "Joseph Espinoza";
const AUTHOR_TITLE = "Full-Stack Developer & AI Engineer";
const AUTHOR_DESCRIPTION = "Desarrollador Full-Stack especializado en Next.js, React, TypeScript, Node.js, Python, Django, FastAPI, Tailwind, shadcn/ui, Docker, Kubernetes, PostgreSQL, MongoDB, Firebase, Supabase, AWS, Vercel, e Inteligencia Artificial. +13 proyectos entregados globalmente.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  
  // SEO Básico
  title: {
    default: "Joseph Espinoza | Full-Stack Developer & AI Engineer Nicaragua",
    template: `%s | Joseph Espinoza`
  },
  description: AUTHOR_DESCRIPTION,
  
  // Keywords estratégicas para posicionar
  keywords: [
    "Desarrollador Full-Stack Nicaragua",
    "Full-Stack Developer",
    "AI Engineer",
    "Ingeniero de Inteligencia Artificial",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Python Developer",
    "Django",
    "FastAPI",
    "Tailwind CSS",
    "Desarrollo Web Nicaragua",
    "Desarrollador Web Managua",
    "SaaS Developer",
    "AI Solutions",
    "Machine Learning",
    "RAG Architecture",
    "OpenClaw",
    "Desarrollo de Software",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Database Architecture",
    "Cloud Computing",
    "AWS",
    "Firebase",
    "Supabase",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "DevOps",
    "API Development",
    "E-commerce",
    "SaaS Platform",
    "Medical Software",
    "POS System",
    "Hotel Management System",
    "Booking System",
    "CRM",
    "Chatbot AI",
    "Natural Language Processing",
    "Computer Vision",
    "3D Web",
    "React Three Fiber",
    "Three.js",
    "WebGL",
    "Performance Optimization",
    "SEO",
    "Progressive Web App",
    "PWA",
    "Mobile First",
    "Responsive Design",
    "UI/UX",
    "shadcn/ui",
    "Framer Motion",
    "Animation",
    "Vercel",
    "Deployment",
    "CI/CD",
    "Git",
    "Agile",
    "Scrum"
  ],
  
  // Autor
  authors: [
    {
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
  ],
  
  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "es_NI",
    url: SITE_URL,
    siteName: "Joseph Espinoza | Full-Stack & AI Engineer",
    title: "Joseph Espinoza | Full-Stack Developer & AI Engineer Nicaragua",
    description: AUTHOR_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Joseph Espinoza - Full-Stack Developer & AI Engineer",
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Joseph Espinoza | Full-Stack Developer & AI Engineer Nicaragua",
    description: AUTHOR_DESCRIPTION,
    images: [`${SITE_URL}/images/og-image.jpg`],
    creator: "@josephespinoza", // Cambiar por tu @real
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Canonical
  alternates: {
    canonical: SITE_URL,
  },
  
  // Verificación de webmasters
  verification: {
    google: "TU_GOOGLE_SEARCH_CONSOLE_CODE", // Agregar después de crear Search Console
    yandex: "TU_YANDEX_CODE",
  },
  
  // Íconos
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // Manifest para PWA
  manifest: `${SITE_URL}/manifest.json`,
  
  // Categoría
  category: "technology",
};

// Structured Data (JSON-LD) para Schema.org
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      url: SITE_URL,
      jobTitle: AUTHOR_TITLE,
      description: AUTHOR_DESCRIPTION,
      sameAs: [
        "https://github.com/josephespinoza", // Cambiar por tu GitHub real
        "https://linkedin.com/in/josephespinoza", // Cambiar por tu LinkedIn real
        "https://twitter.com/josephespinoza", // Cambiar por tu Twitter real
      ],
      alumniOf: "Universidad Nacional de Ingeniería", // Cambiar por tu universidad real
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "Django",
        "FastAPI",
        "Tailwind CSS",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
        "Supabase",
        "AWS",
        "Docker",
        "Kubernetes",
        "Artificial Intelligence",
        "Machine Learning",
        "RAG",
        "AI Agents",
        "Full-Stack Development",
        "Web Development",
        "Software Architecture",
        "DevOps",
        "CI/CD",
        "SEO",
        "Performance Optimization",
      ],
      award: "Award Winning Design Excellence",
      hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer",
        occupationLocation: {
          "@type": "Country",
          name: "Nicaragua",
        },
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          currency: "USD",
          name: "Competitive Market Rate",
        },
        skills: "Next.js, React, TypeScript, Node.js, Python, AI/ML",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "WebDesignJE",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 600,
        height: 600,
      },
      founder: {
        "@id": `${SITE_URL}/#person`,
      },
      description: "Desarrollo de software full-stack y soluciones de inteligencia artificial para negocios globales.",
      sameAs: [
        "https://github.com/josephespinoza",
        "https://linkedin.com/in/josephespinoza",
      ],
      areaServed: {
        "@type": "Country",
        name: "Nicaragua",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Joseph Espinoza | Full-Stack & AI Engineer",
      description: AUTHOR_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "es-NI",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Servicios de Desarrollo Full-Stack & IA",
      image: `${SITE_URL}/images/og-image.jpg`,
      description: "Desarrollo de aplicaciones web full-stack, SaaS, e-commerce, sistemas de gestión, e integración de inteligencia artificial.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NI",
        addressRegion: "Managua",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.1364,
        longitude: -86.2514,
      },
      url: SITE_URL,
      telephone: "+505-XXXX-XXXX", // Agregar tu teléfono real
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Nicaragua",
        },
        {
          "@type": "Country",
          name: "United States",
        },
        {
          "@type": "Country",
          name: "Canada",
        },
        {
          "@type": "Country",
          name: "Spain",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Desarrollo",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo de Landing Pages",
              description: "Landing pages optimizadas para conversión con Next.js y Tailwind CSS",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SaaS Completo",
              description: "Plataformas SaaS full-stack con arquitectura escalable",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-commerce",
              description: "Tiendas online con pasarelas de pago y gestión de inventario",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Integración de IA",
              description: "Agentes de IA, RAG, chatbots inteligentes y automatización",
            },
          },
        ],
      },
    },
  ],
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} ${playfair.variable} font-sans antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
