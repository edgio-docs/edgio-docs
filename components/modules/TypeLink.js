import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import upperFirst from 'lodash/upperFirst'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {},
  type: {
    color: '#932981',
    fontFamily: theme.fonts.code,
    fontSize: '14px',
  },
}))

export default function TypeLink({ data, className, classes }) {
  classes = useStyles({ classes })
  const type = data.type === 'constant' ? 'Object' : data.type
  const linkBlock = data.typeLink ? (
    <Link href={`/modules/${data.typeLink}`}>
      <code>{upperFirst(type)}</code>
    </Link>
  ) : (
    <code className={classes.type}>{upperFirst(type)}</code>
  )

  return (
    <span className={className}>
      {data.extendedType ? (
        <span className={classes.type}>
          <code>{data.extendedType}</code>
          <code>{'<'}</code>
          {linkBlock}
          <code>{'>'}</code>
        </span>
      ) : (
        linkBlock
      )}
    </span>
  )
}
