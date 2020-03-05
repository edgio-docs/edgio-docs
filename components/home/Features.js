import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {},
}))

export default function Features() {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      Docs coming soon!
    </Grid>
  )
}
