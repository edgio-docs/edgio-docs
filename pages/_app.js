import fetch from 'isomorphic-fetch'
import React from 'react'
import Header from '../components/Header'
import theme from '../components/theme'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import useJssStyles from '../components/useJssStyles'
import Head from 'next/head'
import getBaseUrl from '../components/utils/getBaseUrl'
import { VersionProvider } from '../components/versioning'
import MenuProvider from '../components/MenuProvider'

export default function MyApp({ Component, pageProps, currentVersion, versions }) {
  useJssStyles()

  return (
    <MuiThemeProvider theme={theme}>
      <VersionProvider selectedVersion={currentVersion} versions={versions}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
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
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  const baseUrl = getBaseUrl(ctx.req)
  const versions = await fetch(`${baseUrl}/api/versions`).then(res => res.json())
  const splitPath = ctx.asPath.split('/')
  const currentVersion = (splitPath[2] || '').startsWith('v7') ? splitPath[2] : versions[0]

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ...ctx, version: currentVersion, versions })
  }

  return { pageProps, currentVersion, versions }
}
