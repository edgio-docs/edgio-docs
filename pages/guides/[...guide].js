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

export async function getStaticPaths() {
  const requests = await prerenderRequests()

  return {
    paths: requests.map(({ path }) => ({
      params: { guide: [path.split('/')[2]] },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  let { guide, version /* undefined */ } = params

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
      getGuides(version),
      getGuideByName(guide, version),
    ])

    return {
      props: {
        markdown: populatePlaceholders(content),
        navData,
        guide,
        notFound: !content.trim().length,
      },
      revalidate: 10,
    }
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    }
  }
}
