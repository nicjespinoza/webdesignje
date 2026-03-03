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

const BlogSection = () => {
  return (
    <>
      <section id="blog" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center mb-16 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4 shadow-[0_0_20px_rgba(198,147,32,0.2)]">
              <BookOpen size={14} /> Technical Writing
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-center text-white tracking-tight">
              Latest <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-center text-lg">
              Thoughts on software architecture, modern frontend development, and the future of the web.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="liquid-gold-card cursor-pointer group"
              >
                <div className="liquid-gold-content h-full">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#FBE18D] transition-colors">{post.title}</h3>

                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[#C69320]/30 text-[#C69320] rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-[#FBE18D] hover:text-white transition-colors">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section >
    </>
  );
};

export default BlogSection;
