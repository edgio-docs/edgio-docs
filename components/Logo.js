import { makeStyles } from '@material-ui/core'
import Layer0 from './icons/logo-dark-full.svg'

const useStyles = makeStyles(theme => ({
  logo: {
    height: 48,
    marginBottom: -9,
    marginLeft: -7,
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
