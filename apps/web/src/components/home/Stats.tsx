'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 141, suffix: '+', label: 'Exhibitions Organised', icon: '📋' },
  { value: 6173, suffix: '+', label: 'Trusted Exhibitors', icon: '🏢' },
  { value: 5, suffix: 'M+', label: 'Happy Visitors', icon: '😊' },
  { value: 8, suffix: '', label: 'Locations Nationwide', icon: '📍' },
]

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let frame: number
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [started, target, duration])

  return { count, ref }
}

export default function Stats() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary-light to-[#0a3d7a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <p className="text-center text-white/60 text-sm mt-8">
          🏆 Your trusted Home Expo since 2015
        </p>
      </div>
    </section>
  )
}

function StatCard({ value, suffix, label, icon }: (typeof STATS)[number]) {
  const { count, ref } = useCountUp(value)
  return (
    <div
      ref={ref}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white hover:-translate-y-1 transition-transform duration-300"
    >
      <span className="text-3xl block mb-2">{icon}</span>
      <span className="text-3xl sm:text-4xl font-extrabold">
        {count.toLocaleString()}{suffix}
      </span>
      <p className="text-sm text-white/70 mt-1">{label}</p>
    </div>
  )
}
