import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { ClickAwayListener, InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useVersioning from './versioning'
import searchConfig from '../docs.config.json'

const { app_id: algoliaAppId, search_api_key: algoliaApiKey, index_name: indexName } = searchConfig

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

  const onSearchLoad = () => {
    if (window.docsearch) {
      docsearch({
        appId: algoliaAppId,
        apiKey: algoliaApiKey,
        indexName,
        inputSelector: '#docsearch',
        algoliaOptions: {
          // See https://www.algolia.com/doc/api-reference/api-parameters/
        },
      })
    }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/docsearch.js@latest/dist/cdn/docsearch.min.js'
    script.async = true
    script.onload = onSearchLoad

    document.body.appendChild(script)
  }, [])

  return (
    <div style={{ minWidth: 300 }}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@latest/dist/cdn/docsearch.min.css"
      />
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
