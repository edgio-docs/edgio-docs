import { createMuiTheme } from '@material-ui/core/styles'
import { red, purple, pink, cyan, grey } from '@material-ui/core/colors'

const color = '#242349'

const linkColor = cyan[700]

const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#fff',
    },
    primary: {
      main: pink[500],
      light: pink[400],
    },
    secondary: {
      main: pink[500],
    },
    error: {
      main: '#f48fb1',
    },
    warning: {
      main: '#ffc107',
    },
  },
  fonts: {
    code: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      marginTop: '0.67em',
    },
    h2: {
      fontSize: '2rem',
      marginTop: '1.5em',
    },
    h3: {
      fontSize: '1.5rem',
      marginTop: '1.5em',
    },
    h4: {
      fontSize: '1.3125rem',
      marginTop: '1.5em',
    },
    h5: {
      fontSize: '1rem',
      marginTop: '1.5em',
    },
    h6: {
      fontSize: '1rem',
      marginTop: '1.5em',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1rem',
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
        color: pink[600],
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
        '&:hover button': {
          textDecoration: 'none',
        },
      },
      '.MuiDivider-root': {
        marginBottom: '1rem !important',
      },
    },
  },
})

export default theme
