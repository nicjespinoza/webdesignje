import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Brain, Bot, Sparkles, Network, FileText, Gem, Database, 
  Search, CheckCircle, Smartphone, Activity 
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/components/landing/animations';

const SmartEnterpriseSection = () => {
  return (
    <section id="ai-rag" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER (Basado en AISection) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C69320] bg-[#FBE18D]/10 text-[#FBE18D] text-xs font-bold mb-4 shadow-[0_0_15px_rgba(198,147,32,0.2)]">
            <Cpu size={14} /> Inteligencia Empresarial Total
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-6">
            No solo es IA, <span className="gradient-text">es la Inteligencia de tu Empresa trabajando</span>
          </h2>
          <p className="gradient-text-platinum mt-2 max-w-3xl text-center text-lg leading-relaxed">
            Fusionamos el procesamiento de lenguaje natural avanzado con arquitecturas de recuperación de datos (RAG) para crear sistemas que no solo hablan, sino que conocen tu negocio a fondo.
          </p>
        </motion.div>

        {/* --- MÉTRICAS DE COMPETENCIA (De AISection) --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {[
            {
              icon: Brain,
              title: "PLN Avanzado",
              description: "Análisis semántico y respuesta contextual en múltiples idiomas con precisión quirúrgica.",
              level: 95
            },
            {
              icon: Bot,
              title: "Agentes Autónomos",
              description: "Sistemas OpenClaw que gestionan procesos, citas y pedidos sin supervisión constante.",
              level: 88
            },
            {
              icon: Sparkles,
              title: "ML Predictivo",
              description: "Anticipamos tendencias y comportamientos de usuarios transformando datos en estrategia.",
              level: 92
            },
            {
              icon: Network,
              title: "Deep Learning",
              description: "Entrenamiento de modelos a medida utilizando tus datasets específicos y privados.",
              level: 85
            }
          ].map((skill) => (
            <motion.div
              key={skill.title}
              variants={fadeInUp}
              className="liquid-gold-card group h-full"
            >
              <div className="liquid-gold-content text-center flex flex-col items-center h-full">
                <div className="bg-[#FBE18D]/10 p-3 rounded-xl text-[#FBE18D] mb-4 group-hover:scale-110 transition-transform">
                  <skill.icon size={26} />
                </div>
                <h4 className="font-bold text-white mb-2">{skill.title}</h4>
                <p className="text-sm text-slate-400 mb-6 flex-grow">{skill.description}</p>
                
                <div className="w-full">
                  <div className="flex justify-between mb-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <span>Eficiencia</span>
                    <span className="text-white">{skill.level}%</span>
                  </div>
                  <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute h-full bg-gradient-to-r from-[#C69320] to-[#FBE18D] rounded-full shadow-[0_0_10px_#C69320]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- TUBERÍA RAG (Visual Flow de RAGSection) --- */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4">Pipeline Inteligente de Datos</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">Visualiza cómo tus datos se transforman en conocimiento listo para ser consumido por tu IA corporativa.</p>
          </div>

          <div className="relative py-12">
            {/* 4 Puntos del Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-20">
              {/* Punto 1: Documentos */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent border-2 border-blue-500/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-md">
                    <div className="bg-blue-500/30 p-4 rounded-full text-blue-400">
                      <FileText size={32} className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                  </div>
                </div>
                <div className="text-center px-4">
                  <h5 className="font-bold text-blue-400 text-lg mb-2">Documentos</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">PDFs, Bases de Datos y Manuales Corporativos</p>
                </div>
              </motion.div>

              {/* Punto 2: Vectorización */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-transparent border-2 border-purple-500/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-md">
                    <div className="bg-purple-500/30 p-4 rounded-full text-purple-400">
                      <Gem size={32} className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    </div>
                  </div>
                </div>
                <div className="text-center px-4">
                  <h5 className="font-bold text-purple-400 text-lg mb-2">Vectorización</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">Embeddings de alta fidelidad para búsqueda semántica</p>
                </div>
              </motion.div>

              {/* Punto 3: OpenClaw RAG */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-[#C69320]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-[#C69320]/30 via-[#FBE18D]/20 to-transparent border-2 border-[#C69320]/60 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(198,147,32,0.5)] backdrop-blur-md">
                    <div className="bg-[#C69320]/30 p-4 rounded-full text-[#FBE18D]">
                      <Brain size={32} className="drop-shadow-[0_0_10px_#C69320]" />
                    </div>
                  </div>
                </div>
                <div className="text-center px-4">
                  <h5 className="font-bold text-[#FBE18D] text-lg mb-2">OpenClaw RAG</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">Recuperación contextual con fuentes verificables</p>
                </div>
              </motion.div>

              {/* Punto 4: Respuesta */}
              <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-green-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-green-500/20 via-green-600/10 to-transparent border-2 border-green-500/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-md">
                    <div className="bg-green-500/30 p-4 rounded-full text-green-400">
                      <Sparkles size={32} className="drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    </div>
                  </div>
                </div>
                <div className="text-center px-4">
                  <h5 className="font-bold text-green-400 text-lg mb-2">Respuesta</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">Generación de valor real para el usuario final</p>
                </div>
              </motion.div>
            </div>

            {/* Líneas animadas entre puntos (Desktop Only) */}
            <div className="hidden md:block absolute top-[96px] left-0 right-0 h-0 pointer-events-none z-10">
              <div className="absolute left-[12.5%] right-[62.5%] top-0 -translate-y-1/2 px-10">
                <div className="h-[2px] bg-blue-500/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-blue-500/50 shadow-[0_0_10px_#3B82F6]" 
                  />
                </div>
              </div>
              <div className="absolute left-[37.5%] right-[37.5%] top-0 -translate-y-1/2 px-10">
                <div className="h-[2px] bg-purple-500/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-purple-500/50 shadow-[0_0_10px_#A855F7]" 
                  />
                </div>
              </div>
              <div className="absolute left-[62.5%] right-[12.5%] top-0 -translate-y-1/2 px-10">
                <div className="h-[2px] bg-[#C69320]/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="h-full bg-[#C69320]/50 shadow-[0_0_10px_#C69320]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SmartEnterpriseSection;
