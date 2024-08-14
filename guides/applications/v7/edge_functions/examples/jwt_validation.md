---
title: JWT Validation
---

{{ ef_req_edgejs_deps.md }}

This example uses Edge Functions to validate a JSON Web Token (JWT) sent by a client. Handling this validation at the edge can help to offload the work from the origin server, and offer a more secure and efficient way to verify the token. Additionally, you can extend this edge function to check whether the client is authorized to access a protected resource or to verify the client's identity.

<ExampleButtons
  title="JWT Validation"
  siteUrl="https://edgio-community-examples-v7-ef-jwt-validation-live.glb.edgio.link/"
  repoUrl="https://github.com/edgio-docs/v7-ef-jwt-validation"
/>

## Router Configuration {/* router-configuration */}

In the {{ PRODUCT }} router, you can use the `edge_function` feature to specify the path to the edge function that will handle the JWT validation. 

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router().use(edgioRoutes).post('/jwt', {
  edge_function: './edge-functions/validate.js',
});
```

## Edge Function {/* edge-function */}

This edge function uses the [jsrsasign libary](https://github.com/kjur/jsrsasign) to validate a JWT signed with a HS256, HS384, or HS512 algorithm. It expects to receive a `POST` request with the following JSON payload:

-   **token:** Required. This parameter must be set to the JWT that will be validated. 
-   **pubKey:** By default, the JWT will be decoded using a default signing key (i.e., `your-256-bit-secret`) defined within the `JWT_SECRET` environment variable. However, you may decode it using a custom signing key by defining a `pubKey` parameter. 

    <Important>

    This example allows you to pass a signing key to make it easier to test JWT validation through this edge function. However, signing keys should be kept secret. For example, a client should not pass a signing key within the request payload.

    </Important>

Upon completion, this edge function will report the result in the response.

**Sample curl request:**

```bash
curl -X POST -d '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}' https://edgio-community-examples-v7-ef-jwt-validation-live.glb.edgio.link/jwt
```

**Sample response:**

`{"valid":true,"alg":"HS256","payload":{"sub":"1234567890","name":"John Doe","iat":1516239022}}`

Alternatively, you can validate JWTs by submitting the form on the following web page:

[https://edgio-community-examples-v7-ef-jwt-validation-live.glb.edgio.link/](https://edgio-community-examples-v7-ef-jwt-validation-live.glb.edgio.link/)

### Code {/*code*/}

This edge function's code:

```js filename="edge-functions/validate.js"
import { KJUR, KEYUTIL } from 'jsrsasign'
import { Buffer } from 'buffer'

// Set up some polyfills to allow this code to run locally and when deployed:
global.process = global.process || { env: {} }
const fromBase64 = (str) => Buffer.from(str, 'base64').toString()

export async function handleHttpRequest(request, context) {
  Object.assign(process.env, context.environmentVars)

  // Extract the toke and any other objects from the request.
  const { token, ...other } = await request.json()

  // Split out the header and payload from the cleartext token and determine the right algorithm to use.
  const [header, payload] = token.split('.')
  const { alg } = JSON.parse(fromBase64(header))

  let validationComponent = null
  let valid = false
  const resp = { valid }

  try {
    // For HSxxx algorithms, the validation requires a plaintext secret key.
    // For RSxxx, ESxxx, and PSxxx algorithms, a public key is required instead.
    // The public key is expected to be part of the request payload and be named pubKey;
    // the secret key SHOULD NOT be part of the payload.
    // Note that for demo purposes (being able to set an arbitrary signing key) this
    // version of the EF will use the secret from `pubKey` if it exists.
    if (/^HS/i.test(alg)) {
      if ('pubKey' in other) {
        validationComponent = other.pubKey
      } else {
        validationComponent = process.env.JWT_SECRET
      }
    } else if (/^[REP]S/i.test(alg)) {
      validationComponent = KEYUTIL.getKey(other.pubKey)
    } else {
      return new Response('Invalid JWT alg specified.', { status: 401 })
    }

    valid = KJUR.jws.JWS.verifyJWT(token, validationComponent, { alg: [alg] })
    if (valid === true) {
      // Only parse the payload if the signature is valid.
      const decodedPayload = JSON.parse(fromBase64(payload))
      Object.assign(resp, { valid, alg, payload: decodedPayload })
    }
  } catch (e) {
    // Handle exceptions here.
  }

  return new Response(JSON.stringify(resp), {
    status: valid ? 200 : 401
  })
}
```