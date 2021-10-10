import getVersions from '@/components/getVersions'
import Header from '@/components/Header'
import Main from '@/components/Main'
import MenuProvider from '@/components/MenuProvider'
import theme from '@/components/theme'
import { TocContext, TocPortal } from '@/components/Toc'
import useJssStyles from '@/components/useJssStyles'
import useSegment from '@/components/utils/useSegment'
import { VersionProvider, VERSION_REGEX } from '@/components/versioning'
import { Metrics } from '@layer0/rum'
import { CssBaseline, Hidden } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

new Metrics({ token: 'cdc8d6df-476b-4e2d-ae1a-f8c6893a39a8' }).collect()

export default function MyApp({ Component, pageProps, currentVersion, versions }) {
  useJssStyles()

  // We add segment id to every app.layer0.co/rsf anchor
  useSegment()

  const toc = useRef()
  const { asPath } = useRouter()
  const showToc = asPath.match(/guides\//)

  return (
    <>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <VersionProvider selectedVersion={currentVersion} versions={versions}>
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

  const versions = await getVersions()
  const splitPath = ctx.asPath.split('/')
  const currentVersion = (splitPath[2] || '').match(VERSION_REGEX) ? splitPath[2] : versions[0]

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ...ctx, version: currentVersion, versions })
  }

  return { pageProps, currentVersion, versions }
}
