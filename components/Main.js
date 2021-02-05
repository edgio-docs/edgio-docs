import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  toc: {
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 350px',
    },
  },
}))

export default function Main({ children, showToc }) {
  const classes = useStyles()
  return <main className={clsx({ [classes.root]: true, [classes.toc]: showToc })}>{children}</main>
}
