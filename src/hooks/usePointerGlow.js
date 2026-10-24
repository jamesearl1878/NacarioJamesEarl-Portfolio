import { useEffect } from 'react'

export function usePointerGlow() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return

    let frame = 0
    let target = null
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      if (!target) return
      target.style.setProperty('--gx', `${x}px`)
      target.style.setProperty('--gy', `${y}px`)
    }

    const handleMove = (event) => {
      const scope = event.target.closest?.('[data-glow]')
      if (!scope) return
      target = scope
      const rect = scope.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
      if (!frame) frame = window.requestAnimationFrame(apply)
    }

    document.addEventListener('pointermove', handleMove, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', handleMove)
    }
  }, [])
}
