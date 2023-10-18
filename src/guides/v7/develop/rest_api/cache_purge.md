---
title: Purge (Clear-Cache) REST API
---

Purge content through the [clear-cache endpoint](#clear-cache). 

## Authentication {/*authentication*/}

Authenticate API requests by passing a deploy token throgh the `x-api-key` header.

**To create a deploy token**
1.  From the {{ PORTAL_LINK }}, select the desired private or team space.
2.  Select the desired property.
3.  From the left-hand pane, select **Settings**.
4.  From the **Deploy Tokens** section, click **Create new Deploy Token**.

## Methods {/*methods*/}

### clear-cache {/*clear-cache*/}

`POST {{ APP_URL }}/api/v1/clear-cache`

Purges entries from the cache for a specific environment. You can purge specific paths or surrogate keys. If no paths or surrogate keys are provided all entries will be purged.

#### Request Headers {/*request-headers*/}

The following request headers are required:

- `x-api-key`: A site deploy token
- `content-type`: `"application/json"`

#### Body {/*body*/}

Provide the following parameters as JSON in the post body.
Note that only one of the optional arguments can be passed at a time, for example `paths` and `surrogateKeys` cannot be cleared at once.

```json
{
  "team": "the team name",
  "site": "the site name",
  "environment": "the environment name",
  "paths": ["Optional. An array of paths to clear. Use * as a wildcard."],
  "surrogateKeys": ["Optional. An array of surrogate keys to clear"],
  "cacheHashes": ["Optional. An array of cache hashes to clear"]
}
```

#### Example: {/*example*/}

```js
const fetch = require('node-fetch')

const deployToken = '*****'
const team = 'my-team'
const site = 'my-site'
const environment = 'production'
const paths = ['/some/path']

async function clearCache() {
  const res = await fetch('{{ APP_URL }}/api/v1/clear-cache', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': deployToken,
    },
    body: JSON.stringify({
      team,
      site,
      environment,
      paths,
    }),
  })

  console.log('Status:', res.status, res.statusText)
  console.log('Body:', await res.text())
}

clearCache()
```
