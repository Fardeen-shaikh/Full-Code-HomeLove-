'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-dark text-white hidden lg:flex flex-col items-center justify-center shadow-lg hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Back to top"
    >
      <span className="text-xs leading-none">↑</span>
      <span className="text-[8px] font-bold uppercase tracking-wider leading-none mt-0.5">Top</span>
    </button>
  )
}
