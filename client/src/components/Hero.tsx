import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sentence, letter, fadeUp } from "../utils/variants";
import Badge from "./Badge";
import type { SiteContent } from "../types/content";
import { useMotionPreference, useMotionPreset } from "../hooks/useMotionPreset";
import { handleSmoothScroll } from "../utils/scroll";

type Props = SiteContent["hero"] & {
  onPrimaryAction?: () => void;
};

export default function Hero({
  title,
  subtitle,
  image,
  images,
  imageAlt,
  badgeLabel,
  ctaLabel,
  ctaHref,
  onPrimaryAction
}: Props) {
  const chars = Array.from(title);
  const shouldReduceMotion = useMotionPreference();
  const headingAnimation = useMotionPreset({
    enabled: { variants: sentence, initial: "hidden" as const, animate: "visible" as const }
  });
  const supportingAnimation = useMotionPreset({
    enabled: { variants: fadeUp, initial: "hidden" as const, animate: "visible" as const }
  });

  const slideshowImages = useMemo(() => {
    if (images && images.length > 0) return images;
    return image ? [image] : [];
  }, [images, image]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [slideshowImages]);

  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    const timer = window.setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slideshowImages.length),
      7000
    );
    return () => window.clearInterval(timer);
  }, [slideshowImages]);

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <motion.div 
        className="h-[58vh] min-h-[360px] w-full relative"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
      >
        <AnimatePresence mode="wait">
          {slideshowImages.map((src, index) =>
            index === currentIndex ? (
              <motion.img
                key={src}
                src={src}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            ) : null
          )}
        </AnimatePresence>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#040b07]/75 via-[#1a2e21]/55 to-[#1a3b2a]/20 mix-blend-multiply"
          aria-hidden="true"
          animate={{
            opacity: [0.8, 0.9, 0.85, 0.9, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" 
          aria-hidden="true"
          animate={{
            opacity: [0.3, 0.4, 0.35, 0.4, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      {slideshowImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slideshowImages.map((_, index) => (
            <button
              key={`hero-dot-${index}`}
              type="button"
              className={`h-2.5 w-2.5 rounded-full border border-white/70 transition ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-container px-4">
          {badgeLabel ? (
            <motion.div className="mb-5 md:mb-6" {...supportingAnimation}>
              <Badge label={badgeLabel} />
            </motion.div>
          ) : null}
          <motion.h1
            id="hero-title"
            className="text-white text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight drop-shadow-lg"
            {...headingAnimation}
          >
            {chars.map((c, i) => (
              <motion.span
                key={`${c}-${i}`}
                variants={shouldReduceMotion ? undefined : letter}
                style={{ display: "inline-block" }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p className="text-white/95 mt-4 md:mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed" {...supportingAnimation}>
            {subtitle}
          </motion.p>
          {ctaLabel && (
            <motion.div 
              className="mt-8 flex flex-wrap gap-4" 
              {...supportingAnimation}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.5
                  }
                }
              }}
            >
              {onPrimaryAction ? (
                <motion.button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-white/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-olu-ink shadow transition-all duration-200 hover:bg-white hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={ctaLabel}
                  onClick={onPrimaryAction}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {ctaLabel}
                </motion.button>
              ) : (
                <motion.a
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-white/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-olu-ink shadow transition-all duration-200 hover:bg-white hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={ctaLabel}
                  onClick={handleSmoothScroll}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {ctaLabel}
                </motion.a>
              )}
              <motion.a
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full border border-white/80 px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/90 transition-all duration-200 hover:bg-white/20 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                onClick={handleSmoothScroll}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                Gallery
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

