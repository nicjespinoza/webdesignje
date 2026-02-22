// ============================================================
// Configuración de Next.js — Medical AI Demo
// transpilePackages: necesario para Three.js y postprocessing
// (paquetes ESM que requieren transpilación en SSR)
// ============================================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "postprocessing", "@react-three/postprocessing"],
  images: { unoptimized: true }
};

export default nextConfig;
