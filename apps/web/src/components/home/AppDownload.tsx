const FEATURES = [
  { icon: '🎫', title: 'Cash Vouchers & Gift Redemptions' },
  { icon: '📢', title: 'Latest Event Promotions' },
  { icon: '🧾', title: 'Keep Track of Receipts' },
  { icon: '💡', title: 'Home Ideas & Inspiration' },
]

export default function AppDownload() {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-amber-200 py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <span className="text-orange text-sm font-semibold uppercase tracking-wider">Mobile App</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">Download the HOMElove App</h2>
          <p className="text-gray mt-4 leading-relaxed">
            Get exclusive deals, event updates, and home inspiration right on your phone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-sm font-medium text-dark">{f.title}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#"
              className="bg-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">▶</span>
              <div>
                <span className="text-[10px] uppercase block">Get it on</span>
                <span className="font-semibold text-sm">Google Play</span>
              </div>
            </a>
            <a
              href="#"
              className="bg-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">🍎</span>
              <div>
                <span className="text-[10px] uppercase block">Download on the</span>
                <span className="font-semibold text-sm">App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="hidden lg:flex justify-center">
          <div className="w-[280px] h-[560px] bg-dark rounded-[40px] p-3 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[32px] flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl block mb-3">📱</span>
                <span className="text-primary font-bold text-lg">HOME</span>
                <span className="text-secondary font-bold text-lg">love</span>
                <p className="text-gray text-xs mt-2">App Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
