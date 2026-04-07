const CATEGORIES = [
  'MATTRESSES', 'HOME SECURITY', 'FLOORING', 'BATHROOM', 'SMART LIVING',
  'INTERIOR DESIGN', 'FREE ENTRY', 'FURNITURE', 'HOME APPLIANCES',
  'RENOVATION', 'KITCHEN', 'LIGHTING', 'CURTAINS', 'HOME ESSENTIALS',
]

export default function CategoryMarquee() {
  return (
    <div className="bg-primary/90 backdrop-blur-md overflow-hidden border-b border-white/10">
      <div className="flex animate-marquee-slow hover-pause w-max">
        {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, i) => (
          <span
            key={`${cat}-${i}`}
            className="flex items-center gap-3 px-6 py-2.5 text-white/90 text-xs font-semibold tracking-[0.15em] whitespace-nowrap"
          >
            {cat}
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
