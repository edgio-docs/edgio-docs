import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Container } from '@material-ui/core'
import Markdown from '../Markdown'
import ImportBlock from './ImportBlock'
import ModuleTitle from './ModuleTitle'
import MemberTitle from './MemberTitle'
import TypeLink from './TypeLink'

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
  title: {
    marginTop: '1rem',
  },
  titleName: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },
  memberTitle: {
    marginTop: 0,
    marginBottom: 10,
  },
  label: {
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}))

export default function SpecialType({ module, classes, isMember }) {
  classes = useStyles({ classes })
  const type = module.type === 'constant' ? 'Object' : module.type

  return (
    <Container className={classes.root}>
      {/* Title */}
      {isMember ? (
        <MemberTitle>{module.name}</MemberTitle>
      ) : (
        <ModuleTitle>{module.name}</ModuleTitle>
      )}

      {/* Import Example */}
      {!isMember && <ImportBlock module={module} />}

      {/* Comments */}
      <Markdown source={module.comments} />

      {/* Type */}
      {type && <div className={classes.label}>Type</div>}
      <TypeLink data={module} />
    </Container>
  )
}
