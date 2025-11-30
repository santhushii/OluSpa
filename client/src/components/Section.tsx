import { motion } from "framer-motion";
import { fadeUp, letter, slideInLeft, slideInRight } from "../utils/variants";
import type { ReactNode } from "react";
import { useMotionPreference, useMotionPreset } from "../hooks/useMotionPreset";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  children: ReactNode;
  subdued?: boolean;
  id?: string;
  leaf?: boolean;
};

export default function Section({ title, children, subdued = false, id, leaf = false }: Props) {
  const shouldReduceMotion = useMotionPreference();
  const displayTitle = title;
  const displayChars = Array.from(displayTitle);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const headingAnimation = useMotionPreset({
    enabled: {
      variants: fadeUp,
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: { once: true, amount: 0.2 }
    },
    disabled: {}
  });

  const sectionBackground = subdued
    ? "from-white/95 via-olu-cream/90 to-white/95"
    : "from-white/90 via-olu-cream/80 to-white/80";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${leaf ? "section-leaf" : ""} relative py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="mx-auto max-w-container px-4">
        <motion.div
          className={`relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br ${sectionBackground} shadow-[0_25px_60px_rgba(0,0,0,0.08)] backdrop-blur-lg`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01, boxShadow: "0_30px_80px_rgba(0,0,0,0.12)" }}
        >
          {/* Decorative Top Line */}
          <motion.div 
            className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-olu-gold/50 to-transparent opacity-60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <div className="relative px-4 py-8 sm:px-5 sm:py-9 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-16">
            {/* Animated Section Title */}
            <motion.h2
              id={id ? `${id}-title` : undefined}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.8rem] font-bold text-olu-ink font-serifDisplay tracking-[0.06em] sm:tracking-[0.08em] mb-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {displayChars.map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  variants={shouldReduceMotion ? undefined : letter}
                  style={{ display: "inline-block" }}
                  className="inline-block"
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    color: "#2e8b57",
                    transition: { duration: 0.2 }
                  }}
                >
                  {character === " " ? "\u00A0" : character}
                </motion.span>
              ))}
            </motion.h2>

            {/* Decorative Underline */}
            <motion.div
              className="h-1 w-20 sm:w-24 bg-gradient-to-r from-olu-green via-olu-gold to-olu-green rounded-full mt-3 sm:mt-4 mb-6 sm:mb-8"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "auto", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />

            {/* Animated Content */}
            <motion.div 
              className="mt-5 sm:mt-6 md:mt-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {children}
            </motion.div>
          </div>

          {/* Animated Background Decorations */}
          <motion.div 
            className="absolute -bottom-24 right-[-60px] h-48 w-48 rounded-full bg-olu-green/10 blur-3xl" 
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div 
            className="absolute -top-12 left-[-40px] h-32 w-32 rounded-full bg-olu-gold/10 blur-2xl" 
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
