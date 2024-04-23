---
title: Chunked Streaming
---

Using the Control portal, you can manage a configuration that controls several manifests and Chunked Streaming origins. Chunked Streaming provides a way for you to adopt Edgio's optimized configuration profiles for delivering chunked video content through the CDN over HTTP, HTTPS, or both. To use Chunked Streaming, you first need to chunk your content and generate the associated manifest files (Chunked Streaming does not encode, transcode or transmux your media). You can host your content on your origin servers or with Origin Storage.

<Callout type="info">In general, Chunked Streaming is like Caching & Delivery, but Chunked Streaming allows you to create multiple delivery configurations for media formats.</Callout>

## Chunked Streaming List Page {/*chunked-streaming-list-page*/}

Navigate to **Configure > Chunked Streaming (v2)** in the navigation pane. The *Configurations for* page is displayed, which contains a list of your Chunked Streaming configurations.

The top gray bar shows the number of active configurations on the right. You can click the bar to hide or show all configurations.

The rest of the gray bars show individual configurations grouped by Published Hostname in the bar header. The Published Hostname is the public URL prefix used in links to your published content (URLs seen by end-users).

The *Chunked Streaming Configurations list* provides the following information for each configuration:

-   **source hostname** (Origin Hostname) – The private URL prefix used by to retrieve and cache content from your origin server (not visible to end-users).
-   **source path** – The private URL prefix used by to retrieve and cache content from your origin server (not
-   visible to end-users).

-   **protocol** – protocols in this format:
    {source protocol} ➤ {published protocol}
    Multiple protocol combinations are allowed. An example is: HTTP ➤ HTTPS & HTTPS ➤ HTTP

-   **format** - The media formats which the content is delivered in
-   **published path** – The path portion of the URL (visible to end-users).
-   **action icons** \- edit, view, clone, delete
-   **configuration information** - version, date version created or last modified, and the user that created or modified the version

## Filtering the List of Configurations {/*filtering-the-list-of-configurations*/}

To filter the list:
1. Make a selection in the drop-down menu.
2. Enter a value in the filter text field.
3. Press the Enter key on your keyboard. The list is reduced to include only configurations that match the filter.
<br />
Display the original list by clicking the **x** icon in the filter text field.

## Creating a New Configuration {/*creating-a-new-configuration*/}

A Chunked Streaming configuration consists of one root instance and two child instances (manifest and chunk) per each media delivery format (HDS, HLS, MSS, DASH). All root and child instances can also support multiple combinations of protocols.

<Callout type="info">The root configuration serves as the anchor for all child video format configurations under it. The root specifies the base path from which all child configuration paths will be relative. The root specifies a base set of options set on each child configuration unless otherwise overridden by format-specific settings.</Callout>

### Service Profiles  {/*service-profiles*/}

Each new configuration is based on a Service Profile. Service Profiles define the configuration structure and specify default and mandatory options that must be applied on every configuration. A Service Profile can serve as both a guide and a guardrail for the type of content your configuration will serve (characterized by a Use Case).

The **Use Case** and **Service Profile** drop-down menus are disabled:
- In existing configurations.
- After you have selected a Published and Source Protocol while you are creating a new configuration.

<Callout type="info">If you have not already saved the new configuration but you want to choose another Service Profile, you can do so by exiting out of the **Create configuration** screen and creating a new configuration by clicking the **+ new** button.</Callout>

If you wish to modify a Service Profile or migrate, add, or remove a Protocol Set for an existing configuration, contact your Account Manager.

### Creating a new configuration {/*creating-a-new-config*/}

1.  Begin the new configuration by clicking the **+ new** button at the top left of the page.
2.  Make configurations in the sections in the subsequent Create configuration screen.
3.  When you are finished, click the Activate button at the bottom of the page or the floating blue checkmark icon on the right side of the screen.

Links to instructions for sections on the screen:

