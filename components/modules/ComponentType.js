import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Container } from '@material-ui/core'
import CssClasses from './CssClasses'
import Markdown from '../Markdown'
import ImportBlock from './ImportBlock'
import ModuleTitle from './ModuleTitle'
import Props from './Props'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    boxSizing: 'border-box',
    padding: '15px',

    '& table code, & ul code': {
      color: 'rgba(0, 0, 0, 0.87)',
      display: 'inline-block',
      padding: '3px 6px',
      fontSize: '13px',
      lineHeight: 1.6,
      fontFamily: theme.fonts.code,
    },
    '& ul': {
      lineHeight: 1.6,
      '& code': {
        fontSize: '14px',
        lineHeight: 1.6,
      },
    },
    '& h2': {
      marginTop: '1em',
    },
    '& a code': {
      color: 'inherit',
      textDecoration: 'underline',
    },
  },
  buttonLabel: {
    textTransform: 'none',
  },
  bottom: {
    marginTop: '40px',
  },
  import: {},
}))

export default function ComponentType({ module, classes }) {
  classes = useStyles({ classes })

  return (
    module && (
      <Container className={classes.root}>
        <ModuleTitle>{module.name}</ModuleTitle>
        <a id="import" />
        <ImportBlock module={module} />
        <a id="description" />
        <Markdown source={module.description} />
        <a id="props" />
        <Props props={module.props} />
        <a id="css" />
        <CssClasses cssClasses={module.styles.classes} />
      </Container>
    )
  )
}
