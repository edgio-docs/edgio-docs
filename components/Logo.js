import { makeStyles } from '@material-ui/core'
import React from 'react'
import Layer0 from './icons/moovweb-xdn-white.svg'

const useStyles = makeStyles(theme => ({
  logo: {
    height: 48,
    marginBottom: -4,
    width: 220,
    backgroundSize: 250,
    [theme.breakpoints.down('xs')]: {
      width: 150,
    },
  },
}))

const Logo = ({ style }) => {
  const classes = useStyles()
  return <Layer0 className={classes.logo} style={style} />
}

export default Logo
