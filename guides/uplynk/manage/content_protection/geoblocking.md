---
title: Geoblocking
---

Geoblocking provides an additional layer of security that restricts access to your content to authorized countries. Specifically, it prevents a user within a restricted country from initiating a playback session or from downloading audio / video segments.

<Info>Geoblocking, which requires activation, is incompatible with our Multi-CDN solution. If the Multi-CDN solution has been enabled on your account, then we will need to disable it prior to enabling Geoblocking on your account. Contact your account manager to activate Geoblocking.</Info>

## How It Works

<Info>This section assumes that Geoblocking has been activated on your account. Contact your account manager to enable this capability.</Info>

If our service detects a Geoblocking parameter (i.e., `geo.country.allow` and `geo.country.deny`) within the playback URL, then this parameter determines the set of countries to which playback is restricted.

- **Allowed Country**: Our service checks whether the requested playback session satisfies all other enabled security measures (i.e., signed playback URLs, Blackout, and Studio DRM). Upon passing all security checks, the user will be allowed to initiate a playback session.
- **Disallowed Country**: Our service returns a 403 Forbidden response for all requests (e.g., manifest files and audio / video segments) associated with that playback session.

## Workflows

**Manifest delivery**

![Manifest Delivery Workflow](/images/uplynk/manifest-workflow.png)

**Audio / video segment delivery**

![Segments Delivery Workflow](/images/uplynk/segments-workflow.png)

## Usage

<Info>Contact your account manager to enable this capability on your account.</Info>

Define the set of countries that will either be allowed or denied access to your content by adding one of the following query string parameters to the playback URL:

- **`geo.country.allow`**: Restricts access to requests that originate from one or more specified countries. Requests that originate from all other countries will be denied access.
- **`geo.country.deny`**: Denies access to requests that originate from one or more specified countries. Access is restricted to requests that originate from other countries.

**Syntax**:<br />`?geo.country.[allow|deny]=Country Code[,Country Code 2,Country Code n]`

**Single Country Example**:<br />Restricts playback to requests that originate from the United States: `?geo.country.allow=US`

**Multiple Countries Example**:<br /> Restricts playback to requests that originate outside of the United States, Canada, or Mexico: `?geo.country.deny=US,CA,MX`

**Key Information**

- These parameters may be set to any two-letter ISO 3166 country code.<br /> [View a list of valid country codes](http://dev.maxmind.com/geoip/legacy/codes/iso3166/).

- Specify multiple countries by separating each country code with a comma (as shown below).<br /> `US,GB,MX,FR`

    <Info>Do not add a space when delimiting countries. Country codes that are preceded by a space will be excluded from your geoblocking policy.</Info>

- Country codes are case-insensitive.
- If both Geoblocking parameters are defined within the playback URL, then `geo.country.allow` takes precedence over `geo.country.deny`.
