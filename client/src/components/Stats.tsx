import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  number: number;
  suffix?: string;
  label: string;
  description?: string;
};

type Props = {
  stats: ReadonlyArray<Stat>;
};

function AnimatedNumber({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const increment = value / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
          setHasAnimated(true);
        } else {
          setCount(current);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, duration, hasAnimated]);

  return <>{Math.floor(count)}{suffix}</>;
}

export default function Stats({ stats }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-5 lg:gap-6 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 25, scale: 0.95 }
          }
          transition={{ delay: index * 0.12, duration: 0.5, type: "spring" }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/50 bg-white/70 p-4 sm:p-5 md:p-6 text-center shadow-[0_25px_45px_rgba(0,0,0,0.08)] backdrop-blur"
        >
          <div className="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-olu-gold/60 to-transparent opacity-70" />
          <div className="absolute -bottom-12 left-1/2 h-20 w-32 -translate-x-1/2 rounded-full bg-olu-green/15 blur-2xl" />
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.4em] text-olu-gold mb-3">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-olu-green font-serifDisplay drop-shadow-sm mb-2">
              {isInView ? (
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              ) : (
                `0${stat.suffix ?? ""}`
              )}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-olu-ink mb-1">{stat.label}</h3>
            {stat.description && (
              <p className="text-xs sm:text-sm text-olu-body/70">{stat.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

