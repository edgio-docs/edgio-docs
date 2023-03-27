---
title: Features Reference
---

A feature identifies an action that will be applied to a request. Features are categorized as follows:

-   [Access](#access): Controls access to content.
-   [Caching](#caching): Customizes when and how content is cached.
-   [Client](#client): Controls how the client communicates with our CDN.
-   **Comment:** Adds a note or metadata to your configuration. This feature is solely informational and does not affect your configuration.
-   [Headers](#headers): Adds, modifies, or deletes headers from the request or response.
-   [Log](#log): Customizes how log data is stored.
-   [Origin](#origin): Controls how the CDN communicates with an origin server.
-   [Response](#response): Customizes the response sent to the client and determines whether we will allow prefetching instructions to be sent to the client.
-   [Set Variables](#set-variables): Assigns a value to one or more user-defined variable(s) that are  passed to your bespoke traffic processing solution.
-   [URL](#url): Redirects or rewrites requests to a different URL.

## Access {/*access*/}

Access features control access to content.

#### Deny Access {/*deny-access*/}

Determines whether requests are rejected with a `403 Forbidden` response.

<edgejs>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    access: {
      "deny_access": true,
    }
  })
</edgejs>

**Default Behavior:** false

#### Token Auth  {/*token-auth*/}

Determines whether Token-Based Authentication will be applied to a request.

-   If Token-Based Authentication is enabled, then only requests that provide an encrypted token and comply to the requirements specified by that token will be honored.
-   Token values will be encrypted and decrypted using your primary and backup encryption key(s).
-   This feature takes precedence over most features with the exception of the [URL Rewrite feature](#url-rewrite).

<edgejs>
-   If Token-Based Authentication is enabled, then only requests that provide an encrypted token and comply to the requirements specified by that token will be honored.
-   Token values will be encrypted and decrypted using your primary and backup encryption key(s).
-   This feature takes precedence over most features with the exception of the URL Rewrite feature.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    access: {
      "token_auth": true,
    }
  })
```
</edgejs>

**Default Behavior:** false

#### Token Auth Denial Code {/*token-auth-denial-code*/}

Determines the type of response that will be returned to a user when a request is denied due to Token-Based Authentication.

-   **Code:** Determines the HTTP status code for the response for requests denied due to Token-Based Authentication.
-   **Headers:** Contains a key-value pair that defines a response header that is specific to the status code set by the **Code** option.

    -   **3xx:** Set the `Location` response header to the URL to which denied requests will be redirected. If this header is not set, then we will return a standard response page.
    -   **401:** Set the `WWW-Authenticate` response header to info on how to authenticate. If the `WWW-Authenticate` header is set to `basic`, then the unauthorized user will be prompted for account credentials.

<edgejs>
-   **token_auth_denial_code (*Object*):** <a id="token-auth-denial-code" /> Determines the type of response that will be returned to a user when a request is denied due to Token-Based Authentication. 
-   **code (*Integer*):** Determines the HTTP status code for the response for requests denied due to Token-Based Authentication. 

-   **headers (*Object*):** Contains a key-value pair that defines a response header that is specific to the status code set by `code`. 
-   **3xx:** Set the `Location` response header to the URL to which denied requests will be redirected. If this header is not set, then we will return a standard response page. 

    **Example:** 

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        access: {
          "token_auth_denial_code": {
            "code": 301,
            "headers": {
              "Location": "https://cdn.example.com/accessdenied"
            }
          }
        }
      })
    ```

-   **401:** Set the `WWW-Authenticate` response header to info on how to authenticate. If the `WWW-Authenticate` header is set to `basic`, then the unauthorized user will be prompted for account credentials.

    **Example:** 

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        access: {
          "token_auth_denial_code": {
            "code": 401,
            "headers": {
              "WWW-Authenticate": "Basic"
            }
          }
        }
      })
    ```
</edgejs>

**Default Behavior:** By default, requests denied by Token-Based Authentication return a `403 Forbidden` response.


#### Token Auth Ignore 	URL Case {/*token-auth-ignore-url-case*/}

Determines whether URL comparisons made by the following Token-Based Authentication parameters are case-sensitive:

-   ec_url_allow
-   ec_ref_allow
-   ec_ref_deny

<edgejs>
**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    access: {
      "token_auth_ignore_url_case": true,
    }
  })
```
</edgejs>

**Default Behavior:** false

## Caching {/*caching*/}

Caching features customize when and how content is cached.

#### Bandwith Throttling {/*bandwidth-throttling*/}

Throttles the bandwidth for the response provided by our edge servers.

This feature also allows bandwidth throttling to be customized on a per request basis through query string parameters (i.e., `ec_rate` and `ec_prebuf`).

-   **Kbytes per second:** Set this option to the maximum bandwidth (Kb per second) that may be used to deliver the response.
-   **Prebuf seconds:** Set this option to the number of seconds that our edge servers will wait until throttling bandwidth.

    The purpose of this time period of unrestricted bandwidth is to prevent a media player from experiencing stuttering or buffering issues due to bandwidth throttling.

<edgejs>
This feature also allows bandwidth throttling to be customized on a per request basis through query string parameters (i.e., `ec_rate` and `ec_prebuf`).

-   **kbytes_per_sec (*Integer*):** Set this option to the maximum bandwidth (Kb per second) that may be used to deliver the response.
-   **prebuf_seconds (*Number*):** Set this option to the number of seconds that our edge servers will wait until throttling bandwidth.

The purpose of this time period of unrestricted bandwidth is to prevent a media player from experiencing stuttering or buffering issues due to bandwidth throttling.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "bandwidth_throttling": {
		"kbytes_per_sec": 300,
		"prebuf_seconds": 15,
      }
    }
  })
```
</edgejs>

**Default Behavior:** By default, our CDN does not throttle requests.

#### Bypass Cache {/*bypass-cache*/}

Determines whether our CDN will honor your caching policy when determining whether requests should be cached.

<edgejs>
**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "bypass_cache": true,
    }
  })
```
</edgejs>

**Default Behavior:** false

#### Bypass Client Cache {/*bypass-client-cache*/}

Determines whether our CDN will instruct the client to bypass cache.

-   **Bypass the cache:** Sets the `cache-control` response header to: `cache-control: private, no-cache, no-store, must-revalidate`
-   **Do not bypass the cache:** No effect.

<Callout type="info">

  An alternative method for defining a client's caching policy is to set the `cache-control` response header through the [Set Response Headers feature](#set-response-headers).

</Callout>

<edgejs>
-   **true:** Sets the `cache-control` response header to: `cache-control: private, no-cache, no-store, must-revalidate`
-   **false:** No effect.

<Callout type="info">

  An alternative method for defining a client's caching policy is to set the `cache-control` response header through the `set_response_headers` feature.

</Callout>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "bypass_client_cache": true,
    }
  })
```
</edgejs>

**Default Behavior:** false

#### Cache Control Header Treatment {/*cache-control-header-treatment*/}

Controls the generation of `Cache-Control` headers by an edge server when the `Client Max Age` feature is active.

<Callout type="tip">

  The recommended method for setting up this feature is to add both `Client Max Age` and `Cache Control Header Treatment` within the same rule.

</Callout>

Valid values are:

-   **Pass:** Ensures that the following actions will take place:

    -   Ensures that the `Cache-Control` header produced by the `Client Max Age` feature is never added to the response.
    -   If the origin server produces a `Cache-Control` header, it will pass through to the user.

    <Callout type="info">

      This mode may result in a response without a `Cache-Control` header when the origin server does not set it.

    </Callout>

-   **Overwrite:** Ensures that the following actions will take place:

    -   Overwrites the `Cache-Control` header generated by the origin server.
    -   Adds the `Cache-Control` header produced by the `Client Max Age` feature to the response.

-   **If missing:** If a `Cache-Control` header was not received from the origin server, then this option adds the `Cache-Control` header produced by the `Client Max Age` feature. This option is useful for ensuring that all assets will be assigned a `Cache-Control` header.
-   **Remove:** Excludes the `Cache-Control` header from the response. If a `Cache-Control` header has already been assigned, then it will be stripped from the response.

<edgejs>
<Callout type="tip">

  The recommended method for setting up this feature is to add both `client_max_age` and `cache_control_header_treatment` within the same `caching` object.

</Callout>

Valid values are:

-   **pass:** Ensures that the following actions will take place:
    -   Ensures that the `Cache-Control` header produced by the `client_max_age` feature is never added to the response.
    -   If the origin server produces a `Cache-Control` header, it will pass through to the user.

    <Callout type="info">

      This mode may result in a response without a `Cache-Control` header when the origin server does not set it.  

    </Callout>

-   **overwrite:** Ensures that the following actions will take place:

    -   Overwrites the `Cache-Control` header generated by the origin server.
    -   Adds the `Cache-Control` header produced by the `client_max_age` feature to the response.

-   **if_missing:** If a `Cache-Control` header was not received from the origin server, then this option adds the `Cache-Control` header produced by the `client_max_age` feature. This option is useful for ensuring that all assets will be assigned a `Cache-Control` header.
-   **remove:** Excludes the `Cache-Control` header from the response. If a `Cache-Control` header has already been assigned, then it will be stripped from the response.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "cache_control_header_treatment": "pass",
    }
  })
```
</edgejs>

**Default Behavior:** Overwrite

#### Cache Key Query String {/*cache-key-query-string*/}

Determines whether the cache-key will include or exclude query string parameters associated with a request. 

Include or exclude all query string parameters through the `Include All` or `Exclude All` modes. Alternatively, include or exclude specific query string parameters through the `Include` or `Include All Except` modes.

-   **Include All:** Indicates that a unique cache-key will be created for each request to an asset that includes a unique query string.

    <Callout type="info">

      This type of configuration is not typically recommended since it may lead to a small percentage of cache hits. This will increase the load on the origin server, since it will have to serve more requests. 

    </Callout>

-   **Exclude All:** Indicates that all query string parameters will be excluded from the cache-key. 

-   **Include:** Contains the set of parameter(s) that may be included in the cache-key. A unique cache-key will be generated for each request that contains a unique value for a query string parameter defined in this feature.

-   **Include All Except:** Contains the set of parameter(s) will be excluded from the cache-key. All other query string parameters will be included in the cache-key.

