import React from 'react'
import NextLink from 'next/link'
import { Typography, makeStyles } from '@material-ui/core'
import Icon from '../icons/Icon'
import clsx from 'clsx'
import useVersioning from '../versioning'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
  link: {
    margin: theme.spacing(1, 0, 0, 0),
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default function Link({ className, icon, text, as, href, ...props }) {
  const classes = useStyles()
  const { createUrl, currentVersion } = useVersioning()

  let link = (
    <a
      href={createUrl({ text, as, href, forceVersion: true })}
      className={clsx(className, classes.link)}
    >
      {icon && <Icon classes={{ root: classes.icon }} type={icon} />}
      <Typography component="span">{text}</Typography>
    </a>
  )

  if (href) {
    link = (
      <NextLink as={createUrl({ text, as, href })} href={href} {...props} passHref>
        {link}
      </NextLink>
    )
  }

  return link
}
