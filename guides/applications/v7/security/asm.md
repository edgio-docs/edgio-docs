---
title: Attack Surface Management
---

{{ PRODUCT }} Attack Surface Management allows you to monitor and secure your organization's attack surface. It provides a comprehensive inventory of your organization's internet-facing assets, technologies, and vulnerabilities. 

## Core Concepts

Definitions for key concepts are provided below.

-   **Collection:** A collection represents the segment of your network that will be scanned for vulnerabilities. 
-   **Assets:** {{ PRODUCT }} identifies the IP addresses and TLS certificates associated with a scanned network segment. These entries are collectively known as assets.
-   **Exposures:** {{ PRODUCT }} scans your network for Common Vulnerabilities and Exposures (CVE). A CVE represents a known security vulnerability or exposure for a software package. 
-   **Protections:** {{ PRODUCT }} identifies the security solutions that are protecting the assets associated with the scanned network segment.
-   **Technologies:** {{ PRODUCT }} identifies the software and services used by the assets associated with the scanned network segment.
-   **Rules:** Determines how vulnerabilities and exposures are detected and handled. 

## How Does It Work?

Attack Surface Management identifies your assets, exposures, protections, and technologies by scanning your network. The network segment that will be scannned and the what will be identified varies according to the seeds defined within the collection being scanned. View the workflow for network scanning below.

![ASM Scan Workflow](/images/v7/security/asm-scan-workflow.png)

Once your network has been scanned, you should review and mitigate your exposures. 

## Getting Started

1.  Create a collection (**Attack Surfaces** | **Collections** | **+ Create Collection**) and then add one or more seed(s) to your collection. 
2.  Scan your network.
3.  Review and mitigate exposures.

## Collections

A collection represents the segment of your network that will be scanned for vulnerabilities. Define this distinct network segment through seeds. A seed defines a distinct network segment through a domain, an IP address, an IP address range, or a GitHub repository. 

### Managing Collections

You may create, modify, and delete collections. Finally, you can reset a collection to delete all exposures, assets, and technologies associated with it.

**To create a collection**

1.  Load the **Collections** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Collections**.

2.  Click **+ Create Collection**.
3.  From the **Name** option, assign a name to this collection. 
4.  Optional. From the **Description** option, provide a brief description for the purpose of this collection.
5.  Optional. Define a schedule for when {{ PRODUCT }} will scan your network.
    1.  Mark each day of the week on which {{ PRODUCT }} will scan your network.
    2.  Select the time (UTC) at which the scan will start. 
6.  Optional. Define when notifications will be sent.
    -   **Scan Start:** Require {{ PRODUCT }} to notify you when it starts scanning your network by marking the **Send email on scan start** option. Disable this notification by clearing this option.
    -   **Scan Start:** Require {{ PRODUCT }} to notify you when it completes a network scan by marking the **Send email when a scan completes** option. Disable this notification by clearing this option.
    -   **Scan Start:** Require {{ PRODUCT }} to notify you when it detects new exposures or if existing exposures have been resolved by marking the **Only send when new exposures are found or existing exposures are resolved** option. Disable this notification by clearing this option.
9.  Click **Create Collection**.

    Once you have created a collection, you should add seeds that define the segment of your network that will be scanned.

**<a id="add-seed" />To add seeds to a collection**

1.  Load the **Collections** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Collections**.

2.  Click on the desired collection.
3.  Click **+ Add a Seed**.
4.  From the **Type** option, select the type of seed (e.g., domain, IP address, or GitHub repository) that will be added.
5.  Perform one of the following steps:

    -   **Domain:** From the **Seed** option, type the name of the domain (e.g., example.com) that will be scanned.
    -   **GitHub Repository:** 
        1.  From the **Seed** option, type the repository path (e.g., edgio-docs\edgio-docs). A repository path typically identifies the owner of the repository (e.g., an organization or a user), a slash, and then the name of the repository.
        2.  From the **GitHub Personal Access Token** option, provide a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) through which {{ PRODUCT }} will access your repository. 
        3.  From the **Branches**, type one or more branch(es) that will be scanned. Use a comma to delimit each branch.
        4.  From the **Linked hostnames** option, type one or more hostname(s) associated with the specified branches. Use a comma to delimit each hostname.
    -   **IP Address:** From the **Seed** option, type the desired IP address.
    -   **IP Address Range:** From the **Seed** option, type the desired IP address range or IP address block. Use CIDR notation.

        **Sample IP address range:** `192.0.2.10-100`

        **Sample IP address block:** `192.0.2.0/24`
6.  Click **Create Seed**.

**To modify a collection**

