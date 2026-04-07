const FEATURES = [
  'Verified Track Record — Over a decade of hosting large-scale events across Malaysia',
  'National Reach — We strategically organise exhibitions in every major region',
  'Expert Curation — Our team selects only the most reputable brands',
  'Massive Reach — Hosting hundreds of booths covering every aspect of household',
]

export default function About() {
  return (
    <section id="about-preview" className="bg-gray-light py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-primary/10">
          <div className="absolute inset-0 flex items-center justify-center text-primary/30 text-6xl">
            🏠
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            About HOMElove
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2 leading-tight">
            One of The Largest Home Expos in Malaysia
          </h2>
          <p className="text-gray mt-4 leading-relaxed">
            HOMElove is recognised as a top expo organiser in Malaysia, bringing the latest household
            solutions to major cities across the country. We have spent years building our reputation
            as a premier home living exhibition.
          </p>
          <ul className="mt-6 space-y-3">
            {FEATURES.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5 text-lg">✓</span>
                <span className="text-sm text-dark leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
