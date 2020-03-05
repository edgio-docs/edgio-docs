import { Typography } from '@material-ui/core'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles'
import Code from './Code'
import { Link as LinkIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  heading: {
    marginTop: '1em',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
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
  },
}))

export default function Markdown({ source }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <ReactMarkdown
        source={source}
        renderers={{
          code: Code,
          heading: Heading,
          link: Link,
        }}
      />
    </div>
  )
}

function Link({ href, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('#') || href.startsWith('/') ? '_self' : '_blank'}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

function Heading({ children, level }) {
  const text = children[0].props.value
  const id = typeof text === 'string' ? `section_${text.replace(/\W/g, '_').toLowerCase()}` : ''
  const classes = useStyles()

  return (
    <Typography variant={`h${level + 1}`} className={classes.heading}>
      <a href={`#${id}`}>{children}</a>
      <LinkIcon style={{ marginLeft: 8, height: 20, width: 20 }} />
    </Typography>
  )
}
