import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

interface EventData {
  title: string
  state: string
  venue: string
  date: string
  image: string
  slug: string
}

const FALLBACK_EVENTS: EventData[] = [
  { title: 'HOMElove Home Expo', state: 'Sarawak', venue: 'Borneo Convention Centre Kuching', date: '2 – 5 Aug 2026', image: '/images/events/event-kuching.png', slug: '#' },
  { title: 'HOMElove Home Expo', state: 'Kuantan', venue: 'Megamall Kuantan Exhibition Centre', date: '9 – 12 Sep 2026', image: '/images/events/event-penang.jpeg', slug: '#' },
  { title: 'HOMElove Home Expo', state: 'Penang', venue: 'SPICE Convention Centre', date: '11 – 14 Oct 2026', image: '/images/hero/hero-bg.jpg', slug: '#' },
]

export default function Exhibitions({ events }: { events?: EventData[] }) {
  const EVENTS = events && events.length > 0 ? events : FALLBACK_EVENTS
  return (
    <section id="exhibitions" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Exhibitions</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">Upcoming Home Expo</h2>
          <p className="text-gray mt-3 max-w-2xl mx-auto">
            Discover HOMElove home expos across Malaysia — furniture, renovation, home appliances, and exclusive deals. Free admission for everyone.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event, i) => (
            <AnimateOnScroll key={`${event.state}-${i}`} delay={i * 0.15}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-400 group h-full">
                <div className="h-52 relative overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-dark text-lg group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray mt-1">{event.venue}, {event.state}</p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                      {event.date}
                    </span>
                    <Link href={`/exhibitions/${event.slug}`} className="text-primary text-sm font-semibold hover:underline">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-10">
          <Link
            href="/exhibitions"
            className="inline-block bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(1,75,152,0.3)]"
          >
            View All Exhibitions →
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
