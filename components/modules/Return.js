import React from 'react'
import { Typography } from '@material-ui/core'
import TypeLink from './TypeLink'

export default function Return({ returnData }) {
  return (
    <div>
      <TypeLink data={returnData} />
      {returnData.text && ' : '}
      <Typography display="inline">{returnData.text}</Typography>
    </div>
  )
}
