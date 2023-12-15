---
title: Collaboration (Organizations)
---

You may create properties within a private space or an organization. 

-   **Private:** Access to properties created within a private space is restricted to your user account. You should only use this space for properties that do not require collaboration.

    <Callout type="info">

      If you have not created an organization yet, then the {{ PORTAL }} will only display your private space. 

    </Callout>

-   **Organization:** {{ PRODUCT }} allows you to collaborate with other team members through an organization. An organization provides a hub for all property-related tasks, such as managing a property's configuration, deploying code, and reviewing analytics.

<!-- <Callout type="tip">

  You may transfer ownership of any property to an organization to which you have been assigned the `Admin` role. 

</Callout>
-->
A breakdown of organization and private spaces is illustrated below.

![Types of Spaces](/images/v7/basics/setup-overview.png)

## Managing Organizations {/*managing-organizations*/}

Organization management consists of:

-   Creating an organization.
-   [Managing membership.](#managing-team-members)
-   [Setting up security](/guides/security) for your web applications and API.

**To create an organization**

1.  From the {{ PORTAL_LINK }}, click on the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon next to your name and then click on **Create an Organization**. 

    ![Space menu](/images/v7/basics/team-create.png)

2.  In the **Organization Name** option, assign a name to your organization (e.g., `my-company`) and then click **Create an Organization**.

    ![Add an Organization](/images/v7/basics/team-create-2.png)

    <Callout type="info">

      As shown above, the URL for your organization's **Overview** page is formed by appending your organization's name to the {{ PORTAL }}'s base URL. Additionally, an organization's edge link starts with the organization's name (e.g., `https://my-company-nature-videos-production.edgio.link/`).

    </Callout>

### Managing Organization Members {/*managing-team-members*/}

<a id="roles" />

Upon creating a user, you must assign a role that will be applied at the organization level. By default, this role is applied across all of the organization's properties and environments. However, you may customize a member's access by granting one of the following roles to a specific property or environment: Viewer, Purger, Editor, or Maintainer.

| Role             | Description                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Viewer           | This role grants read-only access. <br /><br />If applied at the organization level, then the user will have read-only access to the organization's settings, properties, and environments.                                                             |
| Purger           | This role grants the Viewer role along with the ability to purge content. <br /><br />If applied at the organization level, then the user may purge content for any of the organization's properties.                                                   |
| Security Manager | This role grants the Viewer role along with the ability to manage all security settings.                                                                                                                                                                |
| Editor           | This role grants the capability to configure properties and to configure, deploy, and purge  environments. However, this role does not grant the ability to configure, deploy, or purge an environment that has been restricted to the Maintainer role. |
| Maintainer       | This role grants the Editor role along with the ability to create and delete properties and environments.                                                                                                                                               |
| Admin            | This role grants full access to the entire organization including the ability to manage members.                                                                                                                                                        |

**To add members**

1.  Load the desired organization's **Members** page.

    1.  From the {{ PORTAL_LINK }}, select the desired organization. 
    2.  From the left-hand pane, click **Members**.

2.  Click **Add Member**.

3.  From the **User Email** option, type the user's email address.

4.  From within the `ORGANIZATION` section, select the [role](#roles) that will be assigned to the user.

    <Callout type="info">

      By default, the organization's properties and environments will inherit the role assigned to the user at the organization level.  

    </Callout>

5.  Customize a user's access to a property by assigning a different role for the desired property.

    1.  Below the `ORGANIZATION` section, find and expand the desired property.
    
        <Callout type="tip">
        
          Filter your properties by typing the desired name within the **Search Properties** option.
        
        </Callout>

    2.  Select the desired role.
    3.  Repeat these steps as needed.

6.  Customize a user's access to an environment by assigning a different role for the desired environment.

    1.  Expand the desired property. All of the property's environments are listed directly below the list of available roles.
    2.  Find the desired environment and select the desired role. 
    3.  Repeat these steps as needed.

5.  Click **Invite** to send a welcome email. 

    A new user must confirm their account by performing the following steps:

    1.  Clicking **CONFIRM MY ACCOUNT** from the welcome email.
    2.  Clicking **Accept** to accept our terms of service and privacy policy.
    3.  Set their password or link their account to Github or Google.

    <Callout type="info">

      Existing {{ PRODUCT }} users do not need to confirm their account and will not receive a welcome email.

    </Callout>

**To change a user's role**

1.  Load the desired organization's **Members** page.

    1.  From the {{ PORTAL_LINK }}, select the desired organization. 
    2.  From the left-hand pane, click **Members**.

2.  Find the user and click its <Image inline src="/images/v7/icons/pencil-2.png" alt="Edit" /> icon.
3.  Optional. Assign a different role at the organization level.
4.  Optional. Customize a user's access to a property by assigning a different role for the desired property.
5.  Optional. Customize a user's access to an environment by assigning a different role for the desired environment.
6.  Click **Save**.

**To remove a member**

1.  Load the desired organization's **Members** page.

    1.  From the {{ PORTAL_LINK }}, select the desired organization. 
    2.  From the left-hand pane, click **Members**.

2.  Click the <Image inline src="/images/v7/icons/delete.png" alt="Delete" /> icon next to the member that will be removed.
3.  When prompted, click **Delete** to confirm that the user will be removed from the organization.

## Single Sign-On (SSO) {/*single-sign-on--sso-*/}

{{ PRODUCT }} offers single sign-on (SSO) integration for SAML 2.0 identity providers. This type of integration allows {{ PRODUCT }} to delegate authentication to your identity provider. We support the following workflows:

-   **Edgio-Initiated Workflow:** This common SSO workflow requires users to browse to the {{ PORTAL }}. After which, {{ PRODUCT }} will authenticate the user's identity with your identity provider. A high-level overview of this workflow is illustrated below.

    ![High-level {{ PRODUCT }}-initiated SSO workflow](/images/v7/basics/edgio-initiated-sso-workflow.png?width=650)

-   **Identity Provider-Initiated Workflow:** This SSO workflow requires users to load the {{ PORTAL }} through your identity provider. A high-level overview of this workflow is illustrated below.

    ![High-level IdP-initiated SSO workflow](/images/v7/basics/idp-initiated-sso-workflow.png?width=650)

### Getting Started {/*getting-started*/}

Establishing a SSO workflow requires a custom integration between our identity service and your identity provider. 

**To request SSO integration with a SAML 2.0 identity provider**

1.  Contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to get started. Be prepared to provide the following information:

    -   **SAML Request Signing Certificate:** An X.509 certificate in PEM format. {{ PRODUCT }} uses this certificate to sign the SAML request sent to your identity provider. 
    -   **Login URL:** {{ PRODUCT }} redirects users to this URL to perform an authentication challenge. 
    -   **Logout URL:** {{ PRODUCT }} requests a single or global logout through this URL.
    -   **RelayState:** {{ PRODUCT }} redirects users to this URL upon authentication. This URL should be:

        `{{ APP_URL }}`

    -   SAML 2.0 metadata in XML format. 

2.  Add the desired users to the {{ PORTAL }}. Make sure that the email addresses defined within the {{ PORTAL }} match those defined within your identity provider. 

3.  From within your identity provider, use the following information to configure {{ PRODUCT }} as a service provider:
    -   **Entity ID:** `id.vdms.io`
    -   **Assertion URL:** `https://id.vdms.io/saml/assert`
    -   **Login URL:** `https://id.vdms.io/saml/login`
    -   **Logout URL:** `https://id.vdms.io/saml/logout`
    -   **Digest:** `sha256 | sha512`
    -   **Signature:** `sha256 | sha512`
    -   **Sign Request:** `TRUE | FALSE`
    -   **Sign Response:** `TRUE | FALSE`
    -   **Encrypt Assertion:** `TRUE | FALSE`

4.  Set up an additional SAML token claim to provide email addresses to {{ PRODUCT }}. Use the following schema namespace:

    `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email`

5.  Optional. Set up custom attribute statements for the user's name. Use the following schema namespaces:

    **User's First Name:**

    `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`

    **User's Last Name:**

    `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/familyName`

### SAML Request Signing Certificate Renewal {/*saml-request-signing-certificate-renewal*/}

Maintain SSO operability by renewing your SAML request signing certificate prior to expiration. Certificate renewal requires providing a new SAML request signing certificate in PEM format to either your account manager or [technical customer support]({{ SUPPORT_URL }}). 
