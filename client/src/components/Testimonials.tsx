import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "../utils/variants";
import { useMotionPreset } from "../hooks/useMotionPreset";

type Testimonial = {
  name: string;
  location?: string;
  rating: number;
  text: string;
  date?: string;
};

type Props = {
  testimonials: ReadonlyArray<Testimonial>;
};

export default function Testimonials({ testimonials }: Props) {
  const animationProps = useMotionPreset({
    enabled: {
      variants: scaleIn,
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: { once: true, amount: 0.2 }
    },
    disabled: {}
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          {...animationProps}
          className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-olu-beige/80 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Rating Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < testimonial.rating ? "text-olu-gold fill-current" : "text-olu-beige"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-olu-body leading-relaxed mb-4 relative">
            <svg
              className="absolute -top-2 -left-2 w-8 h-8 text-olu-green/20"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
            </svg>
            <p className="relative z-10 pl-4">{testimonial.text}</p>
          </blockquote>

          {/* Author Info */}
          <div className="border-t border-olu-beige/60 pt-4">
            <p className="font-semibold text-olu-ink">{testimonial.name}</p>
            {testimonial.location && (
              <p className="text-sm text-olu-body/70">{testimonial.location}</p>
            )}
            {testimonial.date && (
              <p className="text-xs text-olu-body/50 mt-1">{testimonial.date}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

