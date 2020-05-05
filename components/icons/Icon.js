import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ReactIcon from './react.svg'
import VueIcon from './vue.svg'
import AngularIcon from './angular.svg'
import SpartacusIcon from './spartacus.png'

const icons = {
  react: ReactIcon,
  vue: VueIcon,
  angular: AngularIcon,
  spartacus: ({ classes }) => <img className={classes.png} src={SpartacusIcon} />,
}

export const styles = theme => ({
  root: {
    height: 20,
    width: 20,
  },
  png: {
    marginRight: 4,
    height: 20,
    width: 20,
  },
})

const useStyles = makeStyles(styles, { name: 'RSFIcon' })

export default function Icon({ classes, type }) {
  classes = useStyles({ classes })
  const El = icons[type]
  return <El className={classes.root} classes={classes} />
}
