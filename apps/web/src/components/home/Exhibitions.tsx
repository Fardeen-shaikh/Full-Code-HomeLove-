'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const EVENTS = [
  {
    title: 'HOMElove Kuching',
    state: 'Sarawak',
    venue: 'Borneo Convention Centre Kuching',
    date: '22 – 24 May 2026',
    days: '3 Days',
    desc: 'Explore top home brands and exclusive expo deals in East Malaysia.',
    tags: ['Furniture', 'Appliances'],
    image: '/images/events/event-kuching.png',
  },
  {
    title: 'HOMElove Kuantan',
    state: 'Pahang',
    venue: 'Megamall Kuantan Exhibition Centre',
    date: '5 – 8 Jun 2026',
    days: '4 Days',
    desc: 'Discover renovation ideas, kitchen solutions, and smart home products.',
    tags: ['Renovation', 'Kitchen'],
    image: '/images/events/event-penang.jpeg',
  },
  {
    title: 'HOMElove Penang',
    state: 'Penang',
    venue: 'SPICE Convention Centre',
    date: '18 – 20 Jul 2026',
    days: '3 Days',
    desc: 'The ultimate home & living expo experience in northern Malaysia.',
    tags: ['Smart Home', 'Living'],
    image: '/images/hero/hero-bg.jpg',
  },
]

export default function Exhibitions() {
  const sectionRef = useScrollAnimation<HTMLElement>()

  return (
    <section ref={sectionRef} id="exhibitions" className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Upcoming</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">Find an Exhibition Near You</h2>
          <p className="text-gray mt-3 max-w-2xl mx-auto">
            Visit our exhibitions across Malaysia to discover the best home products, exclusive deals,
            and expert advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event, i) => (
            <div
              key={event.title}
              className="animate-on-scroll bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-400 group"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="bg-primary text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-dark text-lg group-hover:text-primary transition-colors duration-300">
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

        <div className="text-center mt-10 animate-on-scroll">
          <Link
            href="/exhibitions"
            className="inline-block bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(1,75,152,0.3)]"
          >
            View All Exhibitions
          </Link>
        </div>
      </div>
    </section>
  )
}
