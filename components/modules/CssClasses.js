import { makeStyles } from '@material-ui/core'
import React from 'react'
import ApiPropsTable from './ApiPropsTable'

const useStyles = makeStyles(theme => ({
  codeLink: {
    '& code': {
      paddingRight: '0 !important',
    },
  },
}))

export default function CssClasses({ cssClasses }) {
  const classes = useStyles()
  if (!cssClasses || !cssClasses.length) {
    return null
  }

  return (
    <ApiPropsTable
      title="CSS"
      description={
        <>
          <p>
            You can override all the class names injected by React Storefront thanks to
            Material-UI's theme customization. Overrides can be done via one of these methods:
          </p>
          <ul>
            <li>
              With a rule name of the{' '}
              <a
                className={classes.codeLink}
                href="https://material-ui.com/customization/components/#overriding-styles-with-classes"
                target="_blank"
              >
                <code>classes</code> object prop
              </a>
              .
            </li>
            <li>
              With a{' '}
              <a
                href="https://material-ui.com/customization/components/#overriding-styles-with-global-class-names"
                target="_blank"
              >
                global class name
              </a>
              .
            </li>
            <li>
              With a theme and an{' '}
              <a
                className={classes.codeLink}
                href="https://material-ui.com/customization/globals/#css"
                target="_blank"
              >
                <code>overrides</code> property
              </a>
              .
            </li>
          </ul>
        </>
      }
      columns={[
        {
          title: 'Rule Name',
          propName: 'ruleName',
          colType: 'code',
          width: '15%',
        },
        {
          title: 'Global class',
          propName: 'globalClass',
          colType: 'code',
          width: '25%',
        },
        {
          title: 'Description',
          propName: 'description',
          colType: 'markdown',
          width: '60%',
        },
      ]}
      values={cssClasses}
    />
  )
}
