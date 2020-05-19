import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ReactIcon from './react.svg'
import VueIcon from './vue.svg'
import AngularIcon from './angular.svg'

const icons = {
  react: ReactIcon,
  vue: VueIcon,
  angular: AngularIcon,
  prev: ChevronLeft,
  next: ChevronRight,
}

export const styles = theme => ({
  root: {
    height: 20,
    width: 20,
  },
})

const useStyles = makeStyles(styles, { name: 'RSFIcon' })

export default function Icon({ classes, type }) {
  classes = useStyles({ classes })
  const El = icons[type]
  return <El className={classes.root} />
}
