import { useEffect, useState } from 'react'

export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const marker = window.scrollY + window.innerHeight * 0.35
      let current = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        const top = element.getBoundingClientRect().top + window.scrollY
        if (top <= marker) current = id
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom) current = ids[ids.length - 1]

      setActive((previous) => (previous === current ? previous : current))
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.addEventListener('hashchange', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.removeEventListener('hashchange', requestUpdate)
    }
  }, [ids])

  return active
}
