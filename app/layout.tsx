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

export const metadata: Metadata = {
  title: "Joseph Espinoza | Full-Stack & AI Engineer",
  description:
    "Architecting the web of tomorrow with Next.js 15, AI Agents, and immersive 3D interfaces.",
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
