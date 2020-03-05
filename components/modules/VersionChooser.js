import { FormControl, MenuItem, Select } from '@material-ui/core'
import Router, { useRouter } from 'next/router'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useVersioning from '../versioning'

const useStyles = makeStyles(theme => ({
  control: {
    width: '100%',
    marginLeft: theme.spacing(2),
    '& > div': {
      borderRadius: 3,
      backgroundColor: 'transparent',
    },
  },
  selectRoot: {
    border: 0,
    padding: theme.spacing(2, 4, 2, 2),
    fontSize: '1.25em',
    color: '#666',
  },
}))

export default function VersionChooser() {
  const classes = useStyles()
  const { route } = useRouter()
  const { currentVersion, setCurrentVersion, versions, createUrl } = useVersioning()

  const onChange = event => {
    let version = event.target.value
    setCurrentVersion(version)
    Router.push(route, createUrl({ version }))
  }

  return (
    <FormControl variant="filled" className={classes.control} size="small">
      <Select
        value={currentVersion}
        onChange={onChange}
        disableUnderline
        autoWidth
        classes={{
          root: classes.selectRoot,
        }}
      >
        {versions.map(version => (
          <MenuItem value={version} key={version}>
            {version}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
