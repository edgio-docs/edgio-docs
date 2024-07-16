---
title: Origins
---

An origin configuration defines how {{ PRODUCT }} communicates with your web server(s).

<Callout type="info">

**CDN-as-Code Only:** If you are using CDN-as-code, then you should [manage your origin configurations within your {{ CONFIG_FILE }}](/applications/performance/cdn_as_code#defining-origins). Deploying your CDN-as-code configuration will update the set of origin configurations listed on the **Origins** page.

In addition to your custom origin configurations, {{ PRODUCT }} automatically creates [system-defined origin configurations](#system-defined-origins) for our cloud infrastructure as part of your initial CDN-as-code deployment. Do not modify these system-defined origin configurations.

</Callout>

## Setup {/* setup */}

Create an origin configuration for each desired grouping of web server(s).

**Key information:**

- Each origin configuration identifies a set of web server(s) by hostname or IP address. You may specify up to 4 hostnames or IP addresses.
- [Load balance](#load-balancing) requests to the web servers associated with an origin configuration using either primary/failover or round-robin mode.
- The maximum number of origin configurations per environment is 100. <a id="override-host-header" />
- By default, our CDN forwards the `Host` header provided by the client when proxying requests to your origin server(s). You may override the client's `Host` header by setting the **Override Host Header** option to the desired hostname. This forces our CDN to set the `Host` header to the specified hostname whenever it proxies traffic to the origin server(s) associated with this origin configuration.

  <Callout type="tip">

  Overriding the `Host` header is useful when your origin implementation uses multiple virtual hosts or a virtual host with multiple aliases. <!--

  You should also define this setting if you are using [CDN-as-code](/applications/performance/cdn_as_code) and your configuration proxies traffic to an origin configuration. You will be unable to test your configuration on your local machine until you define this setting within your property's {{ CONFIG_FILE }} file. -->

  </Callout>

- Malicious actors may bypass the security provided by our service by directly targeting your origin server(s). We strongly recommend that you set up your firewall to only allow traffic from trusted sources (e.g., our network) and to obfuscate your origin.

**To add an origin configuration** <a id="add-origin-configuration"></a>

1.  Load the **Origins** page.

    {{ ENV_NAV }} **Origins**.

2.  Click **+ Add Origin**.

    ![Add Origin](/images/v7/basics/origins-add-origin.png?width=600)

3.  In the **Name** option, assign a name to this origin configuration. This name should only consist of alphanumeric characters, hyphens, periods, and underscores.

    <Callout type="info">

    We recommend a unique, descriptive name to help you quickly map hostname(s) to this origin configuration.

    </Callout>

4.  Define one or more host(s). Each host determines how {{ PRODUCT }} will communicate with your web server(s).

    ![Define host](/images/v7/basics/origins-add-origin-2.png?width=600)

    1.  In the **Origin Hostname** option, type a hostname or IP address that points to your web server(s).
    2.  Optional. Set the **Port** option to the port over which our network will serve traffic to the above hostname or IP address.
    3.  Optional. Set the **IP Version Preference** option to define a preference on how {{ PRODUCT }} will [resolve a hostname](#origin-hostname-resolution) defined within the **Origin Hostname** option.
    4.  Set the **Scheme** option to always serve traffic to your hosts over HTTPS, HTTP, or to match the client's scheme. Matching a client's scheme means that our network will serve HTTP traffic to your web servers over port 80, while HTTPS traffic will be served over port 443.
    5.  Optional. [Override the client's Host header](#override-host-header) by setting the **Override Host Header** option to the desired hostname.
    6.  Optional. Add another host to this origin configuration by clicking **+ Add Host** and then performing steps 4.i - 4.v.
    7.  Optional. Set the **Balancer type** option to the desired [load balancing mode](#load-balancing) for requests proxied to your web servers.

5.  Define [TLS settings for this origin configuration](#origin-tls-settings) through the **Origin TLS Settings** section.

    1.  Most web servers require a SNI hint during the TLS handshake. Define this SNI hint through the **Use SNI** option. By default, this option is set to the value assigned to the **Override Host Header** option.

        Perform either of the following steps:

        - If your web server requires a SNI hint, verify or set the SNI hint through the **Use SNI** option.

          <Callout type="info">

          Upon enabling SNI, our service will perform a strict check using this hostname against the certificate's Subject Alternative Name (SAN) or Common Name (CN) during the TLS handshake.

          </Callout>

        - If your web server does not use SNI, then you should disable the **Use SNI** option. You should also verify that the **Use the following SNI hint and enforce origin SAN/CN checking** option is set to a blank value.

    2.  If your origin servers use a self-signed certificate, then you should toggle the **Allow Self Signed Certs** option to the on position (<Image inline src="/images/v7/icons/toggle-on.png" alt="Toggle on" />). Otherwise, this option should be disabled.
    3.  Set up [certificate pinning](#certificate-pinning) by adding one or more public keys.

        1.  Click **+ Add Pin**.
        2.  Paste the SHA-1 digest for the public key of your leaf certificate.
        3.  Repeat steps 1 and 2 as needed.

6.  Optional. Protect your origin by defining one or more [shield POP(s)](/applications/security/origin_shield). Click on the **Shields** section to expand it.

    1.  Assign a POP location to the region closest to your web server(s).

        Upon configuring a region, all other regions will be updated from `Bypass` to the selected POP. This configuration means that cache misses from all regions will be proxied to the selected POP location.

        ![Single Shield](/images/v7/security/origin-shield-single.png?width=600)

    2.  Optional. Assign a POP location to a different region.

        Upon configuring a second region, the remaining regions are automatically updated from the selected POP to `Use the shield with the lowest RTT`. This configuration means that cache misses from the remaining regions will be proxied to the shield POP that will provide the best performance.

        For example, the following configuration may potentially allow cache misses from the APAC region to be served through the shield location defined for the US West region (i.e., `OXR`).

        ![Multiple Shields](/images/v7/security/origin-shield-multiple.png?width=600)

    3.  Optional. Repeat step 2 as needed.

    4.  Optional. Configure cache misses from a specific region to always be proxied to your origin by selecting `Bypass`.

7.  Optional. Customize whether {{ PRODUCT }} will submit follow-up requests for specific status codes through the [Retry Status Codes settings](#follow-up-requests).

8.  If you are finished making changes to this environment, click **Deploy Changes**.
    <a id="primary-failover-load-balancing" />

## Origin TLS Settings {/* origin-tls-settings */}

An origin configuration's TLS settings determine how {{ PRODUCT }} will communicate with your web servers during the TLS handshake. <a id="sni" />

- **SNI:** An origin configuration's **Use SNI** option determines whether {{ PRODUCT }} will:

  - Provide a Server Name Indication (SNI) hint to your origin server during the TLS handshake. A SNI-enabled web server uses a SNI hint to determine the TLS certificate that will be returned.
  - Perform a strict check using the hostname defined within this option against the certificate’s Subject Alternative Name (SAN) or Common Name (CN) during the TLS handshake. If the hostname does not match, then we will respond with a `502 Bad Gateway` response.

  Enable this option and provide a SNI hint if your web servers require SNI. Otherwise, your web server will reject the request and our edge servers will respond with a `502 Bad Gateway` response. <a id="self-signed-certificates" />

- By default, our network disables delivery and responds with a `502 Bad Gateway` when we detect an origin server using a self-signed certificate during the TLS handshake. Allow {{ PRODUCT }} to serve traffic when it detects a self-signed certificate by enabling the **Allow Self-Signed Certs** option. <a id="certificate-pinning" />
- Register the SHA-1 digest for the public key of your end-entity (i.e., leaf) certificate within the **Pinned Cert(s)** option. After which, our edge servers will respond with a `502 Bad Gateway` response when the SHA-1 digest for the public key detected from the origin server does not match one of the pinned certificates.

## Follow-Up Requests {/*follow-up-requests*/}

By default, {{ PRODUCT }} submits follow-up requests when an [origin is unavailable](#unavailable-servers). Customize this behavior and extend it to other status codes by setting the **Retry Status Codes** setting to one or more status code(s) (e.g., `429`, `502`, and `503`). After which, define the follow-up behavior for those status codes through the following settings:

-   **The number of seconds that our edge servers will wait before retry:** Determines the number of seconds that our edge servers will wait before retrying a request to that origin entry.
-   **Maximum number of request retries:** Determines the maximum number of attempts that {{ PRODUCT }} will make to connect to that origin entry.
-   **The maximum number of seconds our edge servers will wait before retry:** Determines the maximum number of seconds that {{ PRODUCT }} will wait between attempts to connect to that origin entry. 
-   **Ignore the Retry-After origin response header:** Determines whether {{ PRODUCT }} will ignore the `Retry-After` response header for this origin configuration. 
    -   **Enabled:** {{ PRODUCT }} will ignore the `Retry-After` header provided in the response.
    -   **Disabled:** The `Retry-After` response header takes precedence over the origin configuration's **Retry Status Codes** settings. These settings will only be applicable when the `Retry-After` header is missing from the response.

## System-Defined Origins {/* system-defined-origins */}

{{ PRODUCT }} will add the following origin configurations for properties deployed using our [CDN-as-code (EdgeJS)](/applications/performance/cdn_as_code) approach:

<Callout type="important">

These system-defined origins should not be modified or deleted.

</Callout>

- **`{{ PRODUCT_LOWER }}_image_optimizer`**: Used for serving images through the [image optimization](/applications/performance/image_optimization) feature.
- **`{{ PRODUCT_LOWER }}_permanent_static`**: Used for serving [static assets](/applications/performance/cdn_as_code/edgio_config#staticassets) configured to persist across deployments.
- **`{{ PRODUCT_LOWER }}_serverless`**: Used for serving requests through the {{ PRODUCT }} cloud.
- **`{{ PRODUCT_LOWER }}_self`**: Refers to the current environment and is used in [Edge Functions](/applications/edge_functions#edgio-self-origin) for issuing fetch requests to itself.
- **`{{ PRODUCT_LOWER }}_static`**: Used for serving [static assets](/applications/performance/cdn_as_code/edgio_config#staticassets).

## HTTP/3 {/* http-3 */}

Enable HTTP/3, which uses QUIC as the transport protocol, by setting the `alt-svc` header in the response sent to the client to `%{quic_altsvc_versions}`. This response header informs the client that it may communicate with the CDN through QUIC, the set of supported QUIC versions, and the length of time that this data should be cached by the client.

**Example:** `alt-svc: %{quic_altsvc_versions}`

**Key information:**

- Once a QUIC-compatible user agent discovers that a server supports QUIC, it will attempt to leverage QUIC for all subsequent requests to the same domain until the connection ends.
- By default, QUIC is supported on the latest versions of Google Chrome, Chromium, and Opera. However, it may require enablement. If a user agent doesn't support QUIC, then it will communicate with the CDN using HTTP/2 over TCP.
- Our QUIC implementation supports the Bottleneck Bandwidth and Round-trip propagation time (BBR) congestion control algorithm without requiring additional CDN setup. However, BBR will only be used when a QUIC-enabled client (e.g., Google Chrome) requests it.
- We strongly recommend that you define the `alt-svc` response header through the [Set Response Headers (set_response_headers) feature](/applications/performance/rules/features#set-response-headers) and set the value to the `%{quic_altsvc_versions}` variable. This variable returns the QUIC versions supported by our service.

  <Callout type="important">

  We may add or drop support for QUIC versions at any time. Ensure that you only advertise supported versions through the `%{quic_altsvc_versions}` variable.

  </Callout>

- **Sample alt-svc header name/value:**
  `alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000`

  The above sample response header indicates to the client that:

  - HTTP/3 is only supported for traffic over port 443 as defined by the `h3` parameter.
  - The user agent should treat the connection as fresh for 2,592,000 seconds (i.e., 30 days) as determined by the `ma` (max-age) parameter.

## Load Balancing {/* load-balancing */}

{{ PRODUCT }} load balances traffic proxied from our network to the web servers associated with an origin configuration using either primary/failover or round-robin mode.

**Key information:**

- {{ PRODUCT }} generates a list of IP addresses by resolving the hostnames associated with an origin configuration. These IP addresses are listed according to the order in which the corresponding hosts are listed within your origin configuration.
- If an origin configuration allows {{ PRODUCT }} to proxy requests using both HTTP and HTTPS, then {{ PRODUCT }} will generate an ordered list of IP addresses for each HTTP scheme.
- The available load balancing options are:

  - **Primary/Failover:** This load balancing mode requires {{ PRODUCT }} to:

    1.  Proxy all traffic to the first IP address in the list.
    2.  If the current server is [unavailable](#unavailable-servers), then {{ PRODUCT }} will issue another request to the next IP address on the list. This step is repeated until a server is able to honor the request.

    Set up primary/failover load balancing by selecting `Primary failover` from the **Balancer type** option.

  - **Round-robin:** This mode distributes requests evenly across all IP addresses. If a server is [unavailable](#unavailable-servers), then the request will be sent to the next IP address on the list.

    Set up round-robin load balancing by selecting `Round robin` from the **Balancer type** option.

- The above load-balancing options are completely independent from any load balancing configuration that may already distribute traffic to your web servers. For instance, traffic for a single IP address might be load balanced across several physical servers.

### Unavailable Servers {/* unavailable-servers */}

A server is considered unavailable when either of the following conditions are true:

- A TCP connection is refused.
- The connection times out.

By default, an unavailable server affects load balancing as described below.

1.  Once a server is designated as unavailable, CDN traffic will not be load balanced to the corresponding hostname or IP address for a brief time period.
2.  Upon the expiration of this time period, CDN traffic may once again flow through the corresponding hostname or IP address according to its position within your origin configuration.
3.  If the server is still unavailable, then CDN traffic will not be load balanced to the corresponding hostname or IP address for a brief, but slightly longer time period.
4.  Steps 2 and 3 repeat until the server becomes available.

Override this behavior through an origin configuration's [Retry Status Codes settings](#follow-up-requests).

## Origin Hostname Resolution {/* origin-hostname-resolution */}

Before {{ PRODUCT }} can proxy requests to your origin, it must resolve each hostname set within an origin configuration's **Origin Hostname** option. The **IP Version Preference** option determines whether our servers will prefer to resolve a hostname to an IPv4 or IPv6 address.

| Configuration  | Description                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IPv4 Preferred | Indicates that our edge servers will resolve hostnames to IPv4 addresses whenever possible. If an IPv4 address for that hostname does not exist, then the hostname will be resolved to an IPv6 address. |
| IPv6 Preferred | Indicates that our edge servers will resolve hostnames to IPv6 addresses whenever possible. If an IPv6 address for that hostname does not exist, then the hostname will be resolved to an IPv4 address. |
| IPv4 Only      | Indicates that hostnames will only be resolved to IPv4 addresses.                                                                                                                                       |
| IPv6 Only      | Indicates that hostnames will only be resolved to IPv6 addresses.                                                                                                                                       |
