const fs = require('fs');
const path = require('path');

const srcPath = 'app/page.tsx';
const destFolder = 'src/components/landing';
const content = fs.readFileSync(srcPath, 'utf-8');
const lines = content.split('\n');

const components = [
    { name: 'Navbar', start: 106, end: 214 }, // zero-indexed bounds
    { name: 'StackSection', start: 216, end: 334 },
    { name: 'ServicesSection', start: 336, end: 392 },
    { name: 'AISection', start: 394, end: 522 },
    { name: 'RAGSection', start: 524, end: 951 },
    { name: 'ProjectsSection', start: 953, end: 1019 },
    { name: 'AboutSection', start: 1021, end: 1127 },
    { name: 'Hero', start: 1130, end: 1294 }
];

const implicitComponents = [
    { name: 'BlogSection', start: 1337, end: 1396 },
    { name: 'ContactSection', start: 1399, end: 1462 },
    { name: 'FooterSection', start: 1465, end: 1500 }
];

const commonImports = `import React, { useState, useEffect } from 'react';
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
import Logo from '@/src/components/ui/Logo';
import { categories, proficiency, projects, blogPosts, contactSchema, services } from '@/src/data/constants';
import { fadeInUp, staggerContainer, scaleIn } from '@/src/components/landing/animations';

`;

fs.mkdirSync(destFolder, { recursive: true });

// Process explicit components
components.forEach(comp => {
    const compLines = lines.slice(comp.start, comp.end + 1).join('\n');
    const fileContent = commonImports + compLines + '\n\nexport default ' + comp.name + ';\n';
    fs.writeFileSync(path.join(destFolder, comp.name + '.tsx'), fileContent);
});

// Process implicit components
implicitComponents.forEach(comp => {
    const compLines = lines.slice(comp.start, comp.end + 1).join('\n');
    const fileContent = commonImports + 'const ' + comp.name + ' = () => {\n  return (\n    <>\n' + compLines + '\n    </>\n  );\n};\n\nexport default ' + comp.name + ';\n';
    fs.writeFileSync(path.join(destFolder, comp.name + '.tsx'), fileContent);
});

// Write animations file
const animationsLines = lines.slice(75, 104).join('\n').replace(/const /g, 'export const ');
fs.writeFileSync(path.join(destFolder, 'animations.ts'), 'import { Variants } from "framer-motion";\n\n' + animationsLines + '\n');

// Rewrite main App file
const newAppLines = lines.slice(0, 75).concat(['import Navbar from "@/src/components/landing/Navbar";',
    'import StackSection from "@/src/components/landing/StackSection";',
    'import ServicesSection from "@/src/components/landing/ServicesSection";',
    'import AISection from "@/src/components/landing/AISection";',
    'import RAGSection from "@/src/components/landing/RAGSection";',
    'import ProjectsSection from "@/src/components/landing/ProjectsSection";',
    'import AboutSection from "@/src/components/landing/AboutSection";',
    'import Hero from "@/src/components/landing/Hero";',
    'import BlogSection from "@/src/components/landing/BlogSection";',
    'import ContactSection from "@/src/components/landing/ContactSection";',
    'import FooterSection from "@/src/components/landing/FooterSection";',
    '']);

newAppLines.push(...lines.slice(1296, 1329));
newAppLines.push('      <Navbar isDark={isDark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />');
newAppLines.push('      <Hero lang={lang} router={router} />');
newAppLines.push('      <ServicesSection />');
newAppLines.push('      <StackSection />');
newAppLines.push('      <AISection />');
newAppLines.push('      <RAGSection />');
newAppLines.push('      <ProjectsSection />');
newAppLines.push('      <AboutSection />');
newAppLines.push('      <BlogSection />');
newAppLines.push('      <ContactSection />');
newAppLines.push('      <FooterSection />');
newAppLines.push('    </div>');
newAppLines.push('  );');
newAppLines.push('}');
newAppLines.push('');

fs.writeFileSync(srcPath, newAppLines.join('\n'));
console.log('Refactoring complete!');
