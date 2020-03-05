import React from 'react'
import { Star } from 'react-github-buttons'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& a': {
      fontFamily: 'sans-serif',
    },
  },
}))

export default function GitHubButton() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Star owner="react-storefront-community" repo="react-storefront">
        Star
      </Star>
    </div>
  )
}
