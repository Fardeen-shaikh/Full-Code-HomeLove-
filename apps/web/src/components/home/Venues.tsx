'use client'

import { useState } from 'react'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const VENUES = [
  { state: 'PENANG', venue: 'Setia SPICE Convention Centre', left: '15.5%', top: '25%', color: '#014B98' },
  { state: 'KUANTAN', venue: 'SASICC', left: '28%', top: '42%', color: '#014B98' },
  { state: 'KUALA LUMPUR', venue: 'Sunway Pyramid & Mid Valley', left: '17%', top: '55%', color: '#014B98' },
  { state: 'PUTRAJAYA', venue: 'IOI Grand Ballroom', left: '19%', top: '62%', color: '#E08103' },
  { state: 'JOHOR', venue: 'Persada Johor', left: '19%', top: '80%', color: '#014B98' },
  { state: 'KUCHING', venue: 'Borneo Convention Centre', left: '56%', top: '78%', color: '#014B98' },
  { state: 'MIRI', venue: 'Boulevard Mall', left: '66%', top: '40%', color: '#014B98' },
  { state: 'KOTA KINABALU', venue: 'SICC', left: '78%', top: '22%', color: '#014B98' },
]

export default function Venues() {
  const [activeVenue, setActiveVenue] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-dark text-xs font-semibold uppercase tracking-[0.15em] px-6 py-2.5 rounded-full">
            📍 8 Venues Across Malaysia
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-4">
            Find an Exhibition Near You
          </h2>
          <p className="text-gray mt-3 max-w-xl mx-auto">
            World-class home exhibitions in major cities nationwide.<br />
            Free admission at every venue.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="relative w-full max-w-5xl mx-auto" style={{ animation: 'float 8s ease-in-out infinite' }}>
            {/* Use the real Malaysia map SVG */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/map/malaysia-map.svg"
              alt="Malaysia Map"
              className="w-full h-auto opacity-30"
              style={{ filter: 'grayscale(100%) brightness(0.85)' }}
            />

            {/* Markers overlaid on top */}
            {VENUES.map((v, i) => {
              const isActive = activeVenue === i
              return (
                <div
                  key={v.state}
                  className="absolute flex items-center gap-2 cursor-default group"
                  style={{ left: v.left, top: v.top, transform: 'translate(-6px, -6px)' }}
                  onMouseEnter={() => setActiveVenue(i)}
                  onMouseLeave={() => setActiveVenue(null)}
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0">
                    {/* Ripple ring */}
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive ? 'scale-[3] opacity-20' : 'scale-100 opacity-0'}`}
                      style={{ backgroundColor: v.color }}
                    />
                    <div
                      className={`relative w-3 h-3 rounded-full border-2 border-white shadow-sm transition-transform duration-300 ${isActive ? 'scale-[1.4]' : ''}`}
                      style={{
                        backgroundColor: v.color,
                        boxShadow: isActive ? `0 0 12px ${v.color}` : '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>
                  {/* Label */}
                  <div className="whitespace-nowrap">
                    <p className="text-[11px] sm:text-xs font-extrabold text-dark uppercase tracking-wider leading-tight">{v.state}</p>
                    <p className="text-[9px] sm:text-[10px] text-gray leading-tight">{v.venue}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
