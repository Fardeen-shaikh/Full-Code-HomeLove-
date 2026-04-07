import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const FEATURES = [
  { icon: '🎫', title: 'Cash Vouchers & Gift Redemptions' },
  { icon: '📢', title: 'Latest Event Promotions' },
  { icon: '🧾', title: 'Keep Track of Receipts' },
  { icon: '💡', title: 'Home Ideas & Inspiration' },
]

export default function AppDownload() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 to-amber-200 py-20 overflow-hidden">
      <div className="absolute -top-20 right-10 w-60 h-60 rounded-full bg-orange/10 blur-3xl animate-float-slow" />

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimateOnScroll>
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
            <a href="#" className="bg-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-[0.98]">
              <span className="text-2xl">▶</span>
              <div>
                <span className="text-[10px] uppercase block leading-tight">Get it on</span>
                <span className="font-semibold text-sm">Google Play</span>
              </div>
            </a>
            <a href="#" className="bg-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-[0.98]">
              <span className="text-2xl">🍎</span>
              <div>
                <span className="text-[10px] uppercase block leading-tight">Download on the</span>
                <span className="font-semibold text-sm">App Store</span>
              </div>
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3} className="hidden lg:flex justify-center">
          <div className="w-[280px] h-[560px] bg-dark rounded-[40px] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.12),0_30px_60px_rgba(0,0,0,0.3)] animate-float">
            <div className="w-full h-full bg-white rounded-[32px] flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <span className="text-5xl block mb-3">📱</span>
                <span className="text-primary font-extrabold text-xl">HOME</span>
                <span className="text-secondary font-extrabold text-xl">love</span>
                <p className="text-gray text-xs mt-2">App Preview</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
