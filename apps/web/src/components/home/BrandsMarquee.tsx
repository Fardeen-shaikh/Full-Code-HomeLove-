'use client'

import Image from 'next/image'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const BRANDS = [
  { name: 'Zarossa', logo: '/images/brands/zarossa.png' },
  { name: 'Vees', logo: '/images/brands/vees.png' },
  { name: 'Spring Air', logo: '/images/brands/spring-air.png' },
  { name: 'Schlaf', logo: '/images/brands/schlaf.png' },
  { name: 'Room Place', logo: '/images/brands/room-place.png' },
  { name: 'Rock Master', logo: '/images/brands/rock-master.png' },
]

export default function BrandsMarquee() {
  const sectionRef = useScrollAnimation<HTMLElement>()

  return (
    <section ref={sectionRef} className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8 animate-on-scroll">
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">Trusted Brands</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-2">Featured Exhibitors</h2>
        <p className="text-gray text-sm mt-2 max-w-xl mx-auto">
          Over 6,000 quality brands trust HOMElove to connect them with Malaysian homeowners.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee hover-pause w-max">
          {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 mx-8 h-[70px] w-[160px] flex items-center justify-center px-6 py-3 bg-gray-light rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:scale-105"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={50}
                className="object-contain max-h-[50px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
