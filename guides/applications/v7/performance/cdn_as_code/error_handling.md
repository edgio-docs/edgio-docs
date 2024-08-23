---
title: Error Handling
---

This guide covers how to handle origin errors at the edge to display custom error pages or retry requests from a different origin.

The examples found in this guide can be found in the [edgio-v7-error-handling-example](https://github.com/edgio-docs/edgio-v7-error-handling-example) repository.

## The `catch` method {/* the-catch-method */}

EdgeJS provides a [`catch`](/docs/v7.x/api/core/classes/router_Router.default.html#catch) method that you can use to responses that result in an error. There are two main ways to use this method:

## Displaying a custom error page {/* displaying-a-custom-error-page */}

In this example we catch all responses with a 5xx status code and serve a static error page with a 500 status code:

```js
import {Router} from '@edgio/core';

export default new Router()
  .get('/500', ({serveStatic}) => {
    // Serve a static error page with a 500 status code
    serveStatic('public/500.html', {
      statusCode: 500,
    });
  })
  .catch(/^5.*/, {
    // Match all responses with a 5xx status code and redirect internally to /500
    response: {
      set_status_code: 302, // redirect
    },
    headers: {
      set_response_headers: {
        location: '%{scheme}://%{host}/500', // Set the path to /500
      },
    },
    // This makes the redirect invisible to the client. They will just see the 500.html page.
    // You can leave this out to send the redirect all the way back to the client.
    url: {
      follow_redirects: true,
    },
  });
```

## Retrying the request from a different origin {/* retrying-the-request-from-a-different-origin */}

In this example, we have a legacy origin that we want to use as a fallback if the primary origin returns a 5xx status code. Assuming you have an origin
called "legacy" configured in your `{{ CONFIG_FILE }}` file, you can use the `set_origin` option to retry the request from the legacy origin:

```js
import {Router} from '@edgio/core';

export default new Router()
  .get('/legacy/:path*', {
    origin: {
      // This will retry the request from the legacy origin if the primary origin returns a 5xx status code
      set_origin: 'legacy',
    },
    url_rewrite: [
      // strip the "/legacy" prefix from the path
      {source: '/legacy/(.*)', syntax: 'regexp', destination: '/$1'},
    ],
  })
  .match(
    // Redirect all 5xx responses to the same path with "/legacy" prepended (unless we already have a "/legacy" in the path)
    {path: {not: /^\/legacy\/.*/}, response: {status_code: /5.*/}},
    {
      response: {
        set_status_code: 302,
      },
      url: {
        // This makes the redirect invisible to the client. They will just see the 500.html page.
        follow_redirects: true,
      },
      headers: {
        set_response_headers: {
          // Redirect to the same URL with "/legacy" prepended
          location:
            '%{scheme}://%{host}/legacy%{path}%{is_args}%{query_string}',
        },
      },
    }
  );
```

Note that here we use `match({ response: { status_code: /5.*/}})`. This is equivalent to `catch(/5.*/)` but allows us to add an additional criteria to exclude paths starting with "/legacy" from being retried.
