export default function highlight(text, query) {
  return text.replace(new RegExp(query, 'gi'), match => `<span class="highlight">${match}</span>`)
}
