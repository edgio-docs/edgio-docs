import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
  },
}))

export default function MemberTitle({ className, classes, children, name }) {
  classes = useStyles({ classes })
  return (
    <div id={`member-${name}`} className={clsx(className, classes.root)}>
      <Link href={`#member-${children}`}>
        <code>{children}</code>
      </Link>
    </div>
  )
}
