'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Exhibition } from '@/lib/api'
import { mediaUrl } from '@/lib/api'
import './exhibitions.css'

const STATES = [
  { label: 'All Locations', value: '' },
  { label: 'Kuala Lumpur', value: 'Kuala Lumpur' },
  { label: 'Selangor', value: 'Selangor' },
  { label: 'Penang', value: 'Penang' },
  { label: 'Johor', value: 'Johor' },
  { label: 'Pahang', value: 'Pahang' },
  { label: 'Sarawak', value: 'Sarawak' },
  { label: 'Sabah', value: 'Sabah' },
  { label: 'Melaka', value: 'Melaka' },
]

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  const sDay = s.getDate()
  const eDay = e.getDate()
  const month = s.toLocaleDateString('en-MY', { month: 'short' })
  const year = s.getFullYear()
  return `${sDay} – ${eDay} ${month} ${year}`
}

function formatMonth(date: string) {
  return new Date(date).toLocaleDateString('en-MY', { month: 'short' }).toUpperCase()
}

function formatDay(date: string) {
  return new Date(date).getDate()
}

function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function isLive(start: string, end: string) {
  const now = Date.now()
  // Treat end date as end of day (23:59:59)
  const endOfDay = new Date(end)
  endOfDay.setHours(23, 59, 59, 999)
  const startOfDay = new Date(start)
  startOfDay.setHours(0, 0, 0, 0)
  return startOfDay.getTime() <= now && endOfDay.getTime() >= now
}

