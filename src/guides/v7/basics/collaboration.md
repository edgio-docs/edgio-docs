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

### Managing Membership {/*managing-team-members*/}

<a id="roles" />

Each member of an organization must be assigned one of the following roles:

-   **Read only:** This type of user may only view this organization's configuration and all of the properties that it contains.
-   **Purger:** This type of user has the same permissions as the *Read only* role. Additionally, this role allows a user to purge cached content for any property associated with this organization.
-   **Member:** This type of user has the same permissions as the *Purger* role. Additionally, this role allows a user to submit deployments to any environment. However, it does not allow configuration changes to this organization or any of its properties.
-   **Admin:** This type of user is authorized to manage the organization. However, this role does not allow a user to add, remove, promote, or demote *Admin* or *Super Admin* users.
-   **Super Admin:** This type of user has full control over the entire organization.

**To add members**

1.  Load the desired organization's **Members** page.

    1.  From the {{ PORTAL_LINK }}, select the desired organization. 
    2.  From the left-hand pane, click **Members**.

2.  Click **Add Members**.

3.  From the **Add Members** dialog box, type the prospective member's email address and then assign that user a [role](#roles). 

4.  Optional. Invite another member by clicking **+** and then repeating step 3.

5.  Click **Invite Members** to send an email invitation to each prospective member.

    Each prospective member will receive an email welcoming them to {{ PRODUCT }}. They must confirm their account by:

    1.  Clicking **CONFIRM MY ACCOUNT** from the welcome email.
    2.  Clicking **Accept** to accept our terms of service and privacy policy.
    3.  Set their password or link their account to Github or Google.

**To change a user's role**

1.  Load the desired organization's **Members** page.

    1.  From the {{ PORTAL_LINK }}, select the desired organization. 
    2.  From the left-hand pane, click **Members**.

2.  Find the user and select the desired role. 

**To remove a member**

1.  Load the desired organization's **Members** page.

    1.  From the {{ PORTAL_LINK }}, select the desired organization. 
    2.  From the left-hand pane, click **Members**.

2.  Click the <Image inline src="/images/icons/delete.png" alt="Delete" /> icon next to the member that will be removed.

3.  When prompted, click **Remove** to confirm that the user will be removed from the organization.

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
