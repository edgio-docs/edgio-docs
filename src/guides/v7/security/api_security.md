---
title: API Security
---

Use API security to:

-   Define valid payloads for API requests. {{ PRODUCT }} categorizes a request as a threat when the payload violates at least one of your requirements.
-   Discover the APIs that are being requested in the last 30 days. 

## Setup {/*setup*/}

Set up an API security configuration by performing the following steps:

1.  Create an API security rule. An API security rule consists of the following components:

    -   **API Gateway:** Define one or more API gateway configurations. Each of these configurations identifies an API schema and the conditions under which it will be enforced.
    -   **API Schema:** An API schema is a JSON schema that describes the structure for a valid API payload.

    <Callout type="important">
	
	  Setting up a new API security rule requires creating at least one API schema. Your API gateway configuration will be read-only until you do so. 
	
	</Callout>

2.  Assign an API security rule to a security app configuration and define the enforcement action that will be applied to requests that violate the API schema(s) defined in the previous step. 

<Callout type="tip">
	
  By default, API security validation is applied to all `POST`, `PUT`, and `PATCH` requests that satisfy your security app's hostname and URL path requirements. If your website uses those HTTP methods for non-API requests, then it is strongly recommended to define one or more URL path(s) within your API gateway configuration.
	
</Callout>

### API Gateway {/*api-gateway*/}

An API gateway configuration identifies an API schema and the set of requests that must conform to that JSON schema. By default, your API gateway configuration validates all requests against an API schema. However, you may restrict inspection by:

