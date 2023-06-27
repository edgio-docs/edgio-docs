---
title: Compression
---

Compress content through:
-   Your origin server(s). This is known as origin server compression.
-   Our edge servers. This is known as edge server compression.
-   Our Serverless layer.

## Origin Server Compression

Origin server compression occurs when a web server associated with your origin configuration compresses the response it provides to {{ PRODUCT }}. It requires: 

1.  The [accept-encoding request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) set to one of the following values:

    `gzip | deflate | bzip2 | br`

2.  The web server(s) associated with your origin configuration must support the compression method defined within the `accept-encoding` request header.

<Callout type="info">

  The `accept-encoding` header allows the user agent (e.g., a web browser) to indicate which compression methods it supports to the origin server. 

</Callout>

## Edge Server Compression

Edge server compression occurs when an edge server compresses cached content and provides this compressed response to the client. It requires:

| Requirement  | Description  |
|--------------|--------------|
| `Accept-encoding` request header  | The [accept-encoding request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) must be present and set to one of the following values: <br /><br />`gzip | deflate | bzip2` |
| Content type enablement | Enabling compression for each desired content type (aka MIME type or media type) through the [Compress Content Types feature (compress_content_types)](/guides/performance/rules/features#compress-content-types).   |
| Cached content  | An uncompressed version of the requested content must already be cached on the POP closest to the client that requested it.  |
| Eligible file size  | The file size of the requested content must fall within the following range: <ul><li>Greater than approximately 128 bytes (`content-length: 128`)</li><li>Less than approximately 3 MB</li></ul> |

### Enabling Edge Server Compression

Edge server compression requires enabling compression for the desired content types (aka MIME type or media type). Sample content types are provided below.

| Content Type    | File Type                     |
|-----------------|-------------------------------|
| text/plain      | Text files                    |
| text/html       | HTML files                    |
| text/css        | Cascading Style Sheets (CSS)  |
| text/javascript | JavaScript                    |

Enable compression for each desired content type through the following steps:

1.  Create or modify a rule that identifies the set of requests on which compression will be enabled. 
2.  Add the [Compress Content Types feature (compress_content_types)](/guides/performance/rules/features#compress-content-types) to it. Set it to the desired set of content types.

    -   **Rules:** The following configuration enables edge server compression for the 4 sample content types described above.

        ![Compress Content Types Feature](/images/v7/performance/compress-content-types.png?width=450)

    -   **CDN-as-Code:** The following sample rule enables edge server compression for the 4 sample content types described above.

        ```js filename="./routes.js"
        export default new Router().match(
          {},
          {
            response: {
              compress_content_types: [
                "text/plain",
                "text/html",
                "text/css",
                "text/javascript",
              ],
            },
          }
        );
        ```

## Cache Implications {/*implications-on-caching*/}

If your caching policy allows the requested content to be cached, then {{ PRODUCT }} can cache each version of the requested content that it serves. 

For example, if {{ PRODUCT }} serves an uncompressed, a Gzip, and DEFLATE version of the requested content, then it can potentially cache 3 different versions of that content on our network.

## How Does Compression Work?

The process through which requested content is compressed is outlined below. 

1.  Does the request contain an `accept-encoding` header?

    -   **Yes (Supported Compression Method):** Proceed to step 2.
    -   **Yes (Unsupported Compression Method):** Our edge servers will treat the request as a cache miss and retrieve it from your origin configuration or the Serverless layer.
    -   **No (Missing):** This type of request will be served in an uncompressed format as described by either the **Cache Miss** or the **Uncompressed Cache Hit (Ineligible)** bullet item in step 2.

2.  An edge server on the POP closest to the client will check to see if the requested content has been cached and if it still has a valid TTL. 

    -   **Cache Miss:** If a cached version of the requested content is not found, then the request will be forwarded to an origin server. Proceed to step 3.
    -   **Cache Hit & Matching Compression Method:** An edge server will immediately deliver the compressed content to the client.
    -   **Cache Hit & Different Compression Method:** If the client requests a supported compression method that is different from the one used by the initial request and the request is eligible for edge server compression, then an edge server will transcode the asset to the requested compression method and deliver it.
    -   **Uncompressed Cache Hit:** If the initial request caused the asset to be cached in an uncompressed format, then a check will be performed to see whether the request is eligible for edge server compression.
        -   **Eligible:** An edge server will serve the uncompressed content to the client. After which, if the request is eligible for caching, an edge server may compress the requested content and then cache the compressed version. Your caching policy dictates whether the compressed asset is eligible to be cached.
        -   **Ineligible:** An edge server will immediately deliver the uncompressed content to the client.

3.  The request will be forwarded to an origin server. The response from the origin server will be one of the following:

    -   If the request is eligible for compression by both origin server compression and edge server compression, then the origin server will provide a compressed response to {{ PRODUCT }}. {{ PRODUCT }} will then provide this compressed response to the client. Your caching policy dictates whether the compressed asset is eligible to be cached. 
    -   If the request is ineligible for compression by origin server compression, but eligible by edge server compression, then the origin server will provide an uncompressed response to {{ PRODUCT }}. {{ PRODUCT }} will then provide this uncompressed response to the client and then check whether the request is eligible for edge server compression.
	    -   **Eligible:** The requested content will be compressed and then delivered to the client. Your caching policy dictates whether the compressed asset is eligible to be cached.
	    -   **Ineligible:** An edge server will immediately deliver the uncompressed content to the client. Your caching policy dictates whether the uncompressed asset is eligible to be cached.
    -   If the request is eligible for compression by origin server compression, but ineligible by edge server compression, then the origin server will serve compressed content to {{ PRODUCT }}. {{ PRODUCT }} will serve the compressed asset to the client. However, it will not cache it. 
    -   If the request is ineligible for compression by both origin server compression and edge server compresssion, then the origin server will serve an uncompressed asset to {{ PRODUCT }}. {{ PRODUCT }}  will serve the uncompressed asset to the client. However, it will not cache it.

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