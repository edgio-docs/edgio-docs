import { makeStyles, Portal, Typography, useTheme } from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'
import markdownHeadings from 'markdown-headings'
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react'
import idForHeading from './utils/idForHeading'
import throttle from 'lodash.throttle'
import clsx from 'clsx'

export const TocContext = createContext()

const useStyles = makeStyles(theme => ({
  portal: {
    top: 64,
    paddingTop: theme.spacing(5),
    position: 'sticky',
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'auto',
    paddingLeft: theme.spacing(4),
    width: '100%',
  },
  title: {
    opacity: 0.5,
    fontWeight: 'normal',
    paddingBottom: theme.spacing(2),
    paddingLeft: 16,
  },
  item: {
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
    '& a': {
      opacity: 0.8,
    },
    '&:hover a': {
      opacity: 1,
    },
  },
  dot: {
    minHeight: 8,
    minWidth: 8,
    borderRadius: '50%',
    background: theme.palette.main,
    marginRight: theme.spacing(1),
    marginTop: 9,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: '1.1rem',
    '&:hover': {
      textDecoration: 'underline',
      color: green[700],
    },
  },
  active: {
    fontWeight: 'bold',
    opacity: 1,
    color: `${theme.palette.main} !important`,
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
    setActiveHeading(idForHeading(headings[0].replace(/^#*\s*/, '')))
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

  return (
    <Portal container={tocContainer.current}>
      <div>
        <Typography variant="body1" className={classes.title}>
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
      <div
        className={classes.dot}
        style={{ visibility: id === activeHeading ? 'visible' : 'hidden' }}
      />
      <Typography variant="body1">
        <a
          href={`#${id}`}
          id={`${id}-toc`}
          className={clsx({
            [classes.link]: true,
            [classes.active]: id === activeHeading,
          })}
        >
          {text}
        </a>
      </Typography>
    </div>
  )
}
