import fetch from 'isomorphic-fetch'
import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav'
import PageWrapper from '../components/PageWrapper'
import { Typography, makeStyles, Container, Grid, Paper, Divider } from '@material-ui/core'
import getBaseUrl from '../components/utils/getBaseUrl'
import Link from 'next/link'
import ReactIcon from '../components/icons/react.svg'
import ReactStorefrontIcon from '../components/icons/react-storefront.svg'
import NextIcon from '../components/icons/next.svg'
import NuxtIcon from '../components/icons/nuxt.svg'
import AngularIcon from '../components/icons/angular.svg'
import MoovwebXDN from '../components/icons/moovweb-xdn-black.svg'
import SapperIcon from '../components/icons/sapper.svg'
import GatsbyIcon from '../components/icons/gatsby.svg'
import VSFIcon from '../components/icons/vsf.svg'
import VueIcon from '../components/icons/vue.svg'
import NextCommerceIcon from '../components/icons/next-commerce.svg' 
import { icons } from '../components/icons/Icon'
import Markdown from '../components/Markdown'

const SpartacusIcon = icons['spartacus']

const useStyles = makeStyles(theme => ({
  hero: {
    paddingTop: theme.spacing(10),
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

  cardActionArea: {
    flex: 1,
  },

  frameworks: {
    marginTop: theme.spacing(5),
  },

  framework: {
    border: `1px solid ${theme.palette.divider}`,
    width: 250,
    margin: 15,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },

  frameworkText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  icon: {
    flex: 1,
    padding: theme.spacing(2),
  },

  logo: {
    margin: '1em 0',
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
    [theme.breakpoints.up('md')]: {
      width: 600,
    },
  },

  changeLog: {
    marginTop: theme.spacing(8),
  },
}))

const Home = ({ navData, changeLog }) => {
  const classes = useStyles()
  return (
    <PageWrapper nav={<Nav navData={navData} />}>
      <Head>
        <title>Moovweb XDN Documentation</title>
      </Head>
      <div className={classes.hero}>
        <MoovwebXDN className={classes.logo} />
        <Typography variant="h2" style={{ maxWidth: 800 }}>
          <div style={{ position: 'relative' }}>Instant sites. Happy developers.</div>
        </Typography>
      </div>
      <Grid container className={classes.frameworks}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/next">
                <Paper className={classes.framework} elevation={0}>
                  <NextIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>
                    Get started with Next.js
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/next_commerce">
                <Paper className={classes.framework} elevation={0}>
                  <NextCommerceIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>
                    Start with Next.js Commerce
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/nuxt">
                <Paper className={classes.framework} elevation={0}>
                  <NuxtIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>
                    Get started with Nuxt.js
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/vsf">
                <Paper className={classes.framework} elevation={0}>
                  <VSFIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>
                    Get started with Vue Storefront
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/react">
                <Paper className={classes.framework} elevation={0}>
                  <ReactIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>Get started with React</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/vue">
                <Paper className={classes.framework} elevation={0}>
                  <VueIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>Get started with Vue.js</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/angular">
                <Paper className={classes.framework} elevation={0}>
                  <AngularIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>
                    Get started with Angular
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/react-storefront">
                <Paper className={classes.framework} elevation={0}>
                  <ReactStorefrontIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>
                    Get started with React Storefront
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/sapper">
                <Paper className={classes.framework} elevation={0}>
                  <SapperIcon className={classes.icon} style={{ height: 142, width: 142 }} />
                  <Typography className={classes.frameworkText}>Get started with Sapper</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/gatsby">
                <Paper className={classes.framework} elevation={0}>
                  <GatsbyIcon className={classes.icon} style={{ height: 142, width: 142 }} />
                  <Typography className={classes.frameworkText}>Get started with Gatsby</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/spartacus">
                <Paper className={classes.framework} elevation={0}>
                  <SpartacusIcon className={classes.icon} style={{ height: 142, width: 142 }} />
                  <Typography className={classes.frameworkText}>
                    Get started with Spartacus
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item container xs={12} m={12} l={12} xl={12} justify="center">
              Don't see your framework?&nbsp;
              <Link href="/guides/[...guide]" as="/guides/starter">
                Check out XDN Starter
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="/guides/[...guide]" as="/guides/vue">
                <Paper className={classes.framework} elevation={0}>
                  <VueIcon className={classes.icon} />
                  <Typography className={classes.frameworkText}>Get started with Vue</Typography>
                </Paper>
              </Link>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Container className={classes.changeLog}>
        <Divider />
        <h2>Changelog</h2>
        <Markdown source={changeLog} />
      </Container>
    </PageWrapper>
  )
}

export default Home

Home.getInitialProps = async ({ version, versions, req }) => {
  const baseUrl = getBaseUrl(req)
  const changelogURL = `https://moovweb-docs.github.io/xdn-docs-pages/current/guides/changelog.md`
  const navURL = `${baseUrl}/api/guides?version=${version === versions[0] ? '' : version}`

  const [navData, changeLog] = await Promise.all([
    fetch(navURL).then(res => res.json()),
    fetch(changelogURL).then(res => res.text()),
  ])

  return { navData, changeLog }
}
