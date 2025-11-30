import { useState } from "react";
import { motion } from "framer-motion";
import type { Feature } from "../types/content";
import { generateTreatmentsPDF } from "../utils/pdfGenerator";

type Props = {
  treatments: ReadonlyArray<Feature>;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
};

export default function DownloadButton({ treatments, contactInfo }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
      generateTreatmentsPDF(treatments, contactInfo);
      
      // Give mobile browsers time to process the download
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Better error message for mobile users
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const errorMsg = isMobile 
        ? "If the download didn't start, please check your browser's download settings or try using a different browser."
        : "There was an error generating the PDF. Please try again.";
      alert(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-olu-green px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-olu-seafoam hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olu-green disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      aria-label="Download treatments brochure as PDF"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isGenerating ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Download Treatments PDF</span>
        </>
      )}
    </motion.button>
  );
}

