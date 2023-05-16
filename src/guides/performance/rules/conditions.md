---
title: Conditions Reference
---

A match condition identifies the set of requests to which one or more feature(s) will be applied. The available match conditions are listed below.

| Category  | Match Conditions  |
|---|---|
| Location  | <ul><li>[ASN](#asn)</li><li>[City](#city)</li><li hidden>[Continent](#continent)</li><li>[Country](#country)</li><li>[DMA Code](#dma-code)</li><li>[Latitude](#latitude)</li><li>[Longitude](#longitude)</li><li>[Postal Code](#postal-code)</li><li>[Region Code](#region-code)</li></ul> |
| Request  | <ul><li>[Client IP](#client-ip)</li><li>[Cookie](#cookie)</li><li hidden>[Directory](#directory)</li><li hidden>[Extensions](#extensions)</li><li>[Filename](#filename)</li><li>[Method](#method)</li><li>[Origin Path](#origin-path)</li><li>[Path](#path)</li><li>[POP Code](#pop-code)</li><li>[Query](#query)</li><li>[Query Parameter](#query-parameter)</li><li>[Query String](#query-string)</li><li>[Referring Domain](#referring-domain)</li><li>[Request Header](#request-header)</li><li>[Scheme](#scheme)</li></ul>  |
| Device  | <ul><li>[Brand Name](#brand-name)</li><li hidden>[Device Operating System](#device-operating-system)</li><li>[Dual Orientation](#dual-orientation)</li><li hidden>[HTML Preferred DTD](#html-preferred-dtd)</li><li>[Image Inlining](#image-inlining)</li><li>[Is Android](#is-android)</li><li>[Is App](#is-app)</li><li hidden>[Is Full Desktop](#is-full-desktop)</li><li>[Is iOS](#is-ios)</li><li>[Is Robot](#is-robot)</li><li>[Is Smartphone](#is-smartphone)</li><li>[Is SmartTV](#is-smarttv)</li><li>[Is Tablet](#is-tablet)</li><li>[Is Touchscreen](#is-touchscreen)</li><li>[Is Windows Phone](#is-windows-phone)</li><li>[Is Wireless Device](#is-wireless-device)</li><li>[Marketing Name](#marketing-name)</li><li>[Mobile Browser](#mobile-browser)</li><li>[Model Name](#model-name)</li><li>[Progressive Download](#progressive-download)</li><li>[Release Date](#release-date)</li><li>[Resolution Height](#resolution-height)</li><li>[Resolution Width](#resolution-width)</li></ul>  |
| Miscellaneous  | <ul><li>[Random Integer](#random-integer)</li></ul>  |

#### ASN {/*asn*/} <edgejs>location</edgejs>

Identifies requests by the network from which the request was issued. A network is identified by its Autonomous System Number (ASN).

**Key information:**

-   Certain requests may not return a valid AS number. A question mark (i.e., `?`) will match requests for which a valid AS number could not be determined.
-   Specify a value that matches the entire AS number for the desired network.
-   Specify multiple AS numbers by delimiting each one with a single space.

    **Example:** A value of `64514 64515` matches requests arriving from either `64514` or `64515`.

<edgejs>

**Key information:**

-   Certain requests may not return a valid AS number. A question mark (i.e., `?`) will match requests for which a valid AS number could not be determined.
-   Specify a value that matches the entire AS number for the desired network.
-   Specify multiple AS numbers by delimiting each one with a single space.
-   **Supported operators:** `=== | !==`

**Example:**
The following configuration matches requests arriving from either `64514` or `64515`:

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              location: 'asn',
            },
            '64514 64515',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```

</edgejs>

#### Brand Name {/*brand-name*/} <edgejs>device</edgejs>

Identifies requests by the manufacturer (e.g., Samsung) of the device that issued the request.

**Key information:**

-   Specify a value using any combination of numbers, letters, or symbols.
-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space  (e.g., `value1 value2`).

        <Callout type="info">

          Replace spaces in the brand name with `%20`.

        </Callout>

    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Specify a value using any combination of numbers, letters, or symbols.
-   The method for specifying multiple values varies by operator:

    -   `=== | !===`**:** Delimit each one with a single space  (e.g., `value1 value2`).

        <Callout type="info">

          Replace spaces in the brand name with `%20`.

        </Callout>

    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '=~': [{
              device: 'brand_name',
            },
            'Samsung|Apple',
          ],
        },        
      ],
    }, {
         // Features 
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
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              location: 'city',
            },
            'Miami',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```

</edgejs>

#### Client IP {/*client-ip*/} <edgejs>request</edgejs>

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

          IPv6 address blocks should not be fully shortened. As shown in the above example, a trailing `0` is required when shortening fields that consist of 0's.

        </Callout>

<edgejs>

**Key information:**

-   Use CIDR notation.
-   Specify multiple IP addresses and/or IP address blocks by delimiting each one with a single space.

    -   **IPv4 Example:** `1.2.3.4 10.20.30.40` matches any requests arriving from either `1.2.3.4` or `10.20.30.40`.
    -   **IPv6 Example:** `1:2:3:4:5:6:7:8 10:20:30:40:50:60:70:80` matches any requests arriving from either `1:2:3:4:5:6:7:8` or `10:20:30:40:50:60:70:80`.

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
      and: [{
          '===': [{
              request: 'client_ip',
            },
            '5.5.5.64/26',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```

</edgejs>

<!--
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

**Example:**

</edgejs>
-->

#### Cookie {/*cookie*/} <edgejs>request</edgejs>

Identifies requests by a cookie's value.

**Key information:**

-   Set the **Cookie Name** option to the exact name of the desired cookie. You may not use special characters, including an asterisk, or a regular expression.
-   Only a single cookie name may be specified per instance of this match condition.
-   Cookie name comparisons are case-insensitive.
-   The method for specifying multiple cookie values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.
    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>

**Key information:**

-   Set `request.cookie` to the exact name of the desired cookie. You may not use special characters, including an asterisk, or a regular expression.
-   Only a single cookie name may be specified per instance of this match condition.
-   Cookie name comparisons are case-insensitive.
-   The method for specifying multiple cookie values varies by operator:

    -   `=== | !===`**:** Delimit each one with a single space  (e.g., `value1 value2`).
    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '=~': [{
              request.cookie: 'type',
            },
            'chocolate|oatmeal',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```

</edgejs>

#### Country {/*country*/} <edgejs>location</edgejs>

Identifies requests by the country from which the request was issued. Specify each desired country through its [country code](/guides/reference/country_codes).

**Key information:**

-   Specify multiple country codes by delimiting each one with a single space.
-   The `EU` and `AP` country codes do not encompass all IP addresses in those regions. 

    [Learn more.](/reference/country_codes#regions)

-   Certain requests may not return a valid country code. A question mark (i.e., ?) will match requests for which a valid country code could not be determined.
-   Country codes are case-sensitive.

<edgejs>

**Key information:**

-   Specify multiple country codes by delimiting each one with a single space.
-   The `EU` and `AP` country codes do not encompass all IP addresses in those regions.

    [Learn more.](/reference/country_codes#regions)

-   Certain requests may not return a valid country code. A question mark (i.e., ?) will match requests for which a valid country code could not be determined.
-   Country codes are case-sensitive.
-   **Supported operators:** `=== | !==`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              location: 'country',
            },
            'US MX CA',
          ],
        },        
      ],
    }, {
         // Features 
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

<!--
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

</edgejs>
-->

#### DMA Code {/*dma-code*/} <edgejs>location</edgejs>

Identifies requests by the metro code (Designated Market Area - DMA) from which the request was issued.

**Key information:**

-   Specify a metro code as an integer value.
-   Request DMA codes from Nielsen.
-   Specify multiple metro codes by delimiting each one with a single space.
-   Metro codes are only applicable for traffic from the United States.
-   Certain requests may not return a valid metro code. A question mark (i.e., `?`) will match requests for which a valid metro code could not be determined.

<edgejs>
**Key information:**

-   Specify a metro code as an integer value.
-   Request DMA codes from Nielsen.
-   Specify multiple metro codes by delimiting each one with a single space.
-   Metro codes are only applicable for traffic from the United States.
-   Certain requests may not return a valid metro code. A question mark (i.e., `?`) will match requests for which a valid metro code could not be determined.
-   **Supported operators:** `=== | !==`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              location: 'dma_code',
            },
            '803',
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'dual_orientation',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```

</edgejs>

<!--
#### Extensions {/*extensions*/} <edgejs>request.path</edgejs>

Identifies requests by the file extension defined in the URL.

This match condition looks for a URL that ends with a period (`.`) and the specified file extension. Therefore, make sure that any file extensions specified in the **Value** option do not contain a leading period.

**Correct:** `htm`

**Incorrect:** `.htm`

<edgejs>

**Example:**

</edgejs>
-->

#### Filename {/*filename*/} <edgejs>request.path</edgejs>

Identifies requests by the filename defined in the URL. 

**Key information:**

-   For the purposes of this match condition, a filename consists of the name of the requested asset, a period, and the file extension (e.g., `index.html`). 
-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the filename with `%20`.

        </Callout>

    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>

**Key information:**

-   For the purposes of this match condition, a filename consists of the name of the requested asset, a period, and the file extension (e.g., `index.html`).
-   The method for specifying multiple values varies by operator:

    -   `=== | !==`**:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the filename with `%20`.

        </Callout>

    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              request.path: 'filename',
            },
            'basketball.mp4',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```

</edgejs>

<!--
#### HTML Preferred DTD {/*html-preferred-dtd*/} <edgejs>device</edgejs>

Identifies requests by a device's preferred document type definition (DTD) for HTML content (e.g., `html5`).

<edgejs>

**Example:**

</edgejs>
-->

#### Image Inlining {/*image-inlining*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request supports Base64-encoded images.

<edgejs>

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              device: 'image_inlining',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_android',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_app',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

<!--
#### Is Full Desktop {/*is-full-desktop*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request provides a full desktop experience.

<edgejs>

**Example:**

</edgejs>
-->

#### Is iOS {/*is-ios*/} <edgejs>device</edgejs>

Identifies requests by whether the operating system of the device that issued the request is iOS.

<edgejs>

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              device: 'is_ios',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_robot',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_smartphone',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_smarttv',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_tablet',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_touchscreen',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Is Windows Phone {/*is-windows-phone*/} <edgejs>device</edgejs>

Identifies requests by whether the device that issued the request is a Windows Mobile 6.5/Windows Phone 7 or higher.

<edgejs>

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              device: 'is_windows_phone',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'is_wireless_device',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              location: 'latitude',
            },
            '33.9705',
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              location: 'longitude',
            },
            '-118.4308',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Marketing Name {/*marketing-name*/} <edgejs>device</edgejs>

Identifies requests by the marketing name (e.g., `BlackBerry 8100 Pearl`) of the device that issued the request.

**Key information:**

-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the name with `%20`.

        </Callout>

    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).


