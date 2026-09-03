"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
              i < currentStep
                ? 'bg-gradient-to-r from-[#C69320] to-[#FBE18D] text-black'
                : i === currentStep
                ? 'bg-[#C69320]/20 border border-[#C69320] text-[#FBE18D]'
                : 'bg-white/5 border border-white/10 text-slate-500'
            }`}
          >
            {i < currentStep ? <Check size={14} /> : i + 1}
          </motion.div>
          {i < steps.length - 1 && (
            <div className={`h-px w-8 md:w-12 transition-colors duration-300 ${
              i < currentStep ? 'bg-[#C69320]' : 'bg-white/10'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
