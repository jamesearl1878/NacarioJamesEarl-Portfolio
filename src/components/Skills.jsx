import { skillGroups } from '../data/skills'
import SectionLabel from './SectionLabel'

const statusLabels = ['In use', 'Active', 'Queued']

export default function Skills() {
  return (
    <section id="skills" className="section section-surface">
      <div className="shell">
        <SectionLabel index="02">Skills</SectionLabel>

        <div className="section-head">
          <h2 className="display-2" data-reveal>
            Tools in hand,{' '}
            <span className="accent-word">room to grow.</span>
          </h2>
          <p className="section-head-note" data-reveal>
            No percentage bars. These are grouped by how I actually use them,
            with the honest gaps left visible.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article
              className="skill-panel"
              key={group.id}
              data-reveal
              style={{ '--reveal-delay': `${index * 70}ms` }}
            >
              <div className="skill-panel-head">
                <span className="skill-number">
                  {String(index + 1).padStart(2, '0')} / {group.id}
                </span>
                <h3>{group.title}</h3>
                <p className="skill-caption">{group.caption}</p>
              </div>

              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="skill-mark" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="skill-foot">
                <span>{String(group.items.length).padStart(2, '0')} items</span>
                <span>{statusLabels[index]}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
