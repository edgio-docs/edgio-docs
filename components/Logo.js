import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  logo: {
    background: 'url(/xdn.png) left center no-repeat',
    height: 48,
    marginBottom: -4,
    marginLeft: -5,
    width: 250,
    backgroundSize: 250
  },
}))

export default ({ style }) => {
  const classes = useStyles()
  return <div className={classes.logo} style={style} />
}
