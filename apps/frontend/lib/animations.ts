/**
 * Shared Framer Motion animation variants for pages.
 * Uses named easing strings to maintain TypeScript compatibility.
 */
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.35, ease: "easeOut" } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.35, ease: "easeOut" } },
};

export const pageSlide: Variants = {
  enter:  { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0,  transition: { duration: 0.3, ease: "easeOut" } },
  exit:   { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } },
};

export function stagger(delay = 0.1): Variants {
  return {
    hidden: {},
    show:   { transition: { staggerChildren: delay } },
  };
}
