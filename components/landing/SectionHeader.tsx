"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/landing/animations';

interface SectionHeaderProps {
  badge?: { icon: React.ReactNode; text: string };
  title: React.ReactNode;
  subtitle: string;
  className?: string;
}

export default function SectionHeader({ badge, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className={`flex flex-col items-center mb-16 ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-xs font-bold mb-4 group">
          <span className="text-slate-300 group-hover:text-[#FBE18D] transition-colors">{badge.icon}</span>
          <span className="gradient-text-platinum group-hover:gradient-text transition-all">{badge.text}</span>
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        {title}
      </h2>
      
      <p className="gradient-text-platinum mt-4 max-w-3xl text-center opacity-80">
        {subtitle}
      </p>
    </motion.div>
  );
}
