---
title: Prefetching with a Script Tag
---

Set up predictive prefetching by adding a script tag to all of your pages.

**Key information:**

-   By default, only content that has already been cached on the POP closest to the user may be prefetched. {{ PRODUCT }} returns a [412 Precondition Failed response](/guides/performance/troubleshooting#412-precondition-failed-status-code) for prefetch requests that result in cache misses. This ensures that your infrastructure does not experience additional load due to prefetching. 

-   Due to security requirements, prefetching requires the HTTPS protocol. An exception to this requirement occurs when using localhost.

-   If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }} or a JavaScript front-end framework, you can achieve deeper prefetch integration and custom behavior by installing the `{{ PACKAGE_NAME }}/prefetch` package.  [Learn how to install and use this package](/guides/performance/prefetching/prefetching_edgio_sites).

## Setup {/*setup*/}

Perform the following steps:

1.  [Register the service worker](#registering-the-service-worker-traditional-website) by adding a prefetching script tag to your web pages.
2.  [Enable prefetching](#automatic-prefetching-traditional-website) for the desired requests by adding the following features within one or more rules:
    
    -   [Set Max Age (max_age)](/guides/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/guides/performance/rules/features#set-service-worker-max-age) 

    Alternatively, you may [manually enable prefetching](#manual-prefetching-traditional-website) for specific requests.

### Registering the Service Worker {/*registering-the-service-worker-traditional-website*/}

Prefetching requires a pre-built service worker. Add this service worker by including the following script tag to your existing site's HTML:

```html
<script src="/__edgio__/prefetch/install.js" defer></script>
```

This script tag installs the latest version of the [`{{ PACKAGE_NAME }}/prefetch`](https://www.npmjs.com/package/@edgio/prefetch?activeTab=versions) package.

Alternatively, you may install a specific version of this package by adding the version to the script tag as shown below.
The lowest supported version is `v7.3.1`.

```html
<script src="/__edgio__/prefetch/v7.3.1/install.js" defer></script>
```

**Example:**

```html diff
<html>
<head>
    <title>My awesome site</title>
</head>
<body>
    <h1>My awesome page</h1>
    <p>This site uses the {{ PACKAGE_NAME }}/prefetch package.</p>
    
+   <script src="/__edgio__/prefetch/install.js" defer></script>
</body>
</html> 
```

This package supports the following attributes:

| Attribute                   | Description                                                                                                                                                                                                                                   | Default |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `data-include-cache-misses` | Set to `true` to enable prefetching from the origin when a cached response is not found.                                                                                                                                               | `false` |
| `data-force-prefetch-ratio` | Determines the probability that a request will be prefetched from the origin when a cached response is not found. This attribute is ignored when the `data-include-cache-misses` attribute has been enabled. Valid values are: `0 - 1`. <br /><br />For example, set it to `0.5` to enable this behavior for 50% of the requests. | `0`     |

**Example:**
```html
<script src="/__edgio__/prefetch/install.js" data-include-cache-misses="true" defer></script>
```

### Automatic Prefetching {/*automatic-prefetching-traditional-website*/}

{{ PRODUCT }} will attempt to prefetch links that meet all of the following conditions:

-   [The `{{ PACKAGE_NAME }}/prefetch` script has been included on a page.](#registering-the-service-worker-traditional-website)
-   The link is displayed in the viewport (i.e., the area of the web page that is currently visible to the user).
-   The link matches at least one rule that contains both of the following features:
    -   [Set Max Age (max_age)](/guides/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/guides/performance/rules/features#set-service-worker-max-age) 

<Callout type="info">

  Prefetch requests are given the lowest priority. This ensures that they do not block more critical requests like API calls, images, scripts, and navigation.

</Callout>

By default, the response varies according to whether the requested content has been cached within the POP closest to the user. 
-   If a cached response is found, then {{ PRODUCT }} will serve this cached content to the browser. The browser will then cache it locally for the duration defined by the Set Service Worker Max Age (service_worker_max_age) feature. 
-   If a cached response is not found, then {{ PRODUCT }} will return a [412 Precondition Failed response](/guides/performance/troubleshooting#412-precondition-failed-status-code).

    <Callout type="info">

      Override this behavior by enabling the `data-include-cache-misses` attribute.

    </Callout>

**Example:**

```html
<html>
<head>
    <title>My awesome site</title>
</head>
<body>
    <h1>My awesome page</h1>
    <p>This site uses the {{ PACKAGE_NAME }}/prefetch package.</p>
    <nav>
        <a href="/pages/1">Page 1</a>
        <a href="/pages/2">Page 2</a>
        <a href="/pages/3">Page 3</a>
    </nav>
    
    <script src="/__edgio__/prefetch/install.js" defer></script>
</body>
</html> 
```

Add the following rule to cache and prefetch all navigation links in the above example:

-   **Rules:**

    ![Prefetch rule](/images/v7/performance/prefetch_rule.png)

-   **CDN-as-Code:**

    ```js filename="routes.js"
    import { Router } from '{{ PACKAGE_NAME }}/core/router'

    export default new Router()
        //  This rule's path matches the navigation links href attribute
        .match("/pages/:id", {
            caching: {
                max_age: "1h", // Caches the response on the edge for 1 hour
                service_worker_max_age: "1h" // Enables automatic prefetching and caches the response in the browser SW cache for 1 hour
            }
        })
    ```

Verify that links are automatically prefetched and cached locally by opening the **Network** tab of your browser's developer tools (F12). 

![Prefetch requests on the Network tab of a browser's developer tools](/images/v7/performance/prefetch_network_tab.png)

### Manual Prefetching {/*manual-prefetching-traditional-website*/}

Call the [Edgio.prefetch() function](/docs/api/prefetch/functions/window_prefetch.prefetch.html) from your code to manually prefetch resources.

**Example:**

```html
<html>
<head>
    <title>My awesome site</title>
</head>
<body>
    <h1>My awesome page</h1>
    <p>This site uses the {{ PACKAGE_NAME }}/prefetch package.</p>
    <nav>
        <a href="/pages/1">Page 1</a>
        <a href="/pages/2">Page 2</a>
        <a href="/pages/3">Page 3</a>
    </nav>
    
    <script src="/__edgio__/prefetch/install.js" defer></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const { prefetch } = Edgio;
            prefetch('/static/img/my-image.png');
            prefetch('/static/img/another-image.png', 'image', {
                // Override service_worker_max_age config for this call
                maxAgeSeconds: 60 * 60 // 1 hour
            });
        });
    </script>
</body>
</html> 
```