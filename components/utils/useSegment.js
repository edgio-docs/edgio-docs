import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function useSegment() {
  const MOOVWEB = 'moovweb.'
  const RSF = 'reactstorefront.'

  const { asPath, query } = useRouter()
  const [sgId, setSgId] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (window.analytics && !firstLoad) {
      window.analytics.page()
    }

    // to prevent first load page double tracking
    setFirstLoad(false)
  }, [asPath])

  useEffect(() => {
    const segmentLoadInterval = setInterval(() => {
      if (window.analytics && window.analytics.user) {
        const id = query.sgId || window.analytics.user().anonymousId()
        if (query.sgId) {
          window.analytics.alias(id)
        }
        setSgId(id)
        clearInterval(segmentLoadInterval)
      }
    }, 100)

    return () => clearInterval(segmentLoadInterval)
  }, [])

  useEffect(() => {
    if (sgId) {
      const anchors = document.querySelectorAll('a')

      anchors.forEach(anchor => {
        if (
          (anchor.href.includes(MOOVWEB) || anchor.href.includes(RSF)) &&
          !anchor.href.includes(window.location.hostname)
        ) {
          const url = new URL(anchor.href)
          url.searchParams.append('sgId', sgId)

          anchor.href = url.toString()
        }
      })
    }
  }, [sgId, asPath])
}
