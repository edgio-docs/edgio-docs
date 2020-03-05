import React from 'react'
import ApiPropsTable from './ApiPropsTable'

export default function Props({ props }) {
  if (!props.length) {
    return null
  }

  return (
    <ApiPropsTable
      title="Props"
      sortBy="name"
      columns={[
        {
          title: 'Name',
          propName: 'name',
          colType: 'name',
          width: '15%',
        },
        {
          title: 'Type',
          propName: 'type',
          colType: 'propType',
          width: '20%',
        },
        {
          title: 'Default',
          propName: 'defaultValue.value',
          colType: 'code',
          width: '20%',
        },
        {
          title: 'Description',
          propName: 'description',
          colType: 'markdown',
          width: '45%',
        },
      ]}
      values={props}
    />
  )
}
