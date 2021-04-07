import React, { useContext } from 'react'
import MoonIcon from '@material-ui/icons/Brightness4'
import SunIcon from '@material-ui/icons/Brightness7'
import { AppContext } from '@/components'
import { IconButton, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  return {
    icon: {
      fill: theme.palette.brand.contrastText,
    },
  }
})

export default function DarkModeSwitch() {
  const { darkMode, setDarkMode } = useContext(AppContext)
  const Tag = darkMode ? SunIcon : MoonIcon
  const classes = useStyles()
  return (
    <IconButton>
      <Tooltip title="Toggle Dark/Light Mode">
        <Tag onClick={() => setDarkMode(!darkMode)} className={classes.icon} />
      </Tooltip>
    </IconButton>
  )
}
