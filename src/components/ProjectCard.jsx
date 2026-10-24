import { ArrowUpRight, PlusIcon } from './Icons'

function canUsePointerEffects() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function ProjectCard({ project, featured = false, delay = 0 }) {
  const primaryLink = project.links[0]

  const handleMediaMove = (event) => {
    if (!canUsePointerEffects()) return
    const media = event.currentTarget
    const rect = media.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    media.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
    media.style.setProperty('--my', `${(y * 100).toFixed(2)}%`)
    media.style.setProperty('--rx', `${((y - 0.5) * -3).toFixed(2)}deg`)
    media.style.setProperty('--ry', `${((x - 0.5) * 3).toFixed(2)}deg`)
  }

  const resetMedia = (event) => {
    const media = event.currentTarget
    media.style.setProperty('--mx', '50%')
    media.style.setProperty('--my', '50%')
    media.style.setProperty('--rx', '0deg')
    media.style.setProperty('--ry', '0deg')
  }

  const media = (
    <div
      className="project-media"
      onPointerMove={handleMediaMove}
      onPointerLeave={resetMedia}
    >
      <img
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        loading="lazy"
        decoding="async"
      />
      <span className="media-glare" aria-hidden="true" />
      <span className="project-status">
        <span className="dot" aria-hidden="true" />
        {project.status}
      </span>
      {project.current && (
        <span className="current-flag">You're viewing this</span>
      )}
      {primaryLink && (
        <span className="media-open">
          {primaryLink.label}
          <ArrowUpRight />
        </span>
      )}
    </div>
  )

  return (
    <article
      className={featured ? 'project-featured' : 'project-card'}
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {primaryLink ? (
        <a
          className="project-media-link"
          href={primaryLink.href}
          aria-label={`${primaryLink.label}: ${project.title}`}
        >
          {media}
        </a>
      ) : (
        media
      )}

      <div className="project-copy">
        <div className="project-meta">
          <span>
            <span className="num">{project.number}</span> / {project.kicker}
          </span>
          <span>{project.status}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-desc">{project.description}</p>

        <div className="project-contribution">
          <strong>My contribution</strong>
          {project.contribution}
        </div>

        <ul className="project-stack" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <details className="project-details">
          <summary>
            {project.detailsLabel}
            <PlusIcon />
          </summary>
          <ul className="project-detail-list">
            {project.detail.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>

        {project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link) => {
              const isExternal = /^https?:/i.test(link.href)
              return (
                <a
                  key={link.href}
                  className="project-link"
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                >
                  {link.label}
                  <ArrowUpRight />
                  {isExternal && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              )
            })}
          </div>
        )}

        {project.note && <p className="project-note">{project.note}</p>}
      </div>
    </article>
  )
}
