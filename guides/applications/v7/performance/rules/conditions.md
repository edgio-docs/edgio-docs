---
title: Conditions Reference
---

A match condition identifies the set of requests to which one or more feature(s) will be applied. The available match conditions are listed below.

| Category  | Match Conditions  |
|---|---|
| Location  | <ul><li>[ASN](#asn)</li><li>[City](#city)</li><li>[Continent](#continent)</li><li>[Country](#country)</li><li>[DMA Code](#dma-code)</li><li>[Latitude](#latitude)</li><li>[Longitude](#longitude)</li><li>[Postal Code](#postal-code)</li><li>[Region Code](#region-code)</li></ul> |
| Request  | <ul><li>[Client IP](#client-ip)</li><li>[Cookie](#cookie)</li><li>[Directory](#directory)</li><li>[Extension](#extension)</li><li>[Filename](#filename)</li><li>[HTTP X-Forwarded-Host](#http-x-forwarded-host)</li><li>[Is Subrequest](#is-subrequest)</li><li>[Method](#method)</li><li>[Origin Path](#origin-path)</li><li>[Origin Query String](#origin-query-string)</li><li>[Path](#path)</li><li>[POP Code](#pop-code)</li><li>[Query](#query)</li><li>[Query Parameter](#query-parameter)</li><li>[Query String](#query-string)</li><li>[Referring Domain](#referring-domain)</li><li>[Request Header](#request-header)</li><li>[Scheme](#scheme)</li><li>[Virtual Destination Address](#virtual-destination-address)</li><li>[Virtual HTTP Version](#virtual-http-version)</li><li>[Wurfl Capability Device OS Version](#wurfl-capability-device-os-version)</li></ul>  |
| Device  | <ul><li>[Brand Name](#brand-name)</li><li hidden>[Device Operating System](#device-operating-system)</li><li>[Dual Orientation](#dual-orientation)</li><li>[HTML Preferred DTD](#html-preferred-dtd)</li><li>[Image Inlining](#image-inlining)</li><li>[Is Android](#is-android)</li><li>[Is App](#is-app)</li><li>[Is Full Desktop](#is-full-desktop)</li><li>[Is iOS](#is-ios)</li><li>[Is Robot](#is-robot)</li><li>[Is Smartphone](#is-smartphone)</li><li>[Is SmartTV](#is-smarttv)</li><li>[Is Tablet](#is-tablet)</li><li>[Is Touchscreen](#is-touchscreen)</li><li>[Is Windows Phone](#is-windows-phone)</li><li>[Is Wireless Device](#is-wireless-device)</li><li>[Marketing Name](#marketing-name)</li><li>[Mobile Browser](#mobile-browser)</li><li>[Model Name](#model-name)</li><li>[Progressive Download](#progressive-download)</li><li>[Release Date](#release-date)</li><li>[Resolution Height](#resolution-height)</li><li>[Resolution Width](#resolution-width)</li></ul>  |
| Miscellaneous  | <ul><li>[Random Integer](#random-integer)</li></ul>  |
| Response  | <ul><li>[Cache Status](#cache-status)</li><li>[Content Length](#content-length)</li><li>[Response Age](#response-age)</li><li>[Response Content Type](#response-content-type)</li><li>[Response Edgecast Control](#response-edgecast-control)</li><li>[Response Location](#response-location)</li><li>[Response Set Cookie](#response-set-cookie)</li><li>[Response Status Code](#response-status-code)</li><li>[Response Transfer Encoding](#response-transfer-encoding)</li><li>[Response Vary](#response-vary)</li><li>[Response X-Cache](#response-x-cache)</li></ul>  |

#### ASN {/*asn*/} <edgejs>location</edgejs>

Identifies requests by the network from which the request was issued. A network is identified by its Autonomous System Number (ASN).

**Key information:**

-   Certain requests may not return a valid AS number. A question mark (i.e., `?`) will match requests for which a valid AS number could not be determined.
-   Specify a value that matches the entire AS number for the desired network (e.g., `64514` and `64515`).

<edgejs>

**Key information:**

-   Certain requests may not return a valid AS number. A question mark (i.e., `?`) will match requests for which a valid AS number could not be determined.
-   Specify a value that matches the entire AS number for the desired network.
-   Specify multiples values through the `in` and `not_in` operators.
-   **Supported operators:** `=== | !== | in | not_in`

**Example:**
The following configuration matches requests arriving from either `64514` or `64515`:

```
router.conditional({
    if: [{
            in: [{
                    location: 'asn',
                },
                ['64514', '64515'],
            ],
        }, {
            // Features
            },
        },
    ],
});
```

</edgejs>

#### Brand Name {/*brand-name*/} <edgejs>device</edgejs>

Identifies requests by the manufacturer (e.g., Samsung) of the device that issued the request.

**Key information:**

-   Specify a value using any combination of numbers, letters, or symbols.
-   Use a regular expression to specify multiple values (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Specify a value using any combination of numbers, letters, or symbols.
-   Use a regular expression to specify multiple values (e.g., 'value 1|value 2').
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    device: 'brand_name',
                },
                'Samsung|Apple',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Cache Status {/*cache-status*/} <edgejs>variable</edgejs>

Identifies requests by the [cache status](/applications/performance/caching/cache_status_codes) for the requested content. 

**Key information:**

-   The edge server handling the request identifies the cache status for the requested resource. {{ PRODUCT }} then compares the code for this cache status against the specified value or pattern.

<edgejs>
**Key information:**

-   The edge server handling the request identifies the cache status for the requested resource. {{ PRODUCT }} then compares the code for this cache status against the specified value or pattern.
-   Specify a value using any combination of numbers, letters, or symbols.
-   Use a regular expression to specify multiple values (e.g., 'value 1|value 2').
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    variable: 'cache_status',
                },
                'TCP_HIT|TCP_PARTIAL_HIT',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### City {/*city*/} <edgejs>location</edgejs>

Identifies requests by the city from which they originated.

**Key information:**

-   Certain requests may not return a valid city name. A question mark (i.e., `?`) will match requests for which a valid city name could not be determined.

<edgejs>
**Key information:**

-   Certain requests may not return a valid city name. A question mark (i.e., `?`) will match requests for which a valid city name could not be determined.
-   Specify multiples values through the `in`/`not_in` operators or a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~ | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    location: 'city',
                },
                'Miami',
            ],
        }, {
            // Features
            },
        },
    ],
});
```

</edgejs>

#### Client IP {/*client-ip*/} <edgejs>request</edgejs>

Identifies requests that originate from a particular IP address.

**Key information:**

-   Use CIDR notation.
<!-- -   Specify multiple IP addresses and/or IP address blocks by delimiting each one with a single space.

    -   **IPv4 Example:** `1.2.3.4 10.20.30.40` matches any requests arriving from either `1.2.3.4` or `10.20.30.40`.
    -   **IPv6 Example:** `1:2:3:4:5:6:7:8 10:20:30:40:50:60:70:80` matches any requests arriving from either `1:2:3:4:5:6:7:8` or `10:20:30:40:50:60:70:80`.
-->
-   The syntax for an IP address block is the base IP address followed by a forward slash and the prefix size.

    -   **IPv4 Example:** `5.5.5.64/26` matches any requests arriving from `5.5.5.64` through `5.5.5.127`.
    -   **IPv6 Example:** `1:2:3::0/48` matches any requests arriving from `1:2:3:0:0:0:0:0` through `1:2:3:ffff:ffff:ffff:ffff:ffff`.

        <Callout type="info">

          IPv6 address blocks should not be fully shortened. As shown in the above example, a trailing `0` is required when shortening fields that consist of 0's.

        </Callout>

<edgejs>

**Key information:**

-   Use CIDR notation.
<!-- -   Specify multiple IP addresses and/or IP address blocks by delimiting each one with a single space.

    -   **IPv4 Example:** `1.2.3.4 10.20.30.40` matches any requests arriving from either `1.2.3.4` or `10.20.30.40`.
    -   **IPv6 Example:** `1:2:3:4:5:6:7:8 10:20:30:40:50:60:70:80` matches any requests arriving from either `1:2:3:4:5:6:7:8` or `10:20:30:40:50:60:70:80`.
-->
-   The syntax for an IP address block is the base IP address followed by a forward slash and the prefix size.

    -   **IPv4 Example:** `5.5.5.64/26` matches any requests arriving from `5.5.5.64` through `5.5.5.127`.
    -   **IPv6 Example:** `1:2:3::0/48` matches any requests arriving from `1:2:3:0:0:0:0:0` through `1:2:3:ffff:ffff:ffff:ffff:ffff`.

        <Callout type="info">

          IPv6 address blocks should not be fully shortened. As shown in the above example, a trailing `0` is required when shortening fields that consist of 0's.

        </Callout>
-   **Supported operators:** `=== | !==`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    request: 'client_ip',
                },
                '5.5.5.64/26',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Content Length {/*content-length*/} <edgejs>variable</edgejs>

Identifies requests by the content length, in bytes, of the response.

**Key information:**

-   Use a regular expression (e.g., `\b[1-9][0-9]{2}\b`) to specify a range of valid values.

<edgejs>

**Key information:**

-   Use a regular expression (e.g., `\b[1-9][0-9]{2}\b`) to specify a range of valid values.
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    variable: 'content_length',
                },
                '\\b[1-9][0-9]{2}\\b',
            ],
        }, {
            // Features
            },
        },
    ],
});
```

