import {format} from 'prettier';
import babel from 'prettier/parser-babel';

import CustomPre from './CustomPre';
import {SnippetGroup} from './SnippetGroup';

const edgeJSLabel = 'EdgeJS';
const edgeJSType = 'javascript';
const jsonLabel = 'JSON';
const jsonType = 'json';
const filenameLabel = 'routes.js';

export default function EdgeJS({children}: {children: React.ReactElement}) {
  let json = children?.props?.children?.props?.children as string;
  if (typeof json !== 'string') {
    console.error('EdgeJS must be JSON');
    return null;
  }
  json = JSON.parse(String(json).trim());

  return (
    <SnippetGroup>
      <CustomPre tabLabel={edgeJSLabel}>
        <code className={edgeJSType} filename={filenameLabel}>
          {toEdgeJS(json)}
        </code>
      </CustomPre>
      <CustomPre tabLabel={jsonLabel}>
        <code className={jsonType} filename={filenameLabel}>
          {JSON.stringify(json, null, 2)}
        </code>
      </CustomPre>
    </SnippetGroup>
  );
}

/**
 * Converts an array of EdgeControl rules to EdgeJS formatted with prettier.
 * @param rules
 * @returns
 */
function toEdgeJS(rules: any) {
  const routes = rules.map((rule: any) => {
    let feature: any;
    let criteria: any = {};

    if (rule.if) {
      feature = rule.if[1];
      criteria.method = getMethod(rule.if);
      criteria.path = getPath(rule.if);
      // TODO add headers
    } else {
      feature = rule;
    }

    return `${criteria.method?.toLowerCase() || 'match'}('${
      criteria.path || '/:path*'
    }', ${JSON.stringify(feature)})`;
  });

  return format(
    `
    import { Router } from '@edgio/core'

    ${['export default new Router()'].concat(routes).join('.')}
  `,
    {
      plugins: [babel],
      parser: 'babel',
    }
  );
}

function getMethod(ifElse: any) {
  return findCriteria(ifElse[0], 'request', 'method');
}

function getPath(ifElse: any) {
  return findCriteria(ifElse[0], 'request', 'origin_path');
}

function findCriteria(criteria: any, type: string, key: string) {
  let conditions: Array<any> = [];

  if (criteria.and) {
    conditions = criteria.and;
  } else {
    conditions = [criteria];
  }

  for (let criterion of conditions) {
    const [_operator, condition]: any = Object.entries(criterion)[0];
    const [theType, theKey] = Object.entries(condition[0])[0];

    if (type === theType && key === theKey) {
      return condition[1];
    }
  }
}
