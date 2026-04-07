'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    el.querySelectorAll('.animate-on-scroll').forEach((child) => {
      observer.observe(child)
    })

    if (el.classList.contains('animate-on-scroll')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
