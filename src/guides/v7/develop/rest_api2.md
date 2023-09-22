---
title: REST API
---

Our REST-compliant web services facilitate the integration of {{ PRODUCT }} into your workflow(s), applications, or interfaces.

Learn basic information about our REST API:

-   Requests to our REST API require authentication. Authentication requires:

    -   An API client. [Learn how to generate an API client.](/guides/develop/rest_api/authentication#administering-api-clients)
    -   An access token. 
    
        [Generate an access token](https://basic-security-ecdocs-production.edgio.link/preview/rest_api.html#section/Access-Tokens) by posting an API client's ID, secret key, and the desired [scopes](https://basic-security-ecdocs-production.edgio.link/preview/rest_api.html#section/Scopes).

    -   Passing the access token through the `Authorization` header when requesting a REST API operation. 

        ```
        curl --request GET \
             --url https://edgioapis.com/waf/v0.9/12345678-1234-1234-1234-1234567890ab/scopes \
             --header 'Authorization: Bearer  A1bcbGciImtpZCI6Ij13N1VGQ01z...17cRRKYQ'
        ```
-   The [base URL](https://basic-security-ecdocs-production.edgio.link/preview/rest_api.html#section/Request-URL) varies according to the operation being requested.

[View our REST API reference.](https://basic-security-ecdocs-production.edgio.link/preview/rest_api.html)