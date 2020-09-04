import { Typography } from '@material-ui/core'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles'
import Code from './Code'
import { Link as LinkIcon } from '@material-ui/icons'
import NextLink from 'next/link'
import useVersioning from './versioning'
import doHighlight from './highlight'

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
        }}
      />
    </div>
  )
}

function Link({ href, children }) {
  const { currentVersion } = useVersioning()

  href = href.replace('__version__', currentVersion)

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
        href={href}
        target={href.startsWith('http:') ? '_blank' : '_self'}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }
}

function Heading({ children, level }) {
  const text = children[0].props.value
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