<edgejs>
Include or exclude all query string parameters through the `include_all` property or `exclude_all` property. Alternatively, include or exclude specific query string parameters through the `include` property, `exclude` property, or both.

-   **include_all (*Boolean*):** Indicates that a unique cache-key will be created for each request to an asset that includes a unique query string.

    <Callout type="info">

      This type of configuration is not typically recommended since it may lead to a small percentage of cache hits. This will increase the load on the origin server, since it will have to serve more requests. 

    </Callout>

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "cache_key_query_string": {
			"include_all": true
          }
        }
      })
    ```

-   **exclude_all (*Boolean*):** Indicates that all query string parameters will be excluded from the cache-key. 

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "cache_key_query_string": {
			"exclude_all": true
          }
        }
      })
    ```

-   **include (*Array of string values*):** Contains the set of parameter(s) that may be included in the cache-key. A unique cache-key will be generated for each request that contains a unique value for a query string parameter defined in this feature.

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "cache_key_query_string": {
			"include": ["param1", "param2"]
          }
        }
      })
    ```

-   **include_all_except (*Array of string values*):** Contains the set of parameter(s) will be excluded from the cache-key. All other query string parameters will be included in the cache-key.

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "cache_key_query_string": {
			"include_all_except": ["param1", "param2"]
          }
        }
      })
    ```
</edgejs>

#### Cacheable Request Body Size {/*cacheable-request-body-size*/}

Restricts caching to requests whose body does not exceed the specified file size (Kb).

**Key information:**

-   This feature is only applicable when `POST` or `PUT` responses are eligible for caching. Use the `Enable Caching for Methods` feature to enable `POST` / `PUT` request caching.
-   The request body is taken into consideration for:

    -   `x-www-form-urlencoded` values
    -   Ensuring a unique cache-key

-   Defining a large maximum request body size may impact data delivery performance.

    -   **Recommended Value:** 14 Kb
    -   **Minimum Value:** 1 Kb

<edgejs>
**Key information:**

-   This feature is only applicable when `POST` or `PUT` responses are eligible for caching. Use the `enable_caching_for_methods` feature to enable `POST` / `PUT` request caching.
-   The request body is taken into consideration for:

    -   `x-www-form-urlencoded` values
    -   Ensuring a unique cache-key

-   Defining a large maximum request body size may impact data delivery performance.

    -   **Recommended Value:** 14 Kb
    -   **Minimum Value:** 1 Kb

**Example:** 

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "cacheable_request_body_size": 12,
    }
  })
```
</edgejs>

**Default Behavior:** 14 Kb

#### Cacheable Status Codes {/*cacheable-status-codes*/}

Defines the set of status codes that can result in cached content.

**Key information:**

-   Caching non-`200 OK` response also requires enabling the `Ignore Origin No Cache` feature. 
-   This feature cannot be used to disable caching for responses that generate a `200 OK` status code.

<edgejs>
**Key information:**

-   Caching non-`200 OK` response also requires enabling the `ignore_origin_no_cache` feature. 
-   This feature cannot be used to disable caching for responses that generate a `200 OK` status code.

<!--
-   The set of valid status codes for this feature are:
`200 | 203 | 300 | 301 | 302 | 305 | 307 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 429 | 451 | 500 | 501 | 502 | 503 | 504 | 505`
-->

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "cacheable_status_codes": [300, 301, 302],
    }
  })
```
</edgejs>

**Default Behavior:** By default, caching is restricted to responses that generate a `200 OK` status code.

#### Client Max Age {/*client-max-age*/}

Determines the `max-age` interval for browser to edge server cache revalidation. In other words, the amount of time that will pass before a browser can check for a new version of an asset from an edge server.

Enabling this feature will generate `Cache-Control:max-age` and `Expires` headers from our edge servers and send them to the HTTP client. By default, these headers will overwrite those created by the origin server. However, the `cache_control_header_treatment` and the `expires_header_treatment` features may be used to alter this behavior.

**Key information:**

-   This action does not affect edge server to origin server cache revalidations. These types of revalidations are determined by the `Cache-Control` / `Expires` headers received from the origin server, and can be customized with the Default Internal Max-Age and the `Max Age` features.

-   Setting this feature to a negative value causes our edge servers to send a `Cache-Control:no-cache` and an `Expires` time that is set in the past with each response to the browser. Although an HTTP client will not cache the response, this setting will not affect our edge servers' ability to cache the response from the origin server.

<edgejs>
Enabling this feature will generate `Cache-Control:max-age` and `Expires` headers from our edge servers and send them to the HTTP client. By default, these headers will overwrite those created by the origin server. However, the `cache_control_header_treatment` and the `expires_header_treatment` features may be used to alter this behavior.

**Key information:**

-   **Syntax:** `<TIME>[s|m|h|d|w|y]`

-   This action does not affect edge server to origin server cache revalidations. These types of revalidations are determined by the `Cache-Control` / `Expires` headers received from the origin server, and can be customized with the Default Internal Max-Age and the `max_age` features.

-   Setting this feature to a negative value causes our edge servers to send a `Cache-Control:no-cache` and an `Expires` time that is set in the past with each response to the browser. Although an HTTP client will not cache the response, this setting will not affect our edge servers' ability to cache the response from the origin server.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "client_max_age": "10h",
    }
  })
```
</edgejs>

**Default Behavior:** The `Cache-Control` / `Expires` headers cached with the response of the origin server will pass through to the browser.

#### Enable Caching for Methods {/*enable-caching-for-methods*/}

Determines whether `POST` and `PUT` requests are eligible for caching on our network.

**Key information:**

-   By default, our CDN restricts caching to requests whose body is smaller than 14 Kb.

    <Callout type="tip">

      Use the `Cacheable Request Body Size` feature to set the maximum request body size for cache-eligible requests.

    </Callout>

-   Although you may enable caching for `POST` and `PUT` requests, purge is only supported for `GET` requests.

<edgejs>
**Key information:**

-   This feature supports the following HTTP methods: `POST` and `PUT`.
-   By default, our CDN restricts caching to requests whose body is smaller than 14 Kb.

<Callout type="tip">

  Use the `cacheable_request_body_size` feature to set the maximum request body size for cache-eligible requests.

</Callout>

-   Although you may enable caching for `POST` and `PUT` requests, purge is only supported for `GET` requests.
-   `GET` requests are unaffected by this feature. Including or excluding the `GET` method when defining this feature will not impact whether `GET` requests are eligible for caching.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "enable_caching_for_methods": ["POST", "PUT"],
    }
  })
```
</edgejs>

**Default Behavior:** By default, only `GET` requests are eligible for caching.

#### Expires Header Treatment {/*expires-header-treatment*/}

Determines how an edge server will handle the `Expires` response header when the `Client Max Age` feature is active. This feature overrides the `Expires` header generated by the `Client Max Age` feature.

<Callout type="tip">

  The recommended method for setting up this feature is to add the `Client Max Age` along with this feature within the same rule.

</Callout>

Valid values are:

-   **Pass:** Ensures that the following actions will take place:

    -   Ensures that the `Expires` header produced by the `Client Max Age` feature is never added to the response.
    -   If the origin server produces an `Expires` header, it will pass through to the user.

    <Callout type="info">

      This mode may result in a response without an `Expires` header when the origin server does not set it.  

    </Callout>

-   **Overwrite:** Ensures that the following actions will take place:

    -   Overwrites the `Expires` header generated by the origin server.
    -   Adds the `Expires` header produced by the `Client Max Age` feature to the response.

-   **If missing:** If an `Expires` header was not received from the origin server, then this option adds the `Expires` header produced by the `Client Max Age` feature. This option is useful for ensuring that all assets will be assigned an `Expires` header.
-   **Remove:** Ensures that an `Expires` header is not included with the header response. If an `Expires` header has already been assigned, then it will be stripped from the header response.

<edgejs>
<Callout type="tip">

  The recommended method for setting up this feature is to add both `client_max_age` and `expires_header_treatment` within the same `caching` object.

</Callout>

Valid values are:

-   **pass:** Ensures that the following actions will take place:

    -   Ensures that the `Expires` header produced by the `client_max_age` feature is never added to the response.
    -   If the origin server produces an `Expires` header, it will pass through to the user.

    <Callout type="info">

      This mode may result in a response without an `Expires` header when the origin server does not set it.  

    </Callout>

-   **overwrite:** Ensures that the following actions will take place:

    -   Overwrites the `Expires` header generated by the origin server.
    -   Adds the `Expires` header produced by the `client_max_age` feature to the response.

-   **if_missing:** If an `Expires` header was not received from the origin server, then this option adds the `Expires` header produced by the `client_max_age` feature. This option is useful for ensuring that all assets will be assigned an `Expires` header.
-   **remove:** Ensures that an `Expires` header is not included with the header response. If an `Expires` header has already been assigned, then it will be stripped from the header response.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "expires_header_treatment": 'if_missing',
    }
  })
```
</edgejs>

**Default Behavior:** Overwrite

#### Enable H264 encoding {/*enable-h264-encoding*/}

Determines the types of H.264 file formats that may be used when streaming content through HTTP Progressive Download.

<Callout type="tip">

  Maintain MP4 and F4V support by including those file extensions when setting this feature.

</Callout>

**Syntax:** `.<FILE EXTENSION>`

**Example:** `.mp4 .f4v`

<edgejs>
<Callout type="tip">

  Maintain MP4 and F4V support by including those file extensions when setting this feature.

</Callout>

**Syntax:** `.<FILE EXTENSION>`

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "h264_support": [".mp4", ".f4v"],
    }
  })
```
</edgejs>

**Default Behavior:** By default, HTTP Progressive Download supports MP4 and F4V file extensions.

#### Honor No Cache Request Header {/*honor-no-cache-request-header*/}

Determines whether an HTTP client's no-cache requests will be forwarded to the origin server. A no-cache request occurs when the HTTP client sends a `Cache-Control:no-cache` and/or `Pragma:no-cache header` in the HTTP request.

<Callout type="tip">

  For all production traffic, it is highly recommended to leave this feature in its default disabled state. Otherwise, origin servers will not be shielded from users who may inadvertently trigger many no-cache requests when refreshing web pages, or from the many popular media players that are coded to send a no-cache header with every video request. Nevertheless, this feature can be useful to apply to certain non-production staging or testing directories, in order to allow fresh content to be pulled on-demand from the origin server.

