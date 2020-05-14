import { Divider, Grid, makeStyles } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";
import clsx from "clsx";
import React from 'react'
import Link from './nav/Link'

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(4)
  },
  buttonGrid: {
    margin: theme.spacing(2, 0, 3, 0),
  },
  link: {
    borderRadius: 4,
    color: 'blue',
    '&:hover': {
      background: theme.palette.grey[100]
    }
  },
  prevLink: {
    padding: theme.spacing(1, 2, 1, 1),
  },
  nextLink: {
    padding: theme.spacing(1, 1, 1, 2),
    flexDirection: 'row-reverse'
  }
}))

const GUIDES_REGEX = /\/guides\//

export default function Footer({ guide, navData }) {
  const classes = useStyles()
  const orderedGuides = navData[0].items
  const guideIdx = orderedGuides.findIndex(page => page.as.replace(GUIDES_REGEX, '') === guide)
  const prevGuide = guideIdx > 0 ? orderedGuides[guideIdx - 1] : null
  const nextGuide =
    guideIdx >= 0 && guideIdx < orderedGuides.length ? orderedGuides[guideIdx + 1] : null

  if (!prevGuide && !nextGuide) {
    return null
  }

  return (
    <>
      <Divider className={classes.divider} />
      <Grid container justify="space-between" className={classes.buttonGrid}>
        <Grid item>{prevGuide && <Link {...prevGuide} icon="prev" className={clsx(classes.link, classes.prevLink)} />}</Grid>
        <Grid item>{nextGuide && <Link {...nextGuide} icon="next" className={clsx(classes.link, classes.nextLink)} />}</Grid>
      </Grid>
    </>
  )
}
