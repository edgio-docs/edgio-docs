---
title: Properties
---

A property instructs {{ PRODUCT }} how to securely process requests for your website. Setting up a property typically involves:

- Determining whether it will belong to an organization that allows collaboration with other team members or a private space with access restricted to your account.
- [Environment(s)](/applications/basics/environments). An environment allows you to serve your site on different domains.
- [TLS certificate(s)](/applications/security/tls_certificates). Each hostname associated with an environment requires the installation of a TLS certificate on our network. Manage these TLS certificates through your property's settings.
- [Securing your web applications and API traffic](/applications/security/waf). Secure your web applications and APIs across all environments using a single configuration at the property level.

## Managing Properties {/* managing-properties */}

You may create, rename, or delete a property. <!--You may even transfer ownership to a different organization.-->

<Callout type="important">

Managing an organization's properties requires the `Admin` role within the desired organization.

</Callout>

Upon creating a property, it will contain a `production` environment with the following configuration:

- **Hostname:** Identifies a hostname through which your site will be served. Requests submitted by clients are directed to this hostname.
- **Origin Configuration:** Defines how {{ PRODUCT }} communicates with your web server(s).

<Callout type="info">

By default, hostname(s) defined during property creation are assigned to the first origin configuration. Once you have added multiple origin configurations, you may adjust this mapping as needed.

</Callout>

### Create a Property {/* create-property */}

The {{ PORTAL }} offers several methods to set up a new property, designed to accommodate different needs and deployment workflows. This streamlined configuration allows for quick deployment from a variety of starting points.

- [Create Self-Hosted Property](basics/properties/create_self_hosted): Place {{ PRODUCT }} in front of your current self-hosted site to leverage {{ PRODUCT }}'s features.
- [Create using CLI](basics/properties/create_using_cli): Ideal for users who prefer to integrate {{ PRODUCT }} directly with their existing setups using the Command Line Interface.
- [Create from Template](basics/properties/create_from_template): Allows users to deploy a new website by selecting from a variety of example projects, such as Next.js or Remix.
- [Create from GitHub](basics/properties/create_from_github): Connect your existing GitHub project with {{ PRODUCT }} to facilitate automated deployments and enable branch previews.

<!--
<a id="transfer-ownership" />

**To transfer ownership to another organization**
1.  From the {{ PORTAL_LINK }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Move property to another organization** section, select the desired organization.
4.  Click **Save**.
-->
