'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCardProps {
  icon: string
  delay: number
  /** Numeric target for the count-up animation. Omit for static numbers. */
  target?: number
  /** Suffix appended to each tick of the count-up (e.g. 'M' for millions). */
  countSuffix?: string
  /** Format the running value with thousands separators. */
  comma?: boolean
  /** Trailing badge ("+", etc.) shown after the count-up. */
  statSuffix?: string
  /** Static number content (used instead of count-up for "Since 2015"). */
  staticNumber?: React.ReactNode
  label: string
}

function CountUp({ target, suffix = '', comma = false, started }: {
  target: number
  suffix?: string
  comma?: boolean
  started: boolean
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * ease))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target])

  return <>{(comma ? value.toLocaleString() : value)}{suffix}</>
}

function StatCard({ icon, delay, target, countSuffix, comma, statSuffix, staticNumber, label, started }: StatCardProps & { started: boolean }) {
  return (
    <div className={`stat-card animate-on-scroll delay-${delay}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-number" style={staticNumber ? { fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' } : undefined}>
        {staticNumber ? (
          staticNumber
        ) : (
          <>
            {/* Note: deliberately NOT using class "count-up" — the wireframe's
                inline JS hijacks any .count-up element and overwrites textContent
                with NaN because we don't expose data-target attrs. */}
            <span>
              <CountUp target={target!} suffix={countSuffix} comma={comma} started={started} />
            </span>
            {statSuffix && <span className="stat-suffix">{statSuffix}</span>}
          </>
        )}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-header animate-on-scroll">
          <h2>Trusted by Millions of Malaysian Homeowners</h2>
          <p>Over a decade of connecting homeowners with the best home & living brands across 8 locations in Malaysia.</p>
        </div>
        <div className="stats-grid">
          <StatCard
            icon="🏆"
            delay={1}
            target={141}
            statSuffix="+"
            label="Exhibitions Organized"
            started={started}
          />
          <StatCard
            icon="🏪"
            delay={2}
            target={6173}
            comma
            statSuffix="+"
            label="Trusted Exhibitors"
            started={started}
          />
          <StatCard
            icon="👥"
            delay={3}
            target={5}
            countSuffix="M"
            statSuffix="+"
            label="Happy Visitors"
            started={started}
          />
          <StatCard
            icon="📍"
            delay={4}
            staticNumber={
              <>
                Since <span style={{ color: '#ff2c2c' }}>2015</span>
              </>
            }
            label="Year Founded · Trusted Since"
            started={started}
          />
        </div>
      </div>
    </section>
  )
}
