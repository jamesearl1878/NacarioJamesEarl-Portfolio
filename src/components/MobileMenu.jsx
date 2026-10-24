import { useEffect, useRef } from 'react'
import { navItems } from '../data/site'
import Crest from './Crest'
import { CloseIcon } from './Icons'
import ThemeToggle from './ThemeToggle'

export default function MobileMenu({ open, active, theme, onToggleTheme, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      document.documentElement.classList.add('menu-open')
      closeRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    return () => document.documentElement.classList.remove('menu-open')
  }, [])

  const close = () => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
    document.documentElement.classList.remove('menu-open')
    onClose()
  }

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="menu-dialog"
      aria-label="Site menu"
      onClose={() => {
        document.documentElement.classList.remove('menu-open')
        onClose()
      }}
      onClick={handleBackdrop}
    >
      <div className="menu-panel">
        <div className="menu-top">
          <span className="menu-brand">
            <Crest className="menu-crest" />
            <span>
              <span className="brand-name">James Earl Nacario</span>
              <span className="brand-role">Student developer</span>
            </span>
          </span>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn menu-close"
            aria-label="Close menu"
            onClick={close}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="menu-nav" aria-label="Mobile navigation">
          <ol className="menu-list">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`menu-link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={close}
                >
                  <span className="menu-number">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="menu-foot">
          <div className="menu-foot-row">
            <span className="label">Appearance</span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
          <p className="menu-note">
            Student developer / build 02
            <br />
            Contact details are placeholders until launch.
          </p>
        </div>
      </div>
    </dialog>
  )
}
