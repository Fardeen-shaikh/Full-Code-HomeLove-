import Link from 'next/link'
import Image from 'next/image'
import CategoryMarquee from './CategoryMarquee'

const UPCOMING_EVENTS = [
  {
    title: 'HOMElove Kuching',
    venue: 'Borneo Convention Centre Kuching (BCCK)',
    state: 'Sarawak',
    date: '2 Apr – 5 Apr',
    poster: '/images/events/event-kuching.png',
  },
  {
    title: 'HOMElove Kuantan',
    venue: "Sultan Ahmad Shah Int'l Conv. Centre",
    state: 'Pahang',
    date: '9 Apr – 12 Apr',
    poster: '/images/events/event-penang.jpeg',
  },
  {
    title: 'HOMElove Penang',
    venue: 'Setia SPICE Convention Centre (SSCC)',
    state: 'Penang',
    date: '30 Jul – 2 Aug',
    poster: '/images/events/event-penang.jpeg',
  },
]

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ padding: '130px 0 60px' }}>
        {/* Background Image */}
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="HOMElove Exhibition"
          fill
          priority
          className="object-cover"
          style={{ backgroundAttachment: 'fixed' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(1,75,152,0.92) 0%, rgba(20,74,149,0.88) 100%)' }} />

        {/* Floating radial blobs */}
        <div className="absolute -top-1/2 -right-[20%] w-[800px] h-[800px] rounded-full animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] rounded-full animate-float-reverse" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)' }} />

        <div className="relative z-[1] max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          {/* Left — Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-[10px] border border-white/20 text-sm font-medium px-5 py-2.5 rounded-full mb-6 animate-fade-in-up">
              🏆 Malaysia&apos;s #1 Home &amp; Living Expo
            </div>

            <h1 className="text-[42px] sm:text-[52px] font-extrabold leading-[1.1] mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Transform Your<br />
              <span className="text-orange">Dream Home</span><br />
              Into Reality
            </h1>

            <p className="text-lg opacity-90 mb-9 max-w-[500px] animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Discover upcoming HOMElove home expos across Malaysia and explore furniture, home
              appliances, renovation solutions, home essentials, and exclusive expo deals all in one
              place.
            </p>

            <div className="flex gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <Link
                href="/exhibitions"
                className="relative overflow-hidden bg-secondary text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#D97706] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(203,21,16,0.3)] transition-all duration-300"
              >
                Find Exhibitions →
              </Link>
            </div>
          </div>

          {/* Right — Upcoming Events Card */}
          <div className="animate-fade-in-right opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
            <div
              className="bg-white/95 backdrop-blur-[20px] rounded-[20px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] max-w-[560px] mt-10 text-dark transition-transform duration-500 hover:[transform:perspective(1000px)_rotateY(0deg)]"
              style={{ transform: 'perspective(1000px) rotateY(-5deg)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[22px] font-bold">Upcoming Events</h3>
                <div className="bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 animate-pulse-live">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  LIVE
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {UPCOMING_EVENTS.map((event, i) => (
                  <div
                    key={i}
                    className="flex rounded-xl overflow-hidden border border-gray-100 bg-white cursor-pointer transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
                  >
                    {/* Poster image — 200px wide */}
                    <div className="w-[200px] flex-shrink-0 bg-[#f0f4f8] flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.poster}
                        alt={event.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text details */}
                    <div className="flex-1 px-3.5 py-3 flex flex-col justify-center">
                      <h4 className="text-sm font-bold text-dark mb-0.5">{event.title}</h4>
                      <p className="text-[11px] text-[#888] leading-tight mb-1.5">
                        {event.venue}<br />{event.state}
                      </p>
                      <span className="bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-md inline-block w-fit">
                        {event.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/exhibitions"
                className="block text-center mt-3.5 text-[13px] font-bold text-primary hover:underline"
              >
                View All Exhibitions →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CategoryMarquee />
    </>
  )
}
