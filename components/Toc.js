import { makeStyles, Portal, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import throttle from 'lodash.throttle'
import markdownHeadings from 'markdown-headings'
import {
  createContext,
  forwardRef, useCallback, useContext,
  useEffect, useMemo, useState
} from 'react'
import idForHeading from './utils/idForHeading'

export const TocContext = createContext()

const useStyles = makeStyles(theme => ({
  portal: {
    top: 64,
    paddingTop: theme.spacing(5),
    position: 'sticky',
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'auto',
    paddingLeft: theme.spacing(2),
    width: '100%',
  },
  title: {
    opacity: 0.5,
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(3),
    '& a': {
      opacity: 0.8,
    },
    '&:hover a': {
      opacity: 1,
    },
  },
  link: {
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(2),
    display: 'block',
  },
  active: {
    fontWeight: 'bold',
    opacity: 1,
    color: theme.palette.secondary.main,
    borderLeft: `3px solid ${theme.palette.secondary.main}`,
    '& span': {
      marginLeft: -3,
    },
  },
}))

function isElementInViewport(el) {
  if (!el) return false
  var rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  )
}

export const TocPortal = forwardRef((props, ref) => {
  const classes = useStyles()
  return <div ref={ref} {...props} className={classes.portal} id="toc" />
})

export default function Toc({ source }) {
  const headings = useMemo(
    () => markdownHeadings(source).filter(heading => heading.match(/^###?[^#]*$/)),
    [source],
  )
  const classes = useStyles()
  const tocContainer = useContext(TocContext)
  const [activeHeading, setActiveHeading] = useState(null)

  useEffect(() => {
    if (headings.length) {
      setActiveHeading(idForHeading(headings[0].replace(/^#*\s*/, '')))
    }
  }, [source])

  const onScroll = useCallback(
    throttle(() => {
      if (typeof window !== 'undefined') {
        const firstHeading = Array.from(document.querySelectorAll('h2,h3')).find(
          isElementInViewport,
        )
        const id = firstHeading?.id

        if (id) {
          setActiveHeading(activeHeading => {
            if (id !== activeHeading) {
              const el = document.getElementById(`${id}-toc`)
              const toc = document.getElementById('toc')

              if (toc && el && !isElementInViewport(el)) {
                const scrollTop = el.offsetTop + el.offsetHeight - toc.offsetHeight + 16
                toc.scrollTop = scrollTop
              }
            }
            return id
          })
        }
      }
    }, 100),
    [],
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!headings.length) return null

  return (
    <Portal container={tocContainer.current}>
      <div>
        <Typography variant="body2" className={classes.title}>
          ON THIS PAGE
        </Typography>
        {headings.map((heading, i) => (
          <Item heading={heading} key={i} activeHeading={activeHeading} />
        ))}
      </div>
    </Portal>
  )
}

function Item({ heading, activeHeading }) {
  const tokens = heading.split(/#/)
  const text = tokens.pop()
  const classes = useStyles()
  const id = idForHeading(text)
  const theme = useTheme()

  return (
    <div className={classes.item} style={{ marginLeft: theme.spacing((tokens.length - 2) * 2) }}>
      <Typography variant="body2">
        <a
          href={`#${id}`}
          id={`${id}-toc`}
          className={clsx({
            [classes.link]: true,
            [classes.active]: id === activeHeading,
          })}
        >
          <span>{text}</span>
        </a>
      </Typography>
    </div>
  )
}
