import fetch from 'isomorphic-fetch'
import Head from 'next/dist/next-server/lib/head'
import React from 'react'
import Footer from '../../components/Footer'
import Markdown from '../../components/Markdown'
import Nav from '../../components/nav/Nav'
import PageWrapper from '../../components/PageWrapper'
import ApiLink from '../../components/ApiLink'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { PRODUCT_NAME } from '../../constants'
import { populatePlaceholders } from '../../components/utils/markdownUtils'
import prerenderRequests from '../../layer0/prerenderRequests'
import { getGuides, getGuideByName } from '../../components/getGuides'

export default function Guide({ notFound, markdown, navData, guide }) {
  const theme = useTheme()

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
    <PageWrapper
      centerStyle={{ paddingTop: theme.spacing(4) }}
      nav={<Nav navData={navData} aboveAdornments={[<ApiLink key="link" />]} />}
    >
      <Head>
        <title>
          {PRODUCT_NAME} Documentation {pageTitle ? `- ${pageTitle}` : ''}
        </title>
      </Head>
      {notFound ? (
        <Typography variant="h1" align="center">
          Page not found.
        </Typography>
      ) : (
        <Markdown source={markdown} toc />
      )}
      <Footer navData={navData} guide={guide} />
    </PageWrapper>
  )
}

export async function getStaticPaths(...args) {
  console.log('guide.js getstaticpaths', args)
  const requests = await prerenderRequests()

  const ret = {
    paths: requests
      .filter(({ path }) => path.startsWith('/guides'))
      .map(({ path }) => ({
        params: { guide: [path.split('/')[2]] },
      })),
    fallback: false,
  }

  return ret
}

export async function getStaticProps({ params }) {
  console.log('guides.js getstaticprops', params)
  let { guide, version } = params

  // guide will come in as single string, or with a version prepended (e.g. v1.2.3/overview)
  if (typeof guide === 'string') {
    guide = decodeURIComponent(guide).split('/')
  }

  console.log('guide is', guide, version)

  if (Array.isArray(guide)) {
    if (guide.length > 1) {
      version = guide[0]
      guide = guide[1]
    } else {
      guide = guide[0]
    }
  }

  console.log('guide is now', guide, version)
  try {
    const [navData, content] = await Promise.all([
      getGuides(version),
      getGuideByName(guide, version),
    ])

    return {
      markdown: populatePlaceholders(content),
      navData,
      guide,
      notFound: !content.trim().length,
    }
  } catch (e) {
    console.log('exception', e)
    return {
      notFound: true,
    }
  }
}
