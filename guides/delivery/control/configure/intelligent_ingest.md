---
title: Intelligent Ingest
---

If you are an Origin Storage customer, you can use Intelligent Ingest to automatically populate Origin Storage with new content as it is requested from the CDN. If a request results in a CDN Cache Miss, and the content is not found in Origin Storage, Intelligent Ingest will retrieve and ingest the content from the remote host(s) you specify. You can create any number of "rules" that pair specific Origin Storage logins and content paths with specific remote hosts and paths. These rules are also known as "rewrites."

## Intelligent Ingest List Page  {/*intelligent-ingest-list-page*/}

The list page provides summary information at the top, including **Status** (_Active_, _Inactive_ or _Disabled_), **Storage Quota** (if quota is set; % and total disk usage), **Bandwidth** (the ingest bandwidth limit for the remote hosts), and **Concurrency** (maximum number of concurrent connections to the remote hosts).

A list of existing rules appears below the summary area. For each rule, the content paths for both Origin Storage and the remote host are shown along with the authentication type, if any.

## Enabling Intelligent Ingest  {/*enbabling-intelligent-ingest*/}

To enable Intelligent Ingest, please contact your Account Manager. After Intelligent Ingest has been turned up for your account, "Intelligent Ingest" will appear under the Configure menu in the navigation pane.

<Callout type="info"> Intelligent Ingest configuration requires at least one active Origin Storage login.</Callout>

## Configuration Overview  {/*configuration-overview*/}

To successfully configure , the following steps must be completed:

