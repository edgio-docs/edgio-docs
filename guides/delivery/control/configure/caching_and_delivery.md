---
title: {{CACHING_DELIVERY}}
---
Caching & Delivery delivers content via HTTP and HTTPS for all file formats. Both full (entire file) and progressive (range request) downloads are supported.

Navigate to Configure > Caching & Delivery (v2) in the navigation pane. The Caching & Delivery for page is displayed.

## Configuration List {/*configuration-list*/}
The Caching & Delivery page displays a list of the Caching & Delivery configurations for the currently-selected Company and Account.

The following information is shown for each configuration:

- **Source Hostname** – The private URL prefix used by Edgio to retrieve and cache content from your origin server (not visible to end-users)
- **Source Path**- the URL path, if any, to use with the Source Hostname
- **Protocol** - The level of HTTP protocol security to use when delivering your cached content to end-users
- **Published Path** - The URL path, if any, to use with the Published Host

## Filtering the List of Configurations {/*filtering-the-list-of-configurations*/}
Use the **Filter by** dropdown menu and the filter text field to filter the list by specific fields:

To filter the list:
1. Make a selection in the drop-down menu.
2. Enter a value in the filter text field.
3. Press the Enter key on your keyboard. The list is reduced to include only configurations that match the filter.

Display the original list by clicking the x icon in the filter text field.

## Read-Only and Hidden Capabilities {/*read-only-and-hidden-capabilities*/}
For particular use cases, configurations may have certain fields presented as either read-only or hidden (masked).

An entire configuration may be read-only. Or, an editable configuration may have source and/or published fields hidden or read-only.

Source and published fields are:
- Source hostname
- Source path
- Published hostname
- Published path

Hidden fields are masked with asterisks.

|Use Case	|User Capabilities|
|---|---|
|Entire configuration is read-only.	|Users can only view the configuration. They cannot edit, clone, or revert the configuration.|
|Configuration is editable, but specific fields are read-only and/or hidden.	|Users can modify all but read-only/hidden fields.|

Users can edit, clone, and revert the configuration.

## Creating a New Configuration {/*creating-a-new-configuration*/}
To create a new configuration, click the `+new` button, and the Create configuration screen will be displayed.

### Service Profiles  {/*service-profiles*/}

Each new configuration is based on a Service Profile. Service Profiles define the configuration structure and specify default and mandatory options that must be applied on every configuration. A Service Profile can serve as both a guide and a guardrail for the type of content your configuration will serve (characterized by a Use Case).

The `Use Case` and `Service Profile` drop-down menus are disabled:
- In existing configurations.
- After you have selected a Published and Source Protocol while you are creating a new configuration.

<Callout type="info">If you have not already saved the new configuration but you want to choose another Service Profile, you can do so by exiting out of the Create configuration screen and creating a new configuration by clicking the `+new` button.</Callout>

If you wish to modify a Service Profile or migrate, add, or remove a Protocol Set for an existing configuration, contact your Account Manager.

### Page Organization  {/*page-organization*/}

Configuration options are grouped into sections by functional category, such as Content Location. Each section displays all of the related options made available by the Service Profile. For sections other than Content Location, the most commonly used options are always displayed. Any remaining options are grouped under the Advanced drop-down menu in each section.

Initially, only the Content Location section is visible. Once you select both a Published protocol and a Source protocol, the rest of the sections and configuration options become available. The combination of a Published protocol and Source protocol is known as a "protocol set."

After you've filled in the configuration fields in each section, click Activate (at the bottom of the page) to enable your new configuration.

