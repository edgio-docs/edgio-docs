---
title: Conditions Reference
---

A match condition identifies the set of requests to which one or more feature(s) will be applied.

#### ASN

Identifies requests by the network from which the request was issued. A network is identified by its Autonomous System Number (ASN).

**Key information:**

-   Certain requests may not return a valid AS number. A question mark (i.e., `?`) will match requests for which a valid AS number could not be determined.
-   You must specify a value, pattern, or regular expression that matches the entire AS number for the desired network.


#### Brand Name

Identifies requests by the manufacturer (e.g., Samsung) of the device that issued the request.

#### Browser

TODO

#### City

Identifies requests by the city from which they originated.

**Key information:**

-   Certain requests may not return a valid city name. A question mark (i.e., `?`) will match requests for which a valid city name could not be determined.

#### Client IP

Identifies requests that originate from a particular IP address.

**Key information:**

-   Use CIDR notation.
-   Specify multiple IP addresses and/or IP address blocks by delimiting each one with a single space.

    -   **IPv4 Example:** `1.2.3.4 10.20.30.40` matches any requests arriving from either `1.2.3.4` or `10.20.30.40`.
    -   **IPv6 Example:** `1:2:3:4:5:6:7:8 10:20:30:40:50:60:70:80` matches any requests arriving from either `1:2:3:4:5:6:7:8` or `10:20:30:40:50:60:70:80`.

-   The syntax for an IP address block is the base IP address followed by a forward slash and the prefix size.

    -   **IPv4 Example:** `5.5.5.64/26` matches any requests arriving from `5.5.5.64` through `5.5.5.127`.
    -   **IPv6 Example:** `1:2:3::0/48` matches any requests arriving from `1:2:3:0:0:0:0:0` through `1:2:3:ffff:ffff:ffff:ffff:ffff`.

        <Callout type="info">

          IPv6 address blocks should not be fully shortened. As shown in the above example, a trailing 0 is required when shortening fields that consist of 0's.

        </Callout>

#### Continent

Identifies requests by the continent from which the request was issued.

**Key information:**

-   Specify one or more continents using the following codes:
    -   **AF:** Africa
    -   **AS:** Asia
    -   **EU:** Europe
    -   **NA:** North America
    -   **OC:** Oceania
    -   **SA:** South and Central America
    -   **?:** Unknown continent

-   Certain requests may not return a valid continent code. A question mark (i.e., ?) will match requests for which a valid continent code could not be determined.
-   Continent codes are case-sensitive.

#### Cookie

Identifies requests by a cookie's value.

**Key information:**

-   Set the **Cookie Name** option to the exact name of the desired cookie. You may not use special characters, including an asterisk, or a regular expression.
-   Only a single cookie name may be specified per instance of this match condition.
-   Cookie name comparisons are case-insensitive.

#### Country

Identifies requests by the country from which the request was issued.

**Key information:**

-   Specify a country through its country code.
-   The `EU` and `AP` country codes do not encompass all IP addresses in those regions.
-   Certain requests may not return a valid country code. A question mark (i.e., ?) will match requests for which a valid country code could not be determined.
-   Country codes are case-sensitive.

#### Directory

Identifies requests by the request URL's relative path. This relative path excludes the filename of the requested asset.

**Key information:**

-   This relative path starts directly after the hostname.
-   A URL comparison ends right before the filename of the requested asset. A trailing forward slash is the last character in this type of path.
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

#### DMA Code

Identifies requests by the metro code (Designated Market Area - DMA) from which the request was issued.

**Key information:**

-   Specify a metro code as an integer value.
-   Request DMA codes from Nielsen.
-   Metro codes are only applicable for traffic from the United States.
-   Certain requests may not return a valid metro code. A question mark (i.e., `?`) will match requests for which a valid metro code could not be determined.

#### Dual Orientation

Identifies requests by whether the device that issued the request supports dual orientation (i.e., portrait and landscape).

#### Extensions

Identifies requests by the file extension defined in the URL.

This match condition looks for a URL that ends with a period (`.`) and the specified file extension. Therefore, make sure that any file extensions specified in the **Value** option do not contain a leading period.

**Correct:** `htm`

**Incorrect:** `.htm`

#### Filename

Identifies requests by the filename defined in the URL. 

**Key information:**

-   For the purposes of this match condition, a filename consists of the name of the requested asset, a period, and the file extension (e.g., index.html). 
-   Replace spaces in the filename with %20.

