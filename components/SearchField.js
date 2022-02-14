import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import searchConfig from '../docs.config.json'

const { app_id: algoliaAppId, search_api_key: algoliaApiKey, index_name: indexName } = searchConfig

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.grey[300],
    '&:hover $notchedOutline': {
      borderColor: theme.palette.grey[100],
      borderWidth: 2,
    },
    '& .algolia-autocomplete': {
      flex: 1,
      width: '98%',
      '& .ds-dropdown-menu > div': {
        height: 300,
      },
    },
  },
  notchedOutline: {
    borderColor: theme.palette.grey[300],
  },
}))

export default function SearchField() {
  const classes = useStyles()

  const onSearchLoad = () => {
    if (window.docsearch) {
      docsearch({
        appId: algoliaAppId,
        apiKey: algoliaApiKey,
        indexName,
        inputSelector: '#docsearch',
        algoliaOptions: {
          hitsPerPage: 60,
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
    <div style={{ maxWidth: 300, flex: 1 }}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@latest/dist/cdn/docsearch.min.css"
      />
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        fullWidth
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
