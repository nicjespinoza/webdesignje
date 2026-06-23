'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Language } from '@/components/landing/types';
import { fadeInUp, staggerContainer } from './animations';

interface Client {
  id: number;
  name: string;
  logo: string;
  url: string;
  testimonialKey?: string;
}

const clients: Client[] = [
  { id: 1, name: 'Dr. Ludwing Bacon', logo: '/logos/bacon.png', url: 'https://www.drludwingbacon.com', testimonialKey: 'clients.testimonials.1' },
  { id: 2, name: 'Dr. Carlos Hernandez', logo: '/logos/carlos.png', url: 'https://www.drcarloshernandez.com/', testimonialKey: 'clients.testimonials.2' },
  { id: 3, name: 'Dr. Milton Mairena', logo: '/logos/milton.jpg', url: 'https://www.cenlae.com', testimonialKey: 'clients.testimonials.3' },
  { id: 4, name: 'Dr. Horacio Aleman', logo: '/logos/horacio.png', url: 'https://www.drhoraciouro.com', testimonialKey: 'clients.testimonials.4' },
  { id: 5, name: 'Dra. Taki Moreno', logo: '/logos/takimoreno.png', url: 'https://www.dratakimoreno.com', testimonialKey: 'clients.testimonials.5' },
  { id: 6, name: 'Dra. Veronica Aviles', logo: '/logos/veronica.png', url: 'https://www.draveronicaaviles.com', testimonialKey: 'clients.testimonials.6' },
  { id: 7, name: 'Dra. Hellen Araya', logo: '/logos/helen.png', url: 'https://www.hellenaraya.com', testimonialKey: 'clients.testimonials.7' },
  { id: 8, name: 'Dra. Sylvia Bravo', logo: '/logos/sylvia.avif', url: 'https://www.drasylviabravo.com', testimonialKey: 'clients.testimonials.8' },
  { id: 9, name: 'Dra. Martha Cortes', logo: '/logos/martha1.jpeg', url: 'https://www.marthacortes.com', testimonialKey: 'clients.testimonials.9' },
  { id: 10, name: 'Dr. Roberto Zapata', logo: '/logos/zapata.png', url: 'https://www.drrobertozapata.com', testimonialKey: 'clients.testimonials.10' },
  { id: 11, name: 'Clinica SAVIM', logo: '/logos/savim.png', url: 'https://www.clinicasavim.com', testimonialKey: 'clients.testimonials.11' },
  { id: 12, name: 'Senos Boutique', logo: '/logos/senos.png', url: 'https://www.senosboutique.com', testimonialKey: 'clients.testimonials.12' },
  { id: 13, name: 'NISA Natural', logo: '/logos/nisa.png', url: 'https://www.nisanatural.com', testimonialKey: 'clients.testimonials.13' },
  { id: 14, name: 'Fiore Logistics', logo: '/logos/fiore.png', url: 'https://www.fiorelogistics.com', testimonialKey: 'clients.testimonials.14' },
  { id: 15, name: 'Kathmar Freight Logistics Services', logo: '/logos/kathmark.png', url: 'https://www.kathmarfreight.com', testimonialKey: 'clients.testimonials.15' },
];

const ClientsSection = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation();

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320]/20 bg-[#FBE18D]/5 text-[#FBE18D] text-xs font-bold mb-4 tracking-widest uppercase shadow-inner">
            <Star size={14} className="fill-[#F5D76E]" /> {t('clients.badge', { lng: lang })}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {(() => {
              const fullTitle = t('clients.title', { lng: lang });
              if (fullTitle.includes(' ')) {
                const parts = fullTitle.split(' ');
                const first = parts[0];
                const rest = parts.slice(1).join(' ');
                return <><span className="text-white">{first}</span> <span className="gradient-text">{rest}</span></>;
              }
              return <span className="gradient-text">{fullTitle}</span>;
            })()}
          </h2>
          <p className="text-[#E5E7EB] mt-2 max-w-2xl text-lg opacity-80">
            {t('clients.subtitle', { lng: lang })}
          </p>
        </motion.div>

        {/* Grid de Clientes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
              onClick={() => window.open(client.url, '_blank')}
            >
              <div className="liquid-gold-content !p-8 flex flex-col items-center justify-between h-full">
                {/* Logo Container con Fondo Blanco */}
                <div className="w-36 h-36 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative w-28 h-28 flex items-center justify-center group-hover:brightness-110 transition-all duration-500">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={80}
                      height={80}
                      className="object-contain max-h-20 scale-110 group-hover:scale-[1.2] transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="text-center w-full flex flex-col items-center flex-grow">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:gradient-text transition-colors duration-300 min-h-[56px] flex items-center justify-center">
                    {client.name}
                  </h3>

                  {/* Testimonial (si existe) */}
                  {client.testimonialKey && (
                    <div className="mb-4 px-2">
                      <div className="flex items-center justify-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="fill-[#FBE18D] text-[#FBE18D]" />
                        ))}
                      </div>
                      <p className="text-[11px] text-[#FBE18D] leading-relaxed">
                        &ldquo;{t(client.testimonialKey, { lng: lang })}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-[#E8B923] hover:text-[#F5D76E] transition-colors group/link mt-auto">
                    <span>{t('clients.visit', { lng: lang })}</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
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
