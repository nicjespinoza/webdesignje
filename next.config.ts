// ============================================================
// Configuración de Next.js — Medical AI Demo
// transpilePackages: necesario para Three.js y postprocessing
// (paquetes ESM que requieren transpilación en SSR)
// ============================================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "postprocessing", "@react-three/postprocessing"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.webdesignje.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // ===================================
  // Deshabilitar 'export' en entorno dev
  // para evitar errores con parámetros dinámicos no generados
  // ===================================
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'three'],
  },
};

export default nextConfig;
