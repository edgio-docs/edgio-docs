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
