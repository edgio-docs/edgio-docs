import React from 'react'
import {
  Typography,
  makeStyles,
  darken,
  Grid,
  Paper,
  Divider,
  Button,
  useTheme,
} from '@material-ui/core'
import Link from 'next/link'
import cs from 'classname'
import Nav from '../components/nav/Nav'
import PageWrapper from '../components/PageWrapper'
import Icon from '../components/icons/Icon'
import { PRODUCT_NAME, EXAMPLES_REPOS } from '../constants'
import { getGuides } from '../components/getGuides'
import SEO from '../components/Seo'
import Launch from '@material-ui/icons/Launch'

const frameworkItems = [
  {
    guide: '/guides/next',
    framework: 'next',
    icon: 'nextjs',
    text: 'Next.js',
  },

  {
    guide: '/guides/nuxt',
    framework: 'nuxt',
    icon: 'nuxt',
    text: 'Nuxt.js',
  },
  {
    guide: '/guides/next_commerce',
    framework: 'nextcommerce',
    icon: 'next-commerce',
    text: 'Next.js Commerce',
  },
  {
    guide: '/guides/vsf',
    framework: 'vsf',
    icon: 'vsf',
    text: 'Vue Storefront',
  },
  {
    guide: '/guides/serverless_functions',
    framework: 'serverless',
    icon: 'serverless_functions',
    text: 'Serverless functions',
  },
  {
    guide: '/guides/gatsby',
    framework: 'gatsby',
    icon: 'gatsby',
    text: 'Gatsby',
  },
  {
    guide: '/guides/shopify_hydrogen',
    framework: 'shopify_hydrogen',
    icon: 'shopify_hydrogen',
    text: 'Shopify Hydrogen',
  },
  {
    guide: '/guides/react',
    framework: 'static-react',
    icon: 'react',
    text: 'React',
  },
  {
    guide: '/guides/vue',
    framework: 'static-vue',
    icon: 'vue',
    text: 'Vue.js',
  },
  {
    guide: '/guides/svelte',
    framework: 'svelte',
    icon: 'svelte',
    text: 'Svelte',
  },
  {
    guide: '/guides/angular',
    framework: 'angular',
    icon: 'angular',
    text: 'Angular',
  },
  {
    guide: '/guides/swell',
    framework: 'swell',
    icon: 'swell',
    text: 'Swell',
  },
  {
    guide: '/guides/react-storefront',
    framework: 'react-storefront',
    icon: 'react-storefront',
    text: 'React Storefront',
  },
  {
    guide: '/guides/astro',
    framework: 'astro',
    icon: 'astro',
    text: 'Astro',
  },
  {
    guide: '/guides/sapper',
    framework: 'sapper',
    icon: 'sapper',
    text: 'Sapper',
  },
  {
    guide: '/guides/spartacus',
    framework: 'spartacus',
    icon: 'spartacus',
    text: 'Spartacus',
  },
  {
    guide: '/guides/nx',
    framework: 'nx',
    icon: 'nx',
    text: 'React Nx',
  },
  {
    guide: '/guides/frontity',
    framework: 'frontity',
    icon: 'frontity',
    text: 'Frontity',
  },
  {
    guide: '/guides/static_sites',
    framework: '',
    icon: 'html',
    text: 'Static HTML/JavaScript',
  },
  {
    guide: '/guides/ember_fastboot',
    framework: 'fastboot',
    icon: 'fastboot',
    text: 'Ember Fastboot',
  },
  {
    guide: '/guides/razzle',
    framework: 'razzle',
    icon: 'razzleP',
    text: 'Razzle',
  },
  {
    guide: '/guides/mkdocs',
    framework: 'mkdocs',
    icon: 'mkdocs',
    text: 'MkDocs',
  },
  {
    guide: '/guides/jekyll',
    framework: 'jekyll',
    icon: 'jekyll',
    text: 'Jekyll',
  },
]