1.  Obtain an Origin Storage account with an active login. An Origin Storage account is required for an configuration.
2.  Enable Intelligent Ingest for that Origin Storage account (see [Enabling Intelligent Ingest](#enabling-intelligent-ingest-rules) ).
3.  Request a Caching & Delivery configuration (or use an existing one) to enable CDN delivery of objects from the Origin Storage account.
4.  Create one or more Intelligent Ingest rules (see [Adding Intelligent Ingest Rules](#adding-intellignt-ingest-rules)).

## Creating or Editing a Content Delivery Configuration for Intelligent Ingest  {/*creating-or-editing-a-content-delivery-configuration-for-intelligent-ingest*/}

As part of Intelligent Ingest configuration, you must create a related Content Delivery configuration.

You can either edit an existing Content Delivery configuration or create a new one.

To work with Content Delivery configurations, perform these steps:

1. Select Caching & Delivery (v2) in the Configure tab.

2. Perform instructions in the following sections:

    - [Step 1-Configuring Content Location](#step-1-configuring-content-location)

    - [Step 2-Configuring Failover to Backup Origin](#step-2-configuring-failover-to-backup-origin)

### Step 1-Configuring Content Location  {/*step-1-configuring-content-location*/}

In the *Content Location* section, make these selections in the *Source* subsection:

In the *Location of Content Source* drop-down menu, choose the descriptive name that was configured for you. The actual name is displayed in the **Source hostname** field.

Populate the **Base Path** and **Extended Path** fields as needed.

#### Purpose of Content Location Configurations

Intelligent Ingest rules rely on matching the path of the content you requested from our Origin Storage platform. Generally, the full path on Origin Storage is not something you would have complete information about. The goal is to illustrate the full path of the content location within Origin Storage. The Base path is the part of your Origin Storage path that Edgio creates for you. Rather, it is a drop-down menu, because depending on your permissions, you may have multiple Origin Storage users with various levels of access. Control then allows you to add an extended path if you don’t want to trigger Intelligent Ingest on everything in the base path. The extended path allows more flexibility to use the feature on a subset of content.

### Step 2-Configuring Failover to Backup Origin  {/*step-2-configuring-failover-to-backup-origin*/}

The **Failover to Backup Origin** option is required, and must be requested from your Account Manager. Once added, it will be visible in the Content Delivery Configuration Self Service settings.

<Callout type="info">- You can set up Intelligent Ingest rules and their associated Content Delivery configuration in any order, but both are required before Intelligent Ingest begins ingesting content. <br /> - Although Intelligent Ingest rules require an associated Content Delivery configuration, deleting the configuration does not delete the rules, and deleting rules does not affect the configuration. <br /> - You can configure rules so that content is ingested only for specific paths within a Content Delivery configuration. <br /> - If you need a more complex configuration, more options for your 404 backup origin, or authentication for your backup origin , please contact your Account Manager.</Callout>

## Adding Intelligent Ingest Rules  {/*adding-intelligent-ingest-rules*/}

Before you add a rule, become familiar with how rules are chosen at ingest time. See [Workflow Rule Selection](#workflow-rule-selection).

1.  On the page, click the **+ New** button above the summary area. The Create new rewrite rule appears with the fields necessary to create the rule.

2.  Perform instructions in the following sections:

    -   [Step 1-Configuring Origin Storage](#step-1-configuring-origin-storage-location)

    -   [Step 2-Configuring Remote Storage Host](#step-2-configuring-remote-storage-host)

    -   [Step 3-Testing Paths](#step-3-testing-paths)

    -   [Step 4-Enabling Remote Storage Host Authentication](#step-4-enabling-remote-storage-host-authentication)

    -   [Step 5-Saving the Intelligent Ingest Rule](#step-5-saving-the-intelligent-ingest-rule)

### Step 1-Configuring Origin Storage Origin  {/*step-1-configuring-origin-storage-location*/}

The Origin Storage logins associated with the current are displayed in the **Origin Storaage login** dropdown menu. Select the appropriate user, and also enter the target **Content path** (the path to the Origin Storage directory from which content will be requested, and to which it will be automatically ingested if requested but not found in that directory).

<Callout type="info">When you configured the [Content Location](#step-1-configuring-content-location) in *Caching & Delivery*, you selected the **Base Path** and entered the **Extended Path**. The target **Content path** should match the concatenation of those two fields, as shown in [Testing Paths](#step-3-testing-paths) below.</Callout>

### Step 2-Configuring Remote Storage Host  {/*step-2-configuring-remote-storage-host*/}

For the remote host, under **Remote Protocol**, specify the protocol ( HTTP or HTTPS ) should use when requesting your content. Then enter the in **Remote storage host**, and the folder path, if any, in **Remote path**.

### Step 3-Testing Paths  {/*step-3-testing-paths*/}

To view and confirm the final origin and remote paths, click the **Test** button and review the values in the **Path in Origin Storage** and **Matched remote path** fields.

<Callout type="info"> - The **Test** button is enabled only when the **Path in Origin Storage** field is filled in. <br /> -   Testing is intended to confirm the entered paths. It does not request content or confirm its availability.</Callout>

The **Path in Origin Storage** field should contain the full path to the Origin Storage directory from which content will be requested, and the **Matched remote path** field should contain the full path to the remote host directory from which the content will be ingested if not found in that Origin Storage directory. If either path is not what you expected, change the values entered for **Content path**, **Remote storage Host** and/or **Remote path** as needed, and repeat the test.

### Step 4-Enabling Remote Storage Host Authentication  {/*step-4-enabling-remote-storage-host-authentication*/}

If your content is hosted on a third-party content provider, you must configure the credentials needed for Intelligent Ingest to access your data. You can choose from existing configurations or create a new configuration.

1.  Click the **Enable Remote Storage Host Authentication** checkbox.
2.  Choose an existing configuration from the or create a new configuration.
3.  To create a new configuration:
    -  Click the *+* new button.
    -  Choose a configuration type in the subsequent dialog.

        | Type | Description / Instructions |
        | --- | --- |
        | Amazon S3 V4 | Select this if your content is hosted on.<br />[See Amazon friendly name Fields](#amazon-s3-v4-fields). |
        | Custom Header | Select this if your content is hosted elsewhere.<br />[See Request headers friendly name Fields](#custom-header). |

    -  Click **Apply** to create the new rule or **Cancel** to discard your work.

#### Amazon S3 V4 Fields  {/*amazon-s3-v4-fields*/}

This authentication type uses Amazon S3 Signature Version 4 Authentication to send authentication fields to the remote host.


| Name | Description / Instructions |
| --- | --- |
| Name | Descriptive name of your choice |
| Access key ID | Amazon AWS Access Key ID |
| Secret access key | Amazon AWS Secret Access Key |
| Region | region into which your S3 content will be ingested. Choose the region that is closest to the S3 region. |

#### Custom Header {/*custom-header*/}

This authentication type sends authentication information in request headers to the remote host.

| Name | Description / Instructions |
| --- | --- |
| Name | Descriptive name of your choice |
| Add custom request header | 1.  Enter a name and a value, then click the **+** icon.<br /> 2.  Repeat until you have entered all required values.<br /><br />To remove a header, click the **-** icon.<br /><br />After you save the rule ([Saving the Intelligent Ingest Rule](#step-5-saving-the-intelligent-ingest-rule)), the request headers configurations are available to choose for use in future rules. |

### Step 5-Saving the Intelligent Ingest Rule  {/*step-5-saving-the-intelligent-ingest-rule*/}

<Callout type="info">After you save a rule, you cannot modify it; you can only modify any associated authentications (see [Managing Authentications](#managing-authentications)).</Callout>

## Managing Authentications  {/*managing-authentications*/}

The only component of an existing rule that you can change is its authentications. You can modify, delete, and create authentications.

<Callout type="info">You cannot restore a deleted authentication.</Callout>

Begin by clicking the **manage authentication** button on the right above the summary area. Doing so displays a dialog for managing authentications.

To create a new authentication:
1.  Click the **+** new button in the dialog.
    A dialog for creating authentications is displayed.

2.  Create the authentication, using instructions in [Enabling Remote Storage Host Authentication](#step-4-enabling-remote-storage-host-authentication) for creating a new authentication.
3.  Click **Apply** to save changes, or **Cancel** to discard your work.

To modify an authentication:
1.  Click the **edit** icon for the desired authentication in the dialog.
    A dialog for editing the authentication is displayed.

2.  Modify the authentication using information in [Amazon S3 V4 Fields](#amazon-s3-v4-fields) and [Custom Header Fields](#custom-header).
3.  Click **Apply** to save changes, or **Cancel** to discard your work.

To delete an authentication:
1.  Click the **Delete** icon for the desired authentication in the dialog.
2.  Click **Delete** in the confirmation dialog.

## Deleting Rules  {/*deleting-rules*/}

To delete a rule, click its associated trashcan icon.

<Callout type="info">Deleting an rule does *not* affect any configuration(s) associated with the deleted rule.</Callout>

## Workflow Rule Selection  {/*workflow-rule-selection*/}

Intelligent Ingest includes a workflow in which it attempts to ingest content from origin paths. Understanding the selection process is important before you begin creating rules.

If multiple rules share the same path, the workflow uses path prefix length and order in which rules were created to choose the rule to use.

In the following examples, '/home/data/' is the path prefix.

Example 1

If multiple rules with the same prefix are created in the following order (the shortest is created first), then only the first path will work and the others will fail as part of workflow because they are longer.

1. /home/data/ - works

2. /home/data/dir1 - fails

3. /home/data/dir2 - fails

Example 2

If multiple rules with the same prefix are created in the following order (the shortest is created later), then the first and second paths will work and the third will fail because it is longer than the second.

1. /home/data/dir1 - works

2. /home/data/ - works

3. /home/data/dir2 - fails
