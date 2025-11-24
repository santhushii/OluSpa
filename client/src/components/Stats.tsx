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
    <div ref={ref} className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold text-olu-green mb-2 font-serifDisplay">
            {isInView ? (
              <AnimatedNumber value={stat.number} suffix={stat.suffix} />
            ) : (
              "0" + stat.suffix
            )}
          </div>
          <h3 className="text-lg font-semibold text-olu-ink mb-1">{stat.label}</h3>
          {stat.description && (
            <p className="text-sm text-olu-body/70">{stat.description}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

