export default function idForHeading(text) {
  return typeof text === 'string'
    ? `section_${text
        .trim()
        .replace(/\W/g, '_')
        .toLowerCase()}`
    : ''
}
