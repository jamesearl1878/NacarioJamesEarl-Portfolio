import { useState } from 'react'
import { navItems, sectionIds } from '../data/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import Crest from './Crest'
import { ArrowUpRight } from './Icons'
import MobileMenu from './MobileMenu'
import ScrollProgress from './ScrollProgress'
import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(sectionIds)

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a href="#home" className="brand" aria-label="James Earl Nacario, back to top">
          <Crest className="brand-crest" />
          <span className="brand-text">
            <span className="brand-name">
              <span className="brand-name-full">James Earl Nacario</span>
              <span className="brand-name-short">J. E. Nacario</span>
            </span>
            <span className="brand-role">Student developer</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${active === item.id ? 'is-active' : ''}`}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className="btn btn-primary header-cta">
            Let's talk
            <ArrowUpRight />
          </a>
          <button
            type="button"
            className="menu-trigger"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <ScrollProgress />

      <MobileMenu
        open={menuOpen}
        active={active}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}
