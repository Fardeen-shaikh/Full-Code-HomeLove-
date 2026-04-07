import Link from 'next/link'
import Image from 'next/image'
import CategoryMarquee from './CategoryMarquee'

const UPCOMING_EVENTS = [
  { date: '22 – 24 May', state: 'Sarawak', venue: 'Borneo Convention Centre Kuching (BCCK)', live: true },
  { date: '5 – 7 Jun', state: 'Kuala Lumpur', venue: 'KL Convention Centre' },
  { date: '18 – 20 Jul', state: 'Penang', venue: 'SPICE Convention Centre' },
]

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20">
        {/* Background Image */}
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="HOMElove Exhibition"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-light/85 to-primary/80" />

        {/* Floating blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-reverse" />

        <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — Content */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 bg-white/15 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm animate-fade-in-up">
              🏠 Malaysia&apos;s #1 Home &amp; Living Expo
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-tight animate-fade-in-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
              Transform Your{' '}
              <span className="text-accent">Dream Home</span>{' '}
              Into Reality
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl animate-fade-in-up delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
              Discover upcoming HOMElove home expos across Malaysia and explore furniture, home
              appliances, renovation solutions, home essentials, and exclusive expo deals all in one
              place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up delay-600 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Link
                href="/exhibitions"
                className="bg-secondary text-white font-semibold px-7 py-3.5 rounded-full hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(203,21,16,0.4)]"
              >
                Find Exhibitions →
              </Link>
              <Link
                href="/checklist"
                className="bg-white/15 text-white font-semibold px-7 py-3.5 rounded-full border border-white/30 hover:bg-white/25 transition-all duration-300 backdrop-blur-sm"
              >
                Home Checklist
              </Link>
            </div>
          </div>

          {/* Right — Upcoming Events Card */}
          <div className="animate-fade-in-right opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-6 max-w-md mx-auto lg:mx-0 lg:ml-auto backdrop-blur-sm transform perspective-[1000px] hover:rotate-y-0 transition-transform duration-500" style={{ transform: 'perspective(1000px) rotateY(-5deg)' }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-dark font-bold text-lg">Upcoming Events</h3>
                <span className="bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse-live">
                  LIVE
                </span>
              </div>

              <div className="space-y-3">
                {UPCOMING_EVENTS.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 group hover:bg-primary hover:translate-x-2.5"
                  >
                    <div className="bg-primary text-white text-center rounded-lg px-3 py-2 min-w-[56px] transition-all duration-300 group-hover:bg-white group-hover:text-primary">
                      <span className="text-lg font-bold block leading-tight">
                        {event.date.split(' ')[0]}
                      </span>
                      <span className="text-[10px] uppercase tracking-wide">
                        {event.date.split(' ').slice(2, 3).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-dark text-sm transition-colors duration-300 group-hover:text-white">
                        HOMElove {event.state}
                      </p>
                      <p className="text-xs text-gray mt-0.5 transition-colors duration-300 group-hover:text-white/70">{event.venue}</p>
                      <p className="text-xs text-gray mt-0.5 transition-colors duration-300 group-hover:text-white/70">{event.date}</p>
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
        </div>
      </section>
      <CategoryMarquee />
    </>
  )
}
