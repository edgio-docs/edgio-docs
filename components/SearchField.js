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
    '&$focused input': {
      color: theme.palette.grey[100],
    },
    '&$focused $notchedOutline': {
      borderColor: 'blue',
      borderWidth: 2,
    },
  },
  notchedOutline: {
    borderColor: theme.palette.grey[300],
  },
}))

export default function SearchField() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchIndex, setSearchIndex] = useState()
  const [results, setResults] = useState({})
  const { currentVersion } = useVersioning()

  const loadId = useRef(0)

  const onFocus = async evt => {
    evt.target.select()
    setAnchor(evt.target)
    setOpen(!!query.length)
  }

  useEffect(async () => {
    setLoading(true)

    setSearchIndex(
      fetch(`/api/searchIndex?version=${encodeURIComponent(currentVersion)}`)
        .then(res => res.json())
        .then(content => {
          setLoading(false)

          return {
            content,
            index: lunr(function() {
              this.ref('id')
              this.field('name')
              this.field('content')
              this.metadataWhitelist = ['position']
              content.forEach(guide => this.add(guide))
            }),
          }
        }),
    )
  }, [currentVersion])

  const onChangeText = useCallback(
    debounce(async query => {
      setOpen(!!query)
      setQuery(query)

      const { content, index } = await searchIndex
      const search = index.search(`*${query}*`)

      const results = search.slice(0, 10).map(match => {
        const document = content.find(item => item.id === match.ref)
        const metadata = match.matchData.metadata
        const fields = metadata[Object.keys(metadata)[0]]
        const firstMatch = fields[Object.keys(fields)[0]].position[0][0]
        const start = Math.max(0, firstMatch - 10)
        const end = firstMatch + 150
        let text = document.content.slice(start, end)

        if (start > 0) {
          text = `...${text}`
        }

        if (end < document.content.length) {
          text = `${text}...`
        }

        return { ...document, match: text }
      })

      setResults({ count: search.length, results })
    }, 250),
    [searchIndex],
  )

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <ClickAwayListener onClickAway={onClose}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          classes={{}}
          onFocus={onFocus}
          onChange={e => onChangeText(e.target.value)}
          InputProps={{
            classes,
            startAdornment: (
              <InputAdornment position="start" classes={{ root: classes.icon }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </ClickAwayListener>
      <SearchResults
        query={query}
        loading={loading}
        results={results.results}
        anchorEl={anchor}
        open={open}
      />
    </>
  )
}
