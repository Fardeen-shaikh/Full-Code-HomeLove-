import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const BRANDS = [
  { name: 'Zarossa', logo: '/images/brands/zarossa.png' },
  { name: 'Vees', logo: '/images/brands/vees.png' },
  { name: 'Spring Air', logo: '/images/brands/spring-air.png' },
  { name: 'Schlaf', logo: '/images/brands/schlaf.png' },
  { name: 'Room Place', logo: '/images/brands/room-place.png' },
  { name: 'Rock Master', logo: '/images/brands/rock-master.png' },
]

export default function BrandsMarquee() {
  return (
    <section className="py-16">
      <AnimateOnScroll className="max-w-7xl mx-auto px-4 text-center mb-8">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Trusted Partners</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-2">Brands</h2>
        <p className="text-gray text-sm mt-2 max-w-xl mx-auto">
          Over 6,000 quality brands trust HOMElove to connect them with Malaysian homeowners.
        </p>
      </AnimateOnScroll>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex items-center gap-[60px] px-5 w-max hover:[animation-play-state:paused]" style={{ animation: 'marqueeScroll 15s linear infinite' }}>
          {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={`${brand.name}-${i}`}
              src={brand.logo}
              alt={brand.name}
              className="h-[70px] w-auto flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.15]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
