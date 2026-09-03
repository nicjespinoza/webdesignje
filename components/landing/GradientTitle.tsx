"use client";

import React from 'react';

interface GradientTitleProps {
  text: string;
  className?: string;
}

export default function GradientTitle({ text, className = '' }: GradientTitleProps) {
  const parts = text.split(' ');
  
  if (parts.length <= 1) {
    return <span className={`gradient-text ${className}`}>{text}</span>;
  }

  const first = parts[0];
  const rest = parts.slice(1).join(' ');

  return (
    <>
      <span className={`text-white ${className}`}>{first}</span>{' '}
      <span className={`gradient-text ${className}`}>{rest}</span>
    </>
  );
}
