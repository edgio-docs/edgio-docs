---
title: Attack Surface Management
---

{{ PRODUCT }} Attack Surface Management (ASM) allows you to monitor and secure your organization's attack surface. It provides a comprehensive inventory of your organization's internet-facing assets, technologies, and vulnerabilities. 

## Core Concepts {/*core-concepts*/}

Definitions for key concepts are provided below.

-   **Collection:** A [collection](#collections) represents the segment(s) of your network that will be scanned for vulnerabilities. 
-   **Assets:** Your assets consist of hostnames, IP addresses, GitHub repositories, Snyk targets, and AWS resources. {{ PRODUCT }} registers assets using the following methods:
    -   An asset is registered for each hostname, IP address, and GitHub repository defined as a seed.
    -   {{ PRODUCT }} uses seeds to determine which network segments will be scanned. Each hostname and IP address identified through this scan is also registered as an asset. 
    -   Each Snyk and Amazon GuardDuty seed may target an entire organization or system. {{ PRODUCT }} will generate an asset for each Snyk target and AWS resource associated with those configurations.
    -   Each Tenable Nessus and Tenable Security Center seed may import assets and vulnerabilities from all folders/repositories or only specified list of folders/repositories in given instance. {{ PRODUCT }} will also generate an asset for each folder/repository associated with those configurations.
-   **Exposures:** By default, {{ PRODUCT }} scans your network for:
    -   Common Vulnerabilities and Exposures (CVE). A CVE represents a known security vulnerability or exposure for a software package. 
    -   Common Weakness Enumeration (CWE). A CWE identifies a common software or hardware weakness that can potentially introduce a security vulnerability. 
    -   Open ports.
    -   TLS issues.
    -   Response header violations. For example, a required header may be missing or it can assigned an invalid value.

    Additionally, {{ PRODUCT }} can pull vulnerabilities identified by GitHub, Snyk, Amazon GuardDuty, Tenable Nessus or Tenable Security Center.

-   **Protections:** {{ PRODUCT }} identifies the security solutions that are protecting the assets associated with the scanned network segment.
-   **Technologies:** {{ PRODUCT }} identifies the software and services used by the assets associated with the scanned network segment.
-   **Rules:** Determines how vulnerabilities and exposures are detected and handled. 

## How Does It Work? {/*how-does-it-work-*/}

Attack Surface Management identifies your assets, exposures, protections, and technologies by scanning your network. The network segment that will be scannned and what will be identified varies according to the seeds defined within the collection being scanned. 

![ASM Scan Workflow](/images/v7/security/asm-scan-workflow.png)

Once your network has been scanned, you should review and mitigate your exposures. 

## Getting Started {/*getting-started*/}

1.  [Create a collection](#create-a-collection) (**Attack Surface** page | **+ Create a Collection**) and then [add one or more seed(s)](#add-seed) to your collection. 
2.  Verify that your network's firewall allows the following IP addresses:

    ```
    3.220.136.205
    34.236.88.192
    52.3.81.5
    ```

3.  [Scan your network.](#scanning-your-network)
4.  Review and mitigate exposures.

## Collections {/*collections*/}

A collection represents the segment(s) of your network that will be scanned for vulnerabilities. 

Each collection must contain at least one seed. Use one or more seed(s) to:

-   Define a domain, an IP address, or a range of IP addresses scope that will be scanned.
-   Define a GitHub repository from which security vulnerabilities identified by GitHub will be pulled. These vulnerabilities are identified through Dependabot, code scanning, and secret scanning.
-   Define a Snyk instance from which security vulnerabilities will be pulled.
-   Define an Amazon GuardDuty instance and the region(s) from which findings will be pulled.
-   Define a Tenable Nessus instance from which {{PRODUCT}} will import assets and vulnerabilities from the latest scan in each discovered folder. If you want to import vulnerabilities and assets from only from specific folders, you can do so by unchecking the `Discover assets from all folders` option and selecting the desired folders. Multiple Nessus instances from different places of your network can be added into same organization and {{PRODUCT}} will deduplicate assets and vulnerabilities from all of them.
-   Define a Tenable Security Center instance from which {{PRODUCT}} will import assets and vulnerabilities from the latest scan in each discovered repository. If you want to import vulnerabilities and assets from only from specific repositories, you can do so by unchecking the `Discover assets from all repositories` option and selecting the desired repositories.

Once you have defined the desired seed(s), {{ PRODUCT }} will scan your network for exposures and retrieve vulnerabilities identified by GitHub and Snyk. This allows {{PRODUCT}} to generate a consolidated list of vulnerabilities and exposures that provides full visibility into your organization's attack surface. 
    
### Managing Collections {/*managing-collections*/}

You may create, modify, and delete collections. Finally, you can reset a collection to delete all exposures, assets, and technologies associated with it.

<Info>
{{ PRODUCT }} limits the number of collections that can be created. This limit is enforced on a per organization basis. 
</Info>

**<a id="create-a-collection" />To create a collection**

1.  Load the **Create a Collection** pane.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  Perform one of the following steps:
        -   **Initial Collection:** Click **+ Create a Collection**.
        -   **Subsequent Collections:** From the left-hand pane, select **Collections** and then click **+ Create Collection**.

2.  From the **Name** option, assign a name to this collection. 
3.  Optional. From the **Description** option, provide a brief description for the purpose of this collection.
4.  Optional. Define a schedule for when {{ PRODUCT }} will scan your network.
    1.  Mark each day of the week on which {{ PRODUCT }} will scan your network.
    2.  Select the time (UTC) at which the scan will start. 
5.  Optional. Define when notifications will be sent.
    -   **Scan Start:** Require {{ PRODUCT }} to notify you when it starts scanning your network by marking the **Send email on scan start** option. Disable this notification by clearing this option.
    -   **Scan Start:** Require {{ PRODUCT }} to notify you when it completes a network scan by marking the **Send email when a scan completes** option. Disable this notification by clearing this option.
    -   **Scan Start:** Require {{ PRODUCT }} to notify you when it detects new exposures or if existing exposures have been resolved by marking the **Only send when new exposures are found or existing exposures are resolved** option. Disable this notification by clearing this option.

    If you have enabled at least one notification, then you should define the set of users that will be notified. From the **Recipients** section, click within the option and then select the desired user. Repeat as needed.
6.  Click **Create Collection**.

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

        <!-- 3.  From the **Branches**, type one or more branch(es) that will be scanned. Use a comma to delimit each branch. -->
        3.  From the **Linked hostnames** option, type one or more hostname(s) associated with the specified branches. Use a comma to delimit each hostname.

    -   **IP Address:** From the **Seed** option, type the desired IP address.
    -   **IP Address Range:** From the **Seed** option, type the desired IP address range or IP address block. Use CIDR notation.

        **Sample IP address range:** `192.0.2.10-100`

        **Sample IP address block:** `192.0.2.0/24`

    -   **Snyk:** 

        1.  In the **Name** option, type a descriptive name.
        2.  In the **Organization id** option, type your Snyk organization's internal ID.
        3.  In the **API Key** option, type your Snyk organization's API key.

    -   **Amazon GuardDuty:**

        1.  In the **Name** option, type a descriptive name.
        2.  In the **Access Key ID** option, type your Amazon GuardDuty [access key ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).
        3.  In the **Secret Access Key** option, type your Amazon GuardDuty [secret access key](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).
        4.  In the **Regions** option, type the regions for which findings will be pulled.

    -   **Tenable Nessus:**

        1.  In the **Name** option, type a descriptive name.
        2.  In the **Nessus Instance URL** option, type full URL including the protocol and path on which your Nessus instance is available. For example, `https://my-tenable-ns.com:8834`. 
            Your Nessus instance must be accessible for {{PRODUCT}} from the internet. Instances hosted on a private network that require a VPN connection or proxy servers are not supported.
        3.  Make sure that the REST API is enabled on your Nessus instance. You can enable the REST API in the Nessus web interface under `Settings` -> `Advanced` -> `User Interface` and setting the `Disable API` option to `No`.
            Don't forget to restart the Nessus service after the change.    
            See the [Nessus Settings documentation](https://docs.tenable.com/nessus/Content/SettingsAdvanced.htm#User_Interface) for more details.
            ![Tenable Nessus Settings interface](/images/v7/security/asm-tenable-nessus-settings.png)
        4.  if you use a self-signed certificate, uncheck the **Verify Cert** option to disable certificate verification but keep in mind that this is not recommended for production environments.
        5.  In the **Access Key** option, paste your Nessus access key. You can generate a new pair of access and secret keys in the Nessus web interface under `My Account` -> `API Keys` -> `Generate`.    
            See the [Nessus documentation](https://docs.tenable.com/nessus/Content/GenerateAnAPIKey.htm) for more details.
            ![Tenable Nessus Api Keys interface](/images/v7/security/asm-tenable-nessus-api-keys.png)
        6.  In the **Secret Key** option, paste the generated secret key from the previous step.
        7.  Make sure that the user associated with the access key has the necessary permissions to access the Nessus API and view scans if your Nessus instance supports the access control.
            The following scan permissions are required: `View`    
            See the [Nessus User Permissions](https://developer.tenable.com/docs/permissions) for more information.
        8.  Click on **Test Connection** to verify that {{PRODUCT}} can connect to your Nessus instance with the given credentials.
        9.  By default, {{PRODUCT}} will discover assets and vulnerabilities from all available folders in your Nessus instance. If you want to import vulnerabilities and assets only from specific folders, you can do so by unchecking the **Discover assets from all folders** option and selecting the desired folders under **Discover assets only from selected folders**.
        <br/><Info>{{PRODUCT}} supports self-hosted or managed instances of **Tenable Nessus 6.4.x and newer** with the REST API support. The older versions are not supported. The products with Nessus compatible APIs such as **Tenable Vulnerability Management** (formerly Tenable.io) can also be configured under Tenable Nessus seed, but be aware that these products are not fully supported and import may fail due to API limitations. Please contact your Account Manager, if you're not sure that your instance is compatible with {{PRODUCT}}.</Info>
        
    -   **Tenable Security Center:**

        1.  In the **Name** option, type a descriptive name.
        2.  In the **Tenable Security Center URL** option, type full URL including the protocol and path on which your Security Center instance is available. For example, `https://my-tenable-sc.com`.
            Your Security Center instance must be accessible for {{PRODUCT}} from the internet. Instances hosted on a private network that require a VPN connection or proxy servers are not supported.
        3.  Make sure that API Key Authentication is enabled on your Security Center instance. You can enable the API Key Authentication in the Security Center web interface under `System` -> `Configuration` -> `Security` -> `Authentication Settings`, clicking on the `Allow API Keys` option and saving the changes.    
            See the [Security Center Authentication documentation](https://docs.tenable.com/security-center/Content/EnableAPIKeys.htm) for more details.
        4.  if you use a self-signed certificate, uncheck the **Verify Cert** option to disable certificate verification but keep in mind that this is not recommended for production environments.
        5.  In the **Access Key** option, paste your Security Center access key. You can generate a new pair of access and secret keys in the Security Center web interface under `Users` -> `API Keys` -> `Generate`.    
            See the [Security Center documentation](https://docs.tenable.com/security-center/Content/GenerateAPIKey.htm) for more details.
        6.  In the **Secret Key** option, paste the generated secret key from the previous step.
        7.  Make sure that the user associated with the access key has the necessary permissions to access the Security Center API and view scans.
            The following user role or higher is required: `Vulnerability Analyst`    
            See the [Security Center User Roles](https://docs.tenable.com/security-center/Content/UserRoles.htm) for more information.
        8.  Click on **Test Connection** to verify that {{PRODUCT}} can connect to your Security Center instance with the given credentials.
        9.  By default, {{PRODUCT}} will discover assets and vulnerabilities from all available repositories in your Security Center instance. If you want to import vulnerabilities and assets only from specific repositories, you can do so by unchecking the **Discover assets from all repositories** option and selecting the desired repositories under **Discover assets only from selected repositories**.
        <br/><Info>{{PRODUCT}} supports self-hosted or managed instances of **Tenable Security Center 5.13.x and newer** with the API key authorization support. The older versions are not supported. Please contact your Account Manager, if you're not sure that your Security Center instance is compatible with {{PRODUCT}}.</Info>
        
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

## Scanning Your Network {/*scanning-your-network*/}

Once you have created a collection and [added at least one seed](#add-seed) to it, start scanning your network by viewing that collection and then clicking **Scan Now**. {{ PRODUCT }} will discover and scan all of the assets associated with the seeds in the collection. Monitor the progress of the scan from the **Scans** section.

**Key information:**

-   Your initial scan will detect and scan all of your assets. It will also place your assets under management until your organization's limit is reached. If the number of detected assets exceeds your organization's limit, then {{ PRODUCT }} prioritizes hostnames over IP addresses. 

    For example, let's assume that your organization has 100 hostnames and 600 IP addresses. If your organization's limit is 500 assets, then {{ PRODUCT }} will place 100 hostnames and 400 IP addresses under management. 
-   Subsequent scans will only scan managed assets.
-   You may also [add or remove assets from management](#assets).
-   [Create or modify rules](#rules) to create custom exposure detection and to determine whether exposures are created from findings discovered from scanned assets.

    For example, the default behavior is to scan ports for technologies, protections, and exposures. However, you can create a [rule that prevents exposures from being created from port scans](#scan-ports-without-exposures). 
-   By default, {{ PRODUCT }} performs superficial penetration testing to assess whether your assets are protected by a Web Application Firewall (WAF). For example, this testing will assess whether those assets are susceptible to cross-side scripting (XSS) or SQL injection. Disable this type of testing by clearing the **Enable WAF detection** setting from the **Attack Surface Management** section of your organization's **Settings** page. 
-   {{ PRODUCT }} may identify unreachable assets when it scans your network. Perform the following steps to view a list of these assets:

    1.  Open the desired scan.
    2.  From the **Tasks** section, find the **Status** option. Select `Asset Unreachable` and then click **Update**.

        ![Tasks - unreachable assets](/images/v7/security/asm-unreachable-assets.png)

**To scan your network**

1.  Verify that your network's firewall allows the following IP addresses:

    ```
    3.220.136.205
    34.236.88.192
    52.3.81.5
    ```

2.  Load the **Collections** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Collections**.
3.  Click on the desired collection.
4.  Click **Scan Now**.

## Rules {/*rules*/}

Rules determine the type of exposures that will be created based off of:

-   **Findings:** {{ PRODUCT }} scans your organization's managed assets for known vulnerabilities to discover findings. Rules determine the types of exposures that {{ PRODUCT }} will create based on these findings. 
-   **Custom Criteria:** Configure a rule to add custom checks to a scan.

    For example, a rule can create an exposure when it detects a response header with a specific value. 

Rules allow you to:

-   Determine whether exposures are reported when specific conditions are met.
-   Customize the severity, priority, and assignee when specific conditions are met.
-   Specify which ports are scanned on a per asset basis.

**Key information:**

-   {{ PRODUCT }} will not create an exposure for a hostname or IP address unless a finding matches at least one rule that is configured to create an exposure. 
-   For GitHub repositories, {{ PRODUCT }} pulls vulnerabilities identified by GitHub. 
-   For Snyk, {{ PRODUCT }} pulls vulnerabilities identified by Snyk.
-   For Amazon GuardDuty, {{ PRODUCT }} pulls findings identified by Amazon GuardDuty for the regions defined within the seed.
-   {{ PRODUCT }} provides a default rule set that you can use as a starting point. This rule set creates exposures for all findings.
-   Rules are processed in the order that they are listed. If a finding satifies multiple rules, then all of those rules are applied to it. {{ PRODUCT }} resolves conflicts by giving precedence to the rule that is closest to the bottom of the list. 

    For example, if both rules #4 and #6 apply to a finding, then precedence is given to rule #6.

-   Determine whether a rule applies to a finding by defining one or more condition(s). 

**To create a rule**

1.  Load the **Rules** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Rules**.
2.  Click **+ Create Rule**.
3.  Define one or more condition(s) that identify the findings to which this rule will be applied.

    1.  Select a type of condition. 
    
        ![Create Rule - Add Criteria](/images/v7/security/asm-create-rule-criteria.png)
    
    2.  Define when that condition will be met.
    
        -   **Severity:** Select an operator and a number from 0 (lowest) to 10 (highest) that represents the potential impact of an exposure.
        
            **Example:** `Severity` `is greater than` `3.7`

        -   **CVE ID:** Select an operator that defines the relationship with a [CVE ID](https://cve.mitre.org/cve/search_cve_list.html).
        
            **Example:** `CVE ID` `equals` `CVE-2024-3094`

        -   **CWE ID:** Select an operator that defines the relationship with a [Common Weakness Enumeration ID](https://cwe.mitre.org/).

            **Example:** `CWE ID` `equals` `CWE-787`

        -   **Response Header:** Type the name of the desired response header, select an operator, and then define the desired response header value.

            **Example:** `Response Header` `cross-origin-opener-policy` `does not equal` `same-origin`

        -   **Open Port:** Define a port or a range of ports for which {{ PRODUCT }} will check to see if they are open.

            **Example:** `Open Port` `21-23`

        -   **TLS Cert Is Missing:** This condition is satisfied when the asset is missing a TLS certificate.
        -   **TLS Cert Days Until Expiration:** Select an operator that defines the relationship with the number of days before the asset's TLS certificate expires.
        
            **Example:** `TLS Cert Days Until Expiration` `is less than` `30`

        -   **TLS Cipher:** Select an operator that defines the relationship with a TLS cipher.

        **Example:** `TLS Cipher` `matches` `.*(?:DES|RC4|MD5|EXPORT|NULL).*`

        -   **TLS SNI Hint Mismatch:** This condition is satisfied when the request's SNI hint does not match a value defined within the asset's TLS certificate. 

    3.  Repeat the previous step as needed. If you have defined multiple conditions and would like to make them all mandatory, then you should select `All of` from the **When Any of the following finding criteria are met** option. 

4.  From the **Action** option, choose how findings that satisfy this rule will be handled. 

    -   **Create an exposure with following values:** Select this option to create an exposure. 
    
        1.  Optional. From the **Assign user** option, select a user to which this exposure will be assigned by default.
        2.  Optional. From the **Assign priority** option, select the default priority that will be assigned to this exposure. 
        3.  Optional. From the **Assign severity** option, select the default severity that will be assigned to this exposure. 
        4.  Optional. From the **Assign summary** option, provide a brief summary of this finding. You may include variable data, such as `$summary`, `$cve`, or `$hostname`. 

    -   **Don't create an exposure:** Select this option if an exposure should not be created for findings that match this rule. 
    -   **If another rule creates exposure, assign values:** Select this option to override the user, priority, and severity assigned to a previously discovered exposure. 

5.  Restrict this rule by collection. From the **Collections** option, select one of the following options:

    -   **Applies to all collections:** Applies this rule to all collection. 
    -   **Only applies to specific collections:** Applies this rule to the selected collections. Click directly below this option and select each desired collection.
    -   **Applies to all collections except:** Applies this rule to all collections except for those that have been selected. Click directly below this option and select each collection to which this rule will not be applied.
5.  Restrict this rule by asset. From the **Assets** option, select one of the following options:

    -   **Applies to all assets:** Applies this rule to all assets. 
    -   **Applies to assets matching any of the following criteria:** Applies this rule to a finding that matches at least one condition. Define one or more condition(s) for identifying assets.
    -   **Applies to assets matching all of the following criteria:**  Applies this rule to a finding that matches all specified conditions. Define one or more condition(s) for identifying assets. 
    
    Define a condition by performing the following steps:
    
    1.  Click **+ Add Criteria**. 
    2.  Select the type of asset (e.g., hostname or IP address).
    3.  Select an operator that defines the relationship with the value specified in the next step.
    4.  Specify a value.
    
    **Sample condition:** `Hostname` `matches` `.*(example.com)`

6.  Determine whether to stop processing a finding when this rule is satisfied.

    -   Allow subsequent rules to process by setting the **Exit on match** option to <Image inline src="/images/v7/icons/toggle-off-large.png" alt="Disabled" /> (off).
    -   Stop processing when this rule is satisfied by setting the **Exit on match** option to <Image inline src="/images/v7/icons/toggle-on-large.png" alt="Enabled" /> (on).

7.  From the **Rule description** option, type a brief description for this rule.
8.  From the **Enabled** option, determine whether this rule will be enabled.
9.  Click **Create Rule**.

**To enable or disable a rule**

1.  Load the **Rules** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Rules**.
2.  Click on the desired rule.
3.  From the **Enabled** option, determine whether this rule will be:

    -   **Enabled:** It should look like this: <Image inline src="/images/v7/icons/toggle-on-large.png" alt="Enabled" />
    -   **Disabled:** It should look like this: <Image inline src="/images/v7/icons/toggle-off-large.png" alt="Disabled" />
4.  Click **Apply Changes**.

**To modify a rule**

1.  Load the **Rules** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Rules**.
2.  Click on the desired rule.
3.  Make the desired changes.
4.  Click **Apply Changes**.

**<a id="scan-ports-without-exposures" />To scan ports without creating exposures**

<Info>

This procedure assumes that you have not deleted or modified the `Scan common remote access ports` rule.

</Info>

1.  Load the **Rules** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Rules**.
2.  Click on the `Scan common remote access ports` rule.
3.  From the **Action** option, select `Don't create an exposure`.
4.  Click **Apply Changes**.

    Subsequent scans will continue to scan open ports for technologies and protections. However, exposures will not be generated from those scans. 

**To delete a rule**

1.  Load the **Rules** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Rules**.
2.  Click the <Image inline src="/images/icons/delete.png" alt="Delete icon" /> (Delete) icon next to the rule that should be deleted.
3.  When prompted, confirm the deletion by clicking **Delete**.

## Exposures {/*exposures*/}

Exposures represent the vulnerabilities and misconfigurations that {{ PRODUCT }} has discovered in your organization's attack surface. Exposures are automatically created and updated as {{ PRODUCT }} scans your organization's managed assets. 

**Key information:**

-   You may [create or modify a rule](#rules) to prevent exposures from being created for scanned hostnames and IP addresses. 

    [Learn how to disable exposures for port scans.](#scan-ports-without-exposures)

-   {{ PRODUCT }} scans GitHub repositories for the following types of exposures:

    -   CVEs associated with a repository's dependencies.
    -   CVEs detected through code scans.
    -   Leaked secrets.

    You cannot use rules to suppress exposures generated from scanning a GitHub repository. 

-   An exposure's **Activity** section allows you to:
    -   Track changes to that exposure.
    -   Add comments.
    -   View detailed information about how an exposure was detected.

-   View and manage exposures by navigating to the **Exposures** page under the **Attack Surfaces** section.

### Exposure Attributes {/*exposure-attributes*/}

Each exposure has the following attributes:

-   **ID:** An identifier comprised of the collection name and an incrementing number.
-   **Summary:** A brief description of the exposure.
-   **Asset:** The asset (e.g., a hostname, IP address, or seed) on which the exposure was detected.
-   **Severity:** The potential impact of an exposure is reported as a number from 0 (lowest) to 10 (highest). 
-   **Priority:** The priority of the exposure (Low, Medium, High, or Critical). Use priority to indicate the urgency with which the exposure should be addressed.
-   **Assignee:** The user or team that is responsible for addressing the exposure.
-   **Status:** The status of the exposure: Valid values are:
    -   **New:** The exposure has been created, but has not been reviewed.
    -   **Acknowledged:** The exposure has been reviewed.
    -   **Resolved:** The exposure has been addressed.
    -   **Mitigated:** The exposure still exists, but the risk has been reduced.
    -   **Muted:** The exposure has been muted, optionally until a specific date.
    -   **Ignored:** The exposure has been ignored.
-   **Technology Version:** Optional. The specific version of the technology that is associated with the exposure.
-   **CVE:** Optional. The CVE that is associated with the exposure.
-   **Comments:** Optional. Users can add comments to exposures to provide additional context or information.

## Assets {/*assets*/}

{{ PRODUCT }} Attack Surface Management scans your network to detect the internet-facing assets that make up your organization's attack surface. {{ PRODUCT }} places these assets under management until your organization's limit is reached. Although your intial scan detects technologies, protections, and exposures for all assets, subsequent scans are restricted to managed assets. 

<Info>
{{ PRODUCT }} limits the total number of assets that are eligible for scanning. This limit is enforced on a per organization basis.
</Info>

**To toggle an asset's management status**

1.  Load the **Assets** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Assets**.
2.  Find the desired asset.
3.  From the **Under Management** column, determine whether {{ PRODUCT }} may scan it for exposures.
    -   **Managed Asset:** Set this option to <Image inline src="/images/v7/icons/toggle-on-large.png" alt="Enabled" /> (on).
    -   **Unmanaged Asset:** Set this option to <Image inline src="/images/v7/icons/toggle-off-large.png" alt="Disabled" /> (off).

## Protections {/*protections*/}

{{ PRODUCT }} identifies the security solutions that are protecting the assets associated with the scanned network segment. As part of this identification process, {{ PRODUCT }} will simulate the following attacks on managed assets to determine if a security solution blocks them:

-   SQL Injection
-   Cross Site Scripting (XSS)
-   Command Injection
-   Local File Inclusion (LFI)
-   XML External Entity Injection (XXE)

These attacks are considered benign and will not harm your organization's assets. 

## Technologies {/*technologies*/}

{{ PRODUCT }} Attack Surface Management will discover and track the technologies that are associated with your organization's assets. Technologies are automatically created and updated as {{ PRODUCT }} scans your organization's assets.

View the technologies used by your network by navigating to the **Technologies** page under the **Attack Surfaces** section.

## Report {/*report*/}

Once you have scanned your network, {{ PRODUCT }} generates an executive-level security assessment of your organization's attack surface. You may customize this report to meet your organization's business needs. This report uses [standard Markdown syntax](https://www.markdownguide.org/basic-syntax/). 

**To modify your report**

1.  Load the **Report** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Report**.
2.  Click **Edit**.
3.  Make the desired changes. 
    <Tip>

    You can reset the report to the default content by clicking **Revert to Default**.

    </Tip>
4.  Click **Save Changes**.

<Info>

All of your collections use the same report, regardless of whether you are filtering by collection. Filtering by collection tailors that report to the selected collection(s). This allows you to view and download collection-specific reports. 

</Info>

**To download your report**

1.  Load the **Report** page.
    {{ SECURITY_NAV }} **Attack Surface**.
    5.  From the left-hand pane, select **Report**.
2.  Optional. Filter the report's data by selecting one or more collections.

    ![ASM Report - Filtering by collection](/images/v7/security/asm-report-collection-filter.png)
3.  Click **Download PDF** to download the report as a PDF.