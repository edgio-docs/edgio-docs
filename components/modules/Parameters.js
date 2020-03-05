import React from 'react'
import ApiPropsTable from './ApiPropsTable'

export default function Parameters({ parameters }) {
  return (
    <ApiPropsTable
      columns={[
        {
          title: 'Parameter',
          propName: 'name',
          colType: 'code',
          width: '25%',
        },
        {
          title: 'Type',
          propName: 'type',
          colType: 'type',
          width: '15%',
        },
        {
          title: 'Description',
          propName: 'text',
          colType: 'markdown',
          width: '45%',
        },
        {
          title: 'Default',
          propName: 'default',
          colType: 'code',
          width: '15%',
        },
      ]}
      values={parameters}
    />
  )
}
