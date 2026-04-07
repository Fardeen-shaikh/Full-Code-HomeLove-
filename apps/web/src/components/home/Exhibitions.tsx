import Link from 'next/link'

const EVENTS = [
  {
    title: 'HOMElove Kuching',
    state: 'Sarawak',
    venue: 'Borneo Convention Centre Kuching',
    date: '22 – 24 May 2026',
    days: '3 Days',
    desc: 'Explore top home brands and exclusive expo deals in East Malaysia.',
    tags: ['Furniture', 'Appliances'],
  },
  {
    title: 'HOMElove Kuantan',
    state: 'Pahang',
    venue: 'Megamall Kuantan Exhibition Centre',
    date: '5 – 8 Jun 2026',
    days: '4 Days',
    desc: 'Discover renovation ideas, kitchen solutions, and smart home products.',
    tags: ['Renovation', 'Kitchen'],
  },
  {
    title: 'HOMElove Penang',
    state: 'Penang',
    venue: 'SPICE Convention Centre',
    date: '18 – 20 Jul 2026',
    days: '3 Days',
    desc: 'The ultimate home & living expo experience in northern Malaysia.',
    tags: ['Smart Home', 'Living'],
  },
]

export default function Exhibitions() {
  return (
    <section id="exhibitions" className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Upcoming</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">Find an Exhibition Near You</h2>
          <p className="text-gray mt-3 max-w-2xl mx-auto">
            Visit our exhibitions across Malaysia to discover the best home products, exclusive deals,
            and expert advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <div
              key={event.title}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 relative flex items-center justify-center">
                <span className="text-5xl opacity-30">🏠</span>
                <div className="absolute top-3 right-3 flex gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="bg-primary text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-dark text-lg group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-gray mt-1">{event.venue}, {event.state}</p>
                <p className="text-sm text-gray mt-3 leading-relaxed">{event.desc}</p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                      {event.date}
                    </span>
                    <span className="text-xs text-gray">{event.days}</span>
                  </div>
                  <Link href="/exhibitions" className="text-primary text-sm font-semibold hover:underline">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/exhibitions"
            className="inline-block bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All Exhibitions
          </Link>
        </div>
      </div>
    </section>
  )
}
