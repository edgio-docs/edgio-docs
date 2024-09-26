Our REST-compliant web services facilitate the integration of our services into your workflow(s), applications, or interfaces.

## Introduction

Key information about our REST API services:

-   **Protocol:** HTTPS
    
    Communication (i.e., request-response) with our web services is only permitted through HTTPS. This ensures the privacy and integrity of your data.

-   **Authentication/Authorization:** `Authorization` Header
    
    Authenticate and authorize your requests by generating a token and then passing it through the `Authorization` header:
       
    ```
    Authorization: Bearer <OAUTH 2.0 TOKEN>
    ```
    
    [Get started.](#section/Quick-Start)

-   **Request-Response (Accept and Content-Type):** JSON
    
    We expect the request body to use JavaScript Object Notation (JSON) format. Inform our web servers that the expected format for the request-response will be JSON through the `Accept` and `Content-Type` request headers.
    
-   **Programming Language:** Agnostic
    
    Our REST API services are designed to be programming language-agnostic. Feel free to use your preferred programming language (e.g., JavaScript, Python, C#, etc.).

-   **Services:** Our REST API consists of the following services:

    | Service      | Version | Functionality                                                                                                               |
    | ------------ |-------- | --------------------------------------------------------------------------------------------------------------------------- |
    | cache        | 0.1     | Purge cached content and find out purge status.                                                                             |
    | config       | 0.1     | Deploy CDN configurations, retrieve deployment information and log data, and manage environment variables.                  |
    | accounts     | 0.1     | Retrieve and manage organizations, properties, and environments.                                                            |
    | waf          | 0.9     | Retrieve and manage the following configurations: security apps, access rules, rate rules, custom rules, and managed rules. |
    | bot-security | 0.9     | Retrieve and manage bot manager configurations.                                                                             |
    | api-security | 0.9     | Retrieve and manage API security configurations.                                                                            |

    Each service is versioned independently. This allows us to apply major enhancements to a service without impacting other services.

## Quick Start

Get started with our latest APIs by performing the following steps:

1. <a href="https://docs.edg.io/applications/rest_api/authentication#administering-api-clients" target="_blank">Create an API client</a> for either your private space or the desired organization. 
    -   Grant the set of scope(s) required by the endpoint(s) with which it will interact. 
    -   The ability to administer API clients requires the Admin role and can be performed from the <a href="https://edgio.app" target="_blank">Edgio Console's</a> **API Clients** page. 
2. Use this client's ID, secret key, and scopes to [generate a temporary access token](#section/Access-Tokens).
3. Authorize your API requests by passing the temporary access token generated in the previous step through the `Authorization` request header.

```
curl --request GET \
     --url https://edgioapis.com/waf/v0.9/12345678-1234-1234-1234-1234567890ab/scopes \
     --header 'Authorization: Bearer  A1bcbGciImtpZCI6Ij13N1VGQ01z...17cRRKYQ'
```

## Scopes

A scope authorizes an API client to perform specific actions (e.g., create and retrieve configurations). One or more scope(s) must also be defined when requesting an access token. You may only specify a scope that has been explicitly granted or inherited from a broader scope. Common scopes are listed below.

| Scope            | Description                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| app.cache        | Authorizes full access for purging cached content and retrieve purge status information.                                                     |
| app.config       | Authorizes full access for deploying CDN configurations, retrieving deployment information and log data, and managing environment variables. |
| app.accounts     | Authorizes full access to manage organizations, properties, and environments.                                                                |
| app.waf          | Authorizes full access to security apps, access rules, rate rules, custom rules, and managed rules.                                          |
| app.bot_security | Authorizes full access to Bot Manager.                                                                                                       |
| app.api_security | Authorizes full access to API Security.                                                                                                      |

## Access Tokens 

Each request to a REST API service must be authorized by passing an access token to the `Authorization` request header. Access tokens provide temporary authorization (e.g., 1 minute) to our REST API service. The duration of this authorization is determined by the API client's **Access Token Lifetime (Seconds)** option. Once an access token expires, it may no longer be used to authorize requests. Attempting to authorize a request with an expired token will result in a `401 Unauthenticated Access` response.

Requesting an access token requires:

-   Submitting a `POST` request to the following URL:

    `https://id.edgio.app/connect/token`

-   A `Content-Type` header set to `application/x-www-form-urlencoded`.
-   A request body that contains the following four parameters:

    ```
    client_id=<CLIENT ID>&client_secret=<SECRET>&grant_type=client_credentials&scope=<SCOPES>
    ```

    | Parameter     | Description                                                                                                                                                          |
    | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | client_id     | Replace `<CLIENT ID>` with the [system-defined ID assigned to your REST API client](https://docs.edg.io/applications/rest_api/authentication#copy-client-id-secret). |
    | client_secret | Replace `<SECRET>` with the [secret assigned to your REST API client](https://docs.edg.io/applications/rest_api/authentication#copy-client-id-secret).               |
    | grant_type    | Set this parameter to `client_credentials`.                                                                                                                          |
    | scope         | Replace `<SCOPES>` with one or more [scopes](#section/Scopes). Use the plus symbol (+) to delimit each scope.                                                        |

**Sample access token request:**

``` curl
curl --request POST \
  --url https://id.edgio.app/connect/token \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=J23d...B2Cd&client_secret=Fdad...DF3v&grant_type=client_credentials&scope=app.waf'
```

**Sample response:**

```
{
    "access_token": "A1bcbGciImtpZCI6Ij13N1VGQ01z...17cRRKYQ",
    "expires_in": 300,
    "token_type": "Bearer",
    "scope": "app.waf"
}
```

### Authorizing Requests

Pass an access token through the `Authorization` header when requesting the desired API operation.

**Sample API request:**

```
curl --request GET \
     --url https://edgioapis.com/waf/v0.9/12345678-1234-1234-1234-1234567890ab/scopes \
     --header 'Authorization: Bearer  A1bcbGciImtpZCI6Ij13N1VGQ01z...17cRRKYQ'
```

## HTTP Methods

HTTP method is a critical component of a request to our REST API service as it determines the type of action being requested.

-   **DELETE:** Deletes a resource (e.g., custom rule or managed rule configuration).
-   **GET:** Retrieves all or a specific resource.
-   **PATCH:** Partially updates a resource (e.g., environment).
-   **POST:** Creates a resource (e.g., custom rule or managed rule configuration).
-   **PUT:** Updates a resource (e.g., custom rule or managed rule configuration).

Our REST API service may return a `405 Method Not Allowed` response for requests submitted with an unsupported HTTP method.
  
## Request URL

The base URL for our REST API follows this basic pattern:

`https://edgioapis.com/<SERVICE>/<VERSION>/`

-   `<SERVICE>`**:** Identifies the REST API web service (e.g., cache, waf, and bot-security) designed to manage requests for a specific set of resources.
-   `<VERSION>`**:** Identifies the version of the REST API service that will be called.

**Sample Request URL:** 

```
https://edgioapis.com/cache/v0.1/purge-requests
```

## Request Headers

Request headers provide information about your request to a REST API service. This information allows our server to authenticate your request and provides information that allows it to receive and translate the request body.

**Key information:**
-   The use of a Byte Order Mark (BOM) in a request to the REST API is not supported. Some user agents are configured to automatically include a BOM. Please either configure the user agent to exclude the BOM or use a different user agent.
-   Request header values are case-insensitive.

| Request Header | Description                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization  | Authorize requests through the `Authorization` request header. <a href="https://docs.edg.io/applications/rest_api/authentication#authorizing-requests" target="_blank">Learn more about authorization.</a>                                                       |
| Accept         | This header should indicate the format in which the response will be returned. If you pass this header, set it to: `application/json`.                                                                |
| Content-Type   | This header should indicate the format of the request body. If you pass this header, set it to: `application/json`. <br />You may omit this header when an endpoint does not have request properties. |
| Host           | This header, which is set by the user agent, indicates the host name corresponding to the requested endpoint (i.e., edgioapis.com or id.edgio.app).                                                                               |
| Content-Length | This header, which is set by the user agent, indicates the number of bytes contained in the request body.                                                                                                           |

## Request Body

`POST`, `PUT`, and `PATCH` requests typically require request body properties that describe the action that will take place. These request body properties are case-sensitive.

## Response Headers

Response headers provide information about the response to your request to the REST API service. A brief description is provided for the response headers that are returned by most endpoints. Standard HTTP response headers are typically returned along with these common response headers.

| Response Header | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| Cache-Control   | Indicates the cache-control policy for the response body.                            |
| Content-Length  | Indicates the number of bytes in the response body.                                  |
| Content-Type    | Indicates the format of the response body (e.g., `application/json; charset=utf-8`). |
| I_am            | This header is reserved for internal use.                                            |
| Date            | Identifies the date and time (UTC) at which your request was processed.              |

## Rate Limit

The rate limit for our APIs varies by service and HTTP method. 

| Service      | HTTP Method                  | Rate Limit                                                |
| ------------ | ---------------------------- | --------------------------------------------------------- |
| cache        | ALL                          | 2,000 requests per 5 minutes                              |
| config       | GET                          | 2,000 requests per 5 minutes                              |
| config       | POST, PUT, PATCH, and DELETE | 600 requests per 5 minutes                                |
| accounts     | GET                          | 2,000 requests per 5 minutes                              |
| accounts     | POST, PUT, PATCH, and DELETE | 600 requests per 5 minutes                                |
| waf          | ALL                          | 300 requests per hour <br /><br /> 1,000 requests per day |
| bot-security | ALL                          | 300 requests per hour <br /><br /> 1,000 requests per day |
| api-security | ALL                          | 300 requests per hour <br /><br /> 1,000 requests per day |

Our API service returns a `429 Too Many Requests` response when a client exceeds one of the above rate limits.