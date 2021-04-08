import { createMuiTheme } from '@material-ui/core/styles'
import { red, purple, pink, cyan, grey } from '@material-ui/core/colors'

const color = '#242349'

const linkColor = cyan[700]

const primary = {
  main: pink[600],
  light: pink[400],
  dark: pink[700],
  contrastText: '#fff',
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary,
    secondary: {
      main: purple[500],
      light: purple[400],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    main: color,
    link: linkColor,
    brand: {
      primary: grey[800],
    },
  },
  headerHeight: 64,
  fonts: {
    code: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: '1.13333em',
      // color,
      marginTop: '0.67em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: '1.20588em',
      marginTop: '1.8em',
      // color,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: '1.35417em',
      marginTop: '1.8em',
      // color,
    },
    h4: {
      fontSize: '1.3125rem',
      fontWeight: 500,
      lineHeight: '1.16667em',
      marginTop: '1.8em',
      color,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 400,
      marginTop: '1.8em',
      lineHeight: '1.5em',
      color,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
      marginTop: '1.8em',
      lineHeight: '1.5em',
      color,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1.2rem',
    },
  },
  overrides: {
    MuiLink: {
      root: {
        color: linkColor,
      },
    },
  },
})

Object.assign(theme.overrides, {
  MuiCssBaseline: {
    '@global': {
      a: {
        color: theme.palette.primary.main,
        color: linkColor,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
})

export default theme
