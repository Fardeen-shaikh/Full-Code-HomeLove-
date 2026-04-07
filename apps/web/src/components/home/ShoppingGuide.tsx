import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const STEPS = [
  {
    step: 1,
    title: 'Bring Your Floor Plan & Home Checklist',
    desc: 'Bring your floor plan, space measurements, inspiration photos, and home checklist so you can stay focused on what your home really needs and shop more efficiently.',
  },
  {
    step: 2,
    title: 'Use the Floor Plan to Guide Your Visit',
    desc: 'Follow the expo floor plan to navigate by category or brand, save time, and make sure you don\'t miss the booths, products, or deals on your list.',
  },
  {
    step: 3,
    title: 'Compare Before You Commit',
    desc: 'Check prices, product features, package deals, and freebies across different booths before making your final decision.',
  },
]

export default function ShoppingGuide() {
  return (
    <section className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">Plan Ahead</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">3 Important Steps Before You Shop the Expo</h2>
          <p className="text-white/60 text-sm mt-3 max-w-2xl mx-auto">
            A little preparation helps you shop smarter, compare better, and avoid missing the deals you actually want.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px border-t-2 border-dashed border-white/20" />

          {STEPS.map((s, i) => (
            <AnimateOnScroll key={s.step} delay={i * 0.2} className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-extrabold flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(1,75,152,0.4)] relative z-10">
                {s.step}
              </div>
              <h3 className="font-bold text-white text-lg">{s.title}</h3>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">{s.desc}</p>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-12">
          <Link
            href="/checklist"
            className="inline-block bg-accent text-dark font-semibold px-8 py-3.5 rounded-full hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,241,0,0.3)]"
          >
            Use Our Home Checklist →
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
