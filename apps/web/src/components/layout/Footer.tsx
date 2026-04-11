import Link from 'next/link'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Home Tips', href: '/home-tips' },
  { label: 'Checklist', href: '/checklist' },
]

const CONTACT_LINKS = [
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Exhibit With Us', href: '/exhibit-with-us' },
]

const AFFILIATED = [
  { name: 'Concept Living', logo: '/logos/affiliated/concept-living.webp', height: 42, noInvert: true },
  { name: 'Perfect Lifestyle', logo: '/logos/affiliated/perfect-lifestyle.webp', height: 38 },
  { name: 'MyEdu', logo: '/logos/affiliated/myedu.webp', height: 36 },
  { name: 'Family Health & Lifestyle', logo: '/logos/affiliated/family-health-lifestyle.webp', height: 49 },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: '2.2fr 1fr 1fr 1.3fr' }}>
          {/* Column 1: Brand */}
          <div className="footer-brand">
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/homelove/homelove-white.webp" alt="HOMElove" width={170} height={64} loading="lazy" decoding="async" />
              </Link>
            </div>
            <p style={{ marginTop: '16px' }}>
              Malaysia&apos;s premier home &amp; living exhibition, bringing together the best exhibitors and homeowners for over a decade. Organised by Empire Asia Events Marketing Sdn. Bhd. (1102402K).
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="tel:+60376202672" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  +603-7620 2672
                </a>
              </li>
              <li>
                <a href="mailto:info@homelove.com.my" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  info@homelove.com.my
                </a>
              </li>
              {CONTACT_LINKS.map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="https://www.facebook.com/HOMEloveExhibition" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-fb"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>
              <a href="https://www.instagram.com/homelove_homelivingexpo" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-ig"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
              <a href="https://www.tiktok.com/@homeloveexpo" target="_blank" rel="noopener noreferrer" title="TikTok" className="social-tt"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.1a8.28 8.28 0 005.58 2.17V11.8a4.83 4.83 0 01-3.77-1.34V6.69z" /></svg></a>
              <a href="https://www.xiaohongshu.com" target="_blank" rel="noopener noreferrer" title="Xiaohongshu" className="social-xhs"><span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '-0.5px' }}>小红书</span></a>
              <a href="https://www.youtube.com/@homeloveexpo" target="_blank" rel="noopener noreferrer" title="YouTube" className="social-yt"><svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" /></svg></a>
            </div>
            <Link href="/#newsletter" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 22px', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '50px', color: 'white', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              Get Event Updates →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>
              © 2026 <strong>Empire Asia Events Marketing Sdn. Bhd.</strong> All rights reserved.
              &nbsp;|&nbsp; <Link href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Privacy Policy</Link>
              &nbsp;|&nbsp; <Link href="/terms-conditions" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Terms of Use</Link>
              &nbsp;|&nbsp; <Link href="/sitemap" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Sitemap</Link>
            </span>
          </div>
          <div className="footer-bottom-right">
            <span>Affiliated Expos</span>
            {AFFILIATED.map((a) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={a.name} src={a.logo} alt={a.name} className={`aff-logo${a.noInvert ? ' no-invert' : ''}`} style={{ height: `${a.height}px` }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
