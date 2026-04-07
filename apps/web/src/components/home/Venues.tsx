'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

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
  const sectionRef = useScrollAnimation<HTMLElement>()
  const [activeVenue, setActiveVenue] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Locations</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            📍 8 Venues Across Malaysia
          </h2>
          <p className="text-gray mt-3">Find an Exhibition Near You</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <div className="animate-on-scroll relative flex justify-center">
            <div className="relative w-full max-w-[500px] animate-float" style={{ animationDuration: '8s' }}>
              <Image
                src="/images/map/malaysia-map.svg"
                alt="Malaysia Map"
                width={500}
                height={350}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Venue Cards */}
          <div className="space-y-3 animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            {VENUES.map((v, i) => (
              <div
                key={v.state}
                onMouseEnter={() => setActiveVenue(i)}
                onMouseLeave={() => setActiveVenue(null)}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-default transition-all duration-250 ${
                  activeVenue === i
                    ? 'bg-gray-50 border-primary translate-x-2 -translate-y-0.5 shadow-[0_8px_24px_rgba(1,75,152,0.1)]'
                    : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-primary/30 hover:translate-x-1.5'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${activeVenue === i ? 'scale-130 shadow-[0_0_16px_currentColor]' : ''}`}
                  style={{ backgroundColor: v.color, color: v.color }}
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
        </div>
      </div>
    </section>
  )
}
