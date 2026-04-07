const VENUES = [
  { state: 'Penang', venue: 'SPICE Convention Centre' },
  { state: 'KL', venue: 'KL Convention Centre' },
  { state: 'Putrajaya', venue: 'PICC Putrajaya' },
  { state: 'Kuantan', venue: 'Megamall Exhibition Centre' },
  { state: 'Johor', venue: 'Persada Johor Convention Centre' },
  { state: 'Kuching', venue: 'Borneo Convention Centre' },
  { state: 'Miri', venue: 'Miri Indoor Stadium' },
  { state: 'Kota Kinabalu', venue: 'Sabah International Convention Centre' },
]

export default function Venues() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Locations</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            📍 8 Venues Across Malaysia
          </h2>
          <p className="text-gray mt-3">Find an Exhibition Near You</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {VENUES.map((v) => (
            <div
              key={v.state}
              className="bg-white border border-gray-100 rounded-xl p-5 text-center hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <span className="text-2xl block mb-2">📍</span>
              <h3 className="font-bold text-dark group-hover:text-primary transition-colors">{v.state}</h3>
              <p className="text-xs text-gray mt-1">{v.venue}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
