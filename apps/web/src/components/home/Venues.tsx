'use client'

import Image from 'next/image'
import { useState } from 'react'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const VENUES = [
  { state: 'Penang', venue: 'SPICE Convention Centre', color: '#014B98' },
  { state: 'Kuala Lumpur', venue: 'KL Convention Centre', color: '#CB1510' },
  { state: 'Putrajaya', venue: 'PICC Putrajaya', color: '#E08103' },
  { state: 'Kuantan', venue: 'Megamall Exhibition Centre', color: '#059669' },
  { state: 'Johor Bahru', venue: 'Persada Johor Convention Centre', color: '#7C3AED' },
  { state: 'Kuching', venue: 'Borneo Convention Centre', color: '#014B98' },
  { state: 'Miri', venue: 'Miri Indoor Stadium', color: '#CB1510' },
  { state: 'Kota Kinabalu', venue: 'Sabah International Convention Centre', color: '#E08103' },
]

export default function Venues() {
  const [activeVenue, setActiveVenue] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">8 Venues Across Malaysia</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            Find an Exhibition Near You
          </h2>
          <p className="text-gray mt-3 max-w-xl mx-auto">
            World-class home exhibitions in major cities nationwide. Free admission at every venue.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimateOnScroll className="relative flex justify-center">
            <div className="relative w-full max-w-[500px]" style={{ animation: 'float 8s ease-in-out infinite' }}>
              <Image
                src="/images/map/malaysia-map.svg"
                alt="Malaysia Map"
                width={500}
                height={350}
                className="w-full h-auto"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="space-y-3">
              {VENUES.map((v, i) => (
                <div
                  key={v.state}
                  onMouseEnter={() => setActiveVenue(i)}
                  onMouseLeave={() => setActiveVenue(null)}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-default transition-all duration-250 ${
                    activeVenue === i
                      ? 'bg-white border-primary translate-x-2 -translate-y-0.5 shadow-[0_8px_24px_rgba(1,75,152,0.1)]'
                      : 'bg-white border-gray-100 hover:border-primary/30 hover:translate-x-1.5'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${activeVenue === i ? 'scale-[1.3]' : ''}`}
                    style={{ backgroundColor: v.color, boxShadow: activeVenue === i ? `0 0 16px ${v.color}` : 'none' }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-dark text-sm">{v.state}</h3>
                    <p className="text-xs text-gray truncate">{v.venue}</p>
                  </div>
                  <span className={`text-primary text-sm transition-all duration-400 ${activeVenue === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1.5'}`}>
                    →
                  </span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
