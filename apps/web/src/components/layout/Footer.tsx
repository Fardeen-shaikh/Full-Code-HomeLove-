import Link from 'next/link'

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
  { label: 'FAQ', href: '/exhibit-with-us#faq' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'fb' },
  { label: 'Instagram', href: '#', icon: 'ig' },
  { label: 'TikTok', href: '#', icon: 'tt' },
  { label: 'XHS', href: '#', icon: 'xhs' },
  { label: 'YouTube', href: '#', icon: 'yt' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-extrabold">
              <span className="text-white">HOME</span>
              <span className="text-accent">love</span>
            </Link>
            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              Malaysia&apos;s premier home &amp; living exhibition, bringing together the best
              exhibitors and homeowners for over a decade.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-sm hover:bg-white/30 transition-colors"
                >
                  {s.icon.toUpperCase()}
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
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
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
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
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
                <a href="tel:+60376202672" className="hover:text-white transition-colors">
                  📞 +603-7620 2672
                </a>
              </li>
              <li>
                <a href="mailto:info@homelove.com.my" className="hover:text-white transition-colors">
                  ✉️ info@homelove.com.my
                </a>
              </li>
              <li>
                <a href="https://wa.me/60102323620" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  💬 WhatsApp: +6010-232 3620
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-block text-sm font-medium text-accent hover:underline"
              >
                Contact Us →
              </Link>
            </div>
            <div className="mt-2">
              <Link
                href="/exhibit-with-us"
                className="inline-block text-sm font-medium text-accent hover:underline"
              >
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
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>

          {/* Affiliated Expos */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-xs text-white/50">Affiliated Expos:</span>
            <div className="flex items-center gap-6">
              {['Concept Living', 'MyEdu', 'Family Health', 'Perfect Lifestyle'].map((brand) => (
                <span key={brand} className="text-xs text-white/40 font-medium">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
