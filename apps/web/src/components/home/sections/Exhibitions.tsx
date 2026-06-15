'use client'

import { useEffect, useRef, useState } from 'react'

export interface ExhibitionEvent {
  title: string
  slug: string
  venue: string
  state: string
  date: string
  imageUrl: string
  days: number
}

function optimizedImg(src: string, width: number, quality = 75): string {
  if (!src || src.startsWith('data:')) return src
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

function ExhibitionCard({ event, delay }: { event: ExhibitionEvent; delay: number }) {
  return (
    <div className={`exhibition-card animate-on-scroll delay-${delay}`}>
      <div className="exhibition-image">
        <img
          src={optimizedImg(event.imageUrl, 640)}
          alt={event.title}
          loading="lazy"
          decoding="async"
          width={400}
          height={250}
        />
      </div>
      <div className="exhibition-content">
        <div className="exhibition-meta">
          <span>{event.state}</span>
          <span>{event.days} Days</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.venue}</p>
        <div className="exhibition-footer">
          <span className="exhibition-date">{event.date}</span>
          <a
            href={`/exhibitions/${event.slug}`}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: 13 }}
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export function Exhibitions({ events }: { events: ExhibitionEvent[] }) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  // Track scroll position for carousel dots (mobile-only — dots are CSS-hidden
  // on desktop). Same logic as the wireframe's inline JS, but isolated.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const handler = () => {
      const firstCard = grid.querySelector<HTMLElement>('.exhibition-card')
      if (!firstCard) return
      const cardWidth = firstCard.offsetWidth + 16
      setActiveDot(Math.round(grid.scrollLeft / cardWidth))
    }
    grid.addEventListener('scroll', handler, { passive: true })
    return () => grid.removeEventListener('scroll', handler)
  }, [])

  return (
    <section className="section exhibitions">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="animate-on-scroll">Upcoming Home Expo</h2>
          <p
            className="animate-on-scroll"
            style={{ color: 'var(--gray)', fontSize: 15, maxWidth: 560, margin: '8px auto 0' }}
          >
            Discover HOMElove home expos across Malaysia. Furniture, renovation, home appliances, and exclusive deals. Free admission for everyone.
          </p>
        </div>
        <div ref={gridRef} className="exhibitions-grid">
          {events.map((event, i) => (
            <ExhibitionCard key={i} event={event} delay={i + 1} />
          ))}
        </div>
        <span className="swipe-hint">Swipe to see more</span>
        <div
          className="carousel-dots"
          style={{ display: 'none', justifyContent: 'center', gap: 8, marginTop: 12 }}
        >
          {events.map((_, i) => (
            <span
              key={i}
              style={{
                width: 24,
                height: 4,
                borderRadius: 2,
                background: i === activeDot ? 'var(--primary)' : '#d1d5db',
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }} className="animate-on-scroll">
          <a
            href="/exhibitions"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 700,
              transition: 'all 0.3s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'var(--primary-light)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(1,75,152,0.3)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'var(--primary)'
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            View All Exhibitions →
          </a>
        </div>
      </div>
    </section>
  )
}
