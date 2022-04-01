import { Grid, makeStyles, Typography, darken, useTheme, Paper } from '@material-ui/core'
import Link from 'next/link'
import { EXAMPLES_REPOS } from '../../constants'
import Icon from '../icons/Icon'

const useStyles = makeStyles(theme => ({
  paper: {
    boxShadow: theme.shadows[0],
    '&:hover': {
      boxShadow: theme.shadows[10],
    },
  },

  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },

  frameworksTable: {
    marginTop: theme.spacing(3),
  },

  frameworksTableRow: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'nowrap',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  frameworks: {
    marginTop: theme.spacing(5),
    display: 'grid',
    gridGap: '1.2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  },

  frameworkItem: {
    border: `1px solid ${theme.palette.divider}`,
    '& a:hover': {
      textDecoration: 'none',
    },
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
    textAlign: 'left',
  },

  icon: {
    flex: 1,
    padding: theme.spacing(2, 1),
  },

  logo: {
    margin: theme.spacing(0, 0, 4, -7),
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

export default function Frameworks() {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Grid container spacing={2} alignItems="stretch">
      {frameworkItems.map(({ guide, framework, icon, text }) => {
        const url = EXAMPLES_REPOS[framework]

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={framework}>
            <Link href="/guides/[...guide]" as={guide}>
              <a href={guide} style={{ color: 'inherit' }} className={classes.link}>
                <Paper className={classes.paper}>
                  <div className={classes.frameworksTableRow}>
                    <Icon
                      type={icon}
                      className={classes.icon}
                      style={{ height: 50, width: 50, padding: 0, flex: 'unset' }}
                    />
                    <Typography style={{ marginLeft: theme.spacing(2), marginRight: 'auto' }}>
                      {text}
                    </Typography>
                  </div>
                </Paper>
              </a>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
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
    guide: '/guides/webapp_cdn_getting_started',
    framework: 'cdn',
    icon: 'layer0',
    text: 'Edge Network',
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
    guide: '/guides/remix',
    framework: 'remix',
    icon: 'remix',
    text: 'Remix',
  },
  {
    guide: '/guides/gatsby',
    framework: 'gatsby',
    icon: 'gatsby',
    text: 'Gatsby',
  },
  {
    guide: '/guides/react',
    framework: 'static-react',
    icon: 'react',
    text: 'React',
  },
  {
    guide: '/guides/redwoodjs',
    framework: 'redwood',
    icon: 'redwood',
    text: 'RedwoodJS',
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
    guide: '/guides/solid',
    framework: 'solid',
    icon: 'solid',
    text: 'SolidJS',
  },
  {
    guide: '/guides/umijs',
    framework: 'umijs',
    icon: 'umijs',
    text: 'UmiJS',
  },
  {
    guide: '/guides/ionic_react',
    framework: 'ionic_react',
    icon: 'ionic_react',
    text: 'Ionic React',
  },
  {
    guide: '/guides/ionic_vue',
    framework: 'ionic_vue',
    icon: 'ionic_vue',
    text: 'Ionic Vue',
  },
  {
    guide: '/guides/gridsome',
    framework: 'gridsome',
    icon: 'gridsome',
    text: 'Gridsome',
  },
  {
    guide: '/guides/preact',
    framework: 'preact',
    icon: 'preact',
    text: 'Preact',
  },
  {
    guide: '/guides/ember',
    framework: 'ember',
    icon: 'ember',
    text: 'Ember.js',
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
    guide: '/guides/express',
    framework: 'express',
    icon: 'express',
    text: 'Express',
  },
  {
    guide: '/guides/frontity',
    framework: 'frontity',
    icon: 'frontity',
    text: 'Frontity',
  },
  {
    guide: '/guides/ember_fastboot',
    framework: 'fastboot',
    icon: 'fastboot',
    text: 'Ember Fastboot',
  },
  {
    guide: '/guides/next_commerce',
    framework: 'nextcommerce',
    icon: 'next-commerce',
    text: 'Next.js Commerce',
  },
  {
    guide: '/guides/razzle',
    framework: 'razzle',
    icon: 'razzle',
    text: 'Razzle',
  },
  {
    guide: '/guides/shopify_hydrogen',
    framework: 'shopify_hydrogen',
    icon: 'shopify_hydrogen',
    text: 'Shopify Hydrogen',
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
    guide: '/guides/static_sites',
    framework: '',
    icon: 'html',
    text: 'Static HTML/JavaScript',
  },
  {
    guide: '/guides/stencil',
    framework: 'stencil',
    icon: 'stencil',
    text: 'Stencil',
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
  {
    guide: '/guides/docusaurus',
    framework: 'docusaurus',
    icon: 'docusaurus',
    text: 'Docusaurus',
  },
  {
    guide: '/guides/hexo',
    framework: 'hexo',
    icon: 'hexo',
    text: 'Hexo',
  },
  {
    guide: '/guides/hugo',
    framework: 'hugo',
    icon: 'hugo',
    text: 'Hugo',
  },
  {
    guide: '/guides/vuepress',
    framework: 'vuepress',
    icon: 'vue',
    text: 'VuePress',
  },
  {
    guide: '/guides/vitepress',
    framework: 'vitepress',
    icon: 'vue',
    text: 'VitePress',
  },
  {
    guide: '/guides/react_static',
    framework: 'react_static',
    icon: 'react_static',
    text: 'React Static',
  },
  {
    guide: '/guides/saber',
    framework: 'saber',
    icon: 'saber',
    text: 'Saber',
  },
  {
    guide: '/guides/eleventy',
    framework: 'eleventy',
    icon: 'eleventy',
    text: 'Eleventy',
  },
  {
    guide: '/guides/brunch',
    framework: 'brunch',
    icon: 'brunch',
    text: 'Brunch',
  },
  {
    guide: '/guides/zola',
    framework: 'zola',
    icon: 'zola',
    text: 'Zola',
  },
  {
    guide: '/guides/dojo',
    framework: 'dojo',
    icon: 'dojo',
    text: 'Dojo',
  },
]
