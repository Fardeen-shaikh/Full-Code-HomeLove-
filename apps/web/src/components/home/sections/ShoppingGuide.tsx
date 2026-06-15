'use client'

const STEPS = [
  { num: 1, delay: 1, title: 'Bring Your Floor Plan & Home Checklist',
    body: 'Bring your floor plan, space measurements, inspiration photos, and home checklist so you can stay focused on what your home really needs and shop more efficiently.' },
  { num: 2, delay: 2, title: 'Use the Floor Plan to Guide Your Visit',
    body: "Follow the expo floor plan to navigate by category or brand, save time, and make sure you don't miss the booths, products, or deals on your list." },
  { num: 3, delay: 3, title: 'Compare Before You Commit',
    body: 'Check prices, product features, package deals, and freebies across different booths before making your final decision.' },
]

export function ShoppingGuide() {
  return (
    <section className="steps-section">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <h2
            className="animate-on-scroll"
            style={{ color: 'white', fontSize: 40, fontWeight: 800, marginBottom: 8 }}
          >
            3 Steps Before You Shop the Expo
          </h2>
          <p
            className="animate-on-scroll"
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, maxWidth: 560, margin: '0 auto' }}
          >
            A little preparation helps you shop smarter, compare better, and avoid missing the deals you actually want.
          </p>
        </div>
        <div className="steps-row">
          {STEPS.map(step => (
            <div key={step.num} className={`step-card animate-on-scroll delay-${step.delay}`}>
              <div className="step-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }} className="animate-on-scroll">
          <a
            href="/checklist"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'var(--orange)',
              color: 'white',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 700,
              transition: 'all 0.3s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(224,129,3,0.4)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            Use Our Home Checklist →
          </a>
        </div>
      </div>
    </section>
  )
}
