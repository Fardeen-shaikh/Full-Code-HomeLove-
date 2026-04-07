const BRANDS = ['Zarossa', 'Vees', 'Spring Air', 'Schlaf', 'Room Place', 'Rock Master', 'Ogawa', 'Panasonic', 'Samsung', 'Cuckoo']

export default function BrandsMarquee() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Trusted Brands</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-2">Featured Exhibitors</h2>
        <p className="text-gray text-sm mt-2 max-w-xl mx-auto">
          Over 6,000 quality brands trust HOMElove to connect them with Malaysian homeowners.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 mx-8 h-16 flex items-center justify-center px-6 py-3 bg-gray-light rounded-xl"
            >
              <span className="text-dark font-bold text-sm whitespace-nowrap">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
