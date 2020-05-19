import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton, Hidden } from '@material-ui/core'
import { MenuContext } from '../MenuProvider'
import MoovwebXDN from '../icons/MoovwebXDN.svg'
import Section from './Section'
import Link from 'next/link'

const width = 275

const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh)',
    overflowY: 'auto',
    position: 'fixed',
    minWidth: width,
    width,
    padding: theme.spacing(1, 4, 1, 0),
    top: 0,
    borderRight: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.down('md')]: {
      transition: 'transform .1s ease-out',
      position: 'fixed',
      left: 0,
      bottom: 0,
      height: '100%',
      transform: `translateX(-${width}px)`,
      padding: theme.spacing(1, 2, 2, 2),
      background: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer,
      borderRight: `1px solid ${theme.palette.divider}`,
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      transform: `translateX(-100%)`,
    },
  },
  open: {
    transform: 'translateX(1px)',
  },
  logo: {
    width: 180,
    height: 48,
    [theme.breakpoints.up('lg')]: {
      width: '95%',
    },
  },
  section: {
    marginLeft: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(-1.5),
  },
}))

export default function Nav({ navData }) {
  const { open, setOpen } = useContext(MenuContext)
  const classes = useStyles()

  return (
    <nav
      className={clsx({
        [classes.root]: true,
        [classes.open]: open,
      })}
    >
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Link href="/">
          <a>
            <MoovwebXDN className={classes.logo} />
          </a>
        </Link>
        <Hidden lgUp implementation="css">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Hidden>
      </div>
      {navData.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </nav>
  )
}

const navItemPropType = {
  text: PropTypes.string,
  as: PropTypes.string,
  href: PropTypes.string,
}

Nav.propTypes = {
  backButton: PropTypes.bool,
  navData: PropTypes.arrayOf(
    PropTypes.shape({
      ...navItemPropType,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          ...navItemPropType,
          items: PropTypes.arrayOf(PropTypes.shape({ ...navItemPropType })),
        }),
      ),
    }),
  ),
  aboveAdornments: PropTypes.node,
}

Nav.defaultProps = {
  navData: [],
}