</Callout>

<Callout type="info">

  The cache status that will be reported for a request that is allowed to be forwarded to an origin server due to this feature is `TCP_Client_Refresh_Miss`. Use this cache status to track the number and percentage of requests that are being forwarded to an origin server due to this feature.

</Callout>

<edgejs>
<Callout type="tip">

  For all production traffic, it is highly recommended to leave this feature in its default disabled state. Otherwise, origin servers will not be shielded from users who may inadvertently trigger many no-cache requests when refreshing web pages, or from the many popular media players that are coded to send a no-cache header with every video request. Nevertheless, this feature can be useful to apply to certain non-production staging or testing directories, in order to allow fresh content to be pulled on-demand from the origin server.

</Callout>

<Callout type="info">

  The cache status that will be reported for a request that is allowed to be forwarded to an origin server due to this feature is `TCP_Client_Refresh_Miss`. Use this cache status to track the number and percentage of requests that are being forwarded to an origin server due to this feature.

</Callout>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "honor_no_cache_request_header": true,
    }
  })
```
</edgejs>

**Default Behavior:** The default behavior is to prevent no-cache requests from being forwarded to the origin server.

#### Ignore Origin No Cache {/*ignore-origin-no-cache*/}

Determines on a per HTTP status code basis whether our CDN will ignore cache directives served from an origin server.

-   This feature only affects these directives:
    -   `Cache-Control: private`
    -   `Cache-Control: no-store`
    -   `Cache-Control: no-cache`
    -   `Pragma: no-cache`
-   This feature supports most `1xx` - `5xx` status codes. The following status codes are unsupported:
    `100 | 101 | 102 | 103 | 201 | 202 | 204 | 205 | 206 | 207 | 208 | 226 | 303 | 304 | 306`

<edgejs>
-   This feature only affects these directives:
-   `Cache-Control: private`
-   `Cache-Control: no-store`
-   `Cache-Control: no-cache`
-   `Pragma: no-cache`
-   This feature supports most `1xx` - `5xx` status codes. The following status codes are unsupported:
`100 | 101 | 102 | 103 | 201 | 202 | 204 | 205 | 206 | 207 | 208 | 226 | 303 | 304 | 306`

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "ignore_origin_no_cache": [200, 300, 301],
    }
  })
```
</edgejs>

**Default Behavior:** The default behavior is to honor the above directives.

#### Ignore Unsatisfiable Ranges {/*ignore-unsatisfiable-ranges*/}

Determines the response that will be returned to clients when a request generates a `416 Requested Range Not Satisfiable` status code. By default, this status code is returned when the specified byte-range request cannot be satisfied by an edge server and an `If-Range` request header field was not specified. 

Enabling this feature prevents our edge servers from responding to an invalid byte-range request with a `416 Requested Range Not Satisfiable` status code. Instead our servers will deliver the requested asset and return a `200 OK` to the client.

<edgejs>
Enabling this feature prevents our edge servers from responding to an invalid byte-range request with a `416 Requested Range Not Satisfiable` status code. Instead our servers will deliver the requested asset and return a `200 OK` to the client.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "ignore_unsatisfiable_ranges": true,
    }
  })
```
</edgejs>

**Default Behavior:** The default behavior is to honor the `416 Requested Range Not Satisfiable` status code.

#### Max Age{/*max-age*/}

Defines a `max-age` interval for edge server to origin server cache revalidation that overrides the one defined in `Cache-Control` or `Expires` headers generated from an origin server.  This interval defines the amount of time that will pass before an edge server can check whether a cached asset matches the asset stored on the origin server.

**Key information:**

-   Define a `max-age` interval for each desired HTTP status code. This caching policy will only be applied when the status code for the cached response matches the specified HTTP status code. 
-   This feature does not affect browser to edge server cache revalidations. These types of revalidations are determined by the `Cache-Control` or `Expires` headers sent to the browser.
-   This feature does not have an observable effect on the response sent to a user. However, it may have an effect on the amount of revalidation traffic sent from our edge servers to the origin server.

<edgejs>
**Key information:**

-   Define this feature either as a string value or an object. 
-   **Object:** Define key-value pair(s) that identify an HTTP status code and its `max-age` interval.

    **Syntax:** `"<STATUS CODE>": "<TIME>[s|m|h|d|w|y]"`

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "max_age": {
	        "200": "10h",
	        "301": "5m"
          },
        }
      })
    ```

-   **String:** Use a string value if you only need to define the `max-age` interval for `200 OK` responses.

    **Syntax:** `<TIME>[s|m|h|d|w|y]`

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "max_age": `10h`,
        }
      })
    ```

-   This feature does not affect browser to edge server cache revalidations. These types of revalidations are determined by the `Cache-Control` or `Expires` headers sent to the browser.
-   This feature does not have an observable effect on the response sent to a user. However, it may have an effect on the amount of revalidation traffic sent from our edge servers to the origin server.

</edgejs>

**Default Behavior:** Disabled. An internal max-age interval will not be assigned to requested assets. If the origin server does not serve a response that contains caching instructions, then the asset will be cached according to the active setting in the Default Internal Max-Age feature.

#### Partial Cache Sharing Min Hit Size {/*partial-cache-sharing-min-hit-size*/}

Defines the minimum file size (Kb) for caching partial content. 

<edgejs>
**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "partial_cache_sharing_min_hit_size": 1024,
    }
  })
```
</edgejs>

**Default Behavior:** By default, partial cache sharing is disabled. 

#### Prevalidate Cached Content {/*prevalidate-cached-content*/}

Determines whether cached content will be eligible for early revalidation before its TTL expires. Define the amount of time prior to the expiration of the requested content's TTL during which it will be eligible for early revalidation.

<edgejs>
**Syntax:** `<TIME>[s|m|h|d|w|y]`

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "prevalidate_cached_content": "10m",
    }
  })
```
</edgejs>

**Default Behavior:** Revalidation may only take place after the cached content's TTL has expired.

#### Refresh Zero Byte Cache Files {/*refresh-zero-byte-cache-files*/}

Determines how an HTTP client's request for a 0-byte cache asset is handled by our edge servers.

Enabling this feature causes our edge server to re-fetch the asset from the origin server.

<Callout type="tip">

  This feature is not required for correct caching and content delivery, but may be useful as a workaround. For example, dynamic content generators on origin servers can inadvertently result in 0-byte responses being sent to the edge servers. These types of responses are typically cached by our edge servers. If you know that a 0-byte response is never a valid response for such content, then this feature can prevent these types of assets from being served to your clients.

</Callout>

<edgejs>
Enabling this feature causes our edge server to re-fetch the asset from the origin server.

<Callout type="tip">

  This feature is not required for correct caching and content delivery, but may be useful as a workaround. For example, dynamic content generators on origin servers can inadvertently result in 0-byte responses being sent to the edge servers. These types of responses are typically cached by our edge servers. If you know that a 0-byte response is never a valid response for such content, then this feature can prevent these types of assets from being served to your clients.

</Callout>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "refresh_zero_byte_cache_files": true,
    }
  })
```
</edgejs>

**Default Behavior:** The default behavior is to serve valid cache assets upon request.

#### Rewrite Cache Key {/*rewrite-cache-key*/}

Rewrites the cache-key associated with a request. Pass the following properties:

-   **Source:** Define a regular expression that identifies the cache-key that will be rewritten. This cache-key is a relative path that starts directly after the hostname.

    <Callout type="important">

      Verify that the specified pattern does not conflict with this route's path.

    </Callout>

-   **Destination:** Define a regular expression that sets a new cache-key. This cache-key is a relative path that starts directly after the hostname. 

    <Callout type="tip">

      Use [HTTP variables](#http-variables) to dynamically construct this relative path. However, you may not use response metadata when defining a cache-key.

    </Callout>

<edgejs>
-   **source (*String*):** Define a regular expression that identifies the cache-key that will be rewritten. This cache-key is a relative path that starts directly after the hostname.

    <Callout type="important">

      Verify that the specified pattern does not conflict with this route's path.

    </Callout>

-   **destination (*String*):** Define a regular expression that sets a new cache-key. This cache-key is a relative path that starts directly after the hostname. 

    <Callout type="tip">

      Use [HTTP variables](#http-variables) to dynamically construct this relative path. However, you may not use response metadata (e.g., `%{resp_<RESPONSE HEADER>}`) when defining a cache-key.

    </Callout>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "cache_key_rewrite": {
		"source": "/marketing/images/(.*)",
		"destination": "/images/$1"
      }
    }
  })
