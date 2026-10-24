import profileImage from '../assets/profile.jpg'
import { site } from '../data/site'
import Crest from './Crest'
import { ArrowDown, ArrowUpRight } from './Icons'
import MagneticLink from './MagneticLink'

function ProfileCard() {
  return (
    <aside className="driver-card" aria-label="Profile card">
      <div className="driver-top">
        <span className="label">Profile / 01</span>
        <span className="speed-ticks" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="portrait-stack">
        <div className="portrait-frame">
          <img
            src={profileImage}
            alt="Portrait of James Earl Nacario."
            width={199}
            height={200}
            fetchPriority="high"
            decoding="async"
          />
          <span className="portrait-label">JN / 2026</span>
        </div>
        <span className="portrait-crest" aria-hidden="true">
          <Crest />
        </span>
      </div>

      <dl className="driver-meta">
        <div>
          <dt>Role</dt>
          <dd>Student developer</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Front-end / UI</dd>
        </div>
        <div>
          <dt>Build</dt>
          <dd>No. 02</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>2026</dd>
        </div>
      </dl>

      <div className="driver-foot">
        <span className="label">Status</span>
        <span className="driver-status">
          <i aria-hidden="true" />
          Learning in public
        </span>
      </div>
    </aside>
  )
}

export default function Hero() {
  return (
    <section id="home" className="hero glow" data-glow>
      <span className="glow-layer" aria-hidden="true" />
      <div className="shell hero-shell">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="label hero-eyebrow" data-reveal>
              <span className="status-dot" aria-hidden="true" />
              {site.eyebrow}
            </p>

            <h1 className="hero-name" data-reveal style={{ '--reveal-delay': '70ms' }}>
              <span>James Earl</span>
              <span className="hero-name-last">
                Nacario
                <span className="hero-name-mark" aria-hidden="true">
                  .
                </span>
              </span>
            </h1>

            <p className="hero-intro" data-reveal style={{ '--reveal-delay': '140ms' }}>
              {site.intro}
            </p>

            <div className="hero-actions" data-reveal style={{ '--reveal-delay': '210ms' }}>
              <MagneticLink href="#projects" className="btn btn-primary">
                View projects
                <ArrowUpRight />
              </MagneticLink>
              <a href="#about" className="btn btn-ghost">
                About me
                <ArrowDown />
              </a>
            </div>

            <dl className="hero-meta" data-reveal style={{ '--reveal-delay': '280ms' }}>
              <div>
                <dt>Role</dt>
                <dd>Student developer</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Front-end &amp; UI</dd>
              </div>
              <div>
                <dt>Learning</dt>
                <dd>React + Tailwind</dd>
              </div>
            </dl>
          </div>

          <div className="hero-aside" data-reveal style={{ '--reveal-delay': '160ms' }}>
            <ProfileCard />
          </div>
        </div>

        <div className="hero-footer" data-reveal style={{ '--reveal-delay': '320ms' }}>
          <a className="scroll-cue" href="#about">
            Scroll to explore
            <span className="scroll-rail" aria-hidden="true" />
          </a>
          <p className="label hero-footnote">Three projects / honest notes</p>
        </div>
      </div>
    </section>
  )
}
