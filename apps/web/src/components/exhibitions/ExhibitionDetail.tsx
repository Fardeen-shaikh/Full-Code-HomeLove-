'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Exhibition, CrazyDeal, DiscountCoupon, FeaturedBrand } from '@/lib/api'
import { submitSubscriber, mediaUrl, createSession, getSession, updateSession } from '@/lib/api'
import { executeRecaptcha } from '@/lib/recaptcha'
import './exhibitions.css'

function optimizedImg(src: string, width: number, quality = 75): string {
  if (!src || src.startsWith('data:')) return src
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getDate()} – ${e.getDate()} ${s.toLocaleDateString('en-MY', { month: 'long' })} ${s.getFullYear()}`
}

function formatTime(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return `${days[s.getDay()]} – ${days[e.getDay()]} | 10am – 9pm`
}

function useCountdown(targetDate: string) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }
    setTime(calc())
    const timer = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return time
}

function generateGoogleCalendarUrl(exh: Exhibition) {
  const start = new Date(exh.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const end = new Date(exh.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(exh.title)}&dates=${start}/${end}&location=${encodeURIComponent(exh.venue + ', ' + exh.state)}&details=${encodeURIComponent('HOMElove Home Expo - Free Admission!')}`
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = document.cookie.match(/homelove_session=([^;]+)/)?.[1]
  if (!id) {
    id = crypto.randomUUID()
    document.cookie = `homelove_session=${id};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
  }
  return id
}

const MALAYSIAN_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka',
  'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
]

function ScratchCard({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const scratched = useRef(0)
  const done = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Gold gradient fill
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    grad.addColorStop(0, '#C9A84C')
    grad.addColorStop(0.3, '#F0D278')
    grad.addColorStop(0.5, '#C9A84C')
    grad.addColorStop(0.7, '#F0D278')
    grad.addColorStop(1, '#C9A84C')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Diagonal lines
    ctx.strokeStyle = 'rgba(0,0,0,0.04)'
    ctx.lineWidth = 1
    for (let i = -rect.height; i < rect.width + rect.height; i += 8) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i + rect.height, rect.height)
      ctx.stroke()
    }

    // Text
    ctx.fillStyle = '#6B4D1A'
    ctx.font = `bold ${13}px Poppins, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.letterSpacing = '2px'
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2)
  }, [])

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current
    if (!canvas || done.current) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const cx = x - rect.left
    const cy = y - rect.top

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(cx, cy, 20, 0, Math.PI * 2)
    ctx.fill()

    scratched.current += 1
    if (scratched.current > 15 && !done.current) {
      done.current = true
      // Fade out remaining
      canvas.style.transition = 'opacity 0.5s'
      canvas.style.opacity = '0'
      setTimeout(onComplete, 600)
    }
  }

  function handleStart() { isDrawing.current = true }
  function handleEnd() { isDrawing.current = false }
  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current) return
    const pos = 'touches' in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY }
    scratch(pos.x, pos.y)
  }

  return (
    <div className="deal-scratch-area">
      <div className="scratch-hidden-price">
        <span>RM ???</span>
      </div>
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onMouseMove={handleMove}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={handleMove}
      />
    </div>
  )
}

