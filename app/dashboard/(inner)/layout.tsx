"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    ArrowLeft,
    Settings,
    User,
    Users,
    Calendar,
    FileText,
    LogOut,
    Home,
    MessageCircle,
    Moon,
    Sun,
    ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { SPECIALTIES, getSpecialtyById } from "@/lib/specialties";

export default function InnerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const currentSpecialtyId = typeof window !== 'undefined' ? localStorage.getItem('selectedSpecialty') || 'gastroenterology' : 'gastroenterology';
    const currentSpecialty = getSpecialtyById(currentSpecialtyId);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const handleSpecialtyChange = (id: string) => {
        localStorage.setItem('selectedSpecialty', id);
        setShowSpecialtyDropdown(false);
        window.location.reload(); // Reload to apply specialty-specific logic if any
    };

    const links = [
        {
            label: "Inicio",
            href: "/dashboard",
            icon: <Home className="h-5 w-5 shrink-0 stroke-[2.5]" />,
        },
        {
            label: "Pacientes",
            href: "/dashboard/patients",
            icon: <Users className="h-5 w-5 shrink-0 stroke-[2.5]" />,
        },
        {
            label: "Agenda",
            href: "/dashboard/agenda",
            icon: <Calendar className="h-5 w-5 shrink-0 stroke-[2.5]" />,
        },
        {
            label: "Chat",
            href: "/dashboard/chat",
            icon: <MessageCircle className="h-5 w-5 shrink-0 stroke-[2.5]" />,
        },
        {
            label: "Reportes",
            href: "/dashboard/reports",
            icon: <FileText className="h-5 w-5 shrink-0 stroke-[2.5]" />,
        },
    ];

    return (
        <div
            className={cn(
                "flex flex-col md:flex-row bg-background w-full flex-1 max-w-full mx-auto overflow-hidden text-foreground transition-all duration-700",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 bg-card border-r border-border/40 shadow-xl">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pt-4">
                        <div className="px-2 mb-10">
                            {open ? <Logo theme={theme} /> : <LogoIcon theme={theme} />}
                        </div>

                        {/* Minimalist Specialty Badge */}
                        <div className="px-4">
                            <div className={cn(
                                "flex items-center gap-4 p-3 rounded-[1.5rem] bg-muted/40 border border-border/50",
                                !open && "justify-center px-2"
                            )}>
                                <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg transition-transform hover:rotate-12"
                                    style={{ backgroundColor: currentSpecialty.color }}
                                >
                                    <currentSpecialty.icon size={20} />
                                </div>
                                {open && (
                                    <div className="text-left overflow-hidden">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Especialidad</p>
                                        <p className="text-sm font-black text-foreground truncate">{currentSpecialty.nameEs}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <nav className="mt-12 flex flex-col gap-3 px-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    isActive={pathname.startsWith(link.href) && link.href !== "/dashboard"}
                                    className={cn(
                                        "font-black text-[10px] uppercase tracking-[0.2em] transition-all px-5 py-4 rounded-[1.5rem] group/item",
                                        pathname.startsWith(link.href) && link.href !== "/dashboard"
                                            ? "bg-primary text-primary-foreground shadow-xl shadow-primary/10 border border-primary/20"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                    )}
                                />
                            ))}

                            <div className="h-px bg-border/40 my-6 mx-4" />

                            <div
                                onClick={toggleTheme}
                                className="flex items-center gap-4 group/theme py-4 cursor-pointer hover:bg-muted/60 rounded-[1.5rem] px-5 transition-all"
                            >
                                <div className="w-6 flex justify-center">
                                    {theme === 'light' ? <Moon size={18} className="text-muted-foreground group-hover/theme:text-primary transition-colors" /> : <Sun size={18} className="text-amber-400" />}
                                </div>
                                <motion.span
                                    animate={{ display: open ? "inline-block" : "none", opacity: open ? 1 : 0 }}
                                    className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover/theme:text-foreground"
                                >
                                    Modo {theme === 'light' ? 'Oscuro' : 'Claro'}
                                </motion.span>
                            </div>

                            <div
                                onClick={handleLogout}
                                className="flex items-center gap-4 group/logout py-4 cursor-pointer hover:bg-destructive/10 rounded-[1.5rem] px-5 transition-all"
                            >
                                <div className="w-6 flex justify-center">
                                    <LogOut size={18} className="text-muted-foreground group-hover/logout:text-destructive transition-colors" />
                                </div>
                                <motion.span
                                    animate={{ display: open ? "inline-block" : "none", opacity: open ? 1 : 0 }}
                                    className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover/logout:text-destructive"
                                >
                                    Salir
                                </motion.span>
                            </div>
                        </nav>
                    </div>

                    <div className="px-2 pb-6">
                        <div className="bg-muted/30 p-1 rounded-[2rem] border border-border/40">
                            <SidebarLink
                                link={{
                                    label: user?.email === 'dr@je.com' ? "Dr. Joseph" : (user?.email === 'asistente@je.com' ? "Asistente JE" : (user?.email?.split("@")[0] || "Usuario")),
                                    href: "/dashboard/profile",
                                    icon: (
                                        <div className="h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg shadow-primary/10">
                                            {(user?.email || "U").charAt(0).toUpperCase()}
                                        </div>
                                    ),
                                }}
                                className="font-black text-[10px] uppercase tracking-[0.2em] py-3"
                            />
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>

            <main className="flex flex-1 overflow-hidden relative bg-background">
                {/* Modern Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
                    <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[200px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-500/10 rounded-full blur-[200px]" />
                </div>

                <div
                    className={cn(
                        "flex flex-col flex-1 w-full h-full overflow-y-auto relative z-10 transition-all duration-700",
                        "p-6 md:p-12 lg:p-16"
                    )}
                >
                    {children}
                </div>
            </main>
        </div>
    );
}

export const Logo = ({ theme }: { theme: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-16 w-full"
        >
            <img
                src={theme === 'light' ? "/images/Logo_trans_dorado.png" : "/images/Logo_trans_blanco.png"}
                alt="Logo"
                className="h-12 w-auto object-contain"
            />
        </motion.div>
    );
};

export const LogoIcon = ({ theme }: { theme: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-12 w-full"
        >
            <img
                src={theme === 'light' ? "/images/Logo_trans_dorado.png" : "/images/Logo_trans_blanco.png"}
                alt="Icon"
                className="h-8 w-auto object-contain"
            />
        </motion.div>
    );
};