#### HTML Preferred DTD

Identifies requests by a device's preferred document type definition (DTD) for HTML content (e.g., `html5`).

#### Image Inlining

Identifies requests by whether the device that issued the request supports Base64-encoded images.

#### Is Android

Identifies requests by whether the operating system of the device that issued the request is Android.

#### Is App

Identifies requests by whether the device that issued the request is a native application. 

#### Is Full Desktop

Identifies requests by whether the device that issued the request provides a full desktop experience.

#### Is HTML Preferred

TODO

#### Is iOS

Identifies requests by whether the operating system of the device that issued the request is iOS.

#### Is Largescreen

TODO

#### Is Mobile

TODO

#### Is Robot

Identifies requests by whether the device that issued the request is considered to be an automated HTTP client (e.g., a robot crawler).

#### Is Smartphone

Identifies requests by whether the device that issued the request is a smartphone.

#### Is SmartTV

Identifies requests by whether the device that issued the request is a smart TV.

#### Is Tablet

Identifies requests by whether the device that issued the request is a tablet. This is an OS-independent description.

#### Is Touchscreen

Identifies requests by whether the device that issued the request uses a touchscreen as the primary pointing device.

#### Is Windows Phone

Identifies requests by whether the device that issued the request is a Windows Mobile 6.5/Windows Phone 7 or higher.

#### Is Wireless Device

Identifies requests by whether the device that issued the request is a wireless device. 

#### Is WML Preferred

TODO

#### Latitude

Identifies requests by the latitude from which the request was issued.

**Key information:**

-   Latitude is not precise. It returns the geographic coordinate for the postal code, city, region, or country associated with the IP address that submitted the request.
-   Specify latitude as a decimal value from 0 to 90. Preprend `-` for negative values.

    **Example:** `33.9705`

-   Certain requests may not return a valid latitude. A question mark (i.e., `?`) will match requests for which a valid latitude could not be determined.

#### Longitude

Identifies requests by the longitude from which the request was issued.

**Key information:**

-   Longitude is not precise. It returns the geographic coordinate for the postal code, city, region, or country associated with the IP address that submitted the request.
-   Specify longitude as a decimal value from 0 to 90. Preprend `-` for negative values.

    **Example:** `-118.4308`

-   Certain requests may not return a valid longitude. A question mark (i.e., `?`) will match requests for which a valid longitude could not be determined.

#### Marketing Name

Identifies requests by the marketing name (e.g., `BlackBerry 8100 Pearl`) of the device that issued the request.

#### Method

Identifies requests by their HTTP method. Only assets that are requested using the selected request method will satisfy this condition.

The available HTTP methods are: `GET | POST | PUT | DELETE | PATCH | HEAD | OPTIONS`

<!---
PATCH?
Add TRACE and CONNECT?
--->

#### Mobile Browser

Identifies requests by the name of the browser (e.g., Chrome) that issued the request.

#### Model Name

Identifies requests by the model name (e.g., s7) of the device that issued the request.

#### Operating System

Identifies requests by the operating system (e.g., IOS) of the device that issued the request.

#### Query

TODO

Identifies requests by the query string of the requested URL.

**Key information:**

-   The value associated with this match condition will be compared against the entire request's query string.
-   For the purposes of this option, a query string starts with the first character after the question mark (?) delimiter for the query string. Therefore, the text specified in the **Value** option should not include a leading question mark (?).
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters before setting the **Value** option. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters. If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values.

        </Callout>

<!---
TODO
Use the Encoded option to determine whether your match value, as defined in the Value option, will be decoded prior to comparison with the request's query string. You must set this option to Yes when either of the following conditions are true:

A URL normalization customization has been applied to your traffic.
The request's query string contains encoded Unicode characters (e.g., %E3%81%93).

Enabling this option ensures that your match value remains encoded.

TODO
If both of the above conditions are not applicable, then you should use the default configuration (i.e., No) which allows our service to decode your match value.
--->

#### Origin Path

TODO

Identifies requests by the request URL's relative path.

**Key information:**

-   This relative path starts directly after the hostname.
-   For the purpose of satisfying this condition, query strings in the URL are ignored.
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters before setting the **Value** option. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters. If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values.

        </Callout>

#### Query String

TODO

Identifies requests by the query string of the requested URL.

**Key information:**

