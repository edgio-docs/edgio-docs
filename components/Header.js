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
  lighten,
  darken,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import VersionChooser from './modules/VersionChooser'
import SearchField from './SearchField'
import Logo from './Logo'
import Router from 'next/router'
import clsx from 'clsx'
import HeaderCollapseMenu from './HeaderCollapseMenu'
import { APP_URL, FORUM_URL, STATUS_URL } from '../constants'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.brand.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  container: {
    padding: theme.spacing(0, 3),
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
    fontWeight: 400,
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
  signUpButton: {
    color: grey[200],
    borderColor: theme.palette.primary.light,
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
      <AppBar className={classes.appBar}>
        <div className={classes.container}>
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
            <Hidden smDown implementation="css">
              <Button
                href={`${APP_URL}/signup?redirectTo=/`}
                target="_blank"
                className={classes.signUpButton}
                variant="outlined"
              >
                SIGN UP
              </Button>
            </Hidden>
            <Hidden mdDown implementation="css">
              <Button href={APP_URL} target="_blank" className={classes.button}>
                LOGIN
              </Button>
            </Hidden>
            <Hidden smDown implementation="css">
              <Button href={FORUM_URL} target="_blank" className={classes.button}>
                FORUMS
              </Button>
              <Button href={STATUS_URL} target="_blank" className={classes.button}>
                STATUS
              </Button>
            </Hidden>
            <Hidden mdDown implementation="css">
              <Button href={`${APP_URL}/help`} target="_blank" className={classes.button}>
                SUPPORT
              </Button>
            </Hidden>
            <div style={{ width: 16 }} />
            <Hidden xsDown implementation="css">
              <SearchField />
            </Hidden>
            <Hidden lgUp implementation="css">
              <div style={{ width: 8 }} />
              <HeaderCollapseMenu className={classes.button} />
            </Hidden>
          </Toolbar>
        </div>
      </AppBar>
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
