import { Divider, Grow, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Router from 'next/router'
import React from 'react'
import useVersioning from './versioning'
import Markdown from './Markdown'
import highlight from './highlight'

const useStyles = makeStyles(theme => ({
  paper: {
    height: 600,
    width: 700,
    overflowY: 'auto',
    position: 'relative',
  },
  heading: {
    margin: theme.spacing(2, 2, 1),
  },
  divider: {
    margin: theme.spacing(0, 2),
  },
  spacer: {
    height: theme.spacing(2),
  },
  empty: {
    color: '#999',
    margin: theme.spacing(2),
  },
  title: {
    width: 175,
    minWidth: 175,
    textAlign: 'right',
    maxWidth: 175,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    minWidth: 40,
    alignSelf: 'flex-start',
  },
  divider: {},
  item: {
    height: 'auto',
    padding: theme.spacing(1.5, 0),
    whiteSpace: 'normal',

    '& .highlight': {
      backgroundColor: '#DD549F',
      borderRadius: '2px',
      color: theme.palette.primary.main,
    },
  },
  match: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '0.8em',
  },
  loadMask: {
    margin: '50%',
  },
}))

export default function SearchResults({ loading, results, query, open, anchorEl }) {
  const classes = useStyles()
  const { createUrl } = useVersioning()
  const guides = [],
    api = []

  const onResultClick = result => {
    Router.push(result.href, createUrl(result))
  }

  for (let result of results) {
    if (result.type === 'guide') {
      guides.push(result)
    } else {
      api.push(result)
    }
  }

  const content = (
    <>
      <Typography variant="h4" className={classes.heading}>
        Results
      </Typography>
      <Divider className={classes.divider} />
      {guides.length === 0 && (
        <Typography variant="body2" className={classes.empty}>
          No results found.
        </Typography>
      )}
      {guides.length === 0 ? null : (
        <Collection collection={guides} onClick={onResultClick} classes={classes} query={query} />
      )}
      {api.length === 0 ? null : (
        <Collection
          heading="API"
          collection={api}
          onClick={onResultClick}
          classes={classes}
          query={query}
        />
      )}
    </>
  )

  return (
    <Popper open={open} anchorEl={anchorEl} transition disablePortal placement="bottom-end">
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'right top' }}>
          <Paper className={classes.paper}>{content}</Paper>
        </Grow>
      )}
    </Popper>
  )
}

SearchResults.defaultProps = {
  results: [],
}

function Collection({ heading, collection, onClick, classes, query }) {
  return (
    <>
      <MenuList>
        {collection.map((result, i) => (
          <MenuItem className={classes.item} key={i} onClick={() => onClick(result)}>
            <Typography
              component="div"
              variant="h6"
              className={classes.title}
              dangerouslySetInnerHTML={{ __html: highlight(result.name, query) }}
            />
            <Typography component="div" variant="subtitle1" className={classes.match}>
              <Markdown source={result.match} highlight={query} />
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </>
  )
}
