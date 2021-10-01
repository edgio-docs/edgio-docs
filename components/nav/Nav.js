import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { MenuContext } from '../MenuProvider'
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import Link from 'next/link'
import Icon from '../icons/Icon'
import { useRouter } from 'next/router'
import { Prefetch } from '@layer0/react'
import useVersioning from '../versioning'
import { first } from 'lodash'

export const NAV_WIDTH = 240

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    paddingTop: 74,
    width: NAV_WIDTH,
    position: 'fixed',
    left: 24,
    top: 0,
    overflowY: 'auto',
    borderRight: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0, 0, 0, -3),
    // background: theme.palette.grey[100],

    [theme.breakpoints.down('md')]: {
      transition: 'transform .1s ease-out',
      position: 'fixed',
      paddingTop: 0,
      left: 0,
      bottom: 0,
      top: 65,
      overflowY: 'auto',
      height: 'calc(100% - 65px)',
      transform: `translateX(-${NAV_WIDTH}px)`,
      background: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer,
      borderRight: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(0),
      boxShadow: theme.shadows[5],
    },

    [theme.breakpoints.down('xs')]: {
      top: 57,
      height: 'calc(100% - 57px)',
      width: '100%',
      transform: `translateX(-100%)`,
    },
  },
  navBody: {
    padding: theme.spacing(0, 4, 1, 4),
  },
  open: {
    transform: 'translateX(1px)',
  },
  header: {
    backgroundColor: '#242349',
    padding: '7px 24px 3px',

    [theme.breakpoints.down('xs')]: {
      padding: '2px 24px 0 24px',
    },
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
    color: theme.palette.grey[200],
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  menuCollapseButton: {
    textTransform: 'upperCase',
  },
  selected: {
    '&.Mui-selected': {
      background: 'initial',
      '& span': {
        fontWeight: 500,
      },
    },
  },
  selectedMenuItem: {
    opacity: 1,
    borderLeft: `3px solid ${theme.palette.secondary.main}`,
    marginLeft: 3,
    '& a': {
      fontWeight: 'bold',
      color: theme.palette.secondary.main,
      '& div span': {
        marginLeft: -6,
      },
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}))

export default function Nav({ navData }) {
  const { open: menuOpen } = useContext(MenuContext)
  const { asPath } = useRouter()
  const { createUrl } = useVersioning()
  const [collapseOpen, setCollapseOpen] = useState(first(navData)?.text)
  const classes = useStyles()

  useEffect(() => {
    navData.map(section => {
      const findSection = section.items.find(si => asPath.startsWith(si.as))
      if (findSection) {
        setCollapseOpen(section.text)
      }
    })
  }, [asPath])

  function isCollapseActive(sectionText) {
    return collapseOpen === sectionText
  }

  function isPathSelected(selectedPath) {
    return asPath === selectedPath
  }

  return (
    <List
      component="nav"
      aria-labelledby="main-navigation"
      dense
      className={clsx({
        [classes.root]: true,
        [classes.open]: menuOpen,
      })}
    >
      {navData.map((section, i) => {
        const collapseActive = isCollapseActive(section.text)
        return (
          <React.Fragment key={section.text}>
            <ListItem
              button
              onClick={() => setCollapseOpen(collapseActive ? '' : section.text)}
              className={clsx({
                [classes.menuCollapseButton]: true,
                [classes.selected]: collapseActive,
              })}
              selected={collapseActive}
            >
              <ListItemText primary={section.text} />
              {collapseOpen === section.text ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={collapseActive}>
              <List component="div" disablePadding dense>
                {section.items.map(({ icon, text, as = '', href = '', external }) => {
                  const url = createUrl({ text, as, href })

                  const LinkItem = (
                    <div
                      className={clsx({
                        [classes.selectedMenuItem]: isPathSelected(as),
                      })}
                    >
                      <ListItem
                        button
                        component="a"
                        target={external && '_blank'}
                        selected={isPathSelected(as)}
                        className={clsx({
                          [classes.nested]: true,
                          [classes.selected]: isPathSelected(as),
                        })}
                      >
                        {icon && <Icon type={icon} classes={{ root: classes.icon }} />}
                        {external && (
                          <OpenInNewIcon fontSize="small" classes={{ root: classes.icon }} />
                        )}
                        <ListItemText primary={text} />
                      </ListItem>
                    </div>
                  )

                  return (
                    <Link as={url} href={href} passHref key={as}>
                      {external ? LinkItem : <Prefetch url={url}>{LinkItem}</Prefetch>}
                    </Link>
                  )
                })}
              </List>
            </Collapse>
          </React.Fragment>
        )
      })}
    </List>
  )
}

const navItemPropType = {
  text: PropTypes.string,
  as: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string,
  external: PropTypes.bool,
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
