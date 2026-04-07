'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const STATS = [
  { value: 141, suffix: '+', label: 'Exhibitions Organised', icon: '📋' },
  { value: 6173, suffix: '+', label: 'Trusted Exhibitors', icon: '🏢', format: 'comma' },
  { value: 5, suffix: 'M+', label: 'Happy Visitors', icon: '😊' },
  { value: 2015, suffix: '', label: 'Year Founded · Trusted Since', icon: '🏆' },
]

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 },
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
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [started, target, duration])

  return { count, ref }
}

function StatCard({ value, suffix, label, icon, format }: (typeof STATS)[number] & { format?: string }) {
  const { count, ref } = useCountUp(value)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)`
    card.style.transition = 'transform 0.1s ease, background 0.3s, box-shadow 0.3s'
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.4s ease, background 0.3s, box-shadow 0.3s'
    card.style.transform = 'translateY(0) perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
  }, [])

  return (
    <div ref={ref}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white border border-white/20 cursor-default hover:bg-white/[0.18] hover:border-white/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-[background,box-shadow,border-color] duration-300"
      >
        <span className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-2xl mx-auto mb-3 transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5">{icon}</span>
        <span className="text-3xl sm:text-4xl font-extrabold block">
          {format === 'comma' ? count.toLocaleString() : count}{suffix}
        </span>
        <p className="text-sm text-white/70 mt-1">{label}</p>
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-[#0a3d7a] py-16 overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl animate-float-reverse" />

      <div className="relative max-w-7xl mx-auto px-4">
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
