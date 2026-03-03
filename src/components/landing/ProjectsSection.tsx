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

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
            <Code2 size={14} /> Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-center text-lg">
            Real-world applications showcasing modern development practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="liquid-gold-card cursor-pointer group"
              onClick={() => window.open(project.demoUrl || '#', '_blank')}
            >
              <div className="liquid-gold-content p-0">
                <div
                  className="h-48 bg-cover bg-center relative group overflow-hidden"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <ExternalLink className="text-[#FBE18D]" size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#FBE18D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 border border-[#C69320]/30 text-[#C69320] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <ExternalLink className="text-[#FBE18D]" size={18} />
                    <span className="text-xs text-slate-500 font-mono">LIVE DEMO</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
