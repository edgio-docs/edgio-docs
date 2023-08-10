---
title: REST API
---

Our REST-compliant web services facilitate the integration of {{ PRODUCT }} into your workflow(s), applications, or interfaces.

Learn basic information about our services:

-   **Protocol:** HTTPS
    
    Communication (i.e., request-response) with our web services is only permitted via HTTPS. This ensures the privacy and integrity of your data.

-   **Authentication/Authorization:** `Authorization` Header
    
    Our REST API services require authentication and authorization before a request to one of our endpoints will be honored.
    
    Authenticate and authorize your requests by passing the `Authorization` header with the following value:
       
    `Authorization: Bearer <OAUTH 2.0 TOKEN>`
    
    Requests are authorized via OAuth 2.0.  [Learn more about authorization.](/develop/rest_api/authentication)

-   **Request-Response (Accept and Content-Type):** JSON
    
    We expect the request body be formatted using JavaScript Object Notation (JSON). Inform our web servers that the expected format for the request-response will be JSON through the `Accept` and `Content-Type` request headers.
    
-   **Programming Language:** Agnostic
    
    Our REST API services are designed to be programming language-agnostic. Feel free to use your preferred programming language (e.g., C#, C, PHP, Perl, etc.).

-   **Services:** Our REST API consists of the following services:
    -   **accounts:** This service contains operations that allow you to retrieve and administer teams, properties, and environments.
    -   **config:** This service contains operations that allow you to retrieve and set an environment's configuration.
    -   **cache:** This service contains operations that allow you to purge content and retrieve status information for a purge request. 
    -   **waf:** This service contains operations that allow you to retrieve and administer the following configurations: security apps, access rules, rate rules, custom rules, and managed rules.
    -   **bot-security:** This service contains operations that allow you to retrieve and administer Bot Manager configurations.
    -   **api-security:** This service contains operations that allow you to retrieve and administer API Security configurations.