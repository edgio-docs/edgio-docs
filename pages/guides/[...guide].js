import Footer from '../../components/Footer'
import Markdown from '../../components/Markdown'
import Nav from '../../components/nav/Nav'
import PageWrapper from '../../components/PageWrapper'
import ApiLink from '../../components/ApiLink'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { PRODUCT_NAME, DOCS_DOMAIN } from '../../constants'
import { populatePlaceholders } from '../../components/utils/markdownUtils'
import prerenderRequests from '../../layer0/prerenderRequests'
import { getGuides, getGuideByName } from '../../components/getGuides'
import SEO from '../../components/Seo'

export default function Guide({ notFound, markdown, navData, guide }) {

  const theme = useTheme()
  const skipToC = guide === 'changelog'

  let pageTitle

  navData.some(section => {
    return section.items.some(page => {
      if ((page.as || '').endsWith(guide)) {
        pageTitle = page.text
        return true
      }
    })
  })

  const meta= {
    title: `${PRODUCT_NAME} Documentation ${pageTitle ? `- ${pageTitle}` : ''}`,
    url: `https://${DOCS_DOMAIN}/guides/${guide}`,
    image: `https://layer0-docs-og-image-default.layer0.link/api?title=${pageTitle || 'Documentation'}&width=1400&height=720`
  }

  return (
    <PageWrapper
      centerStyle={{ paddingTop: theme.spacing(4) }}
      nav={<Nav navData={navData} aboveAdornments={[<ApiLink key="link" />]} />}
    >
      <SEO {...meta} />
      {notFound ? (
        <Typography variant="h1" align="center">
          Page not found.
        </Typography>
      ) : (
        <Markdown source={markdown} toc={!skipToC} />
      )}
      <Footer navData={navData} guide={guide} />
    </PageWrapper>
  )
}

export async function getStaticPaths() {
  const requests = await prerenderRequests()

  return {
    paths: requests
      .filter(({ path }) => path.startsWith('/guides'))
      .map(({ path }) => ({
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
    }
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    }
  }
}
