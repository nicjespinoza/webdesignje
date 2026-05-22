import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Cpu, Network } from 'lucide-react';
import { fadeInUp } from '@/components/landing/animations';

const AISection = () => {
  return (
    <section id="ai" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320]/20 bg-[#FBE18D]/5 text-[#FBE18D] text-xs font-bold mb-4 tracking-widest uppercase shadow-inner">
            <Sparkles size={14} className="fill-[#F5D76E]" /> AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-white">Potenciado con</span>{' '}
            <span className="gradient-text">Inteligencia Artificial</span>
          </h2>
          <p className="text-[#E5E7EB] max-w-2xl mx-auto text-lg opacity-80">
            Modelos de lenguaje, agents autónomos y automatización inteligente integrados en cada solución.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { icon: Bot, title: 'Agentes IA', desc: 'Chatbots inteligentes que entienden el contexto de tu negocio.' },
            { icon: Cpu, title: 'Automatización', desc: 'Workflows automatizados que reducen costos operativos.' },
            { icon: Network, title: 'RAG', desc: 'Búsqueda semántica en tu propia base de conocimiento.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8 }}
              className="liquid-gold-card"
            >
              <div className="liquid-gold-content text-center p-8">
                <item.icon size={40} className="mx-auto mb-4 text-[#FBE18D]" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISection;
