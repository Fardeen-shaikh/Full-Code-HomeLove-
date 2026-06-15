const CARDS = [
  { icon: '🏷️', bg: '#fff3e0', delay: 1, title: 'Exclusive Expo Deals',
    body: 'Discover special deals and pricings only available at the event — from furniture to renovation packages and appliances.' },
  { icon: '🎟️', bg: '#ffebee', delay: 2, title: 'Free Entry for All',
    body: 'Walk in and explore hundreds of home brands completely at no cost.' },
  { icon: '🏪', bg: '#e3f2fd', delay: 3, title: '500+ Brand Exhibitors',
    body: 'A carefully curated mix of local and international home brands all under one roof at each show.' },
  { icon: '💡', bg: '#e8f5e9', delay: 1, title: 'Expert Consultations',
    body: 'Speak directly with interior designers, renovation contractors, and product specialists on the floor.' },
  { icon: '🎁', bg: '#fce4ec', delay: 2, title: 'Lucky Draws & Prizes',
    body: 'Win exciting home products and vouchers at our exciting daily lucky draw sessions every day.' },
  { icon: '🛡️', bg: '#e0f7fa', delay: 3, title: 'Shop with Confidence',
    body: 'Enjoy shopping with HOMECare+ purchase protection and trusted exhibitors all in one place.' },
]

export function WhatToExpectExpo() {
  return (
    <section className="expect-section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-badge animate-on-scroll" style={{ display: 'inline-flex' }}>
            🏠 Why HOMElove
          </div>
          <h2 className="animate-on-scroll">What to Expect at the Expo</h2>
          <p
            style={{ color: 'var(--gray)', fontSize: 16, maxWidth: 560, margin: '8px auto 0' }}
            className="animate-on-scroll"
          >
            Every HOMElove exhibition is packed with value, inspiration, and hands-on expert guidance.
          </p>
        </div>
        <div className="expect-grid">
          {CARDS.map((card, i) => (
            <div key={i} className={`expect-card animate-on-scroll delay-${card.delay}`}>
              <div className="expect-icon" style={{ background: card.bg }}>{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
