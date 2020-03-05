import { TreeItem, TreeView } from '@material-ui/lab'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Typography } from '@material-ui/core'
import NextLink from 'next/link'
import Logo from './Logo'
import useVersioning from './versioning'

const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh)',
    overflowY: 'auto',
    position: 'fixed',
    minWidth: 250,
    width: 250,
    padding: theme.spacing(1, 4, 1, 0),
    top: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  section: {
    marginLeft: theme.spacing(2),
  },
  link: {
    margin: theme.spacing(1, 0, 0, 0),
    display: 'block',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  treeNodeSelected: {
    '& span': {
      fontWeight: 'bold',
    },
  },
  sectionTitle: {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    margin: theme.spacing(3, 0, 2, 0),
  },
  treeViewRoot: {
    marginLeft: theme.spacing(2),
    paddingBottom: 80,
  },
  treeRoot: {
    '&:focus $treeContent': {
      backgroundColor: 'inherit',
    },
  },
  treeIcon: {
    width: 16,
  },
  treeGroup: {
    marginLeft: theme.spacing(2),
  },
  treeContent: {
    alignItems: 'flex-end',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  treeIconContainer: {
    width: theme.spacing(2),
    marginLeft: theme.spacing(-2) - 2,
  },
}))

export default function Nav({ navData, tree, aboveAdornments, currentRoute }) {
  const classes = useStyles()
  const { createUrl } = useVersioning()
  const createNodeId = node => (node.as ? `${node.as}-${node.text}` : node.text)
  const expandedNodes = []

  const wrapTree = (children, key) =>
    tree && (
      <TreeView
        key={key}
        defaultExpanded={expandedNodes}
        defaultCollapseIcon={<ExpandMoreIcon className={classes.treeIcon} />}
        defaultExpandIcon={<ChevronRightIcon className={classes.treeIcon} />}
        classes={{ root: classes.treeViewRoot }}
      >
        {children}
      </TreeView>
    )

  const renderLink = (item, contents) => (
    <Link
      as={createUrl(item)}
      href={item.href}
      key={item.as}
      className={clsx(classes.link, item.selected && classes.treeNodeSelected)}
    >
      {contents || item.text}
    </Link>
  )

  const renderLabel = item => (
    <Typography
      component="span"
      className={clsx(classes.link, item.selected && classes.treeNodeSelected)}
    >
      {item.text}
    </Typography>
  )

  const renderItems = section =>
    (section.items || []).map(item => {
      const contents = item.href ? renderLink(item) : renderLabel(item)
      const nodeId = createNodeId(item)
      if (!tree) {
        return contents
      }
      if (item.expanded) {
        expandedNodes.push(nodeId)
      }
      return (
        <TreeItem
          nodeId={nodeId}
          label={contents}
          key={nodeId}
          classes={{
            root: classes.treeRoot,
            group: classes.treeGroup,
            content: classes.treeContent,
            iconContainer: classes.treeIconContainer,
          }}
        >
          {renderItems(item)}
        </TreeItem>
      )
    })

  const maybeMarkExpanded = (section, parent) => {
    if (!section.items || !section.items.length) {
      return false
    }
    section.items.some(item => {
      const hasExpanded = maybeMarkExpanded(item, section)
      if (item.selected) {
        expandedNodes.push(createNodeId(section))
        return true
      }
      return hasExpanded
    })
  }

  navData.forEach(sect => {
    const markSelectedNodes = section => {
      if (section.items && section.items.length) {
        section.items.forEach(item => {
          item.selected = (item.as || '').endsWith(currentRoute)
          markSelectedNodes(item)
        })
        if (section.items.some(item => item.selected || item.expanded)) {
          section.expanded = true
        }
      }
    }
    markSelectedNodes(sect)
  })

  return (
    <nav className={classes.root}>
      <Logo />
      <div style={{ marginTop: 30 }}>{aboveAdornments}</div>
      {navData.map(section => {
        const sectionTitle = <SectionTitle>{section.text}</SectionTitle>
        const contents = (
          <Fragment key={section.text}>
            {section.href ? renderLink(section, sectionTitle) : sectionTitle}
            {renderItems(section)}
          </Fragment>
        )
        return tree ? wrapTree(contents, section.text || 'key') : contents
      })}
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

function Link({ children, className, ...props }) {
  const classes = useStyles()

  return (
    <NextLink {...props}>
      <a className={clsx(className, classes.link)}>
        <Typography component="span">{children}</Typography>
      </a>
    </NextLink>
  )
}

function SectionTitle({ children }) {
  const classes = useStyles()
  if (!children) {
    return null
  }
  return (
    <Typography variant="body2" className={classes.sectionTitle}>
      {children}
    </Typography>
  )
}
