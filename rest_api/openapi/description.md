Our REST-compliant web services facilitate the integration of our services into your workflow(s), applications, or interfaces.

## Introduction

Key information about our REST API services:

-   **Protocol:** HTTPS
    
    Communication (i.e., request-response) with our web services is only permitted via HTTPS. This ensures the privacy and integrity of your data.

-   **Authentication/Authorization:** `Authorization` Header
    
    Our REST API services require authentication and authorization before a request to one of our endpoints will be honored.
    
    Authenticate and authorize your requests by passing the `Authorization` header with the following value:
       
    ```
    Authorization: Bearer <OAUTH 2.0 TOKEN>
    ```
    
    <a href="https://docs.edg.io/guides/develop/rest_api/authentication" target="_blank">Learn more about authorization.</a>    

-   **Request-Response (Accept and Content-Type):** JSON
    
    We expect the request body to use JavaScript Object Notation (JSON) format. Inform our web servers that the expected format for the request-response will be JSON through the `Accept` and `Content-Type` request headers.
    
-   **Programming Language:** Agnostic
    
    Our REST API services are designed to be programming language-agnostic. Feel free to use your preferred programming language (e.g., C#, C, PHP, Perl, etc.).

-   **Services:** Our REST API consists of the following services:

    -   **waf:** This service contains operations that allow you to retrieve and administer the following configurations: security apps, access rules, rate rules, custom rules, and managed rules.
    -   **bot-security:** This service contains operations that allow you to retrieve and administer Bot Manager configurations.
    -   **api-security:** This service contains operations that allow you to retrieve and administer API Security configurations.

## Quick Start

Get started with our latest APIs by performing the following steps:

1. <a href="https://docs.edg.io/guides/develop/rest_api/authentication#administering-api-clients" target="_blank">Create an API client</a> for the desired application. Authorize this client by only assigning it the <a href="https://docs.edg.io/guides/develop/rest_api/authentication#scopes" target="_blank">scope(s)</a> required by the endpoint(s) with which it will interact.
2. Use this client's ID and secret key to <a href="https://docs.edg.io/guides/develop/rest_api/authentication#generating-access-tokens" target="_blank">generate a temporary access token</a>.
3. <a href="https://docs.edg.io/guides/develop/rest_api/authentication#authorizing-requests" target="_blank">Authorize your API requests</a> using the temporary access token generated in the previous step.

## Scopes

A scope authorizes an API client to perform specific actions (e.g., create and retrieve configurations). One or more scope(s) must also be defined when requesting an access token. You may only specify a scope that has been explicitly granted or inherited from a broader scope. Common scopes are listed below.
| Scope  | Description  |
|---|---|
| app.waf  | Authorizes full access to security apps, access rules, rate rules, custom rules, and managed rules.   |
| app.bot_security  | Authorizes full access to Bot Manager.  |
| app.api_security  | Authorizes full access to API Security.  |

<a href="https://docs.edg.io/guides/develop/rest_api/authentication#scopes" target="_blank">Learn more about scopes.</a>

## Access Tokens 

Each request to our REST API service must be authorized through an access token. Access tokens provide temporary authorization (e.g., 5 minutes) to our REST API service. Once an access token expires, it may no longer be used to authorize requests. Attempting to authorize a request with an expired token will result in a `401 Unauthenticated Access` response.

**Access token request:** 

```
POST https://id.edgio.app/connect/token
```

Requests for access tokens requires:

-   A `Content-Type` header set to `application/x-www-form-urlencoded`.
-   A request body set to:

    ```
    client_id=<CLIENT ID>&client_secret=<SECRET>&grant_type=client_credentials&scope=<SCOPES>
    ```

    -   `<CLIENT ID>`**:** Represents the system-defined ID assigned to your REST API client.
    -   `<SECRET>`**:** Represents the secret assigned to your REST API client.
    -   `<SCOPES>`**:** Replace this term with one or more scopes. Use the plus symbol (+) to delimit each scope. Common scopes are listed below.

**Sample request:**

``` curl
POST https://id.edgio.app/connect/token HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Host: id.edgio.app

client_id=J23d...B2Cd&client_secret=Fdad...DF3v&grant_type=client_credentials&scope=app.waf
```

**Sample response:**

```
HTTP/1.1 200 OK
Cache-Control: no-store, no-cache, max-age=0
Content-Type: application/json; charset=UTF-8
Date: Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 830

{
    "access_token": "A1bcbGciImtpZCI6Ij13N1VGQ01z...17cRRKYQ",
    "expires_in": 300,
    "token_type": "Bearer"
}
```

## HTTP Methods

HTTP method is a critical component of a request to our REST API service as it determines the type of action being requested.

-   **DELETE:** Deletes a resource (e.g., custom rule or managed rule configuration).
-   **GET:** Retrieves all or a specific resource.
-   **POST:** Creates a resource (e.g., custom rule or managed rule configuration).
-   **PUT:** Updates a resource (e.g., custom rule or managed rule configuration).

Our REST API service may return a `405 Method Not Allowed` response for requests submitted with an unsupported HTTP method.
  
## Request URL

Requests to services that leverage our API gateway follow this basic pattern:

`https://edgioapis.com/<SERVICE>/<VERSION>/<TEAM ID>/<RESOURCE>`

-   `<SERVICE>`**:** Identifies the REST API web service (e.g., waf) designed to manage requests for a specific set of resources.
-   `<VERSION>`**:** Identifies the version of the REST API service that will be called.
-   `<TEAM ID>`**:** Identifies your team by its system-defined ID.
-   `<RESOURCE>`**:** Identifies the type of resource to which the action defined by the HTTP method will be applied.

**Sample request:** 

```
https://edgioapis.com/waf/0.9/12345678-1234-1234-1234-1234567890ab/profile
```

## Request Headers

Request headers provide information about your request to a REST API service. This information allows our server to authenticate your request and provides information that allows it to receive and translate the request body.

**Key information:**
-   The use of a Byte Order Mark (BOM) in a request to the REST API is not supported. Some user agents are configured to automatically include a BOM. Please either configure the user agent to exclude the BOM or use a different user agent.
-   Request header values are case-insensitive.

| Request Header | Description                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization  | Authorize requests through the `Authorization` request header. <a href="https://docs.edg.io/guides/develop/rest_api/authorization#authorizing-requests" target="_blank">Learn more about authorization.</a>                                                       |
| Accept         | This header should indicate the format in which the response will be returned. The recommended value for this request header is: `application/json`.                                                                |
| Content-Type   | This header should indicate the format of the request body. The recommended value for this request header is: `application/json`. <br />You may omit this header when an endpoint does not have request properties. |
| Host           | This header, which is set by the user agent, indicates the host name corresponding to the requested endpoint (i.e., edgio.app).                                                                               |
| Content-Length | This header, which is set by the user agent, indicates the number of bytes contained in the request body.                                                                                                           |

## Request Body

`PUT` and `POST` requests typically require request body properties that describe the action that will take place. These request body properties are case-sensitive.

## Response Headers

Response headers provide information about the response to your request to the REST API service. A brief description is provided for the response headers that are returned by most endpoints. Standard HTTP response headers are typically returned along with these common response headers.

| Response Header | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| Cache-Control   | Indicates the cache-control policy for the response body.                            |
| Content-Length  | Indicates the number of bytes in the response body.                                  |
| Content-Type    | Indicates the format of the response body (e.g., `application/json; charset=utf-8`). |
| I_am            | This header is reserved for internal use.                                            |
| Date            | Identifies the date and time (UTC) at which your request was processed.              |

In addition to the above headers, the response may also include the following headers:

`x-amz-apigw-id | x-amzn-Remapped-Date | x-amzn-Remapped-Server | x-amzn-RequestId | X-AspNet-Version | X-Location`

These headers are reserved for future use.