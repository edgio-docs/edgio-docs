---
title: Authentication
---

Our REST API requires authentication for all requests. This serves the following two purposes:

1. Identifies the client application making the request.
2. Verifies that this client application has sufficient permissions to perform the requested action.

## Quick Start {/*quick-start*/}

Get started with our latest APIs by performing the following steps:

1. [Create an API client](#administering-api-clients) for either your private space or the desired organization. 

    A best practice when setting up an API client is to only assign it the [scope(s)](#scopes) required by your application. A scope defines the set of operations that an API client is authorized to perform.

2. Use this client's ID, secret key, and scopes to [generate a temporary access token](#generating-access-tokens).
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

## API Clients {/*api-clients*/}

Create an API client before interacting with our REST API services. You must assign one or more scope(s) when creating an API client. Each scope identifies the set of actions that the API client is authorized to perform. 

Upon successfully registering your client application, the following information will be available for your client application:

-   **Client ID:** Identifies an API client by its system-defined ID. 
-   **Secret:** A client must pass this private key for identity verification when requesting an access token. 
-   **Scopes:** Defines the set of operations that this API client is authorized to perform.

**Key information:**
-   Do not expose any of the secrets assigned to your API clients, since they may be used to impersonate your client application. For example, do not define your secret within a client-side script.
-   If you suspect that a secret key has been compromised, then you should immediately create a new secret key, update your client to use the new secret key, and then delete the old secret key.
-   A security best practice is to generate separate API clients for each unique application that will interact with our REST API service.

### Administering API Clients {/*administering-api-clients*/}

The [Admin role](/applications/basics/collaboration#managing-team-members) is required to view, create, modify, and delete API clients. 

**To create an API client**

1.  Navigate to the **API Clients** page.

    1.  From the {{PORTAL_LINK}}, select either your private space or the desired organization. Your new API client will only be authorized for the properties associated with either your private space or the selected organization.
    2.  Click **API Clients**.

2.  In the **Name** option, assign a name to this API client. 
3.  In the **Description** option, describe this API client.
4.  In the **Access Token Lifetime (Seconds)** option, determine the number of seconds that an access token will remain valid after being issued.
5.  In the **Allowed API Scopes** section, mark each scope that will be assigned to the API client.

    <Callout type="tip">

      A security best practice is to only grant the set of scope(s) required for the automation task(s) that the client will perform.

	</Callout>

7. Click **Create API Client**.

Upon creating an API client, a client ID and a secret will be generated. Use this information, along with scopes, to [generate an access token]({{ API_DOCS_URL }}#section/Access-Tokens).

**<a id="copy-client-id-secret" />To copy an API client's ID and secret**

1.  Navigate to the **API Clients** page.

    1.  From the {{PORTAL_LINK}}, select either your private space or the desired organization.
    2.  Click **API Clients**.

2.  Click on the desired API client. 
3.  Copy the API client's ID by clicking the ID that appears directly to the right of its name.
4.  Copy the API client's secret by finding the **Secrets** section and then clicking the secret listed under the **Value** column.

**To create an additional secret**
1.  Navigate to the **API Clients** page.

    1.  From the {{PORTAL_LINK}}, select either your private space or the desired organization.
    2.  Click **API Clients**.

2.  Click on the desired API client. 
3.  From the **Secrets** section, click **Create new secret**.
4.  In the **Description** option, assign a brief description for this secret. 
5.  Copy the new secret by clicking on it.

**To delete a secret**
<Callout type="important">

  The deletion of an API client's secret takes place immediately and it cannot be undone. Any applications that rely on that secret will no longer be able to generate new access tokens.

</Callout>

1.  Navigate to the **API Clients** page.

    1.  From the {{PORTAL_LINK}}, select either your private space or the desired organization.
    2.  Click **API Clients**.

2.  Click on the desired API client. 
3.  From the **Secrets** section, click the <Image inline src="/images/v7/icons/trash.png" alt="Delete" /> next to the desired secret key.

**To reassign scopes**
1.  Navigate to the **API Clients** page.

    1.  From the {{PORTAL_LINK}}, select either your private space or the desired organization.
    2.  Click **API Clients**.

2.  Click on the desired API client. 
3.  In the **Allowed API Scopes** section, mark each scope that will be assigned to the API client. Clear each scope that will be removed from the API client.

    <Callout type="tip">

      A security best practice is to only grant the set of scope(s) required for the automation task(s) that the client will perform.

	</Callout>

4.  Click **Update API Client**.

**To delete an API client**

<Callout type="important">

  Verify that an API client is no longer in use prior to deletion. Account deletion cannot be undone.

</Callout>

1.  Navigate to the **API Clients** page.

    1.  From the {{PORTAL_LINK}}, select either your private space or the desired organization.
    2.  Click **API Clients**.

2.  Click the <Image inline src="/images/v7/icons/trash.png" alt="Delete" /> next to the desired API client.
3.  When prompted, click **Delete** to confirm the deletion.

## Generating Access Tokens {/*generating-access-tokens*/}

Each request to our REST API service must be authorized through an access token. Access tokens provide temporary authorization (e.g., 1 minute), as determined by the API client's **Access Token Lifetime (Seconds)** option, to our REST API service. Once an access token expires, it may no longer be used to authorize requests. Attempting to authorize a request with an expired token will result in a `401 Unauthenticated Access` response.

**Request syntax:** `POST https://{{ IDENTITY_TOKEN_DOMAIN }}/connect/token`

Requests for access tokens requires:

-   A `Content-Type` header set to `application/x-www-form-urlencoded`.
-   A request body that contains the following four parameters:

    `client_id=<CLIENT ID>&client_secret=<SECRET>&grant_type=client_credentials&scope=<SCOPES>`

    | Parameter     | Description                                                                                                                                                     |
    | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | client_id     | Replace `<CLIENT ID>` with the [system-defined ID assigned to your REST API client](#copy-client-id-secret).                                                    |
    | client_secret | Replace `<SECRET>` with the [secret assigned to your REST API client](#copy-client-id-secret).                                                                  |
    | grant_type    | Set this parameter to `client_credentials`.                                                                                                                     |
    | scope         | Replace `<SCOPES>` with one or more [scopes](https://docs.edg.io/rest_api/#section/Scopes). Use a space character or the plus symbol (+) to delimit each scope. |

**Sample access token request:**

``` curl
curl --request POST \
  --url https://{{ IDENTITY_TOKEN_DOMAIN }}/connect/token \
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

## Authorizing Requests {/*authorizing-requests*/}

Requests to our API gateway must be authorized through an access token. Specify an access token within the `Authorization` request header when submitting a request to our REST API service.

**Authorization header syntax:** `Bearer <TOKEN>`

**Key information:**

-   The term "Bearer" and the token value are not case-sensitive.
-   An unauthorized request will generate a `401 Unauthorized` response. The response body may indicate the reason why the request was deemed unauthorized. A request will not be authorized under the following conditions:
    -   **Missing/Invalid Token:** Either the `Authorization` header was not specified or a properly formatted token value (see above) was not defined.
    -   **Insufficient Permissions:** The scope associated with the token is insufficient for the requested action.
    -   **Expired Token:** A token automatically expires according to the duration defined by the API client's **Access Token Lifetime (Seconds)** option. Once a token has expired, it can no longer authorize requests.

### Examples {/*examples*/}

A sample `Authorization` request header is provided below.

`Authorization: Bearer A1bcbGciOiJSUzI1NiIsImtpZCI6Ij13N1VGQ01zOTIzQjI1MTYzRjU4MU1wQ0I3MUNBRDk3QjAzNkUwQjgiLCJ01XAiOiJKV1QiLCJ4NXQiOiJGMDc4bzVJN0pSWV9XQm9Ndcc5dGw3QTI0TGcifQ.1yJuYmYiOj11NjUzMDgwNzgsImV4cCI6MTU2NTMwODM3OCwiaXNzIjoiacR0ccM6Ly9pZC52ZG1zLmlvIiwiYXVkIjpbImc0dcBzOi8vaWQudmRtcy5pby9yZXNvdXJjZXMiLCJlYy5ydWxlcyJdLCJjbGllbnRfaWQiOiIxNTccOWZmZi04MTQzLTRmOW1tOWY1Yi1jNDgzZWVkNzclM2QiLCJzY29wZSI6WyJlYy5ydWxlcyJdfQ.XQ4TvzDrwLo4bO71cb1TbgYxmtcgTzC46Do0A9F3inAqw1qcrNr9IgRDxJDqR4Udc9QR86LVTQC2-ogGWP3pI12GtDtiUQdKYs5fpcuMf2Kbqau6kuU1M5BJmGOcBNCCAJnU7SrDprVbPlwanGqk3yjcyo9nto8KWCRTwq2t31UQ1Ci31FZSr4vaMZJqk1vBW6NS3-yGowGCZbSIQBKpSgcc75coPtSjF1Qi6M4yORDyMC8c3KKlIp2b-6mpfDFXINIFV-XvnNuQ9v-lcc43VWuDAcQO8wmS4VzS1Ac1tpg1Pp4Bcdtjt12yKAXvi0X19R1BDmpxmO17cRRKYQ`

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
-   [Learn more about our scopes.]({{ API_DOCS_URL }}#section/Scopes)