<edgejs>
**Key information:**

-   The method for specifying multiple values varies by operator:

    -   `=== | !==`**:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the name with `%20`.

        </Callout>

    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '=~': [{
              device: 'marketing_name',
            },
            'Galaxy(.*)',
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              request: 'method',
            },
            'GET',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Mobile Browser {/*mobile-browser*/} <edgejs>device</edgejs>

Identifies requests by the name of the browser (e.g., Chrome) that issued the request.

**Key information:**

-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the browser name with `%20`.

        </Callout>

    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   The method for specifying multiple values varies by operator:

    -   `=== | !==`**:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the browser name with `%20`.

        </Callout>

    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              device: 'mobile_browser',
            },
            'Chrome',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Model Name {/*model-name*/} <edgejs>device</edgejs>

Identifies requests by the model name (e.g., s10) of the device that issued the request.

**Key information:**

-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the model name with `%20`.

        </Callout>

    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   The method for specifying multiple values varies by operator:

    -   `=== | !==`**:** Delimit each one with a single space.

        <Callout type="info">

          Replace spaces in the model name with `%20`.

        </Callout>

    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              device: 'model_name',
            },
            's10',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Origin Path {/*origin-path*/} <edgejs>request</edgejs>

Identifies requests by the request URL's relative path. This relative path comparison is performed on rewritten or redirected URLs.

