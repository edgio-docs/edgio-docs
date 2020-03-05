import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { makeStyles } from '@material-ui/core/styles'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '14px',

    [theme.breakpoints.down('xs')]: {
      margin: '0 -15px',
      background: '#1d1f21',
    },

    '& span': {
      textDecoration: 'none',
    },
  },
}))

export default function Code({ value }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SyntaxHighlighter language="javascript" style={atomDark}>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