```
</edgejs>

**Default Behavior:** By default, a request's cache-key is determined by the request URI's relative path.

#### Revalidate After Origin Unavailable {/*revalidate-after-origin-unavailable*/}

Controls how long past the normal expiration time a cached asset may be served from an edge server when the edge server is unable to revalidate the cached asset with the origin server.

Normally, when an asset's max-age time expires, the edge server will send a revalidation request to the origin server. The origin server will then respond with either a `304 Not Modified` to give the edge server a fresh lease on the cached asset, or else with `200 OK` to provide the edge server with an updated version of the cached asset.

If the edge server is unable to establish a connection with the origin server while attempting such a revalidation, then this feature controls whether, and for how long, the edge server may continue to serve the now-stale asset.

This time interval starts when the asset's `max-age` expires, not when the failed revalidation occurs. Therefore, the maximum period during which an asset can be served without successful revalidation is the amount of time specified by the combination of `max-age` plus `max-stale`. 

For example, if an asset was cached at 9:00 with a `max-age` of 30 minutes and a `max-stale` of 15 minutes, then a failed revalidation attempt at 9:44 would result in a user receiving the stale cached asset, while a failed revalidation attempt at 9:46 would result in the user receiving a `504 Gateway Timeout`.

Any value configured for this feature is superseded by `Cache-Control:must-revalidate` or `Cache-Control:proxy-revalidate` headers received from the origin server. If either of those headers is received from the origin server when an asset is initially cached, then the edge server will not serve a stale cached asset. In such a case, if the edge server is unable to revalidate with the origin when the asset's max-age interval has expired, then the edge server will return a `504 Gateway Timeout`.

<Callout type="info">

  Each stale response includes a `Warning` response header.

</Callout>

<edgejs>
Normally, when an asset's max-age time expires, the edge server will send a revalidation request to the origin server. The origin server will then respond with either a `304 Not Modified` to give the edge server a fresh lease on the cached asset, or else with `200 OK` to provide the edge server with an updated version of the cached asset.

If the edge server is unable to establish a connection with the origin server while attempting such a revalidation, then this `revalidate_after_origin_unavailable` feature controls whether, and for how long, the edge server may continue to serve the now-stale asset.

This time interval starts when the asset's `max-age` expires, not when the failed revalidation occurs. Therefore, the maximum period during which an asset can be served without successful revalidation is the amount of time specified by the combination of `max-age` plus `max-stale`. 

For example, if an asset was cached at 9:00 with a `max-age` of 30 minutes and a `max-stale` of 15 minutes, then a failed revalidation attempt at 9:44 would result in a user receiving the stale cached asset, while a failed revalidation attempt at 9:46 would result in the user receiving a `504 Gateway Timeout`.

Any value configured for this feature is superseded by `Cache-Control:must-revalidate` or `Cache-Control:proxy-revalidate` headers received from the origin server. If either of those headers is received from the origin server when an asset is initially cached, then the edge server will not serve a stale cached asset. In such a case, if the edge server is unable to revalidate with the origin when the asset's max-age interval has expired, then the edge server will return a `504 Gateway Timeout`.

**Key information:**

-   This feature may either be an object or a string value. 
    -   **Object:** Define key-value pair(s) that identify an HTTP status code and its `max-stale` interval.

    **Syntax:** `"<STATUS CODE>": "<TIME>[s|m|h|d|w|y]"`

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "revalidate_after_origin_unavailable": {
        	"200": "10m",
	        "301": "5m"
          },
        }
      })
    ```

-   **String:** Use a string value if you only need to define the `max-stale` interval for `200 OK` responses.

    **Syntax:** `<TIME>[s|m|h|d|w|y]`

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        caching: {
          "revalidate_after_origin_unavailable": `10h`,
        }
      })
    ```

-   Each stale response includes a `Warning` response header.
</edgejs>

**Default Behavior:** 2 minutes

#### Revalidate While Stale Timer {/*revalidate-while-stale-timer*/}

Determines how often, in seconds, the system will attempt to connect to an unavailable origin server.

**Key information:**

-   This features requires the `Revalidate While Stale` feature.
-   This feature determines how often the system will attempt revalidation with an origin server whose configuration is in stale mode due to repeated TCP connection failures. However, it does not apply to requests that have been assigned a `Cache-Control: must-revalidate` directive.

<edgejs>
**Key information:**

-   This features requires the `revalidate_while_stale` feature.
-   This feature determines how often the system will attempt revalidation with an origin server whose configuration is in stale mode due to repeated TCP connection failures. However, it does not apply to requests that have been assigned a `Cache-Control: must-revalidate` directive.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "revalidate_while_stale_timer": 200,
    }
  })
```
</edgejs>

**Default Behavior:** By default, our CDN will not attempt to connect to your origin server while it is in stale mode.

#### Stale On Error {/*stale-on-error*/}

Determines whether expired cached content will be delivered when an error occurs during cache revalidation or when retrieving the requested content from an origin server.

Enabling this feature serves stale content when an error occurs during a connection to an origin server. Use the `Revalidate After Origin Unavailable` feature to configure the length of time after TTL expiration during which stale content may be delivered.

<Callout type="info">

  Each stale response includes a `Warning` response header.

</Callout>

<edgejs>
Enabling this feature serves stale content when an error occurs during a connection to an origin server. Use the `revalidate_after_origin_unavailable` feature to configure the length of time after TTL expiration during which stale content may be delivered.

<Callout type="info">

  Each stale response includes a `Warning` response header.

</Callout>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "stale_on_error": true,
    }
  })
```
</edgejs>

**Default Behavior:** By default, we forward the origin server's error response to the user.

#### Stale While Revalidate {/*stale-while-revalidate*/}

Improves performance by allowing our edge servers to serve stale content while revalidation takes place.

<edgejs>
**Syntax:** `<TIME>[s|m|h|d|w|y]`

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    caching: {
      "stale_while_revalidate": "10m",
    }
  })
```
</edgejs>

**Default Behavior:** Revalidation must take place before the requested content can be served.

## Headers {/*headers*/}

Header features add, modify, or delete headers from the request or response.

#### Add Response Headers {/*add-response-headers*/}

Adds one or more header(s) from the response. If the header already exists in the response, then the provided value will be appended to the existing response header value.

**Key information:**

-   **Syntax:** `"<HEADER NAME>": "<HEADER VALUE>"`
-   `<HEADER NAME>` must be an exact match for the desired response header. However, case is not taken into account for the purpose of identifying a header. 
-   Make sure to only use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Use [HTTP variables](#http-variables) to dynamically construct header values.
-   The following headers are reserved and cannot be modified by this feature:
    -   accept-ranges
    -   age
    -   connection
    -   content-encoding
    -   content-length
    -   content-range
    -   date
    -   server
    -   trailer
    -   transfer-encoding
    -   upgrade
    -   vary
    -   via
    -   warning 
    -   All header names that start with "x-ec" are reserved.

<edgejs>
**Key information:**

-   **Syntax:** `"<HEADER NAME>": "<HEADER VALUE>"`
-   `<HEADER NAME>` must be an exact match for the desired response header. However, case is not taken into account for the purpose of identifying a header. 
-   Make sure to only use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Use HTTP variables to dynamically construct header values.
-   The following headers are reserved and cannot be modified by this feature:
    -   accept-ranges
    -   age
    -   connection
    -   content-encoding
    -   content-length
    -   content-range
    -   date
    -   server
    -   trailer
    -   transfer-encoding
    -   upgrade
    -   vary
    -   via
    -   warning 
    -   All header names that start with "x-ec" are reserved.

**Example:**

The following example sets or appends `basketball` to the `sports` response header:

```js filename="./routes.js"
new Router()
  .get('/', {
    headers: {
      "add_response_headers": {
		"sports": "basketball"
      },
    }
  })
```
</edgejs>

#### Debug Header {/*debug-header*/}

Determines whether a response may include debug cache response headers which provide information on the cache policy for the requested asset.

Our CDN returns debug cache response headers when both of the following are true:

-   This feature has been enabled on the desired request.
-   The request includes the `X-EC-Debug` request header. This request header defines the set of debug cache response headers that will be included in the response.

    **Request Header Syntax:**        
    
    `X-EC-Debug: <DEBUG CACHE HEADER 1>,<DEBUG CACHE HEADER 2>,<DEBUG CACHE HEADER N>`
 
    **Sample Request Header:**

    `X-EC-Debug: x-ec-cache,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state`

<edgejs>
Our CDN returns debug cache response headers when both of the following are true:

-   The `debug_header` feature has been enabled on the desired request.
-   The request includes the `X-EC-Debug` request header. This request header defines the set of debug cache response headers that will be included in the response.

**Request Header Syntax:**

`X-EC-Debug: <DEBUG CACHE HEADER 1>,<DEBUG CACHE HEADER 2>,<DEBUG CACHE HEADER N>`
 
**Sample Request Header:**

`X-EC-Debug: x-ec-cache,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state`

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    headers: {
      "debug_header": true,
    }
  })
```
</edgejs>

**Default Behavior:** By default, the response excludes debug cache response headers.

#### Set Request Headers {/*set-request-headers*/}

Set, overwrite, append, or delete one or more header(s) from the request. 

**Key information:**

-   **Syntax:** `"<HEADER NAME>": "<HEADER VALUE>"`
-   `<HEADER NAME>` must be an exact match for the desired request header. However, case is not taken into account for the purpose of identifying a header. 
-   Use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Use the following syntax to determine the action that will be applied to the request header:
    -   **Set:** Set or overwrite a header's value by replacing `<HEADER NAME>` with a value that does not start with a `+` symbol. 
    -   **Append:** Add to the end of an existing request header value by prepending a `+` symbol to the header name. For example, append a value to the `broadcast` request header by specifying `+broadcast`.
    -   **Delete:** Set the header value to a blank value. Deleting a header will prevent it from being forwarded to an origin server by our edge servers.
-   Use [HTTP variables](#http-variables) to dynamically construct header values.
-   The following headers are reserved and cannot be modified by this feature:
    -   forwarded-for
    -   host
    -   vary
    -   via
    -   warning
    -   x-forwarded-for
    -   All header names that start with "x-ec" are reserved.

<edgejs>
**Key information:**

-   **Syntax:** `"<HEADER NAME>": "<HEADER VALUE>"`
-   `<HEADER NAME>` must be an exact match for the desired request header. However, case is not taken into account for the purpose of identifying a header. 
-   Use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Use the following syntax to determine the action that will be applied to the request header:
    -   **Set:** Set or overwrite a header's value by replacing `<HEADER NAME>` with a value that does not start with a `+` symbol. 
    -   **Append:** Add to the end of an existing request header value by prepending a `+` symbol to the header name.
    -   **Delete:** Set it to a blank value. Deleting a header will prevent it from being forwarded to an origin server by our edge servers.
-   Use HTTP variables to dynamically construct header values.
-   The following headers are reserved and cannot be modified by this feature:
    -   forwarded-for
    -   host
    -   vary
    -   via
    -   warning
    -   x-forwarded-for
    -   All header names that start with "x-ec" are reserved.

**Example:**

The following example:
-   Sets the `sports` request header to `basketball` regardless of whether it was previously set to another value. 
-   Appends ` ott` to the `broadcast` header's value. For example, if it were set to `network`, then the new value after this feature has been applied will be `network ott`.

```js filename="./routes.js"
new Router()
  .get('/', {
    headers: {
      "set_request_headers": {
		"sports": "basketball",
		"+broadcast": " ott"
      },
    }
  })
