function modern(content) {
  return navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
    if (result.state === 'granted' || result.state === 'prompt') {
      return navigator.clipboard.writeText(content)
    } else {
      return Promise.reject(new Error('Clipboard permissions denied'))
    }
  })
}

function fallback(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.style.position = 'fixed'
  el.style.width = '1px'
  el.style.left = '-100%'
  document.body.appendChild(el)
  el.focus()
  el.select()
  let success = false
  if (document.execCommand('copy')) {
    success = true
  } else {
    console.warn('Could not copy to clipboard using fallback')
  }
  document.body.removeChild(el)
  return success ? Promise.resolve() : Promise.reject()
}

export default function copyToClipboard(str) {
  if (navigator.clipboard && navigator.permissions) {
    return modern(str)
  } else {
    return fallback(str)
  }
}
