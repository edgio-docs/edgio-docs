---
title: API Security
---

Use API Security to:

-   Validate JSON Web Tokens (JWT). 
-   Define valid payloads for API requests through one or more API schema(s).
-   A request violates your API Security configuration when it satisfies one of the following conditions:
    -   JWT validation is enabled and {{ PRODUCT }} is unable to verify the JWT.
    -   The payload violates at least one requirement defined within your API schema.
-   Discover the APIs that have been requested in the last 30 days by reviewing the **API Discovery** section of the **API Security** page.
-   Review violations of your API Security configuration through the **WAF Events** view of the {{ PRODUCT_SECURITY }} dashboard.

<Callout type="info">

  API Security requires activation. {{ ACCOUNT_UPGRADE }}

</Callout>

## Setup {/*setup*/}

Set up an API Security configuration by performing the following steps:

1.  Create an API Security ruleset. An API Security ruleset consists of the following components:

    -   **API Security Rules:** Define one or more API Security rules that allow you to:
        -   Validate request bodies through an API schema. 
        -   Validate RS256-signed JWTs through a JSON Web Key Set (JWKS).
        -   Define the conditions under which the JWT and request body validation defined within this rule will be enforced.
    -   **API Schema:** An API schema is a JSON schema that describes the structure for a valid API payload.

    <Callout type="important">

      An API Security rule requires at least one JWKS or API schema.

    </Callout>

2.  Assign an API Security rule to a Security App configuration and define the enforcement action that will be applied to requests that contain an invalid JWT or violate the API schema(s) defined in the previous step.

<Callout type="tip">

  By default, {{ PRODUCT }} validates all `POST`, `PUT`, and `PATCH` requests that satisfy your security app's hostname and URL path requirements. If your website uses those HTTP methods for non-API requests, then it is strongly recommended to define one or more URL path(s) within your API Security rule.

</Callout>

### API Security Rule {/*api-security-rule*/}

An API Security rule identifies the set of requests that will undergo schema validation, JWT validation, or both. By default, your rule validates all `POST`, `PUT`, and `PATCH` requests. However, you may restrict inspection by:

