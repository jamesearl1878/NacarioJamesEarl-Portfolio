import { site } from '../data/site'
import SectionLabel from './SectionLabel'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionLabel index="01">About</SectionLabel>

        <div className="about-grid">
          <aside className="about-aside" data-reveal>
            <div className="aside-card">
              <p className="label">Currently</p>
              <ul className="now-list">
                {site.now.map((item) => (
                  <li key={item.label}>
                    <span className="now-key">{item.label}</span>
                    <span className="now-value">{item.value}</span>
                  </li>
                ))}
              </ul>
              <p className="aside-note">{site.heroNote}</p>
            </div>
            <span className="about-aside-rule" aria-hidden="true" />
            <p className="label">Classwork / practice / this rebuild</p>
          </aside>

          <div>
            <h2 className="display-2 about-title" data-reveal>
              A student's workbench,{' '}
              <span className="accent-word">not a victory lap.</span>
            </h2>

            <div
              className="about-copy"
              data-reveal
              style={{ '--reveal-delay': '70ms' }}
            >
              {site.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="principles">
              {site.principles.map((principle, index) => (
                <article
                  className="principle"
                  key={principle.title}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 70}ms` }}
                >
                  <span className="principle-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
