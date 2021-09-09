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
      main: '#3d3c3c',
    },
    secondary: {
      main: '#e95495',
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
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.3125rem',
    },
    h5: {
      fontSize: '1rem',
    },
    h6: {
      fontSize: '1rem',
    },
    body1: {},
    body2: {},
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
        color: theme.palette.secondary.main,
        textDecoration: 'none',
      },
    },
  },
})

export default theme
