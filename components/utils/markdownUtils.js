import * as constants from '../../constants'

function replaceMatch(content, match) {
  const [template, variable] = match

  return (
    content.substr(0, match.index) +
    constants[variable] +
    content.substr(match.index + template.length)
  )
}

/**
 * Populates the markdown template with replacement values for all
 * constant placeholders with pattern: {{ VARIABLE_NAME }}
 *
 * @param {String} content
 * @returns {String}
 */
export function populatePlaceholders(content) {
  const matcher = /{{\s*(\w+)\s*}}/g
  let result

  while ((result = matcher.exec(content)) !== null) {
    const [, variable] = result

    if (constants[variable]) {
      content = replaceMatch(content, result)
    }
  }

  return content
}
