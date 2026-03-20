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

const RAGSection = () => {
  return (
    <section id="rag" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4">
            <DatabaseZap size={14} /> OpenClaw Ecosystem
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-center">
            Arquitectura <span className="gradient-text">RAG: El Cerebro Detrás de OpenClaw</span>
          </h3>
          <p className="gradient-text-platinum mt-4 max-w-4xl text-center">
            La arquitectura que permite a OpenClaw, NanoClaw y Manus AI acceder a tu conocimiento empresarial y generar respuestas precisas en tiempo real.
          </p>

          {/* Product Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['OpenClaw', 'OpenClaude', 'NanoClaw', 'ZeroClaw', 'Manus AI'].map((product) => (
              <span key={product} className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#B8860B] via-[#C69320] to-[#B8860B] text-white rounded-full shadow-[0_0_20px_rgba(184,134,11,0.5)] hover:shadow-[0_0_35px_rgba(198,147,32,0.7)] transition-all duration-300">
                {product}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="visible"
          animate="visible"
          className="relative z-10"
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Database size={32} />
                </div>
                <h4 className="font-bold mb-2">Base de Conocimiento Vectorizada</h4>
                <p className="text-sm text-slate-400">Tus documentos, manuales y datos convertidos en embeddings. OpenClaw los indexa y recupera en milisegundos.</p>
              </div>

              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Search size={32} />
                </div>
                <h4 className="font-bold mb-2">Búsqueda Semántica Inteligente</h4>
                <p className="text-sm text-slate-400">No solo keywords: OpenClaw entiende el significado detrás de cada pregunta para recuperar el contexto exacto.</p>
              </div>

              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Sparkles size={32} />
                </div>
                <h4 className="font-bold mb-2">Generación de Respuestas con Contexto</h4>
                <p className="text-sm text-slate-400">OpenClaw combina lo recuperado con GPT-4/Claude para entregar respuestas precisas, citando fuentes y evitando alucinaciones.</p>
              </div>

              <div className="text-center">
                <div className="bg-[#FBE18D]/10 p-4 rounded-xl text-[#FBE18D] w-fit mx-auto mb-4">
                  <Briefcase size={32} />
                </div>
                <h4 className="font-bold mb-2">Casos de Uso Reales</h4>
                <p className="text-sm text-slate-400">Soporte técnico (80% menos tickets), onboarding de empleados, análisis legal y médico, e-commerce inteligente.</p>
              </div>
            </div>

            {/* Pipeline Visual - Línea Segmentada entre Iconos */}
            <div className="relative py-8">
              {/* 4 Puntos del Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-20">
                {/* Punto 1: Documentos */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Círculo principal */}
                  <div className="relative mb-6">
                    {/* Glow exterior dinámico */}
                    <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    {/* Círculo con borde animado */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent border-2 border-blue-500/50 rounded-full flex items-center justify-center group hover:border-blue-400/80 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-sm"
                    >
                      {/* Anillo giratorio 1 */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-blue-400/30 rounded-full"
                      />

                      {/* Anillo giratorio 2 (Inverso) */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-blue-400/10 rounded-full"
                      />

                      {/* Icono central */}
                      <div className="bg-blue-500/30 p-3 md:p-4 rounded-full text-blue-400 group-hover:text-blue-200 transition-colors duration-300">
                        <FileText size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Contenido */}
                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-blue-400 text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Documentos</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Tus datos en cualquier formato: PDF, DOCX, TXT, bases de datos</p>
                  </div>
                </motion.div>

                {/* Punto 2: Vectorización */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-transparent border-2 border-purple-500/50 rounded-full flex items-center justify-center group hover:border-purple-400/80 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2.5 }}
                        className="absolute inset-0 border-2 border-dashed border-purple-400/30 rounded-full"
                      />

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-purple-400/10 rounded-full"
                      />

                      <div className="bg-purple-500/30 p-3 md:p-4 rounded-full text-purple-400 group-hover:text-purple-200 transition-colors duration-300">
                        <Gem size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                      </div>
                    </motion.div>
                  </div>

                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-purple-400 text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Vectorización</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Embeddings de alta dimensión para búsqueda semántica eficiente</p>
                  </div>
                </motion.div>

                {/* Punto 3: OpenClaw RAG */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-[#C69320]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[#C69320]/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#C69320]/30 via-[#FBE18D]/20 to-transparent border-2 border-[#C69320]/60 rounded-full flex items-center justify-center group hover:border-[#C69320]/90 transition-all duration-300 shadow-[0_0_40px_rgba(198,147,32,0.5)] backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 5 }}
                        className="absolute inset-0 border-2 border-dashed border-[#FBE18D]/40 rounded-full"
                      />

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-[#FBE18D]/10 rounded-full"
                      />

                      <motion.div
                        animate={{ scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="bg-[#C69320]/30 p-3 md:p-4 rounded-full text-[#FBE18D] group-hover:text-yellow-100 transition-colors duration-300"
                      >
                        <Brain size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_10px_#C69320]" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-[#FBE18D] text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(198,147,32,0.5)]">OpenClaw RAG</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Recuperación semántica inteligente con contexto preciso y fuentes</p>
                  </div>
                </motion.div>

                {/* Punto 4: Respuesta */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-green-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full scale-125 group-hover:scale-150 transition-transform duration-700" />

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500/20 via-green-600/10 to-transparent border-2 border-green-500/50 rounded-full flex items-center justify-center group hover:border-green-400/80 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 7.5 }}
                        className="absolute inset-0 border-2 border-dashed border-green-400/30 rounded-full"
                      />

                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 border border-green-400/10 rounded-full"
                      />

                      <motion.div
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-green-500/30 p-3 md:p-4 rounded-full text-green-400 group-hover:text-green-200 transition-colors duration-300"
                      >
                        <Sparkles size={28} className="md:w-8 md:h-8 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="text-center px-4 transition-transform group-hover:scale-105 duration-300">
                    <h5 className="font-bold text-green-400 text-base md:text-lg mb-2 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">Respuesta</h5>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Respuesta contextual con fuentes verificables y citas precisas</p>
                  </div>
                </motion.div>
              </div>

              {/* Líneas segmentadas entre iconos (EN EL CENTRO) - Viaje Continuo */}
              <div className="hidden md:block absolute top-[80px] left-0 right-0 h-0 pointer-events-none z-10">
                {/* Segmento 1: Documentos → Vectorización */}
                <div className="absolute left-[12.5%] right-[62.5%] top-0 -translate-y-1/2 px-10">
                  {/* Línea base */}
                  <div className="h-[2px] bg-blue-500/10 rounded-full overflow-visible relative">
                    {/* Línea animada que se llena */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    />

                    {/* Partícula que viaja continuamente ida y vuelta */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      transition={{
                        delay: 0.5,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-30"
                    >
                      <div className="w-full h-full bg-blue-300 rounded-full shadow-[0_0_15px_#93C5FD,0_0_30px_#60A5FA,0_0_45px_#3B82F6]" />
                      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50" />
                    </motion.div>
                  </div>
                </div>

                {/* Segmento 2: Vectorización → OpenClaw RAG */}
                <div className="absolute left-[37.5%] right-[37.5%] top-0 -translate-y-1/2 px-10">
                  {/* Línea base */}
                  <div className="h-[2px] bg-purple-500/10 rounded-full overflow-visible relative">
                    {/* Línea animada que se llena */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.7, duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-[#C69320] shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                    />
                    {/* Partícula que viaja continuamente ida y vuelta */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      transition={{
                        delay: 1.7,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-30"
                    >
                      <div className="w-full h-full bg-purple-300 rounded-full shadow-[0_0_15px_#E9D5FF,0_0_30px_#C084FC,0_0_45px_#A855F7]" />
                      <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-50" />
                    </motion.div>
                  </div>
                </div>

                {/* Segmento 3: OpenClaw RAG → Respuesta */}
                <div className="absolute left-[62.5%] right-[12.5%] top-0 -translate-y-1/2 px-10">
                  {/* Línea base */}
                  <div className="h-[2px] bg-[#C69320]/10 rounded-full overflow-visible relative">
                    {/* Línea animada que se llena */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.9, duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-[#C69320] via-[#FBE18D] to-green-500 shadow-[0_0_20px_rgba(198,147,32,0.8)]"
                    />
                    {/* Partícula que viaja continuamente ida y vuelta */}
                    <motion.div
                      initial={{ left: '0%' }}
                      animate={{ left: '100%' }}
                      transition={{
                        delay: 2.9,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-30"
                    >
                      <div className="w-full h-full bg-[#FDE68A] rounded-full shadow-[0_0_15px_#FBE18D,0_0_30px_#FACC15,0_0_45px_#C69320]" />
                      <div className="absolute inset-0 bg-[#FBE18D] rounded-full animate-ping opacity-50" />
                    </motion.div>
                  </div>
                </div>

                {/* Puntos de conexión en el centro de cada icono con pulso */}
                <div className="absolute left-[12.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_25px_rgba(59,130,246,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-500 rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="absolute left-[37.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_25px_rgba(168,85,247,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      className="absolute inset-0 bg-purple-500 rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="absolute left-[62.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-[#C69320] rounded-full shadow-[0_0_25px_rgba(198,147,32,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      className="absolute inset-0 bg-[#C69320] rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="absolute left-[87.5%] top-0 -translate-y-1/2 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="relative"
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_25px_rgba(34,197,94,1)] z-40 relative" />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="absolute inset-0 bg-green-500 rounded-full"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RAGSection;
