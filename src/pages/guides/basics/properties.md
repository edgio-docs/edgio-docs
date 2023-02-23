---
title: Properties
---

A property instructs {{ PRODUCT }} how to process requests to your website. Key property components are:
-   **Environments:**
-   **Security:**
-   **Analytics:**
-   




## Managing Properties



**To create a property**
1.  From the {{ PORTAL }}, click **+ New Property**.
2.  In the **Property Name** option, assign a unique name to this property.
3.  Add one or more hostname(s) through which your site will be delivered.
    1.  From the **Hostnames** section, click **+ Add Hostname**.
    2.  Type the desired hostname (e.g., `www.example.com`).
    3.  Repeat steps 1 and 2 as needed.

4.  Add one or more origin configuration(s). An origin configuration identifies your web servers and defines how {{ PRODUCT }} proxies cache misses to them.

    By default, a new property contains an origin configuration called `web` that requires configuration.

    1.  From the **Name** option, assign it a name. 
    2.  From the **Origin Hostname** option, define a hostname or an IP address that points to your web server(s).
    3.  Optional. If your web servers are listening on a custom port, then you will need to define it within the **Port** option. 
    4.  From the **Scheme** option, determine whether {{ PRODUCT }} will communicate with your web server(s) using HTTP, HTTPS, or whether we will match the scheme used by the client.
    5.  Optional. By default, the request determines the value assigned to the `Host` request header. You may override the value assigned to this request header through the **Override Host Header** option.
    6.  Optional. Define the TLS requirements when communicating with your web servers through the **Origin TLS Settings** section. 

        [Learn more.](#FINDME)
    7.  Add more origin configurations as needed by clicking **+ Add Origin** and then repeating the above steps.

5.  Click **Create Property**.

**To rename a property**
1.  From the {{ PORTAL }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Rename property "<PROPERTY>"** section, set the **New Name** option to the desired name.
4.  Click **Save**.

**To delete a property**
1.  From the {{ PORTAL }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Delete property** section, mark the **Confirm that I want to delete the property "<PROPERTY>".** option. 
4.  Click **Delete Property**.

**To transfer ownership to another team**
1.  From the {{ PORTAL }}, click on the desired property.
2.  Click **Settings**.
3.  From the **Move property to another team** section, select the desired team.
4.  Click **Save**.