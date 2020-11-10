import React from 'react'
import fetch from 'isomorphic-fetch'
import Header from '../components/Header'
import theme from '../components/theme'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import useJssStyles from '../components/useJssStyles'
import Head from 'next/head'
import getBaseUrl from '../components/utils/getBaseUrl'
import { VERSION_REGEX, VersionProvider } from '../components/versioning'
import MenuProvider from '../components/MenuProvider'
import useMixpanel from '../components/utils/useMixpanel'
import { configure as configurePrefetching } from '@xdn/prefetch/window/prefetch'

if (typeof window !== 'undefined') {
  configurePrefetching({ includeCacheMisses: true })
}

export default function MyApp({ Component, pageProps, currentVersion, versions }) {
  useJssStyles()

  // We add mixpanel id to every moovweb.app/rsf anchor
  useMixpanel()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <VersionProvider selectedVersion={currentVersion} versions={versions}>
          <Head>
            <link rel="icon" href="/favicon.png" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <CssBaseline />
          <MenuProvider>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
          </MenuProvider>
        </VersionProvider>
      </MuiThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  const baseUrl = getBaseUrl(ctx.req)
  const versions = await fetch(`${baseUrl}/api/versions`).then(res => res.json())
  const splitPath = ctx.asPath.split('/')
  const currentVersion = (splitPath[2] || '').match(VERSION_REGEX) ? splitPath[2] : versions[0]

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ...ctx, version: currentVersion, versions })
  }

  return { pageProps, currentVersion, versions }
}
