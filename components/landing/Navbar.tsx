'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { Language } from '@/components/landing/types';
import Logo from '@/components/medical/ui/Logo';

const Navbar = ({
  isDark,
  toggleTheme,
  lang,
  toggleLang
}: {
  isDark: boolean;
  toggleTheme: () => void;
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

  const [isLangOpen, setIsLangOpen] = useState(false);

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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-xs font-bold px-3 py-1.5 rounded border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 min-w-[140px] justify-between group"
            >
              <div className="flex items-center gap-2">
                <img 
                  src={`https://flagcdn.com/w40/${languageConfig[lang || 'es'].flagCode}.png`} 
                  alt="" 
                  className="w-5 h-auto rounded-sm object-cover" 
                />
                <span className="group-hover:text-[#FBE18D] transition-colors">{languageConfig[lang || 'es'].name}</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-40 glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl z-50 bg-[#020202]/90 backdrop-blur-xl"
                >
                  <div className="p-1">
                    {languages.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          toggleLang(l);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg hover:bg-[#FBE18D]/10 hover:text-[#FBE18D] transition-colors ${lang === l ? 'bg-[#FBE18D]/10 text-[#FBE18D]' : 'text-slate-300'}`}
                      >
                        <img 
                          src={`https://flagcdn.com/w40/${languageConfig[l].flagCode}.png`} 
                          alt="" 
                          className="w-5 h-auto rounded-sm object-cover" 
                        />
                        {languageConfig[l].name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-6 w-px bg-white/10"></div>

          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-300 hover:text-white focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-[#C69320]"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="#contact" className="liquid-gold-card !rounded-full !h-auto">
            <div className="liquid-gold-content !py-2 !px-6 !rounded-full">
              <span className="gradient-text font-bold text-sm whitespace-nowrap">
                {t('nav.contact')}
              </span>
            </div>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 p-2 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-[#C69320] rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={t('nav.menuToggle')}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel border-t border-white/10 overflow-hidden bg-[#020202]/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-[-10px] px-1">Seleccionar Idioma</p>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      toggleLang(l);
                      setIsOpen(false);
                    }}
                    className={`flex items-center bg-white/5 gap-3 px-4 py-3 border border-white/10 rounded-xl text-sm font-medium transition-all ${lang === l ? 'border-[#C69320] text-[#FBE18D] bg-[#FBE18D]/5' : 'text-slate-300'}`}
                  >
                    <img 
                      src={`https://flagcdn.com/w40/${languageConfig[l].flagCode}.png`} 
                      alt="" 
                      className="w-5 h-auto rounded-sm object-cover" 
                    />
                    {languageConfig[l].name}
                  </button>
                ))}
              </div>

              <div className="h-px bg-white/10 w-full"></div>

              <div className="flex gap-4">
                <button
                  onClick={toggleTheme}
                  className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-3 border border-white/10 rounded-xl text-slate-300 hover:bg-white/5 transition-all focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-[#C69320]"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />} 
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
                <a 
                  href="#contact" 
                  onClick={() => setIsOpen(false)}
                  className="flex-[1.5] bg-[#C69320] text-black font-bold text-sm px-4 py-3 rounded-xl text-center hover:bg-[#FBE18D] transition-all"
                >
                  {t('nav.contact')}
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
