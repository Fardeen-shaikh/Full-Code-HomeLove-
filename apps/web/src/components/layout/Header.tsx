'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Home Tips', href: '/home-tips' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Exhibit With Us', href: '/exhibit-with-us' },
  { label: 'About Us', href: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <span className="flex items-center gap-1">
            🏠 Malaysia&apos;s Premier Home &amp; Living Exhibition
          </span>
          <span className="flex items-center gap-3">
            <a href="tel:0102323620" className="hover:text-accent transition-colors">📞 010-232 3620</a>
            <span>|</span>
            <a href="mailto:info@homelove.com.my" className="hover:text-accent transition-colors">✉️ info@homelove.com.my</a>
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <span className="text-primary">HOME</span>
          <span className="text-secondary">love</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dark hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/checklist"
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Home Checklist
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`w-6 h-0.5 bg-dark transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-dark transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-dark transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto">
          <nav className="flex flex-col p-6 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-dark hover:text-primary py-2 border-b border-gray-light"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/checklist"
              className="bg-primary text-white text-center font-semibold px-5 py-3 rounded-full mt-4"
              onClick={() => setMobileOpen(false)}
            >
              Home Checklist
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
