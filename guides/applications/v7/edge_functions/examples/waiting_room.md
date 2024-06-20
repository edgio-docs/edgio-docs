---
title: Waiting Room
---

{{ ef_req_edgejs.md }}

A waiting room can be used to restrict access to a website by means of queueing requests during high traffic periods. This can be useful for preventing a website from becoming overloaded during a traffic spike, or for restricting access to a website during a limited-time event.

The example is derived from an [Upstash blog post](https://upstash.com/blog/nextjs-edge-waiting-room) using an edge database to store the number of active sessions, and to determine whether the current user is active. If the number of active sessions is less than the maximum allowed, or if the current user is already active, the request will be allowed to proceed. Otherwise, the request will be queued and the user will be shown a waiting room page.

<ExampleButtons
  title="Waiting Room"
  siteUrl="https://edgio-community-examples-v7-edge-functions-live.edgio.link/example/upstash-database"
  repoUrl="https://github.com/edgio-docs/edgio-examples/tree/main/examples/v7-edge-functions"
/>

## Router Configuration {/* router-configuration */}

In the {{ PRODUCT }} router, you can use the `edge_function` feature to specify the path to the edge function that will handle the waiting room.

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/:path*', {
    edge_function: './edge-functions/main.js',
  });
```

## Edge Function {/* edge-function */}

The edge function will be responsible for determining whether the request should be allowed to proceed, or whether it should be queued for later processing. In this example, we will use Upstash to store the number of active sessions, and to determine whether the current user is active.

<Callout type="info">

The following sample code contains `import` declarations that are not documented in this guide. View the full source code for these functions from within the [edgio-examples repository](https://github.com/edgio-docs/edgio-examples/tree/main/examples/v7-edge-functions).

</Callout>

```js filename="edge-functions/main.js"
import createFetchForOrigin from '../../../utils/createFetchForOrigin';
import {
  getCookiesFromRequest,
  setCookieToResponse,
} from '../../../utils/cookies';
import {setEnvFromContext} from '../../../utils/polyfills/process.env';
import waitingPage from './waitingPage';

// Constants
const COOKIE_NAME_ID = '__sessiong_id';
const COOKIE_NAME_TIME = '__session_last_update_time';
const TOTAL_ACTIVE_USERS = 2;
const SESSION_DURATION_SECONDS = 15;

// Setup fetch function for Upstash
const fetch = createFetchForOrigin('upstash');

/**
 * Main handler for the edge request.
 */
export async function handleHttpRequest(request, context) {
  let resp;

  // Set context environment variables to process.env
  setEnvFromContext(context);

  const cookies = getCookiesFromRequest(request);

  // Get user ID from cookie or generate a new one
  const userId = cookies[COOKIE_NAME_ID] ?? generateId();

  // Get the current number of active sessions and the active user
  const size = await getRecordCount();
  const isActiveUser = (await getRecord(userId)) === '1';

  console.log('Current number of active sessions: ', size);

  // Check capacity
  if (size < TOTAL_ACTIVE_USERS || isActiveUser) {
    // User is able to access the website
    resp = await getDefaultResponse(request, userId);
  } else {
    // User is not able to access the website, hold them in the waiting room
    resp = await getWaitingRoomResponse();
  }

  return resp;
}

/**
 * Generate a random ID
 */
function generateId(len = 10) {
  return Array.from({length: len}, () =>
    ((Math.random() * 36) | 0).toString(36)
  ).join('');
}

/**
 * Handle the default response.
 */
async function getDefaultResponse(request, userId) {
  const cookiesToSet = [[COOKIE_NAME_ID, userId]];

  // Read the session cookie and update the expiry time
  const cookies = getCookiesFromRequest(request);
  const now = Date.now();
  const lastUpdate = cookies[COOKIE_NAME_TIME];
  let lastUpdateTime = 0;

  if (lastUpdate) {
    lastUpdateTime = parseInt(lastUpdate);
  }

  const diff = now - lastUpdateTime;
  const updateInterval = (SESSION_DURATION_SECONDS * 1000) / 2;
  if (diff > updateInterval) {
    await setExpiryRecord(userId, '1', SESSION_DURATION_SECONDS);
    cookiesToSet.push([COOKIE_NAME_TIME, now.toString()]);
  }

  // Fetch the response from the origin
  const response = await fetch(request);

  // Set the cookies
  setCookieToResponse(response, cookiesToSet);

  return response;
}

/**
 * Send a REST request to Upstash.
 */
async function sendUpstashRequest(cmd) {
  cmd = Array.isArray(cmd) ? cmd.join('/') : cmd;

  return (
    await fetch(`${process.env.UPSTASH_REDIS_REST_URL}`, {
      method: 'POST',
      body: JSON.stringify(cmd.split('/')),
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    })
  ).json();
}

/**
 * Get the current number of records.
 */
async function getRecordCount() {
  const data = await sendUpstashRequest('DBSIZE');
  return data.result;
}

/**
 * Fetch a record from Upstash by key.
 */
async function getRecord(key) {
  const data = await sendUpstashRequest(['GET', key]);
  return data.result;
}

/**
 * Set a record with an expiry time in Upstash.
 */
async function setExpiryRecord(key, value, seconds) {
  return sendUpstashRequest(['SET', key, value, 'EX', seconds]);
}

/**
 * Response for the waiting room.
 */
async function getWaitingRoomResponse() {
  const response = new Response(waitingPage);
  response.headers.set('content-type', 'text/html;charset=UTF-8');
  return response;
}
```

```js filename="edge-functions/waitingPage.js"
export default `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv='refresh' content='5'>
    <title>Waiting Room</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            line-height: 1.4;
            font-size: 1rem;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            padding: 2rem;
            display: grid;
            place-items: center;
            min-height: 100vh;
            background-color: #f3f4f6;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 800px;
            text-align: center;
            background-color: #fff;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        p {
            margin-top: .5rem;
        }

        .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        h1 {
            margin-top: 20px;
            margin-bottom: 20px;
        }

    </style>
</head>

<body>
    <div class='container'>
        <div class="loader"></div>
        <h1>Almost There!</h1>
        <p>Our site is currently at full capacity. Thanks for your patience.</p>
        <p>You'll be redirected shortly. Please do not close your browser.</p>
    </div>
</body>

</html>
`;
```
