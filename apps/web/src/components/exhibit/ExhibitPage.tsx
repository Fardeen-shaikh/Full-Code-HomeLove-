'use client'

import { useState } from 'react'
import Image from 'next/image'
import { submitExhibitorInquiry } from '@/lib/api'
import './exhibit.css'

const BENEFITS = [
  {
    color: '#E08103',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Meet High-Intent Shoppers',
    description: 'Reach visitors ready to buy.',
  },
  {
    color: '#CB1510',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    title: 'Showcase Your Products',
    description: 'Present your brand directly.',
  },
  {
    color: '#014B98',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: 'Generate Leads & Sales',
    description: 'Turn interest into business.',
  },
  {
    color: '#E08103',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Build Brand Awareness',
    description: 'Increase visibility and trust.',
  },
  {
    color: '#CB1510',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Launch Promotions',
    description: 'Highlight offers and new products.',
  },
  {
    color: '#014B98',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: 'Expand Market Reach',
    description: 'Grow your presence in Malaysia.',
  },
]

const CATEGORIES = [
  { name: 'Furniture', icon: '🪑' },
  { name: 'Home Appliances', icon: '🏠' },
  { name: 'Kitchen Solutions', icon: '🍳' },
  { name: 'Renovation & Interiors', icon: '🔨' },
  { name: 'Bathroom & Sanitary', icon: '🚿' },
  { name: 'Mattresses & Sofas', icon: '🛋️' },
  { name: 'Smart Home', icon: '📱' },
  { name: 'Flooring & Curtains', icon: '🪟' },
  { name: 'Home Security', icon: '🔒' },
  { name: 'Home Essentials', icon: '✨' },
]

const STEPS = [
  {
    number: '01',
    title: 'Submit Your Inquiry',
    description: 'Share your business details and exhibition interest through the form.',
  },
  {
    number: '02',
    title: 'Get Contacted by Our Team',
    description: 'Our team will review your inquiry and reach out with relevant details.',
  },
  {
    number: '03',
    title: 'Explore Suitable Options',
    description: 'Discuss booth opportunities, event participation, and the best fit for your brand.',
  },
  {
    number: '04',
    title: 'Join HOMElove Home Expo',
    description: 'Be part of a home-focused expo experience and connect with ready-to-shop visitors.',
  },
]

const VENUES = [
  'Sunway Pyramid Convention Centre, Selangor',
  'Pavilion Bukit Jalil Exhibition Centre, KL',
  'Stadium Bukit Jalil Car Park B, KL',
  'Mid Valley Exhibition Centre, KL',
  'Boulevard Shopping Mall Carpark, Miri',
  'Borneo Convention Centre Kuching',
  'Penang International Convention Centre Arena',
  'Setia SPICE Convention Centre, Penang',
  'Mid Valley Exhibition Centre Southkey, Johor',
  'Sabah International Convention Centre',
]

const EVENT_PHOTOS = [
  { src: '/images/events/event-kuching.png', alt: 'HOMElove Expo Kuching' },
  { src: '/images/events/event-penang.jpeg', alt: 'HOMElove Expo Penang' },
  { src: '/images/backgrounds/hero-bg.webp', alt: 'HOMElove Expo crowd' },
  { src: '/images/events/event-kuching.png', alt: 'HOMElove Expo booth' },
]

const TRUST_BRANDS = [
  'samsung', 'lg', 'panasonic', 'midea', 'sharp', 'cuckoo',
  'serta', 'yale', 'philips', 'daikin',
]

const TRUST_STATS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    value: '8+',
    label: 'Locations Nationwide',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    value: '5M+',
    label: 'Visitor Traffic',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    value: '141+',
    label: 'Expos Organised',
  },
]

