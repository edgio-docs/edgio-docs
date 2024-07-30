---
title: Compression
---

Compress content through:
-   Your origin server(s). This is known as origin server compression.
-   Our edge servers. This is known as edge server compression.
-   Our cloud.

## Origin Server Compression {/*origin-server-compression*/}

Origin server compression occurs when a web server associated with your origin configuration compresses the response it provides to {{ PRODUCT }}. This type of compression requires both of the following conditions to be met:

1.  The client's request must contain an [Accept-Encoding request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) set to one or more of the following values:

    `br | gzip | deflate | bzip2`

	**Example:** `Accept-Encoding: br, gzip, deflate`

2.  The web server(s) associated with your origin configuration must support the compression method defined within the `Accept-Encoding` request header.

<Callout type="info">

  The `Accept-Encoding` header allows the user agent (e.g., a web browser) to indicate which compression methods it supports to the origin server.

</Callout>

## Edge Server Compression {/*edge-server-compression*/}

Edge server compression occurs when an edge server compresses cached content and provides this compressed response to the client. It requires all of the following conditions to be met:

| Requirement  | Description  |
|--------------|--------------|
| `Accept-encoding` request header  | The client's request must contain an [Accept-Encoding request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) set to one or more of the following values: <br />`br \| gzip \| deflate \| bzip2` <br /><br />**Example:** `Accept-Encoding: br, gzip` |
| Content type enablement | [Compression must be enabled](#enabling-edge-server-compression) for the requested content type (aka MIME type or media type).   |
| Cached content  | An uncompressed version of the requested content must already be cached on the POP closest to the client that requested it. <Callout type="info">By default, {{ PRODUCT }} caches the response as provided by an origin server or the {{ PRODUCT }} cloud. Specifically, if the response is uncompressed and eligible to be cached, then {{ PRODUCT }} will cache the uncompressed response. </Callout> |
| Eligible file size  | The file size of the requested content must fall within the following range: <ul><li>Greater than approximately 128 bytes (`Content-Length: 128`)</li><li>Less than approximately 3 MB</li></ul> |

### Enabling Edge Server Compression {/*enabling-edge-server-compression*/}

Edge server compression requires enabling compression for the desired content types (aka MIME type or media type). Common content types are provided below.

| Content Type           | File Type                         |
|------------------------|-----------------------------------|
| application/javascript | JavaScript                        |
| application/json       | JavaScript Object Notation (JSON) |
| application/xml        | Extensible Markup Language (XML)  |
| text/css               | Cascading Style Sheets (CSS)      |
| text/html              | HTML files                        |
| text/javascript        | JavaScript                        |
| text/plain             | Text files                        |
| text/xml               | Extensible Markup Language (XML)  |

Enable compression for each desired content type through the following steps:

1.  Create or modify a rule that identifies the set of requests on which compression will be enabled.
2.  Add the [Compress Content Types feature (compress_content_types)](/applications/performance/rules/features#compress-content-types) to it. Set it to the desired set of content types.

The following examples demonstrate how to enable edge server compression using:

-   [Rules:](/applications/performance/rules#managing-rules)

    The following configuration enables edge server compression by setting the Compress Content Types feature to common content types:

    ![Compress Content Types Feature](/images/v7/performance/compress-content-types.png?width=450)

-   [CDN-as-Code:](/applications/performance/cdn_as_code)

    The following sample rule enables edge server compression across all requests for the common content types described above.

    ```js filename="./routes.js"
    export default new Router().match(
      {},
      {
        response: {
          compress_content_types: [
            "application/javascript",
            "application/json",
            "application/xml",
            "text/css",
            "text/html",
            "text/javascript",
            "text/plain",
            "text/xml ",
          ],
        },
      }
    );
    ```

<Callout type="info">

  Once you have enabled edge server compression on the desired content types, {{ PRODUCT }} will compress content when all of the [required conditions](#edge-server-compression) have been met. If one or more conditions have not been met, then {{ PRODUCT }} will serve either uncompressed cached content or the response provided by the origin server or the {{ PRODUCT }} cloud.

</Callout>

## Cache Implications {/*implications-on-caching*/}

If your caching policy allows the requested content to be cached, then {{ PRODUCT }} can cache each version of the requested content that it serves.

For example, if {{ PRODUCT }} serves a Gzip, DEFLATE, and an uncompressed version of the requested content, then it can potentially cache 3 different versions of that content on our network.

## How Does Compression Work? {/*how-does-compression-work*/}

The process through which requested content is compressed is outlined below.

1.  Does the request contain an `Accept-Encoding` header?

    -   **Yes:** Does it contain a supported compression method?
        -   **Yes:** Proceed to step 2.
        -   **No:** Our edge servers will check whether an asset compressed using that method has been cached. If this check results in a cache hit, then our edge servers will serve it immediately. Otherwise, it is a cache miss and our edge servers will retrieve it from your origin configuration or the {{ PRODUCT }} cloud. Skip to step 3.
    -   **No:** Requests that are missing the `Accept-Encoding` header are served in an uncompressed format. This response is derived from either an origin server, the {{ PRODUCT }} cloud, or cache.

2.  An edge server on the POP closest to the client will check to see if the requested content has been cached and if it still has a valid TTL.

    -   **Cache Miss:** If a cached version of the requested content is not found, then the request will be forwarded to an origin server or the {{ PRODUCT }} cloud. Proceed to step 3.
    -   **Cache Hit & Matching Compression Method:** An edge server will immediately deliver the compressed content to the client.
    -   **Cache Hit & Different Compression Method:** If the client requests a supported compression method that is different from the cached content's compression method and the request is eligible for edge server compression, then an edge server will transcode the asset to the requested compression method and deliver it.
    -   **Uncompressed Cache Hit:** If the initial request caused the asset to be cached in an uncompressed format, then a check will be performed to see whether the request is eligible for edge server compression.
        -   **Eligible:** An edge server will serve the uncompressed content to the client. After which, if the request is eligible for caching, an edge server may compress the requested content and then cache the compressed version. Your caching policy dictates whether the compressed asset is eligible to be cached.
        -   **Ineligible:** An edge server will immediately deliver the uncompressed content to the client.

3.  The request will be forwarded to either an origin server or the {{ PRODUCT }} cloud. Either entity will provide a compressed or uncompressed response according to whether it can apply compression. {{ PRODUCT }} will serve the response to the client. Your caching policy dictates whether the response will be cached.

## Applying Brotli Compression through the {{ PRODUCT }} Cloud {/*applying-brotli-compression-through-the-cloud*/}

The {{ PRODUCT }} cloud supports Brotli encoding if the web browser accepts Brotli and the response is considered [eligible for compression](#compressible-types). Apply Brotli compression under these conditions through `brotliCompressSync`.

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
  const acceptEncoding = req.getHeader('Accept-Encoding')
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

### Compressible Types {/*compressible-types*/}

The {{ PRODUCT }} cloud considers a response eligible for compression when either of the following conditions are satisfied:

-   The `Content-Type` header contains any of the following values:

    -   `text/html`
    -   `application/x-javascript`
    -   `text/css`
    -   `application/javascript`
    -   `text/javascript`
    -   `application/json`
    -   `application/vnd.ms-fontobject`
    -   `application/x-font-opentype`
    -   `application/x-font-truetype`
    -   `application/x-font-ttf`
    -   `application/xml`
    -   `font/eot`
    -   `font/opentype`
    -   `font/otf`
    -   `image/svg+xml`
    -   `image/vnd.microsoft.icon`
    -   `text/plain`
    -   `text/xml`

-   The URL ends with one of these file extensions:

    -   `.css`
    -   `.js`
    -   `.html`
    -   `.eot`
    -   `.ico`
    -   `.otf`
    -   `.ttf`
    -   `.json`
    -   `.svg`
