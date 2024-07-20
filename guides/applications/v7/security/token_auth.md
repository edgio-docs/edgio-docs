---
title: Token Auth
---

Token Auth provides a safeguard against hotlinking by requiring requests to contain a token value that defines the criteria that the request must satisfy before it can be served through our network. This criteria may identify authorized requesters by country, URL, host, referrer, IP address, or protocol. Additionally, you may also set an expiration date on a token to ensure that a link only remains valid for a limited time period.

<Info>

Token Auth only protects content requested through our network. It does not affect links that bypass our service by pointing directly to the origin server.

</Info>

## How Does It Work? {/*how-does-it-work-*/}

For each request, {{ PRODUCT }} will check whether Token Auth has been enabled. If it has been enabled, then the request must satisfy the following requirements:

-   The request's query string must contain a token.

    **Example:**
    
    `https://cdn.example.com/secure/product.pdf?1234567890abcdefgh`

-   The request must satisfy all of the requirements defined within the token.

    Using your encryption key(s), {{ PRODUCT }} decrypts the token. It will then verify that the request satisfies each parameter defined within the decrypted token. 
    
    -   **Valid Request:** If the request satisfies all parameters, then {{ PRODUCT }} will proceed processing the request. 

        <Info>
        
        Our other security solutions may prevent this request from being fulfilled. For example, our [Web Application and API Protection solution](/applications/security/waf) will still screen the request. If it violates your security policy, then {{ PRODUCT }} could potentially apply an enforcement action (e.g., block the request).
        
        </Info>

    -   **Invalid Request:** If the request does not satisfy at least one criterion, then the request will be denied. By default, we will return a `403 Forbidden` response. However, you may customize your configuration to return a different status code or even redirect users to another web page.

## Getting Started {/*getting-started*/}

Get started with Token Auth by performing the following steps:

1.  Define a [primary encryption key](#encryption-keys).
2.  Ensure that requests for content that will be protected by Token Auth [contain a query string that start with a token](#request-authorization).

    This step requires [generating encrypted tokens](#tokens) that define the minimum access requirements. For example, you could use a server-side script to generate and inject tokens within links to protected content.

3.  [Enable Token Auth](#securing-content) on the desired requests by adding the Token Auth feature to one or more rule(s).
4.  Deploy your changes.

## Encryption Keys {/*encryption-keys*/}

The purpose of encryption keys is to encrypt or decrypt a token. 

**Key information:**

-   An encryption key may consist of any combination of alphanumeric characters. All other characters, including spaces, are not valid for encryption keys.
-   An encryption key is case-sensitive. In other words, the case of an encryption key affects the encryption and decryption of token values.
-   The maximum length of an encryption key is 250 characters.
-   By default, a token value is only specific to an encryption key. This means that it may be possible for a client to use a single token value to gain access to protected content from various folders. <!--Use the `ec_url_allow` parameter to ensure that a token may only be used for a specific directory or for a particular file.-->
-   Changes to your encryption key configuration, such as adding or updating an encryption key, require a deployment. 
-   <a id="openssl" />A standard method for generating random values is to use the OpenSSL tool to perform hexadecimal encoding. 

    **Syntax:** `rand -hex <Length>`

    Hexadecimal encoding doubles the specified length. For example, specifying a length of `32` will generate a value containing 64 characters.

    **Example:**

    ```bash
    OpenSSL> rand -hex 32
    Loading 'screen' into random state - done
    70ae02ac9f8270e160eadbaefdd5df37c8e13750d1793dcd55b00943fff3b829
    ```

**To set an encryption key**

1.  Navigate to the desired environment's **Settings** page.

    {{ ENV_NAV }} **Settings**.

2.  From the **Token-Based Authentication** settings, set the **Primary Key** option to the desired alphanumeric value. 
3.  Ensure that the **Primary Key Minimum Encryption Version** option remains set to `v3`. 
4.  Click **Save**.
5.  Apply this change by deploying to this environment.

<Info>

The backup key is solely used to transition to a different encryption key. As a result, it does not have to be set during your initial configuration.

</Info>

### Switching Encryption Keys {/**/}

{{ PRODUCT }} can only decrypt tokens using either the primary or backup encryption key. A request is denied when it contains a token generated using any other encryption key.

The following factors may prevent you from instantly switching to a new encryption key:

-   The amount of time it takes to update all of your links to secured content.
-   Cached assets whose links contain old token values.

As a result, it is recommended to use a primary and a backup encryption key to ensure uninterrupted access to your content. 

**To change your encryption key (recommended procedure)**

1.  Navigate to the desired environment's **Settings** page.

    {{ ENV_NAV }} **Settings**.

2.  From the **Token-Based Authentication** settings, copy the value from the **Primary Key** option to the **Backup Key** option.
3.  In the **Primary Key** option, type your new encryption key.
4.  Ensure that the encryption version for both keys remains set to `v3`.
5.  Click **Update**.
6.  Apply this change by deploying to this environment.

#### Removing an Encryption Key {/**/}

Remove the old encryption key once the following events have taken place:

-   All protected content can now only be requested with a token generated using the new primary encryption key. 
-   Cached content that leverages an old token is no longer being served. This may require purging cached content.

**To remove an encryption key**

1.  Navigate to the desired environment's **Settings** page.

    {{ ENV_NAV }} **Settings**.

2.  From the **Token-Based Authentication** settings, set the **Backup Key** option to a blank value.
3.  Click **Update**.
4.  Apply this change by deploying to this environment.

    The backup key will be deactivated upon the completion of the deployment. After which, links that use tokens based off of the old encryption key will be rejected.

## Tokens {/*tokens*/}

A token consists of encrypted data that defines the requirements that the request must satisfy before {{ PRODUCT }} will process it. 

-   A token may contain one or more parameters. Certain parameters support multiple values. 
-   The strength of the token is determined by the encryption key. For this reason, we recommend setting the encryption key to [a random value generated using the OpenSSL tool](#openssl).
-   A token is limited to 512 characters. {{ PRODUCT }} will automatically block requests containing larger tokens.
-   Generating tokens does not affect your Token Auth configuration. It only affects the requests to which that token is applied.
-   There is no limit to the number of tokens that can be generated for a specific encryption key. 
-   Generate a token using either of the following tools:

    -   [Our Token Generator application (ectoken3)](#token-generator-application)
    -   [A custom script or application](#custom-token-generator)

### Token Generator Application {/*token-generator-application*/}

This application provides the means to generate tokens using a script. It includes the following components:

-   Windows executable

    BouncyCastle.Crypto.dll and Blowfish.dll must reside within the same folder as the encryption executable.

-   Linux binaries

**Syntax (Single Parameter):** `ectoken3 <Key Name> "<Parameter>=<Value>"`

**Syntax (Multiple Parameters):** `ectoken3 <Key Name> "<Parameter>=<Value>&<Parameter>=<Value>,<Value>"`

[Learn more about parameters.](#token-auth-parameters)

**Example:** The following token, which uses the MyKey encryption key, expires on 12/31/2024 at 12:00:00 GMT, restricts access to North America, and restricts referrers to trusted.example.com:

`ectoken3 MyKey "ec_expire=1735646400&ec_country_allow=US,CA,MX&ec_ref_allow=trusted.example.com"`

The resulting token is:
`1ea46ba396e88f03a9f6b6b968b32d2fd88858148f120a1bbca7882de68b8b14a9bde8bcd6c36bcd30e8bbb47d9997ab7260381b4c1ed99de5baf805ed54fd3609e8066e43a92a5b2c7839ba95080d3668ab9dd47d9275d8eb29b8ccf8f49515745f18a66c`

You should then append this token to your protected content as shown below.

`https://secure.example.com/marketing_plan.html?1ea46ba396e88f03a9f6b6b968b32d2fd88858148f120a1bbca7882de68b8b14a9bde8bcd6c36bcd30e8bbb47d9997ab7260381b4c1ed99de5baf805ed54fd3609e8066e43a92a5b2c7839ba95080d3668ab9dd47d9275d8eb29b8ccf8f49515745f18a66c`

### Custom Token Generator {/*custom-token-generator*/}

Use the code from our open-source repositories to create a custom application to generate token values. These repositories, which are hosted on GitHub, contain source code for the following languages:

-   [C](https://github.com/Edgio/ectoken)
-   [C#](https://github.com/Edgio/cs-ectoken)
-   [Go](https://github.com/Edgio/go-ectoken)
-   [JavaScript](https://github.com/Edgio/js-ectoken)
-   [Perl](https://github.com/Edgio/perl-ectoken)
-   [PHP](https://github.com/Edgio/php-ectoken)
-   [Python](https://github.com/Edgio/py-ectoken)
-   [Ruby](https://github.com/Edgio/ruby-ectoken)
-   [Rust](https://github.com/Edgio/rust-ectoken)

### Token Decryption {/*token-decryption*/}

Decrypt a token to view its requirements. 

**Key information:**

-   One use for this capability is to troubleshoot clients that cannot view your content due to Token Auth. 
-   You may only decrypt tokens if their encryption key is still active. 
-   **Syntax:** `ectoken3 decrypt <Key Name> <Token>`

### Token Auth Parameters {/*token-auth-parameters*/}

This section provides a brief description for each available parameter.

-   **ec_clientip:** Restricts content delivery to requests that originate from a specific IP address.

    -   This parameter supports standard IPv4/IPv6 and CIDR notation.

    **Example:** This example restricts delivery to a client with an IP address of 111.11.111.11:

    `ec_clientip=111.11.111.11`

-   **ec_country_allow:** Restricts content delivery to the specified countries.

    -   Use [ISO 3166 country codes](/applications/reference/country_codes) to specify countries.
    -   Use a comma to delimit multiple country codes.
    
    **Example:** This example restricts delivery to requests that originate from within the United States:

    `ec_country_allow=US`

-   **ec_country_deny:** Blocks requests from one or more countries.

    -   Use [ISO 3166 country codes](/applications/reference/country_codes) to specify countries.
    -   Use a comma to delimit multiple country codes.
    
    **Example:** This example blocks all requests that originate from the United States and Canada.

    `ec_country_deny=US,CA`

-   **ec_expire:** Defines an expiration date and time (GMT) for the token value.

    -   Specify the number of seconds that will pass from Unix time to the expiration date.

    **Example:** This example expires the token on 12/31/2024 at 12:00:00 GMT:

    `ec_expire=1735646400`

-   **ec_host_allow:** Restricts delivery to the specified set of hosts.

    -   Do not include the protocol portion of the desired URL (e.g., http://).
    -   A comparison will be made against the `Host` request header. Delivery is restricted to requests whose hostname matches a specified value.
    -   Use a comma to delimit multiple hosts.

    **Example:** This example blocks all requests whose host does not match either `server1.example.com` or the `server2.example.com` domain root (e.g., it would allow `secure.server2.example.com` and `cdn.server2.example.com`):
    
    `ec_host_allow=server1.example.com,*.server2.example.com`

-   **ec_host_deny:** Defines the set of hosts that will be blocked.

    -   Do not include the protocol portion of the desired URL (e.g., http://).
    -   A comparison will be made against the value specified in the `Host` request header. Delivery is restricted to requests whose hostname do not match a specified value.
    -   Use a comma to delimit multiple hosts.

    **Example:** This example blocks all requests whose host matches either `server1.example.com` or the `server2.example.com` domain root (e.g., it would block `secure.server2.example.com` and `cdn.server2.example.com`):
    
    `ec_host_deny=server1.example.com,*.server2.example.com`

-   **ec_proto_allow:** Restrict delivery to the specified protocol(s). Valid values are:

    `http | https`

    **Example:** This example restricts delivery to requests that leverage the HTTPS protocol.

    `ec_proto_allow=https`

-   **ec_proto_deny:** Denies requests that leverage the specified protocol. Valid values are:

    `http | https`

    **Example:** This example restricts delivery to requests that leverage the HTTPS protocol.

    `ec_proto_deny=http`

-   **ec_ref_allow:** Restricts delivery to the specified set of referrers.

    -   Do not include the protocol portion of the desired URL (e.g., http://).
    -   The specified value will be compared against the request's `Referer` header. This header value must start with a value defined by this parameter.
    -   Use a comma to delimit multiple referrers.

    **Example:** This example allows requests whose referrers start with `www1.example.com/obj1` or whose host contains the `server2.example.com` domain root.

    `ec_ref_allow=www1.example.com/obj1,*.server2.example.com`

-   **ec_ref_deny:** Defines the set of referrers for which delivery will be denied.

    -   Do not include the protocol portion of the desired URL (e.g., http://).
    -   The specified value will be compared against the request's `Referer` header. This header value must start with a value defined by this parameter.
    -   Use a comma to delimit multiple referrers.

    **Example:** This example denies requests whose referrers start with `www1.example.com/obj1` or whose host contains the `server2.example.com` domain root.

    `ec_ref_deny=www1.example.com/obj1,*.server2.example.com`

<!--
-   **ec_url_allow:** Links a URL path to a token.

    -   Only requests that start with the specified URL path will be allowed access.
    -   This relative path starts after the hostname. Exclude the protocol and hostname (e.g., `https://www.example.com`) when using this parameter.

    **Example:** This example 

/000001/dir1/movie1,/000001/dir2

allows requests to CDN storage that meet one of the following criteria:

    The name of the requested content starts with "movie1" and is stored in a folder called "dir1."
    All content stored in the directory tree that starts with "dir1/movie1."
    All content stored in the directory tree that starts with "dir2."

-->

## Request Authorization {/*request-authorization*/}

Authorize a request secured by Token Auth by adding a token at the start of the request URL's query string.

[Learn how to generate a token.](#tokens)

**Example:**

<img src="http://images.mydomain.com/images/myimage.jpg?c1019f8a6942b46a1ce679e168d5797670f3ee7e39068054ee4534d8a5a859dc06">

If the request URL contains additional query string parameters, then they should be appended to the token through the use of an ampersand.

**Example:**

<img src="http://images.mydomain.com/images/myimage.jpg?c1019f8a6942b46a1ce679e168d5797670f3ee7e39068054ee4534d8a5a859dc06&width=240&height=480">

## Securing Content {/*securing-content*/}

Define the set of requests that will be protected by Token Auth by creating one or more rule(s) with the Token Auth feature. The rule's match conditions determines the set of requests for which Token Auth will be enforced. 

![Rules - shown with Token Auth enabled](/images/v7/security/token_auth_rules_1.png)

For these requests, {{ PRODUCT }} requires both of the following conditions to be met:
-   The request URL's query string must start with a valid token. A token is considered valid if it can be decrypted using either the current primary or backup encryption key. 

    **Example:**
    
    `https://cdn.example.com/secure/product.pdf?1234567890abcdefgh`

-   The request satisfies all of the condition(s) defined within the token. 

### Disable Token Auth {/*disable-token-auth*/}

By default, Token Auth is not applied to requests. However, if you have already enabled Token Auth within a rule, then you may disable it for specific requests by adding it to a rule in disabled mode. 

![Rules - shown with Token Auth disabled](/images/v7/security/token_auth_rules_2.png)

<Info>

Notice that the rule disabling Token Auth appears below the rule that enables it. This allows it take to precedence.

</Info>

### Redirecting Unauthorized Users {/*redirecting-unauthorized-users*/}

By default, {{ PRODUCT }} responds with a `403 Forbidden` when the request does not meet the minimum requirements defined within the token. Use the [Token Auth Denial Code feature](/applications/performance/rules/features#token-auth-denial-code) to return a different status code or even redirect users to another web page.

Common response codes are listed below.

-   **301:** A `301 Moved Permanently` response redirects unauthorized users to the URL specified in the `Location` header.
-   **302:** A `302 Found` response redirects unauthorized users to the URL specified in the `Location` header. This status code is the industry standard method of performing a redirect.
-   **307:** A `307 Temporary Redirect` response redirects unauthorized users to the URL specified in the `Location` header.
-   **403:** A `403 Forbidden` response is typically returned when an unauthorized user trys to access content.
-   **404:** A `404 Not Found` response indicates that the HTTP client was able to communicate with the server, but the specified asset was not found.

**To redirect unauthorized users to a user-friendly error page (recommended configuration)**

1.  Navigate to the desired environment's **Rules** page.
2.  Find the rule that enables the Token Auth feature.
3.  Add the Token Auth Denial Code feature. 

    1.  Set the **Status Code** option to `302`.
    2.  Set the **Header Name** option to `Location`.
    3.  Set the **Value** option to the full URL to the user-friendly error page (e.g., `https://www.example.com/purchasecontent.aspx`).
    4.  Click **Apply**.