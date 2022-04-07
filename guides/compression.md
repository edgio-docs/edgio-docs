# Compression

This guide covers the {{ PRODUCT_NAME }} response compression support.

## Accept-Encoding

When requesting data via HTTP from the {{ PRODUCT_NAME }} servers, browsers include the `accept-encoding` header to indicate which data compression formats the browser supports. Modern browsers accept multiple compression formats, [Accept-Encoding Header Details are here.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) This header is required by {{ PRODUCT_NAME }} to trigger compression of responses. 

### {{ PRODUCT_NAME }} supports 

* `gzip` for all versions
* `br` (Brotli) for versions >= `4.11.0`

## Enabling Brotli compression

To enable Brotli (`br`) compression you need to ensure your project uses a version of `{{ PACKAGE_NAME }}` >= `4.11.0`. To upgrade `{{ PACKAGE_NAME }}` to the latest version in your project use `{{ CLI_NAME }} use latest` and redeploy your project.


## What is Compressed?

When {{ PRODUCT_NAME }} servers receive a request they inspect the `accept-encoding` header. The following logic is used to determine response compression:

* If the response is not a [compressible type](#compressible-types), return uncompressed.
* Else if `br` is found and the `{{ PACKAGE_NAME }}` version is >= `4.11.0` then compress the response using Brotli.
* Else if `gzip` is found, then compress the response using gzip.
* Else no compression is used.


## Compressible Types

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
