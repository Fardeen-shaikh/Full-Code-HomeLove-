'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import './about.css'

const STATS = [
  { value: 141, suffix: '+', label: 'Exhibitions Organised' },
  { value: 6173, suffix: '+', label: 'Trusted Exhibitors', format: 'comma' },
  { value: 5, suffix: 'M+', label: 'Happy Visitors' },
  { value: 8, suffix: '', label: 'Locations Nationwide' },
]

const MAP_PINS = [
  { city: 'Penang', left: '4.5%', top: '26%' },
  { city: 'Selangor', left: '12.6%', top: '51.6%', labelLeft: true },
  { city: 'Kuala Lumpur', left: '13.6%', top: '56.8%' },
  { city: 'Kuantan', left: '22.6%', top: '47.8%' },
  { city: 'Johor', left: '26.9%', top: '79.6%' },
  { city: 'Miri', left: '65%', top: '38.7%' },
  { city: 'Kuching', left: '42.9%', top: '80.4%' },
  { city: 'Kota Kinabalu', left: '79.1%', top: '15.5%' },
]

const LOCATIONS = [
  'Klang Valley', 'Penang', 'Johor Bahru', 'Kuching',
  'Kuantan', 'Kota Kinabalu', 'Miri', 'Melaka',
]

const STRENGTHS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Verified Track Record',
    description: 'Over a decade of hosting large-scale events across Malaysia.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: 'National Reach',
    description: 'We strategically organise exhibitions in every major region.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Expert Curation',
    description: 'Our team selects only the most reputable brands.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Massive Reach',
    description: 'Hosting hundreds of booths covering every aspect of household.',
  },
]

const MISSION_POINTS = [
  'Curate a wide range of high quality products with the best value in Malaysia for Malaysians',
  'Create a comfortable, safe environment for visitors and exhibitors alike',
  'Deliver exciting expos with value-added products and services',
  'Leverage the best in technology to develop products and services via digital platforms — accessible 24 hours a day, 7 days a week',
]

const VISION_POINTS = [
  'Increase presence nationwide in regions yet to be explored',
  'Develop and strengthen digital platforms for wider reach',
  'Bridge the gap between homeowners and products or vendors',
  'Implement a comprehensive CSR roadmap targeting marginalised groups — the elderly, disabled, single parents, and impoverished communities',
  'Promote environmental sustainability and attract exhibitors whose products are manufactured or sourced ethically',
  'Expand regionally to South East Asia and beyond',
]

function CountUp({ target, suffix, format }: { target: number; suffix: string; format?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1800
          const start = performance.now()
          function tick(now: number) {
            const p = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            const val = Math.round(target * ease)
            if (el) el.textContent = (format === 'comma' ? val.toLocaleString() : String(val)) + suffix
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, format])

  return <span ref={ref}>0{suffix}</span>
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function useTimelineProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  fillRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const section = sectionRef.current
    const fill = fillRef.current
    if (!section || !fill) return

    let ticking = false
    function update() {
      if (!section || !fill) return
      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight
      const total = rect.height
      const scrolled = viewportH * 0.5 - rect.top
      const progress = Math.max(0, Math.min(1, scrolled / total))
      fill.style.transform = `scaleY(${progress})`
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef, fillRef])
}

