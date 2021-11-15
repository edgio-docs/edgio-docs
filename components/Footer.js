import { Divider, Grid, makeStyles, Button } from '@material-ui/core'
import NextIcon from '@material-ui/icons/ArrowForward'
import PreviousIcon from '@material-ui/icons/ArrowBack'
import Launch from '@material-ui/icons/Launch'
import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(4),
  },
  label: {
    marginRight: theme.spacing(1),
  },
  link: {
    textTransform: 'none',
    fontWeight: 'normal',
    margin: theme.spacing(0, 0, 3, 2),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(6, 0, 0, 0),
  },
}))

const GUIDES_REGEX = /\/guides\//

export default function Footer({ guide, navData }) {
  const classes = useStyles()
  const orderedGuides = navData[0].items
  const guideIdx = orderedGuides.findIndex(page => page.as.replace(GUIDES_REGEX, '') === guide)
  const prevGuide = guideIdx > 0 ? orderedGuides[guideIdx - 1] : null
  const nextGuide =
    guideIdx >= 0 && guideIdx < orderedGuides.length ? orderedGuides[guideIdx + 1] : null
  const editGuide = `https://github.com/layer0-docs/layer0-docs/edit/master/guides/${guide}.md`

  return (
    <>
      {guide !== 'changelog' && (
        <Button
          href={editGuide}
          target="_blank"
          variant="text"
          size="small"
          startIcon={<Launch style={{ fontSize: '.8rem' }} />}
          color="secondary"
          style={{ fontSize: '.7rem' }}
        >
          Edit this guide on GitHub
        </Button>
      )}

      {(prevGuide || nextGuide) && (
        <div className={classes.footer}>
          {prevGuide && <GuideLink variant="previous" guide={prevGuide} />}
          {nextGuide && <GuideLink variant="next" guide={nextGuide} />}
        </div>
      )}
    </>
  )
}

function GuideLink({ variant, guide }) {
  const classes = useStyles()
  const linkProps = {}

  if (variant === 'next') {
    linkProps.endIcon = <NextIcon />
  } else {
    linkProps.startIcon = <PreviousIcon />
  }

  return (
    <Link as={guide.as} href={guide.href}>
      <Button
        variant={variant === 'next' ? 'contained' : undefined}
        elevation={3}
        color="secondary"
        className={classes.link}
        {...linkProps}
      >
        {variant === 'next' ? 'Next' : 'Previous'}: {guide.text}
      </Button>
    </Link>
  )
}