```
</edgejs>

#### Set Response Headers {/*set-response-headers*/}

Set, overwrite, append, or delete one or more header(s) from the response.

**Key information:**

-   **Syntax:** `"<HEADER NAME>": "<HEADER VALUE>"`
-   `<HEADER NAME>` must be an exact match for the desired response header. However, case is not taken into account for the purpose of identifying a header. 
-   Use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Use the following syntax to determine the action that will be applied to the response header:
    -   **Set:** Set or overwrite a header's value by replacing `<HEADER NAME>` with a value that does not start with a `+` symbol. 
    -   **Append:** Add to the end of an existing response header value by prepending a `+` symbol to the header name. For example, append a value to the `broadcast` response header by specifying `+broadcast`.
    -   **Delete:** Set it to a blank value. Deleting a header will prevent it from being included in the response to the client.
-   Use [HTTP variables](#http-variables) to dynamically construct header values.
-   The following headers are reserved and cannot be modified by this feature:
    -   accept-ranges
    -   age
    -   connection
    -   content-encoding
    -   content-length
    -   content-range
    -   date
    -   server
    -   trailer
    -   transfer-encoding
    -   upgrade
    -   vary
    -   via
    -   warning 
    -   All header names that start with "x-ec" are reserved.

<edgejs>
**Key information:**

-   **Syntax:** `"<HEADER NAME>": "<HEADER VALUE>"`
-   `<HEADER NAME>` must be an exact match for the desired response header. However, case is not taken into account for the purpose of identifying a header. 
-   Make sure to only use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Use the following syntax to determine the action that will be applied to the response header:
    -   **Set:** Set or overwrite a header's value by replacing `<HEADER NAME>` with a value that does not start with a `+` symbol. 
    -   **Append:** Add to the end of an existing response header value by prepending a `+` symbol to the header name.
    -   **Delete:** Set it to a blank value. Deleting a header will prevent it from being included in the response to the client.
-   Use HTTP variables to dynamically construct header values.
-   The following headers are reserved and cannot be modified by this feature:
    -   accept-ranges
    -   age
    -   connection
    -   content-encoding
    -   content-length
    -   content-range
    -   date
    -   server
    -   trailer
    -   transfer-encoding
    -   upgrade
    -   vary
    -   via
    -   warning 
    -   All header names that start with "x-ec" are reserved.

**Example:**

The following example:
-   Sets the `sports` response header to `basketball` regardless of whether it was previously set to another value. 
-   Appends ` ott` to the `broadcast` header's value. For example, if it were set to `network`, then the new value after this feature has been applied will be `network ott`.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    headers: {
      "set_response_headers": {
		"sports": "basketball",
		"+broadcast": " ott"
      },
    }
  })
```
</edgejs>

#### Remove Origin Response Headers {/*remove-origin-response-headers*/}

Deletes one or more header(s) from the response provided by an origin server.

**Key information:**

-   Set each string value to the exact name of the header that will be removed from the response provided by an origin server. Case is not taken into account for the purpose of identifying a header. 
-   Use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Our service adds a set of reserved headers to each response. Although this feature removes a header from the response provided by the origin server, it does not affect whether our service will add a reserved header to the response. 

<edgejs>
**Key information:**

-   Set each string value to the exact name of the header that will be removed from the response provided by an origin server. Case is not taken into account for the purpose of identifying a header. 
-   Use alphanumeric characters, dashes, or underscores when specifying a header name.
-   Our service adds a set of reserved headers to each response. Although this feature removes a header from the response provided by the origin server, it does not affect whether our service will add a reserved header to the response. 

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    headers: {
      "remove_origin_response_headers": ["city", "state", "zipcode"],
    }
  })
```
</edgejs>

#### Remove Response Headers {/*remove-response-headers*/}

Deletes one or more header(s) from a response.

**Key information:**

-   Set each string value to the exact name of the header that will be removed from the response. Case is not taken into account for the purpose of identifying a header. 
    -   Use alphanumeric characters, dashes, or underscores when specifying a header name.
    -   The following headers are reserved and should not be removed by this feature:
    -   accept-ranges
    -   age
    -   connection
    -   content-encoding
    -   content-length
    -   content-range
    -   date
    -   server
    -   trailer
    -   transfer-encoding
    -   upgrade
    -   vary
    -   via
    -   warning 
    -   All header names that start with "x-ec" are reserved.

<edgejs>
**Key information:**

-   Set each string value to the exact name of the header that will be removed from the response. Case is not taken into account for the purpose of identifying a header. 
-   Use alphanumeric characters, dashes, or underscores when specifying a header name.
-   The following headers are reserved and should not be removed by this feature:
    -   accept-ranges
    -   age
    -   connection
    -   content-encoding
    -   content-length
    -   content-range
    -   date
    -   server
    -   trailer
    -   transfer-encoding
    -   upgrade
    -   vary
    -   via
    -   warning 
    -   All header names that start with "x-ec" are reserved.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    headers: {
      "remove_response_headers": ["city", "state", "zipcode"],
    }
  })
```
</edgejs>

## Log {/*log*/}

Log features customize how log data is stored.

#### Custom Log Field {/*custom-log-field*/}

Determines the value that will be assigned to RTLD's custom log field. 

<Callout type="info">

  One use for this feature is to add request and response header values to your log data. 

</Callout>

-   **Request Header Syntax:** `%{<REQUEST HEADER>}i`

    **Examples:** `%{Accept-Encoding}i` `%{Referer}i` `%{Authorization}i`

-   **Response Header:** `%{<RESPONSE HEADER>}o`

    **Examples:** `%{Age}o` `%{Content-Type}o` `%{Cookie}o`

**Key information:**

-   A custom log field can contain any combination of header fields and plain text.
-   Valid characters for this field include the following: alphanumeric (i.e., 0-9, a-z, and A-Z), dashes, colons, semi-colons, apostrophes, commas, periods, underscores, equal signs, parentheses, brackets, and spaces. The percentage symbol and curly braces are only allowed when used to specify a header field.
-   The spelling for each specified header field must match the desired request/response header name.
-   When specifying multiple headers, it is recommended to use a separator to identify each header.

    For example, an abbreviation may be used to identify each header.

    **Sample Syntax:** `AE: %{Accept-Encoding}i A: %{Authorization}i CT: %{Content-Type}o`

-   This feature defines the value that will be set for the custom log field. If this feature is applied multiple times to the same request, then the last instance applied to the request will overwrite all previous instances.

<edgejs>
<Callout type="info">

  One use for this feature is to add request and response header values to your log data. 

</Callout>

-   **Request Header Syntax:** `%{<REQUEST HEADER>}i`

    **Examples:** `%{Accept-Encoding}i` `%{Referer}i` `%{Authorization}i`

-   **Response Header:** `%{<RESPONSE HEADER>}o`

    **Examples:** `%{Age}o` `%{Content-Type}o` `%{Cookie}o`

**Key information:**

-   A custom log field can contain any combination of header fields and plain text.
-   Valid characters for this field include the following: alphanumeric (i.e., 0-9, a-z, and A-Z), dashes, colons, semi-colons, apostrophes, commas, periods, underscores, equal signs, parentheses, brackets, and spaces. The percentage symbol and curly braces are only allowed when used to specify a header field.
-   The spelling for each specified header field must match the desired request/response header name.
-   When specifying multiple headers, it is recommended to use a separator to identify each header.

For example, an abbreviation may be used to identify each header.

**Sample Syntax:** `AE: %{Accept-Encoding}i A: %{Authorization}i CT: %{Content-Type}o`

-   This feature defines the value that will be set for the custom log field. If this feature is applied multiple times to the same request, then the last instance applied to the request will overwrite all previous instances.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    logs: {
      "custom_log_field_format": "%{Accept-Encoding}i %{Referer}i %{Authorization}i",
    }
  })
```
</edgejs>

**Default Value:** -

#### Log Query String {/*log-query-string*/}

Determines whether a query string will be stored along with the URL in access logs. This feature does not apply to requests whose URL does not contain a query string.

<edgejs>
**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    logs: {
      "log_query_string": true,
    }
  })
```
</edgejs>

**Default Behavior:** The default behavior is to ignore query strings when recording URLs in an access log.

#### Mask Client Subnet {/*mask-client-subnet*/} 

Masks the client's subnet for logging and reporting purposes.

This feature masks a client's subnet by:

-   **IPv4:** Setting the last octet to `0`.

    **Sample Scenario:**

    Applying this feature to a client whose IP address is `192.0.2.50` would result in the following masked IP address: `192.0.2.0`

-   **IPv6:** Setting the last 32 bits to `0`.

    **Sample Scenario:**

    Applying this feature to a client whose IP address is `2001:DB8::DD22:42:1234` would result in the following masked IP address: `2001:DB8::DD22:42:0`

<Callout type="tip">

  Use this feature as part of your General Data Protection Regulation (GDPR) compliance strategy.

</Callout>

<edgejs>
This feature masks a client's subnet by:

-   **IPv4:** Setting the last octet to `0`.

    **Sample Scenario:**

    Applying this feature to a client whose IP address is `192.0.2.50` would result in the following masked IP address: `192.0.2.0`

-   **IPv6:** Setting the last 32 bits to `0`.

    **Sample Scenario:**

    Applying this feature to a client whose IP address is `2001:DB8::DD22:42:1234` would result in the following masked IP address: `2001:DB8::DD22:42:0`

<Callout type="tip">

  Use this feature as part of your General Data Protection Regulation (GDPR) compliance strategy.

</Callout>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    logs: {
      "mask_client_subnet": true,
    }
  })
```
</edgejs>

**Default Behavior:** By default, the system logs a client's IP address without masking.

## Origin {/*origin*/}

Origin features control how the CDN communicates with an origin server.

#### Max Keep-Alive Requests {/*max-keep-alive-requests*/}

Defines the maximum number of requests for a `Keep-Alive` connection before it is closed. 

**Key information:**

-   Specify this value as a whole integer. Do not include commas or periods in the specified value.
-   Setting the maximum number of requests to a low value is strongly discouraged and may result in performance degradation.

<edgejs>
**Key information:**

-   Specify this value as a whole integer. Do not include commas or periods in the specified value.
-   Setting the maximum number of requests to a low value is strongly discouraged and may result in performance degradation.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    origin: {
      "max_keep_alive_requests": 12000,
    }
  })
```
</edgejs>

**Default Behavior:** 10,000 requests

#### Proxy Special Headers {/*proxy-special-headers*/}

Defines the set of CDN-specific request headers that will be forwarded from an edge server to an origin server. 

**Key information:**

