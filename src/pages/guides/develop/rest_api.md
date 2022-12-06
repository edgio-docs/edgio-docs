---
title: REST API
---

This guide covers the REST API provided by {{ PRODUCT_NAME }}.

## Authentication {/*authentication*/}

To gain access to the api, provide a deploy token via the `x-api-key` header. Deploy tokens can be created from a site's settings tab in the {{ PRODUCT_NAME }} Developer Console.

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
