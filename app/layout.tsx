import { ThemeProvider } from "../context/ThemeContext";
import QueryProvider from "../context/QueryProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const SITE_URL = "https://webdesignje.com";
const AUTHOR_NAME = "Joseph Espinoza";
const AUTHOR_TITLE = "Full-Stack Developer & AI Engineer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Joseph Espinoza | Desarrollador Web & IA - Nicaragua",
    template: `%s | WebDesignJE - Soluciones Web con IA`
  },
  description:
    "Desarrollador Full-Stack en Nicaragua. Experto en Next.js, React, TypeScript, IA y Firebase. +13 proyectos entregados. Creación de páginas web, apps, e-commerce y sistemas con inteligencia artificial para negocios en Nicaragua, Centroamérica y USA.",
  keywords: [
    // Nicaragua
    "desarrollador web Nicaragua", "diseño de páginas web Nicaragua",
    "crear página web profesional Nicaragua", "desarrollador freelance Managua",
    "agencia de desarrollo web Managua", "precios de páginas web Nicaragua",
    "tienda online Nicaragua", "desarrollador Next.js Nicaragua",
    "integración de IA para negocios Nicaragua",
    // Centroamérica
    "desarrollador web Centroamérica", "diseño web profesional Guatemala",
    "desarrollador web Costa Rica", "páginas web para negocios El Salvador",
    "agencia digital Centroamérica",
    // USA / English
    "Full-Stack Developer", "Next.js Developer", "React Developer",
    "AI Integration Services", "Spanish Speaking Web Developer",
    "Bilingual Web Developer USA", "Custom Web Application Development",
    "Freelance Web Developer for Startups",
    // Tech
    "desarrollo de software", "desarrollo SaaS", "aplicaciones web con IA",
    "página web con inteligencia artificial",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_NI",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "WebDesignJE - Soluciones Web con IA",
    title: "Joseph Espinoza | Desarrollador Web & IA en Nicaragua",
    description:
      "Desarrollador Full-Stack en Nicaragua. Creación de páginas web, apps, e-commerce y sistemas con IA. Next.js, React, Firebase. +13 proyectos entregados en Nicaragua, Centroamérica y USA.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Joseph Espinoza - Full-Stack Developer & AI Engineer - Nicaragua",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Espinoza | Desarrollador Web & IA en Nicaragua",
    description:
      "Desarrollador Full-Stack especializado en web modernas e IA. +13 proyectos entregados. Nicaragua, Centroamérica y USA.",
    images: [`${SITE_URL}/images/og-image.jpg`],
    creator: "@josephespinoza",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  // Hreflang para multi-idioma
  alternates: {
    canonical: SITE_URL,
    languages: {
      'es': SITE_URL,
      'es-NI': SITE_URL,
      'en': `${SITE_URL}/en`,
      'en-US': `${SITE_URL}/en`,
    },
  },
};

// Structured Data: Person + Organization + LocalBusiness + Service
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: AUTHOR_NAME,
      jobTitle: AUTHOR_TITLE,
      url: SITE_URL,
      image: `${SITE_URL}/images/og-image.jpg`,
      sameAs: [
        "https://github.com/josephespinoza",
        "https://linkedin.com/in/josephespinoza",
        "https://webdesignje.com",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Firebase",
        "Artificial Intelligence",
        "Web Development",
        "Node.js",
        "Python",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Managua",
        addressRegion: "Managua",
        addressCountry: "NI",
      },
    },
    {
      "@type": "Organization",
      name: "WebDesignJE",
      url: SITE_URL,
      logo: `${SITE_URL}/images/og-image.jpg`,
      description: "Agencia de desarrollo web con IA en Nicaragua. Creamos páginas web, apps, e-commerce y sistemas inteligentes.",
      foundingDate: "2024",
      founder: {
        "@type": "Person",
        name: AUTHOR_NAME,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Managua",
        addressRegion: "Managua",
        addressCountry: "NI",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Spanish", "English"],
        areaServed: ["NI", "GT", "SV", "HN", "CR", "PA", "US"],
      },
    },
    {
      "@type": "LocalBusiness",
      name: "WebDesignJE",
      url: SITE_URL,
      image: `${SITE_URL}/images/og-image.jpg`,
      description: "Agencia de desarrollo web con inteligencia artificial. Especialistas en Next.js, React y Firebase.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Managua",
        addressRegion: "Managua",
        addressCountry: "NI",
      },
      priceRange: "$$",
      areaServed: ["Nicaragua", "Centroamérica", "Estados Unidos"],
      serviceType: [
        "Desarrollo Web",
        "Desarrollo de Aplicaciones",
        "Inteligencia Artificial",
        "E-commerce",
        "SaaS",
      ],
    },
    {
      "@type": "Service",
      name: "Desarrollo Web Profesional",
      provider: {
        "@type": "Person",
        name: AUTHOR_NAME,
      },
      areaServed: [
        { "@type": "Country", name: "Nicaragua" },
        { "@type": "Country", name: "Costa Rica" },
        { "@type": "Country", name: "Guatemala" },
        { "@type": "Country", name: "El Salvador" },
        { "@type": "Country", name: "Honduras" },
        { "@type": "Country", name: "United States" },
      ],
      description: "Creación de páginas web modernas con Next.js, React y TypeScript. Integración de IA, Firebase y optimización SEO.",
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
        },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="es" href={SITE_URL} />
        <link rel="alternate" hrefLang="es-NI" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="en-US" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <QueryProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </QueryProvider>
        <GoogleAnalytics gaId="G-BB7WX61NE7" />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