1.  Load the **Collections** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Collections**.
2.  Click on the desired collection.
3.  Perform one of the following tasks:
    -   [Add a seed.](#add-seed)
    -   **Modify a seed:** 
        1.  From the **Seeds** section, click on the desired seed. 
        2.  Make the desired changes.
        3.  Click **Apply Changes** to save your changes.
    -   **Delete a seed:** 
        1.  From the **Seeds** section, click on the desired seed.
        2.  Click **Delete**. 
        3.  When prompted, click **Delete Seed** to confirm the deletion.
    -   **Update the name, description, schedule, or notifications:** 
        1.  Click **Edit Collection**. 
        2.  Perform the desired changes.
        3.  Click **Apply Changes** to save your changes.

**To delete a collection**

1.  Load the **Collections** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Collections**.

2.  Click the <Image inline src="/images/icons/delete.png" alt="Delete icon" /> (Delete) icon next to the collection that should be deleted.
3.  When prompted, confirm the deletion by clicking **Delete**.

**To reset a collection**

<Info>
Resetting a collection permanently deletes all exposures, assets, and technologies associated with it. Once a collection has been reset, this information will be cleared until you scan your network again. 
</Info>

1.  Load the **Collections** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Collections**.
2.  Click on the desired collection.
3.  From the **Reset Collection** section, click **Reset Collection**.

## Scanning Your Network

Once you have created a collection and [added at least one seed](#add-seed) to it, start scanning your network by clicking **Scan Now**. {{ PRODUCT }} will discover and scan all of the assets associated with the seeds in the collection. Monitor the progress of the scan from the **Scans** section.

**To scan your network**

1.  Load the **Collections** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Collections**.
2.  Click on the desired collection.
3.  Click **Scan Now**.

## Rules

As {{ PRODUCT }} scans your organization's entities, it will discover findings. Rules determine the types of exposures that {{ PRODUCT }} will create based on these findings. {{ PRODUCT }} provides a default ruleset that you can use as a starting point. 

Rules allow you to:

-   Determine whether exposures are reported when specific conditions are met.
-   Customize the severity, priority, and assignee when specific conditions are met.
-   Specify which ports are scanned on a per entity basis.

{{ PRODUCT }} will not create an exposure unless a finding matches at least one rule that is configured to create an exposure. The default ruleset creates exposures for all findings.

View and edit rules by navigating to the **Rules** page under the **Attack Surfaces" section. 

## Exposures

Exposures represent the vulnerabilities and misconfigurations that {{ PRODUCT }} has discovered in your organization's attack surface. Exposures are automatically created and updated as {{ PRODUCT }} scans your organization's entities. 

Each exposure has the following attributes:

-   **ID:** An identifier comprised of the collection name and an incrementing number.
-   **Summary:** A brief description of the exposure.
-   **Entity:** The entity that the exposure is associated with (e.g., a hostname, IP address, or seed).
-   **Severity:** The potential impact of an exposure is reported as a number from 0 (lowest) to 10 (highest). 
-   **Priority:** The priority of the exposure (Low, Medium, High, or Critical). Use priority to indicate the urgency with which the exposure should be addressed.
-   **Assignee:** The user or team that is responsible for addressing the exposure.
-   **Status:** The status of the exposure: Valid values are:
    -   **New:** The exposure has been created, but has not been reviewed.
    -   **Acknowledged:** The exposure has been reviewed.
    -   **Resolved:** The exposure has been addressed.
    -   **Mitigated:** The exposure still exists, but the risk has been reduced.
    -   **Muted: The exposure has been muted, optionally until a specific date.
    -   **Ignored: The exposure has been ignored.
-   **Technology Version:** Optional. The specific version of the technology that is associated with the exposure.
-   **CVE:** Optional. The CVE that is associated with the exposure.
-   **Comments:** Optional. Users can add comments to exposures to provide additional context or information.

An exposure's **Activity** section allows you to:
-   Track changes to that exposure.
-   Add comments.
-   View detailed information about how an exposure was detected.

View and manage exposures by navigating to the **Exposures** page under the **Attack Surfaces** section.

## Assets

{{ PRODUCT }} Attack Surface Management detects the internet-facing assets that make up your organization's attack surface. 

View and manage assets by navigating to the **Assets** page under the **Attack Surfaces** section.

## Technologies

{{ PRODUCT }} Attack Surface Management will discover and track the technologies that are associated with your organization's entities. Technologies are automatically created and updated as {{ PRODUCT }} scans your organization's entities.

View the technologies used by your network by navigating to the **Technologies** page under the **Attack Surfaces** section.

## Limits

{{ PRODUCT }} limits the number of collections that can be created and the total number of assets that are eligible for scanning. Both of these limits are enforced on a per organization basis and vary according to your plan.