</edgejs>

#### Continent {/*continent*/} <edgejs>location</edgejs>

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

<edgejs>
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
-   Specify multiples values through the `in` and `not_in` operators.
-   **Supported operators:** `=== | !== | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            in: [{
                    location: 'continent',
                },
                ['NA', 'EU', 'AS'],
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Cookie {/*cookie*/} <edgejs>request</edgejs>

Identifies requests by a cookie's value.

**Key information:**

-   Set the **Cookie Name** option to the exact name of the desired cookie. You may not use special characters, including an asterisk, or a regular expression.
-   Only a single cookie name may be specified per instance of this match condition.
-   Cookie name comparisons are case-insensitive.
-   Use a regular expression (e.g., `value 1|value 2`) to specify multiple cookie values.

<edgejs>
**Key information:**

-   Set `request.cookie` to the exact name of the desired cookie. You may not use special characters, including an asterisk, or a regular expression.
-   Only a single cookie name may be specified per instance of this match condition.
-   Cookie name comparisons are case-insensitive.
-   Use a regular expression (e.g., `value 1|value 2`) to specify multiple cookie values.
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    request.cookie: 'type',
                },
                'chocolate|oatmeal',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Country {/*country*/} <edgejs>location</edgejs>

Identifies requests by the country from which the request was issued. Specify each desired country through its [country code](/applications/reference/country_codes).

**Key information:**

-   The `EU` and `AP` country codes do not encompass all IP addresses in those regions.

    [Learn more.](/applications/reference/country_codes#regions)

-   Certain requests may not return a valid country code. A question mark (i.e., ?) will match requests for which a valid country code could not be determined.
-   Country codes are case-sensitive.

<edgejs>
**Key information:**

-   The `EU` and `AP` country codes do not encompass all IP addresses in those regions.

    [Learn more.](/applications/reference/country_codes#regions)

-   Certain requests may not return a valid country code. A question mark (i.e., ?) will match requests for which a valid country code could not be determined.
-   Country codes are case-sensitive.
-   Specify multiples values through the `in` and `not_in` operators.
-   **Supported operators:** `=== | !== | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            in: [{
                    location: 'country',
                },
                ['US', 'MX', 'CA'],
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

<!--
#### Device Operating System {/*device-operating-system*/} <edgejs>device</edgejs>

Identifies requests by the operating system (e.g., IOS) of the device that issued the request.

<edgejs>

**Example:**

</edgejs>
-->

#### Directory {/*directory*/} <edgejs>request.path</edgejs>

Identifies requests by the request URL's relative path. This relative path excludes the filename of the requested asset.

**Key information:**

-   This relative path starts directly after the hostname.
-   A URL comparison ends right before the filename of the requested asset. A trailing forward slash is the last character in this type of path.
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

<edgejs>

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    request.path: 'directory',
                },
                '/marketing/conferences/',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### DMA Code {/*dma-code*/} <edgejs>location</edgejs>

