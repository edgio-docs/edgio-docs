import React, { useState, useEffect } from 'react'
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
import GitHubButton from './GitHubButton'
import Logo from './Logo'
import Router from 'next/router'
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  progress: {
    bottom: 0,
    height: 2,
    left:0,
    right: 0
  },
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
}))

export default function Header() {
  const trigger = useScrollTrigger()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true))
    Router.events.on('routeChangeComplete', () => setLoading(false))
  }, [])

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={classes.appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className={classes.toolbar}>
            <Hidden xsUp implementation="css">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <div style={{ display: 'flex' }}>
              <Link href="/" as="/">
                <a href="/" className={classes.link}>
                  <Logo />
                </a>
              </Link>
              <VersionChooser />
            </div>
            <div style={{ flex: 1 }} />
            <Hidden xsDown implementation="css">
              <SearchField />
            </Hidden>
            <div style={{ width: 10 }} />
            <GitHubButton />
          </Toolbar>
        </Container>
        <LinearProgress className={classes.progress} style={{ display: loading ? 'block' : 'none' }}/>
      </AppBar>
    </Slide>
  )
}