-   **Relative Path(s):** You may restrict payload inspection to one or more relative path(s). This relative path starts directly after the hostname. The available comparison modes are listed below.
    -   **Default:** {{ PRODUCT }} {{ PRODUCT_SECURITY }} will inspect all `POST`, `PUT`, and `PATCH` requests to ensure that they satisfy the API schema.
    -   [Exact match (multiple entries):](#exact-match-multiple-entries) Restrict inspection to specific relative path(s).
    -   [Wildcard match:](#wildcard-match) Restrict inspection to a wildcard pattern for the relative path.
    -   [Regex match:](#regex-match) Restrict inspection to a regular expression for the relative path.

    <Callout type="info">

      Wildcard and regular expression match comparison modes require {{ PRODUCT_SECURITY }} Premier, Business, or Essentials. {{ ACCOUNT_UPGRADE }}

    </Callout>

-   **Method(s):** You may restrict payload inspection to one or more of the following HTTP method(s): `PUT | POST | PATCH`

#### Exact Match (Multiple Entries) {/*exact-match-multiple-entries*/}

{{  PRODUCT }} {{ PRODUCT_SECURITY }} compares the specified value(s) against the entire relative URL path. It will only inspect a request when one of the specified value(s) is an exact match. This comparison is case-sensitive.

| Sample Configuration | Matches | Does Not Match                     |
| -------------------- | ------- | ---------------------------------- |
| cat                  | cat     | Cat <br /> Category <br /> Moscato |
| bat                  | bat     | Bat <br /> Batch                   |

#### Wildcard Match {/*wildcard-match*/}

Requires {{ PRODUCT_SECURITY }} Premier, Business, or Essentials. {{  PRODUCT }} {{ PRODUCT_SECURITY }} checks whether the entire relative URL path is a case-sensitive match for the wildcard pattern. The supported set of wildcards are listed below.
-   **\*:** Matches zero or more characters.

    | Sample Configuration | Matches                         | Does Not Match     |
    | -------------------- | ------------------------------- | ------------------ |
    | cat*                 | cat <br />category <br />muscat | cAt <br />Category |

-   **?:** Matches a single character.

    | Sample Configuration | Matches            | Does Not Match |
    | -------------------- | ------------------ | -------------- |
    | cat?                 | cats <br />muscats | Cats <br />cat |

-   **[*abc*]:** Matches a single character defined within the brackets.

    | Sample Configuration | Matches         | Does Not Match   |
    | -------------------- | --------------- | ---------------- |
    | [cm]art              | cart <br />mart | tart <br />start |

-   **[*a*-*z*]:** Matches a single character from the specified range.

    | Sample Configuration | Matches                    | Does Not Match              |
    | -------------------- | -------------------------- | --------------------------- |
    | [a-z]art             | cart <br />mart <br />tart | Cart <br />marT <br />start |

-   **[!*abc*]:** Matches a single character that is not defined within the brackets.

    | Sample Configuration | Matches                    | Does Not Match             |
    | -------------------- | -------------------------- | -------------------------- |
    | [!cm]art             | Cart <br />Mart <br />tart | cart <br />mart <br />tArt |

-   **[!*a*-*z*]:** Matches a single character that is excluded from the specified range.

    | Sample Configuration | Matches                    | Does Not Match             |
    | -------------------- | -------------------------- | -------------------------- |
    | [!a-m]art            | Cart <br />Mart <br />tart | cart <br />mart <br />tArt |

**Example:**

Setting the **URL path(s)** option to `/marketing/*` allows {{ PRODUCT }} {{ PRODUCT_SECURITY }} to inspect any request whose URL path starts with `/marketing/`.

The following sample request matches the above pattern:

`https://cdn.example.com/marketing/mycampaign/image.png`

#### Regex Match {/*regex-match*/}

Requires {{ PRODUCT_SECURITY }} Premier, Business, or Essentials. {{ PRODUCT }} {{ PRODUCT_SECURITY }} checks whether the entire relative URL path is a match for the pattern defined in a regular expression.

<Callout type="info">

  Regular expressions are case-sensitive.

</Callout>

| Sample Configuration | Matches                       | Does Not Match         |
| -------------------- | ----------------------------- | ---------------------- |
| ^[a-zA-Z0-9]*$       | cat <br />CAT7 <br />Category | Category 7 <br />Cat#7 |

### JSON Web Tokens (JWT) {/*json-web-tokens--jwt-*/}

JSON Web Token (JWT) validation requires each request that matches a rule's criteria to provide a valid JWT token. This token must:

-   Be defined within the `Authorization` request header using the following syntax:

    `Authorization: Bearer <TOKEN>`

-   Contain the following components:
    -   **iss:** An `iss` value identifies the issuer of the JWT.
    -   **kid:** A `kid` value identifies the key through which the JWT was signed.

<Tip>
Skip JWT validation for requests that do not include an `Authorization` header by enabling the **Allow Empty Tokens** option.
</Tip>

{{ PRODUCT }} validates a JWT by comparing it with a JSON Web Key (JWK) registered with that rule. A JWK is a JSON object whose members represent the properties of a JWT. 

Register up to 2 JWKs by pasting a JSON Web Key Set (JWKS) within the **JWKS** option. This JWKS may:
-   Contain up to 2 JWKs. 
-   Each JWK must be signed by a known provider using the RS256 algorithm. Self-signed certificates are disallowed since we cannot verify the chain of authority.
-   A JWK must contain `x5c` and `x5t` parameters through which we can verify that the key was signed by a known provider. 
-   A JWK must exclude private key parameters, such as `p`, `q`, `dp`, `dq`, and `qi`.

**Sample JWKS (truncated):**

```
{
    "keys": [{
            "kty": "RSA",
            "use": "sig",
            "kid": "174EFCA3923B25163F581A0CB71CAD97B036E0B8",
            "x5t": "F078o5I7JRY_WBoMtxytl7A24Lg",
            "x5c": [
                "MIIEWzCCA0OgAwIBAgIJAPzw5pQEyIL4MA0GCSqGSIbgZ3
                ...
                fIwQFTXJNGSzbYy8tBGSZI22rYtkz2rvVXTGFNX2HglofS0v"
            ],
            "e": "AQAB",
            "n": "n1x3isqbPYjG2dUm5d5N1MBk9zKHt5LujgFXJO1SCnCW
                  ...
                  kGzKbQXk8QoXonkB9waAUJl8DZWmyR4oHhLw4UySKCow",
            "alg": "RS256"
        }, {
            "kty": "RSA",
            "use": "sig",
            "kid": "635BCE35DAAADA6B1C4F31DBBE9D610A296CAA2E",
            "x5t": "Y1vONdqq2mscTzHbvp1hCilsqi4",
            "e": "AQAB",
            "n": "59_PSn8HTeKK6s7e9eZxmXxjVE-YwBxRuEONekpOX0tlSYf3
                  ...
                  f6iGFKt6Rxwmcl0KB3Mc_0AmT6GMhbR-KCx29KFNHtgn92Zw",
            "x5c": [
                "MIIG3DCCBcSgpM1FpkyeMiuHqpM1FpkyeMiuHq512512dqg
                 ...
                 f8OPsg5XMNTSZJUZrUULTCfl7jJeVBibqlXyeckjEG/MzM="
            ],
            "alg": "RS256"
        }
    ]
}
```

### API Schema {/*api-schema*/}

An API schema is a JSON schema that describes the structure for a valid API payload.

<Tip>

  Autogenerate a JSON schema from a sample JSON payload through the **Derive Schema from Example** option which can be found on the **Schemas** tab of an API Security ruleset configuration. You may then either build upon this base JSON schema to define a stricter set of requirements or save it without further modifications.

</Tip>

#### JSON Schema Syntax {/*json-schema-syntax*/}

The [JSON Schema site](https://json-schema.org) provides guidance and examples on how to define a JSON schema. {{ PRODUCT }} restricts syntax support as follows:
-   {{ PRODUCT }} does not consider a number  with a zero fractional part (e.g., *1.0*, or *42.0*) an integer.
-   {{ PRODUCT }} ignores the `$schema` keyword.
-   Specify `exclusiveMaximum` and `exclusiveMinimum` as integers.
-   Remote schemas are unsupported.
-   [String formats](https://json-schema.org/understanding-json-schema/reference/string.html#built-in-formats) introduced after draft 4 are unsupported. For example, the following formats are unsupported: `time | date | duration | idn-email`
-   The following keywords are unsupported: `$anchor | $comment | $dynamicAnchor | $dynamicRef | $recursiveRef |const | contentEncoding | contentMediaType| contentSchema | dependentRequired | if-then-else | minContains | maxContains | prefixItems | propertyNames | unevaluated`

<Callout type="tip">

  Use a JSON schema linter to fine - tune your API schema before applying it to your traffic.

  For example, the [JSON Schema Link site](https://jsonschemalint.com/#!/version/draft-04/markup/json) checks whether your JSON schema is valid and validates it against a sample API request.

</Callout>

#### JSON Schema Examples {/*json-schema-examples*/}
A common method for setting up an API schema is to define the expected data type through the `type` property.

-   **String Example:** The following sample schema requires an API request to only contain a single string value:

	```json
    {
        "api_gw_id": "mnriXoB6",
        "type": "string"
    }
    ```
-   **Object Examples:** The following sample schema requires an API request to contain an object. This object must contain a property called `email` set to a properly formatted email address:

    ```json
	{
	    "api_gw_id": "mnriXoB6",
	    "type": "object",
	    "properties": {
        	"email": {
	            "type": "string",
            	"format": "email"
        	}
    	},
        "required": ["email"]
	}
    ```

    The following sample schema requires an API request to contain an object. This object must contain a property called `price` set to a number greater than 0. If this object contains `latitude`, `longitude`, or `id`, then the validation defined for those properties will be enforced. For example, `latitude` may only be set to -90, 90, or any number in between that range.

    ```json
    {
        "api_gw_id": "fg3r67doc1",
        "type": "object",
        "properties": {
            "latitude": {
                "type": "number",
                "minimum": -90,
                "maximum": 90
            },
            "longitude": {
                "type": "number",
                "minimum": -180,
                "maximum": 180
            },
            "id": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999,
                "exclusiveMaximum": false
            },
            "price": {
                "type": "number",
                "minimum": 0,
                "exclusiveMinimum": true
            }
        },
        "required": ["price"]
    }
    ```

## API Security Ruleset Administration {/*api-security-ruleset-administration*/}

You may create, modify, and delete API Security rulesets.

**Key information:**

-   Administer API Security rulesets from the **API Security** page.
-   Apply an API Security ruleset to production traffic by adding it to a [Security App configuration](/applications/security/security_applications) and then determining how it will be enforced. Multiple Security App configurations may use the same API Security ruleset.
-   An API Security rule requires at least one JWKS or API schema.
-   It may take up to 2 minutes for an update to an API Security ruleset to be applied across our entire network.

**To create an API Security ruleset**

1.  Navigate to the **API Security** page.
    {{ SECURITY_NAV }} **API Security**.
2.  Click **+ Create New API Rule**.
3.  <a id="create-name" />In the **Name of Ruleset** option, type a name for this API Security ruleset.
4.  Add a JSON schema that defines the structure for a valid API payload.
    1.  In the **Name** option, type a name for this JSON schema.
    2.  Perform one of the following steps:
        -   **Autogenerate Schema:** Perform the following steps to automatically generate a JSON schema from a sample payload:
            1.  Click **Derive Schema from Example**.
            2.  Paste a sample JSON payload.
            3.  Click **Next >**. {{ PRODUCT }} will generate an API schema that describes the basic structure for your sample JSON payload.
            4.  Optional. Enhance this API schema. For example, you may define a range of valid values for integer properties or you may define certain properties as required.
            5.  When finished, click **Apply**.
        -   **Upload Schema:** Upload an API schema by clicking **Upload Schema JSON**, selecting the desired file, and then clicking **Open**.
        -   **Manual Entry:** Type or paste the desired API schema.
    4.  Click **Save Schema**.
    5.  Add another JSON schema by clicking **+ Create New** from within the **Schemas** section and then repeating steps 4.1 - 4.4.

    <Callout type="tip">

      You may apply different API schemas to different endpoints or operations by creating an API Security rule for each API schema. You should then restrict each API Security rule to only apply API schema validation to the desired set of endpoints or operations.

    </Callout>

5.  Add an API Security rule that identifies a JSON schema created in the previous step and the set of requests to which it will be applied.
    1.  Below the **Schemas** section, click **+ Create New**.
    2.  In the **Name** option, type a name for this API Security rule.
    3.  Optional. Restrict the set of requests that will be inspected to one or more specific relative path(s).
        1.  From the **URL Path(s)** option, determine whether {{ PRODUCT }} will perform URL path comparisons by [exact match](#exact-match-multiple-entries), [regular expression](#regex-match), or [wildcards](#wildcard-match).
        2.  Specify the desired relative path or regular expression.

            If you selected *Exact Match*, then you may specify multiple relative paths. Press **ENTER** after typing each desired URL path.

    4.  Optional. Restrict the set of requests that will be inspected by HTTP method by selecting the desired HTTP method from the **Methods** option. Repeat this step as needed.
    5.  Optional. Validate JWTs included within an API request's `Authorization` header.
        1.  Enable the **JWT Validation** option.
        2.  Define a JSON Web Key Set (JWKS) by performing either of the following steps:
            -   Upload a JWKS by clicking **Upload JWKS**, selecting the desired file, and then clicking **Open**.
            -   Paste the desired JWKS within the **JWKS** option.
        3.  By default, API requests must include a valid JWT. Enable the **Allow Empty Tokens** option to allow requests without an **Authorization** header.
    6.  Optional. Require requests to provide a valid API payload. From the **Schema** option, select the JSON schema created in step 4.
    7.  Click **Save**.

**To modify an API Security ruleset**

1.  Navigate to the **API Security** page.
    {{ SECURITY_NAV }} **API Security**.
2.  Click on the desired API Security ruleset.
3.  Make the desired changes.
4.  Click **Save**.

**To delete an API Security ruleset**

<Callout type="important">

  You cannot delete an API Security ruleset that is associated with a Security App configuration. Please either modify the Security App configuration to point to a different API Security ruleset or delete that Security App configuration.

</Callout>

1.  Check your Security App configurations to verify that the desired API Security ruleset is not in use.
2.  Navigate to the **API Security** page.
    {{ SECURITY_NAV }} **API Security**.
3.  Click on the desired API Security ruleset.
4.  Click **Delete**.
5.  Click **Confirm**.

## API Discovery {/*api-discovery*/}

{{ PRODUCT }} automatically discovers all API requests for the last 30 days.

**Key information:**

-   Expand an endpoint to break down request statistics by HTTP method and status code.
-   Request statistics are rounded to whole numbers. This may cause some entries to display *100%* or *0%* even though there are multiple entries for that endpoint.
-   Use this information to discover legacy or deprecated endpoints that are still being requested.

{{ security_version_control.md }}
