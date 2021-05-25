import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav'
import PageWrapper from '../components/PageWrapper'
import { Typography, makeStyles, Container, Grid, Paper, Divider } from '@material-ui/core'
import Link from 'next/link'
import Layer0Icon from '../components/icons/layer0-black.svg'
import Icon from '../components/icons/Icon'
import Markdown from '../components/Markdown'
import { PRODUCT_NAME } from '../constants'
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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}))

const iconProps = {
  style: { height: 142, width: 142 },
}

const Home = ({ navData, changeLog }) => {
  const classes = useStyles()
  return (
    <PageWrapper nav={<Nav navData={navData} />}>
      <Head>
        <title>{PRODUCT_NAME} Documentation</title>
      </Head>
      <div className={classes.hero}>
        <Layer0Icon className={classes.logo} />
        <Typography variant="h2" style={{ maxWidth: 800, marginTop: 0, fontSize: '34px' }}>
          <div style={{ position: 'relative' }}>Jamstack for Production.</div>
        </Typography>
      </div>
      <Grid container className={classes.frameworks}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/next">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="nextjs" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Next.js
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/next_commerce">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="next-commerce" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Start with Next.js Commerce
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/nuxt">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="nuxt" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Nuxt.js
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/vsf">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="vsf" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Vue Storefront
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/react">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="react" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>Get started with React</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/vue">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="vue" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>Get started with Vue.js</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/angular">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="angular" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Angular
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/react-storefront">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="react-storefront" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with React Storefront
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/sapper">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="sapper" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>Get started with Sapper</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/gatsby">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="gatsby" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>Get started with Gatsby</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/spartacus">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="spartacus" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Spartacus
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/nx">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="nx" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>Get started with Nx</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/frontity">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="frontity" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Frontity
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/static_sites">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="html" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Static HTML/JS
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/ember_fastboot">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="fastboot" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>
                    Get started with Ember Fastboot
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/guides/[...guide]" as="/guides/razzle">
                <Paper className={classes.framework} elevation={0}>
                  <Icon type="razzle" className={classes.icon} {...iconProps} />
                  <Typography className={classes.frameworkText}>Get started with Razzle</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item container xs={12} m={12} l={12} xl={12} justify="center">
              Don't see your framework?&nbsp;
              <Link href="/guides/[...guide]" as="/guides/traditional_sites">
                {`Check out ${PRODUCT_NAME} for traditional websites`}
              </Link>
              .
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Container className={classes.changeLog}>
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
      </Container>
      <Container className={classes.changeLog}>
        <Divider />
        <h2>Changelog</h2>
        <Markdown source={changeLog} />
      </Container>
    </PageWrapper>
  )
}

export default Home

export async function getStaticProps() {
  const [navData, changeLog] = await Promise.all([getGuides(), getGuideByName('changelog')])

  return { props: { navData, changeLog } }
}
