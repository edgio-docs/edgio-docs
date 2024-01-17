---
title: Migrating from CloudFront Functions to Edge Functions
---

## Overview of Migrating from CloudFront Functions to Edge Functions

This guide offers a high-level overview and illustrative examples for migrating from CloudFront Functions to {{ PRODUCT }} Edge Functions. It is designed to help developers familiar with CloudFront Functions understand the transition to Edge Functions. Rather than providing a detailed comparison or a comprehensive migration pathway, this guide focuses on highlighting key aspects and offering example code snippets for a general understanding of the migration process.

### Key Information {/* key-information */}

1. **Function Structure**

   - CloudFront: `async function handler(event) { ... }`
   - {{ PRODUCT }}: `export async function handleHttpRequest(request, context) { ... }`

2. **Handling Requests**

   - In {{ PRODUCT }}, process incoming requests and generate responses using the `handleHttpRequest` function.

3. **Origin Requests**

   - Specify the origin in `edgio.config.js` and include it in the `fetch()` call in the edge function.

4. **Response Handling**

   - Similar to CloudFront Function, {{ PRODUCT }} allows modifying response properties prior to returning the response.

5. **Headers and Status**

   - Both platforms allow setting and modifying response headers and status.

6. **JSON Handling**

   - Ensure proper content-type handling and parsing for JSON responses in both platforms.

## Examples {/* examples */}

### URL Redirect Based on Country {/* url-redirect-based-on-country */}

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
