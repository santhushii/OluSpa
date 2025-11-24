import { motion } from "framer-motion";
import { fadeUp, letter } from "../utils/variants";
import type { ReactNode } from "react";
import { useMotionPreference, useMotionPreset } from "../hooks/useMotionPreset";

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
  const headingAnimation = useMotionPreset({
    enabled: {
      variants: fadeUp,
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: { once: true, amount: 0.3 }
    },
    disabled: {}
  });
  const contentAnimation = headingAnimation;

  const sectionBackground = subdued
    ? "from-white/95 via-olu-cream/90 to-white/95"
    : "from-white/90 via-olu-cream/80 to-white/80";

  return (
    <section
      id={id}
      className={`${leaf ? "section-leaf" : ""} relative py-16 md:py-20`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="mx-auto max-w-container px-4">
        <div
          className={`relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br ${sectionBackground} shadow-[0_25px_60px_rgba(0,0,0,0.08)] backdrop-blur`}
        >
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-olu-gold/50 to-transparent opacity-60" />
          <div className="relative px-6 py-10 md:px-10 md:py-12">
            <motion.h2
              id={id ? `${id}-title` : undefined}
              className="text-2xl sm:text-3xl md:text-[2.6rem] font-semibold text-olu-ink font-serifDisplay tracking-[0.08em]"
              {...headingAnimation}
            >
              {displayChars.map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  variants={shouldReduceMotion ? undefined : letter}
                  style={{ display: "inline-block" }}
                >
                  {character === " " ? "\u00A0" : character}
                </motion.span>
              ))}
            </motion.h2>
            <motion.div className="mt-7" {...contentAnimation}>
              {children}
            </motion.div>
          </div>
          <div className="absolute -bottom-24 right-[-60px] h-48 w-48 rounded-full bg-olu-green/10 blur-3xl" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

