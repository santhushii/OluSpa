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
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [slideshowImages]);

  // Auto-play slideshow
  useEffect(() => {
    if (slideshowImages.length <= 1 || isHovered) {
      setProgress(0);
      return;
    }

    const interval = 7000; // 7 seconds
    const progressInterval = 50; // Update progress every 50ms
    let progressValue = 0;

    const progressTimer = setInterval(() => {
      progressValue += (100 / (interval / progressInterval));
      setProgress(Math.min(progressValue, 100));
    }, progressInterval);

    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
      setProgress(0);
      progressValue = 0;
    }, interval);

    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, [slideshowImages, currentIndex, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
    setProgress(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    setProgress(0);
  };

  return (
    <section 
      className="relative overflow-hidden" 
      aria-labelledby="hero-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slideshow Container - Reduced Height */}
      <div className="h-[40vh] min-h-[280px] sm:min-h-[320px] md:h-[50vh] md:min-h-[420px] lg:h-[55vh] lg:min-h-[500px] xl:min-h-[550px] w-full relative">
        <AnimatePresence mode="wait" initial={false}>
          {slideshowImages.map((src, index) =>
            index === currentIndex ? (
              <motion.div
                key={`slide-${index}-${src}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1, x: 0 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.05, x: -100 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
              >
                <motion.img
                  src={src}
                  alt={`${imageAlt} - Slide ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                  sizes="100vw"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 15, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Enhanced Overlay Gradients */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#040b07]/80 via-[#1a2e21]/60 to-[#1a3b2a]/30 mix-blend-multiply"
          aria-hidden="true"
          animate={{
            opacity: [0.75, 0.85, 0.8, 0.9, 0.75],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Navigation Arrows */}
        {slideshowImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Progress Bar */}
        {slideshowImages.length > 1 && !isHovered && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
            <motion.div
              className="h-full bg-white/80 backdrop-blur-sm"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>
        )}

        {/* Enhanced Slide Indicators */}
        {slideshowImages.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:gap-2.5 md:gap-3">
            {slideshowImages.map((_, index) => (
              <button
                key={`hero-dot-${index}`}
                type="button"
                onClick={() => goToSlide(index)}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full border-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-white border-white scale-125" 
                    : "bg-white/30 border-white/50 hover:bg-white/50 hover:border-white/70"
                }`} />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {slideshowImages.length > 1 && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs md:text-sm font-medium">
            {currentIndex + 1} / {slideshowImages.length}
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="mx-auto max-w-container px-4 sm:px-6 md:px-4 w-full pointer-events-auto">
          {badgeLabel ? (
            <motion.div className="mb-5 md:mb-6" {...supportingAnimation}>
              <Badge label={badgeLabel} />
            </motion.div>
          ) : null}
          <motion.h1
            id="hero-title"
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight drop-shadow-2xl mb-3 sm:mb-4 md:mb-6"
            {...headingAnimation}
          >
            {chars.map((c, i) => (
              <motion.span
                key={`${c}-${i}`}
                variants={shouldReduceMotion ? undefined : letter}
                style={{ display: "inline-block" }}
                className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-white/95 mt-3 sm:mt-4 md:mt-5 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed drop-shadow-lg" 
            {...supportingAnimation}
          >
            {subtitle}
          </motion.p>
          {ctaLabel && (
            <motion.div 
              className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4" 
              {...supportingAnimation}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.5
                  }
                }
              }}
            >
              {onPrimaryAction ? (
                <motion.button
                  type="button"
                  className="group inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-olu-ink shadow-xl transition-all duration-300 hover:bg-white hover:shadow-2xl hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={ctaLabel}
                  onClick={onPrimaryAction}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="mr-1.5 sm:mr-2">{ctaLabel}</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              ) : (
                <motion.a
                  href={ctaHref}
                  className="group inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-olu-ink shadow-xl transition-all duration-300 hover:bg-white hover:shadow-2xl hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={ctaLabel}
                  onClick={handleSmoothScroll}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="mr-1.5 sm:mr-2">{ctaLabel}</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              )}
              <motion.a
                href="#gallery"
                className="group inline-flex items-center justify-center rounded-full border-2 border-white/90 backdrop-blur-sm px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                onClick={handleSmoothScroll}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Gallery
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
