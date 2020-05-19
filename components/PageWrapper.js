import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const styles = theme => ({
  main: {
    paddingTop: 64,
    display: 'flex',
    flexDirection: 'row',
    ...theme.typography.body1,
    '& code': {
      fontFamily: theme.fonts.code,
    },
  },
  center: {
    flex: 1,
    maxWidth: theme.breakpoints.values.lg,
    width: '100%',
    overflow: 'hidden',
    margin: 'auto',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 300,
    },
  },
})

const useStyles = makeStyles(styles)

export default function PageWrapper({ children, nav }) {
  const classes = useStyles()
  return (
    <Container maxWidth="xl" className={classes.main}>
      {nav}
      <div className={classes.center}>{children}</div>
    </Container>
  )
}
