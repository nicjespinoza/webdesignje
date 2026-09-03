"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <p className="text-red-400 text-xs font-medium mt-1 flex items-center gap-1">
      <AlertCircle size={12} /> {message}
    </p>
  );
}
