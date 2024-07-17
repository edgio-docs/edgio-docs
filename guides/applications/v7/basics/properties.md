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

- [Create Self-Hosted Property](basics/properties/create_self_hosted):

  Place {{ PRODUCT }} in front of your current self-hosted site to leverage {{ PRODUCT }}'s features.

- [Create {{PRODUCT}}-Hosted Property](basics/properties/create_edgio_hosted):

  Deploy a new property using an {{ PRODUCT }} template, connect an existing site hosted on GitHub, or use the {{ PRODUCT }} CLI to create and manage your property.

### Rename a Property {/* rename-property */}

1.  From the {{ PORTAL_LINK }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Rename property "&lt;PROPERTY>"** section, set the **New Name** option to the desired name.
4.  Click **Save**.

### Delete a Property {/* delete-property */}

1.  From the {{ PORTAL_LINK }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Delete property** section, mark the **Confirm that I want to delete the property "&lt;PROPERTY>".** option.
4.  Click **Delete Property**.

<!--
<a id="transfer-ownership" />

**To transfer ownership to another organization**
1.  From the {{ PORTAL_LINK }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Move property to another organization** section, select the desired organization.
4.  Click **Save**.
-->
