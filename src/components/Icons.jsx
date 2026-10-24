const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
  focusable: 'false',
}

export function ArrowUpRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M6.5 17.5 17.5 6.5M8 6.5h9.5V16" />
    </svg>
  )
}

export function ArrowRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowDown({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  )
}

export function ArrowUp({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M12 20V5M6 11l6-6 6 6" />
    </svg>
  )
}

export function SunIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  )
}

export function MoonIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2Z" />
    </svg>
  )
}

export function MailIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <rect x="2.5" y="5" width="19" height="14" rx="0.5" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  )
}

export function GitHubIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  )
}

export function CloseIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  )
}

export function PlusIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
