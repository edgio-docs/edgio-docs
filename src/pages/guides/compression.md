---
title: Compression
---

This guide covers the {{ PRODUCT_NAME }} response compression support.

## Accept-Encoding {/*accept-encoding*/}

When requesting data via HTTP from the {{ PRODUCT_NAME }} servers, browsers include the `accept-encoding` header to indicate which data compression formats the browser supports. Modern browsers accept multiple compression formats, [Accept-Encoding Header Details are here.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) This header is required by {{ PRODUCT_NAME }} to trigger compression of responses.

### {{ PRODUCT_NAME }} supports {/*layer0-supports*/}

* `gzip` for all versions
* `br` (Brotli) for versions >= `4.11.0`

## Enabling Brotli compression {/*enabling-brotli-compression*/}

To enable Brotli (`br`) compression you need to ensure your project uses a version of `{{ PACKAGE_NAME }}` >= `4.11.0`. To upgrade `{{ PACKAGE_NAME }}` to the latest version in your project use `{{ CLI_NAME }} use latest` and redeploy your project.

### Gzip compression support

Gzip is supported in the following ways:

* Pass-through of upstream Gzip responses if the browser accepts Gzip.
* Encoding of upstream non-encoded responses if the browsers accepts Gzip or Gzip and Brotli.

### Brotli compression support

Brotli is supported in the following ways:

* Pass-through of upstream Brotli responses if the browser accepts Brotli.
* Encoding of upstream non-encoded responses if the browsers *only* accepts Brotli.

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
