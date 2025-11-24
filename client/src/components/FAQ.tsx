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

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          {...animationProps}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl border border-olu-beige/80 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-olu-cream transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="font-semibold text-olu-ink pr-8">{faq.question}</h3>
            <motion.svg
              className="w-5 h-5 text-olu-green flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-0 text-olu-body leading-relaxed border-t border-olu-beige/60">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

