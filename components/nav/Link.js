import React from 'react'
import NextLink from 'next/link'
import { Typography, makeStyles } from '@material-ui/core'
import Icon from '../icons/Icon'
import clsx from 'clsx'
import useVersioning from '../versioning'
import { Prefetch } from '@layer0/react'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(-2),
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  dot: {
    minHeight: 8,
    minWidth: 8,
    borderRadius: '50%',
    background: theme.palette.main,
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2) + 9,
  },
  active: {
    '& a span': {
      fontWeight: 500,
      color: theme.palette.secondary.main,
    },
  },
  link: {
    margin: theme.spacing(2, 0, 0, 0),
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
  linkText: {
    fontSize: '1.1rem',
  },
}))

export default function Link({ className, icon, text, as, href, ...props }) {
  const classes = useStyles()
  const { createUrl, currentVersion } = useVersioning()
  const url = createUrl({ text, as, href })
  const apiUrl = `/api${as}?version=${currentVersion}`
  const { asPath } = useRouter()

  let link = (
    <Prefetch url={apiUrl}>
      <a href={url} className={clsx(className, classes.link)} target={href ? '_self' : '_blank'}>
        {icon && <Icon classes={{ root: classes.icon }} type={icon} />}
        <Typography component="span" variant="body1" className={classes.linkText}>
          {text}
        </Typography>
      </a>
    </Prefetch>
  )

  if (href) {
    link = (
      <div className={clsx({ [classes.active]: asPath === url })}>
        <NextLink as={url} href={href} {...props} passHref>
          {link}
        </NextLink>
      </div>
    )
  }

  const active = asPath.split(/\?/)[0] === as

  return (
    <div className={clsx({ [classes.root]: true, [classes.active]: active })}>
      <div className={classes.dot} style={{ visibility: active ? 'visible' : 'hidden' }}></div>
      {link}
    </div>
  )
}
