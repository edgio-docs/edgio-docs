---
title: Create a Property from a Template
---

## Creating a New Property from a Template {/* create-property-from-template */}

Use this method if you want to deploy a new property by selecting a template from a range of example projects like Next.js or Remix. This method is ideal for users who want to start with a pre-configured setup and customize it to fit their needs.

**To create a property from a template:**

1.  From the {{ PORTAL_LINK }}, select the appropriate environment:
    - **Private Space:** Default environment where properties are personally managed.
    - **Organization:** Change to an organization by clicking the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> near your profile name and selecting the desired organization.
      ![Organization Selection](/images/v7/basics/team-selection.png)
2.  Click **New Property**.
3.  Click **Create Property** for **Host Property on {{ PRODUCT }}**.
    ![Create Property](/images/v7/basics/property-create-host-property-on-edgio.png)
4.  In the **Property Name** field, give your property a unique name.
5.  Select **Start from a template** under **Setup**.
    ![Choose a Template](/images/v7/basics/property-new-from-template.png)
6.  Click **Connect to GitHub** to authenticate your account and select the repository.
    <Tip>
      If you have previously authenticated with GitHub, this option will not be
      available.
    </Tip>
7.  Click **Create Property** to proceed. {{ PRODUCT }} will begin cloning the repository and setting up the property.
    ![Property Cloning](/images/v7/basics/property-new-from-template-preparing.png)
8.  Once the template has been cloned and deployed, you will be redirected to the property dashboard for viewing the deployment details.
    ![Property Dashboard](/images/v7/basics/property-new-from-template-complete.png)

{{ properties_rename_delete_steps.md }}