export default function ExhibitionListing({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ state?: string }>
}) {
  const searchParams = use(searchParamsPromise)
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([])
  const [loading, setLoading] = useState(true)

  const currentState = searchParams.state || ''

  useEffect(() => {
    setLoading(true)
    const url = new URL(`${API_URL}/api/exhibitions`)
    url.searchParams.set('limit', '50')
    url.searchParams.set('sort', 'startDate')
    url.searchParams.set('depth', '1')
    if (currentState) {
      url.searchParams.set('where[state][equals]', currentState)
    }

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => setExhibitions(data.docs || []))
      .catch(() => setExhibitions([]))
      .finally(() => setLoading(false))
  }, [currentState])

  const upcoming = exhibitions.filter((e) => e.isUpcoming)
  const past = exhibitions.filter((e) => !e.isUpcoming)
  const featured = upcoming[0]

  return (
    <>
      {/* Hero — Featured Next Event or Generic */}
      <section className="exh-hero">
        <div className="exh-hero-overlay" />
        <Image
          src="/images/backgrounds/hero-bg.webp"
          alt=""
          className="exh-hero-bg"
          fill
          sizes="100vw"
          priority
          quality={75}
          style={{ objectFit: 'cover' }}
        />
        <div className="container">
          <div className="exh-hero-content">
            <h1>Find the best HOMElove<br /><span>home expo near you</span></h1>
            <p>Discover best home deals with over 300 top brands we have to offer across Malaysia! FREE admission with gifts at every venue and more.</p>

            {featured && (
              <div className="exh-hero-featured">
                <div className="featured-next-label">
                  <span className="happening-dot" />
                  Happening Now
                </div>
                <Link href={`/exhibitions/${featured.slug}`} className="featured-card">
                  <div className="featured-date-block">
                    <span className="featured-month">{formatMonth(featured.startDate)}</span>
                    <span className="featured-day">{formatDay(featured.startDate)}</span>
                  </div>
                  <div className="featured-info">
                    <h3>{featured.title}</h3>
                    <span className="featured-venue">{featured.venue}, {featured.state}</span>
                    <span className="featured-range">{formatDateRange(featured.startDate, featured.endDate)}</span>
                  </div>
                  {isLive(featured.startDate, featured.endDate) ? (
                    <div className="featured-live-badge">
                      <span className="live-dot" />LIVE
                    </div>
                  ) : (
                    <div className="featured-days">
                      <span className="featured-days-num">{daysUntil(featured.startDate)}</span>
                      <span className="featured-days-label">days</span>
                    </div>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* State Filter */}
      <section className="exh-filter">
        <div className="container">
          <div className="exh-filter-bar">
            {STATES.map((s) => (
              <Link
                key={s.value}
                href={s.value ? `/exhibitions?state=${s.value}` : '/exhibitions'}
                className={`filter-chip${currentState === s.value ? ' active' : ''}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibitions Grid */}
      <section className="exh-grid-section">
        <div className="container">
          {loading ? (
            <div className="exh-loading">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="exh-card-skeleton">
                  <div className="skeleton-image" />
                  <div className="skeleton-content">
                    <div className="skeleton-line wide" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                  </div>
                </div>
              ))}
            </div>
          ) : exhibitions.length === 0 ? (
            <div className="exh-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <h3>No HOMElove Expo found</h3>
              <p>{currentState ? `No expo found in ${currentState} right now. How about finding another location that could be near you?` : 'Check back soon for upcoming home expos across Malaysia.'}</p>
              {currentState && (
                <Link href="/exhibitions" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>
                  View All Locations
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Upcoming */}
              {upcoming.length > 0 && (
                <>
                  <div className="exh-section-header">
                    <div>
                      <h2 data-count={`${upcoming.length} event${upcoming.length > 1 ? 's' : ''}`}>Upcoming HOMElove Home Expo</h2>
                      <p className="exh-section-sub">At our expo, we offer you the best deals with quality top brands selection so you can get all your home needs under one roof.</p>
                    </div>
                    <span className="exh-count">{upcoming.length} event{upcoming.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="exh-grid exh-grid-upcoming">
                    {upcoming.map((exh) => (
                      <Link href={`/exhibitions/${exh.slug}`} key={exh.id} className="exh-card upcoming">
                        <div className="exh-card-image">
                          <Image
                            src={mediaUrl(exh.bannerImage) || '/images/events/event-kuching.png'}
                            alt={exh.bannerImage?.alt || exh.title}
                            width={640}
                            height={360}
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={75}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="exh-card-status-bar">
                          {isLive(exh.startDate, exh.endDate) ? (
                            <div className="exh-status-live">
                              <span className="live-dot" />LIVE NOW
                            </div>
                          ) : (
                            <div className="exh-status-countdown">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              {daysUntil(exh.startDate)} days to go
                            </div>
                          )}
                          <span className="exh-status-state">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            {exh.state}
                          </span>
                        </div>
                        <div className="exh-card-body">
                          <div className="exh-card-date-strip">
                            <div className="date-block">
                              <span className="date-month">{formatMonth(exh.startDate)}</span>
                              <span className="date-day">{formatDay(exh.startDate)}</span>
                            </div>
                            <div className="date-details">
                              <div className="exh-card-dates">{formatDateRange(exh.startDate, exh.endDate)}</div>
                              <div className="exh-card-location">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                {exh.state}
                              </div>
                            </div>
                          </div>
                          <h3>{exh.title}</h3>
                          <p className="exh-card-venue">{exh.venue}</p>
                          <div className="exh-card-footer">
                            {exh.brandCount && <span className="exh-brands-count">{exh.brandCount}+ brands</span>}
                            <span className="exh-card-cta">View Details →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {upcoming.length > 1 && <div className="swipe-hint exh-swipe-hint">Swipe to see more</div>}
                </>
              )}

              {/* Past */}
              {past.length > 0 && (
                <>
                  <div className="exh-section-header past">
                    <div>
                      <h2 data-count={`${past.length} event${past.length > 1 ? 's' : ''}`}>Past Events</h2>
                      <p className="exh-section-sub">Browse our previous exhibitions</p>
                    </div>
                    <span className="exh-count">{past.length} event{past.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="exh-grid past-grid">
                    {past.map((exh) => (
                      <Link href={`/exhibitions/${exh.slug}`} key={exh.id} className="exh-card past">
                        <div className="exh-card-image">
                          <Image
                            src={mediaUrl(exh.bannerImage) || '/images/events/event-kuching.png'}
                            alt={exh.bannerImage?.alt || exh.title}
                            width={640}
                            height={360}
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={75}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div className="exh-card-past-badge">Completed</div>
                        </div>
                        <div className="exh-card-body">
                          <div className="exh-card-dates">{formatDateRange(exh.startDate, exh.endDate)}</div>
                          <h3>{exh.title}</h3>
                          <p className="exh-card-venue">{exh.venue}, {exh.state}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Why Visit HOMElove */}
      <section className="exh-why-visit">
        <div className="container">
          <div className="exh-why-header">
            <h2>Why Visit a <span className="highlight">HOMElove Expo?</span></h2>
            <p>Everything you need for your home — all under one roof, with exclusive expo-only deals you won&apos;t find online or in stores.</p>
          </div>
          <div className="exh-why-grid">
            <div className="exh-why-card">
              <div className="exh-why-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3>Exclusive Expo Deals</h3>
              <p>Cashback, branded gifts and bundle offers you won&apos;t find anywhere else — only during the expo.</p>
            </div>
            <div className="exh-why-card">
              <div className="exh-why-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3>Top Home Brands</h3>
              <p>Browse 300+ booths featuring furniture, appliances, renovation, smart home and more from trusted Malaysian and global brands.</p>
            </div>
            <div className="exh-why-card">
              <div className="exh-why-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <h3>Everything Under One Roof</h3>
              <p>From kitchen to bedroom, smart locks to mattresses — shop every home category at one venue in one day.</p>
            </div>
            <div className="exh-why-card">
              <div className="exh-why-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Free Admission</h3>
              <p>Entry is always free. Shop all you want with your loved ones to build the perfect home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="exh-bottom-cta">
        <div className="container">
          <h2>Want to Exhibit at HOMElove?</h2>
          <p>Showcase your brand to thousands of home shoppers across Malaysia.</p>
          <Link href="/exhibit-with-us" className="btn btn-secondary">Enquire Here →</Link>
        </div>
      </section>
    </>
  )
}
