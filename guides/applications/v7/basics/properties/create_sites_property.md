---
title: Create a {{ PRODUCT_PLATFORM }} Property
---

The {{ PORTAL }} presents multiple pathways for users to set up a new {{ PRODUCT_PLATFORM }} property, allowing for flexibility based on different needs and technical backgrounds. Users can choose to deploy a website using the CLI for integrating directly with their existing setup, start from a template to deploy a new website by choosing from a range of example projects like Next.js or Remix, or import an existing project from GitHub to connect with {{ PRODUCT }} for automated deployments and branch previews. This setup is designed to streamline the configuration process and enhance the user experience by providing tailored options that fit various development workflows.

## Creating a Property Using the CLI {/* create-property-using-cli */}

Use this method if you have an existing codebase and want to initialize and deploy a new property using the CLI. This method is ideal for users who are comfortable with the command line and prefer an interactive setup process.

**To create a property using the CLI:**

1.  From the {{ PORTAL_LINK }}, access your preferred environment:
    - **Private Space:** This is the default view in {{ PORTAL }} and only you can access the properties created here.
    - **Organization:** To access an organization space, click on the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon next to your profile and select the organization.
      ![Organization Selection](/images/v7/basics/team-selection.png)
2.  Click **New Property**.
3.  Click **Create Property** for **Host Property on {{ PRODUCT }}**.
    ![Create Property](/images/v7/basics/property-create-host-property-on-edgio.png)
4.  Enter a **Property Name** to uniquely identify your property.
5.  Select **Create using CLI** under **Setup**.
    ![Create using CLI](/images/v7/basics/property-create-using-cli.png)
6.  Click **Create Property** to finalize the creation.
7.  Follow the instructions provided to install the CLI and finish deploying your property.
    ![CLI Instructions](/images/v7/basics/property-create-using-cli-complete.png)

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

## Importing an Existing Project {/* import-existing-project */}

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
