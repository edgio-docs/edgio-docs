import React, { Fragment } from 'react'

export default function formatType(type) {
  const typeName = type.name
  if (Array.isArray(type.value)) {
    const values = type.value
      .map(value => value.name || value.value)
      .map((value, ind, arr) => {
        const sep =
          ind < arr.length - 1 ? (
            <>
              {' '}
              | <br />
            </>
          ) : (
            ''
          )
        return (
          <Fragment key={value}>
            {value} {sep}
          </Fragment>
        )
      })
    return (
      <>
        {typeName} : {values}
      </>
    )
  }
  if (typeName === 'shape') {
    return (
      <>
        shape :{' { '}
        {Object.keys(type.value).map(
          (key, i) => `${i ? ', ' : ''}${type.value[key].name} : ${key}`,
        )}
        {' }'}
      </>
    )
  }
  if (typeof type.value === 'object') {
    const valueType = formatType(type.value)
    return (
      <>
        {typeName} : {valueType}
      </>
    )
  }
  return typeName
}