-   **Relative Path(s):** You may restrict payload inspection to one or more relative path(s). This relative path starts directly after the hostname. The available comparison modes are listed below.
    -   **Default:** {{ PRODUCT }} {{ PRODUCT_SECURITY }} will inspect all requests to ensure that they satisfy the API schema.
    -   [Exact match (multiple entries):](#exact-match-multiple-entries) Restrict inspection to specific relative path(s).
    -   [Wildcard match:](#wildcard-match) Restrict inspection to a wildcard pattern for the relative path.
    -   [Regex match:](#regex-match) Restrict inspection to a regular expression for the relative path.
	
        <Callout type="info">

          Wildcard and regular expression match comparison modes require {{ PRODUCT_SECURITY }} Premier, Business, or Essentials. {{ ACCOUNT_UPGRADE }}

        </Callout>

-   **Method(s):** You may restrict payload inspection to one or more of the following HTTP method(s): `PUT | POST | PATCH`

#### Exact Match (Multiple Entries) {/*exact-match-multiple-entries*/}

{{  PRODUCT }} {{ PRODUCT_SECURITY }} compares the specified value(s) against the entire relative URL path. It will only inspect a request when one of the specified value(s) is an exact match. This comparison is case-sensitive.

**Sample Configuration:**

`/cat`

`/bat`

**Matches:**

`/cat`

`/bat`

**Does Not Match:**

`/Cat`

`/Bat`

`/Category`

`/Moscato`

`/Batch`

#### Wildcard Match {/*wildcard-match*/}

{{  PRODUCT }} {{ PRODUCT_SECURITY }} checks whether the entire relative URL path is a case-sensitive match for the wildcard pattern. The supported set of wildcards are listed below.
-   **\*:** Matches zero or more characters.
    -   **Example:** `/cat*`
    -   **Matches:** `/cat | /category`
    -   **Does not match:** `/cAt | /Category | /muscat`
-   **?:** Matches a single character.
    -   **Example:** `/cat?`
    -   **Matches:** `/cats`
    -   **Does not match:** `/Cats | /cat | /muscats`
-   **[*abc*]:** Matches a single character defined within the brackets.
    -   **Example:** `/[cm]art`
    -   **Matches:** `/cart | /mart`
    -   **Does not match:** `/tart | /start`
-   **[*a*-*z*]:** Matches a single character from the specified range. 
    -   **Example:** `/[a-z]art`
    -   **Matches:** `/cart | /mart | /tart`
    -   **Does not match:** `/Cart | /marT | /start`
-   **[!*abc*]:** Matches a single character that is not defined within the brackets.
    -   **Example:** `/[!cm]art`
    -   **Matches:** `/Cart | /Mart | /tart`
    -   **Does not match:** `/cart | /mart | /tArt`
-   **[!*a*-*z*]:** Matches a single character that is excluded from the specified range.
    -   **Example:** `/[!a-m]art`
    -   **Matches:** `/Cart | /Mart | /tart`
    -   **Does not match:** `/cart | /mart | /tArt`

**Example:** 

Setting the `URL path(s)` option to the following value allows {{ PRODUCT }} {{ PRODUCT_SECURITY }} to inspect any request whose URL path starts with */marketing/*:

`/marketing/*`

The following sample request will match the above pattern:

`https://cdn.example.com/marketing/mycampaign/image.png`

#### Regex Match {/*regex-match*/}

{{ PRODUCT 	}} {{ PRODUCT_SECURITY }} checks whether the entire relative URL path is a match for the pattern defined in a regular expression.

<Callout type="info">

  Regular expressions are case-sensitive.

</Callout>

**Sample Configuration:**

`^\/[a-zA-Z0-9]*$`

**Matches:**

`/cat`

`/CAT7`

`/Category`

**Does Not Match:**

`/Category 7`

`/Cat#7`

### API Schema {/*api-schema*/}

An API schema is a JSON schema that describes the structure for a valid API payload.

<Callout type="tip">

  Use the `Derive Schema from Example` option to autogenerate a JSON schema from a sample JSON payload. You may then either build upon this base JSON schema to define a stricter set of requirements or save it without further modifications. 

</Callout>

#### JSON Schema Syntax {/*json-schema-syntax*/}

The JSON Schema site provides [guidance and examples on how to define a JSON schema](https://json-schema.org/understanding-json-schema/index.html). {{ PRODUCT }} restricts syntax support as follows:
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

## API Security Administration {/*api-security-administration*/}

You may create, modify, and delete API security configurations.

**Key information:**

-   Administer API security configurations from the **API Security** page.
-   Apply an API security configuration to production traffic by adding it to a [Security App configuration](/guides/security/security_applications) and then determining how it will be enforced. Multiple Security App configurations may use the same API security configuration. Leverage this capability to tailor security screening by application or traffic profile.
-   Setting up a new API security rule requires creating at least one API schema. Your API gateway configuration will be read-only until you do so.
-   It may take up to 2 minutes for an update to an API security configuration to be applied across our entire network.

**To create an API security configuration**

1.  Navigate to the **API Security** page.
    {{ SECURITY_NAV }} **API Security**.
2.  Click **+ Create New API Rule**.
3.  In the **Name of Ruleset** option, type a name for this API security configuration.
4.  Click the **Schemas** tab. {{ PRODUCT }} will save your configuration. You must save an API schema, as described in the next step, before setting up an API gateway configuration.
5.  Add a JSON schema that defines the structure for a valid API payload.
    1.  Click **+ Create New** and then click on the new API schema (i.e., *Schema 1*).
    2.  In the **Name** option, type a name for this JSON schema. 
    3.  Perform one of the following steps:
        -   **Autogenerate Schema:** Perform the following steps to automatically generate a JSON schema from a sample payload:
            1.  Click **Derive Schema from Example**.
            2.  Paste a sample JSON payload.
            3.  Click **Next >**. {{ PRODUCT }} will generate an API schema that describes the basic structure for your sample JSON payload.
            4.  Optional. Enhance this API schema. For example, you may define a range of valid values for integer properties or you may define certain properties as required.
            5.  When finished, click **Apply**.
        -   **Upload Schema:** Upload an API schema by clicking **Upload Schema JSON**, selecting the desired file, and then clicking **Open**.
    4.  Click **Save Schema**.
    5.  Repeat steps 5.1 - 5.4 for each API schema that you would like to add to this API security rule. 
	
    <Callout type="tip">

      You may apply different API schemas to different endpoints or operations by creating an API gateway configuration for each API schema. You should then restrict each API gateway configuration to only apply API schema validation to the desired set of endpoints or operations.

    </Callout>

6.  Add an API gateway configuration that identifies the API schema created in the previous step and the set of requests to which it will be applied.
    1.  Click the **API GW Rules** tab.
    2.  Click **+ Create New**.
    3.  In the **Name** option, type a name for this API gateway configuration.
    4.  Optional. Restrict the set of requests that will be inspected to one or more specific relative path(s).
        1.  From the **URL Path(s)** option, determine whether {{ PRODUCT }} will perform URL path comparisons by [exact match](#exact-match-multiple-entries), [regular expression](#regex-match), or [wildcards](#wildcard-match).
        2.  Specify the desired relative path or regular expression. 

            If you selected *Exact Match*, then you may specify multiple relative paths. Press **ENTER** after typing each desired URL path.

    5.  Optional. Restrict the set of requests that will be inspected by HTTP method by selecting the desired HTTP method from the **Methods** option. Repeat this step as needed.
    6.  From the **Schema ID** option, select the API schema created in step 5.
    7.  Click **Save**.

**To modify an API security configuration**

1.  Navigate to the **API security** page.
    {{ SECURITY_NAV }} **API security**.
2.  Click on the desired API security configuration.
3.  Make the desired changes.
4.  Click **Save**.

**To delete an API security configuration**

<Callout type="important">

  You cannot delete an API security configuration that is associated with a Security App configuration. Please either modify the Security App configuration to point to a different API security or delete that Security App configuration.

</Callout>

1.  Check your Security App configurations to verify that the desired API security configuration is not in use.
2.  Navigate to the **API security** page.
    {{ SECURITY_NAV }} **API security**.
3.  Click on the desired API security configuration.
4.  Click **Delete**.
5.  Click **Confirm**.

## API Discovery {/*api-discovery*/}

{{ PRODUCT }} automatically discovers all API requests for the last 30 days. 

**Key information:**

-   Expand an endpoint break down request statistics by HTTP method and status code. 
-   Request statistics are rounded to whole numbers. This may cause some entries to display *100%* or *0%* even though there are multiple entries for that endpoint. 
-   Use this information to discover legacy or deprecated endpoints that are still being requested. 
