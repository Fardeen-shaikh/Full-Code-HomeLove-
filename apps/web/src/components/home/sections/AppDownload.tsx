const FEATURES = [
  { icon: '🎁', delay: 1, label: 'Cash Vouchers & Gift Redemptions' },
  { icon: '📢', delay: 2, label: 'Latest Event Promotions' },
  { icon: '🧾', delay: 3, label: 'Keep Track of Receipts' },
  { icon: '🏠', delay: 4, label: 'Home Ideas & Inspiration' },
]

const PHONE_MENU = [
  { icon: '📅', label: 'Events' },
  { icon: '🏪', label: 'Exhibitors' },
  { icon: '🎁', label: 'Rewards' },
  { icon: '🧾', label: 'Receipts' },
  { icon: '📍', label: 'Locations' },
  { icon: '💡', label: 'Ideas' },
]

const PHONE_FEATURES_MOBILE = [
  { icon: '🎁', label: 'Cash Vouchers & Gifts' },
  { icon: '📢', label: 'Event Promotions' },
  { icon: '🧾', label: 'Track Receipts' },
  { icon: '🏠', label: 'Home Ideas & Inspiration' },
]

function GooglePlayIcon() {
  return (
    <svg style={{ width: 32, height: 32, flexShrink: 0 }} viewBox="0 0 512 512">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#32BBFF" />
      <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="#32BBFF" />
      <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="#32BBFF" />
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#32BBFF" />
      <path d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="#2DCDAC" />
      <path d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" fill="#FFCF00" />
      <path d="M104.6 13L325.3 234.3l60.1-60.1L104.6 13z" fill="#F14F4C" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg style={{ width: 32, height: 32, flexShrink: 0 }} viewBox="0 0 384 512" fill="white">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

export function AppDownload() {
  return (
    <section className="app-section" id="app-download">
      <div className="container">
        <div className="app-content">
          <h2 className="animate-on-scroll">Download the HOMElove App</h2>
          <p className="animate-on-scroll">
            Get exclusive deals, event notifications, and manage your exhibition experience all in one place!
          </p>
          <div className="app-features">
            {FEATURES.map((f, i) => (
              <div key={i} className={`app-feature animate-on-scroll delay-${f.delay}`}>
                <div className="app-feature-icon">{f.icon}</div>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
          <div className="app-buttons animate-on-scroll">
            <a href="#" className="app-button" style={{ padding: '14px 28px', gap: 14 }}>
              <GooglePlayIcon />
              <div className="app-button-text">
                <small>GET IT ON</small>
                <span>Google Play</span>
              </div>
            </a>
            <a href="#" className="app-button" style={{ padding: '14px 28px', gap: 14 }}>
              <AppleIcon />
              <div className="app-button-text">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
          </div>
        </div>
        {/* Mobile phone preview (hidden on desktop, shown on mobile) */}
        <div className="app-phone-preview">
          <div className="app-phone-header">
            <img src="/logos/homelove/homelove-white.webp" alt="HOMElove" loading="lazy" decoding="async" width={120} height={40} />
          </div>
          <div className="app-phone-body">
            <div className="app-phone-tiles">
              {FEATURES.map((f, i) => (
                <div key={i} className="app-phone-tile">
                  <div className="app-phone-tile-icon">{f.icon}</div>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="app-mockup">
          <div className="phone-frame">
            <div className="phone-screen">
              <div className="phone-header">
                <div className="phone-logo">
                  <img src="/logos/homelove/homelove-blue.webp" alt="HOMElove" loading="lazy" decoding="async" width={80} height={28} />
                </div>
                <h4>HOMElove</h4>
              </div>
              <div className="phone-content">
                <div className="phone-search">
                  🔍 Search exhibitions, exhibitors...
                </div>
                <div className="phone-menu">
                  {PHONE_MENU.map((m, i) => (
                    <div key={i} className="phone-menu-item">
                      <div className="phone-menu-icon">{m.icon}</div>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
                {/* Mobile-only: 4 app features inside phone */}
                <div className="phone-features-mobile" style={{ display: 'none' }}>
                  {PHONE_FEATURES_MOBILE.map((f, i) => (
                    <div key={i} className="phone-feat">
                      <div className="phone-feat-icon">{f.icon}</div>
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
