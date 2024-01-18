---
title: Migrating from Amazon CloudFront Functions to Edge Functions
---

This guide offers a high-level overview and illustrative examples for migrating from Amazon CloudFront Functions to {{ PRODUCT }} Edge Functions. It is designed to help developers familiar with Amazon CloudFront Functions understand the transition to Edge Functions by offering sample code for a general understanding of the migration process.

## Function Signature {/* function-signature */}

- Amazon CloudFront: `async function handler(event) { ... }`
- {{ PRODUCT }}: `export async function handleHttpRequest(request, context) { ... }`

To convert from a CloudFront function to an {{ PRODUCT }} Edge function, you need to make the following changes:

- Rename the function from `handler` to `handleHttpRequest` and export it.
- Change the function arguments from `event` to `request` and `context`.
- Adjust any references to specific CloudFront properties or methods to their equivalent {{ PRODUCT }} counterparts. See [Edge Function parameters](/guides/edge_functions#edge-function-parameters).
- Return a `Response|Promise<Response>` instance instead of a CloudFront-to-viewer HTTP response object.

## Origin Configuration {/* origin-configuration */}

In order to fetch content from an origin, you need to specify the origin in `edgio.config.js` and include it in the `fetch()` call in the edge function. See [origin requests using `fetch()`](/guides/v7/edge_functions#origin-requests-using-fetch) for configuration requirements.

## Examples {/* examples */}

### URL Redirect Based on Country {/* url-redirect-based-on-country */}

The following example shows how to redirect users from a specific country to a different URL. The client's geolocation information is made available in the `context.geo` object.

#### CloudFront Function Snippet {/* url-redirect-based-on-country-cloudfront-function */}

[Original CloudFront Function code](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-redirect-url.html)

```js
async function handler(event) {
  const request = event.request;
  const headers = request.headers;
  const host = request.headers.host.value;
  const country = Symbol.for('DE'); // Choose a country code
  const newurl = `https://${host}/de/index.html`; // Change the redirect URL to your choice

  if (headers['cloudfront-viewer-country']) {
    const countryCode = Symbol.for(headers['cloudfront-viewer-country'].value);
    if (countryCode === country) {
      const response = {
        statusCode: 302,
        statusDescription: 'Found',
        headers: {location: {value: newurl}},
      };

      return response;
    }
  }
  return request;
}
```

#### Edge Function Equivalent {/* url-redirect-based-on-country-edge-function */}

```js
export async function handleHttpRequest(request, context) {
  const headers = request.headers;
  const country = 'DE'; // Choose a country code
  const newUrl = `${request.url}/${country}`; // Change the redirect URL to your choice

  if (context.geo.country === country) {
    return new Response(null, {
      status: 302,
      statusText: 'Found',
      headers: {
        location: newUrl,
      },
    });
  }

  return fetch(request.url, {
    edgio: {origin: 'echo'},
  });
}
```

### Add Client IP to Request {/* add-client-ip-to-request */}

The following example shows how to add the client's IP address to the request headers. The client's IP address is made available in the `context.client` object.

#### CloudFront Function Snippet {/* add-client-ip-to-request-cloudfront-function */}

[Original CloudFront Function code](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-true-client-ip-header.html)

```js
async function handler(event) {
  var request = event.request;
  var clientIP = event.viewer.ip;

  //Add the true-client-ip header to the incoming request
  request.headers['true-client-ip'] = {value: clientIP};

  return request;
}
```

#### Edge Function Equivalent {/* add-client-ip-to-request-edge-function */}

```js
import '../../utils/polyfills/URL';

export async function handleHttpRequest(request, context) {
  // Retrieve the client's IP address from the context object
  const clientIP = context.client.dst_addr;

  // Create a new request object to make it mutable
  const newRequest = new Request(request.url, request);

  // Add the true-client-ip header to the incoming request
  newRequest.headers.set('true-client-ip', clientIP);

  // Continue with the modified request
  return fetch(newRequest, {
    edgio: {origin: 'echo'},
  });
}
```

### Add Security Headers to Response {/* add-security-headers-to-response */}

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. The following example shows how to add CSP headers to the response.

#### CloudFront Function Snippet {/* add-security-headers-to-response-cloudfront-function */}

[Original CloudFront Function code](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-security-headers.html)

```js
async function handler(event) {
  const response = event.response;
  const headers = response.headers;

  // Set HTTP security headers
  // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation
  headers['strict-transport-security'] = {
    value: 'max-age=63072000; includeSubdomains; preload',
  };
  headers['content-security-policy'] = {
    value:
      "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'",
  };
  headers['x-content-type-options'] = {value: 'nosniff'};
  headers['x-frame-options'] = {value: 'DENY'};
  headers['x-xss-protection'] = {value: '1; mode=block'};
  headers['referrer-policy'] = {value: 'same-origin'};

  // Return the response to viewers
  return response;
}
```

#### Edge Function Equivalent {/* add-security-headers-to-response-edge-function */}

```js
export async function handleHttpRequest(request, context) {
  // Fetch the response from the 'echo' origin
  const response = await fetch(new Request(request.url, request), {
    edgio: {
      origin: 'echo',
    },
  });

  // Set HTTP security headers
  response.headers.set(
    'strict-transport-security',
    'max-age=63072000; includeSubdomains; preload'
  );
  response.headers.set(
    'content-security-policy',
    "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'"
  );
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('x-xss-protection', '1; mode=block');
  response.headers.set('referrer-policy', 'same-origin');

  // Return the response to the client
  return response;
}
```
