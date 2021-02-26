import { Button, Divider, Typography, Fab } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { darken, makeStyles } from '@material-ui/core/styles'
import Code from './Code'
import { Link as LinkIcon, PlayCircleOutline } from '@material-ui/icons'
import NextLink from 'next/link'
import useVersioning from './versioning'
import doHighlight from './highlight'
import GithubIcon from './icons/github.svg'
import clsx from 'clsx'
import Toc from './Toc'
import idForHeading from './utils/idForHeading'
import getYTVideoDetails from './utils/getYTVideoDetails'

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
      '&:hover': {
        textDecoration: 'underline',
      },
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
      marginTop: '1em',
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
      fontSize: '14px',
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
    textDecoration: 'none',
  },
  link: {
    color: theme.palette.link,
    fontWeight: 500,
  },
  videoWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  videoOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgb(0,0,0,.65)',
  },
  videoTitle: {
    ...theme.typography.h3,
    color: '#fff',
    textAlign: 'center',
    marginTop: '1em',
    backgroundColor: 'rgb(96,96,96,.45)',
  },
  videoButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  playIcon: {
    marginRight: 10,
  },
}))

export default function Markdown({ source, highlight, toc }) {
  const classes = useStyles()

  function Text({ value }) {
    let html = value

    if (highlight) {
      html = doHighlight(html, highlight)
    }

    return <span dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: '100%' }}>
        <ReactMarkdown
          source={source}
          renderers={{
            code: Code,
            heading: Heading,
            link: Link,
            text: Text,
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

  let el

  const uri = new URL(href, 'http://dummy.org')
  const code = href.match(/github/)
  let button = false

  if (uri.searchParams.has('button')) {
    button = true
    href = href.replace(/(\?|&)button/, '')
    el = (
      <Button
        variant={code ? 'outlined' : 'contained'}
        color="secondary"
        className={classes.button}
      >
        {code && (
          <GithubIcon
            width={20}
            fill="white"
            style={{ marginLeft: -4, marginRight: 8, color: 'white' }}
          />
        )}
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

function Image({ src, ...others }) {
  if (
    String(others.alt)
      .trim()
      .toLowerCase() === 'video'
  ) {
    return Video(src)
  }

  const url = new URL(src, 'https://dummy.org')
  const width = url.searchParams.get('width')
  const height = url.searchParams.get('height')

  const style = {
    width: width && parseInt(width),
    height: height && parseInt(height),
    display: 'block',
  }

  return <img src={src} {...others} style={style} />
}

function Video(videoId) {
  if (!videoId) return null

  const classes = useStyles()
  const [video, setVideo] = useState()

  useEffect(() => {
    const getVideoData = async () => {
      const data = await getYTVideoDetails(videoId)
      setVideo(data)
    }
    getVideoData()
  }, [videoId])

  if (!video || !video.snippet) return null

  return (
    <Link href={video.fullUrl}>
      <div className={classes.videoWrapper}>
        <Image src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
        <div className={classes.videoOverlay}>
          <div className={classes.videoTitle}>{video.snippet.title}</div>
        </div>
        <div className={classes.videoButton}>
          <Fab variant="extended">
            <PlayCircleOutline fontSize="large" className={classes.playIcon} />{' '}
            <span>Watch Video</span>
          </Fab>
        </div>
      </div>
    </Link>
  )
}
