import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import Member from './Member'
import Markdown from '../Markdown'
import ModuleTitle from './ModuleTitle'
import ImportBlock from './ImportBlock'
import Constructor from './Constructor'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '900px',
    width: '100vw',
    boxSizing: 'border-box',
    padding: '15px',
  },
  member: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(),
    margin: theme.spacing(3),
  },
}))

export default function ClassType({ module, classes }) {
  classes = useStyles({ classes })

  return (
    <Container className={classes.root}>
      {/* Title */}
      <ModuleTitle>{module.name}</ModuleTitle>

      {/* Import Example */}
      <ImportBlock module={module} />

      {/* Comments */}
      <Markdown source={module.comments} />

      {/* Constructor */}
      {module.params.length > 0 && (
        <Constructor module={module} classes={{ root: classes.member }} />
      )}

      {/* Members */}
      {module.members.map(member => (
        <Member classes={{ root: classes.member }} isMember module={member} key={member.name} />
      ))}
    </Container>
  )
}
