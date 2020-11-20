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
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  heading: {
    marginTop: '1em',
    marginBottom: '0.5em',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.main,
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
    '& table': {
      borderSpacing: '0',
      borderCollapse: 'collapse',
      padding: theme.spacing(2, 0),
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
}))

export default function Markdown({ source, highlight }) {
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
        className={clsx({ [classes.buttonLink]: button })}
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
  const id = typeof text === 'string' ? `section_${text.replace(/\W/g, '_').toLowerCase()}` : ''
  const classes = useStyles()

  return (
    <Typography variant={`h${level + 1}`} className={classes.heading}>
      <a id={id} href={`#${id}`}>
        {children}
      </a>
      <LinkIcon style={{ marginLeft: 8, height: 20, width: 20 }} />
    </Typography>
  )
}

function Image({ src, ...others }) {
  const url = new URL(src, 'https://dummy.org')
  const width = url.searchParams.get('width')
  const height = url.searchParams.get('height')

  console.log('src', src, 'others', others)

  const style = {
    width: width && parseInt(width),
    height: height && parseInt(height),
    display: 'block',
  }

  return <img src={src} {...others} style={style} />
}
