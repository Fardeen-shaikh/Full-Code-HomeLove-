import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const FEATURES = [
  { icon: '🎁', title: 'Cash Vouchers & Gift Redemptions' },
  { icon: '📢', title: 'Latest Event Promotions' },
  { icon: '🧾', title: 'Keep Track of Receipts' },
  { icon: '🏠', title: 'Home Ideas & Inspiration' },
]

const PHONE_MENU = [
  { icon: '📅', label: 'Events' },
  { icon: '🏪', label: 'Exhibitors' },
  { icon: '🎁', label: 'Rewards' },
  { icon: '🧾', label: 'Receipts' },
  { icon: '📍', label: 'Locations' },
  { icon: '💡', label: 'Ideas' },
]

export default function AppDownload() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FBBF24 100%)', padding: '70px 0' }}>
      {/* Floating blob */}
      <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-white/30 rounded-full animate-float-slow" />

      <div className="relative z-[1] max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Content */}
        <div>
          <AnimateOnScroll>
            <h2 className="text-[40px] font-extrabold text-dark mb-5">Download the HOMElove App</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <p className="text-[17px] text-dark/80 mb-9">
              Get exclusive deals, event notifications, and manage your exhibition experience all in one place!
            </p>
          </AnimateOnScroll>

          {/* Features — blue icon boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {FEATURES.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={i * 0.1}>
                <div className="flex items-center gap-3.5 group">
                  <div className="w-12 h-12 bg-primary rounded-[14px] flex items-center justify-center text-[22px] flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:shadow-[0_10px_30px_rgba(23,41,121,0.3)]">
                    {f.icon}
                  </div>
                  <span className="text-[15px] font-medium text-dark">{f.title}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Store Buttons */}
          <AnimateOnScroll>
            <div className="flex gap-4">
              {/* Google Play */}
              <a
                href="#"
                className="relative overflow-hidden flex items-center gap-3.5 px-7 py-3.5 rounded-[14px] text-white border border-white/[0.08] transition-all duration-400 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(1,75,152,0.2)] hover:border-white/15 active:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: 'linear-gradient(145deg, #1a1a2e, #16213e)' }}
              >
                <svg style={{ width: 32, height: 32, flexShrink: 0 }} viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#32BBFF"/>
                  <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="#32BBFF"/>
                  <path d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="#2DCDAC"/>
                  <path d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" fill="#FFCF00"/>
                  <path d="M104.6 13L325.3 234.3l60.1-60.1L104.6 13z" fill="#F14F4C"/>
                </svg>
                <div className="text-left">
                  <small className="text-[11px] opacity-70 block">GET IT ON</small>
                  <span className="text-base font-semibold">Google Play</span>
                </div>
              </a>

              {/* App Store */}
              <a
                href="#"
                className="relative overflow-hidden flex items-center gap-3.5 px-7 py-3.5 rounded-[14px] text-white border border-white/[0.08] transition-all duration-400 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(1,75,152,0.2)] hover:border-white/15 active:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: 'linear-gradient(145deg, #1a1a2e, #16213e)' }}
              >
                <svg style={{ width: 32, height: 32, flexShrink: 0 }} viewBox="0 0 384 512" fill="white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="text-left">
                  <small className="text-[11px] opacity-70 block">Download on the</small>
                  <span className="text-base font-semibold">App Store</span>
                </div>
              </a>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Phone Mockup */}
        <div className="hidden lg:flex justify-center">
          <div
            className="w-[300px] h-[600px] rounded-[44px] p-3.5 animate-float"
            style={{
              background: 'linear-gradient(180deg, #1F2937, #111827)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 30px 60px rgba(0,0,0,0.3)',
              animationDuration: '4s',
            }}
          >
            <div className="bg-white rounded-[34px] h-full overflow-hidden">
              {/* Phone Header */}
              <div className="bg-primary text-white text-center" style={{ padding: '44px 24px 24px' }}>
                <div className="w-[70px] h-[70px] bg-white rounded-[18px] mx-auto mb-3.5 flex items-center justify-center overflow-hidden p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logos/homelove-logo.png" alt="HOMElove" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold">HOMElove</h4>
              </div>

              {/* Phone Content */}
              <div className="p-6">
                {/* Search Bar */}
                <div className="bg-gray-light rounded-xl px-4 py-3.5 flex items-center gap-3 mb-6 text-sm text-gray">
                  🔍 Search exhibitions, exhibitors...
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-3 gap-3.5">
                  {PHONE_MENU.map((item) => (
                    <div
                      key={item.label}
                      className="text-center py-4 px-2.5 bg-gray-light rounded-[14px] transition-all duration-300 cursor-pointer hover:bg-primary hover:text-white hover:scale-105 group"
                    >
                      <div className="text-[26px] mb-2">{item.icon}</div>
                      <span className="text-[11px] text-gray group-hover:text-white transition-colors">{item.label}</span>
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
