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

export type Language = 'ES' | 'EN';