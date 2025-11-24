import { motion } from "framer-motion";
import type { Feature } from "../types/content";
import { scaleIn } from "../utils/variants";
import { useMotionPreset } from "../hooks/useMotionPreset";

type Props = Omit<Feature, "key"> & {
  onClick?: () => void;
};

export default function FeatureCard({ title, description, image, alt, onClick }: Props) {
  const animationProps = useMotionPreset({
    enabled: {
      variants: scaleIn,
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: { once: true, amount: 0.2 }
    }
  });

  return (
      <motion.article
        {...animationProps}
        className="gradient-border overflow-hidden rounded-[30px] cursor-pointer"
        whileHover={{
          y: -8,
          scale: 1.02
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onClick={onClick}
      >
        <div className="bg-white/80 backdrop-blur rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col h-full">
          <motion.div 
            className="relative h-52 w-full overflow-hidden rounded-t-[28px] bg-olu-beige"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={image}
              alt={alt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.4em] text-white">
              Spa
            </div>
          </motion.div>
          <div className="flex flex-col flex-1 p-6 md:p-7">
            <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.55em] uppercase text-olu-gold font-semibold">
              <span className="h-px w-6 bg-olu-gold/60" aria-hidden="true" />
              Signature
              <span className="h-px w-6 bg-olu-gold/60" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-olu-ink font-serifDisplay">{title}</h3>
            <p className="mt-3 text-sm sm:text-base text-olu-body leading-relaxed">{description}</p>
            <button
              type="button"
              className="mt-auto inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-olu-green pt-5"
            >
              Discover
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.article>
  );
}

