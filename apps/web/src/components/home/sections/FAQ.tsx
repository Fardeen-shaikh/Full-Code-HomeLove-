'use client'

import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
  extra?: boolean
  delay?: number
}

const ITEMS: FaqItem[] = [
  { q: 'What is a home expo?',
    a: 'A home expo is a large-scale exhibition where various exhibitors showcase home-related products and services, from furniture to renovations.',
    delay: 1 },
  { q: 'What is the largest home expo in Malaysia?',
    a: 'HOMElove is one of the largest home expos in Malaysia, hosting events across multiple cities with thousands of exhibitors.',
    delay: 2 },
  { q: 'What can I find at a home and living exhibition?',
    a: 'You can find furniture, home appliances, renovation services, interior design solutions, mattresses, kitchenware, and much more.',
    delay: 3 },
  { q: 'When is the next home expo?',
    a: 'Check our exhibitions page for the latest schedule. We host events throughout the year across Penang, KL, Johor, and more.',
    extra: true, delay: 4 },
  { q: 'What are the tips to attend a home and living fair?',
    a: 'Come early for the best deals, bring measurements of your space, set a budget, and download our app for exclusive vouchers!',
    extra: true },
  { q: 'What makes HOMElove the best home expo in Malaysia?',
    a: 'With over 141 exhibitions, 6,173+ exhibitors, and 5 million visitors, HOMElove is the trusted choice since 2015.',
    extra: true },
]

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showExtras, setShowExtras] = useState(false)

  return (
    <section className="faq">
      <div className="container">
        <div className="faq-header">
          <h2 className="animate-on-scroll">FAQs About Home Expo in Malaysia</h2>
        </div>
        <div className="faq-list">
          {ITEMS.map((item, i) => {
            const isActive = activeIndex === i
            // Note: deliberately NOT using `animate-on-scroll` here. The FAQ
            // re-renders on every click, which interacts badly with the
            // scroll-fade observer (item #1 occasionally got stuck at
            // opacity:0). Items are shown immediately; the section header
            // still fades in via animate-on-scroll on the <h2>.
            // Visibility of extras is driven by CSS media queries:
            //   desktop  — `.faq-extra` shown by default (no hide rule)
            //   mobile   — `.faq-extra { display: none }` until the user
            //              clicks "View All FAQs", which adds `.faq-extra-shown`
            //              to override the media-query hide.
            const classes = [
              'faq-item',
              item.extra ? 'faq-extra' : '',
              item.extra && showExtras ? 'faq-extra-shown' : '',
              isActive ? 'active' : '',
            ].filter(Boolean).join(' ')
            return (
              <div
                key={i}
                className={classes}
              >
                <div
                  className="faq-question"
                  onClick={() => setActiveIndex(isActive ? null : i)}
                >
                  {item.q}
                </div>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
        {!showExtras && (
          <div className="faq-view-all" style={{ textAlign: 'center', marginTop: 20 }}>
            <button
              type="button"
              onClick={() => setShowExtras(true)}
              style={{
                padding: '12px 28px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--primary-light)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--primary)' }}
            >
              View All FAQs ↓
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
