"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  MessageCircle,
  FileText,
  Lock,
  CheckCircle,
  RefreshCw,
  X,
  KeyRound,
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updatePassword, getAuth } from "firebase/auth";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const auth = getAuth();

  const unreadChatsCount = 0;
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [assistantPassword, setAssistantPassword] = useState("");
  const [confirmAssistantPassword, setConfirmAssistantPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAssistant, setLoadingAssistant] = useState(false);

  const isDrMilton = user?.email === 'dr@je.com' || user?.email === 'dra@je.com' || user?.email === 'dr@cenlae.com';

  const menuItems = [
    {
      title: "Mis Pacientes",
      subtitle: "Gestión y Seguimiento",
      path: "/dashboard/patients",
      icon: <Users size={48} />,
      color: "bg-blue-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Agenda",
      subtitle: "Citas y Horarios",
      path: "/dashboard/agenda",
      icon: <Calendar size={48} />,
      color: "bg-orange-500",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      title: "Chat Médico",
      subtitle: "Comunicación Directa",
      path: "/dashboard/chat",
      icon: <MessageCircle size={48} />,
      color: "bg-emerald-500",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      badge: unreadChatsCount > 0 ? unreadChatsCount : null,
    },
    {
      title: "Reportes",
      subtitle: "Análisis y Datos",
      path: "/dashboard/reports",
      icon: <FileText size={48} />,
      color: "bg-purple-500",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
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
        alert("Contraseña personal actualizada");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordModal(false);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden transition-colors duration-700">
      {/* Minimalist Soft Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[180px]" />
      </div>

      <div className="w-full max-w-7xl relative z-10">
        {/* Floating Minimalist Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 bg-card/30 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] border border-border/50 shadow-soft">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center md:text-left space-y-2"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <motion.img
                key={theme}
                src={theme === 'light' ? "/images/Logo_trans_dorado.png" : "/images/Logo_trans_blanco.png"}
                alt="Logo"
                className="h-16 w-auto object-contain mb-4 md:mb-0"
              />
              <div className="h-12 w-px bg-border hidden md:block" />
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">
                  {user?.displayName || "Dr. Mairena"}
                </h1>
                <p className="text-xs font-black text-primary uppercase tracking-[0.4em] mt-1">
                  {isDrMilton ? "MÉDICO ESPECIALISTA" : "ASISTENTE CLÍNICO"}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 bg-background/50 p-2 rounded-[2.5rem] border border-border/40 backdrop-blur-md">
            <button
              onClick={toggleTheme}
              className="p-4 rounded-3xl bg-card hover:bg-muted text-foreground transition-all shadow-soft border border-border/50 group"
            >
              {theme === 'light' ? <Moon size={22} className="text-muted-foreground group-hover:text-primary transition-colors" /> : <Sun size={22} className="text-amber-400" />}
            </button>

            {isDrMilton && (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="p-4 rounded-3xl bg-card hover:bg-muted text-foreground transition-all shadow-soft border border-border/50 group"
                title="Seguridad"
              >
                <KeyRound size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            )}

            <button
              onClick={async () => { await logout(); router.push("/"); }}
              className="px-8 py-4 rounded-3xl bg-destructive text-destructive-foreground font-black text-[10px] uppercase tracking-widest shadow-lg shadow-destructive/20 hover:scale-105 active:scale-95 transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Minimalist Floating Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {menuItems.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              key={idx}
              onClick={() => router.push(item.path)}
              className="group relative"
            >
              {/* Floating Effect Background Shadow */}
              <div className="absolute inset-4 bg-foreground/5 dark:bg-primary/10 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <div className="relative bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 flex flex-col items-center gap-10 border border-border/40 cursor-pointer shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-6">

                {/* Minimalist Animated Icon Container */}
                <div className={cn(
                  "relative p-8 rounded-[2.5rem] transition-all duration-500 overflow-hidden",
                  "bg-background/80 border border-border shadow-inner group-hover:border-primary/20",
                  item.iconColor
                )}>
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  {/* Subtle Background Glow per Item */}
                  <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500", item.color)} />
                </div>

                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-black text-foreground tracking-tight transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                    {item.subtitle}
                  </p>
                </div>

                {/* Badge Overlay */}
                {item.badge && (
                  <div className="absolute top-8 right-8">
                    <span className="flex h-10 w-10 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-10 w-10 bg-red-500 text-white text-xs font-black items-center justify-center border-4 border-card shadow-lg">
                        {item.badge}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground/30 font-black text-[9px] uppercase tracking-[0.5em] px-12">
          <div className="flex items-center gap-6">
            <span>© 2026 MEDICAL AI</span>
            <div className="h-1 w-1 bg-border rounded-full" />
            <span>DR. MILTON MAIRENA VALLE</span>
          </div>
          <div className="flex items-center gap-6">
            <span>BUILD PRO-V4.2</span>
            <div className="h-1 w-1 bg-border rounded-full" />
            <span className="text-primary/50">PLATINO EDITION</span>
          </div>
        </footer>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setShowPasswordModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card w-full max-w-lg rounded-[3rem] shadow-2xl border border-border p-10 relative z-10"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-3xl font-black text-foreground tracking-tighter">Seguridad</h3>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Gestión de Credenciales</p>
                </div>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-3 bg-muted hover:bg-destructive hover:text-white rounded-2xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateMyPassword} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 ml-1">Nueva Contraseña</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-muted border border-border focus:border-primary outline-none transition-all font-bold text-foreground"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/30" size={18} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 ml-1">Confirmar Contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-muted border border-border focus:border-primary outline-none transition-all font-bold text-foreground"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !newPassword}
                  className="w-full mt-4 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest py-5 rounded-[2rem] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <RefreshCw className="animate-spin" /> : <CheckCircle size={20} />}
                  Actualizar Ahora
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
