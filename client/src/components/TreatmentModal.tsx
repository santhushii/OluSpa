import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Feature } from "../types/content";

type Props = {
  treatment: Feature | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (treatment: Feature) => void;
};

export default function TreatmentModal({ treatment, isOpen, onClose, onBook }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!treatment) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative h-64 md:h-auto md:w-1/2 bg-olu-beige overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-3xl md:text-4xl font-semibold text-olu-ink font-serifDisplay">
                    {treatment.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-olu-beige transition-colors text-olu-body hover:text-olu-ink"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="prose prose-lg max-w-none text-olu-body leading-relaxed mb-6">
                  <p>{treatment.description}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onBook(treatment);
                      onClose();
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-olu-green px-6 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-olu-seafoam hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green"
                  >
                    Book This Treatment
                  </button>
                  <a
                    href={`tel:+94775030038`}
                    className="inline-flex items-center justify-center rounded-full border-2 border-olu-green px-6 py-3 text-sm font-semibold text-olu-green transition-all duration-200 hover:bg-olu-green hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green"
                  >
                    Call to Enquire
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

