---
title: Cache Key
---

Our edge servers use cache keys to determine whether a cached response exists for a specific request. Specifically, they calculate a cache key for each request. They then use this cache key to check for a cached response. 

View a request's cache key through the `x-ec-cache-key` response header. By default, this header is excluded from the response. 

**Syntax:** `x-ec-cache-key:` [&lt;CACHE KEY>](#cache-key-reference)

**Example:** `x-ec-cache-key: //http/800001/web/21/images/foo.jpg:/hs-5041808438894094098.jpg`

[Learn how to generate this response header.](/guides/performance/response#requesting-debug-cache-information)

## Customizing the Cache Key {/* customizing-the-cache-key */}

If your web application relies on query string parameter(s), request header(s), or cookie(s) when generating a response, then you should customize the cache key to include those elements. 

**Key information:**

-   Defining custom cache keys too broadly impacts performance and lowers your cache hit ratio. 

    We strongly recommend that you restrict this customization to a specific set of traffic (e.g., dynamic responses) and only add the specific critieria that influence the response provided to the client.

    For example, if the response varies according to a single query string parameter, then you should only add that query string parameter to your cache key. Adding additional query string parameters may cause too much segmentation for your cached content and thus reduce your cache hit ratio.

-   Customize the cache key for a specific set of requests by implementing one of the following features within a rule or route:

    | Feature                                                                              | CDN-as-Code                                                                                   | Description                                                                                                                              |
    | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
    | [Cache Key](/guides/performance/rules/features#cache-key)                           | [cache_key](/docs/api/core/interfaces/types.Caching.html#cache_key)                           | Recommended. Use this feature to customize the cache key through query string parameters, request headers, cookies, and custom metadata. |
    | [Cache Key Query String](/guides/performance/rules/features#cache-key-query-string) | [cache_key_query_string](/docs/api/core/interfaces/types.Caching.html#cache_key_query_string) | Use this feature if you need to include one or more query string parameters in the cache key.                                            |
    | [Rewrite Cache Key](/guides/performance/rules/features#rewrite-cache-key)           | [cache_key_rewrite](/docs/api/core/interfaces/types.Caching.html#cache_key_rewrite)           | Advanced. Use this feature if you require precise control over how a cache key is calculated.                                            |

<Callout type="tip">

  We strongly recommend that you limit cache key customization to one of the above features per rule. Applying multiple cache key features may produce unexpected results or cause too much segmentation for your cached content.

</Callout>

## Sample Custom Cache Key Implementations {/*sample-custom-cache-key-implementations*/}

Examples of how to customize the cache key are provided below.

### Query String Parameter Example {/*query-string-parameter-example*/}

Restrict the cache key to only include the `page` and `filters` query string parameters using either of the following methods:
-   **Rules:** Create a rule that sets the [Cache Key feature](/guides/performance/rules/features#cache-key) to `Include Only` the `page` and `filters` query string parameters.

    ![Cache Key feature example](/images/v7/performance/cache-key-header-example.png?width=450)

-   **CDN-as-Code:** 

    ```js filename="./routes.js"
    export default new Router().always({
      caching: {
        cache_key: {
          include_query_params: ["page", "filters"],
        },
      },
    });
    ```

### Cookie Example {/*cookie-example*/}

This example demonstrates how to apply a custom default cache key for requests to the `marketing` folder. A sample URL is provided below.

`https://www.example.com/conferences/marketing/index.htm`

Specifically, we will include the `language` and `currency` cookies within the cache key using either of the following methods:

-   **Rules:** Create a rule that defines:
    -   The [Path match condition](/guides/performance/rules/conditions#path). Set the **Match Value** option to `/conferences/marketing/:asset`.
    -   The [Cache Key feature](/guides/performance/rules/features#cache-key). Add `language` and `currency` to the **Cookies** option. 

        ![Cache Key feature example](/images/v7/performance/cache-key-cookie-example.png?width=450)

-   **CDN-as-Code:** 

    ```js filename="./routes.js"
    export default new Router().match("/conferences/marketing/:asset", {
      caching: {
        cache_key: {
          include_all_query_params: true,
          include_cookies: ["language", "currency"],
        },
      },
    });
    ```
### Country Example {/*country-example*/}

This example demonstrates how to add geolocation metadata to the cache key for requests to the `marketing` folder. A sample URL is provided below.

`https://www.example.com/conferences/marketing/index.htm`

Specifically, we will add the country from which the request originated to the cache key using either of the following methods:

-   **Rules:** Create a rule that defines:
    -   The [Path match condition](/guides/performance/rules/conditions#path). Set the **Match Value** option to `/conferences/marketing/:asset`.
    -   The [Cache Key feature](/guides/performance/rules/features#cache-key). Add `%{geo_country}` to the **Expressions** option. 

        ![Cache Key feature example](/images/v7/performance/cache-key-country-example.png?width=450)

-   **CDN-as-Code:** 

    ```js filename="./routes.js"
    export default new Router().match("/conferences/marketing/:asset", {
      caching: {
        cache_key: {
          include_all_query_params: true,
          include_expressions: ["%{geo_country}"],
        },
      },
    });
    ```

<Callout type="tip">

  Use [feature variables](/guides/performance/rules/feature_variables) when defining expressions. However, you may not use response metadata when defining a cache key.

</Callout>

## Cache Key Reference {/*cache-key-reference*/}

Your configuration determines how our edge servers construct the cache key.

**Default Syntax:**

`//http/80<ACCOUNT ID>/<ORIGIN CONFIGURATION>/<DEPLOYMENT VERSION>/<RELATIVE PATH>:/[q-<QUERY STRING HASH>_]hs-<URI HASH>[<FILE EXTENSION>]`

**Cache Key Feature Syntax:**

{{ PRODUCT }} calculates the cache key as follows when the [Cache Key feature](/guides/performance/rules/features#cache-key) is applicable to a request:

`//http/80<ACCOUNT ID>/<ORIGIN CONFIGURATION>/<DEPLOYMENT VERSION>/cache-key-customization=<HASH>/<RELATIVE PATH>:/[q-<QUERY STRING HASH>_]hs-<URI HASH>[<FILE EXTENSION>]`

**Experimentation Syntax:**

{{ PRODUCT }} calculates the cache key as follows when the request is eligible for one or more [experiment(s)](/guides/performance/experiments):

`//http/80<ACCOUNT ID>/<ORIGIN CONFIGURATION>/<DEPLOYMENT VERSION>/cache-key-experiments=<HASH>/<RELATIVE PATH>:/[q-<QUERY STRING HASH>_]hs-<URI HASH>[<FILE EXTENSION>]`

Definitions for the above placeholder values are provided below.

| Placeholder              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<ACCOUNT ID>`           | Indicates your unique customer account ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `<ORIGIN CONFIGURATION>` | Indicates the name of the origin configuration associated with the request. <br /><br />**CDN-as-code:** Deploying a CDN-as-code configuration automatically generates the following system-defined origin configurations: `edgio_static`, `edgio_permanent_static`, `edgio_serverless`, and `edgio_image_optimizer`. Your rules determine on a per request basis which origin configuration will be applied to the cache key. View how {{ PRODUCT }} maps your code to these origin configurations from the **Rules** page. Returns `origin` when an origin configuration is inapplicable to a request. |
| `<DEPLOYMENT VERSION>`   | The replacement value for this placeholder is determined by the **Caching** page's **Preserve cache between deployments** option. <ul><li>**Enabled:** Returns `0`.</li><li>**Disabled:** Indicates the version of the deployment for the configuration that served the request whose response was cached.</li></ul>                                                                                                                                                                                                                                                                                     |
| `<RELATIVE PATH>`        | Indicates the relative path to the requested content. This relative path starts directly after the hostname.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `<QUERY STRING HASH>`    | Indicates a hash of the request's query string. If the request URL does not contain a query string, then the cache key will exclude `q-<QUERY STRING HASH>_`. <Callout type="tip">Exclude the query string from the cache key through the [Cache Key feature (cache_key)](/guides/performance/rules/features#cache-key).</Callout>                                                                                                                                                                                                                                                                       |
| `<URI HASH>`             | Indicates a hash of the request URI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `<FILE EXTENSION>`       | Indicates the request's file extension (e.g., `.html`). It is excluded from the cache key when the request URL does not contain a file extension.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |