import fetch from 'isomorphic-fetch'
import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import PageWrapper from '../components/PageWrapper'
import { Typography, makeStyles, Container } from '@material-ui/core'
import Features from '../components/home/Features'
import getBaseUrl from '../components/utils/getBaseUrl'
import ApiLink from '../components/ApiLink'

const useStyles = makeStyles(theme => ({
  hero: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& h1, & h2': {
      color: theme.palette.text.secondary,
      fontWeight: 300,
    },
  },

  gettingStarted: {
    marginTop: '1em',
    color: theme.palette.text.primary,
    fontSize: '1.2em',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
  },
}))

const Home = ({ navData }) => {
  const classes = useStyles()
  return (
    <PageWrapper nav={<Nav navData={navData} aboveAdornments={[<ApiLink key="link" />]} />}>
      <Head>
        <title>Moovweb XDN - Home</title>
      </Head>
      <div className={classes.hero}>
        <Typography variant="h1" style={{ margin: '0.5em 0' }}>
         Moovweb XDN
        </Typography>
        <Typography variant="h2" style={{ maxWidth: 800 }}>
          Moovweb's XDN is an ultra-fast, scalable, cloud-based platform for hosting modern web applications. The XDN allows you to control powerful caching and routing capabilities at the network edge via JavaScript code.
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
        {/*<code className={classes.gettingStarted}>$ npm create react-storefront myapp --yes</code>*/}
      </div>
      <Container maxWidth="md">
        <Features />
      </Container>
    </PageWrapper>
  )
}

export default Home

Home.getInitialProps = async ({ version, versions, req }) => {
  const baseUrl = getBaseUrl(req)
  const navData = await fetch(
    `${baseUrl}/api/guides?version=${version === versions[0] ? '' : version}`,
  ).then(res => res.json())
  return { navData }
}
