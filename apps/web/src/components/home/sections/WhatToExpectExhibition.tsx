'use client'

const CARDS = [
  { icon: '🛏️', delay: 1, title: 'Mattresses & Bedding',
    body: 'Premium mattresses from top brands at exclusive exhibition prices. Test before you buy.' },
  { icon: '🍳', delay: 2, title: 'Kitchen & Appliances',
    body: 'Complete kitchen packages — hoods, hobs, ovens, sinks, and modern smart appliances.' },
  { icon: '🛋️', delay: 3, title: 'Living & Dining',
    body: 'Sofas, dining tables, TV consoles, and coffee tables in every style and budget range.' },
  { icon: '💡', delay: 1, title: 'Smart Home Tech',
    body: 'Automated curtains, smart locks, lighting systems, and air purifiers for the modern home.' },
  { icon: '🎨', delay: 2, title: 'Interior Design',
    body: 'Consult with professional interior designers and get custom renovation quotes on-site.' },
  { icon: '🏷️', delay: 3, title: 'Exclusive Deals',
    body: 'Show-only promotions, bundle packages, 0% installment plans, and free delivery offers.' },
]

const BASE_BACKGROUND = 'linear-gradient(145deg,#ffffff,#f8faff)'
const HOVER_BACKGROUND = 'linear-gradient(145deg,#ffffff,#f0f5ff)'

const cardBaseStyle: React.CSSProperties = {
  background: BASE_BACKGROUND,
  borderRadius: 18,
  padding: '36px 28px',
  textAlign: 'center',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  border: '1px solid #e8eef5',
  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
}

function applyHover(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget
  el.style.transform = 'translateY(-6px)'
  el.style.boxShadow = '0 14px 36px rgba(1,75,152,0.12)'
  el.style.borderColor = 'var(--primary)'
  el.style.background = HOVER_BACKGROUND
}

function clearHover(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget
  el.style.transform = ''
  el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)'
  el.style.borderColor = '#e8eef5'
  el.style.background = BASE_BACKGROUND
}

export function WhatToExpectExhibition() {
  return (
    <section style={{ background: 'var(--gray-light)', padding: '70px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p
            className="animate-on-scroll"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              marginBottom: 8,
            }}
          >
            At The Exhibition
          </p>
          <h2
            className="animate-on-scroll expect-title"
            style={{ fontSize: 40, fontWeight: 800, marginBottom: 10, color: 'var(--dark)' }}
          >
            What To Expect
          </h2>
          <p
            className="animate-on-scroll"
            style={{ color: 'var(--gray)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}
          >
            From furniture to smart home tech — everything you need for your dream home, all in one place.
          </p>
        </div>
        <div
          className="expect-cards-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`animate-on-scroll delay-${card.delay}`}
              style={cardBaseStyle}
              onMouseOver={applyHover}
              onMouseOut={clearHover}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{card.icon}</div>
              <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>
                {card.title}
              </h4>
              <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
