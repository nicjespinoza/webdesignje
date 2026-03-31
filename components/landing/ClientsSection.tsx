'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

import { fadeInUp, staggerContainer } from './animations';

interface Client {
  id: number;
  name: string;
  logo: string;
  url: string;
}

const clients: Client[] = [
  { id: 1, name: 'Aureo Travel', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 2, name: 'Vital Care Medical', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 3, name: 'Luxe Properties', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 4, name: 'Quantum AI Systems', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 5, name: 'Elite Logistics', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 6, name: 'Horizon Tech', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 7, name: 'Prime Health Corp', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 8, name: 'Infinity Solutions', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 9, name: 'NexGen Finance', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 10, name: 'Peak Performance', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 11, name: 'Stellar Marketing', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 12, name: 'Radiant Beauty', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 13, name: 'Global Trade Hub', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 14, name: 'Visionary Designs', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 15, name: 'Smart Analytics', logo: '/logos/logo-gold-1.webp', url: '#' },
  { id: 16, name: 'Emerald Energy', logo: '/logos/logo-gold-1.webp', url: '#' },
];

const ClientsSection = () => {
  return (
    <section id="clients" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Elegante */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C0C0C0]/20 bg-[#F5D76E]/5 text-[#F5D76E] text-xs font-bold mb-4 tracking-widest uppercase">
            <Star size={14} className="fill-[#F5D76E]" /> Alianzas Estratégicas
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Nuestros <span className="gradient-text">Clientes</span>
          </h2>
          <p className="text-[#E5E7EB] mt-2 max-w-2xl text-lg opacity-80">
            Marcas y empresas que confían en soluciones web y de inteligencia artificial premium para liderar el mercado digital.
          </p>
        </motion.div>

        {/* Grid de Clientes (16 Tarjetas) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 } 
              }}
              className="liquid-gold-card group cursor-pointer relative"
            >
              <div className="liquid-gold-content !p-8 flex flex-col items-center justify-between h-full bg-[#0A0A0A]/80 backdrop-blur-sm border-[#C0C0C0]/20 group-hover:border-[#F5D76E]/40 group-hover:shadow-[0_0_25px_rgba(245,215,110,0.2)] transition-all duration-500">
                
                {/* Logo Container Compacto con Fondo Blanco */}
                <div className="w-28 h-28 flex items-center justify-center mb-6 relative">
                   <div className="absolute inset-0 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-500" />
                   <div className="relative w-20 h-20 flex items-center justify-center group-hover:brightness-110 transition-all duration-500">
                     <Image 
                      src={client.logo} 
                      alt={client.name} 
                      width={80} 
                      height={80} 
                      className="object-contain max-h-14 scale-110 group-hover:scale-[1.2] transition-all duration-500"
                    />
                   </div>
                </div>

                <div className="text-center w-full">
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:gradient-text transition-colors duration-300">
                    {client.name}
                  </h3>
                  
                  <a 
                    href={client.url}
                    className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-[#E8B923] hover:text-[#F5D76E] transition-colors group/link"
                  >
                    <span>Ver Proyecto</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
