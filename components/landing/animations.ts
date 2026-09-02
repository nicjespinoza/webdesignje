import { Variants } from "framer-motion";

// --- Animation Variants ---

// Respect users who asked for reduced motion: drop blur/translate, keep a plain fade.
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Kage-inspired: reveal with a soft blur clearing as the element rises into view.
// Falls back to a plain fade when reduced motion is requested.
export const blurReveal: Variants = prefersReducedMotion()
  ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    }
  : {
      hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.0, ease: "easeOut" }
      }
    };

// Kage-inspired: the hero glow dissolving into the first section.
export const dissolve: Variants = prefersReducedMotion()
  ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } }
    }
  : {
      hidden: { opacity: 0, filter: "blur(16px)", scale: 1.04 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: { duration: 1.2, ease: "easeOut" }
      }
    };

// Subtle parallax for inner assets (cards/images). Use with a scroll-linked value.
export const parallaxY = (distance = 40): Variants => ({
  hidden: { y: 0 },
  visible: {
    y: -distance,
    transition: { duration: 0.1, ease: "linear" }
  }
});
