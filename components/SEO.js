import { PRODUCT_NAME } from '../constants'
import Head from 'next/head'

const SEO = ({
  title = `${PRODUCT_NAME} Documentation`,
  description = 'Infrastructure for sub-second dynamic websites. Develop, deploy, preview, experiment on, monitor and run your frontend - Deploy for Free in 1 Minute.',
  url = 'https://docs.layer0.co',
  image = 'https://layer0-docs-og-image-default.layer0.link/api?title=Documentation&width=1400&height=720',
}) => (
  <Head>
    <title>{title}</title>
    <meta name="title" property="title" content={title} />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="twitter:title" property="twitter:title" content={title} />
    <meta name="description" property="description" content={description} />
    <meta name="og:description" property="og:description" content={description} />
    <meta name="twitter:description" property="twitter:description" content={description} />
    <meta name="og:url" property="og:url" content={url} />
    <meta name="twitter:url" property="twitter:url" content={url} />
    <meta name="og:image" property="og:image" content={image} />
    <meta name="twitter:image" property="twitter:image" content={image} />
  </Head>
)

export default SEO
