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
import GlobalParticles from '@/src/components/landing/GlobalParticles';
import { Project, Language, BlogPost, ContactFormValues } from '@/src/components/landing/types';
import Logo from '@/components/ui/Logo';
import { categories, proficiency, projects, blogPosts, contactSchema, services } from '@/src/data/constants';
import { fadeInUp, staggerContainer, scaleIn } from '@/src/components/landing/animations';

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="relative z-10 flex flex-col items-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-6">
            <User size={14} /> About
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white text-center">About <span className="gradient-text">Me</span></h2>
          <p className="text-xl text-[#FBE18D] mb-6 font-medium text-center max-w-2xl">Passionate developer crafting digital experiences with precision and creativity</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-6 relative z-10"
          >
            <motion.div variants={fadeInUp} className="liquid-gold-card">
              <div className="liquid-gold-content">
                <h3 className="text-2xl font-bold mb-4">Joseph Espinoza</h3>
                <p className="text-slate-300 mb-4">
                  Full-stack developer specializing in modern web technologies and AI-powered solutions.
                  With a passion for creating exceptional user experiences and robust backend systems.
                </p>
                <p className="text-slate-300">
                  Beyond the code, I am a digital architect obsessed with precision. My journey started not just with syntax,
                  but with a desire to build systems that feel <span className="text-white font-medium border-b border-[#FBE18D]/30 pb-0.5">alive</span>.
                </p>
                <p className="text-slate-300 mt-4">
                  I blend technical rigor with an artist's eye, ensuring every pixel serves a purpose and every function runs with elegant efficiency.
                  My philosophy is simple: <span className="text-[#FBE18D]/90">Performance is the ultimate luxury.</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {[
                { icon: Briefcase, title: "50+ Projects", subtitle: "Delivered Globally" },
                { icon: Award, title: "Award Winning", subtitle: "Design Excellence" },
                { icon: Terminal, title: "Full Stack", subtitle: "End-to-End Control" },
                { icon: User, title: "Leadership", subtitle: "Team Mentoring" }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="liquid-gold-card"
                >
                  <div className="liquid-gold-content !p-4 flex-row items-center gap-4">
                    <div className="bg-[#FBE18D]/10 p-3 rounded-lg text-[#FBE18D] group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{item.subtitle}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-panel p-8 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-[#C69320]/20 to-[#FBE18D]/20 rounded-xl flex items-center justify-center">
                <Image src="/images/Perfil_elegante.png" alt="Joseph Espinoza" width={800} height={800} className="w-full h-full object-cover rounded-xl" priority />
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 relative z-10"
        >
          {[
            { label: 'Type Safety', val: '100%', color: 'text-[#FBE18D]' },
            { label: 'Performance', val: '98/100', color: 'text-[#FBE18D]' },
            { label: 'Uptime', val: '99.9%', color: 'text-[#FBE18D]' },
            { label: 'Satisfaction', val: '100%', color: 'text-[#FBE18D]' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="glass-panel p-6 rounded-2xl text-center border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
            >
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.val}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
