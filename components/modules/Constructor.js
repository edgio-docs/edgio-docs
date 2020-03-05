import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import MemberTitle from './MemberTitle'
import Parameters from './Parameters'
import { Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '15px',
    '& p': {
      fontSize: '0.875rem',
    },
  },
  functionTitleParams: {
    color: lighten(theme.palette.text.secondary, 0.2),
  },
}))

export default function Constructor({ module, classes }) {
  classes = useStyles({ classes })

  return (
    <Container className={classes.root}>
      <MemberTitle>
        <span>constructor</span>
        <span className={classes.functionTitleParams}>
          ({module.params.map(param => param.name).join(', ')})
        </span>
      </MemberTitle>
      <Parameters parameters={module.params} />
    </Container>
  )
}
