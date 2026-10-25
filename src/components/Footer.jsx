import { navItems, site } from '../data/site'
import Crest from './Crest'
import { ArrowUp, GitHubIcon, MailIcon } from './Icons'

function FooterContact({ item, icon: Icon }) {
  if (item.isPlaceholder) {
    return (
      <span className="footer-link footer-placeholder">
        <Icon />
        {item.value}
       
      </span>
    )
  }

  const href = item.url ?? `mailto:${item.value}`
  const isExternal = /^https?:/i.test(href)

  return (
    <a
      className="footer-link"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer me' : undefined}
    >
      <Icon />
      {item.value}
    </a>
  )
}

export default function Footer() {
  const { email, github } = site.contact

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <a href="#home" className="footer-brand" aria-label="James Earl Nacario, back to top">
            <Crest className="footer-crest" />
            <span>
              <span className="footer-name">James Earl Nacario</span>
              <span className="footer-tagline">Student developer / build 02</span>
            </span>
          </a>
          <p className="footer-statement">
            Clear interfaces. Honest notes. Room to grow.
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <p className="footer-heading">Sitemap</p>
            <ul className="footer-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a className="footer-link" href={`#${item.id}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-heading">Elsewhere</p>
            <ul className="footer-list">
              <li>
                <FooterContact item={email} icon={MailIcon} />
              </li>
              <li>
                <FooterContact item={github} icon={GitHubIcon} />
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-heading">Built with</p>
            <p className="footer-note">
              React, Vite, and Tailwind CSS. Set in Barlow Condensed, Barlow, and
              JetBrains Mono. No template, no component library.
            </p>
          </div>

          <div className="footer-col">
            <p className="footer-heading">Colophon</p>
            <p className="footer-note">{site.aiNote}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 James Earl Nacario</p>
          <p className="footer-copy">Student portfolio / v2.0</p>
          <a className="to-top" href="#home">
            Back to top
            <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  )
}
