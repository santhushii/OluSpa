type Props = {
  label: string;
};

export default function Badge({ label }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-olu-gold shadow-sm shadow-olu-beige/60">
      {label}
    </span>
  );
}

