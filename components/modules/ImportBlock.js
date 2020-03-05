import { makeStyles } from '@material-ui/core'
import React from 'react'
import Code from '../Code'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '1.5rem',
  },
}))

export default function ImportBlock({ module, classes }) {
  classes = useStyles({ classes })
  return module.import ? <Code classes={{ root: classes.root }} value={module.import} /> : null
}
