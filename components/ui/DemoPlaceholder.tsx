// components/ui/DemoPlaceholder.tsx
"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Construction, Rocket, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';

interface DemoPlaceholderProps {
    title: string;
    description: string;
}

export default function DemoPlaceholder({ title, description }: DemoPlaceholderProps) {
    const router = useRouter();

    useEffect(() => {
        // Redirigir automáticamente al formulario de contacto después de 5 segundos
        // o si el usuario quiere ir directo, puede usar el botón.
        const timer = setTimeout(() => {
            // router.push('/#contact'); 
            // Comentado para permitir que el usuario lea la descripción primero, 
            // pero el botón de contacto será el más prominente.
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 text-center space-y-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C69320]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <div className="w-24 h-24 bg-gradient-to-br from-[#C69320] to-[#FBE18D] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#C69320]/20 rotate-12">
                    <Rocket size={48} className="text-black" />
                </div>

                <h1 className="text-4xl md:text-6xl font-black gradient-text mb-4 uppercase tracking-tighter">
                    {title}
                </h1>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C69320]/30 bg-white/5 text-[#FBE18D] text-xs font-bold mb-8">
                    <Construction size={14} /> PRÓXIMAMENTE - EN DESARROLLO
                </div>

                <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                    {description}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-6"
            >
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group text-sm"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Volver al Portafolio</span>
                </button>

                <Link
                    href="/#contact"
                    className="px-8 py-4 bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black rounded-2xl font-black flex items-center gap-2 uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(198,147,32,0.3)]"
                >
                    Solicitar Demo Personalizada <Send size={18} />
                </Link>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <Sparkles className="text-[#C69320] mb-2" size={20} />
                        <span className="text-[10px] uppercase font-bold text-slate-500">Diseño 2026</span>
                    </div>
                    <div className="w-px bg-white/10 h-10"></div>
                    <div className="flex flex-col items-center">
                        <Rocket className="text-[#C69320] mb-2" size={20} />
                        <span className="text-[10px] uppercase font-bold text-slate-500">Alta Performance</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
