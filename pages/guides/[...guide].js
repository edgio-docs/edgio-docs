import fetch from 'isomorphic-fetch'
import Head from 'next/dist/next-server/lib/head'
import React from 'react'
import Markdown from '../../components/Markdown'
import Nav from '../../components/nav/Nav'
import PageWrapper from '../../components/PageWrapper'
import getBaseUrl from '../../components/utils/getBaseUrl'
import useVersioning from '../../components/versioning'
import ApiLink from '../../components/ApiLink'
import { Typography } from '@material-ui/core'

export default function Guide({ notFound, markdown, navData, guide }) {
  const { isLatestVersion } = useVersioning()

  if (notFound) {
    return <Typography>Page not found.</Typography>
  }

  let pageTitle

  navData.some(section => {
    return section.items.some(page => {
      if ((page.as || '').endsWith(guide)) {
        pageTitle = page.text
        return true
      }
    })
  })

  return (
    <PageWrapper nav={<Nav navData={navData} aboveAdornments={[<ApiLink key="link" />]} />}>
      <Head>
        <title>Moovweb XDN Documentation {pageTitle ? `- ${pageTitle}` : ''}</title>
      </Head>
      <Markdown source={markdown} />
    </PageWrapper>
  )
}

Guide.getInitialProps = async function({ req, query, version, versions }) {
  const baseUrl = getBaseUrl(req)
  let { guide } = query

  if (Array.isArray(guide)) {
    if (guide.length > 1) {
      version = guide[0]
      guide = guide[1]
    } else {
      guide = guide[0]
    }
  }

  try {
    const [navData, content] = await Promise.all([
      fetch(`${baseUrl}/api/guides?version=${version}`)
        .then(res => res.json())
        .catch(e => console.log('error', e)),
      fetch(`${baseUrl}/api/guides/${guide}?version=${version}`)
        .then(res => res.text())
        .catch(e => console.log('error', e)),
    ])

    return {
      markdown: content,
      navData,
      guide,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
