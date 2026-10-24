import { site } from '../data/site'
import SectionLabel from './SectionLabel'
import { ArrowUpRight, GitHubIcon, MailIcon } from './Icons'

function ContactCard({ item, icon: Icon }) {
  const content = (
    <>
      <span className="contact-icon">
        <Icon />
      </span>
      <span className="contact-card-body">
        <span className="contact-card-label">{item.label}</span>
        <span className="contact-card-value">{item.value}</span>
        {item.isPlaceholder && (
          <span className="placeholder-tag">
            Placeholder — replace before publishing
          </span>
        )}
      </span>
      {!item.isPlaceholder && <ArrowUpRight className="contact-card-arrow" />}
    </>
  )

  if (item.isPlaceholder) {
    return <div className="contact-card is-placeholder">{content}</div>
  }

  const href = item.url ?? `mailto:${item.value}`
  const isExternal = /^https?:/i.test(href)

  return (
    <a
      className="contact-card"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer me' : undefined}
    >
      {content}
    </a>
  )
}

export default function Contact() {
  const { email, github } = site.contact

  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <SectionLabel index="04">Contact</SectionLabel>

        <div className="contact-grid">
          <div>
            <h2 className="display-2 contact-title" data-reveal>
              Let's make something{' '}
              <span className="accent-word">clear.</span>
            </h2>
            <p
              className="contact-lead"
              data-reveal
              style={{ '--reveal-delay': '70ms' }}
            >
              Open to feedback on this build and to student collaborations. The
              quickest route is email.
            </p>
            <p className="contact-note" data-reveal style={{ '--reveal-delay': '140ms' }}>
              No contact form. A form without a backend is decoration, so this
              page links straight to email and GitHub instead.
            </p>
          </div>

          <div className="contact-cards" data-reveal>
            <ContactCard item={email} icon={MailIcon} />
            <ContactCard item={github} icon={GitHubIcon} />
          </div>
        </div>

        <div className="contact-foot" data-reveal>
          <p className="label">Student portfolio / build 02 / 2026</p>
          <span className="status-line">
            <i aria-hidden="true" />
            Learning in public
          </span>
        </div>
      </div>
    </section>
  )
}
