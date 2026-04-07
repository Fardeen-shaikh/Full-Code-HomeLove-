const ITEMS = [
  'BATHROOM', 'SMART LIVING', 'INTERIOR DESIGN', 'FREE ENTRY',
  'FURNITURE', 'HOME APPLIANCES', 'RENOVATION', 'KITCHEN',
  'BEDROOM', 'MATTRESSES', 'HOME SECURITY', 'FLOORING',
]

export default function DarkMarquee() {
  return (
    <div className="bg-[#03396c] overflow-hidden py-4">
      <div className="flex animate-marquee hover-pause w-max">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-4 px-6 text-white/80 text-sm font-semibold tracking-wider whitespace-nowrap"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
