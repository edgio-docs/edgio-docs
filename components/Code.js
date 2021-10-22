import { FileCopyTwoTone } from '@material-ui/icons'
import React, { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark as prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { IconButton, Snackbar, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import properties from 'react-syntax-highlighter/dist/cjs/languages/prism/properties'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import yml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'
import copyToClipboard from './utils/copyToClipboard'

SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('diff', diff)
SyntaxHighlighter.registerLanguage('html', jsx)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('properties', properties)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('yml', yml)

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.fontSize - 2,
    position: 'relative',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
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
  copyBtn: {
    position: 'absolute',
    cursor: 'pointer',
    right: 4,
    top: 4,
    color: theme.palette.common.white,
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
    },
  },
}))

export default function Code({ value, language = 'javascript' }) {
  const classes = useStyles()
  const [copyResult, setCopyResult] = useState({ open: false })

  const onCopyClick = () => {
    copyToClipboard(value)
      .then(() => {
        setCopyResult({ open: true, message: 'Copied to clipboard' })
      })
      .catch(() => {
        setCopyResult({ open: true, message: 'Could not copy to clipboard' })
      })
  }

  const onClose = () => {
    setCopyResult({ open: false })
  }

  return (
    <div className={classes.root}>
      <IconButton className={classes.copyBtn} onClick={onCopyClick}>
        <FileCopyTwoTone fontSize="small" />
      </IconButton>
      <SyntaxHighlighter language={language} style={prism} keywords={['layer0']}>
        {value}
      </SyntaxHighlighter>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={copyResult.open}
        onClose={onClose}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity="info" onClose={onClose}>
          {copyResult.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
