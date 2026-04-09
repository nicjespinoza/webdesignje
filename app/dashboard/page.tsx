// app/dashboard/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Users,
  Calendar,
  MessageCircle,
  FileText,
  X,
  Moon,
  Sun,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updatePassword, getAuth } from "firebase/auth";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { getSpecialtyById } from "@/lib/specialties";
import GlobalParticles from "@/components/landing/GlobalParticles";
import Logo from "@/components/medical/ui/Logo";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [specialtyId, setSpecialtyId] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const auth = getAuth();

  useEffect(() => {
    const urlSpecialty = searchParams.get('specialty');
    const storedSpecialty = localStorage.getItem('selectedSpecialty');
    const finalId = urlSpecialty || storedSpecialty || 'gastroenterology';

    setSpecialtyId(finalId);
    localStorage.setItem('selectedSpecialty', finalId);
  }, [searchParams]);

  const specialty = getSpecialtyById(specialtyId || 'gastroenterology');

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientIp, setClientIp] = useState("N/A");
  const [latency, setLatency] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(window.navigator.onLine);
    updateOnlineStatus();
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(() => {
      updateOnlineStatus();
      if (!window.navigator.onLine) {
        setLatency(0);
      }
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const authLabel = user?.email?.includes('dr') ? 'DOCTOR' : 'ASISTENTE';

  const menuItems = [
    {
      title: "Pacientes",
      subtitle: "DIRECTORIO",
      path: `/dashboard/patients?specialty=${specialtyId || 'gastroenterology'}`,
      icon: <Users size={40} strokeWidth={1} />,
      gradient: "from-primary/20 via-transparent to-transparent",
    },
    {
      title: "Agenda",
      subtitle: "CALENDARIO",
      path: `/dashboard/agenda?specialty=${specialtyId || 'gastroenterology'}`,
      icon: <Calendar size={40} strokeWidth={1} />,
      gradient: "from-primary/20 via-transparent to-transparent",
    },
    {
      title: "Chat",
      subtitle: "MENSAJES",
      path: `/dashboard/chat?specialty=${specialtyId || 'gastroenterology'}`,
      icon: <MessageCircle size={40} strokeWidth={1} />,
      gradient: "from-primary/20 via-transparent to-transparent",
    },
    {
      title: "Analítica",
      subtitle: "REPORTES",
      path: `/dashboard/reports?specialty=${specialtyId || 'gastroenterology'}`,
      icon: <FileText size={40} strokeWidth={1} />,
      gradient: "from-primary/20 via-transparent to-transparent",
    },
  ];

  const handleUpdateMyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updatePassword(currentUser, newPassword);
        alert("Contraseña actualizada");
        setShowPasswordModal(false);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] relative flex flex-col items-center p-6 md:p-12 overflow-hidden selection:bg-primary/30 font-luxury">

      {/* Red Neuronal Background - Elegant Neural Web */}
      <GlobalParticles />

      {/* Surface Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/50 via-transparent to-[#020202]/80 pointer-events-none z-1" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col items-center">

        {/* Luxury Minimalist Header */}
        <header className="w-full mb-20 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group cursor-pointer"
              onClick={() => router.push(`/portal` as any)}
            >
              <Logo size={80} />
            </motion.div>

            <div className="flex flex-col items-center md:items-start space-y-1">
              <h1 className="text-2xl md:text-4xl font-thin tracking-[0.2em] text-white flex items-center gap-4">
                {specialty.nameEs.toUpperCase()}
                <span className="h-0.5 w-0.5 bg-primary/40 rounded-full hidden md:block" />
              </h1>
              <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] font-bold uppercase gradient-text">
                <span>Gold Edition</span>
                <span>•</span>
                <span>V. 4.2</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-3.5 rounded-full border border-white/5 hover:border-primary/20 transition-all text-white/20 hover:text-primary focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary"
              aria-label="Alternar tema"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={async () => { await logout(); router.push(`/portal` as any); }}
              className="liquid-gold-card !rounded-full !h-auto !p-[1.5px] group !bg-transparent"
            >
              <div className="liquid-gold-content !py-2.5 !px-10 !rounded-full !bg-black hover:!bg-black/40 transition-all flex items-center justify-center">
                <span className="text-[#C69320] font-bold text-sm tracking-tight">
                  Cerrar Sesión
                </span>
              </div>
            </button>
          </div>
        </header>

        {/* Shorter Luxury Liquid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          {menuItems.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              key={item.path}
              onClick={() => router.push(item.path as any)}
              className="group relative h-[320px] cursor-pointer"
            >
              {/* Simple Elegant Transparent Card */}
              <div className="absolute inset-0 bg-transparent border border-white/10 rounded-[2rem] transition-all duration-700 group-hover:border-primary/40 group-hover:bg-white/[0.02] overflow-hidden">

                {/* Subtle Glow Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 opacity-0 group-hover:opacity-10",
                  item.gradient
                )} />

                {/* Content Layout */}
                <div className="relative h-full p-10 flex flex-col justify-between z-10">
                  <div className="space-y-6">
                    <div className="text-[#C69320] transform transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(198,147,32,0.4)]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-thin text-white tracking-[0.1em] mb-1 uppercase group-hover:text-primary transition-all duration-700">
                        {item.title}
                      </h3>
                      <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-bold group-hover:text-white transition-colors duration-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between opacity-20 group-hover:opacity-100 transition-all duration-700">
                    <div className="h-[1px] w-8 bg-primary/40 group-hover:w-16 transition-all duration-700" />
                    <ArrowRight size={18} className="text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Micro-accent */}
                <div className="absolute top-6 right-6 w-1 h-1 bg-white/5 rounded-full group-hover:bg-primary/40 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimalist Ordered Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 w-full flex flex-row justify-between items-center py-6 border-t border-white/5 text-white/40"
        >
          <div className="flex gap-12 items-center">
            <div className="space-y-0.5">
              <p className="text-[7px] tracking-[0.4em] uppercase font-bold text-white/40">Conexión Sistema</p>
              <div className="flex items-center gap-2">
                <p className={cn("text-sm font-thin tracking-widest", !isOnline ? "text-red-500" : "text-white")}>
                  {isOnline ? `${latency}ms` : "---"}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className={cn("w-1 h-1 rounded-full", isOnline ? "bg-emerald-500" : "bg-red-500")} />
                  <span className={cn("text-[7px] font-bold uppercase tracking-widest", isOnline ? "text-emerald-500" : "text-red-500")}>
                    {isOnline ? "Estable" : "Sin conexión"}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="space-y-0.5">
              <p className="text-[7px] tracking-[0.4em] uppercase font-bold text-white/40">Status Nodo</p>
              <div className="flex items-center gap-2">
                <p className={cn("text-[7px] tracking-[0.2em] uppercase font-bold transition-colors", !isOnline ? "text-red-500" : "text-white")}>
                  APP ({specialty.nameEs}) v9.6.3
                </p>
                <div className={cn("w-1 h-1 rounded-full animate-pulse", isOnline ? "bg-emerald-500" : "bg-red-500")} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className={cn("text-[7px] tracking-[0.2em] font-bold uppercase transition-colors", isOnline ? "text-emerald-500" : "text-red-500")}>
                  IP AUTORIZADA {authLabel}:
                </span>
                <span className={cn("text-[9px] tracking-[0.2em] uppercase font-black transition-colors", isOnline ? "gradient-text" : "text-red-600")}>
                  {isOnline ? clientIp : "X.X.X.X.X"}
                </span>
              </div>
              <span className="text-[7px] tracking-[0.8em] uppercase font-thin text-white/20 mt-1">JE. 2026</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400&display=swap');
        
        .font-luxury {
          font-family: 'Outfit', sans-serif;
        }

        h1, h2, h3 {
          font-family: 'Outfit', sans-serif;
        }

        body {
          background-color: #020202;
          color: white;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-primary/20 tracking-[1em] uppercase text-[8px]">Iniciando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
