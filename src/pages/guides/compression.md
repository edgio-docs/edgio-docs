---
title: Compression
---

This guide covers the {{ PRODUCT_NAME }} response compression support.

## Accept-Encoding {/*accept-encoding*/}

When requesting data via HTTP from the {{ PRODUCT_NAME }} servers, browsers include the `accept-encoding` header to indicate which data compression formats the browser supports. Modern browsers accept multiple compression formats, [Accept-Encoding Header Details are here.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) This header is required by {{ PRODUCT_NAME }} to trigger compression of responses. 

<a id="layer0-supports"></a>

## Compression Support {/*compression-support*/}

{{ PRODUCT }} supports:

* `gzip` for all versions
* `br` (Brotli) for versions >= `4.11.0`

### Gzip compression support {/*gzip-support*/}

Gzip is supported in the following ways:

* Pass-through of upstream Gzip responses if the browser accepts Gzip.
* Encoding of upstream non-encoded responses if the browsers accepts Gzip or Gzip and Brotli.

### Brotli compression support {/*brotli-support*/}

Brotli is supported in the following ways:

* Pass-through of upstream Brotli responses if the browser accepts Brotli.
* Encoding of upstream non-encoded responses if the browsers *only* accepts Brotli.

### Enabling Brotli compression {/*enabling-brotli-compression*/}

To enable Brotli (`br`) compression you need to ensure your project uses a version of `{{ PACKAGE_NAME }}` >= `4.11.0`. To upgrade `{{ PACKAGE_NAME }}` to the latest version in your project use `{{ FULL_CLI_NAME }} use latest` and redeploy your project.

## What is Compressed? {/*what-is-compressed*/}

When {{ PRODUCT_NAME }} servers receive a request they inspect the `accept-encoding` header. The following logic is used to determine response compression:

* If the response is not a [compressible type](#compressible-types), return uncompressed.
* Else if no compression is accepted, then request no accepted encoding upstream and pass-through uncompressed upstream response.
* Else if Brotli is supported (`{{ PACKAGE_NAME }}` >= `4.11.0`) then:
    * If `br` and `gzip` are both accepted, then request `br, gzip` upstream and then:
        * If upstream returned uncompressed response, compress with `gzip`.
        * Pass-through the upstream response in all other cases.
    * Else if only `br` is accepted, then request `br` upstream and then:
        * If upstream returned uncompressed response, compress with `br`.
        * Pass-through the upstream `br` upstream response.
    * Else (only `gzip` is accepted), then request `gzip` upstream and then:
        * If upstream returned uncompressed response, compress with `gzip`.
        * Pass-through the upstream `gzip` upstream response.
* Else (only `gzip` is accepted, no Brotli support), then:
    * If upstream returned uncompressed response, compress with `gzip`.
    * Pass-through the upstream `gzip` upstream response.

## Compressible Types {/*compressible-types*/}

A response is considered compressible if the `content-type` contains one of these strings:

* `text/html`
* `application/x-javascript`
* `text/css`
* `application/javascript`
* `text/javascript`
* `application/json`
* `application/vnd.ms-fontobject`
* `application/x-font-opentype`
* `application/x-font-truetype`
* `application/x-font-ttf`
* `application/xml`
* `font/eot`
* `font/opentype`
* `font/otf`
* `image/svg+xml`
* `image/vnd.microsoft.icon`
* `text/plain`
* `text/xml`

or the url ends in one of these file extensions:

* `.css`
* `.js`
* `.html`
* `.eot`
* `.ico`
* `.otf`
* `.ttf`
* `.json`
* `.svg`

## Applying Brotli compression in serverless {/*applying-brotli-compression-in-serverless*/}

{{ PRODUCT_NAME }} serverless supports Brotli encoding starting with version `4.14.0` but, as described above, only for the [content types](#compressible-types) recognized as compressible by the platform and if the browsers *only* accepts Brotli.

If you wish to implement a custom criteria to apply the Brotli compression yourself, you can do this by leveraging the built-in `brotliCompressSync`.

```js
import { brotliCompressSync } from 'zlib'

const BROTLI_ENCODING_REGEX = /\bbr\b/

// This function will respond with Brotli encoded body if the user agent
// accepts Brotli.
// Prior to invoking this function, evaluate all the custom criteria that you want to apply
// (e.g. content type, caching, size of the response, etc). If all those are satisfied then
// invoke this function which will then check if the downstream is Brotli compatible and
// if so compress the body and respond with it, returning true, otherwise returning false.
// You can of course optimize this to first check the downstream compatibility
// before even considering other criteria.
const sendBrotliEncoded = (req, res, body) => {
  const acceptEncoding = req.getHeader('accept-encoding')
  const acceptBrotliEncoding = BROTLI_ENCODING_REGEX.test(acceptEncoding)
  if (!acceptBrotliEncoding) {
    return false
  }

  const encodedBody = brotliCompressSync(Buffer.from(body))
  res.setHeader('content-length', Buffer.byteLength(encodedBody))
  res.setHeader('content-encoding', 'br')
  res.send(encodedBody)
  return true
}
```

You would need to invoke the above just prior to sending back the response, similar to this:

```js
  const useBrotliEncoding = /* Evaluate all the custom criteria that you would like to apply */;
  if (!useBrotliEncoding || !sendBrotliEncoded(req, res, body)) {
    res.send(body)
  }
```
