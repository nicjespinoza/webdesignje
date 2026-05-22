"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isAdminUser } from '@/lib/authz';
import { toast } from 'sonner'; // o react-hot-toast si es lo que usan

const LoginAdminPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const allowed = await isAdminUser(user);
      if (!allowed) {
        await auth.signOut();
        toast.error('Acceso denegado. Solo el administrador autorizado puede ingresar.');
        return;
      }
      toast.success('Acceso autorizado');
      router.push('/admin');
    } catch (error: unknown) {
      console.error(error);
      toast.error('Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C69320]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FBE18D]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 p-6"
      >
        <div className="liquid-gold-card">
          <div className="liquid-gold-content p-8 flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-2xl bg-black/50 border border-[#C69320]/30 shadow-[0_0_30px_rgba(198,147,32,0.2)] flex items-center justify-center mb-6">
              <ShieldCheck className="text-[#FBE18D]" size={32} />
            </div>

            <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">Portal de Administración</h1>
            <p className="text-slate-400 text-sm text-center mb-8 font-sans">Acceso restringido únicamente para personal autorizado.</p>

            <form onSubmit={handleLogin} className="w-full space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} /> Correo Electrónico
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors font-sans" 
                  placeholder="admin@webdesignje.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Lock size={14} /> Contraseña
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors font-sans" 
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#C69320] to-[#FBE18D] hover:brightness-110 disabled:opacity-70 text-black rounded-xl font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(198,147,32,0.3)] mt-4"
              >
                {isLoading ? 'Autenticando...' : 'Ingresar al Dashboard'}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginAdminPage;
