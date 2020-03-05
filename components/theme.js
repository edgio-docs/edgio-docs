import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  headerHeight: 64,
  fonts: {
    code: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  typography: {
    h1: {
      fontSize: '2.8125rem',
      fontWeight: 400,
      lineHeight: '1.13333em',
      color: 'rgba(0, 0, 0, 0.54)',
      marginTop: '0.67em',
    },
    h2: {
      fontSize: '2.125rem',
      fontWeight: 400,
      lineHeight: '1.20588em',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: '1.35417em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    h4: {
      fontSize: '1.3125rem',
      fontWeight: 500,
      lineHeight: '1.16667em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1rem',
    },
  },
  overrides: {},
})

export default theme
