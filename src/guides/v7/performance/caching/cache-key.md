---
title: Cache Key
---

Our edge servers use cache keys to determine whether a cached response exists for a specific request. Specifically, they calculate a cache key for each request. They then use this cache key to check for a cached response. 

View a request's cache key through the `x-ec-cache-key` response header. By default, this header is excluded from the response. 

**Syntax:** `x-ec-cache-key:` [<CACHE KEY>](#cache-key-reference)

**Example:** `x-ec-cache-key: //http/800001/web/21/images/foo.jpg:/hs-5041808438894094098.jpg`

[Learn how to generate this response header.](/guides/performance/response#requesting-debug-cache-information)

## Customizing the Cache Key {/* customizing-the-cache-key */}

If your web application relies on query string parameter(s), request header(s), or cookie(s) when generating a response, then you should customize the cache key to include those elements. 

**Key information:**

-   Defining custom cache keys too broadly impacts performance and lowers your cache hit ratio. 

    We strongly recommend that you restrict this customization to a specific set of traffic (e.g., dynamic responses) and only add the specific critieria that influence the response provided to the client.

    For example, if the response varies according to a single query string parameter, then you should only add that query string parameter to your cache key. Adding additional query string parameters may cause too much segmentation for your cached content and thus reduce your cache hit ratio.

-   Customize the cache key for a specific set of requests by implementing either of the following features within a rule or route:

    -   [Cache Key Query String:](/guides/performance/rules/features#cache-key-query-string) Use this feature if you need to include one or more query string parameters in the cache key.

        **CDN-as-code:** [cache_key_query_string](/docs/api/core/interfaces/types.Caching.html#cache_key_query_string) 

    -   [Rewrite Cache Key:](/guides/performance/rules/features#rewrite-cache-key) Use this feature if you require additional control over how a cache key is calculated.

        **CDN-as-code:** [cache_key_rewrite](/docs/api/core/interfaces/types.Caching.html#cache_key_rewrite) 

    <Callout type="tip">
	
	  We recommend only using one of the above features per rule, since the Rewrite Cache Key feature overwrites the relative path and the query string defined within the cache key. The results may be hard to predict if you apply both features within the same rule. However, the Rewrite Cache Key feature will be applied first.
	
	</Callout>

## Sample Custom Cache Key Implementations {/*sample-custom-cache-key-implementations*/}

Examples of how to customize the cache key are provided below.

### Query String Parameter Example

Add the `page` and `filters` query string parameters to the cache key using either of the following methods:
-   **Rules:** Create a rule that sets the [Cache Key Query String feature](/guides/performance/rules/features#cache-key-query-string) to `Include` the `page` and `filters` query string parameters.

    ![Cache Key Query String feature example](/images/v7/performance/cache-key-query-string-example?width=450)

-   **CDN-as-Code:** 

    ```js filename="./routes.js"
    router.get('/some/path', {
      caching: {
        // Other options...
        cache_key_query_string: {
          include: ['page', 'filters'],
        },
      },
    });
    ```

### Cookie Example {/*cookie-example*/}

This example demonstrates how to apply a custom default cache key for requests to the `marketing` folder. A sample URL is provided below.

`https://www.example.com/conferences/marketing/index.htm`

Specifically, we will append the `language` and `currency` cookies to the cache key using either of the following methods:

-   **Rules:** Create a rule that defines the [Rewrite Cache Key feature](/guides/performance/rules/features#rewrite-cache-key) as indicated below:
    -   **Source:** Set this to option to the relative path for the set of requests whose cache key will be rewritten. In this case, we will set it to the following pattern to identify requests whose relative path starts with `/conferences/marketing`:
        `/conferences/marketing/(.*)`
		
		The last URL segment is set to `(.*)`. This regular expression syntax matches any number of characters that follow `/conferences/marketing/`. 

    -   **Destination:** Set this option to the cache key's replacement pattern. In this case, we will set the default cache key to the request's relative path followed by a dash and the value assigned to the `language` and `currency` cookies:
        `/conferences/marketing/$1-%{cookie_language}-%{cookie_currency}`

        Notice that we are using `$1`, which is a numbered backreference, to reintroduce the value captured by `(.*)` within the **Source** option.
		
    ![Rewrite Cache Key feature example](/images/v7/performance/rewrite-cache-key-example?width=450)

-   **CDN-as-Code:** 

    ```js filename="./routes.js"
    router.get('/conferences/marketing', {
      caching: {
        // Other options...
        cache_key_rewrite: {
          source: '/conferences/marketing/(.*)',
          destination: '/conferences/marketing/$1-%{cookie_language}-%{cookie_currency}',
        },
      },
    });
    ```
### Country Example {/*country-example*/}

This example demonstrates how to add geolocation metadata to the cache key for requests to the `marketing` folder. A sample URL is provided below.

`https://www.example.com/conferences/marketing/index.htm`

Specifically, we will add the country from which the request originated to the cache key using either of the following methods:

-   **Rules:** Create a rule that defines the [Rewrite Cache Key feature](/guides/performance/rules/features#rewrite-cache-key) as indicated below:
    -   **Source:** Set this to option to the relative path for the set of requests whose cache key will be rewritten.
        `/marketing/images/(.*)`
    -   **Destination:** Set this option to the cache key's replacement pattern.
        `%{path}-%{geo_country}`
		
		Notice that we are using the `%{path}` [feature variable](/guides/performance/rules/feature_variables) to reintroduce the relative path into the cache key. Alternatively, we could have used a backreference as demonstrated in the [cookie example](#cookie-example)

-   **CDN-as-Code:** 

    ```js filename="./routes.js"
    router.get('/conferences/marketing', {
      caching: {
        // Other options...
        cache_key_rewrite: {
          source: '/marketing/images/(.*)',
          destination: '%{path}-%{geo_country}',
        },
      },
    });
    ```

<Callout type="tip">

  Use [feature variables](/guides/performance/rules/feature_variables) to dynamically construct the cache key's replacement pattern. However, you may not use response metadata when defining a cache key.

</Callout>

## Cache Key Reference {/*cache-key-reference*/}

By default, our edge servers use the following syntax when calculating a cache key:

`//http/80<ACCOUNT ID>/<ORIGIN CONFIGURATION>/<DEPLOYMENT VERSION>/<RELATIVE PATH>:/[q-<QUERY STRING HASH>_]hs-<URI HASH>[<FILE EXTENSION>]`

Definitions for the above placeholder values are provided below.

| Placeholder              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<ACCOUNT ID>`           | Indicates your unique customer account ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `<ORIGIN CONFIGURATION>` | Indicates the name of the origin configuration associated with the request. <br /><br />**CDN-as-code:** Deploying a CDN-as-code configuration automatically generates the following system-defined origin configurations: `edgio_static`, `edgio_permanent_static`, `edgio_serverless`, and `edgio_image_optimizer`. Your rules determine on a per request basis which origin configuration will be applied to the cache key. View how {{ PRODUCT }} maps your code to these origin configurations from the **Rules** page. Returns `origin` when an origin configuration is inapplicable to a request. |
| `<DEPLOYMENT VERSION>`   | Indicates the version of the deployment for the configuration that served the request whose response was cached.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `<RELATIVE PATH>`        | Indicates the relative path to the requested content. This relative path starts directly after the hostname.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `<QUERY STRING HASH>`    | Indicates a hash of the request's query string. If the request URL does not contain a query string, then the cache key will exclude `q-<QUERY STRING HASH>_`. <Callout type="tip">Exclude the query string from the cache key through the [Cache Key Query String feature (cache_key_query_string)](/guides/performance/rules/features#cache-key-query-string) or by defining a custom cache key through the [Rewrite Cache Key feature (cache_key_rewrite)](/guides/performance/rules/features#rewrite-cache-key).</Callout>                                                                            |
| `<URI HASH>`             | Indicates a hash of the request URI.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `<FILE EXTENSION>`       | Indicates the request's file extension (e.g., `.html`). It is excluded from the cache key when the request URL does not contain a file extension.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

