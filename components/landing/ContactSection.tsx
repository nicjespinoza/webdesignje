import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Github, ExternalLink, Menu, X, Sun, Moon, Code2, ChevronDown, ArrowRight,
  Calendar, Clock, BookOpen, Send, User, Briefcase, Award, Terminal, Layers,
  Atom, Blocks, Zap, Box, Wind, Hash, FileCode, ClipboardList, ShieldCheck,
  BarChart3, FileText, FileCog, Activity, Server, DatabaseZap, Flame, Database,
  Table, Container, Package, Star, Cloud, Smartphone, Globe, Cpu, Brain, Bot,
  Sparkles, Network, CheckCircle, Search, Linkedin, Twitter, Gem, ArrowRightLeft
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import GlobalParticles from '@/components/landing/GlobalParticles';
import { Project, Language, BlogPost, ContactFormValues } from '@/components/landing/types';
import Logo from '@/components/medical/ui/Logo';
import { categories, proficiency, projects, blogPosts, contactSchema, services } from '@/data/constants';
import { fadeInUp, staggerContainer, scaleIn } from '@/components/landing/animations';

const ContactSection = () => {
  return (
    <>
      < section id="contact" className="py-20 relative" >
        <div className="container mx-auto px-6 max-w-4xl">
          <div
            className="liquid-gold-card relative z-10"
          >
            <div className="liquid-gold-content p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Get In <span className="gradient-text">Touch</span></h2>
                <p className="text-slate-400 text-lg">Have a project in mind? Let's build something extraordinary together.</p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Tu Nombre</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors"
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Tu Email</label>
                    <input
                      type="email"
                      className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors"
                      placeholder="juan@tuempresa.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">¿Qué necesitas?</label>
                  <textarea
                    rows={5}
                    className="w-full bg-black/40 border border-[#C69320]/30 rounded-xl p-4 text-white focus:outline-none focus:border-[#FBE18D] transition-colors resize-none"
                    placeholder="Cuéntame sobre tu proyecto: tipo de negocio, funcionalidades que necesitas, timeline estimado..."
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <CheckCircle className="text-[#FBE18D]" size={16} />
                    Respuesta en menos de 2 horas
                  </p>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-gradient-to-r from-[#C69320] to-[#FBE18D] hover:brightness-110 text-black rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#C69320]/40 text-lg group"
                  >
                    🚀 Recibir Cotización Gratis
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              <div className="mt-12 flex justify-center gap-8 border-t border-[#C69320]/20 pt-8">
                <a href="#" className="text-slate-400 hover:text-[#FBE18D] transition-colors"><Github size={24} /></a>
                <a href="#" className="text-slate-400 hover:text-[#FBE18D] transition-colors"><Linkedin size={24} /></a>
                <a href="#" className="text-slate-400 hover:text-[#FBE18D] transition-colors"><Twitter size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
