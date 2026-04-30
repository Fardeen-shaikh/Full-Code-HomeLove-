'use client'

export interface HeroEvent {
  title: string
  slug: string
  venue: string
  state: string
  date: string
  imageUrl: string
  days: number
}

const DEFAULT_HERO_EVENTS: HeroEvent[] = [
  {
    title: 'HOMElove Kuching', venue: 'Borneo Convention Centre Kuching (BCCK)', state: 'Sarawak',
    date: '2 Apr – 5 Apr',
    imageUrl: 'https://homelove.com.my/sites/default/files/paragraph/text-with-background/HL_BCCK_Q2_LandingPage-%26-MainPage_R1-02_1_1.png',
    slug: '#', days: 4,
  },
  {
    title: 'HOMElove Kuantan', venue: "Sultan Ahmad Shah Int'l Conv. Centre", state: 'Pahang',
    date: '9 Apr – 12 Apr',
    imageUrl: 'https://homelove.com.my/sites/default/files/paragraph/text-with-background/Q1_SASICC_Event-responde_1920x1005.jpg_0.jpeg',
    slug: '#', days: 4,
  },
  {
    title: 'HOMElove Penang', venue: 'Setia SPICE Convention Centre (SSCC)', state: 'Penang',
    date: '30 Jul – 2 Aug',
    imageUrl: 'https://homelove.com.my/sites/default/files/paragraph/text-with-background/Q1_SASICC_Event-responde_1920x1005.jpg_0.jpeg',
    slug: '#', days: 3,
  },
]

function optimizedImg(src: string, width: number, quality = 75): string {
  if (!src || src.startsWith('data:')) return src
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

function HeroEventCard({ event }: { event: HeroEvent }) {
  return (
    <a
      href={`/exhibitions/${event.slug}`}
      style={{
        display: 'flex',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.25s ease,box-shadow 0.25s ease',
        border: '1px solid #eee',
        background: 'white',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <div style={{ width: 200, flexShrink: 0, background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={optimizedImg(event.imageUrl, 256)}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          loading="eager"
          decoding="async"
          width={200}
          height={120}
          fetchPriority="high"
        />
      </div>
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark)', marginBottom: 2 }}>
          {event.title}
        </h4>
        <p style={{ fontSize: 11, color: '#888', lineHeight: 1.3, marginBottom: 5 }}>
          {event.venue}<br />{event.state}
        </p>
        <div style={{
          background: 'var(--secondary)', color: 'white', padding: '4px 10px',
          borderRadius: 6, fontSize: 12, fontWeight: 700, display: 'inline-block', width: 'fit-content',
        }}>
          {event.date}
        </div>
      </div>
    </a>
  )
}

export function Hero({ events }: { events?: HeroEvent[] }) {
  const heroEvents = events && events.length > 0 ? events : DEFAULT_HERO_EVENTS

  return (
    <section className="hero" id="main-content">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">🏆 Malaysia&apos;s #1 Home & Living Expo</div>
          <h1>
            Transform Your<br /><span>Dream Home</span><br />Into Reality
          </h1>
          <p>
            Discover upcoming HOMElove home expos across Malaysia and explore furniture, home appliances, renovation solutions, home essentials, and exclusive expo deals all in one place.
          </p>
          <div className="hero-buttons">
            <a href="/exhibitions" className="btn btn-secondary">Find Exhibitions →</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card">
            <div className="hero-card-header">
              <h3>Upcoming Events</h3>
              <div className="live-badge">LIVE</div>
            </div>
            <div className="event-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {heroEvents.map((event, i) => (
                <HeroEventCard key={i} event={event} />
              ))}
            </div>
            <a
              href="/exhibitions"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: 14,
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--primary)',
                textDecoration: 'none',
              }}
            >
              View All Exhibitions →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
