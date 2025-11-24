import type { Feature } from "../types/content";
import FeatureCard from "./FeatureCard";

type Props = {
  items: ReadonlyArray<Feature>;
  onItemClick?: (item: Feature) => void;
};

export default function FeatureGrid({ items, onItemClick }: Props) {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((feature) => (
        <FeatureCard
          key={feature.key}
          title={feature.title}
          description={feature.description}
          image={feature.image}
          alt={feature.alt}
          onClick={() => onItemClick?.(feature)}
        />
      ))}
    </div>
  );
}

