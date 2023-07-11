---
title: REST API
---

Our REST-compliant web services facilitate the integration of {{ PRODUCT }} {{ PRODUCT_SECURITY }} into your workflow(s), applications, or interfaces.

Learn basic information about our services:

-   **Protocol:** HTTPS
    
    Communication (i.e., request-response) with our web services is only permitted via HTTPS. This ensures the privacy and integrity of your data.

-   **Authentication/Authorization:** `Authorization` Header
    
    Our REST API services require authentication and authorization before a request to one of our endpoints will be honored.
    
    Authenticate and authorize your requests by passing the `Authorization` header with the following value:
       
    `Authorization: Bearer <OAUTH 2.0 TOKEN>`
    
    [Learn more.](FINDME)

-   **Request-Response (Accept and Content-Type):** JSON
    
    We strongly recommend that the request body be formatted using JavaScript Object Notation (JSON). Inform our web servers that the expected format for the request-response will be JSON through the `Accept` and `Content-Type` request headers.
    
    [Learn more.](FINDME)

-   **Programming Language:** Agnostic
    
    Our REST API services are designed to be programming language-agnostic. Feel free to use your preferred programming language (e.g., C#, C, PHP, Perl, etc.).

-   **Services:** Our REST API consists of the following services:

    -   **waf:** This service contains endpoints that revolve around the following components: security apps, access rules, rate rules, custom rules, and managed rules.
    -   **bot-security:** This service contains endpoints that revolve around Bot Manager.
    -   **api-security:** This service contains endpoints that revolve around API Security.
    
Requests are authorized via OAuth 2.0.  [Learn more about authorization.](FINDME)