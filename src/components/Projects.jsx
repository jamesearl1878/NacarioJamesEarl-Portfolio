import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import SectionLabel from './SectionLabel'

export default function Projects() {
  const featured = projects.find((project) => project.featured)
  const secondary = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="section glow" data-glow>
      <span className="glow-layer" aria-hidden="true" />
      <div className="shell">
        <SectionLabel index="03">Projects</SectionLabel>

        <div className="section-head">
          <h2 className="display-2" data-reveal>
            Practice builds, <span className="accent-word">documented.</span>
          </h2>
          <p className="section-head-note" data-reveal>
            Every project here is real, including the archived first version.
            Open the build notes to see what I made and what I would change.
          </p>
        </div>

        {featured && <ProjectCard project={featured} featured />}

        <div className="projects-grid">
          {secondary.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={(index + 1) * 70}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
