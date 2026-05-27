'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { Language } from '@/components/landing/types';
import Logo from '@/components/ui/Logo';

const Navbar = ({
  isDark,
  lang,
  toggleLang
}: {
  isDark: boolean;
  lang: Language;
  toggleLang: (lang: Language) => void;
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: Language[] = ['es', 'en', 'fr', 'zh'];

  const languageConfig: Record<Language, { name: string, flagCode: string }> = {
    es: { name: 'Español', flagCode: 'ni' },
    en: { name: 'English', flagCode: 'us' },
    fr: { name: 'Français', flagCode: 'fr' },
    zh: { name: '繁體中文', flagCode: 'cn' }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3 shadow-lg backdrop-blur-md' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <Logo isDark={isDark} size={64} />
          <div className="leading-none flex flex-col">
            <span className="text-2xl font-bold tracking-tight gradient-text transition hover:brightness-125 font-sans">Joseph Espinoza</span>
            <span className="text-xs font-medium tracking-[0.2em] text-slate-300 font-sans lowercase italic opacity-80">Web Design</span>
          </div>
        </a>

        {/* Desktop Language Selector Linear */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 p-1 glass-panel rounded-full border border-white/5 bg-white/5 shadow-inner">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => toggleLang(l)}
                aria-pressed={lang === l}
                title={languageConfig[l].name}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-300 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69320] ${
                  lang === l 
                  ? 'bg-[#C69320] shadow-[0_0_15px_rgba(198,147,32,0.4)]' 
                  : 'hover:bg-white/10'
                }`}
              >
                <div className="relative">
                  <Image 
                    src={`https://flagcdn.com/w40/${languageConfig[l].flagCode}.png`} 
                    alt={languageConfig[l].name}
                    width={20}
                    height={15}
                    className={`rounded-sm object-cover transition-all ${lang === l ? 'scale-110 shadow-lg' : 'grayscale-[0.3] group-hover:grayscale-0'}`} 
                  />
                </div>
                <span className={`text-[10px] font-bold tracking-wider uppercase transition-colors ${lang === l ? 'text-black' : 'text-slate-400 group-hover:text-white'}`}>
                  {languageConfig[l].name.split(' ')[0]}
                </span>
                
                {lang === l && (
                  <motion.div 
                    layoutId="activeLangIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FBE18D] rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <a href="#contact" className="liquid-gold-card !rounded-full !h-auto">
            <div className="liquid-gold-content !py-2 !px-6 !rounded-full">
              <span className="gradient-text font-bold text-sm whitespace-nowrap">
                {t('nav.contact', { lng: lang })}
              </span>
            </div>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69320] rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={t('nav.toggleMenu', { lng: lang }) || 'Toggle Menu'}
          title={t('nav.toggleMenu', { lng: lang }) || 'Toggle Menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel border-t border-white/10 overflow-hidden bg-[#020202]/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-[-10px] px-1">
                {t('nav.toggleLanguage', { lng: lang }) || 'Select Language'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      toggleLang(l);
                      setIsOpen(false);
                    }}
                    aria-pressed={lang === l}
                    className={`flex items-center bg-white/5 gap-3 px-4 py-3 border border-white/10 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69320] ${lang === l ? 'border-[#C69320] text-[#FBE18D] bg-[#FBE18D]/5' : 'text-slate-300'}`}
                  >
                    <Image 
                      src={`https://flagcdn.com/w40/${languageConfig[l].flagCode}.png`} 
                      alt=""
                      width={20}
                      height={15}
                      className="rounded-sm object-cover" 
                    />
                    {languageConfig[l].name}
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/10 w-full"></div>

              <div className="flex gap-4">
                <a 
                  href="#contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-[#C69320] text-black font-bold text-sm px-4 py-3 rounded-xl text-center hover:bg-[#FBE18D] transition-all"
                >
                  {t('nav.contact', { lng: lang })}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
