// app/dashboard/(inner)/layout.tsx
"use client";

import React, { useState, Suspense } from "react";
import {
    Users,
    Calendar,
    FileText,
    Home,
    MessageCircle,
    Moon,
    Sun,
    Search,
    Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getSpecialtyById } from "@/lib/specialties";
import GlobalParticles from "@/components/landing/GlobalParticles";
import LogoComponent from "@/components/medical/ui/Logo";
import { useAppTranslations } from "@/hooks/useTranslations";

function InnerDashboardLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = useAppTranslations();
    const router = useRouter();
    const pathname = usePathname();
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [currentSpecialtyId, setCurrentSpecialtyId] = useState('gastroenterology');
    const [isOnline, setIsOnline] = useState(true);
    const [clientIp, setClientIp] = useState("Detectando...");
    const [latency, setLatency] = useState(0);
    const searchParams = useSearchParams();

    React.useEffect(() => {
        setIsOnline(window.navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const updateIp = () => {
            fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(data => {
                    setClientIp(data.ip);
                    setIsOnline(true);
                })
                .catch(() => {
                    setClientIp("OFFLINE");
                    setIsOnline(false);
                    setLatency(0);
                });
        };

        updateIp();

        const interval = setInterval(() => {
            const currentlyOnline = window.navigator.onLine;
            if (!currentlyOnline) {
                setIsOnline(false);
                setLatency(0);
                setClientIp("OFFLINE");
                return;
            }

            const start = Date.now();
            fetch('https://www.google.com/generate_204', {
                mode: 'no-cors',
                cache: 'no-store',
                method: 'HEAD'
            })
                .then(() => {
                    setLatency(Date.now() - start);
                    setIsOnline(true);
                })
                .catch(() => {
                    setIsOnline(false);
                    setLatency(0);
                    setClientIp("OFFLINE");
                });

            if (Math.random() > 0.7) updateIp();
        }, 5000);

        const specialtyFromUrl = searchParams.get('specialty');
        const specialtyFromStorage = localStorage.getItem('selectedSpecialty');
        const finalId = specialtyFromUrl || specialtyFromStorage || 'gastroenterology';

        setCurrentSpecialtyId(finalId);

        if (finalId) {
            localStorage.setItem('selectedSpecialty', finalId);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(interval);
        };
    }, [searchParams, pathname]);

    const currentSpecialty = getSpecialtyById(currentSpecialtyId);

    const handleLogout = async () => {
        try {
            await logout();
            router.push(`/` as any);
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const links = [
        { label: "Hogar", href: "/dashboard", icon: <Home size={16} strokeWidth={1} /> },
        { label: "Pacientes", href: "/dashboard/patients", icon: <Users size={16} strokeWidth={1} /> },
        { label: "Agenda", href: "/dashboard/agenda", icon: <Calendar size={16} strokeWidth={1} /> },
        { label: "Mensajes", href: "/dashboard/chat", icon: <MessageCircle size={16} strokeWidth={1} /> },
        { label: "Reportes", href: "/dashboard/reports", icon: <FileText size={16} strokeWidth={1} /> },
    ];

    return (
        <div className="flex flex-col h-screen bg-[#020202] text-white/80 transition-colors duration-700 overflow-hidden selection:bg-primary/20 font-luxury-sans relative">

            {/* Elegant Neural Background with Low Opacity */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <GlobalParticles />
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400&display=swap');
                
                body {
                    background-color: #020202;
                    overflow: hidden;
                }
                
                .font-luxury-sans {
                    font-family: 'Outfit', sans-serif;
                }
            `}</style>

            {/* Premium Luxury Sidebar/Header Hybrid */}
            <header className="w-full bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 z-50">
                <div className="px-8 md:px-16 h-20 flex items-center justify-between">

                    {/* Left: Refined Branding */}
                    <div className="flex items-center gap-10">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative cursor-pointer"
                            onClick={() => router.push(`/dashboard?specialty=${currentSpecialtyId}` as any)}
                        >
                            <LogoComponent size={36} />
                        </motion.div>

                        <div className="hidden lg:flex flex-col gap-0.5 border-l border-white/5 pl-8">
                            <h2 className="text-[10px] tracking-[0.5em] font-light text-primary uppercase leading-tight">{currentSpecialty?.nameEs}</h2>
                            <p className="text-[8px] tracking-[0.3em] font-bold text-white/20 uppercase gradient-text">Gold Edition • V. 4.2</p>
                        </div>
                    </div>

                    {/* Middle: Minimalist Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        {links.map((link, idx) => {
                            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/dashboard");
                            return (
                                <button
                                    key={idx}
                                    onClick={() => router.push(`${link.href}?specialty=${currentSpecialtyId}` as any)}
                                    className={cn(
                                        "text-[9px] tracking-[0.4em] uppercase font-light transition-all duration-500 relative py-2",
                                        isActive ? "text-primary brightness-125" : "text-white/20 hover:text-white"
                                    )}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right: Refined Actions */}
                    <div className="flex items-center gap-6">
                        <button onClick={toggleTheme} aria-label={t('common.toggleTheme')} title={t('common.toggleTheme')} className="text-white/20 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary rounded-md p-1">
                            {theme === 'light' ? <Moon size={16} strokeWidth={1} /> : <Sun size={16} strokeWidth={1} />}
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={handleLogout}
                            className="text-[8px] tracking-[0.4em] uppercase font-thin text-white/20 hover:text-destructive border border-white/5 hover:border-destructive/30 px-6 py-2.5 rounded-full transition-all"
                        >
                            Finalizar
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Main Luxury Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10">
                <div className="w-full min-h-full p-8 md:p-16 lg:px-20 lg:py-16 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>

            {/* Bottom Global Status Bar */}
            <footer className="h-10 border-t border-white/5 bg-[#020202]/80 backdrop-blur-xl z-50 flex items-center justify-between px-16 text-[7px] tracking-[0.4em] uppercase">
                <div className="flex gap-10 items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-white/20">Conexión Sistema:</span>
                        <div className="flex items-center gap-2">
                            <p className={cn("text-[8px] font-thin tracking-widest", !isOnline ? "text-red-500" : "text-white")}>
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
                    <div className="w-[1px] h-3 bg-white/5" />
                    <div className="flex items-center gap-3">
                        <span className="text-white/20">Status Nodo:</span>
                        <div className="flex items-center gap-2">
                            <span className={cn("font-bold", isOnline ? "text-white/40" : "text-red-500")}>
                                APP ({currentSpecialty?.nameEs}) v9.6.3
                            </span>
                            <div className={cn("w-1 h-1 rounded-full animate-pulse", isOnline ? "bg-emerald-500" : "bg-red-500")} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className={cn("text-[7px] tracking-[0.2em] font-bold uppercase transition-colors", isOnline ? "text-emerald-500/60" : "text-red-500")}>
                            IP AUTORIZADA:
                        </span>
                        <span className={cn("text-white/40 font-black transition-colors", !isOnline && "text-red-600")}>
                            {isOnline ? clientIp : "X.X.X.X.X"}
                        </span>
                    </div>
                    <span className="gradient-text font-bold opacity-40">Gold Edition</span>
                    <div className="w-1 h-1 bg-primary/10 rounded-full" />
                    <span className="text-white/10 tracking-[0.8em]">JE. 2026</span>
                </div>
            </footer>
        </div>
    );
}


export default function InnerDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <InnerDashboardLayoutContent>{children}</InnerDashboardLayoutContent>
        </Suspense>
    );
}

export const Logo = () => (
    <div className="flex items-center justify-center p-8">
        <LogoComponent size={40} />
    </div>
);

export const LogoIcon = () => (
    <div className="flex items-center justify-center p-4">
        <LogoComponent size={28} />
    </div>
);
