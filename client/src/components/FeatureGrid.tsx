import { motion } from "framer-motion";
import type { Feature } from "../types/content";
import FeatureCard from "./FeatureCard";

type Props = {
  items: ReadonlyArray<Feature>;
  onItemClick?: (item: Feature) => void;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function FeatureGrid({ items, onItemClick }: Props) {
  return (
    <motion.div
      className="grid gap-4 sm:gap-5 md:gap-5 lg:gap-6 xl:gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
    >
      {items.map((feature) => (
        <motion.div
          key={feature.key}
          variants={itemVariants}
        >
          <FeatureCard
            title={feature.title}
            description={feature.description}
            image={feature.image}
            alt={feature.alt}
            onClick={() => onItemClick?.(feature)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
