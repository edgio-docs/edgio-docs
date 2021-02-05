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
    padding: theme.spacing(0, 4, 0, 8),
    overflow: 'hidden',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
    },
  },
})

const useStyles = makeStyles(styles)

export default function PageWrapper({ children, nav, centerStyle }) {
  const classes = useStyles()
  return (
    <Container maxWidth="xl" className={classes.main}>
      {nav}
      <div className={classes.center} style={centerStyle}>
        {children}
      </div>
    </Container>
  )
}
