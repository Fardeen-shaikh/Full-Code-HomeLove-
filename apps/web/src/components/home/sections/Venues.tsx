interface Venue {
  /** Display name on the map pin label and venue header */
  name: string
  /** List of venue/centre names under this region */
  places: string[]
  /** Map pin x position (CSS left %) */
  left: string
  /** Map pin y position (CSS top %) */
  top: string
  /** Direction the pin label opens — defaults to right */
  align?: 'left' | 'right'
  /** Optional extra className on the pin (e.g. 'pin-selangor' for Z-index nudges) */
  pinClassName?: string
}

const VENUES: Venue[] = [
  {
    name: 'Penang',
    places: ['Setia SPICE Convention Centre', 'PICCA Butterworth Arena'],
    left: '4.5%', top: '26%',
  },
  {
    name: 'Selangor',
    places: [
      'Sunway Pyramid Convention Centre',
      'The Starling Event Hall',
      'IOI Grand Exhibition & Convention Centre',
    ],
    left: '12.6%', top: '51.6%',
    align: 'left',
    pinClassName: 'pin-selangor',
  },
  {
    name: 'Kuala Lumpur',
    places: [
      'Mid Valley Exhibition Centre',
      'Stadium Bukit Jalil (Car Park B)',
      'World Trade Centre KL (WTCKL)',
      'Pavilion Exhibition Centre (Bukit Jalil)',
    ],
    left: '13.6%', top: '56.8%',
  },
  {
    name: 'Kuantan',
    places: ['SASICC'],
    left: '22.6%', top: '47.8%',
  },
  {
    name: 'Johor',
    places: ['MVEC Southkey Johor Bahru', 'Persada Johor'],
    left: '26.9%', top: '79.6%',
  },
  {
    name: 'Miri',
    places: ['Boulevard Shopping Mall'],
    left: '65%', top: '38.7%',
  },
  {
    name: 'Kuching',
    places: ['Borneo Convention Centre Kuching'],
    left: '42.9%', top: '80.4%',
  },
  {
    name: 'Kota Kinabalu',
    places: ['Sabah International Convention Centre'],
    left: '79.1%', top: '15.5%',
  },
]

const PIN_SVG_PATH = 'M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'

function MapPin({ venue }: { venue: Venue }) {
  const labelClass = venue.align === 'left' ? 'pin-label pin-label-left' : 'pin-label'
  const pinClass = venue.pinClassName ? `map-pin ${venue.pinClassName}` : 'map-pin'
  return (
    <div className={pinClass} style={{ left: venue.left, top: venue.top }}>
      <svg width="20" height="28" viewBox="0 0 24 32" fill="var(--primary)">
        <path d={PIN_SVG_PATH} />
      </svg>
      <div className={labelClass}>
        <strong>{venue.name.toUpperCase()}</strong>
        {venue.places.map(p => <span key={p}>{p}</span>)}
      </div>
    </div>
  )
}

function VenueGridCard({ venue }: { venue: Venue }) {
  return (
    <div className="venue-card">
      <div className="venue-card-hdr">{venue.name}</div>
      <div className="venue-card-body">
        {venue.places.map(p => <span key={p}>{p}</span>)}
      </div>
    </div>
  )
}

function MobileVenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="m-venue-card">
      <div className="m-venue-badge">
        <svg width="12" height="16" viewBox="0 0 24 32" fill="var(--orange)">
          <path d={PIN_SVG_PATH} />
        </svg>
        {venue.name}
      </div>
      {venue.places.map(p => <span key={p}>{p}</span>)}
    </div>
  )
}

// Order on the desktop venue grid (matches the wireframe's original order,
// which differs from the map-pin order).
const GRID_ORDER = [
  'Penang', 'Kuala Lumpur', 'Selangor', 'Johor',
  'Kuantan', 'Kuching', 'Miri', 'Kota Kinabalu',
]
const gridVenues = GRID_ORDER.map(n => VENUES.find(v => v.name === n)!).filter(Boolean)

export function Venues() {
  return (
    <section
      id="venues-map"
      style={{
        background: 'var(--gray-light)',
        padding: '70px 0',
        color: 'var(--dark)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(1,75,152,0.1)',
              border: '1px solid rgba(1,75,152,0.2)',
              padding: '7px 20px',
              borderRadius: 50,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--primary)',
              marginBottom: 20,
            }}
          >
            📍 8 Venues Across Malaysia
          </div>
          <h2
            className="animate-on-scroll"
            style={{ color: 'var(--dark)', fontSize: 40, fontWeight: 800, marginBottom: 10 }}
          >
            Find an Exhibition Near You
          </h2>
          <p
            className="animate-on-scroll"
            style={{ color: 'var(--gray)', fontSize: 15, maxWidth: 440, margin: '0 auto', lineHeight: 1.55 }}
          >
            World-class home exhibitions in major cities nationwide. Free admission at every venue.
          </p>
        </div>

        <div className="map-venues-wrapper">
          <div className="map-container" style={{ position: 'relative', maxWidth: '100%', margin: '0 auto' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/Blank_malaysia_map.png"
                alt="Malaysia Map"
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
                decoding="async"
                width={1100}
                height={600}
              />
              {VENUES.map(v => <MapPin key={v.name} venue={v} />)}
            </div>
          </div>
          <div className="venue-grid">
            {gridVenues.map(v => <VenueGridCard key={v.name} venue={v} />)}
          </div>
        </div>

        <div className="mobile-venue-list" style={{ display: 'none', marginTop: 16 }}>
          <div className="mobile-venue-grid">
            {gridVenues.map(v => <MobileVenueCard key={v.name} venue={v} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
