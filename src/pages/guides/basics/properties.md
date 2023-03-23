---
title: Properties
---

A property instructs {{ PRODUCT }} how to securely process requests for your website. Setting up a property typically involves:

-   Determining whether it will belong to a team space that allows collaboration with other team members or a private space with access restricted to your account.
-   [Environment(s)](/guides/basics/environments). An environment allows you to serve your site on different domains.
-   [TLS certificate(s)](/guides/security/tls_certificates). Each hostname associated with an environment requires the installation of a TLS certificate on our network. Manage these TLS certificates through your property's settings. 
-   [Securing your web applications and API traffic](/guides/security/waf). Secure your web applications and APIs across all environments using a single configuration at the property level.

## Managing Properties

You may create, rename, or delete a property. You may even transfer ownership to a different team. 

<Callout type="important">

  The administration of a property that lives within a team space requires the `Admin` role for that team.

</Callout>

Upon creating a property, it will contain a `production` environment with the following configuration:

-   **Hostname:** Identifies a hostname through which your site will be served. Requests submitted by clients are directed to this hostname.
-   **Origin Configuration:** Defines how {{ PRODUCT }} communicates with your web server(s). 

<Callout type="info">

  By default, hostname(s) defined during property creation are assigned to the first origin configuration. Once you have added multiple origin configurations, you may adjust this mapping as needed. 

</Callout>

**To create a property**
1.  From the {{ PORTAL_LINK }}, determine where you will create a property.
    -   **Private Space:** By default, the {{ PORTAL }} loads your private space. Access to a property created in your private space is restricted to your account. Proceed to the next step.
    -   **Team Space:** Load the desired team by clicking the <img data-inline-img src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon that appears next to your name and then selecting the desired team.

        ![Team Selection](/images/v7/basics/team-selection.png)

2.  Click **+ New Property**.
3.  In the **Property Name** option, assign a unique name to this property.
4.  Add one or more hostname(s) through which your site will be delivered.
    1.  From the **Hostnames** section, click **+ Add Hostname**.
    2.  Type the desired hostname (e.g., `www.example.com`).
    3.  Repeat steps 1 and 2 as needed.

5.  Add one or more origin configuration(s). An origin configuration identifies your web servers and defines how {{ PRODUCT }} proxies cache misses to them.

    By default, a new property contains an origin configuration called `web` that requires configuration.

    1.  From the **Name** option, assign it a name. 
    2.  From the **Origin Hostname** option, define a hostname or an IP address that points to your web server(s).
    3.  Optional. If your web servers are listening on a custom port, then you will need to define it within the **Port** option. 
    4.  From the **Scheme** option, determine whether {{ PRODUCT }} will communicate with your web server(s) using HTTP, HTTPS, or whether we will match the scheme used by the client.
    5.  Optional. By default, the request determines the value assigned to the `Host` request header. You may override the value assigned to this request header through the **Override Host Header** option.
    6.  Optional. Define the TLS requirements when communicating with your web servers through the **Origin TLS Settings** section. 

        [Learn more.](/guides/basics/hostnames_and_origins#origin)
    7.  Add more origin configurations as needed by clicking **+ Add Origin** and then repeating the above steps.

6.  Click **Create Property**.

**To rename a property**
1.  From the {{ PORTAL_LINK }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Rename property "&lt;PROPERTY>"** section, set the **New Name** option to the desired name.
4.  Click **Save**.

**To delete a property**
1.  From the {{ PORTAL_LINK }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Delete property** section, mark the **Confirm that I want to delete the property "&lt;PROPERTY>".** option. 
4.  Click **Delete Property**.

<a id="transfer-ownership" />

**To transfer ownership to another team**
1.  From the {{ PORTAL_LINK }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Move property to another team** section, select the desired team.
4.  Click **Save**.