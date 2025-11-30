import type { Feature } from "../types/content";

type Props = Omit<Feature, "key"> & {
  onClick?: () => void;
};

export default function FeatureCard({ title, description, image, alt, onClick }: Props) {
  return (
    <article
      className="gradient-border overflow-hidden rounded-[30px] cursor-pointer group"
      onClick={onClick}
    >
      <div className="bg-white/90 rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col h-full transition-all duration-300 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
        <div 
          className="relative h-48 sm:h-52 md:h-56 lg:h-60 w-full overflow-hidden rounded-t-[28px] bg-olu-beige"
        >
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"
            aria-hidden="true"
          />
          <div 
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.4em] text-white border border-white/20 transition-transform duration-200 group-hover:scale-105"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-olu-green animate-pulse" />
            Spa
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5 sm:p-5 md:p-6 lg:p-7">
          <span 
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.55em] uppercase text-olu-gold font-semibold"
          >
            <span className="h-px w-6 bg-olu-gold/60" />
            Signature
            <span className="h-px w-6 bg-olu-gold/60" />
          </span>
          <h3 
            className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl font-bold text-olu-ink font-serifDisplay group-hover:text-olu-green transition-colors duration-300"
          >
            {title}
          </h3>
          <p 
            className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-olu-body leading-relaxed"
          >
            {description}
          </p>
          <button
            type="button"
            className="mt-auto inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-olu-green pt-5 group/btn transition-transform duration-200 hover:translate-x-1"
          >
            <span>Discover</span>
            <svg 
              className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={2.2} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
