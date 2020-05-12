import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark as prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { makeStyles } from '@material-ui/core/styles'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import properties from 'react-syntax-highlighter/dist/cjs/languages/prism/properties'
import yml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'

SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('properties', properties)
SyntaxHighlighter.registerLanguage('yml', yml)

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      background: '#1d1f21',
    },
    '& span': {
      textDecoration: 'none',
    },
    '& pre': {
      borderRadius: 3,
      border: `1px solid ${theme.palette.divider}`,
    },
  },
}))

export default function Code({ value, language = 'javascript' }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SyntaxHighlighter language={language} style={prism}>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
