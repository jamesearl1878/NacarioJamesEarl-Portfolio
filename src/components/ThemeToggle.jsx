import { MoonIcon, SunIcon } from './Icons'

export default function ThemeToggle({ theme, onToggle, className = '' }) {
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={`icon-btn theme-toggle ${className}`.trim()}
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <SunIcon className={`theme-icon sun ${theme === 'dark' ? 'is-on' : ''}`} />
        <MoonIcon className={`theme-icon moon ${theme === 'dark' ? '' : 'is-on'}`} />
      </span>
    </button>
  )
}
