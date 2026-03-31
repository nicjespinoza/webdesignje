// ============================================================
// Types para el Portafolio de Joseph Espinoza
// Definiciones de interfaces usadas en el portafolio original
// ============================================================

import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  longDescription?: string;
  features?: string[];
}

export interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools';
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export type Language = 'es' | 'en' | 'fr' | 'zh';

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
