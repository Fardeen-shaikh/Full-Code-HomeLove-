import Link from 'next/link'
import Image from 'next/image'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Home Tips', href: '/home-tips' },
  { label: 'Checklist', href: '/checklist' },
]

const EXHIBITOR_LINKS = [
  { label: 'Exhibit With Us', href: '/exhibit-with-us' },
  { label: 'Booth Packages', href: '/exhibit-with-us#packages' },
  { label: 'Success Stories', href: '/exhibit-with-us#stories' },
  { label: 'FAQ', href: '/#faq' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', color: 'hover:bg-[#1877F2] hover:shadow-[0_6px_20px_rgba(24,119,242,0.5)]', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: 'Instagram', href: '#', color: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:shadow-[0_6px_20px_rgba(225,48,108,0.5)]', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { label: 'TikTok', href: '#', color: 'hover:bg-black hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)]', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  { label: 'XHS', href: '#', color: 'hover:bg-[#FF2442] hover:shadow-[0_6px_20px_rgba(255,36,66,0.5)]', icon: <span className="text-xs font-bold">XHS</span> },
  { label: 'YouTube', href: '#', color: 'hover:bg-[#FF0000] hover:shadow-[0_6px_20px_rgba(255,0,0,0.5)]', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
]

const AFFILIATED = [
  { name: 'Concept Living', logo: '/images/affiliated/concept-living.png' },
  { name: 'MyEdu', logo: '/images/affiliated/myedu.png' },
  { name: 'Family Health & Lifestyle', logo: '/images/affiliated/family-health-lifestyle.png' },
  { name: 'Perfect Lifestyle', logo: '/images/affiliated/perfect-lifestyle.png' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/images/logos/homelove-white.png"
                alt="HOMElove"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              Malaysia&apos;s premier home &amp; living exhibition, bringing together the best
              exhibitors and homeowners for over a decade.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2.5 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-all duration-400 hover:-translate-y-1.5 hover:scale-110 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white hover:pl-2.5 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Exhibitors */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">For Exhibitors</h3>
            <ul className="space-y-2.5">
              {EXHIBITOR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white hover:pl-2.5 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <a href="tel:+60376202672" className="hover:text-white transition-colors duration-300">
                  📞 +603-7620 2672
                </a>
              </li>
              <li>
                <a href="mailto:info@homelove.com.my" className="hover:text-white transition-colors duration-300">
                  ✉️ info@homelove.com.my
                </a>
              </li>
              <li>
                <a href="https://wa.me/60102323620" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                  💬 WhatsApp: +6010-232 3620
                </a>
              </li>
            </ul>
            <div className="mt-4 space-y-2">
              <Link href="/contact" className="block text-sm font-medium text-accent hover:underline">
                Contact Us →
              </Link>
              <Link href="/exhibit-with-us" className="block text-sm font-medium text-accent hover:underline">
                Exhibit With Us →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <div className="text-center md:text-left">
              <p>Organised by Empire Asia Events Marketing Sdn. Bhd. (1102402-K)</p>
              <p className="mt-1">© 2026 Empire Asia Events Marketing Sdn. Bhd. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Use</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors duration-300">Sitemap</Link>
            </div>
          </div>

          {/* Affiliated Expos */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50">Affiliated Expos:</span>
            <div className="flex items-center gap-6">
              {AFFILIATED.map((brand) => (
                <Image
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  width={80}
                  height={30}
                  className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
