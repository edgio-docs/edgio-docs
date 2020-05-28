import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ReactIcon from './react.svg'
import VueIcon from './vue.svg'
import AngularIcon from './angular.svg'
import SpartacusIcon from './spartacus-blue.png'
import NextIcon from './next.svg'
import NuxtIcon from './nuxt.svg'

export const icons = {
  react: ReactIcon,
  vue: VueIcon,
  angular: AngularIcon,
  spartacus: ({ classes, ...others }) => (
    <img className={classes && classes.png} {...others} src={SpartacusIcon} />
  ),
  nextjs: NextIcon,
  nuxt: NuxtIcon,
  prev: ChevronLeft,
  next: ChevronRight,
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

  if (!El) {
    console.log('could not find icon', type)
    return null
  }

  return <El className={classes.root} classes={classes} />
}