-   The value associated with this match condition will be compared against the entire request's query string.
-   For the purposes of this option, a query string starts with the first character after the question mark (?) delimiter for the query string. Therefore, the text specified in the **Value** option should not include a leading question mark (?).
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters before setting the **Value** option. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters. If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values.

        </Callout>

<!---
TODO
Use the Encoded option to determine whether your match value, as defined in the Value option, will be decoded prior to comparison with the request's query string. You must set this option to Yes when either of the following conditions are true:

A URL normalization customization has been applied to your traffic.
The request's query string contains encoded Unicode characters (e.g., %E3%81%93).

Enabling this option ensures that your match value remains encoded.

TODO
If both of the above conditions are not applicable, then you should use the default configuration (i.e., No) which allows our service to decode your match value.
--->


#### Path

TODO

Identifies requests by the request URL's relative path.

**Key information:**

-   This relative path starts directly after the hostname.
-   For the purpose of satisfying this condition, query strings in the URL are ignored.
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters before setting the **Value** option. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters. If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values.

        </Callout>


#### Pointing Method

TODO

#### POP Code

Identifies requests by the POP that processed the request.

TODO - POP List

#### Postal Code

Identifies requests by the postal code from which the request was issued.

#### Preferred Markup

TODO

#### Progressive Download

TODO

#### Query Parameter

Identifies requests by the value assigned to a query string parameter in the request URL.

**Key information:**

-   **Parameter name:**

    -   Query parameter name comparisons are case-insensitive.
    -   Replace spaces in the parameter name with %20.
    -   Only query parameters whose name is an exact match to the specified value may satisfy this condition.

-   Parameter value:
    -   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

        -   **SPACE:** %20
        -   **&:** %26
        -   **%:** %25

#### Random Integer

TODO

#### Referring Domain

Identifies requests by referrer's hostname. A referrer's hostname is determined by the `Referer` header.

#### Region Code

Identifies requests by the code for the region (e.g., state or province) from which the request was issued.

**Key information:**

-   Identify the desired region by its region code. A region code, which consists of 1 to 3 alphanumeric characters, identifies a subdivision of a country by the region segment of the corresponding ISO 3166-2 code.

    [View ISO 3166-2 codes. (Wikipedia)](https://en.wikipedia.org/wiki/ISO_3166-2)

    [View ISO 3166-2 codes. (UNECE)](http://www.unece.org/cefact/locode/subdivisions.html)

    **Example:**

    The ISO 3166-2 code for California is `US-CA`. Therefore, the region code for California is `CA`.

-   Certain regions have two levels of subdivisions. The specified value will be compared against the most specific region code.

    **Example:**

    A request that originates from the Devon (aka Devonshire) county of England, which is part of the United Kingdom (`UK`), has the following subdivisions: `GB` and `DEV`. Requests from this county will be matched against `DEV`.

-   Region codes are only unique within a country. In order to prevent false positives, we strongly recommend that you also add the Country match condition to your rule.

    **Example:**

    Requests from the following regions will report the same region code (i.e., `SP`).

    -   São Paulo, Brazil (`BR-SP`)
    -   La Spezia, Italy (`IT-SP`)
    -   Sandy Point, Bahamas (`BS-SP`)

-   Certain requests may not return a valid region code. A question mark (i.e., `?`) will match requests for which a valid region code could not be determined.

#### Release Date

Identifies requests by the date on which the device that issued the request was added to the WURFL database.

**Format:** `<YYYY>_<MM>`

**Example:** `2022_december`

#### Request Header

Identifies requests by request header value.

**Key information:**

-   **Header name:**

    -   Header name comparisons are case-insensitive.
    -   Replace spaces in the header name with `%20`.
    -   Only request headers whose name is an exact match to the specified value may satisfy this condition.

-   **Header value:**
    -   Replace spaces in the header value with `%20`.

#### Resolution Height

Identifies requests by the height, in pixels, of the device that issued the request.

**Key information:**

-   Height must be specified in pixels. 
-   Height must be specified as a whole number.

#### Resolution Width

Identifies requests by the width, in pixels, of the device that issued the request.

**Key information:**

-   Width must be specified in pixels. 
-   Width must be specified as a whole number.

#### Scheme

Identifies requests by their HTTP protocol: HTTP or HTTPS.

#### UX Full Desktop

TODO

#### XHTML Support Level

TODO
