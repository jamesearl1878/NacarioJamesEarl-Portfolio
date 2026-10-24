export default function SectionLabel({ index, children }) {
  return (
    <p className="section-label" data-reveal>
      <span className="section-index">{index}</span>
      <span className="section-line" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
