---
title: JWT Verification
---

JWT verification can be used to verify the authenticity of a JSON Web Token (JWT) sent by a client. This can be useful for ensuring that the client is authorized to access a protected resource, or for verifying the identity of the client. Handling this verification at the edge can help to offload the work from the origin server, and can provide a more secure and efficient way to verify the JWT.

<ExampleButtons
  title="JWT Verification"
  siteUrl="https://edgio-community-examples-v7-jwt-verification-test.glb.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-jwt-verification-example"
/>

## Router Configuration {/* router-configuration */}

In the {{ PRODUCT }} router, you can use the `edge_function` feature to specify the path to the edge function that will handle the JWT verification. We expect the client to send a POST request with a JSON body containing the JWT token to be verified. The edge function will then validate the token and return a response with the validation result.

```js filename="routes.js"
import { Router, edgioRoutes } from '@edgio/core';

export default new Router()
  .use(edgioRoutes)
  .post('/jwt', {
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
import { JWT } from './JWT.js';

/**
 * Handle an HTTP request to validate a JWT.
 *
 * @param {Request} request - The incoming HTTP request.
 * @param {any} context - Context providing runtime information.
 * @returns {Response} HTTP response with validation result.
 */
export async function handleHttpRequest(request, context) {
  // Extract the JWT token from the request body
  const { token } = await request.json();

  // Retrieve the secret key from environment variables
  const secret = context.environmentVars['JWT_SECRET'] || 'your-256-bit-secret';

  // Initialize response structure
  const resp = { valid: false };

  // Create JWT instance with the token and secret
  const jwt = new JWT(token, secret);

  // Validate the JWT
  const isValid = jwt.validate();

  // If valid, update response with additional JWT info
  if (isValid) {
    resp.valid = true;
    resp.payload = jwt.payloadObject(); // Extract payload
    resp.alg = jwt.algUsed(); // Extract algorithm used
  }

  // Return the response with appropriate HTTP status code
  return new Response(JSON.stringify(resp), {
    status: isValid ? 200 : 401, // 200 OK for valid token, 401 for invalid
    headers: { 'Content-Type': 'application/json' }, // Set response content type
  });
}
```

```js filename="edge-functions/JWT.js"
import { Buffer } from 'buffer';
import * as Base64 from 'crypto-js/enc-base64url';
import { HmacSHA256, HmacSHA384, HmacSHA512 } from 'crypto-js';

// Function to decode base64 strings
const base64decode = (str) => Buffer.from(str, 'base64').toString();

// Hashing functions mapped to JWT algorithms
const hashLibraries = {
  HS256: HmacSHA256,
  HS384: HmacSHA384,
  HS512: HmacSHA512,
};

export class JWT {
  constructor(token, secret) {
    const [header_base64, payload_base64, origSignature] = token.split('.');

    this.header_base64 = header_base64;
    this.payload_base64 = payload_base64;

    try {
      // Decode header and payload from base64
      this.header = JSON.parse(base64decode(header_base64));
      this.payload = JSON.parse(base64decode(payload_base64));
    } catch (e) {
      // Invalid payload or header, initialize empty objects
      this.header = {};
      this.payload = {};
    }

    this.origSignature = origSignature;
    this.hasher = hashLibraries[this.header.alg];
    this.secret = secret;
  }

  // Validates the JWT token
  validate() {
    try {
      const calculatedSignature = Base64.stringify(
        this.hasher(`${this.header_base64}.${this.payload_base64}`, this.secret)
      );
      return calculatedSignature === this.origSignature;
    } catch (e) {
      return false;
    }
  }

  // Returns the payload object
  payloadObject() {
    return this.payload;
  }

  // Returns the algorithm used in JWT
  algUsed() {
    return this.header.alg;
  }
}
```
