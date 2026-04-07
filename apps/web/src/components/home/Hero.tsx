import Link from 'next/link'

const UPCOMING_EVENTS = [
  { date: '22 – 24 May', state: 'Sarawak', venue: 'Borneo Convention Centre Kuching (BCCK)', live: true },
  { date: '5 – 7 Jun', state: 'Kuala Lumpur', venue: 'KL Convention Centre' },
  { date: '18 – 20 Jul', state: 'Penang', venue: 'SPICE Convention Centre' },
]

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left — Content */}
        <div className="text-white">
          <span className="inline-flex items-center gap-2 bg-white/15 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            🏠 Malaysia&apos;s #1 Home &amp; Living Expo
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-tight">
            Transform Your{' '}
            <span className="text-accent">Dream Home</span>{' '}
            Into Reality
          </h1>

          <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
            Discover upcoming HOMElove home expos across Malaysia and explore furniture, home
            appliances, renovation solutions, home essentials, and exclusive expo deals all in one
            place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/exhibitions"
              className="bg-secondary text-white font-semibold px-7 py-3.5 rounded-full hover:brightness-110 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Find Exhibitions →
            </Link>
            <Link
              href="/checklist"
              className="bg-white/15 text-white font-semibold px-7 py-3.5 rounded-full border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm"
            >
              Home Checklist
            </Link>
          </div>
        </div>

        {/* Right — Upcoming Events Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-dark font-bold text-lg">Upcoming Events</h3>
            <span className="bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
              LIVE
            </span>
          </div>

          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-light transition-colors group"
              >
                <div className="bg-primary text-white text-center rounded-lg px-3 py-2 min-w-[56px]">
                  <span className="text-lg font-bold block leading-tight">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide">
                    {event.date.split(' ').slice(2, 3).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm group-hover:text-primary transition-colors">
                    HOMElove {event.state}
                  </p>
                  <p className="text-xs text-gray mt-0.5">{event.venue}</p>
                  <p className="text-xs text-gray mt-0.5">{event.date}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/exhibitions"
            className="block text-center text-primary text-sm font-semibold mt-5 hover:underline"
          >
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  )
}