Identifies requests by the metro code (Designated Market Area - DMA) from which the request was issued.

**Key information:**

-   Should I use the Metro Code or DMA Code match condition?

    Both of these match conditions provide the same capability. However, we recommend the use of the [Metro Code match condition](#metro-code) to identify requests by DMA.

-   Request DMA codes from Nielsen.
-   Metro codes are only applicable for traffic from the United States.
-   Certain requests may not return a valid metro code. A question mark (i.e., `?`) will match requests for which a valid metro code could not be determined.

<edgejs>
**Key information:**

-   Should I use the `dma_code` or `metro_code` match condition?

    Both of these match conditions provide the same capability. However, we recommend the use of the [metro_code match condition](#metro-code) to identify requests by DMA.

-   Request DMA codes from Nielsen.
-   Metro codes are only applicable for traffic from the United States.
-   Certain requests may not return a valid metro code. A question mark (i.e., `?`) will match requests for which a valid metro code could not be determined.
-   Specify multiples values through the `in` and `not_in` operators.
-   **Supported operators:** `=== | !== | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            in: [{
                    location: 'dma_code',
                },
                ['803'],
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Dual Orientation {/*dual-orientation*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request supports dual orientation (i.e., portrait and landscape).

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'dual_orientation',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Extension {/*extension*/} <edgejs>request.path</edgejs>

Identifies requests by the file extension defined in the URL.

This match condition looks for a URL that ends with a period (`.`) and the specified file extension. Therefore, make sure that any file extensions specified in the **Value** option do not contain a leading period.

**Correct:** `htm`

**Incorrect:** `.htm`

<edgejs>
**Key information:**

-   This match condition looks for a URL that ends with a period (`.`) and the specified file extension. Therefore, make sure that any file extensions specified in the **Value** option do not contain a leading period.

    **Correct:** `htm`

    **Incorrect:** `.htm`
-   **Supported operators:** `=== | !== | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            in: [{
                    request.path: 'extension',
                },
                ['png', 'jpg', 'jpeg'],
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>


#### Filename {/*filename*/} <edgejs>request.path</edgejs>

Identifies requests by the filename defined in the URL.

**Key information:**

-   For the purposes of this match condition, a filename consists of the name of the requested asset, a period, and the file extension (e.g., `index.html`).
-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   For the purposes of this match condition, a filename consists of the name of the requested asset, a period, and the file extension (e.g., `index.html`).
-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    request.path: 'filename',
                },
                'basketball.mp4',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### HTML Preferred DTD {/*html-preferred-dtd*/} <edgejs>device</edgejs>

Identifies requests by a device's preferred document type definition (DTD) for HTML content (e.g., `html4`).

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'html_preferred_dtd',
                },
                "html4",
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### HTTP X-Forwarded-Host {/*http-x-forwarded-host*/} <edgejs>variable</edgejs>

Identifies requests by the value assigned to the `x-forwarded-host` header. 

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    variable: 'http_x_forwarded_host',
                },
                'www.example.com|cdn.example.com',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Image Inlining {/*image-inlining*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request supports Base64-encoded images.

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'image_inlining',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Android {/*is-android*/} <edgejs>device</edgejs>

Identifies requests by whether the operating system of the device that issued the request is Android.

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_android',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is App {/*is-app*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is a native application.

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_app',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Full Desktop {/*is-full-desktop*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request provides a full desktop experience.

<edgejs>
**Example:**
```
export default new Router().if(
  { edgeControlCriteria: { "===": [{ device: "is_full_desktop" }, true] } },
  { 
    // Features
  } }
);
```
</edgejs>

#### Is iOS {/*is-ios*/} <edgejs>device</edgejs>

Identifies requests by whether the operating system of the device that issued the request is iOS.

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_ios',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Robot {/*is-robot*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is considered to be an automated HTTP client (e.g., a robot crawler).

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_robot',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Smartphone {/*is-smartphone*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is a smartphone.

<edgejs>

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_smartphone',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is SmartTV {/*is-smarttv*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is a smart TV.

<edgejs>

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_smarttv',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Subrequest {/*is-subrequest*/} <edgejs>variable</edgejs>

