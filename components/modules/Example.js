import React from 'react'
import { Typography } from '@material-ui/core'
import Code from '../Code'

export default function Example({ example }) {
  return (
    <div>
      <Typography>{example.caption}</Typography>
      <Code value={example.description} />
    </div>
  )
}
