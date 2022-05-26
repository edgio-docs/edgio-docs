---
title: JWT and EdgeJS
---

This document provides background information on JSON Web Tokens (JWT) and explains how you can use them to secure your content when hosting your site on {{ PRODUCT_NAME }}, which uses Google Authenticator as the authentication provider. If you already have a good understanding of JWT, you can skip directly to [Using JWT with {{ PRODUCT_NAME }}](#using-jwt-with-product).

## What is JWT?  {/*what-is-jwt-web-token*/}

JWT is an open standard ([rfc7519](https://datatracker.ietf.org/doc/html/rfc7519)) message format for authorization and information exchange. 
<Callout type="info">
  JWT is not a protocol.
</Callout>

Tokens are:

* Compact and self-contained: A token is represented in JSON, a terse message format. 
* URL-safe: Because a token may contain non-web safe characters, it is URL-encoded. 
* Secure: The token is signed either assymetrically with a public/private key, or symmetrically with a secret. This guaranties the token was not modified in transit. Although tokens can also be encrypted, they seldom are because web clients need to directly read and interpret the token. Also, browers would need to store the encryption secret but don't have a secure local storage capability.

  <Callout type="info">
    {{ PRODUCT_NAME }} requires that the signature be signed with a secret.
  </Callout>

Tokens contain all user data in the `payload` part. Tokens are *sessionless* and not stored on the server, only in the client.

## JWT Structure  {/*jwt-structure*/}

JWT contains three parts separated by a "." character: a header, payload, and signature. Each part is a base-64 encoded string of characters and numbers. 

* Header: Metadata that describes the token type and the algorithm used to generate or validate the signature.

* Payload: Contains the token's *claims* or *claim set*. The word *claim* is a general security term that refers to assertions the token-provider makes about a person or other entity that requests access to your resources.

* Signature: Formed by signing the encoded header and encoded payload using the the algorithm in the header. 

<Callout type="info">
The three types of claims are:

  * Registered: Defined by the JWT specification. See [rfc7519](https://datatracker.ietf.org/doc/html/rfc7519) for a complete list.

  * Public: Custom claims that anyone can define.

  * Private: Claims, neigher registered, not public that are exclusive to parties that agree to use them and have unique meaning to the parties.

</Callout>

### Example Structure {/*example-structure*/}

`eyJhbGciOiJIMjU2IiwgInR5cCI6IkpXVCJ9.
eyJzdWIiOiI1YTg5OTEyZDdlZiIsICJuYW1lIjoiTmF5YSBTaGFybWEiLCAiaWF0IjoiMTY1MzMyNjk3NSJ9.
b6abb1b360590a1b897ffc388d40141bca287a3fd1f984ddef0ec135ce5efffc
`

If you were to decode a token's parts, you would see something like the following:

#### Header {/*header*/}

The header contains the signing algorithm and the token type:
```json
{"alg":"H256", "typ":"JWT"}
```

#### Payload  {/*payload*/}

The payload contains the claims:
```json
{"sub":"5a89912d7ef", "name":"Naya Sharma", "iat":"1653326975"}
```
In this case, the claims are:

* `sub`: The subject of the token. It often represents a user with email, user ID, and so on.

* `name`, `iat`: The subject's name and the UNIX epoch time when the token was created.

#### Signature  {/*signature*/}

If you try to decode the signature, you will get undisplayable characters because it is simply binary data.

## Tokens, Cookies, and Headers

Depending on the authentication provider, tokens are returned either in a cookie or in the `Bearer` token of the `Authorization` header. If returned in a cookie, the cookie name usually varies depending on the provider.

## Using JWT with {{ PRODUCT_NAME }} {/*using-jwt-with-product*/}

This section shows a sample router configuration using {{ PRODUCT_NAME }}'s EdgeJS routing capabilites (see [Routing with EdgeJS](/guides/routing)) to integrate JWT into your application.

### About the Sample
The properties in this example include a secret that has been defined as the `JWT_SECRET` environment variable (see [Creating and Editing Environment Variables](/guides/environments#creating-environment-variables)) and accessed using `process.env` (see [Accessing Environment Variables](/guides/environments#accessing-environment-variables)). The actual name of the environment variable is irrelevant as long as you access it in your router code under the correct name.

The example also shows how to proxy requests to an origin that must be defined in `layer0.config.js` (see [layer0.config.js](/guides/layer0_config)).

### Details

{{ PRODUCT_NAME }} allows you to check tokens using the `verifyJWT` method accessed through a router that you should add to your `routes.js` or `routes.ts` file, ideally at the top-level.

Two `match` methods are included:

* The first `match` is a catch-all route at the top of the router. The second argument to `match` is a reference to the `verifyJWT` method, which is called and receives a `verifyJWT` options object as an argument. (An explanation of the options follows the code sample.)

* The second  `match` matches all routes under `/secret` and represents all content requests. At this point, the requestor has been authenticated, so the second argument is the `proxy` method that proxies the request to to the origin defined in `layer0.config.js`. See [Routing with EdgeJS](/guides/routing) for additional information about routers and matches.

<Callout type="info">
  This example requires that all routes to be subordinate to the `/secret` route.
</Callout>

```js
new Router()
  .match('/secret/:path*', ({ verifyJWT }) => {
    verifyJWT({
      algo: 'HS512',                
      secret: process.env['JWT_SECRET'], 
      header: 'Authorization',
      cookie: 'next-auth.session-token',       
      redirectExpiredAbsent: '/expired',
      redirectInvalid: '/invalid',
      returnUrlParamName: 'origUrl'
    })
  })
  .match('/secret/content-that-only-signed-in-users-should-see', ({ proxy }) => {
    proxy('origin')
  })
```
Properties in the preceding example are described in this table:

| Property | Required/Optional | Description |
| -------- | ----------------- | ----------- | 
| `algo` | Required | Algorithm used to sign the token. Both symmetric and asymmetric are supported. {{PRODUCT_NAME}} supports these algorithms:<ul><li>ES256</li><li>ES384</li><li>ES512</li><li>HS512</li><li>HS256</li> <li>HS384</li><li>RS256</li><li>RS384</li><li>RS512</li></ul> To prevent  hacking of the token, {{PRODUCT_NAME}} does not accept `none` as a value for `alg`.| 
| `secret` | Required | Should either be an armoued (PEM-encoded including header and fooder) public key for the asymmetric algorithms, or a simple secret string for the symmetric algorithms. | 
| `header` | Optional | Header to extract the token from. If the value of the header is prefixed with the string `.*Bearer\ `, the string will be ignored and only the bytes following it will be decoded as the JWT. | 
| `cookie` | Optional | The cookie key to extract the token from. Used in conjunction with the `header` option. For example given a request header `Cookie: a=eyJh...;b=session;c=etc`, setting the value `a` in this option will extract the `a` cookie. | 
| `redirectExpiredAbsent` | Optional | The redirect URL to use when the JWT is expired or absent. JWT expiry complies with [rfc7519](https://datatracker.ietf.org/doc/html/rfc7519) `exp` claim behaviour. **Note**: JWTs rejected due to `nbf` ("not before") claim invalidity are also subject to this redirect, because such tokens are understood to be "expired" in that they not valid yet. | 
| `redirectInvalid` | Optional | The URL users are redirected to if the token is non-expired but invalid for any reason other than being absent; for example, a bad signature. | 
| `returnUrlParamName` | Optional | When redirecting to the `redirectExpiredAbsent` or `redirectInvalid` URLs, the value of this option is added as a query/search parameter to the redirect URL as the original URL, for example to return the user to the page that triggered the redirect to login. |

## Authorization and Request Flow {/*authorization-flow*/}

Assuming you have configured the router as explained above and you have defined a secret as an environment variable, the request and response flow looks like this:

1. The user attempts to access your protected content.

1. Because the user has not yet authenticated, some kind of login form is presented and the user submits login credentials (typically email and password) to the Google Authenticator server.

2. The server returns the credentials as a GWT.

3. The first router match in the code sample verifies the token using the `secret`. 

4. If the credentials are correct, the server issues a response, providing the token either in the response body or header.

5. For each subsequent request for a resource, the second router match proxies the request to a secure backend.

## GitHub Sample

To see a sample usage in a repo you can clone and experiment with, please see our [next-auth-example](https://github.com/layer0-docs/next-auth-example/blob/main/routes.js).