Identifies a subrequest that was spawned from the client's request. Our edge servers generate subrequests under certain conditions or as required by special configurations. 

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    variable: 'is_subrequest',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Tablet {/*is-tablet*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is a tablet. This is an OS-independent description.

<edgejs>

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_tablet',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Touchscreen {/*is-touchscreen*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request uses a touchscreen as the primary pointing device.

<edgejs>

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_touchscreen',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Windows Phone {/*is-windows-phone*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is a Windows Mobile 6.5/Windows Phone 7 or later.

<edgejs>

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_windows_phone',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Is Wireless Device {/*is-wireless-device*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is a wireless device.

<edgejs>

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'is_wireless_device',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Latitude {/*latitude*/} <edgejs>location</edgejs>

Identifies requests by the latitude from which the request was issued.

**Key information:**

-   Latitude is not precise. It returns the geographic coordinate for the postal code, city, region, or country associated with the IP address that submitted the request.
-   Specify latitude as a decimal value from 0 to 90. Preprend `-` for negative values.

    **Example:** `33.9705`

-   Certain requests may not return a valid latitude. A question mark (i.e., `?`) will match requests for which a valid latitude could not be determined.

<edgejs>
**Key information:**

-   Latitude is not precise. It returns the geographic coordinate for the postal code, city, region, or country associated with the IP address that submitted the request.
-   Specify latitude as a decimal value from 0 to 90. Preprend `-` for negative values.
-   Certain requests may not return a valid latitude. A question mark (i.e., `?`) will match requests for which a valid latitude could not be determined.
-   **Supported operators:** `=== | !== | < | <= | > | >=`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    location: 'latitude',
                },
                '33.9705',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Longitude {/*longitude*/} <edgejs>location</edgejs>

Identifies requests by the longitude from which the request was issued.

**Key information:**

-   Longitude is not precise. It returns the geographic coordinate for the postal code, city, region, or country associated with the IP address that submitted the request.
-   Specify longitude as a decimal value from 0 to 90. Preprend `-` for negative values.

    **Example:** `-118.4308`

-   Certain requests may not return a valid longitude. A question mark (i.e., `?`) will match requests for which a valid longitude could not be determined.

<edgejs>
**Key information:**

-   Longitude is not precise. It returns the geographic coordinate for the postal code, city, region, or country associated with the IP address that submitted the request.
-   Specify longitude as a decimal value from 0 to 90. Preprend `-` for negative values.
-   Certain requests may not return a valid longitude. A question mark (i.e., `?`) will match requests for which a valid longitude could not be determined.
-   **Supported operators:** `=== | !== | < | <= | > | >=`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    location: 'longitude',
                },
                '-118.4308',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Marketing Name {/*marketing-name*/} <edgejs>device</edgejs>

Identifies requests by the marketing name (e.g., `BlackBerry 8100 Pearl`) of the device that issued the request.

**Key information:**

-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    device: 'marketing_name',
                },
                'Galaxy(.*)',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Method {/*method*/} <edgejs>request</edgejs>

Identifies requests by their HTTP method. Only assets that are requested using the selected request method will satisfy this condition.

The available HTTP methods are: `GET | POST | PUT | DELETE | PATCH | HEAD | OPTIONS`

<!---
src for PATCH: UI
--->

<edgejs>
**Key information:**

-   The available HTTP methods are: `GET | POST | PUT | DELETE | PATCH | HEAD | OPTIONS`
-   **Supported operators:** `=== | !==`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    request: 'method',
                },
                'GET',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Metro Code {/*metro-code*/} <edgejs>location</edgejs>

Identifies requests by the metro code (Designated Market Area - DMA) from which the request was issued.

**Key information:**

-   Should I use the Metro Code or DMA Code match condition?

    Both of these match conditions provide the same capability. However, we recommend the use of the Metro Code match condition to identify requests by DMA.

-   Request DMA codes from Nielsen.
-   Metro codes are only applicable for traffic from the United States.
-   Certain requests may not return a valid metro code. A question mark (i.e., `?`) will match requests for which a valid metro code could not be determined.

<edgejs>
**Key information:**

-   Should I use the `dma_code` or `metro_code` match condition?

    Both of these match conditions provide the same capability. However, we recommend the use of the `metro_code` match condition to identify requests by DMA.

