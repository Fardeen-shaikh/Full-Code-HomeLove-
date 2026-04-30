'use client'

import { useEffect } from 'react'

/**
 * Adds `.visible` to every `.animate-on-scroll` element as it scrolls into
 * view. Replaces the inline-JS observer that was previously baked into the
 * wireframe homepage. Mounted once at the layout level so every page benefits.
 *
 * Behavior matches the original wireframe:
 * - threshold 0.1, rootMargin -50px from bottom (fades start before fully visible)
 * - one-shot per element (unobserve after .visible is added)
 * - re-scans the DOM on mutation so dynamically added sections are picked up
 */
export function ScrollFadeObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    function observeAll() {
      document.querySelectorAll<HTMLElement>('.animate-on-scroll:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        } else {
          observer.observe(el)
        }
      })
    }

    // Run a few times: layout's useEffect can fire before page sections
    // are fully mounted in the DOM (Next.js layout/page mount order). Then
    // again after fonts/images settle. We deliberately do NOT use a
    // MutationObserver: scroll-driven state changes elsewhere (e.g.
    // carousel-dot updates) cause constant DOM mutations and a global
    // mutation observer would create main-thread jank that briefly stalls
    // CSS animations like the top marquee.
    observeAll()
    requestAnimationFrame(observeAll)
    const t1 = setTimeout(observeAll, 100)
    const t2 = setTimeout(observeAll, 500)

    const onLoad = () => observeAll()
    if (document.readyState === 'complete') {
      requestAnimationFrame(observeAll)
    } else {
      window.addEventListener('load', onLoad)
    }

    return () => {
      observer.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return null
}
