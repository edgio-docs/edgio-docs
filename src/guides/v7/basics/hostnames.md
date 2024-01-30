---
title: Hostnames
---

Setting up the delivery of your website through {{ PRODUCT }} requires the following configuration for each desired [environment](/guides/basics/environments):

-   **Hostname:** A hostname identifies a domain (e.g., `cdn.example.com`) through which your site will be served.
-   **Source:** Define the source from which {{ PRODUCT }} will retrieve content. You may retrieve content from any combination of the following sources:
    -   **Origin:** An origin configuration defines how our service will communicate with your web servers.
    -   **{{ PRODUCT }} Cloud:** The {{ PRODUCT }} cloud, which powers [{{ PRODUCT }} {{ PRODUCT_PLATFORM }}](/guides/sites_frameworks) and [Cloud Functions](/guides/performance/serverless_compute), allows you to run serverless code.
    -   **{{ PRODUCT }} Edge Functions:** Run standalone JavaScript code on our edge servers.
    
Control how {{ PRODUCT }} communicates with your web servers or our cloud by mapping hostnames to origin configurations.

<Callout type="info">

  {{ PRODUCT }} cloud requires a CDN-as-code configuration. We automatically create system-defined origin configurations for our cloud infrastructure as part of your initial CDN-as-code deployment. 
  
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
-   Each hostname requires the installation of a [TLS certificate](/guides/security/tls_certificates) on our network. {{ PRODUCT }} can automatically generate and install this TLS certificate when both of the following requirements are met:

    -   **Certificate Authority Authorization:** The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for that hostname. It is allowed to issue certificates when either of the following conditions are true:

        -   A CAA record has not been issued for that hostname or a parent hostname. This DNS configuration means that any CA is allowed to generate certificates for that hostname.
        -   A CAA record explicitly allows the Let's Encrypt CA to generate certificates for that hostname. 

        This sample CAA record indicates that the Let's Encrypt CA is allowed to issue certificates for `cdn.example.com`:

        `cdn.example.com.   CAA 0 issue "letsencrypt.org"`

    -   **Domain Control Validation:** Prove your control over that domain by adding an `_acme-challenge` CNAME record to it.

        **Example:** `_acme-challenge.cdn.example.com. CNAME _acme-challenge.xdn-validation.com.`

    <Callout type="info">

      Alternatively, you may [upload your own TLS certificate](/guides/security/tls_certificates#uploading-your-certificate).

    </Callout>

-   Once you are ready to serve traffic through {{ PRODUCT }}, update the hostname's [DNS configuration](#serving-traffic-through) to point to our service.

**To add, modify, or delete hostnames from an environment** <a id="add-modify-delete-hostname"></a>

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