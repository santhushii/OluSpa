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
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function FeatureGrid({ items, onItemClick }: Props) {
  return (
    <motion.div
      className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {items.map((feature, index) => (
        <motion.div
          key={feature.key}
          variants={itemVariants}
          custom={index}
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
