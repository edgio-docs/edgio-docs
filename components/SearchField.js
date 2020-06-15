import { makeStyles } from '@material-ui/styles'
import React, { useRef, useState } from 'react'
import { ClickAwayListener, InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import SearchResults from './SearchResults'
import useVersioning from './versioning'

const useStyles = makeStyles(theme => ({}))

export default function SearchField() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState({})
  const { currentVersion } = useVersioning()
  const loadId = useRef(0)

  const onFocus = async evt => {
    evt.target.select()
    setAnchor(evt.target)
    setOpen(!!query.length)
  }

  const onChangeText = async evt => {
    const currentLoad = loadId.current + 1
    loadId.current = currentLoad
    const newQuery = evt.target.value

    setLoading(true)
    setOpen(!!newQuery)
    setQuery(newQuery)

    const results = newQuery
      ? await fetch(`/api/search?query=${newQuery}&version=${currentVersion}`).then(res => res.json())
      : { results: [] }

    if (currentLoad === loadId.current) {
      setResults(results)
      setLoading(false)
    }
  }

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
          onChange={onChangeText}
          InputProps={{
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
