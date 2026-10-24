import { marqueeSkills } from '../data/skills'

const sequence = [...marqueeSkills, ...marqueeSkills]

export default function Marquee() {
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div className="marquee-group" key={group} data-clone={group === 1 ? 'true' : undefined}>
            {sequence.map((skill, index) => (
              <span className="marquee-item" key={`${group}-${skill}-${index}`}>
                {skill}
                <span className="marquee-star" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
