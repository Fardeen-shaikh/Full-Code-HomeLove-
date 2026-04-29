'use client'

import { useState } from 'react'
import { submitSubscriber } from '@/lib/api'

const STATES = [
  'Selangor', 'Kuala Lumpur', 'Johor', 'Penang', 'Perak', 'Sabah',
  'Sarawak', 'Kedah', 'Pahang', 'Terengganu', 'Kelantan',
  'Negeri Sembilan', 'Melaka', 'Perlis', 'Putrajaya',
]

const inputBaseStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid #E5E7EB',
  borderRadius: 8,
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--dark)',
  marginBottom: 6,
}

function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--primary)'
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#E5E7EB'
}

export function Newsletter() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      await submitSubscriber({ name, phone, email, state, source: 'newsletter' })
    } catch {
      // Show success regardless of API failure (matches existing UX)
    }
    setSubmitted(true)
  }

  return (
    <section
      id="newsletter"
      style={{
        background: 'linear-gradient(135deg,var(--primary) 0%,var(--primary-light) 100%)',
        padding: '70px 0',
      }}
    >
      <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
        <h2
          className="nl-title"
          style={{
            color: 'white',
            fontSize: 40,
            margin: '0 0 8px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          Newsletter
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: 32 }}>
          Get Latest Deals & Event Updates
        </p>
        {submitted ? (
          <div
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 32,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
            <h3 style={{ color: 'var(--dark)', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
              Thank you for subscribing!
            </h3>
            <p style={{ color: 'var(--gray)', fontSize: 14 }}>
              You&apos;ll receive updates about upcoming HOMElove events.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ background: 'white', borderRadius: 16, padding: 32, textAlign: 'left' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>
                  Name <span style={{ color: 'var(--secondary)' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputBaseStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  Phone <span style={{ color: 'var(--secondary)' }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="+60X-XXX XXXX"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  style={inputBaseStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>
                  Email <span style={{ color: 'var(--secondary)' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputBaseStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <select
                  value={state}
                  onChange={e => setState(e.target.value)}
                  style={{ ...inputBaseStyle, background: 'white' }}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                >
                  <option value="">Select state</option>
                  {STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  fontSize: '0.78rem',
                  color: 'var(--gray)',
                  cursor: 'pointer',
                }}
              >
                <input type="checkbox" required style={{ marginTop: 3 }} />
                I agree to receive promotional emails and updates from HOMElove. You can unsubscribe at any time.
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: 14,
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: submitting ? 'wait' : 'pointer',
                transition: 'background 0.2s',
                opacity: submitting ? 0.7 : 1,
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--primary-light)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--primary)' }}
            >
              {submitting ? 'Subscribing…' : 'Get Event Updates →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
