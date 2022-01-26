import { Button, Divider, Typography } from '@material-ui/core'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { darken, makeStyles } from '@material-ui/core/styles'
import Code from './Code'
import { Link as LinkIcon } from '@material-ui/icons'
import NextLink from 'next/link'
import useVersioning from './versioning'
import doHighlight from './highlight'
import GithubIcon from './icons/github.svg'
import Layer0Icon from './icons/layer0-logo.svg'
import clsx from 'clsx'
import Toc from './Toc'
import idForHeading from './utils/idForHeading'
import getYTVideoDetails from './utils/getYTVideoDetails'

const components = {
  'jamstack/Frameworks': require('./jamstack/Frameworks').default,
}

const useStyles = makeStyles(theme => ({
  heading: {
    display: 'block',
    fontWeight: '500',
    'h1& + p': {
      ...theme.typography.body2,
    },
    '&::before': {
      height: 85,
      marginTop: -85,
      display: 'block',
      content: '""',
      position: 'static',
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    '& svg': {
      display: 'none',
    },
    '&:hover svg': {
      display: 'block',
    },
  },
  root: {
    display: 'flex',
    '& table': {
      borderSpacing: '0',
      borderCollapse: 'collapse',
      padding: theme.spacing(2, 0),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    '& td,th': {
      padding: '10px',
      border: `1px solid ${theme.palette.divider}`,
    },
    '& th': {
      background: theme.palette.divider,
    },
    '& code': {
      backgroundColor: '#f0f0f0',
      padding: '3px 5px',
      borderRadius: '3px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
    },
    '& pre code, & h1 code': {
      backgroundColor: 'initial',
      padding: 'initial',
      borderRadius: 'initial',
      fontSize: '12px',
    },
    '& li': {
      lineHeight: '1.5rem',
    },
    '& strong': {
      color: '#000',
      fontWeight: 500,
    },
    '& img': {
      maxWidth: 'calc(100% - 10px)',
      boxShadow: theme.shadows[7],
    },
    [theme.breakpoints.down('md')]: {
      '& img': {
        maxWidth: '100%',
        boxShadow: 'none',
      },
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
  },
  buttonLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  link: {
    color: theme.palette.link,
  },
}))

function Text({ value, highlight }) {
  let html = value

  if (highlight) {
    html = doHighlight(html, highlight)
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

function StyledText({ children, config }) {
  return (
    <span style={config}>
      <Text value={children}></Text>
    </span>
  )
}

export default function Markdown({ source, highlight, toc }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: '100%' }}>
        <ReactMarkdown
          source={source}
          renderers={{
            code: Code,
            heading: Heading,
            link: Link,
            text: ({ value }) => Text({ value, highlight }),
            image: Image,
            thematicBreak: Divider,
          }}
        />
      </div>
      {toc && <Toc source={source} />}
    </div>
  )
}

function Link({ href, children }) {
  const { currentVersion } = useVersioning()
  const classes = useStyles()
  href = href.replace('__version__', currentVersion)

  let el,
    Icon = <></>,
    style = 'contained',
    button = false

  const uri = new URL(href, 'http://dummy.org')
  const isGitHubLink = href.match(/github/)
  const isLayer0DeployLink = uri.searchParams.has('deploy')
  const isReactComponent = href.startsWith('/react/')

  if (isReactComponent) {
    const modulePath = href.replace(/^\/react\//, '')
    const Component = components[modulePath]
    return <Component />
  }

  if (isGitHubLink) {
    Icon = (
      <GithubIcon
        width={20}
        fill="white"
        style={{ marginLeft: -4, marginRight: 8, color: 'white' }}
      />
    )
    style = 'outlined'
  }

  if (isLayer0DeployLink) {
    Icon = <Layer0Icon width={25} style={{ marginLeft: -4, marginRight: 8 }} />
    style = 'outlined'
  }

  if (uri.searchParams.has('button')) {
    // clean up params used for markdown formatting and set a clean href
    const params = new URLSearchParams(uri.searchParams)
    params.delete('button')
    params.delete('deploy')
    params.forEach((value, key) => params.set(key, decodeURIComponent(value)))
    uri.search = params.toString()
    href = uri.href
    button = true

    el = (
      <Button variant={style} color="secondary" className={classes.button}>
        {Icon}
        {children}
      </Button>
    )
  } else {
    el = children
  }

  if (href.match(/\/guides\//)) {
    return (
      <NextLink href="/guides/[...guide]" as={href}>
        <a target={href.startsWith('http:') ? '_blank' : '_self'} rel="noopener noreferrer">
          {children}
        </a>
      </NextLink>
    )
  } else {
    return (
      <a
        className={clsx({ [classes.link]: !button, [classes.buttonLink]: button })}
        href={href}
        target={href.startsWith('https:') ? '_blank' : '_self'}
        rel="noopener noreferrer"
      >
        {el}
      </a>
    )
  }
}

function Heading({ children, level }) {
  const firstChild = children[0]
  const text = firstChild && firstChild.props.value
  const id = idForHeading(text)
  const classes = useStyles()

  return (
    <Typography id={id} variant={`h${level}`} className={classes.heading}>
      <div>
        <a href={`#${id}`}>{children}</a>
        <LinkIcon style={{ marginLeft: 8, height: 20, width: 20 }} />
      </div>
    </Typography>
  )
}

/**
 *  We use MD image syntax for:
 * - images => ![alt](/url/to/image.jpg 'Title')
 * - video => ![video](/url/to/video)
 * - styled text with JSON config => ![{"color": "red"}](/ 'Text to color') // url is required but not used
 */

function Image({ src, ...others }) {
  // styled text (no image)
  try {
    const colorConfig = JSON.parse(others.alt)
    return <StyledText config={colorConfig}>{others.title}</StyledText>
  } catch (e) {}

  // serve a video based on `alt` value of markdown image syntax
  if (
    String(others.alt)
      .trim()
      .toLowerCase() === 'video'
  ) {
    return Video(src)
  }

  const dummyOrigin = 'https://dummy.org'
  const url = new URL(src, dummyOrigin)
  const width = url.searchParams.get('width')
  const height = url.searchParams.get('height')
  url.searchParams.append('_cb', process.env.__BUILD_ID__)

  // relative src was passed in
  if (url.origin === dummyOrigin) {
    src = `${url.pathname}${url.search}`
  } else {
    src = url.toString()
  }

  const style = {
    width: width && parseInt(width),
    height: height && parseInt(height),
    display: 'block',
  }

  return <img src={src} {...others} style={style} />
}

function Video(videoId) {
  if (!videoId) return null

  // retained for future use of YT API
  // const classes = useStyles()
  // const [video, setVideo] = useState()

  // useEffect(() => {
  //   const getVideoData = async () => {
  //     const data = await getYTVideoDetails(videoId)
  //     setVideo(data)
  //   }
  //   getVideoData()
  // }, [videoId])

  // if (!video || !video.snippet) return null

  const video = getYTVideoDetails(videoId)

  return (
    <iframe
      width={516}
      height={315}
      src={video.embedUrl}
      frameBorder={0}
      allow="picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}
