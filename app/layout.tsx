import { ThemeProvider } from "../context/ThemeContext";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from 'next';
import ChatWidget from "@/components/landing/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const SITE_URL = "https://webdesignje.com";
const AUTHOR_NAME = "Joseph Espinoza";
const AUTHOR_TITLE = "Full-Stack Developer & AI Engineer";
const AUTHOR_DESCRIPTION = "Desarrollador Full-Stack especializado en Next.js, React, TypeScript, Node.js, Python, Django, FastAPI, Tailwind, shadcn/ui, Docker, Kubernetes, PostgreSQL, MongoDB, Firebase, Supabase, AWS, Vercel, e Inteligencia Artificial. +13 proyectos entregados globalmente.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Joseph Espinoza | Web Design & AI Solutions",
    template: `%s | Web Design & AI Solutions`
  },
  description: AUTHOR_DESCRIPTION,
  keywords: ["Desarrollador Full-Stack Nicaragua", "Full-Stack Developer", "AI Engineer"],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "es_NI",
    url: SITE_URL,
    siteName: "Joseph Espinoza | Full-Stack & AI Engineer",
    images: [{ url: `${SITE_URL}/images/og-image.jpg`, width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      jobTitle: AUTHOR_TITLE,
    }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