-   Assign a value by typing it and then pressing 'ENTER'. Repeat this step as needed.
-   Each CDN-specific request header defined in this feature will be forwarded to an origin server.
-   Prevent a CDN-specific request header from being forwarded to an origin server by removing it from this list.

<edgejs>
**Key information:**

-   Each CDN-specific request header defined in this feature will be forwarded to an origin server.
-   Prevent a CDN-specific request header from being forwarded to an origin server by removing it from this list.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    origin: {
      "proxy_special_headers": ["X-Forwarded-For","X-Host","X-EC-Tag"],
    }
  })
```
</edgejs>

**Default Behavior:** By default, all CDN-specific request headers are forwarded to the origin server.

#### Set Origin {/*set-origin*/}

Defines the origin configuration to which requests will be forwarded when they cannot be served from cache.

<edgejs>
**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    origin: {
      "set_origin": "marketing",
    }
  })
```
</edgejs>

**Default Behavior:** By default, requests that are not served from cache are served through either Serverless Compute or the origin configuration mapped to the request's hostname. 

## Response {/*response*/}

Response features manipulate the response sent to the client.

#### Compress Content Types {/*compress-content-types*/}

Defines the set of media types (aka content type) that are eligible for edge server compression. 

**Key information:**

-   This feature only applies to assets whose size is less than 1 MB. Larger assets will not be compressed by our servers.
-   Certain types of content, such as images, video, and audio media assets (e.g., JPG, MP3, MP4, etc.), are already compressed. Additional compression on these types of assets will not significantly diminish file size. Therefore, the compression of these types of assets is not recommended.
-   Wildcard characters, such as asterisks, are not supported.

<edgejs>
**Key information:**

-   This feature only applies to assets whose size is less than 1 MB. Larger assets will not be compressed by our servers.
-   Certain types of content, such as images, video, and audio media assets (e.g., JPG, MP3, MP4, etc.), are already compressed. Additional compression on these types of assets will not significantly diminish file size. Therefore, the compression of these types of assets is not recommended.
-   Wildcard characters, such as asterisks, are not supported.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    response: {
      "compress_content_types": ["text/plain", "text/html", "text/css"],
    }
  })
```
</edgejs>

#### Allow Prefetching of Uncached Content {/*allow-prefetching-of-uncached-content*/}

Determines whether prefetching will be allowed for cache misses.

<edgejs>
Determines whether prefetching will be disabled for cache misses.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    response: {
      "disable_prefetching_uncached_content": true,
    }
  })
```
</edgejs>

**Default Behavior:** By default, prefetching is allowed for cache misses.

#### Set Done {/*set-done*/}

Determines whether to stop processing the request.

This feature is typically combined with the `Set Status Code` and `Set Response Body` features to send a custom response. 

Omitting this feature allows:
-   The request to be forwarded to an origin server.
-   The response to be cached. 

<edgejs>
This feature is typically combined with the `set_status_code` and `set_response_body` features to send a custom response. 

Omitting this feature allows:
-   The request to be forwarded to an origin server.
-   The response to be cached. 

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    response: {
      "set_status_code": 200,
      "set_response_body": "<!DOCTYPE html><title>hi</title>",
      "set_done": true,
    }
  })
```
</edgejs>

**Default Behavior:** By default, cache misses are forwarded to an origin server or to Serverless Compute. Additionally, responses are cached according to your caching policy.

#### Set Response Body {/*set-response-body*/}

Defines a custom response body.

**Key information:**

-   Use [HTTP variables](#http-variables) to dynamically construct this response body.
-   This response body is always sent instead of a cached response or the response provided by an origin server.
-   Prevent requests from being forwarded to an origin server by also passing the `set_done` feature.

<edgejs>
**Key information:**

-   Use HTTP variables to dynamically construct this response body.
-   This response body is always sent instead of a cached response or the response provided by an origin server.
-   Prevent requests from being forwarded to an origin server by also passing the `set_done` feature.

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    response: {
      "set_response_body": "<!DOCTYPE html><title>hi</title>",
    }
  })
```
</edgejs>

**Default Behavior:** By default, our CDN does not alter the response body sent to the client.

#### Set Status Code {/*set-status-code*/}

Defines the HTTP status code for the response sent to the client.

<edgejs>
**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    response: {
      "set_status_code": 200,
    }
  })
```
</edgejs>

**Default Behavior:** By default, the HTTP status code indicates how the request was handled. 

## Set Variables {/*set-variables*/}

This feature assigns a value to one or more user-defined variable(s) that are  passed to your bespoke traffic processing solution. Define each desired variable as a key-value pair. 

**Key information:**

-   This feature is only applicable when:
    -   Custom logic that is specific to your traffic controls how requests will be processed. Our CDN service supports the capability to define customized traffic processing logic. This solution addresses specialized customer needs that cannot be implemented through standard configuration. If your CDN traffic requires a bespoke solution, then contact our Solutions Engineering team.
    -   This bespoke solution expects a variable. 

    <Callout type="info">

      Upon implementing a bespoke solution, a member of our Solutions Engineering team will provide information about a variable's purpose and the information that should be passed to it.

    </Callout>

    <Callout type="info">

      Variables defined by this feature will be ignored when either a bespoke solution has not been defined for your CDN account or the specified variable has not been defined within your solution.

    </Callout>

-   HTTP variables may not be used when defining a user-defined variable.
-   Valid characters for the variable name are: alphanumeric, dashes, underscores, and periods.
-   **Syntax:** `"<VARIABLE>": "<VALUE>"`

<edgejs>
The `set_variables` object assigns a value to one or more user-defined variable(s) that are  passed to your bespoke traffic processing solution. Define each desired variable as a key-value pair. 

**Key information:**

-   This feature is only applicable when:
    -   Custom logic that is specific to your traffic controls how requests will be processed. Our CDN service supports the capability to define customized traffic processing logic. This solution addresses specialized customer needs that cannot be implemented through standard configuration. If your CDN traffic requires a bespoke solution, then contact our Solutions Engineering team.
    -   This bespoke solution expects a variable. 

    <Callout type="info">

      Upon implementing a bespoke solution, a member of our Solutions Engineering team will provide information about a variable's purpose and the information that should be passed to it.

    </Callout>

    <Callout type="info">

      Variables defined by this feature will be ignored when either a bespoke solution has not been defined for your CDN account or the specified variable has not been defined within your solution.

    </Callout>

-   HTTP variables may not be used when defining a user-defined variable.
-   Valid characters for the variable name are: alphanumeric, dashes, underscores, and periods.
-   **Syntax:** `"<VARIABLE>": "<VALUE>"`

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    set_variables: {
        "traffic": "standard",
        "event": "basketball",
    }
  })
```
</edgejs>

**Default Behavior:** By default, our CDN does not pass user variables. 

## URL {/*url*/}

URL features redirect or rewrite requests to a different URL.

#### Follow Redirects {/*follow-redirects*/}

Determines whether requests may be redirected to the hostname defined in the `Location` header returned by an origin server.

<Callout type="important">

  All requests, regardless of HTTP method (e.g., `POST` and `PUT`), are redirected as `GET` requests.

</Callout>

**Default Behavior:** By default, our edge servers will not follow the redirect defined in the `Location` response header returned by an origin server.

<edgejs>
<Callout type="important">

  All requests, regardless of HTTP method (e.g., `POST` and `PUT`), are redirected as `GET` requests.

</Callout>

**Example:**

```js filename="./routes.js"
new Router()
  .get('/', {
    url: {
      "follow_redirects": true,
    }
  })
```
</edgejs>

#### URL Redirect {/*url-redirect*/}

Redirects requests according to the `Location` header. Pass the following properties:

-   **Status Code:** Determines the HTTP status code for the response.
-   **Source:** Define a regular expression that identifies the requests that will be redirected by their relative path. This relative path starts directly after the hostname.

    <Callout type="important">

      Verify that the specified pattern does not conflict with this route's path.

    </Callout>

