---
title: Hostnames
---

You must register each hostname (e.g., `cdn.example.com`) that will be served through the {{ PRODUCT }} network. Each hostname must map to an origin configuration. An origin configuration defines how our service will communicate with your web servers. 

<Callout type="info">

  **CDN-as-Code Only:** If you are using CDN-as-code, then you should [define your hostnames within your {{ CONFIG_FILE }}](#cdn-as-code). Your routes determine the source from which data will be retrieved. You may retrieve content from [your web servers](/guides/performance/cdn_as_code#defining-origins), the {{ PRODUCT }} cloud, which powers [{{ PRODUCT }} {{ PRODUCT_PLATFORM }}](/guides/sites_frameworks) and [Cloud Functions](/guides/performance/serverless_compute), or [{{ PRODUCT }} Edge Functions](/guides/edge_functions). We automatically create system-defined origin configurations for our cloud infrastructure as part of your initial CDN-as-code deployment. 

</Callout>

![Hostname and Origin Workflow](/images/v7/basics/hostnames-origins.png?width=781)

You may serve your site through our cloud, your origin server(s), or any combination of both. 

![Hostname, Origin, and Cloud Workflow](/images/v7/basics/hostnames-origins-cloud.png)

## Setup {/*setup*/}

On a per environment-basis, define each hostname that will be served through {{ PRODUCT }}. 

**Key information:**

-   Specify hostnames using lower-case letters.
-   Hostnames must be unique across all environments.

    For example, if you have defined `www.example.com` within the `production` environment, then you cannot define it within any other environment until you delete it from the `production` environment.

-   Each hostname is mapped to an origin configuration. By default, {{ PRODUCT }} proxies cache misses for that hostname to that origin configuration. You may override this mapping through either the [Set Origin feature](/guides/performance/rules/features#set-origin) or your [CDN-as-code configuration (set_origin)](/guides/performance/cdn_as_code).

-   Set up support for [HTTPS delivery](#https-traffic) for each of your hostnames.
-   Once you are ready to serve traffic through {{ PRODUCT }}, update the hostname's [DNS configuration](#serving-traffic-through) to point to our service.

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

**<a id="cdn-as-code" />To add, modify, or delete hostnames within your CDN-as-code configuration**

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

Each hostname requires the installation of a [TLS certificate](/guides/security/tls_certificates) on our network. Set up TLS support through either of the following methods:

-   **Automatic Installation:** {{ PRODUCT }} can automatically generate and install this TLS certificate when both of the following requirements are met:

    -   **Certificate Authority Authorization:** The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for that hostname. It is allowed to issue certificates when either of the following conditions are true:

        -   A CAA record has not been issued for that hostname or a parent hostname. This DNS configuration means that any CA is allowed to generate certificates for that hostname.
        -   A CAA record explicitly allows the Let's Encrypt CA to generate certificates for that hostname. 

        This sample CAA record indicates that the Let's Encrypt CA is allowed to issue certificates for `cdn.example.com`:

        `cdn.example.com.   CAA 0 issue "letsencrypt.org"`

    -   **Domain Control Validation:** Prove your control over that domain by adding an `_acme-challenge` CNAME record to it.

        **Example:** `_acme-challenge.cdn.example.com. CNAME _acme-challenge.xdn-validation.com.`

-   **Bring Your Own Certificate (BYOC):** [Upload your own TLS certificate](/guides/security/tls_certificates#uploading-your-certificate).