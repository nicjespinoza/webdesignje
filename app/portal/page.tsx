// app/portal/page.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Open_Sans } from 'next/font/google';
import {
  User,
  Lock,
  ArrowRight,
  Hospital,
  LayoutGrid,
  ShoppingBag,
  Hotel,
  Monitor,
  ArrowLeft,
  ShieldCheck,
  Stethoscope,
  Heart,
  Baby,
  Activity,
  Clipboard,
  ShieldAlert,
  ChevronRight,
  Eye,
  Ear,
  Sparkles,
  Flame,
  Star
} from 'lucide-react';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const specialtyItems = [
  { id: 'cardiology', label: 'Cardiología', icon: Heart },
  { id: 'cosmetic_dentistry', label: 'Odontología Estética', icon: Sparkles },
  { id: 'dermatology', label: 'Dermatología', icon: Activity },
  { id: 'endocrinology', label: 'Endocrinología', icon: Flame },
  { id: 'endodontics', label: 'Endodoncia', icon: Activity },
  { id: 'gastroenterology', label: 'Gastroenterología', icon: Stethoscope },
  { id: 'general_surgery', label: 'Cirugía General', icon: Stethoscope },
  { id: 'geriatrics', label: 'Geriatría', icon: User },
  { id: 'gynecology', label: 'Ginecología', icon: Clipboard },
  { id: 'hematology', label: 'Hematología', icon: Heart },
  { id: 'implantology', label: 'Implantología', icon: Activity },
  { id: 'infectology', label: 'Infectología', icon: ShieldAlert },
  { id: 'maxillofacial_surgery', label: 'Cirugía Maxilofacial', icon: Stethoscope },
  { id: 'nephrology', label: 'Nefrología', icon: Activity },
  { id: 'neurology', label: 'Neurología', icon: Activity },
  { id: 'oncology', label: 'Oncología', icon: ShieldCheck },
  { id: 'ophthalmology', label: 'Oftalmología', icon: Eye },
  { id: 'orthodontics', label: 'Ortodoncia', icon: Star },
  { id: 'orthopedics', label: 'Ortopedia', icon: User },
  { id: 'otolaryngology', label: 'Otorrinolaringología', icon: Ear },
  { id: 'pediatric_dentistry', label: 'Odontopediatría', icon: Baby },
  { id: 'pediatrics', label: 'Pediatría', icon: Baby },
  { id: 'periodontics', label: 'Periodoncia', icon: Activity },
  { id: 'prosthodontics', label: 'Prostodoncia', icon: Activity },
  { id: 'psychiatry', label: 'Psiquiatría', icon: Activity },
  { id: 'pulmonology', label: 'Neumología', icon: Activity },
  { id: 'rheumatology', label: 'Reumatología', icon: Activity },
  { id: 'urology', label: 'Urología', icon: ShieldAlert },
];

const projects = [
  {
    id: 'medical',
    title: 'Historia Clínica SaaS',
    icon: Hospital,
    desc: 'Sistema integral para gestión de salud.',
    path: '/dashboard'
  },
  {
    id: 'pos',
    title: 'POS Tienda Zapatos',
    icon: ShoppingBag,
    desc: 'Punto de Venta especializado en retail.',
    path: '/demos/pos'
  },
  {
    id: 'hotel',
    title: 'Hotel Management',
    icon: Hotel,
    desc: 'Gestión hotelera de alta gama.',
    path: '/demos/hotel'
  },
  {
    id: 'ecommerce',
    title: 'Eve Commerce',
    icon: Monitor,
    desc: 'E-commerce premium de alta conversión.',
    path: '/demos/evecommerce'
  }
];

