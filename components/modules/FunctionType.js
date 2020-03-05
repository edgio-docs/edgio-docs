import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Container } from '@material-ui/core'
import Return from './Return'
import Parameters from './Parameters'
import Example from './Example'
import Markdown from '../Markdown'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import ModuleTitle from './ModuleTitle'
import ImportBlock from './ImportBlock'
import MemberTitle from './MemberTitle'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    boxSizing: 'border-box',
    padding: '15px',
    fontSize: '0.875rem',

    '& ul': {
      lineHeight: 1.6,
      '& code': {
        fontSize: '14px',
        lineHeight: 1.6,
      },
    },
    '& p': {
      fontSize: '0.875rem',
    },
  },
  functionTitleParams: {
    color: lighten(theme.palette.text.secondary, 0.2),
  },
  label: {
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}))

const FunctionTitle = ({ classes, module }) => {
  classes = useStyles({ classes })
  return (
    <span>
      <span>{module.name}</span>
      <span className={classes.functionTitleParams}>
        ({module.params.map(param => param.name).join(', ')})
      </span>
    </span>
  )
}

export default function FunctionType({ module, classes, isMember }) {
  classes = useStyles({ classes })
  return (
    <Container className={classes.root}>
      {/* Title */}
      {isMember ? (
        <MemberTitle name={module.name}>
          <FunctionTitle module={module} />
        </MemberTitle>
      ) : (
        <ModuleTitle>
          <FunctionTitle module={module} />
        </ModuleTitle>
      )}

      {/* Import Example */}
      {!isMember && <ImportBlock module={module} />}

      {/* Comments */}
      <Markdown source={module.comments} />

      {/* Examples */}
      {module.examples.length > 0 && (
        <>
          {module.examples.map((example, i) => (
            <Example example={example} key={i} />
          ))}
        </>
      )}

      {/* Parameters */}
      {module.params.length > 0 && <Parameters parameters={module.params} />}

      {/* Returns */}
      {module.returns.length > 0 && (
        <>
          <div className={classes.label}>Returns</div>
          {module.returns.map((r, i) => (
            <Return returnData={r} key={i} />
          ))}
        </>
      )}
    </Container>
  )
}
