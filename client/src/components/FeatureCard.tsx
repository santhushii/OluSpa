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
        className="bg-white rounded-3xl shadow-sm ring-1 ring-olu-beige/80 overflow-hidden focus-within:ring-2 focus-within:ring-olu-green transition-all duration-300 cursor-pointer"
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
      >
      <motion.div 
        className="relative h-48 w-full overflow-hidden bg-olu-beige"
        whileHover={{ scale: 1.05 }}
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
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />
      </motion.div>
      <div className="p-6">
        <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.55em] uppercase text-olu-gold font-semibold">
          <span className="h-px w-6 bg-olu-gold/60" aria-hidden="true" />
          . {title} .
          <span className="h-px w-6 bg-olu-gold/60" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-olu-ink font-serifDisplay">{title}</h3>
        <p className="mt-3 text-sm text-olu-body leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
}

