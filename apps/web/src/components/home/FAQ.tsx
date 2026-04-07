'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'What is HOMElove Home Expo?',
    a: 'HOMElove is Malaysia\'s premier home and living exhibition series, bringing together top brands in furniture, home appliances, kitchen solutions, renovation, and more under one roof.',
  },
  {
    q: 'Is HOMElove the largest home expo in Malaysia?',
    a: 'HOMElove is one of the largest — with 141+ exhibitions organised, 6,173+ exhibitors, and over 5 million visitors across 8 locations nationwide.',
  },
  {
    q: 'What products can I find at the expo?',
    a: 'You can find furniture, home appliances, kitchen solutions, bathroom fittings, renovation services, smart home devices, mattresses, curtains, and much more.',
  },
  {
    q: 'When and where is the next HOMElove exhibition?',
    a: 'Visit our Exhibitions page for the latest schedule. We organise events across Penang, KL, Johor, Kuching, Kuantan, and more throughout the year.',
  },
  {
    q: 'Any tips for first-time visitors?',
    a: 'Bring your floor plan and measurements, use our Home Checklist to plan what you need, compare prices across exhibitors, and look out for exclusive expo-only deals.',
  },
  {
    q: 'What makes HOMElove different from other home expos?',
    a: 'We focus on quality over quantity — curating only reputable brands, offering exclusive expo deals, free entry, expert consultations, and family-friendly activities.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-gray-light">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">
            FAQs About Home Expo in Malaysia
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                <span
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-90' : ''}`}
                >
                  ›
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-60 pb-5' : 'max-h-0'}`}
              >
                <p className="px-5 text-sm text-gray leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
