---
title: Create a Property from GitHub
---

## Create a Property from GitHub {/* create-property-from-github */}

Use this method if you have an existing project on GitHub that uses a supported framework and want to import it into {{ PRODUCT }} for automated deployments and branch previews. This method is ideal for users who want to connect their existing projects with {{ PRODUCT }} for streamlined deployment workflows.

**To import an existing project**

1.  Access the {{ PORTAL_LINK }} and select your desired environment:
    - **Private Space:** This is your personal environment where only you can see and manage properties.
    - **Organization:** If working within a team, switch to your organization by clicking the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> next to your name and choosing the relevant organization.
      ![Organization Selection](/images/v7/basics/team-selection.png)
2.  Click **New Property**.
3.  Click **Create Property** for **Host Property on {{ PRODUCT }}**.
    ![Create Property](/images/v7/basics/property-create-host-property-on-edgio.png)
4.  In the **Property Name** field, give your property a unique name.
5.  Select **Import an existing project** under **Setup**.
6.  Click **Connect to GitHub** to authenticate your account and select the repository.
    <Tip>
      If you have previously authenticated with GitHub, this option will not be
      available.
    </Tip>
7.  Select the framework your project uses and the repository which contains the project.
    ![Import Project](/images/v7/basics/property-import-existing.png)
8.  Click **Create Property** to proceed. {{ PRODUCT }} will begin cloning the repository and setting up the property.
    ![Property Preparing](/images/v7/basics/property-import-existing-preparing.png)
9.  Once the project has been prepared and deployed, you will be redirected to the property dashboard for viewing the deployment details.
    ![Property Dashboard](/images/v7/basics/property-import-existing-complete.png)

{{ properties_rename_delete_steps.md }}