-   Request DMA codes from Nielsen.
-   Metro codes are only applicable for traffic from the United States.
-   Certain requests may not return a valid metro code. A question mark (i.e., `?`) will match requests for which a valid metro code could not be determined.
-   Specify multiples values through the `in` and `not_in` operators.
-   **Supported operators:** `=== | !== | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            in: [{
                    location: 'metro_code',
                },
                ['803'],
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Mobile Browser {/*mobile-browser*/} <edgejs>device</edgejs>

Identifies requests by the name of the browser (e.g., Chrome) that issued the request.

**Key information:**

-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'mobile_browser',
                },
                'Chrome',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Model Name {/*model-name*/} <edgejs>device</edgejs>

Identifies requests by the model name (e.g., s10) of the device that issued the request.

**Key information:**

-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Use a regular expression to specify multiples values (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'model_name',
                },
                's17',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Origin Path {/*origin-path*/} <edgejs>request</edgejs>

Identifies requests by the request URL's relative path. This relative path comparison is performed on rewritten or redirected URLs.

**Key information:**

-   This relative path comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Rewrite or redirect a URL through the [URL Rewrite](/applications/performance/rules/features#rewrite-url) and [URL Redirect](/applications/performance/rules/features#url-redirect) features, respectively. Use the [Path](#path) match condition to match on the original relative path submitted by the client.
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

          Curl does not encode non-US-ASCII characters.

        </Callout>

<edgejs>
**Key information:**

-   This relative path comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Rewrite or redirect a URL through the [URL Rewrite](/applications/performance/rules/features#rewrite-url) and [URL Redirect](/applications/performance/rules/features#url-redirect) features, respectively. Use the [Path](#path) match condition to match on the original relative path submitted by the client.
-   This relative path starts directly after the hostname.
-   For the purpose of satisfying this condition, query strings in the URL are ignored.
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters.

        </Callout>
-   **Supported operators:** `== | != | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '==': [{
                    request: 'origin_path',
                },
                '/marketing/conferences/:path*',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Origin Query String {/*origin-query-string*/} <edgejs>request</edgejs>

Identifies requests by the query string of the requested URL. This query string comparison is performed on rewritten or redirected URLs.

**Key information:**

-   You may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL. This query string comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Use the [Query String](#query-string) match condition to match on the query string submitted by the client.
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

          Curl does not encode non-US-ASCII characters.

        </Callout>

<edgejs>
**Key information:**

-   You may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL. This query string comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Use the [Query String](#query-string) match condition to match on the query string submitted by the client.
-   The value associated with this match condition will be compared against the entire request's query string.
-   For the purposes of this option, a query string starts with the first character after the question mark (?) delimiter for the query string. Therefore, do not include a leading question mark (?).
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters.

        </Callout>
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
export default new Router().if(
  {
    edgeControlCriteria: {
      "===": [{ request: "origin_query_string" }, "country=france"],
    },
  },
  {
    // Features
  }
);
```
</edgejs>

#### Path {/*path*/} <edgejs>request</edgejs>

Identifies requests by the relative path of the request URL submitted by the client.

**Key information:**

-   Although you may configure {{ PRODUCT }} to rewrite or redirect a URL, this relative path comparision will always be performed against the  request URL submitted by the client. Use the [Origin Path](#origin-path) match condition to match on a rewritten or redirected URL.
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

          Curl does not encode non-US-ASCII characters.

        </Callout>

<edgejs>
**Key information:**

-   Although you may configure {{ PRODUCT }} to rewrite or redirect a URL, this relative path comparision will always be performed against the  request URL submitted by the client. Use the [Origin Path](#origin-path) match condition to match on a rewritten or redirected URL.
-   This relative path starts directly after the hostname.
-   For the purpose of satisfying this condition, query strings in the URL are ignored.
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters.

        </Callout>
-   **Supported operators:** `=== | !== | == | != | =~ | !~ | in | not_in`

**Example:**


```
router.conditional({
    if: [{
            '==': [{
                    request: 'path',
                },
                '/marketing/conferences/:path*',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### POP Code {/*pop-code*/} <edgejs>request</edgejs>

Identifies requests by the point-of-presence (POP) that processed the request. Set this match condition to the [three-letter code for the desired POP](/applications/reference/pops).

<edgejs>
**Key information:**
-   Specify multiples values through a regular expression (e.g., `LAA|LAC`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    request: 'pop_code',
                },
                'LAC',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Postal Code {/*postal-code*/} <edgejs>location</edgejs>

Identifies requests by the postal code from which the request was issued.

**Key information:**
-   Specify a postal code as an integer value.
-   A comparison will only be performed against the first 3 characters for Canadian postal codes.
-   A comparison will only be performed against the first 2 - 4 characters for United Kingdom postal codes.
-   Certain requests may not return a valid postal code. A question mark (i.e., `?`) will match requests for which a valid postal code could not be determined.

<edgejs>
**Key information:**
-   Specify a postal code as an integer value.
-   A comparison will only be performed against the first 3 characters for Canadian postal codes.
-   A comparison will only be performed against the first 2 - 4 characters for United Kingdom postal codes.
-   Specify multiples values through the `in`/`not_in` operators or a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~ | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    location: 'postal_code',
                },
                '90405',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Progressive Download {/*progressive-download*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request supports the playback of audio/video while it is still being downloaded.

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'progressive_download',
                },
                true,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Query {/*query*/} <edgejs>request</edgejs>

Identifies requests by a query string parameter of the request URL submitted by the client.

**Key information:**
-   Although you may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL, this comparision will always be performed against the request URL submitted by the client. Use the [Query Parameter](#query-parameter) match condition to match on a query string parameter for a rewritten or redirected URL.
-   **Syntax:** `<NAME>=<VALUE>`

    **Example:** The following value is only satisfied when the request submitted by the client contains a query string parameter whose name is *country* and whose value is *US*: `country=US`

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

          Curl does not encode non-US-ASCII characters.

        </Callout>

<edgejs>
**Key information:**

-   Although you may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL, this comparision will always be performed against the request URL submitted by the client. Use the [Query Parameter](#query-parameter) match condition to match on a query string parameter for a rewritten or redirected URL.
-   **Syntax:** `<NAME>=<VALUE>`

    **Example:** The following value is only satisfied when the request submitted by the client contains a query string parameter whose name is *country* and whose value is *US*: `country=US`

-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters.

        </Callout>
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
export default new Router().match(
  { query: "country=france" },
  {
    // Features
  }
);
```
</edgejs>

#### Query Parameter {/*query-parameter*/} <edgejs>request.origin_query</edgejs>

Identifies requests by the value assigned to a query string parameter in the request URL. This comparison is performed on rewritten or redirected URLs.

**Key information:**

-   You may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL. This comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Use the [Query](#query) match condition to match on a query string parameter submitted by the client.
-   **Parameter name:**

    -   Query parameter name comparisons are case-insensitive.
    -   Replace spaces in the parameter name with %20.
    -   Only query parameters whose name is an exact match to the specified value may satisfy this condition.

-   **Parameter value:**
    -   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

        -   **SPACE:** %20
        -   **&:** %26
        -   **%:** %25
    -   Specify multiples values through a regular expression (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   You may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL. This comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Use the [Query](#query) match condition to match on a query string parameter submitted by the client.
-   **Parameter name:**

    -   Query parameter name comparisons are case-insensitive.
    -   Replace spaces in the parameter name with %20.
    -   Only query parameters whose name is an exact match to the specified value may satisfy this condition.

-   Parameter value:
    -   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

        -   **SPACE:** %20
        -   **&:** %26
        -   **%:** %25
    -   Specify multiples values through a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
export default new Router().if(
  {
    edgeControlCriteria: {
      "===": [{ "request.origin_query": "country" }, "france"],
    },
  },
  {
    // Features
  }
);
```
</edgejs>

#### Query String {/*query-string*/} <edgejs>request</edgejs>

Identifies requests by the query string of the requested URL. This query string comparison is performed on the request submitted by the client.

**Key information:**

-   You may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL. This comparison is performed before {{ PRODUCT }} rewrites or redirects the request. Use the [Origin Query String](#origin-query-string) match condition to match on a query string of a rewritten or redirected URL.
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

          Curl does not encode non-US-ASCII characters.

        </Callout>

<edgejs>
**Key information:**

-   You may configure {{ PRODUCT }} to [rewrite](/applications/performance/rules/features#rewrite-url) or [redirect](/applications/performance/rules/features#url-redirect) a URL. This comparison is performed before {{ PRODUCT }} rewrites or redirects the request. Use the [Origin Query String](#origin-query-string) match condition to match on a query string of a rewritten or redirected URL.
-   The value associated with this match condition will be compared against the entire request's query string.
-   For the purposes of this option, a query string starts with the first character after the question mark (?) delimiter for the query string. Therefore, do not include a leading question mark (?).
-   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

    -   **SPACE:** %20
    -   **&:** %26
    -   **%:** %25

-   Matching against URLs that contain non-US-ASCII characters requires that you specify encoded Unicode characters (e.g., `%E3%81%93`).
    -   Encode all Unicode characters. This match condition only accepts encoded Unicode characters.

        **Example:**

        You should include the following characters instead of こんにちは when defining this match condition's value: `%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF`

    -   The majority of user agents (e.g., web browsers) encode non-US-ASCII characters in the request's query string before submitting the request to our CDN. By default, our CDN service does not decode those characters.

        <Callout type="tip">

          Curl does not encode non-US-ASCII characters.

        </Callout>
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
export default new Router().if(
  { edgeControlCriteria: { "===": [{ request: "querystring" }, "country=france"] } },
  {
    // Features
 }
);
```
</edgejs>

#### Random Integer {/*random-integer*/} <edgejs>random</edgejs>

Identifies requests by performing a comparison against a random integer.

<Callout type="tip">

  This condition is useful for applying an action to a random set of requests.

  For example, if you set the maximum value to 2, then {{ PRODUCT }} will randomly apply 0, 1, and 2 to each request. If you configure this condition to match when the value is greater than `1`, then you can apply a set of actions to approximately a third of your requests.

</Callout>

**Key information:**
-   This condition generates a random integer between 0 and a user-defined number for each request. {{ PRODUCT }} will compare the number assigned to the request to the value defined within this condition.
-   Define the maximum value for this random number generation through the **Random Integer Range (from 0 to ?)** option.
-   Define the value to which {{ PRODUCT }} will perform a comparison through the **Value** option.

<edgejs>
<Callout type="tip">

  This condition is useful for applying an action to a random set of requests.

  For example, if you set the maximum value to 2, then {{ PRODUCT }} will randomly apply 0, 1, and 2 to each request. If you configure this condition to match when the value is greater than `1`, then you can apply a set of actions to approximately a third of your requests.

</Callout>

**Key information:**
-   This condition generates a random integer between 0 and a user-defined number for each request. {{ PRODUCT }} will compare the number assigned to the request to the value defined within this condition.
-   Set this match condition to the maximum value (number) for this random number generation.
-   Define the value to which {{ PRODUCT }} will perform a comparison through the second element of the array (number).
-   **Supported operators:** `< | <= | > | >=`

**Example:** The following route is satisfied when a request is randomly assigned 6, 7, 8, 9, or 10:

```
router.conditional({
    if: [{
            '>': [{
                    random: 10,
                },
                5,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Referring Domain {/*referring-domain*/} <edgejs>request</edgejs>

Identifies requests by the referrer's hostname. A referrer's hostname is determined by the `Referer` header.

**Key information:**

-   Specify multiples values through a regular expression (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Specify multiples values through a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    request: 'referring_domain',
                },
                'www.example.com',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Region Code {/*region-code*/} <edgejs>location</edgejs>

Identifies requests by the code for the region (e.g., state or province) from which the request was issued.

**Key information:**

-   Identify the desired region by its region code. A region code consists of 1 to 3 alphanumeric characters. A region code is also known as a subdivision code. This code is the latter half of an ISO 3166-2 code.

    [Look up ISO-3166-2 codes.](https://www.iso.org/obp/ui/#search/code/)

    **Example:**

    The ISO 3166-2 code for California is `US-CA`. Therefore, the region code for California is `CA`.

-   Certain regions have two levels of subdivisions. The specified value will be compared against the most specific region code.

    **Example:**

    A request that originates from the Devon (aka Devonshire) county of England, which is part of the United Kingdom (`UK`), has the following subdivisions: `GB` and `DEV`. Requests from this county will be matched against `DEV`.

-   Region codes are only unique within a country. In order to prevent false positives, we strongly recommend that you also add the [Country match condition](#country) to your rule.

    **Example:**

    Requests from the following regions will report the same region code (i.e., `SP`):

    -   São Paulo, Brazil (`BR-SP`)
    -   La Spezia, Italy (`IT-SP`)
    -   Sandy Point, Bahamas (`BS-SP`)

-   Certain requests may not return a valid region code. A question mark (i.e., `?`) will match requests for which a valid region code could not be determined.

<edgejs>
**Key information:**

-   Identify the desired region by its region code. A region code consists of 1 to 3 alphanumeric characters. A region code is also known as a subdivision code. This code is the latter half of an ISO 3166-2 code.

    [Look up ISO-3166-2 codes.](https://www.iso.org/obp/ui/#search/code/)

    **Example:**

    The ISO 3166-2 code for California is `US-CA`. Therefore, the region code for California is `CA`.

-   Certain regions have two levels of subdivisions. The specified value will be compared against the most specific region code.

    **Example:**

    A request that originates from the Devon (aka Devonshire) county of England, which is part of the United Kingdom (`UK`), has the following subdivisions: `GB` and `DEV`. Requests from this county will be matched against `DEV`.

-   Region codes are only unique within a country. In order to prevent false positives, we strongly recommend that you also add the `location.country` match condition to your rule.

    **Example:**

    Requests from the following regions will report the same region code (i.e., `SP`):

    -   São Paulo, Brazil (`BR-SP`)
    -   La Spezia, Italy (`IT-SP`)
    -   Sandy Point, Bahamas (`BS-SP`)

-   Certain requests may not return a valid region code. A question mark (i.e., `?`) will match requests for which a valid region code could not be determined.
-   Specify multiples values through the `in`/`not_in` operators or a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~ | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    location: 'region_code',
                },
                'CA',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Release Date {/*release-date*/} <edgejs>device</edgejs>

Identifies requests by the date on which the device that issued the request was added to the WURFL database.

**Format:** `<YYYY>_<MM>`

**Example:** `2022_december`

<edgejs>
**Key information:**
-   **Format:** `<YYYY>_<MM>`

    **Example:** `2022_december`
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    device: 'release_date',
                },
                '2022_december',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Request Header {/*request-header*/} <edgejs>request.header</edgejs>

Identifies requests by request header value.

**Key information:**

-   **Header name:**

    -   Header name comparisons are case-insensitive.
    -   Replace spaces in the header name with `%20`.
    -   Only request headers whose name is an exact match to the specified value may satisfy this condition.

-   **Header value:**
    -   Specify multiples values through a regular expression (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   **Header name:**
    -   Set this match condition to the desired request header (string).
    -   Header name comparisons are case-insensitive.
    -   Replace spaces in the header name with `%20`.
    -   Only request headers whose name is an exact match to the specified value may satisfy this condition.

-   **Header value:**
    -   Set the second element of the array to the desired request header value (string).
    -   Specify multiples values through a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    request.header: 'type',
                },
                'chocolate|oatmeal',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Resolution Height {/*resolution-height*/} <edgejs>device</edgejs>

Identifies requests by the height, in pixels, of the device that issued the request.

**Key information:**

-   Specify height in pixels.
-   Specify height as a whole number.

<edgejs>
**Key information:**

-   Specify height, in pixels, as an integer.
-   You may not specify a decimal value.
-   **Supported operators:** `=== | !== | < | <= | >= | >`

**Example:**

```
router.conditional({
    if: [{
            '>=': [{
                    device: 'resolution_height',
                },
                1080,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Resolution Width {/*resolution-width*/} <edgejs>device</edgejs>

Identifies requests by the width, in pixels, of the device that issued the request.

**Key information:**

-   Specify width in pixels.
-   Specify width as a whole number.

<edgejs>
**Key information:**

-   Specify width, in pixels, as an integer.
-   You may not specify a decimal value.
-   **Supported operators:** `=== | !== | < | <= | >= | >`

**Example:**

```
router.conditional({
    if: [{
            '>=': [{
                    device: 'resolution_width',
                },
                1920,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>


#### Response Age {/*response-age*/} <edgejs>variable</edgejs>

Identifies requests through the `Age` response header. This header contains the time, in seconds, since the response was cached on the edge server through which it was served.

<edgejs>
**Key information:**

-   **Supported operators:** `< | <= | > | >=`

**Example:** The following route is satisfied when the cached response is older than 120 seconds:

```
router.conditional({
    if: [{
            '>': [{
                    "variable": "resp_age",
                },
                120,
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Response Content Type {/*response-content-type*/} <edgejs>variable</edgejs>

Identifies requests through the `Content-Type` response header. This header identifies the type of content returned in the response's payload.

**Key information:**

-   Use a regular expression to specify multiple values (e.g., `application\/json|text\/html`).

<edgejs>
**Key information:**

-   Use a regular expression to specify multiple values (e.g., 'application\/json|text\/html').
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:** The following route is satisfied when the response's payload is JSON or HTML:

```
router.conditional({
    if: [{
            '=~': [{
                    "variable": "resp_content_type",
                },
                "application\/json|text\/html",
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Response Edgecast Control {/*response-edgecast-control*/} <edgejs>variable</edgejs>

Identifies requests through the `Edgecast Control` response header. 

<Important>
This match condition is designed to provide backwards-compatibility for customers migrated from Edgecast with specialized configurations. This match condition should not be used under any other circumstances.
</Important>

#### Response Location {/*response-location*/} <edgejs>variable</edgejs>

Identifies requests through the `Location` response header. This header identifies the URL to which the request should be redirected. One common use for this header is for redirect requests, such as `301` or `302` responses.

**Key information:**

-   Use a regular expression to specify multiple values (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Use a regular expression to specify multiple values (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:** The following route is satisfied when the response contains a `Location` header set to `https://cdn.example.com/alternate`:

```
router.conditional({
    if: [{
            '===': [{
                    "variable": "resp_location",
                },
                "https:\/\/cdn.example.com\/alternate",
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Response Set Cookie {/*response-set-cookie*/} <edgejs>variable</edgejs>

Identifies requests whose response contains a `Set-Cookie` header with the specified value or pattern.

**Key information:**

-   Use a regular expression (e.g., `value 1|value 2`) to specify multiple cookie values.
-   {{ PRODUCT }} compares the specified value or pattern against the `Set-Cookie` header(s) defined in the response.
-   We strongly recommend the use of regular expressions when the response contains multiple `Set-Cookie` headers. Matching with the `equals | does not equal` operators may produce unexpected results.

<edgejs>
**Key information:**

-   Use a regular expression (e.g., `value 1|value 2`) to specify multiple cookie values.
-   {{ PRODUCT }} compares the specified value or pattern against the `Set-Cookie` header(s) defined in the response.
-   We strongly recommend the use of regular expressions when the response contains multiple `Set-Cookie` headers. Matching with the `=== | !==` operators may produce unexpected results.
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    variable: 'resp_set_cookie',
                },
                '(.*)brand(.*)',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Response Status Code {/*response-status-code*/} <edgejs>response</edgejs>

Identifies requests whose response matches a HTTP status code.

**Key information:**

-   You may use this match condition to apply features that affect the response provided to the client. For example, you may set response headers, a response body, or HTTP status code for all requests whose HTTP status code is `404 Not Found`.

    <Callout type="tip">

	  You may use this match condition to instruct the client to redirect requests by setting a `Location` response header to the desired URL and the response status code to a `3xx` (redirection) status code (e.g., `301` and `302`).

    </Callout>

    <Callout type="info">

	  {{ PRODUCT }} checks for this match condition upon receiving a response. At this point in the request flow, all features that correspond to the request or cache have already been applied.

    </Callout>

<edgejs>
**Key information:**

-   You may use this match condition to apply features that affect the response provided to the client. For example, you may set response headers, a response body, or HTTP status code for all requests whose HTTP status code is `404 Not Found`.

    <Callout type="tip">

	  You may use this match condition to instruct the client to redirect requests by setting a `Location` response header to the desired URL and the response status code to a `3xx` (redirection) status code (e.g., `301` and `302`).

    </Callout>

    <Callout type="info">

	  {{ PRODUCT }} checks for this match condition upon receiving a response. At this point in the request flow, all features that correspond to the request or cache have already been applied.

    </Callout>
-   **Supported operators:** `=== | !== | =~ | !~ | in | not_in`

**Example:**

```
router.conditional({
    if: [{
            in: [{
                    response: 'status_code',
                },
                ["400", "403", "404", "500", "502"],
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Response Transfer Encoding {/*response-transfer-encoding*/} <edgejs>variable</edgejs>

Identifies requests through the `Transfer-Encoding` response header. This header identifies the type of encoding that is safe to use when transferring the response's payload.

**Key information:**

-   Specify multiples values through a regular expression (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Specify multiples values through a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    variable: 'resp_transfer_encoding',
                },
                'chunked',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Response Vary {/*response-vary*/} <edgejs>variable</edgejs>

Identifies requests through the `Vary` response header. This header identifies factors, aside from method and URL, that determined the payload returned in the response. For example, this header may list the request headers that were used to determine the response's payload.

**Key information:**

-   Specify multiples values through a regular expression (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Specify multiples values through a regular expression (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '=~': [{
                    variable: 'resp_vary',
                },
                '(.*)Tier(.*)',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Response X-Cache {/*response-x-cache*/} <edgejs>variable</edgejs>

Identifies requests through the `x-cache` response header. This header is set to `HIT` when a cached version of the requested content was served directly to the client by an edge server. 

<edgejs>
**Key information:**

-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    variable: 'resp_x_cache',
                },
                'HIT',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Scheme {/*scheme*/} <edgejs>request</edgejs>

Identifies requests by their HTTP protocol: HTTP or HTTPS.

<edgejs>
**Key information:**
-   Valid values are: `HTTP | HTTPS`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    request: 'scheme',
                },
                'HTTP',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Virtual Destination Address {/*virtual-destination-address*/} <edgejs>variable</edgejs>

Identifies requests by the client’s IP address.

<Tip>
This match condition was introduced for backwards-compatibility. We recommend that you use the [Client IP match condition](#client-ip) instead.
</Tip>

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    "variable": "virt_dst_addr"
                },
                '5.5.5.64/26',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Virtual HTTP Version {/*virtual-http-version*/} <edgejs>variable</edgejs>

Identifies requests by the version of the client’s request protocol.

<edgejs>
**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    "variable": "virt_http_version"
                },
                '2.0',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>

#### Wurfl Capability Device OS Version {/*wurfl-capability-device-os-version*/} <edgejs>variable</edgejs>

Identifies requests by the version number of the OS installed on the device.

**Key information:**

-   Use a regular expression to specify multiple values (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Use a regular expression to specify multiple values (e.g., '1.0.1|1.0.2').
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
    if: [{
            '===': [{
                    "variable": "wurfl_cap_device_os_version"
                },
                '1.0.1',
            ],
        }, {
            // Features
            },
        },
    ],
});
```
</edgejs>
