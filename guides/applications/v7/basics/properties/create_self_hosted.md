---
title: Create a Self-Hosted Property
---

## Create a Self-Hosted Property {/* create-self-hosted-property */}

Use this method if you have an existing website hosted on your servers and want to leverage {{ PRODUCT }}'s features like caching, security, and performance optimizations. This method is ideal for users who want to place {{ PRODUCT }} in front of their current self-hosted site.

**To create a property**

1.  From the {{ PORTAL_LINK }}, determine where you will create a property.

    - **Private Space:** By default, the {{ PORTAL }} loads your private space. Access to a property created in your private space is restricted to your account. Proceed to the next step.
    - **Organization:** Load the desired organization by clicking the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon that appears next to your name and then selecting the desired organization.

      ![Organization Selection](/images/v7/basics/team-selection.png)

2.  Click **New Property**.
3.  Click **Create Property** for **Self Host Property**.
    ![Create Property](/images/v7/basics/property-create-self-host.png)
4.  In the **Property Name** option, assign a unique name to this property.
5.  Add one or more hostname(s) through which your site will be delivered.

    1.  From the **Hostnames** section, click **+ Add Hostname**.
    2.  Type the desired hostname (e.g., `www.example.com`).
    3.  Repeat steps 1 and 2 as needed.

6.  Add one or more origin configuration(s). An origin configuration identifies your web servers and defines how {{ PRODUCT }} proxies cache misses to them.

    By default, a new property contains an origin configuration called `web` that requires configuration.

    1.  From the **Name** option, assign it a name.
    2.  From the **Origin Hostname** option, define a hostname or an IP address that points to your web server(s).
    3.  Optional. If your web servers are listening on a custom port, then you will need to define it within the **Port** option.
    4.  From the **Scheme** option, determine whether {{ PRODUCT }} will communicate with your web server(s) using HTTP, HTTPS, or whether we will match the scheme used by the client.
    5.  Optional. By default, the request determines the value assigned to the `Host` request header. You may override the value assigned to this request header through the **Override Host Header** option.
    6.  Optional. Define the TLS requirements when communicating with your web servers through the **Origin TLS Settings** section.

        [Learn more.](/applications/basics/origins#origin_tls_settings)

    7.  Add more origin configurations as needed by clicking **+ Add Origin** and then repeating the above steps.

7.  Click **Create Property**.

{{ properties_rename_delete_steps.md }}
