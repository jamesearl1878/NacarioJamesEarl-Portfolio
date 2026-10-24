import { useRef } from 'react'

export default function MagneticLink({ href, className = '', children, ...props }) {
  const ref = useRef(null)

  const handleMove = (event) => {
    const element = ref.current
    if (!element) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = element.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8
    element.style.setProperty('--mag-x', `${x.toFixed(2)}px`)
    element.style.setProperty('--mag-y', `${y.toFixed(2)}px`)
  }

  const reset = () => {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--mag-x', '0px')
    element.style.setProperty('--mag-y', '0px')
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      {...props}
    >
      <span className="magnetic-inner">{children}</span>
    </a>
  )
}