export default function ExhibitPage() {
  const [form, setForm] = useState({
    email: '',
    phone: '',
    venue: '',
    company: '',
    product: '',
    additionalInfo: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitExhibitorInquiry({
        email: form.email,
        phone: form.phone,
        exhibitVenue: form.venue,
        companyName: form.company,
        productService: form.product,
        additionalInfo: form.additionalInfo || undefined,
      })
      setStatus('sent')
      setForm({ email: '', phone: '', venue: '', company: '', product: '', additionalInfo: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* 1. Hero Banner — Split: left content, right form */}
      <section className="exhibit-hero" id="exhibit">
        <div className="exhibit-hero-overlay" />
        <div className="container">
          <div className="exhibit-hero-grid">
            {/* Left: Content */}
            <div className="exhibit-hero-content">
              <h1>Exhibit With Us<br /><span>at Malaysia&apos;s Home Expo</span></h1>
              <p className="exhibit-hero-text">
                Showcase your brand to <strong>thousands of home shoppers</strong>{' '}who are ready to discover, compare &amp; buy.
              </p>

              {/* Why badges inline */}
              <div className="hero-why-pills">
                <span className="why-pill">Meet High-Intent Shoppers</span>
                <span className="why-pill">Generate Leads &amp; Sales</span>
                <span className="why-pill">Build Brand Awareness</span>
              </div>

              {/* Trust stats */}
              <div className="exhibit-hero-stats">
                {TRUST_STATS.map((stat) => (
                  <div key={stat.label} className="hero-stat">
                    <div className="hero-stat-icon">{stat.icon}</div>
                    <div>
                      <div className="hero-stat-value">{stat.value}</div>
                      <div className="hero-stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form card */}
            <div className="exhibit-hero-form" id="exhibit-form">
              <div className="hero-form-card">
                <h3>Interested in Exhibiting?</h3>
                <p>Let&apos;s discuss booth opportunities and event details.</p>

                {status === 'sent' ? (
                  <div className="hero-form-success">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <h4>Thank You!</h4>
                    <p>Our team will contact you within 1-2 working days.</p>
                    <button className="btn btn-primary" onClick={() => setStatus('idle')} type="button">Submit Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="hero-form-row">
                      <input type="text" name="company" value={form.company} onChange={handleChange} required placeholder="Company Name *" />
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email Address *" />
                    </div>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" />
                    <select name="venue" value={form.venue} onChange={handleChange} required>
                      <option value="">Preferred Event Location *</option>
                      {VENUES.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                    <input type="text" name="product" value={form.product} onChange={handleChange} required placeholder="Product / Service to Exhibit *" />
                    <textarea name="additionalInfo" value={form.additionalInfo} onChange={handleChange} rows={2} placeholder="Message / Inquiry" />
                    <button type="submit" className="btn btn-secondary hero-form-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Submitting...' : 'Submit Enquiry →'}
                    </button>
                    {status === 'error' && (
                      <p className="hero-form-error">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}

                <div className="hero-form-trust">
                  <div className="trust-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span>Multiple<br />Locations</span>
                  </div>
                  <div className="trust-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                    <span>High Event<br />Traffic</span>
                  </div>
                  <div className="trust-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    <span>Strong Brand<br />Exposure</span>
                  </div>
                </div>
                <div className="hero-form-footer">
                  <span>Our team will contact you within 1-2 working days.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Exhibit With HOMElove */}
      <section className="exhibit-why" id="why-exhibit">
        <div className="container">
          <div className="section-header">
            <h2>Why Exhibit With <span className="text-primary">HOMElove</span>?</h2>
            <p>
              Connect with visitors actively exploring furniture, appliances, renovation solutions, and more. Build visibility, generate leads, and drive sales at Malaysia&apos;s leading home expo.
            </p>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="benefit-card">
                <div className="benefit-icon" style={{ background: benefit.color }}>{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Who Should Exhibit */}
      <section className="exhibit-who" id="who-exhibit">
        <div className="container">
          <div className="section-header">
            <h2>Who Should <span className="text-secondary">Exhibit</span></h2>
            <p>
              HOMElove welcomes brands, suppliers, and service providers across a wide range of home and living categories, including:
            </p>
          </div>
          <div className="category-chips">
            {CATEGORIES.map((cat) => (
              <span key={cat.name} className="category-chip">
                <span className="chip-icon">{cat.icon}</span>
                {cat.name}
              </span>
            ))}
          </div>
          <p className="category-note">
            Not sure if your business category is suitable? <a href="#exhibit-form">Submit an inquiry</a> and our team will be happy to advise.
          </p>
        </div>
      </section>

      {/* Trusted Brands Marquee */}
      <section className="exhibit-brands">
        <div className="container">
          <p className="brands-label">Trusted by Leading Brands</p>
        </div>
        <div className="brands-marquee">
          <div className="brands-track">
            {[...TRUST_BRANDS, ...TRUST_BRANDS].map((brand, i) => (
              <Image key={`${brand}-${i}`} src={`/logos/brands/${brand}.png`} alt={brand} width={120} height={60} quality={75} loading="lazy" style={{ width: 'auto', height: '40px' }} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. How to Exhibit — uses homepage wireframe step styles */}
      <section className="steps-section" id="how-exhibit">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 800, marginBottom: '8px' }}>How to Exhibit at HOMElove</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', maxWidth: '560px', margin: '0 auto' }}>Submit your inquiry and our team will guide you through the process based on your business category and exhibition needs.</p>
          </div>
          <div className="steps-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STEPS.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-num">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="#exhibit-form" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--orange)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>Submit Your Inquiry →</a>
          </div>
        </div>
      </section>

      {/* 5. Event Photos */}
      <section className="exhibit-photos" id="event-photos">
        <div className="container">
          <div className="section-header">
            <h2>Where Home Brands Meet Ready Buyers</h2>
          </div>
          <div className="photos-grid">
            {EVENT_PHOTOS.map((photo) => (
              <div key={photo.alt} className="photo-item">
                <Image src={photo.src} alt={photo.alt} width={400} height={300} quality={75} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner — scroll back to form */}
      <section className="exhibit-cta">
        <div className="container">
          <h2>Ready to Exhibit?</h2>
          <p>Join 6,000+ exhibitors who have showcased at HOMElove expos across Malaysia.</p>
          <a href="#exhibit-form" className="btn btn-secondary">Submit Your Inquiry →</a>
        </div>
      </section>
    </>
  )
}
