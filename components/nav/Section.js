import SectionTitle from './SectionTitle'
import Link from './Link'

export default function Section({ section }) {
  return (
    <div>
      <SectionTitle>{section.text}</SectionTitle>
      {section.items.map((item, i) => (
        <Link key={i} {...item} />
      ))}
    </div>
  )
}
