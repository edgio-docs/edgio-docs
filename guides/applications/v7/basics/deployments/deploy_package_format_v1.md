---
title: {{ PRODUCT }} Deployment Package v1 Format
---

The {{ PRODUCT }} Deployment Package Format is a specification for a directory structure and file formats used to deploy CDN-as-code projects to {{ PRODUCT }}.

## File Structure {/* file-structure */}

The deployment package has a specific directory structure that includes configuration files, handlers for cloud and edge functions, and static files.

```bash
. (project root)
├── .edgio
│   ├── edgio-config-v1.json # configuration file
│   ├── edge-functions # edge functions that are deployed to the {{ PRODUCT_EDGE }}
│   │   └── handler.js
│   ├── cloud-functions # cloud functions that are deployed to the {{ PRODUCT_PLATFORM }}
│   │   ├── my-app
│   │   │   ├── handler.mjs
│   │   │   └── some-config.json
│   │   ├── other-app
│   │   │   └── handler.mjs
│   │   └── nextjs-app
│   │       ├── handler.mjs
│   │       └── server.js
│   ├── static # static files that may be different in this build from the previous build
│   │   └── service-worker.js
│   ├── static-immutable # static files that are immutable across builds
│   │   └── build
│   │       └── chunk-we141561.js
│   └── src # source files used for debugging
|       └── index.js
|       └── edge.js
```

## Configuration File {/* configuration-file */}

The `edgio-config-v1.json` file contains settings for origins and routing rules.

```json
{
  "origins": [
    {
      "name": "http-echo",
      "override_host_header": "http-echo.raees.me",
      "hosts": [
        {
          "location": [
            {
              "hostname": "http-echo.raees.me",
              "port": 443
            }
          ],
          "scheme": "https"
        }
      ],
      "tls_verify": {
        "use_sni": true,
        "sni_hint_and_strict_san_check": "http-echo.raees.me"
      }
    }
  ],
  "rules": [
    {
      "if": [
        {
          "in": [
            {
              "request": "path"
            },
            ["/assets/styles.css", "/assets/tears-of-steel.m3u"]
          ]
        },
        {
          "caching": {
            "max_age": {
              "200": "1y"
            }
          },
          "origin": {
            "set_origin": "edgio_static"
          }
        }
      ]
    },
    {
      "if": [
        {
          "==": [
            {
              "request": "path"
            },
            "/"
          ]
        },
        {
          "edge_function": "sample-html-page"
        }
      ]
    },
    {
      "if": [
        {
          "==": [
            {
              "request": "path"
            },
            "/http-echo"
          ]
        },
        {
          "edge_function": "echo",
          "origin": {
            "set_origin": "http-echo"
          }
        }
      ]
    },
    {
      "if": [
        {
          "==": [
            {
              "request": "path"
            },
            "/cloud"
          ]
        },
        {
          "headers": {
            "set_request_headers": {
              "+x-cloud-functions-hint": "app"
            }
          },
          "origin": {
            "set_origin": "edgio_serverless"
          }
        }
      ]
    }
  ]
}
```

## Cloud Function Handler {/* cloud-function-handler */}

Cloud function handlers are defined in `cloud-functions/my-function/handler.mjs`. It supports two main functions: `handleHttpInit` and `handleHttpRequest`.

```javascript
/**
 * TODO: when does this function get called?
 * @async
 * @param {Object} context
 */
export async function handleHttpInit(context) {
  console.log('handleHttpInit', context);
}

/**
 * Handle HTTP requests
 * @async
 * @param {Request} request
 * @param {Object} context
 * @returns {Response}
 */
export async function handleHttpRequest(request, context) {
  console.log('handleHttpRequest', request, context);

  // Do something in the background after sending the response;
  context.waitUntil(new Promise((resolve) => setTimeout(resolve, 2000)));

  // send the response
  return new Response('Hello, World!', {status: 200});
}
```

## Edge Function Handler {/* edge-function-handler */}

Edge function handlers are defined in `edge-functions/handler.mjs`. Similar to cloud functions, it supports two main functions: `handleHttpInit` and `handleHttpRequest`.

```javascript
export async function handleHttpInit(context) {
  console.log('handleHttpInit', context);
}

export async function handleHttpRequest(request, context) {
  // Function logic here
  return new Response('Hello, World!', {status: 200});
}
```

See the [Edge Functions](/applications/v7/edge_functions) guide for more information about the API.
