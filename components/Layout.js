import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const styles = theme => ({
  main: {
    paddingTop: 64,
    display: 'flex',
    flexDirection: 'row',
    ...theme.typography.body1,
  },
})

const useStyles = makeStyles(styles)

export default function Layout({ children }) {
  const classes = useStyles()

  return (
    <Container maxWidth="xl" className={classes.main}>
      {children}
    </Container>
  )
}
