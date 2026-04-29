const ROW_1 = [
  { src: 'samsung', alt: 'Samsung' },
  { src: 'lg', alt: 'LG' },
  { src: 'panasonic', alt: 'Panasonic' },
  { src: 'toshiba', alt: 'Toshiba' },
  { src: 'hitachi', alt: 'Hitachi' },
  { src: 'daikin', alt: 'Daikin' },
  { src: 'dyson', alt: 'Dyson' },
  { src: 'bosch', alt: 'Bosch' },
  { src: 'electrolux', alt: 'Electrolux' },
  { src: 'philips', alt: 'Philips' },
  { src: 'hisense', alt: 'Hisense' },
  { src: 'beko', alt: 'Beko' },
  { src: 'haier', alt: 'Haier' },
  { src: 'midea', alt: 'Midea' },
  { src: 'sharp', alt: 'Sharp' },
]

const ROW_2 = [
  { src: 'king-koil', alt: 'King Koil' },
  { src: 'dunlopillo', alt: 'Dunlopillo' },
  { src: 'getha', alt: 'Getha' },
  { src: 'serta', alt: 'Serta' },
  { src: 'slumberland', alt: 'Slumberland' },
  { src: 'tefal', alt: 'Tefal' },
  { src: 'nespresso', alt: 'Nespresso' },
  { src: 'kitchenaid', alt: 'KitchenAid' },
  { src: 'ogawa', alt: 'Ogawa' },
  { src: 'coway', alt: 'Coway' },
  { src: 'cuckoo', alt: 'Cuckoo' },
  { src: 'rinnai', alt: 'Rinnai' },
  { src: 'yale', alt: 'Yale' },
  { src: 'karcher', alt: 'Karcher' },
  { src: 'fotile', alt: 'Fotile' },
]

function Track({ logos }: { logos: { src: string; alt: string }[] }) {
  // Three copies + 33.333% loop instead of two copies + 50%: keeps the
  // wrap-around inside fully rendered content so sub-pixel rounding can't
  // open a visible gap mid-loop.
  const tripled = [...logos, ...logos, ...logos]
  return (
    <div className="brands-track brands-track-x3">
      {tripled.map((logo, i) => (
        <img
          key={i}
          className="brand-logo"
          src={`/logos/brands/${logo.src}.webp`}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          width={120}
          height={60}
        />
      ))}
    </div>
  )
}

export function BrandsMarquee() {
  return (
    <section className="brands">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="animate-on-scroll">Brands</h2>
          <p
            style={{
              color: 'var(--gray)',
              fontSize: 15,
              maxWidth: 480,
              margin: '8px auto 0',
            }}
            className="animate-on-scroll"
          >
            Over 6,000 quality brands trust HOMElove to connect them with Malaysian homeowners.
          </p>
        </div>
      </div>
      <div className="brands-marquee-wrapper">
        <Track logos={ROW_1} />
        <Track logos={ROW_2} />
      </div>
    </section>
  )
}