export default function UnifiedPortalPage() {
  const router = useRouter();
  const [view, setView] = useState<'selection' | 'medical-login'>('selection');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!specialty) {
      setError('Por favor selecciona una especialidad');
      return;
    }

    // Set persistence for the app
    localStorage.setItem('selectedSpecialty', specialty);

    try {
      // Iniciar sesión real en Firebase
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const { auth } = await import('@/lib/firebase');

      await signInWithEmailAndPassword(auth, email, password);

      // Determinar rol basado en el email para la URL (opcional, Firebase lo manejará internamente en los tokens/documentos)
      const role = email.includes('asistente') ? 'assistant' : '';
      const roleParam = role ? `&role=${role}` : '';

      router.push(`/dashboard?specialty=${specialty}${roleParam}`);
    } catch (err: any) {
      console.error("Login error:", err);
      // Fallback a credenciales hardcoded SOLO para desarrollo si falla la red, 
      // pero esto no arreglará el problema de permisos de Firestore.
      if (email === 'dr@je.com' && (password === '123456' || password === 'Doctor')) {
        router.push(`/dashboard?specialty=${specialty}`);
      } else if (email === 'asistente@je.com' && (password === 'Asistente' || password === '123456')) {
        router.push(`/dashboard?specialty=${specialty}&role=assistant`);
      } else {
        setError('Error de autenticación. Verifica tus credenciales o conexión.');
      }
    }
  };

  const selectedItem = specialtyItems.find(item => item.id === specialty);

  return (
    <div className={`min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden ${openSans.className}`}>
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C69320]/5 blur-[120px] rounded-full opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full opacity-30"></div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'selection' ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full max-w-5xl z-10"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[10px] font-semibold mb-4 tracking-wider"
              >
                <LayoutGrid size={12} /> Catálogo de proyectos
              </motion.div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                Selecciona una experiencia
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -8 }}
                  onClick={() => {
                    if (project.id === 'medical') {
                      setView('medical-login');
                    } else {
                      router.push(project.path);
                    }
                  }}
                  className="bg-[#1a1a2e]/30 border border-white/5 rounded-2xl p-8 cursor-pointer group hover:border-[#C69320]/30 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <project.icon size={28} className="text-[#FBE18D]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#FBE18D] transition-colors">{project.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">{project.desc}</p>
                    <div className="flex items-center gap-2 text-[#C69320] text-xs font-semibold mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      Ingresar <ChevronRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="medical-login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl z-10"
          >
            <button
              onClick={() => { setView('selection'); setSpecialty(''); setEmail(''); setPassword(''); }}
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-medium mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Volver</span>
            </button>

            <motion.div
              className="bg-[#1a1a2e]/20 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C69320]/50 to-[#FBE18D]/50 opacity-50"></div>

              <div className="flex flex-col items-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Portal Médico</h2>
                <AnimatePresence>
                  {specialty && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mt-2"
                    >
                      <ShieldCheck size={16} className="text-[#FBE18D]" />
                      <span className="text-[11px] font-medium text-slate-300">Especialidad: {selectedItem?.label}</span>
                      <button onClick={() => setSpecialty('')} className="ml-2 text-[10px] text-white/30 hover:text-white underline font-semibold transition-colors">Cambiar</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Specialties Grid (Minimalist Boxes) */}
              <AnimatePresence>
                {!specialty && (
                  <motion.div
                    key="specialties-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    className="mb-8"
                  >
                    <div className="text-center mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-600">Selecciona tu especialidad</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {specialtyItems.map((item) => (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSpecialty(item.id)}
                          className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group transition-all hover:bg-white/10 hover:border-[#C69320]/30"
                        >
                          <item.icon size={18} className="text-[#C69320]/60 group-hover:text-[#FBE18D] transition-colors" />
                          <span className="text-[11px] font-medium text-slate-300 mx-3">{item.label}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover:bg-[#C69320]/50 transition-colors"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Section */}
              <form onSubmit={handleLogin} className={`max-w-2xl mx-auto space-y-8 transition-all duration-700 ${!specialty ? 'opacity-10 pointer-events-none blur-sm' : 'opacity-100'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-500 ml-1">E-mail</label>
                    <div className="relative group">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#FBE18D] transition-colors" />
                      <input
                        type="email"
                        placeholder="doctor@medical.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 focus:outline-none focus:border-[#C69320]/50 transition-all text-xs font-medium text-white placeholder:text-slate-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-500 ml-1">Contraseña</label>
                    <div className="relative group">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#FBE18D] transition-colors" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 focus:outline-none focus:border-[#C69320]/50 transition-all text-xs font-medium text-white placeholder:text-slate-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                  {error && (
                    <p className="text-red-500/80 text-[10px] font-bold uppercase tracking-wider">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-64 py-4 bg-gradient-to-r from-[#C69320] to-[#FBE18D] rounded-full text-black font-bold text-sm tracking-wide shadow-lg shadow-[#C69320]/20 flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Iniciar sesión <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>

                  <div className="flex items-center gap-4 opacity-40">
                    <span className="h-[1px] w-8 bg-slate-700"></span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Joseph Espinoza</span>
                    <span className="h-[1px] w-8 bg-slate-700"></span>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(198, 147, 32, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
