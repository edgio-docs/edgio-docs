---
title: Basic Website Security
---

Basic security recommendations for your website are provided below. Additionally, we strongly recommend that you implement a [security policy](/applications/security/waf) to protect against application layer attacks. 

## TLS Version {/*tls-version*/}

We recommend that you enable TLS 1.3, 1.2, or both on your web server(s).

**Key information:**
-   A recommended best practice is to disable support for SSL/TLS versions 1.1 or older.
-   TLS 1.3 improves security and performance of internet communications. Specifically, it eliminates known TLS 1.2 security vulnerabilities and prevents snooping and man-in-the-middle attacks.

## HTTP/1/2 Version {/*http12-version*/}

We support the following HTTP protocol versions for client requests to our network:
-   **HTTP/1:** {{ PRODUCT }} uses the HTTP protocol version defined in the request when proxying requests to an origin and in the response provided to the client.
-   **HTTP/2:** {{ PRODUCT }} uses the the HTTP/1.1 protocol when proxying requests to an origin and the HTTP/2 protocol for the response provided to the client.

<Callout type="info">

  {{ PRODUCT }} also supports HTTP/3 for the communication between the client and the edge of our network, but it requires enablement. Contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to enable it on your account.

</Callout>

## Secrets {/*secrets*/}

Rather than putting secret values such as API keys in your code and checking them into source control, you can securely
store them in environment variables, then access them in your code from `process.env`.

**To configure environment variables**

1.  Navigate to the **Environment Variables** page.
    {{ ENV_NAV }} **Environment Variables**.
2.  Click **+ Add Environment Variable**.
3.  Set the **Key** option to the name of the desired environment variable. Use this name to reference the environment variable in your code.
4.  Set the **Value** option to the value that will replace references to this environment variable.
5.  If this environment variable contains sensitive information, mark the **Keep this value a secret** option.
6.  Click **Add variable**.

    Your new environment variable should now be listed.

    ![networking](/images/security/environment-variables.png?width=700)

Deploying to an environment using a deploy token pulls all environment variables and applies them to `process.env`. This allows these variables to be accessed at build time.

**Deploying with a deploy token example:** `{{ FULL_CLI_NAME }} deploy my-organization --environment=production --token=(my token)`

Use environment variables to store all of your build and runtime secrets in a single place, {{ PORTAL }}, rather than storing some in your CI system's secret manager.

## Cache Poisoning {/*cache-poisoning*/}

[Cache poisoning attack](https://owasp.org/www-community/attacks/Cache_Poisoning) is described by OWASP&reg; as:

> The impact of a maliciously constructed response can be magnified if it is cached either by a web cache used by multiple users or even the browser cache of a single user. If a response is cached in a shared web cache, such as those commonly found in proxy servers, then all users of that cache will continue to receive the malicious content until the cache entry is purged.

Guard against this type of attack by ensuring that all request parameters that influence content rendering are included within your [cache key](/applications/performance/caching/cache_key).

For example, if you are rendering content based on a custom language cookie, then you must include it in your custom cache key:

```js filename="./routes.js"
export default new Router().match("/language/specific/:path", {
    caching: {
        cache_key: {
          exclude_all_query_params: true,
          include_cookies: ["language"],
        },
    },
});
```