function JourneyBlock({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('dot-active')
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

export default function AboutPage() {
  const journeyRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  useTimelineProgress(journeyRef, fillRef)

  return (
    <>
      {/* Hero */}
      <section className="about-hero" id="about">
        <div className="about-hero-overlay" />
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-badge">Since 2015</div>
            <h1>Why HOMElove Home &amp; Living Exhibition?</h1>
            <p>Your trusted Home &amp; Living Exhibition since 2015</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item">
                <div className="stat-value">
                  <CountUp target={stat.value} suffix={stat.suffix} format={stat.format} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline — Our Story → Mission → Vision */}
      <section ref={journeyRef} className="about-journey" id="our-story">
        <div className="container">
          {/* Timeline line */}
          <div className="timeline-line">
            <div ref={fillRef} className="timeline-line-fill" />
          </div>

          {/* ===== OUR STORY ===== */}
          <JourneyBlock className="journey-block story-block">
            <div className="timeline-dot">
              <span className="timeline-year">2015</span>
            </div>
            <div className="journey-grid">
              <ScrollReveal className="journey-image slide-left">
                <Image
                  src="/images/backgrounds/hero-bg.webp"
                  alt="HOMElove Expo"
                  width={600}
                  height={400}
                  quality={75}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </ScrollReveal>
              <div className="journey-content">
                <ScrollReveal delay={100}>
                  <div className="journey-label">Our Story</div>
                  <h2>How It All Began</h2>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p>
                    HOMElove is one of Malaysia&apos;s leading home expos that brings everything you need for your home under one roof — from electrical systems and smart home technology to furniture, refurbishment, and renovation services.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <p>
                    With a team of truly inspiring professionals coming from the best in the home expo industry within Malaysia, we are dedicated to selecting quality exhibitors and ensuring visitor satisfaction at every expo we organise.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={400}>
                  <p>
                    Every HOMElove event promises a variety of great products, services and awesome ideas for the home, along with a carnival-like experience complete with gifts, lucky draws, and discount coupons.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={500}>
                  <p>
                    From the Klang Valley to the south in Johor Bahru and up North in Penang to Kuching in East Malaysia — HOMElove has successfully organised more than 10 events every year since 2015.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </JourneyBlock>

          {/* ===== MISSION ===== */}
          <JourneyBlock className="journey-block mission-block">
            <div className="timeline-dot">
              <span className="timeline-year">Present</span>
            </div>
            <div className="mission-card">
              <ScrollReveal>
                <div className="journey-label light">Our Mission</div>
                <h2>What Drives Us Today</h2>
                <p className="mission-intro">
                  Our mission at HOMElove is to be the best home expo organiser in Malaysia and to continue bringing homeowners and the best home improvement suppliers together.
                </p>
              </ScrollReveal>
              <div className="mission-points">
                {MISSION_POINTS.map((point, i) => (
                  <ScrollReveal key={i} delay={150 * (i + 1)} className="slide-right">
                    <div className="mission-point">
                      <div className="point-icon check">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{point}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </JourneyBlock>

          {/* ===== VISION ===== */}
          <JourneyBlock className="journey-block vision-block">
            <div className="timeline-dot">
              <span className="timeline-year">Future</span>
            </div>
            <div className="vision-content">
              <ScrollReveal>
                <div className="journey-label">Our Vision</div>
                <h2>Where We&apos;re Headed</h2>
                <p className="vision-intro">
                  HOMElove&apos;s vision is to further its commitment to be the best home expo organiser in Malaysia and beyond.
                </p>
              </ScrollReveal>
              <div className="vision-points">
                {VISION_POINTS.map((point, i) => (
                  <ScrollReveal key={i} delay={120 * (i + 1)} className="scale-in">
                    <div className="vision-point">
                      <div className="point-icon arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span>{point}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </JourneyBlock>
        </div>
      </section>

      {/* Strengths */}
      <section className="about-strengths" id="why-us">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose HOMElove</h2>
            <p>Malaysia&apos;s most trusted home exhibition for over a decade</p>
          </div>
          <div className="strengths-grid">
            {STRENGTHS.map((item) => (
              <div key={item.title} className="strength-card">
                <div className="strength-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="about-locations" id="locations">
        <div className="container">
          <div className="locations-grid">
            <div className="locations-content">
              <div className="section-badge">Nationwide Presence</div>
              <h2>Expos Across Malaysia</h2>
              <p>We organise exhibitions in major cities and convention centres across the country, bringing home solutions closer to Malaysians everywhere.</p>
              <div className="location-tags">
                {LOCATIONS.map((loc) => (
                  <span key={loc} className="location-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div className="locations-map">
              <div className="map-container">
                <Image src="/images/map/Blank_malaysia_map.png" alt="HOMElove locations across Malaysia" width={600} height={400} quality={75} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
                {MAP_PINS.map((pin) => (
                  <div
                    key={pin.city}
                    className="about-map-pin"
                    style={{ left: pin.left, top: pin.top }}
                  >
                    <svg width="22" height="30" viewBox="0 0 24 32" fill="var(--primary)">
                      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                    </svg>
                    <span className={`about-pin-label${pin.labelLeft ? ' label-left' : ''}`}>
                      {pin.city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organiser */}
      <section className="about-org" id="organiser">
        <div className="container">
          <div className="org-card">
            <div className="org-logo">
              <Image src="/logos/homelove/homelove-blue.png" alt="HOMElove" width={180} height={60} quality={75} loading="lazy" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="org-content">
              <h3>Organised by</h3>
              <p className="org-name">Empire Asia Events Marketing Sdn. Bhd. <span>(1102402-K)</span></p>
              <p className="org-address">
                Unit D-3A-01 Capital 4, Oasis Square, No.2, Jalan PJU 1A/7A<br />
                Oasis Damansara, 47301 Petaling Jaya, Selangor, Malaysia
              </p>
              <div className="org-contacts">
                <a href="mailto:info@homelove.com.my">info@homelove.com.my</a>
                <a href="tel:+60376202672">+603-7620 2672</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
