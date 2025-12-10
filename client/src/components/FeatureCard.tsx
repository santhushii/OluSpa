import { motion } from "framer-motion";
import type { Feature } from "../types/content";
import { scaleIn, fadeUp } from "../utils/variants";
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
      viewport: { once: true, amount: 0.15 }
    }
  });

  return (
    <motion.article
      {...animationProps}
      className="gradient-border overflow-hidden rounded-[30px] cursor-pointer group"
      whileHover={{
        y: -12,
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onClick={onClick}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col h-full transition-all duration-300 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
        <motion.div 
          className="relative h-52 w-full overflow-hidden rounded-t-[28px] bg-olu-beige"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.img
            src={image}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80"
            aria-hidden="true"
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-sm px-4 py-1.5 text-[11px] uppercase tracking-[0.4em] text-white border border-white/20"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
            transition={{ duration: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-olu-green animate-pulse" />
            Spa
          </motion.div>
        </motion.div>
        <div className="flex flex-col flex-1 p-6 md:p-7">
          <motion.span 
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.55em] uppercase text-olu-gold font-semibold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.span 
              className="h-px w-6 bg-olu-gold/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />
            Signature
            <motion.span 
              className="h-px w-6 bg-olu-gold/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            />
          </motion.span>
          <motion.h3 
            className="mt-4 text-xl sm:text-2xl font-bold text-olu-ink font-serifDisplay group-hover:text-olu-green transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="mt-3 text-sm sm:text-base text-olu-body leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>
          <motion.button
            type="button"
            className="mt-auto inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-olu-green pt-5 group/btn"
            whileHover={{ x: 5 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, delay: 0.5 }}
          >
            <span>Discover</span>
            <motion.svg 
              className="h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={2.2} 
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
