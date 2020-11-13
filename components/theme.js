import { createMuiTheme } from '@material-ui/core/styles'
import { red, purple, pink } from '@material-ui/core/colors'

const color = '#242349'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: purple[600],
      light: pink[300],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    main: color,
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
      color,
      marginTop: '0.67em',
    },
    h2: {
      fontSize: '2.125rem',
      fontWeight: 400,
      lineHeight: '1.20588em',
      color,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: '1.35417em',
      color,
    },
    h4: {
      fontSize: '1.3125rem',
      fontWeight: 500,
      lineHeight: '1.16667em',
      color,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5em',
      color,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
  },
  overrides: {},
})

export default theme
