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

  return (
    <section
      id={id}
      className={`${subdued ? "bg-olu-sand/70" : "bg-olu-cream"} ${leaf ? "section-leaf" : ""} py-16 md:py-20`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="mx-auto max-w-container px-4">
        <motion.h2
          id={id ? `${id}-title` : undefined}
          className="text-3xl md:text-[2.6rem] font-semibold text-olu-ink font-serifDisplay tracking-[0.08em]"
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
    </section>
  );
}

