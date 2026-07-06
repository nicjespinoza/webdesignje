import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from "react-i18next";
const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-16 md:pt-20 overflow-hidden bg-transparent pointer-events-none">


      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center text-center mt-6 md:mt-12 pointer-events-auto">

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.1,
            filter: "blur(50px)",
            z: -1000,
            rotateX: 60,
            y: 100
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            z: 0,
            rotateX: 0,
            y: 0
          }}
          transition={{
            duration: 2,
            type: "spring",
            damping: 20,
            stiffness: 50,
            delay: 0.5
          }}
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-4 md:mb-6 tracking-tight font-serif relative z-10 gradient-text px-2 md:px-4 pb-2 overflow-visible"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            filter: "blur(40px)",
            scale: 0.2,
            z: -800,
            y: 50,
            rotateX: 45
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            z: 0,
            y: 0,
            rotateX: 0
          }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            type: "spring",
            damping: 25,
            stiffness: 70
          }}
          className="gradient-text-platinum font-light text-xs md:text-base lg:text-lg max-w-3xl mb-8 md:mb-12 leading-relaxed drop-shadow-lg text-center tracking-wide px-2"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 md:mb-20"
        >
          <motion.a
            initial={{ opacity: 0, scale: 0.1, z: -1000, filter: "blur(60px)", rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, z: 0, filter: "blur(0px)", rotateX: 0 }}
            transition={{ duration: 1.5, delay: 2.8, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="liquid-gold-card !rounded-full !h-auto !p-[1.5px] group relative overflow-hidden"
          >
            <div className="liquid-gold-content !py-2.5 md:!py-3 !px-6 md:!px-8 !rounded-full !flex-row flex items-center gap-2 relative z-10">
              <span className="gradient-text font-bold text-xs md:text-sm whitespace-nowrap tracking-wider uppercase">
                {t('hero.cta')}
              </span>
              <ArrowRight size={14} className="text-[#FBE18D] group-hover:translate-x-1 transition-transform" />
            </div>
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
              style={{ skewX: "-20deg" }}
            />
          </motion.a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 3.2 }
            }
          }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[9px] md:text-xs text-slate-400 font-mono tracking-[0.3em] uppercase font-bold"
        >
          {[
            "Next.js", "React.js", "Node.js", "Tailwind CSS", "TypeScript", "JavaScript", "AI Agents",
          ].map((tech, i) => (
            <React.Fragment key={tech}>
              <motion.span
                variants={{
                  hidden: { opacity: 0, scale: 0.1, z: -800, filter: "blur(40px)", y: 30 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    filter: "blur(0px)",
                    y: 0,
                    transition: { type: "spring", damping: 20 }
                  }
                }}
                className="gradient-text transition-colors cursor-default"
              >
                {tech}
              </motion.span>
              {i < 5 && (
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  className="w-1 h-1 bg-[#FBE18D]/40 rounded-full"
                ></motion.span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
