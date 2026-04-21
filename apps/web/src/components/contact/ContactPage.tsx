'use client'

import { useState } from 'react'
import { submitContactInquiry } from '@/lib/api'
import { executeRecaptcha } from '@/lib/recaptcha'
import './contact.css'

const CONTACT_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'info@homelove.com.my',
    href: 'mailto:info@homelove.com.my',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+603-7620 2672',
    href: 'tel:+60376202672',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '+6010-232 3620',
    href: 'https://wa.me/60102323620',
    external: true,
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11)
    setForm((prev) => ({ ...prev, phone: digits }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const captchaToken = (await executeRecaptcha('contact_submit')) ?? undefined
      await submitContactInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || undefined,
        captchaToken,
      })
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="contact-hero" id="contact">
        <div className="contact-hero-overlay" />
        <div className="container">
          <div className="contact-hero-content">
            <h1>Contact Us</h1>
            <p>Get in Touch With the HOMElove Team</p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="contact-info" id="contact-info">
        <div className="container">
          <h2 className="contact-info-title">Contact Information</h2>
          <div className="contact-cards">
            {CONTACT_CARDS.map((card) => (
              <a
                key={card.label}
                href={card.href}
                className="contact-card"
                {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className="contact-card-icon">{card.icon}</div>
                <div className="contact-card-label">{card.label}</div>
                <div className="contact-card-value">{card.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section" id="contact-form">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2>Send Us a Message</h2>
              <p>Fill in the form below and our team will get back to you as soon as possible.</p>
            </div>

            {status === 'sent' ? (
              <div className="contact-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We&apos;ll get back to you shortly.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setStatus('idle')}
                  type="button"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Contact Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      required
                      inputMode="numeric"
                      maxLength={11}
                      placeholder="e.g. 0123456789"
                    />
                  </div>
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="message">Message / Additional Info</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="contact-form-footer">
                  <p className="form-disclaimer">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{' '}
                    and{' '}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
                  </p>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="form-error">Something went wrong. Please try again or contact us directly.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Office Address */}
      <section className="contact-address" id="address">
        <div className="container">
          <div className="address-card">
            <div className="address-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="address-content">
              <h3>Office Address</h3>
              <p>
                <strong>Empire Asia Events Marketing Sdn. Bhd. <span className="address-reg">(1102402-K)</span></strong>
                Unit D-3A-01 Capital 4, Oasis Square, No.2, Jalan PJU 1A/7A<br />
                Oasis Damansara, 47301 Petaling Jaya, Selangor, Malaysia
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
