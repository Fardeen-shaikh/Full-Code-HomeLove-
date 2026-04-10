'use client'

import { useState, useRef } from 'react'
import { submitSubscriber } from '@/lib/api'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka',
  'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
]

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return
    const data = new FormData(form)
    try {
      await submitSubscriber({
        name: data.get('name') as string,
        phone: data.get('phone') as string,
        email: data.get('email') as string,
        state: data.get('state') as string,
        source: 'newsletter',
      })
    } catch {
      // Still show success even if API fails
    }
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="bg-gradient-to-br from-primary via-primary-light to-[#0a3d7a] py-20">
      <div className="max-w-3xl mx-auto px-4">
        <AnimateOnScroll className="text-center mb-8">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">Stay Updated</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Newsletter</h2>
          <p className="text-white/70 text-sm mt-2">
            Get Latest Deals &amp; Event Updates
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          {submitted ? (
            <div className="text-center py-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
              <span className="text-4xl block mb-3">✅</span>
              <h3 className="font-bold text-white text-lg">Thank you for subscribing!</h3>
              <p className="text-white/70 text-sm mt-2">You&apos;ll receive updates about upcoming HOMElove events.</p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-4 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                />
                <select
                  name="state"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent [&>option]:text-dark"
                >
                  <option value="" disabled>Select State *</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-start gap-2 text-xs text-white/70">
                <input type="checkbox" required className="mt-0.5 accent-accent" />
                <span>I agree to receive promotional emails and updates from HOMElove. You can unsubscribe at any time.</span>
              </label>
              <button
                type="submit"
                className="w-full bg-accent text-dark font-semibold py-3.5 rounded-xl hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,241,0,0.4)]"
              >
                Get Event Updates →
              </button>
            </form>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
