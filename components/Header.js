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
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import VersionChooser from './modules/VersionChooser'
import SearchField from './SearchField'
import Logo from './Logo'
import Router from 'next/router'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#242349',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  progress: {
    top: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    zIndex: 9999,
    backgroundColor: 'transparent',
    height: 2,
  },
  barColorPrimary: {
    backgroundColor: '#DD549F',
  },
  root: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'center',
  },
  button: {
    color: theme.palette.grey[200],
    width: 90,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
  menuButton: {
    width: 'initial',
  },
  title: {
    flexGrow: 1,
  },
  home: {
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(1),
    },
  },
  link: {
    color: 'white',
    marginRight: theme.spacing(2),
    fontWeight: 'normal',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
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
  const { setOpen, open } = useContext(MenuContext)

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true))
    Router.events.on('routeChangeComplete', () => setLoading(false))
  }, [])

  const handleMenuClick = useCallback(() => {
    setOpen(open => !open)
  }, [setOpen])

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger || open}>
        <AppBar className={classes.appBar}>
          <Container maxWidth="xl" className={classes.container}>
            <Toolbar disableGutters className={classes.toolbar}>
              <Hidden lgUp implementation="css">
                <IconButton
                  edge="start"
                  className={clsx(classes.button, classes.menuButton)}
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuClick}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Link href="/" as="/">
                <a href="/" className={classes.home}>
                  <Logo style={{ marginRight: 12 }} />
                </a>
              </Link>
              <div style={{ flex: 1 }} className={classes.xsDown} />
              <VersionChooser />
              <div style={{ flex: 1 }} className={classes.smUp} />
              <Button href="https://forum.moovweb.com" target="_blank" className={classes.button}>
                FORUMS
              </Button>
              <Button href="https://status.moovweb.com" target="_blank" className={classes.button}>
                STATUS
              </Button>
              <Button href="https://help.moovweb.com" target="_blank" className={classes.button}>
                SUPPORT
              </Button>
              <div style={{ width: 16 }} />
              <Hidden xsDown implementation="css">
                <SearchField />
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      <LinearProgress
        classes={{
          root: classes.progress,
          barColorPrimary: classes.barColorPrimary,
        }}
        style={{ display: loading ? 'block' : 'none' }}
      />
    </>
  )
}
