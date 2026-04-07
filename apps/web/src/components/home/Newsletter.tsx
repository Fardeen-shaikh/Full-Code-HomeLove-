'use client'

import { useState } from 'react'

const STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka',
  'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
]

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Stay Updated</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mt-2">
              Get Latest Deals &amp; Event Updates
            </h2>
            <p className="text-gray text-sm mt-2">
              Be the first to know about upcoming exhibitions, exclusive deals, and home tips.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <span className="text-4xl block mb-3">✅</span>
              <h3 className="font-bold text-dark text-lg">Thank you for subscribing!</h3>
              <p className="text-gray text-sm mt-2">You&apos;ll receive updates about upcoming HOMElove events.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <select
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="" disabled>Select State *</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-start gap-2 text-xs text-gray">
                <input type="checkbox" required className="mt-0.5 accent-primary" />
                <span>I agree to receive promotional updates from HOMElove. You can unsubscribe at any time.</span>
              </label>
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Event Updates →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
