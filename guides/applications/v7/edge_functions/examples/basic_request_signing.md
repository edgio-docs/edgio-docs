---
title: Basic Request Signing
---

{{ ef_req_edgejs_deps.md }}

Request signing is a technique used to verify the authenticity and integrity of a request. It involves adding a signature to the request, which is generated using a secret key and specific request parameters. This signature can then be verified by the recipient to ensure that the request has not been tampered with and originated from a trusted source.

Request signing can be used in various scenarios, such as API authentication, secure communication between services, and preventing replay attacks. By including a signature with each request, both the sender and receiver can have confidence in the integrity and authenticity of the data being exchanged.

<ExampleButtons
  title="Request Signing"
  siteUrl="https://edgio-community-examples-v7-edge-functions-live.edgio.link/example/signed-request/sign/foo/bar"
  repoUrl="https://github.com/edgio-docs/edgio-examples/tree/main/examples/v7-edge-functions"
/>

## Router Configuration {/* router-configuration */}

In the {{ PRODUCT }} router, you can use the `edge_function` feature to specify the path to the edge function that will handle the request signing and verification. Because this edge function is designed to handle both signing and verification, we'll match any request beginning with `/sign/` or `/verify/`, and capture the remaining path for use in the edge function.

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match(/\/(sign|verify)\/(.*)/, {
    edge_function: './edge-functions/main.js',
  });
```

## Edge Function {/* edge-function */}

The edge function will be responsible for generating a signed URL for the given request, or verifying the signature of a request and forwarding it to the origin. The edge function will be invoked for any request that matches the route above, so we'll need to check the request path to determine whether we are signing or verifying the request.

In either case, we'll need to generate a signature using a cryptographic hash function. In this example, we'll use the [HMAC-SHA1](https://en.wikipedia.org/wiki/HMAC) algorithm, which is a widely used cryptographic hash function. The signature will be generated using a secret key, which should be defined as an environment variable in the {{ PORTAL }}. The secret key should never be shared publicly, and should be kept private to ensure that the signature cannot be forged.

<Callout type="important">

The Edge Function runtime does not currently support a native crypto library, so a third-party library to generate the signature is needed. In this example, we'll use the [crypto-js](https://github.com/brix/crypto-js) library.

</Callout>

```js filename="edge-functions/main.js"
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

export async function handleHttpRequest(request, context) {
  // ** IMPORTANT **
  // Secret key should be defined as an environment variable in the Edgio console
  const secretKey = '$0m3th!ngS3cr3t'; // context.environmentVars.REQ_SIGNING_SECRET_KEY;

  if (request.url.includes('/sign/')) {
    return generateSignedUrl(request, secretKey);
  }

  return verifyAndFetch(request, secretKey);
}

/**
 * Generates a signed URL for the given URL and secret key
 * @param {URL} url
 * @param {string} key
 */
async function generateSignedUrl(request, key) {
  const url = new URL(request.url);

  // Replace /sign/ with /verify/ in the URL since we are generating a signed URL for verification
  url.pathname = url.pathname.replace('/sign/', '/verify/');

  const expirationMs = 1000 * 60 * 5; // 5 minutes
  const expiry = Date.now() + expirationMs;
  const dataToAuthenticate = url.pathname + expiry;

  const hash = HmacSHA1(dataToAuthenticate, key);
  const base64Mac = Base64.stringify(hash);

  url.searchParams.set('mac', base64Mac);
  url.searchParams.set('expiry', expiry.toString());

  // respond with the signed URL that can be used to verify the request
  return new Response(url.toString());
}

/**
 * Verifies the MAC and expiry of the given URL. If the URL is valid, the request is forwarded to the origin.
 */
async function verifyAndFetch(request, key) {
  const invalidResponse = (reason) =>
    new Response(`Invalid request - ${reason}`, {status: 403});
  const url = new URL(request.url);

  if (!url.searchParams.has('mac') || !url.searchParams.has('expiry')) {
    return invalidResponse('Missing MAC or expiry');
  }

  const expiry = Number(url.searchParams.get('expiry'));
  const dataToAuthenticate = url.pathname + expiry;

  const receivedMacBase64 = url.searchParams.get('mac');
  const receivedMac = Base64.parse(receivedMacBase64);

  const hash = HmacSHA1(dataToAuthenticate, key);
  const hashInBase64 = Base64.stringify(hash);

  // Ensure that the MAC is valid
  if (hashInBase64 !== receivedMacBase64) {
    return invalidResponse('Invalid MAC');
  }

  // Ensure that the URL has not expired
  if (Date.now() > expiry) {
    return invalidResponse('URL has expired');
  }

  // Forward the remaining request path after **/verify/* to the origin
  url.pathname = url.pathname.split('/verify/')[1];

  return fetch(url.toString(), {
    edgio: {origin: 'web'},
  });
}
```
