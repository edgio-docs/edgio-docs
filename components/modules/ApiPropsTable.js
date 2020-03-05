import { makeStyles } from '@material-ui/core'
import React from 'react'
import Markdown from '../Markdown'
import Typography from '@material-ui/core/Typography'
import formatType from './formatType'
import get from 'lodash/get'
import TypeLink from './TypeLink'

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    overflow: 'hidden',
    overflowX: 'auto',
    borderSpacing: 0,
    borderCollapse: 'collapse',
    '& thead': {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '14px',
      fontWeight: 500,
    },
    '& thead tr': {
      height: '64px',
    },
    '& th': {
      padding: '0 16px 0 8px',
      whiteSpace: 'pre',
      fontWeight: 500,
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '& tbody': {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '14px',
      lineHeight: 1.5,
    },
    '& tr': {
      height: '64px',
    },
    '& td': {
      padding: '8px 16px 8px 8px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '& .is-required': {
      color: '#006500',
    },
    '& .prop-name': {
      fontFamily: theme.fonts.code,
    },
    '& .prop-type': {
      color: '#932981',
      fontFamily: theme.fonts.code,
    },
    '& .prop-code': {
      fontFamily: theme.fonts.code,
    },
  },
  root: {
    marginBottom: '20px',
  },
}))

export default function ApiPropsTable({ title, description, values, columns, sortBy }) {
  const classes = useStyles({})
  if (!values.length) {
    return null
  }

  const renderValueName = value => (
    <a href={`#prop-${value}`} id={`prop-${value}`}>
      {value}
    </a>
  )

  const renderPropType = type => <span className="prop-type">{formatType(type || {})}</span>

  const renderType = type => <TypeLink data={{ type }} />

  const renderCode = code => <span className="prop-code">{code}</span>

  const renderMarkdown = markdown => <Markdown source={markdown} />

  const renderColumnValue = (type, value) => {
    switch (type) {
      case 'name':
        return renderValueName(value)
      case 'type':
        return renderType(value)
      case 'propType':
        return renderPropType(value)
      case 'code':
        return renderCode(value)
      case 'markdown':
        return renderMarkdown(value)
      default:
        return <span>{value}</span>
    }
  }

  const sortedValues = sortBy
    ? values.sort((val1, val2) => val1[sortBy].localeCompare(val2[sortBy]))
    : values

  return (
    <div className={classes.root}>
      {title && <Typography variant="h2">{title}</Typography>}
      {description}
      <table className={classes.table}>
        <thead>
          <tr>
            {columns.map(({ title, width }) => (
              <th style={{ textAlign: 'left', width: width || 'auto' }} key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedValues.map((value = {}) => (
            <tr key={value[columns[0].propName]}>
              {columns.map(({ propName, colType }) => (
                <td
                  key={propName}
                  className={
                    colType === 'name' ? `prop-name${value.required ? ' is-required' : ''}` : ''
                  }
                >
                  {renderColumnValue(colType, get(value, propName, null))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
