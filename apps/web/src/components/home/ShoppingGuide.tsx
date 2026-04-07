'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const STEPS = [
  {
    step: 1,
    title: 'Bring Your Floor Plan & Home Checklist',
    desc: 'Take measurements and photos of your space. Use our Home Checklist to list everything you need before visiting.',
  },
  {
    step: 2,
    title: 'Use the Floor Plan to Guide Your Visit',
    desc: 'Navigate the expo efficiently. Visit booths relevant to your rooms and compare options side by side.',
  },
  {
    step: 3,
    title: 'Compare Before You Commit',
    desc: 'Check prices, warranty, installation costs, and bundle deals. Use our comparison checklist to decide.',
  },
]

export default function ShoppingGuide() {
  const sectionRef = useScrollAnimation<HTMLElement>()

  return (
    <section ref={sectionRef} className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">How to Shop Smart</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">3 Steps to Smarter Home Shopping</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting dashed line */}
          <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px border-t-2 border-dashed border-white/20" />

          {STEPS.map((s, i) => (
            <div key={s.step} className="text-center relative animate-on-scroll" style={{ transitionDelay: `${i * 0.2}s` }}>
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(1,75,152,0.4)] relative z-10">
                {s.step}
              </div>
              <h3 className="font-bold text-white text-lg">{s.title}</h3>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll">
          <Link
            href="/checklist"
            className="inline-block bg-accent text-dark font-semibold px-8 py-3.5 rounded-full hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,241,0,0.3)]"
          >
            Use Our Home Checklist →
          </Link>
        </div>
      </div>
    </section>
  )
}
