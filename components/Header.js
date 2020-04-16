import React, { useContext, useState, useEffect, useCallback } from 'react'
import { MenuContext } from './MenuProvider'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide,
  Hidden,
  LinearProgress,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import VersionChooser from './modules/VersionChooser'
import SearchField from './SearchField'
import Logo from './Logo'
import Router from 'next/router'
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('lg')]: {
      left: 299,
      width: 'calc(100% - 300px)',
      paddingLeft: 0,
    },
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  progress: {
    bottom: 0,
    height: 2,
    left: 0,
    right: 0,
  },
  root: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
  smUp: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  xsDown: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}))

export default function Header() {
  const trigger = useScrollTrigger()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { setOpen } = useContext(MenuContext)

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true))
    Router.events.on('routeChangeComplete', () => setLoading(false))
  }, [])

  const handleMenuClick = useCallback(() => {
    setOpen(open => !open)
  }, [setOpen])

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.appBar}>
        <Container maxWidth="xl" className={classes.container}>
          <Toolbar disableGutters className={classes.toolbar}>
            <Hidden lgUp implementation="css">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden lgUp implementation="css">
              <Link href="/" as="/">
                <a href="/" className={classes.link}>
                  <Logo style={{ marginRight: 12 }} />
                </a>
              </Link>
            </Hidden>
            <div style={{ flex: 1 }} className={classes.xsDown} />
            <VersionChooser />
            <div style={{ flex: 1 }} className={classes.smUp} />
            <Hidden xsDown implementation="css">
              <SearchField />
            </Hidden>
          </Toolbar>
        </Container>
        <LinearProgress
          className={classes.progress}
          style={{ display: loading ? 'block' : 'none' }}
        />
      </AppBar>
    </Slide>
  )
}
