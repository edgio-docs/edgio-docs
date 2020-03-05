import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '1.5rem',
  },
}))

export default function ModuleTitle({ props, className, classes, children }) {
  classes = useStyles({ classes })
  return (
    <Typography {...props} variant="h1" className={clsx(className, classes.root)}>
      <code>{children}</code>
    </Typography>
  )
}
