import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  faqs: ReadonlyArray<FAQItem>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function FAQ({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatAnswer = (answer: string) => {
    if (answer.includes("\n-")) {
      const lines = answer.split("\n");
      return (
        <div className="space-y-2">
          {lines.map((line, idx) => {
            if (line.trim().startsWith("-")) {
              return (
                <motion.div 
                  key={idx} 
                  className="flex items-start gap-3 pl-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="text-olu-green mt-1.5 flex-shrink-0 text-lg">•</span>
                  <span className="flex-1">{line.replace(/^-\s*/, "")}</span>
                </motion.div>
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
    <motion.div
      className="max-w-4xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="grid gap-4 md:gap-5">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            <motion.div
              className={`relative bg-gradient-to-br from-white to-olu-cream/30 rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "border-olu-green shadow-xl shadow-olu-green/20"
                  : "border-olu-beige/60 hover:border-olu-green/50 hover:shadow-lg"
              }`}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative accent */}
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-olu-green via-olu-seafoam to-olu-green transition-opacity duration-300 ${
                  openIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`}
                animate={{ 
                  scaleY: openIndex === index ? 1 : 0.3,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                onClick={() => toggleItem(index)}
                className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex items-start justify-between gap-4 hover:bg-white/50 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green rounded-2xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Question number badge */}
                  <motion.div 
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-olu-green/20 to-olu-seafoam/20 flex items-center justify-center border border-olu-green/30"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-sm font-bold text-olu-green">
                      {index + 1}
                    </span>
                  </motion.div>
                  
                  <h3
                    className={`font-bold text-base md:text-lg leading-snug transition-colors duration-200 flex-1 ${
                      openIndex === index ? "text-olu-ink" : "text-olu-ink/90 group-hover:text-olu-ink"
                    }`}
                  >
                    {faq.question}
                  </h3>
                </div>

                <motion.div
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-olu-green/10 to-olu-seafoam/10 flex items-center justify-center transition-colors duration-200 group-hover:from-olu-green/20 group-hover:to-olu-seafoam/20 border border-olu-green/20"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1 }}
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
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="px-6 md:px-8 pb-6 md:pb-7 pt-2 border-t border-olu-beige/40 bg-gradient-to-br from-white/80 to-olu-cream/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-olu-body leading-relaxed text-sm md:text-base space-y-3 pl-14">
                        {formatAnswer(faq.answer)}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