-   **Destination:** Define a regular expression for the URL to which the requests identified in the **Source** option will be redirected.

    <Callout type="info">

      Use [HTTP variables](#http-variables) to dynamically construct the above paths. However, you may not use response metadata.

    </Callout>

    <Callout type="info">

      Redirecting requests to a relative path may result in an invalid URL when fielding requests from various hostnames. Use an absolute URL to ensure that requests are properly redirected.

    </Callout>

<edgejs>
Pass the following properties:

-   **code (*Integer*):** Determines the HTTP status code for the response.
-   **source (*String*):** Define a regular expression that identifies the requests that will be redirected by their relative path. This relative path starts directly after the hostname.

    <Callout type="important">

      Verify that the specified pattern does not conflict with this route's path.

    </Callout>

-   **destination (*String*):** Define a regular expression for the URL to which the requests identified in the `source` property will be redirected. 
-   **syntax (*String*):** Determines whether the `source` property consists of a regular expression or a path that will be converted into a regular expression. Valid values are:

    -   **regexp:** Treats both the `source` and `destination` properties as regular expressions.

    <Callout type="info">

      You may use up to 9 numbered backreferences for text captured within the `source` property. 

      For example, if the `source` property contains two capture groups (e.g., `/(sales|marketing)/(.*)`, then you may backreference them within the `destination` property (e.g., `/$1/$2`). 

    </Callout>

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        url: {
          "url_redirect": {
            "source": "/marketing/images/(.*)",
            "destination": "/images/$1",
            "syntax": "regexp",
            "code": 301
            }
        }
      })
    ```

-   **path-to-regexp:** Treats both the `source` and `destination` properties as paths that will be converted into regular expressions. This syntax supports named parameters (e.g., `:productId`), which are defined by prefixing the parameter name with a colon. Backreference a named parameter defined within the `syntax` property by specifying it within the `destination` property.

    **Example:**

    ```js filename="./routes.js"
    new Router()
      .get('/', {
        url: {
          "url_redirect": {
            "source": "/marketing/images/:path",
            "destination": "/images/:path",
            "syntax": "path-to-regexp",
            "code": 301
            }
        }
      })
    ```

<Callout type="info">

  Use HTTP variables to dynamically construct the above paths. However, you may not use response metadata (e.g., `%{resp_<RESPONSE HEADER>}`).

</Callout>

</edgejs>
    
**Default Behavior:** By default, requests are not redirected.

#### URL Rewrite {/*url-rewrite*/}

Rewrites the request URL.

This feature allows our edge servers to rewrite the URL without performing a traditional redirect. This means that the client will receive the same response code as if the rewritten URL had been requested.

<Callout type="info">

  This feature takes precedence when multiple features will be applied to a request.

</Callout>

-   **Source Path:** Define a relative path that identifies the requests that will be rewritten. This relative path starts directly after the hostname.

    <Callout type="important">

      Verify that the specified pattern does not conflict with this route's path.

    </Callout>

    <Callout type="tip">

      Use the **Match Style** option to determine whether this option is a relative path that supports named parameters (e.g., `:productId`) or a regular expression.

    </Callout>

-   **Destination Path:** Define a regular expression that sets a new relative path. This relative path starts directly after the hostname. 

    <Callout type="info">

      You may use up to 9 numbered backreferences for text captured within the `source` property. 

      For example, if the **Source Path** option contains two capture groups (e.g., `/(sales|marketing)/(.*)`, then you may backreference them within the **Destination Path** option (e.g., `/$1/$2`). 

    </Callout>

    <Callout type="info">

      Use [HTTP variables](#http-variables) to dynamically construct the above paths. However, you may not use response metadata.

    </Callout>

<edgejs>
This feature allows our edge servers to rewrite the URL without performing a traditional redirect. This means that the requester will receive the same response code as if the rewritten URL had been requested.

<Callout type="info">

  This feature takes precedence when multiple features will be applied to a request.

</Callout>

-   **source (*String*):** Define a regular expression that identifies the requests that will be rewritten by their relative path. This relative path starts directly after the hostname.

    <Callout type="important">

      Verify that the specified pattern does not conflict with this route's path.

    </Callout>

-   **destination (*String*):** Define a regular expression that sets a new relative path. This relative path starts directly after the hostname. 

-   **syntax (*String*):** Determines whether the `source` property consists of a regular expression or a path that will be converted into a regular expression. Valid values are:

    -   **regexp:** Treats both the `source` and `destination` properties as regular expressions.

        <Callout type="info">

          You may use up to 9 numbered backreferences for text captured within the `source` property. 

          For example, if the `source` property contains two capture groups (e.g., `/(sales|marketing)/(.*)`, then you may backreference them within the `destination` property (e.g., `/$1/$2`). 

        </Callout>

        **Example:**

        ```js filename="./routes.js"
        new Router()
          .get('/', {
            url: {
              "url_rewrite": [{
                "source": "/marketing/images/(.*)",
                "destination": "/images/$1",
                "syntax": "regexp"
	          }]
            }
          })
        ```

    -   **path-to-regexp:** Treats both the `source` and `destination` properties as paths that will be converted into regular expressions. This syntax supports named parameters (e.g., `:productId`), which are defined by prefixing the parameter name with a colon. Backereference a named parameter defined within the `syntax` property by specifying it within the `destination` property.

        **Example:**

        ```js filename="./routes.js"
        new Router()
          .get('/', {
            url: {
              "url_rewrite": [{
                "source": "/marketing/images/:path",
                "destination": "/images/:path",
                "syntax": "path-to-regexp"
	          }]
            }
          })
        ```

<Callout type="info">

  Use HTTP variables to dynamically construct the above paths. However, you may not use response metadata (e.g., `%{resp_<RESPONSE HEADER>}`).

</Callout>

</edgejs>

**Default Behavior:** By default, requests are not rewritten.

## HTTP Variables {/*http-variables*/}

HTTP variables retrieves request and response metadata. Use this metadata to dynamically alter a request or a response.

The following features support HTTP variables:

-   [cache_key_rewrite](#cache-key-rewrite)
-   [add_response_headers](#add-response-headers)
-   [set_request_headers](#set-request-headers)
-   [set_response_headers](#set-response-headers)
-   [url_redirect](#url-redirect)
-   [url_rewrite](#url-rewrite)

### Definitions {/*definitions*/}

HTTP variables are described below.

<Callout type="info">

  A blank value is returned when GEO metadata (e.g., postal code) is unavailable for a particular request.

</Callout>

-   `%{geo_asnum}`**:** Indicates the client's AS number.

    **Sample Value:** `AS15133`

-   `%{geo_city}`**:** Indicates the client's city.

    **Sample Value:** `Los Angeles`

-   `%{geo_continent}`**:** Indicates the client's continent through its abbreviation. Valid values are:
    -   **AF:** Africa
    -   **AS:** Asia
    -   **EU:** Europe
    -   **NA:** North America
    -   **OC:** Oceania
    -   **SA:** South America

    **Sample Value:** `NA`

-   `%{cookie_<COOKIE>}`**:** Returns the value corresponding to the cookie identified by the `<COOKIE>` term. Replace dashes in the cookie name with underscores (e.g., change `preferences-cookie` to `preferences_cookie`).

    **Sample Usage:** `%{cookie__utma}`

    **Sample Value:** `111662281.2.10.1222100123`

-   `%{geo_country}`**:** Indicates the country from which the requested originated through its country code.

    **Sample Value:** `US`

-   `%{geo_dma_code}`**:** Indicates the client's media market by its region code. This field is only applicable to requests that originate from the United States.

    **Sample Value:** `745`

-   `%{request_method}`**:** Indicates the HTTP request method.

    **Sample Value:** `GET`

-   `%{status}`**:** Indicates the HTTP status code for the response.

    **Sample Value:** `200`

-   `%{virt_dst_addr}`**:** Indicates the client's IP address.

    **Sample Value:** `192.168.1.1`

-   `%{geo_latitude}`**:** Indicates the client's latitude.

    **Sample Value:** `34.0995`

-   `%{geo_longitude}`**:** Indicates the client's longitude.

    **Sample Value:** `-118.4143`

-   `%{geo_metro_code}`**:** Indicates the client's metropolitan area. This field is only applicable to requests that originate from the United States.

    **Sample Value:** `745`

-   `%{normalized_path}`**:** Indicates the normalized relative path for the request submitted to the CDN.

    **Key information:**

    -   This relative path excludes the query string.
    -   This relative path corresponds to the request submitted to the CDN and it does not reflect URL rewrites.
    -   URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.

    **Sample Value:** `/marketing/images/bunny.png`

-   `%{normalized_query}`**:** Indicates the normalized query string defined in the request URL. URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.

    **Original Query String:** `"client=/123?"`

    **Sample Value:** `%22client=/123?%22`

-   `%{normalized_uri}`**:** Indicates the normalized relative path and query string for the request submitted to the CDN.

    **Key information:**

    -   This relative path corresponds to the  request submitted to the CDN and it does not reflect URL rewrites.
    -   URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.

    **Sample Value:** `/dir/foo.js?%22client=/123?%22`

-   `%{path}`**:** Indicates the relative path to the requested content. 

    **Key information:**

    -   This relative path excludes the query string.
    -   This relative path reflects URL rewrites due to `url_rewrite`.

    **Sample Value:** `/rewrittendir/foo.js`

-   `%{virt_dst_port}`**:** Indicates the client's ephemeral port. 

    **Sample Value:** `55885`

-   `%{geo_postal_code}`**:** Indicates the client's postal code. We only return the first 3 characters for Canadian postal codes and the first 2 - 4 characters for United Kingdom postal codes.

    **Sample Value:** `90210`

-   `%{is_args}`**:** The value for this variable varies according to whether the request contains a query string.
    -   **Query String Found:** ?
    -   **No Query String:** NULL

    **Sample Value:** `?`

-   `%{is_amp}`**:** The value for this variable varies according to whether the request contains at least one query string parameter.
    -   **Parameter Found:** &
    -   **No Parameters:** NULL

    **Sample Value:** `&`

-   `%{arg_<QUERY STRING PARAMETER>}`**:** Returns the value corresponding to the query string parameter identified by the `<QUERY STRING PARAMETER>` term. 

    **Sample Usage:** `%{arg_language} `

    **Sample Query String Parameter:** `language=en`

    **Sample Value:** `en`

-   `%{query_string}`**:** Indicates the entire query string value defined in the request URL.

    **Sample Value:** `key1=val1&key2=val2&key3=val3`

-   `%{quic_altsvc_versions}`**:** Indicates the set of QUIC versions supported by our CDN service. This variable identifies QUIC versions using Google's latest specification.

    **Sample Value:** `h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000`

-   `%{quic_versions}`**:** Indicates the set of QUIC versions supported by our CDN service. This variable identifies QUIC versions using Google's legacy specification.

    **Sample Value:** `43,41,39,35`

-   `%{referring_domain}`**:** Indicates the domain defined in the `Referer` request header. 

    **Sample Value:** `www.google.com`

-   `%{geo_region}`**:** Indicates the client's region (e.g., state or province) through its alphanumeric abbreviation. 

    **Sample Value:** `CA`

-   `%{http_<REQUEST HEADER>}`**:**  Returns the value corresponding to the request header identified by the `<REQUEST HEADER>` term. Replace dashes in the request header name with underscores (e.g., change `User-Agent` to `User_Agent`).

    **Sample Usage:** `%{http_Connection} `

    **Sample Value:** `Keep-Alive`

-   `%{host}`**:** Indicates the host defined in the request URL. 

    **Sample Value:** `www.example.com`

-   `%{http_x_ec_uuid}`**:** Indicates a request's unique system-defined ID.  A new ID is generated whenever a client (i.e., user agent) submits a request.

    **Sample Value:** `12345678901234567890123456789012345678`

-   `%{virt_http_version}`**:** Indicates the version of the client's request protocol.

    **Sample Value:** `2.0`

-   `%{request_protocol}`**:** Indicates the request protocol used by an edge server to proxy the request.

    **Sample Value:** `HTTP/1.1`

-   `%{scheme}`**:** Indicates the request scheme.

    **Sample Value:** `http`

-   `%{request}`**:** Describes the request.

    **Syntax:**

    `<HTTP METHOD> <RELATIVE PATH> <PROTOCOL>`

    -   `<HTTP METHOD>`**:** Indicates the HTTP method that was requested. 
    -   `RELATIVE PATH>`**:** Indicates the relative path, including query string parameters, defined in the request URI.
    -   `<PROTOCOL>`**:** Indicates the HTTP protocol and version that was requested.

    **Sample Value:** `GET /marketing/foo.js?loggedin=true HTTP/1.1`

-   `%{request_uri}`**:** Indicates the relative path, including the query string, defined in the request URI.

    **Sample Value:** `/marketing/foo.js?loggedin=true`

-   `%{resp_<RESPONSE HEADER>}`**:**  Returns the value corresponding to the response header identified by the `<RESPONSE HEADER>` term. Replace dashes in the response header name with underscores (e.g., change `User-Agent` to `User_Agent`).

    <Callout type="info">

      Requests cannot be defined using variables associated with response metadata. For example, this variable cannot be used to define a request header through the `set_request_headers` feature.

    </Callout>

    **Sample Usage:** `%{resp_Content_Length}`

    **Sample Value:** `100`

-   `%{http_x_ec_session_id}`**:** Indicates a unique system-defined ID for the request's connection to our servers.

    <Callout type="tip">

      Multiple rapid requests by a single client may result in a single session ID when the connection is reused for those requests. Use `%{http_x_ec_uuid}` if you require a unique ID for each request.

    </Callout>

    **Sample Value:** `12345678901234567890123456789012345678`

-   `%{virt_ssl_cipher}`**:** Indicates the name of the cipher suite used to secure a HTTPS connection.

    **Sample Value:** `ECDHE-RSA-AES256-SHA`

-   `%{virt_ssl_protocol}`**:** Indicates the SSL/TLS protocol used to secure a HTTPS connection. 

    **Sample Value:** `TLSv1.2`

### Usage {/*usage*/}

HTTP variables support the following syntax:

-   **HTTP Variable:** Use this syntax to get the entire value corresponding to the specified HTTP variable. 

    **Example:** `%{host}`

-   **HTTP Variable with a Delimiter:** Use this syntax to transform the value corresponding to the specified HTTP variable. 

    **Example:** The following example converts the value associated with the `%{host}` variable to lower-case.

    `%{host,}`

-   **HTTP Variable with a Delimiter and an Expression:** Use regular expressions to replace, delete, or manipulate an HTTP variable's value. 

    **Example:** `%{host/=^www\.([^\.]+)\.([^\.:]+)/cdn.$2.$3:80}`

<Callout type="important">

  HTTP variable names only support alphabet characters and underscores. Convert unsupported characters to underscores. 

</Callout>

#### Delimiter Quick Reference {/*delimiter-quick-reference*/}

A delimiter can be specified after an HTTP variable to achieve any of the following effects:

-   Transform the value associated with the variable.

    **Example:** Convert the entire value to lower-case.

-   Delete the value associated with the variable.
-   Manipulate the value associated with the variable.

    **Example:** Use regular expressions to change the value associated with the HTTP variable.

A brief description for each delimiter is provided below.

| Delimiter | Description                                                                                                     |
|-----------|-----------------------------------------------------------------------------------------------------------------|
| :=        | Indicates that a default value will be assigned to the variable when it is either missing or set to NULL.       |
| :+        | Indicates that a default value will be assigned to the variable when a value has been assigned to it.           |
| :         | Indicates that a substring of the value assigned to the variable will be expanded.                              |
| #         | Indicates that the pattern specified after this delimiter should be deleted when it is found at the beginning of the value associated with the variable.  |
| %         | Indicates that the pattern specified after this delimiter should be deleted when it is found at the end of the value associated with the variable. The above definition is only applicable when the % symbol is used as a delimiter.                               |
| /         | Delimits an HTTP variable or a pattern.                                                                         |
| //        | Find and replace all instances of the specified pattern.                                                        |
| /=        | Find, copy, and rewrite all occurrences of the specified pattern.                                               |
| ,         | Convert the value associated with the HTTP variable to lower-case.                                              |
| ^         | Convert the value associated with the HTTP variable to upper-case.                                              |
| ,,        | Convert all instances of the specified character in the value associated with the HTTP variable to lower-case.  |
| ^^        | Convert all instances of the specified character in the value associated with the HTTP variable to upper-case.  |

#### Exceptions {/*exceptions*/}

Text will not be treated as an HTTP variable under the following circumstances:

-   **Escaping % Symbol:** The percentage symbol can be escaped through the use of a backslash.

    **Example:** The following sample value will be treated as a literal value and not as an HTTP variable: `\%{host}`

-   **Unknown Variables:** An empty string is always returned for unknown variables.

    **Example:** `%{unknownvariable}`

-   **Invalid Characters or Syntax:** Variables that contain invalid characters or syntax are treated as literal values.

    **Example #1:** The following value contains an invalid character (i.e., -): `%{resp_user-agent}`
    **Example #2:** The following value contains a double set of curly braces: `%{{host}}`
    **Example #3:** The following value is missing a closing curly brace: `%{host`

-   **Missing Variable Name:** A NULL value is always returned when a variable is not specified.

    **Example:** `%{}`

-   **Trailing Characters:** Characters that trail a variable are treated as literal values.

    **Example:** The following sample value contains a trailing curly brace that will be treated as a literal value: `%{host}}`

#### Setting Default Header Values {/*setting-default-header-values*/}

A default value can be assigned to a header when it meets any of the following conditions:

-   Missing/unset
-   Set to `NULL`.

Define this default value through any of the following methods:

-   Set a header to a default value when the header is missing or its value is set to `NULL`. 

    **Syntax:** `%{<HTTP VARIABLE>:=<DEFAULT VALUE>}`

    **Example:** The following value sets the `Referer` header to `unspecified` when it is either missing or set to NULL. No action will take place if it has been set.

    `%{http_referer:=unspecified}`

-   Set a header to a default value when it is missing. 

    **Syntax:** `%{<HTTP VARIABLE>=<DEFAULT VALUE>}`

    **Example:** The following value sets the `Referer` header to `unspecified` when it is missing. No action will take place if it has been set.

    `%{http_referer=unspecified}`

-   Set the header to a default value when it does not meet any of the following conditions:

    -   Missing header.
    -   Set to `NULL`.

    **Syntax:** `%{<HTTP VARIABLE>:+<DEFAULT VALUE>}`

    **Example:** The following value sets the `Referer` header to `unspecified` when a value has been assigned to it. No action will take place if it has been set.

    `%{http_referer:+unspecified}`

#### Manipulating Variables {/*manipulating-variables*/}

Variables can be manipulated in the following ways:

-   Expanding substrings
-   Removing patterns

#### Substring Expansion {/*substring-expansion*/}

By default, a variable will expand to its full value. Use the following syntax to only expand a substring of the variable's value:

`%{<VARIABLE>:<OFFSET>:<LENGTH>}`

**Key information:**

-   The value assigned to the `<OFFSET>` term determines the starting character of the substring.
    -   **Positive:** The starting character of the substring is calculated from the first character in the string. 
    -   **Zero:** The starting character of the substring is the first character in the string.
    -   **Negative:** The starting character of the substring is calculated from the last character in the string. 

-   The length of the substring is determined by the `<LENGTH>` term.
    -   **Omitted:** Omitting the `<LENGTH>` term allows the substring to include all characters between the starting character and the end of the string.
    -   **Positive:** Determines the length of the substring from the starting character to the right.
    -   **Negative:** Determines the length of the substring from the starting character to the left.

**Example:**

This example relies on the following sample request URL:
`https://cdn.mydomain.com/folder/marketing/myconsultant/proposal.html`

