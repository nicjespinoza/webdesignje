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

const FooterSection = () => {
  return (
    <>
      <footer className="py-12 relative z-10 border-t border-white/5 bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Code2 className="text-[#FBE18D] w-5 h-5" />
              <span className="text-lg font-bold tracking-tight text-slate-200">
                WebDesign<span className="text-[#FBE18D]">JE</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Joseph Espinoza.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { name: 'Stack', href: '#stack' },
              { name: 'Services', href: '#services' },
              { name: 'AI & Agents', href: '#ai' },
              { name: 'Projects', href: '#projects' },
              { name: 'About', href: '#about' },
              { name: 'Blog', href: '#blog' },
            ].map(link => (
              <a key={link.name} href={link.href} className="text-sm text-slate-400 hover:text-[#FBE18D] transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
