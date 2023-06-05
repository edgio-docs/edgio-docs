---
title: Web Server Log Delivery Setup
---

RTLD may automatically deliver compressed log data to a web server by submitting HTTPS `POST` requests to it. The body for each of these requests will be a JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   RTLD applies gzip compression to log data. Each HTTPS `POST` request includes a `Content-Encoding` header set to `gzip`.
-   Log fields vary by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

**To prepare your web servers for log delivery**

1.  Configure your web server(s) to:
    
    -   Support the HTTPS protocol.
        
        <Callout type="important">

          Log delivery requires a certificate whose trust anchor is a publicly trusted certificate authority (CA). Additionally, the certificate must include a chain of trust for all intermediate certificate(s) and a leaf certificate.

        </Callout>
        
    -   Allow HTTPS `POST` requests.
    -   Return a 2xx response (e.g., `200 OK`) whenever data is successfully received.

        <Callout type="important">

          If your web server responds with any other status code, then our service will retransmit the same log data at regular intervals. This may result in the delivery of duplicate log data.

        </Callout>
        
2.  Configure your firewall to allow `POST` requests from the following IP blocks:
    
3.  Set up a workflow for handling or processing the log data that will be posted to your web server(s).
    
    **Example:** Create a listener for HTTPS `POST` requests that mines specific data from log entries.

4.  Upon completing the above steps, you should create a log delivery profile for HTTP `POST`.

{{ RTLD_PROFILE_SETUP_1 }} `HTTP POST`.

4.  Define how RTLD will communicate with your web server(s).

    1.  Set the **Request URL** option to a URL that may leverage the workflow defined in the [To prepare your web servers for log delivery procedure](#prepare-web-servers-for-log-delivery). This URL must use the HTTPS protocol.

        <Callout type="info">

          Specify a custom port to deliver log data over that port instead of 443.

        </Callout>
    
        **Sample URL:** `https://logs.mydomain.com/cdn/logs.aspx`
    
    2.  From the **Authentication Type** option, select one of the following modes:
    
        -   **Custom Authentication:** Select this mode when your web server(s) expects the `Authorization` request header to be set to a custom token value. Set the **Token** option to a value that will authorize requests to your web server(s).
    
            Log data will be posted to your web server(s) via HTTPS `POST` requests with an `Authorization` request header set to the specified value.
    
            **Authorization header syntax:** `Authorization: <TOKEN>`
        
        -   **HTTP Basic:** Select this mode if your web server(s) allow content to be uploaded via standard HTTP basic authentication. Set the desired credentials via the **Username** and **Password** options.
        
            Base-64 encoding will applied to the specified credentials. After which, the encoded value will be passed via the `Authorization` header.
        
            **Authorization header syntax:** `Authorization: Basic <BASE64-ENCODED CREDENTIALS>`
        
        -   **None:** Select this mode if your web server(s) allow content to be posted without authorization.

{{ RTLD_PROFILE_SETUP_2 }}
