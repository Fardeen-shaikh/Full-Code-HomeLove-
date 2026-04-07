import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const FEATURES = [
  { title: 'Verified Track Record', desc: 'Over a decade of hosting large-scale events across Malaysia' },
  { title: 'National Reach', desc: 'We strategically organise exhibitions in every major region' },
  { title: 'Expert Curation', desc: 'Our team selects only the most reputable brands' },
  { title: 'Massive Reach', desc: 'Hosting hundreds of booths covering every aspect of household' },
]

export default function About() {
  return (
    <section id="about-preview" className="bg-gray-light py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimateOnScroll className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
          <Image
            src="/images/events/event-kuching.png"
            alt="HOMElove Exhibition"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
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
          <ul className="mt-6 space-y-4">
            {FEATURES.map((feat) => (
              <li key={feat.title} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</span>
                <div>
                  <span className="font-semibold text-dark text-sm">{feat.title}</span>
                  <span className="text-gray text-sm"> — {feat.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
