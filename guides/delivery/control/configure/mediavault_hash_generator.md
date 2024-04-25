---
title: MediaVault Hash Generator
---

The hash generator is a tool you can use to:

-   Create signed URLs on an ad-hoc basis

-   Learn how MediaVault works so you can implement hashes within your own applications

For additional information about MediaVault and further configuration options, see the [MediaVault Guide](/delivery/delivery/mediavault).

## Instructions {/*displaying-the-performance-dashboard*/}

1.  For any given URL, fill out the fields in the top section of the page (See [Configuration Fields](#configuration-fields)). As you enter information, fields in the Output section are updated (see [Output Fields](#output-fields)).

2.  Copy the value of the Secure URL field and publish it in place of the non-protected URL.

### Configuration Fields {/*configuration-fields*/}

To gain greater insight into the purpose of all fields, see [Parameters](/delivery/delivery/mediavault/#mediavault-parameters).

| Field | Description |
| --- | --- |
| Shared Secret | The shared secret that you have set on the respective CDN configuration.<br /><br />If you don’t know your Shared Secret, refer to your CDN configurations in Control or contact Support. |
| Target URL | The URL you want to protect. |
| Start Date / Time | Optional<br /><br />The time the request is authorized from (represented as Unix epoch seconds). End users can't access the media before the start time<br /><br />Optional |
| End Date / Time | Optional<br /><br />The time the request is authorized to (represented as Unix seconds). End users can't access the media after the end time. |
| IP Address / Mask | Optional<br /><br />The IP address, IP address range, or Mask you wish to make your content available to. |
| Referrer URL | Optional<br /><br />Domain name from the Referer request header, usually the media player that is authorized to play your content. |
| Prefix | Optional<br /><br />For cookie-based , the length of the Shared Secret + Target URL that should be hashed.<br /><br />See [Using the Prefix Slider](#using-the-prefix-slider) for instructions. |

### Using the Prefix Slider {/*using-the-prefix-slider*/}

The Prefix field has a slider that lets you generate a single hash to allow access to multiple objects nested under a single path. The slider value determines how much of the Shared Secret + Target URL should be hashed, and ranges from 0 to the length of the Target URL field.

Use the slider to generate a single hash to allow access to multiple objects nested under a single path.

| Slider Value | How Much of Shared Secret + Target URL to Hash |
| --- | --- |
| 0   | Shared Secret + all of the Target URL<br /> <br /> <Callout type="info">The URL that will be hashed is displayed as an example under the slider. This slider (option p) is added to omit hashing other options like IP address or referrer or just to strip the part of the URL.</Callout> |
| 1 through N | All of the Shared secret + N characters of the Target URL. |

### Example {/*example*/}

Let **Shared Secret** = **md5test**

Let **Target URL = http://llnw.com/media-vault/media.mp4**

The slider maximum value is 37, the length of the **Target URL**.

| Slider Value | Result to Hash |
| --- | --- |
| 0   | md5testhttp://llnw.com/media-vault/media.mp4 |
| 1   | md5testh |
| 2   | md5testht |
| 37  | md5testhttp://http://llnw.com/media-vault/media.mp4 |

## Output Fields {/*output-fields*/}

| Field | Description/Instructions |
| --- | --- |
| Target URL with Options | Informational only ^1^<br /><br />The URL without hash specified, essentially the same as Secure URL but without h (hash) parameter. |
| Actual MD5 | Informational only1<br /><br />Shows how the hash is generated, which is then passed to h parameter. It is formed as follows: <md5secret><url><parameters>. |
| Secure URL | The result of hashing:<br /><br />-   Shared Secret<br />    <br />-   Target URL<br />    <br />-   Start Date / Time, End Date / Time, IP Address / Mas, and Referrer URL, if provided. |

^ 1^ These fields are provided in case you want to generate the secure URL yourself.
