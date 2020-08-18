import React from 'react'
import NextLink from 'next/link'
import { Typography, makeStyles } from '@material-ui/core'
import Icon from '../icons/Icon'
import clsx from 'clsx'
import useVersioning from '../versioning'
import { Prefetch } from '@xdn/react'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  link: {
    margin: theme.spacing(1, 0, 0, 0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default function Link({ className, icon, text, as, href, ...props }) {
  const classes = useStyles()
  const { createUrl, currentVersion } = useVersioning()
  const url = createUrl({ text, as, href })
  const apiUrl = `/api${as}?version=${currentVersion}`

  let link = (
    <Prefetch url={apiUrl}>
      <a href={url} className={clsx(className, classes.link)}>
        {icon && <Icon classes={{ root: classes.icon }} type={icon} />}
        <Typography component="span">{text}</Typography>
      </a>
    </Prefetch>
  )

  if (href) {
    link = (
      <NextLink as={url} href={href} {...props} passHref>
        {link}
      </NextLink>
    )
  }

  return link
}
