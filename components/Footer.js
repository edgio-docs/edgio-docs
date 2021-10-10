import { Button, makeStyles } from '@material-ui/core'
import PreviousIcon from '@material-ui/icons/ArrowBack'
import NextIcon from '@material-ui/icons/ArrowForward'
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
    margin: theme.spacing(6, 0, 3, 2),
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

  if (!prevGuide && !nextGuide) {
    return null
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {prevGuide && <GuideLink variant="previous" guide={prevGuide} />}
      {nextGuide && <GuideLink variant="next" guide={nextGuide} />}
    </div>
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
