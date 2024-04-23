---
title: DNS Services
---

DNS Services provide an easy-to-use, DNS-based, global load balancer used for directing end-user requests to customer Resources, for example, web servers.

DNS Services are managed by the Director, which is a DNS service that can route traffic based on IP address, end-user nameserver geographic location or the BGP autonomous system number of the end-user nameserver.

Failovers, also known as 'Traffic Balancers', redirect traffic in case a Resource is not available.

To access the DNS Services page, navigate to **Configure** > **DNS Services** in the navigation pane.

## DNS Services Entities  {/*dns-service-entities*/}

DNS Services comprises the entities in the following table.

| Entity | Description |
| --- | --- |
| Director | The Director is a DNS service that helps balance and manage end-user requests to origin servers and other IP Resources (including requests from more than one CDN). For example, if you have end users in diverse geographic locations, the Director provides content specific to their region with the best site performance and end-user experience. The Director can also block traffic from a country, province, or IP address.<br /><br />The Director can route traffic based on:<br /><br />-   IP address<br />-   end-user nameserver geographic location<br />-   BGP autonomous system number (ASN) of the end-user nameserver. |
| Resources | Resources are IP addresses or hostnames that you want to manage. Resources include zero, one, or at most two [Health Checks](#add-health-checks-to-a-dns-services-resource). Resources optionally participate in [Failovers](#work-with-failovers). |
| Failovers | If a Resource is inaccessible due to a network failure or errors in Resource configurations, you can define a Failover for the Resource in which one or more other Resources act as the "Failover" Resources.<br /><br />Each Resource in a Failover has a relative priority and preference; both are positive integers.<br /> <br /> <Callout type="info">- A value of '1' is the highest preference and subsequently greater numbers indicate decreasing preference.<br />-   Priority, used for unequal load balancing, works in reverse. Larger values mean the record will get served more frequently relative to the other records with the same preference but smaller weight.</Callout> <br /> Failovers have two modes of operation.<br />-   In **single Failover** mode, records with the lowest preference values are replaced with the next available record in order of preference. (A value of '1' is the highest preference and subsequently greater numbers indicate decreasing preference.) A lower preference record will only be used if there are not enough higher preference records available to satisfy minimum response (see [Add a New Failover](#add-a-new-failover)). If there are no available records, failed records will continue to be deactivated until minimum response is reached. If all records are in a failure state, records from the highest preference set are returned until inactive records become available.<br />-   In **group Failover** mode, the active set of records is treated as a single unit. Records are deactivated on failure and not replaced with lower preference records. When the active record set is less than the minimum response, the entire active record set is deactivated. The next preference set is activated if the number of active records in that set is greater than or equal to the minimum response. This process will continue until no preference set is available for activation. The last active set will remain active until a preference set has enough available records to meet the minimum response threshold.<br />The settings determine how Failovers monitor and react to failure conditions.<br /><br />Failovers include zero, one, or at most two [Health Checks](#add-health-checks-to-a-dns-services-resource).<br /><br />Failovers include at least one [Resource](#work-with-failovers). |
| Director Policies | A Director Policy assigns a Time to Live (TTL) and weight to an alias host and canonical host, and optionally binds the Policy to a business Rule called a [Director Policy Rule](#work-with-director-policy-rules). |
| Director Policy Rules and Match Components | Director Policy Rules have a name and description and at least one Match Component that determines the mode for routing a request: by country, region, ASN, or CIDR. |
| Health Checks | You can add Health Checks to Failovers and Resources.<br />-   Failovers<br />    Part of the Failover configuration process is adding Health Checks. Health checks let you easily add or remove a Resource from all of your Policies without going through each Policy. This may be helpful if you are adding new Resources into the rotation and do not want to activate them right away or in a case where you want to remove a Resource out of the handout rotation (due to maintenance or other factors). Health Checks also detect unavailability quickly before your users are seriously impacted.<br />    <br />-   Resources <br />    Sometimes Resources become unavailable and Health Checks can detect this quickly before unavailability seriously impacts your users. |

## Page Layout  {/*page-layout*/}

The page provides tabs for working with three components:

-   **Resources** tab - the IP addresses or hostnames that you want to manage.
-   **Failovers** tab - Failovers in case a domain is not available
-   **Director policies** tab - binding one or more Resources together using a business Rule

## Configuration Overview  {/*configuration-overview*/}

Three core steps need to be performed to configure DNS Services:

-   Adding and Configuring Resources: During this step, you will add, configure, and indicate to which Resource(s) you wish to manage. Ultimately, the Resources are the “handout answers” to end-user query requests for the hostname. See [Working with Resources](#work-with-resources).
-   Adding and configuring Failovers: During this step, you will configure the Resources in a Failover group. See [Working with Failovers.](#work-with-failovers)
-   Adding and configuring Policies: During this step, you will add and configure one or more Policies. The Policy is the act of binding one or more Resources together using a business Rule for the distribution of end-user requests to your added and configured Resources. See [Working with Director Policies](#working-with-director-policy-rules).

Changes made to DNS Services will propagate to the in less than 10 minutes; however, the Freshness value may dictate how quickly changes are ultimately acquired, and traffic will begin to shift.

## Work with Resources  {/*work-with-resources*/}

To work with Resources, click the **Resources** tab. The *Resources* list displays:

The *Resources* list contains the columns in the following table for each Resource.

| Column | Description |
| --- | --- |
| Name of Resource | Name that was given to the DNS Resource when it was added |
| Type | Record category - IP (A record) or host name (CNAME) |
| Destination (IP or hostname) | IP (A record) or host name (CNAME) that the Resource points to. |
| Actions | Icons for editing and deleting a Resource. |

### Search for DNS Services Resources  {/*search-for-dns-services-resources*/}

-   Begin typing search criteria in the Search for resource field at the top right of the list.

As you type, matches are highlighted in yellow and only rows containing matching characters are displayed.

-   To view all rows, remove the search criteria from the **Search for resource** field.

 <br /> <Callout type="info">You can search for Resources by the following columns: <br /> -   **Name** <br /> - Destination (IP or hostname) <br /> Searches are case-insensitive.</Callout>

### Add a New DNS Services Resource  {/*add-a-new-dns-services-resource*/}

The first step in configuring DNS Services is to add one or more Resources to which you want to direct traffic.

To add a new Resource:

1.  Select the **Resources** tab. The *Resources* list displays.
2.  Select the **+ New** button on the right side of the page under the tabs header, and the *Create resource for page* displays.
3.  Complete fields on the page (see [Fields on the 'Create resource for' Page](#add-new-dns-service-resource)).
4.  Click *Save*.

You are returned to the *Resources* tab and a message is displayed stating that a job to create the Resource has started.

Click the **Refresh** button periodically to determine if the Rule has finished processing.

 <br /> <Callout type="info">-   After configuring a Resource you may have to wait five or more minutes for the Resource to be created. <br /> -   The Resource will be added to the list only after the job is complete. <br /> -   After creating the Resource, you might want to add Health Checks to it. See [Adding Health Checks to a DNS Services Resource](#add-health-checks-to-a-dns-services-resource).</Callout>

#### Fields on the 'Create resource for' Page {/*fields-on-the-create-resource-for-page*/}

| Field | Description/Instructions |
| --- | --- |
| Name | Unique alphanumeric name for the new Resource.<br /><br />If you are adding a large number of Resources, you may want to establish an easy-to-understand naming scheme to make it easier to find specific Resources in the *Resources* list. |
| Type | Resource category:<br />A - DNS address record. Maps a domain name to an IP address.<br />CNAME - DNS Canonical name record. Maps a domain name to a Canonical name record. |
| Target (IP address or Domain name) | The IP address or fully-qualified domain name of the Resource.<br /><br />Enter the IP address (only IPv4 addresses are allowed) or fully-qualified domain name of the Destination (IP or hostname) Resource.<br /><br />If you enter a hostname instead of an IP address, the query response to any balanced or directed group will be returned as a , not an A Record.  <br /> <Callout type="info">- If the domain name does not include a terminating dot ("."), the zone name is appended to the domain name when the resource is pushed to the edge. For example, if the zone name is `lldns.net.` and the domain name is specified as `www2.lldns.net`, the name is `www2.lldns.net.lldns.net`. when pushed to the edge. < br /> - To add hostname `www3` to `zone lldns.net.` you can specify the domain name as either `www3.lldns.net.` or `www3`.<br /> Both naming methods result in the record being pushed to the edge as `www3.lldns.net.`</Callout>|

### Add Health Checks to a DNS Services Resource  {/*add-health-checks-to-a-dns-service-resource*/}

1.  Locate the desired Resource on the **Resources** tab, then select the pencil (edit) icon.
2.  Click the **+ Add new healthcheck** button.<br />

  <Callout type="info">If the Resource already has both types of Health Checks, the **+ Add new healthcheck** button is disabled.
</Callout>
    The CREATE HEALTHCHECK dialog displays.

3.  Complete the fields in the dialog (see [Fields In the 'CREATE HEALTHCHECK' Page](#fields-in-the-create-healthcheck-dialog)).
4.  Click the **Save** button.

The dialog closes and a message is displayed stating that a job to create the Health Check has started.

Click the **Refresh** button periodically to determine if the Rule has finished processing.

 <br /> <Callout type="info">CONTENT</Callout>
*   After configuring a Health Check you may have to wait five or more minutes for the Resource to be created.

*   The health will be added to the Edit resource for page only after the job is complete.

#### Fields in the 'CREATE HEALTHCHECK' Dialog {/*fields-in-the-create-healthcheck-dialog*/}

| Field | Description/Instructions |
| --- | --- |
| Type | Health Check category that you want the Failover to react to. If you've already added one type, only the other type is available to select.<br />Select the type:<br />-   **ping**: Select this value to check for a response from the Resource itself.<br />-   **http**: Select this value to check for a response from an object served by the Resource. |
| Check interval (seconds) | Time span between Health Checks, in seconds. Defaults to 60 if not specified.<br />Enter a value greater than or equal to 60. |
| URL | For http Health Checks only, the relative URL of the object that is served by the Resource. |

### Edit a DNS Services Resource  {/*edit-a-dns-services-resource*/}

To edit a Resource:

1.  Choose a Resource from the list in the '**Resources**' tab and then click the pencil (edit) icon in the Actions column.
2.  Change the settings as required and click **Save**.

A message is displayed stating that a job to save the Resource has started, and the word "processing" is displayed on the right side of the row. Click the **Refresh** button above the list periodically to determine if the Rule has finished processing.

For more information about the fields, see [Adding a New DNS Services Resource](#add-a-new-dns-services-resource) and [Adding Health Checks to a DNS Services Resource](#add-health-checks-to-a-dns-service-resource).

### Delete a DNS Services Resource  {/*delete-a-dns-services-resource*/}

To delete a Resource:

1.  Choose a Resource from the list in the 'Resources' tab, and then click the trash can (delete) icon.
2.  In the confirmation dialog, click OK.

A message is displayed stating that a job to delete the Resource has started, and the word "processing" is displayed on the right side of the row. Click the Refresh button above the list periodically to determine if the Rule has finished processing.

<Callout type="info"> -   If you accidentally delete a Resource, you must recreate it by adding a new Resource. <br /> - When you delete a Resource, it is removed from all Failovers it participates in.</Callout>

## Work with Failovers  {/*work-with-failovers*/}
### Search for Failovers  {/*search-for=failovers*/}

-   Begin typing search criteria in the Search for failover field at the top right of the list.

As you type, matches are highlighted in yellow and only rows containing matching characters are displayed.

-   To view all rows, remove the search criteria from the Search for failover field.

<Callout type="info"> You can search for Resources by the Name column. Searches are case-insensitive.</Callout>

### Add a New Failover  {/*add-a-new-failover*/}

To add a new Failover:

1.  Select the **Failovers** tab.
2.  From the **Zone** , click the zone to which the Failover is to pertain.
3.  Select the **+ New** button on the right side of the page under the tabs header, and the Create failover for page displays.
4.  Complete fields on the page (see [Fields on the 'Create failover for' Page](fields-on-the-create-failover-for-page)).
5.  Click **Save**.

    A message is displayed stating that a job to create the Failover has started, and the word "processing" is displayed on the right side of the row. Click the **Refresh** button above the list periodically to determine if the Failover has finished processing.

<Callout type="info"> If you are at all unsure of the settings, do not attempt to change them yourself. Instead, contact your Account Manager.</Callout>

#### Fields on the 'Create failover for' Page {/*fields-on-the-create-failover-for-page*/}


| Field | Description/Instructions |
| --- | --- |
| Name | Host name for the Failover Resource. If you enter a name without a terminating dot, the zone name will be appended to the host name before the Failover is sent to the edge. <br /> <Callout type="info">- If the domain name does not include a terminating dot ("."), the zone name is appended to the domain name when the resource is pushed to the edge. For example, if the zone name is `lldns.net`. and the domain name is specified as `www2.lldns.net`, the name is `www2.lldns.net.lldns.net`. when pushed to the edge. <br /> - To add hostname `www3` to zone `lldns.net.` you can specify the domain name as either `www3.lldns.net.` or `www3`. <br /> Both naming methods result in the record being pushed to the edge as www3.lldns.net.</Callout> |
| Type | Category of Failover: 'Single' or 'Group'. |
| Minimum response | Minimum number of records the Failover group is to respond with. |
| Maximum response | Maximum number of records the Failover group is to respond with. |
| Delay time | Delay time in seconds to use before marking a Resource as 'in service'. |
| Percent Threshold | Threshold percentage of Health Checks that should pass to prevent triggering a Failover condition for a record.<br />Enter a decimal number between 0.0 and 100.00 |
| Health checks | Select the Health Check type that you want the Failover to react to:<br /> -   To check for a response from the Resource itself, select **ping**.<br /> -   To check for a response from an object that is served by the Resource, select **http**. <br /> <Callout type="info">You can select either option or both options.</Callout> |
| TTL | Time to live for the served record. |
| Resources | Resources that you designate as the Failover Resources. See [Configuring Resources in a Failover Group](#configure-resources-in-a-failover-group). |

#### Configuring Resources in a Failover Group {/*configure-resources-in-a-failover-group*/}

Any Resources that have been configured for the Failover group are listed in the **Resources** section of the **Create failover** or **Edit failover for** pages.

You can configure a Resource's priority and preference and add or remove a Resource.

##### Configure Relative Priority and Preference {/*configure-relative-priority-and-preference*/}

In addition to name, type, and target (see [Fields on the 'Create resource for' Page](#fields-on-the-create-resource-for-page)), each Resource listed has a priority and preference:

-   preference - The integer preference value for the Resource in the Failover group. A value of '1' is the highest preference and subsequently greater numbers indicate decreasing preference.

-   priority - The integer priority value for the Resource in the Failover group. A positive integer to use for unequal load balancing. Larger integers mean the record will get served more frequently relative to the other records with the same preference but smaller weight.

<Callout type="info">Resources are selected first based on preference, then priority.</Callout>

To configure relative priority and preference:

1.  Make entries in the **Priority** and **Preference** fields for each Resource:

*   Preference: Relative preference compared to other Resources.

*   Priority: Relative priority compared to other Resources.

2.  Click **Save**.

    A message is displayed stating that a Failover job has started, and the word "processing" is displayed on the right side of the row. Click the Refresh button periodically to determine if the Failover has finished processing.

##### Remove a Resource {/*remove-a-resource*/}

Removing a Resource

To remove a Resource, click the trash can (delete) icon on the right side of the Resource's row. The resource is removed from the Resources list.

You can also remove a Resource as described in [Adding and Removing Resources from a Failover Group](#working-with-resources).

##### Add and Remove Resources from a Failover Group {/*add-and-remove-resources-from-a-failover-group*/}

The RESOURCES dialog is displayed. Resources currently configured for the Failover group contain a minus (remove) icon. All other Resources contain a plus (add) icon.
1. Click **+ Add/remove resources**.
    The RESOURCES dialog is displayed. Resources currently configured for the Failover group contain a minus (remove) icon. All other Resources contain a plus (add) icon.
2.  Indicate the Resources you wish to add by clicking the **+** button on the right side of the Resource's row.
3.  Add or remove Resources by clicking the plus or minus icon.
4.  Click **Apply** at the bottom of the list to save your selections.

### Edit a Failover  {/*edit-a-failover*/}

To edit a Failover:

1.  Choose a Failover from the list in the **Failovers** tab, and then click the pencil (Edit) icon.
2.  Change the settings as required (see [Fields on the 'Create failover for' Page](#fields-on-the-create-failover-for-page) and [Configure Resources in a Failover Group](#configure-resources-in-a-failover-group)).
3.  Click **Save**.

    A message is displayed stating that a Failover job has started, and the word "processing" is displayed on the right side of the row. Click the **Refresh** button periodically to determine if the Failover has finished processing.

### Delete a Failover  {/*delete-a-failover*/}

To delete a Failover:

1.  Locate the Failover in the list in the **Failovers** tab, and then click the trash can (delete) icon.
2.  In the confirmation dialog, click **Delete**.

    A message is displayed stating that a job to delete the Failover job has started, and the word "processing" is displayed on the right side of the row. Click the **Refresh** button periodically to determine if the Failover has finished processing.

## Work with Director Policies  {/*work-with-director-policies*/}

You work with **Director Policies** in the Director policies tab.

The **Director policie**s tab contains a list of configured Policies for a given zone. Each row in the list shows the information in the following table.


| Field | Description |
| --- | --- |
| Alias Host Name | A DNAME that maps or renames an entire sub-tree of the DNS namespace to another domain. |
| Canonical Host | The CNAME of the host the DNAME points to. |
| Weight | Relative importance of this record compared to other records with the same Alias Host Name but different Canonical Host names. |
| TTL | Time to live. Amount of time the Policy will remain in the DNS resolver's cache. |
| Rule | Business Rule associated with the Policy. Click the name to edit the Rule. See [Edit a Director Policy Rule](#edit-a-director-policy-rule). |
| Rule Description | Summary of the Rule. |
| Rule Match components | The actual matches on ASN, Country, and CIDR. |
| Action icons | Icons to edit and delete Policies. <br /> <Callout type="info">If a Policy has been recently configured but has not finished processing, the word 'processing' shows instead of the 'edit' and 'delete' icons. Click the **Refresh** button periodically to determine of the Policy has finished processing.</Callout> |

<Callout type="info">Except for Weight and TTL, long field values are truncated. Do either of the following to see the complete description: <br /> - Hover the mouse pointer over the field value. <br /> - or all fields except Rule, double-click the field value, then copy and paste.</Callout>

### Search for Director Policies  {/*search-for-director-policies*/}

*   Begin typing search criteria in the Search for policy field at the top right of the list.

    As you type, matches are highlighted in yellow and only rows containing matching characters are displayed.

*   To view all rows, remove the search criteria from the Search for policy field.

<Callout type="info">You can search for Policies by the following columns: <br /> -   Alias Host Name <br /> - Canonical Host <br /> - Rule <br /> - Rule: Description <br /> Searches are case-insensitive.</Callout>

### Add a New Director Policy  {/*add-a-new-director-policy*/}

1.  From the **Zone**, select the zone to which the Policy is to pertain.
2.  Click the **+ New** button under the tab headers on the right side of the page.

    The Create director Policy for page appears.

3.  Fill in the fields on the page (see [Fields in the 'Create director Policy for' Page](#fields-in-the-create-director-policy-for-page)).
4.  Click **Save**.

    A message is displayed stating that a Director Policy job has started, and the word "processing" is displayed on the right side of the row. Click the Refresh button periodically to determine if the Director Policy has finished processing.

<Callout type="info">After creating a new Policy, you must wait five or more minutes for the Rule to finish processing.</Callout>

#### Fields in the 'Create director policy for' Page {/*fields-in-the-create-director-policy-for-page*/}

| Field | Description/Instructions |
| --- | --- |
| Alias Host Name | DNAME that maps or renames an entire sub-tree of the DNS namespace to another domain. |
| Canonical Host | CNAME of the host the DNAME points to.  <br /> <Callout type="info">- If the domain name does not include a terminating dot ("."), the zone name is appended to the domain name when the resource is pushed to the edge. For example, if the zone name is `lldns.net.` and the domain name is specified as `www2.lldns.net`, the name is `www2.lldns.net.lldns.net`. when pushed to the edge. < br /> - To add hostname `www3` to `zone lldns.net.` you can specify the domain name as either `www3.lldns.net.` or `www3`.<br /> Both naming methods result in the record being pushed to the edge as `www3.lldns.net.`</Callout>||
| TTL | Time to live. Amount of time the Policy will remain in the DNS resolver's cache. |
| Weight | Relative importance of this record compared to other records with the same **Alias Host Name** but different **Canonical Host** names. Defaults to 0 if not specified.<br />Larger integers mean the record will get served more frequently relative to the other records with the same name or smaller weight. |
| Rule | Business Rule associated with the Policy. See [Applying Director Policy Rules](#Adding2) for instructions. If no Rule is specified, the record acts as the default response when there is no Rule match from other records. |
| Comments | Notes about the Policy. |

## Work with Director Policy Rules  {/*work-with-director-policy-rules*/}

Director Policy Rules determine the basis for routing a request.

| Rule Type | Routing Type |
| --- | --- |
| Geo | Geographic-based.<br />Traffic is routed based on the end-user nameserver geographic location: country or region (province/state). |
| ASN | Traffic is routed based on the BGP ASN (autonomous system number) of the end user’s nameserver. |
| IP Address | Traffic is routed based on an IP address. If the end-user query matches the IP in the Policy, the nameserver platform routes based on the IP address. |

### Apply a Director Policy Rule  {/*apply-a-director-policy-rule*/}

To apply a Rule:

1.  While creating or editing a Director Policy, click the **+ Apply/Remove rule** button.

The *RULES* dialog displays.

2.  Click the **+ icon** on the right side of the Rule's row.

3.  Click **Apply**.

The Rule is added above the **Apply/Remove rule** button in the Create director policy for page.

<Callout type="info">You can apply only one Rule per Director Policy.</Callout>

### Create a New Director Policy Rule  {/*create-a-new-director-policy-rule*/}

To create a new Rule:

1.  While creating or editing a Director Policy, click the **+ Apply/Remove** rule button.

    The *RULES* dialog displays.

2.  Click the **Create rule** button at the top left of the *RULES* dialog.

    The *CREATE RULE* dialog displays.

3.  Fill in the fields in the dialog. See [Fields in the CREATE RULES and EDIT RULE Dialog](#fields-in-the-create-rules-and-edit-rule-dialog) for details.

4.  Click **Apply** in the *RULES* dialog..

    The Rule is added above the Apply/Remove rule in the Create director policy for page.

### Edit a Director Policy Rule  {/*edit-a-director-policy-rule*/}

1.  While creating or editing a Director Policy, click the **+ Apply/Remove** rule button.

    The *RULES* dialog displays.

2.  Click the **edit** (pencil) icon in the desired Rule's row.
3.  Fill in the fields in the dialog. See [Fields in the CREATE RULES and EDIT RULE Dialog](#fields-in-the-create-rules-and-edit-rule-dialog) for details.
<Callout type="info">To remove a Match Component, click the (-) icon beside the Component's row.</Callout>

4.  Click **Apply** to save the changed Rule.

    Within the *RULES* dialog, a message is displayed stating that a job to create or update the Rule has started. Unlike other processing jobs, you won't see the word 'processing' until you click the **Refresh** button.

5.  After the first time you click the button, click it periodically to determine if the Rule has finished processing.

    <Callout type="info">If you attempt to modify the Rule before it is finished processing, a message is displayed warning you that you must wait until the Rule finishes processing.</Callout>

### Delete a Director Policy Rule  {/*delete-a-director-policy-rule*/}

1. Click the **delete** (trash can) icon.
2. A message is displayed stating that a job to delete the Rule has started and the word "processing" is displayed on the right side of the row. Click the **Refresh** button periodically to determine if the Rule has been deleted.

##### Fields in the CREATE RULES and EDIT RULE Dialogs {/*fields-in-the-create-rules-and-edit-rule-dialog/*}

| Field | Description/Instructions |
| --- | --- |
| Name | Descriptive name for the Rule. |
| Enabled | You can create a Rule but not enable it for various reasons. If a Rule is not enabled, it will not be applied.<br />Add a check mark if you want to enable the Rule. |
| Description | Rule explanation. |
| Match components | Rules have multiple Components and each Component can consist of one or more of the following: country, region, ASN, and CIDR. The fields in a Component appear in increasing specificity and are 'AND'ed together. The most specific Rule Component that can be matched is applied.  <br /> <Callout type="info">You can add multiple Components using the dialog. All are associated with the Rule.</Callout> <br /> 1.  Configure the following fields. <br />    - Select 'Country' and 'Region' for geographic-based routing.<br /> The 'Region' field is supported for only a subset of all countries.<br /> - You can select 'Country' without selecting 'Region' but you must select 'Country' to select 'Region'. <br /> - Enter the ASN (Autonomous System Number) to route based on Border Gateway Protocol (BPG). <br /> - Enter CIDR (Classless inter-domain routing) to route based on IP address. <br /> 2. Click the + button to the right of the Component to add the Component.<br />3. Click Apply.<br /> A message is displayed stating that a job to create or edit the Component has started.<br /> 4. Create additional Components as desired. |

### Edit a Director Policy  {/*edit-a-director-policy*/}

To edit a Director Policy:

1.  Choose a Policy from the list in the **Director policies** tab, and then click the pencil (edit) icon.
2.  Change the settings as required (see [Add a New Director Policy](#add-a-new-director-policy)).
3.  Click **Save**.

    A message is displayed stating that a Director Policy job has started, and the word "processing" is displayed on the right side of the row. Click the Refresh button periodically to determine if the Director Policy has finished processing.

### Delete a Director Policy  {/*delete-a-director-policy*/}

To delete a Director Policy:

1.  Choose a Resource from the list in the **Director policies** tab, and then click the trash can (delete) icon.
2.  In the confirmation dialog, click **Delete**.

    A message is displayed stating that a Director Policy delete job has started, and the word "processing" is displayed on the right side of the row. Click the Refresh button periodically to determine if the Director Policy has finished processing.
