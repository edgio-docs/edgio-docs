import Head from 'next/head'

const SEO = ({ meta }) => {
  return (
    <Head>
      <title>{meta['title']}</title>
      <meta name="title" property="title" content={meta['title']} />
      <meta name="og:title" property="og:title" content={meta['title']} />
      <meta name="twitter:title" property="twitter:title" content={meta['title']} />
      <meta name="description" property="description" content={meta['description']} />
      <meta name="og:description" property="og:description" content={meta['description']} />
      <meta
        name="twitter:description"
        property="twitter:description"
        content={meta['description']}
      />
      <meta name="og:url" property="og:url" content={meta['canonical']} />
      <meta name="twitter:url" property="twitter:url" content={meta['canonical']} />
      <meta name="og:image" property="og:image" content={meta['image']} />
      <meta name="twitter:image" property="twitter:image" content={meta['image']} />
    </Head>
  )
}

export default SEO
