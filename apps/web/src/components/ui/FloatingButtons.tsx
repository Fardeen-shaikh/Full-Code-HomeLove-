'use client'

import { useState, useEffect } from 'react'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-7 right-7 flex items-center gap-2.5 z-[90]">
      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`w-[52px] h-[52px] bg-[#1a1a1a] text-white rounded-full flex flex-col items-center justify-center gap-[1px] text-[9px] font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[#333] hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] ${showTop ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-2.5'}`}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M18 15l-6-6-6 6" />
        </svg>
        TOP
      </button>

      {/* Chat With Us */}
      <a
        href="https://wa.me/60102323620"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#4F46E5] text-white rounded-full px-6 py-3.5 text-sm font-semibold flex items-center gap-2 shadow-[0_4px_20px_rgba(79,70,229,0.4)] animate-chat-float hover:bg-[#4338CA] hover:animate-none hover:-translate-y-[3px] hover:shadow-[0_6px_28px_rgba(79,70,229,0.5)] transition-all duration-300"
        aria-label="Chat with us"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        CHAT WITH US
      </a>
    </div>
  )
}
