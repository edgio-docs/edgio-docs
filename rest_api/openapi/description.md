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

    -   **waf:** This service contains operations that allow you to retrieve and administer the following configurations: security apps, access rules, rate rules, custom rules, and managed rules.
    -   **bot-security:** This service contains operations that allow you to retrieve and administer Bot Manager configurations.
    -   **api-security:** This service contains operations that allow you to retrieve and administer API Security configurations.

## Authentication

Only authenticated requests to the REST API will be processed. This authentication process serves the following two purposes:

1. Identifies the client application making the request.
2. Verifies that this client application has sufficient permissions to perform the requested action.

Authentication requires passing a unique value (i.e., token). Generate a token generated from your [OAuth 2.0](#client-applications) credentials. By default, this type of token expires after 60 seconds.
    
[Register your client application](#administering-api-clients) through the {{ IDENTITY_LINK }} to generate OAuth 2.0 credentials through which you may authorize requests submitted to our API gateway ({{ API_DOMAIN }}).

### Quick Start {/*quick-start*/}

Get started with our latest APIs by performing the following steps:

1. [Create an API client](#administering-api-clients) for the desired application. Authorize this client by only assigning it the [scope(s)](#scopes) required by the endpoint(s) with which it will interact.
2. Use this client's ID and secret key to [generate a temporary access token](#generating-access-tokens).
3. [Authorize your API requests](#authorizing-requests) using the temporary access token generated in the previous step.

### OAuth 2.0 Authorization Flow {/*oauth20-authorization-flow*/}

REST API authorization is managed by a centralized identity management solution called Identity Service (IDS). IDS leverages OAuth 2.0, which complies with the specification defined within [RFC 6749](https://tools.ietf.org/html/rfc6749), to authorize requests to the API.

Requests to our API gateway are authorized through the following workflow:

1. Access Token Request
    
    A client application requests API access from IDS. This request must include authentication information and a scope that defines the type of API requests that will be authorized.

2. Temporary Access Token
    
    If IDS is able to authenticate the client application, it will respond with a temporary access token set to the defined scope.

3. API Request
    
    The client application must then pass this access token through an `Authorization` header when submitting a request to our REST API.

4. API Response
    
    If the access token authorizes the requested action, then our REST API service will process it.

This workflow is illustrated below.

![](/images/v7/rest-api/authentication-authorization.png)

### Scopes {/*scopes*/}

A scope authorizes an API client to perform specific actions (e.g., create and retrieve configurations). A scope is defined using the following hierarchy:

`Namespace.Service[.Type[:Modifier]]`

The above hierarchy allows you to grant broad or narrow permissions to your client. Each element in this hierarchy is described below.

-   **Namespace:** Identifies a broad category (i.e., `app`).
-   **Service:** Identifies a product or a category of products (e.g., `waf`, `bot_security`, and `api_security`).
    
    A scope may identify a product or a category of products through multiple services.  
    <!--**Example:**  Both x and y identify services in the following scope: `app.waf`).-->
-   **Type:** Optional. Identifies a feature or a type of permission.
    
    <!--**Example:** In the following scope, deploy identifies a type of permission. In this case, deploy grants permissions to retrieve, submit, and delete deploy requests.
    
    `app.waf`-->

-   **Modifier:** Optional. Restricts the scope to a subset of permissions. Valid values are:
    -   **create:** Restricts the scope to the creation of a resource.
    -   **edit:** Restricts the scope to the creation, retrieval, and modification of a resource. It does not authorize the deletion of resources.
    -   **delete:** Restricts the scope to the deletion of a resource.
    -   **read:** Restricts the scope to the retrieval of a resource.
    
    <!--**Example:** The `:read` modifier in the following scope authorizes the retrieval of deploy requests:
    
    `app.waf`-->

**Key information:**

-   A security best practice is to only grant the set of scope(s) required for the automation task(s) that the client will perform.
-   A broad scope grants all of the scopes underneath it.
    
    **Example:** The following scope authorizes full access to Bot Manager: `app.bot-security`

	<!--Alternatively, the following scope authorizes the creation, retrieval, modification, and deletion of X:
    
    `app.bot_security` -->
-   One or more scope(s) must also be defined when requesting an access token. You may only specify a scope that has been explicitly granted or inherited from a broader scope.
-   Common scopes are listed below.
    | Scope  | Description  |
    |---|---|
    | app.waf  | Authorizes full access to security apps, access rules, rate rules, custom rules, and managed rules.   |
    | app.bot_security  | Authorizes full access to Bot Manager.  |
    | app.api_security  | Authorizes full access to API Security.  |

### Client Applications {/*client-applications*/}

Register your client application before interacting with REST API services hosted on our API gateway. You must assign one or more scope(s) when registering an API client. Each scope identifies the set of actions that a client is authorized to perform. 

Upon successfully registering your client application, the following information will be available for your client application:

-   **Client ID:** Identifies an API client by its system-defined ID. View a client's ID from the client's **Settings** tab.
-   **Secret:** A client must pass this private key for identity verification when requesting an access token. View a client's secret key(s) from the client's **Client Secrets** tab.
-   **Scopes:** View a client's scopes from the client's **APIs** tab.

**Key information:**
-   Do not expose the secret assigned to your account, since it may be used to impersonate your client application. For example, do not define your secret within a client-side script.
-   If you suspect that a secret key has been compromised, then you should immediately create a new secret key, update your client to use the new secret key, and then delete the old secret key.
-   A security best practice is to generate separate API clients for each unique application that will interact with our REST API service.

#### Administering API Clients {/*administering-api-clients*/}

You can create, modify, and delete API clients.

The recommended approach for switching to a new secret key is to create a secret key, update your API client to use the new secret key, and then delete the old secret key.

**To create an account for an API client**

1. Navigate to the {{ IDENTITY_LINK }}.
2. Click **Clients** from the side navigation pane.
3. Verify that the **Assigned to Organization** option is set to the desired team.
4. Click **Create New Client**.
5. In the **Name** option, assign a name that describes this API client.
6. In the **Permissions** section, mark each scope that will be assigned to the API client.

    <Callout type="tip">

      A security best practice is to only grant the set of scope(s) required for the automation task(s) that the client will perform.

	</Callout>

7. Click **Create**.

A Quick Start page is shown upon creating an account for your API client. This page contains a sample curl request and response for an access token. It also provides a sample curl request to our REST API service.

**To modify an API client's account**

1. Navigate to the {{ IDENTITY_LINK }}.
2. Click **Clients** from the side navigation pane.
3. Verify that the **Assigned to Tenant** option is set to the desired team.
4. Click on <Image inline src="/images/v7/icons/open-configuration.png" alt="Open" /> corresponding to the desired account.
5. Perform one or more of the following tasks:

    -   **Update Name/Description:**

        1. Click the **Settings** tab.
        2. In the **Name** option, modify the account's name.
        3. In the **Description** option, describe the account's purpose.
        4. Click **Save**.

    -   **Update Access Token Duration:**

        1. Click the **Settings** tab.
        2. In the **JWT Expiration in Seconds** option, determine the number of seconds that an access token will remain valid after being issued.
        3. Click **Save**.

    -   **View Your Client ID:**

        1. Click the **Settings** tab.
        2. Find the **Client ID** option.

    -   **Add a Secret Key:**        

        1. Click the **Client Secrets** tab.
        2. Click **New Secret Key**.
        3. In the **Name** option, assign a name to the new secret key.
        4. Click **Create**.
    -   **View or Copy a Secret Key:**

        1. Click the **Client Secrets** tab.
        2. Identify the secret key that you would like to view or copy.
        3. Click either of the following icons:

            -    <Image inline src="/images/v7/icons/view.png" alt="View" />: Displays the secret key.
            -    <Image inline src="/images/v7/icons/copy.png" alt="Copy" />: Copies the secret key.

    -   **Delete a Secret Key:**

        <Callout type="tip">

          The recommended approach for switching to a new secret key is to create a secret key, update your API client to use the new secret key, and then delete the old secret key.

		</Callout>

        1. Click the **Client Secrets** tab.
        2. Identify the secret key that you would like to delete. Verify that it is no longer being used by your API client or script.
        3. Click <Image inline src="/images/v7/icons/trash.png" alt="Delete" /> next to the secret key identified in the previous step.
        4. Click **I understand, please delete the client secret** to confirm the deletion of the secret key.

    -   **Update Scopes:**

        1. Click the **APIs** tab.
        2. Mark each scope that will be granted to the client.
        3. Clear each scope that will be revoked from the client.
        4. Click **Save**.

**To delete an API client's account**

<Callout type="important">

  Verify that an API client is no longer in use prior to deletion. Account deletion cannot be undone.

</Callout>

1. Navigate to the {{ IDENTITY_LINK }}.
2. Click **Clients** from the side navigation pane.
3. Verify that the **Assigned to Tenant** option is set to your customer account.
4. Click on the desired account.
5. Click the **Settings** tab.
6. Click **Delete Client**.
7. Click **I understand, please delete the client** to confirm the deletion of the API client.

### Generating Access Tokens {/*generating-access-tokens*/}

Each request to our REST API service must be authorized through an access token. Access tokens provide temporary authorization (e.g., 5 minutes) to our REST API service. Once an access token expires, it may no longer be used to authorize requests. Attempting to authorize a request with an expired token will result in a `401 Unauthenticated Access` response.

**Request syntax:** `POST https://{{ IDENTITY_TOKEN_DOMAIN }}/connect/token`

Requests for access tokens requires:

-   A `Content-Type` header set to `application/x-www-form-urlencoded`.
-   A request body set to:

    `client_id=<CLIENT ID>&client_secret=<SECRET>&grant_type=client_credentials&scope=<SCOPES>`

    -   `<CLIENT ID>`**:** Represents the system-defined ID assigned to your REST API client.
    -   `<SECRET>`**:** Represents the secret assigned to your REST API client.
    -   `<SCOPES>`**:** Replace this term with one or more scopes. Use the plus symbol (+) to delimit each scope. Common scopes are listed below.

**Sample request:**

``` curl
POST https://{{ IDENTITY_TOKEN_DOMAIN }}/connect/token HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Host: {{ IDENTITY_TOKEN_DOMAIN }}

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

### Authorizing Requests {/*authorizing-requests*/}

Requests to our API gateway must be authorized through an access token. Specify an access token within the `Authorization` request header when submitting a request to our REST API service.

**Authorization header syntax:** `Bearer <TOKEN>`

**Key information:**

-   The term "Bearer" and the token value are not case-sensitive.
-   An unauthorized request will generate a `401 Unauthorized` response. The response body may indicate the reason why the request was deemed unauthorized. A request will not be authorized under the following conditions:
    -   **Missing/Invalid Token:** Either the `Authorization` header was not specified or a properly formatted token value (see above) was not defined.
    -   **Insufficient Permissions:** The scope associated with the token is insufficient for the requested action.
    -   **Expired Token:** A token automatically expires after 300 seconds (i.e., 5 minutes). Once a token has expired, it can no longer authorize requests.

#### Examples {/*examples*/}

A sample `Authorization` request header is provided below.

`Authorization: Bearer A1bcbGciOiJSUzI1NiIsImtpZCI6Ij13N1VGQ01zOTIzQjI1MTYzRjU4MU1wQ0I3MUNBRDk3QjAzNkUwQjgiLCJ01XAiOiJKV1QiLCJ4NXQiOiJGMDc4bzVJN0pSWV9XQm9Ndcc5dGw3QTI0TGcifQ.1yJuYmYiOj11NjUzMDgwNzgsImV4cCI6MTU2NTMwODM3OCwiaXNzIjoiacR0ccM6Ly9pZC52ZG1zLmlvIiwiYXVkIjpbImc0dcBzOi8vaWQudmRtcy5pby9yZXNvdXJjZXMiLCJlYy5ydWxlcyJdLCJjbGllbnRfaWQiOiIxNTccOWZmZi04MTQzLTRmOW1tOWY1Yi1jNDgzZWVkNzclM2QiLCJzY29wZSI6WyJlYy5ydWxlcyJdfQ.XQ4TvzDrwLo4bO71cb1TbgYxmtcgTzC46Do0A9F3inAqw1qcrNr9IgRDxJDqR4Udc9QR86LVTQC2-ogGWP3pI12GtDtiUQdKYs5fpcuMf2Kbqau6kuU1M5BJmGOcBNCCAJnU7SrDprVbPlwanGqk3yjcyo9nto8KWCRTwq2t31UQ1Ci31FZSr4vaMZJqk1vBW6NS3-yGowGCZbSIQBKpSgcc75coPtSjF1Qi6M4yORDyMC8c3KKlIp2b-6mpfDFXINIFV-XvnNuQ9v-lcc43VWuDAcQO8wmS4VzS1Ac1tpg1Pp4Bcdtjt12yKAXvi0X19R1BDmpxmO17cRRKYQ`

## API Requests and Responses

This section provides an overview of the basic structure for the request to our REST API services and the response provided to the client.

### HTTP Method {/*http-method*/}

HTTP method is a critical component of a request to our REST API service as it determines the type of action being requested.

-   **DELETE:** Deletes a resource (e.g., custom rule or managed rule configuration).
-   **GET:** Retrieves all or a specific resource.
-   **POST:** Creates a resource (e.g., custom rule or managed rule configuration).
-   **PUT:** Updates a resource (e.g., custom rule or managed rule configuration).

<Callout type="info">

  Our REST API service may return a `405 Method Not Allowed` response for requests submitted with an unsupported HTTP method.
  
</Callout>

### Request URL {/*request-url*/}

Requests to services that leverage our API gateway follow this basic pattern:

`{{ API_URL }}/<SERVICE>/<VERSION>/<TEAM ID>/<RESOURCE>`

-   `<SERVICE>`**:** Identifies the REST API web service (e.g., waf) designed to manage requests for a specific set of resources.
-   `<VERSION>`**:** Identifies the version of the REST API service that will be called.
-   `<TEAM ID>`**:** Identifies your team by its system-defined ID.
-   `<RESOURCE>`**:** Identifies the type of resource to which the action defined by the HTTP method will be applied.

**Sample request:** `{{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/{{ SAMPLE_TEAM_ID }}/profile`

### Request Headers {/*request-headers*/}

Request headers provide information about your request to a REST API service. This information allows our server to authenticate your request and provides information that allows it to receive and translate the request body.

**Key information:**
-   The use of a Byte Order Mark (BOM) in a request to the REST API is not supported. Some user agents are configured to automatically include a BOM. Please either configure the user agent to exclude the BOM or use a different user agent.
-   Request header values are case-insensitive.

| Request Header  | Description  |
|---|---|
| Authorization  | Authorize requests through the `Authorization` request header. [Learn more about authorization.](/guides/develop/rest_api/authorization#authorizing-requests)  |
| Accept  | This header should indicate the format in which the response will be returned. The recommended value for this request header is: `application/json`.|
| Content-Type | This header should indicate the format of the request body. The recommended value for this request header is: `application/json`. <br />You may omit this header when an endpoint does not have request properties. |
| Host  | This header, which is set by the user agent, indicates the host name corresponding to the requested endpoint (i.e., {{ API_DOMAIN }}.  |
| Content-Length  | This header, which is set by the user agent, indicates the number of bytes contained in the request body.  |

### Request Body {/*request-body*/}

`PUT` and `POST` requests typically require request body properties that describe the action that will take place. These request body properties are case-sensitive.

### Response Headers {/*response-headers*/}

Response headers provide information about the response to your request to the REST API service. A brief description is provided for the response headers that are returned by most endpoints. Standard HTTP response headers are typically returned along with these common response headers.

| Response Header  | Description   |
|---|---|
| Cache-Control  | Indicates the cache-control policy for the response body.  |
| Content-Length  | Indicates the number of bytes in the response body.  |
| Content-Type  | Indicates the format of the response body (e.g., `application/json; charset=utf-8`).  |
| I_am  | This header is reserved for internal use.  |
| Date  | Identifies the date and time (UTC) at which your request was processed.  |

In addition to the above headers, the response may also include the following headers:

`x-amz-apigw-id | x-amzn-Remapped-Date | x-amzn-Remapped-Server | x-amzn-RequestId | X-AspNet-Version | X-Location`

These headers are reserved for future use.

### Status Codes {/*status-codes*/}

Each request to the REST API returns a standard HTTP 1.1 status code, as defined in the [HTTP 1.1 Status Code Definitions (RFC 2616)](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). This HTTP status code indicates whether the request was successful.

-   A `2xx` response (e.g., `200 OK`) indicates that the request was successfully carried out. This means that the request was processed by our servers and the proper response was returned. However, the proper response may be an empty response body. For example, updating a resource (e.g., `PUT` request) will typically return an empty response body.
-   All non-`2xx` status codes indicate that an error occurred while processing the request. The response body typically contains an error message that provides additional information as to why the request was denied.

#### Error Reporting {/*error-reporting*/}

The format for error reporting varies by product.

##### Format - ({{ PRODUCT }} {{ PRODUCT_SECURITY }} Endpoints)

Our {{ PRODUCT }} {{ PRODUCT_SECURITY }} endpoints use the following base URL:

`{{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/<RESOURCE>`

{{ API_ERRORS.md }}

A sample JSON response body is provided below.

```
{
    "errors": [{
            "message": "Invalid date range, beginning date too old: 2022-11-08 00:00:00 < 2022-05-04 20:37:53",
            "code": 400
        }
    ]
}
```