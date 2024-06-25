---
title: Partners
---

A partner resells our services. As such, a partner can:

-   [Create organizations.](#create-organization)
-   [Manage all organizations](#organization-management) associated with their account. This includes the ability to manage each organization's properties and environments.
-   View a [high-level traffic report](#reports) for all organizations associated with their account.

## Partner Account Landing Page {/*partner-account-landing-page*/}

Navigate to your partner account landing page by performing the following steps:

1.  Click on your profile pic or name.

    ![Profile Pic](/images/v7/basics/account-settings.png?height=357)

2.  Select **Partner** from the popup menu.

## Reports {/*reports*/}

View total usage metrics for each organization associated with your partner account from within the **Reports** page. Each of the following metrics sums usage across all environments that belong to that organization:

-   **Total GB transferred:** View the total amount of data transferred, in GB, for a specific organization. 
-   **Total Cloud Functions GB-Hrs:** View an organization's Cloud Functions usage. Specifically, this metric reports total RAM usage, in GB, and total runtime, in hours.

## Organization Management {/*organization-management*/}

As a partner, you may create organizations. Additionally, you can modify and delete organizations associated with your partner account.

**Key information:**

-   Each member of your partner account must be [assigned a role](#partner-member-management). This role determines whether that user may manage organizations, properties, and environments.
-   If your role grants you the ability to manage organizations, properties, environments, or all three, then you may do so by navigating to the desired organization, property, or environment and then performing the desired action. 

    For example, if you would like to delete a organization, then you would navigate to the desired organization and then follow the standard deletion procedure. Specifically, you would navigate to the organization's **Settings** page, mark the **Confirm that I want to delete this organization.**, and then click **Delete Organization**.

**To view an organization**

1.  [Navigate to your partner account landing page.](#partner-account-landing-page)
2.  From the **Organizations** page, click on the desired organization.

**<a id="create-organization" />To create an organization**

1.  [Navigate to your partner account landing page.](#partner-account-landing-page)
2.  From the **Organizations** page, click **Create an Organization**.
3.  In the **Organization Name** option, type the name of the organization.

    <Info>

    Although this option displays a base URL (i.e., https://edgio.app), this value does not affect the name of your organization. The purpose of this base URL is to hint at the URL for the new organization's landing page. 

    </Info>

4.  Click **Create an Organization**.

## Partner Member Management {/*partner-member-management*/}

Upon creating a user, you must assign a role that is applied at the partner level. Each available role is described below.

| Role       | Description                                                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Viewer     | This role grants read-only access to all organizations associated with your partner account. This includes read-only access to all settings, properties, and environments for each of those organizations. |
| Maintainer | This role grants the capability to manage properties and environments across all organizations associated with your partner account.                                                                       |
| Admin      | This role grants full access to the entire organization including the ability to manage the members of your partner account.                                                                               |

**To add members**

1.  Load your partner account's **Members** page.

    1.  [Navigate to your partner account landing page.](#partner-account-landing-page)
    2.  From the left-hand pane, click **Members**.

2.  Click **Add Member**.

3.  From the **User Email** option, type the user's email address.

4.  From within the partner account section, select the [role](#roles) that will be assigned to the user.

5.  Click **Invite** to send a welcome email.

    A new user must confirm their account by performing the following steps:

    1.  Click **CONFIRM MY ACCOUNT** from the welcome email.
    2.  Click **Accept** to accept our terms of service and privacy policy.
    3.  Set their password or link their account to Github, Google, or Microsoft.

    <Callout type="info">

      Existing {{ PRODUCT }} users do not need to confirm their account and will not receive a welcome email.

    </Callout>

**To change a user's role**

1.  Load your partner account's **Members** page.

    1.  [Navigate to your partner account landing page.](#partner-account-landing-page)
    2.  From the left-hand pane, click **Members**.

2.  Find the user and click its <Image inline src="/images/v7/icons/pencil-2.png" alt="Edit" /> icon.
3.  Optional. Assign a different role at the partner level.
4.  Click **Save**.

**To remove a member**

1.  Load your partner account's **Members** page.

    1.  [Navigate to your partner account landing page.](#partner-account-landing-page)
    2.  From the left-hand pane, click **Members**.

2.  Click the <Image inline src="/images/v7/icons/delete.png" alt="Delete" /> icon next to the member that will be removed.
3.  When prompted, click **Delete** to confirm that the user will be removed from your partner account.

## White Labeling (Branding) {/*white-labeling--branding-*/}

You may customize the appearance of the {{ PORTAL }} in the following ways:

-   **Logo:** Display a custom logo instead of the {{ PRODUCT }} logo by uploading a logo for light mode and another one for dark mode. This customization supports the following file extensions: jpg, png, jpeg, and webp.
-   **Contact Support Link:** Replace the `Contact Support` link with a custom message or link. View this link by clicking the <Image inline src="/images/v7/icons/help-support.png" alt="Help and Support" /> icon  from the upper-right hand corner of the {{ PORTAL }}.

    ![Contact Support Link](/images/v7/help-and-support.png)

**To customize the {{ PORTAL }}**

1.  Load your partner account's **Settings** page.

    1.  [Navigate to your partner account landing page.](#partner-account-landing-page)
    2.  From the left-hand pane, click **Settings**.

2.  Perform the desired actions:

    -   **Upload custom logos:**

        1.  Upload a custom logo for light mode by clicking `Upload Logo` under the **Partner Logo** section. Select the desired image and then click **Open**.
        2.  Upload a custom logo for dark mode by clicking `Upload Logo` under the **Partner Logo (Dark Mode)** section. Select the desired image and then click **Open**.

    -   **Update a custom logo:** Click the `Change` link under the desired logo and then select a new logo.
    -   **Delete a custom logo:** Click the `Delete` link under the desired logo.
    -   **Customize the Contact Support link:** Under the **Support Information** option, type the message or link that will replace the `Contact Support` link.
    
        **Example:** `[Contact My Partner](https://mypartner.example.com/support)`

### {{ PORTAL }} Access

Your customers will only see your logo and contact support customization when loading the {{ PORTAL }} using the following syntax:

`https://edgio.app/sso?partner=<PARTNER_SLUG>`

For example, if your partner account is `My Partner`, then your customers should access the {{ PORTAL }} through the following URL:

`https://edgio.app/sso?partner=my-partner`

The quickest way to look up your partner slug is to load your partner account and then check the URL segment that directly follows the `/partner/` URL segment.

**Sample URL:** `https://edgio.app/partner/my-partner`

## Activity {/*activity*/}

Your partner account's **Activity** page provides an audit trail of all changes to both your partner account and the organizations associated with your account. For example, an event is logged whenever an organization is created, a property is created, or when an updated configuration is deployed.