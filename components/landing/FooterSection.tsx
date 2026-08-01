import React from 'react';
import { Github, Facebook, Instagram } from 'lucide-react';
import { Language } from '@/components/landing/types';
import Logo from '@/components/ui/Logo';

const FooterSection = ({}: { lang: Language }) => {
  return (
    <footer className="py-12 relative z-10 border-t border-white/5 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6 relative z-10">
        
        {/* Logo (Only Logo, no text) */}
        <a href="#" className="hover:scale-105 transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none" aria-label="Volver al inicio">
          <Logo size={72} />
        </a>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-1.5 text-slate-300 text-sm md:text-base tracking-wide font-medium">
          <a href="mailto:info@webdesignje.com" className="hover:text-[#FBE18D] transition-colors">
            info@webdesignje.com
          </a>
          <a href="https://wa.me/50586010651" className="hover:text-[#FBE18D] transition-colors">
            +505 8601 0651
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-6">
          <a href="https://www.facebook.com/webdesignje/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="https://www.instagram.com/webdesignje/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://github.com/nicjespinoza" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>

        {/* Copyright Text */}
        <div className="text-[#FBE18D]/70 text-xs md:text-sm text-center">
          &copy; {new Date().getFullYear()} Joseph Espinoza - Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