[Content Location](#content-location)

[Media Delivery](#media-delivery)

[Options Applicable to Both Root and Child Instances](#chunked-streaming-options-applicalbe-to-both-root-and-child-instances)

[Others](#others)

[Additional Options](#additional-options-section)

[Notes](#notes)

### Content Location {/*content-location*/}

With two exceptions, configuring a Content Location is similar to (v2).

-   When configuring the Source URL path, keep in mind that it will be the root for all child video format configurations. For example, you have a DASH configuration, and you configure /streaming/ as the source URL path, then that path will have two children:

    `/streaming/DASH/manifest`

    `/streaming/DASH/chunk`

-   **The path ends with a filename** and **Only publish files with these extensions** options are not present under the Source URL path field in the Content Location section.

For additional information, see [Content Location](delivery/control/configure/caching_and_delivery#content-location) in the Caching & Delivery section.

### Media Delivery {/*media-delivery*/}

In some cases, you might want to take control over cached object expiration times. Chunked Streaming Delivery allows you to indicate how long (TTL) the manifest and chunks will be cached.

You can make configurations for any supported Chunked Streaming formats (HDS, HLS, MSS, DASH) in this UI section.

#### Adding a Media Format

1.  Click the **Add format** button and choose a format from the subsequent .

    A configuration section for the selected format is displayed. <br /> <Callout type="info">Several additional sections are also displayed below the Media Delivery section. (Instructions for the additional UI sections are described later in this document.)</Callout>

2.  Configure the Chunk TTL and Manifest TTL fields.

    Both fields allow you to configure manually, default values to the root instance, or choose from preset times.

| Option | Description/Instructions |
| --- | --- |
| Default to Root | The TTL defaults to the root instance value, configured in the Caching Rules section immediately below this one. |
| Configure manually | 1.  Configure values in the **Min** and **Max** fields.<br />2.  Configure a TTL for cached responses in the [Cache Generated Responses](#cache-generated-responses-field). |
| preset value | The value you select will be the expiration time. |

##### Cache Generated Responses Field {/*cache-generated-responses-field*/}

For HTTP Chunked Streaming responses generated dynamically, origins often do not supply cache-control headers (`Cache-Control`,` Expires`, or `Last-Modified`). This field directs EdgePrism to consider such responses cacheable. Configure a number and time unit (seconds, minutes, etc.) to keep the responses in the cache.

#### Removing a Media Format {/*-removing-a-media-format*/}

- If you are working with a new configuration, hover your mouse pointer over the right side of the section and click the **x** button that appears. The configuration is removed, and the removal cannot be undone.

- If you are editing an existing configuration, click the **x** button to remove a format. If you click the **< back** link at the top, respond 'No' to the prompt asking if you want to discard changes.

### Chunked Streaming Options Applicable to Both Root and Child Instances {/*chunked-streaming-options-applicalbe-to-both-root-and-child-instances*/}

Although the following sections of the user interface apply to root and child Chunked Streaming instances, the fields and how you interact with them are identical to Caching & Delivery. Please refer to Caching & Delivery documentation as indicated in the following table.

| Section in the User Interface | Caching & Delivery Documentation Reference |
| --- | --- |
| Caching Rules | [Caching Rules](/delivery/control/configure/caching_and_delivery/#caching-rules) |
| Arc Light | [Arc Light](/delivery/control/configure/caching_and_delivery/#arc-light) |
| Optimization | [Optimization](/delivery/control/configure/caching_and_delivery/#optimization) |
| Headers & Methods | [Headers & Methods](/delivery/control/configure/caching_and_delivery/#headers-and-methods) |
| Failover | [Failover](/delivery/control/configure/caching_and_delivery/#failover) |
| Content Security | [Content Security](/delivery/control/configure/caching_and_delivery/#content-security) |
| Logging | [Logging](/delivery/control/configure/caching_and_delivery/#logging) |
| Cookie Handling | [Cookie Handling](/delivery/control/configure/caching_and_delivery/#cooking-handling) |
| Redirect | [Redirect](/delivery/control/configure/caching_and_delivery/#redirect) |

For information about other sections not in the preceding table, see:

[Others](#others)

[Additional Options](#additional-options-sectopm)

#### Others {/*others*/}

This section presents additional delivery options you can use in the Chunked Streaming configuration. For descriptions, hover your mouse pointer over the right side of the option name. An information icon appears along with a description of the option.

### Additional Options Section {/*additional-options-section*/}

This section in the UI allows you to fine-tune options for the formats you selected in the Media Delivery section. By default, several significant options are present that you can modify or delete. You can add additional options by type all or part of an option name in the **Type option name** field, where partial matches are considered.

Each option is paired with the protocol sets you selected during earlier configurations. You can configure an option at the root level or any (and all) children and children in each format you configured. Each Child has child entries for manifest and chunk.

To configure an option:

1. Click the menu icon in an option's row.
2. Select a combination of root and children in the subsequent popup menu.
    To show the children click the show link at the bottom of the popup menu.

To delete an option, hover your mouse pointer over the right side of the section and click the x button that appears. The configuration is removed, and the removal cannot be undone.

### Notes Section {/*notes*/}

Enter any notes related to the configuration.

## Editing a Configuration {/*editing-a-configuration*/}

To make configuration changes to existing Published Protocols or Source Protocols,

1. Click the edit (pencil) icon on the right side of the configuration.
2. In the CONTENT LOCATION section, select the drop-down arrow for the published or source protocol to launch the PROTOCOL SETS MIGRATION window.
3. Choose your HTTP/HTTPS Protocol Set combinations; add one more protocol set if the configuration consists of just one protocol set; or remove one protocol set by selecting the 'Do not use' option.
4. Click APPLY.

<Callout type="info">On rare occasions, a configuration might contain unsupported protocol set configurations, and if you attempt to edit the configuration, Control prevents you from editing and displays this message: <br /> "Configuration cannot be saved. Please contact administrator to resolve the conflict between options." <br /> Unsupported protocol sets are often the byproduct of migrating a configuration from an older configuration version.</Callout>

## Viewing a Configuration {/*viewing-a-configuration*/}

On the *Configurations* for page, select the desired row or select the **preview** icon on the right side of the row.

## Cloning a Configuration {/*cloning-a-configuration*/}

On the *Configurations* for page, select the **clone** icon on the right side of the row.

<Callout type="info">When you clone a configuration, you must, at a minimum, enter a new Published URL Path. <br /> A cloned configuration requires about 15 minutes to be published. Until then, it is in the 'Pending' state.</Callout>

## Deleting a Configuration {/*deleting-a-configuration*/}

If you just created a new configuration:

1. On the Configurations for page, select the delete icon on the right side of the row.
2. Confirm your intention to delete in the subsequent dialog.

## Reverting to a Previous Configuration {/*reverting-to-a-previous-configuration*/}
Each time you update a configuration, a new version is assigned.

To revert to a previous configuration:

1. On the Configurations for page, select the revert icon on the right of the row.
    A list of previous versions is displayed in a dialog.

2. Select the version to which you want to revert.

 <br /> <Callout type="info">Although you intend to revert to a previous version, the reverted version will become the current version with a new version number. The new version number is displayed at the bottom of the dialog.</Callout>

3. Click the **Activate** button.
