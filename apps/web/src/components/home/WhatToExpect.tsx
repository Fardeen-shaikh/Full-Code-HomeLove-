const CARDS = [
  { icon: '🏷️', title: 'Exclusive Expo Deals', desc: 'Enjoy special pricing and promotions available only at HOMElove exhibitions.' },
  { icon: '🎟️', title: 'Free Entry for All', desc: 'No tickets required — everyone is welcome to visit and explore.' },
  { icon: '🏪', title: '500+ Brand Exhibitors', desc: 'A curated mix of top furniture, appliance, and home solution brands.' },
  { icon: '💡', title: 'Expert Consultations', desc: 'Get advice from interior designers, contractors, and product specialists.' },
  { icon: '🎁', title: 'Lucky Draws & Prizes', desc: 'Stand a chance to win daily prizes and lucky draw sessions.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family Friendly Events', desc: 'Kids zones and activities — bring the whole family along.' },
]

export default function WhatToExpect() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">What Awaits You</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">What to Expect</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-4xl block mb-4">{card.icon}</span>
              <h3 className="font-bold text-dark text-lg">{card.title}</h3>
              <p className="text-gray text-sm mt-2 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
