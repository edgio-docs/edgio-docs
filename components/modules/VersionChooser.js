import { FormControl, MenuItem, Select } from '@material-ui/core'
import Router, { useRouter } from 'next/router'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useVersioning from '../versioning'

const useStyles = makeStyles(theme => ({
  control: {
    '& > div': {
      borderRadius: 3,
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(-1.5),
    },
  },
  selectMenu: {
    textOverflow: 'clip',
  },
  selectRoot: {
    border: 0,
    padding: theme.spacing(2, 4, 2, 2),
    fontSize: '1.25em',
    color: '#666',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
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
          selectMenu: classes.selectMenu,
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