const Home = ({ navData }) => {
  const classes = useStyles()
  const theme = useTheme()

  const PriEm = ({ children, addlClasses = {} }) => (
    <span className={cs(classes.colorPrimary, classes.fontNormal, addlClasses)}>{children}</span>
  )
  const SecEm = ({ children }) => <span className={cs(classes.fontNormal)}>{children}</span>

  return (
    <PageWrapper nav={<Nav navData={navData} />}>
      <SEO />

      <div className={classes.hero}>
        <Typography variant="h2" style={{ maxWidth: 800, marginTop: 0, fontSize: '30px' }}>
          <div>
            Leverage the capabilities of Layer0's <PriEm>CDN network</PriEm> and deployment
            platform.
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            The <PriEm>simplest</PriEm> and most <PriEm>powerful</PriEm> way to{' '}
            <SecEm>develop</SecEm>, <SecEm>deploy</SecEm>, <SecEm>preview</SecEm>,{' '}
            <SecEm>split test</SecEm>, <SecEm>monitor</SecEm>, and <PriEm>speed up</PriEm> your{' '}
            <PriEm>site</PriEm>.
          </div>
        </Typography>
      </div>
      <Grid
        container
        spacing={5}
        alignItems="stretch"
        justify="center"
        className={classes.choiceBox}
      >
        <Grid
          item
          xs={12}
          sm={6}
          className={cs(classes.placeCenter, classes.grid, classes.alignItemsBaseline)}
        >
          <h3 className={cs(classes.headerChoice)}>Enable the Layer0 CDN Edge Network</h3>
          <Typography>
            The quickest way to start accelerating your site is integrating Layer0's Global Edge
            Network into your new or existing site / project. Get up and running in under{' '}
            <PriEm addlClasses={classes.fontBold}>seven minutes</PriEm>.
          </Typography>
          <Link href="/guides/get_started" as="/guides/enable_cdn">
            <Button
              variant="contained"
              color="secondary"
              className={cs(classes.button, classes.alignSelfEnd)}
              fullWidth
            >
              Enable CDN
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          className={cs(classes.placeCenter, classes.grid, classes.alignItemsBaseline)}
        >
          <h3 className={cs(classes.headerChoice)}>Edge Network + Development Experience</h3>
          <Typography>
            Take a leap forward in developer experience using Layer0 to integrate a Global Edge
            Network and a modern web development workflow. Start with a new project or easily
            integrate into your existing project.
          </Typography>
          <Link href="/guides/get_started" as="/guides/build_web_apps">
            <Button variant="contained" color="secondary" className={classes.button} fullWidth>
              Enable CDN &amp; Dx
            </Button>
          </Link>
        </Grid>
      </Grid>
      <hr style={{ marginTop: theme.spacing(6) }} />
      <Typography
        variant="h2"
        style={{ marginTop: theme.spacing(4), fontSize: '30px', marginBottom: theme.spacing(2) }}
      >
        Build a Jamstack site on one of many popular platforms
      </Typography>
      <Typography style={{ marginBottom: theme.spacing(2) }}>
        Leverage the capabilities of a modern web framework and get all the benefits of the Layer0
        CDN at the same time. Speed up not just your site, but also your development cycles.
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        {frameworkItems.map(({ guide, framework, icon, text }) => {
          const url = EXAMPLES_REPOS[framework]

          return (
            <Grid item xs={12} md={6}>
              <div className={classes.frameworksTableRow}>
                <Icon
                  type={icon}
                  className={classes.icon}
                  style={{ height: 50, width: 50, padding: 0, flex: 'unset' }}
                />
                <Typography
                  className={classes.frameworkText}
                  style={{ marginLeft: theme.spacing(2), marginRight: 'auto' }}
                >
                  {text}
                </Typography>
                <div>
                  {url && (
                    <a
                      style={{ marginRight: theme.spacing(1) }}
                      className={classes.buttonLink}
                      href={`https://app.layer0.co/deploy?repo=${encodeURIComponent(
                        EXAMPLES_REPOS[framework],
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.buttonRow}
                        endIcon={<Launch style={{ fontSize: '1rem' }} />}
                      >
                        Deploy
                      </Button>
                    </a>
                  )}
                  <Link href="/guides/[...guide]" as={guide}>
                    <Button variant="outlined" color="secondary" className={classes.buttonRow}>
                      Guide
                    </Button>
                  </Link>
                </div>
              </div>
            </Grid>
          )
        })}
      </Grid>

      <div className={classes.changeLog}>
        <Divider />
        <h1>{PRODUCT_NAME} Tutorials</h1>
        <Grid container spacing={5}>
          <Grid item>
            <h4>{PRODUCT_NAME} - What & Why</h4>
            <iframe width="100%" height="90%" src="https://www.youtube.com/embed/sJ6AkTrcZvg" />
          </Grid>
          <Grid item>
            <h4>{PRODUCT_NAME} - Deploying GitHub Project</h4>
            <iframe width="100%" height="90%" src="https://www.youtube.com/embed/F8uN03ps1As" />
          </Grid>
          <Grid item>
            <h4>{PRODUCT_NAME} - How to Prefetch</h4>
            <iframe width="100%" height="90%" src="https://www.youtube.com/embed/lfhSDCNgzfs" />
          </Grid>
          <Grid item>
            <h4>
              {PRODUCT_NAME} - What are the {PRODUCT_NAME} DevTools?
            </h4>
            <iframe width="100%" height="90%" src="https://www.youtube.com/embed/4AYQAvkc0UY" />
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

const iconProps = {
  style: { height: 142, width: 142, objectFit: 'contain' },
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
      rel="noreferrer"
    >
      <Button variant="outlined" color="secondary" className={classes.button}>
        Deploy to Layer0
      </Button>
    </a>
  )
}

const useStyles = makeStyles(theme => ({
  hero: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
    },

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& h1, & h2': {
      color: theme.palette.text.secondary,
      fontWeight: 300,
    },
  },

  choiceBox: {
    marginTop: '1.3rem',
  },

  fontNormal: {
    fontWeight: 'normal',
  },

  fontBold: {
    fontWeight: 'bold',
  },

  colorPrimary: {
    color: theme.palette.primary.main,
  },

  grid: {
    display: 'grid',
  },

  placeCenter: {
    placeItems: 'center',
  },

  alignItemsEnd: {
    alignItems: 'end',
  },
  alignItemsBaseline: {
    alignItems: 'baseline',
  },
  alignSelfEnd: {
    alignSelf: 'end',
  },

  headerChoice: {
    color: theme.palette.primary.main,
    fontSize: '1.4rem',
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

  frameworksTable: {
    marginTop: theme.spacing(3),
  },
  frameworksTableRow: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: '100%',
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
    padding: theme.spacing(2, 1),
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
  buttonRow: {
    transition: 'color border-color 200ms linear',
    '&:hover': {
      borderColor: darken(theme.palette.secondary.light, 0.1),
    },
    '& span': {
      textDecoration: 'none',
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
