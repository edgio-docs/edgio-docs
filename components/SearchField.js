import { makeStyles } from '@material-ui/styles'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { ClickAwayListener, InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import SearchResults from './SearchResults'
import useVersioning from './versioning'
import lunr from 'lunr'
import debounce from 'lodash/debounce'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.grey[300],
    '&:hover $notchedOutline': {
      borderColor: theme.palette.grey[100],
      borderWidth: 2,
    },
  },
  notchedOutline: {
    borderColor: theme.palette.grey[300],
  },
}))

export default function SearchField() {
  const classes = useStyles()
  const { currentVersion } = useVersioning()

  useEffect(() => {
    const doEffect = async () => {
      if (window.docsearch) {
        docsearch({
          apiKey: 'ac2f5be6d523eaf51cbf0ec8c629b882',
          indexName: 'docs',
          appId: '86GYGZYT5L',
          inputSelector: '#docsearch',
          algoliaOptions: {
            hitsPerPage: 10,
            // See https://www.algolia.com/doc/api-reference/api-parameters/
          },
          debug: true,
        })
      }
    }
    doEffect()
  }, [currentVersion])

  return (
    <div style={{ minWidth: 300 }}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@latest/dist/cdn/docsearch.min.css"
      />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@latest/dist/cdn/docsearch.min.js"></script>
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        classes={{}}
        InputProps={{
          classes,
          id: 'docsearch',
          startAdornment: (
            <InputAdornment position="start" classes={{ root: classes.icon }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}
