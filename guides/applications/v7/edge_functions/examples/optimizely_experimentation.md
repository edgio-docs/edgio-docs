---
title: Edge Experiments with Optimizely
---

Optimizely is a popular experimentation platform that allows you to run A/B tests, multivariate tests, and personalization campaigns on your website. By integrating Optimizely with your {{ PRODUCT }} application, you can leverage the power of experimentation to optimize your user experience and drive better business outcomes.

In this guide, we'll show you how to use {{ PRODUCT }} edge functions to integrate Optimizely experiments into your application. We'll create an edge function that intercepts incoming requests, checks for an Optimizely experiment cookie, and modifies the request to include the appropriate variation based on the experiment configuration.

<ExampleButtons
  title="Edge Experiments with Optimizely"
  siteUrl="https://edgio-community-examples-v7-optimizely-edge-live.glb.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-optimizely-edge-example"
/>

The above example demonstrates using an Optimizely experiment to determine the text direction of a webpage and modifies the HTML content accordingly before responding to the client.

{{ PREREQ.md }}

## Getting Started {/* getting-started */}

To get started, you'll need an Optimizely account and an existing experiment that you want to integrate with your {{ PRODUCT }} application. If you don't have an Optimizely account, you can [sign up for a free trial](https://www.optimizely.com/platform/).

If you don't already have an existing {{ PRODUCT }} application, you can create one using the {{ CLI_NAME }} CLI:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will create a new {{ PRODUCT }} application with the necessary files and configurations to get started.

Next, create the following directories which will be used to store the edge functions and other necessary files:

```bash
mkdir -p edge-functions lib/optimizely lib/polyfills
```

## Install the Optimizely SDK {/* install-the-optimizely-sdk */}

To integrate Optimizely with your {{ PRODUCT }} application, you'll need to install the Optimizely SDK and some additional polyfills Optimizely depends on. You can do this by adding the following dependencies to your project:

```bash
npm install @optimizely/optimizely-sdk crypto-js polyfill-crypto.getrandomvalues uuid
---
yarn add @optimizely/optimizely-sdk crypto-js polyfill-crypto.getrandomvalues uuid
```

## Define Required Polyfills {/* define-required-polyfills */}

The Optimizely SDK relies on the `uuid` (has a dependency on `crypto`) and other timing functions not available in the Edge Function runtime. To ensure the SDK works correctly, you'll need to create the following polyfills:

### crypto Polyfill {/* crypto-polyfill */}

```js filename="./lib/polyfills/crypto.js"
import CryptoJS from 'crypto-js';
import getRandomValues from 'polyfill-crypto.getrandomvalues';

global.crypto = {
  ...CryptoJS,
  getRandomValues,
};
```

### Timer Polyfill {/* timer-polyfill */}

```js filename="./lib/polyfills/timer.js"
let timers = new Map();
let nextTimerId = 1;

(function (global) {
  var timerQueue = [];
  var nextTimerId = 0;

  function runTimers() {
    var now = Date.now();
    var nextCheck = null;

    // Run due timers
    for (var i = 0; i < timerQueue.length; i++) {
      var timer = timerQueue[i];
      if (timer.time <= now) {
        timer.callback.apply(null, timer.args);
        if (timer.repeating) {
          timer.time = now + timer.delay; // schedule next run
          nextCheck =
            nextCheck !== null ? Math.min(nextCheck, timer.time) : timer.time;
        } else {
          timerQueue.splice(i--, 1); // remove non-repeating timer
        }
      } else {
        nextCheck =
          nextCheck !== null ? Math.min(nextCheck, timer.time) : timer.time;
      }
    }

    // Schedule next check
    if (nextCheck !== null) {
      var delay = Math.max(nextCheck - Date.now(), 0);
      setTimeout(runTimers, delay);
    }
  }

  global.setTimeout = function (callback, delay, ...args) {
    var timerId = ++nextTimerId;
    var timer = {
      id: timerId,
      callback: callback,
      time: Date.now() + delay,
      args: args,
      repeating: false,
      delay: delay,
    };
    timerQueue.push(timer);
    return timerId;
  };

  global.clearTimeout = function (timerId) {
    for (var i = 0; i < timerQueue.length; i++) {
      if (timerQueue[i].id === timerId) {
        timerQueue.splice(i, 1);
        break;
      }
    }
  };

  global.queueMicrotask = function (callback) {
    Promise.resolve()
      .then(callback)
      .catch((err) =>
        setTimeout(() => {
          throw err;
        })
      );
  };

  setTimeout(runTimers, 0);
})(global);
```

## Create an Optimizely Datafile {/* create-an-optimizely-datafile */}

The Optimizely SDK requires a datafile that contains the configuration for your experiments. We recommend that you export the datafile from the Optimizely dashboard and save it as a JSON file in your project's `lib/optimizely` directory.

![Export Datafile](/images/v7/edge-functions/optimizely-dashboard.png)

## Create an Edge Function {/* create-an-edge-function */}

Next, you'll need to create an edge function that intercepts incoming requests and modifies the response based on the Optimizely experiment configuration. The edge function will check for an Optimizely experiment cookie in the request and use the Optimizely SDK to determine the appropriate variation to serve.

<Important>
  Optimizely's SDK Lite is used in this example to reduce the size of the code
  bundle. The SDK Lite requires a preloaded datafile, which is referenced in the
  guide. You may choose to fetch the datafile dynamically if your experiment
  configuration changes frequently.
</Important>

Create a new file named `optimizely-experiment.js` in your project's `edge-functions` directory and add the following code:

```js filename="./edge-functions/optimizely-experiment.js"
// Necessary polyfills for the edge function runtime
import '../lib/polyfills/crypto.js';
import '../lib/polyfills/timer.js';

import {
  createInstance,
  eventDispatcher,
} from '@optimizely/optimizely-sdk/dist/optimizely.lite.min.js';
import optimizelyDatafile from '../lib/optimizely/datafile.json';

import {v4 as uuidv4} from 'uuid';

// Constants for Optimizely client configuration
const CLIENT_ENGINE = 'node-sdk';
const COOKIE_NAME = 'experiment-cookie-name';

/**
 * Handles incoming HTTP requests and applies A/B testing using Optimizely.
 *
 * @param {Request} request - The incoming HTTP request.
 * @param {Object} context - The context for this handler
 * @returns {Response} The HTTP response after applying A/B testing logic.
 */
export async function handleHttpRequest(request, context) {
  // Retrieve or generate a unique user ID from cookies
  const userId =
    request.headers
      .get('Cookie')
      ?.split(';')
      .find((cookie) => cookie.trim().startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1] || uuidv4();

  // Create an Optimizely instance with the preloaded datafile and configuration.
  // This edge function uses the Optimizely SDK Lite which requires a preloaded datafile.
  const instance = createInstance({
    datafile: optimizelyDatafile,
    clientEngine: CLIENT_ENGINE,
    eventDispatcher,
  });

  // Early exit if the Optimizely instance isn't properly created
  if (!instance) {
    return new Response('Optimizely instance unavailable.', {status: 500});
  }

  // Ensures the Optimizely instance is ready before proceeding
  await instance.onReady();

  // Create a user context for the retrieved or generated user ID
  const userContext = instance.createUserContext(userId.toString());

  // Your logic based on the Optimizely experiment variation
  const decision = userContext.decide('your_experiment_flag');
  // ...

  // Fetch the original response from the origin
  const response = await fetch(request.url, {
    edgio: {origin: 'your-origin'},
  });

  // Modify the response based on the Optimizely experiment variation
  const updatedResponse = new Response(response.body, response);
  // ...

  // Add the user ID to the response headers as a cookie to ensure the user experience consistency
  const cookie = `${COOKIE_NAME}=${userId}; Path=/; Max-Age=31536000; SameSite=Lax`;
  updatedResponse.headers.append('Set-Cookie', cookie);

  // Return the modified response to the client
  return updatedResponse;
}
```

See our [Optimizely example repo](https://github.com/edgio-docs/edgio-v7-optimizely-edge-example) for a complete implementation of the edge function.

## Running Locally {/* running-locally */}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

## Deploying {/* deploying */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

{{ system_origins_callout.md }}

See [Deployments](/applications/basics/deployments) for more information.
