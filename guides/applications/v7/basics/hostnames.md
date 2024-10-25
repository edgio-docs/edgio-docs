---
title: Hostnames
---

You must register each hostname (e.g., `cdn.example.com`) that will be served through the {{ PRODUCT }} network. Each hostname is mapped to an origin configuration. An origin configuration defines how our service will communicate with your web servers.

<Callout type="info">

  **CDN-as-Code Only:** If you are using CDN-as-code, then you should [manage your hostnames within your {{ CONFIG_FILE }}](#cdn-as-code). Deploying your CDN-as-code configuration will update the set of hostnames listed on the **Hostnames** page.

  Your routes determine the source from which data will be retrieved. You may retrieve content from [your web servers](/applications/performance/cdn_as_code#defining-origins), the {{ PRODUCT }} cloud, which powers [{{ PRODUCT }} {{ PRODUCT_PLATFORM }}](/applications/sites_frameworks) and [Cloud Functions](/applications/performance/serverless_compute), or [{{ PRODUCT }} Edge Functions](/applications/edge_functions).

</Callout>

![Hostname and Origin Workflow](/images/v7/basics/hostnames-origins.png?width=781)

If you are using CDN-as-code, then you may serve your site through any combination of your web server(s), the {{ PRODUCT }} cloud, or {{ PRODUCT }} Edge Functions.

![Hostname, Origin, and Cloud Workflow](/images/v7/basics/hostnames-origins-cloud.png)

## Setup {/*setup*/}

On a per environment-basis, define each hostname that will be served through {{ PRODUCT }}.

**Key information:**

-   Specify hostnames using lower-case letters.
-   Hostnames must be unique across all environments.

    For example, if you have defined `www.example.com` within the `production` environment, then you cannot define it within any other environment until you delete it from the `production` environment.

-   Each hostname is mapped to an origin configuration. By default, {{ PRODUCT }} proxies cache misses for that hostname to that origin configuration. Override this mapping through the [Set Origin feature](/applications/performance/rules/features#set-origin).

<Callout type="info">

  **CDN-as-Code Only:** If you are using CDN-as-code, then your routes determine the source from which data will be retrieved. Define an origin configuration as a source through the [set_origin feature](/applications/performance/cdn_as_code/route_features#proxying-an-origin).

</Callout>

-   Set up support for [HTTPS delivery](#https-traffic) for each of your hostnames.
-   Once you are ready to serve traffic through {{ PRODUCT }}, update the hostname's [DNS configuration](/applications/basics/serving_traffic) to point to our service.

    If your hostname is at the zone apex (e.g., example.com), then you will need a DNS service provider that supports defining a CNAME record at the zone apex. [Learn how to set this up through Route.](/applications/basics/serving_traffic#serving-traffic-at-the-zone-apex)
-   It is strongly recommended to point your DNS away from {{ PRODUCT }} for hostnames that are no longer registered within your account. For example, this may occur when you modify or delete a hostname. [Learn more about hostname offboarding.](#hostname-offboarding)

**To add, modify, or delete hostnames from an environment through the {{ PORTAL }}** <a id="add-modify-delete-hostname"></a>

1.  Load the **Hostnames** page.

    {{ ENV_NAV }} **Hostnames**.

2.  Perform one of the following steps:

    -   **Add a Hostname:**

        1.  Click **+ Add hostname**.
        2.  Add each desired hostname on a separate line.

        ![Add Hostnames](/images/v7/basics/add-hostnames.png?width=550)

        3.  Click **Add Hostnames**.

    -   **Assign an Origin:** Map a hostname to a different origin by selecting the desired origin from under the **Default Origin** column.

        <Callout type="info">

          The **Default Origin** column is read-only when the current property only contains a single origin configuration (e.g., `web`).

        </Callout>

    -   **Modify a Hostname:** Modify an existing hostname by replacing the existing hostname with a new value.

        ![Hostnames](/images/v7/basics/hostnames.png?width=600)

    -   **Delete a Hostname:** Click <Image inline src="/images/icons/delete.png" alt="Delete icon" /> next to the hostname that should be deleted.

3.  Repeat step 2 as needed.
4.  If you are finished making changes to this environment, click **Deploy Changes**.

    **Next Steps:** Serving traffic over a new hostname requires a [TLS certificate](#https-traffic) and a [valid DNS configuration](/applications/basics/serving_traffic#dns). 
    
    [View a checklist for serving traffic through our network.](/applications/basics/serving_traffic#checklist)

**<a id="cdn-as-code" />To add, modify, or delete hostnames within your CDN-as-code configuration**

<Callout type="info">

  This procedure is only applicable if you are using [CDN-as-code](/applications/performance/cdn_as_code).

</Callout>

Define the desired hostnames within the `<ENV_NAME>.hostnames` key.

```js filename="{{ CONFIG_FILE }}"
module.exports = {
  /* ... */
  environments: {
    production: {
      hostnames: [{hostname: 'cdn.example.com'},{hostname: 'resources.example.com'}],
    },
  /* ... */
};
```

## HTTPS Traffic {/*https-traffic*/}

Each hostname requires the installation of a [TLS certificate](/applications/security/tls_certificates) on our network. Set up TLS support through either of the following methods:

-   **Automatic Installation:** {{ PRODUCT }} can automatically generate and install a TLS certificate when both of the following requirements are met:

    -   **Certificate Authority Authorization:** The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for that hostname. It is allowed to issue certificates when either of the following conditions are true:

        -   A CAA record has not been issued for that hostname or a parent hostname. This DNS configuration means that any CA is allowed to generate certificates for that hostname.
        -   A CAA record explicitly allows the Let's Encrypt CA to generate certificates for that hostname.

        This sample CAA record indicates that the Let's Encrypt CA is allowed to issue certificates for `cdn.example.com`:

        `cdn.example.com.   CAA 0 issue "letsencrypt.org"`

    -   **Domain Control Validation:** Prove your control over that domain by adding an `_acme-challenge` CNAME record to it.

        **Example:** `_acme-challenge.cdn.example.com. CNAME _acme-challenge.xdn-validation.com.`

-   **Bring Your Own Certificate (BYOC):** [Upload your own TLS certificate](/applications/security/tls_certificates#uploading-your-certificate).

    You may use a wildcard certificate across multiple environments once it has been uploaded to one of your environments. [Learn more.](/applications/security/tls_certificates#wildcard-certificates)

## Hostname Offboarding {/*hostname-offboarding*/}

Any of the following actions will disassocate a hostname from your account:

-   Deleting a hostname.
-   Renaming a hostname. This action deregisters the original hostname and registers a new hostname. 
-   Account deactivation. This may occur in response to a failure to provide payment within a reasonable time frame. 

A best practice for deregistered hostnames is to perform either of the following actions through your DNS service provider:

-   Update the corresponding CNAME record to point away from our service.
-   Remove the corresponding CNAME record from the DNS zone.

Take this action to reduce your risk exposure.