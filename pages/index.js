import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav'
import PageWrapper from '../components/PageWrapper'
import {
  Typography,
  makeStyles,
  darken,
  Container,
  Grid,
  Paper,
  Divider,
  Button,
} from '@material-ui/core'
import Link from 'next/link'
import Layer0Icon from '../components/icons/layer0-black.svg'
import Icon from '../components/icons/Icon'
import Markdown from '../components/Markdown'
import { PRODUCT_NAME, EXAMPLES_REPOS } from '../constants'
import { getGuides, getGuideByName } from '../components/getGuides'

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
    display: 'grid',
    gridGap: '1.2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  },

  frameworkItem: {
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },

  framework: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '100%',
  },

  frameworkWrapper: {
    display: 'contents',
    cursor: 'pointer',
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
    paddingBottom: theme.spacing(8),
    '& h2': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    transition: 'color border-color 200ms linear',
    '&:hover': {
      borderColor: darken(theme.palette.secondary.light, 0.1),
    },
    '& span': {
      textDecoration: 'none',
    },
    marginTop: 10,
  },
  buttonLink: {
    textDecoration: 'none',
    marginTop: 'auto',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

const iconProps = {
  style: { height: 142, width: 142, objectFit: 'contain' },
}

const Home = ({ navData }) => {
  const classes = useStyles()
  return (
    <PageWrapper nav={<Nav navData={navData} />}>
      <Head>
        <title>{PRODUCT_NAME} Documentation</title>
      </Head>
      <div className={classes.hero}>
        <Layer0Icon className={classes.logo} />
        <Typography variant="h2" style={{ maxWidth: 800, marginTop: 0, fontSize: '30px' }}>
          <div style={{ position: 'relative' }}>
            Develop, deploy, preview, split test and monitor your frontend.
          </div>
        </Typography>
      </div>
      <div className={classes.frameworks}>
        <FrameworkItem
          guide="/guides/next"
          framework="next"
          icon="nextjs"
          text="Get started with Next.js"
        />

        <FrameworkItem
          guide="/guides/next_commerce"
          framework="nextcommerce"
          icon="next-commerce"
          text="Start with Next.js Commerce"
        />

        <FrameworkItem guide="/guides/nuxt" framework="nuxt" text="Get started with Nuxt.js" />

        <FrameworkItem guide="/guides/vsf" framework="vsf" text="Get started with Vue Storefront" />

        <FrameworkItem guide="/guides/swell" framework="swell" text="Get started with Swell" />

        <FrameworkItem
          guide="/guides/react"
          framework="static-react"
          icon="react"
          text="Get started with React"
        />

        <FrameworkItem
          guide="/guides/vue"
          framework="static-vue"
          icon="vue"
          text="Get started with Vue.js"
        />

        <FrameworkItem
          guide="/guides/svelte"
          framework="svelte"
          icon="svelte"
          text="Get started with Svelte"
        />

        <FrameworkItem
          guide="/guides/angular"
          framework="angular"
          text="Get started with Angular"
        />

        <FrameworkItem
          guide="/guides/react-storefront"
          framework="react-storefront"
          text="Get started with React Storefront"
        />

        <FrameworkItem guide="/guides/sapper" framework="sapper" text="Get started with Sapper" />

        <FrameworkItem guide="/guides/gatsby" framework="gatsby" text="Get started with Gatsby" />

        <FrameworkItem
          guide="/guides/spartacus"
          framework="spartacus"
          text="Get started with Spartacus"
        />

        <FrameworkItem guide="/guides/nx" framework="nx" text="Get started with Nx" />

        <FrameworkItem
          guide="/guides/frontity"
          framework="frontity"
          text="Get started with Frontity"
        />

        <FrameworkItem
          guide="/guides/static_sites"
          framework=""
          icon="html"
          text=" Get started with Static HTML/JS"
        />

        <FrameworkItem
          guide="/guides/ember_fastboot"
          framework="fastboot"
          text="Get started with Ember Fastboot"
        />

        <FrameworkItem
          guide="/guides/razzle"
          framework="razzle"
          text="Get started with Razzle"
          icon="razzleP"
        />
      </div>

      <p>
        Don't see your framework? Check out {PRODUCT_NAME} for &nbsp;
        <Link href="/guides/[...guide]" as="/guides/traditional_sites">
          traditional websites
        </Link>
        .
      </p>
      <div className={classes.changeLog}>
        <Divider />
        <h1>{PRODUCT_NAME} Tutorials</h1>
        <Grid container spacing={5}>
          <Grid item>
            <h4>{PRODUCT_NAME} - What & Why</h4>
            <iframe
              width="100%"
              height="90%"
              src="https://www.youtube.com/embed/sJ6AkTrcZvg"
            ></iframe>
          </Grid>
          <Grid item>
            <h4>{PRODUCT_NAME} - Deploying GitHub Project</h4>
            <iframe
              width="100%"
              height="90%"
              src="https://www.youtube.com/embed/F8uN03ps1As"
            ></iframe>
          </Grid>
          <Grid item>
            <h4>{PRODUCT_NAME} - How to Prefetch</h4>
            <iframe
              width="100%"
              height="90%"
              src="https://www.youtube.com/embed/lfhSDCNgzfs"
            ></iframe>
          </Grid>
          <Grid item>
            <h4>
              {PRODUCT_NAME} - What are the {PRODUCT_NAME} DevTools?
            </h4>
            <iframe
              width="100%"
              height="90%"
              src="https://www.youtube.com/embed/4AYQAvkc0UY"
            ></iframe>
          </Grid>
        </Grid>
      </div>
    </PageWrapper>
  )
}

export default Home

export async function getStaticProps() {
  const [navData] = await Promise.all([getGuides()])

  return { props: { navData } }
}

const FrameworkItem = ({ framework, text, guide, icon }) => {
  const classes = useStyles()

  if (!icon) icon = framework
  return (
    <Grid item className={classes.frameworkItem}>
      <Paper className={classes.framework} elevation={0}>
        <Link href="/guides/[...guide]" as={guide}>
          <div className={classes.frameworkWrapper}>
            <Icon type={icon} className={classes.icon} {...iconProps} />
            <Typography className={classes.frameworkText}>{text}</Typography>
          </div>
        </Link>
        <DeployLink framework={framework} />
      </Paper>
    </Grid>
  )
}

const DeployLink = ({ framework }) => {
  const classes = useStyles()
  const url = EXAMPLES_REPOS[framework]

  // No url is a valid option
  if (!url) {
    return null
  }

  return (
    <a
      className={classes.buttonLink}
      href={`https://app.layer0.co/deploy?repo=${encodeURIComponent(EXAMPLES_REPOS[framework])}`}
      target="_blank"
    >
      <Button variant="outlined" color="secondary" className={classes.button}>
        Deploy to Layer0
      </Button>
    </a>
  )
}
