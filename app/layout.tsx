// ============================================================
// Layout Raíz — Portafolio Joseph Espinoza
// Layout minimalista sin AuthProvider ni HeaderNav para compatibilidad
// con el portafolio clonado que maneja su propia navegación
// ============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Joseph Espinoza | Full-Stack & AI Engineer",
  description:
    "Architecting the web of tomorrow with Next.js 15, AI Agents, and immersive 3D interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-slate-950 text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
