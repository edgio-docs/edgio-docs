import React, { forwardRef } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from 'next/link'
import { MoreVert } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Hidden } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(-2),
  },
  menu: {
    '& a': {
      textDecoration: 'none',
    },
  },
}))

const HideWhenLarge = forwardRef(({ children }, ref) => (
  <Hidden mdUp implementation="css">
    {children}
  </Hidden>
))

export default function HeaderCollapseMenu({ className }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ minWidth: 36, width: 36 }}
        className={className}
      >
        <MoreVert />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={classes.menu}
        onClose={handleClose}
      >
        <HideWhenLarge mdUp implementation="css">
          <MenuItem onClick={handleClose}>
            <Link href="https://moovweb.app/signup?redirectTo=/">
              <a>SIGN UP</a>
            </Link>
          </MenuItem>
        </HideWhenLarge>
        <MenuItem onClick={handleClose}>
          <Link href="https://moovweb.app">
            <a>SIGN IN</a>
          </Link>
        </MenuItem>
        <HideWhenLarge mdUp implementation="css">
          <MenuItem onClick={handleClose}>
            <Link href="https://forum.moovweb.com">
              <a>FORUMS</a>
            </Link>
          </MenuItem>
        </HideWhenLarge>
        <MenuItem onClick={handleClose}>
          <Link href="https://help.moovweb.com">
            <a>SUPPORT</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="https://status.moovweb.com">
            <a>STATUS</a>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  )
}
