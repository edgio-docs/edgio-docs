import React, { useRef } from 'react'
import fetch from 'isomorphic-fetch'
import Header from '../components/Header'
import theme from '../components/theme'
import { CssBaseline, Hidden } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import useJssStyles from '../components/useJssStyles'
import Head from 'next/head'
import getBaseUrl from '../components/utils/getBaseUrl'
import { VERSION_REGEX, VersionProvider } from '../components/versioning'
import MenuProvider from '../components/MenuProvider'
import useSegment from '../components/utils/useSegment'
import { Metrics } from '@xdn/rum'
import { TocContext, TocPortal } from '../components/Toc'
import Main from '../components/Main'
import { useRouter } from 'next/router'

new Metrics({ debug: true, token: '0f577165-236e-4264-8684-c29ba912d1cc' }).collect()

export default function MyApp({ Component, pageProps, currentVersion, versions }) {
  useJssStyles()

  // We add segment id to every moovweb.app/rsf anchor
  useSegment()

  const toc = useRef()
  const { asPath } = useRouter()
  const showToc = asPath.match(/guides\//)

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
              href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
            />
          </Head>
          <CssBaseline />
          <MenuProvider>
            <Header />
            <Main showToc={showToc}>
              {showToc && (
                <Hidden xsDown implementation="css">
                  <TocPortal ref={toc} style={{ gridColumn: 2 }} />
                </Hidden>
              )}
              <TocContext.Provider value={toc}>
                <div
                  style={{
                    gridColumn: 1,
                    gridRow: 1,
                    overflow: 'hidden',
                    maxWidth: showToc ? '87.5rem' : undefined,
                  }}
                >
                  <Component {...pageProps} />
                </div>
              </TocContext.Provider>
            </Main>
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
