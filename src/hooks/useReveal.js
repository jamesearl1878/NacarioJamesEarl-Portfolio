import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!nodes.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsObserver = 'IntersectionObserver' in window

    if (reducedMotion || !supportsObserver) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    document.documentElement.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('reveal-ready')
    }
  }, [])
}
