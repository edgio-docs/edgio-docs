import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    color: 'rgba(0, 0, 0, 0.44)',
    textTransform: 'uppercase',
    margin: theme.spacing(3, 0, 2, 0),
  },
}))

export default function SectionTitle({ children }) {
  const classes = useStyles()

  if (!children) {
    return null
  }

  return (
    <Typography variant="body2" className={classes.root}>
      {children}
    </Typography>
  )
}