**Key information:**

-   This relative path comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Rewrite or redirect a URL through the [URL Rewrite](/guides/performance/rules/features#url-rewrite) and [URL Redirect](/guides/performance/rules/features#url-redirect) features, respectively. Use the [Path](#path) match condition to match on the original relative path submitted by the client.
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

          Curl does not encode non-US-ASCII characters. <!-- If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values. -->

        </Callout>

<edgejs>
**Key information:**

-   This relative path comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Rewrite or redirect a URL through the [URL Rewrite](/guides/performance/rules/features#url-rewrite) and [URL Redirect](/guides/performance/rules/features#url-redirect) features, respectively. Use the [Path](#path) match condition to match on the original relative path submitted by the client.
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

          Curl does not encode non-US-ASCII characters. <!-- If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values. -->

        </Callout>
-   **Supported operators:** `== | != | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '==': [{
              request: 'origin_path',
            },
            '/marketing/conferences/:path*',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
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

          Curl does not encode non-US-ASCII characters. <!-- If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values. -->

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

          Curl does not encode non-US-ASCII characters. <!-- If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values. -->

        </Callout>
-   **Supported operators:** `=== | !== | == | != | =~ | !~ | in | not_in`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '==': [{
              request: 'path',
            },
            '/marketing/conferences/:path*',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### POP Code {/*pop-code*/} <edgejs>request</edgejs>

Identifies requests by the point-of-presence (POP) that processed the request. Set this match condition to the three-letter code for the desired POP.

<edgejs>
**Key information:**

-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              request: 'pop_code',
            },
            'lac',
          ],
        },        
      ],
    }, {
         // Features 
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
-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.
    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
**Key information:**
-   Specify a postal code as an integer value.
-   A comparison will only be performed against the first 3 characters for Canadian postal codes.
-   A comparison will only be performed against the first 2 - 4 characters for United Kingdom postal codes.
-   The method for specifying multiple values varies by operator:

    -   `=== | !==`**:** Delimit each one with a single space.
    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              location: 'postal_code',
            },
            '90405',
          ],
        },
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'progressive_download',
            },
            true,
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Query {/*query*/} <edgejs>request</edgejs>

Identifies requests by the query string of the request URL submitted by the client.

**Key information:**

-   Although you may configure {{ PRODUCT }} to rewrite or redirect a URL, this query string comparision will always be performed against the  request URL submitted by the client. Use the [Query String](#query-string) match condition to match on a rewritten or redirected URL.
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

          Curl does not encode non-US-ASCII characters. <!--If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values.-->

        </Callout>

<edgejs>
**Key information:**

-   Although you may configure {{ PRODUCT }} to rewrite or redirect a URL, this query string comparision will always be performed against the  request URL submitted by the client. Use the [Query String](#query-string) match condition to match on a rewritten or redirected URL.
-   The value associated with this match condition will be compared against the entire request's query string.
-   For the purposes of this match condition, a query string starts with the first character after the question mark (?) delimiter for the query string. Therefore, do not include a leading question mark (?) when defining this match condition.
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

          Curl does not encode non-US-ASCII characters. <!--If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values.-->

        </Callout>
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              request: 'query',
            },
            'country=france',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Query Parameter {/*query-parameter*/} <edgejs>request.origin_query</edgejs>

Identifies requests by the value assigned to a query string parameter in the request URL.

**Key information:**

-   **Parameter name:**

    -   Query parameter name comparisons are case-insensitive.
    -   Replace spaces in the parameter name with %20.
    -   Only query parameters whose name is an exact match to the specified value may satisfy this condition.

-   **Parameter value:**
    -   Certain characters require URL encoding. Use the percentage symbol to URL encode the following characters:

        -   **SPACE:** %20
        -   **&:** %26
        -   **%:** %25
    -   The method for specifying multiple values varies by operator:

        -   **equals | does not equal:** Delimit each one with a single space.

            <Callout type="info">

              Replace spaces in the value with `%20`.

            </Callout>

        -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
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
    -   The method for specifying multiple values varies by operator:

        -   `=== | !==`**:** Delimit each one with a single space.

            <Callout type="info">

              Replace spaces in the value with `%20`.

            </Callout>

        -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              request.origin_query: 'country',
            },
            'france',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Query String {/*query-string*/} <edgejs>request</edgejs>

Identifies requests by the query string of the requested URL. This query string comparison is performed on rewritten or redirected URLs.

**Key information:**

-   This query string comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Rewrite or redirect a URL through the [URL Rewrite](/guides/performance/rules/features#url-rewrite) and [URL Redirect](/guides/performance/rules/features#url-redirect) features, respectively. Use the [Query](#query) match condition to match on the original query string submitted by the client.
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

<edgejs>
**Key information:**

-   This query string comparison is performed after {{ PRODUCT }} rewrites or redirects the request. Rewrite or redirect a URL through the [URL Rewrite](/guides/performance/rules/features#url-rewrite) and [URL Redirect](/guides/performance/rules/features#url-redirect) features, respectively. Use the [Query](#query) match condition to match on the original query string submitted by the client.
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

          Curl does not encode non-US-ASCII characters. If you would like to test this match condition using curl, then you will need to create a mutually exclusive match section (i.e., IF / ELSE IF). Each conditional expression within that statement should contain this match condition with the Encoded option set to different values.

        </Callout>
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              request: 'origin_query_string',
            },
            'country=france',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
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
      and: [{
          '>': [{
              random: 10,
            },
            5,
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Referring Domain {/*referring-domain*/} <edgejs>request</edgejs>

Identifies requests by the referrer's hostname. A referrer's hostname is determined by the `Referer` header.

**Key information:**

-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.
    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   The method for specifying multiple values varies by operator:

    -   `=== | !==`**:** Delimit each one with a single space.
    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              request: 'referring_domain',
            },
            'www.example.com',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>

#### Region Code {/*region-code*/} <edgejs>location</edgejs>

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

-   Region codes are only unique within a country. In order to prevent false positives, we strongly recommend that you also add the [Country match condition](#country) to your rule.

    **Example:**

    Requests from the following regions will report the same region code (i.e., `SP`):

    -   São Paulo, Brazil (`BR-SP`)
    -   La Spezia, Italy (`IT-SP`)
    -   Sandy Point, Bahamas (`BS-SP`)

-   Certain requests may not return a valid region code. A question mark (i.e., `?`) will match requests for which a valid region code could not be determined.
-   The method for specifying multiple values varies by operator:

    -   **equals | does not equal:** Delimit each one with a single space.
    -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   Identify the desired region by its region code. A region code, which consists of 1 to 3 alphanumeric characters, identifies a subdivision of a country by the region segment of the corresponding ISO 3166-2 code.

    [View ISO 3166-2 codes. (Wikipedia)](https://en.wikipedia.org/wiki/ISO_3166-2)

    [View ISO 3166-2 codes. (UNECE)](http://www.unece.org/cefact/locode/subdivisions.html)

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
-   The method for specifying multiple values varies by operator:

    -   `=== | !==`**:** Delimit each one with a single space.
    -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '===': [{
              location: 'region_code',
            },
            'CA',
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              device: 'release_date',
            },
            '2022_december',
          ],
        },        
      ],
    }, {
         // Features 
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
    -   The method for specifying multiple values varies by operator:

        -   **equals | does not equal:** Delimit each one with a single space.

            <Callout type="info">

              Replace spaces in the value with `%20`.

            </Callout>

        -   **matches regular expression | does not match regular expression:** Use regular expression syntax (e.g., `value 1|value 2`).

<edgejs>
**Key information:**

-   **Header name:**
    -   Set this match condition to the desired request header (string).
    -   Header name comparisons are case-insensitive.
    -   Replace spaces in the header name with `%20`.
    -   Only request headers whose name is an exact match to the specified value may satisfy this condition.

-   **Header value:**
    -   Set the second element of the array to the desired request header value (string). 
    -   The method for specifying multiple values varies by operator:

        -   `=== | !==`**:** Delimit each one with a single space.

            <Callout type="info">

              Replace spaces in the value with `%20`.

            </Callout>

        -   `=~ | !~`**:** Use regular expression syntax (e.g., `value 1|value 2`).
-   **Supported operators:** `=== | !== | =~ | !~`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '=~': [{
              request.header: 'type',
            },
            'chocolate|oatmeal',
          ],
        },        
      ],
    }, {
         // Features 
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

-   Specify height, in pixels, as a string value.
-   You may not specify a decimal value.
-   **Supported operators:** `=== | !== | < | <= | >= | >`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '>=': [{
              device: 'resolution_height',
            },
            "1080",
          ],
        },        
      ],
    }, {
         // Features 
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

-   Specify width, in pixels, as a string value.
-   You may not specify a decimal value.
-   **Supported operators:** `=== | !== | < | <= | >= | >`

**Example:**

```
router.conditional({
  if: [{
      and: [{
          '>=': [{
              device: 'resolution_width',
            },
            "1920",
          ],
        },        
      ],
    }, {
         // Features 
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
      and: [{
          '===': [{
              request: 'scheme',
            },
            'HTTP',
          ],
        },        
      ],
    }, {
         // Features 
    },
  ],
});
```
</edgejs>
