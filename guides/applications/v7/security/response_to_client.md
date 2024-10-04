---
title: Response to Client (User Experience)
---

The client's user experience is determined by the enforcement action associated with the security rule that was violated. 

-   A Security Application configuration determines the action that will take place when a request violates your security policy or exceeds a rate limit.
-   A Bot Manager configuration determines how requests identified as bot traffic are handled.

The user experience for each type of enforcement action is described below.

-   **Alert:** Alerts do not alter the user experience. {{ PRODUCT }} will not provide any indication that the request violated your security policy, exceeded a rate limit, or was identified as bot traffic.
-   **Block:** The user experience for requests blocked by {{ PRODUCT }} {{ PRODUCT_SECURITY }} is described below.
    -   The user will receive a `403 Forbidden` instead of the requested asset.
    -   The response for the blocked request will include an additional response header. The name of this response header is defined by the corresponding rule's `Response Header Name` option. This response header will be set to `403`.

    **Default security response header name/value:** `X-EC-Security-Audit: 403`

-   **Browser Challenge:** Bot Manager. Our service serves a browser challenge whenever a client submits a request that matches the traffic identification critieria defined within your Security Application and bot rule configuration. The status code for this browser challenge is defined within your Bot Manager configuration. If a client is unable to solve a request, then the client will receive another browser challenge.  
-   **Custom Response:** {{ PRODUCT }} returns a custom response when a request violates your security policy, exceeds a rate limit, or is identified as bot traffic. Define the response headers, body, and status code that will be sent to the user within a Security Application configuration or a Bot Manager configuration. 
-   **Drop Request:** Rate rules only. Our service sends a `503 Service Unavailable` response with a `Retry-After` header.
-   **Redirect:** Our service returns a `302 Found` response that instructs clients to request the resource at the URL defined within your redirect configuration.
-   **Silent Close:** Our service drops the request without providing a response to the client.