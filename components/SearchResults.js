import {
  CircularProgress,
  Divider,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Router from 'next/router'
import React from 'react'
import useVersioning from './versioning'

const useStyles = makeStyles(theme => ({
  paper: {
    height: '500px',
    width: '500px',
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
    fontWeight: 500,
  },
  item: {
    display: 'block',
    height: 'auto',

    '& .highlight': {
      backgroundColor: '#DD549F',
      borderRadius: '2px',
      color: theme.palette.primary.main,
    },
  },
  match: {
    color: '#666',
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
      {loading && <CircularProgress className={classes.loadMask} />}
      {results.count === 0 && (
        <Typography variant="body2" className={classes.empty}>
          No results found.
        </Typography>
      )}
      {guides.length === 0 ? null : (
        <Collection
          heading="Guides"
          collection={guides}
          onClick={onResultClick}
          classes={classes}
          query={query}
        />
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
  const highlight = text => {
    return text.replace(new RegExp(query, 'gi'), match => `<span class="highlight">${match}</span>`)
  }

  return (
    <>
      <Typography variant="h4" className={classes.heading}>
        {heading}
      </Typography>
      <Divider className={classes.divider} />
      <MenuList>
        {collection.map((result, i) => (
          <MenuItem className={classes.item} key={i} onClick={() => onClick(result)}>
            <Typography
              component="div"
              variant="body2"
              className={classes.title}
              dangerouslySetInnerHTML={{ __html: highlight(result.name) }}
            />
            <Typography
              component="div"
              variant="caption"
              className={classes.match}
              dangerouslySetInnerHTML={{ __html: highlight(result.match) }}
            />
          </MenuItem>
        ))}
      </MenuList>
    </>
  )
}
