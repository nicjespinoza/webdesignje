// ============================================================
// Layout Raíz — Portafolio Joseph Espinoza
// Layout minimalista sin AuthProvider ni HeaderNav para compatibilidad
// con el portafolio clonado que maneja su propia navegación
// ============================================================

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
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
        className={`${openSans.variable} font-sans antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
