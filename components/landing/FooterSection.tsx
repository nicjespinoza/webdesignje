import React from 'react';
import { Code2, Github, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';

const FooterSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-12 relative z-10 border-t border-white/5 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="text-[#FBE18D] w-5 h-5" />
            <span className="text-lg font-bold tracking-tight text-slate-200">
              WebDesign<span className="text-[#FBE18D]">JE</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Joseph Espinoza.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {[
            { name: t('nav.stack', { lng: lang }), href: '#stack' },
            { name: t('nav.services', { lng: lang }), href: '#services' },
            { name: t('nav.ai', { lng: lang }), href: '#ai' },
            { name: t('nav.projects', { lng: lang }), href: '#projects' },
            { name: t('nav.about', { lng: lang }), href: '#about' },
          ].map(link => (
            <a key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-[#FBE18D] transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
