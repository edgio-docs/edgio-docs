---
title: Authentication
---

Only authenticated requests to the REST API will be processed. This authentication process serves the following two purposes:

1. Identifies the client application making the request.
2. Verifies that this client application has sufficient permissions to perform the requested action.

Authentication requires passing a unique value (i.e., token). Generate a token generated from your [OAuth 2.0](#client-applications) credentials. By default, this type of token expires after 60 seconds.
    
[Register your client application](#administering-api-clients) through the {{ IDENTITY_LINK }} to generate OAuth 2.0 credentials through which you may authorize requests submitted to our API gateway ({{ API_DOMAIN }}).

## Quick Start {/*quick-start*/}

Get started with our latest APIs by performing the following steps:

1. [Create an API client](#administering-api-clients) for the desired application. Authorize this client by only assigning it the [scope(s)](#scopes) required by the endpoint(s) with which it will interact.
2. Use this client's ID and secret key to [generate a temporary access token](#generating-access-tokens).
3. [Authorize your API requests](#authorizing-requests) using the temporary access token generated in the previous step.

## OAuth 2.0 Authorization Flow {/*oauth20-authorization-flow*/}

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

## Scopes {/*scopes*/}

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

## Client Applications {/*client-applications*/}

Register your client application before interacting with REST API services hosted on our API gateway. You must assign one or more scope(s) when registering an API client. Each scope identifies the set of actions that a client is authorized to perform. 

Upon successfully registering your client application, the following information will be available for your client application:

-   **Client ID:** Identifies an API client by its system-defined ID. View a client's ID from the client's **Settings** tab.
-   **Secret:** A client must pass this private key for identity verification when requesting an access token. View a client's secret key(s) from the client's **Client Secrets** tab.
-   **Scopes:** View a client's scopes from the client's **APIs** tab.

**Key information:**
-   Do not expose the secret assigned to your account, since it may be used to impersonate your client application. For example, do not define your secret within a client-side script.
-   If you suspect that a secret key has been compromised, then you should immediately create a new secret key, update your client to use the new secret key, and then delete the old secret key.
-   A security best practice is to generate separate API clients for each unique application that will interact with our REST API service.

### Administering API Clients {/*administering-api-clients*/}

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

## Generating Access Tokens {/*generating-access-tokens*/}

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

## Authorizing Requests {/*authorizing-requests*/}

Requests to our API gateway must be authorized through an access token. Specify an access token within the `Authorization` request header when submitting a request to our REST API service.

**Authorization header syntax:** `Bearer <TOKEN>`

**Key information:**

-   The term "Bearer" and the token value are not case-sensitive.
-   An unauthorized request will generate a `401 Unauthorized` response. The response body may indicate the reason why the request was deemed unauthorized. A request will not be authorized under the following conditions:
    -   **Missing/Invalid Token:** Either the `Authorization` header was not specified or a properly formatted token value (see above) was not defined.
    -   **Insufficient Permissions:** The scope associated with the token is insufficient for the requested action.
    -   **Expired Token:** A token automatically expires after 300 seconds (i.e., 5 minutes). Once a token has expired, it can no longer authorize requests.

### Examples {/*examples*/}

A sample `Authorization` request header is provided below.

`Authorization: Bearer A1bcbGciOiJSUzI1NiIsImtpZCI6Ij13N1VGQ01zOTIzQjI1MTYzRjU4MU1wQ0I3MUNBRDk3QjAzNkUwQjgiLCJ01XAiOiJKV1QiLCJ4NXQiOiJGMDc4bzVJN0pSWV9XQm9Ndcc5dGw3QTI0TGcifQ.1yJuYmYiOj11NjUzMDgwNzgsImV4cCI6MTU2NTMwODM3OCwiaXNzIjoiacR0ccM6Ly9pZC52ZG1zLmlvIiwiYXVkIjpbImc0dcBzOi8vaWQudmRtcy5pby9yZXNvdXJjZXMiLCJlYy5ydWxlcyJdLCJjbGllbnRfaWQiOiIxNTccOWZmZi04MTQzLTRmOW1tOWY1Yi1jNDgzZWVkNzclM2QiLCJzY29wZSI6WyJlYy5ydWxlcyJdfQ.XQ4TvzDrwLo4bO71cb1TbgYxmtcgTzC46Do0A9F3inAqw1qcrNr9IgRDxJDqR4Udc9QR86LVTQC2-ogGWP3pI12GtDtiUQdKYs5fpcuMf2Kbqau6kuU1M5BJmGOcBNCCAJnU7SrDprVbPlwanGqk3yjcyo9nto8KWCRTwq2t31UQ1Ci31FZSr4vaMZJqk1vBW6NS3-yGowGCZbSIQBKpSgcc75coPtSjF1Qi6M4yORDyMC8c3KKlIp2b-6mpfDFXINIFV-XvnNuQ9v-lcc43VWuDAcQO8wmS4VzS1Ac1tpg1Pp4Bcdtjt12yKAXvi0X19R1BDmpxmO17cRRKYQ`