### Content Location  {/*current-location*/}

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
| Published protocol| The level of HTTP protocol security to use when delivering your cached content to end-users| To ensure your content is delivered with the level of security you require| The Published protocol and Source protocol drop-down menus are disabled:  <br /> - In existing configurations. <br /> - After you have selected a Published and Source protocol while you are creating a new configuration. <br /> <Callout type="info">If you have not already saved the new configuration but you want to choose another Published and Source protocol, you can do so by exiting out of the Create configuration screen and creating a new configuration by clicking the `+new` button.</Callout> |
|Published hostname|The fully qualified domain name that will be used in all public links (Published URLs) to your cached content <br /> <Callout type="info">A URL that includes the Published Hostname is referred to as a Published URL.</Callout> | To direct your users to the Content Delivery service (instead of your origin) |In the Published hostname field, enter the published hostname specified in the Welcome Letter associated with your {{COMPANY_NAME}} Account or a CNAME if desired. <br /> The published hostname provided by Edgio will be in a form similar to: <br /> ```accountname.vo.llnwd.net``` <br /> If you prefer to publish under a different hostname, you can use a DNS CNAME record to alias (point) your desired name to Edgio published hostname. <br /><Callout type="info"> - IP addresses are not accepted. You must enter a fully qualified domain name. <br /> - If you can't find the Edgiopublished hostname in your Welcome Letter, please contact {{COMPANY_NAME}} Support.</Callout> <br /> If you want to use a directory name “alias” for a particular origin path, you can add the alias by entering it in the Published URL path field. <br /> If needed, you can add a regex expression to the start of the Published hostname field, but you must have permissions to do so. Without the permissions, you are restricted as follows: <br /> - When creating or cloning a configuration, you cannot add regex to the field. <br /> - If a configuration has regex in the field, you cannot clone the configuration. <br /> - When updating a configuration that has regex in the field, you cannot modify any part of the Published hostname. <br /> Please contact your account manager if you need assistance with any of these operations. |
| Published URL path	|The path portion of a published URL|To allow your published hostname URL to be more specific and include a path.| Enter the path enclosed in forward slashes. <br /> <Callout type="info"> - This field must contain a value and defaults to / <br /> - If you have the PERMISSION_CONFIGURE_SSUI_REGEX permission, you can include regular expressions in the path.</Callout> |
|This path ends with a filename	|Whether the last component in the path is a file| File names are not validated by extension, so when the Published URL path or Source URL path does not end with a slash, it is treated as a file name. <br /> <Callout type="info">This field and `Only publish files with these extensions` are mutually exclusive. </Callout>| Place a checkmark in the checkbox if the path ends in a file name. <br /><Callout type="info">If you check this option, you must make entries in the `Published URL path` and `Source URL path` fields</Callout> |
|Only publish files with these extensions	|File extensions to publish | Provides flexibility, allowing you to specify file extensions to publish. More flexible than using This path ends with a filename, which allows you to specify only one file. <br /> <Callout type="info">This field and `This path ends with a filename` are mutually exclusive.</Callout>	| Place a checkmark in the checkbox, then enter file extensions (excluding a leading period) in the field below the checkbox. |
| Host Header| The value to include in the HTTP Host header when communicating with your origin server| To help prevent end-users from requesting content directly from your origin.| If you plan to block requests to your origin based on the value of the Host header, select `Published Hostname` or enter a value in the `Value` field. <br /> If you are hosting more than one origin on a single server, please see the additional information below. <br /> For more information, see [Host Header Details](#host-header-details-host-header-details). |
|Source protocol|The HTTP protocol(s) to use when retrieving content from your origin (when the content is not found in the cache or has expired in cache) | To ensure your content is retrieved with the level of security you require |See Published Protocol in this table. |
|Source hostname|The fully qualified domain name or IP address of your origin server|The Content Delivery service needs to know where to get your content when users first request it and also when it needs to be refreshed in the cache| Enter the domain name or IP address of your origin server in the Source hostname field. <br /> If you enter a domain name, it must be fully qualified.|
| Source URL path|The specific path of the source hostname that contains content.|The Content Delivery service needs to know the specific path because a source hostname can contain many paths.| If your content is all in a particular path on your origin, or you added a directory name “alias” with the Published Hostname for a particular origin path, you can enter the origin path by clicking the `Add Path` link <br /> <Callout type="info">This field must contain a value and defaults to /</Callout> |
| Source port| The HTTP port number to use when communicating with your origin server, using the Origin Host and Origin Path you specified| If you are using a port other than the default (80) for HTTP, the Content Delivery service needs to know which port you’ve chosen| Leave the default port number for HTTP unless you are using another port number. If so, enter the new port number in the Origin HTTP Port Number field. <br /> <Callout type="info">The default for HTTPS is 443, and this is the value used by Edgio for all HTTP requests to origin (the value is not editable).</Callout> |
|Location of Content Source|The location of the content you want the Content Delivery service to deliver (the “origin”)|The Content Delivery service needs to know where to find your content when users first request it and also when it needs to be refreshed in the cache|If your content is not stored with Edgio, choose `Outside Edgio infrastructure`. Otherwise, choose the appropriate Edgio Storage location. <br /> If you choose `Outside Edgio infrastructure` in `Location of Content` Origin, the following additional fields are displayed: <br /> - Origin Protocol <br /> - Origin Host <br /> - Origin Path <br /> - Origin HTTP Port
If you choose a storage option in Location of Content Origin, the following fields are displayed: Origin Path <br /> <Callout type="info">If you are using {{COMPANY_NAME}} storage but your storage option is not shown, your Content Delivery service is not fully configured. If this is the case, please contact Support.</Callout>

#### Host Header Details {/*host-header-details*/}
### Caching Rules  {/*caching-rules*/}
### Arc Light  {/*arc-light*/}
### Media Delivery  {/*media-delivery*/}
### Optimization  {/*optimization*/}
### Headers & Methods  {/*headers-and-methods*/}
### Secure Cache Diagnostics  {/*secure-cache-diagnostics*/}
### Failover  {/*failover*/}
### Content Security  {/*content-security*/}
### Logging  {/*logging*/}
### Cookie Handling  {/*cookie-handling*/}
### Redirect  {/*redirect*/}
### Others  {/*others*/}
### Additional Options  {/*additional-options*/}
### Notes  {/*notes*/}
## Editing a Configuration  {/*editing-a-configuration*/}
## Previewing a Configuration  {/*previewing-a-configuration*/}
## Cloning a Configuration  {/*cloning-a-configuration*/}
## Deleting a Configuration  {/*deleting-a-configuration*/}
## Reverting to a Previous Configuration  {/*reverting-to-a-previous-configuration*/}
