'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    const onScroll = () => setScrolled(window.scrollY > 100)
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
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-[10px] shadow-md' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            🏠 Malaysia&apos;s Premier Home &amp; Living Exhibition
          </span>
          <span className="flex items-center gap-3">
            <a href="tel:0102323620" className="hover:text-accent transition-colors duration-300">📞 010-232 3620</a>
            <span className="text-white/40">|</span>
            <a href="mailto:info@homelove.com.my" className="hover:text-accent transition-colors duration-300">✉️ info@homelove.com.my</a>
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/logos/homelove-blue.png"
            alt="HOMElove"
            width={160}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-dark hover:text-primary transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/checklist"
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(1,75,152,0.3)]"
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
          <span className={`w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-dark transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto transition-all duration-300 ${mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <nav className="flex flex-col p-6 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-dark hover:text-primary hover:pl-2.5 py-3 border-b border-gray-light transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/checklist"
            className="bg-primary text-white text-center font-semibold px-5 py-3.5 rounded-full mt-6"
            onClick={() => setMobileOpen(false)}
          >
            Home Checklist
          </Link>
        </nav>
      </div>
    </header>
  )
}
