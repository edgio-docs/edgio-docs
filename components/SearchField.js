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

  useEffect(() => {
    const doEffect = async () => {
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
    }
    doEffect()
  }, [currentVersion])

  const onChangeText = useCallback(
    debounce(async query => {
      setOpen(!!query)
      setQuery(query)

      const { content, index } = await searchIndex
      const search = index.search(`*${query}*`)

    }, 250),
    [searchIndex],
  )

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div style={{minWidth: 300}}>
      <script async src="https://cse.google.com/cse.js?cx=fae95cbf58a8f51b0"></script>
      <div className="gcse-search"></div>
    </div>
  )
}
