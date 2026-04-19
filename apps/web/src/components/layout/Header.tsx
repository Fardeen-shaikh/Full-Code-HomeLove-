'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Home Tips', href: '/home-tips' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Exhibit With Us', href: '/exhibit-with-us' },
  { label: 'About Us', href: '/about-us' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="header-top">
          <div className="container">
            <span>🏠 Malaysia&apos;s Premier Home &amp; Living Exhibition</span>
            <span>
              <a href="tel:0102323620">📞 010-232 3620</a> | <a href="mailto:info@homelove.com.my">✉️ info@homelove.com.my</a>
            </span>
          </div>
        </div>
        <div className="header-main">
          <div className="container">
            <div className="logo">
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/homelove/homelove-blue.webp" alt="HOMElove Home & Living Expo" width={160} height={60} fetchPriority="high" />
              </Link>
            </div>
            <nav className="nav">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(link.href) ? 'active' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="header-actions">
              <Link href="/checklist" className="btn btn-primary">Home Checklist</Link>
            </div>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay${mobileOpen ? ' open' : ''}`} id="mobileMenu">
        <button className="mobile-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={isActive(link.href) ? 'active' : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/checklist" onClick={() => setMobileOpen(false)} style={{ color: 'var(--primary)', fontWeight: 700 }}>
          Home Checklist
        </Link>
      </div>
    </>
  )
}
