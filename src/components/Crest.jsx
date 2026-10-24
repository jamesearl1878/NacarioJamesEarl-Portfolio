export default function Crest({ className = '', label }) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      <path
        d="M12 2h40l10 11v34L32 70 2 47V13L12 2Z"
        fill="#141311"
        stroke="#B6995F"
        strokeWidth="1.6"
      />
      <path
        d="M16.5 7.5h31.7l8.2 8.4v28.4L32 63.3 7.6 44.3V15.9l8.9-8.4Z"
        fill="none"
        stroke="#B6995F"
        strokeOpacity=".55"
        strokeWidth=".8"
      />
      <path d="M7.6 40.8 32 55.4l24.4-14.6v5.8L32 64 7.6 46.6v-5.8Z" fill="#FF3D1F" />
      <path
        d="m7.6 40.8 24.4 14.6 24.4-14.6"
        fill="none"
        stroke="#D6B97C"
        strokeOpacity=".55"
        strokeWidth=".8"
      />
      <g fill="none" stroke="#F5F0E6" strokeWidth="2.7" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M23.5 21.5H33v12c0 3.1-1.8 4.9-5.1 4.9-3 0-4.9-1.6-4.9-4" />
        <path d="M38.5 38V21.5L47 38V21.5" />
      </g>
      <g stroke="#B6995F" strokeWidth="1.2" strokeLinecap="square" opacity=".8">
        <path d="M13 15.5h7" />
        <path d="M15 19h5" />
        <path d="M17 22.5h3" />
      </g>
    </svg>
  )
}
