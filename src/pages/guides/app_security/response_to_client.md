---
title: Response to Client (User Experience)
---

A Security Application configuration determines the action that
will take place when a threat is identified or a request exceeds a rate
limit.

## Threats {/*threats*/}

A Security Application configuration identifies a traffic
profile, the rules that determine how that traffic will be screened, and
the enforcement action that will take place when a threat is identified.
This enforcement action is defined when you assign an access rule or
managed to a Security Application configuration. The user
experience for each possible configuration is described below.
-   **Alert:** Our service treats the request as if it had not been screened. The client will be unaware that the request was screened by {{ PRODUCT_SECURITY }}.
-   **Block:** The user experience for requests blocked by {{ PRODUCT_SECURITY }} is described below.
    -   The user will receive a `403 Forbidden` instead of the requested asset.
    -   The response for the blocked request will include an additional response header. The name of this response header is defined by the corresponding rule's `Response Header Name` option. This response header will be set to *403*.

    **Default {{ PRODUCT_SECURITY }} response header name/value:**

    ```
    X-EC-Security-Audit: 403
    ```
-   **Custom Response:** Our service provides a custom response to identified threats. This custom response is defined within a Security Application configuration when setting up access rules and managed rules. It defines the response headers, body, and status code that will be sent to the user.                                             |

## Rate Limiting {/*rate-limiting*/}

Upon exceeding a rate limit, your Security Application
configuration determines the action that will be applied to eligible
requests. The user experience for each possible configuration is
described below.
-   **Alert Only:** Alerts do not alter the user experience. Our service treats the request as if it had not exceeded the rate limit.                                                                                                                                                  
-   **Custom Response:** Our service provides a custom response to rate limited requests. This custom response is defined within a Security Application configuration when setting up rate rules. It defines the response headers, body, and status code that will be sent to the user.
-   **Drop Request:** Our service sends a `503 Service Unavailable` response with a `Retry-After` header to rate limited requests.
-   **Redirect (HTTP 302):** Our service redirects rate limited requests to a predefined URL. The client will receive the response for the resource located at that URL and a `302 Found`.

## Bot Rules {/*bot-rules*/}

Both your Security Application and bot rule configuration define the set of traffic that will receive a browser challenge. Additionally, your Security Application configuration defines the status code for all browser challenges. If a client is unable to solve a request, then the client will receive another browser challenge.  