The following string demonstrates various methods for manipulating variables:
`https://www%{http_host:3}/mobile/%{request_uri:7:10}/%{request_uri:-5:-8}.htm`

Based on the sample request URL, the above variable manipulation will produce the following value:
`https://www.mydomain.com/mobile/marketing/proposal.htm`

#### Pattern Removal {/*pattern-removal*/}

Text that matches a specific pattern can be removed from either the beginning or the end of a variable's value. 
-   Remove text when the specified pattern is found at the beginning of a variable's value.

    `%{<VARIABLE>#<PATTERN>}`

-   Remove text when the specified pattern is found at the end of a variable's value.

    `%{<VARIABLE>%<PATTERN>}`

#### Find And Replace {/*find-and-replace*/}

Find and replace syntax is described below.

-   Find and replace first occurrence of the specified pattern.

    **Syntax:** `%{<VARIABLE>/<FIND>/<REPLACE>}`

-   Find and replace all occurrences of the specified pattern.

    **Syntax:** `%{<VARIABLE>//<FIND>/<REPLACE>}`

-   Convert the entire value to upper-case.

    **Syntax:** `%{<VARIABLE>^}`

-   Convert the first occurrence of the specified pattern to upper-case.

    **Syntax:** `%{<VARIABLE>^<FIND>}`

-   Convert the entire value to lower-case.

    **Syntax:** `%{<VARIABLE>,}`

-   Convert the first occurrence of the specified pattern to lower-case.

    **Syntax:** `%{<VARIABLE>,<FIND>}`

**Key information:**

-   Expand text that matches the specified pattern by specifying a dollar sign followed by a whole integer (e.g., `$1`).
-   Multiple patterns may be specified. The order in which the pattern is specified determines the integer that will be assigned to it. 

    In the following example, the first pattern matches `www` or `www` followed by a single digit, the second pattern matches the second-level domain, and the third pattern matches the top-level domain.

    `%{host/=^(www\d?)\.([^\.]+)\.([^\.:]+)/cdn.$2.$3:80}`

-   The rewritten value can consist of any combination of text and these placeholders.

    In the above example, the hostname will be rewritten according to this pattern: `cdn.$2.$3:80` (e.g., cdn.mydomain.com:80).

-   The case of a pattern placeholder (e.g., `$1`) can be modified through the following flags:

    -   **U:** Upper-case the expanded value.

        **Sample syntax:** `%{host/=^(www\d?)\.([^\.]+)\.([^\.:]+)/cdn.$U2.$3:80}`

    -   **L:** Lower-case the expanded value.

        **Sample syntax:** `%{host/=^(www\d?)\.([^\.]+)\.([^\.:]+)/cdn.$L2.$3:80}`

-   An operator must be specified before the pattern. The specified operator determines the pattern capturing behavior:
    -   `=` indicates that all occurrences of the specified pattern must be captured and rewritten.
        `^` indicates that only text that starts with the specified pattern will be captured.
        `$` indicates that only text that ends with the specified pattern will be capture.
-   Omitting the `/<REWRITE>` value will result in the deletion of the text that matches the pattern.

