import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../utils/variants";
import { useMotionPreset } from "../hooks/useMotionPreset";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  faqs: ReadonlyArray<FAQItem>;
};

export default function FAQ({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const animationProps = useMotionPreset({
    enabled: {
      variants: fadeUp,
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: { once: true, amount: 0.2 }
    },
    disabled: {}
  });

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatAnswer = (answer: string) => {
    // Check if answer contains bullet points (starts with "-")
    if (answer.includes("\n-")) {
      const lines = answer.split("\n");
      return (
        <div className="space-y-2">
          {lines.map((line, idx) => {
            if (line.trim().startsWith("-")) {
              return (
                <div key={idx} className="flex items-start gap-3 pl-2">
                  <span className="text-olu-green mt-1.5 flex-shrink-0">•</span>
                  <span className="flex-1">{line.replace(/^-\s*/, "")}</span>
                </div>
              );
            }
            return line.trim() ? <p key={idx}>{line}</p> : null;
          })}
        </div>
      );
    }
    return <p>{answer}</p>;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-4 md:gap-5">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            {...animationProps}
            transition={{ delay: index * 0.08 }}
            className="group relative"
          >
            <div
              className={`relative bg-gradient-to-br from-white to-olu-cream/30 rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "border-olu-green shadow-lg shadow-olu-green/10"
                  : "border-olu-beige/60 hover:border-olu-green/50 hover:shadow-md"
              }`}
            >
              {/* Decorative accent */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-olu-green to-olu-seafoam transition-opacity duration-300 ${
                  openIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`}
              />

              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex items-start justify-between gap-4 hover:bg-white/50 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green rounded-2xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Question number badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-olu-green/10 flex items-center justify-center mt-0.5">
                    <span className="text-sm font-semibold text-olu-green">
                      {index + 1}
                    </span>
                  </div>
                  
                  <h3
                    className={`font-semibold text-base md:text-lg leading-snug transition-colors duration-200 flex-1 ${
                      openIndex === index ? "text-olu-ink" : "text-olu-ink/90 group-hover:text-olu-ink"
                    }`}
                  >
                    {faq.question}
                  </h3>
                </div>

                <motion.div
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-olu-green/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-olu-green/20"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <motion.svg
                    className="w-5 h-5 text-olu-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-7 pt-2 border-t border-olu-beige/40 bg-white/60">
                      <div className="text-olu-body leading-relaxed text-sm md:text-base space-y-3 pl-12">
                        {formatAnswer(faq.answer)}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