export default function ExhibitionDetail({
  exhibition,
  crazyDeals,
  coupons,
  brands,
}: {
  exhibition: Exhibition
  crazyDeals: CrazyDeal[]
  coupons: DiscountCoupon[]
  brands: FeaturedBrand[]
}) {
  const countdown = useCountdown(exhibition.startDate)
  const isLive = new Date(exhibition.startDate) <= new Date() && new Date(exhibition.endDate) >= new Date()
  const isPast = new Date(exhibition.endDate) < new Date()

  // Subscription form
  const [subForm, setSubForm] = useState({ name: '', phone: '', email: '', state: exhibition.state })
  const [subStatus, setSubStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [showSubForm, setShowSubForm] = useState(false)

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Favourites drawer
  const [showFavDrawer, setShowFavDrawer] = useState(false)

  // Contest popup
  const [showContest, setShowContest] = useState(false)
  const [contestForm, setContestForm] = useState({ name: '', email: '', phone: '' })
  const [contestStatus, setContestStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  // Favourites
  const [favourites, setFavourites] = useState<Set<string>>(new Set())
  const [sessionDbId, setSessionDbId] = useState<string | null>(null)

  // Deal reveal
  const [revealedDeals, setRevealedDeals] = useState<Set<string>>(new Set())
  const [revealingAll, setRevealingAll] = useState(false)
  const [dealFormId, setDealFormId] = useState<string | null>(null)
  const [dealForm, setDealForm] = useState({ name: '', phone: '', email: '' })
  const [dealFormStatus, setDealFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  // Load favourites from session
  useEffect(() => {
    const sid = getSessionId()
    if (!sid) return

    getSession(sid).then((session) => {
      if (session) {
        setSessionDbId(session.id)
        if (session.favourites) setFavourites(new Set(session.favourites))
      } else {
        createSession(sid).then((res) => setSessionDbId(res.doc.id))
      }
    }).catch(() => {})
  }, [])

  const toggleFavourite = useCallback((dealId: string) => {
    setFavourites((prev) => {
      const next = new Set(prev)
      if (next.has(dealId)) next.delete(dealId)
      else next.add(dealId)

      // Persist to DB
      if (sessionDbId) {
        updateSession(sessionDbId, { favourites: Array.from(next) }).catch(() => {})
      }

      return next
    })
  }, [sessionDbId])

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setSubStatus('sending')
    try {
      const captchaToken = (await executeRecaptcha('event_subscribe')) ?? undefined
      await submitSubscriber({
        ...subForm,
        source: 'event',
        captchaToken,
        captchaAction: 'event_subscribe',
      })
      setSubStatus('sent')
    } catch {
      setSubStatus('error')
    }
  }

  async function handleDealReveal(e: React.FormEvent) {
    e.preventDefault()
    if (!dealFormId) return
    setDealFormStatus('sending')

    try {
      const captchaToken = (await executeRecaptcha('deal_reveal')) ?? undefined
      await submitSubscriber({
        ...dealForm,
        state: exhibition.state,
        source: 'event',
        captchaToken,
        captchaAction: 'deal_reveal',
      })
    } catch {
      // still reveal even if subscribe fails
    }

    // Reveal the deal
    setRevealedDeals((prev) => new Set(prev).add(dealFormId))
    setDealFormStatus('sent')

    // Find the deal to send WhatsApp
    const deal = crazyDeals.find((d) => d.id === dealFormId)
    if (deal) {
      const msg = `Hi! I'm interested in this HOMElove Crazy Deal:\n\n*${deal.title}*${deal.brand ? ` by ${deal.brand}` : ''}\n${deal.dealPrice ? `Deal Price: RM ${deal.dealPrice.toLocaleString()}` : ''}${deal.originalPrice ? ` (was RM ${deal.originalPrice.toLocaleString()})` : ''}\n\nEvent: ${exhibition.title}\n\nPlease share more details!`
      setTimeout(() => {
        window.open(`https://wa.me/60102323620?text=${encodeURIComponent(msg)}`, '_blank')
      }, 1500)
    }

    // Reset form for next deal
    setTimeout(() => {
      setDealFormId(null)
      setDealFormStatus('idle')
    }, 3000)
  }

  async function handleContestSubmit(e: React.FormEvent) {
    e.preventDefault()
    setContestStatus('sending')
    // TODO: POST to a contest submissions endpoint
    await new Promise((r) => setTimeout(r, 1000))
    setContestStatus('sent')
  }

  function shareDealOnWhatsApp(deal: CrazyDeal) {
    const imageUrl = mediaUrl(deal.image)
    const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`
    const text = `Hi! I'd like to enquire about this deal from *${exhibition.title}*.\n\n${fullImageUrl}\n\nPlease share more details!`
    window.open(`https://wa.me/60102323620?text=${encodeURIComponent(text)}`, '_blank')
  }

  const previewDeals = crazyDeals.slice(0, 8)

  function revealAllDeals() {
    if (revealingAll) return
    const unrevealed = previewDeals.filter((d) => !revealedDeals.has(d.id))
    if (unrevealed.length === 0) return
    setRevealingAll(true)

    // Preload & decode all deal images BEFORE triggering the reveal animation.
    // This prevents the flip from stuttering while the browser decodes images.
    const preloads = unrevealed.map((deal) => {
      const src = mediaUrl(deal.image)
      if (!src) return Promise.resolve()
      return new Promise<void>((resolve) => {
        const img = new window.Image()
        img.onload = () => resolve()
        img.onerror = () => resolve()
        img.src = optimizedImg(src, 384)
      })
    })

    Promise.all(preloads).then(() => {
      // All images decoded — now trigger reveal in a single render.
      // CSS animation-delay handles the staggered wave on the GPU.
      setRevealedDeals((prev) => {
        const next = new Set(prev)
        unrevealed.forEach((d) => next.add(d.id))
        return next
      })
      const totalMs = unrevealed.length * 70 + 700
      setTimeout(() => setRevealingAll(false), totalMs)
    })
  }
  const bannerUrl = mediaUrl(exhibition.bannerImage) || '/images/events/event-kuching.png'
  const tncSlug = typeof exhibition.tncPage === 'object' && exhibition.tncPage ? exhibition.tncPage.slug : null

  return (
    <>
      {/* ===== HERO — SPLIT: Left info, Right banner ===== */}
      <section className="ed-hero">
        <div className="ed-hero-bg-wrap">
          <div className="ed-hero-gradient" />
        </div>
        <div className="container">
          <div className="ed-hero-grid">
            <div className="ed-hero-info">
              {isLive && (
                <div className="ed-live-badge"><span className="live-dot" />HAPPENING NOW</div>
              )}
              {isPast && <div className="ed-past-badge">Event Completed</div>}
              <h1>{exhibition.title}</h1>
              <div className="ed-hero-meta">
                <div className="ed-meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  <span>{formatDateRange(exhibition.startDate, exhibition.endDate)}</span>
                </div>
                <div className="ed-meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span>{exhibition.venue}, {exhibition.state}</span>
                </div>
                <div className="ed-meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <span>{formatTime(exhibition.startDate, exhibition.endDate)}</span>
                </div>
                {exhibition.brandCount && (
                  <div className="ed-meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    <span>{exhibition.brandCount}+ participating brands</span>
                  </div>
                )}
              </div>

              {/* Countdown */}
              {exhibition.countdownEnabled && !isPast && !isLive && (
                <div className="ed-countdown">
                  <div className="ed-cd-item"><span className="ed-cd-val">{countdown.days}</span><span className="ed-cd-lbl">Days</span></div>
                  <span className="ed-cd-sep">:</span>
                  <div className="ed-cd-item"><span className="ed-cd-val">{countdown.hours}</span><span className="ed-cd-lbl">Hours</span></div>
                  <span className="ed-cd-sep">:</span>
                  <div className="ed-cd-item"><span className="ed-cd-val">{countdown.minutes}</span><span className="ed-cd-lbl">Min</span></div>
                  <span className="ed-cd-sep">:</span>
                  <div className="ed-cd-item"><span className="ed-cd-val">{countdown.seconds}</span><span className="ed-cd-lbl">Sec</span></div>
                </div>
              )}

              {/* CTAs */}
              <div className="ed-ctas">
                <a href={generateGoogleCalendarUrl(exhibition)} target="_blank" rel="noopener noreferrer" className="btn btn-primary ed-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  Add to Calendar
                </a>
                <button type="button" className="btn btn-secondary ed-btn" onClick={() => setShowSubForm(!showSubForm)}>
                  Get Event Updates
                </button>
                <a
                  href={exhibition.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${exhibition.venue}, ${exhibition.state}, Malaysia`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ed-btn ed-btn-outline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  Get Directions
                </a>
                {tncSlug && (
                  <Link href={`/p/${tncSlug}`} className="btn ed-btn ed-btn-outline">
                    Terms &amp; Conditions
                  </Link>
                )}
              </div>
            </div>

            <div className="ed-hero-banner">
              <Image src={bannerUrl} alt={exhibition.bannerImage?.alt || exhibition.title} width={1200} height={500} quality={75} priority sizes="100vw" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Subscription form */}
      {showSubForm && (
        <section className="exh-subscribe" id="subscribe">
          <div className="container">
            <div className="subscribe-card">
              <h3>Get Latest Deals &amp; Event Updates</h3>
              {subStatus === 'sent' ? (
                <p className="sub-success">Thank you! You&apos;ll receive updates about this event.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="subscribe-form">
                  <input type="text" placeholder="Name *" value={subForm.name} onChange={(e) => setSubForm({ ...subForm, name: e.target.value })} required />
                  <input type="tel" placeholder="Phone *" value={subForm.phone} onChange={(e) => setSubForm({ ...subForm, phone: e.target.value })} required />
                  <input type="email" placeholder="Email *" value={subForm.email} onChange={(e) => setSubForm({ ...subForm, email: e.target.value })} required />
                  <select value={subForm.state} onChange={(e) => setSubForm({ ...subForm, state: e.target.value })} required>
                    {MALAYSIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button type="submit" className="btn btn-secondary" disabled={subStatus === 'sending'}>
                    {subStatus === 'sending' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                  {subStatus === 'error' && <p className="sub-error">Something went wrong.</p>}
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== EVENT HIGHLIGHTS ===== */}
      <section className="ed-highlights" id="details">
        <div className="container">
          {/* Stats strip */}
          <div className="ed-stats-strip">
            <div className="ed-stat-item">
              <span className="ed-stat-icon">🎟️</span>
              <div>
                <div className="ed-stat-value">Free</div>
                <div className="ed-stat-label">Admission</div>
              </div>
            </div>
            {exhibition.brandCount && (
              <div className="ed-stat-item">
                <span className="ed-stat-icon">🏪</span>
                <div>
                  <div className="ed-stat-value">{exhibition.brandCount}+</div>
                  <div className="ed-stat-label">Brands</div>
                </div>
              </div>
            )}
            <div className="ed-stat-item">
              <span className="ed-stat-icon">📅</span>
              <div>
                <div className="ed-stat-value">{Math.ceil((new Date(exhibition.endDate).getTime() - new Date(exhibition.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1}</div>
                <div className="ed-stat-label">Days</div>
              </div>
            </div>
            <div className="ed-stat-item">
              <span className="ed-stat-icon">📍</span>
              <div>
                <div className="ed-stat-value">{exhibition.state}</div>
                <div className="ed-stat-label">{exhibition.venue}</div>
              </div>
            </div>
            {tncSlug && (
              <Link href={`/p/${tncSlug}`} className="ed-stat-item ed-stat-link">
                <span className="ed-stat-icon">📋</span>
                <div>
                  <div className="ed-stat-value">T&amp;C</div>
                  <div className="ed-stat-label">View Terms →</div>
                </div>
              </Link>
            )}
          </div>

        </div>
      </section>

      {/* ===== PROGRAM ===== */}
      {exhibition.programs && exhibition.programs.length > 0 && (
        <section className="exh-program" id="programs">
          <div className="container">
            <div className="ed-programs-section">
              <div className="ed-programs-header">
                <h2>Program</h2>
                <p>Exciting activities and rewards waiting for you at the expo</p>
              </div>
              <div className="ed-programs-scroll">
                {exhibition.programs.map((prog, i) => (
                  <div key={i} className="ed-program-sq-card">
                    <div className="ed-program-sq-img">
                      {mediaUrl(prog.image) && (
                        <Image
                          src={mediaUrl(prog.image)}
                          alt={prog.title}
                          width={420}
                          height={420}
                          quality={78}
                          loading="lazy"
                          sizes="(max-width: 640px) 78vw, 320px"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    <div className="ed-program-sq-body">
                      <h4>{prog.title}</h4>
                      {prog.description && <p>{prog.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
              {tncSlug && (
                <div className="ed-programs-tnc">
                  <Link href={`/p/${tncSlug}`} className="btn btn-primary ed-programs-tnc-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                    View Terms &amp; Conditions
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTEST SECTION — Vibrant ===== */}
      {exhibition.contest?.enabled && (
        <section className="ed-contest" id="contest">
          <div className="container">
            <div className="contest-banner">
              <div className="contest-confetti">
                <span /><span /><span /><span /><span />
              </div>
              <div className="contest-banner-content">
                <div className="contest-icon-wrap">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h2>{exhibition.contest.title || 'Contest'}</h2>
                {exhibition.contest.description && <p>{exhibition.contest.description}</p>}
                <div className="contest-prizes">
                  <div className="prize-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a7 7 0 100-14 7 7 0 000 14z" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" /></svg>
                    Win Amazing Prizes
                  </div>
                  <div className="prize-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /></svg>
                    Open to All
                  </div>
                  <div className="prize-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    Limited Time
                  </div>
                </div>
                <button type="button" className="btn btn-secondary contest-join-btn" onClick={() => setShowContest(true)}>
                  Join Now — It&apos;s Free!
                </button>
              </div>
              {exhibition.contest.image && (
                <div className="contest-banner-image">
                  <Image src={mediaUrl(exhibition.contest.image)} alt={exhibition.contest.title || 'Contest'} width={800} height={400} quality={75} loading="lazy" sizes="(max-width: 768px) 100vw, 800px" style={{ width: '100%', height: 'auto' }} />
                </div>
              )}
            </div>
          </div>

          {/* Contest popup form */}
          {showContest && (
            <div className="contest-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowContest(false) }}>
              <div className="contest-popup">
                <button className="contest-close" onClick={() => setShowContest(false)} type="button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
                <div className="contest-popup-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </div>
                <h3>{exhibition.contest.title || 'Join Contest'}</h3>
                <p className="contest-popup-desc">Fill in your details to enter the contest</p>
                {contestStatus === 'sent' ? (
                  <div className="contest-success">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <h4>You&apos;re In!</h4>
                    <p>Your contest entry has been submitted. Good luck! Winners will be announced at the expo.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContestSubmit} className="contest-form">
                    <input type="text" placeholder="Full Name *" value={contestForm.name} onChange={(e) => setContestForm({ ...contestForm, name: e.target.value })} required />
                    <input type="email" placeholder="Email *" value={contestForm.email} onChange={(e) => setContestForm({ ...contestForm, email: e.target.value })} required />
                    <input type="tel" placeholder="Phone *" value={contestForm.phone} onChange={(e) => setContestForm({ ...contestForm, phone: e.target.value })} required />
                    <button type="submit" className="btn btn-secondary" disabled={contestStatus === 'sending'} style={{ width: '100%', borderRadius: '50px' }}>
                      {contestStatus === 'sending' ? 'Submitting...' : 'Submit My Entry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ===== CRAZY DEALS — Mystery Box reveal ===== */}
      {previewDeals.length > 0 && (
        <section className="exh-deals" id="crazy-deals">
          <div className="container">
            <div className="ed-deals-header">
              <h2 className="section-title">Crazy Deals</h2>
              <p>Tap any mystery box to reveal all exclusive expo-only deals!</p>
              <div className="deals-progress">
                <span className="deals-progress-text">
                  🎁 {revealedDeals.size} of {previewDeals.length} deals revealed
                </span>
                <div className="deals-progress-bar">
                  <div className="deals-progress-fill" style={{ width: `${(revealedDeals.size / previewDeals.length) * 100}%` }} />
                </div>
                {revealedDeals.size === previewDeals.length && (
                  <div className="deals-all-revealed">All deals unlocked! Visit the expo to grab them! 🎉</div>
                )}
              </div>
              {revealedDeals.size < previewDeals.length && (
                <button
                  type="button"
                  className="deals-reveal-all-btn"
                  onClick={revealAllDeals}
                  disabled={revealingAll}
                >
                  {revealingAll ? (
                    <>
                      <span className="deals-reveal-spinner" />
                      Revealing…
                    </>
                  ) : (
                    <>🎁 Reveal All Deals</>
                  )}
                </button>
              )}
            </div>
            <div className="deals-grid">
              {previewDeals.map((deal, i) => (
                <div
                  key={deal.id}
                  className={`deal-card${revealedDeals.has(deal.id) ? ' revealed' : ''}`}
                  style={{ ['--deal-delay' as string]: `${i * 80}ms` }}
                >
                  {revealedDeals.has(deal.id) ? (
                    /* ===== REVEALED STATE — image only ===== */
                    <div className="deal-revealed-card">
                      {mediaUrl(deal.image) && (
                        <div className="deal-revealed-image">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={optimizedImg(mediaUrl(deal.image), 384)} alt={deal.title} />
                        </div>
                      )}
                      <div className="deal-revealed-actions">
                        <button
                          type="button"
                          className="deal-wa-btn-sm"
                          onClick={() => shareDealOnWhatsApp(deal)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                          Enquire
                        </button>
                        <button
                          type="button"
                          className={`deal-fav-btn-sm${favourites.has(deal.id) ? ' active' : ''}`}
                          onClick={() => toggleFavourite(deal.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill={favourites.has(deal.id) ? 'var(--secondary)' : 'none'} stroke={favourites.has(deal.id) ? 'var(--secondary)' : '#999'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ===== MYSTERY BOX STATE — tap any box to reveal ALL ===== */
                    <button
                      type="button"
                      className="mystery-box"
                      onClick={revealAllDeals}
                      disabled={revealingAll}
                      aria-label="Tap to reveal all mystery deals"
                    >
                      <div className="mystery-box-glow" />
                      <div className="mystery-box-icon">🎁</div>
                      <div className="mystery-box-label">Tap to Reveal</div>
                      <div className="mystery-box-hint">Mystery Deal</div>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {crazyDeals.length > 8 && (
              <div className="deals-cta">
                <Link href={`/p/crazy-deals-${exhibition.slug}`} className="btn btn-primary">
                  Browse All {crazyDeals.length} Deals →
                </Link>
              </div>
            )}

            {/* Favourites summary */}
            {favourites.size > 0 && (
              <button type="button" className="fav-summary" onClick={() => setShowFavDrawer(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--secondary)" stroke="var(--secondary)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                <span>{favourites.size} item{favourites.size > 1 ? 's' : ''} saved — View My List →</span>
              </button>
            )}
          </div>

          {/* Deal reveal popup form */}
          {dealFormId && (
            <div className="deal-form-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setDealFormId(null); setDealFormStatus('idle') } }}>
              <div className="deal-form-popup">
                <button className="contest-close" onClick={() => { setDealFormId(null); setDealFormStatus('idle') }} type="button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {dealFormStatus === 'sent' ? (
                  <div className="deal-form-success">
                    <div className="deal-form-check">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3>Deal Revealed!</h3>
                    <p>Price details are being sent to your WhatsApp. Check your phone!</p>
                    <div className="deal-form-wa-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Opening WhatsApp...
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="deal-form-header">
                      <div className="deal-form-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                      <h3>Reveal This Deal</h3>
                      <p>Enter your details to see the exclusive price. We&apos;ll also send the deal info to your WhatsApp!</p>
                    </div>
                    <form onSubmit={handleDealReveal} className="deal-form-fields">
                      <input type="text" placeholder="Your Name *" value={dealForm.name} onChange={(e) => setDealForm({ ...dealForm, name: e.target.value })} required />
                      <input type="tel" placeholder="WhatsApp Number *" value={dealForm.phone} onChange={(e) => setDealForm({ ...dealForm, phone: e.target.value })} required />
                      <input type="email" placeholder="Email *" value={dealForm.email} onChange={(e) => setDealForm({ ...dealForm, email: e.target.value })} required />
                      <button type="submit" className="btn btn-secondary deal-form-submit" disabled={dealFormStatus === 'sending'}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        {dealFormStatus === 'sending' ? 'Revealing...' : 'Reveal & Send to WhatsApp'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ===== LOCATION & DIRECTIONS ===== */}
      <section className="exh-location" id="location">
        <div className="container">
          <div className="ed-map-wrap">
            <h3>Location &amp; Directions</h3>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(exhibition.venue + ', ' + exhibition.state + ', Malaysia')}&output=embed`}
              width="100%"
              height="320"
              style={{ border: 0, borderRadius: '14px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${exhibition.venue}`}
            />
            <div className="ed-map-info">
              <div>
                <strong>{exhibition.venue}</strong>
                <span>{exhibition.state}, Malaysia</span>
              </div>
            </div>
            <div className="ed-map-actions">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(exhibition.venue + ', ' + exhibition.state + ', Malaysia')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-map-action-btn primary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                Get Directions
              </a>
              <Link href={tncSlug ? `/p/${tncSlug}` : '/terms-conditions'} className="ed-map-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                View T&amp;C
              </Link>
            </div>
          </div>

          {/* Get Event Updates — compact subscribe */}
          <div className="ed-inline-subscribe exh-location-subscribe">
            <h4>Get Event Updates</h4>
            {subStatus === 'sent' ? (
              <p className="sub-success-inline">You&apos;re subscribed! We&apos;ll keep you updated.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="ed-inline-form">
                <div className="ed-inline-fields">
                  <input type="text" placeholder="Name" value={subForm.name} onChange={(e) => setSubForm({ ...subForm, name: e.target.value })} required />
                  <input type="tel" placeholder="Phone" value={subForm.phone} onChange={(e) => setSubForm({ ...subForm, phone: e.target.value })} required />
                  <input type="email" placeholder="Email" value={subForm.email} onChange={(e) => setSubForm({ ...subForm, email: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary ed-inline-btn" disabled={subStatus === 'sending'}>
                  {subStatus === 'sending' ? 'Subscribing...' : 'Subscribe →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== BRANDS — Marquee carousel ===== */}
      {brands.length > 0 && (
        <section className="exh-brands" id="brands">
          <div className="container">
            <h2 className="section-title">Participating Top Brands</h2>
            <p className="section-subtitle">{brands.length}+ trusted and top brands exclusively at {exhibition.city || exhibition.state} HOMElove home expo</p>
          </div>
          <div className="exh-brands-marquee">
            <div className="exh-brands-track">
              {[...brands, ...brands].map((brand, i) => (
                <div key={`${brand.id}-${i}`} className="exh-brand-logo-wrap">
                  <Image src={mediaUrl(brand.logo)} alt={brand.name} width={160} height={80} quality={75} loading="lazy" style={{ width: 'auto', height: '50px', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== DISCOUNT COUPONS ===== */}
      {coupons.length > 0 && (
        <section className="exh-coupons" id="coupons">
          <div className="container">
            <h2 className="section-title">Discount Coupons</h2>
            <div className="coupons-grid">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="coupon-card">
                  {coupon.image && (
                    <Image src={mediaUrl(coupon.image)} alt={coupon.title} width={300} height={200} quality={75} loading="lazy" className="coupon-image" sizes="(max-width: 768px) 100vw, 300px" style={{ width: '100%', height: 'auto' }} />
                  )}
                  <div className="coupon-body">
                    <h4>{coupon.title}</h4>
                    {coupon.description && <p>{coupon.description}</p>}
                    {coupon.code && <span className="coupon-code">{coupon.code}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      {exhibition.faq && exhibition.faq.length > 0 && (
        <section className="exh-faq" id="faq">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {exhibition.faq.map((item, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' active' : ''}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)} type="button">
                    <span>{item.question}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="faq-chevron"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="faq-answer"><p>{item.answer}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BOTTOM CTA ===== */}
      <section className="ed-bottom-cta">
        <div className="container">
          <h2>Want to Exhibit at This Event?</h2>
          <p>Showcase your brand to thousands of home shoppers.</p>
          <Link href="/exhibit-with-us" className="btn btn-secondary">Enquire About Exhibiting →</Link>
        </div>
      </section>

      {/* ===== FLOATING FAVOURITES BUTTON ===== */}
      {favourites.size > 0 && (
        <button type="button" className="fav-float-btn" onClick={() => setShowFavDrawer(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
          <span className="fav-float-count">{favourites.size}</span>
          My Favourites
        </button>
      )}

      {/* ===== FAVOURITES DRAWER ===== */}
      {showFavDrawer && (
        <div className="fav-drawer-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowFavDrawer(false) }}>
          <div className="fav-drawer">
            <div className="fav-drawer-header">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--secondary)" stroke="var(--secondary)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                My Favourites ({favourites.size})
              </h3>
              <button type="button" className="fav-drawer-close" onClick={() => setShowFavDrawer(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="fav-drawer-list">
              {crazyDeals.filter((d) => favourites.has(d.id)).map((deal) => (
                <div key={deal.id} className="fav-drawer-item">
                  <div className="fav-drawer-img">
                    <Image src={mediaUrl(deal.image)} alt={deal.title} width={80} height={80} quality={75} loading="lazy" sizes="80px" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <div className="fav-drawer-info">
                    <h4>{deal.title}</h4>
                    {deal.brand && <span className="fav-drawer-brand">{deal.brand}</span>}
                    <div className="fav-drawer-prices">
                      {deal.originalPrice && <span className="deal-original">RM {deal.originalPrice}</span>}
                      {deal.dealPrice && <span className="deal-price">RM {deal.dealPrice}</span>}
                    </div>
                  </div>
                  <button type="button" className="fav-drawer-remove" onClick={() => toggleFavourite(deal.id)} aria-label="Remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              ))}
              {favourites.size === 0 && (
                <p className="fav-drawer-empty">No items saved yet. Tap the heart icon on deals you like.</p>
              )}
            </div>
            <div className="fav-drawer-footer">
              <p>Bring this list to the expo to compare deals!</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
